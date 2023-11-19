/**
 * Returns a consistent error object.
 * @returns {IErrorObj} The error object.
 */
export function getError(error: any): IErrorObj;
export type IErrorObj = {
    /**
     * - The error message.
     */
    message: string;
    /**
     * - The error code.
     */
    code: string;
    /**
     * - The HTTP status code.
     */
    status: number;
    /**
     * - The error stack trace (optional).
     */
    stack?: string;
};
