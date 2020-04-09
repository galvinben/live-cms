<template> </template>

<script>
import netlifyIdentity from 'netlify-identity-widget'

export default {
  created() {
    this.$store.dispatch('setLoggingIn')
    this.$router.push({ path: '/' })
  },
}
</script>
