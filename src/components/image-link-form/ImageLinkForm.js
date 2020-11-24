import React from 'react'

const ImageLinkForm = ({ onInputChangeProp, onButtonSubmitProp }) => {
    return (
        <div className='animated animatedFadeInUp fadeInUp'>
            <p className='f3 ph5' style={{color: 'black', fontSize: '130%'}}>
            </p>
            <div className='ourOwnCenter pb3'>
                <div className="pa2 w-70">
                    <form className="mw7 center br2-ns ba b--black-10" style={{background: '#e9e9e9', paddingTop:'25px', paddingBottom:'25px', paddingLeft:'25px', paddingRight:'25px'}}>
                        <fieldset className="cf bn ma0 pa0">
                        <div className="cf">
                            <label className="clip" for="email-address">Email Address</label>
                            <input onChange={onInputChangeProp} className="f6 f5-l input bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="Enter image URL" type="text" name="image-url" />
                            <input onClick={onButtonSubmitProp} className="f6 f5-l button fl pv3 tc bn bg-animate bg-black hover-black-70hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="button" value="Detect" />
                        </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm