import { onMounted, reactive } from '@nuxtjs/composition-api'
import { rules, errorMessages } from '@/enums/validation'

export default function useValidation(validationSchema, formRef) {
  const form = formRef
  const formElements = []
  const validation = reactive({ ...validationSchema })

  function bindEventListeners() {
    formElements.forEach((formElement) => {
      const formElementName = formElement.getAttribute('name')

      if (!validation[formElementName]) {
        return
      }

      validation[formElementName].events.forEach((event) => {
        formElement.addEventListener(event, () => {
          validate(formElementName, validation[formElementName].rules)
        })
      })
    })
  }

  function composeErrorMessage(schemaElement, rule) {
    // TOOD: handle multiple error messages
    // TODO: handle custom error messages
    if (schemaElement.isValidated) {
      schemaElement.error = null

      return
    }

    switch (rule) {
      case rules.REQUIRED: {
        schemaElement.error = errorMessages(rules.REQUIRED)

        break
      }
    }
  }

  function composeValidation() {
    for (const schemaElement in validation) {
      validation[schemaElement] = {
        ...validation[schemaElement],
        isValidated: true,
        error: null,
        value: '',
        name: schemaElement,
      }
    }
  }

  function getFormElements() {
    for (const element in validationSchema) {
      const foundElement = form.value.querySelector(`input[name=${element}]`)

      if (!foundElement) {
        return
      }

      formElements.push(foundElement)
    }
  }

  function setFormElementValue(formElementName) {
    const formElement = formElements.find(
      (el) => el.getAttribute('name') === formElementName
    )

    if (!formElement) {
      validation[formElementName].value = ''

      return
    }

    validation[formElementName].value = formElement.value
  }

  function validate(formElementName, elementRules) {
    const schemaElement = validation[formElementName]
    setFormElementValue(formElementName)

    // TODO: handle email, min/max length, sameAs, and custom validations (for example more than x less than y)
    if (elementRules.includes(rules.REQUIRED)) {
      schemaElement.isValidated = validateRequiredRule(schemaElement)
      composeErrorMessage(schemaElement, rules.REQUIRED)
    }
  }

  function validateRequiredRule(schemaElement) {
    return !!schemaElement.value
  }

  onMounted(() => {
    composeValidation()
    getFormElements()
    bindEventListeners()
  })

  return {
    validate,
    validation,
  }
}
