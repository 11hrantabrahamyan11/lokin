import React from "react";
import "./Footer.less";

import { ReactComponent as Logo } from "../../icons/logo.svg";
import { ReactComponent as Settings } from "../../icons/settings.svg";

const Footer = () => (
  <footer>
    <div className="container footer">
      <div className="footer_content">
        <Logo />
        <p>© Lookin, 2020</p>
      </div>
      <div className="footer_content">
        <Settings />
        <p>Техническая поддержка</p>
      </div>
    </div>
  </footer>
);

export default Footer;
