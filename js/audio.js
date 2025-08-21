// audio.js

let speechRate = 0.9;  // normal speed
let speechPitch = 1.1; // normal pitch
let speechVolume = 1.0; // 0.0 to 1.0


function speak(text){
  if(!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
    utter.rate = speechRate;
    utter.pitch = speechPitch;
    utter.volume = speechVolume;
    window.speechSynthesis.speak(utter);
}

function stripHtml(html){
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent||div.innerText||"";
}

// Return friendly spoken text for visual problems
function getSpokenText(problem, type){
  const emojiRegex = /\p{Emoji}/gu;
  if(type==="count"){
    const match = problem.questionTxt.match(emojiRegex);
    if(match){
      const obj = match[0];
      const names = {"🍎":"apples","🐻":"bears","🎈":"balloons","🌟":"stars","🐶":"dogs","🍌":"bananas","🦋":"butterflies","🚗":"cars","🍓":"strawberries","🐱":"cats"};
      return problem.questionTxt.replace(`${obj}`, `${names[obj]}`);
    }
  } else if(type==="add"){
    const parts = problem.question.split("+");
    if(parts.length===2){
      const countA = parts[0].match(/./g)?.length||0;
      const countB = parts[1].match(/./g)?.length||0;
      const obj = parts[0].match(/./)[0];
      const names = {"🍎":"apples","🐻":"bears","🎈":"balloons","🌟":"stars","🐶":"dogs","🍌":"bananas","🦋":"butterflies","🚗":"cars","🍓":"strawberries","🐱":"cats"};
      //return `Add ${countA} ${names[obj]} and ${countB} ${names[obj]}`;
      return problem.questionTxt;
    }
  } else if(type==="subtract"){
    const parts = problem.question.split("-");
    if(parts.length===2){
      const countA = parts[0].match(/./g)?.length||0;
      const countB = parts[1].match(/./g)?.length||0;
      const obj = parts[0].match(/./)[0];
      const names = {"🍎":"apples","🐻":"bears","🎈":"balloons","🌟":"stars","🐶":"dogs","🍌":"bananas","🦋":"butterflies","🚗":"cars","🍓":"strawberries","🐱":"cats"};
      //return `Take ${countB} ${names[obj]} away from ${countA} ${names[obj]}`;
      return problem.questionTxt;
    }
  }
  else if(type === "evenOdd"){
    return `Is ${stripHtml(problem.question).match(/\d+/)[0]} even or odd?`;
  }
  return stripHtml(problem.questionTxt);
}

function previewVoice() {
  const sampleText = "Hello! This is your learning voice. Let's have fun!";
  speak(sampleText);
}

