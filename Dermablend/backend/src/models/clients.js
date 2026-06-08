/*
name,
email, 
password,
birthdate,
phone,
favorites: {
labial,
polvo,
base
}
skin_type: {
grasa, 
seca, 
mixta,
}
skin_tone{
morena,
blanca,
trigueña
}
isVerified,
loginAttempts
public_id
*/ 

import {Schema, model} from "mongoose"

const clientSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password: {
        type: String 
    },
    birthdate: {
        type: Date
    },
    phone: {

    },
    favorites: [
        {
            labial:{type: String},
            polvo: {type: String},
            base: {type: String}
        }
    ],
    skin_tone: [
        {
            morena: {type: String},
            blanca: {type: String},
            trigueña: {type: String}
        }
    ],
    skin_type: [
        {
            grasa:{type: String}, 
            seca:{type: String}, 
            mixta: {type: String}
        }
    ],

    isActive: {
        type: Boolean
    },
    isVerified:{
            type:Boolean
    },
    loginAttempts:{
        type: Number
    },
    image: {
        type: String
    },
    public_id: {
        type: String
    }
},{
    timestamps: true,
    strict: false 

})

export default model ("Clients", clientSchema)