<template>
    <div class="settings-container">
        <div class="header">
            <h1><span>roblox </span><span>settings</span></h1>
        </div>

        <div class="buttons">
            <div>
                <RouterLink to="/">
                <button class="button-left">back</button>
                </RouterLink>

                <RouterLink to="settings">
                <button class="button-right" @click="patch">apply</button>
                </RouterLink>
            </div>

        </div>

        <Dropdown label="Renderer Framework" description="The renderer to use" :options="['Metal', 'Vulkan', 'OpenGL']" v-model:value="robloxsettings.Renderer.Framework" default="Metal" />
        <Dropdown label="Lighting Technology" description="The lighting technology to use" :options="['Game Default (Recommended)', 'Shadow Map: Phase 2', 'Voxel: Phase 1', 'Future: Phase 3']" v-model:value="robloxsettings.Lighting.Phase" default="Game Default (Recommended)" />
    </div>
</template>


<script setup lang="ts">
    import { Settings, flattenSettings, RobloxSettingValues } from '../fflags';
    import { PatchSettings, PatchOption } from '../settings';
    import Dropdown from '../components/Dropdown.vue';
    import { invoke } from '@tauri-apps/api/tauri';

    import { reactive } from 'vue';
    
    var robloxsettings = reactive<RobloxSettingValues>({
            Renderer: {
                Framework: "Vulkan",
            },

            Lighting: {
                Phase: "Game Default (Recommended)",
            }
        }
    )

    function patch() {
        console.log(robloxsettings);
        let settings = flattenSettings(robloxsettings);
        invoke('patch_roblox', { json: settings }).then((res) => {
            console.log(res);
        });

    }



    console.log(flattenSettings(robloxsettings));
</script>


<style>

.settings-container {
    width: clamp(30rem, 20vw, 40rem);
}

.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    a {
        width: 100%;
        transition: 0.5s ease;
    }

    button {
        background-color: var(--secondary);
        color: var(--text);
        border: none;
        padding: 1rem 0rem;
        font-size: 1.5rem;
        cursor: pointer;
        transition: 1s ease;
        width: 100%;

        font-weight: 300;

        font-family: 'Inter', sans-serif;

        &:hover {
            background-color: var(--accent);
        }
    }

    div {
        display: flex;
        width: 100%;

        &:hover :not(a:hover) {
            width: 60%;

            button {
                width: 100%;
            }
        }

        &:hover a:hover {
            button {
                width: 100%;
            }
        }
    }

    .button-right {
        border-bottom-right-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
    }
    
    .button-left {
        border-bottom-left-radius: var(--border-radius);
        border-top-left-radius: var(--border-radius);
    }


}

            .setting-label {
                font-size: 1.7rem;
                font-weight: 500;
                line-height: 0;
                margin-top: 2rem;
            }

            .setting-description {
                font-size: 1rem;
                font-weight: 300;
                line-height: 0;
            }

</style>
