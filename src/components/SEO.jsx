import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_SEO, ROUTE_SEO } from "../config/seoConfig";

const setMetaTag = (attr, key, content) => {
  if (!content) return;
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setCanonical = (url) => {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
};

const formatSlugTitle = (slug = "") => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function SEO({ customTitle, customDescription, customKeywords, customImage }) {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // Skip updating for admin routes
    if (pathname.startsWith("/adminDashboard")) {
      document.title = "Admin Dashboard | North South Group";
      setMetaTag("name", "robots", "noindex, nofollow");
      return;
    }

    const routeConfig = ROUTE_SEO[pathname] || {};
    let pageTitle = customTitle || routeConfig.title;
    let pageDesc = customDescription || routeConfig.description;
    let pageKeywords = customKeywords || routeConfig.keywords;
    let pageImage = customImage || routeConfig.ogImage || DEFAULT_SEO.defaultOgImage;
    const ogType = routeConfig.ogType || DEFAULT_SEO.defaultOgType;

    // Handle dynamic concerns or unknown routes
    if (!pageTitle) {
      if (pathname.startsWith("/concern/")) {
        const slug = pathname.replace("/concern/", "");
        const formatted = formatSlugTitle(slug);
        pageTitle = `${formatted} | North South Group Sister Concern`;
        pageDesc = `${formatted} is an esteemed sister concern of North South Group, contributing to Bangladesh's economic and urban development.`;
      } else {
        const cleanPath = pathname.replace("/", "").replace(/([A-Z])/g, " $1").trim();
        pageTitle = cleanPath
          ? `${cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1)} | North South Group`
          : DEFAULT_SEO.defaultTitle;
        pageDesc = DEFAULT_SEO.defaultDescription;
      }
    }

    if (!pageDesc) pageDesc = DEFAULT_SEO.defaultDescription;
    if (!pageKeywords) pageKeywords = DEFAULT_SEO.defaultKeywords;

    // Build absolute URLs
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://northsouthgroup.com";
    const canonicalUrl = `${siteUrl}${pathname}`;
    const fullImageUrl = pageImage.startsWith("http") ? pageImage : `${siteUrl}${pageImage}`;

    // Update Browser Document Title
    document.title = pageTitle;

    // Update Primary Meta Tags
    setMetaTag("name", "description", pageDesc);
    setMetaTag("name", "keywords", pageKeywords);
    setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMetaTag("name", "author", "North South Group");
    setMetaTag("name", "publisher", "North South Group");

    // Canonical link
    setCanonical(canonicalUrl);

    // Open Graph Meta Tags (Facebook, LinkedIn, WhatsApp)
    setMetaTag("property", "og:title", pageTitle);
    setMetaTag("property", "og:description", pageDesc);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", fullImageUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", DEFAULT_SEO.siteName);
    setMetaTag("property", "og:locale", DEFAULT_SEO.defaultLocale);

    // Twitter Card Meta Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:site", "@nsgroupbd");
    setMetaTag("name", "twitter:creator", "@nsgroupbd");
    setMetaTag("name", "twitter:title", pageTitle);
    setMetaTag("name", "twitter:description", pageDesc);
    setMetaTag("name", "twitter:image", fullImageUrl);

    // Dynamic JSON-LD Structured Data Schema (Breadcrumbs & Page Schema)
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteUrl
        }
      ]
    };

    if (pathname !== "/") {
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": pageTitle.split("|")[0].trim(),
        "item": canonicalUrl
      });
    }

    const pageSchema = {
      "@context": "https://schema.org",
      "@type": routeConfig.schemaType || "WebPage",
      "name": pageTitle,
      "description": pageDesc,
      "url": canonicalUrl,
      "isPartOf": {
        "@type": "WebSite",
        "name": DEFAULT_SEO.siteName,
        "url": siteUrl
      },
      "publisher": DEFAULT_SEO.organizationSchema
    };

    let schemaScript = document.getElementById("dynamic-seo-jsonld");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "dynamic-seo-jsonld";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify([DEFAULT_SEO.organizationSchema, breadcrumbList, pageSchema]);
  }, [pathname, customTitle, customDescription, customKeywords, customImage]);

  return null;
}

