import { useEffect, useState } from "react";
import ConcernPageTemplate from "./ConcernPageTemplate";
import { getDefaultConcern } from "./defaultConcernData";
import { useConcernStore } from "../../store/concern/concernStore";

const DynamicConcernPage = ({ slug }) => {
  const [data, setData] = useState(getDefaultConcern(slug));
  const [loading, setLoading] = useState(true);
  const { loadConcernBySlug } = useConcernStore();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    loadConcernBySlug(slug)
      .then((concern) => {
        if (mounted && concern?.isPublished !== false) {
          setData({ ...getDefaultConcern(slug), ...concern });
        }
      })
      .catch(() => {
        if (mounted) setData(getDefaultConcern(slug));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [loadConcernBySlug, slug]);

  return (
    <div className={loading ? "opacity-95 transition-opacity" : "opacity-100 transition-opacity"}>
      <ConcernPageTemplate {...data} />
    </div>
  );
};

export default DynamicConcernPage;
