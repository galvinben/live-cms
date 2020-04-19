<template>
  <div class="container">
    <div
      class="non-admin-container"
      @click="click ? click() : null"
      v-if="!admin"
    >
      {{ words }}
    </div>
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
  props: ['stateRef', 'click'],
  data: () => ({
    editing: false,
  }),
  computed: {
    admin() {
      return this.$store.state.admin
    },
    words: {
      get: function() {
        return this.$store.state.content[this.stateRef]
      },
      set: function(newValue) {
        this.$store.dispatch('content/updateWords', {
          stateRef: this.stateRef,
          newWords: newValue,
        })
      },
    },
  },
  methods: {
    startEditing(event) {
      if (event.shiftKey) {
        this.click ? this.click(event) : null
      } else {
        this.editing = true
        this.$nextTick(() => this.$refs.editInput.focus())
      }
    },
    stopEditing() {
      this.editing = false
    },
  },
}
</script>

<style scoped>
.container,
.non-admin-container,
.admin-container {
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
}
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
