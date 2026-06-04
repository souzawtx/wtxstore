let treinoAtual = 0;
let exercicioIndex = 0;
let timerInterval = null;
let segundos = 0;
let isRunning = false;
let isDescanso = false;

const treinos = [
  {
    nome: "Treino A - Peito e Tríceps",
    exercicios: [
      { nome: "Supino Reto com Barra", musculo: "Peito", series: 4, reps: "8-12" },
      { nome: "Supino Inclinado Halter", musculo: "Peito Superior", series: 4, reps: "10-12" },
      { nome: "Crucifixo Máquina ou Crossover", musculo: "Peito", series: 3, reps: "12-15" },
      { nome: "Tríceps Francês", musculo: "Tríceps", series: 4, reps: "10-12" },
      { nome: "Tríceps Pulley com Corda", musculo: "Tríceps", series: 3, reps: "15" }
    ]
  },
  // Adicione mais treinos aqui (B e C)
  {
    nome: "Treino B - Costas e Bíceps",
    exercicios: [
      { nome: "Puxada Frontal", musculo: "Costas", series: 4, reps: "10-12" },
      { nome: "Remada Curvada", musculo: "Costas", series: 4, reps: "8-12" },
      { nome: "Rosca Bíceps Barra", musculo: "Bíceps", series: 4, reps: "10-12" }
    ]
  },
  {
    nome: "Treino C - Pernas e Ombros",
    exercicios: [
      { nome: "Agachamento Livre", musculo: "Pernas", series: 4, reps: "8-12" },
      { nome: "Leg Press", musculo: "Pernas", series: 4, reps: "10-15" },
      { nome: "Desenvolvimento Ombros", musculo: "Ombros", series: 4, reps: "10-12" }
    ]
  }
];

function carregarTreino(index) {
  treinoAtual = index;
  exercicioIndex = 0;
  document.querySelectorAll('.menu-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
  document.getElementById('treino-titulo').textContent = treinos[index].nome;
  carregarExercicio();
}

function carregarExercicio() {
  const ex = treinos[treinoAtual].exercicios[exercicioIndex];
  document.getElementById('exercicio-nome').textContent = ex.nome;
  document.getElementById('musculo-tag').textContent = ex.musculo;
  document.getElementById('serie-atual').textContent = "1";
  document.getElementById('reps-info').textContent = `${ex.reps} repetições`;
  
  resetTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  segundos = 0;
  isRunning = false;
  isDescanso = false;
  document.getElementById('timer').textContent = "00:00";
  document.getElementById('timer-label').textContent = "TEMPO DE TRABALHO";
  document.getElementById('btn-start').style.display = 'inline-block';
  document.getElementById('btn-pause').style.display = 'none';
}

function toggleTimer() {
  if (!isRunning) {
    isRunning = true;
    document.getElementById('btn-start').style.display = 'none';
    document.getElementById('btn-pause').style.display = 'inline-block';
    
    timerInterval = setInterval(() => {
      segundos++;
      const min = Math.floor(segundos / 60).toString().padStart(2, '0');
      const seg = (segundos % 60).toString().padStart(2, '0');
      document.getElementById('timer').textContent = `${min}:${seg}`;
    }, 1000);
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById('btn-start').style.display = 'inline-block';
    document.getElementById('btn-pause').style.display = 'none';
  }
}

function concluirSerie() {
  alert("✅ Série concluída! Iniciando descanso de 60 segundos...");
  // Aqui pode adicionar som e animação
  resetTimer();
  // Próximo exercício automático depois de X segundos (opcional)
}

function proximoExercicio() {
  const total = treinos[treinoAtual].exercicios.length;
  exercicioIndex = (exercicioIndex + 1) % total;
  carregarExercicio();
}

function verHistorico() {
  alert("📊 Histórico será implementado em breve (LocalStorage)");
}

// Iniciar
carregarTreino(0);