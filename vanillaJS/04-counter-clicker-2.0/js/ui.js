import state from "./state.js";


const displayBalance = document.getElementById('balance-display');
const displayPassiveIncome = document.getElementById('passive-income-display');

const displayPowerClickPurchased = document.getElementById('power-click-purchased-display');
const displayPowerClickPrice = document.getElementById('power-click-price-display');
const btnBuyPowerClick = document.getElementById('buy-power-click-btn');

const displayAutoClickPurchased = document.getElementById('auto-click-purchased-display');
const displayAutoClickPrice = document.getElementById('auto-click-price-display');
const btnBuyAutoClick = document.getElementById('buy-auto-click-btn');


function updateUI () {
    const {currentBalance, passiveIncome, upgrades: {powerClick, autoClick} } = state;
    

    displayBalance.textContent = `${currentBalance} очков`;
    displayPassiveIncome.textContent = `+${passiveIncome} очков`;

    displayPowerClickPurchased.textContent = `${powerClick.purchased} шт.`;
    displayPowerClickPrice.textContent = `${powerClick.price} очков`;

    displayAutoClickPurchased.textContent = `${autoClick.purchased} шт.`;
    displayAutoClickPrice.textContent = `${autoClick.price} очков`;


    btnBuyAutoClick.disabled = currentBalance < autoClick.price;
    btnBuyPowerClick.disabled = currentBalance < powerClick.price;
}


export {updateUI}
