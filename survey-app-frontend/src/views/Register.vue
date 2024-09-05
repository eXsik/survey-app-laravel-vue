<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      class="mx-auto h-10 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    />
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white text-gray-900"
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
        <label
          for="name"
          class="block text-sm font-medium leading-6 dark:text-white text-gray-900"
          >Full name</label
        >
        <div class="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            required
            v-model="user.name"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 dark:text-white text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            v-model="user.email"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 dark:text-white text-gray-900"
            >Password</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            v-model="user.password"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 dark:text-white text-gray-900"
            >Confirm password</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
            v-model="user.password_confirmation"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
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
    <p class="mt-10 text-center text-sm text-gray-500 dark:text-white">
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
import { useAuthStore } from "../stores/auth";
import { RouterLink, useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const user = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
});

async function handleRegistration() {
  await authStore.register(user);

  // if(!)
  router.push({ name: "Dashboard" });
}
</script>

<style scoped></style>
