import React, { useEffect, useState } from "react";
import Link from "next/link";
import HeaderTopbar2 from "../HeaderTopbar2/HeaderTopbar2";
import MobileMenu from "../MobileMenu/MobileMenu";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaPhone } from "react-icons/fa6";
import { MdGTranslate } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { changelanguage, fetch_data, loading } from "../../redux/actions";
// import { loading } from '../../redux/actions'
import { IoIosSearch } from "react-icons/io";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import magicJson from "../../magicJson/magicJson";
import apiServices from "../../services/api";

const Header3 = (props) => {
  const router = useRouter();
  const [languageOpen, setLanguageOpen] = useState(false);
  const services = new apiServices();
  const [activePath, setActivePath] = useState(""); // Declare state properly
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const [dropdownsearch, setdropdownsearch] = useState("");
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    // Update the active path correctly using the setter function
    setActivePath(router.pathname);
  }, [router.pathname]); //
  const SubmitHandler = (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();

  const ClickHandler = (e, url) => {
    e.preventDefault();
    if (router.pathname != url) {
      router.push(url);
      dispatch(loading(true));
    }
    // window.scrollTo(10, 0);
  };

  const searchTags = () => {
    if (search === "") return;
    magicJson.endpoint = "customApi";
    magicJson.executor = "customApiSearch";
    magicJson.data = { tag: search };
    const Data = new FormData();
    Data.append("request", JSON.stringify(magicJson));
    services
      .fetchdata(Data)
      .then((data) => {
        setSearchData(data.data.data[0]);
        setSearch("");
        document.getElementById("search-dropdown").focus();
        document.getElementById("search-dropdown").click();
        setSearchDropdown(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeLanguage = (lang) => {
    typeof window != "undefined" && localStorage.setItem("language", lang);
    console.log(`Language changed to: ${lang}`);
    dispatch(changelanguage(lang));
    setLanguageOpen(false); // Close dropdown after selection
  };

  return (
    <>
      <HeaderTopbar2 />
      <header id="header" className={`wpo-header-style-7 ${props.topbarNone}`}>
        <div className={`wpo-site-header ${props.hclass}`}>
          <nav className="navigation navbar navbar-expand-lg navbar-light">
            <div className="" style={{ width: "100%" }}>
              <div className="row align-items-center" style={{ margin: 0 }}>
                <div className="col-lg-2 col-md-2 col-3 logo">
                  <div className="companylogo">
                    <Link href="/">
                      <Image
                        loading="lazy"
                        width={100}
                        alt="Adriva Business Services"
                        height={100}
                        src="/images/Adriva-logo-website-1 (1).webp"
                        className="logoimage"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-10 col-md-1 slanted-bg d-none d-lg-block col-1">
                  <div
                    id="navbar"
                    style={{ height: "100%" }}
                    className="collapse navbar-collapse navigation-holder"
                  >
                    <button className="menu-close">
                      <i className="ti-close"></i>
                    </button>
                    <ul className="navbar">
                      <li>
                        <Link
                          id="data-translate"
                          onClick={(e) => ClickHandler(e, "/")}
                          className={`navitems ${
                            activePath === "/" && "navitemactive"
                          }`}
                          href="/"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          id="data-translate"
                          onClick={(e) => ClickHandler(e, "/about")}
                          href="/about"
                          className={`navitems ${
                            activePath == "/about" && "navitemactive"
                          }`}
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          id="data-translate"
                          onClick={(e) => ClickHandler(e, "/blogs")}
                          href="/blogs"
                          className={`navitems ${
                            activePath.includes("/blogs") && "navitemactive"
                          }`}
                        >
                          Blogs
                        </Link>
                      </li>
                      <li>
                        <Link
                          id="data-translate"
                          onClick={(e) => ClickHandler(e, "/jobs")}
                          href="/jobs"
                          className={`navitems ${
                            activePath.includes("/jobs") && "navitemactive"
                          }`}
                        >
                          Jobs
                        </Link>
                      </li>
                      <li className="">
                        <a
                          id="data-translate"
                          className={`navitems ${
                            activePath.includes("/services") && "navitemactive"
                          }`}
                        >
                          Services
                        </a>
                        <ul className="sub-menu">
                          <li>
                            <Link
                              id="data-translate"
                              onClick={(e) =>
                                ClickHandler(e, "/services/human-resources")
                              }
                              href="/services/human-resources"
                            >
                              Human Resources
                            </Link>
                          </li>
                          <li>
                            <Link
                              id="data-translate"
                              onClick={(e) =>
                                ClickHandler(e, "/services/healthcare")
                              }
                              href="/services/healthcare"
                            >
                              Healthcare
                            </Link>
                          </li>
                          <li>
                            <Link
                              id="data-translate"
                              onClick={(e) =>
                                ClickHandler(e, "/services/finance-accounting")
                              }
                              href="/services/finance-accounting"
                            >
                              Finance and Accounting
                            </Link>
                          </li>
                          <li>
                            <Link
                              id="data-translate"
                              onClick={(e) =>
                                ClickHandler(e, "/services/cost-management")
                              }
                              href="/services/cost-management"
                            >
                              Cost Management
                            </Link>
                          </li>
                          <li>
                            <Link
                              id="data-translate"
                              onClick={(e) =>
                                ClickHandler(
                                  e,
                                  "/services/business-continuity-services"
                                )
                              }
                              href="/services/business-continuity-services"
                            >
                              Business Continuity
                            </Link>
                          </li>
                          <li>
                            <Link
                              id="data-translate"
                              onClick={(e) =>
                                ClickHandler(
                                  e,
                                  "/services/factoring-management-services"
                                )
                              }
                              href="/services/factoring-management-services"
                            >
                              Factoring Management
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link
                          id="data-translate"
                          onClick={(e) => ClickHandler(e, "/contact")}
                          className={`navitems ${
                            activePath == "/contact" && "navitemactive"
                          }`}
                          href="/contact"
                        >
                          Contact
                        </Link>
                      </li>
                      <li
                        style={{ cursor: "pointer" }}
                        onClick={() => setSearchOpen(!searchOpen)}
                      >
                        <IoIosSearch color="white" size="20px" />
                      </li>
                      <li
                        className="language-dropdown"
                        style={{ position: "relative" }}
                      >
                        <div
                          onClick={() => setLanguageOpen(!languageOpen)}
                          style={{ cursor: "pointer" }}
                        >
                          <MdGTranslate color="white" size="20px" />
                        </div>
                        {languageOpen && (
                          <ul className="sub-menu1">
                            <li
                              onClick={() => changeLanguage("en")}
                              id="data-translate"
                            >
                              English
                            </li>
                            <li
                              onClick={() => changeLanguage("nl")}
                              id="data-translate"
                            >
                              Dutch
                            </li>
                            <li
                              onClick={() => changeLanguage("fr")}
                              id="data-translate"
                            >
                              French
                            </li>
                            <li
                              onClick={() => changeLanguage("hi")}
                              id="data-translate"
                            >
                              Hindi
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-10 col-9 mobile_slanted-bg d-flex justify-content-end align-items-center d-lg-none dl-block">
                  <div className="mobail-menu">
                    <MobileMenu />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <Modal
        isOpen={searchOpen}
        centered
        toggle={() => {
          setSearch("");
          setSearchData([]);
          setSearchDropdown(false);
          setSearchOpen(!searchOpen);
        }}
        onOpened={() => document.getElementById("search-input").focus()}
      >
        <ModalHeader>Search Pages Using Tags</ModalHeader>
        <ModalBody>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                options={searchData}
                id="search-input"
                fullWidth
                value={
                  searchData.find(
                    (option) => option.pageName === dropdownsearch
                  ) || null
                }
                open={searchDropdown && searchData.length > 0} // Use the state to control whether the dropdown is open
                onOpen={() => setSearchDropdown(true)} // Ensure the dropdown opens when triggered
                getOptionLabel={(option) => option.pageName || ""}
                onClose={() => setSearchDropdown(false)} // Close dropdown when it loses focus
                onChange={(e, value) => {
                  if (value) {
                    setdropdownsearch(value?.pageName);
                    router.push(value?.url); // Navigate to the selected page
                    setSearch(""); // Clear search input
                    setSearchData([]); // Clear search results
                    setSearchDropdown(false); // Close the dropdown
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder="Search..."
                    value={null}
                    size="small"
                    onChange={(e) => {
                      setdropdownsearch("");
                      setSearch(e.target.value);
                    }} // Update search value
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Button
                          onClick={() => {
                            searchTags();
                            setSearch("");
                            setdropdownsearch("");
                          }}
                        >
                          Search
                        </Button>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Header3;
