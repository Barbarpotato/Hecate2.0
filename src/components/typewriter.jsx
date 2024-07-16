"use client"
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';
import { primaryFontColor } from '@/app/theme';
import { Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Box, UnorderedList, ListItem } from '@chakra-ui/react';
import React, { Fragment } from 'react'
import Loading from './loading';

const GET_TYPERWRITER_DATA = gql`
    query Typewriter {
        typewriters {
            title,
            id
        }
    }`;

function Typewriter() {

    const { loading, error, data } = useQuery(GET_TYPERWRITER_DATA);

    const { width } = useWindowSize();

    if (loading) return <Loading />;
    if (error) return <p>Error : {error}</p>;

    return (
        <Fragment>
            {
                width <= 768 && (
                    <Box paddingX={4}>
                        <Heading textAlign={"center"} marginY={"30px"} opacity={0.8} color={primaryFontColor}><span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{"<"}
                        </span>Typewriter Content<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
                        </Heading>
                        <Image
                            src="/typewriter.png"
                            alt="My Image"
                            width={500}
                            height={300}
                        />
                        <Tabs mt={4} variant='soft-rounded' colorScheme='purple'>
                            <TabList>
                                <Tab>Current Data</Tab>
                                <Tab>Edit Data</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <UnorderedList>
                                        {data.typewriters.map((typewriter) => (
                                            <ListItem key={typewriter.id}>{typewriter.title}</ListItem>
                                        ))}
                                    </UnorderedList>
                                </TabPanel>
                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                )
            }
        </Fragment>
    )
}

export default Typewriter