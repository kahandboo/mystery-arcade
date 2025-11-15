import { renderBettingScreen } from "../components/BettingScreen.js";
import { renderRaceScreen } from "../components/RaceScreen.js";
import { renderResultScreen } from "../components/ResultScreen.js";

const screen = document.getElementById("game-screen-container");

function showRaceScreen(gameData) {
  renderRaceScreen(screen, gameData, showResultScreen);
}

function showResultScreen(resultData) {
  renderResultScreen(screen, resultData, onPlayAgain, onNewBetting, onCashOut);
}

function onPlayAgain(gameData) {
  renderRaceScreen(screen, gameData, showResultScreen);
}

function onNewBetting() {
  renderBettingScreen(screen, showRaceScreen);
}

function onCashOut() {
  screen.innerHTML = `
      <div class="screen" id="cash-out-screen">
          <h2>이용해주셔서 감사합니다.</h2>
      </div>
  `;
}

renderBettingScreen(screen, showRaceScreen);
