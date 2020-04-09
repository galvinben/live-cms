<template>
  <div v-if="!loading" class="card">
    <div class="heading">
      <Words stateRef="mainTitle" />
    </div>
    <div class="para">
      <Words stateRef="someWords" />
    </div>
    <button @click="save()">Save</button>
    <div>{{ saving }}</div>
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
  }),
  async created() {
    await this.$store.dispatch('/contentsetStateOnCreated')
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
</style>
