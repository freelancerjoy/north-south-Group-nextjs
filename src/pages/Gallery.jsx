import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCamera, FiGrid, FiMaximize2, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import gallery1 from "../assets/images/gallery1.jpg";
import gallery2 from "../assets/images/gallery2.jpg";
import gallery3 from "../assets/images/gallery3.jpg";
import gallery4 from "../assets/images/gallery4.jpg";
import gallery5 from "../assets/images/gallery5.jpg";
import gallery6 from "../assets/images/gallery6.jpg";
import gallery7 from "../assets/images/gallery7.jpg";
import gallery8 from "../assets/images/gallery8.jpg";

const northSouthImages = [
  "WhatsApp Image 2026-07-25 at 11.39.02 AMwerwerwerwerwerw.jpeg",
  "WhatsApp Image 2026-07-25 at 11.39.01 AMwerewrrrrwerw.jpeg",
  "WhatsApp Image 2026-07-25 at 11.39.01 AMrwerwerwerwq.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.59 AMererw.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.59 AMdasdasd.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.59 AMasdasdsdasda.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.59 AMasdasdasd.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.58 AMdasdasda.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.57 sdasdasd.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.57 AMsdasd.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.56 AMads.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.56 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.55 AM.jpeg",
  "rerererere.jpeg",
  "qweqweqweqweq.jpeg",
  "asdasdasda.jpeg",
  "aasdasdasd.jpeg",
];

const dailyAdinImages = [
  "WhatsApp Image 2026-07-25 at 11.38.38 AM34234234234.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.37 AM34234234.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.37 AM234234.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.33 AM44343.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.32 AM42342342.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.32 AM34t23t23r.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.31 AMt34r23r23r.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.31 AMeerwre.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.30 AMrwer34r3.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.30 AMqeqeqwe.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.30 AMerter.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.29 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.28 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.27 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.26 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.25 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.24 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.23 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.22 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.21 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.20 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.19 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.17 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.15 AM.jpeg",
  "WhatsApp Image 2026-07-25 at 11.38.13 AM.jpeg",
  "rwerwerwerwerw.jpeg",
  "asasdasdasdasda.jpeg",
];

const makeImages = (folder, names) =>
  names.map((name, index) => ({
    id: `${folder}-${index}`,
    src: encodeURI(`/${folder}/${name}`),
    alt: `North South Gallery ${index + 1}`,
  }));

const makeAssetImages = (id, images, altPrefix) =>
  images.map((src, index) => ({
    id: `${id}-${index}`,
    src,
    alt: `${altPrefix} ${index + 1}`,
  }));

const albums = [
  {
    id: "northsouth",
    title: "Northsouth Group",
    homeTitle: "Corporate Moments",
    label: "Corporate album",
    description: "A curated collection of North South Group activities, moments, and brand presence.",
    folder: "Northsouthgroup",
    images: makeImages("Northsouthgroup", northSouthImages),
  },
  {
    id: "daily-adin",
    title: "Daily Adin News Paper Events",
    homeTitle: "Press & Event Highlights",
    label: "Event album",
    description: "Press, event, and publication moments from Daily Adin news paper activities.",
    folder: "Daily adin",
    images: makeImages("Daily adin", dailyAdinImages),
  },
  {
    id: "projects",
    title: "Projects",
    homeTitle: "Project Highlights",
    label: "Project album",
    description: "A visual collection of North South project locations, architecture, and development highlights.",
    images: makeAssetImages(
      "projects",
      [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8],
      "North South Projects"
    ),
  },
];

