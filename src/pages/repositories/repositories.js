// export default{
//   name:'repositories'
// };
export default {
  name: 'TableCustomSort',
  data: () => ({
    currentSort: 'name',
    currentSortOrder: 'asc'
  }),
  computed: {
    repositories() {
      return this.$root.repositories;
    }
  },
  methods: {
      sortRepositories(sorting) {
        this.repositories.sort((a, b) => {
          if(a[sorting.name] > b[sorting.name]) {
            return sorting.type === 'asc' ? 1 : -1;
          }

          if(a[sorting.name] < b[sorting.name]) {
            return sorting.type === 'asc' ? -1 : 1;
          }

          return 0;
        });
      }
      ,customSort (value) {
        return this.repositories.sort((a, b) => {
          a = a==null?"":a;
          b = b==null?"":b;
          const sortBy = this.currentSort;
          if (this.currentSortOrder === 'desc') {
            return a[sortBy].toString().localeCompare(b[sortBy].toString())
          }

          return b[sortBy].toString().localeCompare(a[sortBy].toString())
        })
      }
  },
  mounted() {
    this.$root.closeSidenav();
  },
};
