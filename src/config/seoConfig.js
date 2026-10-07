/**
 * Comprehensive SEO Configuration for North South Group
 * Structured for high Google rankings, rich snippet indexing, and social sharing.
 */

export const DEFAULT_SEO = {
  siteName: "North South Group",
  defaultTitle: "North South Group | Leading Real Estate & Township Developer in Bangladesh",
  titleTemplate: "%s | North South Group",
  defaultDescription:
    "North South Group is one of Bangladesh's premier real estate conglomerates, developing mega township projects including Green City, Square City, and Industrial City with modern amenities and sustainable living.",
  defaultKeywords: [
    "North South Group",
    "নর্থ সাউথ গ্রুপ",
    "Real Estate Bangladesh",
    "Real Estate Dhaka",
    "Green City Purbachal",
    "Square City Dhaka",
    "Industrial City Bangladesh",
    "Plot for sale in Dhaka",
    "Apartments in Dhaka",
    "Township project Dhaka",
    "Best real estate company Bangladesh",
    "Commercial space Dhaka",
    "North South Consortium",
    "রিয়েল এস্টেট ঢাকা",
    "প্লট বিক্রয় ঢাকা"
  ].join(", "),
  defaultOgImage: "/og-banner.jpg",
  defaultOgType: "website",
  defaultLocale: "en_US",
  socialLinks: [
    "https://www.facebook.com/northsouthgroupbd",
    "https://x.com/nsgroupbd",
    "https://www.linkedin.com/in/northsouthgroupbd/",
    "https://www.youtube.com/channel/UCXFv3Z_4RYqThJIYSU8o85A"
  ],
  organizationSchema: {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent"],
    "name": "North South Group",
    "alternateName": "নর্থ সাউথ গ্রুপ",
    "url": "https://northsouthgroup.com",
    "logo": "https://northsouthgroup.com/logo.png",
    "image": "https://northsouthgroup.com/og-banner.jpg",
    "description": "Premier real estate developer in Bangladesh specializing in planned residential and industrial townships.",
    "foundingDate": "2019",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressCountry": "BD"
    },
    "sameAs": [
      "https://www.facebook.com/northsouthgroupbd",
      "https://x.com/nsgroupbd",
      "https://www.linkedin.com/in/northsouthgroupbd/",
      "https://www.youtube.com/channel/UCXFv3Z_4RYqThJIYSU8o85A"
    ]
  }
};

