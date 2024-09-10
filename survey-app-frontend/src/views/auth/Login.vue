<template>
  <div class="sm:mx-auto md:w-full">
    <img
      class="mx-auto h-12 w-auto"
      src="../../assets/surveyly_logo.png"
      alt="Surveyly logo"
    />
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      Sign in to your account
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
    <form class="space-y-6" @submit.prevent="handleLogin">
      <div
        v-if="errorMsg"
        class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded-lg"
      >
        <p>{{ errorMsg }}</p>
        <span
          @click="errorMsg = ''"
          class="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[rgba(0,0,0,0.2)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
      <div>
        <InputField
          label="Email address"
          name="email"
          id="email"
          type="email"
          :required="true"
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
          :required="true"
          autocomplete="current-password"
          v-model="user.password"
        />
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            v-model="user.remember"
          />
          <label for="remember" class="ml-2 block text-sm text-gray-900"
            >Remember me</label
          >
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <RouterLink
        :to="{ name: 'Register' }"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >Register for free</RouterLink
      >
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import InputField from "../../components/ui/InputField.vue";

const authStore = useAuthStore();
const router = useRouter();
const user = ref({
  email: "",
  password: "",
  remember: false,
});
let errorMsg = ref("");

async function handleLogin() {
  await authStore
    .login(user.value)
    .then(() => {
      router.push({ name: "Dashboard" });
    })
    .catch((err) => {
      console.error("error", err);
      errorMsg.value = err.response.data.error;
    });
}
</script>

<style scoped></style>
