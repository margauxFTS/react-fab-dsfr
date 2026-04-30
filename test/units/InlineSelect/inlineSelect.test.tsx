/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { InlineSelect } from "@lafabrique/react-fab-dsfr";
import { fireEvent, render, screen } from "@testing-library/react";

describe("InlineSelect", () => {
    const choice = { label: "Option A", value: "A" };
    const options = [choice, { label: "Option B", value: "B" }];

    it("renders label and select with initial value", () => {
        render(
            <InlineSelect
                label="Test Label"
                name="test"
                options={options}
                value={choice}
            />,
        );

        expect(screen.getByText("Test Label")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toHaveValue("A");
    });

    it("input is disabled by default (not modifying)", () => {
        render(
            <InlineSelect
                label="Test Label"
                name="test"
                options={options}
                value={choice}
            />,
        );

        expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("enables select when clicking edit", () => {
        render(
            <InlineSelect
                label="Test"
                name="test"
                options={options}
                value={choice}
            />,
        );

        fireEvent.click(screen.getByTitle("Modifier"));

        expect(screen.getByRole("combobox")).toBeEnabled();
    });

    it("calls onChange with new value on save", () => {
        const handleChange = jest.fn();

        render(
            <InlineSelect
                label="Test"
                name="test"
                onChange={handleChange}
                options={options}
                value={choice}
            />,
        );

        fireEvent.click(screen.getByTitle("Modifier"));

        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "B" },
        });

        fireEvent.click(screen.getByTitle("Enregistrer"));

        expect(handleChange).toHaveBeenCalledWith("B");
    });

    it("calls onChange with null when empty value is selected", () => {
        const handleChange = jest.fn();

        const choice = { label: "None", value: "" };
        const optionsWithEmpty = [choice, ...options];

        render(
            <InlineSelect
                label="Test"
                name="test"
                onChange={handleChange}
                options={optionsWithEmpty}
                value={choice}
            />,
        );

        fireEvent.click(screen.getByTitle("Modifier"));

        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "" },
        });

        fireEvent.click(screen.getByTitle("Enregistrer"));

        expect(handleChange).toHaveBeenCalledWith(null);
    });

    it("does not render edit buttons if editable=false", () => {
        render(
            <InlineSelect
                editable={false}
                label="Test"
                name="test"
                options={options}
                value={choice}
            />,
        );

        expect(screen.queryByText("edit")).not.toBeInTheDocument();
    });
});
