export const getYouTubeEmbedUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  try {
    const trimmed = url.trim();
    if (trimmed.includes("youtu.be/")) {
      const id = trimmed.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (trimmed.includes("youtube.com/embed/")) {
      const id = trimmed.split("youtube.com/embed/")[1]?.split("?")[0]?.split("&")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (trimmed.includes("youtube.com/shorts/")) {
      const id = trimmed.split("youtube.com/shorts/")[1]?.split("?")[0]?.split("&")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (trimmed.includes("youtube.com/watch")) {
      const urlObj = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
      const id = urlObj.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = trimmed.match(regExp);
    if (match && match[2]?.length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
  } catch {
    return null;
  }

  return null;
};
