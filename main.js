const state = { scene: 'login', storyStep: 'intro', cottonDragging: false, dropInProgress: false, fluffLevel: 0, outfitStep: 0, outfitUnlocked: false, polishedRevealComplete: false, outfitDragging: null, outfitDropInProgress: false, memoryAdded: false, memoryUnlocked: false, memoryDragging: false, memoryDropInProgress: false, glassesAdded: false, glassesUnlocked: false, glassesDragging: false, glassesDropInProgress: false, finalRevealComplete: false, reunionReady: false, photoModeStarted: false, photoCaptured: false, photoDataUrl: null, photoAttachedToBoard: false, pointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 }, kitty: { x: 0, y: 0, targetX: 0, targetY: 0, rotation: 0 } };

const loginScene = document.querySelector('#login-scene');
const craftScene = document.querySelector('#craft-scene');
const loginForm = document.querySelector('#login-form');
const feedback = document.querySelector('#login-feedback');
const kitty = document.querySelector('#kitty');
const plush = document.querySelector('.plush');
const cotton = document.querySelector('.cotton');
const craftTable = document.querySelector('.craft-table');
const caption = document.querySelector('#object-caption');
const fluffProgress = document.querySelector('#fluff-progress');
const fluffFeedback = document.querySelector('#fluff-feedback');
const fluffParticles = document.querySelector('#fluff-particles');
const storyContent = document.querySelector('#story-content');
const storyButton = document.querySelector('#dialogue-button');
const statusChip = document.querySelector('.status-chip');
const groupStage = document.querySelector('#group-photo-stage');
const groupParticles = document.querySelector('#group-particles');
const countdownOverlay = document.querySelector('#countdown-overlay');
const cameraFlash = document.querySelector('#camera-flash');
const photoPreview = document.querySelector('#photo-preview');
const boardPhotoSlot = document.querySelector('#board-photo-slot');
const shutterAudio = document.querySelector('#shutter-audio');
const wardrobeTray = document.querySelector('#wardrobe-tray');
const workpieceBubble = document.querySelector('#workpiece-bubble');
const memoryCharm = document.querySelector('.memory-charm');
const glassesPiece = document.querySelector('.glasses-piece');
const charmOverlay = document.querySelector('.charm-overlay');
const glassesOverlay = document.querySelector('.glasses-overlay');
const memoryStatus = document.querySelector('[data-build="memory"]');
const outfitPieces = [...document.querySelectorAll('.outfit-piece')];
const finalBirthdayPhoto = 'assets/reference/birthday-photo-mode-reference.png';
const loginButton = loginForm.querySelector('button');
const reunionSlots = {
  tiffany: { left: '32%', top: '66%' },
  janice: { left: '50%', top: '57%' },
  cyris: { left: '54%', top: '66%' },
  norris: { left: '70%', top: '66%' },
};

function applyReunionSlots() {
  Object.entries(reunionSlots).forEach(([name, position]) => {
    const member = document.querySelector(`.reunion-${name}`);
    member.style.setProperty('--reunion-left', position.left);
    member.style.setProperty('--reunion-top', position.top);
  });
}

applyReunionSlots();

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const day = document.querySelector('#day').value.trim();
  const month = document.querySelector('#month').value.trim();
  if (day === '24' && month === '08') {
    feedback.textContent = 'ACCESS GRANTED · Hello, Janice.';
    feedback.style.color = '#45855c';
    feedback.classList.remove('is-error');
    setTimeout(() => {
      loginScene.hidden = true;
      craftScene.hidden = false;
      state.scene = 'craft';
      loginButton.textContent = 'UNLOCK THE ROOM';
      feedback.replaceChildren();
      setKittyTarget(state.pointer);
      document.querySelector('#dialogue-button').focus();
    }, 500);
  } else {
    feedback.innerHTML = '<strong>Oops ♡</strong><span>好似未啱喎。<br />再試下 Janice 個生日？</span>';
    feedback.classList.add('is-error');
    feedback.style.color = '';
    loginButton.textContent = 'TRY AGAIN';
  }
});

