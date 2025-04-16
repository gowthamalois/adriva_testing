import dynamic from "next/dynamic";
const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"), {
  ssr: false,
});
import { useEffect, useRef, useState } from "react";
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
import apiServices from "../../../services/api";
import magicJson from "../../../magicJson/magicJson";
import { toast } from "react-toastify";
import LoaderContainer from "../../../components/loader";
import Head from "next/head";
import { useSocket } from "../../../services/socket";
import { useRouter } from "next/router";

const HumanResources = () => {
  const fetchdata1 = useSelector((state) => state.data).mappingdata;
  const captcharef = useRef();
  const [captchaToken, setCaptchaToken] = useState(null);
  const onVerify = (token) => {
    setCaptchaToken(token);
  };
  const language = useSelector((state) => state.data.selectedlanguage);

  const seoData = useSelector((state) => state.data.metaData);
  const isloading = useSelector((state) => state.data.loading);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const socket = useSocket();

  const socketdata = useSelector((state) => state.data);

  const services = new apiServices();
  const router = useRouter();
  const query = router.query;
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
          data?.data[0]?.["6747f25c5ed284abd5b2222a"]
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
        pagename: "Human Resources",
        isconsultance: true,
      };
      const Data = new FormData();
      Data.append("request", JSON.stringify(magicJson));

      // Call API
      dispatch(loading(true));

      services.fetchdata(Data).then((res) => {
        if (res) {
          toast.success(
            "Thank you for contacting us! We will be in touch with you shortly"
          );
          if (captcharef.current) {
            captcharef.current.resetCaptcha();
          }
          setCaptchaToken("");
          dispatch(loading(false));
          setFormData({ name: "", email: "", message: "" }); // Reset form
          setErrors({ name: false, email: false, message: false }); // Reset errors
        } else {
          dispatch(loading(false));
          toast.error("Failed to save ContactUs response");
        }
      });
    }
  };
 
  useEffect(() => {
    if (!router.isReady  ) return;
  
    const collectionId = "6747f25c5ed284abd5b2222a";
  
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== collectionId) {
        localStorage.setItem("id", collectionId);
      }
    }
  
    const isPreview = query.preview === "true" || socketdata.ispreview;
    console.log(isPreview,"isPreview")
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
  

  const [faqs, setFaqs] = useState([]);
  const [data, setdata] = useState([]);
  useEffect(() => {
    setdata([
      {
        heading: fetchdata1[
          "cbaf4ebe-4044-467f-9fa8-2381f080572a"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        p: fetchdata1["c9332902-067f-4962-a26a-d949aa898760"]?.value?.replace(
          /<\/?[^>]+(>|$)/g,
          ""
        ),
        active: false,
      },
      {
        heading: fetchdata1[
          "decc07ba-157a-4183-9879-3a18ea9b9b9b"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        p: fetchdata1["87730353-c0c5-4198-9771-10f3b9585bd6"]?.value?.replace(
          /<\/?[^>]+(>|$)/g,
          ""
        ),
        active: false,
      },
      {
        heading: fetchdata1[
          "4896a673-ac59-40ff-b009-96ef449309cf"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        p: fetchdata1["e799928b-948c-4bf0-84cb-de6e535c0be9"]?.value?.replace(
          /<\/?[^>]+(>|$)/g,
          ""
        ),
        active: false,
      },
      {
        heading: fetchdata1[
          "53b2f800-9aa6-4e98-beb4-ca83a948eb65"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        p: fetchdata1["08ff50bc-f19d-4183-b625-a04ce65d535c"]?.value?.replace(
          /<\/?[^>]+(>|$)/g,
          ""
        ),
        active: false,
      },
    ]);

    setFaqs([
      {
        question: fetchdata1[
          "6401faa5-518d-4961-9522-c339bbce390b"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        answer: fetchdata1[
          "17daf748-3972-4e16-b5d5-896ec9093798"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        isOpen: false,
      },
      {
        question: fetchdata1[
          "c50332fc-7e7d-4aa5-ab27-bd22967013b6"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        answer: fetchdata1[
          "6ed4f231-2808-496d-b477-04780d12e262"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        isOpen: false,
      },
      {
        question: fetchdata1[
          "60c09c93-8ef0-4813-af24-091b370de1de"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        answer: fetchdata1[
          "5a51be97-2482-456f-87f6-fb9ab16bc91c"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        isOpen: false,
      },
      {
        question: fetchdata1[
          "6ce91926-d466-48ff-8523-d433ad538238"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        answer: fetchdata1[
          "73854f1e-df67-4383-9e26-4105a0f2abdb"
        ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
        isOpen: false,
      },
    ]);
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
              id1="576ea399-9a82-491d-bad2-5bce446185ee"
              id2="662b0fda-c279-491a-bdc1-2f9dc7f92f5d"
              id3="11c68802-6537-42ea-91cd-0a69ac9a0048"
            />
            <div className="container">
              <div className="row">
                <div className="service-content-container">
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["dc713914-1b6e-4622-93cd-4b3b0a784753"]
                          ?.value,
                    }}
                  ></p>
                </div>
                <div className="col-6 whycontainer1 ">
                  <h2 className="keybenefits">
                    {" "}
                    {fetchdata1["6bf12c47-7134-4110-b96e-12d1ac26831b"]?.value}
                  </h2>
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["b1ee8e7d-a957-43d5-bb92-25df58a38efd"]
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
                      {" "}
                      {fetchdata1[
                        "8a735762-bfdc-4b82-bf09-92d1b17752f3"
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
                        "5af98a35-6a91-4250-b133-48d949de2b32"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </h2>
                    <div className="servicecontact">
                      <input
                        required={true}
                        placeholder={fetchdata1[
                          "4d917117-bfc3-4267-8d74-56ce56bbecbf"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        title={errors.name ? "This field is required" : ""}
                        className={`freeinput ${errors.name ? "error" : ""}`}
                      />
                      <input
                        placeholder={fetchdata1[
                          "ed28c3e7-63bf-4b68-a83a-7e4f98697642"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        title={errors.email ? "This field is required" : ""}
                        className={`freeinput ${errors.email ? "error" : ""}`}
                      />
                      <textarea
                        placeholder={fetchdata1[
                          "c3f5b0b2-1785-41e0-abe8-d6dee2240339"
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
                          "af7ab257-60ba-4a30-8d05-91206551a2b5"
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
export default HumanResources;
