import React from 'react';
import ReactDOM from 'react-dom';
import Controls from './components/Controls';
import Count from './components/Count';
import Field from './components/Field';
import Options from './components/Options';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            size: 'middle',
            run: true,
            count: 0
        };

        this.optionsChange = this.optionsChange.bind(this);
        this.run = this.run.bind(this);
        this.pause = this.pause.bind(this);
        this.clear = this.clear.bind(this);
        this.onCountChanged = this.onCountChanged.bind(this);
    }

    render() {
        return(
            <div className="life">
                <Controls onRun={this.run} onPause={this.pause} onClear={this.clear} />
                <Count value={this.state.count} />
                <Field size={this.state.size}
                       run={this.state.run} countChanged={this.onCountChanged}/>
                <Options optionsChange={this.optionsChange}
                         size={this.state.size} />
            </div>
        );
    }

    run() {
        if (this.state.run) return;

        this.setState({
            run: true
        });
    }

    pause() {
        if (!this.state.run) return;

        this.setState({
            run: false
        });
    }

    clear() {
        this.setState({
            run: false,
            count: 0
        }, () => clearCells());

        function clearCells() {
            const cells = document.querySelectorAll('.field__cells>div');
            cells.forEach(item => item.className = 'field__cell');
        }
    }

    optionsChange(option, value) {
        this.setState({
            [option]: value,
            count: 0
        }, () => {
            this.clear();
        });

        if (option === 'size') {

        }
    }

    onCountChanged() {
        this.setState({
            count: this.state.count + 1
        });
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));