storyButton.addEventListener('click', () => {
  if (state.storyStep === 'intro') {
    state.storyStep = 'step1';
    activateFluffMission();
    renderStory('step1');
  } else if (state.storyStep === 'step1') {
    activateFluffMission();
    storyButton.disabled = true;
    storyButton.textContent = 'FLUFFING...';
  } else if (state.storyStep === 'step2') {
    activateOutfitKit();
    storyButton.disabled = true;
    storyButton.textContent = 'OUTFIT KIT OPEN';
  } else if (state.storyStep === 'step3') {
    activateMemoryMission();
    storyButton.disabled = true;
    storyButton.textContent = 'MEMORY READY';
  } else if (state.storyStep === 'step4') {
    activateGlassesMission();
    storyButton.disabled = true;
    storyButton.textContent = 'GLASSES READY';
  } else if (state.storyStep === 'complete') {
    startReunion();
  } else if (state.storyStep === 'group-ready') {
    startPhotoMode();
  } else if (state.storyStep === 'photo-saved') {
    downloadPhoto();
    renderStory('birthday-saved');
  } else if (state.storyStep === 'birthday-saved') {
    window.location.reload();
  }
  document.querySelector('.dialogue').classList.add('dialogue-acknowledged');
});

function renderStory(step) {
  const stories = {
    step1: { title: 'STEP 1', heading: 'MAKE IT FLUFFY ♡', body: '好似仲差啲手感……<br />幫我加啲棉花，<br />整到佢夠 fluffy 先。', button: "LET'S FLUFF IT" },
    step2: { title: 'STEP 2', heading: 'DRESS HER UP ♡', body: '淨係 fluffy 好似仲差少少。<br />幫佢襯返套衫，<br />睇落完整啲先。', button: 'OPEN THE OUTFIT KIT' },
    step3: { title: 'STEP 3', heading: 'ADD A LITTLE MEMORY ♡', body: '之前整過嘅一啲小手作，<br />大家其實都有記得。<br /><br />有時令人記得嘅，<br />未必係件嘢本身，<br />而係當中嗰份心機 ♡', button: 'ADD THE MEMORY' },
    step4: { title: 'STEP 4', heading: 'ONE LAST THING ♡', body: '仲有最後一樣。<br /><br />加埋佢，<br />就真係齊晒喇。', button: 'SHOW ME' },
    complete: { title: 'JANICE EDITION', heading: 'COMPLETE ♡', body: 'Fluffy. Handmade. Ready.<br /><br />But...<br /><br />好似仲差咗啲人。', button: "WHO'S MISSING?" },
    'group-ready': { title: 'GT BATCH READY ♡', heading: '好喇，人齊喇。', body: '不如影張相，<br />留住呢個生日 moment？', button: 'TAKE THE PHOTO' },
    'photo-saved': { title: 'PHOTO SAVED ♡', heading: '影到喇。', body: '呢張要留低先得♡', button: 'SAVE PHOTO' },
    'birthday-saved': { title: 'BIRTHDAY SAVED ♡', heading: '今日呢份心思，收好喇。', body: 'Happy Birthday, Janice ♡<br />GT Batch · 2026', button: 'PLAY AGAIN' },
  };
  const story = stories[step];
  const storyPanel = document.querySelector('.dialogue');
  storyPanel.classList.add('story-switching');
  storyContent.innerHTML = `<p class="story-step">${story.title}</p><h3>${story.heading}</h3><div class="story-body">${story.body}</div>`;
  storyButton.textContent = story.button;
  storyButton.disabled = false;
  state.storyStep = step;
  setTimeout(() => storyPanel.classList.remove('story-switching'), 180);
}

function activateFluffMission() {
  cotton.classList.remove('mission-locked');
}

