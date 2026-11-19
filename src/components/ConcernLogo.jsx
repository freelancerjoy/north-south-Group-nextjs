import styles from "./ConcernLogo.module.css";

const officialConcerns = [
  {
    name: "North South Humanity Aid Foundation",
    to: "/northSouthHumanityAidFoundation",
    logo: "/concerns/humanity-aid-foundation.jpg",
    mark: "foundation",
    match: /humanity.?aid|north.?south.*foundation|foundation.?logo/i,
  },
  {
    name: "Adin Hidden Eye",
    to: "/concern/adin-hidden-eye",
    logo: "/concerns/adin-hidden-eye.jpg",
    mark: "hiddenEye",
    match: /hidden.?eye/i,
  },
];

export function getOfficialConcern(...values) {
  return officialConcerns.find(({ match }) => values.some((value) => match.test(String(value || ""))));
}

export function includeOfficialConcerns(items) {
  const seen = new Set();
  const result = items.flatMap((item) => {
    const official = getOfficialConcern(item.name, item.to, item.href, item.logo);
    if (!official) return [item];
    if (seen.has(official.mark)) return [];
    seen.add(official.mark);
    return [{ ...item, ...official }];
  });
  return [...result, ...officialConcerns.filter(({ mark }) => !seen.has(mark))];
}

export function includeOfficialConcernLinks(items) {
  return includeOfficialConcerns(items.map((item) => ({ ...item, name: item.label })))
    .map((item) => item.mark
      ? { label: item.name, to: item.to }
      : item);
}

export default function ConcernLogo({ concern, alt = concern.name || "" }) {
  const { logo, mark } = concern;
  const src = typeof logo === "string" ? logo : logo?.src || logo?.url;
  if (!mark) return <img src={src} alt={alt} loading="lazy" />;

  return (
    <span className={`${styles.mark} ${styles[mark]}`}>
      <img src={src} alt={alt} loading="lazy" />
    </span>
  );
}
