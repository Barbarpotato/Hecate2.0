"use client";
import { Flex, Heading, Spacer } from '@chakra-ui/react';
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

    const currentPath = usePathname();

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

        </Flex>
    )
}

export default Navigation