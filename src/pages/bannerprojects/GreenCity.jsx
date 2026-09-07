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
      "নর্থ সাউথ গ্রুপ রিয়েল এস্টেট খাতের একটি শীর্ষস্থানীয় প্রতিষ্ঠান, যা ক্রেতাদের চাহিদা এবং দীর্ঘমেয়াদী মূল্যায়নের ভিত্তিতে আধুনিক আবাসিক প্রকল্প উপহার দিয়ে আসছে।",
    data?.overviewParagraph2 ||
      "২০২১ সালে যাত্রা শুরু করা 'নর্থ সাউথ গ্রিন সিটি' ঢাকা-সিলেট মহাসড়কের ভুলতা-গাউছিয়া সংলগ্ন ৬০০ একর জায়গা জুড়ে পরিকল্পিত একটি আধুনিক ও পরিবেশবান্ধব আবাসন প্রকল্প।",
  ].filter(Boolean);

  const specificationsParagraphs = [
    data?.specificationsParagraph1 ||
      "রাজউকের নিয়ম ও আধুনিক নগর পরিকল্পনা অনুসরণ করে ভবিষ্যতের উপযোগী একটি টেকসই ও স্বাস্থ্যকর আবাসন ব্যবস্থা।",
    data?.specificationsParagraph2 ||
      "প্রশস্ত অভ্যন্তরীণ সড়ক, সবুজ পার্ক, খেলার মাঠ এবং লেকের মনোরম পরিবেশ তৈরি করেছে একটি চমৎকার আবাসিক পরিবেশ।",
    data?.specificationsParagraph3 ||
      "শিক্ষা প্রতিষ্ঠান, স্বাস্থ্যসেবা, শপিং কমপ্লেক্স, কমিউনিটি সেন্টার এবং মসজিদ প্রকল্পের ভেতরেই দৈনন্দিন সব সুবিধা নিশ্চিত করে।",
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
      projectName="নর্থ সাউথ গ্রিন সিটি"
      config={dynamicConfig}
      logoSrc={greenCityLogo}
      videoSrc={data?.greenCityVideo || ""}
      locationVideoSrc={data?.greenCityVideo || "/videos/projectVideo.mp4"}
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
        "পূর্বাচল নর্থ সাউথ গ্রিন সিটি ভুলতা-গাউছিয়া এলাকায়, শীতলক্ষ্যা নদীর পূর্ব তীরে, আর্মি হাউজিং জলসিঁড়ি আবাসন প্রকল্প-২ এর ঠিক বিপরীতে অবস্থিত। হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর থেকে কুড়িল ফ্লাইওভার, কাঞ্চন ব্রিজ এবং পূর্বাচল ৩০০ ফুট লিংক রোড দিয়ে খুব দ্রুত ও সহজে এই প্রকল্পে পৌঁছানো যায়। আরেকটি গুরুত্বপূর্ণ যাতায়াত পথ হলো নতুন বাজার, মাদানী এভিনিউ (আমেরিকান দূতাবাসের বিপরীত দিক থেকে শুরু হয়ে গাজী ব্রিজ পার হয়ে ঢাকা-সিলেট হাইওয়ের সাথে সংযুক্ত)। এটি ঢাকা-সিলেট হাইওয়ের উত্তর পাশে অবস্থিত। এছাড়াও প্রকল্পটি আফতাবনগর, রামপুরা ও বনশ্রী রোড দিয়েও চমৎকারভাবে সংযুক্ত।"
      }
      rulesText={
        data?.rulesRegulationText ||
        "রাজউক ১৯৫২ সালের ইমারত নির্মাণ আইন ও প্রাসঙ্গিক নির্দেশিকা অনুসারে উন্নয়ন নিয়ন্ত্রণ করে থাকে, যা প্রকল্পটির সুশৃঙ্খল ও পরিকল্পিত নগরায়ন নিশ্চিত করে।"
      }
      modalPreviewSrc={greenCityBrochure}
    />
  );
};

export default GreenCity;
