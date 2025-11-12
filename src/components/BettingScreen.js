import Validator from "../games/racingCar/Validator.js";

export function renderBettingScreen(mainContainer, onStartCallback) {
    mainContainer.innerHTML = `
        <div class="screen" id="betting-screen">
            <h2>Racing Cars</h2>
            <p>당신의 자동차 이름</p>
            <input type="text" id="player-car-name" />
            <p>베팅 금액</p>
            <input type="text" id="betting-amount" />
            <p id="error-message" class="error-message"></p>
            <ul class="game-info">
                <li>
                    <span class="info-label">참가 자동차:</span>
                    <span class="info-value" id="info-car-count"></span>
                </li>
                <li>
                    <span class="info-label">총 라운드:</span>
                    <span class="info-value" id="info-round-count"></span>
                </li>
                <li>
                    <span class="info-label">예상 당첨금:</span>
                    <span class="info-value" id="info-winnings"></span>
                </li>
            </ul>
            <button id="start-race-btn">! RACE START !</button>
        </div>
    `;

    const bettingInput = document.getElementById('betting-amount');
    const carNameInput = document.getElementById('player-car-name');
    const startButton = document.getElementById('start-race-btn');

    const error = document.getElementById('error-message');
    const carCount = document.getElementById('info-car-count');
    const roundCount = document.getElementById('info-round-count');
    const winnings = document.getElementById('info-winnings');

    carNameInput.addEventListener('input', () => {
        const carName = carNameInput.value;

        try {
            Validator.validateCarName(carName);
            error.textContent = '';
        } catch (e) {
            error.textContent = e.message;
        }
    });

    bettingInput.addEventListener('input', () => {
        const bettingAmount = bettingInput.value;

        try{
            Validator.validateBettingAmount(bettingAmount);
            error.textContent = '';
            const count = bettingAmount/1000;

            carCount.textContent = `${count}대`;
            roundCount.textContent = `${count}회`;
            winnings.textContent = `${(bettingAmount * count).toLocaleString()}원`;
        } catch (e) {
            error.textContent = e.message;

            carCount.textContent = `대`;
            roundCount.textContent = `회`;
            winnings.textContent = `원`;
        }
    });

    startButton.addEventListener('click', () => {
        const gameData = {
            bettingAmount: Number(bettingInput.value),
            carName: carNameInput.value
        };

        onStartCallback(gameData);
    });
}