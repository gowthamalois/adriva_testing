import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"), {
  ssr: false,
});
const PageTitle = dynamic(
  () => import("../../../components/pagetitle/PageTitle"),
  {
    ssr: false,
  }
);
const Footer = dynamic(() => import("../../../components/footer/Footer"), {
  ssr: false,
});
const Scrollbar = dynamic(
  () => import("../../../components/scrollbar/scrollbar"),
  {
    ssr: false,
  }
);
import { useDispatch, useSelector } from "react-redux";
import {
  fetchdataApi,
  insertpreviewdata,
  ispreview,
  loading,
} from "../../../redux/actions";
const Navbar3 = dynamic(() => import("../../../components/Navbar3/Navbar3"), {
  ssr: false,
});
import { toast } from "react-toastify";
import apiServices from "../../../services/api";
import magicJson from "../../../magicJson/magicJson";
import LoaderContainer from "../../../components/loader";
import Head from "next/head";
import { useSocket } from "../../../services/socket";
import { useRouter } from "next/router";

const BusinessContinuity = () => {
  const fetchdata1 = useSelector((state) => state.data).mappingdata;
  const captcharef = useRef();
  const socket = useSocket();
  const socketdata = useSelector((state) => state.data);
  const router = useRouter();
  const language = useSelector((state) => state.data.selectedlanguage);
  const query = router.query;
  const isloading = useSelector((state) => state.data.loading);
  const seoData = useSelector((state) => state.data.metaData);
  const [captchaToken, setCaptchaToken] = useState(null);
  const onVerify = (token) => {
    setCaptchaToken(token);
  };

  
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const services = new apiServices();

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  useEffect(() => {
    if (socket) {
      socket.on("preview_data1", (data) => {
        console.log(data, "dataa");
        if (
          data?.data?.length > 0 &&
          data?.data[0]?.["67480bd15ed284abd5b2223e"]
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error for the field being updated
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate inputs
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      message: !formData.message.trim(),
    };

    if (newErrors.name) {
      toast.error("Name is required");
      return;
    }
    if (newErrors.email) {
      toast.error("Email is required");
      return;
    }
    if (newErrors.message) {
      toast.error("Message is required");
      return;
    }
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }
    setErrors(newErrors);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = (email) => emailRegex.test(email);
    if (!validateEmail(formData.email)) {
      newErrors.email = true;
    }
    if (newErrors.email) {
      toast.error("Email Is Invalid");
      return;
    }
    // Check if there are no errors
    if (!Object.values(newErrors).some((error) => error)) {
      magicJson.endpoint = "forms";
      magicJson.executor = "createContactUsResponses";
      magicJson.data = {
        ...formData,
        pagename: "Business Continuity",
        isconsultance: true,
      };
      const Data = new FormData();
      Data.append("request", JSON.stringify(magicJson));

      // Call API
      dispatch(loading(true));
      services
        .fetchdata(Data)
        .then((res) => {
          if (res) {
            toast.success(
              "Thank you for contacting us! We will be in touch with you shortly"
            );
            if (captcharef.current) {
              captcharef.current.resetCaptcha();
            }
            setCaptchaToken("");
            setFormData({ name: "", email: "", message: "" }); // Reset form
            setErrors({ name: false, email: false, message: false }); // Reset errors
            dispatch(loading(false));
          } else {
            toast.error("Failed to save ContactUs response");
          }
        })
        .catch((err) => dispatch(loading(false)));
    }
  };
   
   
  useEffect(() => {
    if (!router.isReady  ) return; // Ensure readiness
  
    const collectionId = "67480bd15ed284abd5b2223e";
  
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("id")) {
        localStorage.setItem("id", collectionId); // Set only if not already set
      }
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
     
    router.isReady,
    query.preview,
    socketdata.ispreview,
    socketdata.socketdata,
    dispatch,
    language,
  ]);
  
  const [data, setdata] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // Update `faqs` and `data` when `fetchdata1` changes
  useEffect(() => {
    if (fetchdata1) {
      setFaqs([
        {
          question: fetchdata1[
            "1d6f8422-d8bb-4e9a-a1e3-434f703cc4ef"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "7c06e1ed-a2bb-4c99-a73d-2673cf0a1321"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "eeb4aecf-2498-4afb-9cf8-24e0bc885562"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "5f2bbfcb-a88f-4fff-b75f-8ab702c0c2a5"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "0d4cd0d8-7004-4c8d-8489-b58164234f59"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "97d4006c-df35-44d7-bc1b-4a448344fcba"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "2e928c81-412a-47ad-a70b-a5bbd6db6714"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "0e3cc81d-e7a8-49e6-acef-eda9d7683c4a"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
      ]);

      setdata([
        {
          heading: fetchdata1[
            "b39bef17-011f-4f91-9184-d57994927f79"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["3bb62bd1-be24-40cc-b32c-de9b6f30aa7b"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "26b34844-320b-43ae-bc64-e7a4f40f5715"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["634b0782-e87c-4c1c-907c-80143c673e53"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "7f346871-adb5-4481-bc2e-03072ec0dd52"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["879637e8-3a20-43c7-b0a7-71a113407ed1"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "4e65de62-e95d-4b85-9e98-ccd28125067b"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["6285ffaa-187b-485b-b82e-e02f8f1a6a4c"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
      ]);
    }
  }, [fetchdata1]);

  const toggleFaq = (index) => {
    setFaqs(
      faqs.map((faq, i) => ({
        ...faq,
        isOpen: i === index ? !faq.isOpen : false, // Close others and toggle the selected one
      }))
    );
  };

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
            <Navbar3 />
            <PageTitle
              id1="8f9466e9-ae26-498b-9d3d-413e9159c90b"
              id2="29b6f4d7-f36f-4b67-9af5-5f00da3771d1"
              id3="795351c1-3441-4872-ab98-f02c6a536770"
            />
            <div className="container">
              <div className="row">
                <div className="service-content-container">
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["22d7edbf-7f51-4758-847e-c98ee920d604"]
                          ?.value,
                    }}
                  ></p>
                </div>
                <div className="col-6 whycontainer1">
                  <h2 className="keybenefits">
                    {fetchdata1[
                      "ea955786-eb74-4148-900e-5c6c0a5a2a5e"
                    ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                  </h2>
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["f1d27a8e-e395-4489-88dc-48d5e33bd563"]
                          ?.value,
                    }}
                  ></p>
                </div>
                <div className="col-12">
                  <div className="servicecontainer">
                    {data.map((i, index) => (
                     
                        <div
                        key={`services-${index}`}
                          className={`serviceboxes ${
                            [0, 3].includes(index) ? "servicesboxcolour" : ""
                          }`}
                          onMouseOver={() =>
                            setdata(
                              data.map((el, idx) => ({
                                ...el,
                                active: idx === index,
                              }))
                            )
                          }
                          onMouseLeave={() =>
                            setdata(
                              data.map((el) => ({
                                ...el,
                                active: false,
                              }))
                            )
                          }
                        >
                          <h2
                            className={`servicesboxh1 ${
                              i.active ? "serviceboxescolourchange" : ""
                            }`}
                          >
                            {i.heading}
                          </h2>
                          <p className="servicesbox_desc">{i.p}</p>
                        </div>
                     
                    ))}
                  </div>
                </div>
                <div className="col-6 whycontainer3">
                  <div className="faq-container">
                    <h2 className="servicecontactheader">
                      {fetchdata1[
                        "8c0f8c19-b7e5-49d7-9062-82383300e441"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </h2>{" "}
                    <div className="faq-list">
                      {faqs.map((faq, index) => (
                        <div key={`faq-${index}`}  className={`faq-item `}>
                          <button
                            className={`faq-question ${
                              faq.isOpen ? "boxopen" : ""
                            }`}
                            onClick={() => toggleFaq(index)}
                          >
                            <span className="faq-icon">
                              {faq.isOpen ? "-" : "+"}
                            </span>
                            {faq.question}
                          </button>
                          <div
                            className={`faq-answer ${faq.isOpen ? "open" : ""}`}
                          >
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-6 whycontainer3">
                  <div className="servicecontactcontainer">
                    <h2 className="servicecontactheader">
                      {fetchdata1[
                        "dda07a67-c3cb-448a-a1a0-abd8a6c8ed83"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </h2>
                    <div className="servicecontact">
                      <input
                        required={true}
                        placeholder={fetchdata1[
                          "87bdd58d-fc20-490b-903c-9fa8e8e100ea"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        title={errors.name ? "This field is required" : ""}
                        className={`freeinput ${errors.name ? "error" : ""}`}
                      />
                      <input
                        placeholder={fetchdata1[
                          "c3b007d7-383c-4c89-aad5-8ec64f24919b"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        title={errors.email ? "This field is required" : ""}
                        className={`freeinput ${errors.email ? "error" : ""}`}
                      />
                      <textarea
                        placeholder={fetchdata1[
                          "7e665665-28e0-475c-a355-78344d8e112f"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        title={errors.message ? "This field is required" : ""}
                        className={`freeinput ${errors.message ? "error" : ""}`}
                      />
                      <div className="custom-hcaptcha-container">
                        <HCaptcha
                          sitekey="16760186-0b76-4500-9b72-e9e230001c30" // Replace with your hCaptcha site key
                          onVerify={onVerify}
                          ref={captcharef}
                          // Callback function for handling the token
                        />
                      </div>
                      <button
                        className="servicebutton signupbtn"
                        onClick={handleSubmit}
                      >
                        {fetchdata1[
                          "6d38fe85-2c6f-4632-b247-adc0aa58334c"
                        ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
            <Scrollbar />
          </>
        )}
      </main>
    </>
  );
};
export default BusinessContinuity;
