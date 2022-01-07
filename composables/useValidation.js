import Vue from 'vue'
import { onMounted, reactive } from '@nuxtjs/composition-api'
import { rules, errorMessages } from '@/enums/validation'

export default function useValidation(validationSchema, formRef) {
  const form = formRef
  const formElements = []
  const validation = reactive({})

  function bindEventListeners() {
    formElements.forEach((formElement) => {
      const formElementName = formElement.getAttribute('name')

      if (!validation[formElementName]) {
        return
      }

      validation[formElementName].events.forEach((event) => {
        formElement.addEventListener(event, () => {
          validateElement(formElementName, validation[formElementName].rules)
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

      case rules.EMAIL: {
        schemaElement.error = errorMessages(rules.EMAIL)

        break
      }
    }
  }

  function composeValidation() {
    for (const schemaElement in validationSchema) {
      Vue.set(validation, schemaElement, {})

      validation[schemaElement] = {
        isValidated: true,
        error: null,
        value: '',
        name: schemaElement,
        events: [...validationSchema[schemaElement].events],
        rules: [],
      }

      for (const rule of validationSchema[schemaElement].rules) {
        if (typeof rule === 'object') {
          validation[schemaElement].rules.push({ ...rule, isRulePassed: true })

          continue
        }

        if (typeof rule === 'string') {
          validation[schemaElement].rules.push({
            ruleName: rule,
            isRulePassed: true,
          })

          continue
        }
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

  function isEmailRulePassed(elementValue) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(elementValue)
  }

  function isRequiredRulePassed(elementValue) {
    return !!elementValue
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

  function validateElement(formElementName, elementRules) {
    console.log(elementRules)
    const schemaElement = validation[formElementName]
    setFormElementValue(formElementName)

    for (const rule of elementRules) {
      validationRuleResolver(schemaElement, rule.ruleName)

      // TODO: improve sequence of error triggers OR display all errors in array (better this way)
      // TODO: isValidated to true only when every isRulePassed passed..
      if (!schemaElement.isValidated) {
        break
      }
    }
  }

  function validationRuleResolver(schemaElement, rule) {
    console.log('dsaasdadads')
    if (!rule) {
      return
    }

    // TODO: handle email, min/max length, sameAs, and custom validations (for example more than x less than y)
    switch (rule) {
      case rules.REQUIRED: {
        schemaElement.isValidated = isRequiredRulePassed(schemaElement.value)
        composeErrorMessage(schemaElement, rules.REQUIRED)

        break
      }

      case rules.EMAIL: {
        schemaElement.isValidated = isEmailRulePassed(schemaElement.value)
        composeErrorMessage(schemaElement, rules.EMAIL)

        break
      }
    }
  }

  composeValidation()

  onMounted(() => {
    getFormElements()
    bindEventListeners()
  })

  return {
    validateElement,
    validation,
  }
}
