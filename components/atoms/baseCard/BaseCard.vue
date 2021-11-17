<template>
  <div class="base-card">
    <div>dupa dupa dupa</div>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style lang="scss" scoped>
@import '@/components/atoms/baseCard/baseCard.scss';
</style>
