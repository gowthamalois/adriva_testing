import React, { Fragment, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { loading } from "../../redux/actions";
import { useRouter } from "next/router";

const menus = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },

  {
    id: 2,
    title: "About",
    link: "/about",
  },
  {
    id: 3,
    title: "Blogs",
    link: "/blogs",
  },
  {
    id: 3,
    title: "Jobs",
    link: "/jobs",
  },
  {
    id: 6,
    title: "Services",
    link: "/services",
    submenu: [
      {
        id: 61,
        title: "Human Resources",
        link: "/services/human-resources",
      },
      {
        id: 62,
        title: "Healthcare",
        link: "/services/healthcare",
      },
      {
        id: 63,
        title: "Finance and Accounting",
        link: "/services/finance-accounting",
      },
      {
        id: 64,
        title: "Factoring Management",
        link: "/services/factoring-management-services",
      },
      {
        id: 64,
        title: "Cost Management",
        link: "/services/cost-management",
      },
      {
        id: 64,
        title: "Business Continuity",
        link: "/services/business-continuity-services",
      },
    ],
  },
  {
    id: 88,
    title: "Contact",
    link: "/contact",
  },
];

const MobileMenu = () => {
  const [openId, setOpenId] = useState(0);
  const [menuActive, setMenuState] = useState(false);
  const dispatch = useDispatch();

  const ClickHandler = () => {
    dispatch(loading(true));
  };

 

  return (
    <div>
      <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
        <div className="menu-close">
          <div className="clox" onClick={() => setMenuState(!menuActive)}>
            <IoMdClose fontSize="20px" />
          </div>
        </div>

        <ul className="responsivemenu">
          {menus.map((item, mn) => {
            return (
              <ListItem
                className={item.id === openId ? "active" : null}
                key={mn}
              >
                {item.submenu ? (
                  <Fragment>
                    <p
                      id="data-translate"
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                      onClick={() =>
                        setOpenId(item.id === openId ? 0 : item.id)
                      }
                    >
                      {item.title}
                      {item.id === openId ? <FaAngleUp /> : <FaAngleDown />}
                    </p>
                    <Collapse
                      in={item.id === openId}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List className="subMenu">
                        <Fragment>
                          {item.submenu.map((submenu, i) => {
                            return (
                              <ListItem key={i}>
                                <Link
                                  id="data-translate"
                                  onClick={ClickHandler}
                                  className="active"
                                  href={submenu.link}
                                >
                                  {submenu.title}
                                </Link>
                              </ListItem>
                            );
                          })}
                        </Fragment>
                      </List>
                    </Collapse>
                  </Fragment>
                ) : (
                  <Link id="data-translate" className="active" href={item.link}>
                    {item.title}
                  </Link>
                )}
              </ListItem>
            );
          })}
        </ul>
      </div>

      <div className="showmenu" onClick={() => setMenuState(!menuActive)}>
        <button type="button" className="navbar-toggler open-btn">
          <span className="icon-bar first-angle"></span>
          <span className="icon-bar middle-angle"></span>
          <span className="icon-bar last-angle"></span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
