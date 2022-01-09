export const errorMessages = (rule, ruleParameter = null) => {
  switch (rule) {
    case rules.REQUIRED: {
      return `Field is required.`
    }
    case rules.EMAIL: {
      return `Please provide correct email address.`
    }
    case rules.MIN_LENGTH: {
      return `Field must have at least ${ruleParameter || null} characters.`
    }
    case rules.MAX_LENGTH: {
      return `Field must have no more than ${ruleParameter || null} characters.`
    }
    default: {
      return 'Field is invalid'
    }
  }
}

export const rules = {
  REQUIRED: 'required',
  EMAIL: 'email',
  MIN_LENGTH: 'min_length',
  MAX_LENGTH: 'max_length',
  NUMBER: 'number',
}

export const validationEvents = {
  BLUR: 'blur',
  CHANGE: 'change',
  INPUT: 'input',
}
