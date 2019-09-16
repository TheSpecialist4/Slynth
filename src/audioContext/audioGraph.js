import _audioContext from './audioContext';
import _oscillator from './oscillator';

const audioContext = _audioContext();
let oscillator = undefined;

const start = () => {
    oscillator = _oscillator(audioContext);
    oscillator.connect(audioContext.destination);
    oscillator.start();
}

const stop = () => {
    oscillator.stop();
}

export { start, stop };