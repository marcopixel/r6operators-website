import * as React from "react";
import { Helmet } from "react-helmet";
import { withPrefix } from "gatsby-link";

import "./layout.scss";

import Header from "components/Header";
import Footer from "components/Footer";

const MainLayout: React.SFC = ({ children }) => (
    <div className="app">
        <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <title>r6-operatoricons - Rainbow Six: Siege operator icons</title>

            <meta name="description" content="Rainbow Six: Siege operator icons in SVG, PNG and AI." />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="marcopixel <marcopixel@live.de>" />

            <meta property="og:title" content="r6-operatoricons" />
            <meta property="og:description" content="Rainbow Six: Siege operator icons in SVG, PNG and AI." />
            <meta property="og:image" content={withPrefix("./opengraph.png")} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@marcopixel" />

            <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
        </Helmet>
        <div className="app__content">
            <Header />
            {children}
            <Footer />
        </div>
    </div>
);

export default MainLayout;
