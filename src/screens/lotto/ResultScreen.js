import LottoGame from '../../games/lotto/domain/Lottogame.js';
import LottoResult from '../../games/lotto/domain/Lottoresult.js';
import { RANK } from '../../games/lotto/utils/Constants.js';
import { player } from "../../models/Player.js";

export function renderResultScreen(container, resultData, onPlayAgain, onNewBetting, onCashOut) {
  const { originalGameData, purchasedLottos } = resultData;
  const { purchaseAmount, winningLotto, bonus } = originalGameData;

  const game = new LottoGame(purchasedLottos, winningLotto, bonus);
  const ranks = game.getAllRanks();
  
  const lottoResult = new LottoResult();
  lottoResult.recordRank(ranks);
  
  const stats = lottoResult.rankCounts;
  const profitRate = lottoResult.calculateProfitRate(purchaseAmount.amount);

  let totalPrize = 0;
  Object.values(RANK).forEach(rank => {
    totalPrize += (stats[rank.key] || 0) * rank.prize;
  });

  if (totalPrize > 0) {
    player.addCoins(totalPrize);
  }

  const renderRankItem = (rankObj) => {
    const count = stats[rankObj.key];
    return `
        <li>
            ${rankObj.match}개 일치 ${rankObj.key === 'SECOND' ? ', 보너스 볼 일치' : ''} 
            (${rankObj.prize.toLocaleString()}원) - 
            <strong>${count}개</strong>
        </li>
    `;
  };

  container.innerHTML = `
    <div class="screen result-screen">
      <h2>당첨 통계</h2>
      <div class="receipt">
        <p>구매 금액: ${purchaseAmount.amount.toLocaleString()}원</p>
        <p>수익률: <strong style="color: ${profitRate >= 100 ? 'red' : 'blue'}">
          ${profitRate.toFixed(1)}%
        </strong></p>
        <hr/>
        <ul class="rank-list">
           ${renderRankItem(RANK.FIFTH)}
           ${renderRankItem(RANK.FOURTH)}
           ${renderRankItem(RANK.THIRD)}
           ${renderRankItem(RANK.SECOND)}
           ${renderRankItem(RANK.FIRST)}
        </ul>
      </div>
      <div class="result-footer">
        <button id="play-again-btn">Play Again</button>
        <button id="new-betting-btn">New Game</button>
        <button id="cash-out-btn">Exit</button>
      </div>
  </div>
  `;

  document.getElementById("play-again-btn").addEventListener("click", () => {
    onPlayAgain(originalGameData);
  });

  document.getElementById("new-betting-btn").addEventListener("click", () => {
    onNewBetting();
  });

  document.getElementById("cash-out-btn").addEventListener("click", () => {
    onCashOut();
  });
}