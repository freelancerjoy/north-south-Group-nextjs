export const TITANIC_BAY_PATH = "/titanicBayHotelResort";

const imageBase = "https://res.cloudinary.com/dpsjkcaa/image/upload/v1794568349/WhatsApp_Image_2026-11-13_at_";

export const titanicBayMedia = {
  heroImage: `${imageBase}2.20.54_PM.jpg`,
  aboutImage: `${imageBase}2.20.55_PM.jpg`,
  galleryTitle: "Titanic Bay resort views",
  galleryImages: [
    `${imageBase}2.20.54_PM_1.jpg`,
    `${imageBase}2.20.55_PM_1.jpg`,
    `${imageBase}2.20.55_PM_2.jpg`,
  ],
};

export const isTitanicBay = (project) =>
  /titanic[\s-]*bay/i.test([project?.title, project?.slug, project?.to, project?.href].join(" "));

const videoBase = "https://res.cloudinary.com/dpsjkcaa/video/upload/";

const projectFilms = [
  {
    title: "North South Tarek Mansion",
    description: "See how stepped balconies, planted terraces, and a crisp exterior shape the building from street level to the upper floors.",
    match: /\btarek[\s-]*mansion\b/i,
    asset: "v1795083737/TarekMansion",
    posterTime: 1,
  },
  {
    title: "NS Tower",
    description: "Take a closer look at the residential design in Jolshiri, from the greenery on each level to the form of the tower as a whole.",
    match: /\b(?:n[\s.-]*s|north[\s-]*south)[\s-]*tower\b/i,
    asset: "v1795083724/NS-Tower",
    posterTime: 4,
  },
].map(({ title, description, match, asset, posterTime }) => ({
  title,
  description,
  match,
  src: `${videoBase}${asset}.mp4`,
  poster: `${videoBase}so_${posterTime},w_960/${asset}.jpg`,
}));


export function getProjectFilm(project) {
  return projectFilms.find(({ match }) =>
    [project?.title, project?.slug].some((value) => match.test(value || ""))
  );
}

export function projectImageKey(image) {
  const source = String(image);
  const cloudinary = source.match(/^https:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\/(?:.*\/)?v\d+\/([^?]+)/i);
  return cloudinary ? `${cloudinary[1]}/${cloudinary[2]}` : source;
}
