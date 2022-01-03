<template>
  <div class="login">
    <BaseCard title="Zaloguj się" class="login__card">
      <form autocomplete="rutjfkde" @submit.prevent ref="loginFormRef">
        <BaseInput
          v-model="loginForm.login"
          :error="validation.login.error"
          name="login"
          label="Login"
          type="text"
          class="login__input"
        />

        <BaseInput
          v-model="loginForm.password"
          :error="validation.password.error"
          name="password"
          label="Password"
          type="password"
          class="login__input"
        />
      </form>
    </BaseCard>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import useValidation from '@/composables/useValidation'
import { rules, validationEvents } from '@/enums/validation'

export default defineComponent({
  layout: 'login',
  setup() {
    const loginForm = reactive({
      login: null,
      password: null,
    })
    const loginFormRef = ref(null)

    const validationSchema = {
      login: {
        rules: [rules.REQUIRED, rules.EMAIL],
        events: [validationEvents.BLUR],
      },
      password: {
        rules: [rules.REQUIRED],
        events: [validationEvents.BLUR, validationEvents.INPUT],
      },
    }

    const { validate, validation } = useValidation(
      validationSchema,
      loginFormRef
    )

    return {
      loginForm,
      loginFormRef,
      validate,
      validation,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/login.scss';
</style>
