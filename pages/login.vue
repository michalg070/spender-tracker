<template>
  <div class="login">
    <BaseCard title="Zaloguj się" class="login__card">
      <BaseInput name="login" label="Login" />

      <EyeIcon width="12px" />
    </BaseCard>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import EyeIcon from '@/assets/images/svg/eye.svg'

export default defineComponent({
  layout: 'login',
  components: {
    EyeIcon,
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/login.scss';
</style>
