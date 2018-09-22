import React from 'react';

export class Footer extends React.Component {
  render() {
    return (
      <section id="footer">
          <div className="inner">
              <ul className="copyright">
                  <li>&copy; SecuriShare. All rights reserved.</li>
                  <li>Images: <a href="http://unsplash.com">Unsplash</a></li>
                  <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
              </ul>
          </div>
      </section>
      );
  }
}
