"use client";
import { Box, Button, Center, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ternaryColor } from "../theme";

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [alert, setAlert] = useState({
        status: "",
        message: "",
    });

    const onChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn("credentials", loginData);
            setAlert({ status: "success", message: "Login successfully" });
            setLoginData({ email: "", password: "" });
        } catch (error) {
            console.log({ error });
            setAlert({ status: "error", message: "Something went wrong" });
        }
    };

    return (
        <Flex height={'90vh'} alignItems="center" justifyContent="center">
            {alert.message &&
                <div style={{
                    color: alert.status === 'success' ? 'green' : 'red',
                    fontWeight: 'bold'
                }}>
                    {alert.status === 'success' ? '✅' : '❌'} {alert.message}
                </div>
            }
            <Box width={'50%'} className='lighting-effect-pink' borderRadius={'2xl'} p={5}>
                <form onSubmit={onSubmit}>
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
                    <Button my={3} mx={2} fontWeight={'bold'} colorScheme='purple' color={'black'} type="submit">Login</Button>
                </form>
            </Box>
        </Flex >
    );
};

export default LoginPage;