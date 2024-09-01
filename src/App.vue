<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
import router from './views/router'

async function load_theme() {

    let config = await invoke('get_config')

    if (config.theme) {
        document.documentElement.setAttribute('data-theme', config.theme)
        return;
    }

    var theme = ref('light')

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.value = 'dark'
    }

    if (theme.value === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
    }
}

async function setup() {
    load_theme()

    let result: string = await invoke('verify_files');

    switch (result) {
        case 'no_roblox':
            router.push('/setup')
            break
        case 'ok':
            console.log('Files are good')
            break
    }
}

onMounted(setup)
</script>

<template>
    <div class="container">
        <transition>
            <RouterView />
        </transition>
    </div>
</template>
