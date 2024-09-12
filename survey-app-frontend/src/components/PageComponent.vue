<template>
  <header class="bg-white">
    <div class="mx-auto max-w-7xl px-4 pt-8 pb-3 sm:px-6 lg:px-8">
      <slot name="header"></slot>
    </div>
  </header>
  <main class="md:pb-20 bg-gray-50 md:min-h-[calc(100vh-160px)]">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 min-h-full">
      <slot></slot>
    </div>
  </main>
</template>
