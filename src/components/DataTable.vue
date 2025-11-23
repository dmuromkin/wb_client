<template>
  <table v-if="data.length" class="data-table">
    <thead>
      <tr>
        <th>Товар</th>
        <th>Доход</th>
        <th>Категория</th>
        <th>Начало периода</th>
        <th>Конец периода</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>{{ item.subject }}</td>
        <td>{{ item.revenue.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }) }}</td>
        <td>{{ item.category }}</td>
        <td>{{ formatDate(item.date_from) }}</td>
        <td>{{ formatDate(item.date_to) }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else-if="requested" class="no-data">Нет данных для выбранного периода</p>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  data: { type: Array, default: () => [] }
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.data-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
