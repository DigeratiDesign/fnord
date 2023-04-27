'use strict';

/**
 * DIGERATI Form Validation.
 * 
 * @author Digerati <cabal@digerati.design>
 */
class DigeratiFormValidation {

    /**
     * Create a New Instance.
     *
     * @return {void} 
     */
    constructor() {
        this.displayValidationErrorMessage = this.displayValidationErrorMessage.bind(this);
        this.getErrorElements = this.getErrorElements.bind(this);
        this.getErrorMessages = this.getErrorMessages.bind(this);
        this.getFormFieldType = this.getFormFieldType.bind(this);
        this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
        this.triggerFormFieldValidation = this.triggerFormFieldValidation.bind(this);
        this.validateEmailField = this.validateEmailField.bind(this);
        this.validateMaxField = this.validateMaxField.bind(this);
        this.validateMinField = this.validateMinField.bind(this);
        this.validatePasswordField = this.validatePasswordField.bind(this);
        this.validatePatternField = this.validatePatternField.bind(this);
        this.validateFormField = this.validateFormField.bind(this);
        this.validateRequiredField = this.validateRequiredField.bind(this);

        this.init = this.init.bind(this);
    }

    /**
     * Display Validation Error Message.
     *
     * @param  {HTMLElement} formField    
     * @param  {string} errorMessage 
     *
     * @return {void}             
     */
    displayValidationErrorMessage(formField, errorMessage) {
        const formFieldType = this.getFormFieldType(formField),
            errorElements = this.getErrorElements(formField, formFieldType);
        errorElements.message.innerHTML = errorMessage;
        errorElements.message.style.display = 'block';
        errorElements.border.classList.add('is-invalid');
    }

    /**
     * Get Error Elements.
     *
     * @param  {HTMLElement} formField     
     * @param  {string} formFieldType 
     *
     * @return {Object}             
     */
    getErrorElements(formField, formFieldType) {
        let errorElements = {};
        if (formFieldType !== 'select') {
            errorElements.border = formField;
            errorElements.message = formField.nextElementSibling;
        } else {
            errorElements.border = formField.parentElement.previousElementSibling;
            errorElements.message = formField.parentElement.parentElement.nextElementSibling;
        }
        return errorElements;
    }

    /**
     * Get Error Messages.
     *
     * @param  {HTMLElement} formField 
     *
     * @return {Object}         
     */
    getErrorMessages(formField) {
        const errorMessages = {},
            formFieldErrorMessagesAttr = formField.getAttribute('digerati-error-messages');
        if (formFieldErrorMessagesAttr !== null) {
          for (let errorMessage of Object.entries(formFieldErrorMessagesAttr.split('|'))) {
              let [key, value] = errorMessage[1].split(':');
              errorMessages[key] = value;
          }
        }
        return errorMessages;
    }

    /**
     * Get Form Field Type.
     *
     * @param  {HTMLElement} formField 
     *
     * @return {string}           
     */
    getFormFieldType(formField) {
        let formFieldType = formField.getAttribute('type') || formField.tagName.toLowerCase();
        return formFieldType;
    }

    /**
     * Handle Subit Event.
     *
     * @param  {event} e 
     *
     * @return {void}   
     */
    handleSubmitEvent(e) {
        const submitButton = e.target,
            parentForm = submitButton.closest('form');
        e.preventDefault();
        const formFields = parentForm.querySelectorAll('input:not([type="submit"]), textarea, select');
        let formError = false;
        formFields.forEach((formField) => {
            const isValidField = this.validateFormField(formField);
            if (!isValidField) {
                formError = true;
            }
        });
        if (!formError) {
            submitButton.removeEventListener('click', this.handleSubmitEvent);
            submitButton.removeEventListener('touchstart', this.handleSubmitEvent);
            submitButton.click();
        }
    }

    /**
     * Validate Email Field.
     *
     * @param  {HTMLElement} formField     
     * @param  {string} fieldValue    
     * @param  {string} errorMessages 
     *
     * @return {boolean}               
     */
    validateEmailField(formField, fieldValue, errorMessages) {
        let isValidField = true;
        if(fieldValue.length > 0) {
            isValidField = fieldValue.indexOf('@') !== -1 && fieldValue.indexOf('.') !== -1;
            if (!isValidField) {
                let errorMessage = errorMessages.email === undefined
                    ? '"Email address" error message not defined'
                    : errorMessages.email;
                this.displayValidationErrorMessage(formField, errorMessage);
            }
        }
        return isValidField;
    }

    /**
     * Validate Form Field.
     *
     * @param  {HTMLElement} formField 
     *
     * @return {boolean}           
     */
    validateFormField(formField) {
        let isValidField = true,
            fieldValue = formField.value.trim(),
            errorMessages = this.getErrorMessages(formField);
        /* Validate `required`` field */
        if (formField.getAttribute('required') !== null) {
            isValidField = this.validateRequiredField(formField, fieldValue, errorMessages);
        }
        /* Validate `email` field */
        if (formField.getAttribute('type') === 'email') {
            isValidField = this.validateEmailField(formField, fieldValue, errorMessages);
        }
        /* Validate `min` field */
        if (formField.getAttribute('min') !== null) {
            isValidField = this.validateMinField(formField, fieldValue, errorMessages);
        }
        /* Validate `max` field */
        if (formField.getAttribute('max') !== null) {
            isValidField = this.validateMaxField(formField, fieldValue, errorMessages);
        }
        /* Validate `password` field */
        if (formField.getAttribute('type') === 'password') {
            isValidField = this.validatePasswordField(formField, fieldValue, errorMessages);
        }
        /* Validate `pattern` field */
        if (formField.getAttribute('pattern') !== null) {
            isValidField = this.validatePatternField(formField, fieldValue, errorMessages);
        }
        return isValidField;
    }

