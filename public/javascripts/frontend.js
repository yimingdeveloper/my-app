// Video cover components
const video = document.querySelector("video");
const controls = document.querySelector(".controls");
const controlButtons = [...controls.querySelectorAll("button")];
const [play, pause, capture] = controlButtons;
const outline = document.querySelector(".outline");
// Outputs
const canvas = document.querySelector("canvas");
const screenshotImage = document.querySelector(".screenshot-image");
const displayImage = document.querySelector(".display-image");
const analyze = document.querySelector(".analyze");
const result = document.querySelector(".result");
const match = document.querySelector(".match");

// Users skintone
let skintone = {};

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
  capture.classList.remove("d-none");
  outline.classList.remove("d-none");
};

// Pauses video stream
pause.onclick = () => {
  video.pause();
  play.classList.remove("d-none");
  pause.classList.add("d-none");
  outline.classList.add("d-none");
};

// Takes screenshot from video stream
capture.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  screenshotImage.src = canvas.toDataURL("image/webp");
  displayImage.src = canvas.toDataURL("image/webp");
  //screenshotImage.classList.remove("d-none");
  displayImage.classList.remove("d-none");
  analyze.classList.remove("d-none");
};

// TODO: Turn off camera here
// Samples color of a region inside screenshot
analyze.onclick = () => {
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
    // A single pixel occupies 4 positions in array
    R += data[i];
    G += data[i + 1];
    B += data[i + 2];
  }

  // Get average R, G, B values
  R = Math.round(R / pixelsPerChannel);
  G = Math.round(G / pixelsPerChannel);
  B = Math.round(B / pixelsPerChannel);

  // Store R, G, B values inside skintone object
  skintone = {
    r: R,
    g: G,
    b: B,
  };

  // Display average color in doc
  const color = `rgb(${R} ${G} ${B})`;
  result.style.backgroundColor = color;
  console.log(color);
};

// Looks for skintone in db, adds skintone if not found
match.onclick = async () => {
  let resRaw;
  let res;
  let url = "/" + skintone.r + "/" + skintone.g + "/" + skintone.b;
  resRaw = await fetch("/getshade" + url);
  res = await resRaw.json();
  // If shade not found create new shade
  if (res.shade.length === 0) {
    console.log("Skintone not found, updating database");
    resRaw = await fetch("/createShade" + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await resRaw.json();
    document.querySelector("p").innerHTML =
      "Sorry! We are working on getting a match for your skintone as fast as we can!";
    console.log("Added shade to database ", res.result.ops[0].id);
  } else {
    console.log("Shade", res.shade[0].id);
  }
};
