<template> </template>

<script>
import netlifyIdentity from 'netlify-identity-widget'

export default {
  mounted() {
    netlifyIdentity.open()
    netlifyIdentity.on('login', (user) => {
      this.$store.dispatch('logIn')
      this.$router.push({ path: '/' })
    })
  },
}
</script>
