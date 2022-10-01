export function illegalKeys(schema: any, obj: any): string[];
export function hasIllegalKeys(schema: any, obj: any): boolean;
export function validateObj(schema: any, obj: any): {
    message: string;
    fields?: undefined;
} | {
    fields: any;
    message: string;
};
