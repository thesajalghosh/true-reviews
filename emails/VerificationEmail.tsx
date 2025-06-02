// components/VerificationEmail.tsx

import { FC } from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Tailwind } from '@react-email/tailwind';

interface VerificationEmailProps {
  userName?: string;
  otpCode: string;
}

const VerificationEmail: FC<VerificationEmailProps> = ({ userName = 'there', otpCode }) => {
  return (
    <Html>
      <Head />
      <Preview>Your OTP verification code</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto mt-10">
            <Text className="text-xl font-semibold text-gray-900 mb-2">
              Hello {userName},
            </Text>
            <Text className="text-gray-700 mb-4">
              Use the following One-Time Password (OTP) to verify your email address. This code is valid for 10 minutes:
            </Text>
            <Section className="text-center my-6">
              <Text className="text-3xl font-bold tracking-widest text-blue-600">
                {otpCode}
              </Text>
            </Section>
            <Text className="text-sm text-gray-600">
              If you didn’t request this, you can safely ignore this email.
            </Text>
            <Text className="text-sm text-gray-600 mt-6">
              Thanks,
              <br />
              The 1audit Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
