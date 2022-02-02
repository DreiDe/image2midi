import { useState, useEffect, useLayoutEffect } from 'preact/hooks';

import Button from './Button';
import Notch from './Notch';

const Steps = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [imagePath, setImagePath] = useState();
    const [locked, setLocked] = useState(true);

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

    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext('2d')

        var img = new Image();
        img.onload = function () {
            const scalingFactor = Math.max(ctx.canvas.height / img.height, ctx.canvas.width / img.width)
            ctx.drawImage(img, (ctx.canvas.width - img.width * scalingFactor) / 2, (ctx.canvas.height - img.height * scalingFactor) / 2, img.width * scalingFactor, img.height * scalingFactor);
        };
        img.src = imagePath;

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
            tool: <input type="range" min="1" max="10" value="4" class="w-64"></input>
        },
        {
            name: "Farben Normalisieren",
            tool: ""
        },
        {
            name: "Komposition spielen",
            tool: ""
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
                            : <Button onClick={() => setCurrentStep(currentStep - 1)} text={"⬅️ " + steps[currentStep].name} />
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
};

export default Steps;


