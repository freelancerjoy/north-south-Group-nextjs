export function entityId(entity) {
  const rawId = entity?._id ?? entity?.id ?? entity;

  if (!rawId) return "";
  if (typeof rawId === "string" || typeof rawId === "number") {
    return String(rawId);
  }
  if (typeof rawId === "object") {
    if (rawId.$oid) return rawId.$oid;
    if (rawId.id) return entityId(rawId.id);

    if (rawId.buffer && typeof rawId.buffer === "object") {
      const bytes = Array.isArray(rawId.buffer)
        ? rawId.buffer
        : Object.keys(rawId.buffer)
            .sort((a, b) => Number(a) - Number(b))
            .map((key) => rawId.buffer[key]);

      if (bytes.length === 12 && bytes.every((byte) => Number.isInteger(Number(byte)))) {
        return bytes
          .map((byte) => Number(byte).toString(16).padStart(2, "0"))
          .join("");
      }
    }

    const stringValue = rawId.toString?.() || "";
    return /^[0-9a-fA-F]{24}$/.test(stringValue) ? stringValue : "";
  }

  return "";
}

export function slugify(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function entityRouteId(value = "") {
  const text = String(value || "");
  const match = text.match(/[0-9a-fA-F]{24}$/);
  return match ? match[0] : text;
}

export function projectDetailsPath(project) {
  const slug = slugify(project?.title || "project");
  return slug ? `/project/${slug}` : "/projects";
}
