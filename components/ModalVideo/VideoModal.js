import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const VideoModal = ({ img }) => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };

  return (
    <div
      className="v-modal-area"
      style={{
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${img})`, // Set the background image dynamically
        backgroundSize: "cover", // Ensure the image covers the entire div
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent image repetition
      }}
    >
      {/* <div className="videobtn"> */}
      {/* <ul>
          <li>
            <button className="" onClick={openModal}><svg width="20px" height={"20px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg></button>
          </li>
        </ul> */}
      {/* <div className="videobutton" onClick={openModal}> */}
      {/* <svg
            width="20px"
            height={"20px"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg> */}
      {/* <img
            src="/images/play-button.png"
            className="videoimage1"
            width="20px"
            height="20px"
          />
        </div>
      </div> */}
      {/* <div className="v-modal-wrap">
        {modal ? (
          <section className="modal__bg">
            <button onClick={openModal} className="close">
              <IoClose />
            </button>
            <div className="modal__align">
              <div className="modal__content" modal={modal}>
                <div className="modal__video-align">
                  <iframe
                    className="modal__video-style"
                    loading="lazy"
                    src="https://www.youtube.com/embed/7Jv48RQ_2gk"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div> */}
    </div>
  );
};

export default VideoModal;
