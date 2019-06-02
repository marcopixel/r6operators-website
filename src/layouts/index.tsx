import * as React from "react";
import { graphql, StaticQuery } from "gatsby";
import { Helmet } from "react-helmet";

import "./layout.scss";

import Header from "components/Header";
import Footer from "components/Footer";

interface IMainLayout {
    children: React.ReactInstance | Element;
    data: {
        site: {
            siteMetadata: {
                title: string;
                description: string;
                keywords: string;
                author: string;
                authorTwitter: string;
            };
        };
    };
}

export default class MainLayout extends React.Component<IMainLayout> {
    render() {
        return (
            <StaticQuery
                query={graphql`
                    query {
                        site {
                            siteMetadata {
                                title
                                description
                                keywords
                                author
                                authorTwitter
                                siteUrl
                            }
                        }
                    }
                `}
                render={data => (
                    <div className="app">
                        <Helmet>
                            <html lang="en" />
                            <meta charSet="utf-8" />
                            <title>{data.site.siteMetadata.title} - </title>

                            <meta name="description" content={data.site.siteMetadata.description} />
                            <meta name="robots" content="index, follow" />
                            <meta name="author" content={data.site.siteMetadata.author} />
                            <meta name="keywords" content={data.site.siteMetadata.keywords} />
                            <meta name="google-site-verification" content="29qyhfrFPVjSUBs3g7813UqfBu_EfynWsWQqZPg2nfA" />

                            <meta property="og:title" content={data.site.siteMetadata.title} />
                            <meta property="og:description" content={data.site.siteMetadata.description} />
                            <meta property="og:image" content={data.site.siteMetadata.siteUrl + "opengraph.png"} />
                            <meta property="og:type" content="website" />
                            <meta property="og:url" content={data.site.siteMetadata.siteUrl} />

                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:site" content="@marcopixel" />
                            <meta name="twitter:image" content={data.site.siteMetadata.siteUrl + "opengraph.png"} />
                            <meta name="twitter:creator" content={data.site.siteMetadata.authorTwitter} />

                            <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
                            <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
                        </Helmet>
                        <div className="app__content">
                            <Header />
                            {this.props.children}
                            <Footer />
                        </div>
                    </div>
                )}
            />
        );
    }
}
