<template>
  <div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <router-link
          class="nav-link active"
          id="pills-home-tab"
          data-toggle="pill"
          href="#pills-home"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
          to="/login"
        >
          <i class="fas fa-user-friends"></i> Login
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          id="pills-profile-tab"
          data-toggle="pill"
          href="#pills-profile"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
          to="products"
        >
          <i class="fas fa-boxes"></i> Products
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          id="pills-contact-tab"
          data-toggle="pill"
          href="#pills-contact"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
          to="/cart"
        >
          <i class="fas fa-cart-plus"></i> Cart
        </router-link>
      </li>
    </ul>
  </div>
</template>