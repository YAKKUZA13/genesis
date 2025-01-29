<script setup lang="ts">
import type { Entity } from '../stores/entity';

const entityTypeLabels = {
  lead: 'Сделка',
  contact: 'Контакт',
  company: 'Компания'
} as const;

defineProps<{
  items: Entity[];
}>();
</script>

<template>
  <div class="results">
    <h2>Созданные сущности:</h2>
    <div v-if="items.length === 0" class="empty">Нет созданных сущностей</div>
    <ul v-else class="list">
      <li 
        v-for="item in items" 
        :key="item.id"
        class="list-item"
      >
        <span class="type">{{ entityTypeLabels[item.type] }}:</span>
        <span class="name">{{ item.name }}</span>
        <span class="id">(ID: {{ item.id }})</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.results {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

h2 {
  margin-bottom: 1rem;
}

.empty {
  color: #6c757d;
  font-style: italic;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  padding: 0.5rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  gap: 1rem;
  align-items: baseline;
}

.list-item:last-child {
  border-bottom: none;
}

.type {
  font-weight: bold;
  min-width: 100px;
  color: #2c3e50;
}

.name {
  flex-grow: 1;
}

.id {
  color: #6c757d;
  font-family: monospace;
}
</style>