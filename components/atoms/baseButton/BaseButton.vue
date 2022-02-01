<template>
  <button
    class="base-button"
    :disabled="disabled"
    :class="classObject"
    :style="styleObject"
    @click="buttonClicked"
  >
    <slot />
  </button>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },

    filled: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: String,
      default: '4',
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
    width: {
      type: String,
      default: '',
    },
  },

  setup(props, context) {
    const classObject = computed(() => {
      const tmp = {}
      if (props.block) {
        tmp['base-button--block'] = true
      }
      if (props.filled) {
        tmp['base-button--filled'] = true
      }
      if (props.loading) {
        tmp['base-button--loading'] = true
      }
      if (props.outlined) {
        tmp['base-button--outlined'] = true
      }

      if (props.size) {
        tmp['base-button--' + props.size] = true
      }
      return tmp
    })

    const styleObject = computed(() => {
      const tmp = {}

      if (props.color === 'primary') {
        tmp['--current-color'] = '#63e2b7'
      } else if (props.color === 'info') {
        tmp['--current-color'] = '#70c0e8'
      } else if (props.color === 'error') {
        tmp['--current-color'] = '#b61c1c'
      } else if (props.color === 'warning') {
        tmp['--current-color'] = '#f2c97d'
      } else {
        tmp['--current-color'] = props.color
      }

      if (props.rounded) {
        tmp['border-radius'] = props.rounded + 'px'
      }

      if (props.height) {
        tmp.height = props.height
      }
      if (props.width) {
        tmp.width = props.width
      }

      return tmp
    })

    function buttonClicked() {
      context.emit('click')
    }

    return {
      buttonClicked,
      classObject,
      styleObject,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/components/atoms/baseButton/baseButton.scss';
</style>
