import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";

const ClientApp = dynamic(() => import("../src/ClientApp.jsx"), {
  ssr: false,
});

export default function CatchAllPage() {
  return (
    <>
      <Head>
        <title>North South Group - Real Estate & Construction</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Script id="disable-scroll-restoration" strategy="beforeInteractive">
        {`
          if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
          }
          window.scrollTo(0, 0);
        `}
      </Script>
      <ClientApp />
    </>
  );
}
