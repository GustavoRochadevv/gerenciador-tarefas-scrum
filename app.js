// Seleciona os elementos HTML
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const backlogList = document.getElementById('backlogList');
const inProgressList = document.getElementById('inProgressList');
const completedList = document.getElementById('completedList');
const emptyBacklogMessage = document.getElementById('emptyBacklogMessage');
const emptyInProgressMessage = document.getElementById('emptyInProgressMessage');
const emptyCompletedMessage = document.getElementById('emptyCompletedMessage');

// Função para adicionar uma nova tarefa ao backlog
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, insira uma tarefa! 😄');
        return;
    }

    // Cria um novo item de lista (li) para a tarefa
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');

    // Cria o texto da tarefa
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    // Cria o botão "Em Progresso"
    const inProgressBtn = document.createElement('button');
    inProgressBtn.textContent = 'Iniciar 🚀';
    inProgressBtn.addEventListener('click', () => {
        moveTaskToInProgress(taskItem);
    });

    // Adiciona o texto da tarefa e o botão ao item de tarefa
    taskItem.appendChild(taskContent);
    taskItem.appendChild(inProgressBtn);

    // Adiciona a tarefa ao Backlog
    backlogList.appendChild(taskItem);

    // Limpa o campo de entrada
    taskInput.value = '';

    checkEmptyColumns();
}

// Move a tarefa para a coluna "Em Progresso"
function moveTaskToInProgress(taskItem) {
    taskItem.removeChild(taskItem.querySelector('button'));

    // Cria o botão "Concluir"
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Concluir ✅';
    completeBtn.addEventListener('click', () => {
        moveTaskToCompleted(taskItem);
    });

    taskItem.appendChild(completeBtn);
    inProgressList.appendChild(taskItem);

    checkEmptyColumns();
}

// Move a tarefa para a coluna "Concluídas"
function moveTaskToCompleted(taskItem) {
    taskItem.removeChild(taskItem.querySelector('button'));
    completedList.appendChild(taskItem);
    checkEmptyColumns();
}

// Verifica se as colunas estão vazias e exibe a mensagem apropriada
function checkEmptyColumns() {
    emptyBacklogMessage.classList.toggle('hidden', backlogList.children.length !== 0);
    emptyInProgressMessage.classList.toggle('hidden', inProgressList.children.length !== 0);
    emptyCompletedMessage.classList.toggle('hidden', completedList.children.length !== 0);
}

// Evento de clique no botão para adicionar a tarefa
addTaskBtn.addEventListener('click', addTask);

// Também permite adicionar a tarefa pressionando Enter
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Exibe a mensagem apropriada
