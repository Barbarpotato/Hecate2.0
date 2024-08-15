import {
    Box, Button, Heading, Step, StepDescription, Textarea,
    StepIcon, StepIndicator, StepNumber, StepSeparator,
    StepStatus, StepTitle, Stepper, useSteps,
    Input, useToast,
    Flex,
    Spacer
} from '@chakra-ui/react';
import { ternaryColor } from '@/app/theme/globalTheme';
import { Fragment, useState } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import Loading from './loading';

const steps = [
    { title: 'Project ID', description: 'Insert Yor Project Id' },
    { title: 'HTML Content', description: 'Describe Your Project' },
    { title: 'Project Image', description: 'Upload Your Project Image using Link' },
]

function ProjectDetail({ onOpenModalAuth }) {

    const { width } = useWindowSize()

    const [isLoading, setIsLoading] = useState(false)

    // ** toast for notified the status of transaction data
    const toast = useToast();

    const [projectID, setProjectID] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [imageContent, setImageContent] = useState('');

    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

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
        setProjectID('');
        setHtmlContent('');
        setImageContent('');
        setIsLoading(false);
        setActiveStep(1);
    }

    const handleUpdateProjectDetailData = async () => {
        try {
            setIsLoading(true);

            const [username, password] = handleAuthInfo();

            const encodedCredentials = btoa(`${username}:${password}`);

            const response = await fetch(`/api/projects/${projectID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${encodedCredentials}`,
                },
                body: JSON.stringify({ htmlContent: htmlContent, htmlImage: imageContent }),
            })

            if (!response.ok) {
                cleanStateOperation('Failed to Add data.', 'error');
                return;
            }

            cleanStateOperation('200: Successfully Add data.', 'success');
        } catch (error) {
            console.error(error.message)
            cleanStateOperation('Failed to Add data.', 'error');
            return;
        }
    }

    if (isLoading) return <Loading />

    return (
        <Box paddingX={width >= 720 ? 40 : 2}>
            <Heading
                textAlign={"center"}
                marginTop={"90px"}
                marginBottom={"30px"}
                opacity={0.8}
                color={"primaryFontColor"}
            >
                <span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{"<"}</span>
                Projects Detail
                <span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
            </Heading>

            <Box boxShadow={"2xl"} borderRadius={"2xl"} padding={5}>
                {width > 720 ? (
                    <Stepper my={10} colorScheme={"purple"} index={activeStep}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink='0'>
                                    <StepTitle>{step.title}</StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                </Box>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                ) :
                    (
                        <Heading opacity={0.7} size={'md'}>
                            Update Your Project Detail:
                        </Heading>
                    )}

                {
                    activeStep == 1 && (
                        <Box>
                            <Input
                                type="number"
                                value={projectID} onChange={(e) => setProjectID(e.target.value)}
                                placeholder="Your Project ID..."
                                borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                            />
                        </Box>
                    )
                }

                {
                    activeStep == 2 && (
                        <Box>
                            <Textarea
                                rows={6}
                                value={htmlContent} onChange={(e) => setHtmlContent(e.target.value)}
                                placeholder="Your Project Description..."
                                borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                type="text" />
                        </Box>
                    )
                }

                {
                    activeStep == 3 && (
                        <Box>
                            <Textarea
                                rows={6}
                                value={imageContent} onChange={(e) => setImageContent(e.target.value)}
                                placeholder="Example: <img src='your image url here' />"
                                borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                                colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                                type="text" />
                        </Box>
                    )
                }

                <Flex width={"100%"}>
                    {activeStep > 1 && (
                        <Fragment>
                            <Button
                                isLoading={isLoading}
                                size={'sm'} mt={3} mr={2} colorScheme={'purple'} onClick={() => setActiveStep((index) => index - 1)}>⬅️ Previous Step</Button>
                            <Spacer />
                        </Fragment>
                    )}
                    {activeStep < 3 && (
                        <Fragment>
                            <Spacer />
                            <Button
                                isLoading={isLoading}
                                size={'sm'} mt={3} colorScheme={'purple'} onClick={() => setActiveStep((index) => index + 1)}>Next Step ➡️</Button>
                        </Fragment>
                    )}

                    {activeStep == 3 && (
                        <Button size={'sm'}
                            isLoading={isLoading}
                            mt={3} colorScheme={'green'}
                            onClick={() => handleAuthAction(() => handleUpdateProjectDetailData())}>Update Project Detail</Button>
                    )}
                </Flex>
            </Box>

        </Box>
    );
}

export default ProjectDetail;
