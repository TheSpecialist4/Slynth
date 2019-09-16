import React, { Component } from 'react';

import { start, stop } from '../audioContext/audioGraph';

class Synth extends Component {
    constructor() {
        super();
        this.state = {
            playing: false
        }
        this.togglePlaying = this.togglePlaying.bind(this);
    }

    togglePlaying() {
        const { playing } = this.state;
        this.setState({ playing: !playing });
        if(playing) {
            stop();
        } else {
            start();
        }
    }

    render() {
        const { playing } = this.state;
        return (
            <div>
                <button
                    onClick={this.togglePlaying}
                >
                    {playing ? 'Stop' : 'Start'}
                </button>
            </div>
        )
    }
}

export default Synth;