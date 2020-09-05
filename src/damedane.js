/**
 * Create damedane's instance.
 *
 * @param {HTMLFormElement} $form Form element.
 * @param {Object} options Used as configuration.
 * @param {Object} options.values Initial values.
 */
const damedane = ($form, options = {}) => {
  // Values of form inputs
  const values = { ...options.values }

  /**
   * Set default values to form inputs.
   */
  const initialize = () => {
    const inputNames = Object.entries(values)

    for (const [key, value] of inputNames) {
      const $input = $form.querySelector(`input[name=${key}]`)

      $input.value = value
    }
  }

  initialize()
}

export default damedane
