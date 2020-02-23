<template>
  <div class="cart-content">
    <loading :active.sync="isLoading" />
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="150">Delete</th>
          <th>Product</th>
          <th width="100">Amount</th>
          <th width="100" class="text-right">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in order.carts" :key="x.id">
          <td>
            <button class="btn btn-outline-danger btn-sm" @click="removeCartItem(x.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
          <td>
            {{ x.product.title }}
            <div class="text-success" v-if="x.coupon">with coupon</div>
          </td>
          <td>{{ x.qty }}</td>
          <td class="text-right">{{ x.total }}</td>
        </tr>
        <tr v-if="order.carts.length==0">
          <td></td>
          <td class="text-center">Oops! The cart is empty!!</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ order.total }}</td>
        </tr>
        <tr v-if="order.final_total !==order.total">
          <td colspan="3" class="text-right text-success">折扣價</td>
          <td class="text-right text-success">{{ order.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input
        type="text"
        class="form-control"
        v-model="coupon_code"
        placeholder="Please enter coupon code"
      />
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">Validate</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: [],
      isLoading: false,
      coupon_code: ""
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        console.log("getCart", res.data.data);
        vm.order = res.data.data;
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(api).then(res => {
        console.log("removeCartItem", res.data);
        vm.isLoading = false;
        vm.getCart();
      });
    },
    addCouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      vm.isLoading = true;
      this.$http.post(api, { data: coupon }).then(res => {
        console.log("addCouponCode", res.data);
        vm.isLoading = false;
        vm.getCart();
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>

<style lang="scss" scoped>
.cart-content {
  margin: 0 auto;
  width: 50vw;
}
</style>
