import React from 'react';

class DrumDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentKey: '', sound: null }

        this.handleEnded = this.handleEnded.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.wrapperFunction = this.wrapperFunction.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }


    handleKeyDown(e) {
        if (this.props.drumCodes.includes(e.keyCode)) {
            let drumSound = this.props.drumKeys.filter(i => i.keyCode === e.keyCode);
            this.setState(state => ({
                currentKey: drumSound[0].id,
                sound: drumSound[0].url
            }));
        };
    };

    handleEnded(e) {
        e.persist();
        this.setState(state => ({
            sound: ''
        }));
        document.querySelector('#drum-audio').src = '';
    };

    wrapperFunction(e) {
        this.handleKeyDown(e);
    }


    render() {
        return (
            <div className="container drum-container">
                <div id="drum-display">
                    <h1>Press a key!</h1>
                    {this.props.drumKeys.map((drum, index) => (
                        <button
                            id={drum.keyTrigger}
                            key={index}
                            className="btn btn-outline-primary"
                            onKeyDown={this.wrapperFunction}
                            value={drum.keyTrigger}
                        >{drum.keyTrigger}</button>
                    ))}
                    {/* <div id="buttons">
                        <div id="row-1">
                            <button className="btn btn-outline-primary" onKeyDown={this.handleKeyDown} value='Q'>Q</button>
                            <button className="btn btn-outline-primary" onKeyDown={this.handleKeyDown} value='W'>W</button>
                            <button className="btn btn-outline-primary" onKeyDown={this.handleKeyDown} value='E'>E</button>
                        </div>
                        <div id="row-2">
                            <button className="btn btn-outline-primary" onKeyDown={this.handleKeyDown} value='A'>A</button>
                            <button className="btn btn-outline-primary" onKeyDown={this.handleKeyDown} value='S'>S</button>
                            <button className="btn btn-outline-primary" onKeyDown={this.handleKeyDown} value='D'>D</button>
                        </div>
                        <div id="row-3">
                            <button className="btn btn-outline-primary" onKeyDown={this.handleKeyDown} value='Z'>Z</button>
                            <button className="btn btn-outline-primary" onKeyDown={this.handleKeyDown} value='X'>X</button>
                            <button className="btn btn-outline-primary" onKeyDown={this.handleKeyDown} value='C'>C</button>
                        </div>
                    </div> */}
                    <div id="current-key">
                        <p><audio id="drum-audio" src={this.state.sound} onEnded={this.handleEnded} autoPlay></audio></p>
                        <p>{this.state.currentKey}</p>
                    </div>
                </div>
            </div>
        )
    };
};

export default DrumDisplay;