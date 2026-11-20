/**
 * Image that fills its frame: wraps next/image (fill, object-fit cover) with the design's
 * photo treatment (saturate .85 · brightness .92). The frame is the parent: a media Card
 * (inset 15 / 10 m) or any box with a size; MediaFrame fills it.
 * Props: src, alt ('' when decorative), sizes (the rendered width: required with fill),
 * eager (the image is the LCP or above the fold: loads at once, high priority),
 * imageClassName (an effect on the image itself, e.g. the ProjectCard zoom reveal).
 * No corner marks: the design library never draws them.
 */
import Image from "next/image";
import { cn } from "@/lib/cn";

export function MediaFrame({
  src,
  alt,
  sizes,
  eager = false,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  eager?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        {...(eager && { loading: "eager", fetchPriority: "high" })}
        className={cn("object-cover brightness-92 saturate-85", imageClassName)}
      />
    </div>
  );
}
