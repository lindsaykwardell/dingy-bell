<template>
  <section
    class="flex flex-col items-center gap-4 p-3 md:p-6 transition-all duration-300"
    :class="{
      'opacity-0 pointer-events-none': timerStore.playing,
      'opacity-100 pointer-events-auto': !timerStore.playing,
    }"
  >
    <div class="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="text-purple-400 settings-icon"
      >
        <!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ -->
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14.5 4.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 17l-1.158-.39a2.7 2.7 0 0 1-.642-.317l-.101-.069A2.5 2.5 0 0 1 18 14.15c0-2.437-1.744-4.517-4.123-4.918l-.89-.15C12.5 9 11.5 9 11.013 9.082l-.891.15C7.743 9.633 6 11.713 6 14.15a2.5 2.5 0 0 1-1.099 2.074l-.1.069q-.301.201-.643.317L3 17"
            opacity=".5"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9.5 16l-.925 1.233c-.147.196-.22.295-.304.381a2 2 0 0 1-.732.486c-.112.043-.23.073-.47.133l-1.793.448A1.685 1.685 0 0 0 5.685 22h.683c1.709 0 3.37-.554 4.737-1.579L13 19m1.5-3l.727.969c.343.458.515.687.738.856q.1.076.21.14c.242.14.52.209 1.075.348l1.474.368A1.685 1.685 0 0 1 18.315 22h-.937c-.563 0-.844 0-1.123-.016a10 10 0 0 1-2.425-.44c-.267-.083-.53-.181-1.056-.379L11 20.5"
          />
        </g>
      </svg>
      <h1
        class="text-2xl md:text-3xl tracking-widest text-purple-400 font-[Epilogue_Variable] font-extralight"
      >
        Medit
      </h1>
    </div>

    <!-- Settings Summary -->
    <div class="w-full max-w-sm space-y-3">
      <!-- Mode Summary -->
      <div
        class="flex items-center justify-between p-3 bg-stone-800 rounded-lg"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-2.5 h-2.5 rounded-full transition-colors duration-300"
            :class="{
              'bg-purple-500': mode === 'meditation',
              'bg-orange-500': mode === 'pomodoro',
            }"
          ></div>
          <transition name="fade" mode="out-in">
            <span key="mode-text" class="text-stone-300 font-medium text-sm">
              {{ mode === "meditation" ? "Meditation" : "Pomodoro" }} Mode
            </span>
          </transition>
        </div>
        <button
          @click="$router.push('/settings')"
          :disabled="timerStore.playing"
          class="text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50 settings-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83a2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2a2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0a2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2a2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83a2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0a2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"
            />
          </svg>
        </button>
      </div>

      <!-- Timer Settings Summary -->
      <div class="p-3 bg-stone-800 rounded-lg space-y-2">
        <h3 class="text-stone-300 font-medium text-sm">Timer Settings</h3>

        <!-- Meditation Settings -->
        <transition name="fade-slide" mode="out-in" appear>
          <div
            v-if="mode === 'meditation'"
            key="meditation"
            class="text-xs text-stone-400"
          >
            <div class="flex justify-between">
              <span>Duration:</span>
              <span
                >{{ duration }}
                {{ +duration === 1 ? "minute" : "minutes" }}</span
              >
            </div>
          </div>

          <!-- Pomodoro Settings -->
          <div v-else key="pomodoro" class="text-xs text-stone-400 space-y-0.5">
            <div class="flex justify-between">
              <span>Work:</span>
              <span>{{ pomodoroSettings.workDuration }} min</span>
            </div>
            <div class="flex justify-between">
              <span>Break:</span>
              <span>{{ pomodoroSettings.breakDuration }} min</span>
            </div>
            <div class="flex justify-between">
              <span>Long Break:</span>
              <span>{{ pomodoroSettings.longBreakDuration }} min</span>
            </div>
            <div class="flex justify-between">
              <span>Cycles:</span>
              <span>{{ pomodoroSettings.cycles }}</span>
            </div>
          </div>
        </transition>
      </div>

      <!-- Audio Settings Summary -->
      <div class="p-3 bg-stone-800 rounded-lg space-y-2">
        <h3 class="text-stone-300 font-medium text-sm">Audio Settings</h3>
        <div class="text-xs text-stone-400 space-y-0.5">
          <div class="flex justify-between">
            <span>Soundscape:</span>
            <span>{{
              selectedSoundscape ? soundscapeNames[selectedSoundscape] : "None"
            }}</span>
          </div>
          <div class="flex justify-between">
            <span>Bell:</span>
            <span>{{ bellEnabled ? "Enabled" : "Disabled" }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Timer Button Container -->
  <div class="timer-wrapper">
    <div
      class="timer-container"
      :class="{
        'timer-playing': timerStore.playing,
      }"
    >
      <button
        class="timer-button"
        @click="timerStore.playing = !timerStore.playing"
      >
        <svg class="absolute inset-0" viewBox="0 0 36 36">
          <circle
            class="text-stone-950"
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          />
          <circle
            v-if="timerStore.playing"
            class="text-stone-800 progress-circle"
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            :stroke-dasharray="timerStore.circleCircumference"
            :stroke-dashoffset="timerStore.strokeDashoffset"
            stroke-linecap="round"
          />
        </svg>
        <div
          class="absolute inset-0 flex flex-col items-center justify-center font-[Epilogue_Variable] font-extralight text-5xl transition-all duration-300"
          :class="{
            'opacity-0': timerStore.playing,
            'opacity-100': !timerStore.playing,
          }"
        >
          <span>Begin</span>
          <div v-if="mode === 'pomodoro'" class="text-sm text-stone-400 mt-2">
            {{
              timerStore.pomodoroState.currentPhase === "work"
                ? "Work Session"
                : timerStore.pomodoroState.currentPhase === "break"
                ? "Break Time"
                : timerStore.pomodoroState.currentPhase === "longBreak"
                ? "Long Break"
                : "Work Session"
            }}
          </div>
        </div>
        <div
          v-if="timerStore.playing && mode === 'pomodoro'"
          class="absolute inset-0 flex flex-col items-center justify-center font-[Epilogue_Variable] font-extralight text-2xl transition-all duration-300"
        >
          <span class="text-stone-300">{{
            timerStore.pomodoroState.currentPhase === "work"
              ? "Work"
              : timerStore.pomodoroState.currentPhase === "break"
              ? "Break"
              : timerStore.pomodoroState.currentPhase === "longBreak"
              ? "Long Break"
              : "Work"
          }}</span>
          <span class="text-sm text-stone-400 mt-1"
            >Cycle {{ timerStore.pomodoroState.completedCycles + 1 }} of
            {{ pomodoroSettings.cycles }}</span
          >
        </div>
      </button>
    </div>
  </div>
  <audio ref="ding" style="display: none" :src="dingWav" preload="auto" />
  <audio
    ref="morning"
    style="display: none"
    :src="morningMp3"
    preload="auto"
    loop
  />
  <audio
    ref="evening"
    style="display: none"
    :src="eveningMp3"
    preload="auto"
    loop
  />
  <audio
    ref="forestRiver"
    style="display: none"
    :src="forestRiverMp3"
    preload="auto"
    loop
  />
  <audio
    ref="oceanWaves"
    style="display: none"
    :src="oceanWavesMp3"
    preload="auto"
    loop
  />
  <audio
    ref="rainyOcean"
    style="display: none"
    :src="rainyOceanMp3"
    preload="auto"
    loop
  />
  <audio
    ref="rainyNight"
    style="display: none"
    :src="rainyNightMp3"
    preload="auto"
    loop
  />
