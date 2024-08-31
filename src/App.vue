<script setup lang="ts">
    import { invoke } from '@tauri-apps/api/tauri';

</script>

<template>
    <div>
  <transition>
    <RouterView />
  </transition>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

@media (prefers-color-scheme: light) {
  :root {
    --text: #19130a;
    --background: #fbeedf;
    --primary: #b86b00;
    --secondary: #dcb384;
    --accent: #c97d26;
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    --text: #f4ede4;
    --background: #201304;
    --primary: #ffb145;
    --secondary: #7c5323;
    --accent: #d88c36;
  }
}

:root {
    --border-radius: 1rem;
}


.header {

    h1 {
        font-size: 3rem;
        margin: 0;
        text-align: center;
        width: 100%;
        padding: 0;
        color: var(--primary);
        transform: skew(-10deg);

        span:nth-child(2) {
            color: var(--secondary);
        }

        span:nth-child(3) {
            font-size: 1.25rem;
            color: var(--background);
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: var(--secondary);
        }
    }
}

body {
    font-family: 'Inter', sans-serif !important;
    background-color: var(--background);
    color: var(--text);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}



.v-enter-active {
    transition: 0.3s ease;
}

.v-enter-from {
    transform: rotateZ(10deg) scale(0.9);
    opacity: 0;
}

</style>

