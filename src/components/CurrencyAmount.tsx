import React from "react";
import { IonText } from "@ionic/react";
import { CurrencyAmountProps } from "../model/ComponentProps";
import { isLoaded } from "react-redux-firebase";


const CurrencyAmount: React.FC<CurrencyAmountProps> = ({ amount }) => {

  const format = (num: any, minDecimals: number, maxDecimals: number) => num.toLocaleString('en-US', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });

  var localAmount: any = 0.00
  var currency: any = "$"

  if (isLoaded(amount)) {
    if (amount && amount !== undefined) {
      localAmount = format(amount,2, 2);
      // if(localAmount % 1> 0){
      //   localAmount = format(localAmount,0, 2);
      // }
    } 
    // else {
    //   localAmount = amount;
    // }
  }

  return (
    <IonText>{currency + " " + localAmount}</IonText>
  );
};

export default CurrencyAmount;
