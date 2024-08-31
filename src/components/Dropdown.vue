<template>
    <div>
        <h3 class="setting-label">{{ label }}</h3>
        <p class="setting-description">{{ description }}</p>
        <select v-model="props.value" @change="emit('update:value', $event.target.value)">
            <option v-for="option in props.options" :value="option" :selected="option === props.default">{{ option }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">

    import { defineEmits } from 'vue';

    const props = defineProps<{
        default: string
        label: string
        description: string
        value: string
        options: string[]
        
    }>();

    const emit = defineEmits(['update:value']);

</script>

<style scoped>
    select {
        width: 100%;
        padding: 2rem;
        margin-top: 0.5rem;
        font-size: 1.5rem;
    }
</style>
