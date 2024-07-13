// app/providers.tsx
'use client'
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }) {
    return (
        <SessionProvider>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </SessionProvider>
    )
}