function activateOutfitKit() {
  if (state.outfitUnlocked) return;
  state.outfitUnlocked = true;
  outfitPieces.forEach((piece) => {
    piece.hidden = false;
    piece.classList.toggle('is-active', piece.dataset.piece === 'dress');
    piece.classList.toggle('is-locked', piece.dataset.piece !== 'dress');
  });
}

function activateMemoryMission() {
  if (state.memoryUnlocked) return;
  state.memoryUnlocked = true;
  memoryCharm.classList.remove('mission-locked');
  memoryCharm.classList.add('charm-active');
}

function activateGlassesMission() {
  if (state.glassesUnlocked) return;
  state.glassesUnlocked = true;
  glassesPiece.hidden = false;
  glassesPiece.classList.remove('mission-locked');
  glassesPiece.classList.add('glasses-revealed');
}

function setKittyTarget(event) {
  if (state.scene !== 'craft') return;
  const bounds = craftScene.getBoundingClientRect();
  const clientX = event.clientX ?? event.x;
  const clientY = event.clientY ?? event.y;
  state.kitty.targetX = clientX - bounds.left;
  state.kitty.targetY = clientY - bounds.top;
}
document.addEventListener('pointermove', (event) => {
  state.pointer = { x: event.clientX, y: event.clientY };
  if (state.scene === 'craft') {
    const uiTarget = event.target.closest?.('.dialogue, .dialogue *, .room-header, .room-header *, .status-chip, .status-chip *');
    kitty.classList.toggle('ui-hover', Boolean(uiTarget));
  }
});
craftScene.addEventListener('pointermove', setKittyTarget);

function animateKitty() {
  const kittyState = state.kitty;
  const previousX = kittyState.x;
  kittyState.x = kittyState.targetX;
  kittyState.y = kittyState.targetY;
  const direction = kittyState.x - previousX;
  kittyState.rotation += ((Math.max(-5, Math.min(5, direction * 2.2))) - kittyState.rotation) * 0.12;
  kitty.style.left = `${kittyState.x}px`;
  kitty.style.top = `${kittyState.y}px`;
  kitty.style.transform = `translate(-49%, -45.5%) scale(var(--kitty-scale, 1)) rotate(${kittyState.rotation}deg)`;
  requestAnimationFrame(animateKitty);
}
animateKitty();

document.querySelectorAll('.interactive').forEach((object) => {
  object.addEventListener('mouseenter', () => { caption.textContent = object.dataset.caption || ''; });
  object.addEventListener('mouseleave', () => { caption.textContent = ''; });
});

