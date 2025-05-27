import mongoose, {Schema, Document} from 'mongoose'

export interface Message extends Document{
    content: string;
    createdAt: Date;


}

const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifiedCode: string;
    verifiedCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verifiedCode: { type: String, required: true },
    verifiedCodeExpiry: { type: Date, required: true },
    isVerified: { type: Boolean, default: false }, 
    isAcceptingMessage: { type: Boolean, default: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}, {
    timestamps: true
})

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User', UserSchema);

export default UserModel;