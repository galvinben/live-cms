<template> </template>

<script>
import netlifyIdentity from 'netlify-identity-widget'

export default {
  mounted() {},
  created() {
    netlifyIdentity.open()
    netlifyIdentity.on('login', (user) => {
      this.$store.dispatch('logIn')
      this.$router.push({ path: '/' })
    })
  },
}
</script>
