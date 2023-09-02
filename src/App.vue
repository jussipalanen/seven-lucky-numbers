<script setup>
</script>

<template>
  <header>
  </header>
  <main class="container">
    <router-view v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </Transition>
    </router-view>
  </main>
  <footer class="footer bg-dark">
    <div class="container">
      <p class="text-white">
        © <a class="text-white">Jussi Alanen</a>. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>