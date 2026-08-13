import React from "react";
import { useGreenCityStore } from "../../../store/greenCity/greenCityStore";
import { greenCityShowcaseConfig } from "../../bannerprojects/projectShowcaseData";
import ProjectCityUpdateForm from "./ProjectCityUpdateForm";

const defaultGoals = [
  "To establish a planned and eco-conscious township close to Dhaka.",
  "To reduce future housing pressure through organized land development.",
  "To encourage greener living with open spaces, water bodies, and road access.",
  "To create a self-sustained neighborhood for daily civic needs.",
  "To maintain disciplined development through RAJUK-aligned planning.",
];

const defaultLocationHighlights = [
  {
    title: "Dhaka-Sylhet Highway",
    detail: "Direct access to the major regional corridor",
    iconKey: "FaRoad",
  },
  {
    title: "Bhulta-Gausia",
    detail: "Well-positioned inside a rapidly developing zone",
    iconKey: "FaMapMarkerAlt",
  },
  {
    title: "Purbachal Link Road",
    detail: "Smooth connection toward Dhaka city movement",
    iconKey: "FaBusAlt",
  },
  {
    title: "River Shitalakhya Side",
    detail: "A scenic eastern edge with long-term growth value",
    iconKey: "FaWater",
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
          "Right-sized residential plots for families looking for a calm and planned address.",
        iconKey: "FaHome",
      },
      {
        title: "5-7 Katha Corner Plots",
        description:
          "Ideal for wider frontage, better ventilation, and stronger long-term resale value.",
        iconKey: "FaCity",
      },
      {
        title: "Apartment Block",
        description:
          "Development-ready blocks for mid-rise housing with future community demand in mind.",
        iconKey: "FaBuilding",
      },
      {
        title: "Lake View Plots",
        description:
          "Premium parcels placed beside greener and more scenic parts of the master plan.",
        iconKey: "FaLeaf",
      },
    ],
  },
  {
    key: "commercial",
    label: "Commercial Plots",
    cards: [
      {
        title: "Retail & Market Zone",
        description:
          "Commercial-facing plots for neighborhood stores and essential daily services.",
        iconKey: "FaStore",
      },
      {
        title: "Office Complex Plots",
        description:
          "Smart investment options for service offices and mixed-use commercial buildings.",
        iconKey: "FaBuilding",
      },
      {
        title: "Education Campus",
        description:
          "Reserved locations for schools, training centers, and future learning hubs.",
        iconKey: "FaSchool",
      },
      {
        title: "Healthcare Block",
        description:
          "Accessible plots for clinics, diagnostic centers, and community medical services.",
        iconKey: "FaHospitalAlt",
      },
    ],
  },
];

const UpdateGreenCity = () => {
  const { greenCity, loadGreenCity, updateGreenCity, isLoading } = useGreenCityStore();

  return (
    <ProjectCityUpdateForm
      projectName="Green City"
      videoField="greenCityVideo"
      listPath="/adminDashboard/viewGreenCity"
      collection={greenCity}
      loadCollection={loadGreenCity}
      updateItem={updateGreenCity}
      isLoading={isLoading}
      theme="emerald"
      config={greenCityShowcaseConfig}
      defaultGoals={defaultGoals}
      defaultLocationHighlights={defaultLocationHighlights}
      defaultPlotTabs={defaultPlotTabs}
    />
  );
};

export default UpdateGreenCity;
