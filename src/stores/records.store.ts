import type { Record } from '@/interfaces/record.interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'records';

export const useRecordsStore = defineStore('records', () => {
  const records = ref<Record[]>([]);
  const recordsCompleted = ref<Record[]>([]);

  function loadRecords() {
    const storedRecords = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (storedRecords) {
      records.value = JSON.parse(storedRecords);
      recordsCompleted.value = JSON.parse(storedRecords);
    }
  }

  function saveRecordsStore(newRecords: Record[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRecords))
  }

  function updateRecordCompleted(record: Record) {
    const index = recordsCompleted.value.findIndex(r => r.id === record.id);

    if (index !== -1) {
      recordsCompleted.value[index] = record;
      saveRecordsStore(recordsCompleted.value);

      return;
    }

    recordsCompleted.value.push(record);
    saveRecordsStore(recordsCompleted.value);
  }

  function removeRecordCompleted(record: Record) {
    const index = recordsCompleted.value.findIndex(r => r.id === record.id);

    if (index !== -1) {
      recordsCompleted.value.splice(index, 1);
      saveRecordsStore(recordsCompleted.value);
    }
  }

  function removeRecord(record: Record) {
    const index = records.value.findIndex(r => r.id === record.id);

    if (index !== -1) {
      records.value.splice(index, 1);
    }

    removeRecordCompleted(record);
  }

  function addRecord() {
    records.value.push({
      id: uuidv4(),
      label: { value: '', isValid: true },
      type: 'local',
      login: { value: '', isValid: true },
      password: { value: '', isValid: true },
    })
  }

  return { records, addRecord, removeRecord, loadRecords, updateRecordCompleted }
})
