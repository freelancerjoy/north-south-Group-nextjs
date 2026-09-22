import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import NotFound from "../../components/NotFound";
import NirapadValleyLuxury from "./NirapadValleyLuxury";
import FoundationLuxury from "./FoundationLuxury";
import ConstructionLuxury from "./ConstructionLuxury";
import MayalokResortLuxury from "./MayalokResortLuxury";
import ConcernLuxuryPage from "./ConcernLuxuryPage";
import { getDefaultConcern, hasDefaultConcern } from "./defaultConcernData";
import { useConcernStore } from "../../store/concern/concernStore";
import { slugify } from "../../utils/entity";

const normalizeConcernSlug = (value = "") => {
  const decoded = decodeURIComponent(String(value || "").trim());
  return slugify(decoded);
};

const DynamicConcernPage = ({ slug }) => {
  const lookupSlug = normalizeConcernSlug(slug);
  const defaultSlug = lookupSlug || slug;
  const [resolved, setResolved] = useState({
    key: defaultSlug,
    data: null,
    isResolving: true,
    notFound: false,
  });
  const { loadConcernBySlug } = useConcernStore();

  useEffect(() => {
    let mounted = true;
    const fallbackConcern = getDefaultConcern(defaultSlug);

    loadConcernBySlug(slug || lookupSlug)
      .then((concern) => {
        if (!mounted) return;
        if (concern?.isPublished === false) {
          setResolved({
            key: defaultSlug,
            data: null,
            isResolving: false,
            notFound: true,
          });
          return;
        }
        setResolved({
          key: defaultSlug,
          data: { ...(fallbackConcern || {}), ...concern },
          isResolving: false,
          notFound: false,
        });
      })
      .catch(() => {
        if (!mounted) return;
        if (hasDefaultConcern(defaultSlug)) {
          setResolved({
            key: defaultSlug,
            data: fallbackConcern,
            isResolving: false,
            notFound: false,
          });
        } else {
          setResolved({
            key: defaultSlug,
            data: null,
            isResolving: false,
            notFound: true,
          });
        }
      });

    return () => {
      mounted = false;
    };
  }, [defaultSlug, loadConcernBySlug, lookupSlug, slug]);

  if (resolved.key !== defaultSlug || resolved.isResolving) return <Spinner />;
  if (resolved.notFound || !resolved.data) return <NotFound />;

  return (
    <div className="opacity-100 transition-opacity">
      {defaultSlug === "purbachal-nirapad-valley" || /nirapad.*valle/i.test(`${defaultSlug} ${resolved.data.title}`)
        ? <NirapadValleyLuxury {...resolved.data} />
        : defaultSlug === "northsouth-foundation" || /humanityaidfoundation|northsouth.*foundation/i.test(`${defaultSlug} ${resolved.data.title}`)
          ? <FoundationLuxury {...resolved.data} />
          : /mayalok.?resort/i.test(`${defaultSlug} ${resolved.data.title}`)
            ? <MayalokResortLuxury {...resolved.data} />
            : /north.?south.?building.?construction/i.test(`${defaultSlug} ${resolved.data.title}`)
            ? <ConstructionLuxury {...resolved.data} />
            : /northsouth.?farms|northsouth.?garments|north.?south.?duplex|north.?south.?consortium/i.test(`${defaultSlug} ${resolved.data.title}`)
            ? <ConcernLuxuryPage {...resolved.data} />
            : <ConcernLuxuryPage {...resolved.data} />}
    </div>
  );
};

export default DynamicConcernPage;
