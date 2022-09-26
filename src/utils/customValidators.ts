export const useCustomValidators = () => {
  return {
    emailValidator(_rule: any, value: string, callback: any) {
      const emailRegexp =
        //eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!value.toLowerCase().match(emailRegexp)) {
        callback(new Error(_rule.message));
      } else {
        callback();
      }
    },
  };
};
