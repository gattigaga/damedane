type Rule = {
  /** Name of the value. */
  name: string;

  /** Indicate that if the value is error or not. */
  isError: boolean;

  /** Message that appear if the value is error. */
  message: string;
}

/**
 * Create a validation rule.
 *
 * @param values Values that has been initialized.
 * @returns Created validation rule.
 */
type RuleCreator = (values: Object) => Rule;

type Options = {
  /** Initial values. */
  values: Object;

  /** Rules that used to validate the values. */
  rules: RuleCreator[];
};

/**
 * Create damedane's instance.
 *
 * @param $form Form element that want to validate.
 * @param options Used as configuration.
 */
declare function damedane($form: HTMLFormElement, options: Options): void;

export default damedane
