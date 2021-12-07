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
        Object.assign({}, column.componentOptions.propsData, {
          scopedSlots: column.data.scopedSlots || {},
        })
      );
      return options;
    },
    renderHead(h, columnOptions) {
      const head = columnOptions.map((column) => {
        const title = column.scopedSlots.title
          ? column.scopedSlots.title()
          : column.title;
        const headCell = <th key={column.prop}>{title}</th>;
        return headCell;
      });
      return head;
    },
    renderCells(h, row, columnOptions) {
      const cells = columnOptions.map((column) => {
        const data = row[column.prop];
        const body = column.scopedSlots.body
          ? column.scopedSlots.body({ row })
          : data;
        const bodyCell = <td key={column.prop}>{body}</td>;
        return bodyCell;
      });
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
