export const errorMessages = (rule, ruleParameter = null) => {
  switch (rule) {
    case rules.REQUIRED: {
      return `Field is required.`
    }
    case rules.EMAIL: {
      return `Please provide correct email address.`
    }
    case rules.MIN: {
      return `Minimum value is ${ruleParameter + 1 || null}.`
    }
    case rules.MAX: {
      return `Max value is ${ruleParameter - 1 || null}.`
    }
    case rules.MIN_LENGTH: {
      return `Field must have at least ${ruleParameter || null} characters.`
    }
    case rules.MIN_OR_EQUAL: {
      return `Please provide value equal or greater than ${
        ruleParameter || null
      }.`
    }
    case rules.MAX_LENGTH: {
      return `Field must have no more than ${ruleParameter || null} characters.`
    }
    case rules.MAX_OR_EQUAL: {
      return `Please provide value equal or lower than ${
        ruleParameter || null
      }.`
    }
    default: {
      return 'Field is invalid'
    }
  }
}

export const rules = {
  REQUIRED: 'required',
  EMAIL: 'email',
  MIN: 'min',
  MAX: 'max',
  MIN_LENGTH: 'min_length',
  MIN_OR_EQUAL: 'min_or_equal',
  MAX_LENGTH: 'max_length',
  MAX_OR_EQUAL: 'max_or_equal',
  NUMBER: 'number',
}

export const validationEvents = {
  BLUR: 'blur',
  CHANGE: 'change',
  INPUT: 'input',
}
