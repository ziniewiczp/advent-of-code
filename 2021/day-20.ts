import { readFileSync } from 'fs';

const getAlgorithm = (): Array<string> => {
    return readFileSync('./inputs/day-20.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n\n')[0]
        .replaceAll('\n', '')
        .split('');
}

const getInputImage = (): Array<Array<string>> => {
    return readFileSync('./inputs/day-20.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n\n')[1]
        .split('\n')
        .map((row: string) => row.split(''));
}

const enlargeImage = (image: Array<Array<string>>, margin: number, step: number) => {
    const length: number = image.length;
    const width: number = image[0].length;

    const newImage: Array<Array<string>> = new Array();

    for(let i: number = 0; i < length + 2 * margin; i += 1) {
        newImage[i] = new Array();

        for(let j: number = 0; j < width + 2 * margin; j += 1) {
            if(i < margin || i > length + margin - 1 || j < margin || j > width  + margin - 1) {
                newImage[i][j] = (step % 2 === 0) ? '.' : '#';
            
            } else {
                newImage[i][j] = image[i - margin][j - margin];
            }
        }
    }

    return newImage;
}

const getLeadingPixel = (image: Array<Array<string>>, x: number, y: number, step: number): number => {
    const length: number = image.length;
    const width: number = image[0].length;
    
    let binary: string = '';

    for(let i: number = -1; i < 2; i += 1) {
        for(let j: number = -1; j < 2; j += 1) {
            if(x + i < 0 || x + i > length - 1 || y + j < 0 || y + j > width - 1) {
                binary += (step % 2 === 0) ? '.' : '#';
            
            } else {
                binary += image[x + i][y + j];
            }
        }
    }

    return parseInt(
        binary
            .replaceAll('.', '0')
            .replaceAll('#', '1'),
        2);
}

const enhanceImage = (algorithm: Array<string>, image: Array<Array<string>>, step: number): Array<Array<string>> => {
    const length: number = image.length;
    const width: number = image[0].length;

    const enhancedImage: Array<Array<string>> = new Array();
    for(let i: number = 0; i < length; i += 1) {
        enhancedImage[i] = new Array();

        for(let j: number = 0; j < width; j += 1) {
            enhancedImage[i][j] = algorithm[getLeadingPixel(image, i, j, step)];
        }
    }

    return enhancedImage;
}

const algorithm: Array<string> = getAlgorithm();

let inputImage: Array<Array<string>> = getInputImage();

const steps: number = 50;

for(let step: number = 0; step < steps; step += 1) {
    inputImage = enlargeImage(inputImage, 4, step);
    inputImage = enhanceImage(algorithm, inputImage, step);
}

// inputImage.forEach(row => {
//     console.log(row.join(''));
// });

let litPixels: number = 0;

inputImage.forEach((row: Array<string>) => {
    row.forEach((pixel: string) => {
        if(pixel === '#') { litPixels += 1; }
    });
});

console.log(litPixels);