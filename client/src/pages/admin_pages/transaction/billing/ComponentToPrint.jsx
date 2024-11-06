import React from 'react';

const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            dfgf
        </div>
    );
});

export default ComponentToPrint;