</template>

<script setup lang="ts">
import dingWav from "./assets/ding.wav";
import morningMp3 from "./assets/morning.mp3";
import eveningMp3 from "./assets/evening.mp3";
import forestRiverMp3 from "./assets/forest_river.mp3";
import oceanWavesMp3 from "./assets/ocean.mp3";
import rainyOceanMp3 from "./assets/rainy_ocean.mp3";
import rainyNightMp3 from "./assets/rainy_night.mp3";
import { ref, watch, computed, nextTick } from "vue";
import { useAppState } from "./composables/useAppState";
import { useTimerStore } from "./stores/timer";
// Supports weights 100-900
import "@fontsource-variable/epilogue";

const {
  bellEnabled,
  selectedSoundscape,
  duration,
  mode,
  pomodoroSettings,
  soundscapeNames,
} = useAppState();

const timerStore = useTimerStore();
const isInitializing = ref(false);

const ding = ref<HTMLAudioElement | null>(null);
const morning = ref<HTMLAudioElement | null>(null);
const evening = ref<HTMLAudioElement | null>(null);
const forestRiver = ref<HTMLAudioElement | null>(null);
const oceanWaves = ref<HTMLAudioElement | null>(null);
const rainyOcean = ref<HTMLAudioElement | null>(null);
const rainyNight = ref<HTMLAudioElement | null>(null);

