<template>
  <div
    class="base-input"
    :class="{ 'base-input--left': labelPlacement === 'left' }"
  >
    <label v-if="label" :for="name" class="base-input__label">
      {{ label }}
    </label>

    <div class="base-input__wrapper">
      <input
        :id="name"
        :value="value"
        :name="name"
        :placeholder="placeholder"
        :type="currentType"
        :class="{
          'base-input__input--invalid': isInvalid,
          'base-input__input--password': isPasswordType,
        }"
        :style="{ height: height + 'px' }"
        class="base-input__input"
        @blur="$emit('blur', $event.target.value)"
        @input="$emit('input', $event.target.value)"
      />

      <component
        v-if="isPasswordType"
        :is="passwordIcon"
        :style="showPasswordIconStyle"
        @click="changePasswordVisibility"
        class="base-input__show-password"
        width="16px"
      />

      <small v-if="isInvalid" class="base-input__error" v-html="error"></small>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import EyeIcon from '@/assets/images/svg/eye.svg'
import EyeOffIcon from '@/assets/images/svg/eye-off.svg'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: '34',
    },
    label: {
      type: String,
      default: null,
    },
    labelPlacement: {
      type: String,
      default: 'top',
      validator: function (value) {
        return ['top', 'left'].includes(value)
      },
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
      validator: function (value) {
        return ['text', 'password', 'email', 'number'].includes(value)
      },
    },
    value: {
      type: String,
      default: null,
    },
  },

  components: {
    EyeIcon,
    EyeOffIcon,
  },

  setup(props, context) {
    const isPassowrdVisible = ref(false)

    const currentType = computed(() => {
      if (!isPasswordType.value || !isPassowrdVisible.value) {
        return props.type
      }

      if (isPassowrdVisible.value) {
        return 'text'
      }
    })

    const isInvalid = computed(() => {
      return !!props.error
    })

    const isPasswordType = computed(() => {
      return props.type === 'password'
    })

    const passwordIcon = computed(() => {
      return isPassowrdVisible.value ? 'EyeOffIcon' : 'EyeIcon'
    })

    const showPasswordIconStyle = computed(() => {
      return {
        top: `${props.height / 2}px`,
      }
    })

    function changePasswordVisibility() {
      isPassowrdVisible.value = !isPassowrdVisible.value
    }

    return {
      changePasswordVisibility,
      currentType,
      isInvalid,
      isPasswordType,
      isPassowrdVisible,
      passwordIcon,
      showPasswordIconStyle,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/components/atoms/baseInput/baseInput.scss';
</style>
