<script lang="jsx">
import _ from 'lodash';
import MyTablePaginator from './MyTablePaginator.vue';
import FilterDropdown from './FilterDropdown.vue';

export default {
  name: 'my-table',
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    paginationEnabled: {
      type: Boolean,
      default: false,
    },
    rowsPerPage: {
      type: Number,
      default: 10,
    },
  },
  data: () => ({
    sortProp: '',
    sortDirection: '',
    filterProp: '',
    filterText: '',
    currentPage: 1,
  }),
  computed: {
    sortedRows() {
      let result;

      if (!this.sortProp) {
        result = this.rows;
      } else {
        result = _.orderBy(this.rows, [this.sortProp], [this.sortDirection]);
      }

      if (this.filterText) {
        result = result.filter(
          (row) => String(row[this.filterProp]).search(this.filterText) > -1
        );
      }

      return result;
    },
    currentPageRows() {
      if (!this.paginationEnabled) {
        return this.sortedRows;
      }
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      return _.slice(
        this.sortedRows,
        startIndex,
        startIndex + this.rowsPerPage
      );
    },
    totalPages() {
      return Math.ceil(this.sortedRows.length / this.rowsPerPage);
    },
  },
  methods: {
    toggleSort(prop) {
      this.currentPage = 1;
      if (prop === this.sortProp) {
        if (this.sortDirection === 'asc') {
          this.sortDirection = 'desc';
        } else {
          this.sortDirection = '';
          this.sortProp = '';
        }
      } else {
        this.sortProp = prop;
        this.sortDirection = 'asc';
      }
    },
    openFilterTooltip(prop = '') {
      this.filterProp = prop;
      this.filterText = '';
    },
    setFilterText(e) {
      this.filterText = e.target.value;
    },
    getColumnOptions() {
      const columns = this.$slots.default.filter(
        (item) =>
          item.componentOptions &&
          item.componentOptions.tag === 'my-table-column'
      );
      const options = columns.map((column) =>
        Object.assign({}, column.componentOptions.propsData, {
          scopedSlots: column.data.scopedSlots || {},
        })
      );
      return options;
    },
    renderHead(columnOptions) {
      const { sortProp, sortDirection, filterProp, filterText } = this;

      const head = columnOptions.map((column) => {
        const title = column.scopedSlots.title
          ? column.scopedSlots.title()
          : column.title;
        let sortIcon = 'sort';
        if (sortProp === column.prop) {
          sortIcon =
            sortDirection === 'asc' ? 'sort-alpha-down' : 'sort-alpha-down-alt';
        }
        return (
          <th key={column.prop}>
            <span>{title}</span>
            <font-awesome-icon
              class="sortIcon"
              icon={sortIcon}
              on={{ click: () => this.toggleSort(column.prop) }}
            />
            <FilterDropdown
              columnProp={column.prop}
              shown={column.prop === filterProp}
              filterText={filterText}
              on={{
                openFilterTooltip: () => this.openFilterTooltip(column.prop),
                closeFilterTooltip: () => this.openFilterTooltip(),
                setFilterText: this.setFilterText,
              }}
            />
          </th>
        );
      });
      return head;
    },
    renderCells(row, columnOptions) {
      const cells = columnOptions.map((column) => {
        const data = row[column.prop];
        const body = column.scopedSlots.body
          ? column.scopedSlots.body({ row })
          : data;
        return <td key={column.prop}>{body}</td>;
      });
      return cells;
    },
    renderRows(columnOptions) {
      const rows = this.currentPageRows.map((row, index) => {
        return (
          <tr key={row.id || index}>
            {...this.renderCells(row, columnOptions)}
          </tr>
        );
      });
      return rows;
    },
    openPage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.totalPages) {
        return;
      }
      this.currentPage = pageNumber;
    },
  },
  render() {
    const columnOptions = this.getColumnOptions();
    const head = this.renderHead(columnOptions);
    const rows = this.renderRows(columnOptions);
    const paginator = this.paginationEnabled ? (
      <MyTablePaginator
        currentPage={this.currentPage}
        totalPages={this.totalPages}
        on={{ openPage: this.openPage }}
      />
    ) : (
      ''
    );
    return (
      <div>
        <table>
          <thead>{...head}</thead>
          <tbody>{...rows}</tbody>
        </table>
        {paginator}
      </div>
    );
  },
};
</script>

<style scoped>
th {
  background-color: bisque;
}

td,
th {
  padding: 0.5em;
}

tr:nth-child(even) {
  background-color: rgb(253, 247, 239);
}

.sortIcon {
  margin-left: 8px;
  margin-right: 24px;
}

.sortIcon:hover {
  cursor: pointer;
}
</style>
