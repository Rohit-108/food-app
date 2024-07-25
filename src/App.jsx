import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import Contact from "./components/Contact.jsx";
import RestaurantMenu from "./components/RestaurantMenu.jsx";
import Profile from "./components/Profile.jsx";
import {Provider} from "react-redux";
import store from "./utils/store.jsx";
import Cart from "./components/Cart.jsx"

// import Login from "./components/Login.jsx";
 const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

const AppLayout = () => {
  return (
    <>
    <Provider store={store}
> <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div></Provider>     
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "about",
        element: <About />,
        children: [
          {
            // nested routing
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path:"/restaurant/:resId",
        element: <RestaurantMenu />
      },
      {
        path: "/cart",
        element: <Cart />,
      }
      
    ],
  },
  
]);

export default App;
