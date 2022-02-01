<template>
  <BaseButton
    v-bind="buttonProps"
    class="loading-button"
    :class="{'loading-button--isLoading' : isLoading}"
    :style="styleObject"
    @click="buttonClicked"
  >
    <slot />

    <div class="loading-button__loader"></div>
  </BaseButton>
</template>

<script>
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '34',
    },
    size: {
      type: String,
      default: 'normal',
      validator: function (value) {
        return ['x-small', 'small', 'normal', 'large', 'x-large'].includes(
          value
        )
      },
    },
    block: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: String,
      default: '4',
    },
    filled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '60',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  setup(props, context) {
    const buttonProps = ref({ ...props })

    const styleObject = computed(() => {
      const tmp = {}

      if (props.filled) {
        tmp['--loader-color'] = '#101014'
      } else if (props.outlined) {
        tmp['--loader-color'] = '--current-color'
      }

      return tmp
    })

    function buttonClicked() {
      context.emit('click')
    }

    return {
      styleObject,
      buttonProps,
      buttonClicked
    }
  },
})
</script>


<style lang="scss" scoped>
@import '@/components/atoms/loadingButton/loadingButton.scss';
</style>
