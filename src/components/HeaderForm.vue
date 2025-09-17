<script setup lang="ts"></script>

<template>
  <div class="header">
    <div class="header__wrapper">
      <h1 class="header__title">Учетные записи</h1>

      <button class="header__button" type="button" title="добавить новую запись"
        aria-label="Добавить новую запись."></button>
    </div>

    <p class="header__description"><span class="header__icon-info">?</span> Для указания нескольких меток для одной пары
      логин/пароль используйте разделитель ;</p>
  </div>
</template>

<style scope>
.header__wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 15px;
}

.header__button {
  position: relative;
  width: 45px;
  height: 45px;
  border: 1px solid var(--color-acent);
  border-radius: 5px;
  transition: opacity 0.2s;
}

.header__button:hover,
.header__button:focus {
  opacity: 0.7;
}

.header__button:active {
  opacity: 1;
}

.header__button::after,
.header__button::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 14px;
  height: 2px;
  border-radius: 2px;
  background-color: var(--color-text);
  content: "";
}

.header__button::before {
  transform: translate(-50%, -50%) rotate(90deg);
}

.header__description {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  padding: 3px 5px;
  background-color: var(--color-acent);
}

.header__icon-info {
  display: grid;
  place-content: center;
  width: 18px;
  height: 18px;
  border: 1px solid var(--color-text);
  border-radius: 50%;
}
</style>
