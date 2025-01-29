<script setup lang="ts">
import { ref, computed } from 'vue';

const emit = defineEmits(['confirm', 'cancel']);
const entityName = ref('');
const isOpen = ref(false);
const entityType = ref('');

const open = (type: string) => {
  entityType.value = type;
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
  entityName.value = '';
};

const handleConfirm = () => {
  if (isFormValid.value) {
    emit('confirm', entityName.value);
    close();
  }
};

const isFormValid = computed(() => entityName.value.trim().length > 0);

defineExpose({ open });
</script>

<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <h3>Введите название {{ entityType }}</h3>
      <input
        v-model="entityName"
        type="text"
        placeholder="Название сущности"
        class="modal-input"
        @keyup.enter="handleConfirm"
      />
      <div class="modal-actions">
        <button
          class="modal-button cancel"
          @click="close"
        >
          Отмена
        </button>
        <button
          class="modal-button confirm"
          :disabled="!isFormValid"
          @click="handleConfirm"
        >
          Создать
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 400px;
}

h3 {
  margin: 0 0 1.5rem 0;
  color: #2c3e50;
}

.modal-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.modal-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.2s;
}

.modal-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel {
  background-color: #f8f9fa;
  color: #6c757d;
}

.confirm {
  background-color: #0d6efd;
  color: white;
}

.confirm:not(:disabled):hover {
  background-color: #0b5ed7;
}
</style>