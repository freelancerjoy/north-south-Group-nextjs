import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";;

const projects = [
  { id: 1, title: "Creative Design", img: img1 },
  { id: 2, title: "UI/UX Project", img: img2 },
  { id: 3, title: "Brand Identity", img: img3 },
  { id: 4, title: "Web App", img: img3 },
  { id: 5, title: "Photography Edit", img: img3 },
  { id: 6, title: "Frontend Development", img: img3 },
];

const Test = () => {
  return (
    <section className="bg-white py-20 text-black" id="portfolio">
      <div className="container mx-auto px-5">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-12 text-center" data-aos="fade-up">
          My Portfolio
        </h2>

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
              <div
                className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 
                       translate-y-5 group-hover:translate-y-0 transition duration-500"
              >
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-sm opacity-70">View Project</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Test;
