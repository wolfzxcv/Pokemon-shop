<template>
  <div>
    <loading :active.sync="isLoading" />
    <table class="table mt-4">
      <thead>
        <tr>
          <th>Date</th>
          <th>id</th>
          <th>email</th>
          <th>summary</th>
          <th>Price</th>
          <th>Payment status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in orders" :key="x.id">
          <td>{{ new Date(x.create_at*1000).toLocaleDateString("en-GB") }}</td>
          <td>{{ x.id }}</td>
          <td>{{ x.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in x.products" :key="i">
                {{ product.product.title }} {{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ x.total | currency }}</td>
          <td>
            <span v-if="x.is_paid" class="text-success">Paid</span>
            <span v-else>haven't paid</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!---Pagination start-->
    <Pagination :pages="pagination" @emitPages="getOrders" />

    <!--Pagination end-->
  </div>
</template>

<script>
import Pagination from "../Pagination/Pagination";
export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false
    };
  },
  components: { Pagination },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/orders?page=${page}`;
      vm.isLoading = true;

      this.$http.get(api).then(res => {
        console.log("getOrders", res.data);
        vm.isLoading = false;
        vm.orders = res.data.orders;
        vm.pagination = res.data.pagination;
      });
    }
  },
  created() {
    this.getOrders();
  }
};
</script>