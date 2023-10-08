<template>
  <!-- A slider to determine duration, from .5 to 10 seconds with .5 steps -->
  <section>
    <h1>Dingy Bell</h1>
    <p>Set the duration and click play to start the timer.</p>
    <template v-if="!playing">
      {{ duration }} {{ +duration === 1 ? "minute" : "minutes" }}
    </template>
    <template v-else>
      {{ whenIsNextDing }}
    </template>
    <input
      v-model="duration"
      :disabled="playing"
      type="range"
      min="0.5"
      max="10"
      step="0.5"
    />
    <button @click="playing = !playing">
      {{ playing ? "Stop" : "Play" }}
    </button>
  </section>
</template>

<script setup lang="ts">
import ding from "./assets/ding.wav";
// @ts-ignore
import { useSound } from "@vueuse/sound";
import { Ref, ref, watch, computed, onMounted } from "vue";

const duration = ref(1);
const playing = ref(false);
const { play } = useSound(ding);
const timeout: Ref<undefined | number> = ref(undefined);
const nextDing = ref(0);
const now = ref(Date.now());

const whenIsNextDing = computed(() => {
  // Determine the time difference between now and `nextDing` in seconds
  const diff = Math.floor((nextDing.value - now.value) / 1000);
  // If the difference is less than 60 seconds, return the difference
  if (diff < 60) return `${diff} ${diff === 1 ? "second" : "seconds"}`;
  // Otherwise, return the difference in minutes
  return `${Math.floor(diff / 60)} ${diff === 1 ? "minute" : "minutes"}`;
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
  } else {
    clearTimeout(timeout.value);
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
</style>