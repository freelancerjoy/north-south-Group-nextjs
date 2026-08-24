import { useEffect } from "react";
import { Box } from "@mui/material";
import Consortium from "./consortium/Consortium";
import About from "./about/About";
import AOS from "aos";
import Banner from "./Banner";
import Contact from "./contact/Contact";
import Gallery from "./Gallery";
import Meeting from "./meeting/Meeting";
import Partners from "./partners/Partners";
import Project from "./project/Project";
import Testimonials from "./testimonials/Testimonials";

import { useHomeSliderStore } from "../store/homeSlider/homeSliderStore";

const fallbackSlides = [
  {
    image: "/assets/Hotel.png",
    eyebrow: "North South Group",
    title: "Redefining Modern Living",
    subtitle: "Residential, hospitality, and land development projects shaped around trust, location, and long-term value.",
  },
  {
    image: "/assets/Land1.png",
    eyebrow: "Land Development",
    title: "Invest For A Better Tomorrow",
    subtitle: "Planned communities and strategic land opportunities for buyers, investors, and landowners.",
  },
  {
    image: "/assets/Land2.png",
    eyebrow: "Trusted Partnership",
    title: "Build Your Sanctuary With Credibility",
    subtitle: "A practical route for landowners and families looking for reliable real estate development.",
  },
  {
    image: "/assets/Apartment.jpg",
    eyebrow: "Real Estate",
    title: "A New Standard Of Living",
    subtitle: "Homes and townships designed for comfort, connectivity, and everyday convenience.",
  },
];

const Home = () => {
  const { slides, loadSlides } = useHomeSliderStore();

  useEffect(() => {
    AOS.init({ duration: 800 });
    loadSlides();
  }, [loadSlides]);

  const activeSlides = slides && slides.length > 0 
    ? slides.map(s => ({
        image: s.image?.url || s.image,
        eyebrow: s.eyebrow,
        title: s.title,
        subtitle: s.subtitle
      }))
    : fallbackSlides;

  return (
    <Box overflow="hidden">
      <Banner
        slides={activeSlides}
        buttons={[
          { text: "REAL ESTATE", link: "/realEstate" },
          { text: "PROJECT", link: "/projects" },
          { text: "LAND WANTED", link: "/landWanted" },
        ]}
      />
      <About />
      <Consortium />
      <Testimonials />
      <Project />
      <Gallery />
      <Meeting />
      <Partners />
      <Contact />
    </Box>
  );
};

export default Home;