export const ROUTE_SEO = {
  "/": {
    title: "North South Group | Leading Real Estate & Township Developer in Bangladesh",
    description:
      "Welcome to North South Group - Pioneer in planned residential, industrial, and commercial township developments across Bangladesh including Green City, Square City & Industrial City.",
    keywords:
      "North South Group, Real Estate Bangladesh, Green City, Square City, Industrial City, Purbachal plots, Commercial Project, Apartments Dhaka, Township Development, নর্থ সাউথ গ্রুপ",
    ogImage: "/og-banner.jpg",
    ogType: "website",
    schemaType: "WebSite"
  },
  "/aboutUs": {
    title: "About Us | North South Group - History, Vision & Excellence Since 2019",
    description:
      "Learn about North South Group, our leadership, corporate philosophy, and commitment to sustainable urban development and client trust in Bangladesh.",
    keywords:
      "About North South Group, real estate leadership, company overview, board of directors, sister concerns, sustainable development Bangladesh",
    ogImage: "/og-banner.jpg",
    ogType: "article",
    schemaType: "AboutPage"
  },
  "/greenCity": {
    title: "North South Green City | Eco-Friendly Modern Living & Plots in Purbachal",
    description:
      "Explore North South Green City - a self-sustained eco-township featuring modern civic amenities, lush green landscapes, and prime residential & commercial plots.",
    keywords:
      "North South Green City, Green City Purbachal, eco friendly township, residential plots Dhaka, Purbachal 300 feet plots, green living Bangladesh",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/squareCity": {
    title: "North South Square City | Prime Residential & Commercial Community",
    description:
      "Discover North South Square City - a planned modern township offering strategic connectivity, security, and world-class residential and commercial plots.",
    keywords:
      "North South Square City, Square City Dhaka, residential plots, commercial plots, modern housing project, Dhaka real estate investments",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/industrialCity": {
    title: "North South Industrial City | Modern Industrial Plots & Economic Hub",
    description:
      "Invest in North South Industrial City - purpose-built industrial parks and factory zones designed for logistics, manufacturing, and business expansion in Bangladesh.",
    keywords:
      "North South Industrial City, industrial plots Dhaka, factory land for sale, commercial industrial park, industrial zone Bangladesh, warehouse plots",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/commercial-project": {
    title: "Commercial Projects | North South Group - Premium Corporate & Retail Spaces",
    description:
      "Explore North South Group's signature commercial developments offering high-ROI retail spaces, executive corporate suites, and prime business addresses.",
    keywords:
      "Commercial Project North South, office space for sale Dhaka, commercial showroom, retail spaces, corporate building Bangladesh",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/projects": {
    title: "Our Projects | North South Group - Mega Townships, Residential & Industrial",
    description:
      "Browse our comprehensive portfolio of ongoing and completed real estate developments, townships, and commercial spaces across Dhaka and beyond.",
    keywords:
      "North South projects, ongoing real estate projects, upcoming housing projects, ready plots Dhaka, township projects Bangladesh",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/realEstate": {
    title: "Real Estate Solutions | North South Group - Land, Plots & Luxury Homes",
    description:
      "Reliable real estate solutions with North South Group: planned plots, housing schemes, and smart property investment opportunities with legal clarity.",
    keywords:
      "Real estate Dhaka, buy land Bangladesh, property investment Dhaka, verified plots, residential real estate",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/landWanted": {
    title: "Land Wanted & Joint Venture Development | North South Group",
    description:
      "Partner with North South Group for joint venture land development. We acquire prime land for residential, commercial, and township expansion.",
    keywords:
      "Land wanted Dhaka, joint venture development, land sale Bangladesh, partner with real estate developer",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/newsEvent": {
    title: "News & Events | Latest Updates from North South Group",
    description:
      "Stay updated with recent news, handover ceremonies, project milestones, press releases, and events from North South Group.",
    keywords:
      "North South Group news, press release, real estate events, project progress, handover ceremony",
    ogImage: "/og-banner.jpg",
    ogType: "article"
  },
  "/gallery": {
    title: "Photo & Video Gallery | North South Group Projects & Developments",
    description:
      "View high-resolution aerial photos, architectural renders, project site photos, and video tours of North South Group townships.",
    keywords:
      "North South gallery, project photos, drone view Green City, video tour Square City, site progress photos",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/career": {
    title: "Career Opportunities | Join the North South Group Team",
    description:
      "Build your future with one of Bangladesh's fastest-growing real estate conglomerates. Explore open positions in management, engineering, sales, and marketing.",
    keywords:
      "Careers at North South Group, real estate jobs Dhaka, job vacancy Bangladesh, civil engineer jobs",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/privacyPolicy": {
    title: "Privacy Policy | North South Group",
    description:
      "Read North South Group's commitment to user privacy, data security, and transparent information practices.",
    keywords: "Privacy policy, data protection, North South Group legal",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/northSouthConsortiumLtd": {
    title: "North South Consortium Ltd. | Integrated Business & Infrastructure",
    description:
      "North South Consortium Ltd. drives large-scale infrastructure, consortium-level contracting, and strategic business investments.",
    keywords: "North South Consortium Ltd, infrastructure contractor, business conglomerate Bangladesh",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/purbachalNirapadValley": {
    title: "Purbachal Nirapad Valley | Secure Gated Community Plots",
    description:
      "Purbachal Nirapad Valley offers secure, gated residential living with modern infrastructure close to Dhaka's diplomatic zone.",
    keywords: "Purbachal Nirapad Valley, gated community, Purbachal plots, secure living Dhaka",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  },
  "/titanicBayHotelResort": {
    title: "Titanic Bay Hotel & Resort Ltd. | Luxury Hospitality & Tourism",
    description:
      "Experience world-class luxury and hospitality at Titanic Bay Hotel & Resort Ltd., an exclusive tourism concern of North South Group.",
    keywords: "Titanic Bay Hotel Resort, luxury hotel Bangladesh, resort tourism, North South hospitality",
    ogImage: "/og-banner.jpg",
    ogType: "website"
  }
};

