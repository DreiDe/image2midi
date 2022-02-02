import * as Tone from 'tone'

const ToneJS = () => {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    return (
        <>
            <h1>TONE JS TEST</h1>
            <button onCLick={() => synth.triggerAttackRelease("C4", "8n")}>Play</button>
        </>
    );
};

export default ToneJS;
