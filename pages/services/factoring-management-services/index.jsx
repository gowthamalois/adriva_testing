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

const FactoringManagement = () => {
  const fetchdata1 = useSelector((state) => state.data).mappingdata;
  const socket = useSocket();
  const language = useSelector((state) => state.data.selectedlanguage);
  const captcharef = useRef();
  const seoData = useSelector((state) => state.data.metaData);
  const socketdata = useSelector((state) => state.data);

  const isloading = useSelector((state) => state.data.loading);
  const [captchaToken, setCaptchaToken] = useState(null);
  const onVerify = (token) => {
    setCaptchaToken(token);
  };
  const router = useRouter();
  const query = router.query;

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
          data?.data[0]?.["67480cc15ed284abd5b2223f"]
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
        pagename: "Factoring Management",
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
    if (!router.isReady) return; // Ensure router and token are ready

    const collectionId = "67480cc15ed284abd5b2223f";

    if (typeof window !== "undefined") {
      if (!localStorage.getItem("id")) {
        localStorage.setItem("id", collectionId); // Only set once
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
            "9acc4ee3-c7aa-4132-8c50-0b4d2b632534"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "7c5f8f70-58ee-4f48-af00-a9d7a0efddd3"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "635c5c5d-6a62-4056-ad28-698f5d1db450"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "6418aa82-24d4-445b-be67-e367ceb9e971"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "8912fed2-f91e-4e6f-948d-fff130b78ba7"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "4d19387b-9996-43be-9f0c-8bcd5f1b2ad0"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "95f61746-67a9-4e32-985c-b8760d2ab62c"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "b11034f3-1cbe-4082-b648-55523bb00e1f"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
      ]);

      setdata([
        {
          heading: fetchdata1[
            "53bf020c-b8c7-4486-b60f-284645f13e55"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["8326582f-03dc-44da-b865-3ad4e1f06a27"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "b8c8f3b5-aaa6-4094-87d1-6511502127ab"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["e293fd16-e111-4b2c-9a61-0fc12d72aafa"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "9f18ed8c-c479-4ccb-89c7-2a3cccda7277"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["9ba205eb-3988-4d32-ae7d-ae0de84ce196"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "9cac2542-9533-4a5e-ab91-711d3fc1b881"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["33e4f357-3323-4ce5-a983-6d9bdddd50ea"]?.value?.replace(
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
              id1="5ce9d110-4d0f-41c2-a46e-cb62405f7f84"
              id2="d3d55f99-4ad9-4621-af8b-a505f04a79d7"
              id3="6e2f09e4-8b9e-44a3-83a7-4abc8d8b2103"
            />
            <div className="container">
              <div className="row">
                <div className="service-content-container">
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["15992d0f-49fc-47dc-bd4a-fb99a306ec2a"]
                          ?.value,
                    }}
                  ></p>
                </div>
                <div className="col-6 whycontainer1">
                  <h2 className="keybenefits">
                    {fetchdata1[
                      "a6ef4d85-bc2a-4f00-9d86-168e67cc40c1"
                    ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                  </h2>
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["c63c34dd-8776-4861-a2b1-eaeac56b975d"]
                          ?.value,
                    }}
                  ></p>
                </div>
                <div className="col-12">
                  <div className="servicecontainer">
                    {data.map((i, index) => (
                      <>
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
                      </>
                    ))}
                  </div>
                </div>
                <div className="col-6 whycontainer3">
                  <div className="faq-container">
                    <h2 className="servicecontactheader">Why Choose Us</h2>
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
                        "1f355c79-aa63-4b2c-bcfb-1213332c1927"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </h2>
                    <div className="servicecontact">
                      <input
                        required={true}
                        placeholder={fetchdata1[
                          "7465656d-a0b1-4a0f-b9e0-d4d2e63853cc"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        title={errors.name ? "This field is required" : ""}
                        className={`freeinput ${errors.name ? "error" : ""}`}
                      />
                      <input
                        placeholder={fetchdata1[
                          "8de9da9d-07f4-4831-81f7-4dbf01b3b017"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        title={errors.email ? "This field is required" : ""}
                        className={`freeinput ${errors.email ? "error" : ""}`}
                      />
                      <textarea
                        placeholder={fetchdata1[
                          "7db28ce9-b0a1-42bc-83ff-327e507b65ec"
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
                          "b8db8658-033e-4bb6-a69e-8cf139ddcc36"
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
export default FactoringManagement;
