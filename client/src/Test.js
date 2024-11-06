import React, { useEffect } from 'react';

const Test = () => {
    console.log('dklnvdkljnvd');
    useEffect(() => {
        
        const handleEsc = (event) => {
           if (event.keyCode === 27) {
            console.log('Close')
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);
      
    return (
        <div>
            <p>This is esc key</p>
        </div>
    );
};

export default Test;