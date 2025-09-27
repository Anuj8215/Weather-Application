// Removed conflicting import of User
import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  favoriteLocations: Array<string>;
  preferences: {
    temperatureUnit: 'celsius' | 'fahrenheit';
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email'
      ]
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    favoriteLocations: [
      {
        name: {
          type: String,
          required: true,
          trim: true
        },
        latitude: {
          type: Number,
          required: true,
          min: -90,
          max: 90
        },
        longitude: {
          type: Number,
          required: true,
          min: -180,
          max: 180
        }
      }
    ],
    preferences: {
      temperatureUnit: {
        type: String,
        enum: ['celsius', 'fahrenheit'],
        default: 'celsius'
      },
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
      },
      notifications: {
        type: Boolean,
        default: true
      }
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        if (ret.password !== undefined)
          delete ret.password;

        return ret;
      } as (_doc: Document, ret: Partial<IUser>) => Partial<IUser>
    }
  }
);

// NOTE - Hash password before saving to DB
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
    return next();


  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

// NOTE - Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export { User };
export default User;
