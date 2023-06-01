import React, { ReactNode } from "react";

const ctx={

} as any
const GlobalContext = React.createContext(ctx);

const addContext = (key: string, value: any) => {
    ctx[key] = value;
    }
const removeContext = (key: string) => {
    delete ctx[key];
    }
const getGlobalContext = () => {
    return ctx;
    }
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
    addContext, 
    removeContext, 
    getGlobalContext 
 };