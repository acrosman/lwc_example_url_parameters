# Example Lightning Web Componant that reads URL parameters

This project assumes you have completed the [Trailhead project for a Hello World Lightning Web Componant](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/create-a-hello-world-lightning-web-component), or have equivolent skills (basically I'm not reviewing how to setup your environment, connect to the org, or deploy code).

A step-by-step explination is available on my blog: https://spinningcode.org/2021/01/salesforce-lightning-web-components-with-url-parameters/

1. `sfdx force:lightning:component:create --type lwc -n parameter_reader` or use VSCode extension to generated LWC. Optionally run `npm install` to get all the various JS linting and testing defaults recommended by Salesforce.
2. Update generated meta.xml file to match this one's
3. To the start of the LWC's JS file add:

```js
import { LightningElement, wire, track } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
```

4. Setup the tracked value for the display at the top of the JS class: `@track displayValue;`
5. Wire up the CurrentPageReference to get the value from the URL.

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

6. Update the HTML to display the value:

```html
<template>
  <div>
    <lightning-card title="Url Sample" icon-name="custom:custom14">
      <div class="slds-m-around_medium">
        <p>{displayValue}</p>
      </div>
    </lightning-card>
  </div>
</template>
```

7. Deploy your code to your org.
8. Go to a contact record, and edit the page. Add your new compantent to the side bar. Save and activate the page.
9. Return to the record page, the component should appear and say `URL Value was not set`.
10. In the address bar add to the end of the url: `?c__myUrlParameter=Hello`, and reload the page, the compantant should now read `URL Value was Hello`.

# Add APEX callback.

1. Create an APEX class called `valueReflection` with this function:

```Java
  @AuraEnabled(cacheable=true)
  public static String reflectValue(String value) {
      // Really you should do something useful here.
      return value;
  }
```

2. Create appropreiate tests, and deploy the code.
3. Import the new APEX into your JavaScipt file: `import reflectValue from "@salesforce/apex/valueReflection.reflectValue";`
4. Update the getStateParameters handler to call the new function as a promise:

```JS
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
```

5. Deploy the changes, and reload your example page.
