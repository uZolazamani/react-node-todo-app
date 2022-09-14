import { render } from "@testing-library/react";
import React from "react";
import { ToDoContext } from "./src/App";

const AllTheProviders = ({ children }) => {
  const value = {
    data: {},
    setData: (state) => null,
    setTodo: (state) => null,
    todo: [],
    searchValue: "",
    setSearchValue: (state) => null,
  };

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };


