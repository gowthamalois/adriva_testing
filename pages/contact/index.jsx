import dynamic from "next/dynamic";
import React, { Fragment, useEffect, useState } from "react";
const PageTitle = dynamic(
  () => import("../../components/pagetitle/PageTitle"),
  {
    ssr: false,
  }
);
const Footer = dynamic(() => import("../../components/footer/Footer"), {
  ssr: false,
});
const Scrollbar = dynamic(
  () => import("../../components/scrollbar/scrollbar"),
  {
    ssr: false,
  }
);
const Contactpage = dynamic(
  () => import("../../components/Contactpage/Contactpage"),
  {
    ssr: false,
  }
);
const Navbar3 = dynamic(() => import("../../components/Navbar3/Navbar3"), {
  ssr: false,
});
import { useDispatch, useSelector } from "react-redux";
import {
  fetchdataApi,
  insertpreviewdata,
  ispreview,
} from "../../redux/actions";
const LoaderContainer = dynamic(() => import("../../components/loader"), {
  ssr: false,
});

import apiServices from "../../services/api";
import Head from "next/head";
import { useSocket } from "../../services/socket";
import { useRouter } from "next/router";

const ContactPage = () => {
  const fetchdata = useSelector((state) => state.data);
  const isloading = useSelector((state) => state.data.loading);
  const seoData = useSelector((state) => state.data.metaData);
  const socket = useSocket();
  const router = useRouter();
  const language = useSelector((state) => state.data.selectedlanguage);
  const query = router.query;
  const socketdata = useSelector((state) => state.data);
  const dispatch = useDispatch();
   
  useEffect(() => {
    if (socket) {
      socket.on("preview_data1", (data) => {
        console.log(data, "dataa");
        if (
          data?.data?.length > 0 &&
          data?.data[0]?.["6747f87a5ed284abd5b22236"]
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
    if (!router.isReady ) return; // Ensure router is ready
      const collectionId = "6747f87a5ed284abd5b22236";
      if (typeof window !== "undefined") {
        localStorage.setItem("id", collectionId);
      }
  
      if (query.preview === "true" && socketdata.ispreview) {
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
      } else if (query.preview !== "true") {
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
    fetchdata. 
    socketdata.socketdata,
    socketdata.ispreview,
    language,
    dispatch,
    router.isReady,
    query.preview,
     
  ]);
  

  return (
    <Fragment>
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
            <Navbar3 />
            <PageTitle
              id1="7d8e92fa-cfed-4b05-ad17-b2e78e25618c"
              id2="d4034690-d7fd-4fea-af47-39349839ba8e"
              id3="0f66e307-5269-4a99-bb2b-9b3793c21bf2"
            />
            <Contactpage />
            <Footer />
            <Scrollbar />
          </>
        )}
      </main>
    </Fragment>
  );
};
export default ContactPage;
