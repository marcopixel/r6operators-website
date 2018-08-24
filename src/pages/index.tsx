import * as React from "react";
import Layout from "../layouts";
import IconGrid from "components/IconGrid";

import "./base.scss";

export default class IndexPage extends React.Component<any> {
    render() {
        return (
            <Layout>
                <h1>Hello World!</h1>
                <IconGrid />
            </Layout>
        );
    }
}
