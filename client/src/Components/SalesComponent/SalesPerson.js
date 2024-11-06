import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import AuthUser from '../AuthUser';
import Modal from "react-modal";
import QRCode from 'react-qr-code';
import Drawer from './Drawer';
import TakePictureModal from './TakePictureModal';
import { propsContext } from '../dashboard';

const SalesPerson = () => {

    const {http, token, logout} = AuthUser();
    const [user_detail,setUserDetail] = useState();

    const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
    },
    };
    const customStyles1 = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "260px",
        padding: "10px"
    },
    };
    
    const userLogout = () => {
        if (token != undefined){
            logout();
        }
    }

    useEffect(() => {
        fetchAllUser();
    },[])

    const fetchAllUser = () => {
        http.post('me').then((res) => {
            setUserDetail(res.data);
        });
    }

    function renderElement() {
        if (user_detail){
        return  <div> 
                    <h2>Name</h2>
                    <p>{user_detail.name}</p>
                    <h2>Email</h2>
                    <p>{user_detail.email}</p>
                </div>
        }else{
            return <div>Loading...</div>
        }
    }


    // Main content for sales start 

    // const [smallMenu, setSmallMenu] = useState(true);
    const [activeId, setActiveId] = useState(0);
    const [filteredMedicine, setFilteredMedicine] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    // const [medicineCart,setMedicineCart] = useState([])
    const {medicineCart, setMedicineCart ,setPrescriptionImage } = useContext(propsContext)

    const handleKeyPress = (e) => {
        if (e.code === "ArrowDown") {
            if (activeId < filteredMedicine.length - 1) {
            setActiveId((prev) => prev + 1);
            }
        } else if (e.code === "ArrowUp") {
            if (activeId !== 0) {
            setActiveId((prev) => prev - 1);
            }
        } else if (e.code === "Enter") {
            let alreadyExist = false;
            const newCart = [...cart];
            newCart.map((item) => {
            if (item.id === filteredMedicine[activeId].id) {
                item.qty++;
                alreadyExist = true;
            }
            });
            if (!alreadyExist && filteredMedicine.length > 0) {
            newCart.push({
                ...filteredMedicine[activeId],
                qty: 1,
                boxType: "leaf",
                pktSize: 10,
                noOfBox: 1,
                pcs: 10,
                price: 20,
                disc: 10,
                totalPrice: 200,
            });
            }
    
            setCart(newCart);
        }
        };

        const medicineHandler = (item, i) => {
        let alreadyExist = false;
        const newCart = [...cart];
        newCart.map((pd) => {
            if (pd.id === item.id) {
            pd.qty++;
            alreadyExist = true;
            }
        });
        if (!alreadyExist) {
            newCart.push({
            ...item,
            qty: 1,
            boxType: "leaf",
            pktSize: 10,
            noOfBox: 1,
            pcs: 10,
            price: 20,
            disc: 10,
            totalPrice: 200,
            });
        }
        setCart(newCart);
        setActiveId(i);
        };


    const [stickers, setStickers] = useState([]);
    const [selectedSticker, setSelectedSticker] = useState([]);
    const [openStickerModal, setOpenStickerModal] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [stickerS, setStickerS] = useState(null);

        // sticker create 
    const [stickerData, setStickerData] = useState({
        id: "",
        name: "",
        dose: "1",
        frequency: "Daily",
        food: "With Meal",
        route: "Oral",
        others: "",
        qty: "",
        doctor: ""
    });

    const componentRefAllStickers = useRef();
    const handlePrintAllStickers = useReactToPrint({
    content: () => componentRefAllStickers.current,
    });

    const handleStickerSelect = (item, e) => {
    const existingStickers = [...stickers]
    let newSelectedStickers = [...selectedSticker]
    if (e.target.checked) {
        existingStickers.map(st => {
        if (st.id === item.id) {
            newSelectedStickers.push({ ...st })
        }
        })
    }
    if (!e.target.checked) {
        newSelectedStickers = newSelectedStickers.filter(slt => slt.id !== item.id)
    }
    setSelectedSticker(newSelectedStickers)
    }

    const boxTypeHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
        if (pd.id === item.id) {
        pd.boxType = e.target.value;
        }
    });
    setCart(existCart);
    };

    const pktSizeHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
            pd.pktSize = parseFloat(e.target.value);
            pd.pcs = item.noOfBox * pd.pktSize;
            pd.totalPrice = pd.price * pd.pcs;
            }
            setCart(existCart);
        });
        };
        
        const boxSizeHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
            pd.noOfBox = parseFloat(e.target.value);
            pd.pcs = pd.noOfBox * item.pktSize;
            pd.totalPrice = pd.price * pd.pcs;
            // pd.totalPrice = pd.price * item.pcs*parseFloat(e.target.value);
            }
        });
        setCart(existCart);
        };

        const boxQtyHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
            pd.pcs = parseFloat(e.target.value);
            pd.totalPrice = pd.price * pd.pcs;
            }
        });
        setCart(existCart);
        };

        const createSticker = (item) => {
        let newStickerData = { ...stickerData };
        newStickerData.name = item.macrohealth_sg;
        newStickerData.qty = item.pcs;
        newStickerData.id = item.id;
        setStickerData(newStickerData);
        setIsOpen(true);
        };

        const removeMedicine = (item) => {
        const existCart = [...cart];
        let newSelectedStickers = [...selectedSticker]
        newSelectedStickers = newSelectedStickers.filter(slt => slt.id !== item.id)
        const newCart = existCart.filter((pd) => pd.id !== item.id);
        setCart(newCart);
        setMedicineCart(newCart)
        setSelectedSticker(newSelectedStickers)
        };

        const stickerModalOpen = (item) => {
        let newSticker = stickers.find((st => st.id === item.id))
        setStickerS(newSticker)
        setOpenStickerModal(true)
        }
    
    const handleDoseInfo = (e) => {
    const { name, value } = e.target;
    setStickerData({ ...stickerData, [name]: value });
    };

    return (
        <>
            <div className={`col-12`}>
                <div className="">
                    {/* search start */}
                    <div className="search-container border-bottom pb-2 row">
                        <div className="search-box-container col-md-9 d-flex">
                            <input
                            type="text"
                            placeholder="Search"
                            onKeyDown={handleKeyPress}
                            value={searchWord}
                            onChange={(e) => {
                                setSearchWord(e.target.value)
                                if (e.target.value.length > 1) {
                                setLoading(true);
                                axios
                                    .get(
                                    `https://dev.macrohealthplus.org/mhp_server/public/api/search-drug/${e.target.value}`
                                    )
                                    .then((res) => {
                                    setFilteredMedicine(res.data);
                                    setLoading(false);
                                    });
                                setActiveId(0);
                                } else {
                                setFilteredMedicine([]);
                                setLoading(false);
                                setActiveId(0);
                                }
                            }}
                            className="form-control form-control-sm"
                            />
                            <div style={{position:'relative', right:'24px', top:'4px'}}>
                                {
                                    searchWord &&
                                    <ImCross style={{color:'gray', fontSize:'10px', cursor:'pointer'}} onClick={() => { setSearchWord(""); setFilteredMedicine([]) }}></ImCross>
                                }
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-12 d-flex search-invoice-section">
                            <h6 className="mx-sm-2 text-xs mt-sm-2  mx-md-3 mt-1 whitespace-nowrap lg:text-[14px]">Invoice No.: 16342</h6>
                            {
                            location.pathname === "/dashboard"  &&
                            <Drawer />
                            }
                        </div>
                    </div>
                    {/* search end */}

                    {/* Filtered  medicine show  */}
                    {filteredMedicine.length > 0 && !loading && (
                    <div className="search-result-container border g-doc-scroll p-1">
                        {filteredMedicine.map((item, i) => (
                        <div
                            onClick={() => medicineHandler(item, i)}
                            className={`${activeId === i && "active-medicine"
                            } row filtered-medicine mb-2`}
                        >
                            <div className="col-3">
                            <p>{item.macrohealth_sg}</p>
                            </div>
                            <div className="col-4">
                            <p>{item.drug_name}</p>
                            </div>
                            <div className="col-3">
                            <p>Exp.date: June, 2022</p>
                            </div>
                            <div className="col-2">
                            <p>
                                <span className="medicine-inStock">
                                In Stock{" "}
                                <i
                                    style={{ fontSize: "7px" }}
                                    className=" ms-2 fa-solid fa-circle"
                                ></i>
                                </span>
                            </p>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                    {loading && (
                    <i
                        style={{ fontSize: "20px", marginLeft: "50%" }}
                        className=" mt-2 fas fa-spinner fa-spin"
                    ></i>
                    )}
                    {/* Filtered  medicine show  */}

                    {/* prescription upload  */}
                    <div className="prescription-upload border-bottom pb-1 mt-2"> 
                        <div className="row">
                            <div className={`col-12`}>
                            <div className="row">
                                <div className="col-2 text-center">
                                    <p className="mt-1 mb-0 text-xs lg:text-[14px] whitespace-nowrap">Prescription Upload</p>
                                </div>
                                <div className="col-5">
                                    <input onChange={(e)=>setPrescriptionImage(e.target.files[0])} type="file" className="form-control form-control-sm ms-1" />
                                </div>
                                <div className="col-5 d-flex">
                                <TakePictureModal />
                                {
                                    location.pathname === "/dashboard"  &&
                                    <div>
                                        <input type="text" className="form-control form-control-sm" placeholder="Search invoice" />
                                    </div>
                                }

                                </div>
                                {/* <div className="col-2">
                                <input type="text" className="form-control form-control-sm" placeholder="Search invoice" />
                                </div> */}
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* prescription upload  */}

                    {/* medicine cart  */}
                    <div className="cart-container border-bottom border-top mt-2">
                        <div className="row">
                            {
                            selectedSticker.length > 0 &&
                            <div className="d-flex justify-content-end my-2">
                                <button onClick={handlePrintAllStickers} className="custom-btn">Print All Stickers</button>
                            </div>
                            }
                            <table className="cart-table">
                            <tr className="cart-table-head">
                                <td></td>
                                <td width={"27%"}>Product Name</td>
                                <td>Batch</td>
                                <td>Exp. Date</td>
                                <td>Box Type</td>
                                <td> Size</td>
                                <td width={"6%"}>Box</td>
                                <td>Unit</td>
                                <td width={"6%"}>Qty.</td>
                                <td>Discount</td>
                                <td>MRP</td>
                                <td>Total</td>
                                <td width={"6%"}>Action</td>
                            </tr>
                            {cart.length > 0 &&
                                cart.map((item, i) => (
                                <tr key={i} className="border-bottom ">
                                    <td>
                                    <input type="checkbox" onChange={(e) => handleStickerSelect(item, e)} className="form-check" />
                                    </td>
                                    <td width={"27%"}>{item.macrohealth_sg}</td>
                                    <td>321132</td>
                                    <td>02/05/2023</td>
                                    {/* <td>
                                        <select 
                                            onChange={(e) => boxTypeHandler(item, e)}
                                            aria-label=".form-select-sm example"
                                        >
                                            <option value="Leaf">Leaf</option>
                                            <option value="Full Box">Full Box</option>
                                            <option value="Bottle">Bottle</option>
                                        </select>
                                    </td> */}
                                    <td width={"10%"}>
                                        <select 
                                            onChange={(e) => boxTypeHandler(item, e)}
                                            aria-label=".form-select-sm example" className="form-select form-select-sm">
                                            <option value="1">Leaf</option>
                                            <option value="2">Full Box</option>
                                            <option value="3">Bottle</option>
                                        </select>
                                    </td>
                                    
                                    {/* <td>
                                        <select
                                            onChange={(e) => pktSizeHandler(item, e)}
                                            aria-label=".form-select-sm example"
                                        >
                                            <option value="10">1/10</option>
                                            <option value="16">1/16</option>
                                        </select>
                                    </td> */}
                                    <td width={"8%"}>
                                        <select 
                                            onChange={(e) => pktSizeHandler(item, e)}
                                            aria-label=".form-select-sm example" className="form-select form-select-sm">
                                            <option value="10">1/10</option>
                                            <option value="16">1/16</option>
                                        </select>
                                    </td>
                                    <td width={"4%"}>
                                        <input
                                            onChange={(e) => boxSizeHandler(item, e)}
                                            defaultValue={item.noOfBox}
                                            className="form-control form-control-sm "
                                            type="number"
                                        />
                                    </td>
                                    <td width={"7%"}>
                                        <select aria-label=".form-select-sm example" className="form-select form-select-sm">
                                            <option value="1">Pcs</option>
                                            <option value="2">Bottle</option>
                                        </select>
                                    </td>
                                    <td>
                                    <input
                                        value={item.pcs}
                                        onChange={(e) => boxQtyHandler(item, e)}
                                        className="form-control form-control-sm"
                                        type="number"
                                    />
                                    {/* ${item.noOfBox * item.pktSize} */}
                                    </td>
                                    <td>{item.disc}%</td>
                                    <td>{item.price}</td>
                                    <td>
                                    {/* <input type="text" value={(item.price - item.disc) * item.pcs} className="form-control form-control-sm" /> */}
                                    {item.totalPrice}
                                    </td>
                                    <td>
                                    <i
                                        onClick={() => createSticker(item)}
                                        className="far fa-edit me-1 text-blue-500"
                                    ></i>
                                    <i
                                        onClick={() => removeMedicine(item)}
                                        className="fa-solid fa-trash-can me-1 text-red-400"
                                    ></i>
                                    <i onClick={() => stickerModalOpen(item)} className="fa-solid fa-circle-info text-emerald-600"></i>
                                    </td>
                                </tr>
                                ))}
                            </table>
                            {/* medicine cart  */}
                            {/* sticker create modal  */}

                            {/* <ToastContainer /> */}
                            <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setIsOpen(false)}
                            style={customStyles}
                            contentLabel="Example Modal"
                            >
                            <p>{stickerData.name}</p>
                            <div className="row mb-2">
                                <div className="col-3">
                                <label>Dose</label>
                                </div>
                                <div className="col-9">
                                <select
                                    onChange={handleDoseInfo}
                                    name="dose"
                                    className="form-select form-select-sm mb-1"
                                    aria-label=".form-select-sm example"
                                >
                                    <option defaultValue="1">1</option>
                                    <option value="2">2</option>
                                    <option value="10 mls">10 mls</option>
                                    <option value="3.5 ml">3.5 ml</option>
                                    <option value="2.5 ml">2.5 ml</option>
                                    <option value="1/2">1/2</option>
                                </select>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-3">
                                <label>Frequency</label>
                                </div>
                                <div className="col-9">
                                <select
                                    onChange={handleDoseInfo}
                                    name="frequency"
                                    className="form-select form-select-sm mb-1"
                                    aria-label=".form-select-sm example"
                                >
                                    <option defaultValue="Daily">Daily</option>
                                    <option value="TDS">TDS</option>
                                    <option value="BD">BD</option>
                                    <option value="At Night">At Night</option>
                                    <option value="In the evening">In the evening</option>
                                    <option value="Frequently">Frequently</option>
                                </select>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-3">
                                <label>Food</label>
                                </div>
                                <div className="col-9">
                                <select
                                    onChange={handleDoseInfo}
                                    name="food"
                                    className="form-select form-select-sm mb-1"
                                    aria-label=".form-select-sm example"
                                >
                                    <option defaultValue="With Meal">With Meal</option>
                                    <option value="Before Meal">Before Meal</option>
                                    <option value="After Meal">After Meal</option>
                                </select>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-3">
                                <label>Others</label>
                                </div>
                                <div className="col-9">
                                <select
                                    onChange={handleDoseInfo}
                                    name="others"
                                    className="form-select form-select-sm mb-1"
                                    aria-label=".form-select-sm example"
                                >
                                    <option defaultValue="Right Side">Right Side</option>
                                    <option value="Left Side">Left Side</option>
                                    <option value="Both Side">Both Side</option>
                                </select>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-3">
                                <label>Route</label>
                                </div>
                                <div className="col-9">
                                <select
                                    onChange={handleDoseInfo}
                                    name="route"
                                    className="form-select form-select-sm mb-1"
                                    aria-label=".form-select-sm example"
                                >
                                    <option defaultValue="Oral">Oral</option>
                                    <option value="Injection">Injection</option>
                                    <option value="Tropical">Tropical</option>
                                    <option value="Rectal">Rectal</option>
                                </select>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-3">
                                <label>Doctor</label>
                                </div>
                                <div className="col-8">
                                <select
                                    onChange={handleDoseInfo}
                                    name="doctor"
                                    className="form-select form-select-sm mb-1"
                                    aria-label=".form-select-sm example"
                                >
                                    <option defaultValue="Select">Select</option>
                                    <option defaultValue="Dr Wiwi">Dr Wiwi</option>
                                    <option value="Dr Blessing">Dr Blessing</option>
                                    <option value="Dr Sunshine">Dr Sunshine</option>
                                    <option value="Dr Grab">Dr Grab</option>
                                </select>
                                </div>
                                {/* <div className="col-1 d-flex justify-content-center align-items-center">
                                    <i onClick={(e) => setAnchorEl(e.currentTarget)} className="fa-solid fa-user-plus doctor-add-icon"></i>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={() => setAnchorEl(null)}
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                        }}
                                    >

                                        <div className="left-popup p-2">
                                        <div className="row">
                                            <div className="col-3">
                                            <label>Name</label>
                                            </div>
                                            <div className="col-9">
                                            <input type="text" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                        <div className="row mt-2 mb-2">
                                            <div className="col-3">
                                            <label>Hospital</label>
                                            </div>
                                            <div className="col-9">
                                            <input type="text" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button onClick={() => setAnchorEl(null)} className="custom-btn me-2">Cancel</button>
                                            <button className="custom-btn">Add</button>
                                        </div>
                                        </div>
                                    </Popover>
                                </div> */}
                            </div>
                            {/* <div className="d-flex justify-content-end">
                                <button onClick={closeModal} className="custom-btn me-2">Cancel</button>
                                <button onClick={addSticker} className="custom-btn">Save</button>
                            </div> */}
                            </Modal>

                            {/* sticker create modal  */}
                            {/* sticker Print modal  */}
                            {/* <Modal
                            isOpen={openStickerModal}
                            onRequestClose={() => setOpenStickerModal(false)}
                            style={customStyles1}
                            contentLabel="Example Modal"
                            >
                            <div ref={componentRef} className="d-flex align-items-center">
                                <div className="sticker-print mt-2 mx-2">

                                {
                                    stickerS ?
                                    <div className="row">
                                        <div className="col-10">
                                        <span className="sticker-patient-info-heading d-block">Roger Westervelt</span>
                                        <div className="d-flex justify-content-between">
                                            <p><span className="sticker-patient-info-heading">HN : </span> 10223453</p>
                                            <p><span className="sticker-patient-info-heading">DOB : </span> 03/05/1990</p>
                                        </div>
                                        <p>{stickerS.name}</p>
                                        <span className="sticker-print-rule">Take {stickerS.route} {stickerS.dose} {stickerS.frequency} {stickerS.food}</span>
                                        </div>
                                        <div className="col-2">
                                        <div className="sticker-qty">
                                            <span className="sticker-patient-info-heading d-block">Qty </span>
                                            <span>{stickerS.qty} </span>
                                        </div>
                                        <div className="sticker-qr-code">
                                            <QRCode
                                            value="Hello world"
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            viewBox={`0 0 256 256`}
                                            />
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-8 d-flex">
                                            <img style={{ height: "30px" }} src={logo} alt="" className="img-fluid" />
                                            <span className="sticker-patient-info-heading mt-2">Al Shifa Pharmacy</span>
                                        </div>
                                        <div className="col-4">
                                            <span className="sticker-patient-info-heading mt-2">{stickerS.doctor}</span>
                                        </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="empty-sticker d-flex justify-content-center align-items-center">
                                        <h6>Please create a sticker !!</h6>
                                    </div>
                                }
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mt-2">
                                <button onClick={() => setOpenStickerModal(false)} className="custom-btn me-2">Cancel</button>
                                <button onClick={handlePrint} className="custom-btn">Print</button>
                            </div>
                            </Modal> */}
                            {/* sticker print modal  */}
                            {
                            // selectedSticker.length > 0 &&
                            <div ref={componentRefAllStickers} className="print-all-sticker">
                                {
                                selectedSticker.map((st => <div className="sticker-print mt-2 mx-2">
                                    <div className="row">
                                    <div className="col-10">
                                        <span className="sticker-patient-info-heading d-block">Roger Westervelt</span>
                                        <div className="d-flex justify-content-between">
                                        <p><span className="sticker-patient-info-heading">HN : </span> 10223453</p>
                                        <p><span className="sticker-patient-info-heading">DOB : </span> 03/05/1990</p>
                                        </div>
                                        <p>{st.name}</p>
                                        <span className="sticker-print-rule">Take {st.route} {st.dose} {st.frequency} {st.food}</span>
                                    </div>
                                    <div className="col-2">
                                        <div className="sticker-qty">
                                        <span className="sticker-patient-info-heading d-block">Qty </span>
                                        <span>{st.qty} </span>
                                        </div>
                                        <div className="sticker-qr-code">
                                        <QRCode
                                            value="Hello world"
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            viewBox={`0 0 256 256`}
                                        />
                                        </div>
                                    </div>
                                    </div>
                                </div>))
                                }
                            </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalesPerson;