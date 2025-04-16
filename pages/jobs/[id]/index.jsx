import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import Navbar3 from "../../../components/Navbar3/Navbar3";
import PageTitle from "../../../components/pagetitle/PageTitle";
import Footer from "../../../components/footer/Footer";
import Scrollbar from "../../../components/scrollbar/scrollbar";
import { fetchdataApi, insertjobs, setblogdata } from "../../../redux/actions";
import apiServices from "../../../services/api";
import LoaderContainer from "../../../components/loader";
import magicJson from "../../../magicJson/magicJson";
import Link from "next/link";
import ApplyNowForm from "../../../components/jobsapplyform";
import CryptoJS from "crypto-js";

function JobsPage() {
  const jobsdata = useSelector((state) => state.data.jobsdata);

  const [jobId, setJobId] = useState("");
  const [jobsapply, setjobsapply] = useState(false);
  const [jobCode, setjobCode] = useState("");
  const services = new apiServices();
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.data.loading);
  const fetchdata = useSelector((state) => state.data).mappingdata;

  const closeApplyform = () => {
    setjobsapply(false);
  };
  const updateModalStateByChild = (value) => {
    setjobsapply(value);
  };
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "defaultsecretkey";

  const decrypt = (encryptedData) => {
    if (!SECRET_KEY) {
      throw new Error("Missing SECRET_KEY in .env");
    }

    try {
      // Check if the data looks encrypted (starts with "U2FsdGVkX1", a common CryptoJS prefix)
      if (
        typeof encryptedData === "string" &&
        encryptedData.startsWith("U2FsdGVkX1")
      ) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedData) {
          throw new Error("Decryption failed: Invalid data or key.");
        }

        return JSON.parse(decryptedData);
      } else {
        // If it's not encrypted, return it as-is
        return encryptedData;
      }
    } catch (error) {
      console.error("Decryption Error:", error.message);
      throw new Error("Decryption failed.");
    }
  };

  useEffect(() => {
    const decryptdata = decrypt(
      decodeURIComponent(window.location.pathname.split("/")[2])
    );
    magicJson.endpoint = "jobs";
    magicJson.executor = "getactivejobsforwebsites";
    magicJson.metadata.data.filter = {
      _id: "678e03919b1fd39fd83e1bb1",
      jobid: decryptdata,
    };
    const Data = new FormData();
    Data.append("request", JSON.stringify(magicJson));
    services.fetchdata(Data).then((res) => {
      dispatch(insertjobs(res.data.data[0].jobs));
      dispatch(
        fetchdataApi(
          {
            id: "678e03919b1fd39fd83e1bb1",
            isjobs: true,
            data: res.data.data[0].pagedata,
          },
          dispatch
        )
      );
    });
    typeof window != "undefined" &&
      localStorage.setItem("id", "678e03919b1fd39fd83e1bb1");
  }, []);
  

  
  const formatTextWithLineBreaks = (text) => {
    const formatted = text
      ?.split("<p>")?.[1]
      ?.split("</p>")?.[0]
      ?.split("\n")
      .map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ));

    // Log the array of JSX elements (only for debugging)
    formatted?.forEach((item, index) => {});

    return formatted;
  };


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
                id1="1bcd5212-1e64-411d-8976-9e08f31ebc4b"
                id2="49170e8d-5bb3-47d3-8e45-3340799fc016"
                id3="c4fd5c84-9cca-4925-99d7-d7e72c797389"
                isjobs="true"
              />
              <div className="container blogdetails">
                <div className="blogdetailsbox">
                  {jobsdata[0]?.image?.url && (
                    <div
                      className="blogimage"
                      style={{
                        backgroundImage: `url("${jobsdata[0]?.image?.url}")`,
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  )}
                  <p className="jobdetailstitle" style={{ margin: 0 }}>
                    {jobsdata[0]?.title}
                  </p>
                  <div className="jobdesc">
                    <div>
                      <p className="jobdesc1" style={{ margin: 0 }}>
                        Experience
                      </p>
                      <p className="jobdesc2" style={{ margin: 0 }}>
                        {jobsdata[0]?.minExp ? `${jobsdata[0]?.minExp}` : 0}-
                        {`${jobsdata[0]?.maxExp}`} years
                      </p>
                    </div>
                    <div>
                      <p className="jobdesc1" style={{ margin: 0 }}>
                        Location
                      </p>
                      <p className="jobdesc2" style={{ margin: 0 }}>
                        {`${jobsdata[0]?.city && `${jobsdata[0]?.city},`}`}
                        {`${jobsdata[0]?.state && `${jobsdata[0]?.state},`}`}
                        {`${jobsdata[0]?.country}`}
                      </p>
                    </div>
                    <div>
                      <p className="jobdesc1" style={{ margin: 0 }}>
                        Offer Salary
                      </p>
                      <p className="jobdesc2" style={{ margin: 0 }}>
                        {`${jobsdata[0]?.currency}`}{" "}
                        {`${jobsdata[0]?.minSalary}`}-
                        {`${jobsdata[0]?.maxSalary}`}/
                        {`${jobsdata[0]?.payscale}`}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <p
                        className="jobdescheader"
                        style={{ margin: "0 0 10px 0" }}
                      >
                        Job Description
                      </p>
                      <p className="blogdesc">
                        {formatTextWithLineBreaks(jobsdata[0]?.jobDescription)}
                      </p>
                    </div>

                    <div>
                      <p
                        className="jobdescheader"
                        style={{ margin: "0 0 10px 0" }}
                      >
                        Skills
                      </p>
                      <div className="skillsbox">
                        {jobsdata[0]?.skills.map((i) => (
                          <>
                            <p className="skills">{i}</p>
                          </>
                        ))}
                      </div>
                    </div>
                    <div className="sharebtnbox">
                      {fetchdata["c103053e-dd04-49fb-b2f3-cceb4e18c20d"]?.value}
                      <div className="sharebtnbox">
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            fetchdata["d06b8fa7-fa33-4dbd-901a-d86080f8fdb9"]?.value || ""
                          }
                          className="facebookbtn"
                        >
                          <FaFacebookF /> Facebook
                        </Link>
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            fetchdata["50cd68eb-e097-404c-bbb2-8920121649f6"]?.value || ""
                          }
                          className="linkdeinbtn"
                        >
                          <FaLinkedinIn /> Linkedin
                        </Link>
                      </div>
                    </div>
                    <a
                      className="facebookbtn"
                      style={{ background: "#ea6a20" }}
                      onClick={() => {
                        setJobId(jobsdata[0]._id);
                        setjobsapply(true);
                        setjobCode(jobsdata[0].jobCode);
                      }}
                    >
                      Apply now{" "}
                    </a>
                  </div>
                </div>
              </div>
              <Footer />
              <Scrollbar />
            </div>
          </main>
          {jobsapply && (
            <ApplyNowForm
              show={jobsapply}
              onClose={closeApplyform}
              updateModalStateByChild={updateModalStateByChild}
              jobId={jobId}
              jobCode={jobCode}
            ></ApplyNowForm>
          )}
        </>
      )}
    </>
  );
}

export default JobsPage;
