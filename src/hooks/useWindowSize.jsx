"use client";
import { useState, useEffect } from 'react';

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        // Handler to call on window resize
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Add event listener if window is defined (client-side only)
        if (typeof window !== 'undefined') {
            handleResize(); // Set initial size
            window.addEventListener('resize', handleResize);

            // Clean up event listener on component unmount
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []); // Empty array ensures this effect is only run on mount and unmount

    return windowSize;
}

export default useWindowSize;