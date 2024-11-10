export interface IFormikNumberProps {
    className: string;
    name: string;
    onBlur: () => void;
    onChange: () => void;
    placeholder: string;
    value: string;
    disabled: boolean;
    maxLength: number;
    isnegativeallowed: boolean;
    isnegativeanddotallowed: boolean;
    isdotallowed?: boolean;
    min: number;
    max: number;
    id:string;
}