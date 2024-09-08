<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      class="mx-auto h-12 w-auto"
      src="../../assets/surveyly_logo.png"
      alt="Surveyfy"
    />
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-secondary"
    >
      Register for free
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
    <form
      class="space-y-6"
      action="#"
      method="POST"
      @submit.prevent="handleRegistration"
    >
      <div>
        <InputField
          label="Full name"
          name="name"
          id="name"
          type="text"
          required="true"
          v-model="user.name"
        />
      </div>

      <div>
        <InputField
          label="Email address"
          name="email"
          id="email"
          type="email"
          required="true"
          autocomplete="email"
          v-model="user.email"
        />
      </div>

      <div>
        <InputField
          label="Password"
          name="password"
          id="password"
          type="password"
          required="true"
          autocomplete="current-password"
          v-model="user.password"
        />
      </div>

      <div>
        <InputField
          label="Confirm password"
          name="password_confirmation"
          id="password_confirmation"
          type="password"
          required="true"
          v-model="user.password_confirmation"
        />
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </button>
      </div>
    </form>
    <p class="mt-10 text-center text-sm text-gray-500">
      Have an account?
      <RouterLink
        :to="{ name: 'Login' }"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >Log in</RouterLink
      >
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { RouterLink, useRouter } from "vue-router";
import InputField from "../../components/ui/InputField.vue";

const authStore = useAuthStore();
const router = useRouter();
const user = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
});

async function handleRegistration() {
  await authStore.register(user.value);

  router.push({ name: "Dashboard" });
}
</script>

<style scoped></style>
