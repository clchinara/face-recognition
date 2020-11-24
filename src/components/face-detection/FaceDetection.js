import React from 'react'
import AllFaceBoxes from './AllFaceBoxes'

const FaceDetection = ({ imageUrl, boxArr }) => {
    return (
        <div className='ourOwnCenter ma'>
            <figure className='mt2' style={{position:'relative', overflow: 'hidden'}}>
                <img id='inputimage' alt='' width='500px' src={imageUrl} position='absolute'/>
                <AllFaceBoxes boxArr={boxArr}/>
            </figure>
        </div>
    )
}

export default FaceDetection;