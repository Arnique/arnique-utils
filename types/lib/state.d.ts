export class JsonState extends EventEmitter {
    constructor({ data, userOpts, stateFile, onLog, onChange, onError, onInit, }?: {
        data?: {};
        userOpts?: {};
        stateFile?: string;
        onLog?: (v: any) => void;
        onChange?: (v: any) => void;
        onError?: (v: any) => void;
        onInit?: (v: any) => void;
    });
    stateFile: string;
    data: {};
    userOpts: {};
    dataKeys: string[];
    savedAt: number;
    init(): void;
    load(): void;
    save(obj: any): void;
    makeUserOpts(): {};
    saveOpt(key: any, value: any): void;
    get opts(): {};
    get public(): {
        opts: {};
        data: {};
    };
}
import EventEmitter = require("events");
