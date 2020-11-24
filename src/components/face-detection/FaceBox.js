import React from 'react'
import './FaceBox.css';

const FaceBox = ({ top, bottom, left, right }) => {
    return (
        <div className='bounding-box' 
        style={{
            top: top, 
            bottom: bottom, 
            left: left, 
            right: right
        }}>
        </div>
    )
}

export default FaceBox;