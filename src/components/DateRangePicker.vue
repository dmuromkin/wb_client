<template>
  <div class="filters">
    <label>
      С:
      <input type="date" :value="dateFromValue" @input="onFromChange" />
    </label>
    <label>
      По:
      <input type="date" :value="dateToValue" @input="onToChange" />
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  dateFromValue: String,
  dateToValue: String
})

const emit = defineEmits(['update:dateFromValue', 'update:dateToValue'])

function onFromChange(event) {
  emit('update:dateFromValue', event.target.value)
}

function onToChange(event) {
  emit('update:dateToValue', event.target.value)
}
</script>

<style scoped>
.filters {
  display: flex;
  gap: 10px; /* расстояние между "С" и "По" */
}

.filters label {
  font-weight: bold;
}

.filters input[type="date"] {
  margin-left: 5px;
  padding: 3px 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
