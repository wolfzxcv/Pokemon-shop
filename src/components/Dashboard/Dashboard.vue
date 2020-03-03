<template>
  <div>
    <DashNav />
    <div class="container-fluid">
      <div class="row">
        <DashSide />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import DashNav from './DashNav'
import DashSide from './DashSide'

export default {
  components: {
    DashNav,
    DashSide
  }
}
</script>
