const controls = document.querySelector(".controls");
const cameraOptions = document.querySelector(".video-options>select");
const video = document.querySelector("video");
const canvas = document.querySelector("canvas");
const screenshotImage = document.querySelector(".screenshot-image");
const outlineImage = document.querySelector(".outline-image");
const controlButtons = [...controls.querySelectorAll("button")];
const analyze = document.querySelector(".analyze");
const screenshotOutput = document.querySelector(".screenshot-output");

let streamStarted = false;

const [play, pause, screenshot] = controlButtons;

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

// starts video stream
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

// pauses video stream
const pauseStream = () => {
  video.pause();
  play.classList.remove("d-none");
  pause.classList.add("d-none");
  outlineImage.classList.add("d-none");
};

// takes screenshot from video stream
const doScreenshot = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  screenshotImage.src = canvas.toDataURL("image/webp");
  screenshotImage.classList.remove("d-none");
  analyze.classList.remove("d-none");
};

pause.onclick = pauseStream;
screenshot.onclick = doScreenshot;

analyze.onclick = () => {
  console.log(canvas, screenshotImage);

  screenshotOutput.src = canvas.toDataURL("image/webp");
  screenshotOutput.classList.remove("d-none");
};

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
