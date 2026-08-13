export const projectDescriptionFields = [
  {
    key: "generalFeature",
    label: "General Feature",
    placeholder: "Describe the overall building quality, layout, and standout lifestyle features.",
  },
  {
    key: "elevator",
    label: "Elevator",
    placeholder: "Mention lift brand, passenger capacity, speed, and convenience details.",
  },
  {
    key: "bathroomFeature",
    label: "Bathroom Feature",
    placeholder: "Explain fittings, sanitaryware quality, ventilation, and finish details.",
  },
  {
    key: "maidsToilet",
    label: "Maids Toilet",
    placeholder: "Add service or maid toilet details if the unit includes one.",
  },
  {
    key: "kitchenDoor",
    label: "Kitchen Door",
    placeholder: "Describe the kitchen entry, finish, durability, and door material quality.",
  },
];

export const projectDescriptionDefaults = projectDescriptionFields.reduce(
  (acc, field) => ({ ...acc, [field.key]: "" }),
  {}
);

export const projectSectionImageDefaults = projectDescriptionFields.reduce(
  (acc, field) => ({ ...acc, [field.key]: null }),
  {}
);

export const projectSpecsDefaults = {
  orientation: "",
  frontRoad: "",
  landSize: "",
  apartmentSize: "",
  apartments: "",
  parking: "",
  floors: "",
  handover: "",
  lifts: "",
  stairs: "",
  buildingType: "",
  address: "",
};

export const floorPlanFields = [
  { key: "basement", label: "Basement" },
  { key: "groundFloor", label: "Ground Floor" },
  { key: "typicalFloor", label: "Typical Floor" },
  { key: "roofFloor", label: "Roof Floor" },
];

export const formatProjectFieldLabel = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
