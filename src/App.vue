<template>
  <div id="app">
    <my-table :rows="rows">
      <my-table-column prop="id" title="ID" />
      <my-table-column prop="postId" title="Post ID" />
      <my-table-column prop="email">
        <template #title>
          <i>Email</i>
        </template>
        <template #body="{ row }">
          <a :href="`mailto:${row.email}`">{{ row.email }}</a>
        </template>
      </my-table-column>
      <my-table-column prop="name" title="Name" />
    </my-table>
  </div>
</template>

<script>
import MyTable from './components/MyTable.vue';
import MyTableColumn from './components/MyTableColumn.vue';

export default {
  name: 'App',
  components: {
    MyTable,
    MyTableColumn,
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
