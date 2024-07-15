"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import useWindowSize from "@/hooks/useWindowSize";
import { primaryFontColor, secondaryColor } from "../theme";
import Unauthorized from "@/components/unauthorized";
import { Box, Heading } from "@chakra-ui/react";
import { Fragment } from "react";

const Dashboard = () => {

    const { width } = useWindowSize();

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <Unauthorized />
    }

    // Check if session is expired (optional - usually handled by NextAuth)
    const isSessionExpired = session?.expires && new Date(session.expires) < new Date();

    return (
        <Box>
            {isSessionExpired ? (
                <Unauthorized />
            ) : (

                <Box textAlign="center" paddingX={4}>
                    <Heading
                        fontSize={width >= 500 ? '4rem' : '2rem'}
                        pb={2} pt={12}
                        color={secondaryColor}
                    >
                        Welcome Back <span className="ternaryColor" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Darmawan</span>
                    </Heading>

                    <Heading
                        fontSize={width >= 500 ? '2rem' : '1.5rem'}
                        py={2}
                        color={primaryFontColor}
                    >
                        Manage Your Portfolio Content With <span className="ternaryColor" style={{ fontWeight: 'bold' }}>Dynamic!</span>
                    </Heading>

                </Box>
            )}
        </Box >
    );

};

export default Dashboard;
