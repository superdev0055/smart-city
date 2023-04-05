var mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    firstName:{
        type: String, required: true, minlength: 1, trim: true
    },
    lastName:{
        type: String, minlength: 1, trim: true
    },
    CIN:{
        type: String, maxlength: 8,maxlength: 8, trim: true
    },
    Phone:{
        type: String, minlength: 1, trim: true
    },
    Email:{
        type: String, required: true, minlength: 1
    },
    Gendre:{
        type: String, minlength: 1, trim: true
    },
    receiverPhone:{
        type: String, minlength: 1, trim: true
    },
    password:{type: String, required: true, minlength: 6},

    birthDate:{type:Date,default:Date.now},
    tokens:[{
         access:{
              type:String,
             required: true
         },
         token:{
             type:String,
             required: true
         }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this;
    return user.toObject();
};

UserSchema.methods.generateAuthToken = function () {
   let user = this;
   let access = 'auth';
   let token = jwt.sign({_id: user._id.toHexString(),access},'sec1993').toString();
   user.tokens.push({access, token});
   return user.save().then(function () {
       return token;
   });
};

UserSchema.methods.removeToken = function (token) {
    let user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

UserSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'sec1993');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (Email, password) {
    let User = this;
    return User.findOne({Email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            // Use bcrypt.compare to compare password and user.password
            bcrypt.compare(password, User.password, (res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

module.exports= mongoose.model('User',UserSchema);