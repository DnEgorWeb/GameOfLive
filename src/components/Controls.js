import React from 'react';

function Controls(props) {
        return (
            <div className="control-buttons">
                <ul className="control-buttons__list">
                    <li onClick={props.onRun}>Run</li>
                    <li onClick={props.onPause}>Pause</li>
                    <li onClick={props.onClear}>Clear</li>
                </ul>
            </div>
        );
}

export default Controls;