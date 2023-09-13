import React, { Fragment } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import UserProvider from "../Context/UserContext";

const Layout = () => {
  return (
    <Fragment>
      <UserProvider>
        <Header />
        <div>
          <Routers />
        </div>
        <Footer />
      </UserProvider>
    </Fragment>
  );
};

export default Layout;
