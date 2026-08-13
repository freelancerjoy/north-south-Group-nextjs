import aboutImg1 from "../../assets/images/aboutImg1.jpg";
import aboutImg2 from "../../assets/images/aboutImg2.jpg";
import aboutImg3 from "../../assets/images/aboutImg3.jpg";
import aboutImg4 from "../../assets/images/aboutImg4.jpg";
import aboutImg5 from "../../assets/images/aboutImg5.jpg";
import aboutImg6 from "../../assets/images/aboutImg6.jpg";
import aboutImg7 from "../../assets/images/aboutImg7.jpg";
import aboutImg8 from "../../assets/images/aboutImg8.jpg";
import aboutImg9 from "../../assets/images/aboutImg9.jpg";
import aboutImg10 from "../../assets/images/aboutImg10.jpg";
import aboutImg11 from "../../assets/images/aboutImg11.jpg";

import useReveal from "../../components/useReveal";



const projects = [
  { id: 1, title: "Green City", img: aboutImg1 },
  { id: 2, title: "Square City", img: aboutImg2 },
  { id: 3, title: "Industrial City", img: aboutImg3 },
  { id: 4, title: "Square City", img: aboutImg4 },
  { id: 5, title: "Green City", img: aboutImg5 },
  { id: 6, title: "Industrial City", img: aboutImg6 },
  { id: 7, title: "Square City", img: aboutImg7 },
  { id: 8, title: "Industrial City", img: aboutImg8 },
  { id: 9, title: "Square City", img: aboutImg9 },
  { id: 10, title: "Green City", img: aboutImg10 },
  { id: 11, title: "Industrial City", img: aboutImg11 },
];

const SocialImg = ({className=''}) => {
      const ref = useReveal();
  return (
    <div><section className="bg-white py-4 lg:py-20 text-black" id="portfolio">
      <div className="container mx-auto px-5">
        {/* Section Title */}
        <h2 ref={ref} className={`slide-title ${className} text-green-700 not-only:text-4xl font-bold mb-12 text-center" data-aos="fade-up`}>
      Corporate Social Responsibility  
        </h2>
<p className="text-[#212529] text-base leading-relaxed p-2">
    As one of the pioneers of the real estate industry in Bangladesh, North South strongly believes in giving back to the community
in various ways to facilitate our growing economy and country in its path of development.
    </p>
        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              {/* Image */}
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transform 
                       transition duration-700 group-hover:scale-110 
                       group-hover:rotate-3" // slight rotation
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Title + Slide Up Effect */}
              {/* <div
                className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 
                       translate-y-5 group-hover:translate-y-0 transition duration-500"
              >
                <h3 className="text-xl text-white font-semibold">{project.title}</h3>
               
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section></div>
  )
}

export default SocialImg
