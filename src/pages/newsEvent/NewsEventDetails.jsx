import news from "../../assets/news.png";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNewsEventsStore } from "../../store/newsEvent/newsEventStore";

const NewsEventDetails = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const { newsEvents, loadNewsEvents } = useNewsEventsStore();

  useEffect(() => {
    loadNewsEvents();
  }, [loadNewsEvents]);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[90vh]">
        <img
          src={news}
          alt="News & Events"
          className="w-full h-full object-cover rounded-b-3xl"
        />
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg text-center">
            News & Events
          </h1>
        </div>
      </div>

      {/* Marquee Announcement */}
      <div className="bg-green-100 py-3">
        <marquee className="text-green-800 font-semibold text-lg md:text-xl">
          Upcoming Projects: Northsouth Tours & Travels, Northsouth Foundation &
          Northsouth Butterfly Resort & Park!
        </marquee>
      </div>

      {/* Section Separator */}
      <hr className="border-t-4 border-green-500 my-6" />

      {/* Events Slider */}
      <section className="max-w-screen-xl mx-auto px-5 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            Latest News & Events
          </h2>
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="bg-green-200 p-3 rounded-full hover:bg-green-600 text-green-800 hover:text-white transition-all shadow-lg"
            >
              <IoIosArrowBack size={20} />
            </button>
            <button
              ref={nextRef}
              className="bg-green-200 p-3 rounded-full hover:bg-green-600 text-green-800 hover:text-white transition-all shadow-lg"
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSwiper={setSwiperInstance}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {newsEvents.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="relative group rounded-2xl overflow-hidden shadow-2xl cursor-pointer transform transition duration-500 hover:scale-105">
                {/* Event Image */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-[50vh] object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                {/* Title & Description */}
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-xl font-bold group-hover:underline">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm max-w-xs opacity-90 group-hover:opacity-100">
                    {event.description.length > 150
                      ? `${event.description.slice(0, 150)}...`
                      : event.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default NewsEventDetails;
