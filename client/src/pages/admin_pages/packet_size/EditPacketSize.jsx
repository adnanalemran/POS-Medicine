import { BiEdit } from 'react-icons/bi';

import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import http from '../../../http';
const customStyles = {
  content: {
    marginTop: '20px',
    marginBottom: '35px',
    top: '45%',
    left: '60%',
    bottom: 'auto',
    zIndex: 99,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    width: '52%',
    overflow: 'hidden',
    height: '270px',
    padding: '10px',
  },
};
function EditPacketSize({ row, refetch, setRefetch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [btnSpinner, setBtnSpinner] = useState(false);
  const [packetSize, setPacketSize] = useState(row.label);
  //   console.log(row);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnSpinner(true);
    if (!packetSize) return;
    const data = {
      label: packetSize.trim(),
      value: packetSize.trim().toLowerCase().replace(/\s+/g, '_'),
    };
    const res = await http.post(`update-packet-size/${row.id}`, data);
    if (res.data.status === 200) {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: res.data.message,
        timer: 2500,
      });
    }
    setRefetch(!refetch);
    setIsOpen(false);
  };
  return (
    <div>
      <button class='btn btn-sm action-btn' onClick={() => setIsOpen(true)}>
        <i class='far fa-edit'></i>
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='product_modal'>
          <div className='page-content'>
            <div className='flex justify-content-between align-items-center'>
              <h5 className='fw-semibold py-0 my-0'>
                Edit Packet Size
                <span
                  style={{ cursor: 'pointer', fontSize: '16px' }}
                  onClick={closeModal}
                  className='float-end'
                >
                  <i className='fal fa-times'></i>
                </span>
              </h5>
            </div>

            <hr />
            <div className='row'>
              <form className='col-12' onSubmit={handleSubmit}>
                <div className='form-group mb-2'>
                  <label>
                    Name <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    name='member_name'
                    value={packetSize || ''}
                    onChange={(e) => setPacketSize(e.target.value)}
                  />
                </div>
                <div className='d-flex justify-content-end'>
                  <button
                    onClick={() => setIsOpen(false)}
                    className='custom-btn-outline me-2'
                  >
                    Cancel
                  </button>
                  <button className='custom-btn' type='submit'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditPacketSize;
