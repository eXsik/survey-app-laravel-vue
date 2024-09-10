<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-secondary shadow-lg mb-10" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-9"
                src="../assets/surveyly_logo_white.png"
                alt="Surveyly"
              />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <RouterLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :class="[
                    $route.name === item.to.name
                      ? 'bg-tertiary '
                      : ' hover:bg-tertiary ',
                    'rounded-md px-3 py-2 text-sm font-medium text-white',
                  ]"
                  >{{ item.name }}
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="relative flex max-w-xs rounded-ful text-sm focus:outline-none focus:ring-offset-gray-600"
                  >
                    <span class="sr-only">Open user menu</span>
                    <div>
                      <h4 class="text-gray-100 font-medium text-left">
                        test
                        {{ authStore.user.data.name }}
                      </h4>
                      <p class="test-sm text-gray-400">
                        {{ authStore.user.data.email }}
                      </p>
                    </div>
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-indigo-500 dark:ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem v-slot="{ active }">
                      <div
                        @click="handleLogout"
                        :class="[
                          'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white cursor-pointer',
                        ]"
                      >
                        Sign out
                      </div>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-white focus:outline-none focus:ring-0"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            :class="[
              $route.name === item.to.name
                ? 'bg-tertiary '
                : 'hover:bg-tertiary',
              'block rounded-md px-3 py-2 text-base font-medium text-white',
            ]"
            >{{ item.name }}</RouterLink
          >
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                :src="authStore.user.data?.imageUrl"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ authStore.user.data.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ authStore.user.data.email }}
              </div>
            </div>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <div
              @click="handleLogout"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              Sign out
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <RouterView />
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { navigation } from "../constants";

const authStore = useAuthStore();
const router = useRouter();

async function handleLogout() {
  await authStore
    .logout()
    .then(() => {
      router.push({ name: "Login" });
    })
    .catch((err) => {
      console.error("error", err);
    });
}
</script>
