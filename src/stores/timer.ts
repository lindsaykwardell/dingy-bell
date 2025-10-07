import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

export const useTimerStore = defineStore("timer", () => {
  // Basic timer state
  const playing = ref<boolean>(false);
  const now = ref<number>(Date.now());

  // Meditation timer state
  const nextDing = ref<number>(0);

  // Pomodoro timer state
  const pomodoroState = reactive({
    currentPhase: "work" as "work" | "break" | "longBreak",
    completedCycles: 0,
    currentSessionStart: 0,
    nextPhaseTime: 0,
  });

  // Timer intervals
  const timeout = ref<any>(undefined);
  const trackNow = ref<any>(undefined);

  // Wake lock
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

  // Computed properties - will be set by component
  let remainingTimePercentage = ref(0);

  // Circle circumference for SVG
  const circleRadius = 16;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const strokeDashoffset = computed(() => {
    return (
      circleCircumference -
      (remainingTimePercentage.value * circleCircumference) / 100
    );
  });

  // Actions
  function startTimer() {
    playing.value = true;
    now.value = Date.now();
    trackNow.value = setInterval(() => {
      now.value = Date.now();
    }, 10);
    wakeLock.request();
  }

  function stopTimer() {
    playing.value = false;
    clearTimeout(timeout.value);
    clearInterval(trackNow.value);
    wakeLock.release();
    nextDing.value = 0;
    pomodoroState.currentSessionStart = 0;
    pomodoroState.nextPhaseTime = 0;
    remainingTimePercentage.value = 0;
  }

  function resetPomodoroState() {
    pomodoroState.currentPhase = "work";
    pomodoroState.completedCycles = 0;
    pomodoroState.currentSessionStart = 0;
    pomodoroState.nextPhaseTime = 0;
  }

  function setPomodoroTiming(sessionStart: number, nextPhaseTime: number) {
    pomodoroState.currentSessionStart = sessionStart;
    pomodoroState.nextPhaseTime = nextPhaseTime;
  }

  function setMeditationTiming(nextDingTime: number) {
    nextDing.value = nextDingTime;
  }

  return {
    // State
    playing,
    now,
    nextDing,
    pomodoroState,
    timeout,
    trackNow,
    wakeLock,

    // Computed
    remainingTimePercentage,
    circleRadius,
    circleCircumference,
    strokeDashoffset,

    // Actions
    startTimer,
    stopTimer,
    resetPomodoroState,
    setPomodoroTiming,
    setMeditationTiming,
  };
});
