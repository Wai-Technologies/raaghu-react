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

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (message?: any, ...optionalParams: any[]): void => {
    consoleErrors.push({ message, optionalParams });
    originalConsoleError.apply(console, [message, ...optionalParams]);
};

console.warn = (message?: any, ...optionalParams: any[]): void => {
    consoleWarnings.push({ message, optionalParams });
    originalConsoleWarn.apply(console, [message, ...optionalParams]);
};

export { consoleErrors, consoleWarnings };
