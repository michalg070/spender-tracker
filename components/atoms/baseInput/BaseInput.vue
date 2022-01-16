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
          @input="handleInputEvent"
          @focus="isFocused = true"
          @keydown="handleKeyDownEvent"
          ref="inputRef"
        />

        <div
          v-if="isNumberType || isPasswordType"
          class="base-input__suffix"
          :style="iconsTopDimensionStyle"
        >
          <template v-if="isNumberType">
            <ClearIcon
              class="base-input__suffix__clear"
              :class="{
                'base-input__suffix__clear--visible': isHovered || isFocused,
              }"
              @click="clearInput"
            />

            <MinusIcon
              class="
                base-input__suffix__controls base-input__suffix__controls--minus
              "
              @click="changeNumberValue(changeTypes.DECREASE)"
            />

            <PlusIcon
              class="base-input__suffix__controls"
              @click="changeNumberValue(changeTypes.INCREASE)"
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

const changeTypes = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
}

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
      type: [Number, String],
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
    const inputRef = ref()
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

    function changeNumberValue(changeType) {
      switch (changeType) {
        case changeTypes.INCREASE: {
          context.emit('input', props.value + 1)

          break
        }
        case changeTypes.DECREASE: {
          context.emit('input', props.value - 1)

          break
        }
      }
    }

    function changePasswordVisibility() {
      isPassowrdVisible.value = !isPassowrdVisible.value
    }

    function checkIsNumber(event) {
      const charCode = event.keyCode
      const isComaAlreadyExists = event.target.value.includes('.')
      const isCharacterNotAllowed =
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 189 &&
        (isComaAlreadyExists ? true : charCode !== 190)

      if (isCharacterNotAllowed) {
        event.preventDefault()
        return false
      }

      return true
    }

    function clearInput() {
      context.emit('input', null)
      focusInput()
    }

    function focusInput() {
      inputRef.value.focus()
    }

    function handleBlurEvent(event) {
      context.emit('blur', event.target.value)
      isFocused.value = false
    }

    function handleInputEvent(event) {
      if (!isNumberType.value) {
        context.emit('input', event.target.value)
      }
    }

    function handleKeyDownEvent(event) {
      if (!isNumberType.value) {
        return
      }

      if (checkIsNumber(event)) {
        setTimeout(() => {
          const inputValue = parseFloat(event.target.value)
            ? parseFloat(event.target.value)
            : event.target.value

          context.emit('input', inputValue)
        }, 0)
      }
    }

    return {
      changeNumberValue,
      changePasswordVisibility,
      changeTypes,
      clearInput,
      currentType,
      handleBlurEvent,
      handleInputEvent,
      handleKeyDownEvent,
      inputRef,
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
