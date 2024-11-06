import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import "../../../imageUrl";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";
import AuthUser from "../../../Components/AuthUser";
import { toast } from "react-toastify";

function UserRole() {
  const [userdata, setuserdata] = useState([]);
  const { user } = AuthUser();
  const [role, setrole] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [stateUpdate, setstateUpdate] = useState();
  useEffect(() => {
    http.get(`/user-list`).then((res) => {
      if (res.status === 200) {
        setuserdata(res.data);
      }
    });
  }, [stateUpdate]);

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
      title: "User Name",
      field: `name`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Phone",
      field: `mobile`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Email",
      field: `email`,
      cellStyle: {
        textAlign: "center",
      },
    },

    {
      title: "Assigned Role",
      field: `user_type`,
      render: (row) => <div>{row.user_type === 'empty' ? '' : row.user_type}</div>,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Act",
      field: `photo`,
      cellStyle: {
        textAlign: "center",
      },
      render: (row) => (
        <>
          <button
            onClick={(e) => {
              setOpen(true);
              setrole(row.user_type);
              setuserEmail(row.email);
            }}
            className="btn btn-sm action-btn"
          >
            {" "}
            <i class="fas fa-chevron-circle-right"></i>{" "}
          </button>
        </>
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const updateUserRole = () => {
    const data = {
      authEmail: user.email,
      userEmail: userEmail,
      userType: role,
    };

    http
      .post(`/user-role-assign`, data)
      .then((res) => {
        if (res.status === 200) {
          setstateUpdate(Math.random());
          setOpen(false);
          toast.success("User role update sucessfully");
        }
      })
      .catch((err) => {
        console.log("err", err);
        setOpen(false);
        toast.error("Opps! Someting is wrong");
      });
  };
  return (
    <>
      <div className="page-content">
        <div className="custom-card patients-head ">
          <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">
            User Role
            {/* <Link className="btn btn-sm btn-primary float-end" to="/add-banner">
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
              Add Banner
            </Link> */}
          </h5>
        </div>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div>
              <div>
                <MaterialTable
                  columns={columns}
                  data={userdata}
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

      <div>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontSize: "15px" }}>User Role</DialogTitle>
          <DialogContent sx={{ padding: 0 }}>
            <FormControl sx={{ m: 1, minWidth: 150, padding: 0 }}>
              <InputLabel htmlFor="demo-dialog-native">Role</InputLabel>
              <Select
                native
                value={role}
                onChange={(event) => {
                  setrole(event.target.value);
                }}
                sx={{ height: 40 }}
                input={<OutlinedInput label="Role" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={"admin"}>Admin</option>
                <option value={"manager"}>Manager</option>
                <option value={"sales"}>Sales</option>
                <option value={"supplier"}>Supplier</option>
                <option value={"cashier"}>Cashier</option>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={updateUserRole}>Assign</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default UserRole;
