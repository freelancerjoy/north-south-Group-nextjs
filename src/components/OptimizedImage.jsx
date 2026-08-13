import Image from "next/image";

export function imageSrc(src) {
  if (!src) return "";
  if (typeof src === "string") return src;
  if (typeof src === "object" && src.src) return src.src;
  return "";
}

function cloudinaryOptimizedSrc(src) {
  if (!src.includes("res.cloudinary.com") || !src.includes("/upload/")) {
    return src;
  }

  if (src.includes("/upload/f_auto") || src.includes("/upload/q_auto")) {
    return src;
  }

  return src.replace("/upload/", "/upload/f_auto,q_auto,c_limit,w_1920/");
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  objectFit = "cover",
}) {
  const rawSrc = imageSrc(src);
  const resolvedSrc = rawSrc ? cloudinaryOptimizedSrc(rawSrc) : "";
  const isCloudinary = resolvedSrc.includes("res.cloudinary.com");

  if (!resolvedSrc) {
    return null;
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt || ""}
      fill
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      unoptimized={isCloudinary}
      sizes={sizes}
      className={className}
      style={{ objectFit }}
    />
  );
}
