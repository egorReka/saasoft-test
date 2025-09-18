<script setup lang="ts">
import { ref } from 'vue'
import IconEye from './icons/IconEye.vue'
import IconEyeClosed from './icons/IconEyeClosed.vue'

const isViewPassword = ref<boolean>(false)
const value = defineModel<string>()
const emit = defineEmits<{ (e: 'blur', event: FocusEvent): void }>()
</script>

<template>
  <label class="input-password">
    <input
      class="input-password__field"
      :type="isViewPassword ? 'text' : 'password'"
      name="pass"
      autocomplete="off"
      required
      @blur="emit('blur', $event)"
      v-model="value"
    />

    <button
      class="input-password__button"
      type="button"
      aria-label="Показать или скрыть пароль"
      @click="isViewPassword = !isViewPassword"
    >
      <IconEye class="input-password__icon" v-if="isViewPassword" />
      <IconEyeClosed class="input-password__icon" v-else />
    </button>
  </label>
</template>

<style scope>
.input-password {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  gap: 3px;
  padding: 5px;
  border: 1px solid var(--color-line);
  border-radius: 5px;
}

.input-password.input-error {
  outline: 2px solid var(--color-error);
}

.input-password:focus-within {
  outline: 2px solid var(--color-default-black);
}

.input-password__field {
  display: block;
  width: 100%;
  padding: 0;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-text);
  background-color: transparent;
  border: none;
  outline: none;
}

.input-auth::placeholder {
  color: var(--color-jungle-mist);
}

.input-password__button {
  display: grid;
  place-content: center;
  width: 15px;
  height: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: opacity 0.2s;
}

.input-password__button:hover,
.input-password__button:focus {
  opacity: 0.5;
}
</style>
