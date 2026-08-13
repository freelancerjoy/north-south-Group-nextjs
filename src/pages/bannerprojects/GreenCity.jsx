import { useEffect } from "react";
import greenCityLogo from "../../assets/images/greenCity.png";
import greenCityBrochure from "../../assets/images/green-city-brochure.png";
import greenCityImg1 from "../../assets/images/greenCityImg1.jpg";
import greenCityImg2 from "../../assets/images/greenCityImg2.jpg";
import greenCityImg3 from "../../assets/images/greenCityImg3.jpg";
import greenCityImg4 from "../../assets/images/greenCityImg4.jpg";
import greenCityImg5 from "../../assets/images/greenCityImg5.jpg";
import greenCityImg6 from "../../assets/images/greenCityImg6.jpg";
import greenCityMap from "../../assets/images/greenCityMap.png";
import { useGreenCityStore } from "../../store/greenCity/greenCityStore";
import { API_BASE_URL } from "../../config/env";
import ProjectShowcaseTemplate from "./ProjectShowcaseTemplate";
import {
  greenCityShowcaseConfig,
  industrialCityIconRegistry,
} from "./projectShowcaseData";

const staticGallery = [
  greenCityImg1,
  greenCityImg2,
  greenCityImg3,
  greenCityImg4,
  greenCityImg5,
  greenCityImg6,
];

const textConfigKeys = [
  "heroEyebrow",
  "heroTitle",
  "locationEyebrow",
  "locationTitle",
  "featuresEyebrow",
  "featuresTitle",
  "plotsEyebrow",
  "plotsTitle",
  "goalsEyebrow",
  "goalsTitle",
  "mapEyebrow",
  "mapTitle",
  "bookingEyebrow",
  "bookingTitle",
  "bookingSubtitle",
];

const resolveIcon = (iconKey, fallback) =>
  industrialCityIconRegistry[iconKey] ||
  fallback ||
  industrialCityIconRegistry.FaHome;

const getLatestCityEntry = (items) =>
  Array.isArray(items) && items.length
    ? [...items].sort(
        (a, b) =>
          new Date(b?.updatedAt || b?.createdAt || 0) -
          new Date(a?.updatedAt || a?.createdAt || 0)
      )[0]
    : null;

const buildDynamicConfig = (data) => {
  const config = { ...greenCityShowcaseConfig };

  textConfigKeys.forEach((key) => {
    if (data?.[key]) config[key] = data[key];
  });

  if (Array.isArray(data?.goals) && data.goals.some(Boolean)) {
    config.goals = data.goals.filter(Boolean);
  }

  if (Array.isArray(data?.locationHighlights) && data.locationHighlights.length) {
    const highlights = data.locationHighlights
      .filter((item) => item?.title || item?.detail)
      .map((item, index) => ({
        ...item,
        icon: resolveIcon(item.iconKey, greenCityShowcaseConfig.locationHighlights[index]?.icon),
      }));
    if (highlights.length) config.locationHighlights = highlights;
  }

  if (Array.isArray(data?.plotTabs) && data.plotTabs.length) {
    const tabs = data.plotTabs
      .filter((tab) => tab?.label || tab?.cards?.length)
      .map((tab, tabIndex) => {
        const fallbackTab = greenCityShowcaseConfig.plotTabs[tabIndex] || {};
        return {
          key: tab.key || fallbackTab.key || `tab-${tabIndex + 1}`,
          label: tab.label || fallbackTab.label || `Tab ${tabIndex + 1}`,
          cards: (tab.cards || [])
            .filter((card) => card?.title || card?.description)
            .map((card, cardIndex) => ({
              ...card,
              icon: resolveIcon(card.iconKey, fallbackTab.cards?.[cardIndex]?.icon),
            })),
        };
      });
    if (tabs.length) config.plotTabs = tabs;
  }

  return config;
};

const GreenCity = () => {
  const { greenCity, loadGreenCity } = useGreenCityStore();

  useEffect(() => {
    loadGreenCity();
  }, [loadGreenCity]);

  const data = getLatestCityEntry(greenCity);

  const overviewParagraphs = [
    data?.overviewParagraph1 ||
      "North South Group is a market leader in real estate, offering residential projects tailored to buyer needs and long-term value creation.",
    data?.overviewParagraph2 ||
      '"North South Green City" started in 2021, spanning 600 acres in Bhulta-Gausia along the Dhaka-Sylhet Highway with a forward-looking residential vision.',
  ].filter(Boolean);

  const specificationsParagraphs = [
    data?.specificationsParagraph1 ||
      "Eco-friendly layout with RAJUK compliance and planned urbanization designed for future-ready living.",
    data?.specificationsParagraph2 ||
      "Civic infrastructure, parks, playgrounds, and a long lake edge create a healthier residential environment.",
    data?.specificationsParagraph3 ||
      "Zones for education, healthcare, shopping, community centers, and mosques support everyday convenience inside the township.",
  ].filter(Boolean);

  const galleryImages = data?.galleryImages?.length
    ? data.galleryImages.map((image) => image.url).filter(Boolean)
    : staticGallery;
  const dynamicConfig = buildDynamicConfig(data);
  const apiBaseUrl = API_BASE_URL.replace(/\/$/, "");
  const hasBrochurePdf = Boolean(data?.brochurePdf?.public_id || data?.brochurePdf?.url);
  const hasBookingPdf = Boolean(data?.bookingPdf?.public_id || data?.bookingPdf?.url);
  const brochurePdfHref = data?._id && hasBrochurePdf
    ? `${apiBaseUrl}/greenCity/${data._id}/pdf/brochure`
    : "/green-city-brochure.pdf";
  const bookingPdfHref = data?._id && hasBookingPdf
    ? `${apiBaseUrl}/greenCity/${data._id}/pdf/booking`
    : brochurePdfHref;

  return (
    <ProjectShowcaseTemplate
      projectName="North South Green City"
      config={dynamicConfig}
      logoSrc={greenCityLogo}
      videoSrc={data?.greenCityVideo || ""}
      brochureImageSrc={data?.brochureImage?.url || greenCityBrochure}
      brochurePdfHref={brochurePdfHref}
      bookingPdfHref={bookingPdfHref}
      mapImageSrc={data?.mapImage?.url || greenCityMap}
      sectionImages={data?.sectionImages}
      galleryImages={galleryImages}
      overviewParagraphs={overviewParagraphs}
      specificationsParagraphs={specificationsParagraphs}
      plotIntroText={data?.plotIntroText || ""}
      locationText={
        data?.locationBenefitsText ||
        "Purbachal North South Green City is located on the eastern side of the River Shitalakhya and remains closely connected to Bhulta-Gausia, the Dhaka-Sylhet Highway, and the growing Purbachal corridor."
      }
      rulesText={
        data?.rulesRegulationText ||
        "RAJUK exercises development control as per the East Bengal Building Construction Act, 1952 and relevant guidelines, keeping the township aligned with organized planning standards."
      }
      modalPreviewSrc={greenCityBrochure}
    />
  );
};

export default GreenCity;
