import React, { useEffect } from "react";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("../components/Hero"), { ssr: false });
const About = dynamic(() => import("../components/about/about"), {
  ssr: false,
});
const FunFact = dynamic(() => import("../components/FunFact/FunFact"), {
  ssr: false,
});

const Footer = dynamic(() => import("../components/footer/Footer"));
const Navbar3 = dynamic(() => import("../components/Navbar3/Navbar3"), {
  ssr: false,
});
const WhyAdriva = dynamic(() => import("../components/whyadriva/whyAdriva"), {
  ssr: false,
});
const OurServiceSection = dynamic(
  () => import("../components/ourservices/ourservices"),
  { ssr: false }
);
const Reviews = dynamic(() => import("../components/reviews/reviews"), {
  ssr: false,
});
const ContactUs = dynamic(() => import("../components/contactus/contactus"), {
  ssr: false,
});
import { useDispatch, useSelector } from "react-redux";
import {
  fetchdataApi,
  insertpreviewdata,
  ispreview,
} from "../redux/actions";
const Scrollbar = dynamic(() => import("../components/scrollbar/scrollbar"), {
  ssr: false,
});
const LoaderContainer = dynamic(() => import("../components/loader"), {
  ssr: false,
});
import Head from "next/head";
import { useRouter } from "next/router";
import { useSocket } from "../services/socket";
const Home = (props) => {
  const socket = useSocket();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const router = useRouter();
  const query = router.query;
  const seoData = useSelector((state) => state.data.metaData);
  const isloading = useSelector((state) => state.data.loading);
  const language = useSelector((state) => state.data.selectedlanguage);

  useEffect(() => {
    if (socket) {
      socket.on("preview_data1", (data) => {
        console.log(data, "dataa");
        if (
          data?.data?.length > 0 &&
          data?.data[0]?.["674591e1ea93fa6fa0ef81d9"]
        ) {
          // socket.emit("preview_data1", {toggle:true,data:[]});
          dispatch(insertpreviewdata(data.data));
          dispatch(ispreview(true));
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("preview_data1");
      }
    };
  }, [socket]);


  useEffect(() => {
    console.log(query.preview, "query.preview");
    if (!router.isReady) return; // Wait until ready

    if (typeof window !== "undefined") {
      localStorage.setItem("id", "674591e1ea93fa6fa0ef81d9");
    }

    if (query.preview === "true") {
      console.log("🔵 Preview Mode API call");
      dispatch(
        fetchdataApi(
          {
            id: "674591e1ea93fa6fa0ef81d9",
            pagination: {},
            slug: "",
            language: language,
            isjobs: false,
            ispreview: true, // force true here
            socketdata: [data.socketdata],
          },
          dispatch
        )
      );
    } else {
      console.log("🟠 Normal Mode API call");
      dispatch(
        fetchdataApi(
          {
            id: "674591e1ea93fa6fa0ef81d9",
            pagination: {},
            language: language,
            slug: "",
            isjobs: false,
          },
          dispatch
        )
      );
    }
  }, [
    
    dispatch,
    language,
    data.socketdata,
    router.isReady,
    query.preview, // Track changes
  ]);

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     if (typeof window.gtag === "function") {
  //       window.gtag("config", "G-LGZBVPP92D", {
  //         page_path: url,
  //       });
  //     }
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  // useEffect(() => {
  //   // Listen for route changes to dispatch loading
  //   const handleRouteChangeStart = () => {
  //     dispatch(loading(true)); // Show loading before route change
  //   };

  //   const handleRouteChangeComplete = () => {
  //     dispatch(loading(false)); // Hide loading after route change
  //   };

  //   const handleRouteChangeError = () => {
  //     dispatch(loading(false)); // Hide loading if there's an error
  //   };

  //   // Add event listeners for route changes
  //   router.events.on("routeChangeStart", handleRouteChangeStart);
  //   router.events.on("routeChangeComplete", handleRouteChangeComplete);
  //   router.events.on("routeChangeError", handleRouteChangeError);

  //   // Cleanup event listeners on unmount
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart);
  //     router.events.off("routeChangeComplete", handleRouteChangeComplete);
  //     router.events.off("routeChangeError", handleRouteChangeError);
  //   };
  // }, [router.events, dispatch]);

  // useEffect(() => {
  //   // Initial loading state
  //   dispatch(loading(true));
  // }, [dispatch]);
  return (
    <>
      <Head>
        <title>{seoData?.metaTitle}</title>
        <meta name="description" content={seoData?.metaDescription} />
        <meta
          name="keywords"
          content={
            Array.isArray(seoData?.keywords)
              ? seoData?.keywords?.join(", ")
              : seoData?.keywords
          }
        />
        <meta name="msvalidate.01" content="61CC05CC7BC8CB319285B1D459437E2E" />
        <meta
          name="google-site-verification"
          content="TjWFxLqokkr0qnr5_xLqgajarxjLDDCw-qHdzBKEm84"
        />
        {/* {seoData?.metaImage && (
          <>
            <meta property="og:image" content={seoData.metaImage} />
            <meta property="twitter:image" content={seoData.metaImage} />
          </>
        )} */}
        {/* {parsedStructuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(parsedStructuredData),
            }}
          />
        )} */}
        <meta name="robots" content={seoData.metaRobots} />
        <meta
          name="viewport"
          content={
            seoData?.metaViewport || "width=device-width, initial-scale=1"
          }
        />
        {seoData?.canonicalUrl && (
          <link rel="canonical" href={seoData?.canonicalUrl} />
        )}
      </Head>
      <main>
        {isloading ? (
          <LoaderContainer />
        ) : (
          <>
            <div>
              <Navbar3 />
              <Hero />
              <About />
              <WhyAdriva />
              <OurServiceSection />
              <FunFact />
              <Reviews />
              <ContactUs />
              <Footer />
              <Scrollbar />
            </div>
          </>
        )}
      </main>
    </>
  );
};
export default Home;
