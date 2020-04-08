<template>
  <div class="container">
    <div v-if="!admin">{{ words }}</div>
    <div class="admin-container" @click="startEditing" v-if="!editing && admin">
      {{ words }}
    </div>
    <textarea
      ref="editInput"
      @focusout="stopEditing"
      v-if="editing && admin"
      v-model="words"
    />
  </div>
</template>

<script>
export default {
  props: ['stateRef'],
  data: () => ({
    editing: false,
    words: '',
  }),
  mounted() {
    this.words = this.$store.state[this.stateRef]
  },
  computed: {
    admin() {
      return this.$store.state.admin
    },
  },
  methods: {
    startEditing(event) {
      this.editing = true
      this.$nextTick(() => this.$refs.editInput.focus())
    },
    stopEditing() {
      this.editing = false
      this.$store.commit('updateWords', {
        stateRef: this.stateRef,
        newWords: this.words,
      })
    },
  },
}
</script>

<style scoped>
.admin-container:hover {
  background: rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
}

* {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

textarea {
  resize: none;
  border: none;
  outline: none;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.05);
  font: inherit;
  overflow: hidden;
}
</style>
