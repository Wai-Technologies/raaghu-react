// interface ConsoleMessage {
//     message: string;
//     optionalParams: any[];
//     stack: string | undefined;
// }

// const consoleErrors: ConsoleMessage[] = [];

// const originalConsoleError = console.error;

// console.error = (message?: any, ...optionalParams: any[]): void => {
//     const stack = new Error().stack;
//     consoleErrors.push({ message, optionalParams, stack });
//     originalConsoleError.apply(console, [message, ...optionalParams]);
// };

// export { consoleErrors };

let consoleErrors = "";

const originalConsoleError = console.error;

console.error = (message?: any): void => {
    const stack = new Error().stack;
    const combinedMessage = `\n ${message}${stack} \n`;

    consoleErrors += combinedMessage;

    originalConsoleError.apply(console, [message]);
};

export { consoleErrors };