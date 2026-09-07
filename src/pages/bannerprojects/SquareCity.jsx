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
      "নর্থ সাউথ গ্রুপ রিয়েল এস্টেট খাতের একটি বিশ্বস্ত প্রতিষ্ঠান, যা গুণগত মান ও সময়মতো হস্তান্তরের নিশ্চয়তা দিয়ে গ্রাহকদের জন্য নান্দনিক আবাসন প্রকল্প উপহার দিয়ে আসছে।",
    data?.overviewParagraph2 ||
      "ঢাকা-সিলেট মহাসড়কের পাশে ৬০০ একর জুড়ে বিস্তৃত 'নর্থ সাউথ স্কয়ার সিটি' রাজউকের নীতিমালা এবং আধুনিক নগর পরিকল্পনার সাথে সামঞ্জস্য রেখে তৈরি একটি যুগান্তকারী প্রকল্প।",
  ].filter(Boolean);

  const specificationsParagraphs = [
    data?.specificationsParagraph1 ||
      "রাজউকের নিয়ম ও পরিবেশবান্ধব নগর পরিকল্পনার সমন্বয়ে তৈরি, যা বাসিন্দাদের জন্য একটি সুস্থ ও নিরাপদ আবাসন নিশ্চিত করে।",
    data?.specificationsParagraph2 ||
      "নাগরিক সুযোগ-সুবিধা, সবুজ পার্ক, খেলার মাঠ, কমিউনিটি সেন্টার এবং মনোরম লেক ভিউ একটি সমৃদ্ধ টাউনশিপ জীবনের পূর্ণতা দেয়।",
    data?.specificationsParagraph3 ||
      "শিক্ষা প্রতিষ্ঠান, আধুনিক স্বাস্থ্যসেবা, শপিং কমপ্লেক্স, কমিউনিটি সেন্টার এবং মসজিদ প্রকল্পের ভেতরেই দৈনন্দিন চাহিদা পূরণ করে।",
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
      projectName="নর্থ সাউথ স্কয়ার সিটি"
      config={dynamicConfig}
      logoSrc={squareCityLogo}
      videoSrc={data?.squareCityVideo || ""}
      locationVideoSrc={data?.squareCityVideo || "/videos/projectVideo.mp4"}
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
        "পূর্বাচল স্কয়ার সিটি ঢাকার সকল প্রধান রুট থেকে সহজে যাতায়াতযোগ্য। প্রকল্পটি পূর্বাচল লিংক রোডের সন্নিকটে অবস্থিত এবং কুড়িল ফ্লাইওভার ও কাঞ্চন ব্রিজের মাধ্যমে চমৎকার যোগাযোগ ব্যবস্থার সাথে যুক্ত।"
      }
      rulesText={
        data?.rulesRegulationText ||
        "রাজউক ১৯৫২ সালের ইমারত নির্মাণ আইন ও প্রাসঙ্গিক নির্দেশিকা অনুসারে উন্নয়ন নিয়ন্ত্রণ করে থাকে, যা প্রকল্পটির সুশৃঙ্খল ও পরিকল্পিত নগরায়ন নিশ্চিত করে।"
      }
      modalPreviewSrc={squareCityModalImg}
    />
  );
};

export default SquareCity;
