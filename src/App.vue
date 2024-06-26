<template>
  <section v-if="!playing || (playing && !hideWhilePlaying)">
    <div style="font-size: 8rem">🌙</div>

    <h1>Moon Meditations</h1>
    <p>Set the duration and click play to start the timer.</p>
    <template v-if="!playing">
      {{ duration }} {{ +duration === 1 ? "minute" : "minutes" }}
    </template>
    <template v-else>
      {{ whenIsNextDing }}
    </template>
    <input
      v-if="!playing"
      v-model="duration"
      :disabled="playing"
      type="range"
      min="0.5"
      max="5"
      step="0.5"
    />
    <!-- a loading bar, showing progress until next ding -->
    <progress
      v-else
      :max="duration * 60"
      :value="duration * 60 - Math.floor((nextDing - now) / 1000)"
    >
      {{ duration * 60 - Math.floor((nextDing - now) / 1000) }}
    </progress>

    <button
      ref="playButton"
      style="margin-top: 0.75rem"
      @click="playing = !playing"
    >
      {{ playing ? "Stop" : "Play" }}
    </button>
    <div class="options">
      <label>
        <input type="checkbox" v-model="hideWhilePlaying" :disabled="playing" />
        Hide while playing
      </label>
    </div>
    <label>
      Soundscape
      <select v-model="selectedSoundscape" :disabled="playing">
        <option :value="null">None</option>
        <option value="morning">Morning</option>
        <option value="evening">Evening</option>
      </select>
    </label>
  </section>
  <button
    id="full-screen-stop"
    v-if="playing && hideWhilePlaying"
    @click="playing = !playing"
  ></button>
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
</template>

<script setup lang="ts">
import dingWav from "./assets/ding.wav";
import morningMp3 from "./assets/morning.mp3";
import eveningMp3 from "./assets/evening.mp3";
import { ref, watch, computed, reactive, watchEffect } from "vue";

const playButton = ref<HTMLButtonElement | null>(null);
const ding = ref<HTMLAudioElement | null>(null);
const morning = ref<HTMLAudioElement | null>(null);
const evening = ref<HTMLAudioElement | null>(null);
const selectedSoundscape = ref<"morning" | "evening" | null>(
  (localStorage.getItem("selectedSoundscape") as
    | "morning"
    | "evening"
    | null) || null
);
const duration = ref<number>(+(localStorage.getItem("duration") || "1"));
const playing = ref<boolean>(false);
const hideWhilePlaying = ref<boolean>(
  localStorage.getItem("hideWhilePlaying") === "true"
);

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

const whenIsNextDing = computed(() => {
  // Determine the time difference between now and `nextDing` in seconds
  const diff = Math.floor((nextDing.value - now.value) / 1000);
  // If the difference is less than 60 seconds, return the difference
  if (diff < 60) return `${diff} ${diff === 1 ? "second" : "seconds"}`;
  // Otherwise, return the difference in minutes
  return `${Math.floor(diff / 60)} ${diff / 60 < 2 ? "minute" : "minutes"}`;
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
    if (playing.value) {
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
    }, 1000);
    setTimeout(() => {
      now.value = Date.now();
    }, 1);

    if (selectedSoundscape.value === "morning" && morning.value) {
      morning.value.currentTime = 0;
      morning.value.play();
    } else if (selectedSoundscape.value === "evening" && evening.value) {
      evening.value.currentTime = 0;
      evening.value.play();
    }
  } else {
    clearTimeout(timeout.value);
    wakeLock.release();
    clearInterval(trackNow.value);
    if (morning.value) morning.value.pause();
    if (evening.value) evening.value.pause();
  }
});

watchEffect(() => {
  localStorage.setItem("duration", duration.value.toString());
});

watchEffect(() => {
  localStorage.setItem("hideWhilePlaying", hideWhilePlaying.value.toString());
});

watchEffect(() => {
  localStorage.setItem("selectedSoundscape", selectedSoundscape.value || "");
});
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

progress {
  width: 100%;
}

h1 {
  margin: 1rem;
}

progress,
input[type="range"] {
  height: 1rem;
  margin: 0;
}

.options {
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
}

#full-screen-stop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 100;
}
</style>
