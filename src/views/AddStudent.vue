<template>
  <div>
    <AddStudentComponent msg="Add Student"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AddStudentComponent from '@/components/AddStudentComponent.vue';
@Options({
  components: {
    AddStudentComponent,
  },
})
export default class AddStudent extends Vue {}
</script>
