"use client"
import { primaryFontColor, ternaryColor } from '@/app/theme/globalTheme'
import useWindowSize from '@/hooks/useWindowSize'
import { Heading, Tabs, Tab, TabList, TabPanels, TabPanel, Textarea, Box, Button, useToast, UnorderedList, ListItem, Text, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { gql, useQuery } from '@apollo/client';
import { Fragment, useState } from 'react'
import Loading from './loading'


const GET_ABOUTME_DATA = gql`
    query Aboutme {
        aboutme {
            id,
            content
        }
    }`;


function Aboutme({ onOpenModalAuth }) {

    const { loading, error, data, refetch } = useQuery(GET_ABOUTME_DATA);

    const { width } = useWindowSize()

    const [content, setContent] = useState("")

    const [isLoading, setIsLoading] = useState(false)

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
        setContent("");
        refetch();
        setIsLoading(false);
    }

    const handleUpdateData = async (id) => {
        try {
            console.log(content)
            setIsLoading(true);

            const [username, password] = handleAuthInfo();

            const encodedCredentials = btoa(`${username}:${password}`);

            const response = await fetch(`/api/aboutme/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`,
                },
                body: JSON.stringify({ content }),
            });
            if (!response.ok) {
                cleanStateOperation('Failed to Update data.', 'error');
                return;
            }
            cleanStateOperation('200: Successfully Update data.', 'success');
        } catch (error) {
            console.error(error.message);
            cleanStateOperation('Failed to Update data.', 'error');
        }
    }

    if (loading) return <Loading />;
    if (error) return <p>Error : {error}</p>;

    return (
        <Fragment>
            {/* // ** MOBILE SCREEN SIZE  */}
            {width <= 1024 && (
                <Fragment>
                    <Box paddingX={4}>
                        <Heading textAlign={"center"} marginTop={"90px"} marginBottom={"30px"} opacity={0.8} color={primaryFontColor}><span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{"<"}
                        </span>About me<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
                        </Heading>
                        <Image
                            src="/aboutme.png"
                            alt="Picture of the author"
                            width={width / 1.02}
                            height={300}
                        />
                        <Tabs boxShadow={"2xl"} mt={4} variant='soft-rounded' colorScheme='purple'>
                            <TabList>
                                <Tab>Current Data</Tab>
                                <Tab>Update Data</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <UnorderedList>
                                        <ListItem>
                                            <pre style={{
                                                whiteSpace: "pre-wrap", textAlign: "justify",
                                                fontFamily: "sans-serif", fontSize: "16px"
                                            }} textAlign={"justify"}>
                                                {data.aboutme[0].content}
                                            </pre>
                                        </ListItem>
                                    </UnorderedList>
                                </TabPanel>
                                <TabPanel>
                                    <Textarea
                                        rows={6}
                                        value={content} onChange={(e) => setContent(e.target.value)}
                                        placeholder="Typewriter Title"
                                        borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                        colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                        type="text">
                                    </Textarea>
                                    <Button onClick={() => handleAuthAction(() => handleUpdateData(data.aboutme[0].id))} isLoading={isLoading} my={3}
                                        fontWeight={'bold'} colorScheme='purple' color={'black'}>Update</Button>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Fragment>
            )}

            {/* // ** DESKTOP TO TABLET SCREEN SIZE  */}
            {width > 1024 && (
                <Fragment>
                    <Heading textAlign={"center"} marginTop={"120px"} marginBottom={"30px"} opacity={0.8} color={primaryFontColor}><span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{"<"}
                    </span>About me<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
                    </Heading>
                    <Flex justifyContent={"center"}>
                        <Tabs boxShadow={"2xl"} width={'50%'} mt={4} variant='soft-rounded' colorScheme='purple'>
                            <TabList>
                                <Tab>Current Data</Tab>
                                <Tab>Update Data</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <UnorderedList>
                                        <ListItem>
                                            <pre style={{ whiteSpace: "pre-wrap", textAlign: "justify", fontFamily: "sans-serif", fontSize: "15px" }} textAlign={"justify"}>
                                                {data.aboutme[0].content}
                                            </pre>
                                        </ListItem>
                                    </UnorderedList>
                                </TabPanel>
                                <TabPanel>
                                    <Textarea
                                        rows={6}
                                        value={content} onChange={(e) => setContent(e.target.value)}
                                        placeholder="Typewriter Title"
                                        borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                        colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                        type="text">
                                    </Textarea>
                                    <Button onClick={() => handleAuthAction(() => handleUpdateData(data.aboutme[0].id))} isLoading={isLoading} my={3}
                                        fontWeight={'bold'} colorScheme='purple' color={'black'}>Update</Button>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        <Image
                            src="/aboutme.png"
                            alt="Picture of the author"
                            width={700}
                            height={500}
                        />
                    </Flex>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Aboutme