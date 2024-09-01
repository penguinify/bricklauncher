<template>
    <div>
        <h3 class="setting-label">{{ label }}</h3>
        <p class="setting-description">{{ description }}</p>
        <select
            @change="
                emit('update:value', ($event.target as HTMLSelectElement).value)
            "
        >
            <option
                v-for="option in props.options"
                :value="option"
                :selected="option === props.default"
            >
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    default: string
    label: string
    description: string
    value: string
    options: string[]
}>()

const emit = defineEmits(['update:value'])
</script>

<style scoped>
select {
    width: 100%;
    padding: 2rem;
    margin-top: 1rem;
    font-size: 1.5rem;

    &:focus {
        outline: none;
    }
}
</style>
