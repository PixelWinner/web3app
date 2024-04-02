import React, { FC, PropsWithChildren, createContext, useContext, useMemo, useState, useEffect } from "react";

import { LocalStorage } from "@utils/typings/enums/common.enums";
import { IOSocket } from "@utils/socket/IOSocket";

type AppContextType = {
    userName: string,
    setNewUserName: (userName: string) => void,
};

const INITIAL_USER_NAME = (localStorage.getItem(LocalStorage.USER_NAME)) ?? "";

const ThemeContext = createContext<AppContextType>({
    userName: INITIAL_USER_NAME,
    setNewUserName: () => {
    }
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    const [userName, setUserName] = useState(INITIAL_USER_NAME);

    useEffect(() => {
        if (userName) {
            IOSocket.connect();
        }

        return () => {
            IOSocket.disconnect();
        };
    }, [userName]);

    const setNewUserName = (name: string) => {
        setUserName(name);
        localStorage.setItem(LocalStorage.USER_NAME, name);
    };


    const contextValue: AppContextType = useMemo(
        () => ({
            userName,
            setNewUserName
        }),
        [userName]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useAppContext = () => useContext(ThemeContext);

