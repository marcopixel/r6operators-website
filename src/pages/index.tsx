import * as React from "react";
import Layout from "../layouts";
import IconGrid from "components/IconGrid";
import Info from "components/Info";

import "./base.scss";

export default class IndexPage extends React.Component<any> {
    render() {
        return (
            <Layout>
                <IconGrid />
                <Info />
            </Layout>
        );
    }
}
