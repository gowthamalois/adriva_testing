import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { LuCalendarDays } from "react-icons/lu";
import Navbar3 from "../../components/Navbar3/Navbar3";
import PageTitle from "../../components/pagetitle/PageTitle";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import dayjs from "dayjs";
import {
  fetch_data,
  fetchdataApi,
  insertpreviewdata,
  ispreview,
  loading,
  resetdata,
  setblogdata,
} from "../../redux/actions";
import apiServices from "../../services/api";
import LoaderContainer from "../../components/loader";
import magicJson from "../../magicJson/magicJson";
import { useSocket } from "../../services/socket";

function BlogPage() {
  const router = useRouter();
  const services = new apiServices();
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.data.loading);
  const { id } = router.query;
  const socket = useSocket();
  const socketdata = useSelector((state) => state.data);
  const language = useSelector((state) => state.data.selectedlanguage);
  const query = router.query;
  const blogdata = useSelector((state) => state.data.blogdata);
  console.log(blogdata, "blogdata");
  const fetchdata = useSelector((state) => state.data).mappingdata;
  
  const encrypt = (data) => {
    const iv = crypto?.randomBytes(Number(process.env.NEXT_PUBLIC_IV_LENGTH)); // Generate a random IV
    const cipher = crypto?.createCipheriv(
      process.env.NEXT_PUBLIC_ALGORITHM,
      Buffer.from(process.env.NEXT_PUBLIC_SECRET_KEY, "hex"),
      iv
    );

    let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
    encrypted += cipher.final("hex");

    return {
      iv: iv.toString("hex"), // Return IV along with encrypted data
      encryptedData: encrypted,
    };
  };
  useEffect(() => {
    if (socket) {
      socket.on("preview_data1", (data) => {
        console.log(data, "dataa");
        if (
          data?.data.length > 0 &&
          data?.data[0]?.["678e03679b1fd39fd83e1baf"]
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
    if (!router.isReady   ) return;
  
    const fetchId = "678e03679b1fd39fd83e1baf";
  
    if (query.preview === "true") {
      if (socketdata.ispreview) {
        console.log("🔵 Fetching PREVIEW DATA");
        dispatch(
          fetchdataApi(
            {
              id: fetchId,
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
        return; // Wait until preview data is ready
      }
    } else {
      console.log("🟠 Fetching NORMAL DATA");
      dispatch(
        fetchdataApi(
          {
            id: fetchId,
            pagination: {},
            slug: "",
            language: language,
            isjobs: false,
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
  

  useEffect(() => {
    const blogdetails = fetchdata["678e04129b1fd39fd83e1bb4"]?.filter(
      (i) => i.collectionData.slug == window.location.pathname.split("/")[2]
    );
    console.log(blogdetails, "blogdetails");
    dispatch(setblogdata(blogdetails));
  }, [fetchdata, socketdata.socketdata, socketdata.ispreview]);
  console.log(blogdata, "bkihh");
  console.log(fetchdata, "fetchdata");

  return (
    <>
      {isloading == true ? (
        <LoaderContainer />
      ) : (
        <>
          <main>
            <div className="blog-body">
              <Navbar3 />
              <PageTitle
                id1="5003b250-28a6-4d9e-8b6c-1e67d0d4c3d4"
                id2="a8131bdb-53c9-479e-89b2-3fea12ab37a3"
                id3="fdb4d84e-6b5f-4992-8c20-da7bd2eccdc4"
                isblog="true"
              />
              <div className="container blogdetails">
                <div className="blogdetailsbox">
                  <div>
                    <p
                      className="blogdetailsheader1"
                      style={{ textAlign: "center", margin: 0 }}
                    >
                      {blogdata?.[0]?.[
                        "5ef2b8d9-2dfe-4169-9405-9aaef8f827d3"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </p>
                    <p
                      className="blogdetailsheader2"
                      style={{ textAlign: "center", margin: 0 }}
                    >
                      {" "}
                      {blogdata?.[0]?.[
                        "fbcca921-a186-45c1-b55d-a7339f5bfe30"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </p>
                  </div>
                  <div>
                    <div
                      className="blogimage"
                      style={{
                        backgroundImage: `url("${blogdata?.[0]?.["ec328a55-5801-4c55-969f-ccbb09b49905"]?.files?.[0]?.url}")`,
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                    <div className="blogcreated">
                      <p
                        style={{
                          margin: "5px 0",
                          color: "#00000a",
                          fontWeight: 700,
                        }}
                      >
                        By {blogdata?.[0]?.["collectionData"]?.createdBy}
                      </p>
                      <p
                        style={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                          margin: "5px 0",
                        }}
                      >
                        <LuCalendarDays />{" "}
                        {dayjs(
                          blogdata?.[0]?.["collectionData"]?.modifiedAt
                        ).format("DD-MM-YYYY")}
                      </p>
                    </div>
                  </div>

                  <p
                    className="blogdesc"
                    dangerouslySetInnerHTML={{
                      __html:
                        blogdata?.[0]?.["835b3821-fcb2-41b0-9e21-3aa7f190e961"]
                          ?.value,
                    }}
                  ></p>
                </div>
              </div>
              <Footer />
              <Scrollbar />
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default BlogPage;
