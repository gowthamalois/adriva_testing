import Slider from "react-slick";
import VideoModal from "../ModalVideo/VideoModal";
import { useSelector } from "react-redux";

const WhyAbout = () => {
  const fetchdata1 = useSelector((state) => state.data).mappingdata;

  const findLabelById = (targetId, value) => {
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
    // return search(fetchdata1 || []);
    // Start the search with the root data
  };
  return (
    <>
      <section className="wpo-about-section-s4 section-padding">
        <div className="whyadrivacontainer">
          <div className="container">
            <div className="wpo-about-inner ">
              <div className="row align-items-center justify-content-center">
                <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                  <div className="wpo-about-text abouttext">
                    <h4>
                      {fetchdata1[
                        "31b4250b-5a74-47d2-bee8-67e59d664048"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </h4>
                    <p>
                      {fetchdata1[
                        "5ec29e98-a81f-45ed-8fd5-f74b14b9de4e"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                  <div className="testimonial-right-side">
                    <div className="video-holder">
                      <VideoModal
                        img={
                          fetchdata1["6d48eff9-779a-4154-ac30-218fe4840bc9"]
                            ?.files[0]?.url
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyAbout;
