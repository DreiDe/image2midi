import { useState, useEffect, useLayoutEffect } from 'preact/hooks';

import Button from './Button';
import Notch from './Notch';
import Palette from './Palette';

const Steps = () => {
    const [currentStep, setCurrentStep] = useState(2);
    const [imagePath, setImagePath] = useState();
    const [locked, setLocked] = useState(true);
    const [tileCount, setTileCount] = useState(4);
    const [pause, setPause] = useState(true);
    const [imageObject, setImageObject] = useState();

    const imageChange = (e) => {
        const [file] = e.target.files;
        if (!file) return;
        setImagePath(URL.createObjectURL(file));
        setLocked(false);
    }

    const resizeCanvas = ctx => {
        ctx.canvas.height = ctx.canvas.clientHeight;
        ctx.canvas.width = ctx.canvas.clientWidth;
        ctx.font = "40px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText("Noch kein 🖼️ gewählt", canvas.width / 2, canvas.height / 2);
    }

    const changeRasterSize = e => {
        setTileCount(e.target.value);

        const tilesPerRow = e.target.value;
        const aspectRatio = imageObject.height / imageObject.width;
        const totalTiles = tilesPerRow * Math.round(tilesPerRow * aspectRatio);
        const pxPerTile = Math.round(imageObject.width / tilesPerRow);
        const data = imageObject.data;

        let currentTile = 0;
        let colors = [...Array(totalTiles)].map(e => Array(3).fill(0));

        for (let px = 0; px < data.length / 4; px++) {
            let rgba = px * 4;
            colors[currentTile][0] += data[rgba];
            colors[currentTile][1] += data[rgba + 1];
            colors[currentTile][2] += data[rgba + 2];
            if (px % pxPerTile == 0) currentTile++;
        }

        console.log(colors);
    }

    const drawTiles = (tiles) => {
        tiles.map(tile => {
            ctx.fillStyle = `rgb(${tile[0]},${tile[1]},${tile[2]})`;
            ctx.fillRect(h, v, rasterSize, rasterSize);
        })
    }
    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext('2d')

        let img = new Image();
        img.onload = () => {
            // center image in canvas and resize to fit larger site
            const scalingFactor = Math.max(ctx.canvas.height / img.height, ctx.canvas.width / img.width)
            ctx.drawImage(img, (ctx.canvas.width - img.width * scalingFactor) / 2, (ctx.canvas.height - img.height * scalingFactor) / 2, img.width * scalingFactor, img.height * scalingFactor);

            // save pixel values and size to imageObject
            setImageObject(ctx.getImageData(0, 0, canvas.width, canvas.height));
        };
        img.src = imagePath;

        // resize canvas on window resize
        window.addEventListener("resize", resizeCanvas(ctx));
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [imagePath]);

    const steps = [
        {
            name: "Bild auswählen",
            tool:
                <label class="rounded-full w-12 h-12 bg-gray-300 flex items-center justify-center hover:bg-blue-500 cursor-pointer">
                    <p>➕</p>
                    <input type="file" onChange={imageChange} accept="image/*" class="hidden" />
                </label>
        },
        {
            name: "Bild rastern",
            tool: <input type="range" min="1" max="10" value={tileCount} class="w-64" onChange={changeRasterSize}></input>
        },
        {
            name: "Farben Normalisieren",
            tool: <Palette></Palette>
        },
        {
            name: "Komposition spielen",
            tool: <p onClick={() => setPause(!pause)} class="text-4xl cursor-pointer">{pause ? "▶️" : "⏸️"}</p>
        }
    ];

    return (
        <div class="flex flex-col h-full w-3/4 md:w-1/2 justify-between">
            <Notch text={steps[currentStep].name} />

            <canvas class="h-full my-2 mx-auto aspect-[2/3] rounded-md max-w-full bg-white" id="canvas" />

            <div class="flex bg-white px-4 items-center rounded-full m-2 h-16">
                <div class="basis-1/4 flex justify-start">
                    {
                        currentStep == 0
                            ? null
                            : <Button onClick={() => setCurrentStep(currentStep - 1)} text={"⬅️ " + steps[currentStep - 1].name} />
                    }
                </div>
                <div class="basis-1/2 flex justify-center">
                    {steps[currentStep].tool}
                </div>
                <div class="basis-1/4 flex justify-end">
                    {
                        currentStep == steps.length - 1
                            ? null
                            : <Button onClick={() => setCurrentStep(currentStep + 1)} text={steps[currentStep + 1].name + " ➡️"} disabled={locked} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Steps;


