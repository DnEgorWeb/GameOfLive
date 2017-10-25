import React from 'react';

class FieldCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alive: this.props.cellClassName,
            run: this.props.run
        };

        this.index = this.props.index;

        this.changeCellState = this.changeCellState.bind(this);
    }

    render() {
        return (
            <div className={this.state.alive}
                 onClick={this.changeCellState} />
        );
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.size !== nextProps.size) {
            this.setState({
                alive: 'field__cell'
            })
        }
    }

    changeCellState() {
        const newState = (this.state.alive == 'field__cell') ? 'field__cell-alive' : 'field__cell';
        this.setState({
            alive: [newState]
        })
    }
}

export default FieldCell;