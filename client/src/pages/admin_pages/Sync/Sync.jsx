import MaterialTable from "material-table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import { render } from "@testing-library/react";
import Swal from "sweetalert2";

export default function Sync() {
  const [invoices, setInvoices] = useState([]);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    http
      .get(`available-sync`)
      .then((res) => {
        setInvoices(res.data.data);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);
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
      title: "Invoice No",
      field: `invoice_no`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Member",
      field: `invoice_no`,
      render: (row) => (
        <div className="text-center">
          {row.member?.member_name ? row.member?.member_name : "Not a member"}
        </div>
      ),
    },

    {
      title: "Date",
      field: `created_at`,
      render: (row) => (
        <div className="text-center">
          {moment(row?.updated_at).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: "Status",
      field: `payment_status`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Sub Total",
      field: `sub_total`,
      render: (row) => (
        <div className="text-center">
          <span style={{ fontSize: "20px", fontWeight: 700 }}>&#x9F3;</span>
          {parseFloat(row.sub_total || 0).toFixed(2)}
        </div>
      ),
    },
    {
      title: "Discount",
      field: `special_discount`,
      render: (row) => (
        <div className="text-center">
          <span style={{ fontSize: "20px", fontWeight: 700 }}>&#x9F3;</span>
          {parseFloat(row.special_discount || 0).toFixed(2)}
        </div>
      ),
    },
    {
      title: "Grand Total",
      field: `special_discount`,
      render: (row) => (
        <div className="text-center">
          <span style={{ fontSize: "20px", fontWeight: 700 }}>&#x9F3;</span>
          {(
            parseFloat(row.sub_total || 0) -
            parseFloat(row.special_discount || 0)
          ).toFixed(2)}
        </div>
      ),
    },

    {
      title: "Payment Mode",
      field: `discount_type`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Invoice Type",
      field: `invoice_type`,
      render: (row) => (
        <div className="text-capitalize">{row.invoice_type}</div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const [loading, setLoading] = useState(false);
  const handleSync = () => {
    if (count < 1) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No invoice found to sync",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#69B128",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sync!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const data = {
          db: "imrangmailcom",
        };
        http
          .post(`sync-invoice`, data)
          .then((res) => {
            setLoading(false);
            setUpdate(!update);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Date Sync Successfully",
            });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err, "error catch");
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong",
            });
          });
      }
    });
  };
  return (
    <div className="page-content">
      <div className="custom-card p-2">
        <div className="d-flex justify-content-between">
          <h5>Sync Invoices with online</h5>
          <button
            style={{
              backgroundColor: "#69B128",
              color: "white",
              paddingTop: "6px",
              paddingBottom: "7px",
              marginTop: "1px",
            }}
            onClick={handleSync}
            className="btn btn-sm me-lg-2 px-4  fw-bold"
          >
            Sync Invoices
          </button>
        </div>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="overlay-content">
            <span className="loader"></span>
            <p
              style={{ fontSize: "1.5rem" }}
              className="loader-text mt-2 text-white"
            >
              Please wait...
            </p>
          </div>
        </div>
      )}

      <div className="mt-3">
        <MaterialTable
          columns={columns}
          data={invoices}
          // isLoading= {spinner ? true : false}
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
  );
}
