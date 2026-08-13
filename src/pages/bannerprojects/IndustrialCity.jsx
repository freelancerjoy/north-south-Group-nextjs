import { useEffect } from "react";
import industrialCityLogo from "../../assets/images/industrialCityLogo.png";
import industrialCityMap from "../../assets/images/industrialCityMap.png";
import industrialModalImg from "../../assets/images/industrialModalImg.png";
import squareCityBrochure from "../../assets/images/squareCityBrochure.png";
import greenCityImg1 from "../../assets/images/greenCityImg1.jpg";
import greenCityImg2 from "../../assets/images/greenCityImg2.jpg";
import greenCityImg3 from "../../assets/images/greenCityImg3.jpg";
import greenCityImg4 from "../../assets/images/greenCityImg4.jpg";
import greenCityImg5 from "../../assets/images/greenCityImg5.jpg";
import greenCityImg6 from "../../assets/images/greenCityImg6.jpg";
import { useIndustrialCityStore } from "../../store/industrialCity/industrialCityStore";
import { API_BASE_URL } from "../../config/env";
import ProjectShowcaseTemplate from "./ProjectShowcaseTemplate";
import {
  industrialCityIconRegistry,
  industrialCityShowcaseConfig,
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
  industrialCityIconRegistry.FaIndustry;

const getLatestCityEntry = (items) =>
  Array.isArray(items) && items.length
    ? [...items].sort(
        (a, b) =>
          new Date(b?.updatedAt || b?.createdAt || 0) -
          new Date(a?.updatedAt || a?.createdAt || 0)
      )[0]
    : null;

const withDynamicIcons = (items = [], fallbackItems = []) =>
  items
    .filter((item) => item?.title || item?.detail)
    .map((item, index) => ({
      ...item,
      icon: resolveIcon(item.iconKey, fallbackItems[index]?.icon),
    }));

const buildIndustrialConfig = (data) => {
  const config = { ...industrialCityShowcaseConfig };

  textConfigKeys.forEach((key) => {
    if (data?.[key]) config[key] = data[key];
  });

  if (Array.isArray(data?.goals) && data.goals.some(Boolean)) {
    config.goals = data.goals.filter(Boolean);
  }

  if (Array.isArray(data?.locationHighlights) && data.locationHighlights.length) {
    const highlights = withDynamicIcons(
      data.locationHighlights,
      industrialCityShowcaseConfig.locationHighlights
    );
    if (highlights.length) config.locationHighlights = highlights;
  }

  if (Array.isArray(data?.plotTabs) && data.plotTabs.length) {
    const tabs = data.plotTabs
      .filter((tab) => tab?.label || tab?.cards?.length)
      .map((tab, tabIndex) => {
        const fallbackTab = industrialCityShowcaseConfig.plotTabs[tabIndex] || {};
        return {
          key: tab.key || fallbackTab.key || `tab-${tabIndex + 1}`,
          label: tab.label || fallbackTab.label || `Tab ${tabIndex + 1}`,
          cards: (tab.cards || [])
            .filter((card) => card?.title || card?.description)
            .map((card, cardIndex) => ({
              ...card,
              icon: resolveIcon(
                card.iconKey,
                fallbackTab.cards?.[cardIndex]?.icon
              ),
            })),
        };
      });
    if (tabs.length) config.plotTabs = tabs;
  }

  return config;
};

const IndustrialCity = () => {
  const { industrialCity, loadIndustrialCity } = useIndustrialCityStore();

  useEffect(() => {
    loadIndustrialCity();
  }, [loadIndustrialCity]);

  const data = getLatestCityEntry(industrialCity);

  const overviewParagraphs = [
    data?.overviewParagraph1 ||
      "North South Group is a market leader in the real estate building and land development sector, gaining strong confidence in housing and industrial development across Bangladesh.",
    data?.overviewParagraph2 ||
      '"North South Industrial City" is another milestone project spanning 600 acres along the Dhaka-Sylhet Highway, designed specifically to meet the growing demand for industrial land and infrastructure in the region.',
  ].filter(Boolean);

  const specificationsParagraphs = [
    data?.specificationsParagraph1 ||
      "Eco-friendly layout planning based on RAJUK rules and expert urban planning guidelines, ensuring an organized and future-ready industrial zone.",
    data?.specificationsParagraph2 ||
      "Space allocated for civic infrastructure, parks, playgrounds, and a long lake edge provides a more balanced environment for workers and nearby residents.",
    data?.specificationsParagraph3 ||
      "Dedicated zones for education, healthcare, shopping, community centers, and mosques support the daily needs of the industrial community.",
  ].filter(Boolean);

  const galleryImages = data?.galleryImages?.length
    ? data.galleryImages.map((image) => image.url).filter(Boolean)
    : staticGallery;
  const dynamicConfig = buildIndustrialConfig(data);
  const apiBaseUrl = API_BASE_URL.replace(/\/$/, "");
  const hasBrochurePdf = Boolean(data?.brochurePdf?.public_id || data?.brochurePdf?.url);
  const hasBookingPdf = Boolean(data?.bookingPdf?.public_id || data?.bookingPdf?.url);
  const brochurePdfHref = data?._id && hasBrochurePdf
    ? `${apiBaseUrl}/industrialCity/${data._id}/pdf/brochure`
    : "/industrial.pdf";
  const bookingPdfHref = data?._id && hasBookingPdf
    ? `${apiBaseUrl}/industrialCity/${data._id}/pdf/booking`
    : brochurePdfHref;

  return (
    <ProjectShowcaseTemplate
      projectName="North South Industrial City"
      config={dynamicConfig}
      logoSrc={industrialCityLogo}
      videoSrc={data?.industrialCityVideo || ""}
      brochureImageSrc={data?.brochureImage?.url || squareCityBrochure}
      brochurePdfHref={brochurePdfHref}
      bookingPdfHref={bookingPdfHref}
      mapImageSrc={data?.mapImage?.url || industrialCityMap}
      sectionImages={data?.sectionImages}
      galleryImages={galleryImages}
      overviewParagraphs={overviewParagraphs}
      specificationsParagraphs={specificationsParagraphs}
      plotIntroText={data?.plotIntroText || ""}
      locationText={
        data?.locationBenefitsText ||
        "Purbachal Industrial City is located on the eastern side of River Shitalakhya, opposite the Army Housing Jolshiri Abason Project-2. The project remains easily accessible via Purbachal Link Road, Kuril Flyover, and Kanchan Bridge."
      }
      rulesText={
        data?.rulesRegulationText ||
        "RAJUK exercises development control as per the East Bengal Building Construction Act, 1952 and its guidelines. All industrial plots and constructions within North South Industrial City follow RAJUK-approved layout plans and development regulations."
      }
      modalPreviewSrc={industrialModalImg}
    />
  );
};

export default IndustrialCity;
