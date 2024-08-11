import { ternaryColor } from '@/app/theme/globalTheme'
import {
    Modal, ModalOverlay, ModalContent, Button, Input,
    ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react'

function BasicAuthModal({ isOpen, onClose, username, password, setUsername, setPassword }) {

    const handleSave = () => {
        sessionStorage.setItem("basic_auth", JSON.stringify({ is_valid: true, username, password }));
        onClose();
    }

    return (
        <>
            <Modal isCentered closeOnOverlayClick={false} variant={'purple'}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={ternaryColor}>Make Sure You Are My Boss!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <Input
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                            colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                            type="text"
                        />

                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            borderRadius={'2xl'} my={1} size={'lg'} borderWidth={3}
                            colorScheme='purple' borderColor={"#536189"} focusBorderColor={ternaryColor}
                            type="password"
                        />

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='purple' mr={3} onClick={handleSave}>
                            Save
                        </Button>
                        <Button colorScheme={"red"} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default BasicAuthModal