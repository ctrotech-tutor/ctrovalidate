// src/rules/index.js

/**
 * @file This file serves as the central aggregator for all built-in validation rules.
 * It imports each individual rule function from the /definitions directory and
 * exports them as a single 'rules' object for the RuleEngine to consume.
 */

// Import all individual rule definitions.
import { required } from './definitions/required.js';
import { email } from './definitions/email.js';
import { minLength } from './definitions/minLength.js';
import { maxLength } from './definitions/maxLength.js';
import { exactLength } from './definitions/exactLength.js';
import { sameAs } from './definitions/sameAs.js';
import { alpha } from './definitions/alpha.js';
import { alphaNum } from './definitions/alphaNum.js';
import { alphaDash } from './definitions/alphaDash.js';
import { numeric } from './definitions/numeric.js';
import { integer } from './definitions/integer.js';
import { decimal } from './definitions/decimal.js';
import { url } from './definitions/url.js';
import { phone } from './definitions/phone.js';
import { min } from './definitions/min.js';
import { max } from './definitions/max.js';
import { between } from './definitions/between.js';
import { creditCard } from './definitions/creditCard.js';
import { ipAddress } from './definitions/ipAddress.js';
import { json } from './definitions/json.js';
import { strongPassword } from './definitions/strongPassword.js';

// Assemble and export the final rules object.
export const rules = {
  required,
  email,
  minLength,
  maxLength,
  exactLength,
  sameAs,
  alpha,
  alphaNum,
  alphaDash,
  numeric,
  integer,
  decimal,
  url,
  phone,
  min,
  max,
  between,
  creditCard,
  ipAddress,
  json,
  strongPassword,
};
