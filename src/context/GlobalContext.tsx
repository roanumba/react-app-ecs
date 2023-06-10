import React, { ReactNode } from "react";

const ctx={

} as any
const GlobalContext = React.createContext(ctx);


const GlobalContextProvider = ({ children }:{children:ReactNode}) => {
    return (
        <GlobalContext.Provider value={ctx}>
            {children}
        </GlobalContext.Provider>
    );
    }
export {
    GlobalContextProvider, 
    GlobalContext, 

 };