"use client"
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'
import React from 'react'

function CustomAccordion({ items, parentStyle }) {
    return (
        <Accordion style={parentStyle} allowToggle>
            {
                items.map((item) => (
                    <AccordionItem key={item.id}>
                        <h2>
                            <AccordionButton>
                                <Box as='span' flex='1' textAlign='left'>
                                    {item.title}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {item.content}
                        </AccordionPanel>
                    </AccordionItem>
                ))
            }
        </Accordion>
    )
}

export default CustomAccordion
