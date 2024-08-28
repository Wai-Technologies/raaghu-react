let consoleErrors = "";

const originalConsoleError = console.error;

console.error = (message?: any): void => {
    const stack = new Error().stack;
    const combinedMessage = `message: ${message} => stack: ${stack} `;

    consoleErrors += combinedMessage;

    originalConsoleError.apply(console, [message]);
};

export { consoleErrors };