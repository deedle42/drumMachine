import React from 'react';

const drumCodes = [81, 87, 69, 65, 83, 68, 90, 88, 67];
const drumKeys = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
}
]

class DrumDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentKey: '', sound: null }

        this.handleEnded = this.handleEnded.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }


    handleKeyDown(e) {
        if (drumCodes.includes(e.keyCode)) {
            let drumSound = drumKeys.filter(i => i.keyCode === e.keyCode);
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

    render() {
        return (
            <div>
                <div id="drum-display">
                    <div id="buttons">
                        <div id="row-1">
                            <button onKeyDown={this.handleKeyDown} value='Q'>Q</button>
                            <button onKeyDown={this.handleKeyDown} value='W'>W</button>
                            <button onKeyDown={this.handleKeyDown} value='E'>E</button>
                        </div>
                        <div id="row-2">
                            <button onKeyDown={this.handleKeyDown} value='A'>A</button>
                            <button onKeyDown={this.handleKeyDown} value='S'>S</button>
                            <button onKeyDown={this.handleKeyDown} value='D'>D</button>
                        </div>
                        <div id="row-3">
                            <button onKeyDown={this.handleKeyDown} value='Z'>Z</button>
                            <button onKeyDown={this.handleKeyDown} value='X'>X</button>
                            <button onKeyDown={this.handleKeyDown} value='C'>C</button>
                        </div>
                    </div>
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