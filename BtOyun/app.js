/**
 * Bilişim Teknolojileri Passaparola - Oyun Motoru (Game Engine)
 */

class PassaparolaGame {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
    this.round = 1; // 1: Ana Tur, 2: Pas Turu
    this.state = 'INIT'; // INIT, PLAYING, PAUSED, FINISHED
    
    // İstatistikler
    this.correctCount = 0;
    this.wrongCount = 0;
    this.passCount = 0;
    
    // Zamanlayıcı
    this.totalDuration = 240; // saniye
    this.remainingTime = 240;
    this.timerInterval = null;

    // Pas listesi
    this.passQueue = [];
    this.passQueuePointer = 0;

    // Takım Modu
    this.isTeamMode = false;
    this.currentTeam = 'A'; // 'A' veya 'B'
    this.teamScores = { A: { correct: 0, wrong: 0 }, B: { correct: 0, wrong: 0 } };

    // DOM Elemanları
    this.dom = {};
    
    this.initDOM();
    this.attachEvents();
  }

  initDOM() {
    this.dom.arena = document.getElementById('arena');
    this.dom.activeLetterBadge = document.getElementById('active-letter-badge');
    this.dom.roundInfo = document.getElementById('round-info');
    this.dom.questionText = document.getElementById('question-text');
    this.dom.answerInput = document.getElementById('answer-input');
    this.dom.btnSubmit = document.getElementById('btn-submit');
    this.dom.btnPass = document.getElementById('btn-pass');
    this.dom.hintFeedback = document.getElementById('hint-feedback');
    
    this.dom.statCorrect = document.getElementById('stat-correct');
    this.dom.statWrong = document.getElementById('stat-wrong');
    this.dom.statPass = document.getElementById('stat-pass');
    this.dom.timerDisplay = document.getElementById('timer-display');
    this.dom.timerBox = document.getElementById('timer-box');

    this.dom.modalStart = document.getElementById('modal-start');
    this.dom.modalSettings = document.getElementById('modal-settings');
    this.dom.modalResults = document.getElementById('modal-results');
    
    this.dom.btnStartGame = document.getElementById('btn-start-game');
    this.dom.btnRestartGame = document.getElementById('btn-restart-game');
    this.dom.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.dom.btnKeyboardToggle = document.getElementById('btn-keyboard-toggle');
    this.dom.btnFullscreen = document.getElementById('btn-fullscreen');
    this.dom.btnSettings = document.getElementById('btn-settings');
    this.dom.btnCloseSettings = document.getElementById('btn-close-settings');

    this.dom.virtualKeyboard = document.getElementById('virtual-keyboard');
    this.dom.resultsSummary = document.getElementById('results-summary');
    this.dom.reviewList = document.getElementById('review-list');
    this.dom.teamBanner = document.getElementById('team-banner');
  }

  attachEvents() {
    // Başlat & Yeniden Başlat Butonları
    this.dom.btnStartGame.addEventListener('click', () => this.startGame());
    this.dom.btnRestartGame.addEventListener('click', () => {
      this.closeModal(this.dom.modalResults);
      this.openModal(this.dom.modalStart);
    });

    // Cevap & Pas Butonları
    this.dom.btnSubmit.addEventListener('click', () => this.handleAnswer());
    this.dom.btnPass.addEventListener('click', () => this.handlePass());

    // Fiziksel Klavye Dinleyicisi
    this.dom.answerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleAnswer();
      }
    });

    // Global Kısayollar
    window.addEventListener('keydown', (e) => {
      if (this.state !== 'PLAYING') return;
      
      // Boşluk tuşuna basıldığında ve inputta yazı yoksa PAS geç
      if (e.code === 'Space' && this.dom.answerInput.value.trim() === '') {
        e.preventDefault();
        this.handlePass();
      }
    });

    // Ses Aç/Kapat
    this.dom.btnSoundToggle.addEventListener('click', () => {
      const isMuted = sounds.toggleMute();
      this.dom.btnSoundToggle.innerHTML = isMuted ? '🔇' : '🔊';
      this.dom.btnSoundToggle.title = isMuted ? 'Sesi Aç' : 'Sesi Kapat';
    });

    // Sanal Klavye Aç/Kapat
    this.dom.btnKeyboardToggle.addEventListener('click', () => {
      this.dom.virtualKeyboard.classList.toggle('show');
      this.dom.answerInput.focus();
    });

    // Tam Ekran
    this.dom.btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen().catch(err => console.log(err));
      }
    });

    // Ayarlar Modalı
    this.dom.btnSettings.addEventListener('click', () => {
      this.openModal(this.dom.modalSettings);
    });
    this.dom.btnCloseSettings.addEventListener('click', () => {
      this.closeModal(this.dom.modalSettings);
    });

    // Pencere yeniden boyutlandırıldığında çarkı güncelle
    window.addEventListener('resize', () => {
      this.positionLetterNodes();
    });

    // Sanal Klavye Tuş Tıklamaları
    this.attachVirtualKeyboardEvents();
  }

  attachVirtualKeyboardEvents() {
    const keys = document.querySelectorAll('.k-key');
    keys.forEach(key => {
      key.addEventListener('click', (e) => {
        e.preventDefault();
        sounds.playLetterSelect();
        const action = key.dataset.action;
        const char = key.dataset.char;

        if (action === 'submit') {
          this.handleAnswer();
        } else if (action === 'pass') {
          this.handlePass();
        } else if (action === 'backspace') {
          this.dom.answerInput.value = this.dom.answerInput.value.slice(0, -1);
          this.dom.answerInput.focus();
        } else if (action === 'clear') {
          this.dom.answerInput.value = '';
          this.dom.answerInput.focus();
        } else if (action === 'space') {
          this.dom.answerInput.value += ' ';
          this.dom.answerInput.focus();
        } else if (char) {
          this.dom.answerInput.value += char;
          this.dom.answerInput.focus();
        }
      });
    });
  }

  // Çark üzerindeki 28 harfi dairesel olarak dizme
  renderWheel() {
    // Varsa eski harfleri temizle
    const oldNodes = this.dom.arena.querySelectorAll('.letter-node');
    oldNodes.forEach(node => node.remove());

    this.questions.forEach((q, index) => {
      const node = document.createElement('div');
      node.className = 'letter-node';
      node.id = `letter-node-${index}`;
      node.textContent = q.letter;
      this.dom.arena.appendChild(node);
    });

    this.positionLetterNodes();
  }

  positionLetterNodes() {
    const arenaRect = this.dom.arena.getBoundingClientRect();
    const radius = (Math.min(arenaRect.width, arenaRect.height) / 2) * 0.88;
    const centerX = arenaRect.width / 2;
    const centerY = arenaRect.height / 2;
    const total = this.questions.length;

    this.questions.forEach((q, index) => {
      const node = document.getElementById(`letter-node-${index}`);
      if (!node) return;

      // 12 yönünden başlayarak ( -PI / 2 ) saat yönünde dağılım
      const angle = -Math.PI / 2 + (index * (2 * Math.PI / total));
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
    });
  }

  // Oyunu Başlat
  startGame() {
    // Ayarları oku
    const timeSetting = parseInt(document.getElementById('setting-timer').value, 10);
    this.totalDuration = timeSetting > 0 ? timeSetting : 99999;
    this.remainingTime = this.totalDuration;
    
    const teamSetting = document.getElementById('setting-team-mode').value;
    this.isTeamMode = (teamSetting === 'team');
    this.currentTeam = 'A';
    this.teamScores = { A: { correct: 0, wrong: 0 }, B: { correct: 0, wrong: 0 } };

    // Soruları klonla ve durumları sıfırla
    this.questions = JSON.parse(JSON.stringify(PASSAPAROLA_DATA)).map(q => ({
      ...q,
      status: 'IDLE', // IDLE, ACTIVE, CORRECT, WRONG, PASSED
      userAnswer: ''
    }));

    this.currentIndex = 0;
    this.round = 1;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.passCount = 0;
    this.passQueue = [];
    this.passQueuePointer = 0;

    this.updateStatsUI();
    this.renderWheel();
    this.closeModal(this.dom.modalStart);
    this.closeModal(this.dom.modalSettings);

    this.state = 'PLAYING';
    sounds.playStart();

    // Timer başlat
    this.startTimer();
    this.loadQuestion(0);
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      if (this.state !== 'PLAYING') return;

      if (this.totalDuration < 99999) {
        this.remainingTime--;
        this.updateTimerDisplay();

        if (this.remainingTime <= 10 && this.remainingTime > 0) {
          sounds.playWarningTick();
          this.dom.timerBox.classList.add('warning');
        } else if (this.remainingTime > 10) {
          this.dom.timerBox.classList.remove('warning');
        }

        if (this.remainingTime <= 0) {
          this.endGame('Süre Doldu!');
        }
      }
    }, 1000);
  }

  updateTimerDisplay() {
    if (this.totalDuration >= 99999) {
      this.dom.timerDisplay.textContent = '∞';
      return;
    }
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    this.dom.timerDisplay.textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  loadQuestion(index) {
    if (index < 0 || index >= this.questions.length) return;

    this.currentIndex = index;
    const q = this.questions[index];

    // Eski aktif harflerin aktif class'ını temizle
    document.querySelectorAll('.letter-node.active').forEach(n => n.classList.remove('active'));

    // Aktif harfi işaretle
    const activeNode = document.getElementById(`letter-node-${index}`);
    if (activeNode) {
      activeNode.classList.add('active');
    }

    this.dom.activeLetterBadge.textContent = q.letter;
    this.dom.roundInfo.textContent = (this.round === 1) ? `1. Tur - Harf: ${q.letter}` : `2. Tur (PAS) - Harf: ${q.letter}`;
    
    if (this.isTeamMode) {
      this.dom.roundInfo.textContent += ` | Sıra: ${this.currentTeam} Takımı`;
    }

    this.dom.questionText.textContent = q.question;
    this.dom.answerInput.value = '';
    this.dom.hintFeedback.textContent = '';
    this.dom.answerInput.focus();

    sounds.playLetterSelect();
  }

  // Türkçe Metin Normalizasyonu
  normalizeText(str) {
    if (!str) return '';
    return str
      .toLocaleLowerCase('tr-TR')
      .replace(/ı/g, 'i')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }

  // Cevabı Kontrol Etme
  handleAnswer() {
    if (this.state !== 'PLAYING') return;

    const userInput = this.dom.answerInput.value.trim();
    if (!userInput) return;

    const q = this.questions[this.currentIndex];
    q.userAnswer = userInput;

    const normUser = this.normalizeText(userInput);
    const normAnswer = this.normalizeText(q.answer);
    
    let isCorrect = (normUser === normAnswer);
    if (!isCorrect && q.aliases && q.aliases.length > 0) {
      isCorrect = q.aliases.some(alias => this.normalizeText(alias) === normUser);
    }

    const node = document.getElementById(`letter-node-${this.currentIndex}`);

    if (isCorrect) {
      q.status = 'CORRECT';
      this.correctCount++;
      if (this.isTeamMode) this.teamScores[this.currentTeam].correct++;
      
      node.className = 'letter-node correct';
      sounds.playCorrect();
      this.showFeedback('Tebrikler, Doğru!', 'var(--accent-green)');
    } else {
      q.status = 'WRONG';
      this.wrongCount++;
      if (this.isTeamMode) this.teamScores[this.currentTeam].wrong++;

      node.className = 'letter-node wrong';
      sounds.playWrong();
      this.showFeedback(`Yanlış! Doğru cevap: ${q.answer}`, 'var(--accent-red)');
    }

    this.updateStatsUI();

    // Takım modu varsa sırayı değiştir
    if (this.isTeamMode) {
      this.currentTeam = this.currentTeam === 'A' ? 'B' : 'A';
    }

    // Kısa bir gecikmeyle sonraki soruya geç
    setTimeout(() => {
      this.proceedToNextQuestion();
    }, 600);
  }

  // PAS Geçme
  handlePass() {
    if (this.state !== 'PLAYING') return;

    const q = this.questions[this.currentIndex];
    q.status = 'PASSED';
    this.passCount++;

    const node = document.getElementById(`letter-node-${this.currentIndex}`);
    node.className = 'letter-node passed';

    sounds.playPass();
    this.showFeedback('Pas geçildi', 'var(--accent-yellow)');
    this.updateStatsUI();

    // Takım modunda pas geçince de sıra değişebilir
    if (this.isTeamMode) {
      this.currentTeam = this.currentTeam === 'A' ? 'B' : 'A';
    }

    setTimeout(() => {
      this.proceedToNextQuestion();
    }, 300);
  }

  showFeedback(text, color) {
    this.dom.hintFeedback.textContent = text;
    this.dom.hintFeedback.style.color = color;
  }

  // Sonraki Soruya İlerleme Mantığı (1. Tur -> 2. Pas Turu -> Bitiş)
  proceedToNextQuestion() {
    if (this.round === 1) {
      // 1. Tur devam ediyor
      const nextIndex = this.currentIndex + 1;
      if (nextIndex < this.questions.length) {
        this.loadQuestion(nextIndex);
      } else {
        // 1. Tur bitti, Pas geçilen sorular var mı kontrol et
        this.startPassRound();
      }
    } else {
      // 2. Tur (PAS Döngüsü)
      this.advancePassQueue();
    }
  }

  startPassRound() {
    this.round = 2;
    // PAS durumunda kalan tüm soruları kuyruğa al
    this.passQueue = this.questions
      .map((q, idx) => ({ q, idx }))
      .filter(item => item.q.status === 'PASSED');

    if (this.passQueue.length === 0) {
      // Hiç pas soru yoksa oyun bitti!
      this.endGame('Tüm Sorular Tamamlandı!');
    } else {
      this.passQueuePointer = 0;
      const targetIdx = this.passQueue[this.passQueuePointer].idx;
      this.loadQuestion(targetIdx);
    }
  }

  advancePassQueue() {
    // Güncel pas kuyruğunu yenile
    this.passQueue = this.questions
      .map((q, idx) => ({ q, idx }))
      .filter(item => item.q.status === 'PASSED');

    if (this.passQueue.length === 0) {
      this.endGame('Tüm Sorular Tamamlandı!');
      return;
    }

    this.passQueuePointer = (this.passQueuePointer + 1) % this.passQueue.length;
    const targetIdx = this.passQueue[this.passQueuePointer].idx;
    this.loadQuestion(targetIdx);
  }

  updateStatsUI() {
    this.dom.statCorrect.textContent = this.correctCount;
    this.dom.statWrong.textContent = this.wrongCount;
    
    // Kalan pas soruları
    const activePassCount = this.questions.filter(q => q.status === 'PASSED').length;
    this.dom.statPass.textContent = activePassCount;
  }

  // Oyunu Bitir ve Sonuç Karnesini Göster
  endGame(reasonTitle = 'Oyun Tamamlandı!') {
    this.state = 'FINISHED';
    if (this.timerInterval) clearInterval(this.timerInterval);

    // Kalan pas veya boş soruları pas/boş olarak işaretle
    this.questions.forEach((q, idx) => {
      const node = document.getElementById(`letter-node-${idx}`);
      if (q.status === 'ACTIVE' || q.status === 'IDLE') {
        q.status = 'PASSED';
        if (node) node.className = 'letter-node passed';
      }
    });

    sounds.playVictory();
    this.triggerConfetti();

    // Sonuç Karnesini Doldur
    const titleEl = document.getElementById('results-title');
    if (titleEl) titleEl.textContent = reasonTitle;

    const summaryCorrect = document.getElementById('res-correct');
    const summaryWrong = document.getElementById('res-wrong');
    const summaryPass = document.getElementById('res-pass');
    const summaryTime = document.getElementById('res-time');
    const summaryScore = document.getElementById('res-score');

    const remainingPassCount = this.questions.filter(q => q.status === 'PASSED').length;
    const elapsedSeconds = (this.totalDuration < 99999) ? (this.totalDuration - this.remainingTime) : 0;
    
    // Puanlama: Her doğru +100 puan, her yanlış -20 puan
    const totalScore = Math.max(0, (this.correctCount * 100) - (this.wrongCount * 20));

    if (summaryCorrect) summaryCorrect.textContent = this.correctCount;
    if (summaryWrong) summaryWrong.textContent = this.wrongCount;
    if (summaryPass) summaryPass.textContent = remainingPassCount;
    if (summaryTime) summaryTime.textContent = `${elapsedSeconds} sn`;
    if (summaryScore) summaryScore.textContent = `${totalScore} Puan`;

    // Takım modu bilgisi
    const teamRes = document.getElementById('team-results-box');
    if (teamRes) {
      if (this.isTeamMode) {
        teamRes.style.display = 'block';
        const teamAScore = (this.teamScores.A.correct * 100) - (this.teamScores.A.wrong * 20);
        const teamBScore = (this.teamScores.B.correct * 100) - (this.teamScores.B.wrong * 20);
        
        let winnerText = 'Berabere!';
        if (teamAScore > teamBScore) winnerText = '🏆 A Takımı Kazandı!';
        else if (teamBScore > teamAScore) winnerText = '🏆 B Takımı Kazandı!';

        teamRes.innerHTML = `
          <div style="font-weight: 800; font-size: 1.1rem; color: var(--accent-cyan); margin-bottom: 6px;">
            ${winnerText}
          </div>
          <div style="font-size: 0.95rem; color: var(--color-muted);">
            A Takımı: ${this.teamScores.A.correct} D / ${this.teamScores.A.wrong} Y (${teamAScore} Puan)<br>
            B Takımı: ${this.teamScores.B.correct} D / ${this.teamScores.B.wrong} Y (${teamBScore} Puan)
          </div>
        `;
      } else {
        teamRes.style.display = 'none';
      }
    }

    // İnceleme Listesi (Review List)
    this.dom.reviewList.innerHTML = '';
    this.questions.forEach(q => {
      const item = document.createElement('div');
      item.className = 'review-item';

      let statusClass = 'passed';
      if (q.status === 'CORRECT') statusClass = 'correct';
      else if (q.status === 'WRONG') statusClass = 'wrong';

      item.innerHTML = `
        <div class="review-letter ${statusClass}">${q.letter}</div>
        <div class="review-details">
          <div class="review-q">${q.question}</div>
          <div class="review-a">Cevap: <span style="color: var(--accent-cyan);">${q.answer}</span> ${q.userAnswer ? `(Verilen: ${q.userAnswer})` : ''}</div>
        </div>
      `;
      this.dom.reviewList.appendChild(item);
    });

    this.openModal(this.dom.modalResults);
  }

  openModal(modal) {
    if (modal) modal.classList.add('open');
  }

  closeModal(modal) {
    if (modal) modal.classList.remove('open');
  }

  // Kutlama Konfeti Animasyonu
  triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#00f2fe', '#4facfe', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#a855f7'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 150 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleInc: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    let animationFrame;
    let duration = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
      });

      duration++;
      if (duration < 300) {
        animationFrame = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    };

    draw();
  }
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
  window.game = new PassaparolaGame();
});
