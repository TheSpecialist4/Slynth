const makeNodes = audioContext => {
    console.log('making nodes-- ')
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);

    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(1, audioContext.currentTime);

    const lfo = audioContext.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 10;

    return { oscillator, gain, lfo };
}

const makeConnections = ({ oscillator, gain, lfo, audioContext }) => {
    lfo.connect(gain.gain);
    oscillator
        .connect(gain)
        .connect(audioContext.destination);
}

export default (audioContext) => {
    return Promise.resolve()
        .then(() => {
            const { oscillator, gain, lfo } = makeNodes(audioContext);
            makeConnections({ oscillator, gain, lfo, audioContext });

            const onFrequencyChange = newFrequency => {
                oscillator.frequency.value = parseInt(newFrequency) || 100;
            }

            const onVolumeChange = newVolume => {
                gain.gain.value = parseFloat(newVolume) || 1;
            }

            const onLfoChange = newFrequency => {
                lfo.frequency.value = parseInt(newFrequency) || 30;
            }

            const stop = () => {
                oscillator.stop();
                lfo.stop();
            }

            const start = () => {
                lfo.start();
                oscillator.start();
            }

            return {
                start,
                onFrequencyChange,
                onVolumeChange,
                onLfoChange,
                stop
            };
        })
}