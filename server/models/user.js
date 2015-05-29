import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
import jsonSelect from 'mongoose-json-select';

// const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  token: String
});

// UserSchema.pre('save', function *(next) {
//   // only hash the password if it has been modified (or is new)
//   if (!this.isModified('password')) {
//     yield next;
//   }
//   console.log(this);
//   // generate a salt
//   const salt = yield bcrypt.genSalt(SALT_WORK_FACTOR);
//   console.log(salt);
//   const hash = yield bcrypt.hash(this.password, salt);
//   console.log(hash);
//   this.password = hash;
//   console.log(this);
//   yield next;
// });

// UserSchema.methods.comparePassword = function(candidatePassword) {
//   var def = Q.defer();
//   if (!candidatePassword) {
//     console.log('compare called without password');
//     def.resolve(false);
//   }
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) {
//       def.reject(err);
//     } else {
//       def.resolve(isMatch);
//     }
//   });
//   return def.promise;
// };

UserSchema.plugin(jsonSelect, '-__v -password');

export default mongoose.model('user', UserSchema);

