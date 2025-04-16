import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import magicJson from "../../magicJson/magicJson";
import apiServices from "../../services/api";
import { loading } from "../../redux/actions";
const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"), {
  ssr: false,
});
const Contactpage = () => {
  const fetchdata = useSelector((state) => state.data).mappingdata;
  const captcharef = useRef();
  const dispatch = useDispatch();
  const [captchaToken, setCaptchaToken] = useState(null);
  const onVerify = (token) => {
    setCaptchaToken(token);
  };

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    pagename: "Contactus",
  });
  const services = new apiServices();
  const [errors, setErrors] = useState({
    email: false,
    subject: false,
    message: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error as user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: !formData.email.trim(),
      subject: !formData.subject.trim(),
      message: !formData.message.trim(),
    };

    setErrors(newErrors);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = (email) => emailRegex.test(email);
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: true });
      toast.error("Email is invalid");
      return;
    }
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    // Check if there are any errors
    if (!Object.values(newErrors).some((error) => error)) {
      magicJson.endpoint = "forms";
      magicJson.executor = "createContactUsResponses";
      magicJson.data = { ...formData, isconsultance: false };
      const Data = new FormData();
      Data.append("request", JSON.stringify(magicJson));
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
            dispatch(loading(false));

            setCaptchaToken("");
            setFormData({ email: "", message: "", subject: "" });
            setErrors({ email: false, message: false, subject: false });
          }
        })
        .catch(() => dispatch(loading(false)));
      // Add your form submission logic here
    }
  };

  return (
    <section className="wpo-contact-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12">
            <div className="office-info">
              <p className="contactusheader">
                {fetchdata[
                  "975a5203-c91d-476f-b3e3-edf09cf24ebc"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}{" "}
              </p>
            </div>
          </div>
          <div className="col-7 whycontainer1">
            <div className="constactus">
              <form className="contactusformbox" onSubmit={handleSubmit}>
                <input
                  required={true}
                  className={`custom-input ${errors.email ? "error" : ""}`}
                  placeholder={fetchdata[
                    "81226143-dbda-407e-b3bb-f4628d86208f"
                  ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  title={errors.email ? "This field is required" : ""}
                />
                <input
                  required={true}
                  className={`custom-input ${errors.subject ? "error" : ""}`}
                  placeholder={fetchdata[
                    "5bb271ed-7870-483c-ba1c-c8fc5c04553e"
                  ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  title={errors.subject ? "This field is required" : ""}
                />
                <textarea
                  required={true}
                  className={`custom-input contactustextarea ${
                    errors.message ? "error" : ""
                  }`}
                  placeholder={fetchdata[
                    "4d6d0513-d359-41d2-a45a-f3964fbe8fb5"
                  ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  title={errors.message ? "This field is required" : ""}
                />
                <div className="custom-hcaptcha-container">
                  <HCaptcha
                    sitekey="16760186-0b76-4500-9b72-e9e230001c30" // Replace with your hCaptcha site key
                    onVerify={onVerify}
                    ref={captcharef}
                    // Callback function for handling the token
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  className="buttoncomponent"
                >
                  {fetchdata[
                    "786d847b-5504-473f-9e82-fd6984868072"
                  ]?.value}
                </Button>
              </form>
            </div>
          </div>
          <div className="col-5 contactpagebox whycontainer1">
            <div className="contactusaddress">
              <p className="contactus-header">
                {fetchdata[
                  "2658a826-177b-48df-a363-316d696f2cf2"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
              <p
                className="contactus-details"
               
              >{fetchdata[
                "c648ef99-885a-48d8-a93c-a55f14dbee1e"
              ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}</p>
            </div>
            <div className="contactusaddress">
              <p className="contactus-header">
                {fetchdata["5388d5a1-d877-4046-9e71-ab1a52ce129a"]?.value}
              </p>
              <p className="contactus-details">
                <span>
                  {fetchdata["3c11a76a-763f-41d9-8e82-df4b07e8dc0f"]?.value}
                </span>
                <br />
                <span>
                  {fetchdata["d8155519-d615-495c-9ca8-ab5489b8d543"]?.value}
                </span>{" "}
              </p>
            </div>
            <div className="contactusaddress">
              <p className="contactus-header">
                {" "}
                {fetchdata["a352af24-cba7-44e5-8d61-96afb110d244"]?.value}
              </p>
              <p className="contactus-details">
                {fetchdata["08e47685-7e04-43dd-bd2d-4a600355038a"]?.value}
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="wpo-contact-map-section">
        <div className="wpo-contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.148453866702!2d73.15593637440944!3d22.310224642537317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc897d6446a17%3A0x20afdf65bd69c09a!2sNatubhai%20Centre!5e0!3m2!1sen!2sin!4v1736248165930!5m2!1sen!2sin"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>{" "}
        </div>
      </section>
    </section>
  );
};

export default Contactpage;
