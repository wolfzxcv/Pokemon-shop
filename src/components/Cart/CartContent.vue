<template>
  <div class="cart-content">
    <Loading :active.sync="isLoading" />

    <!--Cart's detail-->
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
        <tr v-if="order.carts">
          <td></td>
          <td class="text-center">Oops! The cart is empty!!</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">Total</td>
          <td class="text-right">{{ order.total }}</td>
        </tr>
        <tr v-if="order.final_total !== order.total">
          <td colspan="3" class="text-right text-success">Special price</td>
          <td class="text-right text-success">{{ order.final_total }}</td>
        </tr>
      </tfoot>
    </table>

    <!--Coupon code input form-->
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

    <!--Recipient's information-->
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="placeOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <input
              type="email"
              class="form-control"
              name="email"
              id="useremail"
              v-model="form.user.email"
              placeholder="Please enter your Email"
              required
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="username">Name</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              v-model="form.user.name"
              placeholder="Please enter your name"
              required
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="usertel">TEL (number only)</label>
          <ValidationProvider rules="numeric" v-slot="{ errors }">
            <input
              type="tel"
              class="form-control"
              id="usertel"
              v-model="form.user.tel"
              placeholder="Please enter your phone number"
              required
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="useraddress">Address</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              type="text"
              class="form-control"
              name="address"
              id="useraddress"
              v-model="form.user.address"
              placeholder="Please enter your address"
              required
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="comment">Message</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="5"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">Place the order</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: [],
      isLoading: false,
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
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
    },
    placeOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$http.post(api, { data: order }).then(res => {
        console.log("placeOrder", res.data);
        if (res.data.success) {
          vm.$router.push(`/checkout/${res.data.orderId}`);
          console.log("redirect to checkout page");
          vm.isLoading = false;
        } else {
          console.log("lacking some guest info");
        }
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
