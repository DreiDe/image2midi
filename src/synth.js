import Crunker from "crunker";

let crunker = new Crunker();

const playSong = (order, cb) => {
    const files = [];
    order.map(tile => {
        files.push(`assets/wav/${tile}.wav`)
    })
    crunker
        .fetchAudio(...files)
        .then((buffers) => {
            return crunker.concatAudio(buffers);
        })
        .then((concated) => {
            return crunker.export(concated, 'audio/wav');
        })
        .then((output) => {
            cb(output.url);
        })
        .catch((error) => {
            console.log("merging error");
        });
}

export { playSong }