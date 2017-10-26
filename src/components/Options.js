import React from 'react';
import Size from './Size';

function Options(props) {
    return (
        <div className="options">
            <p className="options__label">Size:</p>
            <Size onClickEvent={changeOption}/>
        </div>
    );

    function changeOption(option, value) {
        props.optionsChange(option, value);
    }
}

export default Options;