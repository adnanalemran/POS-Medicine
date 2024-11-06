import React, { useEffect, useState } from 'react'
import { FaCamera } from 'react-icons/fa';
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';
import { Modal as ReactModal } from '../Common/Modal';

export default function Camera({ setPrescriptionImage }) {
    const [camera, setCamera] = useState(false);
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const cameras = devices.filter(device => device.kind === 'videoinput');

                if (cameras.length > 0) {
                    setCamera(true);
                    // You can perform further actions here, like starting a video stream or enabling camera-related features.
                } else {
                    console.log('No camera detected.');
                    // Handle the case where no camera is available.
                    setCamera(false);
                }
            })
            .catch(error => {
                console.error('Error enumerating devices:', error);
                setCamera(false);
                // Handle the error, such as showing an error message to the user.
            });
    }, [])
    const [cameraOpen, setCameraOpen] = useState(false);
    const openCamera = () => {
        if (camera) {
            setCameraOpen(true);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Camera is not available!",
            });
        }
    }
    const closeCamera = () => {
        setCameraOpen(false);
        setImage('')
    }
    const videoConstraints = {
        width: 500,
        height: 500,
        facingMode: "user",
    };

    const [image, setImage] = useState('');
    const handleSave = () => {
        setPrescriptionImage(image)
        closeCamera()

    }
    return (
        <div>
            <FaCamera onClick={openCamera} cursor={"pointer"} color='#69B128' size={20} />
            <ReactModal isOpen={cameraOpen} onClose={closeCamera} size='lg' width="100%">
                <ReactModal.Header onClose={closeCamera}>
                    <ReactModal.Title>Camera</ReactModal.Title>
                </ReactModal.Header>
                <ReactModal.Body>
                    <div className='row'>
                        <div className='col-6'>
                            <Webcam
                                audio={false}
                                height={400}
                                screenshotFormat="image/jpeg"
                                width={520}
                                videoConstraints={videoConstraints}
                            >
                                {({ getScreenshot }) => (
                                    <div className="d-flex justify-content-end">
                                        <button
                                            style={{ backgroundColor: '#69B128', color: 'white' }}
                                            className="btn btn-sm mt-2 me-lg-2 px-4 fw-bold"
                                            onClick={() => {
                                                const imageSrc = getScreenshot();
                                                setImage(imageSrc);
                                            }}
                                        >
                                            Capture photo
                                        </button>
                                    </div>
                                )}
                            </Webcam>
                        </div>
                        {/* <div className="col-sm-6 d-flex justify-content-center">
                            {data.image ? (
                                <img src={data.image} alt="webcame image" />
                            ) : (
                                <h6>Image Preview</h6>
                            )}
                        </div> */}
                        <div className="col-6">
                            <img src={image} style={{ height: '400px' }} alt="" className="img-fluid" />
                            {
                                image &&
                                <button
                                    style={{ backgroundColor: '#69B128', color: 'white' }}
                                    className="btn btn-sm mt-2 me-lg-2 px-4 fw-bold float-end"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            }

                        </div>
                    </div>
                </ReactModal.Body>

            </ReactModal>
        </div>
    )
}
