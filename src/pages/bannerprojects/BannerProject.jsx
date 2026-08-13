
import bp1 from "../../assets/images/bannerProjectImg1.jpg";
import bp2 from "../../assets/images/bannerProjectImg2.jpg";
import bp3 from "../../assets/images/bannerProjectImg3.jpg";
import Banner from "../Banner";

export default function BannerProject() {
  return (
    <Banner
      slides={[bp1, bp2, bp3]}
      buttons={[
        {
          text: (
            <>
              GREEN CITY <br />
              PROJECT
            </>
          ),
          link: "/greenCity",
        },
        {
          text: (
            <>
              INDUSTRIAL <br />
              PROJECT
            </>
          ),
          link: "/industrialCity",
        },
        {
          text: (
            <>
              SQUARE CITY <br />
              PROJECT
            </>
          ),
          link: "/squareCity",
        },
      ]}

    />
  );
}
