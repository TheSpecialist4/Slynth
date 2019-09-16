import React, { Component } from 'react';

import Bass from './Bass';
class Synth extends Component {
    constructor() {
        super();
        this.state = {
            playing: false,
            stopped: false
        }
    }

    render() {
        const { playing, stopped } = this.state;
        return (
            <div>
                <button
                    onClick={() => {this.setState({ playing: true, stopped: false })}}
                    disabled={playing}
                >
                    Play
                </button>
                <button 
                    onClick={() => this.setState({ stopped: true, playing: false })}
                    disabled={!playing}
                >
                    Stop</button>
                <Bass start={playing} stop={stopped} />
            </div>
        )
    }
}

export default Synth;