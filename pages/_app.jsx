import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { SocketProvider } from "../services/socket";
import store from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/animate.css";
import "../styles/global.css";
import "../styles/sass/style.scss";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.dataLayer?.push({ event: "pageview", page: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div>
      {/* Google Analytics (GA4) */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-LGZBVPP92D"
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LGZBVPP92D');
            `,
        }}
      />

      <Head>
        <title>Adriva Business Services</title>

        <link
          rel="icon"
          href="/Adriva Business Services favicon PNG.png"
          type="image/png"
        />

        {/* Bing Webmaster Code */}
        <meta name="msvalidate.01" content="61CC05CC7BC8CB319285B1D459437E2E" />

        {/* Google Search Console Code */}
        <meta
          name="google-site-verification"
          content="TjWFxLqokkr0qnr5_xLqgajarxjLDDCw-qHdzBKEm84"
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PNQLDTZK');
            `,
          }}
        />
      </Head>

      {/* Google Tag Manager (noscript) - Must be placed inside body */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PNQLDTZK"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <Provider store={store}>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default MyApp;
