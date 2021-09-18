<template>
  <nav id="nav" class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
    <div class="container">
      <router-link class="nav-link pr-3" to="/">
        <a class="navbar-brand float-left">Students App</a>
      </router-link>
      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/students">Students</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/add-student">Add Student</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container mt-5">
    <router-view></router-view>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.nav-item {
  padding: 0 1vw;
}
.form-group{
  padding: 1vh 0;
}
</style>
