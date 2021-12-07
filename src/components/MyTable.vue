<script lang="jsx">
export default {
  name: 'my-table',
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getColumnOptions() {
      const columns = this.$slots.default.filter(
        (item) =>
          item.componentOptions &&
          item.componentOptions.tag === 'my-table-column'
      );
      const options = columns.map((column) =>
        Object.assign({}, column.componentOptions.propsData)
      );
      return options;
    },
    renderHead(h, columnOptions) {
      const head = columnOptions.map((column) => <th>{column.title}</th>);
      return head;
    },
    renderCells(h, row, columnOptions) {
      const cells = columnOptions.map((column) => <td>{row[column.prop]}</td>);
      return cells;
    },
    renderRows(h, columnOptions) {
      const rows = this.rows.map((row, index) => {
        return (
          <tr key={row.id || index}>
            {...this.renderCells(h, row, columnOptions)}
          </tr>
        );
      });
      return rows;
    },
  },
  render(h) {
    const columnOptions = this.getColumnOptions();
    console.log(columnOptions);
    const head = this.renderHead(h, columnOptions);
    const rows = this.renderRows(h, columnOptions);
    return (
      <table>
        <thead>{...head}</thead>
        <tbody>{...rows}</tbody>
      </table>
    );
  },
};
</script>
