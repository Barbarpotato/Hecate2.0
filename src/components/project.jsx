"use client"
import useWindowSize from '@/hooks/useWindowSize';
import { gql, useQuery } from '@apollo/client';
import { primaryFontColor, ternaryColor } from '@/app/theme/globalTheme';
import {
    Heading, Tabs, TabList, TabPanels, Tab, TabPanel, useToast,
    Box, ListItem, Text, Input, Button, OrderedList, Flex,
    TableContainer,
    Table,
    Thead,
    Th,
    Tbody,
    Td,
    Tr
} from '@chakra-ui/react';
import Image from 'next/image';
import { Fragment, useState } from 'react'
import Loading from './loading';

const GET_PROJECT_DATA = gql`
    query Project {
        projects {
            id,
            heading,
            text
        }
    }`;


function Project({ onOpenModalAuth }) {

    const { loading, error, data, refetch } = useQuery(GET_PROJECT_DATA);

    const { width } = useWindowSize();

    const [isLoading, setIsLoading] = useState(false)

    // ** toast for notified the status of transaction data
    const toast = useToast();

    // ** the input state variabel
    const [heading, setHeading] = useState("");
    const [text, setText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [skillsUrl, setSkillsUrl] = useState("");

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
        setHeading("");
        setText("");
        setImageUrl("");
        setSkillsUrl("");
        setIsLoading(false);
        refetch();
    }

    if (loading) return <Loading />;
    if (error) return <p>Error : {error}</p>;

    const handlePostData = async () => {
        try {
            setIsLoading(true);

            const [username, password] = handleAuthInfo();

            const encodedCredentials = btoa(`${username}:${password}`);

            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`
                },
                body: JSON.stringify({ heading, text, imageUrl, skillsUrl })
            });
            if (!response.ok) {
                cleanStateOperation('Failed to Add data.', 'error');
                return;
            }
            cleanStateOperation('200: Successfully Add data.', 'success');
        } catch (error) {
            console.error(error.message);
            cleanStateOperation('Failed to Add data.', 'error');
        }
    }

    const handleDeleteData = async (id) => {
        try {
            setIsLoading(true);

            const [username, password] = handleAuthInfo();

            const encodedCredentials = btoa(`${username}:${password}`);

            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                },
            });
            if (!response.ok) {
                cleanStateOperation('Failed to delete data.', 'error');
            }
            cleanStateOperation('200: Successfully Delete data.', 'success');
        } catch (error) {
            console.error(error.message);
            cleanStateOperation('Failed to delete data.', 'error');
        }
    }

    return (
        <Fragment>
            {/* // ** MOBILE SCREEN SIZE */}
            {
                width <= 1024 && (
                    <Box paddingX={4}>
                        <Heading textAlign={"center"} marginTop={"90px"} marginBottom={"30px"} opacity={0.8} color={primaryFontColor}><span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{"<"}
                        </span>Projects Content<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
                        </Heading>
                        <Image
                            src="/projects.png"
                            alt="Projects Content"
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
                                    {data.projects.length === 0 && <Text>No data found</Text>}
                                    <TableContainer>
                                        <Table>
                                            <Thead>
                                                <Th>ID #</Th>
                                                <Th>Heading</Th>
                                                <Th>Text</Th>
                                                <Th>Action</Th>
                                            </Thead>
                                            <Tbody>
                                                {data.projects.map((object, index) => (
                                                    <Tr key={object.id}>
                                                        <Td>
                                                            <Text>{object.id}</Text>
                                                        </Td>
                                                        <Td paddingY={2} >
                                                            <Text>{object.heading}</Text>
                                                        </Td>
                                                        <Td>
                                                            <Text>{object.text}</Text>
                                                        </Td>
                                                        <Td>
                                                            <Button onClick={() => handleAuthAction(() => handleDeleteData(object.id))}
                                                                isLoading={isLoading}
                                                                ml={2} variant={'outline'} colorScheme={'red'} size={'sm'}>
                                                                Delete
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                                <TabPanel>
                                    <Input
                                        value={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                        placeholder="Heading..."
                                        borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                        colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                        type="text"
                                    />
                                    <Input
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Text..."
                                        borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                        colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                        type="text"
                                    />
                                    <Input
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="Image Url..."
                                        borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                        colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                        type="text"
                                    />
                                    <Input
                                        value={skillsUrl}
                                        onChange={(e) => setSkillsUrl(e.target.value)}
                                        placeholder="Skills Url..."
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
                    </span>Projects Content<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
                    </Heading>
                    <Flex justifyContent={'center'}>
                        <Image
                            src="/projects.png"
                            alt="Projects"
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
                                    {data.projects.length === 0 && <Text>No data found</Text>}
                                    <TableContainer>
                                        <Table>
                                            <Thead>
                                                <Th>ID #</Th>
                                                <Th>Heading</Th>
                                                <Th>Text</Th>
                                                <Th>Action</Th>
                                            </Thead>
                                            <Tbody>
                                                {data.projects.map((object, index) => (
                                                    <Tr key={object.id}>
                                                        <Td>
                                                            <Text>{object.id}</Text>
                                                        </Td>
                                                        <Td paddingY={2} >
                                                            <Text>{object.heading}</Text>
                                                        </Td>
                                                        <Td>
                                                            <Text>{object.text}</Text>
                                                        </Td>
                                                        <Td>
                                                            <Button onClick={() => handleAuthAction(() => handleDeleteData(object.id))}
                                                                isLoading={isLoading}
                                                                ml={2} variant={'outline'} colorScheme={'red'} size={'sm'}>
                                                                Delete
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                                <TabPanel>
                                    <Input
                                        value={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                        placeholder="Heading..."
                                        borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                        colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                        type="text"
                                    />
                                    <Input
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Text..."
                                        borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                        colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                        type="text"
                                    />
                                    <Input
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="Image Url..."
                                        borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                        colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                        type="text"
                                    />
                                    <Input
                                        value={skillsUrl}
                                        onChange={(e) => setSkillsUrl(e.target.value)}
                                        placeholder="Skills Url..."
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
        </Fragment>
    )
}

export default Project