"use client"
import { Player } from '@lottiefiles/react-lottie-player';
import styles from "../styles/page.module.css";
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';
import { Fragment } from 'react';
import { primaryFontColor, secondaryColor } from './theme';
import CustomAccordion from '@/components/accordion';

const AccordionItem = [
  {
    id: "typewriterList",
    title: "/api/typewriter",
    content: "Showing List of Typewriter To be shown in the Hero Landing Page. This Endpoint Can be access via GET, POST & DELETE Method Only."
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
            </span>Supported By<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
            </Heading>
            <Flex justifyContent={'center'} marginTop={10}>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60" /><g clipPath="url(#clip0_7_147)"><path fill="#fff" fillRule="evenodd" d="M203.801 178.21C194.011 177.938 186.416 178.941 180.051 181.619C178.218 182.355 175.277 182.355 175.035 184.662C176.015 185.63 176.133 187.214 176.992 188.556C178.459 190.991 181.033 194.271 183.357 195.973L191.191 201.571C195.965 204.488 201.351 206.193 206.002 209.113C208.696 210.817 211.388 213.007 214.082 214.834C215.454 215.807 216.285 217.392 218 217.997V217.629C217.144 216.538 216.897 214.957 216.044 213.735L212.367 210.209C208.82 205.465 204.41 201.325 199.636 197.922C195.718 195.245 187.152 191.596 185.56 187.097L185.319 186.824C188.008 186.552 191.191 185.605 193.764 184.875C197.929 183.784 201.721 184.024 206.002 182.93L211.882 181.226V180.135C209.678 177.946 208.087 175.025 205.763 172.959C199.521 167.606 192.661 162.373 185.56 157.994C181.766 155.562 176.868 153.977 172.829 151.913C171.356 151.182 168.911 150.817 168.055 149.601C165.846 146.929 164.625 143.397 163.034 140.232L152.997 119.064C150.794 114.319 149.444 109.574 146.755 105.195C134.144 84.5124 120.431 71.9828 99.375 59.6932C94.8477 57.1382 89.4616 56.0393 83.7353 54.7032L74.5546 54.2124C72.5928 53.3616 70.6364 51.0493 68.9216 49.9531C61.9441 45.5739 43.9475 36.0847 38.8029 48.5897C35.4966 56.4974 43.7006 64.2824 46.4855 68.299C48.5708 71.0966 51.2597 74.2597 52.7332 77.4228C53.5563 79.4897 53.8307 81.682 54.6895 83.8717C56.6458 89.2243 58.4842 95.1878 61.0551 100.178C62.427 102.733 63.8675 105.413 65.5824 107.723C66.5619 109.086 68.2768 109.67 68.6417 111.859C66.9268 114.294 66.8089 117.94 65.8293 120.986C61.42 134.734 63.1349 151.766 69.377 161.888C71.3389 164.928 75.9622 171.622 82.2345 169.065C87.744 166.875 86.5148 159.941 88.1062 153.857C88.4766 152.399 88.2297 151.425 88.9623 150.449V150.722L93.9834 160.819C97.7781 166.78 104.391 172.986 109.897 177.125C112.833 179.315 115.16 183.089 118.831 184.425V184.057H118.59C117.854 182.966 116.751 182.475 115.772 181.624C113.569 179.435 111.121 176.757 109.406 174.325C104.267 167.513 99.7399 159.968 95.6983 152.183C93.7365 148.412 92.0216 144.275 90.4357 140.504C89.6949 139.043 89.6949 136.85 88.4739 136.125C86.6355 138.797 83.9466 141.115 82.5939 144.398C80.2672 149.628 80.0257 156.077 79.1697 162.769C78.6758 162.891 78.8953 162.769 78.6758 163.041C74.7631 162.071 73.4132 158.051 71.9453 154.648C68.274 146.01 67.6594 132.141 70.8422 122.164C71.6983 119.609 75.375 111.579 73.9071 109.146C73.1662 106.834 70.7242 105.498 69.3743 103.671C67.7829 101.359 66.0735 98.4409 64.9705 95.8859C62.0346 89.0689 60.5667 81.5293 57.3812 74.7151C55.9077 71.552 53.3396 68.2662 51.257 65.3486C48.9303 62.0628 46.3648 59.7505 44.5265 55.8593C43.9146 54.4959 43.0585 52.3309 44.0381 50.8693C44.2795 49.8959 44.7734 49.5059 45.7475 49.2878C47.3389 47.9244 51.8716 49.6532 53.463 50.3785C57.9903 52.2054 61.7849 53.907 65.5796 56.4592C67.2945 57.6754 69.1329 59.9877 71.3361 60.5985H73.9098C77.8279 61.4493 82.2317 60.8712 85.9002 61.9619C92.3893 64.0343 98.2637 67.0719 103.532 70.3604C119.567 80.4577 132.792 94.8143 141.725 111.971C143.193 114.769 143.805 117.324 145.155 120.244C147.729 126.208 150.912 132.289 153.477 138.132C156.051 143.85 158.498 149.694 162.17 154.438C164.008 156.993 171.35 158.329 174.654 159.668C177.104 160.759 180.896 161.741 183.105 163.077C187.264 165.632 191.427 168.552 195.342 171.35C197.298 172.806 203.423 175.849 203.787 178.276L203.801 178.21ZM78.9584 72.4873C77.267 72.4724 75.5809 72.6769 73.9427 73.0954V73.3681H74.1842C75.1637 75.315 76.8786 76.6538 78.1023 78.3581L80.9202 84.1989L81.1616 83.9262C82.8765 82.71 83.7353 80.7631 83.7353 77.8454C83 76.9947 82.8793 76.1412 82.2674 75.2904C81.5321 74.0743 79.9407 73.4635 78.9584 72.4928V72.4873Z" clipRule="evenodd" /></g><defs><clipPath id="clip0_7_147"><rect width="180" height="180" fill="#fff" transform="translate(38 38)" /></clipPath></defs></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60" /><path fill="#fff" d="M121.451 28.0537C121.021 28.0928 119.652 28.2297 118.42 28.3274C90.0137 30.8885 63.4057 46.216 46.5533 69.7742C37.1691 82.8729 31.1672 97.7312 28.8993 113.469C28.0978 118.963 28 120.586 28 128.034C28 135.483 28.0978 137.106 28.8993 142.599C34.3343 180.155 61.0596 211.71 97.306 223.401C103.797 225.493 110.639 226.92 118.42 227.78C121.451 228.112 134.549 228.112 137.58 227.78C151.011 226.294 162.389 222.971 173.611 217.242C175.331 216.363 175.664 216.128 175.429 215.933C175.273 215.815 167.941 205.981 159.144 194.095L143.152 172.492L123.112 142.834C112.086 126.529 103.015 113.195 102.936 113.195C102.858 113.176 102.78 126.353 102.741 142.443C102.682 170.615 102.663 171.749 102.311 172.413C101.803 173.371 101.412 173.762 100.59 174.193C99.9648 174.505 99.4174 174.564 96.4653 174.564H93.0831L92.1838 173.997C91.5973 173.626 91.1672 173.137 90.8739 172.57L90.4633 171.69L90.5024 132.492L90.5611 93.2737L91.1672 92.5112C91.48 92.1007 92.1447 91.5728 92.6139 91.3186C93.4154 90.9276 93.7283 90.8885 97.1105 90.8885C101.099 90.8885 101.763 91.0449 102.8 92.1789C103.093 92.4917 113.943 108.836 126.925 128.523C139.906 148.21 157.658 175.092 166.377 188.288L182.213 212.277L183.015 211.749C190.111 207.135 197.619 200.566 203.562 193.723C216.211 179.197 224.364 161.485 227.101 142.599C227.902 137.106 228 135.483 228 128.034C228 120.586 227.902 118.963 227.101 113.469C221.666 75.913 194.94 44.3587 158.694 32.6676C152.301 30.5953 145.498 29.1681 137.873 28.3079C135.996 28.1124 123.073 27.8973 121.451 28.0537ZM162.389 88.5425C163.327 89.0117 164.09 89.911 164.364 90.8494C164.52 91.3577 164.559 102.228 164.52 126.724L164.461 161.876L158.264 152.374L152.047 142.873V117.321C152.047 100.801 152.125 91.5141 152.242 91.0645C152.555 89.9697 153.239 89.1095 154.178 88.6011C154.979 88.1906 155.273 88.1515 158.342 88.1515C161.236 88.1515 161.744 88.1906 162.389 88.5425Z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60" /><path fill="#E535AB" d="M47.8621 176.192L55.2041 180.431L136.997 38.7664L129.655 34.5274L47.8621 176.192Z" /><path fill="#E535AB" d="M209.766 164.875H46.1809V173.353H209.766V164.875Z" /><path fill="#E535AB" d="M49.4177 169.637L131.241 216.879L135.48 209.537L53.6567 162.295L49.4177 169.637Z" /><path fill="#E535AB" d="M120.498 46.5121L202.321 93.7542L206.56 86.4122L124.737 39.1701L120.498 46.5121Z" /><path fill="#E535AB" d="M49.4404 86.3797L53.6794 93.7217L135.503 46.4796L131.264 39.1376L49.4404 86.3797Z" /><path fill="#E535AB" d="M119.02 38.7675L200.812 180.432L208.154 176.193L126.362 34.5285L119.02 38.7675Z" /><path fill="#E535AB" d="M61.145 80.7577H52.667V175.242H61.145V80.7577Z" /><path fill="#E535AB" d="M203.331 80.7577H194.853V175.242H203.331V80.7577Z" /><path fill="#E535AB" d="M126.095 206.877L129.798 213.291L200.962 172.203L197.259 165.79L126.095 206.877Z" /><path fill="#E535AB" d="M214.567 178C209.664 186.529 198.734 189.44 190.205 184.537C181.676 179.634 178.765 168.705 183.668 160.176C188.571 151.646 199.501 148.735 208.03 153.638C216.61 158.592 219.521 169.471 214.567 178Z" /><path fill="#E535AB" d="M72.2789 95.8244C67.3759 104.353 56.4464 107.265 47.9173 102.362C39.3882 97.4587 36.4771 86.5292 41.38 78.0001C46.283 69.4709 57.2125 66.5598 65.7416 71.4628C74.2707 76.4168 77.1819 87.2953 72.2789 95.8244Z" /><path fill="#E535AB" d="M41.431 178C36.5281 169.471 39.4392 158.592 47.9683 153.638C56.4974 148.735 67.3759 151.646 72.3299 160.176C77.2329 168.705 74.3217 179.583 65.7926 184.537C57.2124 189.44 46.334 186.529 41.431 178Z" /><path fill="#E535AB" d="M183.719 95.8244C178.816 87.2953 181.727 76.4168 190.256 71.4628C198.786 66.5598 209.664 69.4709 214.618 78.0001C219.521 86.5292 216.61 97.4076 208.081 102.362C199.552 107.265 188.622 104.353 183.719 95.8244Z" /><path fill="#E535AB" d="M127.999 228C118.142 228 110.175 220.033 110.175 210.176C110.175 200.319 118.142 192.351 127.999 192.351C137.856 192.351 145.823 200.319 145.823 210.176C145.823 219.982 137.856 228 127.999 228Z" /><path fill="#E535AB" d="M127.999 63.6486C118.142 63.6486 110.175 55.6813 110.175 45.8243C110.175 35.9673 118.142 28 127.999 28C137.856 28 145.823 35.9673 145.823 45.8243C145.823 55.6813 137.856 63.6486 127.999 63.6486Z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60" /><path fill="#00D8FF" d="M128.001 146.951C138.305 146.951 146.657 138.598 146.657 128.295C146.657 117.992 138.305 109.639 128.001 109.639C117.698 109.639 109.345 117.992 109.345 128.295C109.345 138.598 117.698 146.951 128.001 146.951Z" /><path fillRule="evenodd" stroke="#00D8FF" strokeWidth="8.911" d="M128.002 90.3633C153.05 90.3633 176.319 93.9575 193.864 99.9976C215.003 107.275 228 118.306 228 128.295C228 138.704 214.226 150.423 191.525 157.944C174.363 163.63 151.779 166.598 128.002 166.598C103.624 166.598 80.5389 163.812 63.1834 157.881C41.2255 150.376 28 138.506 28 128.295C28 118.387 40.4096 107.441 61.2515 100.175C78.8617 94.0353 102.705 90.3633 127.998 90.3633H128.002Z" clipRule="evenodd" /><path fillRule="evenodd" stroke="#00D8FF" strokeWidth="8.911" d="M94.9811 109.438C107.495 87.7402 122.232 69.3783 136.23 57.1971C153.094 42.5206 169.144 36.7728 177.796 41.7623C186.813 46.9623 190.084 64.7496 185.259 88.1712C181.614 105.879 172.9 126.925 161.021 147.523C148.842 168.641 134.897 187.247 121.09 199.315C103.619 214.587 86.7284 220.114 77.8833 215.013C69.3003 210.067 66.0181 193.846 70.1356 172.161C73.6145 153.838 82.3451 131.349 94.977 109.438L94.9811 109.438Z" clipRule="evenodd" /><path fillRule="evenodd" stroke="#00D8FF" strokeWidth="8.911" d="M95.0123 147.578C82.4633 125.904 73.9194 103.962 70.3531 85.7517C66.0602 63.8109 69.0954 47.0355 77.7401 42.0315C86.7485 36.8163 103.792 42.866 121.674 58.7437C135.194 70.7479 149.077 88.8052 160.99 109.383C173.204 130.481 182.358 151.856 185.919 169.844C190.425 192.608 186.778 210.001 177.941 215.116C169.367 220.08 153.676 214.825 136.945 200.427C122.809 188.263 107.685 169.468 95.0123 147.578Z" clipRule="evenodd" /></svg>
            </Flex>
            <Flex marginTop={4} justifyContent={'center'}>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#677EEB" rx="60" /><path fill="#F7FAFC" fillRule="evenodd" d="M52.6582 165.183C50.7411 162.159 50.7122 158.307 52.5835 155.254L123.044 40.3196C126.963 33.927 136.426 34.4859 139.565 41.2954L203.934 180.926C206.322 186.107 203.573 192.203 198.108 193.843L97.9779 223.882C93.9492 225.09 89.6084 223.471 87.3564 219.918L52.6582 165.183ZM131.173 73.9256C131.852 70.5445 136.485 70.0569 137.853 73.2226L182.254 175.963C183.09 177.898 182.05 180.129 180.03 180.731L110.848 201.383C108.305 202.142 105.869 199.92 106.392 197.318L131.173 73.9256Z" clipRule="evenodd" /></svg>
              <svg width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="256" height="256" rx="60" fill="#242938" />
                <path d="M128 34L223 198.853H33L128 34Z" fill="white" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="url(#paint0_linear_194_8)" rx="60" /><path fill="#fff" d="M140.279 73.0456L113.618 72.9995L76.6763 170.886L100.79 170.928L106.819 154.342L143.194 154.404L136.317 136.038L112.371 135.996L127.28 93.875L156.214 171.023L180.329 171.065L140.279 73.0456Z" /><path fill="#fff" d="M233.142 99.1236C233.074 98.7932 232.975 98.4692 232.845 98.1559C232.814 98.048 232.708 97.8484 232.708 97.8484C232.256 96.9105 231.54 96.115 230.647 95.5565C229.753 94.998 228.719 94.7 227.668 94.6979C226.21 94.6954 224.82 95.2609 223.805 96.2701C222.79 97.2794 222.232 98.6496 222.255 100.079C222.264 100.685 222.381 101.266 222.577 101.808L222.561 101.814C225.148 110.399 226.527 119.272 226.659 128.183C227.07 154.102 217.16 178.454 198.759 196.75C180.355 215.047 155.659 225.096 129.221 225.051C102.785 225.005 77.7671 214.868 58.7843 196.508C39.7971 178.147 29.1172 153.76 28.7064 127.841C28.2956 101.921 38.2051 77.57 56.6092 59.2739C75.011 40.9767 99.7085 30.9277 126.145 30.9734C149.752 31.0142 172.221 39.1071 190.278 53.9126C189.686 55.448 189.395 57.0838 189.422 58.7349C189.537 66.0138 195.648 71.9221 203.074 71.9349C210.497 71.9477 216.423 66.0604 216.307 58.7814C216.192 51.5024 210.079 45.591 202.656 45.5781C201.036 45.5753 199.489 45.853 198.059 46.3648C178.55 30.1002 153.358 20.2376 125.974 20.1902C65.2366 20.0852 16.7651 68.2735 17.709 127.822C18.6528 187.37 68.6545 235.729 129.392 235.834C190.13 235.939 238.601 187.752 237.658 128.202C237.498 118.13 235.924 108.378 233.142 99.1236V99.1236Z" /><defs><linearGradient id="paint0_linear_194_8" x1="0" x2="256" y1="0" y2="256" gradientUnits="userSpaceOnUse"><stop stopColor="#4010AC" /><stop offset="1" stopColor="#D540A8" /></linearGradient></defs></svg>
              <svg width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="256" height="256" rx="60" fill="#242938" />
                <path d="M128.001 30C72.7791 30 28 74.7708 28 130.001C28 174.184 56.6533 211.668 96.3867 224.891C101.384 225.817 103.219 222.722 103.219 220.081C103.219 217.696 103.126 209.819 103.083 201.463C75.2631 207.512 69.3927 189.664 69.3927 189.664C64.8437 178.105 58.2894 175.032 58.2894 175.032C49.2163 168.825 58.9733 168.953 58.9733 168.953C69.0151 169.658 74.3026 179.258 74.3026 179.258C83.2217 194.546 97.6965 190.126 103.403 187.571C104.301 181.107 106.892 176.696 109.752 174.199C87.5405 171.67 64.1913 163.095 64.1913 124.778C64.1913 113.86 68.0977 104.939 74.4947 97.9362C73.4564 95.4175 70.0335 85.2465 75.4635 71.4722C75.4635 71.4722 83.8609 68.7845 102.971 81.7226C110.948 79.5069 119.502 78.3958 128.001 78.3577C136.499 78.3958 145.061 79.5069 153.052 81.7226C172.139 68.7845 180.525 71.4722 180.525 71.4722C185.968 85.2465 182.544 95.4175 181.505 97.9362C187.917 104.939 191.797 113.86 191.797 124.778C191.797 163.187 168.403 171.644 146.135 174.119C149.722 177.223 152.918 183.308 152.918 192.638C152.918 206.018 152.802 216.787 152.802 220.081C152.802 222.742 154.602 225.86 159.671 224.878C199.383 211.64 228 174.169 228 130.001C228 74.7708 183.227 30 128.001 30ZM65.4536 172.453C65.2333 172.95 64.4517 173.099 63.7396 172.758C63.0143 172.432 62.6069 171.754 62.8421 171.256C63.0574 170.744 63.8406 170.602 64.5643 170.945C65.2913 171.271 65.7053 171.955 65.4536 172.453ZM70.3725 176.842C69.8956 177.285 68.9633 177.079 68.3307 176.38C67.6766 175.683 67.554 174.751 68.0376 174.302C68.5294 173.86 69.4336 174.067 70.0893 174.764C70.7434 175.47 70.8709 176.395 70.3725 176.842ZM73.7471 182.458C73.1344 182.884 72.1325 182.485 71.5132 181.595C70.9004 180.706 70.9004 179.64 71.5264 179.212C72.1474 178.785 73.1344 179.169 73.762 180.052C74.373 180.956 74.373 182.023 73.7471 182.458ZM79.4542 188.962C78.9061 189.566 77.7386 189.404 76.8841 188.579C76.0098 187.773 75.7663 186.629 76.3161 186.024C76.8709 185.418 78.045 185.589 78.9061 186.407C79.7738 187.211 80.0387 188.364 79.4542 188.962ZM86.8301 191.157C86.5883 191.941 85.4639 192.297 84.3312 191.964C83.2002 191.621 82.46 190.704 82.6885 189.912C82.9237 189.124 84.053 188.753 85.194 189.109C86.3234 189.45 87.0652 190.361 86.8301 191.157ZM95.2242 192.089C95.2523 192.913 94.2919 193.597 93.1029 193.612C91.9073 193.639 90.9402 192.971 90.9269 192.16C90.9269 191.327 91.8659 190.65 93.0615 190.63C94.2505 190.607 95.2242 191.269 95.2242 192.089ZM103.47 191.773C103.613 192.577 102.787 193.404 101.606 193.624C100.445 193.836 99.3702 193.339 99.2229 192.541C99.0788 191.716 99.92 190.89 101.079 190.676C102.262 190.471 103.32 190.955 103.47 191.773Z" fill="white" />
              </svg>
            </Flex>

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
              <Text style={{ fontSize: width >= 500 ? '2rem' : '1.5rem' }} color={primaryFontColor}>
                A Fullstack Application Used For Managing My Personal Portofolio Website Content.
              </Text>
              <Button onClick={() => window.open('https://barbarpotato.github.io/', '_blank')} size={width >= 500 ? 'lg' : 'sm'} my={3} mx={2} fontWeight={'bold'} colorScheme='purple' color={'black'}>Visit My Portofolio Website</Button>
            </Box>
          </Flex>

          <Box marginTop={5} textAlign={"center"} paddingX={4}>
            <Heading opacity={0.8} color={primaryFontColor}><span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{"<"}
            </span>Supported By<span style={{ color: 'rgba(134, 107, 171, 0.8)' }}>{'>'}</span>
            </Heading>
            <Flex justifyContent={'center'} marginTop={10}>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60" /><g clipPath="url(#clip0_7_147)"><path fill="#fff" fillRule="evenodd" d="M203.801 178.21C194.011 177.938 186.416 178.941 180.051 181.619C178.218 182.355 175.277 182.355 175.035 184.662C176.015 185.63 176.133 187.214 176.992 188.556C178.459 190.991 181.033 194.271 183.357 195.973L191.191 201.571C195.965 204.488 201.351 206.193 206.002 209.113C208.696 210.817 211.388 213.007 214.082 214.834C215.454 215.807 216.285 217.392 218 217.997V217.629C217.144 216.538 216.897 214.957 216.044 213.735L212.367 210.209C208.82 205.465 204.41 201.325 199.636 197.922C195.718 195.245 187.152 191.596 185.56 187.097L185.319 186.824C188.008 186.552 191.191 185.605 193.764 184.875C197.929 183.784 201.721 184.024 206.002 182.93L211.882 181.226V180.135C209.678 177.946 208.087 175.025 205.763 172.959C199.521 167.606 192.661 162.373 185.56 157.994C181.766 155.562 176.868 153.977 172.829 151.913C171.356 151.182 168.911 150.817 168.055 149.601C165.846 146.929 164.625 143.397 163.034 140.232L152.997 119.064C150.794 114.319 149.444 109.574 146.755 105.195C134.144 84.5124 120.431 71.9828 99.375 59.6932C94.8477 57.1382 89.4616 56.0393 83.7353 54.7032L74.5546 54.2124C72.5928 53.3616 70.6364 51.0493 68.9216 49.9531C61.9441 45.5739 43.9475 36.0847 38.8029 48.5897C35.4966 56.4974 43.7006 64.2824 46.4855 68.299C48.5708 71.0966 51.2597 74.2597 52.7332 77.4228C53.5563 79.4897 53.8307 81.682 54.6895 83.8717C56.6458 89.2243 58.4842 95.1878 61.0551 100.178C62.427 102.733 63.8675 105.413 65.5824 107.723C66.5619 109.086 68.2768 109.67 68.6417 111.859C66.9268 114.294 66.8089 117.94 65.8293 120.986C61.42 134.734 63.1349 151.766 69.377 161.888C71.3389 164.928 75.9622 171.622 82.2345 169.065C87.744 166.875 86.5148 159.941 88.1062 153.857C88.4766 152.399 88.2297 151.425 88.9623 150.449V150.722L93.9834 160.819C97.7781 166.78 104.391 172.986 109.897 177.125C112.833 179.315 115.16 183.089 118.831 184.425V184.057H118.59C117.854 182.966 116.751 182.475 115.772 181.624C113.569 179.435 111.121 176.757 109.406 174.325C104.267 167.513 99.7399 159.968 95.6983 152.183C93.7365 148.412 92.0216 144.275 90.4357 140.504C89.6949 139.043 89.6949 136.85 88.4739 136.125C86.6355 138.797 83.9466 141.115 82.5939 144.398C80.2672 149.628 80.0257 156.077 79.1697 162.769C78.6758 162.891 78.8953 162.769 78.6758 163.041C74.7631 162.071 73.4132 158.051 71.9453 154.648C68.274 146.01 67.6594 132.141 70.8422 122.164C71.6983 119.609 75.375 111.579 73.9071 109.146C73.1662 106.834 70.7242 105.498 69.3743 103.671C67.7829 101.359 66.0735 98.4409 64.9705 95.8859C62.0346 89.0689 60.5667 81.5293 57.3812 74.7151C55.9077 71.552 53.3396 68.2662 51.257 65.3486C48.9303 62.0628 46.3648 59.7505 44.5265 55.8593C43.9146 54.4959 43.0585 52.3309 44.0381 50.8693C44.2795 49.8959 44.7734 49.5059 45.7475 49.2878C47.3389 47.9244 51.8716 49.6532 53.463 50.3785C57.9903 52.2054 61.7849 53.907 65.5796 56.4592C67.2945 57.6754 69.1329 59.9877 71.3361 60.5985H73.9098C77.8279 61.4493 82.2317 60.8712 85.9002 61.9619C92.3893 64.0343 98.2637 67.0719 103.532 70.3604C119.567 80.4577 132.792 94.8143 141.725 111.971C143.193 114.769 143.805 117.324 145.155 120.244C147.729 126.208 150.912 132.289 153.477 138.132C156.051 143.85 158.498 149.694 162.17 154.438C164.008 156.993 171.35 158.329 174.654 159.668C177.104 160.759 180.896 161.741 183.105 163.077C187.264 165.632 191.427 168.552 195.342 171.35C197.298 172.806 203.423 175.849 203.787 178.276L203.801 178.21ZM78.9584 72.4873C77.267 72.4724 75.5809 72.6769 73.9427 73.0954V73.3681H74.1842C75.1637 75.315 76.8786 76.6538 78.1023 78.3581L80.9202 84.1989L81.1616 83.9262C82.8765 82.71 83.7353 80.7631 83.7353 77.8454C83 76.9947 82.8793 76.1412 82.2674 75.2904C81.5321 74.0743 79.9407 73.4635 78.9584 72.4928V72.4873Z" clipRule="evenodd" /></g><defs><clipPath id="clip0_7_147"><rect width="180" height="180" fill="#fff" transform="translate(38 38)" /></clipPath></defs></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60" /><path fill="#fff" d="M121.451 28.0537C121.021 28.0928 119.652 28.2297 118.42 28.3274C90.0137 30.8885 63.4057 46.216 46.5533 69.7742C37.1691 82.8729 31.1672 97.7312 28.8993 113.469C28.0978 118.963 28 120.586 28 128.034C28 135.483 28.0978 137.106 28.8993 142.599C34.3343 180.155 61.0596 211.71 97.306 223.401C103.797 225.493 110.639 226.92 118.42 227.78C121.451 228.112 134.549 228.112 137.58 227.78C151.011 226.294 162.389 222.971 173.611 217.242C175.331 216.363 175.664 216.128 175.429 215.933C175.273 215.815 167.941 205.981 159.144 194.095L143.152 172.492L123.112 142.834C112.086 126.529 103.015 113.195 102.936 113.195C102.858 113.176 102.78 126.353 102.741 142.443C102.682 170.615 102.663 171.749 102.311 172.413C101.803 173.371 101.412 173.762 100.59 174.193C99.9648 174.505 99.4174 174.564 96.4653 174.564H93.0831L92.1838 173.997C91.5973 173.626 91.1672 173.137 90.8739 172.57L90.4633 171.69L90.5024 132.492L90.5611 93.2737L91.1672 92.5112C91.48 92.1007 92.1447 91.5728 92.6139 91.3186C93.4154 90.9276 93.7283 90.8885 97.1105 90.8885C101.099 90.8885 101.763 91.0449 102.8 92.1789C103.093 92.4917 113.943 108.836 126.925 128.523C139.906 148.21 157.658 175.092 166.377 188.288L182.213 212.277L183.015 211.749C190.111 207.135 197.619 200.566 203.562 193.723C216.211 179.197 224.364 161.485 227.101 142.599C227.902 137.106 228 135.483 228 128.034C228 120.586 227.902 118.963 227.101 113.469C221.666 75.913 194.94 44.3587 158.694 32.6676C152.301 30.5953 145.498 29.1681 137.873 28.3079C135.996 28.1124 123.073 27.8973 121.451 28.0537ZM162.389 88.5425C163.327 89.0117 164.09 89.911 164.364 90.8494C164.52 91.3577 164.559 102.228 164.52 126.724L164.461 161.876L158.264 152.374L152.047 142.873V117.321C152.047 100.801 152.125 91.5141 152.242 91.0645C152.555 89.9697 153.239 89.1095 154.178 88.6011C154.979 88.1906 155.273 88.1515 158.342 88.1515C161.236 88.1515 161.744 88.1906 162.389 88.5425Z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60" /><path fill="#E535AB" d="M47.8621 176.192L55.2041 180.431L136.997 38.7664L129.655 34.5274L47.8621 176.192Z" /><path fill="#E535AB" d="M209.766 164.875H46.1809V173.353H209.766V164.875Z" /><path fill="#E535AB" d="M49.4177 169.637L131.241 216.879L135.48 209.537L53.6567 162.295L49.4177 169.637Z" /><path fill="#E535AB" d="M120.498 46.5121L202.321 93.7542L206.56 86.4122L124.737 39.1701L120.498 46.5121Z" /><path fill="#E535AB" d="M49.4404 86.3797L53.6794 93.7217L135.503 46.4796L131.264 39.1376L49.4404 86.3797Z" /><path fill="#E535AB" d="M119.02 38.7675L200.812 180.432L208.154 176.193L126.362 34.5285L119.02 38.7675Z" /><path fill="#E535AB" d="M61.145 80.7577H52.667V175.242H61.145V80.7577Z" /><path fill="#E535AB" d="M203.331 80.7577H194.853V175.242H203.331V80.7577Z" /><path fill="#E535AB" d="M126.095 206.877L129.798 213.291L200.962 172.203L197.259 165.79L126.095 206.877Z" /><path fill="#E535AB" d="M214.567 178C209.664 186.529 198.734 189.44 190.205 184.537C181.676 179.634 178.765 168.705 183.668 160.176C188.571 151.646 199.501 148.735 208.03 153.638C216.61 158.592 219.521 169.471 214.567 178Z" /><path fill="#E535AB" d="M72.2789 95.8244C67.3759 104.353 56.4464 107.265 47.9173 102.362C39.3882 97.4587 36.4771 86.5292 41.38 78.0001C46.283 69.4709 57.2125 66.5598 65.7416 71.4628C74.2707 76.4168 77.1819 87.2953 72.2789 95.8244Z" /><path fill="#E535AB" d="M41.431 178C36.5281 169.471 39.4392 158.592 47.9683 153.638C56.4974 148.735 67.3759 151.646 72.3299 160.176C77.2329 168.705 74.3217 179.583 65.7926 184.537C57.2124 189.44 46.334 186.529 41.431 178Z" /><path fill="#E535AB" d="M183.719 95.8244C178.816 87.2953 181.727 76.4168 190.256 71.4628C198.786 66.5598 209.664 69.4709 214.618 78.0001C219.521 86.5292 216.61 97.4076 208.081 102.362C199.552 107.265 188.622 104.353 183.719 95.8244Z" /><path fill="#E535AB" d="M127.999 228C118.142 228 110.175 220.033 110.175 210.176C110.175 200.319 118.142 192.351 127.999 192.351C137.856 192.351 145.823 200.319 145.823 210.176C145.823 219.982 137.856 228 127.999 228Z" /><path fill="#E535AB" d="M127.999 63.6486C118.142 63.6486 110.175 55.6813 110.175 45.8243C110.175 35.9673 118.142 28 127.999 28C137.856 28 145.823 35.9673 145.823 45.8243C145.823 55.6813 137.856 63.6486 127.999 63.6486Z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60" /><path fill="#00D8FF" d="M128.001 146.951C138.305 146.951 146.657 138.598 146.657 128.295C146.657 117.992 138.305 109.639 128.001 109.639C117.698 109.639 109.345 117.992 109.345 128.295C109.345 138.598 117.698 146.951 128.001 146.951Z" /><path fillRule="evenodd" stroke="#00D8FF" strokeWidth="8.911" d="M128.002 90.3633C153.05 90.3633 176.319 93.9575 193.864 99.9976C215.003 107.275 228 118.306 228 128.295C228 138.704 214.226 150.423 191.525 157.944C174.363 163.63 151.779 166.598 128.002 166.598C103.624 166.598 80.5389 163.812 63.1834 157.881C41.2255 150.376 28 138.506 28 128.295C28 118.387 40.4096 107.441 61.2515 100.175C78.8617 94.0353 102.705 90.3633 127.998 90.3633H128.002Z" clipRule="evenodd" /><path fillRule="evenodd" stroke="#00D8FF" strokeWidth="8.911" d="M94.9811 109.438C107.495 87.7402 122.232 69.3783 136.23 57.1971C153.094 42.5206 169.144 36.7728 177.796 41.7623C186.813 46.9623 190.084 64.7496 185.259 88.1712C181.614 105.879 172.9 126.925 161.021 147.523C148.842 168.641 134.897 187.247 121.09 199.315C103.619 214.587 86.7284 220.114 77.8833 215.013C69.3003 210.067 66.0181 193.846 70.1356 172.161C73.6145 153.838 82.3451 131.349 94.977 109.438L94.9811 109.438Z" clipRule="evenodd" /><path fillRule="evenodd" stroke="#00D8FF" strokeWidth="8.911" d="M95.0123 147.578C82.4633 125.904 73.9194 103.962 70.3531 85.7517C66.0602 63.8109 69.0954 47.0355 77.7401 42.0315C86.7485 36.8163 103.792 42.866 121.674 58.7437C135.194 70.7479 149.077 88.8052 160.99 109.383C173.204 130.481 182.358 151.856 185.919 169.844C190.425 192.608 186.778 210.001 177.941 215.116C169.367 220.08 153.676 214.825 136.945 200.427C122.809 188.263 107.685 169.468 95.0123 147.578Z" clipRule="evenodd" /></svg>
            </Flex>
            <Flex marginTop={4} justifyContent={'center'}>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#677EEB" rx="60" /><path fill="#F7FAFC" fillRule="evenodd" d="M52.6582 165.183C50.7411 162.159 50.7122 158.307 52.5835 155.254L123.044 40.3196C126.963 33.927 136.426 34.4859 139.565 41.2954L203.934 180.926C206.322 186.107 203.573 192.203 198.108 193.843L97.9779 223.882C93.9492 225.09 89.6084 223.471 87.3564 219.918L52.6582 165.183ZM131.173 73.9256C131.852 70.5445 136.485 70.0569 137.853 73.2226L182.254 175.963C183.09 177.898 182.05 180.129 180.03 180.731L110.848 201.383C108.305 202.142 105.869 199.92 106.392 197.318L131.173 73.9256Z" clipRule="evenodd" /></svg>
              <svg width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="256" height="256" rx="60" fill="#242938" />
                <path d="M128 34L223 198.853H33L128 34Z" fill="white" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="url(#paint0_linear_194_8)" rx="60" /><path fill="#fff" d="M140.279 73.0456L113.618 72.9995L76.6763 170.886L100.79 170.928L106.819 154.342L143.194 154.404L136.317 136.038L112.371 135.996L127.28 93.875L156.214 171.023L180.329 171.065L140.279 73.0456Z" /><path fill="#fff" d="M233.142 99.1236C233.074 98.7932 232.975 98.4692 232.845 98.1559C232.814 98.048 232.708 97.8484 232.708 97.8484C232.256 96.9105 231.54 96.115 230.647 95.5565C229.753 94.998 228.719 94.7 227.668 94.6979C226.21 94.6954 224.82 95.2609 223.805 96.2701C222.79 97.2794 222.232 98.6496 222.255 100.079C222.264 100.685 222.381 101.266 222.577 101.808L222.561 101.814C225.148 110.399 226.527 119.272 226.659 128.183C227.07 154.102 217.16 178.454 198.759 196.75C180.355 215.047 155.659 225.096 129.221 225.051C102.785 225.005 77.7671 214.868 58.7843 196.508C39.7971 178.147 29.1172 153.76 28.7064 127.841C28.2956 101.921 38.2051 77.57 56.6092 59.2739C75.011 40.9767 99.7085 30.9277 126.145 30.9734C149.752 31.0142 172.221 39.1071 190.278 53.9126C189.686 55.448 189.395 57.0838 189.422 58.7349C189.537 66.0138 195.648 71.9221 203.074 71.9349C210.497 71.9477 216.423 66.0604 216.307 58.7814C216.192 51.5024 210.079 45.591 202.656 45.5781C201.036 45.5753 199.489 45.853 198.059 46.3648C178.55 30.1002 153.358 20.2376 125.974 20.1902C65.2366 20.0852 16.7651 68.2735 17.709 127.822C18.6528 187.37 68.6545 235.729 129.392 235.834C190.13 235.939 238.601 187.752 237.658 128.202C237.498 118.13 235.924 108.378 233.142 99.1236V99.1236Z" /><defs><linearGradient id="paint0_linear_194_8" x1="0" x2="256" y1="0" y2="256" gradientUnits="userSpaceOnUse"><stop stopColor="#4010AC" /><stop offset="1" stopColor="#D540A8" /></linearGradient></defs></svg>
              <svg width={width >= 500 ? "120" : "70"} width={width >= 500 ? "120" : "70"} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="256" height="256" rx="60" fill="#242938" />
                <path d="M128.001 30C72.7791 30 28 74.7708 28 130.001C28 174.184 56.6533 211.668 96.3867 224.891C101.384 225.817 103.219 222.722 103.219 220.081C103.219 217.696 103.126 209.819 103.083 201.463C75.2631 207.512 69.3927 189.664 69.3927 189.664C64.8437 178.105 58.2894 175.032 58.2894 175.032C49.2163 168.825 58.9733 168.953 58.9733 168.953C69.0151 169.658 74.3026 179.258 74.3026 179.258C83.2217 194.546 97.6965 190.126 103.403 187.571C104.301 181.107 106.892 176.696 109.752 174.199C87.5405 171.67 64.1913 163.095 64.1913 124.778C64.1913 113.86 68.0977 104.939 74.4947 97.9362C73.4564 95.4175 70.0335 85.2465 75.4635 71.4722C75.4635 71.4722 83.8609 68.7845 102.971 81.7226C110.948 79.5069 119.502 78.3958 128.001 78.3577C136.499 78.3958 145.061 79.5069 153.052 81.7226C172.139 68.7845 180.525 71.4722 180.525 71.4722C185.968 85.2465 182.544 95.4175 181.505 97.9362C187.917 104.939 191.797 113.86 191.797 124.778C191.797 163.187 168.403 171.644 146.135 174.119C149.722 177.223 152.918 183.308 152.918 192.638C152.918 206.018 152.802 216.787 152.802 220.081C152.802 222.742 154.602 225.86 159.671 224.878C199.383 211.64 228 174.169 228 130.001C228 74.7708 183.227 30 128.001 30ZM65.4536 172.453C65.2333 172.95 64.4517 173.099 63.7396 172.758C63.0143 172.432 62.6069 171.754 62.8421 171.256C63.0574 170.744 63.8406 170.602 64.5643 170.945C65.2913 171.271 65.7053 171.955 65.4536 172.453ZM70.3725 176.842C69.8956 177.285 68.9633 177.079 68.3307 176.38C67.6766 175.683 67.554 174.751 68.0376 174.302C68.5294 173.86 69.4336 174.067 70.0893 174.764C70.7434 175.47 70.8709 176.395 70.3725 176.842ZM73.7471 182.458C73.1344 182.884 72.1325 182.485 71.5132 181.595C70.9004 180.706 70.9004 179.64 71.5264 179.212C72.1474 178.785 73.1344 179.169 73.762 180.052C74.373 180.956 74.373 182.023 73.7471 182.458ZM79.4542 188.962C78.9061 189.566 77.7386 189.404 76.8841 188.579C76.0098 187.773 75.7663 186.629 76.3161 186.024C76.8709 185.418 78.045 185.589 78.9061 186.407C79.7738 187.211 80.0387 188.364 79.4542 188.962ZM86.8301 191.157C86.5883 191.941 85.4639 192.297 84.3312 191.964C83.2002 191.621 82.46 190.704 82.6885 189.912C82.9237 189.124 84.053 188.753 85.194 189.109C86.3234 189.45 87.0652 190.361 86.8301 191.157ZM95.2242 192.089C95.2523 192.913 94.2919 193.597 93.1029 193.612C91.9073 193.639 90.9402 192.971 90.9269 192.16C90.9269 191.327 91.8659 190.65 93.0615 190.63C94.2505 190.607 95.2242 191.269 95.2242 192.089ZM103.47 191.773C103.613 192.577 102.787 193.404 101.606 193.624C100.445 193.836 99.3702 193.339 99.2229 192.541C99.0788 191.716 99.92 190.89 101.079 190.676C102.262 190.471 103.32 190.955 103.47 191.773Z" fill="white" />
              </svg>
            </Flex>
          </Box>

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