import React from "react";
import { useSquareCityStore } from "../../../store/squareCity/squareCityStore";
import { squareCityShowcaseConfig } from "../../bannerprojects/projectShowcaseData";
import ProjectCityUpdateForm from "./ProjectCityUpdateForm";

const defaultGoals = [
  "To build a planned township with modern urban planning standards.",
  "To offer well-connected residential opportunities in a growing corridor.",
  "To balance housing demand with civic, education, and recreation facilities.",
  "To promote an organized lifestyle backed by road and lake infrastructure.",
  "To ensure long-term value with disciplined RAJUK-compliant development.",
];

const defaultLocationHighlights = [
  {
    title: "Purbachal Link Road",
    detail: "Fast road access that connects the township with Dhaka",
    iconKey: "FaRoad",
  },
  {
    title: "Kuril Flyover",
    detail: "A practical route for daily city commuting",
    iconKey: "FaBusAlt",
  },
  {
    title: "Kanchan Bridge",
    detail: "Reliable link for surrounding district connectivity",
    iconKey: "FaMapMarkerAlt",
  },
  {
    title: "Major Dhaka Routes",
    detail: "Accessible from the capital's expanding residential network",
    iconKey: "FaUniversity",
  },
];

const defaultPlotTabs = [
  {
    key: "residential",
    label: "Residential Plots",
    cards: [
      {
        title: "3-5 Katha Plots",
        description:
          "Practical residential options for families seeking a planned urban neighborhood.",
        iconKey: "FaHome",
      },
      {
        title: "7.5-10 Katha Plots",
        description:
          "Larger residential parcels suited for premium homes or joint-family planning.",
        iconKey: "FaCity",
      },
      {
        title: "Apartment Block",
        description:
          "Suitable for residential development with stronger future rental and resale potential.",
        iconKey: "FaBuilding",
      },
      {
        title: "Plots of Various Size",
        description:
          "Flexible options that support different budgets, frontage needs, and home plans.",
        iconKey: "FaLeaf",
      },
    ],
  },
  {
    key: "commercial",
    label: "Commercial Plots",
    cards: [
      {
        title: "Corporate Offices",
        description:
          "Well-positioned plots for administrative offices and service-oriented businesses.",
        iconKey: "FaBuilding",
      },
      {
        title: "Educational Institutes",
        description:
          "Ideal locations for schools, coaching centers, and knowledge-based facilities.",
        iconKey: "FaSchool",
      },
      {
        title: "Shopping Centers",
        description:
          "Commercial-facing blocks created for market activity and high customer visibility.",
        iconKey: "FaStore",
      },
      {
        title: "Hospital & Care",
        description:
          "Accessible healthcare-focused plots for clinics, hospitals, and diagnostic services.",
        iconKey: "FaHospitalAlt",
      },
    ],
  },
];

const UpdateSquareCity = () => {
  const { squareCity, loadSquareCity, updateSquareCity, isLoading } = useSquareCityStore();

  return (
    <ProjectCityUpdateForm
      projectName="Square City"
      videoField="squareCityVideo"
      listPath="/adminDashboard/viewSquareCity"
      collection={squareCity}
      loadCollection={loadSquareCity}
      updateItem={updateSquareCity}
      isLoading={isLoading}
      theme="amber"
      config={squareCityShowcaseConfig}
      defaultGoals={defaultGoals}
      defaultLocationHighlights={defaultLocationHighlights}
      defaultPlotTabs={defaultPlotTabs}
    />
  );
};

export default UpdateSquareCity;
