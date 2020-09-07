/**
 * Create damedane's instance.
 *
 * @param {HTMLFormElement} $form Form element.
 * @param {Object} options Used as configuration.
 * @param {Object} options.values Initial values.
 * @param {Function[]} options.rules Rules used to validate values.
 */
const damedane = ($form, options = {}) => {
  const isValidElement = $form instanceof HTMLFormElement

  if (!isValidElement) {
    throw new Error('Passed element is not a valid HTML Form element.')
  }

  // Values of form inputs.
  const values = options.values ? { ...options.values } : {}

  // Rules used to validate values.
  const rules = options.rules ? [...options.rules] : []

  // Rules that errors
  let errors = []

  /**
   * Set default values to form inputs.
   */
  const initialize = () => {
    Object.entries(values).forEach(([key, value]) => {
      const $input = $form.querySelector(`[name=${key}]`)

      $input.value = value
    })
  }

  /**
   * Validate a value based on defined rules.
   */
  const validate = (name) => {
    errors = rules
      .map(rule => rule(values))
      .filter(rule => rule.isError)

    const rule = errors.find(rule => rule.name === name)
    const $message = $form.querySelector(`[data-error=${name}]`)

    if ($message) {
      $message.textContent = rule ? rule.message : ''
    }
  }

  /**
   * Listen everytime user change input values and prevent submit if has errors.
   */
  const listen = () => {
    const inputNames = Object.keys(values)

    inputNames.forEach(name => {
      const $input = $form.querySelector(`[name=${name}]`)

      if ($input) {
        $input.addEventListener('input', (event) => {
          values[name] = event.target.value

          validate(name)
        })
      }
    })

    $form.addEventListener('submit', (event) => {
      inputNames.forEach(validate)

      const hasError = !!errors.length

      if (hasError) {
        event.preventDefault()
      }
    })
  }

  initialize()
  listen()
}

export default damedane
