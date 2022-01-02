<template>
  <div class="login">
    <BaseCard title="Zaloguj się" class="login__card">
      <BaseInput
        v-model="loginForm.login"
        name="login"
        label="Login"
        type="text"
        class="login__input"
      />

      <BaseInput
        v-model="loginForm.password"
        name="password"
        label="Password"
        type="password"
        class="login__input"
      />
    </BaseCard>
  </div>
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'login',
  setup() {
    const loginForm = reactive({
      login: null,
      password: null,
    })

    return {
      loginForm,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/login.scss';
</style>
