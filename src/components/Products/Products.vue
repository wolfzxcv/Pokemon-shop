<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="row mt-4 outer">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: 25%  ; background-position: center; background-repeat: no-repeat "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">WAS {{ item.origin_price | currency }}</del>
              <div class="h5">NOW {{ item.price | currency }}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              Read more
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--Start of single detailed product modal-->

    <div
      class="modal fade"
      id="productDetailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num"
                >選購 {{ num }} {{ product.unit }}</option
              >
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!---->
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      isLoading: false
    }
  },
  methods: {
    getProducts() {
      const vm = this
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/products/all`
      vm.isLoading = true
      this.$http.get(api).then((res) => {
        vm.products = res.data.products
        console.log('getProducts', res.data)
        vm.isLoading = false
      })
    },
    getProduct(id) {
      const vm = this
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/product/${id}`
      vm.status.loadingItem = id
      this.$http.get(api).then((res) => {
        vm.product = res.data.product
        this.product.num = 1
        $('#productDetailModal').modal('show')
        vm.status.loadingItem = ''
      })
    },
    addToCart(id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, { data: cart }).then((res) => {
        console.log('addToCart', res.data)
        vm.$bus.$emit('message:push', res.data.message, 'success')
        vm.status.loadingItem = ''
        vm.getCart()
        $('#productDetailModal').modal('hide')
      })
    },
    getCart() {
      const vm = this
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/cart`
      vm.isLoading = true
      this.$http.get(api).then((res) => {
        console.log('getCart', res.data)
        vm.isLoading = false
      })
    }
  },
  created() {
    this.getProducts()
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.outer {
  margin: 30px;
}
</style>
