import React from "react";
import { render, screen } from "@testing-library/react";

import JobClassifiedEditDialogComponent from "../JobClassifiedEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobClassified edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobClassifiedEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobClassified-edit-dialog-component")).toBeInTheDocument();
});
