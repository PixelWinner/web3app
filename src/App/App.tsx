import React from "react";
import { AppProvider } from "@utils/providers/AppProvider";
import AppPages from "../pages/AppPages";
import { ErrorBoundary } from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "@utils/styles/GlobalStyles";

function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <AppProvider>
                <ErrorBoundary>
                    <AppPages />
                    <GlobalStyle/>
                </ErrorBoundary>
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;
