/* ==========================================================================
   Dinesh & Kayathri — Royal Wedding Invitation
   Interactive Logic Engine
   ========================================================================== */

(function () {
  'use strict';

  // State Management
  const state = {
    currentSlide: 0,
    totalSlides: 5,
    isScrollMode: false,
    isEnvelopeOpened: false,
    isAudioPlaying: false,
    audioFadeTimer: null,
    wishes: [
      {
        name: "Murugan & Vasanthi",
        relation: "Family",
        message: "May the divine blessings of Lord Swarnapureeswarar be with Dinesh and Kayathri forever. Wishing you a blissful married life! 🌸✨",
        time: "1 hour ago"
      },
      {
        name: "Senthil & Deepa",
        relation: "Uncle & Aunt",
        message: "Heartiest congratulations to the wonderful couple! Excited to celebrate with both families in Koogaiyur! ❤️",
        time: "3 hours ago"
      },
      {
        name: "Karthik & Friends",
        relation: "Friends",
        message: "Cheers to our dearest Dinesh & Kayathri! Super eager for the grand reception and the Brahma Muhurtham festivities! 🎊🥂",
        time: "Yesterday"
      }
    ]
  };

  // DOM Cache
  const dom = {
    envelopeScreen: document.getElementById('envelopeScreen'),
    envelopeBox: document.getElementById('envelopeBox'),
    envelopeWrap: document.getElementById('envelopeWrap'),
    envWaxSeal: document.getElementById('envWaxSeal'),
    sealSparkleBurst: document.getElementById('sealSparkleBurst'),
    envelopeDust: document.getElementById('envelopeDust'),
    replayIntroBtn: document.getElementById('replayIntroBtn'),
    skipIntroBtn: document.getElementById('skipIntroBtn'),
    slidesContainer: document.getElementById('slidesContainer'),
    slideSections: document.querySelectorAll('.slide-section'),
    prevSlideBtn: document.getElementById('prevSlideBtn'),
    nextSlideBtn: document.getElementById('nextSlideBtn'),
    dotsContainer: document.getElementById('dotsContainer'),
    musicToggleBtn: document.getElementById('musicToggleBtn'),
    weddingAudio: document.getElementById('weddingAudio'),
    viewModeBtn: document.getElementById('viewModeBtn'),
    heartRain: document.getElementById('heartRain'),
    
    // Countdown
    cdDays: document.getElementById('cd-days'),
    cdHours: document.getElementById('cd-hours'),
    cdMins: document.getElementById('cd-mins'),
    cdSecs: document.getElementById('cd-secs'),

    // Modals
    wishesModal: document.getElementById('wishesModal'),
    wishesForm: document.getElementById('wishesForm'),
    wishesList: document.getElementById('wishesList'),
    galleryModal: document.getElementById('galleryModal'),
    galleryTrack: document.getElementById('galleryTrack'),
    galleryDots: document.querySelectorAll('.g-dot-item'),
    
    // Confetti
    confettiCanvas: document.getElementById('confettiCanvas')
  };

  // Target Muhurtham Date (15 Nov 2026, 04:30 AM IST: UTC+05:30)
  const MUHURTHAM_TIMESTAMP = new Date('2026-11-15T04:30:00+05:30').getTime();

  /* ==========================================================================
     1. 3D Animated Falling Hearts Engine
     ========================================================================== */
  function initParticleRain() {
    if (!dom.heartRain) return;
    dom.heartRain.innerHTML = '';

    // Color palettes for dimensional 3D wedding hearts
    const heartThemes = [
      // 0: Royal Velvet Maroon & Deep Crimson
      {
        id: 'crimson',
        gradStart: '#FF3366',
        gradMid: '#C2185B',
        gradEnd: '#7A0C24',
        glow: 'rgba(255, 51, 102, 0.45)',
        highlight: 'rgba(255, 255, 255, 0.55)'
      },
      // 1: 24K Rich Metallic Gold
      {
        id: 'gold',
        gradStart: '#FFF6D1',
        gradMid: '#F5C84C',
        gradEnd: '#B8860B',
        glow: 'rgba(245, 200, 76, 0.55)',
        highlight: 'rgba(255, 255, 255, 0.65)'
      },
      // 2: Romantic Rose Gold / Blush
      {
        id: 'rosegold',
        gradStart: '#FFD1DC',
        gradMid: '#E87A90',
        gradEnd: '#A8324F',
        glow: 'rgba(232, 122, 144, 0.4)',
        highlight: 'rgba(255, 255, 255, 0.6)'
      },
      // 3: Vivid Ruby Red
      {
        id: 'ruby',
        gradStart: '#FF5252',
        gradMid: '#D50000',
        gradEnd: '#8B0000',
        glow: 'rgba(255, 82, 82, 0.5)',
        highlight: 'rgba(255, 255, 255, 0.5)'
      }
    ];

    const heartCount = 36;

    for (let i = 0; i < heartCount; i++) {
      const theme = heartThemes[i % heartThemes.length];
      const p = document.createElement('div');
      p.className = 'heart-3d-particle';

      // Dimensions & Depth distribution
      const size = 16 + (i * 9) % 22; // 16px to 38px
      const leftPos = ((i * 19 + 7) % 94); // Spread horizontally
      const duration = 6.5 + (i % 7) * 1.1; // 6.5s to 14.2s
      const delay = -((i * 0.55) % 11); // Stagger so screen is pre-populated
      const drift = (i % 2 === 0 ? 1 : -1) * (20 + (i * 7) % 45); // Lateral sway
      const zDepth = ((i % 5) - 2) * 45; // -90px to +90px translateZ depth
      const maxOp = 0.55 + ((i % 4) * 0.12); // 0.55 to 0.91 opacity
      const rotInit = ((i * 37) % 60) - 30; // -30deg to +30deg
      const rotEnd = ((i * 53) % 90) - 45;

      p.style.left = `${leftPos}%`;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.animationDuration = `${duration}s`;
      p.style.animationDelay = `${delay}s`;
      p.style.setProperty('--drift', `${drift}px`);
      p.style.setProperty('--tz', `${zDepth}px`);
      p.style.setProperty('--max-op', `${maxOp}`);

      // 3D Inner Wrapper for independent 3D tumbling rotation
      const inner = document.createElement('div');
      inner.className = 'heart-3d-inner';
      inner.style.width = '100%';
      inner.style.height = '100%';
      inner.style.animationDuration = `${3.2 + (i % 5) * 0.8}s`;
      inner.style.animationDelay = `${-((i * 0.4) % 4)}s`;
      inner.style.setProperty('--rot-init', `${rotInit}deg`);
      inner.style.setProperty('--rot-end', `${rotEnd}deg`);

      const gradId = `hGrad_${i}_${theme.id}`;
      // High-definition 3D curved SVG heart with glossy bevel highlight
      inner.innerHTML = `
        <svg class="heart-3d-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="${gradId}" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stop-color="${theme.gradStart}"/>
              <stop offset="45%" stop-color="${theme.gradMid}"/>
              <stop offset="100%" stop-color="${theme.gradEnd}"/>
            </radialGradient>
          </defs>
          <!-- 3D Heart Body with Dimensional Radial Lighting -->
          <path d="M16 28.5 C16 28.5 3 20.5 3 10.5 C3 5.5 7 2 11.5 2 C14.2 2 15.5 3.5 16 4.5 C16.5 3.5 17.8 2 20.5 2 C25 2 29 5.5 29 10.5 C29 20.5 16 28.5 16 28.5 Z" 
                fill="url(#${gradId})"/>
          <!-- Top Glossy Specular Bevel Curve -->
          <path d="M6.5 9.5 C6.5 6 9 3.8 11.8 3.8 C13.5 3.8 14.8 4.7 15.5 5.8 C14.5 4.8 13.2 4.2 11.8 4.2 C9.2 4.2 7 6.2 7 9.2 C7 11.2 8 13.5 9.5 15.5 C8 13.5 6.5 11.5 6.5 9.5 Z" 
                fill="${theme.highlight}" opacity="0.6"/>
        </svg>
      `;

      p.appendChild(inner);
      dom.heartRain.appendChild(p);
    }
  }

  /* ==========================================================================
     2. 3D Royal Envelope Unboxing Experience & Cinematic Video-Like Transition
     ========================================================================== */
  let sealAudioCtx = null;
  function playSealCrackSound() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!sealAudioCtx) sealAudioCtx = new AudioContextClass();
      if (sealAudioCtx.state === 'suspended') sealAudioCtx.resume();
      const now = sealAudioCtx.currentTime;

      // Realistic wax parchment crackle & friction
      const bufferSize = Math.floor(sealAudioCtx.sampleRate * 0.14);
      const buffer = sealAudioCtx.createBuffer(1, bufferSize, sealAudioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sealAudioCtx.sampleRate * 0.03));
      }
      const noise = sealAudioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = sealAudioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(2.8, now);
      const gain = sealAudioCtx.createGain();
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(sealAudioCtx.destination);
      noise.start(now);

      // Deep resonant wax snap
      const osc = sealAudioCtx.createOscillator();
      const oscGain = sealAudioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.16);
      oscGain.gain.setValueAtTime(0.12, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      osc.connect(oscGain);
      oscGain.connect(sealAudioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {
      console.warn('Audio sound notice:', e);
    }
  }

  function spawnSealSparkles() {
    const burstContainer = dom.sealSparkleBurst || document.getElementById('sealSparkleBurst');
    if (!burstContainer) return;
    burstContainer.innerHTML = '';
    const sparkles = ['✦', '✨', '✧', '♦', '★', '•'];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const sp = document.createElement('span');
      sp.className = 'seal-sparkle-particle';
      sp.textContent = sparkles[i % sparkles.length];
      const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.3 - 0.15);
      const distance = 40 + Math.random() * 65;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      sp.style.setProperty('--dx', `${dx}px`);
      sp.style.setProperty('--dy', `${dy}px`);
      sp.style.setProperty('--rot', `${Math.random() * 360}deg`);
      sp.style.animationDelay = `${Math.random() * 0.08}s`;
      sp.style.fontSize = `${11 + Math.random() * 10}px`;
      burstContainer.appendChild(sp);
    }
  }

  function initEnvelopeDust() {
    const dustContainer = dom.envelopeDust || document.getElementById('envelopeDust');
    if (!dustContainer) return;
    dustContainer.innerHTML = '';
    const symbols = ['✦', '✧', '•'];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'floating-particle';
      p.textContent = symbols[i % symbols.length];
      p.style.left = `${(i * 17 + 5) % 94}%`;
      p.style.top = `${(i * 21 + 10) % 90}%`;
      p.style.fontSize = `${7 + (i % 4) * 2.5}px`;
      p.style.color = '#fff3c4';
      p.style.opacity = '0.55';
      p.style.animationDuration = `${6 + (i % 5) * 1.5}s`;
      p.style.animationDelay = `${-((i * 0.6) % 8)}s`;
      dustContainer.appendChild(p);
    }
  }

  function openEnvelope() {
    if (state.isEnvelopeOpened) return;
    state.isEnvelopeOpened = true;

    // Stage 1: Tactile Seal Snap & Radiating Sparkle Burst
    playSealCrackSound();
    spawnSealSparkles();
    if (dom.envelopeScreen) {
      dom.envelopeScreen.classList.add('is-opening');
    }

    // Auto-commence auspicious royal wedding celebration music
    if (!state.isAudioPlaying) {
      setTimeout(() => {
        startAudio(true);
      }, 350);
    }

    // Stage 2: 3D Flap Unfolding (Revealing Gold Damask Inside Lining)
    setTimeout(() => {
      if (dom.envelopeBox) {
        dom.envelopeBox.classList.add('is-open');
      }
    }, 240);

    // Stage 3: Letter Glides Out & Camera Executes Cinematic Video Zoom
    setTimeout(() => {
      if (dom.envelopeScreen) {
        dom.envelopeScreen.classList.add('is-zooming');
      }
    }, 850);

    // Stage 4: Seamless Transition directly to Second Page (Main Celebration Slide)
    setTimeout(() => {
      if (dom.envelopeScreen) {
        dom.envelopeScreen.classList.add('opened');
      }

      // Directly show the second page (Slide 1: Dinesh & Kayathri Wedding Celebration)
      goToSlide(1);

      // Trigger grand celebratory gold and rose confetti burst
      triggerGoldConfetti();

      // Set focus to the main celebration heading for accessibility
      const mainHeading = document.querySelector('#slide-1 h2');
      if (mainHeading) mainHeading.focus();
    }, 1850);
  }

  function replayOpeningAnimation() {
    // Reset opening state to replay the video-like envelope experience
    state.isEnvelopeOpened = false;

    // Immediately stop & rewind music when closing the invitation back to envelope
    pauseAudio(true);

    if (dom.envelopeScreen) {
      dom.envelopeScreen.classList.remove('opened', 'is-zooming', 'is-opening');
    }
    if (dom.envelopeBox) {
      dom.envelopeBox.classList.remove('is-open');
    }
    const burstContainer = dom.sealSparkleBurst || document.getElementById('sealSparkleBurst');
    if (burstContainer) {
      burstContainer.innerHTML = '';
    }
    if (dom.slidesContainer) {
      dom.slidesContainer.scrollTop = 0;
    }
  }

  function initEnvelope() {
    initEnvelopeDust();

    if (dom.envelopeWrap) {
      dom.envelopeWrap.addEventListener('click', openEnvelope);
      dom.envelopeWrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openEnvelope();
        }
      });
    }

    if (dom.envWaxSeal) {
      dom.envWaxSeal.addEventListener('click', (e) => {
        e.stopPropagation();
        openEnvelope();
      });
      dom.envWaxSeal.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          openEnvelope();
        }
      });
    }

    if (dom.skipIntroBtn) {
      dom.skipIntroBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEnvelope();
      });
    }

    if (dom.replayIntroBtn) {
      dom.replayIntroBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        replayOpeningAnimation();
      });
    }

    // Expose global replay function
    window.replayOpeningAnimation = replayOpeningAnimation;
  }

  /* ==========================================================================
     3. Story Carousel vs. Continuous Royal Scroll Mode
     ========================================================================== */
  function buildStoryDots() {
    if (!dom.dotsContainer) return;
    dom.dotsContainer.innerHTML = '';
    for (let i = 0; i < state.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = `dot-item ${i === state.currentSlide ? 'active' : ''}`;
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToSlide(i);
        }
      });
      dom.dotsContainer.appendChild(dot);
    }
  }

  function renderSlides() {
    if (state.isScrollMode) return;

    dom.slideSections.forEach((slide, idx) => {
      slide.classList.toggle('active-slide', idx === state.currentSlide);
    });

    const allDots = dom.dotsContainer.querySelectorAll('.dot-item');
    allDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === state.currentSlide);
    });

    if (dom.prevSlideBtn) dom.prevSlideBtn.disabled = state.currentSlide === 0;
    if (dom.nextSlideBtn) dom.nextSlideBtn.disabled = state.currentSlide === state.totalSlides - 1;

    // Scroll inner slide container back to top
    if (dom.slidesContainer) {
      dom.slidesContainer.scrollTop = 0;
    }
  }

  function goToSlide(index) {
    state.currentSlide = Math.max(0, Math.min(state.totalSlides - 1, index));
    renderSlides();

    // If invitation is opened and audio is not playing, start music
    if (state.isEnvelopeOpened && !state.isAudioPlaying && index >= 1) {
      startAudio(true);
    }
  }

  function nextSlide() {
    if (state.currentSlide < state.totalSlides - 1) {
      goToSlide(state.currentSlide + 1);
    }
  }

  function prevSlide() {
    if (state.currentSlide > 0) {
      goToSlide(state.currentSlide - 1);
    }
  }

  function toggleViewMode() {
    state.isScrollMode = !state.isScrollMode;
    document.body.classList.toggle('scroll-mode', state.isScrollMode);

    if (dom.viewModeBtn) {
      dom.viewModeBtn.classList.toggle('active', state.isScrollMode);
      dom.viewModeBtn.setAttribute(
        'data-tip',
        state.isScrollMode ? 'Switch to Story Deck' : 'Switch to Full Page Scroll'
      );
      dom.viewModeBtn.innerHTML = state.isScrollMode
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`;
    }

    if (!state.isScrollMode) {
      renderSlides();
    }
  }

  function initCarouselGestures() {
    buildStoryDots();
    renderSlides();

    if (dom.prevSlideBtn) dom.prevSlideBtn.addEventListener('click', prevSlide);
    if (dom.nextSlideBtn) dom.nextSlideBtn.addEventListener('click', nextSlide);
    if (dom.viewModeBtn) dom.viewModeBtn.addEventListener('click', toggleViewMode);

    // Global navigation triggers from internal buttons (e.g. "View Muhurtham")
    window.goToInvitationSlide = goToSlide;

    // Touch Swipe Gestures
    let startX = 0;
    let startY = 0;

    dom.slidesContainer.addEventListener(
      'touchstart',
      (e) => {
        if (state.isScrollMode) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    dom.slidesContainer.addEventListener(
      'touchend',
      (e) => {
        if (state.isScrollMode) return;
        const diffX = e.changedTouches[0].clientX - startX;
        const diffY = e.changedTouches[0].clientY - startY;

        // Ensure horizontal intent
        if (Math.abs(diffX) > 48 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) nextSlide();
          else prevSlide();
        }
      },
      { passive: true }
    );

    // Keyboard Arrow Keys
    window.addEventListener('keydown', (e) => {
      if (state.isScrollMode || !state.isEnvelopeOpened) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
  }

  /* ==========================================================================
     4. Royal Wedding Celebration Audio Engine (Looped Ambient Music)
     ========================================================================== */
  function updateAudioBtnUI(isPlaying) {
    if (!dom.musicToggleBtn) return;
    if (isPlaying) {
      dom.musicToggleBtn.classList.add('active');
      dom.musicToggleBtn.setAttribute('data-tip', 'Pause Wedding Music');
      dom.musicToggleBtn.setAttribute('aria-label', 'Pause Wedding Music');
    } else {
      dom.musicToggleBtn.classList.remove('active');
      dom.musicToggleBtn.setAttribute('data-tip', 'Play Wedding Music');
      dom.musicToggleBtn.setAttribute('aria-label', 'Play Wedding Music');
    }
  }

  function startAudio(fadeIn = true) {
    let audio = dom.weddingAudio || document.getElementById('weddingAudio');
    if (!audio) {
      audio = document.createElement('audio');
      audio.id = 'weddingAudio';
      audio.src = 'audio/whatsapp-audio-2026-09-25-at-111933-pm_rhyy3XTS.mp3';
      audio.loop = true;
      audio.preload = 'auto';
      audio.setAttribute('playsinline', '');
      document.body.appendChild(audio);
      dom.weddingAudio = audio;
    }

    audio.loop = true;
    if (fadeIn) {
      audio.volume = 0.2;
    } else {
      audio.volume = 1.0;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          state.isAudioPlaying = true;
          updateAudioBtnUI(true);

          if (fadeIn) {
            let vol = 0.2;
            clearInterval(state.audioFadeTimer);
            state.audioFadeTimer = setInterval(() => {
              vol = Math.min(1.0, vol + 0.1);
              if (audio) audio.volume = vol;
              if (vol >= 1.0) clearInterval(state.audioFadeTimer);
            }, 80);
          }
        })
        .catch((err) => {
          console.warn('Audio playback notice (waiting for user interaction):', err);
          state.isAudioPlaying = false;
          updateAudioBtnUI(false);

          // If browser policy blocked playback before first click, attach a one-time gesture unlocker
          const unlockAudio = () => {
            if (!state.isAudioPlaying && state.isEnvelopeOpened) {
              startAudio(true);
            }
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
          };
          window.addEventListener('click', unlockAudio, { once: true });
          window.addEventListener('touchstart', unlockAudio, { once: true });
        });
    }
  }

  function pauseAudio(reset = false) {
    const audio = dom.weddingAudio || document.getElementById('weddingAudio');
    clearInterval(state.audioFadeTimer);
    if (audio) {
      audio.pause();
      if (reset) {
        audio.currentTime = 0;
      }
    }
    state.isAudioPlaying = false;
    updateAudioBtnUI(false);
  }

  function toggleAudio(forcePlay = null) {
    const shouldPlay = forcePlay !== null ? forcePlay : !state.isAudioPlaying;
    if (shouldPlay) {
      startAudio(false);
    } else {
      pauseAudio(false);
    }
  }

  function initAudio() {
    dom.weddingAudio = document.getElementById('weddingAudio');

    if (dom.weddingAudio) {
      dom.weddingAudio.loop = true;
      // Guarantee continuous repeat until invitation is closed
      dom.weddingAudio.addEventListener('ended', () => {
        if (state.isEnvelopeOpened && state.isAudioPlaying) {
          dom.weddingAudio.currentTime = 0;
          dom.weddingAudio.play().catch(() => {});
        }
      });
    }

    if (dom.musicToggleBtn) {
      dom.musicToggleBtn.addEventListener('click', () => toggleAudio());
    }

    // Auto-pause when user leaves tab/window, resume when returning
    document.addEventListener('visibilitychange', () => {
      const audio = dom.weddingAudio || document.getElementById('weddingAudio');
      if (!audio) return;
      if (document.hidden) {
        if (!audio.paused) {
          audio.pause();
        }
      } else {
        if (state.isAudioPlaying && state.isEnvelopeOpened) {
          audio.play().catch(() => {});
        }
      }
    });

    // Pause when user navigates away or closes tab
    window.addEventListener('pagehide', () => {
      const audio = dom.weddingAudio || document.getElementById('weddingAudio');
      if (audio) audio.pause();
    });

    window.addEventListener('beforeunload', () => {
      const audio = dom.weddingAudio || document.getElementById('weddingAudio');
      if (audio) audio.pause();
    });
  }

  /* ==========================================================================
     5. Live Precision Countdown to Brahma Muhurtham
     ========================================================================== */
  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function updateCountdown() {
    const now = Date.now();
    const distance = MUHURTHAM_TIMESTAMP - now;

    if (distance <= 0) {
      if (dom.cdDays) dom.cdDays.textContent = '00';
      if (dom.cdHours) dom.cdHours.textContent = '00';
      if (dom.cdMins) dom.cdMins.textContent = '00';
      if (dom.cdSecs) dom.cdSecs.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (dom.cdDays) dom.cdDays.textContent = pad(days);
    if (dom.cdHours) dom.cdHours.textContent = pad(hours);
    if (dom.cdMins) dom.cdMins.textContent = pad(minutes);
    if (dom.cdSecs) dom.cdSecs.textContent = pad(seconds);
  }

  function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ==========================================================================
     6. Add to Calendar (.ics Generator & Download)
     ========================================================================== */
  const eventDetails = {
    reception: {
      title: "Wedding Reception — Dinesh & Kayathri",
      description: "Join us in celebrating the joyful wedding reception of Dinesh & Kayathri at Senthur Mahal, Koogaiyur.",
      location: "Senthur Mahal, Koogaiyur, Tamil Nadu, India",
      dtstart: "20261114T133000Z", // 14 Nov 2026, 7:00 PM IST (13:30 UTC)
      dtend: "20261114T153000Z"    // 14 Nov 2026, 9:00 PM IST (15:30 UTC)
    },
    muhurtham: {
      title: "Wedding Muhurtham — Dinesh & Kayathri",
      description: "With divine blessings, Dinesh & Kayathri tie the sacred knot during the auspicious Brahma Muhurtham at Sri Swarnapureeswarar Temple, Koogaiyur.",
      location: "Sri Swarnapureeswarar Temple, Koogaiyur, Tamil Nadu, India",
      dtstart: "20261114T230000Z", // 15 Nov 2026, 4:30 AM IST (23:00 UTC 14th)
      dtend: "20261115T003000Z"    // 15 Nov 2026, 6:00 AM IST (00:30 UTC 15th)
    }
  };

  function downloadCalendarFile(eventType) {
    const ev = eventDetails[eventType];
    if (!ev) return;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Dinesh and Kayathri//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${ev.title}`,
      `DESCRIPTION:${ev.description}`,
      `LOCATION:${ev.location}`,
      `DTSTART:${ev.dtstart}`,
      `DTEND:${ev.dtend}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `dinesh-kayathri-${eventType}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }

  window.downloadIcsEvent = downloadCalendarFile;

  /* ==========================================================================
     7. Interactive Wishes Wall & Guestbook
     ========================================================================== */
  function loadStoredWishes() {
    try {
      const stored = localStorage.getItem('dinesh_kayathri_wishes');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.wishes = parsed;
        }
      }
    } catch (e) {
      console.warn('Wishes storage load issue:', e);
    }
    renderWishesWall();
  }

  function saveWishesToStorage() {
    try {
      localStorage.setItem('dinesh_kayathri_wishes', JSON.stringify(state.wishes));
    } catch (e) {
      console.warn('Wishes storage save issue:', e);
    }
  }

  function renderWishesWall() {
    if (!dom.wishesList) return;
    dom.wishesList.innerHTML = '';

    state.wishes.forEach((item) => {
      const bubble = document.createElement('div');
      bubble.className = 'wish-bubble';
      bubble.innerHTML = `
        <div class="wish-header">
          <span class="wish-author">${escapeHtml(item.name)}</span>
          <span class="wish-relation">${escapeHtml(item.relation || 'Guest')}</span>
        </div>
        <p class="wish-msg">${escapeHtml(item.message)}</p>
      `;
      dom.wishesList.appendChild(bubble);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function openWishesModal() {
    if (dom.wishesModal) {
      dom.wishesModal.classList.add('is-active');
      const input = dom.wishesModal.querySelector('input');
      if (input) setTimeout(() => input.focus(), 150);
    }
  }

  function closeWishesModal() {
    if (dom.wishesModal) {
      dom.wishesModal.classList.remove('is-active');
    }
  }

  function showToast(message, icon) {
    icon = icon || '💌';
    let toast = document.getElementById('weddingToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'weddingToast';
      toast.className = 'wedding-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<span class="toast-icon">' + icon + '</span><span class="toast-text">' + message + '</span>';
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  function handleWishesSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('wishAuthorName');
    const relationInput = document.getElementById('wishAuthorRelation');
    const msgInput = document.getElementById('wishMessageText');
    const submitBtn = document.getElementById('wishSubmitBtn') || (dom.wishesForm ? dom.wishesForm.querySelector('button[type="submit"]') : null);

    const name = nameInput ? nameInput.value.trim() : '';
    const relation = relationInput ? relationInput.value.trim() : 'Well-wisher';
    const message = msgInput ? msgInput.value.trim() : '';

    if (!name || !message) return;

    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Wishes & Blessings ♥';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Your Blessings... ✨';
    }

    // Add to state and render immediately on Wishes Wall
    state.wishes.unshift({
      name,
      relation: relation || 'Well-wisher',
      message,
      time: 'Just now'
    });

    saveWishesToStorage();
    renderWishesWall();

    // Destination email specified by user
    const targetEmail = 'kalaidinesh1999@gmail.com';
    const mailSubject = '💍 Wedding Blessing from ' + name + ' (' + (relation || 'Guest') + ')!';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 1. Silent background dispatch to kalaidinesh1999@gmail.com via FormSubmit service
    try {
      fetch('https://formsubmit.co/ajax/' + targetEmail, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: mailSubject,
          _template: 'table',
          _captcha: 'false',
          'Sender / Guest Name': name,
          'Relationship': relation || 'Well-wisher',
          'Wedding Blessings & Wishes': message,
          'Occasion': 'Dinesh & Kayathri Wedding (14 & 15 Nov 2026)',
          'Sent At': timestamp
        })
      }).then(res => res.json())
        .then(data => console.log('Email successfully dispatched to ' + targetEmail, data))
        .catch(err => console.warn('Background mail dispatch notice:', err));
    } catch (err) {
      console.warn('Mail send error:', err);
    }

    // 2. Mailto fallback for native email client / Gmail
    const mailBodyText = 'Dear Dinesh & Kayathri,\n\nHeartiest congratulations on your auspicious wedding celebration!\n\nHere are our heartfelt blessings:\n"' + message + '"\n\nWith love and best wishes,\n' + name + ' (' + (relation || 'Well-wisher') + ')\n\n---\nSent from Dinesh & Kayathri Wedding Invitation';
    const mailtoUrl = 'mailto:' + targetEmail + '?subject=' + encodeURIComponent(mailSubject) + '&body=' + encodeURIComponent(mailBodyText);

    try {
      const a = document.createElement('a');
      a.href = mailtoUrl;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { if (a.parentNode) a.parentNode.removeChild(a); }, 1000);
    } catch (_) {}

    // 3. Close modal, trigger gold celebratory confetti, reset form
    closeWishesModal();
    triggerGoldConfetti();

    if (dom.wishesForm) dom.wishesForm.reset();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    // 4. Show confirmation toast
    showToast('Thank you! Your heartfelt blessings have been sent & shared.', '💌');
  }

  function initWishes() {
    loadStoredWishes();
    window.openWishesModal = openWishesModal;
    window.closeWishesModal = closeWishesModal;

    if (dom.wishesForm) {
      dom.wishesForm.addEventListener('submit', handleWishesSubmit);
    }

    // Modal background click to close
    if (dom.wishesModal) {
      dom.wishesModal.addEventListener('click', (e) => {
        if (e.target === dom.wishesModal) closeWishesModal();
      });
    }
  }

  /* ==========================================================================
     8. Celebratory Gold Confetti Cannon
     ========================================================================== */
  function triggerGoldConfetti() {
    if (!dom.confettiCanvas) return;
    const canvas = dom.confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#d4af37', '#fff1b8', '#8c6a23', '#540e1c', '#ffffff', '#e9d28a'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.7,
        r: Math.random() * 6 + 3,
        d: Math.random() * 90,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
        vx: (Math.random() - 0.5) * 14,
        vy: -(Math.random() * 14 + 6),
        gravity: 0.28,
        alpha: 1
      });
    }

    let animationId = null;
    let frames = 0;

    function renderConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= 0.008;

        if (p.alpha > 0) {
          activeCount++;
          ctx.save();
          ctx.beginPath();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.lineWidth = p.r / 2;
          ctx.strokeStyle = p.color;
          ctx.fillStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
          ctx.stroke();
          ctx.restore();
        }
      });

      frames++;
      if (activeCount > 0 && frames < 180) {
        animationId = requestAnimationFrame(renderConfetti);
      } else {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    renderConfetti();
  }

  /* ==========================================================================
     9. Invitation Card Lightbox Gallery
     ========================================================================== */
  function openGalleryModal() {
    if (dom.galleryModal) {
      dom.galleryModal.classList.add('is-active');
      switchCardSlide(0);
    }
  }

  function closeGalleryModal() {
    if (dom.galleryModal) {
      dom.galleryModal.classList.remove('is-active');
      const zoom0 = document.getElementById('zoomContainer0');
      const zoom1 = document.getElementById('zoomContainer1');
      if (zoom0) zoom0.classList.remove('is-zoomed');
      if (zoom1) zoom1.classList.remove('is-zoomed');
      const l0 = document.getElementById('zoomLabel0');
      const l1 = document.getElementById('zoomLabel1');
      if (l0) l0.textContent = 'Zoom';
      if (l1) l1.textContent = 'Zoom';
    }
  }

  function switchCardSlide(idx) {
    if (!dom.galleryTrack) return;
    const itemWidth = dom.galleryTrack.clientWidth;
    dom.galleryTrack.scrollTo({ left: idx * itemWidth, behavior: 'smooth' });
    updateGalleryDots(idx);
    updateCardTabs(idx);
  }

  function updateCardTabs(idx) {
    const tab0 = document.getElementById('cardTab0');
    const tab1 = document.getElementById('cardTab1');
    if (tab0 && tab1) {
      tab0.classList.toggle('active', idx === 0);
      tab1.classList.toggle('active', idx === 1);
    }
  }

  function updateGalleryDots(activeIdx) {
    const dots = document.querySelectorAll('.g-dot-item');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIdx);
    });
  }

  function toggleCardZoom(idx) {
    const container = document.getElementById('zoomContainer' + idx);
    const label = document.getElementById('zoomLabel' + idx);
    if (!container) return;
    const isZoomed = container.classList.toggle('is-zoomed');
    if (label) {
      label.textContent = isZoomed ? 'Reset' : 'Zoom';
    }
  }

  function initGallery() {
    window.openGalleryModal = openGalleryModal;
    window.closeGalleryModal = closeGalleryModal;
    window.switchCardSlide = switchCardSlide;
    window.toggleCardZoom = toggleCardZoom;

    if (dom.galleryModal) {
      dom.galleryModal.addEventListener('click', (e) => {
        if (e.target === dom.galleryModal) closeGalleryModal();
      });
    }

    if (dom.galleryTrack) {
      dom.galleryTrack.addEventListener('scroll', () => {
        const itemWidth = dom.galleryTrack.clientWidth;
        if (itemWidth > 0) {
          const idx = Math.round(dom.galleryTrack.scrollLeft / itemWidth);
          updateGalleryDots(idx);
          updateCardTabs(idx);
        }
      }, { passive: true });
    }
  }

  /* ==========================================================================
     10. Utility: Copy Address & Direct Share
     ========================================================================== */
  function copyVenueAddress(addressText, buttonEl) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(addressText).then(() => {
        const originalText = buttonEl.textContent;
        buttonEl.textContent = "Copied! ✓";
        setTimeout(() => {
          buttonEl.textContent = originalText;
        }, 2200);
      });
    }
  }

  window.copyVenueAddress = copyVenueAddress;

  /* ==========================================================================
     11. Preview & Suggestion / Feedback Logic
     ========================================================================== */
  const feedbackState = {
    rating: 5,
    selectedTags: [],
    groomPhone: "919942268549",
    bridePhone: "918870851124"
  };

  function togglePreviewBanner(show) {
    const banner = document.getElementById('previewFeedbackBanner');
    const trigger = document.getElementById('previewFloatingTrigger');
    if (!banner) return;
    if (show) {
      banner.classList.remove('is-hidden');
      document.body.classList.add('has-preview-banner');
      if (trigger) trigger.style.display = 'none';
    } else {
      banner.classList.add('is-hidden');
      document.body.classList.remove('has-preview-banner');
      if (trigger) trigger.style.display = 'inline-flex';
    }
  }

  function openFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
      modal.classList.add('is-active');
      const input = document.getElementById('reviewerName');
      if (input) input.focus();
    }
  }

  function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) modal.classList.remove('is-active');
  }

  function toggleFeedbackTag(btn, tagText) {
    btn.classList.toggle('active');
    const isAct = btn.classList.contains('active');
    const textarea = document.getElementById('reviewerComments');
    if (isAct) {
      if (!feedbackState.selectedTags.includes(tagText)) {
        feedbackState.selectedTags.push(tagText);
      }
      if (textarea && !textarea.value.includes(tagText)) {
        const cur = textarea.value.trim();
        textarea.value = cur ? (cur + "\n• " + tagText) : ("• " + tagText);
      }
    } else {
      feedbackState.selectedTags = feedbackState.selectedTags.filter(t => t !== tagText);
    }
  }

  function setStarRating(val) {
    feedbackState.rating = val;
    const stars = document.querySelectorAll('.star-btn');
    stars.forEach(s => {
      const v = parseInt(s.getAttribute('data-val') || '0', 10);
      s.classList.toggle('active', v <= val);
    });
    const labels = {
      1: "1 / 5 — Needs adjustments",
      2: "2 / 5 — Fair, some corrections needed",
      3: "3 / 5 — Good, with a few suggestions",
      4: "4 / 5 — Very nice!",
      5: "5 / 5 — Loved it! Absolutely royal!"
    };
    const labelEl = document.getElementById('starLabelText');
    if (labelEl) {
      labelEl.textContent = labels[val] || (val + " / 5");
    }
  }

  function buildFeedbackMessage() {
    const nameInput = document.getElementById('reviewerName');
    const relInput = document.getElementById('reviewerRelation');
    const commentInput = document.getElementById('reviewerComments');

    const name = (nameInput && nameInput.value.trim()) || "A Well-wisher";
    const relation = (relInput && relInput.value.trim()) || "";
    const comments = (commentInput && commentInput.value.trim()) || "Everything looks wonderful!";
    
    let msg = "🌸 *Wedding Invitation Feedback — Dinesh & Kayathri* 🌸\n";
    msg += "👤 *From:* " + name + (relation ? " (" + relation + ")" : "") + "\n";
    msg += "⭐ *Impression:* " + feedbackState.rating + "/5 Stars\n";
    
    if (feedbackState.selectedTags.length > 0) {
      msg += "\n📋 *Key Points:*\n";
      feedbackState.selectedTags.forEach(t => {
        msg += "• " + t + "\n";
      });
    }
    
    msg += "\n💬 *Suggestions & Remarks:*\n" + comments + "\n";
    msg += "\n— Sent from Wedding Invitation Interactive Preview ✨";
    return msg;
  }

  function handleSendFeedback(e, targetPerson) {
    if (e && e.preventDefault) e.preventDefault();
    targetPerson = targetPerson || 'dinesh';
    
    const nameInput = document.getElementById('reviewerName');
    const name = nameInput ? nameInput.value.trim() : '';
    if (!name) {
      alert("Please enter your name so Dinesh & Kayathri know who provided the suggestion!");
      if (nameInput) nameInput.focus();
      return;
    }

    const message = buildFeedbackMessage();
    const phone = targetPerson === 'kayathri' ? feedbackState.bridePhone : feedbackState.groomPhone;
    const waUrl = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
    
    window.open(waUrl, '_blank');
    closeFeedbackModal();
  }

  function openDirectWhatsAppFeedback() {
    const defaultMsg = "Hi Dinesh & Kayathri! 🌸 I reviewed your wedding invitation draft preview.\n\nHere are my suggestions & feedback:\n";
    const waUrl = "https://wa.me/" + feedbackState.groomPhone + "?text=" + encodeURIComponent(defaultMsg);
    window.open(waUrl, '_blank');
  }

  function copyFeedbackText() {
    const nameInput = document.getElementById('reviewerName');
    const name = nameInput ? nameInput.value.trim() : '';
    if (!name) {
      alert("Please enter your name first!");
      if (nameInput) nameInput.focus();
      return;
    }
    const message = buildFeedbackMessage();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message).then(() => {
        const btn = document.getElementById('copyFeedbackBtnText');
        if (btn) {
          const prev = btn.textContent;
          btn.textContent = "Copied! ✓";
          setTimeout(() => { btn.textContent = prev; }, 2500);
        }
      });
    }
  }

  function initPreviewFeedback() {
    window.togglePreviewBanner = togglePreviewBanner;
    window.openFeedbackModal = openFeedbackModal;
    window.closeFeedbackModal = closeFeedbackModal;
    window.toggleFeedbackTag = toggleFeedbackTag;
    window.setStarRating = setStarRating;
    window.handleSendFeedback = handleSendFeedback;
    window.openDirectWhatsAppFeedback = openDirectWhatsAppFeedback;
    window.copyFeedbackText = copyFeedbackText;

    document.body.classList.add('has-preview-banner');
    const modal = document.getElementById('feedbackModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeFeedbackModal();
      });
    }
  }

  /* ==========================================================================
     Initialization Entrypoint
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initParticleRain();
    initEnvelope();
    initCarouselGestures();
    initAudio();
    initCountdown();
    initWishes();
    initGallery();
    initPreviewFeedback();
  });

})();

