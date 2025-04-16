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
import magicJson from "../../../magicJson/magicJson";
import apiServices from "../../../services/api";
import LoaderContainer from "../../../components/loader";
import Head from "next/head";
import { useSocket } from "../../../services/socket";
import { useRouter } from "next/router";

const HealtCare = () => {
  const fetchdata1 = useSelector((state) => state.data).mappingdata;
  const captcharef = useRef();

  const seoData = useSelector((state) => state.data.metaData);

  const isloading = useSelector((state) => state.data.loading);
  const [captchaToken, setCaptchaToken] = useState(null);
  const onVerify = (token) => {
    setCaptchaToken(token);
  };
  const language = useSelector((state) => state.data.selectedlanguage);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const socketdata = useSelector((state) => state.data);
  const socket = useSocket();
  const router = useRouter();
  const query = router.query;
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
          data?.data[0]?.["674806415ed284abd5b2223b"]
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
        pagename: "Healthcare",
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
    if (!router.isReady) return;

    const collectionId = "674806415ed284abd5b2223b";

    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== collectionId) {
        localStorage.setItem("id", collectionId);
      }
    }

    const isPreview = query.preview === "true" && socketdata.ispreview;

    dispatch(
      fetchdataApi(
        {
          id: collectionId,
          pagination: {},
          slug: "",
          language: language,
          isjobs: false,
          ...(isPreview && {
            ispreview: true,
            socketdata: [socketdata.socketdata],
          }),
        },
        dispatch
      )
    );
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
            "b8b08cb2-1036-407d-b2cf-753356c62619"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "59a27e7c-c7e4-485d-97ff-57a60dcbbb36"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "5bc946f3-3fcb-445d-832d-f7ebeaba43b5"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "af7fea53-9cb3-434c-b5d2-7acbc947f9b0"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "29919dc7-ed97-47f8-9932-4e66b9facf3e"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "9d8431c4-7144-4231-a1c0-07af447ab62b"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "8fed2fd7-d866-4b4e-98ef-3044c9f1b9ef"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "9dee4620-d60b-43a6-bdc4-ec654184e32a"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
      ]);

      setdata([
        {
          heading: fetchdata1[
            "cf5a60eb-d812-4c60-b9f9-2cd37ae2f13f"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["c715c6e7-2a05-4c38-acbe-e9bffe3dfba1"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "2a739de8-0ac4-4abd-94e4-ff412f3306f5"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["401e8079-5870-46a8-8230-3943d677eb85"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "ba1513ae-391c-4b29-b503-032a1af40a1c"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["4fae1423-b814-400c-80fa-1e05cf981e49"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "c0f18645-5acf-409d-8ab3-82d33eb78ceb"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["5913acbb-2063-415e-93cd-5a2bb8184210"]?.value?.replace(
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
              id1="ae78ac4d-e6ac-47e0-8ddf-bed5ce8766f8"
              id2="9c37a5c9-1656-4911-b0c5-666032aa87f6"
              id3="8ff6c3c9-dab9-437b-9c02-65a8725fb011"
            />
            <div className="container">
              <div className="row">
                <div className="service-content-container">
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["bc045b7c-499c-4ede-bf96-c21f47939cc8"]
                          ?.value,
                    }}
                  ></p>
                </div>
                <div className="col-6 whycontainer1">
                  <h2 className="keybenefits">
                    {fetchdata1[
                      "17ac67e3-81dd-4c88-adaf-1e3f58c8b8e5"
                    ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                  </h2>
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["241380b2-56bc-475d-bfd9-7575b9e173fb"]
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
                    <h2 className="servicecontactheader">
                      {fetchdata1[
                        "d3870d90-59d9-4556-9928-0932f1d783cc"
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
                        "a35fc1bb-ba88-4074-bc05-2e93573168c3"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </h2>
                    <div className="servicecontact">
                      <input
                        required={true}
                        placeholder={fetchdata1[
                          "b50c3f96-0058-49c7-805c-71d1d6d0988b"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        title={errors.name ? "This field is required" : ""}
                        className={`freeinput ${errors.name ? "error" : ""}`}
                      />
                      <input
                        placeholder={fetchdata1[
                          "14d2f57f-d6c6-4d56-8cab-82bbb735cdcc"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        title={errors.email ? "This field is required" : ""}
                        className={`freeinput ${errors.email ? "error" : ""}`}
                      />
                      <textarea
                        placeholder={fetchdata1[
                          "2cb2d248-0aa0-44e9-b426-a8076a3f5ad7"
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
                          "0795f427-d694-41cd-ba24-5fda22a202b9"
                        ]?.label?.replace(/<\/?[^>]+(>|$)/g, "")}
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
export default HealtCare;
