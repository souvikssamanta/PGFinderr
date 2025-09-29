import React, { createContext } from 'react'
export const authDataContext = createContext();
 const AuthContext = ({children}) => {
    const serverUrl = "https://pgfinder-so81.onrender.com";
   const[loading,setLoading]=React.useState(false)
    const value={serverUrl
    ,loading
    ,setLoading
    }
  return (
    
     <authDataContext.Provider value={value}>
        {children}
     </authDataContext.Provider>
    
  )
}

export default AuthContext
