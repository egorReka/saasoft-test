import type { Record } from "@/interfaces/record.interface";
import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'records';

export const useRecordsStore = defineStore('records', () => {
  const records = ref<Record[]>([]);

  function loadRecords() {
    const storedRecords = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedRecords) {
      records.value = JSON.parse(storedRecords);
    }
  }

  function saveRecords(record: Record) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(record));
  }

  function addRecord() {
    records.value.push({
      id: uuidv4(),
      label: { value: ''},
      type: 'local',
      login: { value: ''},
      password: { value: ''},
    });
  }

  function removeRecord(id: string) {
    records.value = records.value.filter(record => record.id !== id);
  }

  function validateField() {
    console.log('validate');
  }


  return { records, addRecord, removeRecord, loadRecords, saveRecords, validateField };
});
