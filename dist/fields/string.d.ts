export * as fields from "yup";
declare type StringType = {
    gqlName: string;
    isRequired: boolean;
    required: () => void;
};
export declare function string(): StringType;
