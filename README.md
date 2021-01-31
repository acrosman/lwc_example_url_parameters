# Example Lightning Web Componant that reads URL parameters

To recreate this project from scratch within an existing SFDX project:

1. `sfdx force:lightning:component:create --type lwc -n parameter_reader` or use VSCode extension to generated LWC.
2. Optional: run `npm install` to get all the various JS linting and testing defaults recommended by Salesforce.
3. Update generated meta.xml file to match this one's
4. To the start of the LWC's JS file add:

```js
import { LightningElement, wire, track } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
```

5. Setup the tracked value for the display at the top of the JS class: `@track displayValue;`
6. Wire up the CurrentPageReference to get the value from the URL.

```js
@wire(CurrentPageReference)
getStateParameters(currentPageReference) {
  if (currentPageReference) {
    const urlValue = currentPageReference.state.c__myUrlParameter;
    if (urlValue) {
      this.displayValue = `URL Value was: ${urlValue}`;
    } else {
      this.displayValue = `URL Value was not set`;
    }
  }
}
```
