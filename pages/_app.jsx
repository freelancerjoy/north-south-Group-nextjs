import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../src/index.css";
import "../src/pages/project/Project.css";
import "../src/pages/contact/contact.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
