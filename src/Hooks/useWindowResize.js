import { useEffect, useState } from "react";

const useWindowResize = () => {
    const [isMobile, setIsMobile] = useState(false); // Default to false
  
    useEffect(() => {
      // Check if window is defined to avoid server-side rendering errors
      if (typeof window !== 'undefined') {
        // Set initial value based on window width
        setIsMobile(window.innerWidth < 640);
  
        // Function to update isMobile when window is resized
        const handleResize = () => {
          setIsMobile(window.innerWidth < 640);
        };
  
        // Add event listener for window resize
        window.addEventListener("resize", handleResize);
  
        // Cleanup: remove event listener on component unmount
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }, []); // Empty dependency array to run on mount
  
    return isMobile;
  };
  
  export default useWindowResize;