export const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  if (url.includes("youtu.be")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  if (url.includes("youtube.com")) {
    const id = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${id}`;
  }

  return null;
};
