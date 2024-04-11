import React, { FC } from "react";
import { TMessage, Transaction } from "@utils/typings/types/common.types";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { MessageType } from "@utils/typings/enums/common.enums";
import { useAppContext } from "@utils/providers/AppProvider";
import DetailsTooltip from "@pages/Chat/components/Messages/components/DetailsTooltip";

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

const UserDetails = styled(Box)<{ $isMine: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    justify-content: ${({ $isMine }) => ($isMine ? "flex-end" : "flex-start")};
`;

const Message: FC<TMessage> = ({ sender, text, type, transactions, userId }) => {
    const { userId: localUserId } = useAppContext();
    const isMine = localUserId === userId;
    const hiddenId = hideId(userId);


    return (
        <Container $messageType={type} $isMine={isMine}>
            <UserDetails $isMine={isMine}>
                <Typography variant="body2">{sender}</Typography>

                {type === MessageType.USER && <Typography color="text.secondary" variant="subtitle2"> | {hiddenId}</Typography>}
            </UserDetails>

            <TextWrapper $messageType={type} $isMine={isMine}>
                <Typography variant="body1">{renderTransactionText(text, transactions)}</Typography>
            </TextWrapper>
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

const renderTransactionText = (text: string, transactions: Transaction[]) => {
    const transactionRegex = new RegExp(`(${transactions.map(t => t.txId).join("|")})`, "g");
    const partsWithTokens = text.split(transactionRegex).filter(part => part);

    return partsWithTokens.map((part, index) => {
        const transaction = transactions.find(t => t.txId === part);

        const txId = `tx-${index}`;
        const textId = `text-${index}`;

        if (!transaction) {
            return <Typography component="span" variant="body2" key={textId}>{part}</Typography>;
        }

        return (
            <DetailsTooltip key={txId} transaction={transaction}>
                <Typography component="span" variant="body2" fontWeight="bold" style={{ textDecoration: "underline", cursor: "pointer" }}>
                    {part}
                </Typography>
            </DetailsTooltip>
        );
    });
};