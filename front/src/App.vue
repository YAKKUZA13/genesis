<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEntityStore } from './stores/entity';
import AppDropdown from './components/AppDropdown.vue';
import AppButton from './components/AppButton.vue';
import ResultsList from './components/ResultsList.vue';
import EntityNameModal from './components/EntityNameModal.vue';

const entityStore = useEntityStore();
const selectedEntity = ref<string>('');
const modalRef = ref<InstanceType<typeof EntityNameModal>>();

const entityOptions = [
  { value: '', label: 'Не выбрано' },
  { value: 'lead', label: 'Сделка' },
  { value: 'contact', label: 'Контакт' },
  { value: 'company', label: 'Компания' }
];

const entityTypeLabels = {
  lead: 'Сделки',
  contact: 'Контакта',
  company: 'Компании'
} as const;

const isButtonDisabled = computed(() => !selectedEntity.value);

const handleCreate = () => {
  if (!selectedEntity.value) return;
  modalRef.value?.open(entityTypeLabels[selectedEntity.value as keyof typeof entityTypeLabels]);
};

const handleConfirm = async (name: string) => {
  try {
    const createdEntity = await entityStore.createEntity(
      selectedEntity.value as 'lead' | 'contact' | 'company',
      { name }
    );
    selectedEntity.value = '';
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<template>
  <div class="container">
    <h1>Создание сущностей в amoCRM</h1>
    
    <div class="controls">
      <AppDropdown 
        v-model="selectedEntity"
        :options="entityOptions"
      />
      <AppButton
        :disabled="isButtonDisabled"
        :loading="entityStore.isLoading"
        @click="handleCreate"
      >
        {{ entityStore.isLoading ? '' : 'Создать' }}
      </AppButton>
    </div>

    <div v-if="entityStore.error" class="error">
      {{ entityStore.error }}
    </div>

    <ResultsList :items="entityStore.results" />

    <EntityNameModal
      ref="modalRef"
      @confirm="handleConfirm"
      @cancel="selectedEntity = ''"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
}

.error {
  color: #dc3545;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background-color: #f8d7da;
}
</style>