import React from "react";
import { render, screen } from "@testing-library/react";

import JobClassifiedPage from "../JobClassifiedPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobClassified page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobClassifiedPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobClassified-datatable")).toBeInTheDocument();
    expect(screen.getByRole("jobClassified-add-button")).toBeInTheDocument();
});
