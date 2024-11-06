import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import '../../../imageUrl';
import DrugPlaceholderImage from '../../../front_assets/images/drug-fallback-image.jpg';
import { useQuery } from 'react-query';

function Drugs() {
  const { data, isLoading } = useQuery('drugs', () =>
  http.get(`/drugs`).then((res) => res.data?.data),
);
console.log(data, 'drugs');
  // useEffect(() => {
  //   if (error) {
  //     console.log('something wen wrong', error);
  //     return;
  //   }
  //   if (isLoading || isFetching || isRefetching) {
  //     setSpinner(true);
  //     return;
  //   } else {
  //     console.log('with react query', drugsData);
  //     setRowDataList(drugsData);
  //     setSpinner(false);
  //   }
  //   return () => {
  //     setSpinner(false);
  //   };
  // }, [error, isLoading, isFetching, isRefetching, drugsData]);

  // useEffect(() => {
  //   http.get(`/drugs`).then((res) => {
  //     setSpinner(false);
  //     console.log('Drugs', res.data.data);
  //     if (res.status === 200) {
  //       setRowDataList(res.data.data);
  //     }
  //   });
  // }, []);

  const deleteRowData = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        http.delete(`/drugs/${id}`).then((res) => {
          if (res.data.status === 200) {
            thisClicked.closest('tr').remove();
          }
        });
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Deleted!',
          text: 'Your data has been deleted.',
          timer: 2500,
        });
      }
    });
  };

  const columns = [
    
    {
      title: 'Product Id',
      field: `id`,
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Drug Name',
      field: `macrohealth_sg`,
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Description',
      field: `drug_description`,
      render: (row) => <div className='text-center'>{row.drug_description}</div>,
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Strength',
      field: `strength`,
      render: (row) => <div className='text-center'>{row.strength}</div>,
      cellStyle: {
        textAlign: 'center',
      },
    },
    // {
    //     title: "GU Id", field: `guid`
    // },
    {
      title: 'MRP Price',
      field: `price`,
      render: (row) => <div className='text-center'>{parseFloat(row.price ? row.price : 0).toFixed(2)} tk</div>,
    },
    {
      title: 'Purchase Price',
      field: `drug_price`,
      render: (row) => <div className='text-center'>{parseFloat(row.drug_price).toFixed(2)} tk</div>,
    },
    {
      title: 'Generic Name',
      field: `generic_Name`,
      render: (row) => <div className='text-center'>{row.generic_Name}</div>,
      cellStyle: {
        textAlign: 'center',
      },
    },
    // {
    //   title: 'Photo',
    //   field: `photo`,
    //   render: (row) => (
    //     <div className='text-center'>
    //       {row.image !== null && row.image !== '' && row.image !== 'null' ? (
    //         <img
    //           src={`${global.img_Url}/files/drugs/${row.image}`}
    //           width='90'
    //           alt='No'
    //         />
    //       ) : (
    //         <img
    //           src={DrugPlaceholderImage}
    //           style={{ objectFit: 'contain', borderRadius: '6px' }}
    //           width='90px'
    //           alt='No'
    //         />
    //       )}
    //     </div>
    //   ),
    // },
    {
      title: 'Action',
      field: 'patient',
      render: (row) => (
        <div>
          <Link to={`/edit-drugs/${row.id}`} class='btn btn-sm action-btn'>
            <i class='far fa-edit'></i>
          </Link>
          &nbsp;
          <button
            onClick={(e) => deleteRowData(e, row.id)}
            className='btn btn-sm action-btn'
          >
            
            <i class='far fa-trash'></i>
          </button>
        </div>
      ),
      cellStyle: {
        textAlign: 'center',
      },
    },
  ];
  return (
    <div className='page-content'>
      <div className='custom-card patients-head '>
        <h5 className='fw-normal custom_py-3 px-2  text-start mb-2 card-title'>
          Drugs List
          <Link className='btn btn-sm btn-primary float-end' to='/add-drugs'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='feather feather-plus mb-1'
            >
              <line x1='12' y1='5' x2='12' y2='19'></line>
              <line x1='5' y1='12' x2='19' y2='12'></line>
            </svg>
            Add Drugs
          </Link>
        </h5>
      </div>
      <div className='row'>
        <div className='col-md-12 grid-margin'>
          <div>
            <div>
              <MaterialTable
                columns={columns}
                data={data}
                isLoading={isLoading}
                options={{
                  search: true,
                  showTitle: false,
                  searchFieldAlignment: 'left',
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

export default Drugs;
