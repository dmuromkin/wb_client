/**
 * Запрос ABC за выбранный период
 * @param {*} dateFrom Начальная дата
 * @param {*} dateTo Конечная дата 
 */
export async function fetchABC(dateFrom, dateTo) {
  const url = `${import.meta.env.VITE_API_URL}/abc?dateFrom=${dateFrom}&dateTo=${dateTo}`

  const response = await fetch(url)

  if (!response.ok) {
    let errorDetail = ""

    try {
      const errorBody = await response.json()
      errorDetail = errorBody.detail || JSON.stringify(errorBody)
    } catch (_) {
      errorDetail = await response.text()
    }

    throw new Error(`Ошибка API: ${response.status} — ${errorDetail}`)
  }

  return await response.json()
}