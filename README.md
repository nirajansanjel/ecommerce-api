## started from Mongoose , I am starting the redme file for notes and programs hints.
# Cases
Sentence case: Hello world
Camel case: helloWorld
Pascal case: HelloWorld
Kebab case: hello-world
Snake case: hello_world
#  Intro to Mongoose
ODM of MongoDB for Node.js(Object Data Modelling)
Schema validation
Models
Middleware
Relationships
## schema Properties
- required: 
name: {
  type:String,
required:[true,"Name is required"]
},
- default and min,max:
stock:{
    type:Number,
    default:10,
    max:[500,"Maximum stock should not cross 500"]
  },
  - date:
  createdAt: {
    type:Date,
        default:Date.now(),
  },
  ## other properties
  - trim(to cut unneccesary spaces): syntax trim: true
  - lowercase and uppercase: syntax lowercase:true
  - select(to show on frontend or not ):syntax select:false
  - immutable(does not allow to update): syntax immutable: true
  - unique(cant be same for multiple): syntax unique:true

