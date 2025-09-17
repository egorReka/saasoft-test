<script setup lang="ts"></script>

<template>
  <select class="select-type">">
    <option value="local">Локальная</option>
    <option value="ldap">LDAP</option>
  </select>
</template>

<style scope>
.select-type {
  display: block;
  width: 100%;
  min-width: 100px;
  padding: 5px;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-text);
  background-color: transparent;
  border: 1px solid var(--color-line);
  border-radius: 5px;
}
</style>
