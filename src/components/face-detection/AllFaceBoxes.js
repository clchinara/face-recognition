import React from 'react'
import FaceBox from './FaceBox'

const AllFaceBoxes = ({ boxArr }) => {
    return (
        <div>
            {
                boxArr.map((box, i) => {
                    return (
                        <FaceBox
                            key={i}
                            top={box.topRow} 
                            bottom={box.bottomRow} 
                            left={box.leftCol}
                            right={box.rightCol}
                        />
                    )
                })
            }
        </div>
    )
}

export default AllFaceBoxes
