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
      "নর্থ সাউথ গ্রুপ দেশের অন্যতম শীর্ষস্থানীয় রিয়েল এস্টেট ও শিল্প অবকাঠামো উন্নয়নকারী প্রতিষ্ঠান, যা বাংলাদেশের আবাসন ও শিল্পায়নে ব্যাপক আস্থা অর্জন করেছে।",
    data?.overviewParagraph2 ||
      "ঢাকা-সিলেট মহাসড়কের পাশে ৬০০ একর জুড়ে বিস্তৃত 'নর্থ সাউথ ইন্ডাস্ট্রিয়াল সিটি' এ অঞ্চলের শিল্প ও বাণিজ্যের ক্রমবর্ধমান চাহিদা মেটাতে পরিকল্পিত একটি আধুনিক শিল্পাঞ্চল।",
  ].filter(Boolean);

  const specificationsParagraphs = [
    data?.specificationsParagraph1 ||
      "রাজউকের নিয়ম ও দক্ষ নগর পরিকল্পনার ভিত্তিতে পরিবেশবান্ধব ও সুশৃঙ্খল একটি ভবিষ্যৎ উপযোগী শিল্পাঞ্চল।",
    data?.specificationsParagraph2 ||
      "নাগরিক সুযোগ-সুবিধা, সবুজ পার্ক, খেলার মাঠ এবং লেকের মনোরম পরিবেশ কর্মকর্তা ও কর্মচারীদের জন্য একটি স্বাস্থ্যকর কাজের পরিবেশ তৈরি করে।",
    data?.specificationsParagraph3 ||
      "শিক্ষা প্রতিষ্ঠান, স্বাস্থ্যসেবা, শপিং কমপ্লেক্স, কমিউনিটি সেন্টার এবং মসজিদ শিল্পাঞ্চলের দৈনন্দিন চাহিদা মেটাতে বিশেষভাবে নির্ধারিত।",
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
      projectName="নর্থ সাউথ ইন্ডাস্ট্রিয়াল সিটি"
      config={dynamicConfig}
      logoSrc={industrialCityLogo}
      videoSrc={data?.industrialCityVideo || ""}
      locationVideoSrc={data?.industrialCityVideo || "/videos/projectVideo.mp4"}
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
        "পূর্বাচল ইন্ডাস্ট্রিয়াল সিটি শীতলক্ষ্যা নদীর পূর্ব তীরে, আর্মি হাউজিং জলসিঁড়ি আবাসন প্রকল্প-২ এর বিপরীতে অবস্থিত। পূর্বাচল লিংক রোড, কুড়িল ফ্লাইওভার এবং কাঞ্চন ব্রিজের মাধ্যমে খুব সহজেই এই প্রকল্পে যাতায়াত করা যায়।"
      }
      rulesText={
        data?.rulesRegulationText ||
        "রাজউক ১৯৫২ সালের ইমারত নির্মাণ আইন ও প্রাসঙ্গিক নির্দেশিকা অনুসারে উন্নয়ন নিয়ন্ত্রণ করে থাকে, যা প্রকল্পটির সুশৃঙ্খল ও পরিকল্পিত শিল্পায়ন নিশ্চিত করে।"
      }
      modalPreviewSrc={industrialModalImg}
    />
  );
};

export default IndustrialCity;
