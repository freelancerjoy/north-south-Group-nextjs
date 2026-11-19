import fallbackImage from "../../assets/images/bannerProjectImg2.jpg";

export const LUXURY_SHOWCASE_SLIDES = [
  {
    title: "Signature Living",
    subtitle: "North South Group",
    caption:
      "Contemporary architecture shaped around refined living, confident design, and a strong sense of place.",
    image:
      "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790317812/Slider1.jpg.jpg",
    source: "project",
  },
  {
    title: "Designed With Detail",
    subtitle: "Architectural Experience",
    caption:
      "A refined visual language where proportion, material, greenery, and modern residential planning come together.",
    image:
      "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790318528/Scene_7_2_copy.jpg",
    source: "project",
  },
  {
    title: "Modern Perspective",
    subtitle: "Project View",
    caption:
      "Thoughtful contemporary development presented with a clean architectural identity and premium residential character.",
    image:
      "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790318527/Scene_4_3.png",
    source: "project",
  },
  {
    title: "A Better Way To Live",
    subtitle: "Signature Development",
    caption:
      "A modern environment created around comfort, design quality, everyday convenience, and long-term value.",
    image:
      "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790318526/2_copy.jpg",
    source: "project",
  },
  {
    title: "Grand Arrival",
    subtitle: "Lobby & Reception",
    caption:
      "A calm interior experience shaped by light, scale, elegant material choices, and a welcoming sense of arrival.",
    image:
      "https://images.unsplash.com/photo-1758193783649-13371d7fb8dd?auto=format&fit=crop&q=88&w=2600",
    source: "interior",
  },
  {
    title: "Private Living",
    subtitle: "Interior Experience",
    caption:
      "Contemporary interior inspiration with generous proportions, natural light, and a refined residential atmosphere.",
    image:
      "https://images.unsplash.com/photo-1776362355123-ca966d36e29c?auto=format&fit=crop&q=88&w=2600",
    source: "interior",
  },
];

const getProjectImage = (project) =>
  project?.image?.find(Boolean) ||
  project?.slideImage?.find(Boolean) ||
  project?.galleryImages?.find(Boolean) ||
  fallbackImage;

export const getProjectSliderImages = (project) => {
  const uploadedSlides = Array.isArray(project?.slideImage)
    ? project.slideImage.filter(Boolean)
    : [];
  if (uploadedSlides.length) return uploadedSlides;

  const projectImages = Array.isArray(project?.image)
    ? project.image.filter(Boolean)
    : [];
  return projectImages.length ? projectImages : [getProjectImage(project)];
};
