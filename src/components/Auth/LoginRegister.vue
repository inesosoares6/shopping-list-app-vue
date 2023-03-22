<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ titleCase }} to access your shopping lists anywhere!
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        ref="emailRef"
        class="col"
        outlined
        v-model="formData.email"
        label="Email"
        stack-label
        :rules="[
          (val) =>
            isValidEmailAddress(val) || 'Please enter a valid email address',
        ]"
        lazy-rules
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        ref="passwordRef"
        class="col"
        outlined
        v-model="formData.password"
        label="Password"
        stack-label
        type="password"
        :rules="[
          (val) => val.length >= 6 || 'Please enter at least 6 characters',
        ]"
        lazy-rules
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "src/stores/store-auth";

const storeAuth = useAuthStore();

const props = defineProps(["tab"]);

const passwordRef = ref(null);
const emailRef = ref(null);

const formData = ref({
  email: "",
  password: "",
});

const submitForm = () => {
  emailRef.value.validate();
  passwordRef.value.validate();
  if (!emailRef.value.hasError && !passwordRef.value.hasError) {
    if (props.tab === "login") {
      storeAuth.loginUser(formData.value);
    } else {
      storeAuth.registerUser(formData.value);
    }
  }
};

const isValidEmailAddress = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const titleCase = computed(() => {
  return props.tab.charAt(0).toUpperCase() + props.tab.slice(1);
});
</script>
