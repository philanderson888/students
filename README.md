# mevn-06

## contents

- [mevn-06](#mevn-06)
  - [contents](#contents)
  - [introduction](#introduction)
  - [getting started](#getting-started)
  - [tidy up](#tidy-up)
  - [bootstrap](#bootstrap)
  - [students](#students)
  - [add student page](#add-student-page)
  - [bootstrap navbar](#bootstrap-navbar)
  - [add students](#add-students)
  - [back end](#back-end)
  - [mongo](#mongo)
  - [mongo client](#mongo-client)
  - [connection to database](#connection-to-database)
  - [database model](#database-model)
  - [backend `routes`](#backend-routes)
  - [back end `app.js`](#back-end-appjs)
  - [`yarn` and `nodemon`](#yarn-and-nodemon)
  - [read the database](#read-the-database)
  - [create a new database record](#create-a-new-database-record)
  - [create our first record](#create-our-first-record)
  - [students](#students-1)
  - [Edit Student](#edit-student)
  - [move the database online](#move-the-database-online)
  - [mongo db atlas](#mongo-db-atlas)
  - [`.env` environment variables](#env-environment-variables)
  - [mongo database connection string](#mongo-database-connection-string)
  - [moving your front end application online](#moving-your-front-end-application-online)

## introduction

this is a rebuild of [mevn-05](../mevn-05) with a goal of 
1) building everything from fresh, with clear instructions
2) practising building for speed
   1) time started 8.34am! 18/9/2021
   2) time finished 12.10pm 18/9/2021 so took about 3.5 hours on and off to recreate the app and complete documentation.  Notice that the app was an upgrade with improvements from the previous version.
3) once done, move the database to an online mongo database
4) possibly ... stretch goal ... replace back end api with serverless function ... ??? not sure, let's see how it goes ...

## getting started

so let's get stuck in and get started building the whole app completely from scratch

the date of this build is `September 2021` and we all know that libraries update and go out of date, so it's great to refresh code!

```js
vue create mevn-06; cd mevn-06; yarn add bootstrap axios; yarn serve
```

choose manual options vue3, typescript, babel, router, lint with error

view app at http://localhost:8000

## tidy up

remove `assets\logo.png`

`HelloWorld.vue` component

```js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>
```

`Home.vue` view

```js
<template>
  <div class="home">
    <HelloWorld msg="Students"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
```

## bootstrap

this is not really needed and would want to replace with a better plug-in in the future, but rolling with this for now ...

```js
yarn add bootstrap; yarn serve
```

`main.ts`

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
createApp(App).use(router).mount('#app')
```

bootstrap should now be visible ...


## students

let's now build the students page which displays all students from the database

`components\StudentsComponent.vue`

```js
<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  props: {
    msg: String
  }
})
export default class StudentsComponent extends Vue {
  msg!: string;
  data() {
    return {
    }
  }
}
</script>
```

`views\Students.vue`

```js
<template>
  <div>
    <ListComponent msg="This page lists database items"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ListComponent from '@/components/ListComponent.vue'; // @ is an alias to /src

@Options({
  components: {
    ListComponent,
  },
})
export default class ListView extends Vue {}
</script>
```

`router\index.ts`

```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import About from '../views/About.vue'
const routes: Array<RouteRecordRaw> = [
  { path: '/',   name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About  }, 
  { path: '/students', name: 'Students', component: Students }, 
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
```

## add student page

we can also add our final page, `add student`

`components\AddStudentComponent.vue`

```js
<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  props: {
    msg: String
  }
})
export default class AddStudentComponent extends Vue {
  msg!: string;
  data() {
    return {
    }
  }
}
</script>
```

`views\AddStudent.vue`

```js
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
```

`router\index.ts`

```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import AddStudent from '../views/AddStudent.vue'
import About from '../views/About.vue'
const routes: Array<RouteRecordRaw> = [
  { path: '/',   name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About  }, 
  { path: '/students', name: 'Students', component: Students }, 
  { path: '/add-student', name: 'AddStudent', component: AddStudent }, 
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
```

and finally `App.vue`

```js
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/students">Students</router-link> |
    <router-link to="/add-student">Add Student</router-link>
  </div>
  <router-view/>
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
</style>
```

so our blank app now has 4 pages all ready to put some data in!


## bootstrap navbar

bootstrap is a little bit 'old-hat' but we are using this to follow the original tutorial for now, might upgrade this to something a bit more exiting in the future.

so here's the home page with bootstrap navbar as wel. ...

`App.vue`

```js
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
</style>
```

## add students

let's add some front end code to add a new student to our (non-existent) back-end database

```js
yarn add axios; yarn serve
```

`components\AddStudentComponent.vue`

```js
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
@Options({
  props: {
    msg: String
  }
})
export default class AddStudentComponent extends Vue {
  msg!: string;
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
      return true
  }
}
</script>
```

`AddStudent.vue`

```js
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
```

`App.vue`

```js
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
```

## back end

to create the back end let us create a new folder `api`

create a new `powershell` session and type

```
cd mevn-06; md api; cd api
npm init # accept all defaults by pressing 'enter'
yarn add body-parser cors express mongoose
```

install `nodemon` as administrator

```
yarn global add nodemon
```

## mongo

as administrator

```
choco install mongodb
```

to add `mongo` to the windows `path` press the `windows` key, type `env` and choose to `edit the environment variables` and in the system section, find `path` and click `edit`.  click `new` to add a new path and paste in `C:\Program Files\MongoDB\Server\5.0\bin` which is where you will find the mongo executables installed.  save and reboot your computer to activate the environment variables.

notice the path to the database and log files

```
C:\ProgramData\MongoDB\data\db
C:\ProgramData\MongoDB\log
```

these paths are where the data will be stored.  

start mongo database

```
mongod
```

## mongo client

we can use `mongo` as a command to run our mongo client but this has been upgraded to `mongo shell` which can be installed via downloaing from https://www.mongodb.com/try/download/shell?jmp=docs 

add to `path` variables `C:\Program Files\mongosh` and restart Windows.

```js
// database
mongod
// database client
mongosh
/*
PS C:\github> mongosh
Current Mongosh Log ID: 6145b386f06e7f4bc7b5e139
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
Using MongoDB:          5.0.2
Using Mongosh:          1.0.5
*/
```

## connection to database

to add a connection to our database add a new file `api\database.js`

```js
module.exports = {
    db: 'mongodb://localhost:27017/students'
 }
 ```

 ## database model

 add `api\models\Student.js`

 ```js
 const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let studentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
}, {
  collection: 'students'
})
module.exports = mongoose.model('Student', studentSchema)
 ```

## backend `routes`

add backend `api\routes\student.route.js` file to handle `GET` `POST` `PUT` `DELETE` http requests to the student database via `axios`

```js
const express = require('express');
const studentRoute = express.Router();
let StudentModel = require('../models/Student');

studentRoute.route('/update-student/:id').put((req, res, next) => {
  console.log(`attempting to update one student with id ${req.params.id}`)
  console.log(`request body = `)
  console.log(JSON.stringify(req.body))
  console.log(req.body)
  StudentModel.updateOne({_id:req.params.id},
     { $set: req.body },
   (error, data) => {
    if (error) {
      console.log(`an error has taken place`)
      return next(error);
    } else {
      res.json(data)
      console.log('Student successfully updated!')
    }
  })
})
studentRoute.route('/create-student').post((req, res, next) => {
  console.log('creating one student at /create-student')
  StudentModel.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(`student created ${JSON.stringify(data)}`)
    res.json(data)
  }
})
});
studentRoute.route('/edit-student/:id').get((req, res, next) => {
  console.log('get one student at /edit-student/:id')
   StudentModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
studentRoute.route('/delete-student/:id').delete((req, res, next) => {
  console.log('delete one student at /delete-student/:id')
  StudentModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
studentRoute.route('/').get((req, res, next) => {
  console.log('GET all students')
    StudentModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })
module.exports = studentRoute;
```

## back end `app.js`

and now the back end application file `app.js` to tie everything together

```js
let express = require('express'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  database = require('./database'),
  bodyParser = require('body-parser');

// Connect mongoDB
mongoose.Promise = global.Promise;
//mongoose.set('useFindAndModify',false);
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected")
  },
  error => {
    console.log("Database could't be connected to: " + error)
  }
)

const studentAPI = require('../api/routes/student.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// API
app.use('/api', studentAPI)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

const logUsage = (logCode) => {
  console.log(`http serving with code ${logCode}`)
}

app.use((req, res, next) => {
  console.log(`logging data in 'next'`)
  next(logUsage(200));
});

app.use(function (err, req, res, next) {
  console.log('in app.use')
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
```

## `yarn` and `nodemon`

now add `app.js` to `package.json` so everything can be run with `yarn start` or `yarn serve` or in our case `nodemon`

```json
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^5.13.7",
    "nodemon": "^2.0.12"
  }
}
```

```js
yarn install
nodemon
/*
PS C:\github\mevn\projects\students\mevn-06\api> nodemon
[nodemon] 2.0.12
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Connected to port 4000
Database connected
*/
```

## read the database

to verify the database is working we can go to `http://localhost:4000/api` and observe the empty array being output

in the console we should also see

```js
/*
GET all students
logging data in 'next'
http serving with code 200
*/
```

## create a new database record

now let's see if we can hook in our `front end` into our `back end` by sending an `http` request via axios from our front-end `AddStudent.vue` page

`AddStudentComponent.vue`

```js
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
```

## create our first record

if we have done this correctly we can now create our first database record

submit a new student at `http://localhost:8080/add-student`

```js
/*
form is being submitted
AddStudentComponent.vue?3782:28 api url = http://localhost:4000/api/create-student
AddStudentComponent.vue?3782:30 this.student = {"name":"PHIL","email":"abc@123.com","phone":"123"}
*/
```

and our record should show in our back end at `http://localhost:4000/api`

```json
[
{
"_id": "6145bc4c4f67ddd941e5916e",
"name": "PHIL",
"email": "abc@123.com",
"phone": 123,
"__v": 0
}
]
```

## students

now to list students we can add

```js
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
```

## Edit Student

before this will compile we have to add `EditStudent.vue` as well so first the component `EditStudentComponent.vue`

```js
<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Edit Student</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Ndddame</label>
                    <input type="text" class="form-control" v-model="student.name" required>
                </div>
                <div class="form-group">
                    <label>Emaidddl</label>
                    <input type="email" class="form-control" v-model="student.email" required>
                </div>
                <div class="form-group">
                    <label>Phodddne</label>
                    <input type="text" class="form-control" v-model="student.phone" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-danger btn-block">tttttttUpdate</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import axios from "axios";
export default class EditStudentComponent extends Vue {
  student!: {
    name: '',
    email: '',
    phone: ''
  }
  data() {
    return {
      student: { }
    }
  }
  created() {
    let apiURL = `http://localhost:4000/api/edit-student/${this.$route.params.id}`;
    axios.get(apiURL).then((res) => {
        this.student = res.data;
    })
  }
  handleUpdateForm() {
    let id = this.$route.params.id
    let apiURL = `http://localhost:4000/api/update-student/${this.$route.params.id}`;
    console.log(`attempt to update student at url`)
    console.log(apiURL)
    console.log(`with id`)
    console.log(id)
    console.log(`attempt to update student ${JSON.stringify(this.student)}`)
    axios.put(apiURL, this.student)
    .then(res => {
        console.log(`response is ${res}`)
        this.$router.push('/students')
    })
    .catch(error => {
        console.log('error when updating student')
        console.log(error)
    });
  }
}
</script>
```

now `EditStudent.vue` view

```js
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
```

and the route

```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import AddStudent from '../views/AddStudent.vue'
import About from '../views/About.vue'
const routes: Array<RouteRecordRaw> = [
  { path: '/',   name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About  }, 
  { path: '/students', name: 'Students', component: Students }, 
  { path: '/add-student', name: 'AddStudent', component: AddStudent }, 
  { path: '/edit/:id', name: 'edit',  component: () => import(/* webpackChunkName: "edit" */ '../views/EditStudent.vue') }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
```

we now have a complete application and it's performing our full `crud` operations - create, read, update, delete

## move the database online

now let's see if we can move this database online!

it should not be too hard!

## mongo db atlas

`mongodb atlas` provides a free tier of database accessible online.  To do so please go online at https://cloud.mongodb.com, create an account and a new `cluster` and database with a database user and password which we will need later.  Clicking on the cluster `connect` button and choosing option 2 `connect your application` which should reveal your `url` such as

```
mongodb+srv://<user>:<password>@cluster0.iilta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

where `<user>` and `<password>` are supplied by yourself.

when we are finished we will have an empty database although we will not see a database record yet.  The example shows how our database will look after our first student has been created which is not quite yet.

<img src="../../../images/mongodb.png" width="400">


## `.env` environment variables

We are going to need to store usernames and passwords in our app so we should not hard code them to `github` for the sake of security.

so the first thing to do is to ensure inside our `.gitignore` folder at the `root` of our github repository has the following lines 

*note - when you create our front end and back end they may also have created `.gitignore` files.  don't worry about these ones - they will not work and your password will be pushed to `github` on commit!  The only `.gitignore` file to be altering is the one in the very top root of your `github` repository

```
# dotenv environment variables file
.env
```

and then in the root of our `api` folder we create a `.env` file

```
VUE_APP_MONGO_DB_USERNAME=put-your-username-here
VUE_APP_MONGO_DB_PASSWORD=put-your-password-here
```

## mongo database connection string

once we have the variables in place we can now change our `api\database.js` file to read

```js
/*
module.exports = { 
    db: 'mongodb://localhost:27017/students'
 }
 */
 const dotenv = require('dotenv').config().parsed
 console.log(`mongo db username is ${process.env.VUE_APP_MONGO_DB_USERNAME}`)
 console.log(`mongo db password is ${process.env.VUE_APP_MONGO_DB_PASSWORD}`)
 module.exports = {
    db: `mongodb+srv://${process.env.VUE_APP_MONGO_DB_USERNAME}:${process.env.VUE_APP_MONGO_DB_PASSWORD}@cluster0.iilta.mongodb.net/database?retryWrites=true&w=majority`
 }
```

when you run your code and try to create a student or read all students, you should now see some extra logging in your `api` console

```js
/*
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
mongo db username is put-your-username-here
mongo db password is put-your-password-here
Connected to port 4000
Database connected
GET all students
creating one student at /create-student
student created {"name":"PHIL","email":"abc@123.com","phone":123"_id":"6145f1dbb583c3c7a8fbb704","__v":0}
GET all students
*/
```

and if you have done this right, you will now be able to read and write data to your online database!

## moving your front end application online

we now have 3 parts to our application

1. front end vue application `students`
2. back end api
3. database

the location of each of these is as follows

1. front end vue app - localhost port 8080
2. back end api - localhost port 4000
3. database - online at `https://cloud.mongodb.com` (but can switch to offline)

the next part to this tutorial is to move our front end code online, keeping for now our back end api on our local computer for now

to move our `front end` vue application online we should

1. create a dedicated github repository for our application if we have not already done so
2. ensure the `.gitignore` has the `.env` file included
3. commit the changes to github
4. create an account with `https://www.netlify.com` and choose to authenticate and log in with `github`.  use your github credentials to log in to your `netlify` account.  then choose `create a new site from github` and follow the prompts to find your github repository.
5. with the build commands you must enter
   1. build command - `yarn build`
   2. publish directory - `dist`
6. run the build and click on the link given

so to follow myself...

create the repository with `.gitignore` node and `licence = MIT`

find the url of the repository eg https://github.com/philanderson888/students

on your computer find your folder where you keep your `github` repositories eg `c:\github`

navigate there using powershell

```js
cd /github
```

clone your new repository

```js 
git clone https://github.com/philanderson888/students
```

go to your existing repository and copy all items except the `api` folder to your new repository

ensure your `.gitignore` has the `.env` entry

create a commit and push to the internet

```js

```