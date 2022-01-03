import { onMounted, reactive } from '@nuxtjs/composition-api'
import { rules } from '@/enums/validation'

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

  function composeValidation() {
    for (const schemaElement in validation) {
      validation[schemaElement] = {
        ...validation[schemaElement],
        isValidated: true,
        error: null,
        value: '',
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
    setFormElementValue(formElementName)

    if (elementRules.includes(rules.REQUIRED)) {
      // TODO: make it smoother
      validation[formElementName].isValidated =
        validationRequired(formElementName)

      // TODO: create error creator function
      // TODO: create error messages enum
      if (!validation[formElementName].isValidated) {
        validation[formElementName].error = 'field is required'

        return
      }

      validation[formElementName].error = null
    }
  }

  function validationRequired(formElementName) {
    return !!validation[formElementName].value
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
