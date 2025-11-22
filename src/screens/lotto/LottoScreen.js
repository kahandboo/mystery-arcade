import LottoGenerator from '../../games/lotto/utils/LottoGenerator.js';

export function renderLottoScreen(container, gameData, onRaceComplete) {
  const { purchaseAmount } = gameData; 
  
  let generatedLottos = [];
  let currentCount = 0;
  
  const renderStructure = () => {
    container.innerHTML = `
      <div class="screen" id="lotto-screen">
        <div class="title-container">
            <h3>로또 발행 중...</h3>
        </div>
        
        <div class="machine-ui">
            <div class="progress-info">
              <span id="progress-text">0%</span>
            </div>
            <div class="progress-bar-bg">
              <div id="progress-bar" class="progress-bar-fill" style="width: 0%"></div>
            </div>
            
            <div id="ticket-display" class="ticket-output"></div>
        </div>
      </div>
    `;
  };

  const updateDisplay = (lotto, displayElement) => {
    const ticketHtml = `
      <div class="lotto-ticket slide-down">
        ${lotto.numbers.map(n => `<span class="ball small-ball">${n}</span>`).join(' ')}
      </div>
    `;
    
    displayElement.insertAdjacentHTML('afterbegin', ticketHtml);
    
    if (displayElement.children.length > 5) {
      displayElement.lastElementChild.remove();
    }
  };

  const startMachine = () => {
    const totalCount = purchaseAmount.count;
    
    const intervalTime = totalCount > 50 ? 20 : 50; 
    
    const $progressText = container.querySelector('#progress-text');
    const $progressBar = container.querySelector('#progress-bar');
    const $display = container.querySelector('#ticket-display');

    const timer = setInterval(() => {
      const newLotto = LottoGenerator.generateSingle();
      generatedLottos.push(newLotto);
      
      updateDisplay(newLotto, $display);
      
      currentCount++;
      const percent = Math.round((currentCount / totalCount) * 100);
      
      $progressBar.style.width = `${percent}%`;
      $progressText.textContent = `${percent}%`;

      if (currentCount >= totalCount) {
        clearInterval(timer);
        
        setTimeout(() => {
          const resultData = { 
            originalGameData: gameData, 
            purchasedLottos: generatedLottos 
          };
          onRaceComplete(resultData); 
        }, 1500); 
      }
    }, intervalTime);
  };

  renderStructure();
  startMachine();
}