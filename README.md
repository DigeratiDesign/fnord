# FNORD

A collection of ES6 classes for Webflow.

* [Form Validation](#form-validation)
* [Page Transitions](#page-transitions)
* [Utilities](#utitlies)

# Page Transitions

ES6 Page Transition class for Webflow.

* [Style Guide](#page-transitions-style-guide)
* [Installation](#page-transitions-installation)

<a id="page-transitions-style-guide"></a>
## Style Guide

Ensure you've copied the **Digerati Page Transition Style Guide** into the **Finsweet Style Guide** from the **Cloneable**.

<a id="page-transitions-installation"></a>
## Installation

Add the following to the **Header Code** section of either a given page or **Project Settings** > **Custom Code**:

```htm
<script defer src="https://page-transitions.fnord.digerati.design/digerati.page-transitions.js"></script>
```

Add the following to the corresponding **Footer Code** section:

```htm
<script>
document.addEventListener('DOMContentLoaded', () => {
    const pageTransitions = new DigeratiPageTransitions;
    pageTransitions.init();
});
</script>
```
