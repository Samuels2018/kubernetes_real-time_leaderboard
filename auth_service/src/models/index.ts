import mongoose, {Document, Schema, Model} from 'mongoose';
import bcrypt from 'bcrypt';


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  }
}, {
  tiemestamps: true,
  versionKey: false
});


userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();

    } catch (err: any) {
      next(err);
    }

  }
})

userSchema.methods.camparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

