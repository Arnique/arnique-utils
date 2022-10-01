export class SecureCode {
    constructor({ code, expiry, lockDur, expiryDur, maxTries, maxResets, resets, resetsLock, tries, triesLock, message, error, }?: {
        code?: any;
        expiry?: any;
        lockDur?: string;
        expiryDur?: string;
        maxTries?: number;
        maxResets?: number;
        resets?: number;
        resetsLock?: any;
        tries?: number;
        triesLock?: any;
        message?: any;
        error?: any;
    });
    code: any;
    expiry: any;
    lockDur: string;
    expiryDur: string;
    maxTries: number;
    maxResets: number;
    resets: number;
    resetsLock: any;
    tries: number;
    triesLock: any;
    created: number;
    message: any;
    error: any;
    get lockDurMs(): any;
    get expiryDurMs(): any;
    reset(): void;
    setRandAlphaNum(len?: number, spacerDist?: number): {
        error: any;
        created?: undefined;
        expiry?: undefined;
        message?: undefined;
    } | {
        created: number;
        expiry: any;
        message: any;
        error?: undefined;
    };
    setRandDigitCode(len?: number): {
        error: any;
        created?: undefined;
        expiry?: undefined;
        message?: undefined;
    } | {
        created: number;
        expiry: any;
        message: any;
        error?: undefined;
    };
    setRandGuid(): {
        error: any;
        created?: undefined;
        expiry?: undefined;
        message?: undefined;
    } | {
        created: number;
        expiry: any;
        message: any;
        error?: undefined;
    };
    setCode(code: any): {
        error: any;
        created?: undefined;
        expiry?: undefined;
        message?: undefined;
    } | {
        created: number;
        expiry: any;
        message: any;
        error?: undefined;
    };
    checkCode(code: any, checkFunc?: any): true | {
        error: any;
    };
}
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
    count(passed?: boolean): boolean;
}
