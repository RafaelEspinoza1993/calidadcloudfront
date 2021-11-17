<template>
  <section class="home section">
    <NavbarComponent />
    <section class="container">
      <ListComponent />
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import NavbarComponent from '@/components/NavbarComponent.vue'
import ListComponent from '@/components/ListComponent.vue'

export default {
  name: 'Home',
  components: {
    NavbarComponent,
    ListComponent
  }
}
</script>
