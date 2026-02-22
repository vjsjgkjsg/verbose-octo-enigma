/* =====================================================
   🎮 СКРИПТЫ ДЛЯ РАЗДЕЛА ИГР
   Университет Козыбаева — Образовательный проект
   ===================================================== */

// === ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ===
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(tb => tb.classList.remove('active'));
  
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
}

// === МОДАЛЬНОЕ ОКНО ===
let currentModal = null;

function openGame(gameId) {
  currentModal = document.getElementById(gameId);
  if (currentModal) {
    currentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Инициализация игры при открытии
    if (gameId === 'quiz-modal') initQuiz();
    if (gameId === 'memory-modal') initMemory();
    if (gameId === 'word-modal') initWord();
    if (gameId === 'puzzle-modal') initPuzzle();
    if (gameId === 'pairs-modal') initPairs();
    if (gameId === 'colors-modal') initColors();
  }
}

function closeGame() {
  if (currentModal) {
    currentModal.classList.remove('active');
    document.body.style.overflow = '';
    currentModal = null;
  }
}

// Закрытие по клику вне модалки
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('game-modal')) {
    closeGame();
  }
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && currentModal) {
    closeGame();
  }
});

// =====================================================
// ИГРА 1: ВИКТОРИНА
// =====================================================
const quizData = [
  {q:"🏙️ В каком году основан Петропавловск?",opts:["1752","1800","1850","1900"],ans:0},
  {q:"🌊 Какая река протекает через город?",opts:["Иртыш","Ишим","Урал","Тобол"],ans:1},
  {q:"🇰🇿 В какой области находится город?",opts:["Акмолинской","Северо-Казахстанской","Карагандинской","Павлодарской"],ans:1},
  {q:"🎭 Как называется главный театр?",opts:["Театр Абая","Театр Погодина","Театр Чехова","Русский театр"],ans:1},
  {q:"❄️ Какая минимальная температура зимой?",opts:["-20°C","-30°C","-40°C","-50°C"],ans:2},
  {q:"🏛️ В честь кого назван город?",opts:["Петра I","Апостолов Петра и Павла","Петра Великого","Павла I"],ans:1},
  {q:"🌲 Как называется городской лес?",opts:["Сосновый бор","Зелёная роща","Берёзовая роща","Городской парк"],ans:1},
  {q:"📚 Имя казахского писателя-земляка?",opts:["Абай Кунанбаев","Сабит Муканов","Мухтар Ауэзов","Ильяс Есенберлин"],ans:1}
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function initQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  document.getElementById('quiz-start').style.display = 'inline-flex';
  document.getElementById('quiz-options').style.display = 'none';
  document.getElementById('quiz-next').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-question').textContent = 'Нажми «Начать» для старта викторины! 🚀';
  document.getElementById('quiz-progress').style.width = '0%';
  document.getElementById('quiz-score').textContent = 'Вопрос 1 из 8 • Очки: 0';
}

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  document.getElementById('quiz-start').style.display = 'none';
  document.getElementById('quiz-options').style.display = 'grid';
  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (quizIndex >= quizData.length) {
    document.getElementById('quiz-question').textContent = '🎉 Викторина завершена!';
    document.getElementById('quiz-options').style.display = 'none';
    document.getElementById('quiz-next').style.display = 'none';
    const result = document.getElementById('quiz-result');
    result.style.display = 'block';
    result.style.background = 'linear-gradient(135deg, #c6f6d5, #9ae6b4)';
    result.style.color = '#22543d';
    result.textContent = `Твой результат: ${quizScore} из ${quizData.length}! ${quizScore>=6?'🌟 Отлично!':quizScore>=4?'👍 Хорошо!':'💪 Попробуй ещё!'}`;
    document.getElementById('quiz-score').textContent = `Финал: ${quizScore}/${quizData.length}`;
    document.getElementById('quiz-progress').style.width = '100%';
    document.getElementById('quiz-start').style.display = 'inline-flex';
    document.getElementById('quiz-start').textContent = '🔄 Играть снова';
    return;
  }
  
  const q = quizData[quizIndex];
  document.getElementById('quiz-question').textContent = q.q;
  document.getElementById('quiz-score').textContent = `Вопрос ${quizIndex+1} из ${quizData.length} • Очки: ${quizScore}`;
  document.getElementById('quiz-progress').style.width = (quizIndex/quizData.length*100)+'%';
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-next').style.display = 'none';
  quizAnswered = false;
  
  const opts = document.getElementById('quiz-options');
  opts.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = () => answerQuiz(i);
    opts.appendChild(btn);
  });
}

