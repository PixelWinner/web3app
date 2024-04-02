import React, { Component, ReactNode } from "react";
import ErrorPage from "@components/ErrorPage";


interface ErrorBoundaryProps {
    children?: ReactNode;
}

interface ErrorBoundaryState {
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        error: null
    };

    public componentDidCatch(error: Error) {
        this.setState({ error });
    }

    public render() {
        if (this.state.error) {
            return <ErrorPage error={this.state.error} />;
        }

        return this.props.children;
    }
}
