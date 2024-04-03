import React, { FC, PropsWithChildren, createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { v4 } from "uuid";

import { LocalStorage } from "@utils/typings/enums/common.enums";
import { IOSocket } from "@utils/socket/IOSocket";

type AppContextType = {
    userName: string,
    userId:string
    handleLogin: (userName: string) => void,
};

const INITIAL_USER_NAME = (localStorage.getItem(LocalStorage.USER_NAME)) ?? "";
const INITIAL_USER_ID = (localStorage.getItem(LocalStorage.USER_ID)) ?? "";

const ThemeContext = createContext<AppContextType>({
    userName: INITIAL_USER_NAME,
    userId: INITIAL_USER_ID,
    handleLogin: () => {
    }
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    const [userName, setUserName] = useState(INITIAL_USER_NAME);
    const [userId, setUserId] = useState(INITIAL_USER_ID);

    useEffect(() => {
        if (userName && userId) {
            IOSocket.connect();
        }

        return () => {
            IOSocket.disconnect();
        };
    }, [userName, userId]);

    const handleLogin = useCallback((name: string) => {
        const uuid = v4();

        setUserName(name);
        setUserId(v4());

        localStorage.setItem(LocalStorage.USER_NAME, name);
        localStorage.setItem(LocalStorage.USER_ID, uuid);
    },[]);


    const contextValue: AppContextType = useMemo(
        () => ({
            userName,
            userId,
            handleLogin
        }),
        [userName, userId, handleLogin]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useAppContext = () => useContext(ThemeContext);

