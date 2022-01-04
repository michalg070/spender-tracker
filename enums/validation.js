export const errorMessages = (rule, fieldName = null) => {
  switch (rule) {
    case rules.REQUIRED: {
      return `${fieldName || 'field'} is required.`
    }
  }

  return message
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
