let currentLight = null;
let cx = 125, cy = 125;
let rx = 75, ry = 75;

function addCircleLight() {
  const canvas = getCanvas();
  currentLight = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  currentLight.setAttribute("cx", cx);
  currentLight.setAttribute("cy", cy);
  currentLight.setAttribute("rx", rx);
  currentLight.setAttribute("ry", ry);
  currentLight.setAttribute("fill", "url(#lightGradient)");
  currentLight.setAttribute("filter", "url(#softBlur)");
  canvas.appendChild(currentLight);
}

function moveLight(dx, dy) {
  if (!currentLight) return;
  cx += dx;
  cy += dy;
  currentLight.setAttribute("cx", cx);
  currentLight.setAttribute("cy", cy);
}

function resizeLight(delta) {
  if (!currentLight) return;
  rx = Math.max(10, rx + delta);
  ry = Math.max(10, ry + delta);
  currentLight.setAttribute("rx", rx);
  currentLight.setAttribute("ry", ry);
}

function maskLight() {
  if (!currentLight) return;
  const canvas = getCanvas();
  const shapes = canvas.querySelectorAll('rect[data-layer]');
  shapes.forEach((shape, index) => {
    const light = currentLight.cloneNode(true);
    light.setAttribute("clip-path", `url(#shapeClip${index + 1})`);
    canvas.appendChild(light);
  });
}

function getCanvas() {
  return document.getElementById("canvas") || document.querySelector("svg");
}
