import Vue from 'vue'
import { onMounted, reactive, computed } from '@nuxtjs/composition-api'
import { rules, errorMessages } from '@/enums/validation'
import {
  isEmailRulePassed,
  isRequiredRulePassed,
  maxLength,
  minLength,
} from '@/helpers/validationRules'

// TODO: make validateForm function
export default function useValidation(validationSchema, formRef) {
  const form = formRef
  const formElements = []
  const validation = reactive({})

  const isValidate = computed(() => {
    const elementsValidationResults = []

    console.log(validation)

    for (const schemaElement in validation) {
      console.log(validation[schemaElement].isValidated)
      elementsValidationResults.push(validation[schemaElement].isValidated)
    }

    console.log(elementsValidationResults)

    return elementsValidationResults.every(
      (validationResult) => validationResult
    )
    // return true
  })

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

  function composeErrorMessage(schemaElement) {
    if (schemaElement.isValidated) {
      return null
    }

    let errorMessage = ''

    for (const rule of schemaElement.rules) {
      if (!rule.isRulePassed) {
        errorMessage =
          errorMessage +
          '<br/>' +
          (rule.errorMessage ||
            errorMessages(rule.ruleName, rule.ruleParameter))
      }
    }

    return errorMessage
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

  function isElementValidated(schemaElement) {
    return schemaElement.rules.every((rule) => rule.isRulePassed)
  }

  function setFormElementValue(formElementName) {
    const formElement = formElements.find(
      (el) => el.getAttribute('name') === formElementName
    )

    if (!formElement) {
      return ''
    }

    return formElement.value
  }

  function validateElement(formElementName, elementRules) {
    const schemaElement = validation[formElementName]

    schemaElement.value = setFormElementValue(formElementName)

    for (const rule of elementRules) {
      validationRuleResolver(schemaElement, rule.ruleName)
    }

    schemaElement.isValidated = isElementValidated(schemaElement)
    schemaElement.error = composeErrorMessage(schemaElement)
  }

  function validationRuleResolver(schemaElement, rule) {
    if (!rule) {
      return
    }

    const foundSchemaElementRule = schemaElement.rules.find((schemaRule) => {
      return schemaRule.ruleName === rule
    })

    // TODO: numbers
    switch (rule) {
      case rules.REQUIRED: {
        foundSchemaElementRule.isRulePassed = isRequiredRulePassed(
          schemaElement.value
        )

        break
      }
      case rules.EMAIL: {
        foundSchemaElementRule.isRulePassed = isEmailRulePassed(
          schemaElement.value
        )

        break
      }
      case rules.MIN_LENGTH: {
        foundSchemaElementRule.isRulePassed = minLength(
          schemaElement.value,
          foundSchemaElementRule.ruleParameter
        )

        break
      }
      case rules.MAX_LENGTH: {
        foundSchemaElementRule.isRulePassed = maxLength(
          schemaElement.value,
          foundSchemaElementRule.ruleParameter
        )

        break
      }
      // custom rule
      default: {
        if (
          foundSchemaElementRule.customRule &&
          typeof foundSchemaElementRule.customRule === 'function'
        ) {
          foundSchemaElementRule.isRulePassed =
            foundSchemaElementRule.customRule(schemaElement.value)
        }
      }
    }
  }

  composeValidation()

  onMounted(() => {
    getFormElements()
    bindEventListeners()
  })

  return {
    isValidate,
    validateElement,
    validation,
  }
}
