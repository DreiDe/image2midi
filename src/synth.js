import Crunker from "crunker";

let crunker = new Crunker();

const playSong = (order, cb) => {
    const files = [];
    order.map(tile => {
        files.push(`assets/mp3/${tile}.mp3`)
    })
    crunker
        .fetchAudio(...files)
        .then((buffers) => {
            return crunker.concatAudio(buffers);
        })
        .then((concated) => {
            return crunker.export(concated, 'audio/mp3');
        })
        .then((output) => {
            cb(output.url);
        })
        .catch((error) => {
            console.log("merging error");
        });
}

export { playSong }