cotton.addEventListener('pointerdown', (event) => {
  if (state.fluffLevel >= 3 || state.dropInProgress) return;
  event.preventDefault();
  state.cottonDragging = true;
  cotton.setPointerCapture(event.pointerId);
  cotton.classList.add('dragging', 'is-dragging');
});
cotton.addEventListener('pointermove', (event) => {
  if (!state.cottonDragging) return;
  const bounds = craftScene.getBoundingClientRect();
  cotton.style.left = `${((event.clientX - bounds.left) / bounds.width) * 100 - 5}%`;
  cotton.style.top = `${((event.clientY - bounds.top) / bounds.height) * 100 - 10}%`;
});
cotton.addEventListener('pointerup', () => {
  if (!state.cottonDragging) return;
  state.cottonDragging = false;
  cotton.classList.remove('dragging');
  const cottonBox = cotton.getBoundingClientRect();
  const plushBox = plush.getBoundingClientRect();
  const overlaps = cottonBox.left < plushBox.right && cottonBox.right > plushBox.left && cottonBox.top < plushBox.bottom && cottonBox.bottom > plushBox.top;
  if (overlaps) {
    state.dropInProgress = true;
    const tableBox = craftTable.getBoundingClientRect();
    cotton.style.left = `${plushBox.left + plushBox.width / 2 - tableBox.left - cottonBox.width / 2}px`;
    cotton.style.top = `${plushBox.top + plushBox.height / 2 - tableBox.top - cottonBox.height / 2}px`;
    cotton.classList.add('cotton-settling');
    setTimeout(() => {
      cotton.classList.remove('cotton-settling', 'is-dragging');
      if (state.fluffLevel >= 3) return;
      state.fluffLevel += 1;
      updateFluffProgress();
      updateLaptopState();
      plush.classList.add('fluff-puff', `fluff-stage-${state.fluffLevel}`);
      spawnFluffParticles(state.fluffLevel);
      setTimeout(() => plush.classList.remove('fluff-puff'), 420);
       fluffFeedback.classList.add('show');
       fluffFeedback.classList.remove('complete');
       fluffFeedback.innerHTML = '<strong>♡ MAKING IT FLUFFY...</strong>';
       if (state.fluffLevel === 3) {
         fluffFeedback.classList.add('complete');
         fluffFeedback.innerHTML = '<strong>FLUFFY &amp; READY! ♡</strong><span>好，呢個柔軟度終於啱喇。</span>';
         document.querySelector('#plush-label').textContent = '';
        cotton.disabled = true;
        cotton.style.left = '';
        cotton.style.top = '';
        cotton.style.opacity = '0';
         setTimeout(startDressUp, 700);
      } else {
        cotton.style.left = '';
        cotton.style.top = '';
        cotton.style.opacity = '1';
      }
      state.dropInProgress = false;
    }, 260);
  } else {
    cotton.classList.remove('is-dragging');
  }
});

function startDressUp() {
  fluffFeedback.replaceChildren();
  fluffFeedback.classList.remove('show', 'complete');
  renderStory('step2');
}

function updateOutfitProgress() {
  [...fluffProgress.children].forEach((indicator, index) => {
    indicator.textContent = index < state.outfitStep ? '♡' : '○';
    indicator.classList.toggle('filled', index < state.outfitStep);
  });
}

function snapOutfitPiece(piece) {
  const tableBox = craftTable.getBoundingClientRect();
  const plushBox = plush.getBoundingClientRect();
  const pieceBox = piece.getBoundingClientRect();
  const offsets = { dress: .75, collar: .64, pocket: .83 };
  const left = plushBox.left + plushBox.width / 2 - pieceBox.width / 2 - tableBox.left;
  const top = plushBox.top + plushBox.height * offsets[piece.dataset.piece] - pieceBox.height / 2 - tableBox.top;
  piece.style.left = `${left}px`;
  piece.style.top = `${top}px`;
}

function spawnStitchParticles(piece) {
  piece.classList.add('stitching');
  setTimeout(() => piece.classList.remove('stitching'), 420);
}

