const state = {
  view: {
    boxes: document.querySelectorAll(".box"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    levelPlayer: document.querySelector("#LevelP"),
  },
  values: {
    level: 1,
    minHitsToAdvance: 5,
    timePerLevel: 20,
    currentTime: 20,
    result: 0,
    gameVelocity: 2000,
    startTime: null,
    hitPosition: null,
  },
  actions: {
    levelCheckIntervalId: null,
    countDownTimerId: null,
    enemyMoveIntervalId: null,
  },
};

function countDown() {
  if (state.view.timeLeft) {
    state.view.timeLeft.textContent = state.values.currentTime;
    state.values.currentTime --;

    if (state.values.currentTime < 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.enemyMoveIntervalId);
      console.log("Game Over");
      alert("Game Over! Você não atingiu a meta mínima de hits.");
    }
  }
}

function randomCard() {
  state.view.boxes.forEach((box) => {
    box.classList.remove('wreck');
  });
  
  let randomNumber = Math.floor(Math.random() * 9);
  let randomBox = state.view.boxes[randomNumber];

  if (randomBox) {
    randomBox.classList.add("wreck");
    state.values.hitPosition = randomBox.id;
  }
  // randomBox.classList.add('wreck');
  // state.values.hitPosition = randomBox.id;
}

function moveEnemy() {
  state.actions.enemyMoveIntervalId = setInterval(randomCard, state.values.gameVelocity);
}

function checkLevel() {
  if (state.values.result >= state.values.minHitsToAdvance) {
    // clearInterval(state.actions.levelCheckIntervalId);
    state.values.level++;
    state.view.levelPlayer.textContent = state.values.level;
    state.values.minHitsToAdvance +=5; // valor para avançar

    if (state.values.level <= 10) {
      alert(`Parabéns, você concluiu a fase ${state.values.level}! Clique em OK para avançar para a próxima fase.`);
      state.values.currentTime = state.values.timePerLevel;
      state.view.timeLeft.textContent = state.values.timePerLevel;
      state.view.levelPlayer.textContent = state.values.level;
      state.values.gameVelocity += 500;
      moveEnemy();
      
      console.log( "avançando" )
    
    } else {
      alert("Parabéns, você completou todas as fases!");
      console.log("Fim de Jogo");
    }
  }
}

function addListenerHitBox() {
  state.view.boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (box.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;

        if (state.values.result >= state.values.minHitsToAdvance && !state.actions.levelCheckIntervalId) {
          state.actions.levelCheckIntervalId = setInterval(checkLevel, 1000);
        }
        
      }
    });
  });
}

function init() {
  moveEnemy();
  addListenerHitBox();
  state.values.startTime = Date.now();
  state.actions.countDownTimerId = setInterval(countDown, 1000);

}