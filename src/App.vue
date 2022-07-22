<template>
  <router-view class="router-view" v-slot="{ Component }">
    <keep-alive :include="keepAlive">
      <component :key="route.fullPath" :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script>
import { defineComponent } from 'vue'
import keepAlive from '@/keepAlive.ts'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    return {
      route,
      keepAlive,
    }
  },
})
</script>


<style lang="less">
</style>
