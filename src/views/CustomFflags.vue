
<template>
    <div class="settings-container">
        <div class="header">
            <h1><span>custom </span><span>fast flags</span></h1>
        </div>

        <div class="buttons">
            <div>
                <RouterLink to="settings">
                    <button class="button-left" @click="save_cache()">
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
                <RouterLink to="customfflags">
                <button class="button-right" @click="paste_json()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M160 0c-23.7 0-44.4 12.9-55.4 32L48 32C21.5 32 0 53.5 0 80L0 400c0 26.5 21.5 48 48 48l144 0 0-272c0-44.2 35.8-80 80-80l48 0 0-16c0-26.5-21.5-48-48-48l-56.6 0C204.4 12.9 183.7 0 160 0zM272 128c-26.5 0-48 21.5-48 48l0 272 0 16c0 26.5 21.5 48 48 48l192 0c26.5 0 48-21.5 48-48l0-220.1c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1L320 128l-48 0zM160 40a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                        paste json
                    </button>
                </RouterLink>
            </div>
        </div>

        <div class="options">
            <li>
                <input type="text" placeholder="fflag key" v-model="new_key_input" />
                <input type="text" placeholder="fflag value" v-model="new_value_input" />
                <button @click="add_key">
                    <svg id="add-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                </button>
                </li>

                <li v-for="(value, key) in customfflags_values" :key="key">
                    <input type="text" :value="key" readonly />
                    <input type="text" v-model="customfflags_values[key]" />

                    <button @click="delete customfflags_values[key]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                </li>
     
        </div>
    </div>
</template>

<script setup lang="ts">

    import { reactive, ref } from 'vue'
    import { KeyString } from '../fflags'
    import { animateSpin } from '../lib'

    import { invoke } from '@tauri-apps/api/tauri'
    import { message } from '@tauri-apps/api/dialog'
    import { readText } from '@tauri-apps/api/clipboard'

    let customfflags_values = reactive<KeyString>({

    })

    let new_key_input = ref('')
    let new_value_input = ref('')

    function add_key() {
        

        customfflags_values[new_key_input.value] = new_value_input.value
    }

    function paste_json() {
        readText().then((text) => {
            let json;
            try { 
                json = JSON.parse(text)
            }
            catch (e) {
                console.error(e)
                message('Make sure it has curly braces and quotes around the keys. (' + e + ')', 'The JSON you pasted is invalid.')
                return
            }

            for (let key in json) {
                customfflags_values[key] = json[key]
            }
        })
    }

    function save_cache() {
        invoke('set_custom_fflags_cache', { 'json': customfflags_values })
    }

    function setup() {
        invoke('get_custom_fflags_cache')
            .catch((e) => {
                console.error(e)
                message('An error occurred while trying to get the custom fflags cache.', 'Error')
            })
            .then((fflags) => {
            for (let key in fflags) {
                customfflags_values[key] = fflags[key]
            }
        })
    }

    setup()
    
</script>

<style scoped>

.settings-container {
    width: clamp(30rem, 50vw, 60rem);
    height: clamp(20rem, 70vh, 90rem);

    border-radius: 3rem;

    overflow-y: auto;
    overflow-x: hidden;
    padding: 2rem;
}
.options {
    margin-top: 2rem;
    
    li:first-child {

        input {
            border-radius: var(--border-radius) var(--border-radius) 0 0;
        }


        button {
            border-radius: var(--border-radius) var(--border-radius) 0 0;
        }
       
    }

    li:last-child {
        input {
            border-radius: 0 0 var(--border-radius) var(--border-radius);
        }

        button {
            border-radius: 0 0 var(--border-radius) var(--border-radius);
        }
    
    }

    li:first-child:last-child {
        input {
            border-radius: var(--border-radius);
        }

        button {
            border-radius: var(--border-radius);
        }
    }
}

li {
    list-style-type: none;
    margin: 0;
    padding: 0;

    display: flex;

    gap: 1rem;

    input {
        padding: 0.7rem;
        width: 100%;
        border: none;

        background-color: var(--secondary);

        color: var(--text);
        font-size: 1.2rem;

        &:focus {
            outline: none;
        }
    }



    

    button {
        padding: 0.7rem;
        border: none;

        background-color: var(--secondary);



        svg {
            width: 1.2rem;
            height: 1.2rem;
            fill: var(--text);
        }

        &:hover {
            background-color: var(--accent);
        }
    }

}

</style>
