import * as React from "react";

import "./footer.scss";

export default class Footer extends React.Component<any> {
    render() {
        return (
            <div className="footer">
                <span>Made with ❤️ by <a href="http://marcopixel.eu/">@marcopixel</a>, <a href="https://twitter.com/sniperdt">@dtSniper</a> & <a href="https://twitter.com/joeyfjj">@joeyfjj</a></span>
                <div className="footer__legal">
                    <span>r6-operatoricons licensed under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0</a></span>
                    <span>This site is not affiliated with Ubisoft Entertainment. Rainbow Six Siege is a registered trademark of Ubisoft.</span>
                    <span>This website uses anonymized Google Analytics to analyse traffic & improve our user experience in the future. <br/> You can opt-out by clicking <a href="javascript:gaOptout();">here</a>.</span>
                </div>
            </div>
        );
    }
}