import * as React from "react";
import { Helmet } from "react-helmet";

import "./layout.scss";

import Header from "components/Header";
import Footer from "components/Footer";

const MainLayout: React.Component = ({ children }) => (
    <div className="app">
        <Helmet>
            <meta charSet="utf-8" />
            <title>My Title</title>
            <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
        </Helmet>
        <div className="app__content">
            <Header />
            {children}
            <Footer />
        </div>
    </div>
);

export default MainLayout;
