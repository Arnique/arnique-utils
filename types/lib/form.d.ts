export class ReqHelper {
    constructor({ model, errorMaker }?: {
        model?: any;
        errorMaker?: typeof getError;
    });
    model: any;
    errorMaker: typeof getError;
    reset(): void;
    idle: boolean;
    success: boolean;
    busy: boolean;
    data: any;
    error: {
        message: any;
    };
    start(): void;
    send(promise: any): Promise<{
        data: any;
        error: any;
    }>;
    pass(data?: any): void;
    fail(error: any): void;
    get state(): "BUSY" | "PASSED" | "FAILED" | "IDLE";
}
declare function getError(error: any): {
    message: any;
};
export {};
