import React from 'react';

const Entries = ({ name, entries }) => {
    return (
        <div className='ph5'>
            <h1 className='pb3 animated animatedFadeInUp fadeInUp'> Detect faces from your photos! </h1>
            <div className='pb1 animated animatedFadeInUp fadeInUp' style={{color: 'black', fontSize: '130%'}}>
                {`${name}, your current # of entries is`}
            </div>
            <div className='animated animatedFadeInUp fadeInUp' style={{color: 'black', fontSize: '270%'}}>
                {`${entries}`}
            </div>
        </div>
    )
}

export default Entries;