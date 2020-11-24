import React from 'react'
import './Navigation.css'

const Navigation = ({ onRouteChange }) => {
    return (
        <header className="fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l tr navi">
            <nav className="f6 fw5 ttu tracked">
                <a className="link dim white dib mr3 pointer" title="Home">Home</a>
                <a className="link dim white dib mr3 pointer" title="Gallery">Gallery</a>
                <a onClick={() => onRouteChange('signin')} className="link dim white dib pointer" title="Sign Out">Sign Out</a>
            </nav>
        </header>
    )
}

export default Navigation;