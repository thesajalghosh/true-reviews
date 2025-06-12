'use client'

import { SessionProvider } from "next-auth/react"
import type { SessionProviderProps } from "next-auth/react";

export default function AuthProvider({
  children,
}: {children: React.ReactNode}) {
  return (
    <SessionProvider >
    {children}
    </SessionProvider>
  )
}