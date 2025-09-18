<script setup lang="ts">
import HeaderForm from './components/HeaderForm.vue';
import InputString from './components/InputString.vue';
import IconBasket from './components/icons/IconBasket.vue';
import SelectType from './components/SelectType.vue';
import InputPassword from './components/InputPassword.vue';
import { useRecordsStore } from './stores/records.store';
import { onMounted } from 'vue';
import type { Record } from './interfaces/record.interface';

const recordsStore = useRecordsStore();

function isRequired(value: string): boolean {
  return value.trim() !== '';
}

function isMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

function isReadyValidation(record: Record): boolean {
  if (record.type === 'local') {
    return isRequired(record.login.value) && isRequired(record.password.value);
  }

  if (record.type === 'ldap') {
    return isRequired(record.login.value);
  }

  return false;
}

function validateRecord(record: Record) {
  if (typeof record.label.value === 'string') {
    record.label.isValid = isMaxLength(record.label.value, 50);
  }

  record.login.isValid = isRequired(record.login.value) && isMaxLength(record.login.value, 100);

  if (record.type === 'local') {
    record.password.isValid = isRequired(record.password.value) && isMaxLength(record.password.value, 100);
  } else {
    record.password.isValid = true;
  }

  if (record.label.isValid && record.login.isValid && record.password.isValid) {
    recordsStore.updateRecordCompleted(record);
  }
}

onMounted(() => {
  recordsStore.loadRecords();
});
</script>

<template>
  <form action="" class="app">
    <HeaderForm />

    <table class="records-table">
      <thead>
        <tr>
          <th>Метка</th>
          <th>Тип записи</th>
          <th>Логин</th>
          <th>Пароль</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in recordsStore.records" :key="record.id">
          <td>
            <InputString v-if="typeof record.label.value === 'string'" v-model="record.label.value" type="text"
              name="label" :class="{ 'input-error': !record.label.isValid }"
              @blur="isReadyValidation(record) && validateRecord(record)" />
          </td>
          <td>
            <SelectType v-model="record.type" name="select-type"
              @change="isReadyValidation(record) && validateRecord(record)" />
          </td>
          <td :colspan="record.type === 'ldap' ? 2 : 1">
            <InputString v-model="record.login.value" type="text" name="login" required
              :class="{ 'input-error': !record.login.isValid }"
              @blur="isReadyValidation(record) && validateRecord(record)" />
          </td>
          <td v-if="record.type === 'local'">
            <InputPassword v-model="record.password.value" @blur="isReadyValidation(record) && validateRecord(record)"
              :class="{ 'input-error': !record.password.isValid }" />
          </td>
          <td>
            <button class="records-table__remove" type="button" title="Удалить запись" aria-label="Удалить запись."
              @click="recordsStore.removeRecord(record)">
              <IconBasket />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

  </form>
</template>

<style scoped>
.app {
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  row-gap: 30px;
  max-width: 768px;
  height: 100vh;
  margin: 0 auto;
  padding: 60px;
}

.records-table {
  width: 100%;
  border-collapse: collapse;
}

.records-table th {
  opacity: 0.4;
}

.records-table th,
.records-table td {
  text-align: left;
  padding: 5px;
}

.records-table td:nth-child(1) {
  width: 150px;
}

.records-table td:nth-child(2) {
  width: 100px;
}

.records-table td:last-child {
  width: 40px;
}

.records-table__remove {
  display: grid;
  place-content: center;
  width: 30px;
  height: 30px;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: var(--color-text);
  opacity: 0.4;
  transition: opacity 0.2s;
}

.records-table__remove:hover,
.records-table__remove:focus {
  opacity: 0.7;
}
</style>
