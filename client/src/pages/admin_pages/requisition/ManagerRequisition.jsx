import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../http";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import "../../../imageUrl";
import AuthUser from "../../../Components/AuthUser";

function Requisition() {



  const navigate = useNavigate();
  const [row_data_list, setRowDataList] = useState([]);
  const [reload, setReload] = useState(false);
  const {user} = AuthUser();
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    http.get(`/manager-requisition`).then((res) => {
      setSpinner(false);
      console.log(res.data.data);
      if (res.status === 200) {
        setRowDataList(res.data.data);
      }
    });
  }, [reload]);





  const proceedToApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve these requisitions!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it!",
    }).then((result) => {
      if (result.isConfirmed) {

        http.post(`/proceed-to-approve/${id}`).then((res) => {
        //   navigate(`/approved-requisition/${id}`);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Send!",
                html: "Requisition approved by manager.",
                timer: 2500,
            });
            setReload(!reload)
        });
        
      }
    });
  };





  const cancelByManager = (id) => {

    const formData = new FormData();
    formData.append('user_id',user.id);

    Swal.fire({
        title: 'Are you sure?',
        text: "You want to cancel these requisitions!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, send it!'
    }).then((result) => {
        if (result.isConfirmed) {
            http.post(`/cancel-by-manager-copy/${id}`, formData).then(res => {
                // navigate(`/edit-manager-requisition/${id}`);
                setReload(!reload)

                console.log("certificate row Delete");
            })
            Swal.fire(
                {
                    position: 'top-center',
                    icon: 'success',
                    title: 'Send!',
                    html: 'Requisition cancelled by manager.',
                    timer: 2500
                }
            )
        }
    })
}

  const deleteRowData = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        http.delete(`/requisition/${id}`).then((res) => {
          if (res.data.status === 200) {
            thisClicked.closest("tr").remove();
          }
        });
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Deleted!",
          text: "Your data has been deleted.",
          timer: 2500,
        });
      }
    });
  };

  const columns = [
    {
      title: "SL",
      field: "",
      render: (row) => <div>{row.tableData.id + 1}</div>,
      width: "20 !important",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Requisition No",
      field: `requisition_no`,
    },
    {
      title: "Requisitor",
      field: `requisitor_contact_email`,
    },
    {
      title: "Total Cost",
      field: `total_bill_amount`,
    },
    {
      title: "Status",
      field: `requisition_status`,
      render: (row) => (
        <div>
          {row.requisition_status === "new" ? (
            <span className="btn-default-custom" title="created by manager">
              <i className="fas fa-circle me-1"></i>{" "}
              <span className="text-capitalize">
                {row.requisition_status.replaceAll("_", " ")}
              </span>
            </span>
          ) : row.requisition_status === "pending" ? (
            <span className="btn-warning-custom" title="created by Sales">
              <i className="fas fa-circle"></i>{" "}
              <span className="text-capitalize">
                {row.requisition_status.replaceAll("_", " ")}
              </span>
            </span>
          ) : row.requisition_status === "cancelled" ? (
            <span className="btn-danger-custom" title="created by Manager">
              <i className="fas fa-circle"></i>{" "}
              <span className="text-capitalize">
                {row.requisition_status.replaceAll("_", " ")}
              </span>
            </span>
          ) : row.requisition_status === "confirmed" ? (
            <span className="btn-info-custom" title="Confirem by supplier">
              <i className="fas fa-circle"></i>{" "}
              <span className="text-capitalize">
                {row.requisition_status.replaceAll("_", " ")}
              </span>
            </span>
          ) : (
            <span className="btn-success-custom" title="Approved by manager">
              {" "}
              <i className="fas fa-circle"></i>{" "}
              <span className="text-capitalize">
                {" "}
                {row.requisition_status.replaceAll("_", " ")}
              </span>{" "}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          {row.requisition_status === "pending" ? (
            <>
              <Link
                to={`/edit-manager-requisition/${row.id}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit"
                class="btn btn-sm action-btn"
              >
                <i class="far fa-edit"></i>
              </Link>
              &nbsp;
              {/* <button type="button" onClick={() => proceedToApprove(row.id)} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
                        <i className="fas fa-paper-plane"></i> Approve
                    </button> */}
              <button
                type="button"
                title="Approve"
                onClick={() => proceedToApprove(row.id)}
                className="btn btn-sm action-btn me-2"
              >
                <i className="fas fa-paper-plane"></i>
              </button>

              <button 
                type="button" 
                onClick={() => cancelByManager(row.id)} 
                title='Cancel' 
                className="btn btn-sm action-btn me-2">
                <i class="fas fa-times-circle"></i>
              </button>
            </>
          ) : (
            ""
          )}
          {row.requisition_status == "confirmed" ||
          row.requisition_status == "approved" ||
          row.requisition_status == "cancelled" ? (
            <>
              <Link
                to={`/approved-requisition/${row.id}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="View"
                class="btn btn-sm action-btn"
              >
                <i class="far fa-eye"></i>
              </Link>
              &nbsp;
            </>
          ) : (
            ""
          )}

          {/*<Link to={`/edit-manager-requisition/${row.id}`} class="btn btn-sm action-btn"><i class="far fa-edit"></i></Link>&nbsp;*/}
          {/*<button onClick={(e) => deleteRowData(e, row.id)} className="btn btn-sm action-btn"><i class="far fa-trash"></i></button>*/}
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];

  return (
    <div className="page-content">
      <div className="custom-card patients-head ">
        <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">
          Requisition List
          <Link
            className="btn btn-sm btn-primary float-end"
            to="/add-requisition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-plus mb-1"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Requisition
          </Link>
        </h5>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div>
            <div>
              <MaterialTable
                columns={columns}
                data={row_data_list}
                isLoading= {spinner ? true : false}
                options={{
                  search: true,
                  showTitle: false,
                  searchFieldAlignment: "left",
                  pageSize: 10,
                  emptyRowsWhenPaging: false,
                  pageSizeOptions: [5, 10, 20, 50, 100],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requisition;
