<template>
  <div>
    <EditStudentComponent msg="Edit Student"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import EditStudentComponent from '@/components/EditStudentComponent.vue';
@Options({ 
  components: { EditStudentComponent },
})
export default class EditStudent extends Vue {}
</script>
