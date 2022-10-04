import { computed } from "vue";

import useVuelidate from "@vuelidate/core";
import {
  email as emailValidator,
  required,
  minLength,
  sameAs,
  maxLength,
} from "@vuelidate/validators";

type SimpleValidators = "emailValidator" | "required";
type FunctionalValidators = {
  type: "minLength" | "sameAs" | "maxLength";
  validatorValue: any;
};

interface ValidationOptions {
  field: string;
  validators: Array<SimpleValidators | FunctionalValidators>;
  validationMessage: string;
}

const vuelidateValidators = {
  emailValidator,
  required,
  minLength,
  sameAs,
  maxLength,
};

/**
 * Check type of validator
 * @param validator
 * @returns {boolean}
 */

const isSimpleValidator = (validator: any): validator is SimpleValidators => {
  return ["emailValidator", "required"].includes(validator);
};

export const useForm = (
  formData: any,
  validationOptions: Array<ValidationOptions>
) => {
  /**
   * Retruns object of validators
   * @param {SimpleValidators | FunctionalValidators} validators
   * @returns {object} ex: { emailValidator, minLength: minLength(8) }
   */
  const mapValidators = (
    validators: Array<SimpleValidators | FunctionalValidators>
  ) => {
    let mappedValidators = {};

    validators.forEach((validator) => {
      if (isSimpleValidator(validator)) {
        mappedValidators = {
          ...mappedValidators,
          [validator]: vuelidateValidators[validator],
        };
      } else {
        mappedValidators = {
          ...mappedValidators,
          [validator.type]: vuelidateValidators[validator.type](
            validator.validatorValue
          ),
        };
      }
    });

    return mappedValidators;
  };

  /**
   * Returns reduced object of rules
   * @returns {object} ex: { email: { emailValidator, required } }
   */
  const rules = validationOptions.reduce(
    (previousValue: any, currentValue: ValidationOptions) => {
      return {
        ...previousValue,
        [currentValue.field]: mapValidators(currentValue.validators),
      };
    },
    {}
  );

  const v$ = useVuelidate(rules, formData);

  /**
   * Retruns ComputedRef where computing current state for field error
   * @param {string} fieldName - field for validation message
   * @returns {ComputedReF<string | null>}
   */
  const createValidationMessage = (fieldName: string) => {
    return computed(() => {
      if (v$.value[fieldName].$dirty && v$.value[fieldName].$invalid) {
        return validationOptions.find((option) => option.field === fieldName)
          ?.validationMessage;
      }
      return "";
    });
  };

  return { v$, createValidationMessage };
};