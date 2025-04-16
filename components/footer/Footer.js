"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import apiServices from "../../services/api";
import magicJson from "../../magicJson/magicJson";
import { loading } from "../../redux/actions";

const Footer = (props) => {
  const fetchdata = useSelector((state) => state.data).mappingdata;
  const [email, setemail] = useState("");
  const dispatch = useDispatch()
  const router = useRouter();
  const services = new apiServices();
 

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email validation regex
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setemail(inputValue);

    // Check if email is valid
  };
 
  return (
    <div className="footercompent">
      <div className="row footergap">
        <div className="col-3 whycontainer2">
          <div className="footeeboxes">
            <p id="data-translate" className="footerheading">
              {fetchdata[
                  "59a644bb-7860-4b67-be2b-73b2db8a182e"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
            <div className="footeritems footeralign">
              <p id="data-translate">
                +1-{" "}
                {fetchdata[
                  "bc849980-a939-4e85-8fd6-b5a0b26eac80"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
              <p id="data-translate">
                {fetchdata[
                  "9bc19428-8567-422b-b6d2-8652063c1855"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
              <p id="data-translate">
                {fetchdata[
                  "9747a8fc-d8be-4837-84a0-97a6006d950e"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
              <p id="data-translate">
                {" "}
                {fetchdata[
                  "5639c715-d981-4ede-b936-3848eabc3411"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-3 whycontainer2">
          <div className="footeeboxes">
            <p id="data-translate" className="footerheading">
              {" "}
              {fetchdata[
                  "c86107c3-b55b-4480-bc3a-cb365dcc414f"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
            <div className="footeritems">
              <li id="data-translate" onClick={() => {
                 !router.pathname.includes("/services")&&dispatch(loading(true))
                router.push("/services/human-resources")}}>
                {" "}
                <a id="data-translate">
                  {fetchdata[
                  "8ebddd39-2d4f-40b9-bbae-a0e56ed621a7"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                </a>
              </li>
              <li id="data-translate" onClick={() => {
                 !router.pathname.includes("/services")&&dispatch(loading(true))
                router.push("/services/healthcare")}}>
                <a id="data-translate">
                  {fetchdata[
                  "1371960f-a4b3-4d0c-94f6-d27cbd7eed45"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                </a>
              </li>
              <li id="data-translate" onClick={() => {
                 !router.pathname.includes("/services")&&dispatch(loading(true))
                router.push("/services/finance-accounting")}}>
                <a id="data-translate">
                  {fetchdata[
                  "41cda70c-bb40-497b-9399-bdaed82a8ea2"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                </a>
              </li>
              <li id="data-translate" onClick={() => {
                 !router.pathname.includes("/services")&&dispatch(loading(true))
                router.push("/services/cost-management")}}>
                <a id="data-translate">
                  {fetchdata[
                  "b217851c-e36c-49ce-a4ed-380074796f9c"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                </a>
              </li>
              <li
                onClick={() =>{
                  !router.pathname.includes("/services")&&dispatch(loading(true))
                  router.push("/services/business-continuity-services")}
                }
              >
                <a id="data-translate">
                  {fetchdata[
                  "b1091ec0-0fef-492c-9c27-06f9cf6b64a3"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                </a>
              </li>
              <li
                onClick={() =>{
                  !router.pathname.includes("/services")&&dispatch(loading(true))
                  router.push("/services/factoring-management-services")}
                }
              >
                <a id="data-translate">
                  {fetchdata[
                  "8a40a14f-6c1f-4662-bbd8-ce4cb62dbb72"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                </a>
              </li>
            </div>
          </div>
        </div>
        <div className="col-3 whycontainer2">
          <div className="footeeboxes">
            <p id="data-translate" className="footerheading">
              {" "}
              {fetchdata[
                  "108e5bdb-935e-433e-a6d8-dfe63c519f76"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
            <div className="footeritems">
              <li id="data-translate" onClick={() => {
                !router.pathname.includes("/about")&&dispatch(loading(true))
                router.push("/about")}}>
                {" "}
                {fetchdata[
                  "38fbdba5-e26e-4291-b65a-40b239905901"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </li>
              <li id="data-translate" onClick={() => {
                !router.pathname.includes("/contact")&&dispatch(loading(true))
                router.push("/contact")}}>
                {fetchdata[
                  "df0a2133-a33c-490a-a5a6-e7849fba6f3f"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </li>
              <li id="data-translate" onClick={() => {
                !router.pathname.includes("/blogs")&&dispatch(loading(true))
                router.push("/blogs")}}>
                {fetchdata[
                  "0e5dc0f3-5d64-49e3-9c9b-065b7e421bbb"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </li>
              <li id="data-translate" onClick={() => {
                !router.pathname.includes("/jobs")&&dispatch(loading(true))
                router.push("/jobs")}}>
                {fetchdata[
                  "76fa00a8-2079-46ff-a921-6c4839b3945b"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </li>
            </div>
          </div>
        </div>
        <div className="col-3 whycontainer2">
          <div className="footeeboxes">
            <p id="data-translate" className="footerheading">
              {" "}
              {fetchdata[
                  "c2336a59-40a9-4c1c-b530-16a5eaae40c2"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
            <div className="footeritems footeritem">
              <input
                placeholder={fetchdata[
                  "42e4e857-1dbc-4501-ad09-b8394213b3f0"
                ]?.placeholder?.replace(/<\/?[^>]+(>|$)/g, "")}
                value={email}
                onChange={handleEmailChange}
                className="footeremail"
              />
              <Button
              id="data-translate"
                variant="contained"
                onClick={() => {
                  if (!email) {
                    toast.error("Email is required");
                    return;
                  }
                  if (email && !validateEmail(email)) {
                    toast.error("Email invalid");
                    return;
                  }
                  magicJson.endpoint = "forms";
                  magicJson.executor = "createSubscribers";
                  magicJson.data = [{ email }];
                  const Data = new FormData();
                  Data.append("request", JSON.stringify(magicJson));
                  services
                    .fetchdata(Data)
                    .then((res) => {
                      if (res) {
                        toast.success("Thank you for subscribing!");
                        setemail("");
                      }
                    })
                    .catch((err) => {
                      toast.error(
                        err.response.data.data[0].details.split(":")[1]
                      );
                    });
                }}
                className="subsscribebtn"
              >
                {fetchdata[
                  "19b28f3d-25fc-489b-8331-3c3d0e82422d"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
