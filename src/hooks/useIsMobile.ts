import React, { useEffect,  useState} from 'react';

function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 600)
    
 
    //choose the screen size 
    const handleResize = () => {
    if (window.innerWidth < 600) {
        setIsMobile(true)
    } else if (window.innerWidth>=600 ){
        setIsMobile(false)
    }
    }

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    }, [])

  
    return isMobile
  }

export default useIsMobile