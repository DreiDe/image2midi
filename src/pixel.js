/**
 * Based on pixelit by
 * @author José Moreira @ <https://github.com/giventofly/pixelit>
 **/

const palette = [
    [0, 0, 0],
    [255, 255, 255],
    [249, 115, 22],
    [253, 224, 71],
    [34, 197, 94],
    [20, 184, 166],
    [37, 99, 235],
    [124, 58, 237],
    [236, 72, 153],
    [220, 38, 38]
];

const pixelize = (canvas, img, tiles, usePalette = false) => {
    let scale = tiles > canvas.width ? 1 : tiles / canvas.width;

    var scaledW = Math.ceil(canvas.width * scale);
    var scaledH = Math.ceil(canvas.height * scale);

    var ctx = canvas.getContext('2d');

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    const canvasRatio = canvas.width / canvas.height;
    const imageRatio = img.width / img.height;
    const scalingFactor = canvasRatio / imageRatio;
    const height = scalingFactor > 1 ? img.height * scalingFactor : img.height;
    const width = scalingFactor < 1 ? img.width * scalingFactor : img.width;


    // first draw the center image cutout as miniature in the canvas, then cut out the miniature from the canvas and scale it up again
    // cut out before scale down to avoid half pixels at left side
    ctx.drawImage(img, (img.width - width) / 2, (img.height - height) / 2, width, height, 0, 0, scaledW, scaledH);

    if (usePalette) {
        for (var y = 0; y < scaledH; y++) {
            for (var x = 0; x < scaledW; x++) {
                let pixel = ctx.getImageData(x, y, 1, 1);
                const finalcolor = similarColor([
                    pixel.data[0],
                    pixel.data[1],
                    pixel.data[2],
                ]);
                pixel.data[0] = finalcolor[0];
                pixel.data[1] = finalcolor[1];
                pixel.data[2] = finalcolor[2];
                ctx.putImageData(pixel, x, y);
            }
        }
    }
    ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, canvas.width, canvas.height);
};

/**
* color similarity between colors, lower is better
* @param {array} rgbColor array of ints to make a rgb color: [int,int,int]
* @param {array} compareColor array of ints to make a rgb color: [int,int,int]
* @returns {number} limits [0-441.6729559300637]
*/

const colorSim = (rgbColor, compareColor) => {
    let i;
    let max;
    let d = 0;
    for (i = 0, max = rgbColor.length; i < max; i++) {
        d += (rgbColor[i] - compareColor[i]) * (rgbColor[i] - compareColor[i]);
    }
    return Math.sqrt(d);
}

/**
 * given actualColor, check from the paletteColors the most aproximated color
 * @param {array} actualColor rgb color to compare [int,int,int]
 * @returns {array} aproximated rgb color
 */

const similarColor = actualColor => {
    let selectedColor = [];
    let currentSim = colorSim(actualColor, palette[0]);
    let nextColor;
    palette.forEach((color) => {
        nextColor = colorSim(actualColor, color);
        if (nextColor <= currentSim) {
            selectedColor = color;
            currentSim = nextColor;
        }
    });
    return selectedColor;
}

export { pixelize, similarColor }