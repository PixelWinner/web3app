import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const AppLayout = () => {
    return <Container><Outlet /></Container>;
};

export default AppLayout;
