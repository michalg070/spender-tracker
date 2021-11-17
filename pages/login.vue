<template>
  <div class="login">
    <h1>{{ dupa }}</h1>
    <button @click="test">click</button>

    <BaseCard> dfadssadssaas </BaseCard>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'login',
  setup() {
    const dupa = ref(null)

    function test() {
      dupa.value++
    }

    return {
      dupa,
      test,
    }
  },
})
</script>
