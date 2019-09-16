/* @flow */
let audioContext = undefined;

const AudioContext = window.AudioContext || window.webkitAudioContext;

export default () => {
    if (audioContext instanceof AudioContext) return audioContext;
    audioContext = new AudioContext();
    
    return audioContext;
}