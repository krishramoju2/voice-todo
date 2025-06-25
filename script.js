const startBtn = document.getElementById('start-btn');
const taskList = document.getElementById('task-list');
const status = document.getElementById('status');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

startBtn.addEventListener('click', () => {
  recognition.start();
  status.textContent = '🎙️ Listening...';
});

recognition.onresult = (event) => {
  const speechResult = event.results[0][0].transcript;
  status.textContent = `✅ Task added: "${speechResult}"`;
  addTask(speechResult);
};

recognition.onerror = (event) => {
  status.textContent = '❌ Error: ' + event.error;
};

function addTask(text) {
  const li = document.createElement('li');
  li.textContent = text;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  taskList.appendChild(li);
}
