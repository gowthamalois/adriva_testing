import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup,
  FormFeedback,
  Button,
} from "reactstrap";
import magicJson from "../magicJson/magicJson";
import { toast } from "react-toastify";
import apiServices from "../services/api";

const ApplyNowForm = ({ show, updateModalStateByChild, jobId,jobCode }) => {
  const [modal, setModal] = useState(true);
  const [errors, setErrors] = useState({});
  const services = new apiServices()
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    resume: null,
  });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    validateForm(name, newValue);
  };

  const validateForm = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        newErrors.name = value ? "" : "Name is required";
        break;
      case "email":
        const emailRegex =
          /^(?!.*(\.\.|\.\-|\-\.|--|_\-|\.\_|\-\.|\.\+|\+\.|--|\+\+|__|%%|\+\%|\%\.|\%\-|\-\%))([a-zA-Z0-9]+(?:[._%+-][a-zA-Z0-9]+)*)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) {
          newErrors.email = "Email is required";
          setEmailError("");
        } else if (!emailRegex.test(value)) {
          newErrors.email = "";
          setEmailError("Invalid email address");
        } else {
          setEmailError("");
          newErrors.email = "";
        }
        break;
      case "resume":
        newErrors.resume = value ? "" : "Resume is required";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const isValid =
      Object.values(errors).every((error) => !error) && formData.resume;
    if (isValid) {
      const data = new FormData();

      try {
        magicJson.endpoint = "apply";
        magicJson.executor = "createCandidate";
        magicJson.data = [
          {
            jobId,
            jobCode,
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ];

        data.append("request", JSON.stringify(magicJson));
        data.append("files", formData.resume);
        
        services.fetchdata(data).then(()=>{
            setFormData({ name: "", email: "", message: "", resume: null });
            openModal();
            setIsSubmitting(false);  
            toast.success("Applied Successfully!");
        })
        
      } catch (error) {
        console.log("error", error.message);
      }
    } else {
      setIsSubmitting(false);  
      toast.error("All fields are required!");
      setSubmitted(true);
    }
  };

  const openModal = () => {
    setModal(!modal);
    setErrors({});
    setSubmitted(false);
    updateModalStateByChild(false);
  };

  if (!show) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="" style={{position:"absolute"}}>
      <div
        className="modal fade"
        id="applyNow"
        
        aria-labelledby="applyNow"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <Modal isOpen={modal} toggle={openModal} centered>
            <ModalBody className="modal-body p-5">
              <div className="text-center mb-4">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Apply For This Job
                </h5>
              </div>
              <div className="position-absolute end-0 top-0 p-3">
                <button
                  type="button"
                  onClick={openModal}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <Form noValidate onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <Label for="nameControlInput" className="form-label">
                    Name *
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    className="form-control"
                    id="nameControlInput"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    invalid={submitted && !!errors.name}
                  />
                  <FormFeedback style={{ color: "red" }}>
                    {errors.name}
                  </FormFeedback>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label for="emailControlInput2" className="form-label">
                    Email Address *
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="form-control"
                    id="emailControlInput2"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    invalid={submitted && !!errors.email}
                  />
                  {emailError && (
                    <span style={{ color: "red" }}>{emailError}</span>
                  )}
                  <FormFeedback style={{ color: "red" }}>
                    {errors.email}
                  </FormFeedback>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label for="messageControlTextarea" className="form-label">
                    Message
                  </Label>
                  <textarea
                    className="form-control"
                    name="message"
                    value={formData.message}
                    id="messageControlTextarea"
                    rows="4"
                    placeholder="Enter your message"
                    onChange={handleChange}
                  ></textarea>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label className="form-label" for="inputGroupFile01">
                    Upload Resume *
                  </Label>
                  <Input
                    type="file"
                    className="form-control"
                    id="inputGroupFile01"
                    name="resume"
                    onChange={handleChange}
                    invalid={submitted && !!errors.resume}
                  />
                  <FormFeedback style={{ color: "red" }}>
                    {errors.resume}
                  </FormFeedback>
                </FormGroup>
                <Button
                  type="submit"
                  style={{backgroundColor:"#ea6a20",border:"0"}}
                  className="w-100"
                  disabled={emailError !== "" || isSubmitting}
                >
                  {isSubmitting ? "Sending Application" : "Send Application"}
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default ApplyNowForm;
