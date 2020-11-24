import React from 'react';

// <Scroll /> wraps other components (referred as props.children) inside it
const Scroll = (props) => {
    return (
        <section style={{overflowY: 'scroll', position: 'relative', top: '80px'}}>
            {props.children}
        </section>
    )
}

export default Scroll;