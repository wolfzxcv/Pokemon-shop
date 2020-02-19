<template>
  <div>product</div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/products`;

      const vm = this;
      this.$http.get(api).then(res => {
        console.log(res.data);
        vm.products = res.data.products;
      });
    },
  },

  created() {
    this.getProducts();
  },
};
</script>
