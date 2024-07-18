// app/providers.tsx
'use client'
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client';
import theme from './theme/theme';
import client from './libs/apollo-client';

export function Providers({ children }) {
    return (
        <SessionProvider>
            <ApolloProvider client={client}>
                <ChakraProvider theme={theme}>
                    {children}
                </ChakraProvider>
            </ApolloProvider>
        </SessionProvider>
    )
}