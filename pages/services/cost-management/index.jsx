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

const costManagement = () => {
  const fetchdata1 = useSelector((state) => state.data).mappingdata;
  const socket = useSocket();
  const language = useSelector((state) => state.data.selectedlanguage);

  const isloading = useSelector((state) => state.data.loading);
  const seoData = useSelector((state) => state.data.metaData);
  const socketdata = useSelector((state) => state.data);

  const [captchaToken, setCaptchaToken] = useState(null);
  const onVerify = (token) => {
    setCaptchaToken(token);
  };
  const captcharef = useRef();
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
          data?.data[0]?.["67480a085ed284abd5b2223d"]
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
        pagename: "Cost Management",
        isconsultance: true,
      };
      const Data = new FormData();
      Data.append("request", JSON.stringify(magicJson));

      // Call API
      dispatch(loading(false));
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
    if (!router.isReady ) return; // Wait until ready
  
    const collectionId = "67480a085ed284abd5b2223d";
  
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("id")) {
        localStorage.setItem("id", collectionId); // Prevent repeated setting
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
            "20dea47c-c9e5-4305-9d24-bf6af0affd13"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "a4ff5ff8-bef6-47c1-8719-e536df055a38"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "35c4ee8a-25d4-4e07-b8e7-052e51f80b4e"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "470b9894-afc5-496b-b6f0-944b78dfc5ef"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "8ade2b25-2f6f-4613-a337-b7d01dce3cfd"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "7a9929d0-1ada-451a-a7d6-16a9a04405a2"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
        {
          question: fetchdata1[
            "ef7123a3-4348-4e0a-a89a-2393b97cb54a"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          answer: fetchdata1[
            "fdf3d994-32e7-4a8b-9495-15b503565eac"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          isOpen: false,
        },
      ]);

      setdata([
        {
          heading: fetchdata1[
            "664382e5-4b72-4f73-b729-097fe0f64bc6"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["789ce01c-da20-45c5-a3be-8c566c75f111"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "f8cd82da-e249-484f-a0fe-008e26e8a874"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["039aa5c6-5897-4512-8f42-ba63146aafea"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "68325554-5a21-42b6-b751-81f262d7e310"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["dc161e17-0152-489c-b4a0-ee5a4fd7380f"]?.value?.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          ),
          active: false,
        },
        {
          heading: fetchdata1[
            "a788232f-3714-403f-9d32-d7745d85723e"
          ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
          p: fetchdata1["d7331012-284c-4a36-b2f1-25ee0d8e424c"]?.value?.replace(
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
              id1="62010118-4719-4160-b4b1-4164750f2e07"
              id2="6025629d-e284-4d10-8461-b3eb6377c046"
              id3="7c11a474-54bd-4d73-9b80-e0f703dac6f6"
            />
            <div className="container">
              <div className="row">
                <div className="service-content-container">
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["8dc547a7-cb1f-44be-b620-e418522eb6f9"]
                          ?.value,
                    }}
                  ></p>
                </div>
                <div className="col-6 whycontainer1">
                  <h2 className="keybenefits">
                    {fetchdata1[
                      "e6ab1568-8809-4901-b16d-87528f167642"
                    ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                  </h2>
                  <p
                    className="services_content"
                    dangerouslySetInnerHTML={{
                      __html:
                        fetchdata1["83ed9bd2-0102-4dc2-9324-4f6c4c352514"]
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
                        "0872d1bc-5629-4b5b-8e95-80538016df16"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </h2>
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
                        "c803853f-f221-4ff0-a5a5-b639450d9d86"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </h2>
                    <div className="servicecontact">
                      <input
                        required={true}
                        placeholder={fetchdata1[
                          "3c2005f0-5a5f-495a-b9af-87525124d352"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        title={errors.name ? "This field is required" : ""}
                        className={`freeinput ${errors.name ? "error" : ""}`}
                      />
                      <input
                        placeholder={fetchdata1[
                          "d1b8e47f-dea1-4f80-98df-8776b322b327"
                        ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        title={errors.email ? "This field is required" : ""}
                        className={`freeinput ${errors.email ? "error" : ""}`}
                      />
                      <textarea
                        placeholder={fetchdata1[
                          "aa0fd8b1-0615-4bdc-ba9b-88e9d5e9dbac"
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
                          "09bea9a4-7903-432f-9532-b04980ab3b31"
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
export default costManagement;
