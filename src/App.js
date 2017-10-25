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
            speed: 'middle',
            run: true
        };

        this.optionsChange = this.optionsChange.bind(this);
        this.run = this.run.bind(this);
        this.pause = this.pause.bind(this);
        this.clear = this.clear.bind(this);
    }

    render() {
        return(
            <div className="life">
                <Controls onRun={this.run} onPause={this.pause} onClear={this.clear} />
                <Count/>
                <Field size={this.state.size}
                       speed={this.state.speed}
                       run={this.state.run} />
                <Options optionsChange={this.optionsChange}
                         size={this.state.size}
                         speed={this.state.speed} />
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
            run: false
        }, () => clearCells());

        function clearCells() {
            const cells = document.querySelectorAll('.field__cells>div');
            cells.forEach(item => item.className = 'field__cell');
        }
    }

    optionsChange(option, value) {
        this.setState({
            [option]: value
        });
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));