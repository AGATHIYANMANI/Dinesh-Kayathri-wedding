const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

// Basic DOM environment mock
class MockAudioElement {
  constructor() {
    this.loop = false;
    this.paused = true;
    this.currentTime = 0;
    this.volume = 1;
    this.listeners = {};
    this.id = 'weddingAudio';
  }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  play() {
    this.paused = false;
    return Promise.resolve();
  }
  pause() {
    this.paused = true;
  }
  setAttribute(k, v) { this[k] = v; }
}

console.log("Checking HTML tags...");
if (!html.includes('id="weddingAudio"')) throw new Error("Audio tag missing in HTML");
if (!html.includes('data-tip="Play Wedding Music"')) throw new Error("Button tip wrong in HTML");
if (html.includes('Temple Chime')) throw new Error("Old Temple Chime reference remains in HTML");
console.log("HTML checks passed!");

console.log("Checking script.js contents...");
if (js.includes('playTempleChime')) throw new Error("Old playTempleChime still in script.js");
if (!js.includes('startAudio')) throw new Error("startAudio missing in script.js");
if (!js.includes('pauseAudio')) throw new Error("pauseAudio missing in script.js");
if (!js.includes('dom.weddingAudio = document.getElementById(\'weddingAudio\')')) {
  throw new Error("dom.weddingAudio init missing in script.js");
}
console.log("script.js checks passed!");

console.log("Checking all standalone build files...");
const files = [
  'Dinesh_Kayathri_Wedding_Invitation_Final.html',
  'Dinesh_Kayathri_Wedding_Invitation_Final (1).html',
  'Dinesh_Kayathri_Wedding_Invitation_Preview.html',
  'wedding-invitation-preview.html'
];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (!content.includes('id="weddingAudio"')) throw new Error(`Missing audio tag in ${f}`);
  if (!content.includes('data:audio/mp3;base64,')) throw new Error(`Missing base64 audio in ${f}`);
  if (content.includes('playTempleChime')) throw new Error(`playTempleChime remains in ${f}`);
  console.log(`Verified ${f} (${(content.length / 1024).toFixed(1)} KB)`);
}

console.log("\nALL VERIFICATIONS PASSED SUCCESSFULLY!");
