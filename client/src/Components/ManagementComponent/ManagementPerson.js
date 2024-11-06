import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import http from '../../http';
const ManagementPerson = () => {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Page G',
            uv: 4490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Page G',
            uv: 1490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Page G',
            uv: 2490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const [revenue, setRevenue] = useState([]);
    const [member, setMember] = useState([]);
    const [yearlyInvoice, setYearlyInvoice] = useState([]);
    const [customers, setCustomers] = useState(0);
    const [invoice, setInvoice] = useState(0);
    useEffect(() => {
        http.get(`yearly-invoices`)
            .then((res) => {
                console.log(res, 'res');
                setYearlyInvoice(res.data.all);
            })
            .catch((err) => {
                console.log(err);
            })
        http.get(`yearly-members`)
            .then((res) => {
                setMember(res.data.all);
            })
            .catch((err) => {
                console.log(err);
            })
        http.get(`yearly-revenue`)
            .then((res) => {
                setRevenue(res.data.all);
            })
            .catch((err) => {
                console.log(err);
            })
        http.get(`members`)
            .then(res => {
                setCustomers(res.data.data.length)
            })
            .catch((err) => {
                console.log(err)
            })
        http.get(`all-invoices`)
            .then(res => {
                setInvoice(res.data.data.length)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    console.log(customers, 'revenue');
    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
                </div>
                {/* <div className="d-flex align-items-center flex-wrap text-nowrap">
                    <div className="input-group date datepicker wd-200 me-2 mb-2 mb-md-0" id="dashboardDate">
                        <span className="input-group-text input-group-addon bg-transparent border-primary"><i data-feather="calendar" className=" text-primary" /></span>
                        <input type="text" className="form-control border-primary bg-transparent" />
                    </div>
                    <button type="button" className="btn btn-outline-primary btn-icon-text me-2 mb-2 mb-md-0">
                        <i className="btn-icon-prepend" data-feather="printer" />
                        Print
                    </button>
                    <button type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0">
                        <i className="btn-icon-prepend" data-feather="download-cloud" />
                        Download Report
                    </button>
                </div> */}
            </div>
            <div className="row">
                <div className="col-12 col-xl-12 stretch-card">
                    <div className="row flex-grow-1">
                        <div className="col-md-4 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-baseline">
                                        <h6 className="card-title mb-2"> Customers</h6>
                                        {/* <div className="dropdown mb-2">
                                            <button className="btn p-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-md-12 col-xl-5">
                                            <h3 className="">{customers}+</h3>
                                            {/* <div className="d-flex align-items-baseline">
                                                <p className="text-success">
                                                    <span>+3.3%</span>
                                                    <i data-feather="arrow-up" className="icon-sm mb-1" />
                                                </p>
                                            </div> */}
                                        </div>

                                        <div className="col-6 col-md-12 col-xl-7">
                                            <LineChart width={150} height={100} data={member}>
                                                <Tooltip />
                                                <Line type="monotone" dataKey="Customers" stroke="#8884d8" strokeWidth={2}  />
                                            </LineChart>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-baseline">
                                        <h6 className="card-title mb-2">Invoices</h6>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-md-12 col-xl-5">
                                            <h3 className="mb-2">{invoice}+</h3>
                                            {/* <div className="d-flex align-items-baseline">
                                                <p className="text-danger">
                                                    <span>-2.8%</span>
                                                    <i data-feather="arrow-down" className="icon-sm mb-1" />
                                                </p>
                                            </div> */}
                                        </div>
                                        <div className="col-6 col-md-12 col-xl-7">
                                            {/* <div id="ordersChart" className="mt-md-3 mt-xl-0" />
                                             */}
                                            <LineChart width={150} height={100} data={yearlyInvoice}>
                                                <Tooltip />
                                                <Line type="monotone" dataKey="Invoices" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 2 }} />
                                            </LineChart>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-baseline">
                                        <h6 className="card-title mb-0">Stock</h6>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-md-12 col-xl-5">
                                            <h3 className="mb-2">89.87%</h3>
                                            <div className="d-flex align-items-baseline">
                                                <p className="text-success">
                                                    <span>+2.8%</span>
                                                    <i data-feather="arrow-up" className="icon-sm mb-1" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-12 col-xl-7">
                                            {/* <div id="growthChart" className="mt-md-3 mt-xl-0" /> */}
                                            <LineChart width={150} height={100} data={data}>
                                                <Tooltip />
                                                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 2 }} />
                                            </LineChart>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> {/* row */}
            <div className="row">
                <div className="col-12 col-xl-12 grid-margin stretch-card">
                    <div className="card overflow-hidden">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-baseline mb-4 mb-md-3">
                                <h6 className="card-title mb-0">Revenue</h6>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-md-7">
                                    <p className="text-muted tx-13 mb-3 mb-md-0">Revenue is the income that a business has from its normal business activities, usually from the sale of goods and services to customers.</p>
                                </div>
                            </div>
                            <div>

                                <AreaChart
                                    width={1000}
                                    height={300}
                                    data={revenue}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="Income" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div> {/* row */}
            <div className="row">
                <div className="col-lg-7 col-xl-8 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-baseline mb-2">
                                <h6 className="card-title mb-0">Monthly sales</h6>
                                <div className="dropdown mb-2">
                                    <button className="btn p-0" type="button" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton4">
                                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted">Sales are activities related to selling or the number of goods or services sold in a given time period.</p>
                            <div>
                                <BarChart
                                    width={650}
                                    height={300}
                                    data={revenue}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 10,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />

                                    <Bar dataKey="Income" fill="#8884d8" />
                                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                                </BarChart>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-xl-4 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <h6 className="card-title mb-0">Cloud storage</h6>
                                <div className="dropdown mb-2">
                                    <button className="btn p-0" type="button" id="dropdownMenuButton5" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton5">
                                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                                    </div>
                                </div>
                            </div>
                            <div id="storageChart" />
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-end">
                                    <div>
                                        <label className="d-flex align-items-center justify-content-end tx-10 text-uppercase fw-bolder">Total storage <span className="p-1 ms-1 rounded-circle bg-secondary" /></label>
                                        <h5 className="fw-bolder mb-0 text-end">8TB</h5>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <label className="d-flex align-items-center tx-10 text-uppercase fw-bolder"><span className="p-1 me-1 rounded-circle bg-primary" /> Used storage</label>
                                        <h5 className="fw-bolder mb-0">~5TB</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary">Upgrade storage</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> {/* row */}

        </>
    );
};

export default ManagementPerson;