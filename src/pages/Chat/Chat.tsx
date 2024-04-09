import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import UserInput from "@pages/Chat/components/UserInput";
import { useNavigate, useParams } from "react-router-dom";
import Messages from "@pages/Chat/components/Messages/Messages";
import { IOSocket } from "@utils/socket/IOSocket";
import { EventType } from "@utils/typings/enums/common.enums";
import { TMessage } from "@utils/typings/types/common.types";
import { PAGE_PATH } from "@utils/constants/common.constants";
import { useAppContext } from "@utils/providers/AppProvider";


const Container = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    gap: 16px;
    padding: 16px;`;

const Header = styled(Box)`
    display: flex;
    align-items: center;
    align-self: flex-start;
    gap: 16px;
`

const Chat = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState<TMessage[]>([]);
    const {handleLogin}=useAppContext()
    const navigate = useNavigate();

    const handleBack = () => {
        IOSocket.emit(EventType.LEAVE);
        navigate(PAGE_PATH.chatSelection);
    }

    const handleLogOut =()=>{
        handleLogin("")
    }

    const handleLoadMessages = (newMessages: TMessage[])=>{
        setMessages(newMessages)
    }

    const handleNewMessage = (newMessage: TMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    useEffect(() => {
        IOSocket.emit(EventType.LOAD_MESSAGES);

        IOSocket.on(EventType.LOAD_MESSAGES, handleLoadMessages);

        IOSocket.on(EventType.MESSAGE, handleNewMessage);

        return () => {
            IOSocket.off(EventType.LOAD_MESSAGES, handleLoadMessages);
            IOSocket.off(EventType.MESSAGE, handleNewMessage);
        };
    }, []);


    return (
        <Container>
            <Header>
                <Button variant="contained" onClick={handleBack}>To the chat selection</Button>

                <Button variant="contained" onClick={handleLogOut}>Log out</Button>

                <Typography typography="h3">Chat #{id}</Typography>
            </Header>

            <Messages messages={messages} />

            <UserInput />
        </Container>
    );
};

export default Chat;