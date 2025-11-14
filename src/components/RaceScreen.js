import Car from "../games/racingCar/Car.js";
import { CarGame, generateCarNames } from "../games/racingCar/CarGame.js";

export function renderRaceScreen(mainContainer, gameData, onRaceComplete) {
  let currRoundCount = 0;
  const roundCount = gameData.bettingAmount / 1000;
  const potentialWinnings = gameData.bettingAmount * roundCount;

  mainContainer.innerHTML = `
    <div class="screen" id="race-screen">        
        <div class="race-container">
            <div class="race-main">
                <h3>경주 트랙</h3>
                <pre id="race-track-display"></pre>
            </div>
            <div class="action-log">
                <div id="dice-animation-area">
                    </div> 
            </div>
            <aside class="race-sidebar">
                <p id="round-info">Round ${currRoundCount} / ${roundCount}</p>
                <h3>실시간 순위</h3>
                <ul id="ranking-list">
                    </ul>
            </aside>
        </div> 
        <ul class="race-footer">
            <li>
                <span class="info-label">현재 베팅금액 </span>
                <span id="footer-betting-amount">${gameData.bettingAmount}원</span>
            </li>
            <li>
                <span class="info-label">예상 당첨금액 </span>
                <span id="footer-winnings">${potentialWinnings}원</span>
            </li>
            <li>
                <span class="info-label">내 자동차 </span>
                <span id="footer-player-car">${gameData.carName}</span>
            </li>
        </ul>
    </div>
    `;

    const trackDisplay = document.getElementById('race-track-display');
    const diceArea = document.getElementById('dice-animation-area');
    const roundInfo = document.getElementById('round-info');
    const rankingList = document.getElementById('ranking-list');

    const carNames = generateCarNames(gameData.carName, roundCount);

    const cars = carNames.map(name => new Car(name));
    const game = new CarGame(cars);

    while (currRoundCount < roundCount) {
        game.progressRound();

        rankingList.innerHTML = game.getCars()
            .slice()
            .sort((a, b) => b.getScore() - a.getScore())
            .slice(0, 5)
            .map((car, index) => `
                <li>
                    <span class="info-label">${index + 1}위 ${car.getName()}</span>
                    <span class="info-value" id="info-car-score">${car.getScore()}</span>
                </li>
            `)
            .join('');

        currRoundCount += 1
    }

    const winners = game.getWinners();
    onRaceComplete(winners);
}