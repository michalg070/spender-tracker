<template>
  <div
    class="base-input"
    :class="{ 'base-input--left': labelPlacement === 'left' }"
  >
    <label v-if="label" :for="name" class="base-input__label">
      {{ label }}
    </label>

    <div class="base-input__wrapper">
      <div
        class="base-input__container"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
      >
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
          @blur="handleBlurEvent"
          @input="$emit('input', $event.target.value)"
          @focus="isFocused = true"
        />

        <!-- TODO: allow only numbers -->
        <div
          v-if="isNumberType || isPasswordType"
          class="base-input__suffix"
          :style="iconsTopDimensionStyle"
        >
          <template v-if="isNumberType">
            <!-- TODO: handle clear -->
            <ClearIcon
              class="base-input__suffix__clear"
              :class="{
                'base-input__suffix__clear--visible': isHovered || isFocused,
              }"
            />
            <!-- TODO: handle minus, emit up -->
            <MinusIcon
              class="
                base-input__suffix__controls base-input__suffix__controls--minus
              "
            />
            <!-- TODO: handle plus, emit up -->
            <PlusIcon
              class="
                base-input__suffix__controls
                base-input__suffix__controls--disabled
              "
            />
          </template>

          <component
            v-if="isPasswordType"
            :is="passwordIcon"
            @click="changePasswordVisibility"
          />
        </div>
      </div>

      <small v-if="isInvalid" class="base-input__error" v-html="error"></small>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import EyeIcon from '@/assets/images/svg/eye.svg'
import EyeOffIcon from '@/assets/images/svg/eye-off.svg'
import PlusIcon from '@/assets/images/svg/plus.svg'
import MinusIcon from '@/assets/images/svg/minus.svg'
import ClearIcon from '@/assets/images/svg/clear.svg'

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
    ClearIcon,
    EyeIcon,
    EyeOffIcon,
    MinusIcon,
    PlusIcon,
  },

  setup(props, context) {
    const isHovered = ref(false)
    const isFocused = ref(false)
    const isPassowrdVisible = ref(false)

    const currentType = computed(() => {
      if (isNumberType.value) {
        return 'text'
      }

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

    const isNumberType = computed(() => {
      return props.type === 'number'
    })

    const isPasswordType = computed(() => {
      return props.type === 'password'
    })

    const passwordIcon = computed(() => {
      return isPassowrdVisible.value ? 'EyeOffIcon' : 'EyeIcon'
    })

    const iconsTopDimensionStyle = computed(() => {
      return {
        top: `${props.height / 2}px`,
      }
    })

    function changePasswordVisibility() {
      isPassowrdVisible.value = !isPassowrdVisible.value
    }

    function handleBlurEvent(event) {
      context.emit('blur', event.target.value)
      isFocused.value = false
    }

    return {
      changePasswordVisibility,
      currentType,
      handleBlurEvent,
      isFocused,
      isHovered,
      isInvalid,
      isNumberType,
      isPasswordType,
      isPassowrdVisible,
      passwordIcon,
      iconsTopDimensionStyle,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/components/atoms/baseInput/baseInput.scss';
</style>
