<template>
  <q-select
    filled
    class="col q-ml-sm"
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    label="Sort by"
    stack-label
  />
</template>

<script setup>
import { computed } from "vue";
import { useCatalogStore } from "src/stores/store-catalog";

const storeCatalog = useCatalogStore();
const sortBy = computed({
  get() {
    return storeCatalog.sort;
  },
  set(value) {
    storeCatalog.setSort(value);
  },
});

const options = [
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Date",
    value: "dueDate",
  },
];
</script>

<style scoped>
.q-select {
  flex: 0 0 112px;
}
</style>
