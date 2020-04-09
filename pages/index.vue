<template>
  <div v-if="!loading" class="card">
    <div class="heading">
      <Words stateRef="mainTitle" />
    </div>
    <div class="para">
      <Words stateRef="someWords" />
    </div>
    <div class="button-container">
      <div class="button">
        <Words stateRef="buttonWords" :click="buttonClick" />
      </div>
      <transition name="fade">
        <div v-if="clicked" class="clicked">Clicked!</div>
      </transition>
    </div>
  </div>
</template>

<script>
import Words from '@/components/Words'
import axios from 'axios'

export default {
  components: { Words },
  data: () => ({
    loading: true,
    saving: '',
    clicked: false,
  }),
  async created() {
    await this.$store.dispatch('content/setStateOnCreated')
    this.loading = false
  },
  methods: {
    async save() {
      this.saving = 'Saving...'
      const res = await axios.post(
        `/.netlify/functions/saveStateToGit`,
        this.$store.state.content
      )
      this.saving = res.status === 201 ? 'Saved!' : 'Failed'
    },
    buttonClick() {
      this.clicked = true
      window.setTimeout(() => {
        this.clicked = false
      }, 300)
    },
  },
}
</script>

<style scoped>
.card {
  width: 500px;
  height: 700px;
  background: white;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.heading {
  font-size: 4rem;
  height: 4rem;
  font-weight: bold;
}

.para {
  width: auto;
  height: 300px;
  padding: 10px;
}

.button-container {
  display: flex;
}

.clicked {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.button {
  height: 60px;
  width: 120px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.button:hover {
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
