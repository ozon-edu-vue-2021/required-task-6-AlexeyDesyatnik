<script lang="jsx">
export default {
  name: 'my-table',
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
  },
  render(/* h */) {
    return (
      <table>
        <thead></thead>
        <tbody></tbody>
      </table>
    );
  },
};
</script>
