<template>
  <div class="layout-container">
    <transition name="fade">
      <div v-if="$store.state.admin" class="actions">
        <div v-if="$store.state.admin" class="save button" @click="save">
          Save
        </div>
        <div @click="logOut" class="logout button">
          Log Out
        </div>
      </div>
      <div v-if="loggedOut" class="logged-out">✔️</div>
    </transition>
    <nuxt />
  </div>
</template>

<script>
import axios from 'axios'
import netlifyIdentity from 'netlify-identity-widget'

export default {
  data: () => ({
    loggedOut: false,
    saving: false,
  }),
  mounted() {
    netlifyIdentity.init()
    if (netlifyIdentity.currentUser()) {
      this.$store.dispatch('logIn')
    } else {
      netlifyIdentity.open()
    }
    netlifyIdentity.on('login', (user) => {
      this.$store.dispatch('logIn')
    })
    netlifyIdentity.on('logout', (user) => {
      this.$store.dispatch('logOut')
      this.loggedOut = true
      window.setTimeout(() => {
        this.loggedOut = false
      }, 1000)
    })
  },
  methods: {
    logOut() {
      netlifyIdentity.logout().then(this.$store.dispatch('logOut'))
    },
    async save() {
      this.saving = 'Saving...'
      const res = await axios.post(
        `/.netlify/functions/saveStateToGit`,
        this.$store.state.content
      )
      this.saving = res.status === 201 ? 'Saved!' : 'Failed'
    },
  },
}
</script>

<style>
html {
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
}
* {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.layout-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
}

.actions {
  position: absolute;
  right: 10px;
  top: 10px;
  height: 30px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.logout {
  background: rgba(0, 0, 0, 0.1);
}

.save {
  background: rgba(0, 100, 0, 0.4);
}

.button {
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 30px;
  width: 70px;
}

.button:hover {
  opacity: 0.5;
}

.logged-out {
  font-size: 3rem;
  position: absolute;
  right: 10px;
  top: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