function answerQuiz(idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  
  const q = quizData[quizIndex];
  const options = document.querySelectorAll('.quiz-option');
  
  options.forEach((opt, i) => {
    if (i === q.ans) opt.classList.add('correct');
    else if (i === idx) opt.classList.add('wrong');
    opt.disabled = true;
  });
  
  const result = document.getElementById('quiz-result');
  if (idx === q.ans) {
    quizScore++;
    result.textContent = '✅ Правильно!';
    result.style.background = 'linear-gradient(135deg, #c6f6d5, #9ae6b4)';
    result.style.color = '#22543d';
  } else {
    result.textContent = `❌ Неверно. Правильно: ${q.opts[q.ans]}`;
    result.style.background = 'linear-gradient(135deg, #fed7d7, #fc8181)';
    result.style.color = '#742a2a';
  }
  result.style.display = 'block';
  document.getElementById('quiz-next').style.display = 'inline-flex';
  document.getElementById('quiz-score').textContent = `Вопрос ${quizIndex+1} из ${quizData.length} • Очки: ${quizScore}`;
}

function nextQuiz() {
  quizIndex++;
  renderQuizQuestion();
}

// =====================================================
// ИГРА 2: ПАМЯТЬ
// =====================================================
const memoryEmojis = ['🏔️','🐎','🎭','🏛️','🌾','🎪'];
let memoryCards = [];
let memoryFlipped = [];
let memoryMatched = 0;
let memoryMoves = 0;
let memoryTimer = null;
let memorySeconds = 0;

function initMemory() {
  memoryCards = [...memoryEmojis, ...memoryEmojis].sort(() => Math.random() - 0.5);
  memoryFlipped = [];
  memoryMatched = 0;
  memoryMoves = 0;
  memorySeconds = 0;
  
  document.getElementById('memory-moves').textContent = '0';
  document.getElementById('memory-pairs').textContent = '0/6';
  document.getElementById('memory-time').textContent = '0:00';
  
  if (memoryTimer) clearInterval(memoryTimer);
  memoryTimer = setInterval(() => {
    memorySeconds++;
    const m = Math.floor(memorySeconds/60);
    const s = memorySeconds%60;
    document.getElementById('memory-time').textContent = `${m}:${s<10?'0':''}${s}`;
  }, 1000);
  
  const grid = document.getElementById('memory-grid');
  grid.innerHTML = '';
  memoryCards.forEach((emoji, idx) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.textContent = '❓';
    card.onclick = () => flipMemory(idx);
    grid.appendChild(card);
  });
}

function flipMemory(idx) {
  if (memoryFlipped.length >= 2 || memoryFlipped.includes(idx)) return;
  
  const cards = document.querySelectorAll('.memory-card');
  const card = cards[idx];
  if (card.classList.contains('matched')) return;
  
  card.classList.add('flipped');
  card.textContent = memoryCards[idx];
  memoryFlipped.push(idx);
  
  if (memoryFlipped.length === 2) {
    memoryMoves++;
    document.getElementById('memory-moves').textContent = memoryMoves;
    
    setTimeout(() => {
      const [i1, i2] = memoryFlipped;
      if (memoryCards[i1] === memoryCards[i2]) {
        cards[i1].classList.add('matched');
        cards[i2].classList.add('matched');
        memoryMatched++;
        document.getElementById('memory-pairs').textContent = `${memoryMatched}/6`;
        
        if (memoryMatched === 6) {
          clearInterval(memoryTimer);
          setTimeout(() => alert(`🎉 Победа! Ходов: ${memoryMoves}, Время: ${document.getElementById('memory-time').textContent}`), 300);
        }
      } else {
        cards[i1].classList.remove('flipped');
        cards[i2].classList.remove('flipped');
        cards[i1].textContent = '❓';
        cards[i2].textContent = '❓';
      }
      memoryFlipped = [];
    }, 800);
  }
}

