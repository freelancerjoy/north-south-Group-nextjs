import { useEffect, useState } from "react";
import ConcernPageTemplate from "./ConcernPageTemplate";
import { getDefaultConcern } from "./defaultConcernData";
import { useConcernStore } from "../../store/concern/concernStore";
import { slugify } from "../../utils/entity";

const normalizeConcernSlug = (value = "") => {
  const decoded = decodeURIComponent(String(value || "").trim());
  return slugify(decoded);
};

const DynamicConcernPage = ({ slug }) => {
  const lookupSlug = normalizeConcernSlug(slug);
  const defaultSlug = lookupSlug || slug;
  const [data, setData] = useState(getDefaultConcern(defaultSlug));
  const [loading, setLoading] = useState(true);
  const { loadConcernBySlug } = useConcernStore();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    loadConcernBySlug(lookupSlug || slug)
      .then((concern) => {
        if (mounted && concern?.isPublished !== false) {
          setData({ ...getDefaultConcern(defaultSlug), ...concern });
        }
      })
      .catch(() => {
        if (mounted) setData(getDefaultConcern(defaultSlug));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [defaultSlug, loadConcernBySlug, lookupSlug, slug]);

  return (
    <div className={loading ? "opacity-95 transition-opacity" : "opacity-100 transition-opacity"}>
      <ConcernPageTemplate {...data} />
    </div>
  );
};

export default DynamicConcernPage;
