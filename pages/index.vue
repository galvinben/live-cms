<template>
  <div class="card">
    <div class="heading">
      <Words stateRef="mainTitle" />
    </div>
    <div class="para">
      <Words stateRef="someWords" />
    </div>
  </div>
</template>

<script>
import Words from '@/components/Words'

export default {
  components: {Words},

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