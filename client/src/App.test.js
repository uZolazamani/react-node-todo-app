import { screen, waitFor, fireEvent } from "@testing-library/react";
import { render } from "../test-utils";
import Header from "./components/Header";

describe("ToDo App", () => {

  it("Shows todo app heading: ToDo App", async () => {
    render(<Header />);

    expect(screen.getByText("ToDo App")).toBeTruthy();
  });

  it("Check if changing search input changes value of search", async () => {
    render(<Header />);
    const input = await screen.getByPlaceholderText("Search");
    screen.debug()

    fireEvent.change(input, {target: {value: 'Delect'}});
    screen.debug()
    await waitFor(() => {
      return expect(input.value).toEqual("Delect");
    });
  });
});
