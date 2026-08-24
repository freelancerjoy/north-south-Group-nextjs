
const Video = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      {/* Responsive Video Wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-xl"
           style={{ paddingTop: "56.25%" }} // 16:9 ratio
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          src="https://www.youtube.com/embed/7HjHVU9V_j8?si=hAwaNBakh9HPRZ3D"
          title="About North South Consortium Ltd."
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
