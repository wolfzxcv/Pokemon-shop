<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Pokemon shop</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'DashNav',
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_PATH}/logout`
      const vm = this
      this.$http.post(api).then((res) => {
        console.log('signout', res.data)
        if (res.data.success) {
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>
