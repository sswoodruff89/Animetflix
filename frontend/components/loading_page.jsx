import React from "react";


const LoadingPage = (props) => {

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


};

export default LoadingPage;