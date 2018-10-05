import * as React from "react";

import "./footer.scss";

export default class Footer extends React.Component<any> {
    render() {
        return (
            <div className="footer">
                <span>Made with ❤️ by <a href="http://marcopixel.eu/">@marcopixel</a>, <a href="https://twitter.com/sniperdt">@dtSniper</a> & <a href="https://twitter.com/joeyfjj">@joeyfjj</a></span>
                <div className="footer__legal">
                    <span>r6-operatoricons licensed under <a href="https://github.com/MarcoPixel/r6-operatoricons/blob/master/LICENSE.MD">Creative Commons Attribution 4.0</a></span>
                    <span>This site is not affiliated with Ubisoft Entertainment. Rainbow Six Siege is a registered trademark of Ubisoft.</span>
                </div>
            </div>
        );
    }
}