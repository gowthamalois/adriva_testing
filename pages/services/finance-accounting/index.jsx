import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
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
import {
  fetchdataApi,
  insertpreviewdata,
  ispreview,
  loading,
} from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
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

const FinanceAccounting = () => {
  const fetchdata1 = useSelector((state) => state.data).mappingdata;
  const captcharef = useRef();
  const router = useRouter();
  const language = useSelector((state) => state.data.selectedlanguage);
  const query = router.query;
  const seoData = useSelector((state) => state.data.metaData);
  const [captchaToken, setCaptchaToken] = useState(null);
  const onVerify = (token) => {
    setCaptchaToken(token);
  };

  const isloading = useSelector((state) => state.data.loading);
  const socket = useSocket();

  const socketdata = useSelector((state) => state.data);

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

  useEffect(() => {
    if (socket) {
      socket.on("preview_data1", (data) => {
        console.log(data, "dataa");
        if (
          data?.data?.length > 0 &&
          data?.data[0]?.["6748085a5ed284abd5b2223c"]
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

    setErrors(newErrors);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = (email) => emailRegex.test(email);
    if (!validateEmail(formData.email)) {
      newErrors.email = true;
    }
    if (newErrors.email) {
      toast.error("Email is invalid");
      return;
    }
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }
    // Check if there are no errors
    if (!Object.values(newErrors).some((error) => error)) {
      magicJson.endpoint = "forms";
      magicJson.executor = "createContactUsResponses";
      magicJson.data = {
        ...formData,
        pagename: "Finance Accounting",
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
            false;
          } else {
            toast.error("Failed to save ContactUs response");
          }
        })
        .catch((err) => dispatch(loading(false)));
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    const collectionId = "6748085a5ed284abd5b2223c";

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
            "e384d027-33e5-46ad-875c-d78e32cd8499"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "3d04a4d3-ebf9-49c8-843c-17c9843a43f2"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "d46464f1-3133-4591-b001-7a77996cc086"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "182fc59d-5b5d-4e12-b9cf-871c961c1940"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "e4d12efc-7a46-4fdc-bcd7-e645de64f807"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "582b2495-01af-4d73-be5e-fab9aabc966f"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "4d6737aa-3059-4cbb-81b1-aa0a070cbeda"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "d472b563-06b4-4529-8121-fe00ffc3f379"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
      ]);

      setdata([
        {
          heading: fetchdata1[
            "3853d623-2aa9-40a7-a08d-feb97d3132ac"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["f50a3c2b-75f9-4564-9d78-3f49a6e1492d"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "5125828b-b298-4b3e-a2db-29a02c7b0e75"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["b2448ce9-2d8a-4af8-8e98-888cc538374e"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "dcdef87a-895d-4eee-bda7-338228bd2cf3"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["1963ccd6-67b4-4ed9-901a-38d531272d91"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "8b546921-9768-427d-856f-bfcda00b35d8"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["1bfb1aab-9a7f-4ccc-be6a-b09f86260de8"]?.value?.replace(
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
              id1="f5a8a530-e98b-4955-8f69-1dd5456aae43"
              id2="f3a850eb-892e-415c-a464-4b4019eabaed"
              id3="4afa68bb-ffb3-48a2-86c7-e76880fbc150"
            />
            <div className="container">
              <div className="row">
                <div className="service-content-container">
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["1a377706-69e6-4035-a592-3c9ab9d69658"]
                          ?.value,
                    }}
                  ></p>
                </div>
                <div className="col-6 whycontainer1">
                  <h2 className="keybenefits">
                    {fetchdata1[
                      "7960d759-e5de-42d2-9f6a-87299a5a1441"
                    ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                  </h2>
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["83c100e7-7b34-41dd-b71c-90ee5b39937f"]
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
                        "69c70989-babd-4fcb-9aad-06cc381a6c86"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </h2>
                    <div className="faq-list">
                      {faqs.map((faq, index) => (
                        <div key={`faq-${index}`} className={`faq-item `}>
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
                        "7b832d6e-5454-470c-82be-2373b052c715"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </h2>
                    <div className="servicecontact">
                      <input
                        required={true}
                        placeholder={fetchdata1[
                          "55f0995b-83e4-4285-8b8f-95eea0d98c8f"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        title={errors.name ? "This field is required" : ""}
                        className={`freeinput ${errors.name ? "error" : ""}`}
                      />
                      <input
                        placeholder={fetchdata1[
                          "e12716bf-f103-4f98-a4c4-35f5107e4388"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        title={errors.email ? "This field is required" : ""}
                        className={`freeinput ${errors.email ? "error" : ""}`}
                      />
                      <textarea
                        placeholder={fetchdata1[
                          "dd39d55b-af47-4462-b49c-45d87e5165a0"
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
                          "5ed66d22-a32a-4fb2-9b38-ff42b4efe892"
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
export default FinanceAccounting;
