export class FileLogger {
    constructor({ dir, name }?: {
        dir?: string;
        name?: string;
    });
    name: string;
    logger: SimpleNodeLogger.Logger;
    log(...args: any[]): void;
    info(...args: any[]): void;
    error(...args: any[]): void;
    success(...args: any[]): void;
    warn(...args: any[]): void;
    test(): void;
}
import SimpleNodeLogger = require("simple-node-logger");
