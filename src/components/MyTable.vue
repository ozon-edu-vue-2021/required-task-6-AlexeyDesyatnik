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
    renderCells(h, row) {
      const cells = Object.entries(row).map(([, value]) => {
        return <td>{value}</td>;
      });
      return cells;
    },
    renderRows(h) {
      const rows = this.rows.map((row, index) => {
        console.log(row);
        return <tr key={row.id || index}>{...this.renderCells(h, row)}</tr>;
      });
      return rows;
    },
  },
  render(h) {
    const rows = this.renderRows(h);
    return (
      <table>
        <thead></thead>
        <tbody>{...rows}</tbody>
      </table>
    );
  },
};
</script>
