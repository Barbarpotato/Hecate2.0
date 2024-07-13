"use client";
import { Flex, Heading, Spacer } from '@chakra-ui/react';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const items = [
    {
        label: 'Home',
        key: '/',
    },
    {
        label: 'Dashboard',
        key: '/dashboard',
    },
]

function Navigation() {

    const { data: session, status } = useSession();

    const currentPath = usePathname();

    // Check if session is expired (optional - usually handled by NextAuth)
    const isSessionExpired = session?.expires && new Date(session.expires) < new Date();

    return (
        <Flex paddingY={2}>
            {items.map((item, idx) => (
                <Link key={idx} style={{ padding: '10px;' }} href={item.key} >
                    <Heading _hover={{ textDecoration: 'underline' }} className={currentPath === item.key ? 'ternaryColor' : 'primaryFontColor'} paddingX={2} fontSize={'lg'}>
                        {item.label}
                    </Heading>

                </Link>
            ))}
            <Spacer />

            {!isSessionExpired && (
                <Link style={{ padding: '10px;' }} href="/login">
                    <Heading className={currentPath === "/login" ? 'ternaryColor' : 'primaryFontColor'} paddingX={2} fontSize={'lg'}>Login</Heading>
                </Link>
            )}

        </Flex>
    )
}

export default Navigation