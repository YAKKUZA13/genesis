import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export interface Entity {
  id: number;
  name: string;
  type: 'lead' | 'contact' | 'company';
}

export const useEntityStore = defineStore('entity', () => {
  const results = ref<Entity[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const createEntity = async (
    type: 'lead' | 'contact' | 'company',
    data: { name: string }
  ) => {
    error.value = null;
    isLoading.value = true;
    
    try {
      const response = await axios.post('/create-entity', {
        entityType: type === 'lead' ? 'Сделка' 
          : type === 'contact' ? 'Контакт' 
          : 'Компания',
        data
      });

      const newEntity: Entity = {
        id: response.data.id,
        name: data.name,
        type
      };

      results.value.push(newEntity);
      return newEntity;
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Ошибка создания сущности';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return { results, isLoading, error, createEntity };
});