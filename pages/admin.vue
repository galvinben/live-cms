<template> </template>

<script>
import netlifyIdentity from 'netlify-identity-widget'

export default {
  mounted() {
    this.$router.push({ path: '/' })
    netlifyIdentity.open()
    netlifyIdentity.on('login', (user) => {
      this.$store.dispatch('logIn')
    })
  },
  created() {},
}
</script>