outfitPieces.forEach((piece) => {
  piece.addEventListener('pointerdown', (event) => {
    if (!piece.classList.contains('is-active') || state.outfitDropInProgress) return;
    event.preventDefault();
    state.outfitDragging = piece;
    piece.setPointerCapture(event.pointerId);
    piece.classList.add('is-dragging');
  });
  piece.addEventListener('pointermove', (event) => {
    if (state.outfitDragging !== piece) return;
    const tableBox = craftTable.getBoundingClientRect();
    piece.style.left = `${event.clientX - tableBox.left - piece.offsetWidth / 2}px`;
    piece.style.top = `${event.clientY - tableBox.top - piece.offsetHeight / 2}px`;
  });
  piece.addEventListener('pointerup', () => {
    if (state.outfitDragging !== piece) return;
    state.outfitDragging = null;
    piece.classList.remove('is-dragging');
    const pieceBox = piece.getBoundingClientRect();
    const plushBox = plush.getBoundingClientRect();
    const overlaps = pieceBox.left < plushBox.right && pieceBox.right > plushBox.left && pieceBox.top < plushBox.bottom && pieceBox.bottom > plushBox.top;
    if (!overlaps) return;
    state.outfitDropInProgress = true;
    state.outfitStep = Math.min(3, state.outfitStep + 1);
    snapOutfitPiece(piece);
    piece.classList.add('placed');
    piece.classList.remove('is-active');
    piece.disabled = true;
    spawnStitchParticles(piece);
    fluffFeedback.textContent = 'Stitching...';
    plush.classList.add('fluff-puff');
    setTimeout(() => {
      plush.classList.remove('fluff-puff');
      updateOutfitProgress();
      if (state.outfitStep === 3) {
        fluffFeedback.textContent = '';
        spawnFluffParticles(3);
        setTimeout(() => {
          plush.classList.add('polished-reveal');
          setTimeout(() => {
            outfitPieces.forEach((outfitPiece) => outfitPiece.classList.add('reveal-hidden'));
            state.polishedRevealComplete = true;
            updateLaptopState();
            startCharmStep();
          }, 420);
          wardrobeTray.classList.add('tray-collapsed');
        }, 40);
      } else {
        const nextPiece = outfitPieces[state.outfitStep];
        nextPiece.classList.remove('is-locked');
        nextPiece.classList.add('is-active');
      }
      state.outfitDropInProgress = false;
    }, 420);
  });
});

function startCharmStep() {
  renderStory('step3');
  workpieceBubble.classList.remove('show');
  memoryCharm.classList.add('mission-locked');
  updateLaptopState();
}

function updateCharmTarget(event) {
  const tableBox = craftTable.getBoundingClientRect();
  memoryCharm.style.left = `${event.clientX - tableBox.left - memoryCharm.offsetWidth / 2}px`;
  memoryCharm.style.top = `${event.clientY - tableBox.top - memoryCharm.offsetHeight / 2}px`;
  const croissantBox = memoryCharm.getBoundingClientRect();
  const plushBox = plush.getBoundingClientRect();
  const overlaps = croissantBox.left < plushBox.right && croissantBox.right > plushBox.left && croissantBox.top < plushBox.bottom && croissantBox.bottom > plushBox.top;
  plush.classList.toggle('charm-target', overlaps);
}

memoryCharm.addEventListener('pointerdown', (event) => {
  if (!state.memoryUnlocked || state.memoryAdded || state.memoryDropInProgress) return;
  event.preventDefault();
  state.memoryDragging = true;
  workpieceBubble.classList.remove('show');
  memoryCharm.setPointerCapture(event.pointerId);
  memoryCharm.classList.add('is-dragging');
});
memoryCharm.addEventListener('pointermove', (event) => {
  if (!state.memoryDragging) return;
  updateCharmTarget(event);
});
memoryCharm.addEventListener('pointerup', () => {
  if (!state.memoryDragging) return;
  state.memoryDragging = false;
  memoryCharm.classList.remove('is-dragging');
  const croissantBox = memoryCharm.getBoundingClientRect();
  const plushBox = plush.getBoundingClientRect();
  const validDrop = croissantBox.left < plushBox.right && croissantBox.right > plushBox.left && croissantBox.top < plushBox.bottom && croissantBox.bottom > plushBox.top;
  plush.classList.remove('charm-target');
  if (!validDrop) return;
  state.memoryDropInProgress = true;
  const tableBox = craftTable.getBoundingClientRect();
  const targetX = plushBox.left + plushBox.width * .62 - tableBox.left - croissantBox.width * .07;
  const targetY = plushBox.top + plushBox.height * .62 - tableBox.top - croissantBox.height * .07;
  memoryCharm.style.left = `${targetX}px`;
  memoryCharm.style.top = `${targetY}px`;
  memoryCharm.classList.add('charm-absorbing');
  setTimeout(() => {
    state.memoryAdded = true;
    state.memoryDropInProgress = false;
    memoryCharm.classList.remove('charm-absorbing', 'charm-active');
    memoryCharm.classList.add('charm-attached');
    memoryCharm.style.opacity = '0';
    charmOverlay.classList.add('show');
    memoryStatus.textContent = '✓ MEMORY';
    memoryStatus.classList.add('is-complete');
    updateLaptopState();
    spawnFluffParticles(3);
    workpieceBubble.querySelector('strong').textContent = 'MEMORY ADDED ♡';
    workpieceBubble.querySelector('span').innerHTML = '有啲細細嘅回憶，<br />原來大家都記得 ♡';
    workpieceBubble.classList.add('show');
    setTimeout(() => workpieceBubble.classList.remove('show'), 2500);
    startGlassesStep();
  }, 380);
});

