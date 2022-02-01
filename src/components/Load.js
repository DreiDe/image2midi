import { useState } from "preact/hooks";

const Load = ({ imagePath }) => {
    return (
        imagePath
            ? <div style={{ backgroundImage: `url(${imagePath})` }} class="bg-center bg-cover mx-auto aspect-[2/3] rounded-md bg-white max-w-full"></div>
            : <div class="text-2xl mx-auto aspect-[2/3] rounded-md flex flex-col items-center justify-center text-xl bg-white max-w-full">
                <p>Kein Bild selektiert</p>
            </div>
    )
};

export default Load;