// Computed properties for timer progress
const remainingTimePercentage = computed(() => {
  // During initialization, always return 0 to prevent sliding
  if (isInitializing.value) {
    return 0;
  }

  if (mode.value === "meditation") {
    const totalDuration = duration.value * 60 * 1000; // Convert minutes to milliseconds
    // Ensure we have valid timing values before calculating
    if (timerStore.nextDing === 0 || timerStore.now === 0) {
      return 0;
    }
    const elapsedTime = totalDuration - (timerStore.nextDing - timerStore.now);
    return Math.max(0, Math.min(100, (elapsedTime / totalDuration) * 100));
  } else {
    // Pomodoro mode - ensure values are initialized
    if (
      timerStore.pomodoroState.currentSessionStart === 0 ||
      timerStore.pomodoroState.nextPhaseTime === 0
    ) {
      return 0;
    }
    const totalDuration =
      timerStore.pomodoroState.nextPhaseTime -
      timerStore.pomodoroState.currentSessionStart;
    const elapsedTime =
      timerStore.now - timerStore.pomodoroState.currentSessionStart;
    return Math.max(0, Math.min(100, (elapsedTime / totalDuration) * 100));
  }
});

// Update the store's remainingTimePercentage
watch(
  remainingTimePercentage,
  (newValue) => {
    timerStore.remainingTimePercentage = newValue;
  },
  { immediate: true }
);

function playDing() {
  play();
  if (timerStore.playing) {
    if (mode.value === "meditation") {
      timerStore.setMeditationTiming(Date.now() + duration.value * 1000 * 60);
      timerStore.timeout = setTimeout(playDing, duration.value * 1000 * 60);
    } else {
      // Pomodoro mode - only schedule timeout, don't reset timing
      const phaseDuration = pomodoroSettings.workDuration * 60 * 1000;
      timerStore.timeout = setTimeout(transitionToNextPhase, phaseDuration);
    }
  }
}

function scheduleNextPomodoroPhase() {
  const currentTime = Date.now();
  timerStore.pomodoroState.currentSessionStart = currentTime;

  let phaseDuration: number;
  if (timerStore.pomodoroState.currentPhase === "work") {
    phaseDuration = pomodoroSettings.workDuration * 60 * 1000;
  } else if (timerStore.pomodoroState.currentPhase === "break") {
    phaseDuration = pomodoroSettings.breakDuration * 60 * 1000;
  } else {
    phaseDuration = pomodoroSettings.longBreakDuration * 60 * 1000;
  }

  timerStore.pomodoroState.nextPhaseTime = currentTime + phaseDuration;
  timerStore.timeout = setTimeout(transitionToNextPhase, phaseDuration);
}

function transitionToNextPhase() {
  if (!timerStore.playing) return;

  // Play bell for phase transition
  play();

  if (timerStore.pomodoroState.currentPhase === "work") {
    timerStore.pomodoroState.completedCycles++;

    // Check if we should take a long break (every 4th cycle) or regular break
    if (timerStore.pomodoroState.completedCycles % 4 === 0) {
      timerStore.pomodoroState.currentPhase = "longBreak";
    } else {
      timerStore.pomodoroState.currentPhase = "break";
    }
  } else {
    // Coming from break, go back to work
    timerStore.pomodoroState.currentPhase = "work";
  }

  // Check if we've completed all cycles
  if (timerStore.pomodoroState.completedCycles >= pomodoroSettings.cycles) {
    // All cycles completed, stop the timer
    timerStore.playing = false;
    return;
  }

  // Schedule next phase
  scheduleNextPomodoroPhase();
}

