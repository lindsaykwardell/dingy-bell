import { ref, reactive, watchEffect } from "vue";

// Shared state
const bellEnabled = ref<boolean>(
  (localStorage.getItem("bellEnabled") ?? "true") === "true"
);

const selectedSoundscape = ref<
  "morning" | "evening" | "forestRiver" | "oceanWaves" | "rainyOcean" | "rainyNight" | null
>(
  (localStorage.getItem("selectedSoundscape") as
    | "morning"
    | "evening"
    | "forestRiver"
    | "oceanWaves"
    | "rainyOcean"
    | "rainyNight"
    | null) || null
);

const duration = ref<number>(+(localStorage.getItem("duration") || "1"));

const mode = ref<"meditation" | "pomodoro">(
  (localStorage.getItem("mode") as "meditation" | "pomodoro") || "meditation"
);

// Pomodoro settings
const pomodoroSettings = reactive({
  workDuration: +(localStorage.getItem("pomodoroWorkDuration") || "25"),
  breakDuration: +(localStorage.getItem("pomodoroBreakDuration") || "5"),
  longBreakDuration: +(
    localStorage.getItem("pomodoroLongBreakDuration") || "15"
  ),
  cycles: +(localStorage.getItem("pomodoroCycles") || "4"),
});

// Soundscape name mapping
const soundscapeNames = {
  morning: "Morning",
  evening: "Evening",
  forestRiver: "Forest River",
  oceanWaves: "Ocean Waves",
  rainyOcean: "Rainy Ocean",
  rainyNight: "Rainy Night",
} as const;

// Persistence
watchEffect(() => {
  localStorage.setItem("duration", duration.value.toString());
});

watchEffect(() => {
  localStorage.setItem("selectedSoundscape", selectedSoundscape.value || "");
});

watchEffect(() => {
  localStorage.setItem("bellEnabled", bellEnabled.value.toString());
});

watchEffect(() => {
  localStorage.setItem("mode", mode.value);
});

watchEffect(() => {
  localStorage.setItem(
    "pomodoroWorkDuration",
    pomodoroSettings.workDuration.toString()
  );
});

watchEffect(() => {
  localStorage.setItem(
    "pomodoroBreakDuration",
    pomodoroSettings.breakDuration.toString()
  );
});

watchEffect(() => {
  localStorage.setItem(
    "pomodoroLongBreakDuration",
    pomodoroSettings.longBreakDuration.toString()
  );
});

watchEffect(() => {
  localStorage.setItem("pomodoroCycles", pomodoroSettings.cycles.toString());
});

export function useAppState() {
  return {
    bellEnabled,
    selectedSoundscape,
    duration,
    mode,
    pomodoroSettings,
    soundscapeNames,
  };
}
