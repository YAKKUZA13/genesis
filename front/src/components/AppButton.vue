<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  loading?: boolean;
}>();
</script>

<template>
  <button
    class="button"
    :class="{ 'button--active': !disabled, 'button--loading': loading }"
    :disabled="disabled || loading"
  >
    <span class="button-content">
      <slot />
    </span>
    <span v-if="loading" class="loader"></span>
  </button>
</template>

<style scoped>
.button {
  position: relative;
  padding: 0.75rem 2rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: white;
  color: #adb5bd;
  font-size: 1rem;
  cursor: not-allowed;
  transition: all 0.2s;
}

.button--active {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
  cursor: pointer;
}

.button--active:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.button--loading .button-content {
  visibility: hidden;
}

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>