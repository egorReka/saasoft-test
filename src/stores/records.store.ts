import type { Record } from '@/interfaces/record.interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'records';

function parseLabelArray(value: { text: string }[]): string {
  return value.map(item => item.text.trim()).join('; ');
}

function stringifyLabelString(value: string): { text: string }[] {
  return value
    .split(';')
    .map(item => item.trim())
    .filter(item => item !== '')
    .map(item => ({ text: item }));
}

export const useRecordsStore = defineStore('records', () => {
  const records = ref<Record[]>([]);
  const recordsCompleted = ref<Record[]>([]);

  function loadRecords() {
    const storedRecords = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (storedRecords) {
      const parsedRecords:Record[] = JSON.parse(storedRecords);

      records.value = parsedRecords.map((record) => ({
        ...record,
        label: {
          ...record.label,
          value: Array.isArray(record.label.value)
            ? parseLabelArray(record.label.value)
            : record.label.value,
        },
      }));

      recordsCompleted.value = [...records.value];
    }
  }

  function saveRecordsStore(newRecords: Record[]) {
    const preparedRecords = newRecords.map((record) => ({
      ...record,
      label: {
        ...record.label,
        value: typeof record.label.value === 'string'
          ? stringifyLabelString(record.label.value)
          : record.label.value,
      },
    }));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preparedRecords));
  }

  function updateRecordCompleted(record: Record) {
    const index = recordsCompleted.value.findIndex(r => r.id === record.id);

    if (index !== -1) {
      recordsCompleted.value[index] = record;
    } else {
      recordsCompleted.value.push(record);
    }

    saveRecordsStore(recordsCompleted.value);
  }

  function removeRecordCompleted(record: Record) {
    recordsCompleted.value = recordsCompleted.value.filter(r => r.id !== record.id);
    saveRecordsStore(recordsCompleted.value);
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
