import { renderBettingScreen } from '../components/BettingScreen.js';

const screen = document.getElementById('game-screen-container');

function showRaceScreen(gameData) {
    console.log('준비 완료!', gameData);

    /* 
    TODO: RaceScreen.js의 renderRaceScreen 함수 작성
    
    renderRaceScreen(screen, gameData, showResultScreen)
    */
}

function showResultScreen(resultData) {
    console.log('게임 끝!', resultData);
}

renderBettingScreen(screen, showRaceScreen);
