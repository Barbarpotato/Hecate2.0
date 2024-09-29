"use client"
import styles from "../styles/page.module.css";
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';
import { Fragment } from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
import { primaryFontColor, secondaryColor } from './theme/globalTheme';
import CustomAccordion from '@/components/accordion';

const AccordionItem = [
  {
    id: "typewriterList",
    title: "/api/typewriter",
    content: "Showing List of Typewriter To be shown in the Hero Landing Page. This Endpoint Can be access via GET, POST & DELETE Method Only."
  },
  {
    id: "aboutme",
    title: "/api/aboutme",
    content: "Showing Aboutme content. This Endpoint Can be access via GET & UPDATE Method Only."
  },
  {
    id: "project",
    title: "/api/project",
    content: "Showing List of Project Content. This Endpoint Can be access via GET, POST , PUT & DELETE Method."
  }
]

export default function Home() {

  const { width } = useWindowSize();
  return (
    <main className={styles.main}>

      {width <= 768 && (
        <Fragment>
          <Box w={"100"}>
            <Player
              src='/Moon.json'
              className="player"
              loop
              autoplay
            />
          </Box>
          <Box textAlign={"center"} paddingX={4}>
            <Heading style={{ fontSize: width >= 500 ? '4rem' : '2rem' }} py={2} color={secondaryColor}>Welcome To <span className='ternaryColor' style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Hecate</span></Heading>
            <Text style={{ fontSize: width >= 500 ? '2rem' : '1.5rem' }} color={primaryFontColor}>
              A Fullstack Application Used For Managing My Personal Portofolio Website Content.
            </Text>
            <Button onClick={() => window.open('https://barbarpotato.github.io/', '_blank')} size={width >= 500 ? 'lg' : 'sm'} my={3} mx={2} fontWeight={'bold'} colorScheme='purple' color={'black'}>Visit My Portofolio Website</Button>
          </Box>

          <Box marginTop={10} textAlign={"center"} paddingX={4}>
            <Heading opacity={0.8} color={primaryFontColor}><span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{"<"}
            </span>Current API List<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
            </Heading>

            <CustomAccordion items={AccordionItem} parentStyle={{ margin: "40px" }} />
          </Box>
        </Fragment>
      )}

      {width > 768 && (
        <Fragment>
          <Flex style={{ position: 'relative', height: '100vh' }} alignItems={"center"}>
            <Box width={"40%"}>
              <Player
                src='/Moon.json'
                className="player"
                loop
                autoplay
              />
            </Box>
            <Box>
              <Heading style={{ fontSize: width >= 500 ? '4rem' : '2rem' }} py={2} color={secondaryColor}>Welcome To <span className='ternaryColor' style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Hecate</span></Heading>
              <Text style={{ fontSize: width >= 500 ? '2rem' : '1.5rem' }} width={"90%"} color={primaryFontColor}>
                A Fullstack Application Used For Managing My Personal Portofolio Website Content.
              </Text>
              <Button onClick={() => window.open('https://barbarpotato.github.io/', '_blank')} size={width >= 500 ? 'lg' : 'sm'} my={3} mx={2} fontWeight={'bold'} colorScheme='purple' color={'black'}>Visit My Portofolio Website</Button>
            </Box>
          </Flex>

          <Box style={{ marginTop: "100px" }} textAlign={"center"} paddingX={4}>
            <Heading opacity={0.8} color={primaryFontColor}><span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{"<"}
            </span>Current API List<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
            </Heading>
            <CustomAccordion items={AccordionItem} parentStyle={{ margin: "40px" }} />
          </Box>
        </Fragment>
      )}
    </main >
  );
}
