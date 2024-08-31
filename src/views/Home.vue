
<template>
    <div>
        <div class="header">
            <h1><span>brick</span><span>launcher</span><span> v{{version}}</span></h1>
        </div>
        <div class="buttons">
            <button class="button-top" @click='launchRoblox()'>launch roblox</button>
            <div>

                <RouterLink to="settings">
                <button class="button-bl">settings</button>
                </RouterLink>

                <RouterLink to="settings">
                <button class="button-br">appearance</button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { invoke } from '@tauri-apps/api/tauri';
    import { ref } from 'vue';

    function launchRoblox() {
        console.log("launching roblox");
        invoke('launch_roblox').then((res) => {
            console.log(res);
        });
    }

    let version = ref("unknown");

    invoke('get_version').then((res) => {
        version.value = res;
    });


</script>



<style scoped>


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

    .button-top {
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
    }
    
    .button-bl {
        border-bottom-left-radius: var(--border-radius);
    }

    .button-br {
        border-bottom-right-radius: var(--border-radius);
    }

}

</style>
