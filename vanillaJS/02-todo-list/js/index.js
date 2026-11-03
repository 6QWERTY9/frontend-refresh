let tasks = JSON.parse(localStorage.getItem('terminal_tasks')) || [];

const COMMANDS = ['add', 'done', 'del', 'clear'];

const cardsContainer = document.querySelector('.todo_list_cards');

const form = document.querySelector('.todo_list_input_block');
const input = document.querySelector('.user_input');


function render() {
    if (tasks.length === 0) {
        cardsContainer.innerHTML = `
        <div class="terminal_welcome">
            <p class="welcome_title">// SYSTEM STATUS: AWAITING COMMANDS //</p>
            <ul class="welcome_help_list">
                <li>> add [текст] — создать лог процесса</li>
                <li>> done [номер] — завершить процесс</li>
                <li>> del [номер] — стереть лог</li>
                <li>> clear — полная очистка базы</li>
            </ul>
            </div>
        `;
        return;
    }


    let htmlContent = '';

    tasks.forEach((task, index) => {
        const taskNumber = index + 1;

        const status = task.completed ? 'done' : '';

        htmlContent += `
            <li class="todo_list_card">
                <div class="indicator ${status}"></div>
                <div class="user_text_wrapper">
                    <span class="card_number">[IDX_${taskNumber}]</span>
                    <span class="user_text">${task.text}</span>
                </div>
            </li>
        `
    });

    cardsContainer.innerHTML = htmlContent;

    localStorage.setItem('terminal_tasks', JSON.stringify(tasks));
}



function addTask(userText) {
    if (!userText) return;

    const newTask = {
        id: Date.now(),
        text: userText,
        completed: false
    }

    tasks.push(newTask);
    render();
}

function clearTasks() {
    tasks = [];
    render();
}

function completeTask(taskNumberStr) {
    const num = parseInt(taskNumberStr, 10);
    const index = num - 1;

    if (isNaN(num) || index < 0 || index >= tasks.length) {
        console.log('SYSTEM_ERROR: Invalid index');
        return;
    }

    tasks[index].completed = !tasks[index].completed;
    render();
}

function deleteTask(taskNumberStr) {
    const num = parseInt(taskNumberStr, 10);
    const index = num - 1;

    if (isNaN(num) || index < 0 || index >= tasks.length) {
        console.log('SYSTEM_ERROR: Invalid index');
        return;
    }

    tasks.splice(index, 1);
    
    render();
}


form.addEventListener('submit', function (event) {
    event.preventDefault();

    const rawText = input.value.trim();

    if (!rawText) return;

    const firstSpaceIndex = rawText.indexOf(' ');

    let command = '';
    let argument = '';

    if (firstSpaceIndex === -1) {
        command = rawText.toLowerCase();
    } else {
        command = rawText.slice(0, firstSpaceIndex).toLowerCase();
        argument = rawText.slice(firstSpaceIndex + 1);
    }

    input.value = '';

    switch (command) {
        case 'add':
        case '+':
            addTask(argument);
            break;

        case 'done':
        case 'v':
            completeTask(argument);
            break;

        case 'del':
        case '-':
            deleteTask(argument);
            break;

        case 'clear':
        case 'cls':
            clearTasks();
            break;

        default:
            console.log('SYSTEM_ERROR: Unknown command');
            break;
    }

    console.log('Команда:', command, '| Аргумент:', argument);
});

render();



