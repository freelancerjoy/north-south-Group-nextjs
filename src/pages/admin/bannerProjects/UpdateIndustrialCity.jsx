import React from "react";
import { useIndustrialCityStore } from "../../../store/industrialCity/industrialCityStore";
import { industrialCityShowcaseConfig } from "../../bannerprojects/projectShowcaseData";
import ProjectCityUpdateForm from "./ProjectCityUpdateForm";

const defaultGoals = [
  "To create a planned industrial zone with organized long-term growth potential.",
  "To respond to rising demand for industrial land near Dhaka's expansion belt.",
  "To combine production space with essential worker and support infrastructure.",
  "To strengthen logistics convenience through strategic road connectivity.",
  "To keep industrial development disciplined through RAJUK-guided planning.",
];

const defaultLocationHighlights = [
  {
    title: "River Shitalakhya Side",
    detail: "Strategic edge that supports broader regional access",
    iconKey: "FaWater",
  },
  {
    title: "Jolshiri Abason Nearby",
    detail: "Positioned opposite a known and expanding development belt",
    iconKey: "FaMapMarkerAlt",
  },
  {
    title: "Purbachal Link Road",
    detail: "Fast and dependable movement toward the city",
    iconKey: "FaRoad",
  },
  {
    title: "Kanchan Bridge Access",
    detail: "Useful logistics connection for industrial transport routes",
    iconKey: "FaBusAlt",
  },
];

const defaultPlotTabs = [
  {
    key: "industrial",
    label: "Industrial Plots",
    cards: [
      {
        title: "Factory Plots",
        description:
          "Production-ready parcels prepared for future manufacturing and processing facilities.",
        iconKey: "FaIndustry",
      },
      {
        title: "Warehouse Zone",
        description:
          "Large-format spaces suited for storage, inventory flow, and distribution planning.",
        iconKey: "FaWarehouse",
      },
      {
        title: "Logistics Yard",
        description:
          "Transport-friendly plots created for truck movement and industrial support operations.",
        iconKey: "FaRoad",
      },
      {
        title: "Utility Support Block",
        description:
          "Ideal for service facilities that keep industrial activity running smoothly every day.",
        iconKey: "FaPlug",
      },
    ],
  },
  {
    key: "commercial",
    label: "Commercial Support",
    cards: [
      {
        title: "Showroom & Trade Hub",
        description:
          "A visible commercial layer for industrial sales, display, and client meetings.",
        iconKey: "FaStore",
      },
      {
        title: "Business Center",
        description:
          "Office-focused blocks for administration, finance, and support teams.",
        iconKey: "FaBuilding",
      },
      {
        title: "Training Institute",
        description:
          "Dedicated spaces for technical training, workforce development, and learning support.",
        iconKey: "FaSchool",
      },
      {
        title: "Healthcare & Services",
        description:
          "Service-oriented plots for clinics and facilities that support daily industrial activity.",
        iconKey: "FaHospitalAlt",
      },
    ],
  },
];

const UpdateIndustrialCity = () => {
  const { industrialCity, loadIndustrialCity, updateIndustrialCity, isLoading } =
    useIndustrialCityStore();

  return (
    <ProjectCityUpdateForm
      projectName="Industrial City"
      videoField="industrialCityVideo"
      listPath="/adminDashboard/viewIndustrialCity"
      collection={industrialCity}
      loadCollection={loadIndustrialCity}
      updateItem={updateIndustrialCity}
      isLoading={isLoading}
      theme="amber"
      config={industrialCityShowcaseConfig}
      defaultGoals={defaultGoals}
      defaultLocationHighlights={defaultLocationHighlights}
      defaultPlotTabs={defaultPlotTabs}
    />
  );
};

export default UpdateIndustrialCity;
