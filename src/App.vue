<template>
  <div id="app">
    <div class="controls">
      <p>
        <input
          type="checkbox"
          id="paginationEnabled"
          v-model="paginationEnabled"
        />
        <label for="paginationEnabled">Пагинация </label>
      </p>
      <p>
        <input type="checkbox" id="infiniteScroll" v-model="infiniteScroll" />
        <label for="infiniteScroll"
          >Бесконечный скролл при включённой пагинации
        </label>
      </p>
      <p>
        <label for="rowsPerPage">Строк на страницу:</label>
        <select v-model="rowsPerPage">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </p>
    </div>
    <my-table
      :rows="rows"
      :paginationEnabled="paginationEnabled"
      :infiniteScroll="infiniteScroll"
      :rowsPerPage="rowsPerPage"
    >
      <my-table-column prop="id" title="ID">
        <template #body="{ row }">
          <div class="center">{{ row.id }}</div>
        </template>
      </my-table-column>
      <my-table-column prop="postId" title="Post ID">
        <template #body="{ row }">
          <div class="center">{{ row.postId }}</div>
        </template>
      </my-table-column>
      <my-table-column prop="email" title="Email">
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
      paginationEnabled: false,
      infiniteScroll: false,
      rowsPerPage: 10,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.center {
  text-align: center;
}

.controls {
  margin-bottom: 20px;
}
</style>
