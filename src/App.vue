<template>
  <section
    class="flex flex-col items-center gap-8 p-4 md:p-8 transition-all duration-300"
    :class="{
      'opacity-0 pointer-events-none': playing,
      'opacity-100 pointer-events-auto': !playing,
    }"
  >
    <div class="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        class="text-purple-400"
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
        class="text-3xl md:text-4xl tracking-widest text-purple-400 font-[Epilogue_Variable] font-extralight"
      >
        Medit
      </h1>
    </div>
    <div class="w-full max-w-sm space-y-8">
      <!-- Duration -->
      <div class="space-y-2">
        <label
          for="duration"
          class="flex justify-between text-lg text-stone-300 font-light"
        >
          <span>Duration</span>
          <span
            >{{ duration }} {{ +duration === 1 ? "minute" : "minutes" }}</span
          >
        </label>
        <input
          id="duration"
          v-model="duration"
          :disabled="playing"
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

      <!-- Soundscape -->
      <div class="space-y-2">
        <label for="soundscape" class="block text-lg text-stone-300 font-light"
          >Soundscape</label
        >
        <select
          id="soundscape"
          v-model="selectedSoundscape"
          :disabled="playing"
          class="w-full p-3 bg-stone-800 border border-stone-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
        >
          <option :value="null">None</option>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
          <option value="forestRiver">Forest River</option>
          <option value="oceanWaves">Ocean Waves</option>
          <option value="rainyOcean">Rainy Ocean</option>
        </select>
      </div>

      <!-- Bell Toggle -->
      <label
        for="bell-toggle"
        class="flex items-center justify-between cursor-pointer"
      >
        <span class="text-lg text-stone-300 font-light">Enable Bell</span>
        <div class="relative">
          <input
            id="bell-toggle"
            v-model="bellEnabled"
            :disabled="playing"
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
  </section>
  <button
    class="relative w-full aspect-square"
    @click="playing = !playing"
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
        class="text-stone-800"
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-dasharray="100"
        :stroke-dashoffset="100 - remainingTimePercentage"
        stroke-linecap="round"
        transform="rotate(-90 18 18)"
      />
    </svg>
    <div
      class="absolute inset-0 flex items-center justify-center font-[Epilogue_Variable] font-extralight text-5xl transition-all duration-300"
      :class="{
        'opacity-0': playing,
        'opacity-100': !playing,
      }"
    >
      Begin
    </div>
  </button>
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
</template>

<script setup lang="ts">
import dingWav from "./assets/ding.wav";
import morningMp3 from "./assets/morning.mp3";
import eveningMp3 from "./assets/evening.mp3";
import forestRiverMp3 from "./assets/forest_river.mp3";
import oceanWavesMp3 from "./assets/ocean.mp3";
import rainyOceanMp3 from "./assets/rainy_ocean.mp3";
import { ref, watch, computed, reactive, watchEffect } from "vue";
// Supports weights 100-900
import "@fontsource-variable/epilogue";

const bellEnabled = ref<boolean>(
  (localStorage.getItem("bellEnabled") ?? "true") === "true"
);
const ding = ref<HTMLAudioElement | null>(null);
const morning = ref<HTMLAudioElement | null>(null);
const evening = ref<HTMLAudioElement | null>(null);
const forestRiver = ref<HTMLAudioElement | null>(null);
const oceanWaves = ref<HTMLAudioElement | null>(null);
const rainyOcean = ref<HTMLAudioElement | null>(null);
const selectedSoundscape = ref<
  "morning" | "evening" | "forestRiver" | "oceanWaves" | "rainyOcean" | null
>(
  (localStorage.getItem("selectedSoundscape") as
    | "morning"
    | "evening"
    | "forestRiver"
    | "oceanWaves"
    | "rainyOcean"
    | null) || null
);
const duration = ref<number>(+(localStorage.getItem("duration") || "1"));
const playing = ref<boolean>(false);

const timeout = ref<any>(undefined);
const trackNow = ref<any>(undefined);
const nextDing = ref<number>(0);
const now = ref(Date.now());

const wakeLock = reactive<{
  lock: null | WakeLockSentinel;
  request: () => void;
  release: () => void;
}>({
  lock: null,
  request() {
    if ("wakeLock" in navigator) {
      navigator.wakeLock
        .request("screen")
        .then((lock) => {
          this.lock = lock;
        })
        .catch(console.error);
    }
  },
  release() {
    if (this.lock) {
      this.lock.release();
      this.lock = null;
    }
  },
});

const remainingTimePercentage = computed(() => {
  const totalDuration = duration.value * 60 * 1000; // Convert minutes to milliseconds
  const elapsedTime = totalDuration - (nextDing.value - now.value);
  return Math.max(0, Math.min(100, (elapsedTime / totalDuration) * 100));
});

const durationPercentage = computed(() => {
  const min = 0.5;
  const max = 5;
  return ((duration.value - min) / (max - min)) * 100;
});

function playDing() {
  play();
  if (playing.value) {
    nextDing.value = Date.now() + duration.value * 1000 * 60;
    timeout.value = setTimeout(playDing, duration.value * 1000 * 60);
  }
}

function play() {
  if (ding.value) {
    if (playing.value && bellEnabled.value) {
      ding.value.pause();
      ding.value.currentTime = 0;
      ding.value.play();
    } else {
      ding.value.pause();
      ding.value.currentTime = 0;
    }
  }
}

watch(playing, (newPlaying) => {
  if (newPlaying) {
    playDing();
    wakeLock.request();
    now.value = Date.now();
    trackNow.value = setInterval(() => {
      now.value = Date.now();
    }, 10);
    setTimeout(() => {
      now.value = Date.now();
    }, 1);

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
    } else if (selectedSoundscape.value === "oceanWaves" && oceanWaves.value) {
      oceanWaves.value.currentTime = 0;
      oceanWaves.value.play();
    } else if (selectedSoundscape.value === "rainyOcean" && rainyOcean.value) {
      rainyOcean.value.currentTime = 0;
      rainyOcean.value.play();
    }
  } else {
    clearTimeout(timeout.value);
    wakeLock.release();
    clearInterval(trackNow.value);
    nextDing.value = 0;
    if (morning.value) morning.value.pause();
    if (evening.value) evening.value.pause();
    if (forestRiver.value) forestRiver.value.pause();
    if (oceanWaves.value) oceanWaves.value.pause();
    if (rainyOcean.value) rainyOcean.value.pause();
  }
});

watchEffect(() => {
  localStorage.setItem("duration", duration.value.toString());
});

watchEffect(() => {
  localStorage.setItem("selectedSoundscape", selectedSoundscape.value || "");
});

watchEffect(() => {
  localStorage.setItem("bellEnabled", bellEnabled.value.toString());
});
</script>
