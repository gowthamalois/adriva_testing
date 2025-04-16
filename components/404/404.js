import React from "react";
import Link from "next/link";
import erimg from "/public/images/error-404.png";
import Image from "next/image";

const Error = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section className="error-404-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-xs-12">
            <div className="content clearfix">
              {/* <div className="error">
                <Image src={erimg} alt="" />
              </div> */}
              <div className="">
                <h3>Oops! Looks Like You’ve Hit a Dead End</h3>
                <p>
                  But don’t worry—Adriva Business Services is always here to
                  guide businesses toward operational success!
                </p>
                <h3>Who We Are </h3>
                <p>
                  Adriva Business Services is a trusted outsourcing partner with
                  years of expertise, providing businesses across the globe with
                  reliable, efficient, and innovative solutions. Our dedicated
                  team of 300+ skilled professionals ensures that your business
                  runs smoothly, with optimized workflows, cost-effective
                  operations, and seamless processes. We specialize in
                  customized business process management, leveraging real-time
                  data, technology, and a process-driven approach to help
                  companies focus on growth while we handle the rest!
                </p>
                <h3>What We Do</h3>
                <p>
                  We offer comprehensive business services tailored to meet the
                  unique needs of modern enterprises.
                </p>
                <ol>
                  <li>
                    <strong>HR Solutions:</strong> Connecting businesses with
                    top-tier talent across industries. Whether you need contract
                    staffing, permanent placements, or workforce management,
                    we’ve got you covered.
                  </li>
                  <li>
                    <strong>Healthcare:</strong> Providing healthcare
                    organizations with the support they need, from medical
                    billing to patient data management, ensuring smooth
                    healthcare administration.
                  </li>
                  <li>
                    <strong>Finance & Staffing:</strong> Streamlining financial
                    processes, managing payroll, bookkeeping, and accounting
                    operations with precision and efficiency.
                  </li>
                  <li>
                    <strong>Cost Management:</strong> Reducing operational costs
                    while maintaining quality and efficiency—our expertise in
                    optimizing business processes ensures your company maximizes
                    productivity without unnecessary expenses.
                  </li>
                  <li>
                    <strong>Business Continuity:</strong> Keeping your
                    operations running seamlessly, no matter the challenge. Our
                    expertise ensures minimal disruptions and optimized
                    workflows.
                  </li>
                  <li>
                    <strong>Factoring Management:</strong> Helping businesses
                    manage cash flow effectively with strategic factoring
                    solutions, ensuring financial stability and continuous
                    growth.
                  </li>
                </ol>
                <h2>Why Choose Adriva?</h2>
                <ul>
                  <li>Experience & Expertise</li>
                  <li>Global Reach</li>
                  <li>Real-Time Data-Driven Decisions</li>
                  <li>Advanced Technology & Process Automation</li>
                  <li>Scalability & Flexibility</li>
                </ul>
                <p>
                  We believe in quality over quantity and work with a
                  customer-first approach, ensuring 100% satisfaction for every
                  client we serve.
                </p>

                <Link onClick={ClickHandler} href="/" className="theme-btn">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
