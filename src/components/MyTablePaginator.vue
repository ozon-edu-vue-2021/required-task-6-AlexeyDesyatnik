<script lang="jsx">
export default {
  name: 'my-table-paginator',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    visiblePageNumbers() {
      const { currentPage, totalPages } = this;
      if (currentPage <= 3) {
        const firstPages = [1, 2, 3, 4, 5];
        return firstPages.slice(0, totalPages);
      }

      if (currentPage >= totalPages - 2) {
        return [
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }

      return [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    },
  },
  methods: {
    renderBackControls() {
      const { openPage } = this.$listeners;
      return this.currentPage > 1 ? (
        <span>
          <span class="pageControl" on={{ click: () => openPage(1) }}>
            {'<<'}
          </span>
          <span
            class="pageControl"
            on={{ click: () => openPage(this.currentPage - 1) }}
          >
            {'<'}
          </span>
        </span>
      ) : (
        ''
      );
    },
    renderForwardControls() {
      const { openPage } = this.$listeners;
      return this.currentPage < this.totalPages ? (
        <span>
          <span
            class="pageControl"
            on={{ click: () => openPage(this.currentPage + 1) }}
          >
            {'>'}
          </span>
          <span
            class="pageControl"
            on={{ click: () => openPage(this.totalPages) }}
          >
            {'>>'}
          </span>
        </span>
      ) : (
        ''
      );
    },
    renderPageNumbers() {
      const { openPage } = this.$listeners;
      return this.visiblePageNumbers.map((number) => {
        return (
          <span
            class={['pageControl', { activePage: number === this.currentPage }]}
            on={{ click: () => openPage(number) }}
          >
            {number}
          </span>
        );
      });
    },
  },
  render() {
    return (
      <div class="pagination">
        {this.renderBackControls()}
        {...this.renderPageNumbers()}
        {this.renderForwardControls()}
      </div>
    );
  },
};
</script>

<style scoped>
.pageControl {
  padding: 5px;
}

.pageControl:hover {
  cursor: pointer;
}

.activePage {
  background-color: bisque;
  border: rgb(172, 151, 126) 1px solid;
  border-radius: 6px;
}
</style>
