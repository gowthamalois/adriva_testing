import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import Navbar3 from "../../components/Navbar3/Navbar3";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/router";
import {
  fetchdataApi,
  insertpreviewdata,
  ispreview,
  loading,
  
  setblogdata,
} from "../../redux/actions";
import apiServices from "../../services/api";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import LoaderContainer from "../../components/loader";
import { useSocket } from "../../services/socket";
const PageTitle = dynamic(
  () => import("../../components/pagetitle/PageTitle"),
  {
    ssr: false,
  }
);

function Blog() {
  const fetchdata = useSelector((state) => state.data).mappingdata;

  const [currentPage, setCurrentPage] = useState(1);

  const blogdata = useSelector((state) => state.data.blogdata);
  const [paginateddata, setpaginateddata] = useState([]);
  const countblog = Math.ceil(blogdata?.length / 6);
  const isloading = useSelector((state) => state.data.loading);
  const language = useSelector((state) => state.data.selectedlanguage);
  const [pagination, setpagination] = useState([]);
  const router = useRouter();
  const socket = useSocket();
  const socketdata = useSelector((state) => state.data);
  const query = router.query;
  useEffect(() => {
    if (socket) {
      socket.on("preview_data1", (data) => {
        console.log(data, "dataa");
        if (
          data?.data.length > 0 &&
          data?.data[0]?.["678e03849b1fd39fd83e1bb0"]
        ) {
          // socket.emit("preview_data1", { toggle: true, data: [] });
          dispatch(insertpreviewdata(data.data));
          dispatch(ispreview(true));
          console.log(socketdata, "socketdata");
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("preview_data1");
      }
    };
  }, [socket]);
  const dispatch = useDispatch();
  
   
  useEffect(() => {
    if (!router.isReady  ) return; // Block until ready
  
    if (query.preview === "true") {
      console.log("🔵 Preview Mode API call");
      dispatch(
        fetchdataApi(
          {
            id: "678e03849b1fd39fd83e1bb0",
            pagination: {},
            slug: "",
            isjobs: false,
            language: language,
            ispreview: true, // Force true for preview mode
            socketdata: [socketdata.socketdata],
          },
          dispatch
        )
      );
    } else{
      console.log("🟠 Normal Mode API call");
      dispatch(
        fetchdataApi(
          {
            id: "678e03849b1fd39fd83e1bb0",
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
    socketdata.socketdata,
    language,
    dispatch,
    router.isReady,
    query.preview, // ✅ Needed to re-run when preview changes
     
  ]);
  useEffect(() => {
    const collection = fetchdata["678e04129b1fd39fd83e1bb4"];
    const finalarray = [];
    collection?.map((i) => {
      finalarray.push(i);
    });
    const startIndex = (currentPage - 1) * 6; // 6 items per page
    const endIndex = startIndex + 6;

    dispatch(setblogdata(finalarray));
    setpaginateddata(finalarray.slice(startIndex, endIndex));
  }, [currentPage, fetchdata, socketdata.socketdata, socketdata.ispreview]);
  paginateddata;

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const generatePagination = () => {
    const pages = [];
    const totalVisiblePages = 5; // Adjust this for more visible pages
    const firstPage = 1;
    const lastPage = countblog;

    if (countblog <= totalVisiblePages) {
      // Show all pages if the total is less than or equal to totalVisiblePages
      for (let i = 1; i <= countblog; i++) {
        pages.push(i);
      }
    } else {
      // Always show first 2 pages, current page, and last 2 pages
      pages.push(firstPage); // First page
      if (currentPage > 3) {
        pages.push("..."); // Ellipsis before current page
      }

      const startPage = Math.max(2, currentPage - 1); // Start from one page before the current
      const endPage = Math.min(countblog - 1, currentPage + 1); // End one page after the current

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < countblog - 2) {
        pages.push("..."); // Ellipsis after current page
      }
      pages.push(lastPage); // Last page
    }

    return pages;
  };

  useEffect(() => {
    setpagination(generatePagination());
  }, [countblog]);

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
                id1="20233893-8949-4525-a39b-9be678bd1c78"
                id2="1974e86a-a1c9-4d11-a4f5-af879bcbf69c"
                id3="891ef758-1a4c-419c-a4c2-3742104f00e8"
              />
              <div className="container">
                <div className="blogcontainer">
                  {paginateddata?.map((i) => (
                    <div key={i["collectionData"]?.slug} className="blog">
                      <div className="blogbox">
                        <div className="blogheader">
                          <p>
                            {dayjs(i["collectionData"]?.createdAt).format(
                              "DD-MM-YYYY"
                            )}
                          </p>
                        </div>
                        <h1>
                          {i[
                            "5ef2b8d9-2dfe-4169-9405-9aaef8f827d3"
                          ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                        </h1>
                        <p>
                          {i["fbcca921-a186-45c1-b55d-a7339f5bfe30"]?.value
                            ?.replace(/<\/?[^>]+(>|$)/g, "")
                            ?.split("")
                            .slice(0, 30)
                            .join("")}
                          ...
                        </p>
                        <a
                          onClick={() => {
                            dispatch(loading(true));
                            router.replace(
                              `/blogs/${i["collectionData"]?.slug?.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              )}`
                            );
                          }}
                        >
                          Read More <MdOutlineKeyboardArrowRight />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pagination">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {countblog > 1 && (
                    <>
                      {pagination.map((page, index) =>
                        page === "..." ? (
                          <span key={index} className="ellipsis">
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={currentPage === page ? "active" : ""}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </>
                  )}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === countblog}
                  >
                    Next
                  </button>
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

export default Blog;
