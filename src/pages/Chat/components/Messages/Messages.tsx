import { TMessage } from "@utils/typings/types/common.types";
import React, { FC } from "react";
import Message from "@pages/Chat/components/Messages/components/Message";
import styled from "styled-components";
import { Paper } from "@mui/material";


const Container = styled(Paper)`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    gap: 8px`;

type MessagesProps = {
    messages: TMessage[];
}
const Messages: FC<MessagesProps> = ({ messages }) => {
    const items = messages.map((message) => <Message key={message.id} {...message} />);
console.log(messages)
    return <Container elevation={3}>{items}</Container>;
};

export default Messages;