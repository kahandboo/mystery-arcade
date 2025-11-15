export function renderResultScreen(mainContainer, resultData, onPlayAgain, onNewBetting, onCashOut) {
  let mainResultHTML;

  if (resultData.isWin) {
    mainResultHTML = `
      <div class="result-main win">
          <h2>CONGRATULATIONS !</h2>
          <h2>YOU WIN</h2>
          <p class="winnings">당첨금 ${resultData.winnings}원</p>
      </div>
    `;
  } else {
    mainResultHTML = `
      <div class="result-main lose">
          <h2>YOU LOSE</h2>
          <p class="winner-info">우승자 ${resultData.winners[0]}</p>
      </div>
    `;
  }

  mainContainer.innerHTML = `
      <div class="screen" id="result-screen">
        <div class="result-container">
          ${mainResultHTML}
        </div>
        <div class="result-footer">
           button id="play-again-btn">다시하기</button>
           button id="new-betting-btn">새로 시작</button>
           button id="cash-out-btn">게임 종료</button>
        </div>
      </div>
    `;

  document.getElementById("play-again-btn").addEventListener("click", () => {
    onPlayAgain(resultData.originalGameData);
  });

  document.getElementById("new-betting-btn").addEventListener("click", () => {
    onNewBetting();
  });

  document.getElementById("cash-out-btn").addEventListener("click", () => {
    onCashOut();
  });
}