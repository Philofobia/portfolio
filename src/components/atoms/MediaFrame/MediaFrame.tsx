/**
 * Image that fills its frame: wraps next/image (fill, object-fit cover) with the design's
 * photo treatment (saturate .85 · brightness .92). The frame is the parent: a media Card
 * (inset 15 / 10 m) or any box with a size; MediaFrame fills it.
 * Props: src, alt ('' when decorative), sizes (the rendered width: required with fill),
 * eager (the image is the LCP or above the fold: loads at once, high priority),
 * imageClassName (an effect on the image itself, e.g. the ProjectCard zoom reveal).
 * No corner marks: the design library never draws them.
 *
 * As built: next/image's getImageProps() and a plain <img>, not the <Image> component.
 * The <img> gets the same optimised srcset, lazy loading and decoding, but <Image> is a
 * client component and would ship its runtime (and hydrate every image) for features this
 * site never uses (placeholders, onLoad); getImageProps runs on the server only
 * (nextjs-react performance.md: no client JS without a reason).
 * Two sizings:
 *   sizes          fill: the image covers a frame whose width follows the layout; sizes
 *                  says how wide it renders, for the srcset;
 *   width, height  a fixed thumbnail (CSS px): a 1x / 2x srcset only, much shorter in the
 *                  HTML (ProjectListItem's 96 × 58).
 * Either way the <img> is a static box sized by size-full inside the positioned frame.
 */
import { getImageProps } from "next/image";
import { cn } from "@/lib/cn";

type Sizing = { sizes: string } | { width: number; height: number };

export function MediaFrame({
  src,
  alt,
  eager = false,
  className,
  imageClassName,
  ...sizing
}: {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
  imageClassName?: string;
} & Sizing) {
  const {
    props: { style, ...image },
  } = getImageProps({
    src,
    alt,
    ...("sizes" in sizing
      ? { fill: true, sizes: sizing.sizes }
      : { width: sizing.width, height: sizing.height }),
    ...(eager && { loading: "eager", fetchPriority: "high" }),
  });
  // Its inline style (fill's absolute inset, color: transparent) repeats what size-full and
  // the frame already do, in the HTML and again in the RSC payload: dropped.
  void style;

  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image's own props (getImageProps), without its client runtime */}
      <img
        {...image}
        alt={alt}
        className={cn(
          "size-full object-cover brightness-92 saturate-85",
          imageClassName,
        )}
      />
    </div>
  );
}