function startGlassesStep() {
  renderStory('step4');
  glassesPiece.classList.add('mission-locked');
  updateLaptopState();
}

function updateGlassesTarget(event) {
  const tableBox = craftTable.getBoundingClientRect();
  glassesPiece.style.left = `${event.clientX - tableBox.left - glassesPiece.offsetWidth / 2}px`;
  glassesPiece.style.top = `${event.clientY - tableBox.top - glassesPiece.offsetHeight / 2}px`;
  const glassesBox = glassesPiece.getBoundingClientRect();
  const plushBox = plush.getBoundingClientRect();
  const overlaps = glassesBox.left < plushBox.right && glassesBox.right > plushBox.left && glassesBox.top < plushBox.bottom && glassesBox.bottom > plushBox.top;
  plush.classList.toggle('glasses-target', overlaps);
}

glassesPiece.addEventListener('pointerdown', (event) => {
  if (!state.glassesUnlocked || state.glassesAdded || state.glassesDropInProgress) return;
  event.preventDefault();
  state.glassesDragging = true;
  glassesPiece.setPointerCapture(event.pointerId);
  glassesPiece.classList.add('is-dragging');
});
glassesPiece.addEventListener('pointermove', (event) => {
  if (!state.glassesDragging) return;
  updateGlassesTarget(event);
});
glassesPiece.addEventListener('pointerup', () => {
  if (!state.glassesDragging) return;
  state.glassesDragging = false;
  glassesPiece.classList.remove('is-dragging');
  const glassesBox = glassesPiece.getBoundingClientRect();
  const plushBox = plush.getBoundingClientRect();
  const validDrop = glassesBox.left < plushBox.right && glassesBox.right > plushBox.left && glassesBox.top < plushBox.bottom && glassesBox.bottom > plushBox.top;
  plush.classList.remove('glasses-target');
  if (!validDrop) return;
  state.glassesDropInProgress = true;
  const tableBox = craftTable.getBoundingClientRect();
  glassesPiece.style.left = `${plushBox.left + plushBox.width * .5 - tableBox.left - glassesBox.width / 2}px`;
  glassesPiece.style.top = `${plushBox.top + plushBox.height * .38 - tableBox.top - glassesBox.height / 2}px`;
  glassesPiece.classList.add('glasses-absorbing');
  setTimeout(() => {
    state.glassesAdded = true;
    state.glassesDropInProgress = false;
    glassesPiece.classList.remove('glasses-absorbing');
    glassesPiece.classList.add('glasses-attached');
    glassesPiece.style.opacity = '0';
    glassesOverlay.classList.add('show');
    plush.classList.add('glasses-finish');
    updateLaptopState();
    spawnFluffParticles(3);
    workpieceBubble.querySelector('strong').textContent = 'JANICE EDITION COMPLETE ♡';
    workpieceBubble.querySelector('span').textContent = '好，依家真係一睇就知係你喇 ♡';
    workpieceBubble.classList.add('show');
    setTimeout(() => renderStory('complete'), 500);
    setTimeout(() => workpieceBubble.classList.remove('show'), 2800);
    if (allCraftComplete()) setTimeout(startFinalReveal, 700);
  }, 420);
});

