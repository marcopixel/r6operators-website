import * as React from "react";
import { Helmet } from "react-helmet";

import "./layout.scss";

const MainLayout: React.SFC = ({ children }) => (
    <div className="app">
        <Helmet>
            <meta charSet="utf-8" />
            <title>My Title</title>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />
        </Helmet>
        <div className="app__content">{children}</div>
    </div>
);

export default MainLayout;
