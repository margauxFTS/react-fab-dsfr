import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { InlineEditSaveCancelButtons } from "@/src/InlineSaveCancelButtons";
describe("InlineEditSaveCancelButtons", () => {
    function setup(propsOverride = {}) {
        const setModifying = jest.fn();
        const onModify = jest.fn();
        const onSave = jest.fn();
        const onCancel = jest.fn();
        const props = {
            modifying: false,
            setModifying,
            onModify,
            onSave,
            onCancel,
            disabled: false,
            ...propsOverride,
        };
        render(_jsx(InlineEditSaveCancelButtons, { ...props }));
        return {
            setModifying,
            onModify,
            onSave,
            onCancel,
        };
    }
    it("renders only Modify button when not modifying", () => {
        setup();
        expect(screen.getByTitle("Modifier")).toBeInTheDocument();
        expect(screen.queryByTitle("Enregistrer")).not.toBeInTheDocument();
        expect(screen.queryByTitle("Annuler")).not.toBeInTheDocument();
    });
    it("calls onModify and enables modifying on Modify click", () => {
        const { onModify, setModifying } = setup();
        fireEvent.click(screen.getByTitle("Modifier"));
        expect(onModify).toHaveBeenCalledTimes(1);
        expect(setModifying).toHaveBeenCalledWith(true);
    });
    it("renders Save and Cancel buttons when modifying", () => {
        setup({ modifying: true });
        expect(screen.getByTitle("Enregistrer")).toBeInTheDocument();
        expect(screen.getByTitle("Annuler")).toBeInTheDocument();
    });
    it("calls onSave and disables modifying on Save click", () => {
        const { onSave, setModifying } = setup({ modifying: true });
        fireEvent.click(screen.getByTitle("Enregistrer"));
        expect(onSave).toHaveBeenCalledTimes(1);
        expect(setModifying).toHaveBeenCalledWith(false);
    });
    it("calls onCancel (if provided) and disables modifying on Cancel click", () => {
        const { onCancel, setModifying } = setup({ modifying: true });
        fireEvent.click(screen.getByTitle("Annuler"));
        expect(onCancel).toHaveBeenCalledTimes(1);
        expect(setModifying).toHaveBeenCalledWith(false);
    });
    it("does not crash if onCancel is not provided", () => {
        const setModifying = jest.fn();
        render(_jsx(InlineEditSaveCancelButtons, { modifying: true, onModify: jest.fn(), onSave: jest.fn(), setModifying: setModifying }));
        fireEvent.click(screen.getByTitle("Annuler"));
        expect(setModifying).toHaveBeenCalledWith(false);
    });
    it("disables Modify button when already modifying", () => {
        setup({ modifying: true });
        expect(screen.getByTitle("Modifier")).toBeDisabled();
    });
    it("disables Modify button when disabled prop is true", () => {
        setup({ disabled: true });
        expect(screen.getByTitle("Modifier")).toBeDisabled();
    });
});
//# sourceMappingURL=inlineEditSaveCancelButtons.test.js.map