function allCraftComplete() {
  return state.fluffLevel === 3 && state.outfitStep === 3 && state.polishedRevealComplete && state.memoryAdded && state.glassesAdded;
}

function startFinalReveal() {
  if (state.finalRevealComplete || !allCraftComplete()) return;
  plush.classList.add('final-workpiece-puff', 'final-reveal');
  spawnFluffParticles(3);
  setTimeout(() => {
    state.finalRevealComplete = true;
    plush.classList.add('final-layers-hidden');
  }, 520);
}

function startReunion() {
  if (state.storyStep === 'reunion') return;
  state.storyStep = 'reunion';
  craftScene.classList.add('reunion-mode');
  kitty.classList.add('cursor-hidden');
  statusChip.innerHTML = '<span></span> craft mode: off';
  groupStage.hidden = false;
  groupStage.classList.add('reunion-active');
  setTimeout(() => {
    groupStage.classList.add('group-ready');
    craftScene.classList.add('group-ready-scene');
    state.reunionReady = true;
    craftScene.classList.add('reunion-ready');
    spawnGroupParticles();
    renderStory(state.photoAttachedToBoard ? 'photo-saved' : 'group-ready');
  }, 2700);
}

function spawnGroupParticles() {
  groupParticles.replaceChildren();
  ['♡', '✦', '♡', '✦'].forEach((symbol, index) => {
    const particle = document.createElement('span');
    particle.textContent = symbol;
    particle.style.setProperty('--group-x', `${38 + index * 8}%`);
    particle.style.setProperty('--group-delay', `${index * 50}ms`);
    groupParticles.append(particle);
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startPhotoMode() {
  if (!state.reunionReady || state.photoModeStarted || state.photoAttachedToBoard) return;
  state.photoModeStarted = true;
  storyButton.disabled = true;
  craftScene.classList.add('photo-mode');
  groupStage.classList.add('photo-freeze');
  for (const number of ['3', '2', '1']) {
    countdownOverlay.textContent = number;
    countdownOverlay.classList.remove('countdown-pop');
    void countdownOverlay.offsetWidth;
    countdownOverlay.classList.add('countdown-pop');
    await wait(700);
  }
  countdownOverlay.textContent = '';
  if (shutterAudio.src) {
    try {
      await shutterAudio.play();
    } catch {
      // The optional local shutter file may not exist yet.
    }
  }
  cameraFlash.classList.add('flash-fire');
  setTimeout(() => cameraFlash.classList.remove('flash-fire'), 260);
  await wait(120);
  try {
    state.photoDataUrl = await captureGroupPhoto();
  } catch {
    state.photoDataUrl = captureGroupPhotoFallback();
  }
  if (!state.photoDataUrl) {
    state.photoModeStarted = false;
    groupStage.classList.remove('photo-freeze');
    craftScene.classList.remove('photo-mode');
    storyButton.disabled = false;
    return;
  }
  state.photoCaptured = true;
  photoPreview.querySelector('img').src = state.photoDataUrl;
  photoPreview.hidden = false;
  photoPreview.classList.add('photo-pop');
  await wait(700);
  photoPreview.classList.add('photo-fly');
  await wait(900);
  boardPhotoSlot.querySelector('img').src = state.photoDataUrl;
  boardPhotoSlot.hidden = false;
  boardPhotoSlot.classList.add('board-photo-arrive');
  photoPreview.hidden = true;
  state.photoAttachedToBoard = true;
  try {
    localStorage.setItem('janiceGtBatchPhoto', state.photoDataUrl);
  } catch {
    // Continue even if storage is unavailable.
  }
  groupStage.classList.remove('photo-freeze');
  craftScene.classList.remove('photo-mode');
  renderStory('photo-saved');
}

async function captureGroupPhoto() {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(finalBirthdayPhoto);
    image.onerror = () => resolve(null);
    image.src = finalBirthdayPhoto;
  });
}

function captureGroupPhotoFallback() {
  try {
    const stageRect = groupStage.getBoundingClientRect();
    const crop = getPhotoCrop(stageRect);
    const elements = [...groupStage.querySelectorAll('img')].filter((element) => getComputedStyle(element).opacity !== '0' && element.getBoundingClientRect().width > 0);
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(crop.right - crop.left));
    canvas.height = Math.max(1, Math.round(crop.bottom - crop.top));
    const context = canvas.getContext('2d');
    drawPhotoBackdrop(context, canvas.width, canvas.height);
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (!element.complete || !element.naturalWidth) return;
      context.drawImage(element, rect.left - crop.left, rect.top - crop.top, rect.width, rect.height);
    });
    return canvas.toDataURL('image/png');
  } catch {
    return null;
  }
}

