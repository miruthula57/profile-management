export interface IFormikDateProps {
    required: boolean;
    className: string;
    name: string;
    onChange: (date: any | null) => void;
    value: string;
    label?: string;
    format?: string;
    views?: Array<string> | any;
    id: string;
}