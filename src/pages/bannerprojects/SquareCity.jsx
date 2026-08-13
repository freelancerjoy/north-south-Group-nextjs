import { useEffect } from "react";
import squareCityLogo from "../../assets/images/squareCityLogo.png";
import squareCityBrochure from "../../assets/images/squareCityBrochure.png";
import squareCityModalImg from "../../assets/images/squareCityModal_img.png";
import squareCityMap from "../../assets/images/squareCityMap.png";
import greenCityImg1 from "../../assets/images/greenCityImg1.jpg";
import greenCityImg2 from "../../assets/images/greenCityImg2.jpg";
import greenCityImg3 from "../../assets/images/greenCityImg3.jpg";
import greenCityImg4 from "../../assets/images/greenCityImg4.jpg";
import greenCityImg5 from "../../assets/images/greenCityImg5.jpg";
import greenCityImg6 from "../../assets/images/greenCityImg6.jpg";
import { useSquareCityStore } from "../../store/squareCity/squareCityStore";
import { API_BASE_URL } from "../../config/env";
import ProjectShowcaseTemplate from "./ProjectShowcaseTemplate";
import {
  industrialCityIconRegistry,
  squareCityShowcaseConfig,
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
  const config = { ...squareCityShowcaseConfig };

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
        icon: resolveIcon(item.iconKey, squareCityShowcaseConfig.locationHighlights[index]?.icon),
      }));
    if (highlights.length) config.locationHighlights = highlights;
  }

  if (Array.isArray(data?.plotTabs) && data.plotTabs.length) {
    const tabs = data.plotTabs
      .filter((tab) => tab?.label || tab?.cards?.length)
      .map((tab, tabIndex) => {
        const fallbackTab = squareCityShowcaseConfig.plotTabs[tabIndex] || {};
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

const SquareCity = () => {
  const { squareCity, loadSquareCity } = useSquareCityStore();

  useEffect(() => {
    loadSquareCity();
  }, [loadSquareCity]);

  const data = getLatestCityEntry(squareCity);

  const overviewParagraphs = [
    data?.overviewParagraph1 ||
      "North South Group is a market leader in real estate, offering residential projects tailored to buyer needs with a commitment to quality and timely delivery.",
    data?.overviewParagraph2 ||
      '"North South Square City" is a milestone project spanning 600 acres along the Dhaka-Sylhet Highway, developed in full compliance with RAJUK guidelines and modern urban planning standards.',
  ].filter(Boolean);

  const specificationsParagraphs = [
    data?.specificationsParagraph1 ||
      "Eco-friendly layout prepared with RAJUK compliance and urban planning guidelines, ensuring a sustainable and livable environment for residents.",
    data?.specificationsParagraph2 ||
      "Space for civic infrastructure, parks, playgrounds, community centers, and a scenic lake edge supports a more complete township life.",
    data?.specificationsParagraph3 ||
      "Dedicated zones for education, healthcare, shopping complexes, community centers, and mosques meet everyday needs within the project.",
  ].filter(Boolean);

  const galleryImages = data?.galleryImages?.length
    ? data.galleryImages.map((image) => image.url).filter(Boolean)
    : staticGallery;
  const dynamicConfig = buildDynamicConfig(data);
  const apiBaseUrl = API_BASE_URL.replace(/\/$/, "");
  const hasBrochurePdf = Boolean(data?.brochurePdf?.public_id || data?.brochurePdf?.url);
  const hasBookingPdf = Boolean(data?.bookingPdf?.public_id || data?.bookingPdf?.url);
  const brochurePdfHref = data?._id && hasBrochurePdf
    ? `${apiBaseUrl}/squareCity/${data._id}/pdf/brochure`
    : "/square.pdf";
  const bookingPdfHref = data?._id && hasBookingPdf
    ? `${apiBaseUrl}/squareCity/${data._id}/pdf/booking`
    : brochurePdfHref;

  return (
    <ProjectShowcaseTemplate
      projectName="North South Square City"
      config={dynamicConfig}
      logoSrc={squareCityLogo}
      videoSrc={data?.squareCityVideo || ""}
      brochureImageSrc={data?.brochureImage?.url || squareCityBrochure}
      brochurePdfHref={brochurePdfHref}
      bookingPdfHref={bookingPdfHref}
      mapImageSrc={data?.mapImage?.url || squareCityMap}
      sectionImages={data?.sectionImages}
      galleryImages={galleryImages}
      overviewParagraphs={overviewParagraphs}
      specificationsParagraphs={specificationsParagraphs}
      plotIntroText={data?.plotIntroText || ""}
      locationText={
        data?.locationBenefitsText ||
        "Purbachal Square City is easily accessible from all major routes in Dhaka. The project is located near the Purbachal Link Road and stays well connected via Kuril Flyover and Kanchan Bridge for convenient commuting."
      }
      rulesText={
        data?.rulesRegulationText ||
        "RAJUK exercises development control as per the East Bengal Building Construction Act, 1952 and its guidelines. All plots and constructions within North South Square City follow RAJUK-approved layout plans and disciplined development rules."
      }
      modalPreviewSrc={squareCityModalImg}
    />
  );
};

export default SquareCity;
