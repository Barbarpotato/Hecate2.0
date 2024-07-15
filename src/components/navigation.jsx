"use client";
import { Flex, Heading, Spacer } from '@chakra-ui/react';
import { useSession, signOut } from "next-auth/react";
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
                <Link key={idx} style={{ padding: '10px' }} href={item.key} >
                    <Heading _hover={{ textDecoration: 'underline' }} className={currentPath === item.key ? 'ternaryColor' : 'primaryFontColor'} paddingX={2} fontSize={'lg'}>
                        {item.label}
                    </Heading>

                </Link>
            ))}
            <Spacer />

            {session && (
                <Heading style={{ cursor: 'pointer' }} onClick={() => signOut()} _hover={{ textDecoration: 'underline' }} paddingY={2} paddingLeft={2} paddingRight={5} fontSize={'lg'}>Logout</Heading>
            )}

        </Flex>
    )
}

export default Navigation