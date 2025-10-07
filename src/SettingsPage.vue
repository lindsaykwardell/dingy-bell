<template>
  <div class="flex flex-col items-center gap-4 p-3 md:p-6">
    <!-- Header -->
    <div class="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="text-purple-400"
      >
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83a2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2a2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0a2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2a2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83a2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0a2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"
          />
        </g>
      </svg>
      <h1
        class="text-2xl md:text-3xl tracking-widest text-purple-400 font-[Epilogue_Variable] font-extralight"
      >
        Settings
      </h1>
    </div>

    <div class="w-full max-w-sm space-y-4">
      <!-- Mode Toggle -->
      <div class="space-y-1">
        <label class="block text-sm text-stone-300 font-light">Mode</label>
        <div class="flex bg-stone-800 rounded-lg p-1">
          <button
            @click="mode = 'meditation'"
            class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
            :class="{
              'bg-purple-600 text-white': mode === 'meditation',
              'text-stone-400 hover:text-stone-300': mode !== 'meditation',
            }"
          >
            Meditation
          </button>
          <button
            @click="mode = 'pomodoro'"
            class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
            :class="{
              'bg-purple-600 text-white': mode === 'pomodoro',
              'text-stone-400 hover:text-stone-300': mode !== 'pomodoro',
            }"
          >
            Pomodoro
          </button>
        </div>
      </div>

      <!-- Meditation Duration -->
      <div v-if="mode === 'meditation'" class="space-y-1">
        <label
          for="duration"
          class="flex justify-between text-sm text-stone-300 font-light"
        >
          <span>Duration</span>
          <span
            >{{ duration }} {{ +duration === 1 ? "minute" : "minutes" }}</span
          >
        </label>
        <input
          id="duration"
          v-model="duration"
          type="range"
          min="0.5"
          max="5"
          step="0.5"
          class="w-full h-2 rounded-lg appearance-none cursor-pointer"
          :style="{
            background: `linear-gradient(to right, #a855f7 ${durationPercentage}%, #44403c ${durationPercentage}%)`,
          }"
        />
      </div>

      <!-- Pomodoro Settings -->
      <div v-if="mode === 'pomodoro'" class="space-y-3">
        <div class="space-y-1">
          <label
            for="workDuration"
            class="flex justify-between text-sm text-stone-300 font-light"
          >
            <span>Work Duration</span>
            <span>{{ pomodoroSettings.workDuration }} minutes</span>
          </label>
          <input
            id="workDuration"
            v-model="pomodoroSettings.workDuration"
            type="range"
            min="5"
            max="60"
            step="5"
            class="w-full h-2 rounded-lg appearance-none cursor-pointer"
            :style="{
              background: `linear-gradient(to right, #a855f7 ${workDurationPercentage}%, #44403c ${workDurationPercentage}%)`,
            }"
          />
        </div>

        <div class="space-y-1">
          <label
            for="breakDuration"
            class="flex justify-between text-sm text-stone-300 font-light"
          >
            <span>Break Duration</span>
            <span>{{ pomodoroSettings.breakDuration }} minutes</span>
          </label>
          <input
            id="breakDuration"
            v-model="pomodoroSettings.breakDuration"
            type="range"
            min="5"
            max="30"
            step="5"
            class="w-full h-2 rounded-lg appearance-none cursor-pointer"
            :style="{
              background: `linear-gradient(to right, #a855f7 ${breakDurationPercentage}%, #44403c ${breakDurationPercentage}%)`,
            }"
          />
        </div>

        <div class="space-y-1">
          <label
            for="longBreakDuration"
            class="flex justify-between text-sm text-stone-300 font-light"
          >
            <span>Long Break Duration</span>
            <span>{{ pomodoroSettings.longBreakDuration }} minutes</span>
          </label>
          <input
            id="longBreakDuration"
            v-model="pomodoroSettings.longBreakDuration"
            type="range"
            min="10"
            max="60"
            step="5"
            class="w-full h-2 rounded-lg appearance-none cursor-pointer"
            :style="{
              background: `linear-gradient(to right, #a855f7 ${longBreakDurationPercentage}%, #44403c ${longBreakDurationPercentage}%)`,
            }"
          />
        </div>

        <div class="space-y-1">
          <label
            for="cycles"
            class="flex justify-between text-sm text-stone-300 font-light"
          >
            <span>Cycles</span>
            <span>{{ pomodoroSettings.cycles }}</span>
          </label>
          <input
            id="cycles"
            v-model="pomodoroSettings.cycles"
            type="range"
            min="1"
            max="8"
            step="1"
            class="w-full h-2 rounded-lg appearance-none cursor-pointer"
            :style="{
              background: `linear-gradient(to right, #a855f7 ${cyclesPercentage}%, #44403c ${cyclesPercentage}%)`,
            }"
          />
        </div>
      </div>

      <!-- Soundscape -->
      <div class="space-y-1">
        <label for="soundscape" class="block text-sm text-stone-300 font-light"
          >Soundscape</label
        >
        <select
          id="soundscape"
          v-model="selectedSoundscape"
          class="w-full p-3 bg-stone-800 border border-stone-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
        >
          <option :value="null">None</option>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
          <option value="forestRiver">Forest River</option>
          <option value="oceanWaves">Ocean Waves</option>
          <option value="rainyOcean">Rainy Ocean</option>
          <option value="rainyNight">Rainy Night</option>
        </select>
      </div>

      <!-- Bell Toggle -->
      <label
        for="bell-toggle"
        class="flex items-center justify-between cursor-pointer"
      >
        <span class="text-sm text-stone-300 font-light">Enable Bell</span>
        <div class="relative">
          <input
            id="bell-toggle"
            v-model="bellEnabled"
            type="checkbox"
            class="sr-only peer"
          />
          <div
            class="w-14 h-8 bg-stone-700 rounded-full peer-checked:bg-purple-600 transition-colors"
          ></div>
          <div
            class="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:translate-x-6"
          ></div>
        </div>
      </label>
    </div>

    <!-- Back Button -->
    <button
      @click="$router.push('/')"
      class="w-full max-w-sm py-2 px-4 bg-stone-800 hover:bg-stone-700 text-white rounded-lg transition-colors font-medium text-sm"
    >
      Back
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppState } from "./composables/useAppState";

const { bellEnabled, selectedSoundscape, duration, mode, pomodoroSettings } =
  useAppState();

// Computed properties for sliders
const durationPercentage = computed(() => {
  const min = 0.5;
  const max = 5;
  return ((duration.value - min) / (max - min)) * 100;
});

const workDurationPercentage = computed(() => {
  const min = 5;
  const max = 60;
  return ((pomodoroSettings.workDuration - min) / (max - min)) * 100;
});

const breakDurationPercentage = computed(() => {
  const min = 5;
  const max = 30;
  return ((pomodoroSettings.breakDuration - min) / (max - min)) * 100;
});

const longBreakDurationPercentage = computed(() => {
  const min = 10;
  const max = 60;
  return ((pomodoroSettings.longBreakDuration - min) / (max - min)) * 100;
});

const cyclesPercentage = computed(() => {
  const min = 1;
  const max = 8;
  return ((pomodoroSettings.cycles - min) / (max - min)) * 100;
});
</script>

<style scoped>
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

/* Card hover effects */
.bg-stone-800 {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-stone-800:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Toggle switch animation */
.peer-checked\:translate-x-6 {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.peer-checked\:bg-purple-600 {
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
