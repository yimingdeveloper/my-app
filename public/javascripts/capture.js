// Video cover components
const video = document.querySelector("video");
const controls = document.querySelector(".controls");
const controlButtons = [...controls.querySelectorAll("button")];
const [play, pause, screenshot] = controlButtons;
const outline = document.querySelector(".outline");
// Screenshot components
const canvas = document.querySelector("canvas");
const screenshotImage = document.querySelector(".screenshot-image");
const analyze = document.querySelector(".analyze");

// Stream switch
let streamStarted = false;

// Set video dimensions
const constraints = {
  video: {
    width: 1280,
    height: 720,
  },
};

// Plays video stream and displays controls
play.onclick = () => {
  if (streamStarted) {
    video.play();
    play.classList.add("d-none");
    pause.classList.remove("d-none");
    outline.classList.remove("d-none");
    return;
    // Starts new stream if first time
  } else if ("mediaDevices" in navigator) {
    startStream(constraints);
  }
};

// Pauses video stream
pause.onclick = () => {
  video.pause();
  play.classList.remove("d-none");
  pause.classList.add("d-none");
  outline.classList.add("d-none");
};

// Takes screenshot from video stream
screenshot.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  screenshotImage.src = canvas.toDataURL("image/png");
  screenshotImage.classList.remove("d-none");
  analyze.classList.remove("d-none");
};

// Samples color of a region inside screenshot
analyze.onclick = () => {
  console.log("in sampleColor");
  const canvasOutput = document.createElement("canvas");
  const context = canvasOutput.getContext("2d");
  const width = screenshotImage.width;
  const height = screenshotImage.height;
  canvasOutput.width = width;
  canvasOutput.height = height;
  context.drawImage(screenshotImage, 0, 0, width, height);

  // Each pixel will have 4 components (R, G, B, A)
  let R = 0;
  let G = 0;
  let B = 0;

  // All the pixel's components have been flattened into 1-D array
  const data = context.getImageData(590, 130, 95, 55).data;
  const components = data.length;
  const pixelsPerChannel = components / 4;

  // Loop through all pixels to calculate average color
  for (let i = 0; i < components; i += 4) {
    // A single pixel (R, G, B, A) will take 4 positions in the array
    R += data[i];
    G += data[i + 1];
    B += data[i + 2];
  }

  // Get average R, G, B, A values
  let avgR = Math.round(R / pixelsPerChannel);
  let avgG = Math.round(G / pixelsPerChannel);
  let avgB = Math.round(B / pixelsPerChannel);

  // Write average RGB values in doc
  let color = `rgb(${avgR} ${avgG} ${avgB})`;
  document.querySelector("p").innerHTML = color;

  // Display average color in doc
  const div = document.querySelector(".output");
  div.style.backgroundColor = color;
};

// Establishes a video stream
const startStream = async (constraints) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleStream(stream);
  } catch (e) {
    console.log(e);
    console.log("please give permissions");
  }
};

// Displays video stream and activates controls
const handleStream = (stream) => {
  video.srcObject = stream;
  streamStarted = true;
  play.classList.add("d-none");
  pause.classList.remove("d-none");
  screenshot.classList.remove("d-none");
  outline.classList.remove("d-none");
};
