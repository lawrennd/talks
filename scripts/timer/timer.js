// Copyright (c) 2026 Neil D. Lawrence
//
// Class-test countdown timer for Reveal background iframes.
// Duration from ?duration= seconds, MM:SS, or H:MM:SS.

(function () {
  'use strict';

  var display = document.getElementById('timer-display');
  var statusEl = document.getElementById('timer-status');
  var startBtn = document.getElementById('timer-start');
  var pauseBtn = document.getElementById('timer-pause');
  var resetBtn = document.getElementById('timer-reset');

  if (!display || !startBtn || !pauseBtn || !resetBtn) {
    return;
  }

  function parseDuration(raw) {
    if (raw == null || String(raw).trim() === '') {
      return 600;
    }
    var s = String(raw).trim();
    if (/^\d+$/.test(s)) {
      return Math.max(0, parseInt(s, 10));
    }
    var parts = s.split(':');
    if (parts.length === 2 || parts.length === 3) {
      var nums = [];
      for (var i = 0; i < parts.length; i++) {
        if (!/^\d+$/.test(parts[i])) {
          return 600;
        }
        nums.push(parseInt(parts[i], 10));
      }
      if (nums.length === 2) {
        return Math.max(0, nums[0] * 60 + nums[1]);
      }
      return Math.max(0, nums[0] * 3600 + nums[1] * 60 + nums[2]);
    }
    return 600;
  }

  function formatTime(totalSeconds) {
    var s = Math.max(0, Math.ceil(totalSeconds));
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;
    function pad(n) {
      return n < 10 ? '0' + n : String(n);
    }
    if (h > 0) {
      return h + ':' + pad(m) + ':' + pad(sec);
    }
    return pad(m) + ':' + pad(sec);
  }

  var params = new URLSearchParams(window.location.search);
  var initialSeconds = parseDuration(params.get('duration'));
  var remainingMs = initialSeconds * 1000;
  var running = false;
  var finished = false;
  var lastTick = 0;
  var rafId = 0;

  function setStatus(text) {
    if (statusEl) {
      statusEl.textContent = text;
    }
  }

  function render() {
    display.textContent = formatTime(remainingMs / 1000);
  }

  function setFlashing(on) {
    document.body.classList.toggle('flashing', !!on);
  }

  function syncButtons() {
    if (finished) {
      startBtn.disabled = true;
      startBtn.textContent = 'Start';
      pauseBtn.disabled = true;
      pauseBtn.textContent = 'Pause';
      resetBtn.disabled = false;
      return;
    }
    var pausedMidway = !running && remainingMs < initialSeconds * 1000 && remainingMs > 0;
    startBtn.disabled = running;
    startBtn.textContent = pausedMidway ? 'Resume' : 'Start';
    pauseBtn.disabled = !running;
    pauseBtn.textContent = 'Pause';
    resetBtn.disabled = running;
  }

  function stopLoop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  function tick(now) {
    if (!running) {
      return;
    }
    var delta = now - lastTick;
    lastTick = now;
    remainingMs = Math.max(0, remainingMs - delta);
    render();
    if (remainingMs <= 0) {
      running = false;
      finished = true;
      setFlashing(true);
      setStatus("Time's up");
      syncButtons();
      stopLoop();
      return;
    }
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (finished || remainingMs <= 0) {
      return;
    }
    running = true;
    finished = false;
    setFlashing(false);
    setStatus('Running');
    lastTick = performance.now();
    syncButtons();
    stopLoop();
    rafId = requestAnimationFrame(tick);
  }

  function pause() {
    if (!running) {
      return;
    }
    running = false;
    stopLoop();
    setStatus('Paused');
    syncButtons();
  }

  function reset() {
    running = false;
    finished = false;
    stopLoop();
    remainingMs = initialSeconds * 1000;
    setFlashing(false);
    setStatus('Ready');
    render();
    syncButtons();
  }

  startBtn.addEventListener('click', function () {
    start();
  });
  pauseBtn.addEventListener('click', function () {
    pause();
  });
  resetBtn.addEventListener('click', function () {
    reset();
  });

  // Keep Reveal from advancing the deck while this iframe has focus.
  window.addEventListener('keydown', function (ev) {
    var k = ev.key;
    if (k === ' ' || k === 'ArrowLeft' || k === 'ArrowRight' ||
        k === 'ArrowUp' || k === 'ArrowDown' || k === 'PageUp' ||
        k === 'PageDown') {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (k === ' ' && !finished) {
      if (running) {
        pause();
      } else {
        start();
      }
    }
  }, true);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden && running) {
      pause();
      setStatus('Paused (hidden)');
    }
  });

  render();
  syncButtons();
})();
