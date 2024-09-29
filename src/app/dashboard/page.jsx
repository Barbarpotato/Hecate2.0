"use client";
import useWindowSize from "@/hooks/useWindowSize";
import { primaryFontColor, secondaryColor } from "../theme/globalTheme";
import { Box, Heading } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import Typewriter from "@/components/typewriter";
import Aboutme from "@/components/aboutme";
import Project from "@/components/project";
import ProjectDetail from "@/components/project-detail";
import Loading from "@/components/loading";

const Dashboard = () => {

    const { width } = useWindowSize();

    const [isSessionExpired, setIsSessionExpired] = useState(true);

    // ** Check if session is expired (optional - usually handled by NextAuth)
    useEffect(() => {
        const checkAuth = async () => {

            const token = localStorage.getItem('token');

            if (!token) {
                window.location.href = '/login';
                return;
            }

            try {
                const response = await fetch('https://coretify.vercel.app/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });

                // ** force logout if token is invalid
                if (!response.ok) {
                    // Optionally redirect to login if the token is invalid
                    window.location.href = '/login';
                    localStorage.removeItem('token');
                    return;
                }

                const data = await response.json();
                if (data?.message === "Token is valid") {
                    setIsSessionExpired(false);
                    return;
                }

            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };
        checkAuth();
    }, []);

    return (
        <Box>
            {isSessionExpired ? (
                <Loading />
            ) : (
                <Fragment>
                    <Box textAlign="center" paddingX={4}>
                        <Heading
                            fontSize={width >= 500 ? '4rem' : '2rem'}
                            pb={2}
                            pt={12}
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

                    <Typewriter />
                    <Aboutme />
                    <Project />
                    <ProjectDetail />
                </Fragment>
            )}
        </Box>
    );
};

export default Dashboard;
