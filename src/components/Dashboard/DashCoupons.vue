<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">Add New Coupon</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>Coupon Name</th>
          <th>Code</th>
          <th width="100">Percentage</th>
          <th width="100">EXP</th>
          <th width="100">Enabled</th>
          <th width="100">Edit</th>
          <th width="100">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in coupons" :key="x.id">
          <td>{{ x.title }}</td>
          <td>{{ x.code }}</td>
          <td>{{ x.percent }}</td>
          <td>{{ new Date(x.due_date*1000).toLocaleDateString("en-GB") }}</td>
          <td>
            <span v-if="x.is_enabled" class="text-success">enabled</span>
            <span v-else>disabled</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false, x)">Edit</button>
          </td>
          <td>
            <button class="btn btn-outline-danger btn-sm" @click="openDeleteCouponModal(x)">Delete</button>
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
            @click.prevent="getCoupons(pagination.current_page - 1)"
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
          <a class="page-link" href="#" @click.prevent="getCoupons(page)">
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
            @click.prevent="getCoupons(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <!--Pagination end-->

    <!--Coupon modal starts--->

    <div
      class="modal fade"
      id="dashCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>Coupon's detail</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">Coupon Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempCoupon.title"
                  placeholder="Please enter coupon name"
                />
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="code">Coupon code</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    v-model="tempCoupon.code"
                    placeholder="Please enter coupon code"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="percentage">Percentage</label>
                  <input
                    type="number"
                    class="form-control"
                    id="percentage"
                    v-model="tempCoupon.percent"
                    placeholder="Please enter percentage"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="timestamp">Expiration date</label>
                <input
                  type="text"
                  class="form-control"
                  id="timestamp"
                  v-model="tempCoupon.due_date"
                  placeholder="Please enter an expiration date in timestamp formate"
                />
              </div>

              <hr />

              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_enabled"
                    v-model="tempCoupon.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">Enabled</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-outline-primary" @click="updateCoupon">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <!--Coupon modal ends--->

    <!--delete modal-->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>Delete Coupon</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete
            <strong class="text-danger">{{ tempCoupon.title }}</strong> ?
            (Can't recover after deleted)
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">Confirm deletion</button>
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
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isNewCoupon: false,
      isLoading: false
    };
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupons?page=${page}`;

      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then(res => {
        console.log("getCoupons", res.data);
        vm.isLoading = false;
        vm.coupons = res.data.coupons;
        vm.pagination = res.data.pagination;
      });
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${this.tempCoupon.id}`;

      this.$http.delete(api).then(res => {
        console.log("deleteCoupon", res.data);
        vm.getCoupons();
      });
      $("#delCouponModal").modal("hide");
    },
    updateCoupon() {
      let api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon`;
      let httpMethod = "post";

      const vm = this;
      $("#dashCouponModal").modal("hide");
      vm.getCoupons();

      if (!vm.isNewCoupon) {
        api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(res => {
        console.log("AddNewCoupon", res.data);
        if (res.data.success) {
          $("#dashCouponModal").modal("hide");
          vm.getCoupons();
        } else {
          $("#dashCouponModal").modal("hide");
          vm.getCoupons();
          console.log("Adding Coupon failed");
        }
      });
    },
    openCouponModal(isNewCoupon, item) {
      if (isNewCoupon) {
        this.tempCoupon = {};
        this.isNewCoupon = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNewCoupon = false;
      }
      $("#dashCouponModal").modal("show");
    },
    openDeleteCouponModal(item) {
      $("#delCouponModal").modal("show");
      this.tempCoupon = Object.assign({}, item);
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>