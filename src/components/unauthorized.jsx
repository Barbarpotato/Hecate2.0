"use-client"
import { Player } from '@lottiefiles/react-lottie-player';
import { Box, Heading } from '@chakra-ui/react';
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import React, { Fragment } from 'react'
import { secondaryColor, ternaryColor } from '@/app/theme';

function Unauthorized() {

    const { width } = useWindowSize();


    return (
        <Fragment>
            <Box
                style={{
                    position: 'relative',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                textAlign={"center"}
                m={"auto"}
                height={width >= 768 ? "30%" : "30%"}
                width={width >= 768 ? "30%" : "90vw"}
            >
                <Player
                    src='/lost.json'
                    className="player"
                    loop
                    autoplay
                />
                <Heading style={{ color: secondaryColor }}>Oops. You need to
                    <span style={{ backgroundColor: ternaryColor, color: "black", padding: "3px", borderRadius: "10px", marginInline: "5px", fontWeight: "bold" }}><Link href="/login">Login</Link></span>
                    Boss!</Heading>
            </Box>
        </Fragment>

    )
}

export default Unauthorized