import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

/**
 * Формирование отчета по ABC анализу в формате Excel
 * @param {A} data Данные
 */
export async function generateExcelReport(data) {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('Отчёт')

  sheet.columns = [
    { header: 'Товар', key: 'subject', width: 25 },
    { header: 'Доход', key: 'revenue', width: 15 },
    { header: 'Категория', key: 'category', width: 10 },
    { header: 'Дата начала', key: 'date_from', width: 15 },
    { header: 'Дата окончания', key: 'date_to', width: 15 }
  ]

  data.forEach(row => sheet.addRow(row))

  sheet.getRow(1).font = { bold: true }

  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), 'report.xlsx')
}