import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import React from "react";


export async function sendVerificationEmail(
    email: string,
    userName: string,
    verifyCode: string
): Promise<ApiResponse> {

    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Email',
            react: React.createElement(VerificationEmail, { userName, otpCode: verifyCode }),
        });
        return { success: true, message: "Verification successfully done" }
    } catch (error) {
        console.log("error", error)
        return { success: false, message: "Verification failed" }
    }

}
