import React from 'react';

class Count extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        }
    }

    render() {
        return (
            <div className="generation-count">
                <p className="generation-count__header">
                    Generation count: {this.state.value}
                </p>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }
}

export default Count;