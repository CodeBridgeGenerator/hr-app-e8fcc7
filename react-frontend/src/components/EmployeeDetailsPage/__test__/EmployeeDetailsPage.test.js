import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeDetailsPage from "../EmployeeDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders employeeDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("employeeDetails-add-button")).toBeInTheDocument();
});