const Gallery = () => {
  const [activeAlbumId, setActiveAlbumId] = useState(albums[0].id);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [homeSlideIndex, setHomeSlideIndex] = useState(0);
  const { pathname } = useLocation();
  const isGalleryPage = pathname === "/gallery";
  const homeSlides = useMemo(
    () =>
      albums.flatMap((album) =>
        album.images.slice(0, 5).map((image) => ({
          ...image,
          album: album.title,
          title: album.homeTitle,
        }))
      ),
    []
  );
  const activeHomeSlide = homeSlides[homeSlideIndex];

  useEffect(() => {
    if (isGalleryPage) return undefined;
    const timer = window.setInterval(() => {
      setHomeSlideIndex((current) => (current + 1) % homeSlides.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [homeSlides.length, isGalleryPage]);

  const activeAlbum = useMemo(
    () => albums.find((album) => album.id === activeAlbumId) || albums[0],
    [activeAlbumId]
  );

  const selectedImage =
    selectedIndex === null ? null : activeAlbum.images[selectedIndex];

  const openImage = (index) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);
  const showPrevious = () =>
    setSelectedIndex((current) =>
      current === 0 ? activeAlbum.images.length - 1 : current - 1
    );
  const showNext = () =>
    setSelectedIndex((current) =>
      current === activeAlbum.images.length - 1 ? 0 : current + 1
    );

  const galleryContent = (
    <>
      {isGalleryPage && (
        <section className="relative min-h-[72vh] overflow-hidden bg-gray-950 pt-28 text-white md:pt-32">
        <img
          src={activeAlbum.images[0].src}
          alt={activeAlbum.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/45 to-[#f6f5ef]" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] backdrop-blur-md">
              <FiCamera />
              North South Media
            </div>
            <h1 className="text-4xl font-black uppercase leading-tight md:text-6xl lg:text-7xl">
              North South Gallery
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              Corporate activities, press moments, and event memories from North South Group in one curated visual archive.
            </p>
          </div>
        </div>
      </section>
      )}

      {!isGalleryPage && (
        <section className="overflow-hidden bg-[#10130f] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-green-300">
                  North South Visual Diary
                </p>
                <h2 className="max-w-4xl text-3xl font-black uppercase leading-tight text-white md:text-5xl">
                  Company stories in motion
                </h2>
              </div>
              <Link
                to="/gallery"
                className="inline-flex w-fit items-center justify-center bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-gray-950 shadow-lg shadow-black/25 transition hover:bg-green-500 hover:text-white"
              >
                View Albums
              </Link>
            </div>

            <div className="relative grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="relative z-10 flex flex-col justify-between border border-white/10 bg-white/[0.06] p-6 backdrop-blur md:p-8">
                <div>
                  <div className="mb-8 flex h-14 w-14 items-center justify-center border border-green-300/40 text-green-200">
                    <FiCamera size={22} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-green-200">
                    {activeHomeSlide.album}
                  </p>
                  <h3 className="mt-4 text-4xl font-black uppercase leading-none md:text-6xl">
                    {activeHomeSlide.title}
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-7 text-white/68">
                    Explore our corporate activities, press coverage, and event memories through a refined album experience.
                  </p>
                </div>

                <div className="mt-10">
                  <div className="mb-5 h-px w-full bg-white/10">
                    <div
                      className="h-px bg-green-300 transition-all duration-500"
                      style={{
                        width: `${((homeSlideIndex + 1) / homeSlides.length) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-[0.22em] text-white/55">
                      {String(homeSlideIndex + 1).padStart(2, "0")} / {String(homeSlides.length).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Previous gallery image"
                        onClick={() =>
                          setHomeSlideIndex((current) =>
                            current === 0 ? homeSlides.length - 1 : current - 1
                          )
                        }
                        className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition hover:border-green-300 hover:bg-green-300 hover:text-gray-950"
                      >
                        <FiArrowLeft />
                      </button>
                      <button
                        type="button"
                        aria-label="Next gallery image"
                        onClick={() =>
                          setHomeSlideIndex((current) => (current + 1) % homeSlides.length)
                        }
                        className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition hover:border-green-300 hover:bg-green-300 hover:text-gray-950"
                      >
                        <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/gallery"
                className="group relative min-h-[530px] overflow-hidden bg-gray-950 shadow-2xl shadow-black/35 md:min-h-[660px]"
              >
                {homeSlides.map((image, index) => (
                  <img
                    key={image.id}
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                      index === homeSlideIndex
                        ? "scale-100 opacity-100"
                        : "scale-105 opacity-0"
                    }`}
                  />
                ))}
                <span className="absolute inset-0 bg-linear-to-t from-black/85 via-black/18 to-transparent" />
                <span className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-black/65 to-transparent" />
                <div className="absolute left-5 top-5 border border-white/20 bg-black/25 px-4 py-3 text-xs font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
                  Auto Changing Gallery
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.28em] text-green-200">
                        Tap to open full album
                      </p>
                      <h4 className="mt-3 max-w-2xl text-3xl font-black uppercase leading-none text-white md:text-5xl">
                        North South Gallery
                      </h4>
                    </div>
                    <span className="inline-flex w-fit items-center gap-2 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-gray-950 transition group-hover:bg-green-400">
                      Explore
                      <FiArrowRight />
                    </span>
                  </div>
                </div>

                <div className="absolute right-5 top-1/2 hidden w-28 -translate-y-1/2 flex-col gap-3 lg:flex">
                  {[1, 2, 3].map((offset) => {
                    const index = (homeSlideIndex + offset) % homeSlides.length;
                    return (
                      <button
                        key={homeSlides[index].id}
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          setHomeSlideIndex(index);
                        }}
                        className="h-24 overflow-hidden border border-white/25 bg-white/10 p-1 backdrop-blur transition hover:border-green-300"
                      >
                        <img
                          src={homeSlides[index].src}
                          alt={homeSlides[index].alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    );
                  })}
                </div>
              </Link>

              <div className="lg:col-span-2 grid gap-4 pt-2 md:grid-cols-2">
                {albums.map((album, index) => (
                  <Link
                    key={album.id}
                    to="/gallery"
                    className="group grid overflow-hidden border border-white/10 bg-white/[0.07] text-white backdrop-blur transition hover:-translate-y-1 hover:border-green-300 hover:bg-white hover:text-gray-950 sm:grid-cols-[156px_1fr]"
                  >
                    <div className="relative h-44 overflow-hidden sm:h-full">
                      <img
                        src={album.images[index + 1]?.src || album.images[0].src}
                        alt={album.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute inset-0 bg-black/15 group-hover:bg-black/0" />
                    </div>
                    <div className="flex min-h-44 flex-col justify-center p-6">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-green-300 group-hover:text-green-700">
                        {album.images.length} Photos Album
                      </p>
                      <h4 className="mt-3 text-xl font-black uppercase leading-tight md:text-2xl">
                        {album.title}
                      </h4>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/62 group-hover:text-gray-600">
                        {album.description}
                      </p>
                      <span className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/80 group-hover:text-green-800">
                        Open Gallery
                        <FiArrowRight />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {isGalleryPage && (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => {
                setActiveAlbumId(album.id);
                setSelectedIndex(null);
              }}
              className={`group overflow-hidden border bg-white text-left shadow-sm transition-all duration-300 ${
                activeAlbumId === album.id
                  ? "border-green-700 shadow-xl shadow-green-900/10"
                  : "border-gray-200 hover:border-green-400 hover:shadow-lg"
              }`}
            >
              <div className="grid grid-cols-[116px_1fr] gap-4 p-3 sm:grid-cols-[150px_1fr]">
                <img
                  src={album.images[0].src}
                  alt={album.title}
                  className="h-32 w-full object-cover sm:h-36"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex min-w-0 flex-col justify-center pr-2">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-green-700">
                    {album.label}
                  </p>
                  <h2 className="mt-2 text-xl font-black uppercase text-gray-950">
                    {album.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                    {album.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                    <FiGrid />
                    {album.images.length} Photos
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-7 flex flex-col justify-between gap-4 border-y border-gray-200 py-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-green-700">
              {activeAlbum.label}
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase md:text-4xl">
              {activeAlbum.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-gray-600">
            {activeAlbum.description}
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {activeAlbum.images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openImage(index)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-gray-900 shadow-md ring-1 ring-black/5"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                  index % 5 === 0 ? "h-80" : index % 3 === 0 ? "h-64" : "h-56"
                }`}
              />
              <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />
              <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-white text-gray-950 opacity-0 shadow-lg transition group-hover:opacity-100">
                <FiMaximize2 />
              </span>
            </button>
          ))}
        </div>
      </section>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-4 py-6">
          <button
            onClick={closeImage}
            aria-label="Close gallery preview"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-gray-950"
          >
            <FiX size={20} />
          </button>
          <button
            onClick={showPrevious}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-gray-950 md:flex"
          >
            <FiArrowLeft size={21} />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[84vh] max-w-full object-contain shadow-2xl"
          />
          <button
            onClick={showNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-gray-950 md:flex"
          >
            <FiArrowRight size={21} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-800">
            {selectedIndex + 1} / {activeAlbum.images.length}
          </div>
        </div>
      )}
    </>
  );

  return isGalleryPage ? (
    <main className="bg-[#f6f5ef] text-gray-950">{galleryContent}</main>
  ) : (
    galleryContent
  );
};

export default Gallery;
