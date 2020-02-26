<template>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>Product</th>
          <th>Amount</th>
          <th>Price</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">Total</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="200">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>TEL</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>Payment status</th>
            <td>
              <span v-if="!order.is_paid">Haven't paid</span>
              <span v-else class="text-success">Paid</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">Confirm payment</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {}
      },
      orderId: ""
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        console.log("getOrder", res.data);
        vm.order = res.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(api).then(res => {
        console.log("payOrder", res.data);
        if (res.data.success) {
          vm.getOrder();
          vm.$bus.$emit("message:push", res.data.message, "success");
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  }
};
</script>