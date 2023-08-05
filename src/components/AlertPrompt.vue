<template>
    <div :class="{ 'block': props.errorMsg !== '', 'hidden': props.errorMsg === '' }"
        class="absolute top-0 right-0 bg-rose-500 text-white rounded-lg leading-10 text-2xl font-bold px-4">
        {{ props.errorMsg }}
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps(['errorMsg']);
</script>