// #region WORKING CODE
// // Override console methods in a separate file (e.g., consoleLogger.ts)
// interface ConsoleMessage {
//     message: string;
//     optionalParams: any[];
// }

// const consoleErrors: ConsoleMessage[] = [];
// const consoleWarnings: ConsoleMessage[] = [];

// const originalConsoleError = console.error;
// const originalConsoleWarn = console.warn;

// console.error = (message?: any, ...optionalParams: any[]): void => {
//     consoleErrors.push({ message, optionalParams });
//     originalConsoleError.apply(console, [message, ...optionalParams]);
// };

// console.warn = (message?: any, ...optionalParams: any[]): void => {
//     consoleWarnings.push({ message, optionalParams });
//     originalConsoleWarn.apply(console, [message, ...optionalParams]);
// };

// export { consoleErrors, consoleWarnings };
// #endregion

interface ConsoleMessage {
    message: string;
    optionalParams: any[];
}

// consoleLogger.ts
interface ConsoleMessage {
    message: string;
    optionalParams: any[];
}

const consoleErrors: ConsoleMessage[] = [];
const consoleWarnings: ConsoleMessage[] = [];
const consoleInfo: ConsoleMessage[] = [];
const consoleLog: ConsoleMessage[] = [];
const consoleTrace: ConsoleMessage[] = [];

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleInfo = console.info;
const originalConsoleLog = console.log;
const originalConsoleTrace = console.trace;

console.error = (message?: any, ...optionalParams: any[]): void => {
    consoleErrors.push({ message, optionalParams });
    originalConsoleError.apply(console, [message, ...optionalParams]);
};

console.warn = (message?: any, ...optionalParams: any[]): void => {
    consoleWarnings.push({ message, optionalParams });
    originalConsoleWarn.apply(console, [message, ...optionalParams]);
};

console.info = (message?: any, ...optionalParams: any[]): void => {
    consoleInfo.push({ message, optionalParams });
    originalConsoleInfo.apply(console, [message, ...optionalParams]);
};

console.log = (message?: any, ...optionalParams: any[]): void => {
    consoleLog.push({ message, optionalParams });
    originalConsoleLog.apply(console, [message, ...optionalParams]);
};

console.trace = (message?: any, ...optionalParams: any[]): void => {
    consoleTrace.push({ message, optionalParams });
    originalConsoleTrace.apply(console, [message, ...optionalParams]);
};

export { consoleErrors, consoleWarnings, consoleInfo, consoleLog, consoleTrace };
