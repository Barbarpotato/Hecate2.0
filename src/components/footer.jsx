"use client"
import { Flex, Heading, Box, Spacer, Divider, Text, Center } from '@chakra-ui/react'
import { useState, useEffect, Fragment } from 'react'
import { primaryFontColor, secondaryColor } from '@/app/theme/globalTheme';
import useWindowSize from '@/hooks/useWindowSize';

function Footer() {

    const { width } = useWindowSize();

    const [year, setYear] = useState();

    useEffect(() => {
        const currentDate = new Date();
        setYear(currentDate.getFullYear());
    }, [])

    return (
        <Fragment>
            {/* // ** DESKTOP AND TABLET SCREEN SIZE  */}
            {width >= 768 && (
                <Fragment>
                    <Flex alignItems={'center'} pt={100} mx={10}>
                        <Box>
                            <Heading py={2} color={secondaryColor}><span className='ternaryColor' style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Hecate</span></Heading>
                        </Box>
                        <Spacer />
                    </Flex>
                    <Box mx={10} my={10}>
                        <Divider colorScheme='purple' backgroundColor={'#bd93f9'} height={'2px'} orientation='horizontal' />
                    </Box>
                    <Flex pb={10} mx={10}>
                        <Text fontSize={'sm'} color={primaryFontColor}>© 2023 - {year} All Rights Reserved</Text>
                        <Spacer />
                    </Flex>
                </Fragment>
            )
            }

            {/* // ** MOBILE SCREEN SIZE  */}
            {
                width < 768 && (
                    <Fragment>
                        <Box mx={10} my={5}>
                            <Divider colorScheme='purple' backgroundColor={'#bd93f9'} height={'2px'} orientation='horizontal' />
                        </Box>
                        <Spacer />
                        <Text py={5} textAlign={'center'} fontSize={'sm'} color={primaryFontColor}>© 2023 - {year} All Rights Reserved</Text>
                    </Fragment>
                )
            }
        </Fragment >
    )
}

export default Footer