function play() {
  if (ding.value) {
    if (timerStore.playing && bellEnabled.value) {
      ding.value.pause();
      ding.value.currentTime = 0;
      ding.value.play();
    } else {
      ding.value.pause();
      ding.value.currentTime = 0;
    }
  }
}

watch(
  () => timerStore.playing,
  async (newPlaying) => {
    if (newPlaying) {
      isInitializing.value = true;

      // Reset Pomodoro state when starting
      if (mode.value === "pomodoro") {
        timerStore.resetPomodoroState();
        // Initialize Pomodoro timing immediately to prevent progress calculation issues
        const currentTime = Date.now();
        timerStore.pomodoroState.currentSessionStart = currentTime;
        timerStore.pomodoroState.nextPhaseTime =
          currentTime + pomodoroSettings.workDuration * 60 * 1000;
      }

      timerStore.startTimer();

      // Wait for next tick to ensure all reactive updates are complete
      await nextTick();

      // Now it's safe to start progress calculations
      isInitializing.value = false;

      playDing();

      // Always play soundscape in Pomodoro mode, or if selected in meditation mode
      if (mode.value === "pomodoro" || selectedSoundscape.value) {
        if (selectedSoundscape.value === "morning" && morning.value) {
          morning.value.currentTime = 0;
          morning.value.play();
        } else if (selectedSoundscape.value === "evening" && evening.value) {
          evening.value.currentTime = 0;
          evening.value.play();
        } else if (
          selectedSoundscape.value === "forestRiver" &&
          forestRiver.value
        ) {
          forestRiver.value.currentTime = 0;
          forestRiver.value.play();
        } else if (
          selectedSoundscape.value === "oceanWaves" &&
          oceanWaves.value
        ) {
          oceanWaves.value.currentTime = 0;
          oceanWaves.value.play();
        } else if (
          selectedSoundscape.value === "rainyOcean" &&
          rainyOcean.value
        ) {
          rainyOcean.value.currentTime = 0;
          rainyOcean.value.play();
        } else if (
          selectedSoundscape.value === "rainyNight" &&
          rainyNight.value
        ) {
          rainyNight.value.currentTime = 0;
          rainyNight.value.play();
        } else if (
          selectedSoundscape.value === "rainyNight" &&
          rainyNight.value
        ) {
          rainyNight.value.currentTime = 0;
          rainyNight.value.play();
        }
      }
    } else {
      isInitializing.value = false;
      timerStore.stopTimer();
      if (morning.value) morning.value.pause();
      if (evening.value) evening.value.pause();
      if (forestRiver.value) forestRiver.value.pause();
      if (oceanWaves.value) oceanWaves.value.pause();
      if (rainyOcean.value) rainyOcean.value.pause();
      if (rainyNight.value) rainyNight.value.pause();
    }
  }
);
</script>

<style scoped>
/* Mode toggle transition animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Fade transition for mode text */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Ensure progress circle starts from top (12 o'clock) */
.progress-circle {
  transform: rotate(-90deg);
  transform-origin: center;
}

/* Timer wrapper - provides the positioning context */
.timer-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
}

/* Timer container - handles the animation */
.timer-container {
  pointer-events: auto;
  transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateY(25dvh) scale(0.8);
  width: min(100vw, 500px);
  height: min(100vw, 500px);
}

/* When playing, move to center and scale to fill screen */
.timer-container.timer-playing {
  transform: translateY(0) scale(1);
  width: min(100vw, 100vh);
  height: min(100vw, 100vh);
}

/* Timer button styling */
.timer-button {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.timer-button:active {
  transform: scale(0.98);
}
</style>
