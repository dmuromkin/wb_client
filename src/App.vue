<template>
  <div class="container">
    <h4>ABC анализ продаж Wildberies</h4>

    <div class="filters-container">
      <DateRangePicker
        :dateFromValue="dateFrom"
        :dateToValue="dateTo"
        @update:dateFromValue="dateFrom = $event"
        @update:dateToValue="dateTo = $event"
      />

      <button 
        class="fetch-button" 
        @click="fetchData"
        :disabled="loading"
      >
        Выполнить ABC анализ 
      </button>

      <button
        v-if="data.length > 0"
        class="excel-button"
        @click="downloadExcel"
        :disabled="loading"
      >
        Сформировать Excel отчёт
      </button>
    </div>
    
    <LoadSpinner v-if="loading" />
    <DataTable
      v-else 
      :data="data"
      :loading="loading"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  import DateRangePicker from '@/components/DateRangePicker.vue'
  import DataTable from '@/components/DataTable.vue'
  import LoadSpinner from '@/components/LoadSpinner.vue'

  import { fetchABC } from '@/services/api.js'
  import { generateExcelReport } from '@/services/excelReport.js'

  const dateFrom = ref('')
  const dateTo = ref('')
  const data = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchData() {
    if (!dateFrom.value || !dateTo.value) {
      alert('Выберите обе даты')
      return
    }

    loading.value = true

    try {
      data.value = await fetchABC(dateFrom.value, dateTo.value)
    } catch (error) {
       console.error(error)
       alert(error.message)
    }
    finally {
      loading.value = false
    }
  }

  async function downloadExcel() {
    await generateExcelReport(data.value)
  }
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.filters-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

/* Кнопки */
.fetch-button,
.excel-button {
  padding: 8px 15px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  white-space: nowrap;
}

.fetch-button {
  background-color: #0047e1c2;
  color: white;
}

.excel-button {
  background-color: #008000bd;
  color: white;
}

.excel-button:hover {
  background-color: #115fbb;
}


/* --- Адаптивные стили для малых экранов --- */
@media (max-width: 600px) {

  .container {
    padding: 10px;
  }

  .filters-container {
    flex-direction: column; 
    align-items: stretch;
    gap: 12px;
  }

  .fetch-button,
  .excel-button {
    width: 100%; 
    height: auto;
    padding: 10px;
    font-size: 14px;
  }

  h4 {
    text-align: center;
    font-size: 18px;
  }
}
</style>