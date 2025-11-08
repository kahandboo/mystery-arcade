const DEFAULT_ASCII_RAMP = "@#%*+=-:. ";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

function getResizedImageData(image, width) {
  const aspectRatioCorrection = 0.5; 
  const scale = width / image.width;
  const height = image.height * scale * aspectRatioCorrection;
  
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);
  
  return ctx.getImageData(0, 0, width, height);
}

function mapImageDataToAscii(imageData, ramp) {
  const { data, width, height } = imageData;
  let asciiArt = "";
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
  
      const brightness = (r + g + b) / 3;
  
      const rampIndex = Math.floor((brightness / 255) * (ramp.length - 1));
      asciiArt += ramp[rampIndex];
    }
    asciiArt += "\n";
  }
  return asciiArt;
}

export function convertImageToAscii(image, options = {}) {
  const width = options.width;
  const ramp = options.ramp || DEFAULT_ASCII_RAMP;
  
  const imageData = getResizedImageData(image, width);
  const asciiArt = mapImageDataToAscii(imageData, ramp);
  
  return asciiArt;
}