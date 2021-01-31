import { LightningElement, wire, track } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import reflectValue from "@salesforce/apex/valueReflection.reflectValue";

export default class Parameter_reader extends LightningElement {
  @track displayValue;

  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    if (currentPageReference) {
      const urlValue = currentPageReference.state.c__myUrlParameter;
      if (urlValue) {
        reflectValue({ value: urlValue })
          .then((result) => {
            this.displayValue = `URL Value was: ${result}`;
          })
          .catch((error) => {
            this.displayValue = `Error during processing: ${error}`;
          });
      } else {
        this.displayValue = `URL Value was not set`;
      }
    }
  }
}
