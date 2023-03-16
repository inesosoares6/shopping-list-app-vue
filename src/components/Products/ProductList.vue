<template>
  <q-item
    @click="
      storeList.fbUpdateProduct({
        id: id,
        updates: { completed: !product.completed },
      })
    "
    :class="!product.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
    v-touch-hold:1000.mouse="showEditProductModal"
  >
    <q-item-section side top>
      <q-checkbox v-model="product.completed" />
    </q-item-section>
    <q-item-section>
      <q-item-label
        :class="{ 'text-strike': product.completed }"
        v-html="filtered"
      >
      </q-item-label>
      <q-item-label v-if="product.notes" class="text-caption text-grey-6"
        >{{ product.notes }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-item-label
          class="text-caption text-weight-light text-grey-6 q-mt-md"
          :style="{ fontSize: '10px' }"
          >{{ product.owner }}
        </q-item-label>
        <q-btn
          v-if="!product.completed"
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
        :product="product"
        :id="id"
        :list="true"
        @close="showEditProduct = false"
      />
    </q-dialog>
  </q-item>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import EditProduct from "src/components/Products/Modals/EditProduct.vue";
import { useListStore } from "src/stores/store-list";

const storeList = useListStore();

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
    storeList.fbDeleteProduct(id, false);
  });
};

const showEditProduct = ref(false);
const showEditProductModal = () => {
  showEditProduct.value = true;
};

const filtered = computed(() => {
  if (storeList.search) {
    let searchRegExp = new RegExp(storeList.search, "ig");
    return props.product.name.replace(searchRegExp, (match) => {
      return '<span class="bg-yellow-6">' + match + "</span>";
    });
  }
  return props.product.name;
});
</script>
