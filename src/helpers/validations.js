export function validateEmail(text) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(text);
  }

  const availableRules = {
    required(value) {
      return value ? '' : 'Required fields'
    },
    min(value, rule) {
      return value.length > rule.length ? '' : `Min. ${rule.length} characters`
    },
    email(value) {
      return validateEmail(value) ? '' : 'Wrong Email'
    }
  }

  export function validate(rules = [], value) {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (rule instanceof Object) {
        const errorMessage = availableRules[rule.rule](value, rule);
        if (errorMessage) {
          return errorMessage;
        }
      } else {
      const errorMessage = availableRules[rule](value);
      if (errorMessage) {
        return errorMessage;
      }
     }
    };
    return '';
  }