import React, { FC } from "react";
import { TMessage } from "@utils/typings/types/common.types";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { MessageType } from "@utils/typings/enums/common.enums";
import { useAppContext } from "@utils/providers/AppProvider";
import Details from "@pages/Chat/components/Messages/components/Details";

const Container = styled(Box)<{ $messageType: MessageType, $isMine: boolean }>`
    display: flex;
    flex-direction: column;
    align-self: ${({ $messageType, $isMine }) => getAlign($messageType, $isMine)};
    margin: 8px;

`;

const TextWrapper = styled(Box)<{ $messageType: MessageType, $isMine: boolean }>`
    padding: 2px 4px;
    border-radius: 8px;
    backdrop-filter: ${({ $isMine }) => $isMine ? "brightness(0.95)" : "none"};
    border: ${({ $messageType }) => $messageType === MessageType.SYSTEM ? "none" : "grey 1px solid"};
`;

const ContentWrapper = styled(Box)<{ $isMine: boolean }>`
    display: flex;
    flex-direction: ${({ $isMine }) => $isMine ? "row" : "row-reverse"};
    gap: 4px`;

const UserDetails = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px`;


const Message: FC<TMessage> = ({ sender, text, type, transactions, userId }) => {
    const { userId: localUserId } = useAppContext();
    const isMine = localUserId === userId;
    const align = isMine ? "right" : "left";
    const hiddenId = hideId(userId);


    return (
        <Container $messageType={type} $isMine={isMine}>
            <UserDetails>
                <Typography align={align} variant="body2">{sender}</Typography>

                {type === MessageType.USER && <Typography color="text.secondary" variant="subtitle2"> | {hiddenId}</Typography>}
            </UserDetails>


            <ContentWrapper $isMine={isMine}>
                <Details transactions={transactions} />

                <TextWrapper $messageType={type} $isMine={isMine}>
                    <Typography variant="body1">{text}</Typography>
                </TextWrapper>
            </ContentWrapper>
        </Container>
    );
};

export default Message;


const getAlign = (messageType: MessageType, isMine: boolean): string => {
    if (isMine) {
        return "flex-end";
    }

    if (messageType === MessageType.SYSTEM) {
        return "center";
    }

    return "flex-start";
};

const hideId = (id: string) => {
    const visiblePart = id.substring(0, 8);
    return `${visiblePart}***`;
};