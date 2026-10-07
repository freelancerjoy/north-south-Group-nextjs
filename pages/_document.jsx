
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="google-site-verification"
          content="FuywbTv4q4kaMhYh6YFI4ZvtVyN2jUfnh7FMCYhacKY"
        />
        <meta
          name="description"
          content="North South Group is one of Bangladesh's premier real estate conglomerates, developing mega township projects including Green City, Square City, and Industrial City."
        />
        <meta
          name="keywords"
          content="North South Group, Real Estate Bangladesh, Green City, Square City, Industrial City, Purbachal plots, Commercial Project, Apartments Dhaka, Township Development, নর্থ সাউথ গ্রুপ, প্লট বিক্রয় ঢাকা"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="North South Group" />
        <meta name="publisher" content="North South Group" />
        <meta name="theme-color" content="#047857" />
        <meta name="format-detection" content="telephone=no" />

        {/* Favicons & Manifest */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph Fallbacks */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="North South Group" />
        <meta
          property="og:title"
          content="North South Group | Leading Real Estate & Township Developer in Bangladesh"
        />
        <meta
          property="og:description"
          content="North South Group - Pioneer in planned residential, industrial, and commercial township developments across Bangladesh including Green City, Square City & Industrial City."
        />
        <meta property="og:image" content="/og-banner.jpg" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nsgroupbd" />
        <meta name="twitter:creator" content="@nsgroupbd" />
        <meta
          name="twitter:title"
          content="North South Group | Leading Real Estate & Township Developer in Bangladesh"
        />
        <meta
          name="twitter:description"
          content="North South Group - Pioneer in planned residential, industrial, and commercial township developments across Bangladesh."
        />
        <meta name="twitter:image" content="/og-banner.jpg" />

        {/* Structured Data: Organization & WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "RealEstateAgent"],
                  "@id": "https://northsouthgroup.com/#organization",
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
                },
                {
                  "@type": "WebSite",
                  "@id": "https://northsouthgroup.com/#website",
                  "url": "https://northsouthgroup.com",
                  "name": "North South Group",
                  "publisher": {
                    "@id": "https://northsouthgroup.com/#organization"
                  }
                }
              ]
            }),
          }}
        />

        {/* Preload Prothom Alo's Shurjo Bengali WebFont */}
        <link
          rel="preload"
          href="/fonts/ShurjoWeb_400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ShurjoWeb_700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Facebook Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,"script",
              "https://connect.facebook.net/en_US/fbevents.js");
              fbq("init", "1549683060498602");
              fbq("track", "PageView");
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1549683060498602&ev=PageView&noscript=1"
            alt="facebook pixel"
          />
        </noscript>
        {/* End Facebook Pixel Code */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

