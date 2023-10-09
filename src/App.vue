<template>
  <section>
    <div style="font-size: 10rem">🔔</div>
    <h1>Dingy Bell</h1>
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
      max="10"
      step="0.5"
    />
    <!-- a loading bar, showing progress until next ding -->
    <progress
      v-else
      :max="duration * 60"
      :value="duration * 60 - Math.floor((nextDing - now) / 1000)"
    >
      70%
    </progress>

    <button @click="playing = !playing">
      {{ playing ? "Stop" : "Play" }}
    </button>
  </section>
</template>

<script setup lang="ts">
import ding from "./assets/ding.wav";
// @ts-ignore
import { useSound } from "@vueuse/sound";
import { Ref, ref, watch, computed, onMounted, reactive } from "vue";

const duration = ref(1);
const playing = ref(false);
const { play } = useSound(ding);
const timeout: Ref<undefined | number> = ref(undefined);
const nextDing = ref(0);
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
  return `${Math.floor(diff / 60)} ${diff / 60 === 1 ? "minute" : "minutes"}`;
});

const playDing = () => {
  play();
  if (playing) {
    nextDing.value = Date.now() + duration.value * 1000 * 60;
    timeout.value = setTimeout(playDing, duration.value * 1000 * 60);
  }
};

watch(playing, (newPlaying) => {
  if (newPlaying) {
    playDing();
    wakeLock.request();
  } else {
    clearTimeout(timeout.value);
    wakeLock.release();
  }
});

onMounted(() => {
  setInterval(() => {
    now.value = Date.now();
  }, 1000);
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
</style>
