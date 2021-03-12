const controls = document.querySelector(".controls");
const cameraOptions = document.querySelector(".video-options>select");
const video = document.querySelector("video");
const canvas = document.querySelector("canvas");
const screenshotImage = document.querySelector(".screenshot-image");
const outlineImage = document.querySelector(".outline-image");
const controlButtons = [...controls.querySelectorAll("button")];
const analyze = document.querySelector(".analyze");

let streamStarted = false;

const [play, pause, screenshot] = controlButtons;

// Set video dimensions
const constraints = {
  video: {
    width: 1280,
    height: 720,
  },
};

cameraOptions.onchange = () => {
  const updatedConstraints = {
    ...constraints,
    deviceId: {
      exact: cameraOptions.value,
    },
  };

  startStream(updatedConstraints);
};

// Starts video stream
play.onclick = () => {
  if (streamStarted) {
    video.play();
    play.classList.add("d-none");
    pause.classList.remove("d-none");
    outlineImage.classList.remove("d-none");
    return;
  }
  if ("mediaDevices" in navigator && navigator.mediaDevices.getUserMedia) {
    const updatedConstraints = {
      ...constraints,
      deviceId: {
        exact: cameraOptions.value,
      },
    };
    startStream(updatedConstraints);
  }
};

// Pauses video stream
const pauseStream = () => {
  video.pause();
  play.classList.remove("d-none");
  pause.classList.add("d-none");
  outlineImage.classList.add("d-none");
};

// Takes screenshot from video stream
const doScreenshot = () => {
  console.log("in doScreenshot");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  screenshotImage.src = canvas.toDataURL("image/webp");
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
  let A = 0;

  // All the pixel's components have been flattened into 1-D array
  const data = context.getImageData(580, 340, 40, 20).data;
  const components = data.length;
  const pixelsPerChannel = components / 4;

  // Loop through all pixels to calculate average color
  for (let i = 0; i < components; i += 4) {
    // A single pixel (R, G, B, A) will take 4 positions in the array
    R += data[i];
    G += data[i + 1];
    B += data[i + 2];
    A += data[i + 3];
  }

  // Get average R, G, B, A values
  let avgR = Math.round(R / pixelsPerChannel);
  let avgG = Math.round(G / pixelsPerChannel);
  let avgB = Math.round(B / pixelsPerChannel);
  let avgA = A / pixelsPerChannel / 255;

  // Display average color in doc
  document.querySelector(
    "p"
  ).innerHTML = `R G B A => ${avgR} ${avgG} ${avgB} ${avgA}`;
};

pause.onclick = pauseStream;
screenshot.onclick = doScreenshot;

// asks for permission to get camera access
const startStream = async (constraints) => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  handleStream(stream);
};

// displays video stream and controls
const handleStream = (stream) => {
  video.srcObject = stream;
  play.classList.add("d-none");
  pause.classList.remove("d-none");
  screenshot.classList.remove("d-none");
  outlineImage.classList.remove("d-none");
};

// gets camera options
const getCameraSelection = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter((device) => device.kind === "videoinput");
  const options = videoDevices.map((videoDevice) => {
    return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
  });
  cameraOptions.innerHTML = options.join("");
};

getCameraSelection();
