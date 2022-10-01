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
    setRandAlphaNum(len?: number, spacerDist?: number): SecureResponse;
    setRandDigitCode(len?: number): SecureResponse;
    setRandGuid(): SecureResponse;
    setCode(code: any): SecureResponse;
    checkCode(code: any, checkFunc?: any): SecureResponse;
}
declare class SecureResponse {
    constructor({ created, expiry, success, message, error, }?: {
        created?: any;
        expiry?: any;
        success?: boolean;
        message?: string;
        error?: string;
    });
    message: string;
    error: string;
    created: any;
    expiry: any;
    success: boolean;
}
export {};
