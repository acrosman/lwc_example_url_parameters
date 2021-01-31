import { LightningElement, wire, track } from "lwc";
import { CurrentPageReference } from "lightning/navigation";

export default class Parameter_reader extends LightningElement {
  @track displayValue;

  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    if (currentPageReference) {
      const urlValue = currentPageReference.state.c__myUrlParameter;
      if (urlValue) {
        this.displayValue = `URL Value was: ${urlValue}`;
        // You can use an imported APEX as a promise here to the values further in:
        // myWiredFunction({parameter: urlValue})
        //  .then((result) => { // update tracked values.})
        //  .catch((error) => { // Error handler. });
      } else {
        this.displayValue = `URL Value was not set`;
      }
    }
  }
}
