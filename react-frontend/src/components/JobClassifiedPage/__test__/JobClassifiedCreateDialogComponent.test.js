import React from "react";
import { render, screen } from "@testing-library/react";

import JobClassifiedCreateDialogComponent from "../JobClassifiedCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobClassified create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobClassifiedCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobClassified-create-dialog-component")).toBeInTheDocument();
});
