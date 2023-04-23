<template>
  <q-item
    @click="
      storeCatalog.fbUpdateProduct({
        id: id,
        updates: { selected: !product.selected },
      })
    "
    :class="!product.selected ? 'bg-orange-1' : 'bg-orange-2'"
    clickable
    v-ripple
    v-touch-hold:1000.mouse="showEditProductModal"
  >
    <q-item-section side top>
      <q-checkbox v-model="product.selected" />
    </q-item-section>
    <q-item-section>
      <q-item-label v-html="filtered" />
      <q-item-label
        class="text-caption text-grey-6"
        v-html="filteredKeywords"
      />
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          flat
          round
          dense
          :color="product.favorite ? 'orange-5' : 'grey-5'"
          icon="favorite"
          @click.stop="updateFavorites"
        />
        <q-btn
          flat
          round
          dense
          color="primary"
          icon="edit"
          @click.stop="showEditProductModal"
        />
        <q-btn
          flat
          round
          dense
          color="red"
          icon="delete"
          @click.stop="promptToDelete(id)"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditProduct">
      <edit-product
        :list="false"
        :product="product"
        :id="id"
        @close="showEditProduct = false"
      />
    </q-dialog>
  </q-item>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import EditProduct from "src/components/Products/Modals/EditProduct.vue";
import { useCatalogStore } from "src/stores/store-catalog";

const storeCatalog = useCatalogStore();

const props = defineProps(["product", "id"]);

const $q = useQuasar();
const promptToDelete = (id) => {
  $q.dialog({
    title: "Confirm",
    message: "Really delete?",
    ok: {
      push: true,
    },
    cancel: {
      color: "negative",
    },
    persistent: true,
  }).onOk(() => {
    storeCatalog.fbDeleteProduct(id);
  });
};

const showEditProduct = ref(false);
const showEditProductModal = () => {
  showEditProduct.value = true;
};

const filtered = computed(() => {
  if (storeCatalog.search) {
    let searchRegExp = new RegExp(storeCatalog.search, "ig");
    return props.product.name.replace(searchRegExp, (match) => {
      return '<span class="bg-yellow-6">' + match + "</span>";
    });
  }
  return props.product.name;
});

const filteredKeywords = computed(() => {
  if (storeCatalog.search) {
    let searchRegExp = new RegExp(storeCatalog.search, "ig");
    return props.product.keywords.replace(searchRegExp, (match) => {
      return '<span class="bg-yellow-6">' + match + "</span>";
    });
  }
  return props.product.keywords;
});

const updateFavorites = () => {
  storeCatalog.fbUpdateProduct({
    id: props.id,
    updates: {
      favorite: !props.product.favorite,
    },
  });
};
</script>
