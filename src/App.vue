<script setup lang="ts">
import { ref } from 'vue';
import HeaderForm from './components/HeaderForm.vue';
import InputString from './components/InputString.vue';
import IconBasket from './components/icons/IconBasket.vue';
import SelectType from './components/SelectType.vue';
import InputPassword from './components/InputPassword.vue';

const records = ref([
  { label: '', type: 'local', login: '', password: '' },
  { label: '', type: 'ldap', login: '', password: '' },
]);

function removeRecord(index: number) {
  records.value.splice(index, 1);
}

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
        <tr v-for="(record, index) in records" :key="index">
          <td>
            <InputString type="text" maxlength="50" name="label" />
          </td>
          <td>
            <SelectType v-model="record.type" name="select-type" />
          </td>
          <td :colspan="record.type === 'ldap' ? 2 : 1">
            <InputString type="text" maxlength="100" name="login" required />
          </td>
          <td v-if="record.type === 'local'">
            <InputPassword />
          </td>
          <td>
            <button class="records-table__remove" type="button" title="Удалить запись" aria-label="Удалить запись."
              @click="removeRecord(index)">
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