    /**
     * Validate Max Field.
     *
     * @param  {HTMLElement} formField     
     * @param  {string} fieldValue    
     * @param  {Object} errorMessages 
     *
     * @return {boolean}               
     */
    validateMaxField(formField, fieldValue, errorMessages) {
        let max = formField.getAttribute('max'),
            isValidField = parseFloat(fieldValue) <= max;
        if (!isValidField) {
            let errorMessage = errorMessages.max === undefined
                ? '"Max" error message not defined'
                : errorMessages.max;
            this.displayValidationErrorMessage(formField, errorMessage);
        }
        return isValidField;
    }

    /**
     * Validate Min Field.
     *
     * @param  {HTMLElement} formField     
     * @param  {string} fieldValue    
     * @param  {Object} errorMessages 
     *
     * @return {boolean}               
     */
    validateMinField(formField, fieldValue, errorMessages) {
        let min = formField.getAttribute('min'),
            isValidField = parseFloat(fieldValue) >= min;
        if (!isValidField) {
            let errorMessage = errorMessages.min === undefined
                ? '"Min" error message not defined'
                : errorMessages.min;
            this.displayValidationErrorMessage(formField, errorMessage);
        }
        return isValidField;
    }

    /**
     * Validate Password Field.
     *
     * @param  {HTMLElement} formField     
     * @param  {string} fieldValue    
     * @param  {Object} errorMessages 
     *
     * @return {boolean}               
     */
    validatePasswordField(formField, fieldValue, errorMessages) {
        let isValidField = this.validatePatternField(formField, fieldValue, errorMessages);
        return isValidField;
    }
    
    /**
     * Validate Pattern Field.
     *
     * @param  {HTMLElement} formField     
     * @param  {string} fieldValue    
     * @param  {Object} errorMessages 
     *
     * @return {boolean}               
     */
    validatePatternField(formField, fieldValue, errorMessages) {
        let pattern = formField.getAttribute('pattern'),
            isValidField = pattern.test(formValue);
        if (!isValidField) {
            let errorMessage = errorMessages.pattern === undefined
                ? '"Pattern" error message not defined'
                : errorMessages.pattern;
            this.displayValidationErrorMessage(formField, errorMessage);
        }
        return isValidField;
    }

    /**
     * Validate Required Field.
     *
     * @param  {HTMLElement} formField     
     * @param  {string} fieldValue    
     * @param  {object} errorMessages 
     *
     * @return {boolean}               
     */
    validateRequiredField(formField, fieldValue, errorMessages) {
        let isValidField = fieldValue.length !== 0;
        if (!isValidField) {
            let errorMessage = errorMessages.required === undefined
                ? '"Required" error message not defined'
                : errorMessages.required;
            this.displayValidationErrorMessage(formField, errorMessage);
        }
        return isValidField;
    }

    /**
     * Trigger Form Validation.
     *
     * @param  {HTMLElement} formField 
     *
     * @return {void}           
     */
    triggerFormFieldValidation(formField) {
        const isValidField = this.validateFormField(formField);
        if (isValidField) {
            const formFieldType = this.getFormFieldType(formField),
                errorElements = this.getErrorElements(formField, formFieldType);
            errorElements.message.innerHTML = '';
            errorElements.message.style.display = '';
            errorElements.border.classList.remove('is-invalid');
        }
    }

    /**
     * Initialise.
     *
     * @return {void} 
     */
    init() {
        const forms = document.querySelectorAll('form');
        forms.forEach((form) => {
            if(!form.getAttribute('novalidate')) {
                /* Submit Button Event Listeners */
                const submitButtons = form.querySelectorAll('input[type=submit]');
                submitButtons.forEach((submitButton) => {
                    submitButton.addEventListener('click', this.handleSubmitEvent);
                    submitButton.addEventListener('touchstart', this.handleSubmitEvent);
                });
                /* Input and Textarea Field Event Listeners */
                const inputAndTextareaFields = form.querySelectorAll('input:not([type="submit"]), textarea');
                inputAndTextareaFields.forEach((formField) => {
                    formField.addEventListener('focus', () => {
                        formField.removeEventListener('blur', this.triggerFormFieldValidation);
                        formField.removeEventListener('keyup', this.triggerFormFieldValidation);
                        formField.addEventListener('blur', () => {
                            this.triggerFormFieldValidation(formField);
                        });
                        formField.addEventListener('keyup', () => {
                            this.triggerFormFieldValidation(formField)
                        });
                    });
                });
                /* Finsweet Custom Select Event Listeners */
                const selectFields = form.querySelectorAll('select');
                selectFields.forEach((formField) => {
                    formField.addEventListener('change', () => {
                        this.triggerFormFieldValidation(formField);
                    });
                });
                /* Form Field Event Listeners */
                const formFields = form.querySelectorAll('input, textarea');
                formFields.forEach((formField) => {
                    formField.addEventListener('keypress', (e) => {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            const parentForm = formField.closest('form'),
                                submitButton = parentForm.querySelector('input[type="submit"]');
                            formField.dispatchEvent(new Event('change'));
                            submitButton.dispatchEvent(new Event('click'));
                        }
                    });
                });
            }
        });
    }
}
