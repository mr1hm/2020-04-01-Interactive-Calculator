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
      fateDecides: false,
    };
    this.onTotalCostChange = this.onTotalCostChange.bind(this);
    this.onSetClick = this.onSetClick.bind(this);
    this.calculateGrandTotal = this.calculateGrandtotal.bind(this);
    this.handleTipPercentageClick = this.handleTipPercentageClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.letFateDecide = this.letFateDecide.bind(this);
  }

  onTotalCostChange(e) {
    const name = e.target.name, value = e.target.value;
    this.setState({ [name]: value });
  }

  onSetClick() {
    this.setState({ checkTotalSet: !this.state.checkTotalSet }, () => {
      if (this.state.fateDecides) {
        const tipArr = this.state.tipSelected.split('');
        tipArr.pop();
        const tip = '0.' + tipArr.join();
        this.calculateGrandTotal(tip)
      }
      else this.calculateGrandTotal(this.state.tipSelected)
    })
  }

  handleReset() {
    this.setState({ checkTotalSet: !this.state.checkTotalSet, tipTotal: null, grandTotal: null, checkTotal: '', tipSelected: null, fateDecides: false })
  }

  handleTipPercentageClick(e) {
    if (this.state.fateDecides) {
      const randomTip = Math.round(Math.random() * (40 - 15) + 15);
      const percentage = '0.' + randomTip;
      const tipSelected = percentage.split('.')[1] + '%';
      this.setState({ tipSelected }, () => this.calculateGrandTotal(percentage))
    } else {
      const tipSelected = e.target.value;
      this.setState({ tipSelected }, () => this.calculateGrandtotal(tipSelected));
    }
  }

  letFateDecide(e) {
    this.setState({ fateDecides: true }, () => this.handleTipPercentageClick())
  }

  calculateGrandtotal(tip) {
    const { checkTotal, checkTotalSet, tipPercentage, fateDecides } = this.state;
    if (!fateDecides) {
      for (const key in tipPercentage) {
        if (key === tip) {
          const tipTotal = (tipPercentage[key] * checkTotal).toFixed(2);
          const grandTotal = parseFloat(tipTotal) + parseFloat(checkTotal);
          this.setState({ tipTotal, grandTotal });
        }
      }
    } else {
      const tipTotal = (parseFloat(tip) * checkTotal).toFixed(2);
      const grandTotal = (parseFloat(tipTotal) + parseFloat(checkTotal)).toFixed(2);
      this.setState({ tipTotal, grandTotal });
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
          <hr />
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
          <section className="row fate">
            <div className="col d-flex justify-content-center">
              <button onClick={this.letFateDecide} className="btn btn-outline-dark">Let Fate Decide</button>
            </div>
          </section>
          <hr />
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
