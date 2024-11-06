import React from 'react';

const AddModal = ({setOpen}) => {
    return (
        <div>
            <div className='modal-card p-2'>
                <h6>Product Add</h6>
                <hr />
                <p className='paragraphText mb-[12px]'>Product Name<span className='ml-[67px] mr-[15px]'>:</span>
                    <select className="select select-bordered select-xs w-[120px] inline rounded-sm">
                        <option selected disabled>Select</option>
                        <option>Napa650mg</option>
                        <option>Paracetamol</option>
                    </select>
                </p>
                <p className='paragraphText mb-[12px]'>Generic<span className='ml-[106px] mr-[15px]'>:</span>
                    <input type="text" className='border px-2 w-[120px]' value='Paracetamol'/>
                </p>
                <p className='paragraphText mb-[12px]'>Product Name<span className='ml-[67px] mr-[15px]'>:</span>
                    <select className="select select-bordered select-xs w-[120px] inline rounded-sm">
                        <option selected disabled>Select</option>
                        <option>Leaf 1/10</option>
                        <option>Leaf 1/16</option>
                    </select>
                </p>
                <p className='paragraphText mb-[12px]'>No. of leaf/Box<span className='ml-[64px] mr-[15px]'>:</span>
                    <input type="text" className='border px-2 w-[120px]' value='1'/>
                </p>
                <p className='paragraphText mb-[12px]'>Total Qty.<span className='ml-[94px] mr-[15px]'>:</span>
                    <input type="text" className='border px-2 w-[120px]' value='10'/>
                </p>
                <p className='paragraphText mb-[12px]'>Purchase price<span className='ml-[65px] mr-[15px]'>:</span>
                    <input type="text" className='border px-2 w-[120px]' value='50'/>
                </p>
                <p className='paragraphText mb-[12px]'>Total price<span className='ml-[88px] mr-[15px]'>:</span>
                    <input type="text" className='border px-2 w-[120px]' value='500'/>
                </p>
            </div>
            <div className='flex justify-end'>
                <div className='w-[31%] '>
                    <button className='bg-[#69B128] text-[#FFFFFF] text-xs py-1 px-2 rounded-sm mt-2'>Save</button>
                    <button onClick={() => setOpen(false)} className='bg-[#69B128] text-[#FFFFFF] text-xs py-1 px-2 rounded-sm mt-2 ml-[12px]'>Cancle</button>
                </div>
            </div>
        </div>
    );
};

export default AddModal;