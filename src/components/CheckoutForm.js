import React from "react";
import { any } from "prop-types";

let AddressFinder = { Widget: function() {} };

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.widget = null;
    this.widget = {on : null};
    this.address_line_1 = React.createRef();
    this.address_line_2 = React.createRef();
    this.suburb = React.createRef();
    this.state = React.createRef();
    this.postcode = React.createRef();
  }

  componentDidMount() {
    var script = document.createElement("script");
    script.src = "https://api.addressfinder.io/assets/v3/widget.js";
    script.async = true;
    script.onload = this.loadWidget;
    document.body.appendChild(script);
  }

  componentWillUnmount() {
    if (this.widget) {
      this.widget.destroy();
      this.widget = null;
    }
  }

  loadWidget = () => {
    console.log(this.widget);
    this.widget = new AddressFinder.Widget(
      document.getElementById("address_line_1"),
      "ADDRESSFINDER_DEMO_KEY",
      "AU",
      {
        address_params: {
          gnaf: "1"
        },
        empty_content:
          "No addresses were found. This could be a new address, or you may need to check the spelling. Learn more"
      }
    );


    console.log(this.widget);
    // Waiting for support to get back
    this.widget.on("result:select", (fullAddress, metaData) => {
      this.address_line_1.current.value = metaData.address_line_1;
      this.address_line_2.current.value = metaData.address_line_2;
      this.suburb.current.value = metaData.locality_name;
      this.state.current.value = metaData.state_territory;
      this.postcode.current.value = metaData.postcode;
    });
  };

  render() {
    return (
      <form className="formBox" method="get">
        <div className="formTitle">Shipping Address</div>

        <div className="formHeader">Address Line 1</div>
        <input
          type="search"
          id="address_line_1"
          className="formInput"
          placeholder="Search address here..."
          ref={this.address_line_1}
        ></input>

        <div className="formHeader">Address Line 2</div>
        <input className="formInput" ref={this.address_line_2}></input>

        <div className="formHeader">Suburb</div>
        <input className="formInput" ref={this.suburb}></input>

        <div className="formHeader">State</div>
        <input className="formInput" ref={this.state}></input>

        <div className="formHeader">Postcode</div>
        <input className="formInput" ref={this.postcode}></input>

        <input className="btn" type="submit" name="next"></input>
      </form>
    );
  }
}

export default CheckoutForm;
