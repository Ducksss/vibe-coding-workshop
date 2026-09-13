const art = document.querySelector("#knot-art");
const modes = document.querySelectorAll("[data-mode]");
const phosphor = document.querySelector("#phosphor");
const playButton = document.querySelector("#play-art");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let wantsPlayback = !reducedMotion.matches;

function updatePlaybackLabel() {
  playButton.textContent = art.paused ? "Play" : "Pause";
  playButton.setAttribute(
    "aria-label",
    `${art.paused ? "Play" : "Pause"} sculpture animation`,
  );
}
async function play() {
  try {
    await art.play();
  } catch {
    wantsPlayback = false;
  }
  updatePlaybackLabel();
}
function setMode(mode) {
  art.poster =
    mode === "ascii" ? "assets/video-poster.png" : "assets/knot-source.svg";
  art.src = `assets/knot-${mode === "ascii" ? "ascii" : "source"}.mp4`;
  art.setAttribute(
    "aria-label",
    mode === "ascii"
      ? "A rotating silver knot sculpture rendered in ASCII characters"
      : "The original rotating silver sculpture before ASCII processing",
  );
  modes.forEach((button) =>
    button.setAttribute("aria-pressed", String(button.dataset.mode === mode)),
  );
  if (wantsPlayback) play();
}
modes.forEach((button) =>
  button.addEventListener("click", () => setMode(button.dataset.mode)),
);
phosphor.addEventListener("change", () =>
  art.classList.toggle("phosphor", phosphor.checked),
);
playButton.addEventListener("click", () => {
  wantsPlayback = art.paused;
  if (wantsPlayback) play();
  else art.pause();
});
art.addEventListener("play", updatePlaybackLabel);
art.addEventListener("pause", updatePlaybackLabel);
art.addEventListener("error", () => {
  wantsPlayback = false;
  playButton.textContent = "Unavailable";
  playButton.setAttribute(
    "aria-label",
    "Animation unavailable; view the poster or open ASCII Magic",
  );
});
reducedMotion.addEventListener("change", (event) => {
  if (event.matches) {
    wantsPlayback = false;
    art.pause();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) art.pause();
  else if (wantsPlayback) play();
});
document.querySelector(".reset-art").addEventListener("click", () => {
  wantsPlayback = !reducedMotion.matches;
  art.pause();
  setMode("ascii");
  phosphor.checked = false;
  art.classList.remove("phosphor");
});
if (wantsPlayback) play();
