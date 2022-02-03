import * as Tone from 'tone'
import * as zero from './assets/midi/0.json';
import * as one from './assets/midi/1.json';
import * as two from './assets/midi/2.json';
import * as three from './assets/midi/3.json';
import * as four from './assets/midi/4.json';
import * as five from './assets/midi/5.json';
import * as six from './assets/midi/6.json';
import * as seven from './assets/midi/7.json';
import * as eight from './assets/midi/8.json';
import * as nine from './assets/midi/9.json';

const samples = [zero, one, two, three, four, five, six, seven, eight, nine];
const synths = [];
let duration = 0;

const playSong = order => {
    const now = Tone.now() + 0.5;
    order.map(sample => {
        samples[sample].default.tracks.forEach((track) => {
            //create a synth for each track
            const synth = new Tone.PolySynth(Tone.Synth, {
                envelope: {
                    attack: 0.02,
                    decay: 0.1,
                    sustain: 0.3,
                    release: 1,
                },
            }).toDestination();
            Tone.Transport.start();
            synths.push(synth);
            //schedule all of the events
            track.notes.forEach((note) => {
                synth.triggerAttackRelease(
                    note.name,
                    note.duration,
                    note.time + duration + now,
                    note.velocity
                );
            });
        });
        duration += samples[sample].default.duration;
        console.log(duration);
    })
}

const stop = () => {
    while (synths.length) {
        const synth = synths.shift();
        synth.disconnect();
    }
}

export { playSong, stop }