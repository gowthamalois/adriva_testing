import React from "react";

import { FaLinkedin } from "react-icons/fa";

import { useSelector } from "react-redux";


const TeamSection = (props) => {
  const fetchdata1 = useSelector((state) => state.data).mappingdata;
  const targetObject = fetchdata1["6747f1765ed284abd5b22226"];
 

  const teams =
    targetObject?.map((i) => ({
      p:
        Object.values(i).find(
          (o) => o.id == "664bb88b-cb0b-470f-9bc7-abecd87302d3"
        )?.value || "No description", // Add fallback for missing data
      title:
        Object.values(i).find(
          (o) => o.id == "6b63ed9b-0a89-4daa-a20a-d19ccc2ad8f2"
        )?.value || "No title", // Add fallback for missing title
      likedinurl: Object.values(i).find(
        (o) => o.id == "11f90a29-6084-4cd9-ad7d-766b5b0a2e68"
      ).value,
      img:
        Object.values(i).find(
          (o) => o.id == "04db394e-10f4-4513-9936-6d657f269cfa"
        )?.files?.[0]?.url || "", // Handle nested property safely
    })) || [];
  return (
    <section className={`wpo-team-section section-padding ${props.tClass}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className="advisorheading">
              {fetchdata1[
                "c6176c45-92e3-4357-b859-78e592c86f33"
              ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
            <p className="advisordesc">
              {fetchdata1[
                "0f5ee860-0459-4f7e-a721-5cb8d55732b0"
              ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
          </div>
        </div>
        <div className="wpo-team-wrap">
          <div className="row teamscontainer">
            {teams.reverse().map((team, aitem) => (
              <div className="teamsboxes" key={aitem}>
                <div className="wpo-team-item">
                  <div className="wpo-team-img">
                    <img src={team.img} alt="" />
                    <div className="wpo-team-text">
                      <div
                        className="wpo-team-icons"
                        style={{
                          display: "flex",
                          gap: "15px",
                          justifyContent: "center",
                          height: "100%",
                          alignItems: "end",
                          padding: "30px",
                        }}
                      >
                        <a
                          href={team.likedinurl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin
                            fontSize="30px"
                            style={{ color: "#ffff" }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="advisornames companyname">{team.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
