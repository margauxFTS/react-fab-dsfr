export type DynamicInputListProps = {
    label: string;
    name: string;
    placeHolder: string;
    values: string[];
    onSetValues: (values: string[]) => void;
    disabled?: boolean;
    maximumItemNumber?: number;
    itemMaximumLength?: number;
    disabledInputs?: boolean;
    addAllowed?: boolean;
    deleteAllowed?: boolean;
};
export declare function DynamicInputList({ label, name, placeHolder, values, onSetValues, disabled, maximumItemNumber, itemMaximumLength, disabledInputs, addAllowed, deleteAllowed, }: DynamicInputListProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map