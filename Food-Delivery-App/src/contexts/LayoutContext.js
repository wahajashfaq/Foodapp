import React, { useContext, useState, useEffect } from "react"
 
const LayoutContext = React.createContext()


export const useLayout = () => {
  return useContext(LayoutContext)
}

export const LayoutProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth)
  
  
    useEffect(()=>{
        const handleResize = ()=>{
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])

  const value = {
    width
  }

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}