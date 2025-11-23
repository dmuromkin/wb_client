<template>
  <div class="spinner-container" v-if="loading">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)

</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 6px solid #e0e0e0;
  border-top-color: #3b82f6; /* синий цвет для эффекта вращения */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
