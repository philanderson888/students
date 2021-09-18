<template>
  <div>
    <StudentsComponent msg="Students"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import StudentsComponent from '@/components/StudentsComponent.vue';
@Options({
  components: {
    StudentsComponent,
  },
})
export default class Students extends Vue {}
</script>