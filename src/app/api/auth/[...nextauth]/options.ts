import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";




export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "sajal.ghosh@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const findUser = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { userName: credentials.identifier }
                        ]
                    })
                    if (!findUser) {
                        throw new Error('No user found')
                    }

                    if (!findUser.isVerified) {
                        throw new Error('Please verify your account first')
                    }

                    const isPasswordCurrect = await bcrypt.compare(credentials.password, findUser.password)

                    if (isPasswordCurrect) {
                        return findUser
                    } else {
                        throw new Error('incurrect password')
                    }

                } catch (error) {
                    throw new Error()
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user){
                token._id = user._id?.toString()
                token.isVerified= user.isVerified
                token.isAcceptingMessage = user.isAcceptingMessage,
                token.userName = user.userName


            }
            return token
        },
        async session({ session, token }) {
            session.user._id = token._id
            session.user.isVerified = token.isVerified
            session.user.isAcceptingMessage = token.isAcceptingMessage
            session.user.userName = token.userName
            return session
        },


    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}