"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "@codegouvfr/react-dsfr/Button";
export function InlineEditSaveCancelButtons({ modifying, setModifying, onModify, onSave, onCancel = undefined, disabled = false, }) {
    return (_jsxs(_Fragment, { children: [_jsx(Button, { disabled: modifying || disabled, iconId: "fr-icon-edit-line", onClick: () => {
                    onModify();
                    setModifying(true);
                }, priority: "primary", title: "Modifier", type: "button" }), modifying && (_jsxs(_Fragment, { children: [_jsx(Button, { iconId: "fr-icon-check-line", onClick: () => {
                            onSave();
                            setModifying(false);
                        }, priority: "primary", title: "Enregistrer", type: "button" }), _jsx(Button, { iconId: "fr-icon-close-line", onClick: () => {
                            if (onCancel) {
                                onCancel();
                            }
                            setModifying(false);
                        }, priority: "secondary", title: "Annuler", type: "reset" })] }))] }));
}
//# sourceMappingURL=index.js.map