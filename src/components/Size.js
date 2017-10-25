import React from 'react';

function Size(props) {
    return (
        <ul className="speed-options">
            <li onClick={() => props.onClickEvent('size','little')}>Little</li>
            <li onClick={() => props.onClickEvent('size','middle')}>Middle</li>
            <li onClick={() => props.onClickEvent('size','big')}>Big</li>
        </ul>
    );
}

export default Size;