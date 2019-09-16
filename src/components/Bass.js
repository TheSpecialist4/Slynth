import React, { Component } from 'react';

import audioContext from '../audioContext/audioContext';
import _bassOscillator from '../audioContext/bass/bassOscillator';

class Bass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bassOscillator: undefined,
            gain: 1,
            oscFreq: 100,
            lfoFreq: 30
        }
    }

    componentDidMount() {
        _bassOscillator(audioContext())
            .then(osc => {
                this.setState({ bassOscillator: osc });
            })
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.stop && this.props.stop) {
            this.setState({ bassOscillator: undefined });
        }
    }

    update = (target, value, callback) => {
        this.setState({ [target]: value });
        callback(value);
    }

    render() {
        const { bassOscillator, gain, oscFreq, lfoFreq } = this.state;
        if (!bassOscillator) {
            return <div>Loading...</div>;
        }
        if (this.props.stop && bassOscillator) {
            bassOscillator.stop();
            return <div>Stopped!</div>;
        }
        if (this.props.start) {
            bassOscillator.start();
        }
        return (
            <div>
                <h2>Base</h2>
                <input
                    id="bassGain"
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    defaultValue="1"
                    onChange={e => {
                        const val = parseFloat(e.target.value || 1);
                        // this.setState({ gain: val })
                        (bassOscillator || {}).onVolumeChange(val)
                    }}
                    // onChange={e => this.update('gain', parseFloat(e.target.value) || 1, bassOscillator.onVolumeChange)}
                />
                <label htmlFor="bassGain">Gain</label>
                <input
                    id="bassFreq"
                    type="range"
                    min="0"
                    max="500"
                    step="2"
                    defaultValue="100"
                    onChange={e => {
                        const val = parseInt(e.target.value || 200);
                        // this.setState({ oscFreq: val })
                        (bassOscillator || {}).onFrequencyChange(val)
                    }}
                    // onChange={e => this.update('oscFreq', parseInt(e.target.value) || 200, bassOscillator.onFrequencyChange)}
                />
                <label htmlFor="bassFreq">Frequency</label>
                <input
                    id="bassLfo"
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    defaultValue="3"
                    onChange={e => {
                        const val = parseInt(e.target.value);
                        // this.setState({ lfoFreq: val })
                        (bassOscillator || {}).onLfoChange(val)
                    }}
                    // onChange={e => this.update('lfoFreq', parseInt(e.target.value) || 30, bassOscillator.onLfoChange)}
                />
                <label htmlFor="bassLfo">Lfo</label>
            </div>
        )
    }
}

export default Bass;