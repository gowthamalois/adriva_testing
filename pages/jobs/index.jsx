import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import Navbar3 from "../../components/Navbar3/Navbar3";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import magicJson from "../../magicJson/magicJson";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  countjobs,
  fetchdataApi,
  insertjobs,
  loading,
  setblogdata,
} from "../../redux/actions";
import CryptoJS from "crypto-js";
import apiServices from "../../services/api";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import ApplyNowForm from "../../components/jobsapplyform";
import LoaderContainer from "../../components/loader";
const PageTitle = dynamic(
  () => import("../../components/pagetitle/PageTitle"),
  {
    ssr: false,
  }
);

function Jobs() {
  const fetchdata = useSelector((state) => state.data).mappingdata[
    typeof window != "undefined" && localStorage.getItem("id")
  ];
  const [jobId, setJobId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages

  // Get the current items for the page
  const [jobsapply, setjobsapply] = useState(false);
  const [jobCode, setjobCode] = useState("");
  const countblog1 = useSelector((state) => state.data.jobscount);
  const jobsdata = useSelector((state) => state.data.jobsdata);
  const isloading = useSelector((state) => state.data.loading);
  const router = useRouter();
  const services = new apiServices();

  const closeApplyform = () => {
    setjobsapply(false);
  };
  const updateModalStateByChild = (value) => {
    setjobsapply(value);
  };
  const dispatch = useDispatch();
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "defaultsecretkey";

  const encrypt = (data) => {
    if (!SECRET_KEY) {
      throw new Error("Missing NEXT_PUBLIC_SECRET_KEY in .env.local");
    }

    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      SECRET_KEY
    ).toString();

    return encrypted; // Send this encrypted string to the backend
  };

  useEffect(() => {
    magicJson.endpoint = "jobs";
    magicJson.executor = "getactivejobsforwebsites";
    magicJson.metadata.data.filter = {
      _id: "678e039f9b1fd39fd83e1bb2",
      page: currentPage,
      limit: 6,
    };
    const Data = new FormData();
    Data.append("request", JSON.stringify(magicJson));
    dispatch(loading(true));
    services
      .fetchdata(Data)
      .then((res) => {
        dispatch(insertjobs(res.data.data[0].jobs));
        dispatch(countjobs(res.data.data[0].countResult));
        dispatch(
          fetchdataApi(
            {
              id: "678e039f9b1fd39fd83e1bb2",
              isjobs: true,
              data: res.data.data[0].pagedata,
              pagination: { page: currentPage, limit: 6 },
            },
            dispatch
          )
        );
        dispatch(loading(false));
      })
      .catch(() => dispatch(loading(false)));
    typeof window != "undefined" &&
      typeof window != "undefined" &&
      localStorage.setItem("id", "678e039f9b1fd39fd83e1bb2");
  }, [currentPage]);
  useEffect(() => {
    const collection = fetchdata?.find(
      (id) => id.id == "1c275740-8f34-43e8-afea-44bc3ecec302"
    );
    const finalarray = [];
    collection?.collectionarray?.map((i) => {
      const data = Object.values(i)[0];
      finalarray.push(data);
    });
    dispatch(setblogdata(finalarray));
  }, [currentPage, fetchdata]);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const generatePagination = () => {
    const pages = [];
    const totalVisiblePages = 5; // Adjust this for more visible pages
    const firstPage = 1;
    const lastPage = countblog1;

    if (countblog1 <= totalVisiblePages) {
      // Show all pages if the total is less than or equal to totalVisiblePages
      for (let i = 1; i <= countblog1; i++) {
        pages.push(i);
      }
    } else {
      // Always show first 2 pages, current page, and last 2 pages
      pages.push(firstPage); // First page
      if (currentPage > 3) {
        pages.push("..."); // Ellipsis before current page
      }

      const startPage = Math.max(2, currentPage - 1); // Start from one page before the current
      const endPage = Math.min(countblog1 - 1, currentPage + 1); // End one page after the current

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < countblog1 - 2) {
        pages.push("..."); // Ellipsis after current page
      }
      pages.push(lastPage); // Last page
    }

    return pages;
  };

  const pagination = generatePagination();

  console.log("jobsdata", jobsdata);

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
                id1="ad1ea050-7616-4c46-ab05-3bd7f8752be7"
                id2="c0cc8821-4780-49dc-9d42-d2f59fcad5c7"
                id3="d357b44c-46cd-4a0a-9967-0f91c09511ec"
              />
              <div className="container">
                <div className="blogcontainer">
                  {jobsdata.map((i, index) => (
                    <div
                      key={index}
                      className="blog"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        // Only run if the click didn't originate from the "Apply now" link
                        if (e.target.closest(".apply-now-link")) return;

                        e.stopPropagation();
                        e.preventDefault();
                        dispatch(loading(true));
                        const data = encrypt(i._id);
                        router.push({
                          pathname: `/jobs/${encodeURIComponent(data)}`,
                        });
                      }}
                    >
                      <div className="blogbox">
                        <div className="blogheader">
                          <p>{dayjs(i.createdAt).format("DD-MM-YYYY")}</p>
                          <FaEye
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              dispatch(loading(true));
                              const data = encrypt(i._id);
                              router.push({
                                pathname: `/jobs/${encodeURIComponent(data)}`,
                              });
                            }}
                          />
                        </div>

                        <h1>{i.title}</h1>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: i.jobDescription
                              ? i.jobDescription.length > 30
                                ? i.jobDescription.slice(0, 30) + "..."
                                : i.jobDescription
                              : "",
                          }}
                        ></p>

                        <a
                          className="apply-now-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setJobId(i._id);
                            setjobsapply(true);
                            setjobCode(i.jobCode);
                          }}
                        >
                          Apply now <MdOutlineKeyboardArrowRight />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                {countblog1 > 1 && (
                  <>
                    <div className="pagination">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>

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

                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === countblog1}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </div>
              <Footer />
              <Scrollbar />
              {jobsapply && (
                <ApplyNowForm
                  show={jobsapply}
                  onClose={closeApplyform}
                  updateModalStateByChild={updateModalStateByChild}
                  jobId={jobId}
                  jobCode={jobCode}
                ></ApplyNowForm>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Jobs;
