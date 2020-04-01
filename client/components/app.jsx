import React, { Component } from 'react';
import Header from './layout/Header';

export default class TipCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipPercentage: {
        '15%': 0.15,
        '16%': 0.16,
        '17%': 0.17,
        '18%': 0.18,
        '19%': 0.19,
        '20%': 0.20,
      },
      tipSelected: null,
      checkTotal: '',
      checkTotalSet: false,
      tipTotal: null,
      grandTotal: null,
    };
    this.onTotalCostChange = this.onTotalCostChange.bind(this);
    this.onSetClick = this.onSetClick.bind(this);
    this.calculateGrandTotal = this.calculateGrandtotal.bind(this);
    this.handleTipPercentageClick = this.handleTipPercentageClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  onTotalCostChange(e) {
    const name = e.target.name, value = e.target.value;
    this.setState({ [name]: value });
  }

  onSetClick() {
    this.setState({ checkTotalSet: !this.state.checkTotalSet }, () => this.calculateGrandTotal(this.state.tipSelected));
  }

  handleReset() {
    this.setState({ checkTotalSet: !this.state.checkTotalSet, tipTotal: null, grandTotal: null, checkTotal: '', tipSelected: null })
  }

  handleTipPercentageClick(e) {
    const tipSelected = e.target.value;
    this.setState({ tipSelected }, () => this.calculateGrandtotal(tipSelected));
  }

  calculateGrandtotal(tip) {
    const { checkTotal, checkTotalSet, tipPercentage } = this.state;
    console.log(tip);
    if (checkTotal && checkTotalSet) {
      for (const key in tipPercentage) {
        if (key === tip) {
          const tipTotal = (tipPercentage[key] * checkTotal).toFixed(2);
          const grandTotal = parseFloat(tipTotal) + parseFloat(checkTotal);
          console.log(tipTotal);
          this.setState({ tipTotal, grandTotal });
        }
      }
    } else {
      return;
    }
  }

  render() {
    const { tipPercentage, checkTotal, checkTotalSet, tipTotal, grandTotal, tipSelected } = this.state;
    return (
      <>
        <Header title="TIP CALCULATOR" />
        <main className="calculator-container container">
          <section className="row">
            <div className="col-12 d-flex">
              CHECK TOTAL: {checkTotalSet ? <i style={{ marginLeft: '0.5em' }}>${checkTotal}</i> : null}
            </div>
            <div className="col d-flex">
              {checkTotalSet ? <input disabled value={checkTotal} /> : <input placeholder="$" onChange={this.onTotalCostChange} type="text" name="checkTotal" value={checkTotal} />}
              {checkTotalSet ? <button onClick={this.handleReset}>RESET</button> : <button onClick={this.onSetClick}>SET</button>}
            </div>
          </section>
          <section className="row tip-percentages">
            <div className="col d-flex">
              SELECT TIP PERCENTAGE: {tipSelected ? <i style={{ marginLeft: '0.5em' }}>{tipSelected}</i> : null}
            </div>
          </section>
          <section className="row">
            {Object.entries(tipPercentage).map((val, i) => {
              return (
                <div className={`col-2 d-flex justify-content-center`} key={i}>
                  <button onClick={this.handleTipPercentageClick} value={val[0]} className="btn btn-outline-dark tip-btn">{val[0]}</button>
                </div>
              );
            })}
          </section>
          <section className="row tip-cost">
            <div className="col d-flex">
              TIP: {tipTotal ? <strong className="tip-total-cost">${tipTotal}</strong> : null}
            </div>
          </section>
          <section className="row grand-total">
            <div className="col d-flex">
              GRAND TOTAL: {grandTotal ? <strong className="grand-total-cost">${grandTotal}</strong> : null}
            </div>
          </section>
        </main>
      </>
    );
  }
}
