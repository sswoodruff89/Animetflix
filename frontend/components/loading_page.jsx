import React from "react";


class LoadingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <section className="loading-back">
        <section className="loading">
          {window.miniLogos.map((logo, i) => {
            return (
              <div key={i} className={`loading-squares-${i}`}>
                <div className="loadpic">
                  <img src={logo} alt="load"/>
                </div>
              </div>
            )
          })}
        </section>
      </section>
    );
  }


};

export default LoadingPage;