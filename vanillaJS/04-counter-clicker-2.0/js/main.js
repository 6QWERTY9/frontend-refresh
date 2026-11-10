import state from "./state.js";

import {updateUI} from './ui.js';
import { buyPowerClick, buyAutoClick } from './upgrades.js';

const clickZone = document.getElementById('click-zone');
const btnPowerBuy = document.getElementById('buy-power-click-btn');
const btnAutoClickBuy = document.getElementById('buy-auto-click-btn');
const savedData = localStorage.getItem('byte_clicker_save');
const btnReset = document.getElementById('reset-game-btn');

if (savedData) {
    const parsedData = JSON.parse(savedData);
    // Мягко перезаписываем свойства нашего state сохраненными данными
    Object.assign(state, parsedData);
}

function saveGame() {
    localStorage.setItem('byte_clicker_save', JSON.stringify(state));
}

btnReset.addEventListener('click', () => {
    // Выводим стандартное браузерное окно подтверждения, чтобы не сбросить случайно
    if (confirm('Вы уверены, что хотите полностью обнулить систему и стереть байты?')) {
        // 1. Стираем запись из памяти браузера
        localStorage.removeItem('byte_clicker_save');

        // 2. Возвращаем объект состояния к дефолтным стартовым значениям
        state.currentBalance = 0;
        state.currentPower = 1;
        state.passiveIncome = 0;
        
        state.upgrades.powerClick.price = 150;
        state.upgrades.powerClick.purchased = 0;
        
        state.upgrades.autoClick.price = 500;
        state.upgrades.autoClick.purchased = 0;

        // 3. Мгновенно обновляем интерфейс, чтобы заблокировать кнопки и вернуть нули
        updateUI();
    }
});


clickZone.addEventListener('click', () => {
    state.currentBalance += state.currentPower;
    updateUI();

    const wave = document.createElement('span');

    wave.classList.add('click_wave');

    const rect = clickZone.getBoundingClientRect();
    
    // Высчитываем, в какое именно место внутри экрана кликнул курсор мышки
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Задаем эти координаты нашему кругу через инлайновые стили
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    // Закидываем созданную волну внутрь экрана click-zone
    clickZone.appendChild(wave);

    // 3. УДАЛЯЕМ ВОЛНУ ПОСЛЕ ОКОНЧАНИЯ АНИМАЦИИ
    // Наша CSS-анимация длится 0.4 секунды (400 мс). 
    // Через 400 миллисекунд удаляем элемент из HTML, чтобы память ПК не засорялась
    setTimeout(() => {
        wave.remove();
    }, 400);
})

btnPowerBuy.addEventListener('click', () => {
    buyPowerClick();
    updateUI();
    saveGame();
});

btnAutoClickBuy.addEventListener('click', () => {
    buyAutoClick();
    updateUI();
    saveGame();
});

setInterval(() => {
    state.currentBalance += state.passiveIncome;
    updateUI();
}, 1000);

window.addEventListener('beforeunload', saveGame);

updateUI();
