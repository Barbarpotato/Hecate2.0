"use client";
import { Box, Button, Flex, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { Fragment, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { ternaryColor } from "../theme/globalTheme";

const LoginPage = () => {

    const toast = useToast()

    const width = useWindowSize();

    const [isLoading, setIsLoading] = useState(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const result = await signIn("credentials", {
                ...loginData,
                redirect: false,
            });

            if (result?.error) {
                toast({
                    title: "Error logging in",
                    description: result.error,
                    status: "error",
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Success logging in!",
                    status: "success",
                    isClosable: false,
                });
                setLoginData({ email: "", password: "" });
                window.location.href = "/dashboard";
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            toast({
                title: `${error}`,
                status: 'error',
                isClosable: false,
            })
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <Flex height={'90vh'} alignItems="center" justifyContent="center">
                <Box width={width >= 768 ? "50%" : '70%'} className='lighting-effect-pink' borderRadius={'2xl'} p={5}>
                    <Heading textAlign={'center'} my={2} fontSize={'2xl'}>Login Page</Heading>
                    <Box mx={2}>
                        <Text>Email</Text>
                        <Input
                            placeholder="Email"
                            borderRadius={'2xl'} my={5} size={'lg'} borderWidth={3}
                            colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                            onChange={onChange}
                            value={loginData.email}
                            type="email"
                            name="email"
                            required
                        />
                    </Box>

                    <Box mx={2}>
                        <Text>Password</Text>
                        <Input
                            placeholder="Password"
                            borderRadius={'2xl'} my={5} size={'lg'} borderWidth={3}
                            colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                            onChange={onChange}
                            value={loginData.password}
                            type="password"
                            name="password"
                            required
                        />
                    </Box>
                    <Button onClick={onSubmit} isLoading={isLoading} my={3} mx={2} fontWeight={'bold'} colorScheme='purple' color={'black'}>Login</Button>
                </Box>
            </Flex >
        </Fragment >
    );
};

export default LoginPage;