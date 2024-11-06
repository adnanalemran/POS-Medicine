import React from 'react'
import AuthUser from '../Components/AuthUser';
import {useEffect, useState} from 'react';
import http from "../http";
import {Link} from 'react-router-dom'
import moment from 'moment';
import Swal from "sweetalert2";
import SearchBar from './SearchBar';
import dummyImage from '../front_assets/user_images/dummy.jpg'
import '../CSS/Navbar.css'


export default function Navbar() {

    const {http, token, logout, user} = AuthUser();
    const [mng_req_notifications, setMngRqNotification] = useState([]);
    const [sls_req_notifications, setSlsRqNotification] = useState([]);
    const [spplr_req_notifications, setSpplrRqNotification] = useState([]);
    const userLogout = () => {
        if (token != undefined) {
            logout();
        }
    }

    // console.log(user.name, "ff")
    const [mng_status_upd, setMngStatusUpd] = useState();

    useEffect(() => {
        http.get(`/managers-notifications`).then(res => {
            // console.log("req data", res.data.sales);
            if (res.status === 200) {
                setMngRqNotification(res.data.data);
                setSlsRqNotification(res.data.sales);
                setSpplrRqNotification(res.data.supplier);
            }
        });
    }, [mng_status_upd]);


    const [userInfo, setuserInfo] = useState();


    useEffect(() => {
        setuserInfo(user)
    }, [])



    const salesData = (e, id) => {
        // e.preventDefault();
        http.delete(`/update-requisition-notifications/${id}`).then(res => {
        });
    }


    const managerData = (e, id) => {
        // e.preventDefault();
        http.delete(`/update-manager-requisition-notifications/${id}`).then(res => {
            setMngStatusUpd(Math.random())
        });
    }
    const supplierData = (e, id) => {
        // e.preventDefault();
        http.delete(`/update-supplier-requisition-notifications/${id}`).then(res => {
            setMngStatusUpd(Math.random())
        });
    }

    const supplierPoData = (e, id) => {
        // e.preventDefault();
        http.delete(`/update-supplier-po-notifications/${id}`).then(res => {
            setMngStatusUpd(Math.random())
        });
    }
    const salesPoData = (e, id) => {
        // e.preventDefault();
        http.delete(`/update-sales-po-notifications/${id}`).then(res => {
            setMngStatusUpd(Math.random())
        });
    }

    return (
        <div className='custom_navbar'>
            <nav className="navbar">
                <a href="#" className="sidebar-toggler">
                    <i data-feather="menu"/>
                </a>
                <div className="navbar-content">
                    <ul className="navbar-nav">
                       
                        {
                            user.user_type === "sales" || user.user_type === "admin"?
                                <li className="nav-item dropdown">
                                    
                                    <div className="dropdown-menu p-0" aria-labelledby="notificationDropdown">
                                        <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                                            <p>{sls_req_notifications.length} New Notifications</p>
                                            {/*<Link to="manager-requisition" className="text-muted mx-4">Requisition List</Link>*/}
                                        </div>
                                        <div className="manager_notifications">

                                            {
                                                sls_req_notifications.map((item) => {
                                                    return (
                                                        <>
                                                            <Link to={`${item.action_users_role=='supplier-confirm-po' ? 'view-purchase-order': 'proceeded-requisition'}/${item.requisition_id}`} onClick={(e) => {item.action_users_role=='supplier-confirm-po' ? salesPoData(e, item.id) : salesData(e, item.id) } }
                                                                  className={`dropdown-item d-flex align-items-center py-2 ${item.sales_read_status==='yes' ? 'read' : 'not_read'}`}>
                                                                <div
                                                                    className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                         stroke-linejoin="round" className="feather feather-gift icon-sm text-white">
                                                                        <polyline points="20 12 20 22 4 22 4 12"></polyline>
                                                                        <rect x="2" y="7" width="20" height="5"></rect>
                                                                        <line x1="12" y1="22" x2="12" y2="7"></line>
                                                                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                                                                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                                                                    </svg>
                                                                </div>
                                                                <div className="flex-grow-1 me-2">
                                                                    <p>({ item.action_users_role=='supplier-confirm-po' ? item.purchase_order_no : item.requisition_no}) {item.action_users_role=='manager-cancelled' ? 'Manager cancelled this requisition.' : item.action_users_role=='supplier-askforpo' ? 'Supplier ask for P.O.' : item.action_users_role=='supplier-confirmed' ? 'Requisition confirmed by supplier.' : item.action_users_role=='manager-approved' ? 'Requisition approved by manager.' : item.action_users_role=='supplier-confirm-po' ? 'Supplier Confirmed this P.O.' : ' ' } </p>
                                                                    <p className="tx-12 text-muted">{moment(item.created_at).fromNow()}</p>
                                                                </div>
                                                            </Link>
                                                        </>

                                                    )
                                                })
                                            }

                                        </div>
                                        <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                                            <Link to="manager-requisition" className="text-muted mx-4">Requisition List</Link>

                                            {/*<a href="javascript:;">View all</a>*/}
                                        </div>
                                    </div>
                                </li>
                                : ""
                        }

                        {
                            user.user_type === "manager"?
                                <li className="nav-item dropdown">
                                   
                                    <div className="dropdown-menu p-0" aria-labelledby="notificationDropdown">
                                        <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                                            <p>{mng_req_notifications.length} New Notifications</p>
                                            {/*<Link to="manager-requisition" className="text-muted mx-4">Requisition List</Link>*/}
                                        </div>
                                        <div className="manager_notifications">

                                            {
                                                mng_req_notifications.map((item) => {
                                                    return (
                                                        <>
                                                            <Link to={`edit-manager-requisition/${item.requisition_id}`} onClick={(e) => managerData(e, item.id)}
                                                                  className={`dropdown-item d-flex align-items-center py-2 ${item.manager_read_status==='yes' ? 'read' : 'not_read'}`}>
                                                                <div
                                                                    className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                         stroke-linejoin="round" className="feather feather-gift icon-sm text-white">
                                                                        <polyline points="20 12 20 22 4 22 4 12"></polyline>
                                                                        <rect x="2" y="7" width="20" height="5"></rect>
                                                                        <line x1="12" y1="22" x2="12" y2="7"></line>
                                                                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                                                                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                                                                    </svg>
                                                                </div>
                                                                <div className="flex-grow-1 me-2">
                                                                    <p>({item.requisition_no}) {item.action_users_role=='sales' ? 'You have a new requisition approval request.' : item.action_users_role=='supplier-confirmed' ? 'Requisition confirmed by supplier.' : item.action_users_role=='supplier-askforpo' ? 'Supplier ask for P.O.' : ' ' } </p>
                                                                    <p className="tx-12 text-muted">{moment(item.created_at).fromNow()}</p>
                                                                </div>
                                                            </Link>
                                                        </>

                                                    )
                                                })
                                            }

                                        </div>
                                        <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                                            <Link to="manager-requisition" className="text-muted mx-4">Requisition List</Link>

                                            {/*<a href="javascript:;">View all</a>*/}
                                        </div>
                                    </div>
                                </li>
                                : ""
                        }
                        {
                            user.user_type === "supplier"?
                                <li className="nav-item dropdown">
                                    
                                    <div className="dropdown-menu p-0" aria-labelledby="notificationDropdown">
                                        <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                                            <p>{spplr_req_notifications.length} New Notifications</p>
                                            {/*<Link to="manager-requisition" className="text-muted mx-4">Requisition List</Link>*/}
                                        </div>
                                        <div className="manager_notifications">

                                            {
                                                spplr_req_notifications.map((item) => {
                                                    return (
                                                        <>
                                                            <Link to={`${item.action_users_role=='sales-po' ? 'view-supplier-purchase-order': 'edit-manager-requisition'}/${item.requisition_id}`} onClick={(e) => {item.action_users_role=='sales-po' ? supplierPoData(e, item.id) : supplierData(e, item.id) } }
                                                                  className={`dropdown-item d-flex align-items-center py-2 ${item.supplier_read_status==='yes' ? 'read' : 'not_read'}`}>
                                                                <div
                                                                    className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                         stroke-linejoin="round" className="feather feather-gift icon-sm text-white">
                                                                        <polyline points="20 12 20 22 4 22 4 12"></polyline>
                                                                        <rect x="2" y="7" width="20" height="5"></rect>
                                                                        <line x1="12" y1="22" x2="12" y2="7"></line>
                                                                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                                                                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                                                                    </svg>
                                                                </div>
                                                                <div className="flex-grow-1 me-2">
                                                                    <p>({ item.action_users_role=='sales-po' ? item.purchase_order_no : item.requisition_no}) {item.action_users_role=='sales-po' ? 'You have a new P.O. request.' : item.action_users_role=='manager-approved' ? 'New requisition confirmation request' : ' ' } </p>

                                                                    {/*<p>({item.requisition_no}) New requisition confirmation request</p>*/}
                                                                    <p className="tx-12 text-muted">{moment(item.created_at).fromNow()}</p>
                                                                </div>
                                                            </Link>
                                                        </>

                                                    )
                                                })
                                            }

                                        </div>
                                        <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                                            <Link to="manager-requisition" className="text-muted mx-4">Requisition List</Link>

                                            {/*<a href="javascript:;">View all</a>*/}
                                        </div>
                                    </div>
                                </li>
                                : ""
                        }

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">
                                {
                                    user.user_image 
                                    ?
                                    <>
                                        <img className="wd-30 ht-30 rounded-circle" src={user.user_image} alt="profile"/>
                                    </>
                                    :
                                    <>
                                        <img className="wd-30 ht-30 rounded-circle" src={dummyImage} alt="profile"/>
                                    </>
                                }
                                {/* <img className="wd-30 ht-30 rounded-circle" src="https://via.placeholder.com/30x30" alt="profile"/> */}
                            </a>
                            <div className="dropdown-menu p-0" aria-labelledby="profileDropdown">
                                <div className="d-flex flex-column align-items-center border-bottom px-5 py-3">
                                    <div className="mb-3">
                                        {/* <img className="wd-80 ht-80 rounded-circle" src="https://via.placeholder.com/80x80" alt/> */}
                                        {
                                            user.user_image 
                                            ?
                                            <>
                                                <img className="wd-80 ht-80 rounded-circle" src={user.user_image} alt="profile"/>
                                            </>
                                            :
                                            <>
                                                <img className="wd-80 ht-80 rounded-circle" src={dummyImage} alt="profile"/>
                                            </>
                                        }
                                    </div>
                                    <div className="text-center">
                                        <p className="tx-16 fw-bolder">{
                                            userInfo != null ? userInfo.name : "Dr. Jone"
                                        }</p>
                                        <p className="tx-12 text-muted">{
                                            userInfo != null ? userInfo.email : "Dr. Jone"
                                        }</p>
                                    </div>
                                </div>
                                <ul className="list-unstyled p-1">
                                    {/* <li className="dropdown-item py-2">
                                        <a href="javascript:;" className="text-body ms-0">
                                            <i className="me-2 icon-md" data-feather="repeat"/>
                                            <span>Switch User</span>
                                        </a>
                                    </li> */}
                                    <li onClick={userLogout} style={{cursor:'pointer'}} className="dropdown-item py-2">
                                        <a className="text-body ms-0">
                                            <i className="me-2 icon-md" data-feather="log-out"/>
                                            <span>Log Out</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
