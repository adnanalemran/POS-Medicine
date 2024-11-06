import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Modal from 'react-modal';
import Webcam from 'react-webcam';
const TakePictureModal = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "400px",
            maxHeight: "80%",
            overflowY: "auto",
            padding: "5px"
        },
    };
    // const webcamRef = React.useRef(null);
    // const [imgSrc, setImgSrc] = React.useState(null);
    // const capture = React.useCallback(() => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     setImgSrc(imageSrc);
    // }, [webcamRef, setImgSrc]);
    const videoConstraints = {
        width: 540,
        facingMode: "environment"
    };
    const webcamRef = useRef(null);
    const [url, setUrl] = React.useState(null);

    const capturePhoto = React.useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
    }, [webcamRef]);

    const onUserMedia = (e) => {
        console.log(e);
    };



    /// new camera 
    let videoRef = useRef(null);

    let photoRef = useRef(null)

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true
            })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const takePicture = () => {
        const width = 400
        const height = width / (16 / 9)

        let video = videoRef.current

        let photo = photoRef.current

        photo.width = width

        photo.height = height

        let ctx = photo.getContext('2d')

        ctx.drawImage(video, 0, 0, width, height)

    }

    const clearImage = () => {
        let photo = photoRef.current

        let ctx = photo.getContext('2d')

        ctx.clearRect(0, 0, photo.width, photo.height)
    }

    useEffect(() => {
        getVideo();
    }, [videoRef]);
    /// new camera 
    return (
        <div className='take-picture-container'>
            <button onClick={() => setIsOpen(true)} className="text-xs mx-2 border-[1px] border-[#69B128] rounded lg:text-[16px] px-2 py-[5px] lg:py-2  whitespace-nowrap"> <i class="fa-solid fa-camera"></i> Take Picture</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <i style={{fontSize:"18px", cursor:"pointer"}} onClick={() => {setIsOpen(false)}} className="fa-solid fa-xmark search-icon"></i>
                {/* <div className="m-3">
                <button className="take-photo-btn" onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
                </div>
                <Camera ref={camera} />
                <img src={image} alt='Taken photo' /> */}
                {/* <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                <div className="d-flex justify-content-end">
                    <button className="custom-btn-outline mt-2 me-2" onClick={()=>setIsOpen(false)}>Cancel</button>
                    <button className="custom-btn-outline mt-2" onClick={capture}>Capture photo</button>
                </div>
                {imgSrc && (
                    <img
                        src={imgSrc}
                    />)} */}
                {/* <div className="container">
                    <h1 className="text-center">Camera Selfie App in React</h1>

                    <video ref={videoRef} className="container"></video>

                    <button onClick={takePicture} className="btn btn-danger container">Take Picture</button>

                    <canvas className="container" ref={photoRef}></canvas>

                    <button onClick={clearImage} className="btn btn-primary container">Clear Image</button>

                    <br /><br />
                </div> */}
                {
                    modalIsOpen &&
                    <>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            onUserMedia={onUserMedia}
                            width="360"
                        />
                        <div className="d-flex justify-content-end">
                            <button className='custom-btn me-2 mt-2' onClick={capturePhoto}>Capture</button>
                            <button className='custom-btn me-1 mt-2' onClick={() => setIsOpen(false)}>Save</button>
                        </div>
                        {url && (
                            <div>
                                <img src={url} alt="Screenshot" />
                            </div>
                        )}
                    </>

                }
            </Modal>
        </div>
    );
};
export default TakePictureModal;