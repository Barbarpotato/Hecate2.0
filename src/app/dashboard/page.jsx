"use client";
import { useSession } from "next-auth/react";
import useWindowSize from "@/hooks/useWindowSize";
import { primaryFontColor, secondaryColor } from "../theme/globalTheme";
import Unauthorized from "@/components/unauthorized";
import { Box, Heading, useDisclosure } from "@chakra-ui/react";
import BasicAuthModal from "@/components/basic-auth-modal";
import { Fragment, useState } from "react";
import Typewriter from "@/components/typewriter";
import Loading from "@/components/loading";
import Aboutme from "@/components/aboutme";
import Project from "@/components/project";
import ProjectDetail from "@/components/project-detail";

const Dashboard = () => {

    const { width } = useWindowSize();

    const { data: session, status } = useSession();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // ** modal functionality
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                    <BasicAuthModal onOpen={onOpen} isOpen={isOpen} onClose={onClose}
                        username={username} password={password}
                        setUsername={setUsername} setPassword={setPassword} />
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

                    <Typewriter onOpenModalAuth={onOpen} />

                    <Aboutme onOpenModalAuth={onOpen} />

                    <Project onOpenModalAuth={onOpen} />

                    <ProjectDetail onOpenModalAuth={onOpen} />

                </Fragment>
            )}
        </Box >
    );

};

export default Dashboard;
