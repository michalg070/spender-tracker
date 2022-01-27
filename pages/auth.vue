<template>
  <div class="auth">
    <BaseCard title="Zaloguj się" class="auth__card">
      <form @submit.prevent="submitSignUp" ref="loginFormRef">
        <BaseInput
          v-model="loginForm.email"
          :error="validation.email.error"
          name="email"
          label="Email"
          type="text"
          class="auth__input"
        />

        <BaseInput
          v-model="loginForm.password"
          :error="validation.password.error"
          name="password"
          label="Password"
          type="password"
          class="auth__input"
        />

        <button type="submit">submit</button>
      </form>
    </BaseCard>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist'
import useValidation from '@/composables/useValidation'
import { rules, validationEvents } from '@/enums/validation'

const { useActions } = createNamespacedHelpers('auth')

export default defineComponent({
  layout: 'auth',
  setup() {
    const loginForm = reactive({
      login: null,
      password: null,
    })
    const loginFormRef = ref(null)
    const { setUserToken, setUserEmail, setRefreshToken, setTokenExpiresIn } =
      useActions([
        'setUserToken',
        'setUserEmail',
        'setRefreshToken',
        'setTokenExpiresIn',
      ])

    // rules object: {
    //  ruleName: string,
    //  ruleParameter?: string | number,
    //  errorMessage?: string,
    //  customRule: () => void
    // }
    const validationSchema = {
      email: {
        rules: [
          {
            ruleName: rules.EMAIL,
            errorMessage: 'Email is bad man, fix it.',
          },
        ],
        events: [validationEvents.BLUR, validationEvents.INPUT],
      },
      password: {
        rules: [
          {
            ruleName: rules.MIN_LENGTH,
            ruleParameter: 6,
          },
        ],
        events: [validationEvents.BLUR, validationEvents.INPUT],
      },
    }

    const { validateForm, validation, isValidate } = useValidation(
      validationSchema,
      loginFormRef
    )

    // TODO: create authType flag,
    // TODO: handle switch between signIn/signUp
    // TODO: store & refresh token
    function submitSignUp() {
      validateForm()

      console.log(Date.now())

      if (!isValidate.value) {
        return
      }

      const signUpUrl = process.env.signUpUrl + process.env.fbApiKey
      const signUpData = {
        email: loginForm.email,
        password: loginForm.password,
        returnSecureToken: true,
      }

      this.$axios
        .$post(signUpUrl, signUpData)
        .then((res) => {
          console.log(res)
          setUserToken(res.idToken)
          setUserEmail(res.email)
          setRefreshToken(res.refreshToken)
          setTokenExpiresIn(res.expiresIn)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return {
      isValidate,
      loginForm,
      loginFormRef,
      submitSignUp,
      validateForm,
      validation,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/auth.scss';
</style>
