export function sleep(ms: any): Promise<any>;
export function hideSecret(str: any, maxVisible?: number): any;
export function readJson(filePath: any, nullOnError?: boolean): any;
export function saveJson(filePath?: string, data?: {}): void;
export function randNumber(len?: number): any;
export function randNumberString(len?: number): any;
export function randGuid(): any;
export function randId(len?: number): string;
export function randAlphaNum(len?: number, spacer?: number): string;
export function spaceString(str: any, dist?: number, spacer?: string): string;
export function timeStamp(): {
    ms: number;
    iso: string;
    timeString: string;
};
export function cleanArgs(args: any): any;
export function cascadeArr(arr?: any[]): any[];
export function cascadeObj(obj?: {}): {};
export function awaiter(promise: any): Promise<any>;
export function waitUntil(conditionFunc: any, intervalMs?: number, maxMs?: number): Promise<any>;
export function pick(obj: any, keys?: any[]): {};
export function pluck(obj: any, keys?: any[]): {
    [k: string]: any;
};
