import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import apiServices from "../../services/api";
import magicJson from "../../magicJson/magicJson";

const FunFact = (props) => {
  const [counts, setCounts] = useState({ staff: 0, roi: 0, consultants: 0 });
  const sectionRef = useRef(null);
  const [labels, setlabels] = useState({ staff: 0, roi: 0, consultants: 0 });
  const [suffix, setsuffix] = useState({ staff: 0, roi: 0, consultants: 0 });
  const [startAnimation, setStartAnimation] = useState(false);
  const fetchdata = useSelector((state) => state.data).mappingdata;
  const services = new apiServices();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true); // Start animation when visible
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  // useEffect(() => {
  //   const translateFunction = async () => {
  //     const elements = document.querySelectorAll("#data-translate1");
  //     const innerTextArray = Array.from(elements).map((el) =>
  //       el.textContent.trim()
  //     );

  //     console.log(innerTextArray); // Logs only relevant text
  //     magicJson.endpoint = "translate";
  //     magicJson.executor = "translatetext";
  //     magicJson.data = innerTextArray;
  //     const Data = new FormData();
  //     Data.append("request", JSON.stringify(magicJson));
  //     await services.fetchdata(Data).then((res) => {
  //       console.log(res.data.data[0]);
  //       elements.forEach((el, index) => {
  //         el.textContent = res.data.data[0][index]; // Update the content
  //       });
  //     });
  //   };
  //   translateFunction();
  // }, []);
  const formatNumber = (num) => {
    if (isNaN(num)) {
      return { value: "0", suffix: "" }; // Return default value if input is not a valid number
    }

    const suffixes = ["", "K", "M", "B", "T", "Q", "Qi"]; // Add more suffixes as needed
    let index = 0;

    // Ensure the number is treated as a positive number for large values
    num = Math.abs(num);

    while (num >= 1000 && index < suffixes.length - 1) {
      num /= 1000;
      index++;
    }

    // Return the formatted value with the suffix
    return { value: num.toFixed(1), suffix: suffixes[index] };
  };
  useEffect(() => {
    if (startAnimation) {
      let obj = {};
      const array = [];

      // Dynamically fetch and process the data
      fetchdata["6745a62064de606caa48f9e9"]?.forEach((i, index) => {
        array.push(Object.values(i)[1].value); // Collecting dynamic labels
        obj[Object.values(i)[1].value] = Object.values(i)[0]?.value; // Storing dynamic value-label pairs
      });

      const targets = obj; // Use the dynamically created obj
      const duration = 2000; // Total duration for animation in ms (2 seconds)
      const startTime = performance.now(); // Start the animation time

      const animateCounter = (timestamp) => {
        const elapsedTime = timestamp - startTime; // Calculate elapsed time
        const progress = Math.min(elapsedTime / duration, 1); // Progress as a percentage (0 to 1)

        // Dynamically set the counts based on the array
        const newCounts = {};
        array.forEach((key) => {
          // Dynamically calculate the value for each key
          newCounts[key] = Math.round(
            formatNumber(targets[key]).value * progress
          );
        });

        setCounts(newCounts); // Update counts dynamically

        // Dynamically update labels
        const newLabels = {};
        array.forEach((key) => {
          newLabels[key] = targets[key + "1"]; // Assuming target keys are suffixed with '1' for labels
        });
        setlabels(newLabels);

        // Dynamically update suffixes
        const newSuffixes = {};
        array.forEach((key) => {
          newSuffixes[key] = formatNumber(targets[key]).suffix; // Use the same logic for suffixes
        });
        setsuffix(newSuffixes);

        // Continue the animation if the duration has not elapsed
        if (elapsedTime < duration) {
          requestAnimationFrame(animateCounter); // Keep updating until the duration is reached
        }
      };

      requestAnimationFrame(animateCounter); // Start the animation
    }
  }, [startAnimation, fetchdata]); // Ensure the effect runs when fetchdata changes
 
  return (
    <>
      <div
        ref={sectionRef}
        className="staticscontainer"
        style={{
          backgroundImage: `linear-gradient(rgba(47, 44, 61, 0.92), rgba(47, 44, 61, 0.92)), url("/images/since-bg-1.webp")`,
          backgroundAttachment: "fixed", // Makes the background fixed
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <h1 id="data-translate1" className="staticsheading">
            {fetchdata["548ed5aa-ed1e-4870-8458-a2d96cc6849b"]?.value?.replace(
              /<\/?[^>]+(>|$)/g,
              ""
            )}
          </h1>
          <p id="data-translate1" className="statticsp">
            {fetchdata["c3792f64-80dc-4d39-8d82-3b3a163a848d"]?.value?.replace(
              /<\/?[^>]+(>|$)/g,
              ""
            )}
          </p>
        </div>
        <div className="staticsbox">
          {Object.keys(labels).map((i, index) => (
            <div className="staticssingle">
              <div className="staticsborder"></div>
              <p id="data-translate1" className="staticsvalue">
                {counts[Object.keys(labels)[index]]}
                {suffix[Object.keys(labels)[index]] &&
                  suffix[Object.keys(labels)[index]]}
              </p>
              <p id="data-translate1" className="statticstext">
                {Object.keys(labels)[index]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FunFact;
