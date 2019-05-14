import * as React from "react";
import { OutboundLink } from "react-ga";
import { analytics } from "../../../package.json";

import "./footer.scss";

// Disable tracking if the opt-out cookie exists.
const disableStr = "ga-disable-" + analytics.gaTrackingID;

export default class Footer extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isOptOut: false
        };
        // bind functions
        this.gaOptOut = this.gaOptOut.bind(this);
    }
    gaOptOut() {
        document.cookie = disableStr + "=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
        window[disableStr] = true;
        this.setState({ isOptOut: true });
    }
    componentDidMount() {
        // disable GA if cookie is present
        if (document.cookie.indexOf(disableStr + "=true") > -1) {
            this.gaOptOut();
        }
    }
    render() {
        return (
            <div className="footer">
                <span>
                    Made with ❤️ by
                    <OutboundLink eventLabel="http://marcopixel.eu/" to="http://marcopixel.eu/" target="_blank">
                        {" "}
                        @marcopixel
                    </OutboundLink>
                    ,
                    <OutboundLink
                        eventLabel="https://twitter.com/sniperdt"
                        to="https://twitter.com/sniperdt"
                        target="_blank"
                    >
                        {" "}
                        @dtSniper
                    </OutboundLink>{" "}
                    &
                    <OutboundLink
                        eventLabel="https://twitter.com/joeyfjj"
                        to="https://twitter.com/joeyfjj"
                        target="_blank"
                    >
                        {" "}
                        @joeyfjj
                    </OutboundLink>
                </span>
                <div className="footer__legal">
                    <span>
                        r6-operatoricons licensed under{" "}
                        <OutboundLink
                            eventLabel="https://creativecommons.org/licenses/by/4.0/"
                            to="https://creativecommons.org/licenses/by/4.0/"
                            target="_blank"
                        >
                            Creative Commons Attribution 4.0
                        </OutboundLink>
                    </span>
                    <span>
                        This site is not affiliated with Ubisoft Entertainment. Rainbow Six Siege is a registered
                        trademark of Ubisoft.
                    </span>
                    <span>
                        This website uses anonymized Google Analytics to analyse traffic & improve our user experience
                        in the future.
                    </span>
                    {this.state.isOptOut ? (
                        <span>You already have opt-out of analytics.</span>
                    ) : (
                        <span>
                            You can opt-out by clicking <a onClick={e => this.gaOptOut()}>here</a>.
                        </span>
                    )}
                </div>
            </div>
        );
    }
}