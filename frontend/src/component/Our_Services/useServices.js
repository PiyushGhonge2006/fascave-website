import { useMemo } from "react";

import { useCollection } from "../../hooks/useContent";
import { imageUrl } from "../../utils/apiBase";
import { fallbackFeatures } from "./data/features";

/* ======================================================
   SHARED SERVICES LIST
   ======================================================

   The cards and the detail page both need the same list,
   so it is fetched and reshaped once here. Every caller
   passes its own featureId or receives the whole list.

   The CMS and the hardcoded fallback use different field
   names, so CMS records are reshaped into the shape the
   components already draw. When the CMS has nothing to
   return, the original hardcoded list is used, which
   keeps the page looking normal instead of blank.
====================================================== */


const toFeature = (service) => {
  // Match the CMS service to its custom fallback content.
  const fallback = fallbackFeatures.find(
    (item) => item.id === (service.slug || service._id)
  );

  return {
    id: service.slug || service._id,
    title: service.title,
    image: imageUrl(service.image),
    description: service.shortDescription || "",
    details: service.description || "",

    // Use custom comparison copy when available.
    today: fallback?.today || [],
    outcome: fallback?.outcome || [],

    // Keep service-specific points from the CMS.
    points: (service.features || [])
      .map((feature) => feature.title)
      .filter(Boolean)
      .slice(0, 5),
  };
};


export const useServices = () => {
  const { items } = useCollection("/api/content/services");

  return useMemo(() => {
    if (!items.length) {
      return fallbackFeatures;
    }

    return items.map(toFeature);
  }, [items]);
};
