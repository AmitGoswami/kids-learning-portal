// main.js

// Global state
let currentProblems = [];
let currentIndex = 0;
let score = 0;
let giftPoints = 0;
const giftThreshold = 50;
let gifts = [];
const availableGifts = ["⭐","🎈","🐻","🍎","🧸","🚗","🐶","🍌"];

let lastMenu = "home";     // current activity type
let parentMenu = "home";   // where to go back from activity

// --- Initialize App ---
document.addEventListener("DOMContentLoaded", () => {
  navigate("home");
});

// --- Navigation Functions ---
function navigate(menu) {
  lastMenu = menu;

  if (menu === "home") {
    parentMenu = "home";
    showHome();
  }
  else if (menu === "numbers") {
    parentMenu = "home";
    showNumbersMenu();
  }
  else if (menu === "letters") {
    parentMenu = "home";
    showLettersMenu();
  }
}

// --- Home Page ---
function showHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="flex flex-col items-center gap-6 mt-10">
      <h1 class="text-5xl font-bold text-center">🎉 Let's Learn!</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full max-w-xl">
        <div class="card" onclick="navigate('numbers')">🔢 Learn Numbers</div>
        <div class="card" onclick="navigate('letters')">🅰️ Learn Letters</div>
      </div>
      <button onclick="showVoiceSettings()" class="btn-card mt-4">⚙️ Voice Settings</button>
      <div id="voiceSettings"></div>
    </div>
  `;
}

// --- Numbers Menu ---
function showNumbersMenu() {
  lastMenu = "numbers";
  parentMenu = "home";

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="text-center mt-8">
      <h2 class="text-3xl font-bold mb-4">🔢 Numbers Fun!</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
        <div class="card" onclick="startActivity('count')">Count Objects 🍎</div>
        <div class="card" onclick="startActivity('add')">Add Numbers ➕</div>
        <div class="card" onclick="startActivity('subtract')">Subtract Numbers ➖</div>
        <div class="card" onclick="startActivity('matchNum')">Match Numbers 🎲</div>
        <div class="card" onclick="startActivity('missingNum')">Fill Missing Numbers 🔢</div>
        <div class="card" onclick="startActivity('evenOdd')">Even or Odd ❓</div>
        <div class="card" onclick="startActivity('compare')">Greater or Less Than ⬆️⬇️</div>
        <div class="card" onclick="startActivity('numberBonds')">Number Bonds ❤️</div>
        <div class="card" onclick="startActivity('skipCount')">Counting by 2,5,10 🔢</div>
        <div class="card" onclick="startActivity('placeValue')">Tens & Ones 🧱</div>
        <div class="card" onclick="startActivity('coins')">Coins / Money 💰</div>
        <div class="card" onclick="startActivity('measure')">Compare Sizes 📏</div>

      </div>
      <button onclick="navigate('home')" class="btn-back mt-4">⬅ Back to Home</button>
    </div>
  `;
}

// --- Letters Menu ---
function showLettersMenu() {
  lastMenu = "letters";
  parentMenu = "home";

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="text-center mt-8">
      <h2 class="text-3xl font-bold mb-4">🅰️ Letters Fun!</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
        <div class="card" onclick="startActivity('balloon')">Balloon Pop 🎈</div>
        <div class="card" onclick="startActivity('matchLetter')">Match Letter to Object 🍎</div>
        <div class="card" onclick="startActivity('missingLetter')">Fill Missing Letters 🔤</div>
        <div class="card" onclick="startActivity('beforeAfter')">Before & After 🔡</div>
      </div>
      <button onclick="navigate('home')" class="btn-back mt-4">⬅ Back to Home</button>
    </div>
  `;
}

// --- Start Activity ---
function startActivity(type) {
  score = 0;
  currentIndex = 0;

  currentProblems = generateProblems(type, 10);

  lastMenu = type;
  if (["count","add","subtract","matchNum","missingNum", "evenOdd"].includes(type)) parentMenu = "numbers";
  else parentMenu = "letters";

  renderProblem(type);
}

// --- Back Button ---
function goBack() {
  if (parentMenu === "numbers") showNumbersMenu();
  else if (parentMenu === "letters") showLettersMenu();
  else navigate("home");
}

// --- Show Reward ---
function showReward(gift) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="text-center bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto mt-8">
      <h2 class="text-2xl font-bold mb-4">🎁 You Got a Gift!</h2>
      <div class="text-6xl mb-4 animate-bounce">${gift}</div>
      <p class="mb-4">Keep playing to collect more gifts!</p>
      <div class="flex justify-center gap-4">
        <button onclick="resumeActivity()" class="btn-card">Continue Playing</button>
        <button onclick="showGiftCollection()" class="btn-card">See My Gifts</button>
      </div>
    </div>
  `;
}

// --- Resume Activity after Reward ---
function resumeActivity() {
  renderProblem(lastMenu);
}

// --- Show Gift Collection ---
function showGiftCollection() {
  const app = document.getElementById("app");
  const totalSlots = 8;
  app.innerHTML = `
    <div class="text-center bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto mt-8">
      <h2 class="text-2xl font-bold mb-4">🏆 My Gifts</h2>
      <div class="grid grid-cols-4 gap-4 mb-4">
        ${Array.from({length: totalSlots}).map((_,i)=>{
          return `<div class="p-6 text-4xl rounded-xl shadow-md ${gifts[i]?"bg-yellow-100":"bg-gray-200"}">
                    ${gifts[i] || ""}
                  </div>`;
        }).join("")}
      </div>
      <button onclick="goBack()" class="btn-card">⬅ Back</button>
    </div>
  `;
}

function showVoiceSettings() {
  const app = document.getElementById("voiceSettings");
  if (!app) return;

  app.innerHTML = `
    <div class="bg-white p-4 rounded-xl shadow-md max-w-xl mx-auto mt-6">
      <h3 class="text-xl font-bold mb-2">🎤 Voice Settings</h3>

      <label class="block mb-2">Rate: <span id="rateVal">${speechRate}</span></label>
      <input type="range" min="0.5" max="2" step="0.1" value="${speechRate}"
             oninput="speechRate=this.value; document.getElementById('rateVal').innerText=this.value">

      <label class="block mt-4 mb-2">Pitch: <span id="pitchVal">${speechPitch}</span></label>
      <input type="range" min="0.5" max="2" step="0.1" value="${speechPitch}"
             oninput="speechPitch=this.value; document.getElementById('pitchVal').innerText=this.value">

      <label class="block mt-4 mb-2">Volume: <span id="volumeVal">${speechVolume}</span></label>
      <input type="range" min="0" max="1" step="0.1" value="${speechVolume}"
             oninput="speechVolume=this.value; document.getElementById('volumeVal').innerText=this.value">

      <button onclick="previewVoice()" class="btn-card mt-4 w-full">🔊 Preview Voice</button>
    </div>
  `;
}

function shootConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  const particles = [];

  const colors = ['#ff0a54','#ff477e','#ff7096','#ff85a1','#fbb1b8','#f9bec7'];

  for(let i=0;i<100;i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      dx: Math.random() * 4 - 2,
      dy: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random()*colors.length)]
    });
  }

  let count = 0;
  const interval = setInterval(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x += p.dx;
      p.y += p.dy;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    count++;
    if(count > 60){ // ~1.2 seconds
      clearInterval(interval);
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }
  },60);
}


