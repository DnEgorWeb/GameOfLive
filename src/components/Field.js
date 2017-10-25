import React from 'react';
import FieldCell from './FieldCell';

class Field extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            size: this.props.size,
            speed: this.props.speed,
            run: true
        };

        this.getCellStatus = this.getCellStatus.bind(this);
        this.changeGeneration = this.changeGeneration.bind(this);
    }

    render() {
        switch (this.state.size) {
            case 'little':
                this.width = 500;
                this.height = 300;
                break;

            case 'big':
                this.width = 900;
                this.height = 700;
                break;

            default:
                this.width = 700;
                this.height = 500;
        }

        const arr = [];
        const limit = this.width*this.height/100;
        for (let i=0; i<limit; i++) {
            arr.push(i);
        }

        return (
            <div className="field">
                <div className={`field__cells  ${this.state.size}`}>
                    {arr.map((item, i) =><FieldCell size={this.state.size}
                                                    index={i}
                                                    key={i}
                                                    cellClassName={this.getCellStatus()}
                                                    run={this.props.run} />)}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
                if (!this.isPaused) {
                    this.changeGeneration()
                }
        }, 500);
        this.isIntervalRun = true;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.run !== this.state.run) {
            this.isPaused = true;
        } else {
            this.isPaused = false;
        }

        this.setState({
            size: nextProps.size,
            speed: this.props.speed,
            rendered: true
        });
    }

    getCellStatus() {
        if (this.state.rendered) {
            return 'field__cell';
        }

        const number = Math.random();
        if (number < 0.15) {
            return 'field__cell-alive';
        }
        return 'field__cell';
    }

    changeGeneration() {
        let self = this;

        const cells = document.querySelectorAll('.field__cells>div');
        const min = 0,
            xMax = (this.width/10),
            yMax = (this.height/10);

        const newGeneration = [];

        cells.forEach((item, i, arr) => {
            let leftCellIndex, rightCellIndex, topCellIndex,
                bottomCellIndex, leftTopDiag, rightTopDiag,
                leftBottomDiag, rightBottomDiag;

            {
            if (i % xMax === 0) {
                leftCellIndex = i + xMax - 1;
            } else {
                leftCellIndex = i - 1;
            }

            if (i % xMax === xMax - 1) {
                rightCellIndex = i - xMax + 1;
            } else {
                rightCellIndex = i + 1;
            }

            if (i <= xMax - 1) {
                topCellIndex = (xMax * (yMax-1)) + i;
            } else {
                topCellIndex = i - xMax;
            }

            if (i >= xMax * (yMax - 1)) {
                bottomCellIndex = i % xMax;
            } else {
                bottomCellIndex = i + xMax;
            }

            if (i <= xMax - 1) {
                if (i === 0) {
                    leftTopDiag = (xMax * yMax) - 1;
                } else {
                    leftTopDiag = xMax * (yMax - 1) + i - 1;
                }
            } else if (i%xMax === 0) {
                leftTopDiag = i-1;
            } else {
                leftTopDiag = i - xMax - 1;
            }

            if (i <= xMax - 1) {
                if (i === xMax - 1) {
                    rightTopDiag = xMax * (yMax - 1);
                } else {
                    rightTopDiag = xMax * (yMax - 1) + i + 1;
                }
            } else if (i%xMax === xMax-1) {
                rightTopDiag = (i - ((xMax-1)*2))-1;
            } else {
                rightTopDiag = i - xMax + 1;
            }

            if (i >= xMax * (yMax - 1)) {
                if (i === xMax * (yMax - 1)) {
                    leftBottomDiag = xMax - 1;
                } else {
                    leftBottomDiag = i % xMax - 1;
                }
            } else if (i === 0) {
                leftBottomDiag = xMax*yMax - 1;
            } else if (i%xMax === 0) {
                leftBottomDiag = (i + (xMax*2)) - 1;
            } else {
                leftBottomDiag = i + xMax - 1;
            }

            if (i >= xMax * (yMax - 1)) {
                if (i === xMax * yMax - 1) {
                    rightBottomDiag = 0;
                } else {
                    rightBottomDiag = (i%xMax) + 1;
                }
            } else if (i%xMax === xMax-1) {
                rightBottomDiag = i+1;
            } else {
                rightBottomDiag = i + xMax + 1;
            }

            }

            const neighbours = [leftCellIndex, rightCellIndex, topCellIndex, bottomCellIndex,
                leftTopDiag, rightTopDiag, leftBottomDiag, rightBottomDiag];

            let aliveCells = 0;

            neighbours.forEach(cell => {
                if (!arr[cell]) console.log(neighbours, cell);
                if (arr[cell].className === 'field__cell-alive') aliveCells++;
            });

            if (item.className === 'field__cell' && aliveCells === 3) {
                newGeneration.push('field__cell-alive');
            } else if (item.className === 'field__cell-alive' && (aliveCells === 2 || aliveCells === 3)) {
                newGeneration.push('field__cell-alive');
            } else {
                newGeneration.push('field__cell');
            }

        });

        newGeneration.forEach((item, i) => {
           cells[i].className = item;
        });
    }
}

export default Field;