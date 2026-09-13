const { test } = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const source = fs.readFileSync(`${__dirname}/studio.js`, "utf8");

// Minimal DOM/media boundary; assertions exercise the shipped control script.
function mount(reduced = false, blocked = false) {
  const element = () => ({
    listeners: {},
    attrs: {},
    checked: false,
    paused: true,
    classes: new Set(),
    dataset: {},
    addEventListener(name, fn) {
      this.listeners[name] = fn;
    },
    setAttribute(name, value) {
      this.attrs[name] = value;
    },
    fire(name, event = {}) {
      return this.listeners[name]?.(event);
    },
    pause() {
      this.paused = true;
      this.fire("pause");
    },
    async play() {
      if (blocked) throw new Error("Autoplay blocked");
      this.paused = false;
      this.fire("play");
    },
    get classList() {
      return {
        toggle: (name, on) =>
          on ? this.classes.add(name) : this.classes.delete(name),
        remove: (name) => this.classes.delete(name),
      };
    },
  });
  const nodes = Object.fromEntries(
    ["#knot-art", "#phosphor", "#play-art", ".reset-art"].map((id) => [
      id,
      element(),
    ]),
  );
  const modes = ["ascii", "original"].map((mode) =>
    Object.assign(element(), { dataset: { mode } }),
  );
  const media = Object.assign(element(), { matches: reduced });
  const document = Object.assign(element(), {
    hidden: false,
    querySelector: (id) => nodes[id],
    querySelectorAll: () => modes,
  });
  vm.runInNewContext(source, { document, matchMedia: () => media });
  return { nodes, modes, media, document, art: nodes["#knot-art"] };
}

test("comparison, phosphor, pause and reset control the actual media state", async () => {
  const { nodes, modes, art } = mount();
  await Promise.resolve();
  assert.equal(art.paused, false);
  nodes["#play-art"].fire("click");
  assert.equal(art.paused, true);
  modes[1].fire("click");
  assert.equal(art.src, "assets/knot-source.mp4");
  assert.equal(art.poster, "assets/knot-source.svg");
  assert.equal(modes[1].attrs["aria-pressed"], "true");
  assert.equal(modes[0].attrs["aria-pressed"], "false");
  nodes["#phosphor"].checked = true;
  nodes["#phosphor"].fire("change");
  assert(art.classes.has("phosphor"));
  nodes[".reset-art"].fire("click");
  assert.equal(art.src, "assets/knot-ascii.mp4");
  assert.equal(art.poster, "assets/video-poster.png");
  assert.equal(nodes["#phosphor"].checked, false);
  assert.equal(art.classes.has("phosphor"), false);
});

test("reduced motion never autoplays on load, mode change or reset", () => {
  const { nodes, modes, art } = mount(true);
  assert.equal(art.paused, true);
  modes[1].fire("click");
  nodes[".reset-art"].fire("click");
  assert.equal(art.paused, true);
  nodes["#play-art"].fire("click");
  assert.equal(art.paused, false, "Explicit Play remains available");
});

test("hidden tabs stop playback while preserving manual pause", () => {
  const { nodes, document, art, media } = mount();
  document.hidden = true;
  document.fire("visibilitychange");
  assert.equal(art.paused, true);
  document.hidden = false;
  document.fire("visibilitychange");
  assert.equal(art.paused, false);
  nodes["#play-art"].fire("click");
  document.hidden = true;
  document.fire("visibilitychange");
  document.hidden = false;
  document.fire("visibilitychange");
  assert.equal(art.paused, true);
  nodes["#play-art"].fire("click");
  media.fire("change", { matches: true });
  assert.equal(art.paused, true);
});

test("autoplay rejection offers Play and decode failure stays explicit", async () => {
  const { nodes, art } = mount(false, true);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(nodes["#play-art"].textContent, "Play");
  art.fire("error");
  assert.equal(nodes["#play-art"].textContent, "Unavailable");
});
