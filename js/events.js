// events.js
function checkAnswer(el, answer, type){
  const selected = el.dataset.value;
  const feedback = document.getElementById("feedback");
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b=>b.disabled=true);

  // speak selected option
  speak(selected);

  const correctSound = document.getElementById("correctSound");
  const wrongSound = document.getElementById("wrongSound");

  if(selected===answer){
  score += 5;
  giftPoints += 5;
  shootConfetti();
  saveProgress();
  document.getElementById("score").innerText = score;
  const progress = document.getElementById("progress");
  if(progress) progress.value = score;

  feedback.innerText = "🎉 Yay! Well done!";
  el.classList.add("correct");

  if(correctSound){ correctSound.currentTime = 0; correctSound.play(); }

  // Check if reached gift threshold
  if(giftPoints >= giftThreshold){
    giftPoints -= giftThreshold;
    const newGift = availableGifts[gifts.length % availableGifts.length];
    gifts.push(newGift);
    saveProgress(); // ← persist gifts
    showReward(newGift);
    return; // stop advancing problem, go to reward screen
  }

  setTimeout(()=>{
    currentIndex++;
    if(currentIndex < currentProblems.length) renderProblem(type);
    else showCompletion();
  },1700)
  } else{
    feedback.innerText="❌ Oops, try again!";
    el.classList.add("shake");
    if(wrongSound){wrongSound.currentTime=0;wrongSound.play();}
    setTimeout(()=>{
      el.classList.remove("shake");
      buttons.forEach(b=>b.disabled=false);
      feedback.innerText="";
    },500);
  }
}

function goBack() {
  if(parentMenu === "numbers") {
    navigateNumbersMenu();
  } else if(parentMenu === "letters") {
    navigateLettersMenu();
  } else {
    navigate("home");
  }
}