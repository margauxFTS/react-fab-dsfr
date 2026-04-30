import type { Dispatch, SetStateAction } from "react";
export type InlineEditSaveCancelButtonsProps = {
    modifying: boolean;
    setModifying: Dispatch<SetStateAction<boolean>>;
    onModify: () => void;
    onSave: () => void;
    onCancel?: () => void;
    disabled?: boolean;
};
export declare function InlineEditSaveCancelButtons({ modifying, setModifying, onModify, onSave, onCancel, disabled, }: InlineEditSaveCancelButtonsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map