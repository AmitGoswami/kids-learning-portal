// ui.js
function renderProblem(type){
  const problem = currentProblems[currentIndex];
  const total = currentProblems.length;
  const options = problem.options.map(o => (typeof o==="string")?{label:o,value:o}:o);

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl max-w-3xl mx-auto">
      <div class="w-full flex justify-between items-center mb-2">
        <button onclick="goBack()" class="btn-back">⬅ Back</button>
        <div class="text-sm font-medium">Question ${currentIndex+1} of ${total}</div>
      </div>
      <div class="w-full flex justify-between items-center mb-4">
        <div class="font-medium">⭐ Score: <span id="score">${score}</span></div>
        <div class="text-sm">🎁 <progress id="progress" value="${score}" max="50"></progress></div>
      </div>
      <div class="w-full text-center mb-4 flex flex-col items-center">
        <div id="question" class="text-2xl font-semibold">${problem.question}</div>
        <button onclick="speak(getSpokenText(currentProblems[currentIndex],'${type}'))" class="btn-back mt-2">🔊 Listen</button>
      </div>
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${options.map(op=>`<button class="btn-card option-btn" data-value="${op.value}" onclick="checkAnswer(this,'${problem.answer}','${type}')">${op.label}</button>`).join('')}
      </div>
      <div id="feedback" class="mt-4 font-bold min-h-[1.25rem]"></div>
    </div>
  `;
  // auto-read question
  speak(getSpokenText(problem,type));
}

function showReward(gift){
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="text-center bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
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

function resumeActivity(){
  renderProblem(lastMenu.includes("numbers")?"count":"balloon");
}

function showGiftCollection(){
  const app = document.getElementById("app");
  const totalSlots = 8;
  app.innerHTML = `
    <div class="text-center bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
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
