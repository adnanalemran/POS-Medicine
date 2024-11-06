import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthUser from "../Components/AuthUser";
import logo from "../front_assets/Logo_Image/greatpharmalogo.png";
import "../CSS/Sidebar.css";
import Modal from "react-modal";
import http from "../http";
import Swal from "sweetalert2";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useEffect } from "react";
import { memberContext } from "../navbar/auth";
import dummyImage from "../front_assets/user_images/dummy.jpg";
// import Help_support_leagal from '../pages/admin_pages/help_support_legal/Help_support_leagal.jsx'
import Help_support_leagal from "../pages/admin_pages/help_support_legal/help_support_leagal";

export default function SideBar() {
  const location = useLocation();
  const { user } = AuthUser();
  const [reloadComp, setReloadComp] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [member, setMember] = useState({
    member_name: "",
    member_email: "",
    member_phone: "",
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "300px",
      padding: "10px",
    },
  };

  const handleInput = (e) => [
    setMember({ ...member, [e.target.name]: e.target.value }),
  ];

  const [members, setMembers] = useState([]);
  const { currentMember, setCurrentMember } = useContext(memberContext);

  useEffect(() => {
    http.get("/members").then((res) => {
      if (res.status === 200) {
        setMembers(res.data.data);
      } else {
        console.log("error occur");
      }
    });
  }, [reloadComp]);

  const submitData = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("member_name", member.member_name);
    formData.append("member_email", member.member_email);
    formData.append("member_phone", member.member_phone);

    http.post("members", formData).then((res) => {
      if (res.data.status === 200) {
        setReloadComp(true);

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `<div><h1 style={{color:'green'}}>Congratulations!</h1><h4>${member.member_name}</h4> <h6>You are now our member</h6></div>`,
          timer: 2500,
        });

        setIsOpen(false);
        setMember({
          member_name: "",
          member_email: "",
          member_phone: "",
        });
      } else {
      }
    });
  };

  const handleOnSearch = (string, results) => {
    console.log("handleOnSearch", string, results);
  };
  const handleOnSelect = (item) => {
    setCurrentMember(item);
  };
  const handleOnClear = () => {
    setCurrentMember({});
  };
  const [supportModelIsOpen, setsupportModelIsOpen] = useState(false);
  const [supportModelProps, setsupportModelProps] = useState();
  const supportModel = {
    content: {
      top: "52%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "950px",
      height: "80%",
      padding: "10px",
    },
  };

  const formatResult = (item) => {
    return (
      <div className="result-wrapper">
        <span className="result-span">name: {item.member_name}</span> <br />
        <span className="result-span">Phone: {item.member_phone}</span>
      </div>
    );
  };

  console.log("user", user);
  return (
    <div className="sidebar-style">
      <nav className="sidebar">
        <div className="sidebar-header">
          <a
            style={{ width: "50%" }}
            href="/dashboard"
            className="sidebar-brand"
          >
            <img style={{ width: "50%" }} src={logo} alt="" srcset="" />
          </a>
          {/* <p>Salse</p> */}
          <div className="sidebar-toggler not-active">
            <span />
            <span />
            <span />
          </div>
        </div>

        {user.user_type === "sales" || user.user_type === "cashier" ? (
          <div style={{ position: "relative" }} className="sidebar-body">
            <ul className="nav">
              <li
                style={{ textAlign: "center", marginBottom: "36px" }}
                className="nav-item nav-category"
              >
                {user?.organization?.logo ? (
                  <div className="d-flex ms-3 mt-1">
                    <img
                      width={"24%"}
                      className="rounded-circle me-2"
                      src={user?.organization?.logo}
                      alt=""
                    />
                    <div className="">
                      <p style={{ color: "#7dc633" }}>{user.user_type}</p>
                      <p
                        style={{
                          backgroundColor: "#7dc633",
                          color: "white",
                          cursor: "pointer",
                          padding: "2px 8px",
                          fontSize: "9px",
                        }}
                        className="rounded-pill"
                      >
                        {user?.organization?.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="d-flex ms-3 mt-1">
                      <img
                        width={"24%"}
                        className="rounded-circle me-2"
                        src={dummyImage}
                        alt=""
                      />
                      <div className="">
                        <p style={{ color: "#7dc633" }} className="fs-5">
                          {user.user_type}
                        </p>
                        <p
                          style={{
                            backgroundColor: "#7dc633",
                            color: "white",
                            cursor: "pointer",
                            padding: "2px 8px",
                            fontSize: "9px",
                          }}
                          className="rounded-pill"
                        >
                          {user?.organization?.name}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </li>
              {/* <li style={{  fontSize: '14px', textAlign: 'center', color: 'gray', fontWeight: "500" }} className=" mt-1">{user?.organization?.name}</li> */}
              <li
                style={{
                  background: "#e9f3df",
                  marginTop: "15px",
                  padding: "4px 2px",
                  textAlign: "center",
                  color: "gray",
                  fontSize: "10px",
                  borderRadius: "5px",
                }}
                className=""
              >
                {user?.organization?.address}
              </li>
              <li className="nav-item nav-category">
                <hr style={{ marginTop: "8px" }} />
              </li>

              {/* Member Search  Start*/}
              {/* <li className='nav-item nav-category'><input type="text" placeholder='Member Search' className="form-control form-control-sm " /></li> */}
              {/* React search start  */}
              <li className="nav-item nav-category">Search Member</li>
              <li className="nav-item nav-category mb-3">
                <ReactSearchAutocomplete
                  items={members}
                  maxResults={12}
                  fuseOptions={{
                    keys: ["member_name", "member_email", "member_phone"],
                  }} // Search on both fields
                  resultStringKeyName="member_name" // String to display in the results
                  onSearch={handleOnSearch}
                  // onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  // onFocus={handleOnFocus}
                  onClear={handleOnClear}
                  showIcon={false}
                  formatResult={formatResult}
                  placeholder={"Search"}
                  styling={{
                    height: "30px",
                    border: "1px solid gray",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    boxShadow: "none",
                    hoverBackgroundColor: "#cbcec8",
                    color: "black",
                    fontSize: "12px",
                    fontFamily: "Courier",
                    iconColor: "gray",
                    lineColor: "gray",
                    placeholderColor: "gray",
                    clearIconMargin: "3px 8px 0 0",
                    zIndex: 2,
                  }}
                />
              </li>
              {/* React search end  */}
              <li className="nav-item nav-category">
                <div
                  style={{
                    maxHeight: "80px",
                    overflowX: "hidden",
                    marginTop: "10px",
                  }}
                  className="member-search-result row"
                >
                  {/* <div className="col-3">
                            <img style={{width:'40px'}} src={subscriber} alt="" />
                        </div> */}
                  <div className="col-9 text-start">
                    <p
                      style={{ color: "gray", fontSize: "12px" }}
                      className="mb-1"
                    >
                      {currentMember.member_name}
                    </p>
                    <div
                      style={{ textTransform: "lowercase" }}
                      className="d-lg-block d-none "
                    >
                      <p
                        style={{
                          fontSize: "10px",
                          color: "gray",
                          width: "135px",
                        }}
                      >
                        {currentMember.member_email}
                      </p>
                      <p
                        style={{
                          fontSize: "10px",
                          color: "gray",
                          width: "135px",
                        }}
                      >
                        {currentMember.member_phone}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <br />
              <br />

              {/* Sidebar Footer  */}
              <li
                style={{ position: "absolute", bottom: "80px", left: "0" }}
                className="nav-item nav-category mx-auto"
              >
                <div className="left-sidebar-bottom">
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={() => setIsOpen(true)}
                      style={{
                        background: "#69b128",
                        color: "white",
                        fontSize: "16px",
                        border: "0",
                      }}
                      className="w-100 py-1 rounded-1 mx-3"
                    >
                      Membership
                    </button>
                    <Modal
                      isOpen={modalIsOpen}
                      style={customStyles}
                      onRequestClose={() => setIsOpen(false)}
                      contentLabel="Example Modal"
                    >
                      <div className="new-member-reg p-2">
                        <form onSubmit={submitData}>
                          <h5 className="text-center">New Membership Form</h5>
                          <hr />
                          <div className="form-group mb-2">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="member_name"
                              value={member.member_name}
                              onChange={handleInput}
                            />
                          </div>
                          <div className="form-group mb-2">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control form-control-sm"
                              name="member_email"
                              value={member.member_email}
                              onChange={handleInput}
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label>Phone</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="member_phone"
                              value={member.member_phone}
                              onChange={handleInput}
                            />
                          </div>
                          <div className="d-flex justify-content-end">
                            <button
                              onClick={() => setIsOpen(false)}
                              className="custom-btn-outline me-2"
                            >
                              Cancel
                            </button>
                            <button className="custom-btn" type="submit">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </Modal>
                  </div>
                  <div
                    style={{ padding: "0 32px" }}
                    className="d-flex justify-content-center mt-2"
                  >
                    <h6>Great Pharma</h6>
                    <span className="ms-2 ps-2">( POS )</span>
                  </div>
                  <div
                    style={{ padding: "0 32px" }}
                    className="d-flex justify-content-center mt-3"
                  >
                    <h6
                      onClick={() => {
                        setsupportModelIsOpen(true);
                        setsupportModelProps("Help");
                      }}
                      style={{ color: "#69b128", cursor: "pointer" }}
                      className="me-lg-3 me-md-1"
                    >
                      Help
                    </h6>
                    <h6
                      onClick={() => {
                        setsupportModelIsOpen(true);
                        setsupportModelProps("Support");
                      }}
                      style={{ color: "#69b128", cursor: "pointer" }}
                      className="me-lg-3 me-md-1"
                    >
                      Support
                    </h6>
                    <h6
                      onClick={() => {
                        setsupportModelIsOpen(true);
                        setsupportModelProps("Legal");
                      }}
                      style={{ color: "#69b128", cursor: "pointer" }}
                      className=""
                    >
                      Legal
                    </h6>
                  </div>

                  <Modal
                    isOpen={supportModelIsOpen}
                    style={supportModel}
                    onRequestClose={() => setsupportModelIsOpen(false)}
                    contentLabel="Support Modal"
                  >
                    <i
                      className="fal fa-times float-end"
                      onClick={() => {
                        setsupportModelProps("");
                        setsupportModelIsOpen(false);
                      }}
                      style={{ fontSize: "15px", cursor: "pointer" }}
                    ></i>

                    <Help_support_leagal
                      supportModelProps={supportModelProps}
                    />
                  </Modal>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          // for pos and e-commerse
          <div className="sidebar-body">
            <ul className="nav">
              <li
                style={{
                  textAlign: "center",
                  marginBottom: "60px",
                  marginTop: "-15px",
                }}
                className="nav-item nav-category"
              >
                {user?.organization?.logo ? (
                  <>
                    <div className="d-flex ms-3 mt-1">
                      <img
                        width={"24%"}
                        className="rounded-circle me-2"
                        src={user?.organization?.logo}
                        alt=""
                      />
                      <div className="">
                        <p style={{ color: "black" }}>{user.user_type}</p>
                        <p
                          style={{
                            backgroundColor: "#e9f3df",
                            cursor: "pointer",
                            padding: "2px 8px",
                            fontSize: "9px",
                          }}
                          className="rounded-pill"
                        >
                          {user?.organization?.name}
                        </p>
                      </div>
                    </div>
                    {/* <img width={"15%"} className='rounded-circle me-2' src={user.organization.logo} alt="" />
                                                <p style={{ display: 'inline', color: '' }} className="fs-5">{user.user_type}</p>
                                                <p style={{ backgroundColor: '', color: '', cursor: 'pointer', padding: '2px 0' }} className="rounded-pill text-black w-75 mx-auto mt-1 ">{user?.organization?.name}</p> */}
                  </>
                ) : (
                  <>
                    <div className="d-flex ms-3 mt-1">
                      <img
                        width={"24%"}
                        className="rounded-circle me-2"
                        src={dummyImage}
                        alt=""
                      />
                      <div className="">
                        <p style={{ color: "" }} className="fs-5">
                          {user.user_type}
                        </p>
                        <p
                          style={{
                            backgroundColor: "#e9f3df",
                            color: "",
                            cursor: "pointer",
                            padding: "2px 8px",
                            fontSize: "9px",
                          }}
                          className="rounded-pill"
                        >
                          {user?.organization?.name}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </li>

              <hr style={{ marginTop: "-10px" }} />

              <li className="nav-item nav-category">Main</li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="link-icon" data-feather="box" />
                  <span className="link-title">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item nav-category mt-3">Administrations</li>

              {/* Admin Setup Start */}
              <li
                className={`nav-item ${
                  location.pathname === "/banner" ||
                  location.pathname === "/drug-generic-name" ||
                  location.pathname === "/usual-provider" ||
                  location.pathname === "/titles" ||
                  location.pathname === "/country" ||
                  location.pathname === "/city" ||
                  location.pathname === "/designation" ||
                  location.pathname === "/drugs-category" ||
                  location.pathname === "/degree" ||
                  location.pathname === "/requisition-category" ||
                  location.pathname === "/requisition-frequency"
                    ? "active"
                    : ""
                }`}
              >
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  href="#emails"
                  role="button"
                  aria-expanded={`${
                    location.pathname === "/banner" ||
                    location.pathname === "/drug-generic-name" ||
                    location.pathname === "/usual-provider" ||
                    location.pathname === "/titles" ||
                    location.pathname === "/country" ||
                    location.pathname === "/city" ||
                    location.pathname === "/designation" ||
                    location.pathname === "/suppliers-category" ||
                    location.pathname === "/degree" ||
                    location.pathname === "/requisition-category" ||
                    location.pathname === "/requisition-frequency" ||
                    location.pathname === "/vat-setup" ||
                    location.pathname === "/tax-setup" ||
                    location.pathname === "/delivery-mode" ||
                    location.pathname === "/payment-mode"
                      ? "true"
                      : ""
                  }`}
                  aria-controls="emails"
                >
                  <i className="link-icon" data-feather="anchor" />
                  <span className="link-title">Admin Setup</span>
                  <i className="link-arrow" data-feather="chevron-down" />
                </a>
                <div
                  className={`collapse ${
                    location.pathname === "/banner" ||
                    location.pathname === "/drug-generic-name" ||
                    location.pathname === "/usual-provider" ||
                    location.pathname === "/titles" ||
                    location.pathname === "/country" ||
                    location.pathname === "/city" ||
                    location.pathname === "/designation" ||
                    location.pathname === "/suppliers-category" ||
                    location.pathname === "/degree" ||
                    location.pathname === "/requisition-category" ||
                    location.pathname === "/requisition-frequency" ||
                    location.pathname === "/vat-setup" ||
                    location.pathname === "/tax-setup" ||
                    location.pathname === "/delivery-mode" ||
                    location.pathname === "/payment-mode"
                      ? "show"
                      : ""
                  }`}
                  id="emails"
                >
                  <ul className="nav sub-menu">
                    <li className="nav-item">
                      <Link
                        to="/banner"
                        className={`nav-link ${
                          location.pathname === "/banner" ? "active" : ""
                        }`}
                      >
                        Banner
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/drug-generic-name"
                        className={`nav-link ${
                          location.pathname === "/drug-generic-name"
                            ? "active"
                            : ""
                        }`}
                      >
                        Generic Name
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/usual-provider"
                        className={`nav-link ${
                          location.pathname === "/usual-provider"
                            ? "active"
                            : ""
                        }`}
                      >
                        Usual Provider
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/titles"
                        className={`nav-link ${
                          location.pathname === "/titles" ? "active" : ""
                        }`}
                      >
                        Title
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/country"
                        className={`nav-link ${
                          location.pathname === "/country" ? "active" : ""
                        }`}
                      >
                        Country
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/city"
                        className={`nav-link ${
                          location.pathname === "/city" ? "active" : ""
                        }`}
                      >
                        City
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/designation"
                        className={`nav-link ${
                          location.pathname === "/designation" ? "active" : ""
                        }`}
                      >
                        Designation
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/suppliers-category"
                        className={`nav-link ${
                          location.pathname === "/suppliers-category"
                            ? "active"
                            : ""
                        }`}
                      >
                        Supplier Category
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/degree"
                        className={`nav-link ${
                          location.pathname === "/degree" ? "active" : ""
                        }`}
                      >
                        Degree
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/requisition-category"
                        className={`nav-link ${
                          location.pathname === "/requisition-category"
                            ? "active"
                            : ""
                        }`}
                      >
                        Requisition Category
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/requisition-frequency"
                        className={`nav-link ${
                          location.pathname === "/requisition-frequency"
                            ? "active"
                            : ""
                        }`}
                      >
                        Requisition Frequency
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/vat-setup"
                        className={`nav-link ${
                          location.pathname === "/vat-setup" ? "active" : ""
                        }`}
                      >
                        Vat
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/tax-setup"
                        className={`nav-link ${
                          location.pathname === "/tax-setup" ? "active" : ""
                        }`}
                      >
                        Tax
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/delivery-mode"
                        className={`nav-link ${
                          location.pathname === "/delivery-mode" ? "active" : ""
                        }`}
                      >
                        Delivery Mode
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/payment-mode"
                        className={`nav-link ${
                          location.pathname === "/payment-mode" ? "active" : ""
                        }`}
                      >
                        Payment Mode
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/payment-channel"
                        className={`nav-link ${
                          location.pathname === "/payment-channel"
                            ? "active"
                            : ""
                        }`}
                      >
                        Payment Channel
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/delivery-channel"
                        className={`nav-link ${
                          location.pathname === "/delivery-channel"
                            ? "active"
                            : ""
                        }`}
                      >
                        Delivery Channel
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/carrier"
                        className={`nav-link ${
                          location.pathname === "/carrier" ? "active" : ""
                        }`}
                      >
                        Carrier
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/adjustment-type"
                        className={`nav-link ${
                          location.pathname === "/adjustment-type"
                            ? "active"
                            : ""
                        }`}
                      >
                        Adustment Type
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              {/* Admin Setup End */}

              {/* Drug Start */}
              <li
                class={`nav-item ${
                  location.pathname === "/category" ||
                  location.pathname === "/subcategory" ||
                  location.pathname === "/brand" ||
                  location.pathname === "/drugs"
                    ? "active"
                    : ""
                }`}
              >
                <a
                  class="nav-link"
                  data-bs-toggle="collapse"
                  href="#authPages"
                  role="button"
                  aria-expanded={`${
                    location.pathname === "/category" ||
                    location.pathname === "/subcategory" ||
                    location.pathname === "/brand" ||
                    location.pathname === "/drugs"
                      ? "true"
                      : ""
                  }`}
                  aria-controls="authPages"
                >
                  <i class="link-icon" data-feather="unlock"></i>
                  <span class="link-title">Drugs</span>
                  <i class="link-arrow" data-feather="chevron-down"></i>
                </a>
                <div
                  class={`collapse ${
                    location.pathname === "/category" ||
                    location.pathname === "/subcategory" ||
                    location.pathname === "/brand" ||
                    location.pathname === "/drugs"
                      ? "show"
                      : ""
                  }`}
                  id="authPages"
                >
                  <ul class="nav sub-menu">
                    <li className="nav-item">
                      <Link
                        to="/brand"
                        className={`nav-link ${
                          location.pathname === "/brand" ? "active" : ""
                        }`}
                      >
                        Brand
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/category"
                        className={`nav-link ${
                          location.pathname === "/category" ? "active" : ""
                        }`}
                      >
                        Category
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/subcategory"
                        className={`nav-link ${
                          location.pathname === "/subcategory" ? "active" : ""
                        }`}
                      >
                        Sub Category
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/drugs"
                        className={`nav-link ${
                          location.pathname === "/drugs" ? "active" : ""
                        }`}
                      >
                        Drugs (Product)
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              {/* Drug End */}

              {/* Supplier Management Start */}
              <li
                className={`nav-item ${
                  location.pathname === "/supplier" ? "active" : ""
                }`}
              >
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  href="#supplier"
                  role="button"
                  aria-expanded={`${
                    location.pathname === "/supplier" ? "true" : ""
                  }`}
                  aria-controls="supplier"
                >
                  <i className="link-icon" data-feather="user"></i>
                  <span className="link-title">Supplier Management</span>
                  <i className="link-arrow" data-feather="chevron-down"></i>
                </a>
                <div
                  className={`collapse ${
                    location.pathname === "/supplier" ? "show" : ""
                  }`}
                  id="supplier"
                >
                  <ul className="nav sub-menu">
                    <li className="nav-item">
                      <Link
                        to="/supplier"
                        className={`nav-link ${
                          location.pathname === "/supplier" ? "active" : ""
                        }`}
                      >
                        Supplier
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              {/* Supplier Management Start */}

              {/* Requisition start  */}
              {
                // (user.user_type === "admin" || user.user_type === "manager") &&
                // <li className={`nav-item ${location.pathname === "/requisitions" ? "active" : ""}`}>
                //     <Link to="/requisitions" className="nav-link">
                //         <i className="link-icon" data-feather="message-square"></i>
                //         <span className="link-title">Requisition</span>
                //     </Link>
                // </li>
              }
              {/* Requisition End  */}

              {/* Purchase Order start  */}
              {
                // (user.user_type === "admin" || user.user_type === "manager") &&
                // <li className={`nav-item ${location.pathname === "/manager-purchase-order" ? "active" : ""}`}>
                //     <Link to="/manager-purchase-order" className="nav-link">
                //         <i className="link-icon" data-feather="briefcase"></i>
                //         <span className="link-title">Purchase Order</span>
                //     </Link>
                // </li>
              }
              {/* Purchase Order End */}

              {(user.user_type === "admin" || user.user_type === "manager") && (
                <li
                  className={`nav-item ${
                    location.pathname === "/manager-material-receiving"
                      ? "active"
                      : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    data-bs-toggle="collapse"
                    href="#purchase"
                    role="button"
                    aria-expanded={`${
                      location.pathname === "/manager-material-receiving"
                        ? "true"
                        : ""
                    }`}
                    aria-controls="purchase"
                  >
                    <i className="link-icon" data-feather="codesandbox"></i>
                    <span className="link-title">Purchase</span>
                    <i className="link-arrow" data-feather="chevron-down"></i>
                  </a>
                  <div
                    className={`collapse ${
                      location.pathname === "/manager-material-receiving"
                        ? "show"
                        : ""
                    }`}
                    id="purchase"
                  >
                    <ul className="nav sub-menu">
                      <li className="nav-item">
                        <Link
                          to="/manager-material-receiving"
                          className={`nav-link ${
                            location.pathname === "/manager-material-receiving"
                              ? "active"
                              : ""
                          }`}
                        >
                          Purchase In
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
              {(user.user_type === "admin" || user.user_type === "manager") && (
                <li
                  className={`nav-item ${
                    location.pathname === "/current-stock" ||
                    location.pathname === "/manager-sales-return" ||
                    location.pathname === "/manager-adjustment" ||
                    location.pathname === "/manager-store-in"
                      ? "active"
                      : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    data-bs-toggle="collapse"
                    href="#stock"
                    role="button"
                    aria-expanded={`${
                      location.pathname === "/current-stock" ||
                      location.pathname === "/manager-sales-return" ||
                      location.pathname === "/manager-adjustment" ||
                      location.pathname === "/manager-store-in"
                        ? "true"
                        : ""
                    }`}
                    aria-controls="stock"
                  >
                    <i className="link-icon" data-feather="codesandbox"></i>
                    <span className="link-title">Stock Management</span>
                    <i className="link-arrow" data-feather="chevron-down"></i>
                  </a>
                  <div
                    className={`collapse ${
                      location.pathname === "/manager-material-receiving"
                        ? "show"
                        : ""
                    }`}
                    id="stock"
                  >
                    <ul className="nav sub-menu">
                      <li className="nav-item">
                        <Link
                          to="/current-stock"
                          className={`nav-link ${
                            location.pathname === "/manager-current-stock"
                              ? "active"
                              : ""
                          }`}
                        >
                          Current Stock
                        </Link>
                      </li>
                      {/* <li className="nav-item">
                                                    <Link to="/manager-material-receiving" className={`nav-link ${location.pathname === "/manager-material-receiving" ? "active" : ""}`}>MRR</Link>
                                                </li> */}
                      <li className="nav-item">
                        <Link
                          to="/manager-store-in"
                          className={`nav-link ${
                            location.pathname === "/manager-store-in"
                              ? "active"
                              : ""
                          }`}
                        >
                          Store In
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/manager-sales-return"
                          className={`nav-link ${
                            location.pathname === "/manager-sales-return"
                              ? "active"
                              : ""
                          }`}
                        >
                          Sales Return
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/manager-adjustment"
                          className={`nav-link ${
                            location.pathname === "/manager-adjustment"
                              ? "active"
                              : ""
                          }`}
                        >
                          Adjustment
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
              {/* Stock Management End */}

              {(user.user_type === "admin" || user.user_type === "manager") && (
                <li
                  className={`nav-item ${location.pathname === "/transaction"}`}
                >
                  <a
                    className="nav-link"
                    data-bs-toggle="collapse"
                    href="#transaction"
                    role="button"
                    aria-expanded={`${location.pathname === "/transaction"}`}
                    aria-controls="transaction"
                  >
                    <i className="link-icon" data-feather="trending-up"></i>
                    <span className="link-title">Transaction</span>
                    <i className="link-arrow" data-feather="chevron-down"></i>
                  </a>
                  <div
                    className={`collapse ${
                      location.pathname === "/transaction" ||
                      location.pathname === "/transaction-report"
                        ? "show"
                        : ""
                    }`}
                    id="transaction"
                  >
                    <ul className="nav sub-menu">
                      <li className="nav-item">
                        <Link
                          to="/transaction"
                          className={`nav-link ${
                            location.pathname === "/transaction" ? "active" : ""
                          }`}
                        >
                          Transaction Details
                        </Link>
                      </li>
                      {/* <li className="nav-item">
                                                    <Link to="/transaction-report" className={`nav-link ${location.pathname === "/transaction-report" ? "active" : ""}`}>Report</Link>
                                                </li> */}
                    </ul>
                  </div>
                </li>
              )}
              {(user.user_type === "admin" || user.user_type === "manager") && (
                <li className={`nav-item`}>
                  <a
                    className="nav-link"
                    data-bs-toggle="collapse"
                    href="#reports"
                    role="button"
                    aria-expanded={`${
                      location.pathname === "/sales-report" ||
                      location.pathname === "/sales-summary-report" ||
                      location.pathname === "/credit-sales-report" ||
                      location.pathname === "/sales-return-report" ||
                      location.pathname === "/credit-sales-report-by-member" ||
                      location.pathname === "/purchase-report" ||
                      location.pathname === "/purchase-summary-report" ||
                      location.pathname === "/purchase-return-report" ||
                      location.pathname === "/supplier-due-report" ||
                      location.pathname === "/stock-closing-report" ||
                      location.pathname === "/stock-adjustment-report" ||
                      location.pathname === "/product-expiry-report" ||
                      location.pathname === "/profit-loss-report" ||
                      location.pathname === "/sales-report-by-member"
                    }`}
                    aria-controls="reports"
                  >
                    <i className="link-icon" data-feather="trending-up"></i>
                    <span className="link-title">Reports</span>
                    <i className="link-arrow" data-feather="chevron-down"></i>
                  </a>
                  <div
                    className={`collapse ${
                      location.pathname === "/sales-report" ||
                      location.pathname === "/sales-summary-report" ||
                      location.pathname === "/credit-sales-report" ||
                      location.pathname === "/sales-return-report" ||
                      location.pathname === "/credit-sales-report-by-member" ||
                      location.pathname === "/purchase-report" ||
                      location.pathname === "/purchase-summary-report" ||
                      location.pathname === "/purchase-return-report" ||
                      location.pathname === "/supplier-due-report" ||
                      location.pathname === "/stock-closing-report" ||
                      location.pathname === "/stock-adjustment-report" ||
                      location.pathname === "/product-expiry-report" ||
                      location.pathname === "/profit-loss-report" ||
                      location.pathname === "/sales-report-by-member"
                        ? "show"
                        : ""
                    }`}
                    id="reports"
                  >
                    <ul className="nav sub-menu">
                      <li className="nav-item">
                        <Link
                          to="/sales-report"
                          className={`nav-link ${
                            location.pathname === "/sales-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Daily Sales{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/sales-summary-report"
                          className={`nav-link ${
                            location.pathname === "/sales-summary-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Sales Summary{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/sales-return-report"
                          className={`nav-link ${
                            location.pathname === "/sales-return-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          {" "}
                          Sales Return{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/sales-report-by-member"
                          className={`nav-link ${
                            location.pathname === "/sales-report-by-member"
                              ? "active"
                              : ""
                          }`}
                        >
                          {" "}
                          Member Wise Sales{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/credit-sales-report"
                          className={`nav-link ${
                            location.pathname === "/credit-sales-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Credit Sales{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/credit-sales-report-by-member"
                          className={`nav-link ${
                            location.pathname ===
                            "/credit-sales-report-by-member"
                              ? "active"
                              : ""
                          }`}
                        >
                          Member Wise Credit Sales
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/purchase-report"
                          className={`nav-link ${
                            location.pathname === "/purchase-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Purchase
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/purchase-summary-report"
                          className={`nav-link ${
                            location.pathname === "/purchase-summary-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Purchase Summary
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/purchase-return-report"
                          className={`nav-link ${
                            location.pathname === "/purchase-return-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Purchase Return
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/supplier-due-report"
                          className={`nav-link ${
                            location.pathname === "/supplier-due-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Supplier Due
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/stock-closing-report"
                          className={`nav-link ${
                            location.pathname === "/stock-closing-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Stock Closing
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/stock-adjustment-report"
                          className={`nav-link ${
                            location.pathname === "/stock-adjustment-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Stock Adjustment
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/product-expiry-report"
                          className={`nav-link ${
                            location.pathname === "/product-expiry-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Product Expiry
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/profit-loss-report"
                          className={`nav-link ${
                            location.pathname === "/profit-loss-report"
                              ? "active"
                              : ""
                          }`}
                        >
                          Profit / Loss
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
              {(user.user_type === "admin" || user.user_type === "manager") && (
                <li
                  className={`nav-item ${
                    location.pathname === "/user-role-managment"
                  }`}
                >
                  <a
                    className="nav-link"
                    data-bs-toggle="collapse"
                    href="#hr"
                    role="button"
                    aria-expanded={`${
                      location.pathname === "/user-role-managment"
                    }`}
                    aria-controls="hr"
                  >
                    <i className="link-icon" data-feather="users"></i>
                    <span className="link-title">Hr Management</span>
                    <i className="link-arrow" data-feather="chevron-down"></i>
                  </a>
                  <div
                    className={`collapse ${
                      location.pathname === "/user-role-managment" ? "show" : ""
                    }`}
                    id="hr"
                  >
                    <ul className="nav sub-menu">
                      <li className="nav-item">
                        <Link
                          to="/user-role-managment"
                          className={`nav-link ${
                            location.pathname === "/user-role-managment"
                              ? "active"
                              : ""
                          }`}
                        >
                          User Role
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}

              {(user.user_type === "admin" || user.user_type === "manager") && (
                <>
                  <li
                    className={`nav-item ${
                      location.pathname === "/customers" ? "active" : ""
                    }`}
                  >
                    <Link to="/customers" className="nav-link">
                      <i className="link-icon" data-feather="user-check"></i>
                      <span className="link-title">Customers</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location.pathname === "/sync" ? "active" : ""
                    }`}
                  >
                    <Link to="/sync" className="nav-link">
                      <i className="link-icon" data-feather="refresh-ccw"></i>
                      <span className="link-title">Sync with online</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
