"use client";
import { useSession } from "next-auth/react";
import useWindowSize from "@/hooks/useWindowSize";
import { primaryFontColor, secondaryColor } from "../theme";
import Unauthorized from "@/components/unauthorized";
import { Box, Heading } from "@chakra-ui/react";
import { Fragment } from "react";
import Typewriter from "@/components/typewriter";
import Loading from "@/components/loading";

const Dashboard = () => {

    const { width } = useWindowSize();

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Loading />;
    }

    if (!session) {
        return <Unauthorized />
    }

    // Check if session is expired (optional - usually handled by NextAuth)
    const isSessionExpired = session?.expires && new Date(session.expires) < new Date();

    return (
        <Box>
            {status === "unauthenticated" || isSessionExpired ? (
                <Unauthorized />
            ) : (
                <Fragment>
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
                            Manage Your Portofolio Content With <span className="ternaryColor" style={{ fontWeight: 'bold' }}>Dynamic!</span>
                        </Heading>
                    </Box>

                    <Typewriter />

                </Fragment>
            )}
        </Box >
    );

};

export default Dashboard;
