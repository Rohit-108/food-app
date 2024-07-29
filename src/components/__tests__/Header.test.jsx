
import Header from "../Header";
import { render } from "@testing-library/react";
import {StaticRouter} from "react-router-dom/server";

import { Provider } from "react-redux";
import store  from "../../utils/store"

test("Logo should load on rendering header ", () => {
    // Load header

      const header = render(
      <StaticRouter>
      <Provider store= {store}>
      <Header />
      </Provider>
      </StaticRouter>)
      console.log(header)

      const logo = header.getAllByTestId("logo")
      console.log(logo);

      expect(logo.href).toBe("http://localhost/")


    // Check if logo is loaded



})