import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MaterialTable from "material-table";
import "../../../../imageUrl";
import cartImage from "../../../../front_assets/images/shopping_cart.png";
import AuthUser from "../../../../Components/AuthUser";
import { useContext } from "react";
import { memberContext } from "../../../../navbar/auth";
import "./CurrentStock.css";
import Select from "react-select";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import stockFile from '../../../../front_assets/sample_file/stocks.csv';
import axios from "axios";
import { toast } from "react-toastify";

const CurrentStock = () => {
  const { user, http } = AuthUser();
  const navigate = useNavigate();

  const [row_data_list, setRowDataList] = useState([]);
  const [stateupdate, setstateupdate] = useState();
  const [data, setData] = useState([]);
  const { cart, setCart } = useContext(memberContext);

  const [spinner, setSpinner] = useState(true);
  const [brand, setBrand] = useState([]);
  // newStock

  useEffect(() => {
    const controller = new AbortController();
    http.get(`/current-stock`, { signal: controller.signal }).then((res) => {
      setSpinner(false);
      if (res.status === 200) {
        console.log(res);
        setRowDataList(res.data);
        setData(res.data);
      }
    });
    http.get(`/brand`, { signal: controller.signal }).then((res) => {
      setBrand(res.data.data);
    });

    return () => controller.abort();
  }, [stateupdate]);

  const handleFilter = (e) => {
    console.log(e.target.value);

    if (parseInt(e.target.value) === 1) {
      console.log(e.target.value);
      setRowDataList(data);
    } else if (parseInt(e.target.value) === 2) {
     
      const available_stock = data.filter(
        (d) => d.stock && d.stock > 0
      );
      console.log(available_stock);
      setRowDataList(available_stock);
    } else if (parseInt(e.target.value) === 6) {
     
      const reOrder = data.filter(
        (d) => d.stock < 20 && d.stock > 1
      );
      
      setRowDataList(reOrder);
    }
  };

  const handleBrand = (item) => {
    console.log(item.id);
    const stock = data.filter(
      (d) => d.manufacturer == item.title
    );
    setRowDataList(stock);
  };

  const columns = [
    {
      title: "SL",
      field: "",
      render: (row) => <div>{row.tableData.id + 1}</div>,

      cellStyle: {
        textAlign: "center",
        width: "2%",
      },
    },
    
    {
      title: "Name",
      field: `name`,
      cellStyle: {
        // whiteSpace: 'nowrap',
        textAlign: "center",
      },
    },

    {
      title: "Manufacturer",
      field: `manufacturer`,
      render: (row) => <div className='text-center'>{row.manufacturer}</div>,
      cellStyle: {
        // whiteSpace: 'nowrap',
        width: "15%",
        textAlign: "center",
      },
    },

    {
      title: "Box Type",
      field: `box_type`,
      render: (row) => <div className='text-center'>{row.box_type}</div>,
      cellStyle: {
        // width: "6%",
        textAlign: "center",
      },
    },
    {
      title: "Pkt Size",
      field: `pkt_size`,
      cellStyle: {
        textAlign: "center",
      },
    },

    {
      title: "No of Box",
      render: (row) => (
        <p className="text-center">{row.stock && (parseFloat(row.stock || 0) / parseFloat(row?.pkt_size || 0)).toFixed(2)}</p>
      ),

    },
    {
      title: "Store In",
      render: (row) => (
        <p className="text-center">{row.store_in.length > 0 ? row.store_in.reduce((a, b) => a + parseInt(b.total_qty || 0), 0) : 0}</p>
      ),

    },
    {
      title: "Sales Return",
      render: (row) => (
        <p className="text-center">{row.sales_return.length > 0 ? row.sales_return.reduce((a, b) => a + parseInt(b.pcs || 0), 0) : 0}</p>

      ),

    },
    {
      title: "Adjustment",
      render: (row) => (
        <p className="text-center">{row.adjustment.length > 0 ? row.adjustment.reduce((a, b) => a + parseInt(b.increase || 0), 0) - row.adjustment.reduce((a, b) => a + parseInt(b.decrease || 0), 0) : 0}</p>

      ),


    },
    {
      title: "Stock Out",
      render: (row) => (
        // <p>{row.stock_out_sum_pcs ? row.stock_out_sum_pcs : 0}</p>
        <p className="text-center">{row.stock_out.length > 0 ? row.stock_out.reduce((a, b) => a + parseInt(b.pcs || 0), 0) : 0}</p>

      ),

    },
    {
      title: "Stock",
      render: (row) => <p className="text-center">{row.stock || 0}</p>,
      cellStyle: {
        textAlign: "center",
        fontWeight: "bold",
        color: "red",
      },

    },
    {
        title: "Bonus Qty", field: `bonus_qty`,
        cellStyle: {
            textAlign: "center",
        },
    },
    {
      title: "Unit",
      field: `unit`,

      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "PP",
      field: `unit`,
      render: row => <>{parseFloat(row.drug?.drug_price || 0).toFixed(2)}</>,

      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Vat",
      field: `unit`,
      render: row => <>{parseFloat(row.drug?.vat ? row.drug?.vat : 0).toFixed(2)}</>,

      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Total Price",
      field: `unit`,
      render: row => <>{(((parseFloat(row.drug?.drug_price) + parseFloat(row.drug?.vat ? row.drug?.vat : 0)) * parseInt(row.stock)) - ((parseFloat(row.drug?.drug_price) + parseFloat(row.drug?.vat ? row.drug?.vat : 0)) * parseInt(row.bonus_qty))).toFixed(2)}</>,

      cellStyle: {
        textAlign: "center",
      },
    },
    // {
    //   title: "Reorder",
    //   render: (row) => (
    //     <div
    //       style={{
    //         backgroundColor: `${row.totalStockReport < row.qty ? "red" : "#e9ecef"
    //           }`,
    //         color: `${row.totalStockReport < row.qty ? "white" : "black"}`,
    //         border: "none",
    //         width: "65px",
    //         margin: "auto",
    //       }}
    //     >
    //       <p
    //         style={{ padding: "5px", fontWeight: "bold", textAlign: "center" }}
    //       >
    //         {row.totalStockReport === null ? 0 : row.totalStockReport}
    //       </p>
    //     </div>
    //   ),
    //   cellStyle: {
    //     whiteSpace: "nowrap",
    //   },
    // },
    // {
    //     title: "Action",
    //     render: (rowData) =>
    //         <div>
    //             <button onClick={()=>handleCart(rowData)} className="btn btn-sm action-btn"><i className="fas fa-plus me-2"></i></button>
    //             {/* <Link to={`/edit-current-stock-m/${rowData.id}`} className="btn btn-sm action-btn me-2"><i className="far fa-edit"></i></Link> */}
    //             {/* <button className="btn btn-sm action-btn"><i className="far fa-trash"></i></button> */}
    //         </div>,
    //     cellStyle: {
    //         textAlign: "center",
    //     },
    // },
  ];

  const [open, setOpen] = useState(false);
  const [csvFile, setcsvFile] = useState(null)

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      setcsvFile(null)
    }
  };
  const totalPrice = row_data_list.reduce((a, b) => a + (parseInt(b.stock) * (parseFloat(b.drug?.drug_price ? b.drug?.drug_price : 0) + parseFloat(b.drug?.vat ? b.drug?.vat : 0))), 0).toFixed(2);
  const totalSellingPrice = row_data_list.reduce((a, b) => a + (parseInt(b.stock) * (parseFloat(b.drug?.price ? b.drug?.price : 0))), 0).toFixed(2);
  const total = row_data_list.reduce((a, b) => a + parseInt(b.stock || 0), 0).toFixed(2);
  return (
    <div className="page-content">
      <div className="custom-card patients-head  ">
        <h5 className="fw-normal custom_py-3 px-2 text-start mb-2 card-title">
          Current Stock
        </h5>
      </div>

      <div className="custom-card patients-head mb-2 p-2">
        <div className="row gx-3">
          <div className="col-2">
            <select
              onChange={(e) => handleFilter(e)}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option value="1" selected>
                All
              </option>
              <option value="2">Available</option>
              <option value="6" name="reorder">
                Reorder
              </option>
            </select>
          </div>
          <div className="col-3">
            <Select
              options={brand}
              onChange={(e) => handleBrand(e)}
              getOptionLabel={(brandName) => `${brandName.title}`}
              getOptionValue={(brandName) => `${brandName.id}`}
            />
          </div>

          <div className="col-7 d-flex justify-content-end">
            <a href={stockFile} download>
              <button
                style={{ background: "#69b128", color: "white" }}
                type="button"
                className="btn btn-sm mt-1 me-1"
              >
                <i class="fa fa-download" aria-hidden="true"></i> Sample file
              </button>
            </a>

            <button
              style={{ background: "#69b128", color: "white" }}
              type="button"
              className="btn btn-sm mt-1 me-1"
              onClick={() => setOpen(true)}
            >
              <i class="fa fa-upload" aria-hidden="true"></i> CSV
            </button>
            {/* <button
              style={{ background: "#69b128", color: "white" }}
              type="button"
              className="btn btn-sm mt-1"
              onClick={() => navigate("/re-order-requisition")}
            >
             <i class="fa fa-plus"></i> Requisition
            </button> */}


          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 grid-margin stock-table">
          <div>
            <div>
              <MaterialTable
                columns={columns}
                data={row_data_list}
                isLoading={spinner ? true : false}
                options={{
                  selection: false,
                  search: true,
                  showTitle: false,
                  searchFieldAlignment: "left",
                  pageSize: 10,
                  emptyRowsWhenPaging: false,
                  pageSizeOptions: [5, 10, 20, 50, 100],
                  rowStyle: {
                    fontSize: ".75rem",
                    textAlign: "center",
                  },
                  headerStyle: {
                    fontSize: ".75rem",
                    border: "1px solid #c9c9c9",
                    textAlign: "center",
                    zIndex: "0",
                    whiteSpace: 'nowrap',
                  },
                }}
                style={{ overflowX: 'auto' }}
                onSelectionChange={(rows) => setCart(rows)}
              />
            </div>
            <div className="d-flex mt-2">
              <h6 className="mb-2 me-3">Total Stock : {total} </h6>
              <h6 className="me-3">Total Purchase Price (Including VAT) : {totalPrice}</h6>
              <h6 className="me-3">Total Selling Price : {totalSellingPrice}</h6>
            </div>
          </div>
        </div>
      </div>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: "15px" }}>Import Data</DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <FormControl sx={{ m: 1, minWidth: 150, padding: 0 }}>
            <input onChange={(e) => { setcsvFile(e.target.files[0]) }} type="file" className="ms-2" accept=".csv" />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            console.log("csv", csvFile)
            if (csvFile !== null) {
              var formdata = new FormData();
              formdata.append("file", csvFile);

              http.post('/stock-in-by-csv', formdata).then(res => {
                console.log("res", res.data)
                toast.success(res.data.message)
                setstateupdate(Math.random())
                handleClose()
              }).catch(err => {

                console.log("err", err.response.data)
                if (err.response.data.error !== undefined) {
                  toast.error(err.response.data.error)
                } else if (err.response.data.name !== undefined) {
                  toast.error(err.response.data.name[0])
                } else if (err.response.data.price !== undefined) {
                  toast.error(err.response.data.price[0])
                } else if (err.response.data.stock !== undefined) {
                  toast.error(err.response.data.stock[0])
                } else if (err.response.data.manufacturer !== undefined) {
                  toast.error(err.response.data.manufacturer[0])
                }
                else if (err.response.data.drug_id !== undefined) {
                  toast.error(err.response.data.drug_id[0])
                } else if (err.response.data.pkt_size !== undefined) {
                  toast.error(err.response.data.pkt_size[0])
                } else if (err.response.data.box_type !== undefined) {
                  toast.error(err.response.data.box_type[0])
                } else if (err.response.data.unit !== undefined) {
                  toast.error(err.response.data.unit[0])
                }
                else if (err.response.data.rack !== undefined) {
                  toast.error(err.response.data.rack[0])
                } else if (err.response.data.shelf !== undefined) {
                  toast.error(err.response.data.shelf[0])
                } else if (err.response.data.expire_date !== undefined) {
                  toast.error(err.response.data.expire_date[0])
                } else {
                  toast.error("Opps Something is wrong !")
                }
                handleClose()
              })
            } else {
              toast.warning("please select file")
            }

          }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CurrentStock;
