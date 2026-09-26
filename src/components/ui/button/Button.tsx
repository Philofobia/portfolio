/**
 * Base button. Variants: 'primary' (accent fill), 'secondary' (outline).
 * Sizes: 'lg' 75 (desktop hero) | 'md' 56 (mobile CTA) | 'sm' 50 (card actions); always two cells (150) wide.
 * Props: variant, size, icon? ('↓' | '↗' | '→' | '⤓', trailing; hover nudges it 3px its way),
 * href? / download?, ...native attributes of the element rendered.
 * With href it renders a link: i18n <Link> for internal paths ('/…'), plain <a> for
 * in-page anchors ('#work'), downloads and external URLs; without href, a <button>.
 * A link cannot be disabled: a missing link is a disabled <button> ("Private —").
 * One primary per viewport. Adjacent secondary buttons share a border (siblings are
 * assumed flush on the cell grid; wrap them apart if a gap separates them).
 * className is for placement (margin, grid position); the look comes from variant and size (button.styles.ts).
 * No 'use client': renders on the server, and inside client components when it needs onClick.
 */
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link } from "@/i18n/navigation";
import {
  buttonClasses,
  buttonIconClasses,
  type ButtonIcon,
  type ButtonSize,
  type ButtonVariant,
} from "./button.styles";

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
};

type ButtonAsButton = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonOwnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// '/work' but not '//cdn.example.com': the locale prefix only applies to app routes.
const isInternalPath = (href: string) => /^\/(?!\/)/.test(href);

export function Button({
  variant = "secondary",
  size = "lg",
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = buttonClasses({ variant, size, className });
  const content = <ButtonContent icon={icon}>{children}</ButtonContent>;

  if (rest.href === undefined) {
    return (
      <button
        type="button"
        {...rest}
        data-variant={variant}
        className={classes}
      >
        {content}
      </button>
    );
  }

  const { href, ...anchorRest } = rest;

  // Files in public/ must keep their path as is, so downloads skip the locale-aware Link.
  if (isInternalPath(href) && anchorRest.download === undefined) {
    return (
      <Link
        {...anchorRest}
        href={href}
        data-variant={variant}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <a {...anchorRest} href={href} data-variant={variant} className={classes}>
      {content}
    </a>
  );
}

function ButtonContent({
  icon,
  children,
}: {
  icon?: ButtonIcon;
  children?: ReactNode;
}) {
  return (
    <>
      {children}
      {icon && (
        <span aria-hidden="true" className={buttonIconClasses(icon)}>
          {/* U+FE0E: text glyph, not the colour emoji some fonts map ↗ to. */}
          {`${icon}︎`}
        </span>
      )}
    </>
  );
}
