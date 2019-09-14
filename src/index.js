/*
globals
Symbol
*/

export const isString = i => {
  return typeof i === "string" || i instanceof String;
};

export const isArray = i => {
  return Array.isArray(i);
};

export const isObject = i => {
  if (i === null || isArray(i)) {
    return false;
  }
  return typeof i === "function" || typeof i === "object";
};

export const isDate = value => {
  let getDay = Date.prototype.getDay;
  let tryDateObject = function tryDateGetDayCall(value) {
    try {
      getDay.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };

  let toStr = Object.prototype.toString;
  let dateClass = "[object Date]";
  let hasToStringTag =
    typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";

  if (typeof value !== "object" || value === null) {
    return false;
  }
  return hasToStringTag
    ? tryDateObject(value)
    : toStr.call(value) === dateClass;
};

export const isFunction = i => {
  return i && {}.toString.call(i) === "[object Function]";
};

export const isFloat = n => {
  return Number(n) === n && n % 1 !== 0;
};

export const isInteger = n => {
  return Number(n) === n && n % 1 === 0;
};

export const isNumber = n => {
  return isFloat(n) || isInteger(n);
};

export const isEmpty = value => {
  if (value === null) return true;
  if (value === undefined) return true;
  if (isObject(value) && !Object.keys(value).length) return true;
  if (!value.length) return true;
};

export const isRegExp = input => {
  return Object.prototype.toString.call(input) === "[object RegExp]";
};

export const isBoolean = input => {
  return input === true || input === false;
};

export const isISO8601 = input => {
  let re = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/;
  return re.test(input);
};

export const isNull = i => {
  return i == null || i == undefined;
};

export const isColor = input => {
  if (isString(input)) {
    let re = /#(?:[a-f\d]{3}){1,2}\b|rgb\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){2}\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)|\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%(?:\s*,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%){2})\s*\)|hsl\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}\)|(?:rgba\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){3}|(?:\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*,){3})|hsla\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2},)\s*0*(?:1(?:\.0+)?|0(?:\.\d+)?)\s*\)/gi;

    let results = input.match(re);

    if (results) {
      if (results.length == 1) {
        if (results[0] == input) {
          return true;
        }
      }
    }
  }

  return false;
};

export default {
  string: isString,
  object: isObject,
  date: isDate,
  fn: isFunction,
  array: isArray,
  float: isFloat,
  integer: isInteger,
  number: isNumber,
  regexp: isRegExp,
  boolean: isBoolean,
  empty: isEmpty,
  ISO8601: isISO8601,
  color: isColor,
  null: isNull
};
