import dynamic from "next/dynamic";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiServices from "../../services/api";
import magicJson from "../../magicJson/magicJson";
import { toast } from "react-toastify";
import { loading } from "../../redux/actions";

// Dynamically import HCaptcha with ssr: false to disable SSR
const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"), {
  ssr: false,
});
const ContactUs = () => {
  const fetchdata = useSelector((state) => state.data).mappingdata;
  const captcharef = useRef(null);
  const dispatch = useDispatch();
  const [captchaToken, setCaptchaToken] = useState(null);
  const [message, setMessage] = useState("");
  const onVerify = (token) => {
    setCaptchaToken(token);
  };
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    pagename: "Home",
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

  const findLabelById = (data, targetId, value) => {
    // Helper function to search recursively
    // const search = (items) => {
    //   for (const item of items) {
    //     if (item?.id === targetId) {
    //       return item[value]; // Return label if id matches
    //     }
    //     if (item?.children || item?.collectionarray) {
    //       const result = search(item?.children || item?.collectionarray); // Recursively search in children
    //       if (result) return result; // If found in children, return it
    //     }
    //   }
    //   return null; // Return null if not found
    // };
    // return search(data || []);
    // Start the search with the root data
  };

  return (
    <>
      <div className="contactuscontainer contact_querry_area">
        <div className="row footergap homepagecontact contactusbox1">
          <div className="col-6 whycontainer1">
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
          <div className="col-5  whycontainer1">
            <div className="contactusbox">
              <p id="data-translate" className="contactustext">
                {fetchdata[
                  "231e2a03-7b67-4bb9-9e4b-364c956f6382"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
              <p
                id="data-translate"
                className="contactuscall"
                dangerouslySetInnerHTML={{
                  __html: fetchdata[
                    "d973f9eb-8c38-4a9f-a0aa-af3af187fc86"
                  ]?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
                }}
              ></p>
              <div className="staticsborder"></div>
              <p id="data-translate" className="callusfree">
                {fetchdata[
                  "cecfffee-708d-4721-af45-097f7f6e52ef"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
              <p id="data-translate" className="contactuscall">
                {fetchdata[
                  "652b41ce-bbcd-4ef6-808a-0501ac834c6f"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
