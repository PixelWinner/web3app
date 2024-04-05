import React, { FC, PropsWithChildren, createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { v4 } from "uuid";

import { EventType, LocalStorage } from "@utils/typings/enums/common.enums";
import { IOSocket } from "@utils/socket/IOSocket";

type AppContextType = {
    userName: string,
    userId: string
    handleLogin: (userName: string) => void,
};

const INITIAL_USER_NAME = (localStorage.getItem(LocalStorage.USER_NAME)) ?? "";

const ThemeContext = createContext<AppContextType>({
    userName: INITIAL_USER_NAME,
    userId: "",
    handleLogin: () => {
    }
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    const [userName, setUserName] = useState(INITIAL_USER_NAME);
    const [userId, setUserId] = useState("");

    const handleSetId = useCallback((id: string) => {
        setUserId(id);
    }, []);

    useEffect(() => {
        if (userName) {
            IOSocket.connect();
            IOSocket.on(EventType.LOAD_USER_ID, handleSetId);
        }

        return () => {
            IOSocket.disconnect();
            IOSocket.off(EventType.LOAD_USER_ID, handleSetId);
        };
    }, [userName]);

    const handleLogin = useCallback((name: string) => {
        const uuid = v4();

        setUserName(name);
        setUserId(uuid);

        localStorage.setItem(LocalStorage.USER_NAME, name);
        localStorage.setItem(LocalStorage.USER_ID, uuid);
    }, []);


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