// =====================================================
// ИГРА 3: УГАДАЙ СЛОВО
// =====================================================
const wordsList = [
  {word:'ИШИМ',hint:'Главная река города'},
  {word:'КРЕПОСТЬ',hint:'Место основания Петропавловска'},
  {word:'МУЗЕЙ',hint:'Хранит историю города'},
  {word:'ТЕАТР',hint:'Место для спектаклей'},
  {word:'ПАРК',hint:'Место отдыха с аттракционами'}
];

let wordCurrent = null;
let wordGuessed = [];
let wordLives = 6;

function initWord() {
  wordCurrent = wordsList[Math.floor(Math.random()*wordsList.length)];
  wordGuessed = Array(wordCurrent.word.length).fill('_');
  wordLives = 6;
  
  document.getElementById('word-hint').textContent = `💡 ${wordCurrent.hint}`;
  document.getElementById('word-lives').textContent = '❤️'.repeat(wordLives);
  document.getElementById('word-display').textContent = wordGuessed.join(' ');
  
  const kb = document.getElementById('word-keyboard');
  kb.innerHTML = '';
  'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('').forEach(letter => {
    const key = document.createElement('button');
    key.className = 'word-key';
    key.textContent = letter;
    key.onclick = () => guessLetter(letter, key);
    kb.appendChild(key);
  });
}

function guessLetter(letter, keyEl) {
  if (keyEl.classList.contains('used')) return;
  keyEl.classList.add('used');
  
  if (wordCurrent.word.includes(letter)) {
    wordCurrent.word.split('').forEach((l, i) => {
      if (l === letter) wordGuessed[i] = letter;
    });
    document.getElementById('word-display').textContent = wordGuessed.join(' ');
    
    if (!wordGuessed.includes('_')) {
      setTimeout(() => {
        alert('🎉 Слово угадано!');
        initWord();
      }, 300);
    }
  } else {
    wordLives--;
    document.getElementById('word-lives').textContent = '❤️'.repeat(Math.max(0,wordLives)) + '🖤'.repeat(6-wordLives);
    if (wordLives === 0) {
      setTimeout(() => {
        alert(`😢 Игра окончена! Слово: ${wordCurrent.word}`);
        initWord();
      }, 300);
    }
  }
}

// =====================================================
// ИГРА 4: ПЯТНАШКИ
// =====================================================
let puzzleTiles = [];
let puzzleMoves = 0;

function initPuzzle() {
  puzzleTiles = [1,2,3,4,5,6,7,8,0];
  // Перемешивание
  for (let i=0; i<100; i++) {
    const emptyIdx = puzzleTiles.indexOf(0);
    const moves = [];
    if (emptyIdx > 2) moves.push(emptyIdx-3);
    if (emptyIdx < 6) moves.push(emptyIdx+3);
    if (emptyIdx % 3 !== 0) moves.push(emptyIdx-1);
    if (emptyIdx % 3 !== 2) moves.push(emptyIdx+1);
    const move = moves[Math.floor(Math.random()*moves.length)];
    [puzzleTiles[emptyIdx], puzzleTiles[move]] = [puzzleTiles[move], puzzleTiles[emptyIdx]];
  }
  puzzleMoves = 0;
  document.getElementById('puzzle-moves').textContent = '0';
  renderPuzzle();
}

function renderPuzzle() {
  const grid = document.getElementById('puzzle-grid');
  grid.innerHTML = '';
  puzzleTiles.forEach((num, idx) => {
    const tile = document.createElement('div');
    tile.className = 'puzzle-tile' + (num === 0 ? ' empty' : '');
    tile.textContent = num || '';
    tile.onclick = () => movePuzzle(idx);
    grid.appendChild(tile);
  });
}

function movePuzzle(idx) {
  const emptyIdx = puzzleTiles.indexOf(0);
  const canMove = (
    (idx === emptyIdx-1 && emptyIdx%3 !== 0) ||
    (idx === emptyIdx+1 && emptyIdx%3 !== 2) ||
    idx === emptyIdx-3 ||
    idx === emptyIdx+3
  );
  if (!canMove) return;
  
  [puzzleTiles[idx], puzzleTiles[emptyIdx]] = [puzzleTiles[emptyIdx], puzzleTiles[idx]];
  puzzleMoves++;
  document.getElementById('puzzle-moves').textContent = puzzleMoves;
  renderPuzzle();
  
  if (puzzleTiles.slice(0,8).every((v,i) => v === i+1)) {
    setTimeout(() => alert(`🎉 Решено за ${puzzleMoves} ходов!`), 300);
  }
}

