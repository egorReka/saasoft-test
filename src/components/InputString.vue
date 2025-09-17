<script setup lang="ts"></script>

<template>
  <input class="input-string" />
</template>

<style scope>
.input-string {
  display: block;
  width: 100%;
  padding: 5px;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-text);
  background-color: transparent;
  border: 1px solid var(--color-line);
  border-radius: 5px;
}

.input-auth::placeholder {
  color: var(--color-jungle-mist);
}
</style>
