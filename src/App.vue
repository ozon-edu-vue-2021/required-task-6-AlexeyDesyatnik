<template>
  <div id="app">
    <h1>Hi there</h1>
    <my-table :rows="rows"></my-table>
  </div>
</template>

<script>
import MyTable from './components/MyTable.vue';

export default {
  name: 'App',
  components: {
    MyTable,
  },
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
