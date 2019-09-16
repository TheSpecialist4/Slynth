/* @flow */
let audioContext = undefined;

const AudioContext = window.AudioContext || window.webkitAudioContext;

export default () => {
    console.log('aido context-- ', audioContext);
    if (audioContext instanceof AudioContext) return audioContext;
    audioContext = new AudioContext();

    console.log('audioContext-- ', audioContext);
    
    return audioContext;
}