// =====================================================
// ИГРА 5: НАЙДИ ПАРУ
// =====================================================
const pairsEmojis = ['🏺','🎪','🏛️','🎨','🏔️','🌾'];
let pairsCards = [];
let pairsFlipped = [];
let pairsMatched = 0;
let pairsMoves = 0;

function initPairs() {
  pairsCards = [...pairsEmojis, ...pairsEmojis].sort(() => Math.random() - 0.5);
  pairsFlipped = [];
  pairsMatched = 0;
  pairsMoves = 0;
  
  document.getElementById('pairs-moves').textContent = '0';
  document.getElementById('pairs-found').textContent = '0/6';
  
  const grid = document.getElementById('pairs-grid');
  grid.innerHTML = '';
  pairsCards.forEach((emoji, idx) => {
    const card = document.createElement('div');
    card.className = 'pair-card';
    card.textContent = '❓';
    card.onclick = () => flipPair(idx);
    grid.appendChild(card);
  });
}

function flipPair(idx) {
  if (pairsFlipped.length >= 2 || pairsFlipped.includes(idx)) return;
  
  const cards = document.querySelectorAll('.pair-card');
  const card = cards[idx];
  if (card.classList.contains('matched')) return;
  
  card.classList.add('flipped');
  card.textContent = pairsCards[idx];
  pairsFlipped.push(idx);
  
  if (pairsFlipped.length === 2) {
    pairsMoves++;
    document.getElementById('pairs-moves').textContent = pairsMoves;
    
    setTimeout(() => {
      const [i1, i2] = pairsFlipped;
      if (pairsCards[i1] === pairsCards[i2]) {
        cards[i1].classList.add('matched');
        cards[i2].classList.add('matched');
        pairsMatched++;
        document.getElementById('pairs-found').textContent = `${pairsMatched}/6`;
        
        if (pairsMatched === 6) {
          setTimeout(() => alert(`🎉 Все пары найдены за ${pairsMoves} ходов!`), 300);
        }
      } else {
        cards[i1].classList.remove('flipped');
        cards[i2].classList.remove('flipped');
        cards[i1].textContent = '❓';
        cards[i2].textContent = '❓';
      }
      pairsFlipped = [];
    }, 800);
  }
}

// =====================================================
// ИГРА 6: ЦВЕТА
// =====================================================
const colorsData = [
  {name:'КРАСНЫЙ',color:'#ef4444'},
  {name:'СИНИЙ',color:'#3b82f6'},
  {name:'ЗЕЛЁНЫЙ',color:'#22c55e'},
  {name:'ЖЁЛТЫЙ',color:'#eab308'},
  {name:'ОРАНЖЕВЫЙ',color:'#f97316'},
  {name:'ФИОЛЕТОВЫЙ',color:'#a855f7'}
];

let colorsScore = 0;
let colorsTotal = 0;

function initColors() {
  colorsScore = 0;
  colorsTotal = 0;
  document.getElementById('colors-score').textContent = '0/0';
  nextColorRound();
}

function nextColorRound() {
  const correct = colorsData[Math.floor(Math.random()*colorsData.length)];
  const wrongName = colorsData.filter(c => c !== correct)[Math.floor(Math.random()*(colorsData.length-1))];
  
  const showWrongName = Math.random() > 0.5;
  
  document.getElementById('colors-word').textContent = showWrongName ? wrongName.name : correct.name;
  document.getElementById('colors-word').style.color = correct.color;
  
  const btn1 = document.getElementById('colors-yes');
  const btn2 = document.getElementById('colors-no');
  
  btn1.onclick = () => answerColors(showWrongName ? false : true);
  btn2.onclick = () => answerColors(showWrongName ? true : false);
}

function answerColors(isCorrect) {
  colorsTotal++;
  if (isCorrect) colorsScore++;
  
  document.getElementById('colors-score').textContent = `${colorsScore}/${colorsTotal}`;
  
  setTimeout(nextColorRound, 400);
}

// === ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ===
document.addEventListener('DOMContentLoaded', () => {
  // Активируем первую вкладку
  document.getElementById('online-games').classList.add('active');
});
