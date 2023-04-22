# FNORD

A collection of ES6 classes for Webflow.

* [Form Validation](#form-validation)
* [Page Transitions](#page-transitions)
* [Utilities](#utitlies)

## Form Validation

ES6 Form Validation class for Webflow with support for `Finsweet Custom Select Attribute`.

* [Style Guide](#form-validation-style-guide)
* [Installation](#form-validation-installation)
* [Configuration](#form-validation-configuration)
* [To do](#form-validation-to-do)

### Style Guide
<a id="form-validation-style-guide"></a>

Ensure you've copied the **Digerati Form Validation Style Guide** into the **Finsweet Style Guide** from the **Cloneable**.

### Installation
<a id="form-validation-installation"></a>

Add the following to the **Header Code** section of either a given page or **Project Settings** > **Custom Code**:

```htm
<script defer src="https://form-validation.fnord.digerati.design/digerati.form-validation.js"></script>
```

Add the following to the corresponding **Footer Code** section:

```htm
<script>
document.addEventListener('DOMContentLoaded', () => {
    const formValidator = new DigeratiFormValidator;
    formValidator.init();
});
</script>
```

### Configuration
<a id="form-validation-configuration"></a>

1. Set the `required` attribute for each field that should be required.
2. Add `digerati-error-messages` attribute to each field that requires validation (and any email fields which don't require validation) with rules written as pipe separated rules, with colon delimited rule type / message (inspired by Laravel form validation syntax https://laravel.com/docs/10.x/validation#quick-writing-the-validation-logic):

```required:Please enter your email address.|email:Please enter a valid email address.```

> **NB**: Email validation will automatically be enabled regardless or whether or not it's a required field.

## Page Transitions

ES6 Page Transition class for Webflow.

* [Style Guide](#page-transitions-style-guide)
* [Installation](#page-transitions-installation)

<a id="page-transitions-style-guide"></a>
### Style Guide

Ensure you've copied the **Digerati Page Transition Style Guide** into the **Finsweet Style Guide** from the **Cloneable**.

<a id="page-transitions-installation"></a>
### Installation

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

## Utilties

ES6 Utilities class for Webflow.

* [Installation](#utilities-installation)
* [DisplayCopyrightYear](#utilities-display-copyright-year)
* [Compile Email Addresses](#utilities-compile-email-addresses)
* [Focus Search Form Field](#utilities-focus-search-form-field)
* [Skip to Main Content](#utilities-skip-to-main-content)

### Installation
<a id="utilities-installation"></a>

Add the following to the **Header Code** section of either a given page or **Project Settings** > **Custom Code**:

```htm
<script defer src="https://page-transitions.fnord.digerati.design/digerati.page-transitions.js"></script>
```

Add the following to the corresponding **Footer Code** section:

```htm
<script>
document.addEventListener('DOMContentLoaded', () => {
    const utilities = new DigeratiUtilities;
    utilities.init();
});
</script>
```

### Display Copyright Year
<a id="utilities-display-copyright-year"></a>

_Coming soon..._

### Compile Email Addresses
<a id="utilties-compile-email-addresses"></a>

_Coming soon..._

### Focus Search Form Field
<a id="utilities-focus-search-form-field"></a>

_Coming soon..._

### Skip to Main Content
<a id="utilities-skip-to-main-content"></a>

_Coming soon..._
