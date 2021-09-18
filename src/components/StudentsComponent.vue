<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h1>{{ msg }}</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <table class="table table-striped">
        <thead class="thead-dark">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="student in Students" :key="student._id">
                <td>{{ student.name }}</td>
                <td>{{ student.email }}</td>
                <td>{{ student.phone }}</td>
                <td>
                    <router-link :to="{name: 'edit', params: { id: student._id }}" class="btn btn-primary">Edit</router-link>
                    <button @click.prevent="deleteStudent(student._id)" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        </tbody>
      </table>
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
export default class StudentsComponent extends Vue {
  msg!: string;
  student!: {
    name: '',
    email: '',
    phone: ''
  }
  Students: any = []
  created(){
    let apiURL = 'http://localhost:4000/api';
    axios.get(apiURL).then(res => {
        this.Students = res.data;
        for (let i=0;i<this.Students.length;i++){
          console.log(JSON.stringify(this.Students[i]))
        }
    }).catch(error => {
        console.log(error)
    });
  }

  deleteStudent(id:any){
    let apiURL = `http://localhost:4000/api/delete-student/${id}`;
    let i = 0;
    let indexOfArrayItem = this.Students.findIndex((i:any) => i._id === id);

    if (window.confirm("Do you really want to delete?")) {
        axios.delete(apiURL).then(() => {
            this.Students.splice(indexOfArrayItem, 1);
        }).catch(error => {
            console.log(error)
        });
    }
  }
}
</script>

