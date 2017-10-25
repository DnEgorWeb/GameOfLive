import React from 'react';

class Speed extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="speed-options">
                <li>Low</li>
                <li>Middle</li>
                <li>Fast</li>
            </ul>
        );
    }
}

export default Speed;