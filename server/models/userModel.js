const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')
const Schema=mongoose.Schema

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true 
    }
})



// static signup METHODS
userSchema.statics.signup=async function(email,password){

// validation 

if(!email||!password) {
 throw Error('ALl fields must be filled')

}

if(!validator.isEmail(email)){
    throw Error("Email is not valid.")
}

if(!validator.isStrongPassword(password)) {
throw Error("Password not strong enough.")

}
     const exist=await this.findOne({email});

     if(exist){
        throw Error('Error already in use')
     }

     const salt=await bcrypt.genSalt(10);
     const hash=await bcrypt.hash(password,salt);

     const user=await this.create({email,password:hash});

     return user;

}


module.exports=mongoose.model('User',userSchema)