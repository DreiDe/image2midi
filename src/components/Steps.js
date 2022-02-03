import { useState, useEffect, useLayoutEffect } from 'preact/hooks';

import Button from './Button';
import Notch from './Notch';
import Palette from './Palette';
import { pixelize } from "../pixel"
import { playSong } from '../synth';

const Steps = () => {
    const [currentStep, setCurrentStep] = useState(3);
    const [imagePath, setImagePath] = useState();
    const [locked, setLocked] = useState(true);
    const [pause, setPause] = useState(true);
    const [image, setImage] = useState();
    const [tileCount, setTileCount] = useState();
    const [order, setOrder] = useState();
    const [audioBlob, setAudioBlob] = useState();

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

    const changeTiles = (tileCount, match = false) => {
        setTileCount(tileCount);
        setOrder(pixelize(document.getElementById("canvas"), image, tileCount, match));
    }

    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext('2d')

        let img = new Image();
        img.onload = () => {
            pixelize(canvas, img, 10000);
            setImage(img);
        };
        img.src = imagePath;

        // resize canvas on window resize
        window.addEventListener("resize", resizeCanvas(ctx));
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [imagePath]);

    useEffect(() => {
        if (!image) return;

        if (currentStep == 0) changeTiles(10000);
        else if (currentStep == 1) changeTiles(tileCount);
        else if (currentStep == 2) changeTiles(tileCount, true);
        else playSong(order, setAudioBlob);
    }, [currentStep]);

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
            tool: <input type="range" min="1" max="10" class="w-64" value={tileCount} onChange={e => changeTiles(e.target.value)}></input>
        },
        {
            name: "Farben Normalisieren",
            tool: <Palette></Palette>
        },
        {
            name: "Komposition spielen",
            tool:
                <audio class="w-full mx-3" controls autoplay src={audioBlob}>
                </audio>
        }
    ];

    return (
        <div class="flex flex-col h-full w-full lg:w-1/2 justify-between">
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
                {
                    currentStep == 3
                        ? <div class="basis-3/4 flex justify-center">
                            {steps[currentStep].tool}
                        </div>
                        : <>
                            <div class="basis-1/2 flex justify-center">
                                {steps[currentStep].tool}
                            </div>
                            <div class="basis-1/4 flex justify-end">
                                <Button onClick={() => setCurrentStep(currentStep + 1)} text={steps[currentStep + 1].name + " ➡️"} disabled={locked} />
                            </div></>
                }
            </div>
        </div>
    );
}

export default Steps;


