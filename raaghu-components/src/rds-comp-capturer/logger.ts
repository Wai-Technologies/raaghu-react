// // src/utils/logger.ts
// const consoleLogs: string[] = [];
// const networkLogs: string[] = [];
// const errorLogs: string[] = [];

// // Console Logger
// const originalConsoleError = console.error;

// export const startLoggingConsole = () => {
//     console.error = (...args) => {
//         consoleLogs.push(args.join(" "));
//         originalConsoleError(...args);
//     };
//     console.error("Console Logs:", consoleLogs);
// };

// export const getConsoleLogs = () => consoleLogs;

// // Network Logger
// export const startLoggingNetwork = () => {
//     const originalFetch = window.fetch;
//     window.fetch = async (...args) => {
//         const response = await originalFetch(...args);
//         networkLogs.push(`${args[0]} - ${response.status}`);
//         return response;
//     };
//     console.error("Network Logs:", networkLogs);
// };

// export const getNetworkLogs = () => networkLogs;

// // Error Logger
// export const logError = (error: Error) => {
//     errorLogs.push(error.message);
//     console.error("Logged Error:", error);
// };

// export const getErrorLogs = () => errorLogs;

/**
 * Handles errors by logging them to the console.
 * @param error The error event to log.
 */
export const handleError = (error: ErrorEvent) => {
    console.error("All these errors are there, please check:", error);
};
