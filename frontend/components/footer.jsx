import React from "react";
import { Route } from "react-router-dom";

const Footer = () => {

    return (
            <footer className="browse-footer">
              <aside className="footer-stuff">
                <p>
                  Questions? Call <a href="#">1-867-5309</a>
                </p>

                <ul>
                  <li key="1">
                    <a href="https://github.com/sswoodruff89">GitHub</a>
                  </li>
                  <li key="2">
                    <a href="https://www.linkedin.com/in/seanswoodruff/">
                      LinkedIn
                    </a>
                  </li>
                  <li key="3">
                    <a href="https://sswoodruff89.github.io/">Portfolio</a>
                  </li>
                </ul>
              </aside>
            </footer>
    );

}

export default Footer;