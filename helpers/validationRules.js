export function isEmailRulePassed(elementValue) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(elementValue)
}

export function isRequiredRulePassed(elementValue) {
  return !!elementValue
}

export function minLength(value, length) {
  return value.length > length
}

export function maxLength(value, length) {
  return value.length < length
}
