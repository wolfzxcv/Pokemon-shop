<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal">New Product</button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th width="150">Category</th>
          <th>Name</th>
          <th width="100">Was</th>
          <th width="100">Price</th>
          <th width="100">Enabled</th>
          <th width="100">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in products" :key="x.id">
          <td>{{ x.category }}</td>
          <td>{{ x.title }}</td>
          <td class="text-right">{{ x.origin_price }}</td>
          <td class="text-right">{{ x.price }}</td>
          <td>
            <span v-if="x.is_enabled" class="text-success">enabled</span>
            <span v-else>disabled</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="dashProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!---->
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: []
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
    openModal() {
      $("#dashProductModal").modal("show");
    }
  },

  created() {
    this.getProducts();
  }
};
</script>
