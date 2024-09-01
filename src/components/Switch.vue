// Copyright - 2024 arghyaBiswasDev (Arghya Biswas) Under MIT License // All
rights reserved.

<template>
  <div>
    <h3 class="setting-label">{{ label }}</h3>
    <p class="setting-description">{{ description }}</p>
    <label class="switch">
      <input
        type="checkbox"
        :checked="props.default === 'True'"
        @change="
          emit(
            'update:value',
            ($event.target as HTMLInputElement)?.checked ? 'True' : 'False',
          )
        "
      />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  default: string;
  label: string;
  description: string;
  value: string;
}>();

const emit = defineEmits(["update:value"]);
</script>

<style scoped>
.switch {
  margin-top: 1rem;
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3em;
  height: 1.5em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background);
  border: 1px solid var(--secondary);
  transition: 0.4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.03em;
  width: 1em;
  border-radius: 20px;
  left: 0.27em;
  bottom: 0.2em;
  background-color: var(--secondary);
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--accent);
  border: 1px solid var(--accent);
}

input:focus + .slider {
  box-shadow: 0 0 1px #007bff;
}

input:checked + .slider:before {
  transform: translateX(1.4em);
  background-color: var(--background);
}
</style>
