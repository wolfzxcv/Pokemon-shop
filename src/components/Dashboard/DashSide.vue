<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>Admin</span>
        <a
          class="d-flex align-items-center text-muted"
          href="#"
          aria-label="Add a new report"
        >
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/products">
            <i class="fas fa-boxes"></i> Products
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/orders">
            <i class="fas fa-paste"></i> Orders
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/coupons">
            <i class="fas fa-money-check-alt"></i> Coupons
          </router-link>
        </li>
      </ul>

      <!----down---->
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>Guests</span>
        <a
          class="d-flex align-items-center text-muted"
          href="#"
          aria-label="Add a new report"
        >
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link" to="/products">
            <i class="fas fa-shopping-basket"></i> Go shopping
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