function getPhotoCrop(stageRect) {
  return {
    left: stageRect.left + stageRect.width * .2,
    top: stageRect.top + stageRect.height * .45,
    right: stageRect.left + stageRect.width * .82,
    bottom: stageRect.top + stageRect.height * .94,
  };
}

function drawPhotoBackdrop(context, width, height) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f8d8c8');
  gradient.addColorStop(.52, '#f7e8c8');
  gradient.addColorStop(1, '#d8e9d1');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  context.fillStyle = 'rgba(255, 250, 220, .82)';
  context.beginPath();
  context.arc(width * .16, height * .22, width * .055, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = 'rgba(255, 214, 211, .72)';
  context.beginPath();
  context.arc(width * .84, height * .18, width * .08, 0, Math.PI * 2);
  context.fill();
}

function downloadPhoto() {
  if (!state.photoDataUrl) return;
  const link = document.createElement('a');
  link.href = state.photoDataUrl;
  link.download = 'janice-gt-batch-birthday-photo-2026.png';
  document.body.append(link);
  link.click();
  link.remove();
}

function restoreSavedPhoto() {
  try {
    const savedPhoto = localStorage.getItem('janiceGtBatchPhoto');
    if (!savedPhoto) return;
    state.photoDataUrl = savedPhoto;
    state.photoCaptured = true;
    state.photoAttachedToBoard = true;
    boardPhotoSlot.querySelector('img').src = savedPhoto;
    boardPhotoSlot.hidden = false;
  } catch {
    // Continue without a restored photo if storage is unavailable.
  }
}

function updateLaptopState() {
  const statuses = { fluffy: state.fluffLevel === 3, outfit: state.outfitStep === 3 && state.polishedRevealComplete, memory: state.memoryAdded, glasses: state.glassesAdded };
  Object.entries(statuses).forEach(([key, complete]) => {
    const item = document.querySelector(`[data-build="${key}"]`);
    item.textContent = `${complete ? '✓' : '○'} ${key.toUpperCase()}`;
    item.classList.toggle('is-complete', complete);
  });
}

function updateFluffProgress() {
  [...fluffProgress.children].forEach((indicator, index) => {
    indicator.textContent = index < state.fluffLevel ? '♡' : '○';
    indicator.classList.toggle('filled', index < state.fluffLevel);
  });
}

function spawnFluffParticles(level) {
  fluffParticles.replaceChildren();
  const count = level === 1 ? 3 : level === 2 ? 5 : 7;
  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement('span');
    particle.className = index >= count - (level === 3 ? 3 : 0) ? 'heart-particle' : 'cotton-particle';
    particle.style.setProperty('--particle-x', `${28 + ((index * 23) % 48)}%`);
    particle.style.setProperty('--particle-y', `${30 + ((index * 17) % 30)}%`);
    particle.style.setProperty('--particle-delay', `${index * 35}ms`);
    particle.textContent = particle.classList.contains('heart-particle') ? '♡' : '';
    fluffParticles.append(particle);
  }
  setTimeout(() => fluffParticles.replaceChildren(), 900);
}

plush.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    document.querySelector('#plush-label').innerHTML = 'DROP COTTON<br />HERE';
  }
});
