import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SignUp = () => {
  const fetchdata = useSelector((state) => state.data).mappingdata;
  const router = useRouter();

  return (
    <>
      <div className="signupcontainer">
        <div className="container signupcomponent" style={{ height: "100%" }}>
          <div className="row">
            <div className="col-6 col-md-6 col-xs-2 disabledbox"></div>
            <div className="business_text col-12 col-md-6 col-xs-8">
              <h3>
                {fetchdata[
                  "5249624f-f08d-4845-b60b-786f44144d89"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </h3>
              <p>
                {fetchdata[
                  "6389d3be-ef31-4cab-a361-999fae0000fc"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
              <button
                className="signupbtn"
                onClick={() => router.push("/contact")}
              >
                {" "}
                {fetchdata[
                  "0a06e414-7215-4b6c-9477-637fca042896"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
