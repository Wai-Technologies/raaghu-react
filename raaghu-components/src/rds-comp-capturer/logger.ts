// src/utils/logger.ts
const consoleLogs: string[] = [];
const networkLogs: string[] = [];
const errorLogs: string[] = [];

// Console Logger
const originalConsoleError = console.error;

export const startLoggingConsole = () => {
    console.error = (...args) => {
        consoleLogs.push(args.join(" "));
        originalConsoleError(...args);
    };
};

export const getConsoleLogs = () => consoleLogs;

// Network Logger
export const startLoggingNetwork = () => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        const response = await originalFetch(...args);
        networkLogs.push(`${args[0]} - ${response.status}`);
        return response;
    };
};

export const getNetworkLogs = () => networkLogs;

// Error Logger
export const logError = (error: Error) => {
    errorLogs.push(error.message);
    console.error("Logged Error:", error);
};

export const getErrorLogs = () => errorLogs;
