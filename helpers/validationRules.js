export function isEmailRulePassed(elementValue) {
  return elementValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(elementValue)
}

export function isRequiredRulePassed(elementValue) {
  return !!elementValue
}

export function min(value, limit) {
  if (typeof value !== 'number') {
    return false
  }

  return value > limit
}

export function max(value, limit) {
  if (typeof value !== 'number') {
    return false
  }

  return value < limit
}

export function minLength(value, length) {
  return value.length > length
}

export function minOrEqual(value, limit) {
  if (typeof value !== 'number') {
    return false
  }

  return value >= limit
}

export function maxLength(value, length) {
  return value.length < length
}

export function maxOrEqual(value, limit) {
  if (typeof value !== 'number') {
    return false
  }

  return value <= limit
}
