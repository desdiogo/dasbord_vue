<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import ChevronDown from './ChevronDown'
import Copy from './Copy'
import Loading from './Loading'
export default {
  components: {ChevronDown, Copy, Loading},
  props: {
    name: {
      type: String,
      required: true,
    }
  }
}
</script>

