import { renderBettingScreen } from "../components/BettingScreen.js";
import { renderRaceScreen } from "../components/RaceScreen.js";

const screen = document.getElementById("game-screen-container");

function showRaceScreen(gameData) {
  console.log("준비 완료!", gameData);    
  renderRaceScreen(screen, gameData, showResultScreen);
}

function showResultScreen(resultData) {
  console.log("게임 끝!", resultData);
}

renderBettingScreen(screen, showRaceScreen);
