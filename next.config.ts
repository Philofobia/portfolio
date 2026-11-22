import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isDev = process.env.NODE_ENV === "development";

// CSP without nonces (Next's "Without Nonces" setup): a nonce would force every page
// to render per request. 'unsafe-inline' in script-src covers Next's inline RSC
// payload scripts and the pre-paint theme script; a hash would disable it.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  turbopack: {
    ignoreIssue: [
      {
        // Lightning CSS does not know :target-current yet and copies the rule through
        // unchanged. The current-section: variant (src/styles/variants.css) keeps it
        // behind @supports (scroll-target-group: auto), with an aria-current fallback.
        path: "**/src/app/globals.css",
        description: /'target-current' is not recognized/,
      },
      {
        // Same for ::scroll-button(): the Work carousel's native prev/next
        // (src/styles/carousel.css), behind @supports selector(::scroll-button(*)), with
        // script-driven buttons as the fallback.
        path: "**/src/app/globals.css",
        description: /'scroll-button' is not recognized/,
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000",
          },
        ],
      },
      {
        // Next only sends s-maxage (CDN) for a static route; let browsers keep the
        // icon sprite too. A day, then revalidate in the background. TechIcon requests it
        // with ?v= (lib/tech-icons spriteHref), which changes with the icon set, so a new
        // icon never meets a cached sprite without it.
        source: "/tech-sprite.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
