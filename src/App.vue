<template>
  <div id="app">
    <h1>Hi there</h1>
    <p v-for="row in rows" :key="row.id">{{ row }}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  async created() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    this.rows = await res.json();
  },
  data() {
    return {
      rows: [],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
