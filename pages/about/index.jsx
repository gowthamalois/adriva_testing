import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const Navbar3 = dynamic(() => import("../../components/Navbar3/Navbar3"), {
  ssr: false,
});
const PageTitle = dynamic(
  () => import("../../components/pagetitle/PageTitle"),
  {
    ssr: false,
  }
);
const About4 = dynamic(() => import("../../components/about4/about4"), {
  ssr: false,
});
const TeamSection = dynamic(
  () => import("../../components/TeamSection/TeamSection"),
  {
    ssr: false,
  }
);
const WhyAbout = dynamic(() => import("../../components/whyabout/whyabout"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../components/footer/Footer"), {
  ssr: false,
});
const SignUp = dynamic(() => import("../../components/about/signup"), {
  ssr: false,
});
import apiServices from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchdataApi,
  insertpreviewdata,
  ispreview,
} from "../../redux/actions";
const ABoutReviews = dynamic(
  () => import("../../components/reviews/aboutReviews"),
  {
    ssr: false,
  }
);
const Scrollbar = dynamic(
  () => import("../../components/scrollbar/scrollbar"),
  {
    ssr: false,
  }
);
import LoaderContainer from "../../components/loader";
import Head from "next/head";
import { useSocket } from "../../services/socket";
import { useRouter } from "next/router";

const AboutPage = (props) => {
  const services = new apiServices();
  const router = useRouter();
  const query = router.query;
  const socket = useSocket();
  const language = useSelector((state) => state.data.selectedlanguage);
  const socketdata = useSelector((state) => state.data);
  const isloading = useSelector((state) => state.data.loading);
  const seoData = useSelector((state) => state.data.metaData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on("preview_data1", (data) => {
        console.log(data, "dataa");
        if (
          data?.data?.length > 0 &&
          data?.data[0]?.["6747efec5ed284abd5b22223"]
        ) {
          socket.emit("preview_data1", { toggle: true, data: [] });
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
    if (!router.isReady) return;

    const collectionId = "6747efec5ed284abd5b22223";

    if (typeof window !== "undefined") {
      localStorage.setItem("id", collectionId);
    }

    if (query.preview === "true") {
      if (socketdata.ispreview) {
        console.log("🔵 Fetching PREVIEW DATA");
        dispatch(
          fetchdataApi(
            {
              id: collectionId,
              pagination: {},
              slug: "",
              isjobs: false,
              language: language,
              ispreview: true,
              socketdata: [socketdata.socketdata],
            },
            dispatch
          )
        );
      } else {
        console.log("⏳ Waiting for preview socket data...");
        return; // Wait for socket to provide preview data
      }
    } else {
      console.log("🟠 Fetching NORMAL DATA");
      dispatch(
        fetchdataApi(
          {
            id: collectionId,
            pagination: {},
            slug: "",
            isjobs: false,
            language: language,
          },
          dispatch
        )
      );
    }
  }, [
    socketdata.socketdata,
    socketdata.ispreview,
    language,
    dispatch,
    router.isReady,
    query.preview,
  ]);

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
        {isloading == true ? (
          <LoaderContainer />
        ) : (
          <>
            <div>
              <Navbar3 />
              <PageTitle
                id1="449b5e8c-b64c-42c6-acd3-957e6e3f35cb"
                id2="b8ebae01-2179-4e6b-a0c3-d85cbab3da67"
                id3="7dd097f8-e04c-457b-9c55-bd6d36866123"
              />
              {/* <MissionVission /> */}
              <About4 />
              {/* <Skill2 /> */}
              <WhyAbout />
              <TeamSection tClass={"wpo-team-section-s3"} />
              {/* <Testimonial /> */}
              <ABoutReviews />
              {/* <FunFact fClass={'wpo-fun-fact-section-s2 pt-0'} /> */}
              <SignUp />
              {/* <Footer2 /> */}
              {/* <Scrollbar /> */}
              <Footer />
              <Scrollbar />
            </div>
          </>
        )}
      </main>
    </>
  );
};
export default AboutPage;
