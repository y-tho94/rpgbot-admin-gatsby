import * as React from "react"
import { Link } from 'gatsby';
import '../styles.css';

// markup
class IndexPage extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <>
        <h1>Main Menu</h1>
        <div id="root" style={{ justifyContent: 'center' }}>
          <main style={{ display: 'flex', alignItems: 'center', flex: 3 }}>
            <div className="grid-container">
              <Link className="grid-button" style={{ backgroundColor: 'cyan' }} to='/players/'>
                <p>Player Manager</p>
              </Link>
              <Link className="grid-button" style={{ backgroundColor: 'crimson' }} to='/monsters/'>
                <p>Monster Lab</p>
              </Link>
              <Link className="grid-button" style={{ backgroundColor: 'yellow', gridColumn: "span 2" }} to='/'>
                <p>Loot Studio</p>
              </Link>
            </div>
          </main>
          <div style={{ flex: 2 }}></div>
        </div>
      </>
    );
  }
}
export default IndexPage;

