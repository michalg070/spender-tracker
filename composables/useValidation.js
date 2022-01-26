import Vue from 'vue'
import { onMounted, reactive, computed } from '@nuxtjs/composition-api'
import { rules, errorMessages } from '@/enums/validation'
import {
  isEmailRulePassed,
  isRequiredRulePassed,
  maxLength,
  minLength,
  min,
  max,
  minOrEqual,
  maxOrEqual,
} from '@/helpers/validationRules'

export default function useValidation(validationSchema, formRef) {
  const form = formRef
  const formElements = []
  const validation = reactive({})

  const isValidate = computed(() => {
    const elementsValidationResults = []

    for (const schemaElement in validation) {
      elementsValidationResults.push(validation[schemaElement].isValidated)
    }

    return elementsValidationResults.every(
      (validationResult) => validationResult
    )
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
          (rule.errorMessage ||
            errorMessages(rule.ruleName, rule.ruleParameter)) +
          '<br/>'
      }
    }

    return errorMessage
  }

  function composeValidation() {
    for (const schemaElement in validationSchema) {
      if (!validationSchema[schemaElement].events) {
        console.error(`You must provide events array to ${schemaElement} field`)

        continue
      }

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

    return isNaN(formElement.value)
      ? formElement.value
      : parseFloat(formElement.value)
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

  function validateForm() {
    formElements.forEach((formElement) => {
      const formElementName = formElement.getAttribute('name')

      if (!validation[formElementName]) {
        return
      }

      validateElement(formElementName, validation[formElementName].rules)
    })
  }

  function validationRuleResolver(schemaElement, rule) {
    if (!rule) {
      return
    }

    const foundSchemaElementRule = schemaElement.rules.find((schemaRule) => {
      return schemaRule.ruleName === rule
    })

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
      case rules.MIN: {
        foundSchemaElementRule.isRulePassed = min(
          schemaElement.value,
          foundSchemaElementRule.ruleParameter
        )

        break
      }
      case rules.MAX: {
        foundSchemaElementRule.isRulePassed = max(
          schemaElement.value,
          foundSchemaElementRule.ruleParameter
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
      case rules.MIN_OR_EQUAL: {
        foundSchemaElementRule.isRulePassed = minOrEqual(
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
      case rules.MAX_OR_EQUAL: {
        foundSchemaElementRule.isRulePassed = maxOrEqual(
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
    validateForm,
    validation,
  }
}
