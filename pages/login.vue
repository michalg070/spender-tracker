<template>
  <div class="login">
    <BaseCard title="Zaloguj się" class="login__card">
      <form autocomplete="rutjfkde" @submit.prevent ref="loginFormRef">
        <!-- TODO: handle type NUMBER -->
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
import { minLength } from '@/helpers/validationRules'

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
        rules: [
          rules.REQUIRED,
          {
            ruleName: rules.EMAIL,
            errorMessage: 'Email is bad man, fix it.',
          },
          {
            ruleName: 'test',
            customRule: (value) => {
              return minLength(value, 5)
            },
          },
          {
            ruleName: rules.MAX_LENGTH,
            ruleParameter: 10,
          },
        ],
        events: [validationEvents.BLUR],
      },
      password: {
        rules: [
          {
            ruleName: rules.REQUIRED,
            errorMessage: 'asdaaad',
          },
        ],
        events: [validationEvents.BLUR, validationEvents.INPUT],
      },
    }

    const { validateElement, validation, isValidate } = useValidation(
      validationSchema,
      loginFormRef
    )

    return {
      isValidate,
      loginForm,
      loginFormRef,
      validateElement,
      validation,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/login.scss';
</style>
