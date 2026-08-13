export function entityId(entity) {
  const rawId = entity?._id ?? entity?.id ?? entity;

  if (!rawId) return "";
  if (typeof rawId === "string" || typeof rawId === "number") {
    return String(rawId);
  }
  if (typeof rawId === "object") {
    return rawId.$oid || rawId.id || rawId.toString?.() || "";
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
