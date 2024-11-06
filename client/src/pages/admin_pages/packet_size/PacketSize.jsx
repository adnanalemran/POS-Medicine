import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import AddPacketSize from './AddPacketSize';
import EditPacketSize from './EditPacketSize';
import Modal from 'react-modal';
import http from '../../../http';
import Swal from 'sweetalert2';
function PacketSize() {
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    http.get('packet-size').then((res) => {
      //   console.log(res.data.data);
      setData(res.data.data);
    });
    setLoading(false);
  }, [refetch]);
  const deleteRowData = (e, rowId) => {
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
        http.delete(`delete-packet-size/${rowId}`).then((res) => {
          if (res.data.status === 200) {
            thisClicked.closest('tr').remove();
            setRefetch(!refetch);
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
      title: 'Id',
      field: 'id',
      width: '20 !important',
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Name',
      field: 'label',
      cellStyle: {
        textAlign: 'center',
      },
    },

    {
      title: 'Action',
      field: 'patient',
      render: (row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div>
            <EditPacketSize
              refetch={refetch}
              row={row}
              setRefetch={setRefetch}
            />
          </div>
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
    <div
      style={{
        marginTop: '60px',
        padding: '12px  ',
      }}
    >
      <div
        className='custom-card'
        style={{
          padding: '0 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <h5 className='fw-semibold custom_py-3 px-2  text-start mb-2 '>
          All Packet Sizes{' '}
        </h5>
        <AddPacketSize refetch={refetch} setRefetch={setRefetch} />
      </div>
      <br />
      <div className='row'>
        <div className='col-md-12 grid-margin'>
          <MaterialTable
            columns={columns}
            data={data}
            isLoading={loading}
            options={{
              search: true,
              showTitle: false,
              searchFieldAlignment: 'left',
              pageSize: 10,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [5, 10, 20],
              headerStyle: {
                zIndex: 0,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PacketSize;
