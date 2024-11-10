export interface IFormikInputProps {
    className: string;
    name: string;
    onBlur: () => void;
    onChange: (e:any) => void;
    placeholder: string;
    value: string;
    type: string;
    disabled: boolean;
    spaceallowed: boolean;
    validcharacter?: Array<string>;
    invalidcharacter?: Array<string>;
    maxLength: number;
    id: string;
}