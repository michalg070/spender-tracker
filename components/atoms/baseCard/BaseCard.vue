<template>
  <div class="base-card">
    <p v-if="title" class="base-card__title" data-base-card-title>
      {{ title }}
    </p>

    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: null,
    },
  },

  setup() {},
})
</script>

<style lang="scss" scoped>
@import '@/components/atoms/baseCard/baseCard.scss';
</style>
