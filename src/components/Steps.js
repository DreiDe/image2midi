import { useState } from 'preact/hooks';

import Load from "./Load";
import Raster from "./Raster";
import Normalize from "./Normalize";
import Play from "./Play";
import Button from './Button';

const steps = [
    "Bild auswählen",
    "Bild rastern",
    "Farben Normalisieren",
    "Komposition spielen"
];

const forward = " ➡️";
const backward = "⬅️ ";

const Steps = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [imagePath, setImagePath] = useState();
    const [loading, setLoading] = useState(true);

    const imageChange = (e) => {
        const [file] = e.target.files;
        if (!file) return;
        setImagePath(URL.createObjectURL(file));
        setLoading(false);
    }

    return (
        <div class="flex flex-col h-full w-3/4 md:w-1/2 justify-between">
            <div class="bg-blue-800 rounded-b-2xl absolute left-1/2 transform -translate-x-1/2">
                <h1 class="text-4xl text-center text-white py-2 px-4">{steps[currentStep]}</h1>
            </div>
            <div class="m-2 flex h-full">
                {
                    currentStep == 0
                        ? <Load imagePath={imagePath}></Load>
                        : currentStep == 1
                            ? <Raster></Raster>
                            : <></>
                }
            </div>
            <div>
                <div class="flex justify-between items-center bg-white px-4 py-3 rounded-full m-2">

                    <Button onClick={() => setCurrentStep(currentStep - 1)} text={backward + steps[currentStep - 1]} invisible={currentStep == 0} />
                    {
                        currentStep == 0
                            ? <label class="rounded-full w-12 h-12 bg-gray-300 flex items-center justify-center hover:bg-blue-500 cursor-pointer">
                                <p>➕</p>
                                <input type="file" onChange={imageChange} accept="image/*" class="hidden" />
                            </label>
                            : currentStep == 1
                                ? <input type="range" min="1" max="10" value="4" class="w-64"></input>
                                : <></>
                    }
                    <Button onClick={() => setCurrentStep(currentStep + 1)} text={steps[currentStep + 1] + forward} disabled={loading} invisible={currentStep == steps.length - 1} />
                </div>
            </div>
        </div>
    );
};

export default Steps;


