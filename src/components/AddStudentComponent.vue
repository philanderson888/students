<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">{{msg}}</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="student.name" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="student.email" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="student.phone" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block form-control">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios' 
@Options({
  props: {
    msg: String
  }
})
export default class AddStudentComponent extends Vue {
  msg!: string;
  student!: {
    name: '',
    email: '',
    phone: ''
  }
  data() {
    return {
        student: {
            name: '',
            email: '',
            phone: ''
        } 
    }
  }
  handleSubmitForm() { 
    console.log(`form is being submitted`)
    let apiURL = 'http://localhost:4000/api/create-student';
    console.log(`api url = ${apiURL}`)
    axios.post(apiURL, this.student).then(() => {
        console.log(`this.student = ${JSON.stringify(this.student)}`)
        this.$router.push('/students')
        this.student = {
        name: '',
        email: '',
        phone: ''
        }
    }).catch(error => {
        console.log(error)
    });
  }
}
</script>
