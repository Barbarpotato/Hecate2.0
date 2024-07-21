"use client"
import {
    Heading, Tabs, TabList, TabPanels, Tab, TabPanel, useToast,
    Box, ListItem, Text, Input, Button, OrderedList, Flex
} from '@chakra-ui/react';
import { primaryFontColor, ternaryColor } from '@/app/theme/globalTheme';
import useWindowSize from '@/hooks/useWindowSize';
import { gql, useQuery } from '@apollo/client';
import { Fragment, useState } from 'react'
import Image from 'next/image';
import Loading from './loading';

const GET_TYPERWRITER_DATA = gql`
    query Typewriter {
        typewriters {
            title,
            id
        }
    }`;

function Typewriter({ onOpenModalAuth }) {

    // ** graphql fetch stuff
    const { loading, error, data, refetch } = useQuery(GET_TYPERWRITER_DATA);

    // ** input state
    const [typeWriterTitle, setTypeWriterTitle] = useState("");

    // ** loading state stuff
    const [isLoading, setisLoading] = useState(false);

    // ** width management for responsive
    const { width } = useWindowSize();

    // ** toast for notified the status of transaction data
    const toast = useToast();

    const handleAuthInfo = () => {
        if (sessionStorage.getItem("basic_auth")) {
            const authInfo = JSON.parse(sessionStorage.getItem("basic_auth"));
            if (authInfo.is_valid == true && authInfo.username && authInfo.password) {
                return [authInfo.username, authInfo.password, authInfo.is_valid];
            } else return ['', '', false];
        } else return ['', '', false];
    }

    const handleAuthAction = (func) => {
        if (sessionStorage.getItem('basic_auth')) {
            const authInfo = JSON.parse(sessionStorage.getItem('basic_auth'));
            if (authInfo.is_valid == true) func();
            else onOpenModalAuth();
        } else onOpenModalAuth()
    }


    const cleanStateOperation = (toastMessage, toastStatus) => {
        const prevAuthInfo = JSON.parse(sessionStorage.getItem('basic_auth'));
        if (toastStatus === "success") {
            sessionStorage.setItem('basic_auth', JSON.stringify({ ...prevAuthInfo, is_valid: true }));
        } else if (toastStatus === "error") {
            sessionStorage.setItem('basic_auth', JSON.stringify({ ...prevAuthInfo, is_valid: false }));
        }
        toast({
            title: toastMessage,
            status: toastStatus,
            duration: 3000,
            isClosable: true,
        })
        setTypeWriterTitle('');
        refetch();
        setisLoading(false);
    }

    const handlePostData = async () => {
        try {
            setisLoading(true);

            const [username, password] = handleAuthInfo();

            const encodedCredentials = btoa(`${username}:${password}`);

            if (typeWriterTitle === '') {
                cleanStateOperation('Title cannot be empty.', 'error');
                return;
            }

            const response = await fetch('/api/typewriter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`,
                },
                body: JSON.stringify({ title: typeWriterTitle }),
            });

            if (response.ok) {
                cleanStateOperation('201: Successfully created data.', 'success');
                return;
            }
            else cleanStateOperation('Failed to create data.', 'error');

        } catch (error) {
            console.error(error);
            cleanStateOperation('500: Failed to create data.', 'error');
        }
    };

    const handleDeleteData = async (id) => {
        try {
            setisLoading(true);

            const [username, password] = handleAuthInfo();

            const encodedCredentials = btoa(`${username}:${password}`);

            const response = await fetch(`/api/typewriter/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                },
            });
            if (!response.ok) {
                cleanStateOperation('Failed to delete data.', 'error');
            }
            cleanStateOperation('200: Successfully deleted data.', 'success');
        } catch (error) {
            console.error(error.message);
            cleanStateOperation('Failed to delete data.', 'error');
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>Error : {error}</p>;

    return (
        <Fragment>
            {/* // ** MOBILE SCREEN SIZE */}
            {
                width <= 1024 && (
                    <Box paddingX={4}>
                        <Heading textAlign={"center"} marginTop={"90px"} marginBottom={"30px"} opacity={0.8} color={primaryFontColor}><span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{"<"}
                        </span>Typewriter<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
                        </Heading>
                        <Image
                            src="/typewriter.png"
                            alt="Typewriter Content"
                            width={width / 1.02}
                            height={300}
                        />
                        <Tabs boxShadow={"2xl"} mt={4} variant='soft-rounded' colorScheme='purple'>
                            <TabList>
                                <Tab>Current Data</Tab>
                                <Tab>Add Data</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {data.typewriters.length === 0 && <Text>No data found</Text>}
                                    <OrderedList>
                                        {data.typewriters.map((typewriter) => (
                                            <ListItem paddingY={2} key={typewriter.id}>{typewriter.title}
                                                <Button onClick={() => handleAuthAction(() => handleDeleteData(typewriter.id))}
                                                    isLoading={isLoading}
                                                    variant={'outline'} colorScheme={'red'} size={'sm'}>
                                                    Delete
                                                </Button>
                                            </ListItem>
                                        ))}
                                    </OrderedList>
                                </TabPanel>
                                <TabPanel>
                                    <Input
                                        value={typeWriterTitle}
                                        onChange={(e) => setTypeWriterTitle(e.target.value)}
                                        placeholder="Typewriter Title"
                                        borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                        colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                        type="text"
                                    />
                                    <Button onClick={() => handleAuthAction(() => handlePostData())} isLoading={isLoading} my={3} fontWeight={'bold'} colorScheme='purple' color={'black'}>Add +</Button>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                )}

            {/* // ** DESKTOP TO TABLET SCREEN SIZE  */}
            {width > 1024 && (
                <Fragment>
                    <Heading textAlign={"center"} marginTop={"90px"} marginBottom={"30px"} opacity={0.8} color={primaryFontColor}><span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{"<"}
                    </span>Typewriter Content<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
                    </Heading>
                    <Flex justifyContent={'center'}>
                        <Image
                            src="/typewriter.png"
                            alt="My Image"
                            width={700}
                            height={500}
                        />
                        <Tabs boxShadow={"2xl"} width={'50%'} mt={4} variant='soft-rounded' colorScheme='purple'>
                            <TabList>
                                <Tab>Current Data</Tab>
                                <Tab>Add Data</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {data.typewriters.length === 0 && <Text>No data found</Text>}
                                    <OrderedList>
                                        {data.typewriters.map((typewriter) => (
                                            <ListItem paddingY={2} key={typewriter.id}>{typewriter.title}
                                                <Button onClick={() => handleAuthAction(() => handleDeleteData(typewriter.id))}
                                                    isLoading={isLoading}
                                                    ml={2} variant={'outline'} colorScheme={'red'} size={'sm'}>
                                                    Delete
                                                </Button>
                                            </ListItem>
                                        ))}
                                    </OrderedList>
                                </TabPanel>
                                <TabPanel>
                                    <Input
                                        value={typeWriterTitle}
                                        onChange={(e) => setTypeWriterTitle(e.target.value)}
                                        placeholder="Typewriter Title"
                                        borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                        colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                        type="text"
                                    />
                                    <Button onClick={() => handleAuthAction(() => handlePostData())} isLoading={isLoading} my={3} fontWeight={'bold'} colorScheme='purple' color={'black'}>Add +</Button>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Fragment>
            )
            }

        </Fragment >
    )
}

export default Typewriter