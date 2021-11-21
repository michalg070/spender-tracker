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
        :type="type"
        :class="{ 'base-input__input--invalid': isInvalid }"
        class="base-input__input"
        @blur="$emit('blur', $event.target.value)"
        @input="$emit('input', $event.target.value)"
      />

      <small v-if="isInvalid" class="base-input__error">{{ error }}</small>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    error: {
      type: String,
      default: null,
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
    value: {
      type: String,
      default: null,
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
        return ['text', 'password', 'email'].includes(value)
      },
    },
  },
  setup(props) {
    const isInvalid = computed(() => {
      return !!props.error
    })

    return {
      isInvalid,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/components/atoms/baseInput/baseInput.scss';
</style>
