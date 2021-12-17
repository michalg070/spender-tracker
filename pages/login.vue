<template>
  <div class="login">
    <BaseCard title="Zaloguj się" class="login__card">
      <BaseInput
        v-model="password"
        name="login"
        label="Login"
        type="password"
        error="dsads"
      />
    </BaseCard>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'login',
  setup() {
    const password = ref('dsadss')

    return {
      password,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/login.scss';
</style>
