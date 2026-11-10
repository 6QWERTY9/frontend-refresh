import state from "./state.js";

export function buyPowerClick () {
    if (state.currentBalance >= state.upgrades.powerClick.price) {
        state.currentBalance -= state.upgrades.powerClick.price;
        state.upgrades.powerClick.purchased++;
        state.currentPower += state.upgrades.powerClick.bonus;
        state.upgrades.powerClick.price = Math.round(state.upgrades.powerClick.price * 1.15);
    }
}

export function buyAutoClick () {
    if (state.currentBalance >= state.upgrades.autoClick.price) {
        state.currentBalance -= state.upgrades.autoClick.price;
        state.upgrades.autoClick.purchased++;
        state.passiveIncome += state.upgrades.autoClick.bonus;
        state.upgrades.autoClick.price = Math.round(state.upgrades.autoClick.price * 1.15);
    }
}

