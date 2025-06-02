import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    // try {
    //     const body = await Request.json();
    //     const { email, password, userName } = body;

    //     if (!email || !password || !userName) {
    //         return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
    //     }

    //     await dbConnect();

    //     const existingUser = await UserModel.findOne({ email });
    //     if (existingUser) {
    //         return new Response(JSON.stringify({ success: false, message: "User already exists" }), { status: 400 });
    //     }

    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    //     const newUser = new UserModel({
    //         email,
    //         password: hashedPassword,
    //         userName,
    //         verifyCode,
    //         isVerified: false
    //     });

    //     await newUser.save();

    //     await sendVerificationEmail(email, userName, verifyCode);

    //     return new Response(JSON.stringify({ success: true, message: "User created successfully. Please check your email for verification." }), { status: 201 });
    // } catch (error) {
    //     console.error("Error in sign-up route:", error);
    //     return new Response(JSON.stringify({ success: false, message: "Internal server error" }), { status: 500 });
    // }

    await dbConnect();

    try {
        const { userName, email, password } = await request.json();

        const existingUserVerifyedByUser = await UserModel.find({ userName, isVerified: true })

        if (existingUserVerifyedByUser) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({ email })
        if (existingUserByEmail) {

        }
        else {
            const verifyCode = Math.floor(10000 + Math.random() * 9000).toString()
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()

            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username: userName,
                email,
                password: hashedPassword,
                verifiedCode: verifyCode,
                verifiedCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
            })

            await newUser.save()
        }

    } catch (error) {
        console.log("error in register user", error);
        return Response.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
