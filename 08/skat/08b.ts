import inputs from '../../08/skat/input';
import SpaceImageFormat from '../../08/skat/08a';
import Jimp from 'jimp';
const width = 25;
const height = 6;

// create space image format object
const sif = new SpaceImageFormat(inputs, width, height);

new Jimp(width, height, (err, image) => {
    if (err) throw err;

    // reverse layers since its writes from back to front
    sif.layers.reverse();

    // for each layer, write pixel data
    sif.layers.forEach(layer => {
        layer.forEach((pixel, index) => {
            if (pixel !== 2) {
                const x = index % width;
                const y = Math.floor(index / width);
                const color = pixel === 1 ? 0x000000ff : 0xffffffff;
                image.setPixelColor(color, x, y);
            }
        });
    });

    // output the image
    image.write('image.png');
});
