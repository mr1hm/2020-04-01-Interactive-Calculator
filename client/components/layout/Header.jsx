import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props;
    return (
      <main className="header-container container-fluid">
        <section className="row">
          <div className="col d-flex justify-content-center">
            <h5>{title}</h5>
          </div>
        </section>
      </main>
    );
  }
}
