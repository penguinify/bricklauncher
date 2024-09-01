<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    var theme = ref('light');

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.value = 'dark';
    }

    if (theme.value === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

</script>

<template>
    <div class="container">
        <transition>
        <RouterView />
        </transition>
    </div>
</template>
