import PurchaseAmount from '../../games/lotto/domain/PurchaseAmount.js';
import Lotto from '../../games/lotto/domain/Lotto.js';
import Bonus from '../../games/lotto/domain/Bonus.js';
import LottoGenerator from '../../games/lotto/utils/LottoGenerator.js';
import { player } from "../../models/Player.js";

export function renderBettingScreen(container, onStartCallback) {
    const inputFields = Array.from({ length: 6 }).map((_, i) => `
      <input type="text" class="winning-number-input">
    `).join('');

    container.innerHTML = `
      <div class="screen" id="betting-screen">
        <div class="title-container">
          <h2>Lotto</h2>
        </div>

        <div class="purchase-ui">
          <label>purchase amount</label>
          <input type="text" id="purchase-amount"/>
          <span id="ticket-count-preview" class="preview-text">0장</span>
          
          <div class="lotto-iuput-header">
            <label>winning numbers</label>
            <button id="auto-btn" class="auto-btn">자동</button>
          </div>

          <div class="lotto-inputs-container">
            ${inputFields}
          </div>
          <label>bonus number</label>
          <input type="text" id="bonus"/>
          <p id="error-message" class="error-message"></p>
          <button id="start-btn">START !</button>
        </div>

        <button id="exit-btn">EXIT</button>
      </div>
    `;

    const purchaseInput = document.getElementById("purchase-amount");
    const winningInputs = container.querySelectorAll('.winning-number-input');
    const bonusInput = document.getElementById('bonus');
    const startButton = document.getElementById("start-btn");
    const exitButton = document.getElementById("exit-btn");
    const error = document.getElementById("error-message");
    const ticketPreview = document.getElementById('ticket-count-preview');
    const autoButton = document.getElementById('auto-btn');  

    startButton.disabled = true;
  
    const checkFormValidity = () => {
      try {
        new PurchaseAmount(Number(purchaseInput.value));
  
        const winNumbers = Array.from(winningInputs).map(input => Number(input.value));
        const winningLotto = new Lotto(winNumbers);
  
        const bonusVal = Number(bonusInput.value);
        const bonus = new Bonus(bonusVal);

        if (winNumbers.includes(bonus.number)) {
          throw new Error(); 
        }
  
        startButton.disabled = false; 
      } catch (e) {
        startButton.disabled = true;
      }
    };

    autoButton.addEventListener('click', () => {
      try {
        const autoLotto = LottoGenerator.generateSingle();
        const autoNumbers = autoLotto.numbers; 

        winningInputs.forEach((input, index) => {
          input.value = autoNumbers[index];
        });

        error.textContent = "";
        checkFormValidity();

      } catch (e) {
        console.error("Auto generation failed", e);
      }
    });
  
    purchaseInput.addEventListener('input', () => {
      const value = Number(purchaseInput.value);

      try {
        const purchase = new PurchaseAmount(value); 
        error.textContent = "";
        
        ticketPreview.textContent = `${purchase.count}장`; 
  
      } catch (e) {
        error.textContent = e.message;
        ticketPreview.textContent = "0장";
      }
      checkFormValidity();
    });
  
    winningInputs.forEach(winningInput => {
      winningInput.addEventListener('input', () => {
        const winNumbers = Array.from(winningInputs).map(i => Number(i.value));
        
        if (winNumbers.includes(0)) {
          error.textContent = ""; 
          checkFormValidity();   
          return;                
        }

        try {
          new Lotto(winNumbers); 
          error.textContent = "";
        } catch (e) {
          error.textContent = e.message;
        }
        checkFormValidity();
      });
    });
  
    bonusInput.addEventListener('input', () => {
      const value = Number(bonusInput.value);
  
      try {
        const bonus = new Bonus(value);
        
        const winNumbers = Array.from(winningInputs).map(i => Number(i.value));
        if (winNumbers.includes(bonus.number)) {
          throw new Error("보너스 번호는 당첨 번호와 중복될 수 없습니다.");
        }
  
        error.textContent = "";
      } catch (e) {
        error.textContent = e.message;
      }
      checkFormValidity();
    });

    startButton.addEventListener("click", () => {
      const winNumbers = Array.from(winningInputs).map(input => Number(input.value));
      const gameData = {
        purchaseAmount: new PurchaseAmount(Number(purchaseInput.value)),
        winningLotto: new Lotto(winNumbers),
        bonus: new Bonus(Number(bonusInput.value)),
      };

      if (player.deductCoins(gameData.purchaseAmount.amount)) {
        onStartCallback(gameData);
      } else {
        error.textContent = "잔액 부족";
      }
  });

  exitButton.addEventListener("click", () => {
    window.location.href = "./map.html"; 
  });
};