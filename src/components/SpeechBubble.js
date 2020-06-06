import React from 'react';

class SpeechBubble extends React.Component {
  render() {
    return (
      <div className="speechBubble">
        <div className="bubbleTitle">AU - Simple Checkout Form</div>
        <div className="bubbleDescription">
          This widget shows the basic use case example of the Address Finder API. When you enter an Address and it will
          autofill parts of the address into their respective input fields. Address Line 1, Address Line 2, Suburb,
          State and Postcode. Try it out!
        </div>
      </div>
    );
  }
}

export default SpeechBubble;
