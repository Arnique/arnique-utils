export class SecureAttempt {
    constructor({ error, lockDur, maxTries, message, tries, triesLock, failMessage, lockedMessage }?: {
        error?: any;
        lockDur?: string;
        maxTries?: number;
        message?: any;
        tries?: number;
        triesLock?: any;
        failMessage?: string;
        lockedMessage?: string;
    });
    lockDur: string;
    maxTries: number;
    tries: number;
    triesLock: any;
    message: any;
    error: any;
    failMessage: string;
    lockedMessage: string;
    get lockDurMs(): any;
    reset(): void;
    resets: number;
    count(passed?: boolean): AttemptResponse;
}
declare class AttemptResponse {
    constructor({ success, error, }?: {
        success?: boolean;
        error?: string;
    });
    error: string;
    success: boolean;
}
export {};
