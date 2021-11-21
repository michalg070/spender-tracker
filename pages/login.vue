<template>
  <div class="login">
    <BaseCard title="Zaloguj się" class="login__card">
      <BaseInput name="login" label="Login" />
    </BaseCard>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'login',
  setup() {},
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/login.scss';
</style>
