<template>
    <div class="settings-container">
        <div class="header">
            <h1><span>set</span><span>up</span></h1>
        </div>

        <div class="buttons">
            <RouterLink to="/">
                <button class="button-left button-right">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                        <path
                            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                    back
                </button>
            </RouterLink>
        </div>

        <div class="setup-div">
            <div id="no-roblox">
                <h2>Find your Roblox App</h2>
                <p>
                    Roblox was not found in its default path. Please open the
                    path
                </p>
                <button @click="findRobloxPath()">find roblox path</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { open, message } from '@tauri-apps/api/dialog'
import { invoke } from '@tauri-apps/api/tauri'
import router from './router'

async function findRobloxPath() {
    let path = await open({
        directory: false,
        title: 'Select Roblox App',
        filters: [{ name: 'Roblox', extensions: ['app'] }],
        multiple: false
    })
    if (path == null) {
        message('No path selected', {
            title: 'Error',
            type: 'error'
        })
        return
    }

    await invoke('edit_config', { path: 'roblox_path', value: path })

    let result = await invoke('verify_files')

    if (result == 'ok') {
        router.push('/')
    } else {
        message('Make sure you have the correct Roblox App', {
            title: 'Error',
            type: 'error'
        })
    }
}
</script>

<style scoped>
.setup-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    background-color: var(--secondary);
    padding: 1rem;

    width: clamp(20rem, 40vh, 40rem);

    border-radius: var(--border-radius);

    div {
        button {
            padding: 0.7rem 2rem;
            margin-top: 1rem;
            background-color: var(--accent);
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: background-color 0.2s;

            font-size: 0.8rem;
            font-family: 'Inter', sans-serif;
            color: var(--text);

            &:hover {
                background-color: var(--primary);
            }
        }
    }
}
</style>
