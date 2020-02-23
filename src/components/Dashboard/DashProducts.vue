<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">Add New Product</button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th width="150">Category</th>
          <th>Name</th>
          <th width="100" class="text-right">Was</th>
          <th width="100" class="text-right">Price</th>
          <th width="100">Enabled</th>
          <th width="80">Edit</th>
          <th width="80">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in products" :key="x.id">
          <td>{{ x.category }}</td>
          <td>{{ x.title }}</td>
          <td class="text-right">{{ x.origin_price | currency }}</td>
          <td class="text-right">{{ x.price | currency }}</td>
          <td>
            <span v-if="x.is_enabled" class="text-success">enabled</span>
            <span v-else>disabled</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, x)">Edit</button>
          </td>
          <td>
            <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(x)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!---Pagination start-->

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getProducts(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{ active: pagination.current_page === page }"
        >
          <a class="page-link" href="#" @click.prevent="getProducts(page)">
            {{
            page
            }}
          </a>
        </li>

        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getProducts(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <!--Pagination end-->

    <!-- Product Modal -->
    <div
      class="modal fade"
      id="dashProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>Product's detail</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">Enter image URL</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="please enter image URL here"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    Or Upload image
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>

                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="Please enter product's name"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">Category</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="Please enter category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">Unit</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="Please enter a quantifier"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">Was</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="Please enter original price "
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">Price</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="Please enter current price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="Please enter description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">Detail</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="Please enter content of the product"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">Enabled</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-outline-primary" @click="updateProduct">Submit</button>
          </div>
        </div>
      </div>
    </div>
    <!--The end of product modal-->

    <!--delete modal-->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>Delete Product</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete
            <strong class="text-danger">{{ tempProduct.title }}</strong> ?
            (Can't recover after deleted)
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">Confirm deletion</button>
          </div>
        </div>
      </div>
    </div>

    <!--The end of delete modal-->
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNewProduct: false,
      isLoading: false,
      status: {
        fileUploading: false
      }
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/products?page=${page}`;

      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then(res => {
        console.log("getProducts", res.data);
        vm.isLoading = false;
        vm.products = res.data.products;
        vm.pagination = res.data.pagination;
      });
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${this.tempProduct.id}`;

      this.$http.delete(api).then(res => {
        console.log("deleteProduct", res.data);
        vm.getProducts();
      });
      $("#delProductModal").modal("hide");
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/product`;
      let httpMethod = "post";

      const vm = this;
      $("#dashProductModal").modal("hide");
      vm.getProducts();

      if (!vm.isNewProduct) {
        api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(res => {
        console.log("AddNewProduct", res.data);
        if (res.data.success) {
          $("#dashProductModal").modal("hide");
          vm.getProducts();
        } else {
          $("#dashProductModal").modal("hide");
          vm.getProducts();
          console.log("Adding failed");
        }
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log("uploadFile", res.data);
          vm.status.fileUploading = false;
          if (res.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", res.data.imageUrl);
          } else {
            this.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
    },
    openModal(isNewProduct, item) {
      if (isNewProduct) {
        this.tempProduct = {};
        this.isNewProduct = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNewProduct = false;
      }
      $("#dashProductModal").modal("show");
    },
    openDeleteModal(item) {
      $("#delProductModal").modal("show");
      this.tempProduct = Object.assign({}, item);
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
