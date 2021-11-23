/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_xoshiro__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__algorithms_neumaier__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_some__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tests__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__algorithms_bracket__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__algorithms_brent__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__special_core__ = __webpack_require__(3);








/**
 * The distribution generator base class, all distribution generators extend this class. The methods listed here
 * are available for all distribution generators. Integer parameters of a distribution are rounded.
 *
 * The examples provided for this class are using a Pareto
 * distribution.
 *
 * @class Distribution
 * @memberOf ran.dist
 * @constructor
 */
class Distribution {
  constructor (type, k) {
    // Distribution type: discrete or continuous
    this.t = type

    // Number of parameters
    this.k = k

    // The parameters
    this.p = {}

    // Distribution support
    this.s = []

    // Pseudo random number generator
    this.r = new __WEBPACK_IMPORTED_MODULE_0__core_xoshiro__["a" /* default */]()

    // Speed-up constants
    this.c = []
  }

  /**
   * Validates a set of parameters using a list of constraints.
   *
   * @method validate
   * @memberOf Distribution
   * @param {Object} params Object containing the parameters to validate.
   * @param {string[]} constraints Array of strings defining the parameter constraints.
   * @throws Error when any of the parameters don't satisfy the constraints.
   * @ignore
   */
  static validate (params, constraints) {
    // Go through parameters and check constraints
    const errors = constraints.filter(constraint => {
      // Tokenize constraint
      let tokens = constraint.split(/ (<=|>=|!=) /)
      if (tokens.length === 1) {
        tokens = constraint.split(/ ([=<>]) /)
      }

      // Substitute parameters if there is any
      const a = Object.prototype.hasOwnProperty.call(params, tokens[0]) ? params[tokens[0]] : parseFloat(tokens[0])
      const b = Object.prototype.hasOwnProperty.call(params, tokens[2]) ? params[tokens[2]] : parseFloat(tokens[2])

      // Check for errors
      switch (tokens[1]) {
        case '<':
          return a >= b
        case '<=':
          return a > b
        case '>':
          return a <= b
        case '>=':
          return a < b
        case '!=':
          return a === b
        default:
          return false
      }
    })

    if (errors.length > 0) {
      throw Error(`Invalid parameters. Parameters must satisfy the following constraints: ${constraints.join(', ')}`)
    }
  }

  /**
   * Rounds a value to an integer if the distribution is of discrete type.
   *
   * @method _toInt
   * @memberOf Distribution
   * @param {number} x Value to round if necessary.
   * @returns {number} The rounded or left intact value.
   * @private
   */
  _toInt (x) {
    return this.t === 'discrete' ? Math.round(x) : x
  }

  /**
   * Generates a single random variate.
   *
   * @method _generator
   * @memberOf ran.dist.Distribution
   * @returns {number} A single random variate.
   * @protected
   * @ignore
   */
  _generator () {
    throw Error('Distribution._generator() is not implemented')
  }

  /**
   * The probability distribution or probability mass function.
   *
   * @method _pdf
   * @memberOf ran.dist.Distribution
   * @param {number} x Value to evaluate the distribution/mass function at.
   * @returns {number} The probability density or probability at the specified value.
   * @protected
   * @ignore
   */
  _pdf (x) {
    throw Error('Distribution._pdf() is not implemented')
  }

  /**
   * The probability distribution function.
   *
   * @method _cdf
   * @memberOf ran.dist.Distribution
   * @param {number} x Value to evaluate the probability distribution at.
   * @returns {number} The value of the probability function at the specified value.
   * @protected
   * @ignore
   */
  _cdf (x) {
    throw Error('Distribution._cdf() is not implemented')
  }

  /**
   * Estimates the quantile function by using a look-up table.
   *
   * @method _qEstimateTable
   * @memberOf ran.dist.Distribution
   * @param {number} p Probability to find value for.
   * @returns {number} The lower boundary of the interval that satisfies F(x) = p if found, undefined otherwise.
   * @protected
   * @ignore
   */
  _qEstimateTable (p) {
    // Find upper bound
    let k1 = 0
    let k2 = 0
    let delta = 1
    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_6__special_core__["c" /* MAX_ITER */]; i++) {
      const q = this.cdf(k2)
      if (q >= p) {
        break
      }

      k1 = k2
      k2 += delta
      delta = Math.ceil(1.618 * delta)
    }

    // Find quantile within bracket
    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_6__special_core__["c" /* MAX_ITER */]; i++) {
      if (k2 - k1 <= 1) {
        return k2
      }

      const k = Math.floor((k1 + k2) / 2)
      const q = this.cdf(k)
      if (p > q) {
        k1 = k
      } else {
        k2 = k
      }
    }
  }

  /**
   * Estimates the quantile function by solving F(x) = p using Brent's method.
   *
   * @method _qEstimateRoot
   * @memberOf ran.dist.Distribution
   * @param {number} p Probability to find value for.
   * @returns {(number|undefined)} The value where the probability coincides with the specified value if found,
   * undefined otherwise.
   * @protected
   * @ignore
   */
  _qEstimateRoot (p) {
    // Guess range
    const delta = ((Number.isFinite(this.s[1].value) ? this.s[1].value : 10) - (Number.isFinite(this.s[0].value) ? this.s[0].value : -10)) / 2

    // Set initial guess for lower boundary
    let a0 = Math.random()
    if (this.s[0].closed) {
      a0 = this.s[0].value + Number.EPSILON
    } else if (Number.isFinite(this.s[0].value)) {
      a0 = this.s[0].value + delta * Math.random()
    }

    // Set initial guess for upper boundary
    let b0 = a0 + Math.random()
    if (this.s[1].closed) {
      b0 = this.s[1].value - Number.EPSILON
    } else if (Number.isFinite(this.s[1].value)) {
      b0 = this.s[1].value - delta * Math.random()
    }

    // Find brackets
    const bounds = Object(__WEBPACK_IMPORTED_MODULE_4__algorithms_bracket__["a" /* default */])(t => this.cdf(t) - p, a0, b0, this.s)

    // Perform root-finding using Brent's method
    if (typeof bounds !== 'undefined') {
      return Math.min(Math.max(
        Object(__WEBPACK_IMPORTED_MODULE_5__algorithms_brent__["a" /* default */])(t => this.cdf(t) - p, ...bounds),
        this.s[0].value), this.s[1].value
      )
    }
  }

  /**
   * Returns the type of the distribution (either discrete or continuous).
   *
   * @method type
   * @memberOf ran.dist.Distribution
   * @returns {string} Distribution type.
   */
  type () {
    return this.t
  }

  /**
   * Returns the support of the probability distribution (based on the current parameters). Note that the support
   * for the probability distribution is not necessarily the same as the support of the cumulative distribution.
   *
   * @method support
   * @memberOf ran.dist.Distribution
   * @returns {Object[]} An array of objects describing the lower and upper boundary of the support. Each object
   * contains a <code>value: number</code> and a <code>closed: boolean</code> property with the value of the boundary
   * and whether it is closed, respectively. When <code>value</code> is (+/-)Infinity, <code>closed</code> is always false.
   */
  support () {
    return this.s
  }

  /**
   * Sets the seed for the distribution generator. Distributions implement the same PRNG
   * ([xoshiro128+]{@link http://vigna.di.unimi.it/ftp/papers/ScrambledLinear.pdf}) that is used in the core functions.
   *
   * @method seed
   * @methodOf ran.dist.Distribution
   * @param {(number|string)} value The value of the seed, either a number or a string (for the ease of tracking seeds).
   * @returns {ran.dist.Distribution} Reference to the current distribution.
   * @example
   *
   * let pareto = new ran.dist.Pareto(1, 2).seed('test')
   * pareto.sample(5)
   * // => [ 1.571395735462202,
   * //      2.317583041477979,
   * //      1.1315154468682591,
   * //      5.44269493220745,
   * //      1.2587482868229616 ]
   *
   */
  seed (value) {
    this.r.seed(value)
    return this
  }

  /**
   * Returns the current state of the generator. The object returned by this method contains all information necessary
   * to set up another generator of the same distribution (parameters, state of the pseudo random generator, etc).
   *
   * @method save
   * @methodOf ran.dist.Distribution
   * @return {Object} Object representing the inner state of the current generator.
   * @example
   *
   * let pareto1 = new ran.dist.Pareto(1, 2).seed('test')
   * let sample1 = pareto1.sample(2)
   * let state = pareto1.save()
   *
   * let pareto2 = new ran.dist.Pareto().load(state)
   * let sample2 = pareto2.sample(3)
   * // => [ 1.1315154468682591,
   * //      5.44269493220745,
   * //      1.2587482868229616 ]
   *
   */
  save () {
    return {
      prngState: this.r.save(),
      params: this.p,
      consts: this.c,
      support: this.s
    }
  }

  /**
   * Loads a new state for the generator.
   *
   * @method load
   * @methodOf ran.dist.Distribution
   * @param {Object} state The state to load.
   * @returns {ran.dist.Distribution} Reference to the current distribution.
   * @example
   *
   * let pareto1 = new ran.dist.Pareto(1, 2).seed('test')
   * let sample1 = pareto1.sample(2)
   * let state = pareto1.save()
   *
   * let pareto2 = new ran.dist.Pareto().load(state)
   * let sample2 = pareto2.sample(3)
   * // => [ 1.1315154468682591,
   * //      5.44269493220745,
   * //      1.2587482868229616 ]
   *
   */
  load (state) {
    // Set parameters
    this.p = state.params

    // Set helper constants
    this.c = state.consts

    // Set support
    this.s = state.support

    // Set PRNG state
    this.r.load(state.prngState)

    return this
  }

  /**
   * Generates some random variate.
   *
   * @method sample
   * @memberOf ran.dist.Distribution
   * @param {number=} n Number of variates to generate. If not specified, a single value is returned.
   * @returns {(number|number[])} Single sample or an array of samples.
   * @example
   *
   * let pareto = new ran.dist.Pareto(1, 2)
   * pareto.sample(5)
   * // => [ 5.619011325146519,
   * //      1.3142187491180493,
   * //      1.0513159445581859,
   * //      1.8124951360943067,
   * //      1.1694087449301402 ]
   *
   */
  sample (n = 1) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__utils_some__["a" /* default */])(() => this._generator(), n)
  }

  /**
   * [Probability density function]{@link https://en.wikipedia.org/wiki/Probability_density_function}. In case of discrete distributions, it is the [probability mass function]{@link https://en.wikipedia.org/wiki/Probability_mass_function}.
   *
   * @method pdf
   * @memberOf ran.dist.Distribution
   * @param {number} x Value to evaluate distribution at.
   * @returns {number} The probability density or probability mass.
   * @example
   *
   * let pareto = new ran.dist.Pareto(1, 2)
   * pareto.pdf(3)
   * // => 0.07407407407407407
   *
   */
  pdf (x) {
    // Convert to integer if discrete
    const z = this._toInt(x)

    // Check against lower support
    if ((this.s[0].closed && z < this.s[0].value) || (!this.s[0].closed && z <= this.s[0].value)) {
      return 0
    }

    // Check against upper support
    if ((this.s[1].closed && z > this.s[1].value) || (!this.s[1].closed && z >= this.s[1].value)) {
      return 0
    }

    // Return value
    return this._pdf(z)
  }

  /**
   * The [cumulative distribution function]{@link https://en.wikipedia.org/wiki/Cumulative_distribution_function}:
   *
   * $$F(x) = \int_{-\infty}^x f(t) \,\mathrm{d}t,$$
   *
   * if the distribution is continuous and
   *
   * $$F(x) = \sum_{x_i \le x} f(x_i),$$
   *
   * if it is discrete. The functions \(f(t)\) and \(f(x_i)\) denote the probability density and mass functions.
   *
   * @method cdf
   * @memberOf ran.dist.Distribution
   * @param {number} x Value to evaluate CDF at.
   * @returns {number} The cumulative distribution value.
   * @example
   *
   * let pareto = new ran.dist.Pareto(1, 2)
   * pareto.cdf(3)
   * // => 0.8888888888888888
   *
   */
  cdf (x) {
    // Convert to integer if discrete
    const z = this._toInt(x)

    // Check against lower support
    if ((this.s[0].closed && z < this.s[0].value) || (!this.s[0].closed && z <= this.s[0].value)) {
      return 0
    }

    // Check against upper support
    if (z >= this.s[1].value) {
      return 1
    }

    // Return value
    return this._cdf(z)
  }

  /**
   * The [quantile function]{@link https://en.wikipedia.org/wiki/Quantile_function} of the distribution. For continuous
   * distributions, it is defined as the inverse of the distribution function:
   *
   * $$Q(p) = F^{-1}(p),$$
   *
   * whereas for discrete distributions it is the lower boundary of the interval that satisfies \(F(k) = p\):
   *
   * $$Q(p) = \mathrm{inf}\{k \in \mathrm{supp}(f): p \le F(k) \},$$
   *
   * with \(\mathrm{supp}(f)\) denoting the support of the distribution.
   *
   * For distributions with an analytically invertible
   * cumulative distribution function, the quantile is explicitly implemented. In other cases, two fallback estimations
   * are used: for continuous distributions the equation \(F(x) = p\) is solved using [Brent's method]{@link https://en.wikipedia.org/wiki/Brent%27s_method}.
   * For discrete distributions a look-up table is used with linear search.
   *
   * @method q
   * @memberOf ran.dist.Distribution
   * @param {number} p The probability at which the quantile should be evaluated.
   * @returns {(number|undefined)} The value of the quantile function at the specified probability if \(p \in [0, 1]\) and the quantile could be found,
   * undefined otherwise.
   */
  q (p) {
    if (p < 0 || p > 1) {
      // If out of bounds, return undefined
    } else if (p === 0) {
      // If zero, return lower support boundary
      return this.s[0].value
    } else if (p === 1) {
      // If unit, return upper support boundary
      return this.s[1].value
    } else {
      // If quantile function is implemented, use that, otherwise use the estimators: look-up table for discrete and root-finder for continuous
      //
      return typeof this._q === 'function'
        ? this._q(p)
        : this.t === 'discrete'
          ? this._qEstimateTable(p)
          : this._qEstimateRoot(p)
    }
  }

  /**
   * The [survival function]{@link https://en.wikipedia.org/wiki/Survival_function}:
   *
   * $$S(x) = 1 - F(x),$$
   *
   * where \(F(x)\) denotes the cumulative distribution function.
   *
   * @method survival
   * @memberOf ran.dist.Distribution
   * @param {number} x Value to evaluate survival function at.
   * @returns {number} The survival value.
   * @example
   *
   * let pareto = new ran.dist.Pareto(1, 2)
   * pareto.survival(3)
   * // => 0.11111111111111116
   *
   */
  survival (x) {
    return 1 - this._cdf(x)
  }

  /**
   * The [hazard function]{@link https://en.wikipedia.org/wiki/Failure_rate}:
   *
   * $$\lambda(x) = \frac{f(x)}{S(x)},$$
   *
   * where \(f(x)\) and \(S(x)\) are the probability density (or mass) function and the survival function, respectively.
   *
   * @method hazard
   * @memberOf ran.dist.Distribution
   * @param {number} x Value to evaluate the hazard at.
   * @returns {number} The hazard value.
   * @example
   *
   * let pareto = new ran.dist.Pareto(1, 2)
   * pareto.hazard(3)
   * // => 0.6666666666666663
   *
   */
  hazard (x) {
    return this._pdf(x) / this.survival(x)
  }

  /**
   * The [cumulative hazard function]{@link https://en.wikipedia.org/wiki/Survival_analysis#Hazard_function_and_cumulative_hazard_function}:
   *
   * $$\Lambda(x) = \int_0^x \lambda(t) \,\mathrm{d}t,$$
   *
   * where \(\lambda(x)\) is the hazard function.
   *
   * @method cHazard
   * @memberOf ran.dist.Distribution
   * @param {number} x Value to evaluate cumulative hazard at.
   * @returns {number} The cumulative hazard.
   * @example
   *
   * let pareto = new ran.dist.Pareto(1, 2)
   * pareto.cHazard(3)
   * // => 2.197224577336219
   *
   */
  cHazard (x) {
    return -Math.log(this.survival(x))
  }

  /**
   * The [logarithmic probability density function]{@link https://en.wikipedia.org/wiki/Log_probability}.
   * For discrete distributions, this is the logarithm of the probability mass function.
   *
   * @method logPdf
   * @memberOf ran.dist.Distribution
   * @param {number} x Value to evaluate the log pdf at.
   * @returns {number} The logarithmic probability density (or mass).
   * @example
   *
   * let pareto = new ran.dist.Pareto(1, 2)
   * pareto.lnPdf(3)
   * // => -2.6026896854443837
   *
   */
  lnPdf (x) {
    return Math.log(this._pdf(x))
  }

  /**
   * The [log-likelihood]{@link https://en.wikipedia.org/wiki/Likelihood_function#Log-likelihood} of the
   * current distribution based on some data. More precisely:
   *
   * $$\ln L(\theta | X) = \sum_{x \in X} \ln f(x; \theta),$$
   *
   * where \(X\) is the set of observations (sample) and \(\theta\) is the parameter vector of the
   * distribution. The function \(f(x)\) denotes the probability density/mass function.
   *
   * @method lnL
   * @memberOf ran.dist.Distribution
   * @param {number[]} data Array of numbers to calculate log-likelihood for.
   * @returns {number} The log-likelihood of the data for the distribution.
   * @example
   *
   * let pareto = new ran.dist.Pareto(1, 2)
   * let uniform = new ran.dist.UniformContinuous(1, 10);
   *
   * let sample1 = pareto.sample(100)
   * pareto.L(sample1)
   * // => -104.55926409382
   *
   * let sample2 = uniform.sample(100)
   * pareto.L(sample2)
   * // => -393.1174868780569
   *
   */
  lnL (data) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__algorithms_neumaier__["a" /* default */])(
      data.map(d => this.lnPdf(d))
    )
  }

  /**
   * Returns the value of the [Akaike information criterion]{@link https://en.wikipedia.org/wiki/Akaike_information_criterion}
   * for a specific data set. Note that this method does not optimize the likelihood, merely computes the AIC with the
   * current parameter values.
   *
   * @method aic
   * @memberOf ran.dist.Distribution
   * @param {number[]} data Array of values containing the data.
   * @returns {number} The AIC for the current parameters.
   * @example
   *
   * let pareto1 = new dist.Pareto(1, 2)
   * let pareto2 = new dist.Pareto(1, 5)
   * let sample = pareto1.sample(1000)
   *
   * pareto1.aic(sample)
   * // => 1584.6619128383577
   *
   * pareto2.aic(sample)
   * // => 2719.0367230482957
   *
   */
  aic (data) {
    return 2 * (this.k - this.lnL(data))
  }

  /**
   * Returns the value of the [Bayesian information criterion]{@link https://en.wikipedia.org/wiki/Bayesian_information_criterion}
   * for a specific data set. Note that this method does not optimize the likelihood, merely computes the BIC with the
   * current parameter values.
   *
   * @method bic
   * @memberOf ran.dist.Distribution
   * @param {number[]} data Array of values containing the data.
   * @returns {number} The BIC for the current parameters.
   * @example
   *
   * let pareto1 = new dist.Pareto(1, 2)
   * let pareto2 = new dist.Pareto(1, 5)
   * let sample = pareto1.sample(1000)
   *
   * pareto1.bic(sample)
   * // => 1825.3432698372499
   *
   * pareto2.bic(sample)
   * // => 3190.5839264881165
   *
   */
  bic (data) {
    return Math.log(data.length) * this.k - 2 * this.lnL(data)
  }

  /**
   * Tests if an array of values is sampled from the specified distribution. For discrete distributions this
   * method uses \(\chi^2\) test, whereas for continuous distributions it uses the Kolmogorov-Smirnov test. In both cases, the probability of Type I error (rejecting a correct null hypotheses) is 1%.
   *
   * @method test
   * @memberOf ran.dist.Distribution
   * @param {number[]} values Array of values to test.
   * @returns {Object} Object with two properties representing the result of the test:
   * <ul>
   *     <li>{statistics}: The \(\chi^2\) or D statistics depending on whether the distribution is discrete or
   *     continuous.</li>
   *     <li>{passed}: Whether the sample passed the null hypothesis that it is sampled from the current
   *     distribution.</li>
   * </ul>
   * @example
   *
   * let pareto = new ran.dist.Pareto(1, 2)
   * let uniform = new ran.dist.UniformContinuous(1, 10);
   *
   * let sample1 = pareto.sample(100)
   * pareto.test(sample1)
   * // => { statistics: 0.08632443341496943, passed: true }
   *
   * let sample2 = uniform.sample(100)
   * pareto.test(sample2)
   * // => { statistics: 0.632890888159255, passed: false }
   *
   */
  test (values) {
    return this.t === 'discrete'
      ? Object(__WEBPACK_IMPORTED_MODULE_3__tests__["a" /* chi2 */])(values, x => this.pdf(x), this.k)
      : Object(__WEBPACK_IMPORTED_MODULE_3__tests__["b" /* kolmogorovSmirnov */])(values, x => this.cdf(x))
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Distribution);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = rejection;
/* harmony export (immutable) */ __webpack_exports__["a"] = beta;
/* harmony export (immutable) */ __webpack_exports__["b"] = chi2;
/* harmony export (immutable) */ __webpack_exports__["c"] = exponential;
/* harmony export (immutable) */ __webpack_exports__["d"] = gamma;
/* harmony export (immutable) */ __webpack_exports__["e"] = noncentralChi2;
/* harmony export (immutable) */ __webpack_exports__["f"] = normal;
/* harmony export (immutable) */ __webpack_exports__["g"] = poisson;
/* harmony export (immutable) */ __webpack_exports__["i"] = sign;
/* harmony export (immutable) */ __webpack_exports__["j"] = zeta;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_log_gamma__ = __webpack_require__(2);



/**
 * Performs a rejection sampling.
 *
 * @method rejection
 * @memberOf ran.dist
 * @param {ran.core.Xoshiro128p} r Random generator.
 * @param {Function} g Generator for the sample (major function).
 * @param {Function} accept The function that returns the acceptance threshold.
 * @param {?Function} transform Optional transformation to apply once the sample is accepted (for transformed distributions).
 * @return {(number|undefined)} The sampled random variate.
 * @private
 */
function rejection (r, g, accept, transform) {
  for (let trial = 0; trial < __WEBPACK_IMPORTED_MODULE_0__special_core__["c" /* MAX_ITER */]; trial++) {
    const x = g()
    if (r.next() < accept(x)) {
      return typeof transform !== 'undefined' ? transform(x) : x
    }
  }
}

function beta (r, a, b) {
  const x = gamma(r, a, 1)
  const y = gamma(r, b, 1)
  const z = x / (x + y)

  // Handle 1 - z << 1 case
  return Math.abs(1 - z) < Number.EPSILON ? 1 - y / x : z
}

/**
 * Generates a chi2 random variate.
 *
 * @method chi2
 * @memberOf ran.dist
 * @param {ran.core.Xoshiro128p} r Random generator.
 * @param {number=} nu Degrees of freedom.
 * @returns {number} Random variate.
 */
function chi2 (r, nu) {
  return gamma(r, nu / 2, 0.5)
}

/**
 * Generates a exponential random variate.
 *
 * @method exponential
 * @memberOf ran.dist
 * @param {ran.core.Xoshiro128p} r Random generator.
 * @param {number=} lambda Rate parameter. Default value is 1.
 * @returns {number} Random variate.
 * @private
 */
function exponential (r, lambda = 1) {
  return -Math.log(r.next()) / lambda
}

/**
 * Generates a gamma random variate with the rate parametrization.
 *
 * @method gamma
 * @memberOf ran.dist
 * @param {ran.core.Xoshiro128p} r Random generator.
 * @param {number} a Shape parameter.
 * @param {number=} b Rate parameter. Default value is 1.
 * @returns {number} Random variate.
 * @private
 */
function gamma (r, a, b = 1) {
  if (a > 1) {
    const d = a - 1 / 3

    const c = 1 / Math.sqrt(9 * d)

    let Z
    let V
    let U

    // Max 1000 trials
    for (let trials = 0; trials < 1000; trials++) {
      Z = normal(r)
      if (Z > -1 / c) {
        V = Math.pow(1 + c * Z, 3)
        U = r.next()
        if (Math.log(U) < 0.5 * Z * Z + d * (1 - V + Math.log(V))) { return d * V / b }
      }
    }
  } else {
    return gamma(r, a + 1, b) * Math.pow(r.next(), 1 / a)
  }
}

/**
 * Generates a non-central chi2 random variate.
 *
 * @method noncentralChi2
 * @memberOf ran.dist
 * @param {ran.core.Xoshiro128p} r Random generator.
 * @param {number} k Degrees of freedom.
 * @param {number} lambda Non-centrality parameter.
 * @returns {number} Random variate.
 * @private
 */
function noncentralChi2 (r, k, lambda) {
  // Generated by a compound Poisson
  const j = poisson(r, lambda / 2)
  return gamma(r, k / 2 + j, 0.5)
}

/**
 * Generates a normally distributed random variate.
 *
 * @method normal
 * @memberOf ran.dist
 * @param {ran.core.Xoshiro128p} r Random generator.
 * @param {number=} mu Distribution mean. Default value is 0.
 * @param {number=} sigma Distribution standard deviation. Default value is 1.
 * @returns {number} Random variate.
 * @private
 */
function normal (r, mu = 0, sigma = 1) {
  const u = r.next()

  const v = r.next()
  return sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) + mu
}

/**
 * Generates a Poisson random variate.
 *
 * @method poisson
 * @memberOf ran.dist
 * @param {ran.core.Xoshiro128p} r Random generator.
 * @param {number} lambda Mean of the distribution.
 * @returns {number} Random variate.
 * @private
 */
function poisson (r, lambda) {
  if (lambda < 30) {
    // Small lambda, Knuth's method
    const l = Math.exp(-lambda)

    let k = 0

    let p = 1
    do {
      k++
      p *= r.next()
    } while (p > l)
    return k - 1
  } else {
    // Large lambda, normal approximation
    const c = 0.767 - 3.36 / lambda

    const b = Math.PI / Math.sqrt(3 * lambda)

    const alpha = b * lambda

    const k = Math.log(c) - lambda - Math.log(b)

    // Max 1000 trials
    for (let trials = 0; trials < 1000; trials++) {
      let u, x, n
      do {
        u = r.next()
        x = (alpha - Math.log((1 - u) / u)) / b
        n = Math.floor(x + 0.5)
      } while (n < 0)
      const v = r.next()

      const y = alpha - b * x

      const lhs = y + Math.log(v / Math.pow(1.0 + Math.exp(y), 2))

      const rhs = k + n * Math.log(lambda) - Object(__WEBPACK_IMPORTED_MODULE_1__special_log_gamma__["a" /* default */])(n + 1)
      if (lhs <= rhs) { return n }
    }
  }
}

/**
 * Generates a random sign.
 *
 * @method sign
 * @memberOf ran.dist
 * @param {ran.core.Xoshiro128p} r Random generator.
 * @param {number=} p Probability of +1. Default value is 0.5.
 * @return {number} Random sign (-1 or +1).
 * @private
 */
function sign (r, p = 0.5) {
  return r.next() < p ? 1 : -1
}

/**
 * Generates a zeta random variate
 *
 * @method zeta
 * @memberOf ran.dist
 * @param {ran.core.Xoshiro128p} r Random generator.
 * @param {number} s Exponent.
 * @returns {number} Random variate.
 * @private
 */
function zeta (r, s) {
  // Rejection sampling
  const b = Math.pow(2, s - 1)
  for (let trials = 0; trials < 100; trials++) {
    const x = Math.floor(Math.pow(r.next(), -1 / (s - 1)))
    const t = Math.pow(1 + 1 / x, s - 1)
    if (r.next() * x * (t - 1) / (b - 1) <= t / b) {
      return x
    }
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Coefficients
const coeffs = [
  76.18009172947146,
  -86.50532032941677,
  24.01409824083091,
  -1.231739572450155,
  0.1208650973866179e-2,
  -0.5395239384953e-5
]

/**
   * Computes the logarithm of the gamma function for positive arguments.
   *
   * @method logGamma
   * @memberOf ran.special
   * @param {number} z Value to evaluate log(gamma) at.
   * @returns {number} The log(gamma) value.
   * @private
   */
/* harmony default export */ __webpack_exports__["a"] = (function (z) {
  const x = z

  let y = z

  let res = x + 5.5
  res = (x + 0.5) * Math.log(res) - res
  let sum = 1.000000000190015
  for (let j = 0; j < 6; j++) {
    y++
    sum += coeffs[j] / y
  }
  return res + Math.log(2.5066282746310005 * sum / x)
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Maximum number of iterations in function approximations.
 *
 * @var {number} MAX_ITER
 * @memberOf ran.special
 * @private
 */
const MAX_ITER = 100
/* harmony export (immutable) */ __webpack_exports__["c"] = MAX_ITER;


/**
 * Error tolerance in function approximations.
 *
 * @var {number} EPS
 * @memberOf ran.special
 * @private
 */
const EPS = Number.EPSILON
/* harmony export (immutable) */ __webpack_exports__["b"] = EPS;


/**
 * Safe underflow limit .
 *
 * @var {number} DELTA
 * @memberOf ran.special
 * @private
 */
const DELTA = 1e-30
/* harmony export (immutable) */ __webpack_exports__["a"] = DELTA;


/**
 * Safe overflow limit.
 *
 * @var {number} K
 * @memberOf ran.special
 * @private
 */
const K = 1e+300
/* unused harmony export K */



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EPSILON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ARRAY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RANDOM; });
/* unused harmony export setMatrixArrayType */
/* unused harmony export toRadian */
/* unused harmony export equals */
/**
 * Common utilities
 * @module glMatrix
 */

// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
  return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_error__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);




/**
 * Generator for the [normal distribution]{@link https://en.wikipedia.org/wiki/Normal_distribution}:
 *
 * $$f(x; \mu, \sigma) = \frac{1}{\sqrt{2 \pi \sigma^2}} e^{-\frac{(x - \mu)^2}{2\sigma^2}},$$
 *
 * with \(\mu \in \mathbb{R}\) and \(\sigma > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class Normal
 * @memberOf ran.dist
 * @param {number=} mu Location parameter (mean). Default value is 0.
 * @param {number=} sigma Squared scale parameter (variance). Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */] {
  constructor (mu = 0, sigma = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, sigma }
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ mu, sigma }, [
      'sigma > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      sigma * Math.sqrt(2 * Math.PI),
      sigma * Math.SQRT2
    ]
  }

  _generator () {
    // Direct sampling
    return Object(__WEBPACK_IMPORTED_MODULE_1__core__["f" /* normal */])(this.r, this.p.mu, this.p.sigma)
  }

  _pdf (x) {
    return Math.exp(-0.5 * Math.pow((x - this.p.mu) / this.p.sigma, 2)) / this.c[0]
  }

  _cdf (x) {
    return 0.5 * (1 + Object(__WEBPACK_IMPORTED_MODULE_0__special_error__["a" /* erf */])((x - this.p.mu) / this.c[1]))
  }

  _q (p) {
    return this.p.mu + this.c[1] * Object(__WEBPACK_IMPORTED_MODULE_0__special_error__["c" /* erfinv */])(2 * p - 1)
  }
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = gammaLowerIncomplete;
/* harmony export (immutable) */ __webpack_exports__["b"] = gammaUpperIncomplete;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_gamma__ = __webpack_require__(2);



/**
 * Computes the regularized lower incomplete gamma function.
 *
 * @method _gli
 * @memberOf ran.special
 * @param {number} s Exponent of the integrand.
 * @param {number} x Upper boundary of the integration.
 * @return {number} The regularized lower incomplete gamma function.
 * @private
 */
function _gli (s, x) {
  if (x < 0) {
    return 0
  } else {
    let si = s

    let y = 1 / s

    let f = y
    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__core__["c" /* MAX_ITER */]; i++) {
      si++
      y *= x / si
      f += y
      if (Math.abs(y) < Math.abs(f) * __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]) {
        break
      }
    }
    return f * Math.exp(-x + s * Math.log(x) - Object(__WEBPACK_IMPORTED_MODULE_1__log_gamma__["a" /* default */])(s))
  }
}

/**
 * Computes the regularized upper incomplete gamma function.
 *
 * @method _gui
 * @memberOf ran.special
 * @param {number} s Exponent of the integrand.
 * @param {number} x Lower boundary of the integration.
 * @return {number} The regularized upper incomplete gamma function.
 * @private
 */
function _gui (s, x) {
  let b = x + 1 - s

  let c = 1 / __WEBPACK_IMPORTED_MODULE_0__core__["a" /* DELTA */]

  let d = 1 / b

  let f = d

  let fi
  let y
  for (let i = 1; i < __WEBPACK_IMPORTED_MODULE_0__core__["c" /* MAX_ITER */]; i++) {
    fi = i * (s - i)
    b += 2
    d = fi * d + b
    d = Math.max(Math.abs(d), __WEBPACK_IMPORTED_MODULE_0__core__["a" /* DELTA */])
    d = 1 / d
    c = b + fi / c
    c = Math.max(Math.abs(c), __WEBPACK_IMPORTED_MODULE_0__core__["a" /* DELTA */])
    y = c * d
    f *= y
    if (Math.abs(y - 1) < __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]) {
      break
    }
  }
  return f * Math.exp(-x + s * Math.log(x) - Object(__WEBPACK_IMPORTED_MODULE_1__log_gamma__["a" /* default */])(s))
}

/**
 * Computes the regularized lower incomplete gamma function.
 *
 * @method gammaLowerIncomplete
 * @memberOf ran.special
 * @param {number} s Exponent of the integrand.
 * @param {number} x Upper boundary of the integration.
 * @return {number} The regularized lower incomplete gamma function.
 * @private
 */
function gammaLowerIncomplete (s, x) {
  return x < s + 1 ? _gli(s, x) : 1 - _gui(s, x)
}

/**
 * Computes the regularized upper incomplete gamma function.
 *
 * @method gammaUpperIncomplete
 * @memberOf ran.special
 * @param {number} s Exponent of the integrand.
 * @param {number} x Lower boundary of the integration.
 * @return {number} The regularized upper incomplete gamma function.
 * @private
 */
function gammaUpperIncomplete (s, x) {
  return x < s + 1 ? 1 - _gli(s, x) : _gui(s, x)
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alias_table__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for a [categorical distribution]{@link https://en.wikipedia.org/wiki/Categorical_distribution}:
 *
 * $$f(k; \{w\}) = \frac{w_k}{\sum_j w_j},$$
 *
 * where \(w_k > 0 / \{0\}\). Support: \(k \in \mathbb{N}_0\).
 *
 * @class Categorical
 * @memberOf ran.dist
 * @param {number[]=} weights Weights for the distribution (doesn't need to be normalized). Default value is an array with a single value of 1.
 * @param {number=} min Lowest value to sample (support starts at this value). Default value is [1, 1, 1].
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (weights = [1, 1, 1], min = 0) {
    super('discrete', arguments.length)

    // Validate parameters
    this.p = { n: weights.length, weights, min }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({
      w_i: (() => {
        const allPositive = weights.reduce((acc, d) => acc && (d >= 0), true)
        return allPositive ? 1 : -1
      })(),
      min
    }, [
      'w_i >= 0'
    ])

    // Set support
    this.s = [{
      value: min,
      closed: true
    }, {
      value: Math.max(0, weights.length - 1) + min,
      closed: true
    }]

    // Build alias table
    this.aliasTable = new __WEBPACK_IMPORTED_MODULE_0__alias_table__["a" /* default */](weights)

    // Build pmf and cdf
    let weight = this.aliasTable.weight(0)
    this.pdfTable = [weight]
    this.cdfTable = [weight]
    for (let i = 1; i < weights.length; i++) {
      weight = this.aliasTable.weight(i)
      this.pdfTable.push(weight)
      this.cdfTable.push(this.cdfTable[i - 1] + weight)
    }
  }

  _generator () {
    // Direct sampling
    return this.p.min + this.aliasTable.sample(this.r)
  }

  _pdf (x) {
    if (this.p.n <= 1) {
      return 1
    } else {
      return this.pdfTable[x - this.p.min]
    }
  }

  _cdf (x) {
    return Math.min(1, this.cdfTable[x - this.p.min])
  }
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_matrix_common_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gl_matrix_mat2_js__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gl_matrix_mat2d_js__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gl_matrix_mat3_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gl_matrix_mat4_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gl_matrix_quat_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gl_matrix_quat2_js__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gl_matrix_vec2_js__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__gl_matrix_vec3_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__gl_matrix_vec4_js__ = __webpack_require__(34);
/* unused harmony reexport glMatrix */
/* unused harmony reexport mat2 */
/* unused harmony reexport mat2d */
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__gl_matrix_mat3_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__gl_matrix_mat4_js__; });
/* unused harmony reexport quat */
/* unused harmony reexport quat2 */
/* unused harmony reexport vec2 */
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_8__gl_matrix_vec3_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_9__gl_matrix_vec4_js__; });













/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gl; });
/* harmony export (immutable) */ __webpack_exports__["c"] = setGL;
/* harmony export (immutable) */ __webpack_exports__["b"] = readTextFile;
var gl;
function setGL(_gl) {
    gl = _gl;
}
function readTextFile(file) {
    var text = "";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                text = allText;
            }
        }
    };
    rawFile.send(null);
    return text;
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = erf;
/* harmony export (immutable) */ __webpack_exports__["b"] = erfc;
/* harmony export (immutable) */ __webpack_exports__["c"] = erfinv;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gamma_incomplete__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__algorithms_newton__ = __webpack_require__(51);



const CErfInv = [
  0.0833333333333333,
  0.0145833333333333,
  0.0031498015873016,
  0.00075248704806,
  0.0001907475361251
]

/**
 * Computes the error function.
 *
 * @method erf
 * @memberOf ran.special
 * @param {number} x Value to evaluate the error function at.
 * @returns {number} Error function value.
 * @private
 */
function erf (x) {
  // TODO Replace with continued fraction
  return x < 0
    ? -Object(__WEBPACK_IMPORTED_MODULE_0__gamma_incomplete__["a" /* gammaLowerIncomplete */])(0.5, x * x)
    : Object(__WEBPACK_IMPORTED_MODULE_0__gamma_incomplete__["a" /* gammaLowerIncomplete */])(0.5, x * x)
}

/**
 * Computes the complementary error function.
 *
 * @method erfc
 * @memberOf ran.special
 * @param {number} x Value to evaluate the complementary error function at.
 * @returns {number} Complementary error function value.
 * @private
 */
function erfc (x) {
  // TODO Replace with continued fraction
  return x < 0
    ? 1 + Object(__WEBPACK_IMPORTED_MODULE_0__gamma_incomplete__["a" /* gammaLowerIncomplete */])(0.5, x * x)
    : Object(__WEBPACK_IMPORTED_MODULE_0__gamma_incomplete__["b" /* gammaUpperIncomplete */])(0.5, x * x)
}

/**
 * Computes the inverse error function.
 *
 * @method erfinv
 * @methodOf ran.special
 * @param {number} x Value to evaluate the inverse error function at.
 * @return {number} The inverse error function value.
 * @private
 */
function erfinv (x) {
  // Estimate initial guess using the polynomial
  let x0 = 0
  const x2 = x * x
  let c = 0.5 * Math.pow(Math.PI, 5.5)
  for (let i = CErfInv.length - 1; i >= 0; i--) {
    x0 = (x0 + CErfInv[i] * c) * x2
    c /= Math.PI
  }
  x0 = (x0 + 1) * x

  // Polish with Newton's method
  return Object(__WEBPACK_IMPORTED_MODULE_1__algorithms_newton__["a" /* default */])(
    t => erf(t) - x,
    t => 2 * Math.exp(-t * t) / Math.sqrt(Math.PI),
    x0
  )
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_gamma_incomplete__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [gamma distribution]{@link https://en.wikipedia.org/wiki/Gamma_distribution} using the
 * shape/rate parametrization:
 *
 * $$f(x; \alpha, \beta) = \frac{\beta^\alpha}{\Gamma(\alpha)} x^{\alpha - 1} e^{-\beta x},$$
 *
 * where \(\alpha, \beta > 0\). Support: \(x > 0\).
 *
 * @class Gamma
 * @memberOf ran.dist
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @param {number=} beta Rate parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (alpha = 1, beta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { alpha, beta }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ alpha, beta }, [
      'alpha > 0',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: alpha >= 1
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling
    return Object(__WEBPACK_IMPORTED_MODULE_2__core__["d" /* gamma */])(this.r, this.p.alpha, this.p.beta)
  }

  _pdf (x) {
    return Math.exp(this.p.alpha * Math.log(this.p.beta) - this.p.beta * x - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_gamma__["a" /* default */])(this.p.alpha)) * Math.pow(x, this.p.alpha - 1)
  }

  _cdf (x) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma_incomplete__["a" /* gammaLowerIncomplete */])(this.p.alpha, this.p.beta * x)
  }
});


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_beta__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_beta_incomplete__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [beta distribution]{@link https://en.wikipedia.org/wiki/Beta_distribution}:
 *
 * $$f(x; \alpha, \beta) = \frac{x^{\alpha - 1}(1 - x)^{\beta - 1}}{\mathrm{B}(\alpha, \beta)},$$
 *
 * with \(\alpha, \beta > 0\) and \(\mathrm{B}(\alpha, \beta)\) is the beta function.
 * Support: \(x \in (0, 1)\).
 *
 * @class Beta
 * @memberOf ran.dist
 * @param {number=} alpha First shape parameter. Default value is 1.
 * @param {number=} beta Second shape parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (alpha = 1, beta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { alpha, beta }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ alpha, beta }, [
      'alpha > 0',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: alpha >= 1
    }, {
      value: 1,
      closed: beta >= 1
    }]

    // Speed-up constants
    this.c = [
      Object(__WEBPACK_IMPORTED_MODULE_0__special_beta__["a" /* default */])(alpha, beta),
      alpha - 1,
      beta - 1
    ]
  }

  _generator () {
    // Direct generation
    return Object(__WEBPACK_IMPORTED_MODULE_2__core__["a" /* beta */])(this.r, this.p.alpha, this.p.beta)
  }

  _pdf (x) {
    const a = Math.pow(x, this.c[1])

    const b = Math.pow(1 - x, this.c[2])

    // Handle x = 0 and x = 1 cases
    return Number.isFinite(a) && Number.isFinite(b)
      ? a * b / this.c[0]
      : 0
  }

  _cdf (x) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__special_beta_incomplete__["b" /* regularizedBetaIncomplete */])(this.p.alpha, this.p.beta, x)
  }
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = betaIncomplete;
/* harmony export (immutable) */ __webpack_exports__["b"] = regularizedBetaIncomplete;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_gamma__ = __webpack_require__(2);



// Incomplete beta generator using the continued fraction expansion
function _biContinuedFraction (a, b, x) {
  const qab = a + b

  const qap = a + 1

  const qam = a - 1

  let c = 1

  let d = 1 - qab * x / qap
  d = Math.max(Math.abs(d), __WEBPACK_IMPORTED_MODULE_0__core__["a" /* DELTA */])
  d = 1 / d
  let h = d

  for (let i = 1; i < __WEBPACK_IMPORTED_MODULE_0__core__["c" /* MAX_ITER */]; i++) {
    const m2 = 2 * i

    let aa = i * (b - i) * x / ((qam + m2) * (a + m2))
    d = 1 + aa * d
    d = Math.max(Math.abs(d), __WEBPACK_IMPORTED_MODULE_0__core__["a" /* DELTA */])
    c = 1 + aa / c
    c = Math.max(Math.abs(c), __WEBPACK_IMPORTED_MODULE_0__core__["a" /* DELTA */])
    d = 1 / d
    h *= d * c
    aa = -(a + i) * (qab + i) * x / ((a + m2) * (qap + m2))
    d = 1 + aa * d
    d = Math.max(Math.abs(d), __WEBPACK_IMPORTED_MODULE_0__core__["a" /* DELTA */])
    c = 1 + aa / c
    c = Math.max(Math.abs(c), __WEBPACK_IMPORTED_MODULE_0__core__["a" /* DELTA */])
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]) { break }
  }
  return h
}

/**
 * Incomplete beta function.
 *
 * @method betaIncomplete
 * @memberOf ran.special
 * @param {number} a First parameter of the function.
 * @param {number} b Second parameter of the function.
 * @param {number} x Upper boundary of the integral.
 * @returns {number} Value of the incomplete beta function.
 * @private
 */
function betaIncomplete (a, b, x) {
  const bt = (x <= 0 || x >= 1)
    ? 0
    : Math.exp(a * Math.log(x) + b * Math.log(1 - x))
  // Use I(b, a, x) only if b != 0
  return a !== 0 && (x < (a + 1) / (a + b + 2) || b === 0)
    ? bt * _biContinuedFraction(a, b, x) / a
    : 1 - bt * _biContinuedFraction(b, a, 1 - x) / b
}

/**
   * Regularized incomplete beta function.
   *
   * @method regularizedBetaIncomplete
   * @memberOf ran.special
   * @param {number} a First parameter of the function.
   * @param {number} b Second parameter of the function.
   * @param {number} x Upper boundary of the integral.
   * @returns {number} Value of the incomplete beta function.
   * @private
   */
function regularizedBetaIncomplete (a, b, x) {
  const bt = (x <= 0 || x >= 1)
    ? 0
    : Math.exp(Object(__WEBPACK_IMPORTED_MODULE_1__log_gamma__["a" /* default */])(a + b) - Object(__WEBPACK_IMPORTED_MODULE_1__log_gamma__["a" /* default */])(a) - Object(__WEBPACK_IMPORTED_MODULE_1__log_gamma__["a" /* default */])(b) + a * Math.log(x) + b * Math.log(1 - x))
  return x < (a + 1) / (a + b + 2)
    ? bt * _biContinuedFraction(a, b, x) / a
    : 1 - bt * _biContinuedFraction(b, a, 1 - x) / b
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alias_table__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Base class representing a discrete distribution with pre-computed arrays. This class should be used only when the
 * cumulative probability function is not available in closed form. A basic adaptive alias table is also implemented for
 * the case when there is no simple method to generate random variates.
 *
 * @class PreComputed
 * @memberOf ran.dist
 * @abstract
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (logP = false) {
    super('discrete', arguments.length)

    // Constants
    this.TABLE_SIZE = 1000
    this.MAX_NUMBER_OF_TABLES = 100

    // Logarithmic pdf
    this.logP = logP

    // Look-up tables
    this.aliasTables = []
    this.pdfTable = []
    this.cdfTable = []
  }

  /**
   * Computes the probability mass value for a specified index.
   *
   * @method _pk
   * @methodOf ran.dist.PreComputed
   * @param {number} k Index to computed probability for.
   * @returns {number} The probability for the specified index.
   * @private
   */
  _pk (k) {
    throw Error('PreComputed._pk() is not implemented')
  }

  /**
   * Advances look-up tables for PDF and CDF up to a specific index.
   *
   * @method _advance
   * @methodOf ran.dist.PreComputed
   * @param {number} x The index to advance look-up tables to.
   * @private
   */
  _advance (x) {
    for (let k = this.pdfTable.length; k <= x; k++) {
      // Update probability mass
      const pdf = this._pk(k)
      this.pdfTable.push(pdf)

      // Update cumulative function
      if (typeof this._ck === 'function') {
        this.cdfTable.push(this._ck(k))
      } else {
        this.cdfTable.push((this.cdfTable[this.cdfTable.length - 1] || 0) + (this.logP ? Math.exp(pdf) : pdf))
      }
    }
  }

  /**
   * Adds a new alias table.
   *
   * @method _addAliasTable
   * @methodOf ran.dist.PreComputed
   * @private
   */
  _addAliasTable () {
    // Calculate index offset
    const offset = this.aliasTables.length

    // Compute weights and total weight
    const weights = Array.from({ length: this.TABLE_SIZE }, (d, i) => this._pdf(this.TABLE_SIZE * offset + i))
    let total = weights.reduce((acc, d) => acc + d, 0)
    if (offset > 0) {
      // Add previously accumulated total weight
      total += this.aliasTables[offset - 1].total
    }

    // Add table
    this.aliasTables.push({
      table: new __WEBPACK_IMPORTED_MODULE_0__alias_table__["a" /* default */](weights.concat([1 - total])),
      total
    })
  }

  _generator () {
    // Start with first table
    let tableIndex = 0
    do {
      // Add table if needed
      if (tableIndex >= this.aliasTables.length) {
        this._addAliasTable()
      }

      // Sample from current table
      const i = this.aliasTables[tableIndex].table.sample(this.r)

      // Check if sample is outside of table domain
      if (i === this.TABLE_SIZE) {
        // Increment table index and add new table if needed
        tableIndex++
      } else {
        // Otherwise, return sample
        return i + tableIndex * this.TABLE_SIZE
      }
    } while (tableIndex < this.MAX_NUMBER_OF_TABLES)

    // TODO Should throw an error
    // If did not find sample in max number of tables, return undefined
  }

  _pdf (x) {
    // Check if we already have it in the look-up table
    if (x < this.pdfTable.length) {
      return this.logP ? Math.exp(this.pdfTable[x]) : this.pdfTable[x]
    }

    // If not, compute new values and return f(x)
    this._advance(x)
    return this.logP ? Math.exp(this.pdfTable[x]) : this.pdfTable[x]
  }

  _cdf (x) {
    // If already in table, return value
    if (x < this.cdfTable.length) {
      return this.cdfTable[x]
    }

    // Otherwise, advance to current index and return F(x)
    this._advance(x)
    return Math.min(1, this.cdfTable[x])
  }
});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_core__ = __webpack_require__(3);


/**
 * Class implementing a recursive sum. It is initialized with the zeroth term of the sum, an updater for the term
 * variables and a method that computes the term from the variables. If the module specified accuracy has reached, the
 * iteration stops, otherwise the maximum number of iterations are used.
 *
 * @method recursiveSum
 * @memberOf ran.algorithms
 * @param {Object} x0 Object containing the state of the variables in the zeroth index.
 * @param {Function} preUpdate Function that takes the current state of the variables, the current index and returns the
 * next state of the variables before calculating the delta.
 * @param {Function} deltaFn Function that takes the current state of the variables and returns the term corresponding
 * to the state.
 * @param {Function?} postUpdate Function that takes the current state of the variables, the current index and returns
 * the next state of the variables after calculating the delta.
 * @returns {number} The approximated sum.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (x0, preUpdate, deltaFn, postUpdate) {
  // Init state and sum
  let x = x0
  let sum = deltaFn(x)
  if (postUpdate) {
    x = postUpdate(x, 0)
  }

  // Improve sum recursively
  for (let i = 1; i < __WEBPACK_IMPORTED_MODULE_0__special_core__["c" /* MAX_ITER */]; i++) {
    // Update state
    x = preUpdate(x, i)

    // Update delta and sum
    const delta = deltaFn(x)
    sum += delta

    // Check if accuracy has reached
    if (Math.abs(delta / sum) < __WEBPACK_IMPORTED_MODULE_0__special_core__["b" /* EPS */]) {
      break
    } else {
      // Update state
      if (postUpdate) {
        x = postUpdate(x, i)
      }
    }
  }
  return sum
});


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_gamma__ = __webpack_require__(2);


/**
 * Computes the logarithm of the binomial coefficient for two numbers.
 *
 * @method logBinomial
 * @memberOf ran.special
 * @param {number} n Number of samples.
 * @param {number} k Number of draws
 * @return {number} The logarithm of the binomial coefficient.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (n, k) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__log_gamma__["a" /* default */])(n + 1) - Object(__WEBPACK_IMPORTED_MODULE_0__log_gamma__["a" /* default */])(k + 1) - Object(__WEBPACK_IMPORTED_MODULE_0__log_gamma__["a" /* default */])(n - k + 1)
});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_gamma__ = __webpack_require__(2);


/**
 * Beta function.
 *
 * @method beta
 * @methodOf ran.special
 * @param {number} x First argument.
 * @param {number} y Second argument.
 * @returns {number} The value of the beta function.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (x, y) {
  return Math.exp(Object(__WEBPACK_IMPORTED_MODULE_0__log_gamma__["a" /* default */])(x) + Object(__WEBPACK_IMPORTED_MODULE_0__log_gamma__["a" /* default */])(y) - Object(__WEBPACK_IMPORTED_MODULE_0__log_gamma__["a" /* default */])(x + y))
});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = lambertW1m;
/* harmony export (immutable) */ __webpack_exports__["a"] = lambertW0;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(3);


function _halley (z, w0) {
  let w = w0
  let dw = 0

  for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__core__["c" /* MAX_ITER */]; i++) {
    const y = w * Math.exp(w) - z
    dw = y / ((w + 1) * Math.exp(w) - (w + 2) * y / (2 * w + 2))
    w -= dw
    if (Math.abs(dw / w) < __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]) { break }
  }

  return w
}

/**
 * Computes the Lambert W function (branch -1) using Halley's method.
 * Source: Corless et al: On the Lambert W Function (https://cs.uwaterloo.ca/research/tr/1993/03/W.pdf)
 *
 * @method lamberW1m
 * @memberOf ran.special
 * @param z {number} Value to evaluate the Lambert W function at.
 * @returns {number} Value of the Lambert W function.
 * @private
 */
function lambertW1m (z) {
  // TODO Find better w0
  return _halley(z, -2)
}

/**
 * Computes the Lambert W function (principal branch) using Halley's method.
 * Source: Corless et al: On the Lambert W Function (https://cs.uwaterloo.ca/research/tr/1993/03/W.pdf)
 *
 *
 * @method lambertW0
 * @memberOf ran.special
 * @param {number} z Value to evaluate the Lambert W function at.
 * @returns {number} Value of the Lambert W function.
 * @private
 */
function lambertW0 (z) {
  return _halley(z, z < 1 ? 0 : Math.log(z))
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = invert;

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Sums the element of an array using the robust (but slower) [Neumaier method]{@link https://www.mat.univie.ac.at/~neum/scan/01.pdf}.
 *
 * @method neumaier
 * @memberOf ran.algorithms
 * @param {number[]} arr Array to sum.
 * @returns {number} The sum of the elements in the array.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (arr) {
  const sorted = arr.sort((a, b) => a - b)
  let s = sorted[0]
  let c = 0
  for (let i = 1; i < sorted.length; i++) {
    const t = s + sorted[i]
    if (Math.abs(s) > Math.abs(sorted[i])) {
      c += (s - t) + sorted[i]
    } else {
      c += (sorted[i] - t) + s
    }
    s = t
  }
  return s + c
});


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = besselI;
/* harmony export (immutable) */ __webpack_exports__["b"] = besselISpherical;
/* unused harmony export besselInu */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gamma__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__algorithms_recursive_sum__ = __webpack_require__(15);




/**
 * Computes the modified Bessel function of the first kind with order zero.
 *
 * @method _I0
 * @memberOf ran.special
 * @param {number} x Value to evaluate the function at.
 * @return {number} The function value.
 * @private
 */
function _I0 (x) {
  const y = Math.abs(x)
  let z
  let t

  if (y < 3.75) {
    t = x / 3.75
    t *= t
    z = 1 + t * (3.5156229 + t * (3.0899424 + t * (1.2067492 + t * (0.2659732 + t * (0.360768e-1 + t * 0.45813e-2)))))
  } else {
    t = 3.75 / y
    z = (Math.exp(y) / Math.sqrt(y)) * (0.39894228 + t * (0.1328592e-1 + t * (0.225319e-2 + t * (-0.157565e-2 + t * (0.916281e-2 + t * (-0.2057706e-1 + t * (0.2635537e-1 + t * (-0.1647633e-1 + t * 0.392377e-2))))))))
  }
  return z
}

/**
 * Computes the modified Bessel function of the first kind with order one.
 *
 * @method _I1
 * @memberOf ran.special
 * @param {number} x Value to evaluate the function at.
 * @return {number} The function value.
 * @private
 */
function _I1 (x) {
  const y = Math.abs(x)
  let z
  let t

  if (y < 3.75) {
    t = x / 3.75
    t *= t
    z = y * (0.5 + t * (0.87890594 + t * (0.51498869 + t * (0.15084934 + t * (0.2658733e-1 + t * (0.301532e-2 + t * 0.32411e-3))))))
  } else {
    t = 3.75 / y
    z = 0.2282967e-1 + t * (-0.2895312e-1 + t * (0.1787654e-1 - t * 0.420059e-2))
    z = 0.39894228 + t * (-0.3988024e-1 + t * (-0.362018e-2 + t * (0.163801e-2 + t * (-0.1031555e-1 + t * z))))
    z *= Math.exp(y) / Math.sqrt(y)
  }
  return x < 0 ? -z : z
}

/**
 * Computes the modified spherical Bessel function of the second kind.
 *
 * @method _kn
 * @memberOf ran.special
 * @param {number} n Order of the Bessel function.
 * @param {number} x Value to evaluate the function at.
 * @return {(number|number[])} The function value at the specified order and one order less if order is larger than 1, single function value otherwise.
 * @private
 */
function _kn (n, x) {
  // Upwards recurrence relation
  let k1 = 1 + 1 / x
  let k2 = 1
  let k
  for (let i = 2; i <= n; i++) {
    k = (i + i - 1) * k1 / x + k2
    k2 = k1
    k1 = k
  }
  return [
    Math.exp(-x) * k / x,
    Math.exp(-x) * k2 / x
  ]
}

/**
 * Computes the ratio of two modified Bessel functions (same for spherical).
 *
 * @method _hi
 * @memberOf ran.special
 * @param {number} n Order of the Bessel function in the numerator.
 * @param {number} x Value to evaluate the function at.
 * @return {number} The function value.
 * @private
 */
function _hi (n, x) {
  // Continued fraction (from Numerical methods for special functions)
  let d = x / (n + n + 1)
  let del = d
  let h = del
  let b = (n + n + 3) / x
  for (let i = 1; i < __WEBPACK_IMPORTED_MODULE_0__core__["c" /* MAX_ITER */]; i++) {
    d = 1 / (b + d)
    del = (b * d - 1) * del
    h += del
    b += 2 / x

    if (Math.abs(del / h) < __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]) { break }
  }
  return h
}

/**
 * Computes the modified Bessel function of the first kind. Only integer order.
 *
 * @method besselI
 * @memberOf ran.special
 * @param {number} n Order of the Bessel function. Must be an integer.
 * @param {number} x Value to evaluate the function at.
 * @return {number} The modified Bessel function of the first kind.
 * @private
 */
function besselI (n, x) {
  let bi
  let bim
  let bip
  let y

  if (n === 0) {
    return _I0(x)
  }

  if (n === 1) {
    return _I1(x)
  }

  if (x === 0) {
    return 0
  }

  const tox = 2 / Math.abs(x)
  bip = 0
  y = 0
  bi = 1
  for (let j = 2 * (n + Math.round(Math.sqrt(40 * n))); j > 0; j--) {
    bim = bip + j * tox * bi
    bip = bi
    bi = bim
    if (Math.abs(bi) > 1 / __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]) {
      y *= __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]
      bi *= __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]
      bip *= __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]
    }
    if (j === n) {
      y = bip
    }
  }
  y *= _I0(x) / bi
  return y
}

/**
 * Computes the modified spherical Bessel function of the first kind. Only integer order is supported.
 * Source: http://cpc.cs.qub.ac.uk/summaries/ADGM_v1_0.html (Numerical methods for special functions).
 *
 * @method besselISpherical
 * @memberOf ran.special
 * @param {number} n Order of the spherical Bessel function. Must be an integer.
 * @param {number} x Value to evaluate the function at.
 * @returns {number} The modified spherical Bessel function of the first kind.
 * @private
 */
function besselISpherical (n, x) {
  switch (n) {
    case 0:
      // i0 separately
      return x === 0 ? 1 : Math.sinh(x) / x
    case 1:
      // i1 separately
      return x === 0 ? 0 : (Math.cosh(x) - Math.sinh(x) / x) / x
    default:
      if (n > 0) {
        // Use Wronskian with single run k-calculation
        const k = _kn(n + 1, x)
        return x === 0 ? 0 : 1 / (x * x * (_hi(n + 1, x) * k[1] + k[0]))
      } else {
        // Backward recurrence for negative orders
        return (n + n + 3) * besselISpherical(n + 1, x) / x + besselISpherical(n + 2, x)
      }
  }
}

/**
 * Computes the modified Bessel function of the first kind for fractional order.
 *
 * @method besselInu
 * @memberOf ran.special
 * @param {number} nu Order of the Bessel function. Should be fractional.
 * @param {number} x Value to evaluate the function at.
 * @returns {number} The modified Bessel function of the first kind.
 * @private
 */
function besselInu (nu, x) {
  return Math.pow(x / 2, nu) * Object(__WEBPACK_IMPORTED_MODULE_2__algorithms_recursive_sum__["a" /* default */])({
    c: 1 / Object(__WEBPACK_IMPORTED_MODULE_1__gamma__["a" /* default */])(nu + 1)
  }, (t, i) => {
    t.c *= x * x / (4 * i * (nu + i))
    return t
  }, t => t.c)
}


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__globals__ = __webpack_require__(9);

class Drawable {
    constructor() {
        this.count = 0;
        this.idxGenerated = false;
        this.posGenerated = false;
        this.norGenerated = false;
        this.colGenerated = false;
        this.meshIdGenerated = false;
        this.instanceIdGenerated = false;
        this.translateGenerated = false;
        this.uvGenerated = false;
        this.transform1Generated = false;
        this.transform2Generated = false;
        this.transform3Generated = false;
        this.transform4Generated = false;
        this.numInstances = 0; // How many instances of this Drawable the shader program should draw
    }
    destory() {
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufIdx);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufPos);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufNor);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufCol);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufTranslate);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufUV);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufMeshId);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufInstanceId);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufTransform1);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufTransform2);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufTransform3);
        __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].deleteBuffer(this.bufTransform4);
    }
    generateIdx() {
        this.idxGenerated = true;
        this.bufIdx = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generatePos() {
        this.posGenerated = true;
        this.bufPos = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generateNor() {
        this.norGenerated = true;
        this.bufNor = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generateCol() {
        this.colGenerated = true;
        this.bufCol = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generateMeshId() {
        this.meshIdGenerated = true;
        this.bufMeshId = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generateInstanceId() {
        this.instanceIdGenerated = true;
        this.bufInstanceId = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generateTranslate() {
        this.translateGenerated = true;
        this.bufTranslate = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generateTransform1() {
        this.transform1Generated = true;
        this.bufTransform1 = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generateTransform2() {
        this.transform2Generated = true;
        this.bufTransform2 = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generateTransform3() {
        this.transform3Generated = true;
        this.bufTransform3 = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generateTransform4() {
        this.transform4Generated = true;
        this.bufTransform4 = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    generateUV() {
        this.uvGenerated = true;
        this.bufUV = __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].createBuffer();
    }
    bindIdx() {
        if (this.idxGenerated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ELEMENT_ARRAY_BUFFER, this.bufIdx);
        }
        return this.idxGenerated;
    }
    bindPos() {
        if (this.posGenerated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufPos);
        }
        return this.posGenerated;
    }
    bindNor() {
        if (this.norGenerated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufNor);
        }
        return this.norGenerated;
    }
    bindCol() {
        if (this.colGenerated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufCol);
        }
        return this.colGenerated;
    }
    bindMeshId() {
        if (this.meshIdGenerated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufMeshId);
        }
        return this.meshIdGenerated;
    }
    bindInstanceId() {
        if (this.instanceIdGenerated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufInstanceId);
        }
        return this.instanceIdGenerated;
    }
    bindTranslate() {
        if (this.translateGenerated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufTranslate);
        }
        return this.translateGenerated;
    }
    bindUV() {
        if (this.uvGenerated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufUV);
        }
        return this.uvGenerated;
    }
    bindTransform1() {
        if (this.transform1Generated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufTransform1);
        }
        return this.transform1Generated;
    }
    bindTransform2() {
        if (this.transform2Generated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufTransform2);
        }
        return this.transform2Generated;
    }
    bindTransform3() {
        if (this.transform3Generated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufTransform3);
        }
        return this.transform3Generated;
    }
    bindTransform4() {
        if (this.transform4Generated) {
            __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].ARRAY_BUFFER, this.bufTransform4);
        }
        return this.transform4Generated;
    }
    elemCount() {
        return this.count;
    }
    drawMode() {
        return __WEBPACK_IMPORTED_MODULE_0__globals__["a" /* gl */].TRIANGLES;
    }
    setNumInstances(num) {
        this.numInstances = num;
    }
}
;
/* harmony default export */ __webpack_exports__["a"] = (Drawable);


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = normalize;

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    var len = x*x + y*y + z*z
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len)
        out[0] = a[0] * len
        out[1] = a[1] * len
        out[2] = a[2] * len
    }
    return out
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Class representing a real vector.
 *
 * @class Vector
 * @memberOf ran.la
 * @param {(number|Array|ran.la.Vector)=} arg The constructor argument. If it is a number, it sets the
 * dimension of the vector. If it is an array, the vector is initialized with the array elements. If it is
 * another vector, it is copied to this vector. If not specified, a 3D vector is created directing in the X
 * axis.
 * @constructor
 * @example
 *
 * let vec1 = new ran.la.Vector()
 * let vec2 = new ran.la.Vector(3)
 * let vec3 = new ran.la.Vector([1, 0, 0])
 * let vec4 = new ran.la.Vector(vec1)
 * // => ( 1, 0, 0 )
 *
 */
class Vector {
  constructor (arg) {
    if (typeof arg === 'number') {
      this._v = new Array(arg).fill(0)
      this._v[0] = 1
    } else if (Array.isArray(arg)) {
      this._v = arg
    } else if (typeof arg === 'object' && Array.isArray(arg._v)) {
      this._v = arg._v
    } else {
      this._v = [1, 0, 0]
    }
  }

  /**
   * Returns the vector as an array.
   *
   * @method v
   * @memberOf ran.la.Vector
   * @returns {Array} The vector as an array.
   * @example
   *
   * let vec = new ran.la.Vector(3)
   * vec.v()
   * // => [ 1, 0, 0 ]
   *
   */
  v () {
    return this._v
  }

  /**
   * Returns or sets an element of the vector.
   *
   * @method i
   * @memberOf ran.la.Vector
   * @param {number} i Index of the element.
   * @param {number=} value The new value of the i-th element. If not specified, the value at i is returned.
   * @example
   *
   * let v = new ran.la.Vector()
   *
   * v.i(0)
   * // => 1
   *
   * v.i(1)
   * // => 0
   *
   * v.i(1, 2)
   * // => ( 1, 2, 0 )
   *
   */
  i (i, value) {
    if (typeof value !== 'undefined') {
      this._v[i] = value
    } else {
      return this._v[i]
    }
  }

  /**
   * Performs an operation on the vector element-wise.
   *
   * @method f
   * @memberOf ran.la.Vector
   * @param {Function} func Function to apply on each element.
   * @returns {Vector} The transformed matrix.
   * @example
   *
   * let v = new ran.la.Vector([1, 2, 3])
   * v.f(d => d * d)
   * // => ( 1, 4, 9 )
   *
   */
  f (func) {
    return new Vector(this._v.map(d => func(d)))
  }

  /**
   * Multiplies this vector with a scalar.
   *
   * @method scale
   * @memberOf ran.la.Vector
   * @param {number} s Scalar to multiply vector with.
   * @returns {Vector} The scaled vector.
   * @example
   *
   * let vec = new ran.la.Vector([1, 2, 3])
   * vec.scale(2)
   * // => ( 2, 4, 6 )
   *
   */
  scale (s) {
    return new Vector(this._v.map(d => d * s))
  }

  /**
   * Adds another vector to this vector.
   *
   * @method add
   * @memberOf ran.la.Vector
   * @param {Vector} vec The vector to add.
   * @returns {Vector} The sum vector.
   * @example
   *
   * let v = new ran.la.Vector([1, 2, 3])
   * let w = new ran.la.Vector([4, 5, 6])
   * v.add(w)
   * // => ( 5, 7, 9 )
   *
   */
  add (vec) {
    const v = vec.v()
    return new Vector(this._v.map((d, i) => d + v[i]))
  }

  /**
   * Subtracts another vector from this vector.
   *
   * @method sub
   * @memberOf ran.la.Vector
   * @param {Vector} vec The vector to subtract.
   * @returns {Vector} The difference vector.
   * @example
   *
   * let v = new ran.la.Vector([4, 5, 6])
   * let w = new ran.la.Vector([1, 1, 1])
   * v.sub(w)
   * // => ( 3, 4, 5 )
   *
   */
  sub (vec) {
    const v = vec.v()
    return new Vector(this._v.map((d, i) => d - v[i]))
  }

  /**
   * Calculates the dot product with another vector.
   *
   * @method dot
   * @memberOf ran.la.Vector
   * @param {Vector} vec Vector to multiply with.
   * @returns {number} The dot product.
   * @example
   *
   * let v = new ran.la.Vector([1, 2, 3])
   * let w = new ran.la.Vector([4, 5, 6])
   * v.dot(w)
   * // => 32
   *
   */
  dot (vec) {
    const v = vec.v()
    return this._v.reduce((sum, d, i) => sum + d * v[i], 0)
  }

  outer (vec) {
    return this._v.map(u => vec.scale(u).v())
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Vector);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Class implementing an [alias table]{@link https://en.wikipedia.org/wiki/Alias_method} with a sampler.
 *
 * @class AliasTable
 * @memberOf ran.dist
 * @param {number[]} weights The (unnormalized) weights for the alias table.
 * @constructor
 * @ignore
 */
/* harmony default export */ __webpack_exports__["a"] = (class {
  constructor (weights) {
    // Pre-compute tables
    this.n = weights.length

    this.prob = [0]

    this.alias = [0]

    let total = 0
    if (weights.length > 1) {
      // Get sum (for normalization)
      for (let i = 0; i < this.n; i++) { total += weights[i] }

      // Fill up small and large work lists
      const p = []

      const small = []

      const large = []
      for (let i = 0; i < this.n; i++) {
        p.push(this.n * weights[i] / total)
        if (p[i] < 1.0) { small.push(i) } else { large.push(i) }
      }

      // Init tables
      this.prob = []
      this.alias = []
      for (let i = 0; i < this.n; i++) {
        this.prob.push(1.0)
        this.alias.push(i)
      }

      // Fill up alias table
      let s = 0

      let l = 0
      while (small.length > 0 && large.length > 0) {
        s = small.shift()
        l = large.shift()

        this.prob[s] = p[s]
        this.alias[s] = l

        p[l] += p[s] - 1.0
        if (p[l] < 1.0) { small.push(l) } else { large.push(l) }
      }
      while (large.length > 0) {
        l = large.shift()
        this.prob[l] = 1.0
        this.alias[l] = l
      }
      while (small.length > 0) {
        s = small.shift()
        this.prob[s] = 1.0
        this.alias[s] = s
      }
    }

    // Normalized weights
    this.weights = weights.map(d => d / total)
  }

  /**
   * Returns a sample from the alias table.
   *
   * @method sample
   * @methodOf ran.dist.AliasTable
   * @param {ran.core.Xoshiro128p} r Pseudo random number generator to use.
   * @returns {number} The random sample.
   */
  sample (r) {
    if (this.n <= 1) {
      return 0
    }

    const i = Math.floor(r.next() * this.n)
    return r.next() < this.prob[i] ? i : this.alias[i]
  }

  /**
   * Returns the i-th weight of the alias table.
   *
   * @method weight
   * @methodOf ran.dist.AliasTable
   * @param {number} i Index of the weight to return.
   * @returns {number} The i-th weight.
   */
  weight (i) {
    return this.weights[i]
  }
});


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gamma__ = __webpack_require__(11);



/**
 * Generator for the [\(\chi^2\) distribution]{@link https://en.wikipedia.org/wiki/Chi-squared_distribution}:
 *
 * $$f(x; k) = \frac{1}{2^{k/2} \Gamma(k/2)} x^{k/2 - 1} e^{-x/2},$$
 *
 * where \(k \in \mathbb{N}^+\). Support: \(x > 0\).
 *
 * @class Chi2
 * @memberOf ran.dist
 * @param {number=} k Degrees of freedom. If not an integer, is rounded to the nearest one. Default value is 2.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_1__gamma__["a" /* default */] {
  // Special case of gamma
  constructor (k = 2) {
    super(Math.round(k) / 2, 0.5)

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ k }, [
      'k > 0'
    ])
  }
});


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exponential__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Weibull distribution]{@link https://en.wikipedia.org/wiki/Weibull_distribution}:
 *
 * $$f(x; \lambda, k) = \frac{k}{\lambda}\bigg(\frac{x}{\lambda}\bigg)^{k - 1} e^{-(x / \lambda)^k},$$
 *
 * with \(\lambda, k > 0\). Support: \(x \ge 0\).
 *
 * @class Weibull
 * @memberOf ran.dist
 * @param {number=} lambda Scale parameter. Default value is 1.
 * @param {number=} k Shape parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__exponential__["a" /* default */] {
  // Transformation of exponential distribution
  constructor (lambda = 1, k = 1) {
    super(1)

    // Validate parameters
    this.p = Object.assign(this.p, { lambda2: lambda, k })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ lambda, k }, [
      'lambda > 0',
      'k > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: k >= 1
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming exponential variate
    return this.p.lambda2 * Math.pow(super._generator(), 1 / this.p.k)
  }

  _pdf (x) {
    return this.p.k * Math.pow(x / this.p.lambda2, this.p.k - 1) * super._pdf(Math.pow(x / this.p.lambda2, this.p.k)) / this.p.lambda2
  }

  _cdf (x) {
    return super._cdf(Math.pow(x / this.p.lambda2, this.p.k))
  }

  _q (p) {
    return this.p.lambda2 * Math.pow(-Math.log(1 - p), 1 / this.p.k)
  }
});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Coefficients
const coeffs = [
  676.5203681218851,
  -1259.1392167224028,
  771.32342877765313,
  -176.61502916214059,
  12.507343278686905,
  -0.13857109526572012,
  9.9843695780195716e-6,
  1.5056327351493116e-7
]
const SQRT_PI2 = Math.sqrt(2 * Math.PI)

/**
   * Gamma function, using the Lanczos approximation.
   *
   * @method gamma
   * @memberOf ran.special
   * @param {number} z Value to evaluate Gamma function at.
   * @returns {number} Gamma function value.
   * @private
   */
function _gamma (z) {
  let y = 0
  if (z < 0.5) {
    y = Math.PI / (Math.sin(Math.PI * z) * _gamma(1 - z))
  } else {
    z--
    let x = 0.99999999999980993

    const l = coeffs.length
    coeffs.forEach((c, i) => {
      x += c / (z + i + 1)
    })
    const t = z + l - 0.5
    y = SQRT_PI2 * Math.pow(t, (z + 0.5)) * Math.exp(-t) * x
  }
  return y
}

/* harmony default export */ __webpack_exports__["a"] = (_gamma);


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__algorithms_newton__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gamma_incomplete__ = __webpack_require__(6);





/**
 * Series expansion of the Marcum-Q function. Section 3 in https://arxiv.org/pdf/1311.0681.pdf.
 *
 * @namespace _seriesExpansion
 * @memberOf ran.special
 * @private
 */
const _seriesExpansion = {
  q (mu, x, y) {
    // Initialize terms with k = 0, Eq. (7)
    // ck = x^k / k!
    let ck = 1

    // qck = y^{mu + k - 1} e^{-y} / gamma(mu + k - 1)
    let qck = Math.exp((mu - 1) * Math.log(y) - y - Object(__WEBPACK_IMPORTED_MODULE_2__log_gamma__["a" /* default */])(mu))

    // qk = Q_{mu + k}(y)
    let qk = Object(__WEBPACK_IMPORTED_MODULE_3__gamma_incomplete__["b" /* gammaUpperIncomplete */])(mu, y)
    let dz = ck * qk
    let z = dz

    for (let k = 1; k < __WEBPACK_IMPORTED_MODULE_0__core__["c" /* MAX_ITER */]; k++) {
      // Update coefficients
      // Eq. (18)
      qck *= y / (mu + k - 1)
      qk += qck
      ck *= x / k
      dz = ck * qk

      // Update sum
      z += dz

      // Check if we should stop
      if (dz / z < __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]) { break }
    }

    return Math.exp(-x) * z
  },

  p (mu, x, y) {
    // Find truncation number using Eqs. (26) - (27)
    // Define some constants to speed up search
    const c0 = mu + Object(__WEBPACK_IMPORTED_MODULE_2__log_gamma__["a" /* default */])(mu) - Math.log(2 * Math.PI * __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */])
    const c1 = Math.log(x * y)
    const c2 = x * y
    let n = Object(__WEBPACK_IMPORTED_MODULE_1__algorithms_newton__["a" /* default */])(
      t => (t + mu) * Math.log(t + mu) + t * Math.log(t) - 2 * t - t * c1 - c0,
      t => Math.log(t * (t + mu) / c2),
      0.5 * (Math.sqrt(mu * mu + 4 * x * y) - mu) + 1
    )
    n = Math.ceil(n)

    // Initialize terms with last index, Eq. (7)
    // ck = x^k / k!
    let ck = Math.exp(n * Math.log(x) - Object(__WEBPACK_IMPORTED_MODULE_2__log_gamma__["a" /* default */])(n + 1))

    // qck = y^{mu + k} e^{-y} / gamma(mu + k)
    let pck = Math.exp((mu + n) * Math.log(y) - y - Object(__WEBPACK_IMPORTED_MODULE_2__log_gamma__["a" /* default */])(mu + n + 1))

    // pk = P_{\mu + k}(y)
    let pk = Object(__WEBPACK_IMPORTED_MODULE_3__gamma_incomplete__["a" /* gammaLowerIncomplete */])(mu + n, y)
    let dz = ck * pk
    let z = dz

    for (let k = n - 1; k >= 0; k--) {
      // Update coefficients
      // Eq. (19)
      pck *= (mu + k + 1) / y
      pk += pck
      ck *= (k + 1) / x
      dz = ck * pk

      // Update sum
      z += dz
    }

    return 1 - Math.exp(-x) * z
  }
}

/**
 * Asymptotic expansion for large xi. Section 4.1 in https://arxiv.org/pdf/1311.0681.pdf.
 *
 * @namespace _seriesExpansion
 * @memberOf ran.special
 * @private
 */
/* const _asymptoticExpansionLargeXi = (function() {
  function _aelx(mu, x, y, complementary) {
    // Calculate scale variables
    let xi = 2 * Math.sqrt(x * y)
    let sigma = Math.pow(Math.sqrt(y) - Math.sqrt(x), 2) / xi
    let rho = Math.sqrt(y / x)

    // am = A_n(mu)
    // am1 = A_n(mu - 1)
    let am = 1
    let am1 = 1

    // phic = e^{-sigma xi} xi^{-n + 1/2}
    let phic = Math.exp(-sigma * xi) * Math.sqrt(xi)
    let phi = Math.sqrt(Math.PI / sigma) * erfc(Math.sqrt(y) - Math.sqrt(x))

    // psic = (-1)^n rho^mu / (2 sqrt(pi))
    let psic = 0.5 * Math.pow(rho, mu) / Math.sqrt(2 * Math.PI)
    let psi = complementary ? 0.5 * Math.pow(rho, mu - 0.5) * erfc(Math.sqrt(y) - Math.sqrt(x)) : psic * (am1 - am / rho) * phi
    let z = psi

    // TODO Reverse iteration: n0 = sigma * xi and backwards for numerical stability
    for (let n = 1; n < MAX_ITER; n++) {
      // A_n(mu) and A_n(mu - 1)
      am *= -(Math.pow(2 * n - 1, 2) - 4 * mu * mu) / (8 * n)
      am1 *= -(Math.pow(2 * n - 1, 2) - 4 * (mu - 1) * (mu - 1)) / (8 * n)

      // Phi
      phic /= xi
      phi = (phic - sigma * phi) / (n - 0.5)

      // Psi
      psic *= -1
      psi = psic * (am1 - am / rho) * phi

      // Update Q or P
      z = complementary ? z - psi : z + psi

      // Check if we should stop
      if (Math.abs(psi) / z < EPS) { break }
    }

    return z
  }

  return {
    q (mu, x, y) {
      return _aelx(mu, x, y, false)
    },

    p (mu, x, y) {
      return 1 - _aelx(mu, x, y, true)
    }
  }
})() */

/**
 * Recurrence relation evaluation.
 *
 * @namespace _recurrence
 * @memberOf ran.special
 * @private
 */
/* const _recurrence = (function() {
  function _fc(pnu, z) {
    let m = 0
    let b = 2 * pnu / z
    let a = 1
    let res = DELTA
    let c0 = res
    let d0 = 0
    let delta = 0
    do {
      d0 = b + a * d0
      if (Math.abs(d0) < DELTA){
        d0 = DELTA
      }
      c0 = b + a / c0
      if (Math.abs(c0) < DELTA) {
        c0 = DELTA
      }
      d0 = 1 / d0
      delta = c0 * d0
      res = res * delta
      m = m + 1
      a = 1
      b = 2 * (pnu + m) / z
    } while (Math.abs(delta - 1) > EPS)
    return res
  }

  function _pqTrap(mu, x, y, p, q, ierr) {
    let xs = x / mu
    let ys = y / mu
    let xis2 = 4 * xs * ys
    let wxis = Math.sqrt(1 + xis2)
    let a = 0
    let b= 3
    let epstrap = 1e-13
    let pq = _trap(a, b, epstrap, xis2, mu, wxis, ys)
    let zeta = _zetaxy(xs, ys)
    if ((-mu * 0.5 * zeta * zeta) < Math.log(DELTA)) {
      if (y > x + mu) {
        return {
          q: 0,
          p: 1
        }
      } else {
        return {
          q: 1,
          p: 0
        }
      }
    } else {
      pq = pq * Math.exp(-mu * 0.5 * zeta * zeta) / Math.PI
      if (zeta < 0) {
        return {
          q: pq,
          p: 1 - pq
        }
      } else {
        return {
          q: 1 + pq,
          p: -pq
        }
      }
    }
  }

  return {
    q(mu, x, y) {
      return undefined
    },

    p(mu, x, y) {
      let b = 1
      let nu = y - x + b * b + b * Math.sqrt(2 * (x + y) + b * b)
      let n1 = Math.floor(mu)
      let n2 = Math.floor(nu) + 2
      let n3 = n2 - n1
      let mur = mu + n3
      let xi = 2 * Math.sqrt(x * y)
      let cmu = Math.sqrt(y / x) * _fc(mur, xi)
      let p1 = _pqTrap(mur, x, y)
      let p0 = _pqTrap(mur, x, y)
      let z = 0
      for (let n = 0; n < n3 - 1; n++) {
        z = ((1 + cmu) * p0 - p1) / cmu
        p1 = p0
        p0 = z
        cmu = y / (mur - n - 1 + x * cmu)
      }
      return 1 - z
    }
  }
})() */

/**
 * Computes the generalized Marcum-Q function. Only accurate in x < 30.
 * Implementation source: https://arxiv.org/pdf/1311.0681.pdf.
 *
 * @method marcumQ
 * @memberOf ran.special
 * @param {number} mu The order of the function.
 * @param {number} x First variable.
 * @param {number} y Second variable.
 * @return {?number} The generalized Marcum-Q function at the specified values. If evaluated at an unsupported point, it
 * returns undefined.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (mu, x, y) {
  // Pick primary function
  const primary = y > x + mu ? 'q' : 'p'
  // console.log(primary)

  // Special cases
  if (y === 0) {
    return 1
  }
  if (x === 0) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__gamma_incomplete__["b" /* gammaUpperIncomplete */])(mu, y)
  }

  // Series expansion
  // if (x < 30) {
  return _seriesExpansion[primary](mu, x, y)
  // }

  // Asymptotic expansion
  /* let xi = 2 * Math.sqrt(x * y)
  if (xi > 30 && mu * mu < 2 * xi) {
    return _asymptoticExpansionLargeXi[primary](mu, x, y)
  }

  /*let s = Math.sqrt(4 * x + 2 * mu)
  let f1 = x + mu - s
  let f2 = x + mu + s
  if (f1 < y && y < f2) {
    if (mu < 135) {
      // TODO recurrence relations
      console.log('recurrence')
      return _recurrence[primary](mu, x, y)
    } else {
      // TODO asymptotic expansion
      console.log('asymptotic large mu')
      return undefined
    }
  }
  console.log('integral')

  // Integral
  return undefined */
});


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["fromMat4"] = fromMat4;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["transpose"] = transpose;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["adjoint"] = adjoint;
/* harmony export (immutable) */ __webpack_exports__["determinant"] = determinant;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["translate"] = translate;
/* harmony export (immutable) */ __webpack_exports__["rotate"] = rotate;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["fromTranslation"] = fromTranslation;
/* harmony export (immutable) */ __webpack_exports__["fromRotation"] = fromRotation;
/* harmony export (immutable) */ __webpack_exports__["fromScaling"] = fromScaling;
/* harmony export (immutable) */ __webpack_exports__["fromMat2d"] = fromMat2d;
/* harmony export (immutable) */ __webpack_exports__["fromQuat"] = fromQuat;
/* harmony export (immutable) */ __webpack_exports__["normalFromMat4"] = normalFromMat4;
/* harmony export (immutable) */ __webpack_exports__["projection"] = projection;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["frob"] = frob;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalar"] = multiplyScalar;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalarAndAdd"] = multiplyScalarAndAdd;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(4);


/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
function create() {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](9);
  if (__WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
function clone(a) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;

  // Calculate the determinant
  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];

  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;

  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;

  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];

  out[0] = a00;
  out[1] = a01;
  out[2] = a02;

  out[3] = a10;
  out[4] = a11;
  out[5] = a12;

  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);

  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;

  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;

  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function scale(out, a, v) {
  var x = v[0],
      y = v[1];

  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];

  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];

  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);

  out[0] = c;
  out[1] = s;
  out[2] = 0;

  out[3] = -s;
  out[4] = c;
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;

  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;

  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;

  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;

  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;

  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;

  return out;
}

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

  return out;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
}

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
}

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7],
      a8 = a[8];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8];
  return Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
var sub = subtract;

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["transpose"] = transpose;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["adjoint"] = adjoint;
/* harmony export (immutable) */ __webpack_exports__["determinant"] = determinant;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["translate"] = translate;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["rotate"] = rotate;
/* harmony export (immutable) */ __webpack_exports__["rotateX"] = rotateX;
/* harmony export (immutable) */ __webpack_exports__["rotateY"] = rotateY;
/* harmony export (immutable) */ __webpack_exports__["rotateZ"] = rotateZ;
/* harmony export (immutable) */ __webpack_exports__["fromTranslation"] = fromTranslation;
/* harmony export (immutable) */ __webpack_exports__["fromScaling"] = fromScaling;
/* harmony export (immutable) */ __webpack_exports__["fromRotation"] = fromRotation;
/* harmony export (immutable) */ __webpack_exports__["fromXRotation"] = fromXRotation;
/* harmony export (immutable) */ __webpack_exports__["fromYRotation"] = fromYRotation;
/* harmony export (immutable) */ __webpack_exports__["fromZRotation"] = fromZRotation;
/* harmony export (immutable) */ __webpack_exports__["fromRotationTranslation"] = fromRotationTranslation;
/* harmony export (immutable) */ __webpack_exports__["fromQuat2"] = fromQuat2;
/* harmony export (immutable) */ __webpack_exports__["getTranslation"] = getTranslation;
/* harmony export (immutable) */ __webpack_exports__["getScaling"] = getScaling;
/* harmony export (immutable) */ __webpack_exports__["getRotation"] = getRotation;
/* harmony export (immutable) */ __webpack_exports__["fromRotationTranslationScale"] = fromRotationTranslationScale;
/* harmony export (immutable) */ __webpack_exports__["fromRotationTranslationScaleOrigin"] = fromRotationTranslationScaleOrigin;
/* harmony export (immutable) */ __webpack_exports__["fromQuat"] = fromQuat;
/* harmony export (immutable) */ __webpack_exports__["frustum"] = frustum;
/* harmony export (immutable) */ __webpack_exports__["perspective"] = perspective;
/* harmony export (immutable) */ __webpack_exports__["perspectiveFromFieldOfView"] = perspectiveFromFieldOfView;
/* harmony export (immutable) */ __webpack_exports__["ortho"] = ortho;
/* harmony export (immutable) */ __webpack_exports__["lookAt"] = lookAt;
/* harmony export (immutable) */ __webpack_exports__["targetTo"] = targetTo;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["frob"] = frob;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalar"] = multiplyScalar;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalarAndAdd"] = multiplyScalarAndAdd;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(4);


/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](16);
  if (__WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];

    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return out;
}

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  // Cache only the current line of the second matrix
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00 = void 0,
      a01 = void 0,
      a02 = void 0,
      a03 = void 0;
  var a10 = void 0,
      a11 = void 0,
      a12 = void 0,
      a13 = void 0;
  var a20 = void 0,
      a21 = void 0,
      a22 = void 0,
      a23 = void 0;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
    a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
    a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

    out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
    out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
    out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];

  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s = void 0,
      c = void 0,
      t = void 0;
  var a00 = void 0,
      a01 = void 0,
      a02 = void 0,
      a03 = void 0;
  var a10 = void 0,
      a11 = void 0,
      a12 = void 0,
      a13 = void 0;
  var a20 = void 0,
      a21 = void 0,
      a22 = void 0,
      a23 = void 0;
  var b00 = void 0,
      b01 = void 0,
      b02 = void 0;
  var b10 = void 0,
      b11 = void 0,
      b12 = void 0;
  var b20 = void 0,
      b21 = void 0,
      b22 = void 0;

  if (len < __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */]) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
  a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
  a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s = void 0,
      c = void 0,
      t = void 0;

  if (len < __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */]) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {quat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */
function fromQuat2(out, a) {
  var translation = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];

  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  //Only scale if it makes sense
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
}

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];

  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);

  return out;
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
function getRotation(out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  var trace = mat[0] + mat[5] + mat[10];
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S;
    out[2] = (mat[1] - mat[4]) / S;
  } else if (mat[0] > mat[5] && mat[0] > mat[10]) {
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S;
    out[2] = (mat[8] + mat[2]) / S;
  } else if (mat[5] > mat[10]) {
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S;
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S;
  } else {
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  var sx = s[0];
  var sy = s[1];
  var sz = s[2];

  var ox = o[0];
  var oy = o[1];
  var oz = o[2];

  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;

  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;

  return out;
}

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;

  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;

  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;

  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;

  return out;
}

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}

/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf = void 0;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);

  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
  var x0 = void 0,
      x1 = void 0,
      x2 = void 0,
      y0 = void 0,
      y1 = void 0,
      y2 = void 0,
      z0 = void 0,
      z1 = void 0,
      z2 = void 0,
      len = void 0;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] && Math.abs(eyey - centery) < __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] && Math.abs(eyez - centerz) < __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */]) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;

  len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;

  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;

  len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;

  return out;
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];

  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];

  var len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;

  len = x0 * x0 + x1 * x1 + x2 * x2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
}

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
}

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];

  return Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
var sub = subtract;

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = create;
/* unused harmony export identity */
/* unused harmony export setAxisAngle */
/* unused harmony export getAxisAngle */
/* unused harmony export multiply */
/* harmony export (immutable) */ __webpack_exports__["e"] = rotateX;
/* harmony export (immutable) */ __webpack_exports__["f"] = rotateY;
/* harmony export (immutable) */ __webpack_exports__["g"] = rotateZ;
/* unused harmony export calculateW */
/* unused harmony export slerp */
/* unused harmony export random */
/* unused harmony export invert */
/* unused harmony export conjugate */
/* unused harmony export fromMat3 */
/* unused harmony export fromEuler */
/* unused harmony export str */
/* unused harmony export clone */
/* unused harmony export fromValues */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return copy; });
/* unused harmony export set */
/* unused harmony export add */
/* unused harmony export mul */
/* unused harmony export scale */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return dot; });
/* unused harmony export lerp */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return length; });
/* unused harmony export len */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return squaredLength; });
/* unused harmony export sqrLen */
/* unused harmony export normalize */
/* unused harmony export exactEquals */
/* unused harmony export equals */
/* unused harmony export rotationTo */
/* unused harmony export sqlerp */
/* unused harmony export setAxes */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mat3_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vec3_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vec4_js__ = __webpack_require__(34);





/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
function create() {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](4);
  if (__WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  out[3] = 1;
  return out;
}

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);
  if (s > __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */]) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateX(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateY(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateZ(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];

  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */
function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

  var omega = void 0,
      cosom = void 0,
      sinom = void 0,
      scale0 = void 0,
      scale1 = void 0;

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  // adjust signs (if necessary)
  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  // calculate coefficients
  if (1.0 - cosom > __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */]) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;

  return out;
}

/**
 * Generates a random quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function random(out) {
  // Implementation of http://planning.cs.uiuc.edu/node198.html
  // TODO: Calling random 3 times is probably not the fastest solution
  var u1 = __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* RANDOM */]();
  var u2 = __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* RANDOM */]();
  var u3 = __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* RANDOM */]();

  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);

  out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
  return out;
}

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0;

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot = void 0;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;

    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}

/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */
function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;

  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);

  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;

  return out;
}

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
var clone = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["clone"];

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
var fromValues = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["fromValues"];

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
var copy = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["copy"];

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
var set = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["set"];

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
var add = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["add"];

/**
 * Alias for {@link quat.multiply}
 * @function
 */
var mul = multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
var scale = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["scale"];

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
var dot = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["dot"];

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */
var lerp = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["lerp"];

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */
var length = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["length"];

/**
 * Alias for {@link quat.length}
 * @function
 */
var len = length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
var squaredLength = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["squaredLength"];

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
var sqrLen = squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
var normalize = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["normalize"];

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
var exactEquals = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["exactEquals"];

/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
var equals = __WEBPACK_IMPORTED_MODULE_3__vec4_js__["equals"];

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
var rotationTo = function () {
  var tmpvec3 = __WEBPACK_IMPORTED_MODULE_2__vec3_js__["create"]();
  var xUnitVec3 = __WEBPACK_IMPORTED_MODULE_2__vec3_js__["fromValues"](1, 0, 0);
  var yUnitVec3 = __WEBPACK_IMPORTED_MODULE_2__vec3_js__["fromValues"](0, 1, 0);

  return function (out, a, b) {
    var dot = __WEBPACK_IMPORTED_MODULE_2__vec3_js__["dot"](a, b);
    if (dot < -0.999999) {
      __WEBPACK_IMPORTED_MODULE_2__vec3_js__["cross"](tmpvec3, xUnitVec3, a);
      if (__WEBPACK_IMPORTED_MODULE_2__vec3_js__["len"](tmpvec3) < 0.000001) __WEBPACK_IMPORTED_MODULE_2__vec3_js__["cross"](tmpvec3, yUnitVec3, a);
      __WEBPACK_IMPORTED_MODULE_2__vec3_js__["normalize"](tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      __WEBPACK_IMPORTED_MODULE_2__vec3_js__["cross"](tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
}();

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */
var sqlerp = function () {
  var temp1 = create();
  var temp2 = create();

  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));

    return out;
  };
}();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
var setAxes = function () {
  var matr = __WEBPACK_IMPORTED_MODULE_1__mat3_js__["create"]();

  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];

    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];

    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];

    return normalize(out, fromMat3(out, matr));
  };
}();

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["length"] = length;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["divide"] = divide;
/* harmony export (immutable) */ __webpack_exports__["ceil"] = ceil;
/* harmony export (immutable) */ __webpack_exports__["floor"] = floor;
/* harmony export (immutable) */ __webpack_exports__["min"] = min;
/* harmony export (immutable) */ __webpack_exports__["max"] = max;
/* harmony export (immutable) */ __webpack_exports__["round"] = round;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["scaleAndAdd"] = scaleAndAdd;
/* harmony export (immutable) */ __webpack_exports__["distance"] = distance;
/* harmony export (immutable) */ __webpack_exports__["squaredDistance"] = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["squaredLength"] = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["negate"] = negate;
/* harmony export (immutable) */ __webpack_exports__["inverse"] = inverse;
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;
/* harmony export (immutable) */ __webpack_exports__["cross"] = cross;
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["hermite"] = hermite;
/* harmony export (immutable) */ __webpack_exports__["bezier"] = bezier;
/* harmony export (immutable) */ __webpack_exports__["random"] = random;
/* harmony export (immutable) */ __webpack_exports__["transformMat4"] = transformMat4;
/* harmony export (immutable) */ __webpack_exports__["transformMat3"] = transformMat3;
/* harmony export (immutable) */ __webpack_exports__["transformQuat"] = transformQuat;
/* harmony export (immutable) */ __webpack_exports__["rotateX"] = rotateX;
/* harmony export (immutable) */ __webpack_exports__["rotateY"] = rotateY;
/* harmony export (immutable) */ __webpack_exports__["rotateZ"] = rotateZ;
/* harmony export (immutable) */ __webpack_exports__["angle"] = angle;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(4);


/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](3);
  if (__WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function clone(a) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
  scale = scale || 1.0;

  var r = __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* RANDOM */]() * 2.0 * Math.PI;
  var z = __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* RANDOM */]() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;

  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}

/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2];
  // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);
  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x;
  // var uuv = vec3.cross([], qvec, uv);
  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx;
  // vec3.scale(uv, uv, 2 * w);
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  // vec3.scale(uuv, uuv, 2);
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  // return vec3.add(out, a, vec3.add(out, uv, uuv));
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateX(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
  r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateY(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateZ(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2];

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
  var tempA = fromValues(a[0], a[1], a[2]);
  var tempB = fromValues(b[0], b[1], b[2]);

  normalize(tempA, tempA);
  normalize(tempB, tempB);

  var cosine = dot(tempA, tempB);

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
var sub = subtract;

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link vec3.divide}
 * @function
 */
var div = divide;

/**
 * Alias for {@link vec3.distance}
 * @function
 */
var dist = distance;

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
var sqrDist = squaredDistance;

/**
 * Alias for {@link vec3.length}
 * @function
 */
var len = length;

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
var sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
    }

    return a;
  };
}();

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["divide"] = divide;
/* harmony export (immutable) */ __webpack_exports__["ceil"] = ceil;
/* harmony export (immutable) */ __webpack_exports__["floor"] = floor;
/* harmony export (immutable) */ __webpack_exports__["min"] = min;
/* harmony export (immutable) */ __webpack_exports__["max"] = max;
/* harmony export (immutable) */ __webpack_exports__["round"] = round;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["scaleAndAdd"] = scaleAndAdd;
/* harmony export (immutable) */ __webpack_exports__["distance"] = distance;
/* harmony export (immutable) */ __webpack_exports__["squaredDistance"] = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["length"] = length;
/* harmony export (immutable) */ __webpack_exports__["squaredLength"] = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["negate"] = negate;
/* harmony export (immutable) */ __webpack_exports__["inverse"] = inverse;
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["random"] = random;
/* harmony export (immutable) */ __webpack_exports__["transformMat4"] = transformMat4;
/* harmony export (immutable) */ __webpack_exports__["transformQuat"] = transformQuat;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(4);


/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function create() {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](4);
  if (__WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
function clone(a) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
function fromValues(x, y, z, w) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
function random(out, scale) {
  scale = scale || 1.0;

  // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;
  var v1, v2, v3, v4;
  var s1, s2;
  do {
    v1 = __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* RANDOM */]() * 2 - 1;
    v2 = __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* RANDOM */]() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);
  do {
    v3 = __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* RANDOM */]() * 2 - 1;
    v4 = __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* RANDOM */]() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];

  // calculate quat * vec
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
var sub = subtract;

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link vec4.divide}
 * @function
 */
var div = divide;

/**
 * Alias for {@link vec4.distance}
 * @function
 */
var dist = distance;

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
var sqrDist = squaredDistance;

/**
 * Alias for {@link vec4.length}
 * @function
 */
var len = length;

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
var sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];a[i + 3] = vec[3];
    }

    return a;
  };
}();

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = createFilteredVector

var cubicHermite = __webpack_require__(89)
var bsearch = __webpack_require__(36)

function clamp(lo, hi, x) {
  return Math.min(hi, Math.max(lo, x))
}

function FilteredVector(state0, velocity0, t0) {
  this.dimension  = state0.length
  this.bounds     = [ new Array(this.dimension), new Array(this.dimension) ]
  for(var i=0; i<this.dimension; ++i) {
    this.bounds[0][i] = -Infinity
    this.bounds[1][i] = Infinity
  }
  this._state     = state0.slice().reverse()
  this._velocity  = velocity0.slice().reverse()
  this._time      = [ t0 ]
  this._scratch   = [ state0.slice(), state0.slice(), state0.slice(), state0.slice(), state0.slice() ]
}

var proto = FilteredVector.prototype

proto.flush = function(t) {
  var idx = bsearch.gt(this._time, t) - 1
  if(idx <= 0) {
    return
  }
  this._time.splice(0, idx)
  this._state.splice(0, idx * this.dimension)
  this._velocity.splice(0, idx * this.dimension)
}

proto.curve = function(t) {
  var time      = this._time
  var n         = time.length
  var idx       = bsearch.le(time, t)
  var result    = this._scratch[0]
  var state     = this._state
  var velocity  = this._velocity
  var d         = this.dimension
  var bounds    = this.bounds
  if(idx < 0) {
    var ptr = d-1
    for(var i=0; i<d; ++i, --ptr) {
      result[i] = state[ptr]
    }
  } else if(idx >= n-1) {
    var ptr = state.length-1
    var tf = t - time[n-1]
    for(var i=0; i<d; ++i, --ptr) {
      result[i] = state[ptr] + tf * velocity[ptr]
    }
  } else {
    var ptr = d * (idx+1) - 1
    var t0  = time[idx]
    var t1  = time[idx+1]
    var dt  = (t1 - t0) || 1.0
    var x0  = this._scratch[1]
    var x1  = this._scratch[2]
    var v0  = this._scratch[3]
    var v1  = this._scratch[4]
    var steady = true
    for(var i=0; i<d; ++i, --ptr) {
      x0[i] = state[ptr]
      v0[i] = velocity[ptr] * dt
      x1[i] = state[ptr+d]
      v1[i] = velocity[ptr+d] * dt
      steady = steady && (x0[i] === x1[i] && v0[i] === v1[i] && v0[i] === 0.0)
    }
    if(steady) {
      for(var i=0; i<d; ++i) {
        result[i] = x0[i]
      }
    } else {
      cubicHermite(x0, v0, x1, v1, (t-t0)/dt, result)
    }
  }
  var lo = bounds[0]
  var hi = bounds[1]
  for(var i=0; i<d; ++i) {
    result[i] = clamp(lo[i], hi[i], result[i])
  }
  return result
}

proto.dcurve = function(t) {
  var time     = this._time
  var n        = time.length
  var idx      = bsearch.le(time, t)
  var result   = this._scratch[0]
  var state    = this._state
  var velocity = this._velocity
  var d        = this.dimension
  if(idx >= n-1) {
    var ptr = state.length-1
    var tf = t - time[n-1]
    for(var i=0; i<d; ++i, --ptr) {
      result[i] = velocity[ptr]
    }
  } else {
    var ptr = d * (idx+1) - 1
    var t0 = time[idx]
    var t1 = time[idx+1]
    var dt = (t1 - t0) || 1.0
    var x0 = this._scratch[1]
    var x1 = this._scratch[2]
    var v0 = this._scratch[3]
    var v1 = this._scratch[4]
    var steady = true
    for(var i=0; i<d; ++i, --ptr) {
      x0[i] = state[ptr]
      v0[i] = velocity[ptr] * dt
      x1[i] = state[ptr+d]
      v1[i] = velocity[ptr+d] * dt
      steady = steady && (x0[i] === x1[i] && v0[i] === v1[i] && v0[i] === 0.0)
    }
    if(steady) {
      for(var i=0; i<d; ++i) {
        result[i] = 0.0
      }
    } else {
      cubicHermite.derivative(x0, v0, x1, v1, (t-t0)/dt, result)
      for(var i=0; i<d; ++i) {
        result[i] /= dt
      }
    }
  }
  return result
}

proto.lastT = function() {
  var time = this._time
  return time[time.length-1]
}

proto.stable = function() {
  var velocity = this._velocity
  var ptr = velocity.length
  for(var i=this.dimension-1; i>=0; --i) {
    if(velocity[--ptr]) {
      return false
    }
  }
  return true
}

proto.jump = function(t) {
  var t0 = this.lastT()
  var d  = this.dimension
  if(t < t0 || arguments.length !== d+1) {
    return
  }
  var state     = this._state
  var velocity  = this._velocity
  var ptr       = state.length-this.dimension
  var bounds    = this.bounds
  var lo        = bounds[0]
  var hi        = bounds[1]
  this._time.push(t0, t)
  for(var j=0; j<2; ++j) {
    for(var i=0; i<d; ++i) {
      state.push(state[ptr++])
      velocity.push(0)
    }
  }
  this._time.push(t)
  for(var i=d; i>0; --i) {
    state.push(clamp(lo[i-1], hi[i-1], arguments[i]))
    velocity.push(0)
  }
}

proto.push = function(t) {
  var t0 = this.lastT()
  var d  = this.dimension
  if(t < t0 || arguments.length !== d+1) {
    return
  }
  var state     = this._state
  var velocity  = this._velocity
  var ptr       = state.length-this.dimension
  var dt        = t - t0
  var bounds    = this.bounds
  var lo        = bounds[0]
  var hi        = bounds[1]
  var sf        = (dt > 1e-6) ? 1/dt : 0
  this._time.push(t)
  for(var i=d; i>0; --i) {
    var xc = clamp(lo[i-1], hi[i-1], arguments[i])
    state.push(xc)
    velocity.push((xc - state[ptr++]) * sf)
  }
}

proto.set = function(t) {
  var d = this.dimension
  if(t < this.lastT() || arguments.length !== d+1) {
    return
  }
  var state     = this._state
  var velocity  = this._velocity
  var bounds    = this.bounds
  var lo        = bounds[0]
  var hi        = bounds[1]
  this._time.push(t)
  for(var i=d; i>0; --i) {
    state.push(clamp(lo[i-1], hi[i-1], arguments[i]))
    velocity.push(0)
  }
}

proto.move = function(t) {
  var t0 = this.lastT()
  var d  = this.dimension
  if(t <= t0 || arguments.length !== d+1) {
    return
  }
  var state    = this._state
  var velocity = this._velocity
  var statePtr = state.length - this.dimension
  var bounds   = this.bounds
  var lo       = bounds[0]
  var hi       = bounds[1]
  var dt       = t - t0
  var sf       = (dt > 1e-6) ? 1/dt : 0.0
  this._time.push(t)
  for(var i=d; i>0; --i) {
    var dx = arguments[i]
    state.push(clamp(lo[i-1], hi[i-1], state[statePtr++] + dx))
    velocity.push(dx * sf)
  }
}

proto.idle = function(t) {
  var t0 = this.lastT()
  if(t < t0) {
    return
  }
  var d        = this.dimension
  var state    = this._state
  var velocity = this._velocity
  var statePtr = state.length-d
  var bounds   = this.bounds
  var lo       = bounds[0]
  var hi       = bounds[1]
  var dt       = t - t0
  this._time.push(t)
  for(var i=d-1; i>=0; --i) {
    state.push(clamp(lo[i], hi[i], state[statePtr] + dt * velocity[statePtr]))
    velocity.push(0)
    statePtr += 1
  }
}

function getZero(d) {
  var result = new Array(d)
  for(var i=0; i<d; ++i) {
    result[i] = 0.0
  }
  return result
}

function createFilteredVector(initState, initVelocity, initTime) {
  switch(arguments.length) {
    case 0:
      return new FilteredVector([0], [0], 0)
    case 1:
      if(typeof initState === 'number') {
        var zero = getZero(initState)
        return new FilteredVector(zero, zero, 0)
      } else {
        return new FilteredVector(initState, getZero(initState.length), 0)
      }
    case 2:
      if(typeof initVelocity === 'number') {
        var zero = getZero(initState.length)
        return new FilteredVector(initState, zero, +initVelocity)
      } else {
        initTime = 0
      }
    case 3:
      if(initState.length !== initVelocity.length) {
        throw new Error('state and velocity lengths must match')
      }
      return new FilteredVector(initState, initVelocity, initTime)
  }
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function compileSearch(funcName, predicate, reversed, extraArgs, useNdarray, earlyOut) {
  var code = [
    "function ", funcName, "(a,l,h,", extraArgs.join(","),  "){",
earlyOut ? "" : "var i=", (reversed ? "l-1" : "h+1"),
";while(l<=h){\
var m=(l+h)>>>1,x=a", useNdarray ? ".get(m)" : "[m]"]
  if(earlyOut) {
    if(predicate.indexOf("c") < 0) {
      code.push(";if(x===y){return m}else if(x<=y){")
    } else {
      code.push(";var p=c(x,y);if(p===0){return m}else if(p<=0){")
    }
  } else {
    code.push(";if(", predicate, "){i=m;")
  }
  if(reversed) {
    code.push("l=m+1}else{h=m-1}")
  } else {
    code.push("h=m-1}else{l=m+1}")
  }
  code.push("}")
  if(earlyOut) {
    code.push("return -1};")
  } else {
    code.push("return i};")
  }
  return code.join("")
}

function compileBoundsSearch(predicate, reversed, suffix, earlyOut) {
  var result = new Function([
  compileSearch("A", "x" + predicate + "y", reversed, ["y"], false, earlyOut),
  compileSearch("B", "x" + predicate + "y", reversed, ["y"], true, earlyOut),
  compileSearch("P", "c(x,y)" + predicate + "0", reversed, ["y", "c"], false, earlyOut),
  compileSearch("Q", "c(x,y)" + predicate + "0", reversed, ["y", "c"], true, earlyOut),
"function dispatchBsearch", suffix, "(a,y,c,l,h){\
if(a.shape){\
if(typeof(c)==='function'){\
return Q(a,(l===undefined)?0:l|0,(h===undefined)?a.shape[0]-1:h|0,y,c)\
}else{\
return B(a,(c===undefined)?0:c|0,(l===undefined)?a.shape[0]-1:l|0,y)\
}}else{\
if(typeof(c)==='function'){\
return P(a,(l===undefined)?0:l|0,(h===undefined)?a.length-1:h|0,y,c)\
}else{\
return A(a,(c===undefined)?0:c|0,(l===undefined)?a.length-1:l|0,y)\
}}}\
return dispatchBsearch", suffix].join(""))
  return result()
}

module.exports = {
  ge: compileBoundsSearch(">=", false, "GE"),
  gt: compileBoundsSearch(">", false, "GT"),
  lt: compileBoundsSearch("<", true, "LT"),
  le: compileBoundsSearch("<=", true, "LE"),
  eq: compileBoundsSearch("-", true, "EQ", true)
}


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = cross;

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2]

    out[0] = ay * bz - az * by
    out[1] = az * bx - ax * bz
    out[2] = ax * by - ay * bx
    return out
}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = dot;

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(40);

module.exports = lookAt;

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < 0.000001 &&
        Math.abs(eyey - centery) < 0.000001 &&
        Math.abs(eyez - centerz) < 0.000001) {
        return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = identity;

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = translate;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = create;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = scale;

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = determinant;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__la__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dist__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ts__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mc__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test__ = __webpack_require__(252);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__core__; });
/* unused harmony reexport la */
/* unused harmony reexport dist */
/* unused harmony reexport ts */
/* unused harmony reexport mc */
/* unused harmony reexport test */
/**
 * A small library for robust generation of various random variates, testing data against distributions, calculating
 * different statistical properties, or sampling unknown distributions using advanced MCMC methods.
 *
 * @module ran
 */











/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Runs a generator once or several times to return a single value or an array of values.
 *
 * @method some
 * @memberOf ran.utils
 * @param {function} generator Random generator to use.
 * @param {number=} k Number of values to generate.
 * @returns {(number|string|Array)} Single value or array of generated values.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (generator, k = 1) {
  if (k < 2) {
    return generator()
  } else {
    return Array.from({ length: k }, () => generator())
  }
});


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * A xoshiro128+ pseudo random number generator.
 *
 * @class Xoshiro128p
 * @memberOf ran.core
 * @private
 */
class Xoshiro128p {
  constructor (state) {
    // Set state
    this._state = state || [
      (Math.random() * Number.MAX_SAFE_INTEGER) >>> 0,
      2, 3, 4
    ]

    // Call next once.
    this.next()
  }

  /**
   * Generates a has for a string, based on the Java String.hashCode implementation.
   *
   * @method hash
   * @methodOf ran.core.Xoshiro128p
   * @param {string} str String to hash.
   * @returns {number} The hash code.
   */
  static hash (str) {
    // Calculate Java's String.hashCode value
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i)
      hash |= 0
    }
    return hash
  }

  /**
   * Returns the next pseudo random number.
   *
   * @method next
   * @methodOf ran.core.Xoshiro128p
   * @returns {number} The next pseudo random number.
   */
  next () {
    // Init helper variables
    const t = this._state[1] << 9
    const u = this._state[0] + this._state[3]

    // Update state
    this._state[2] = this._state[2] ^ this._state[0]
    this._state[3] = this._state[3] ^ this._state[1]
    this._state[1] = this._state[1] ^ this._state[2]
    this._state[0] = this._state[0] ^ this._state[3]
    this._state[2] = this._state[2] ^ t
    this._state[3] = this._state[3] << 11 | this._state[3] >>> 21

    // Return random number
    return (u >>> 0) / 4294967296
  }

  /**
   * Sets the seed for the underlying pseudo random number generator used by ranjs. Under the hood, ranjs
   * implements the [xoshiro128+ algorithm]{@link http://vigna.di.unimi.it/ftp/papers/ScrambledLinear.pdf}.
   *
   * @method seed
   * @methodOf ran.core.Xoshiro128p
   * @param {(number|string)} value The value of the seed, either a number or a string (for the ease of tracking
   * seeds).
   */
  seed (value) {
    // Set state
    this._state = [
      (typeof value === 'number' ? value : Xoshiro128p.hash(value)) >>> 0,
      2, 3, 4
    ]

    // Run some iterations
    for (let i = 0; i < 100; i++) {
      this.next()
    }
  }

  /**
   * Loads the state of the generator.
   *
   * @method load
   * @methodOf ran.core.Xoshiro128p
   * @param {number[]} state The state to load.
   */
  load (state) {
    this._state = state
  }

  /**
   * Returns the current state of the generator. This can be later passed on to a new generator to continue where the
   * current one finished.
   *
   * @method save
   * @methodOf ran.core.Xoshiro128p
   * @returns {number[]} The current state of the generator.
   */
  save () {
    return this._state
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Xoshiro128p);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(24);


/**
 * Class representing an immutable real square matrix.
 *
 * @class Matrix
 * @memberOf ran.la
 * @param {(number|Array|ran.la.Matrix)=} arg The constructor argument. If it is a number, it sets the
 * linear dimension of the matrix. If it is an array of arrays, the matrix is initialized with the array
 * elements. If it is another matrix, it is copied to this matrix. If not specified, a 3x3 identity matrix is
 * created.
 * @constructor
 * @example
 *
 * let M1 = new ran.la.Matrix()
 * let M2 = new ran.la.Matrix(3)
 * let M3 = new ran.la.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
 * let M4 = new ran.la.Matrix(M1)
 * //    ┌         ┐
 * //    │ 1  0  0 │
 * // => │ 0  1  0 │
 * //    │ 0  0  1 │
 * //    └         ┘
 *
 */
class Matrix {
  constructor (arg) {
    if (typeof arg === 'number') {
      this._m = Array.from({ length: arg }, () => new Array(arg).fill(0))
      for (let i = 0; i < arg; i++) {
        this._m[i][i] = 1
      }
    } else if (Array.isArray(arg)) {
      this._m = arg
    } else if (typeof arg === 'object' && Array.isArray(arg._m)) {
      this._m = arg._m
    } else {
      this._m = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    }
  }

  /**
   * Returns the matrix as an array of arrays.
   *
   * @method m
   * @memberOf ran.la.Matrix
   * @returns {Array[]} The matrix in an array of array representation.
   * @example
   *
   * let M = new ran.la.Matrix()
   * M.m()
   * // => [ [ 1, 0, 0 ],
   * //      [ 0, 1, 0 ],
   * //      [ 0, 0, 1 ] ]
   *
   */
  m () {
    return this._m.map(d => d.slice())
  }

  /**
   * Returns or sets an element of the matrix.
   *
   * @method ij
   * @memberOf ran.la.Matrix
   * @param {number} i Row index of the element.
   * @param {number} j Column index of the element.
   * @param {number=} value The new value of the element at the i-th row and j-th column. If not specified,
   * the value at (i, j) is returned.
   * @example
   *
   * let M = new ran.la.Matrix()
   *
   * M.ij(1, 1)
   * // => 1
   *
   * M.ij(1, 2)
   * // => 0
   *
   * M.ij(1, 2, 5)
   * //    ┌         ┐
   * //    │ 1  0  0 │
   * // => │ 0  1  0 │
   * //    │ 0  5  1 │
   * //    └         ┘
   *
   */
  ij (i, j, value) {
    if (typeof value !== 'undefined') {
      this._m[i][j] = value
    } else {
      return this._m[i][j]
    }
  }

  /**
   * Performs an operation on the matrix element-wise.
   *
   * @method f
   * @memberOf ran.la.Matrix
   * @param {Function} func Function to apply on each element.
   * @returns {Matrix} The transformed matrix.
   * @example
   *
   * let M = new ran.la.Matrix([[1, 2], [3, 4]])
   * M.f(d => d * d)
   * //    ┌      ┐
   * // => │ 1  4 │
   * //    │ 9 16 │
   * //    └      ┘
   *
   */
  f (func) {
    return new Matrix(this._m.map(row => row.map(d => func(d))))
  }

  /**
   * Multiplies the matrix with a scalar.
   *
   * @method scale
   * @memberOf ran.la.Matrix
   * @param {number} s The scalar to multiply matrix with.
   * @returns {Matrix} The scaled matrix.
   * @example
   *
   * let M = new ran.la.Matrix([[1, 2], [3, 4]])
   * M.scale(2)
   * //    ┌      ┐
   * // => │ 2  4 │
   * //    │ 6  8 │
   * //    └      ┘
   *
   */
  scale (s) {
    return this.f(x => x * s)
  }

  /**
   * Adds another matrix to the current matrix.
   *
   * @method add
   * @memberOf ran.la.Matrix
   * @param {Matrix} mat The matrix to add.
   * @returns {Matrix} The sum of the two matrices.
   * @example
   *
   * let M = new ran.la.Matrix([[1, 2], [3, 4]])
   * let N = new ran.la.Matrix([[5, 6], [7, 8]])
   * M.add(N)
   * //    ┌        ┐
   * // => │  6   8 │
   * //    │ 10  12 │
   * //    └        ┘
   *
   */
  add (mat) {
    const m = mat.m()
    return new Matrix(this._m.map((row, i) => row.map((d, j) => d + m[i][j])))
  }

  /**
   * Subtracts another matrix from the current matrix.
   *
   * @method sub
   * @memberOf ran.la.Matrix
   * @param {Matrix} mat The matrix to subtract.
   * @returns {Matrix} The difference of the two matrices.
   * @example
   *
   * let M = new ran.la.Matrix([[5, 6], [7, 8]])
   * let N = new ran.la.Matrix([[1, 1], [1, 1]])
   * M.add(N)
   * //    ┌      ┐
   * // => │ 4  5 │
   * //    │ 6  7 │
   * //    └      ┘
   *
   */
  sub (mat) {
    const m = mat.m()
    return new Matrix(this._m.map((row, i) => row.map((d, j) => d - m[i][j])))
  }

  /**
   * Multiplies the matrix with another matrix (from the right).
   *
   * @method mult
   * @memberOf ran.la.Matrix
   * @param {Matrix} mat Matrix to multiply current matrix with.
   * @returns {Matrix} The product matrix.
   * @example
   *
   * let M = new ran.la.Matrix([[1, 2], [3, 4]])
   * let N = new ran.la.Matrix([[5, 6], [7, 8]])
   * M.mult(N)
   * //    ┌        ┐
   * // => │ 19  22 │
   * //    │ 43  50 │
   * //    └        ┘
   *
   */
  mult (mat) {
    const m = mat.m()
    const n = this._m.length
    const r = new Matrix(n)
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let rij = 0
        for (let k = 0; k < n; k++) {
          rij += this._m[i][k] * m[k][j]
        }
        r.ij(i, j, rij)
      }
    }
    return r
  }

  /**
   * Returns the transpose of the matrix.
   *
   * @method t
   * @memberOf ran.la.Matrix
   * @returns {Matrix} The transposed matrix.
   * @example
   *
   * let M = new ran.la.Matrix([[1, 2], [3, 4]])
   * M.t()
   * //    ┌      ┐
   * // => │ 1  3 │
   * //    │ 2  4 │
   * //    └      ┘
   *
   */
  t () {
    return new Matrix(this._m[0].map((col, i) => this._m.map(row => row[i])))
  }

  /**
   * Multiplies a vector with the matrix (acts this matrix on a vector).
   *
   * @method act
   * @memberOf ran.la.Matrix
   * @param {ran.la.Vector} vec Vector to act matrix on.
   * @returns {Vector} The mapped vector.
   * @example
   *
   * let M = new ran.la.Matrix([[1, 2], [3, 4]])
   * let v = new ran.la.Vector([5, 6])
   * M.act(v)
   * // => ( 17, 39 )
   *
   */
  act (vec) {
    return new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this._m.map(d => vec.dot(new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](d))))
  }

  /**
   * Performs the [LDL decomposition]{@link https://en.wikipedia.org/wiki/Cholesky_decomposition} of the
   * matrix.
   *
   * @method ldl
   * @memberOf ran.la.Matrix
   * @returns {Object} Object containing two properties: {D} and {L} representing the corresponding matrices
   * in the LDL decomposition.
   * @example
   *
   * let M = new Matrix([[4, 12, -16], [12, 37, -43], [-16, -43, 98]])
   * M.ldl()
   * //        ┌          ┐       ┌         ┐
   * //        │  1  0  0 │       │ 4  0  0 │
   * // => L = │  3  1  0 │,  D = │ 0  1  0 │
   * //        │ -4  5  1 │       │ 0  0  9 │
   * //        └          ┘       └         ┘
   *
   */
  ldl () {
    // Init D, L
    const n = this._m.length

    const D = new Matrix(n)

    const L = new Matrix(n)

    // Perform decomposition
    for (let j = 0; j < n; j++) {
      // Update D
      let dj = this.ij(j, j)
      for (let k = 0; k < j; k++) {
        dj -= D.ij(k, k) * L.ij(j, k) * L.ij(j, k)
      }
      D.ij(j, j, dj)

      // Update L
      for (let i = n - 1; i > j; i--) {
        let lij = this.ij(i, j)
        for (let k = 0; k < j; k++) {
          lij -= D.ij(k, k) * L.ij(i, k) * L.ij(j, k)
        }
        L.ij(i, j, lij / dj)
      }
    }

    return { D, L }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Matrix);


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_invalid__ = __webpack_require__(128);
/* unused harmony reexport InvalidDiscrete */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_alpha__ = __webpack_require__(131);
/* unused harmony reexport Alpha */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dist_anglit__ = __webpack_require__(132);
/* unused harmony reexport Anglit */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_arcsine__ = __webpack_require__(133);
/* unused harmony reexport Arcsine */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dist_balding_nichols__ = __webpack_require__(134);
/* unused harmony reexport BaldingNichols */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dist_bates__ = __webpack_require__(135);
/* unused harmony reexport Bates */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dist_benini__ = __webpack_require__(136);
/* unused harmony reexport Benini */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dist_benktander_ii__ = __webpack_require__(137);
/* unused harmony reexport BenktanderII */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dist_bernoulli__ = __webpack_require__(138);
/* unused harmony reexport Bernoulli */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dist_beta__ = __webpack_require__(12);
/* unused harmony reexport Beta */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dist_beta_binomial__ = __webpack_require__(139);
/* unused harmony reexport BetaBinomial */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__dist_beta_prime__ = __webpack_require__(141);
/* unused harmony reexport BetaPrime */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__dist_beta_rectangular__ = __webpack_require__(142);
/* unused harmony reexport BetaRectangular */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__dist_binomial__ = __webpack_require__(143);
/* unused harmony reexport Binomial */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__dist_birnbaum_saunders__ = __webpack_require__(144);
/* unused harmony reexport BirnbaumSaunders */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dist_borel__ = __webpack_require__(145);
/* unused harmony reexport Borel */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__dist_borel_tanner__ = __webpack_require__(146);
/* unused harmony reexport BorelTanner */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__dist_bounded_pareto__ = __webpack_require__(147);
/* unused harmony reexport BoundedPareto */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__dist_bradford__ = __webpack_require__(148);
/* unused harmony reexport Bradford */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__dist_burr__ = __webpack_require__(149);
/* unused harmony reexport Burr */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__dist_categorical__ = __webpack_require__(7);
/* unused harmony reexport Categorical */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__dist_cauchy__ = __webpack_require__(53);
/* unused harmony reexport Cauchy */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__dist_chi__ = __webpack_require__(150);
/* unused harmony reexport Chi */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__dist_chi2__ = __webpack_require__(26);
/* unused harmony reexport Chi2 */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__dist_dagum__ = __webpack_require__(54);
/* unused harmony reexport Dagum */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__dist_degenerate__ = __webpack_require__(151);
/* unused harmony reexport Degenerate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__dist_delaporte__ = __webpack_require__(152);
/* unused harmony reexport Delaporte */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__dist_discrete_uniform__ = __webpack_require__(153);
/* unused harmony reexport DiscreteUniform */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__dist_discrete_weibull__ = __webpack_require__(154);
/* unused harmony reexport DiscreteWeibull */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__dist_double_gamma__ = __webpack_require__(155);
/* unused harmony reexport DoubleGamma */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__dist_double_weibull__ = __webpack_require__(156);
/* unused harmony reexport DoubleWeibull */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__dist_doubly_noncentral_beta__ = __webpack_require__(56);
/* unused harmony reexport DoublyNoncentralBeta */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__dist_doubly_noncentral_f__ = __webpack_require__(157);
/* unused harmony reexport DoublyNoncentralF */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__dist_doubly_noncentral_t__ = __webpack_require__(158);
/* unused harmony reexport DoublyNoncentralT */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__dist_erlang__ = __webpack_require__(161);
/* unused harmony reexport Erlang */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__dist_exponential__ = __webpack_require__(55);
/* unused harmony reexport Exponential */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__dist_exponential_logarithmic__ = __webpack_require__(162);
/* unused harmony reexport ExponentialLogarithmic */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__dist_f__ = __webpack_require__(59);
/* unused harmony reexport F */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__dist_flory_schulz__ = __webpack_require__(163);
/* unused harmony reexport FlorySchulz */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__dist_frechet__ = __webpack_require__(164);
/* unused harmony reexport Frechet */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__dist_fisher_z__ = __webpack_require__(165);
/* unused harmony reexport FisherZ */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__dist_gamma__ = __webpack_require__(11);
/* unused harmony reexport Gamma */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__dist_gamma_gompertz__ = __webpack_require__(166);
/* unused harmony reexport GammaGompertz */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__dist_generalized_exponential__ = __webpack_require__(167);
/* unused harmony reexport GeneralizedExponential */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__dist_generalized_extreme_value__ = __webpack_require__(168);
/* unused harmony reexport GeneralizedExtremeValue */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__dist_generalized_gamma__ = __webpack_require__(60);
/* unused harmony reexport GeneralizedGamma */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__dist_generalized_hermite__ = __webpack_require__(169);
/* unused harmony reexport GeneralizedHermite */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__dist_generalized_logistic__ = __webpack_require__(170);
/* unused harmony reexport GeneralizedLogistic */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__dist_generalized_normal__ = __webpack_require__(61);
/* unused harmony reexport GeneralizedNormal */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__dist_generalized_pareto__ = __webpack_require__(62);
/* unused harmony reexport GeneralizedPareto */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__dist_geometric__ = __webpack_require__(171);
/* unused harmony reexport Geometric */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__dist_gilbrat__ = __webpack_require__(172);
/* unused harmony reexport Gilbrat */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__dist_gompertz__ = __webpack_require__(173);
/* unused harmony reexport Gompertz */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__dist_gumbel__ = __webpack_require__(174);
/* unused harmony reexport Gumbel */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__dist_half_generalized_normal__ = __webpack_require__(175);
/* unused harmony reexport HalfGeneralizedNormal */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__dist_half_logistic__ = __webpack_require__(176);
/* unused harmony reexport HalfLogistic */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__dist_half_normal__ = __webpack_require__(177);
/* unused harmony reexport HalfNormal */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__dist_heads_minus_tails__ = __webpack_require__(178);
/* unused harmony reexport HeadsMinusTails */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__dist_hoyt__ = __webpack_require__(179);
/* unused harmony reexport Hoyt */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__dist_hyperbolic_secant__ = __webpack_require__(180);
/* unused harmony reexport HyperbolicSecant */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__dist_hyperexponential__ = __webpack_require__(181);
/* unused harmony reexport Hyperexponential */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__dist_hypergeometric__ = __webpack_require__(182);
/* unused harmony reexport Hypergeometric */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__dist_inverse_chi2__ = __webpack_require__(183);
/* unused harmony reexport InverseChi2 */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__dist_inverse_gamma__ = __webpack_require__(184);
/* unused harmony reexport InverseGamma */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__dist_inverse_gaussian__ = __webpack_require__(64);
/* unused harmony reexport InverseGaussian */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__dist_inverted_weibull__ = __webpack_require__(185);
/* unused harmony reexport InvertedWeibull */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__dist_irwin_hall__ = __webpack_require__(52);
/* unused harmony reexport IrwinHall */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__dist_johnson_sb__ = __webpack_require__(186);
/* unused harmony reexport JohnsonSB */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__dist_johnson_su__ = __webpack_require__(187);
/* unused harmony reexport JohnsonSU */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__dist_kumaraswamy__ = __webpack_require__(65);
/* unused harmony reexport Kumaraswamy */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__dist_laplace__ = __webpack_require__(66);
/* unused harmony reexport Laplace */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__dist_levy__ = __webpack_require__(188);
/* unused harmony reexport Levy */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__dist_lindley__ = __webpack_require__(189);
/* unused harmony reexport Lindley */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__dist_logarithmic__ = __webpack_require__(190);
/* unused harmony reexport Logarithmic */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__dist_log_cauchy__ = __webpack_require__(191);
/* unused harmony reexport LogCauchy */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__dist_log_gamma__ = __webpack_require__(192);
/* unused harmony reexport LogGamma */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__dist_logistic__ = __webpack_require__(193);
/* unused harmony reexport Logistic */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__dist_logistic_exponential__ = __webpack_require__(194);
/* unused harmony reexport LogisticExponential */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__dist_logit_normal__ = __webpack_require__(195);
/* unused harmony reexport LogitNormal */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__dist_log_laplace__ = __webpack_require__(196);
/* unused harmony reexport LogLaplace */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__dist_log_logistic__ = __webpack_require__(197);
/* unused harmony reexport LogLogistic */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__dist_log_normal__ = __webpack_require__(63);
/* unused harmony reexport LogNormal */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__dist_log_series__ = __webpack_require__(198);
/* unused harmony reexport LogSeries */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83__dist_lomax__ = __webpack_require__(199);
/* unused harmony reexport Lomax */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84__dist_makeham__ = __webpack_require__(200);
/* unused harmony reexport Makeham */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85__dist_maxwell_boltzmann__ = __webpack_require__(201);
/* unused harmony reexport MaxwellBoltzmann */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86__dist_mielke__ = __webpack_require__(202);
/* unused harmony reexport Mielke */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_87__dist_moyal__ = __webpack_require__(203);
/* unused harmony reexport Moyal */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_88__dist_muth__ = __webpack_require__(204);
/* unused harmony reexport Muth */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_89__dist_nakagami__ = __webpack_require__(205);
/* unused harmony reexport Nakagami */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_90__dist_negative_binomial__ = __webpack_require__(206);
/* unused harmony reexport NegativeBinomial */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_91__dist_negative_hypergeometric__ = __webpack_require__(207);
/* unused harmony reexport NegativeHypergeometric */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_92__dist_neyman_a__ = __webpack_require__(208);
/* unused harmony reexport NeymanA */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_93__dist_noncentral_beta__ = __webpack_require__(67);
/* unused harmony reexport NoncentralBeta */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_94__dist_noncentral_chi__ = __webpack_require__(209);
/* unused harmony reexport NoncentralChi */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_95__dist_noncentral_chi2__ = __webpack_require__(68);
/* unused harmony reexport NoncentralChi2 */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_96__dist_noncentral_f__ = __webpack_require__(210);
/* unused harmony reexport NoncentralF */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_97__dist_noncentral_t__ = __webpack_require__(58);
/* unused harmony reexport NoncentralT */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_98__dist_normal__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_98__dist_normal__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_99__dist_pareto__ = __webpack_require__(211);
/* unused harmony reexport Pareto */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_100__dist_pert__ = __webpack_require__(212);
/* unused harmony reexport PERT */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_101__dist_poisson__ = __webpack_require__(213);
/* unused harmony reexport Poisson */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_102__dist_polya_aeppli__ = __webpack_require__(214);
/* unused harmony reexport PolyaAeppli */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_103__dist_power_law__ = __webpack_require__(215);
/* unused harmony reexport Power */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_104__dist_q_exponential__ = __webpack_require__(216);
/* unused harmony reexport QExponential */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_105__dist_r__ = __webpack_require__(217);
/* unused harmony reexport R */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_106__dist_rademacher__ = __webpack_require__(218);
/* unused harmony reexport Rademacher */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_107__dist_raised_cosine__ = __webpack_require__(219);
/* unused harmony reexport RaisedCosine */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_108__dist_rayleigh__ = __webpack_require__(220);
/* unused harmony reexport Rayleigh */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_109__dist_reciprocal__ = __webpack_require__(221);
/* unused harmony reexport Reciprocal */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_110__dist_reciprocal_inverse_gaussian__ = __webpack_require__(222);
/* unused harmony reexport ReciprocalInverseGaussian */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_111__dist_rice__ = __webpack_require__(223);
/* unused harmony reexport Rice */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_112__dist_shifted_log_logistic__ = __webpack_require__(224);
/* unused harmony reexport ShiftedLogLogistic */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_113__dist_skellam__ = __webpack_require__(225);
/* unused harmony reexport Skellam */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_114__dist_skew_normal__ = __webpack_require__(226);
/* unused harmony reexport SkewNormal */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_115__dist_slash__ = __webpack_require__(228);
/* unused harmony reexport Slash */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_116__dist_soliton__ = __webpack_require__(229);
/* unused harmony reexport Soliton */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_117__dist_student_t__ = __webpack_require__(69);
/* unused harmony reexport StudentT */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_118__dist_student_z__ = __webpack_require__(230);
/* unused harmony reexport StudentZ */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_119__dist_trapezoidal__ = __webpack_require__(231);
/* unused harmony reexport Trapezoidal */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_120__dist_triangular__ = __webpack_require__(232);
/* unused harmony reexport Triangular */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_121__dist_tukey_lambda__ = __webpack_require__(233);
/* unused harmony reexport TukeyLambda */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_122__dist_uniform__ = __webpack_require__(234);
/* unused harmony reexport Uniform */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_123__dist_uniform_product__ = __webpack_require__(235);
/* unused harmony reexport UniformProduct */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_124__dist_uniform_ratio__ = __webpack_require__(236);
/* unused harmony reexport UniformRatio */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_125__dist_u_quadratic__ = __webpack_require__(237);
/* unused harmony reexport UQuadratic */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_126__dist_von_mises__ = __webpack_require__(238);
/* unused harmony reexport VonMises */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_127__dist_weibull__ = __webpack_require__(27);
/* unused harmony reexport Weibull */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_128__dist_wigner__ = __webpack_require__(239);
/* unused harmony reexport Wigner */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_129__dist_yule_simon__ = __webpack_require__(240);
/* unused harmony reexport YuleSimon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_130__dist_zeta__ = __webpack_require__(241);
/* unused harmony reexport Zeta */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_131__dist_zipf__ = __webpack_require__(245);
/* unused harmony reexport Zipf */
/**
 * A collection of random number generators for well-known distributions.
 *
 * @namespace dist
 * @memberOf ran
 */











// export { default as BetaGeometric } from './dist/beta-geometric'
// export { default as BetaNegativeBinomial } from './dist/beta-negative-binomial'



























































































































/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_core__ = __webpack_require__(3);


/**
 * Finds the root of a function using Brent's method.
 * Source: https://en.wikipedia.org/wiki/Brent%27s_method
 *
 * @method brent
 * @methodOf ran.algorithms
 * @param {Function} f Function to find root for. Must accept a single variable.
 * @param {number} x1 Lower boundary of the bracket.
 * @param {number} x2 Upper boundary of the bracket.
 * @return {(number|undefined)} The root location if found, undefined otherwise.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (f, x1, x2) {
  let a = x1
  let b = x2
  let c = x2
  let d, e
  let fa = f(a)
  let fb = f(b)
  let fc, p, q, r, s, eps, xm

  if ((fa > 0.0 && fb > 0.0) || (fa < 0.0 && fb < 0.0)) {
    return
  }

  fc = fb
  for (let k = 0; k < __WEBPACK_IMPORTED_MODULE_0__special_core__["c" /* MAX_ITER */]; k++) {
    if ((fb > 0.0 && fc > 0.0) || (fb < 0.0 && fc < 0.0)) {
      c = a
      fc = fa
      e = d = b - a
    }

    if (Math.abs(fc) < Math.abs(fb)) {
      a = b
      b = c
      c = a
      fa = fb
      fb = fc
      fc = fa
    }

    eps = __WEBPACK_IMPORTED_MODULE_0__special_core__["b" /* EPS */] * (2.0 * Math.abs(b) + 0.5)
    xm = 0.5 * (c - b)

    if (Math.abs(xm) <= eps || fb === 0.0) {
      return b
    }
    if (Math.abs(e) >= eps && Math.abs(fa) > Math.abs(fb)) {
      s = fb / fa
      if (a === c) {
        p = 2.0 * xm * s
        q = 1.0 - s
      } else {
        q = fa / fc
        r = fb / fc
        p = s * (2.0 * xm * q * (q - r) - (b - a) * (r - 1.0))
        q = (q - 1.0) * (r - 1.0) * (s - 1.0)
      }
      if (p > 0.0) {
        q = -q
      }
      p = Math.abs(p)
      const min1 = 3.0 * xm * q - Math.abs(eps * q)
      const min2 = Math.abs(e * q)
      if (2.0 * p < (min1 < min2 ? min1 : min2)) {
        e = d
        d = p / q
      } else {
        d = xm
        e = d
      }
    } else {
      d = xm
      e = d
    }

    a = b
    fa = fb
    if (Math.abs(d) > eps) {
      b += d
    } else {
      b += eps * Math.sign(xm)
    }
    fb = f(b)
  }
});


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_core__ = __webpack_require__(3);


/**
 * Finds the root of a function using Newton's method.
 *
 * @method newton
 * @memberOf ran.algorithms
 * @param {Function} f Function to find root for. Must accept a single variable.
 * @param {Function} df First derivative of the function. Must accept a single variable.
 * @param {number} x0 Starting point of the optimization.
 * @return {(number|undefined)} The root of the specified function.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (f, df, x0) {
  let x = x0
  let dx, d

  for (let k = 0; k < __WEBPACK_IMPORTED_MODULE_0__special_core__["c" /* MAX_ITER */]; k++) {
    d = df(x)
    // If derivative is zero, compute function for a close neighboring point
    dx = f(x) / (Math.abs(d) > __WEBPACK_IMPORTED_MODULE_0__special_core__["b" /* EPS */] ? d : df(x + __WEBPACK_IMPORTED_MODULE_0__special_core__["b" /* EPS */]))
    x -= dx

    // Exit if we reached precision level
    if (Math.abs(dx / x) < __WEBPACK_IMPORTED_MODULE_0__special_core__["b" /* EPS */]) { break }
  }

  return x
});


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__algorithms_neumaier__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);




/**
 * Generator for the [Irwin-Hall distribution]{@link https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution}:
 *
 * $$f(x; n) = \frac{1}{(n - 1)!} \sum_{k = 0}^{\lfloor x\rfloor} (-1)^k \begin{pmatrix}n \\ k \\ \end{pmatrix} (x - k)^{n - 1},$$
 *
 * with \(n \in \mathbb{N}^+\). Support: \(x \in [0, n]\).
 *
 * @class IrwinHall
 * @memberOf ran.dist
 * @param {number=} n Number of uniform variates to sum. If not an integer, it is rounded to the nearest one. Default
 * value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */] {
  constructor (n = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    const ni = Math.round(n)
    this.p = { n: ni }
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ n: ni }, [
      'n > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: ni,
      closed: true
    }]

    // Speed-up constants
    this.c = Array.from({ length: ni + 1 }, (d, k) => Object(__WEBPACK_IMPORTED_MODULE_1__special_log_gamma__["a" /* default */])(k + 1) + Object(__WEBPACK_IMPORTED_MODULE_1__special_log_gamma__["a" /* default */])(ni - k + 1))
  }

  _generator () {
    // Direct sampling
    return Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_neumaier__["a" /* default */])(Array.from({ length: this.p.n }, () => this.r.next()))
  }

  _pdf (x) {
    // Use symmetry property for large x values
    const y = x < this.p.n / 2 ? x : this.p.n - x

    // Compute terms
    const terms = Array.from({ length: Math.floor(y) + 1 }, (d, k) => {
      const z = (this.p.n - 1) * Math.log(y - k) - this.c[k]

      return k % 2 === 0 ? Math.exp(z) : -Math.exp(z)
    })

    // Sort terms
    terms.sort((a, b) => a - b)

    // Calculate sum
    return this.p.n * Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_neumaier__["a" /* default */])(terms)
  }

  _cdf (x) {
    // Use symmetry property for large x values
    const y = x < this.p.n / 2 ? x : this.p.n - x

    // Compute terms
    const terms = Array.from({ length: Math.floor(y) + 1 }, (d, k) => {
      const z = this.p.n * Math.log(y - k) - this.c[k]

      return k % 2 === 0 ? Math.exp(z) : -Math.exp(z)
    })

    // Sort terms
    const sum = Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_neumaier__["a" /* default */])(terms.sort((a, b) => a - b))

    // Calculate sum
    return x < this.p.n / 2 ? sum : 1 - sum
  }
});


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Cauchy distribution]{@link https://en.wikipedia.org/wiki/Cauchy_distribution}:
 *
 * $$f(x; x_0, \gamma) = \frac{1}{\pi\gamma\bigg[1 + \Big(\frac{x - x_0}{\gamma}\Big)^2\bigg]}$$
 *
 * where \(x_0 \in \mathbb{R}\) and \(\gamma > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class Cauchy
 * @memberOf ran.dist
 * @param {number=} x0 Location parameter. Default value is 0.
 * @param {number=} gamma Scale parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (x0 = 0, gamma = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { x0, gamma }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ x0, gamma }, [
      'gamma > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      Math.PI * this.p.gamma
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this.p.x0 + this.p.gamma * (Math.tan(Math.PI * (this.r.next() - 0.5)))
  }

  _pdf (x) {
    const y = (x - this.p.x0) / this.p.gamma
    return 1 / (this.c[0] * (1 + y * y))
  }

  _cdf (x) {
    return 0.5 + Math.atan2(x - this.p.x0, this.p.gamma) / Math.PI
  }

  _q (p) {
    return this.p.x0 + this.p.gamma * (Math.tan(Math.PI * (p - 0.5)))
  }
});


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Dagum distribution]{@link https://en.wikipedia.org/wiki/Dagum_distribution}:
 *
 * $$f(x; p, a, b) = \frac{ap}{x} \frac{\big(\frac{x}{b}\big)^{ap}}{\Big[\big(\frac{x}{b}\big)^a + 1\Big]^{p + 1}},$$
 *
 * with \(p, a, b > 0\). Support: \(x > 0\).
 *
 * @class Dagum
 * @memberOf ran.dist
 * @param {number=} p First shape parameter. Default value is 1.
 * @param {number=} a Second shape parameter. Default value is 1.
 * @param {number=} b Scale parameter. Default value is 1.
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (p = 1, a = 1, b = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { p, a, b }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ p, a, b }, [
      'p > 0',
      'a > 0',
      'b > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const y = Math.pow(x / this.p.b, this.p.a)
    return this.p.a * this.p.p * Math.pow(y, this.p.p) / (x * Math.pow(y + 1, this.p.p + 1))
  }

  _cdf (x) {
    return Math.pow(1 + Math.pow(x / this.p.b, -this.p.a), -this.p.p)
  }

  _q (p) {
    return this.p.b * Math.pow(Math.pow(p, -1 / this.p.p) - 1, -1 / this.p.a)
  }
});


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [exponential distribution]{@link https://en.wikipedia.org/wiki/Exponential_distribution}:
 *
 * $$f(x; \lambda) = \lambda e^{-\lambda x},$$
 *
 * with \(\lambda > 0\). Support: \(x \ge 0\).
 *
 * @class Exponential
 * @memberOf ran.dist
 * @param {number=} lambda Rate parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (lambda = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { lambda }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ lambda }, [
      'lambda > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      Math.exp(-lambda)
    ]
  }

  _generator () {
    // Inverse transform sampling
    return Object(__WEBPACK_IMPORTED_MODULE_0__core__["c" /* exponential */])(this.r, this.p.lambda)
  }

  _pdf (x) {
    return this.p.lambda * Math.pow(this.c[0], x)
  }

  _cdf (x) {
    return 1 - Math.pow(this.c[0], x)
  }

  _q (p) {
    return -Math.log(1 - p) / this.p.lambda
  }
});


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__special_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__special_beta_incomplete__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__special_beta__ = __webpack_require__(17);








/**
 * Generator for the [doubly non-central beta distribution]{@link https://rdrr.io/cran/sadists/f/inst/doc/sadists.pdf}:
 *
 * $$f(x; \alpha, \beta, \lambda_1, \lambda_2) = e^{-\frac{\lambda_1 + \lambda_2}{2}} \sum_{k = 0}^\infty \sum_{l = 0}^\infty \frac{\big(\frac{\lambda_1}{2}\big)^k}{k!} \frac{\big(\frac{\lambda_2}{2}\big)^l}{l!} \frac{x^{\alpha + k - 1} (1 - x)^{\beta + l - 1}}{\mathrm{B}\big(\alpha + k, \beta + l\big)},$$
 *
 * where \(\alpha, \beta \in \mathbb{N}^+\) and \(\lambda_1, \lambda_2 \ge 0\). Support: \(x \in (0, 1)\).
 *
 * @class DoublyNoncentralBeta
 * @memberOf ran.dist
 * @param {number=} alpha First shape parameter. Default value is 1.
 * @param {number=} beta Second shape parameter. Default value is 1.
 * @param {number=} lambda1 First non-centrality parameter. Default value is 1.
 * @param {number=} lambda2 Second non-centrality parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (alpha = 1, beta = 1, lambda1 = 1, lambda2 = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { alpha, beta, lambda1, lambda2 }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ alpha, beta, lambda1, lambda2 }, [
      'alpha > 0',
      'beta > 0',
      'lambda1 >= 0',
      'lambda2 >= 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: 1,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling from non-central chi2
    const x = Object(__WEBPACK_IMPORTED_MODULE_2__core__["e" /* noncentralChi2 */])(this.r, 2 * this.p.alpha, this.p.lambda1)
    const y = Object(__WEBPACK_IMPORTED_MODULE_2__core__["e" /* noncentralChi2 */])(this.r, 2 * this.p.beta, this.p.lambda2)
    const z = x / (x + y)

    // Handle 1 - z << 1 case
    if (z === 1) {
      return 1 - y / x
    } else {
      return z
    }
  }

  _pdf (x) {
    // Using outward summation
    const y = x / (1 - x)
    const ab = this.p.alpha + this.p.beta

    // Speed-up constants
    const l1 = this.p.lambda1 / 2
    const l2 = this.p.lambda2 / 2

    // Initial indices
    const r0 = Math.round(l1)
    const s0 = Math.round(l2)

    // Init terms
    const pr0 = Math.exp(r0 * Math.log(l1) - Object(__WEBPACK_IMPORTED_MODULE_4__special_log_gamma__["a" /* default */])(r0 + 1))
    const ps0 = Math.exp(s0 * Math.log(l2) - Object(__WEBPACK_IMPORTED_MODULE_4__special_log_gamma__["a" /* default */])(s0 + 1))
    const psf0 = (s0 > 0 ? s0 : 1) * ps0 / l2
    const yr0 = Math.pow(y, this.p.alpha + r0 - 2)
    const ys0 = Math.pow(1 + y, this.p.alpha + r0 + this.p.beta + s0 - 2)
    const b0 = Object(__WEBPACK_IMPORTED_MODULE_6__special_beta__["a" /* default */])(this.p.alpha + r0, this.p.beta + s0)
    let bf0 = b0
    let bb0 = b0

    // Init delta and sum
    let z = 0

    // Forward r
    let ysf0 = ys0
    let pyrf = yr0 * pr0 * (r0 > 0 ? r0 : 1) / l1
    for (let kr = 0; kr < __WEBPACK_IMPORTED_MODULE_3__special_core__["c" /* MAX_ITER */]; kr++) {
      const r = r0 + kr
      const rAlpha = this.p.alpha + r
      let dz = 0

      // Update terms
      ysf0 *= 1 + y
      pyrf *= y * l1 / (r > 0 ? r : 1)

      // Forward s
      dz += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
        y: ysf0 * (1 + y),
        p: psf0 * l2 / (s0 > 0 ? s0 : 1),
        b: bf0
      }, (t, i) => {
        const s = s0 + i
        t.y *= 1 + y
        t.p *= l2 / (s > 0 ? s : 1)
        return t
      }, t => pyrf * t.p / (t.b * t.y), (t, i) => {
        const s = s0 + i
        t.b *= (this.p.beta + s) / (ab + r + s)
        return t
      })

      // Backward s
      if (s0 > 0) {
        dz += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
          y: ysf0,
          p: s0 * ps0 / l2,
          b: bf0 * (ab + r + s0 - 1) / (this.p.beta + s0 - 1)
        }, (t, i) => {
          const s = s0 - i - 1
          if (s >= 0) {
            t.y /= 1 + y
            t.p *= (s + 1) / l2
            t.b *= (ab + r + s) / (this.p.beta + s)
          } else {
            t.p = 0
          }
          return t
        }, t => pyrf * t.p / (t.b * t.y))
      }

      // Add s-terms
      z += dz
      if (Math.abs(dz / z) < __WEBPACK_IMPORTED_MODULE_3__special_core__["b" /* EPS */]) {
        break
      } else {
        bf0 *= rAlpha / (ab + r + s0)
      }
    }

    // Backward r
    if (r0 > 0) {
      let ysb0 = (1 + y) * ys0
      let pyrb = y * yr0 * pr0
      for (let r = r0 - 1; r >= 0; r--) {
        let dz = 0
        const rAlpha = this.p.alpha + r

        // Update terms
        ysb0 /= 1 + y
        pyrb *= (r + 1) / (y * l1)
        bb0 *= (ab + r + s0) / rAlpha

        // Forward s
        dz += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
          y: ysb0 * (1 + y),
          p: psf0 * l2 / (s0 > 0 ? s0 : 1),
          b: bb0
        }, (t, i) => {
          const s = s0 + i
          t.y *= 1 + y
          t.p *= l2 / (s > 0 ? s : 1)
          return t
        }, t => pyrb * t.p / (t.b * t.y), (t, i) => {
          const s = s0 + i
          t.b *= (this.p.beta + s) / (ab + r + s)
          return t
        })

        // Backward s
        if (s0 > 0) {
          dz += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
            y: ysb0,
            p: ps0 * s0 / l2,
            b: bb0 * (ab + r + s0 - 1) / (this.p.beta + s0 - 1)
          }, (t, i) => {
            const s = s0 - i - 1
            if (s >= 0) {
              t.y /= 1 + y
              t.p *= (s + 1) / l2
              t.b *= (ab + r + s) / (this.p.beta + s)
            } else {
              t.p = 0
            }
            return t
          }, t => pyrb * t.p / (t.b * t.y))
        }

        // Add s-terms
        z += dz
        if (Math.abs(dz / z) < __WEBPACK_IMPORTED_MODULE_3__special_core__["b" /* EPS */]) {
          break
        }
      }
    }

    return Math.exp(-l1 - l2) * z / Math.pow(1 - x, 2)
  }

  _cdf (x) {
    // Using outward summation
    const r0 = Math.round(this.p.lambda1 / 2)
    const s0 = Math.round(this.p.lambda2 / 2)
    const sBeta0 = this.p.beta + s0 - 1

    // Speed-up constants
    const l1 = this.p.lambda1 / 2
    const l2 = this.p.lambda2 / 2

    // Init terms
    const pr0 = Math.exp(r0 * Math.log(l1) - Object(__WEBPACK_IMPORTED_MODULE_4__special_log_gamma__["a" /* default */])(r0 + 1))
    const ps0 = Math.exp(s0 * Math.log(l2) - Object(__WEBPACK_IMPORTED_MODULE_4__special_log_gamma__["a" /* default */])(s0 + 1))
    const psf0 = (s0 > 0 ? s0 : 1) * ps0 / l2
    const xa0 = Math.pow(x, this.p.alpha + r0)
    const xb0 = Math.pow(1 - x, this.p.beta + s0)
    const b0 = Object(__WEBPACK_IMPORTED_MODULE_6__special_beta__["a" /* default */])(this.p.alpha + r0, this.p.beta + s0)
    const ib0 = Object(__WEBPACK_IMPORTED_MODULE_5__special_beta_incomplete__["b" /* regularizedBetaIncomplete */])(this.p.alpha + r0, this.p.beta + s0, x)

    // Delta and sum
    let z = 0

    // Forward r
    let prf = (r0 > 0 ? r0 : 1) * pr0 / l1
    let xaf = xa0
    let bf0 = b0
    let ibf0 = ib0
    for (let kr = 0; kr < __WEBPACK_IMPORTED_MODULE_3__special_core__["c" /* MAX_ITER */]; kr++) {
      const r = r0 + kr
      const rAlpha = this.p.alpha + r
      let dz = 0

      // Update terms
      prf *= l1 / (r > 0 ? r : 1)

      // Forward s
      dz += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
        p: psf0 * l2 / (s0 > 0 ? s0 : 1),
        xb: xb0,
        b: bf0,
        ib: ibf0
      }, (t, i) => {
        const s = s0 + i
        t.p *= l2 / (s > 0 ? s : 1)
        return t
      }, t => prf * t.p * t.ib, (t, i) => {
        const s = s0 + i
        const sBeta = this.p.beta + s
        t.ib += xaf * t.xb / (sBeta * t.b)
        t.b *= sBeta / (rAlpha + sBeta)
        t.xb *= 1 - x
        return t
      })

      // Backward s
      if (s0 > 0) {
        const xb = xb0 / (1 - x)
        const bfb = bf0 * (rAlpha + sBeta0) / sBeta0
        dz += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
          p: ps0 * s0 / l2,
          xb,
          b: bfb,
          ib: ibf0 - xaf * xb / (sBeta0 * bfb)
        }, (t, i) => {
          const s = s0 - i - 1
          const sBeta = this.p.beta + s
          if (s >= 0) {
            t.p *= (s + 1) / l2
            t.xb /= 1 - x
            t.b *= (rAlpha + sBeta) / sBeta
            t.ib -= xaf * t.xb / (sBeta * t.b)
          } else {
            t.p = 0
            t.ib = 0
          }

          return t
        }, t => prf * t.p * t.ib)
      }

      // Add s-terms
      z += dz
      if (Math.abs(dz / z) < __WEBPACK_IMPORTED_MODULE_3__special_core__["b" /* EPS */]) {
        break
      } else {
        ibf0 -= xaf * xb0 / (rAlpha * bf0)
        bf0 *= rAlpha / (rAlpha + this.p.beta + s0)
        xaf *= x
      }
    }

    // Backward r
    if (r0 > 0) {
      let prb = pr0
      let xab = xa0
      let bb0 = b0
      let ibb0 = ib0
      for (let r = r0 - 1; r >= 0; r--) {
        let dz = 0
        const rAlpha = this.p.alpha + r

        // Update terms
        prb *= (r + 1) / l1
        xab /= x
        bb0 *= (rAlpha + this.p.beta + s0) / rAlpha
        ibb0 += xab * xb0 / (rAlpha * bb0)

        // Forward s
        dz += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
          p: psf0 * l2 / (s0 > 0 ? s0 : 1),
          xb: xb0,
          b: bb0,
          ib: ibb0
        }, (t, i) => {
          const s = s0 + i
          t.p *= l2 / (s > 0 ? s : 1)
          return t
        }, t => prb * t.p * t.ib, (t, i) => {
          const s = s0 + i
          const sBeta = this.p.beta + s
          t.ib += xab * t.xb / (sBeta * t.b)
          t.b *= sBeta / (rAlpha + sBeta)
          t.xb *= 1 - x
          return t
        })

        // Backward s
        if (s0 > 0) {
          const xbb = xb0 / (1 - x)
          const bbb = bb0 * (rAlpha + sBeta0) / sBeta0
          dz += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
            p: ps0 * s0 / l2,
            xb: xb0 / (1 - x),
            b: bb0 * (rAlpha + sBeta0) / sBeta0,
            ib: ibb0 - xab * xbb / (sBeta0 * bbb)
          }, (t, i) => {
            const s = s0 - i - 1
            const sBeta = this.p.beta + s
            if (s >= 0) {
              t.p *= (s + 1) / l2
              t.xb /= 1 - x
              t.b *= (rAlpha + sBeta) / sBeta
              t.ib -= xab * t.xb / (sBeta * t.b)
            } else {
              t.p = 0
            }
            return t
          }, t => prb * t.p * t.ib)
        }

        // Add s-terms
        z += dz
        if (Math.abs(dz / z) < __WEBPACK_IMPORTED_MODULE_3__special_core__["b" /* EPS */]) {
          break
        }
      }
    }

    return Math.max(0, Math.min(1, Math.exp(-l1 - l2) * z))
  }
});


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_core__ = __webpack_require__(3);
/**
 * Computes the first n terms of an alternating series.
 * Source: https://projecteuclid.org/download/pdf_1/euclid.em/1046889587
 *
 * @method acceleratedSum
 * @memberOf ran.algorithms
 * @param {Function} a Function returning the k-th element of the series.
 * @returns {number} The sum of the series up to the first n-th terms.
 * @private
 */


/* harmony default export */ __webpack_exports__["a"] = (function (a) {
  const n = 30
  let d = Math.pow(3 + 2 * Math.SQRT2, n)
  d = (d + 1 / d) / 2
  let b = -1
  let c = -d
  let ds = 0
  let s = 0
  for (let k = 0; k < n; k++) {
    c = b - c
    ds = c * a(k)
    s += ds
    if (Math.abs(ds / s) < __WEBPACK_IMPORTED_MODULE_0__special_core__["b" /* EPS */]) {
      break
    }
    b *= (k + n) * (k - n) / ((k + 0.5) * (k + 1))
  }
  return s / d
});


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_error__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__special_beta_incomplete__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__distribution__ = __webpack_require__(0);







/**
 * Generator for the [non-central t distribution]{@link https://en.wikipedia.org/wiki/Noncentral_t-distribution}:
 *
 * $$f(x; \nu, \mu) = \frac{\nu^\frac{\nu}{2} \exp\Big(-\frac{\nu \mu^2}{2 (x^2 + \nu)}\Big)}{\sqrt{\pi} \Gamma\big(\frac{\nu}{2}\big) 2^\frac{\nu - 1}{2} (x^2 + \nu)^\frac{\nu + 1}{2}} \int_0^\infty y^\nu \exp\bigg(-\frac{1}{2}\bigg[y - \frac{\mu x}{\sqrt{x^2 + \nu}}\bigg]^2\bigg) \mathrm{d}y,$$
 *
 * with \(\nu \in \mathbb{N}^+\) and \(\mu \in \mathbb{R}\). Support: \(x \in \mathbb{R}\).
 *
 * @class NoncentralT
 * @memberOf ran.dist
 * @param {number=} nu Degrees of freedom. If not an integer, it is rounded to the nearest one. Default value is 1.
 * @param {number=} mu Non-centrality parameter. Default value is 1.
 * @constructor
 */
class NoncentralT extends __WEBPACK_IMPORTED_MODULE_5__distribution__["a" /* default */] {
  constructor (nu = 1, mu = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    const nui = Math.round(nu)
    this.p = { nu: nui, mu }
    __WEBPACK_IMPORTED_MODULE_5__distribution__["a" /* default */].validate({ nu: nui, mu }, [
      'nu > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    const mu2 = mu * mu / 2
    this.c = [
      Math.sqrt(1 + 2 / nui),
      Math.exp(Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])((nui + 1) / 2) - Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(nui / 2) - mu2) / Math.sqrt(Math.PI * nui)
    ]
  }

  /**
   * Calculates the cumulative distribution function for a specific pairs of parameters and value.
   * Source: http://www.ucs.louisiana.edu/~kxk4695/CSDA-03.pdf
   *
   * @method fnm
   * @methodOf ran.dist.NoncentralT
   * @param {number} nu Degrees of freedom.
   * @param {number} mu Non-centrality parameter.
   * @param {number} x Value to evaluate distribution function at.
   * @returns {number} The cumulative probability.
   * @static
   * @ignore
   */
  static fnm (nu, mu, x) {
    // If mu = 0, return CDF for central t
    if (Math.abs(mu) < Number.EPSILON) {
      return x > 0
        ? 1 - 0.5 * Object(__WEBPACK_IMPORTED_MODULE_3__special_beta_incomplete__["b" /* regularizedBetaIncomplete */])(nu / 2, 0.5, nu / (x * x + nu))
        : 0.5 * Object(__WEBPACK_IMPORTED_MODULE_3__special_beta_incomplete__["b" /* regularizedBetaIncomplete */])(nu / 2, 0.5, nu / (x * x + nu))
    }

    const delta = x < 0 ? -mu : mu
    const phi = 0.5 * (1 + Object(__WEBPACK_IMPORTED_MODULE_1__special_error__["a" /* erf */])(-delta / Math.SQRT2))

    // If x = 0, return normal part
    if (Math.abs(x) < Number.EPSILON) {
      return phi
    }

    // Initialize iterators
    const y = x * x / (nu + x * x)
    const mu2 = delta * delta / 2
    const nu2 = nu / 2
    const k0 = Math.floor(mu2)
    const gnu = Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(nu2)
    const gk1 = Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(k0 + 1)
    const gk15 = Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(k0 + 1.5)
    const ly = Math.log(y)
    const p0 = Math.exp(-mu2 - Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(k0 + 1) + k0 * Math.log(mu2))
    const q0 = delta * Math.exp(-mu2 - Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(k0 + 1.5) + k0 * Math.log(mu2)) / Math.SQRT2
    const ap = k0 + 0.5
    const aq = k0 + 1
    const apb = ap + nu2
    const aqb = aq + nu2
    const bl1y = nu2 * Math.log(1 - y)
    const gp0 = Math.exp(Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(k0 + nu2 + 0.5) - gnu - gk15 + ap * ly + bl1y)
    const gq0 = Math.exp(Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(k0 + nu2) - gnu - gk1 + (aq - 1) * ly + bl1y)
    const ip0 = Object(__WEBPACK_IMPORTED_MODULE_3__special_beta_incomplete__["b" /* regularizedBetaIncomplete */])(ap, nu2, y)
    const iq0 = Object(__WEBPACK_IMPORTED_MODULE_3__special_beta_incomplete__["b" /* regularizedBetaIncomplete */])(aq, nu2, y)

    // Forward summation
    const gq = gq0 * y * (aqb - 1) / aq
    let z = Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
      p: p0 * mu2 / (k0 + 1),
      gp: gp0 * y * apb / (ap + 1),
      ip: ip0 - gp0,
      q: q0 * mu2 / (k0 + 1.5),
      gq: gq,
      iq: iq0 - gq
    }, (t, i) => {
      const j = i + 1
      t.p *= mu2 / (k0 + j)
      t.ip -= t.gp
      t.gp *= y * (apb + i) / (ap + j)
      t.q *= mu2 / (k0 + j + 0.5)
      t.gq *= y * (aqb + i - 1) / (aq + i)
      t.iq -= t.gq
      return t
    }, t => t.p * t.ip + t.q * t.iq)

    // Backward summation
    z += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
      p: p0,
      gp: gp0,
      ip: ip0,
      q: q0,
      gq: gq0 * y * (aqb - 1) / aq,
      iq: iq0
    }, (t, i) => {
      const j = i - 1
      if (j < k0) {
        t.p *= (k0 - j) / mu2
        t.gp *= (ap - j) / (y * (apb - i))
        t.ip += t.gp
        t.q *= (k0 - j + 0.5) / mu2
        t.gq *= (aq - j) / (y * (aqb - i))
        t.iq += t.gq
      } else {
        t.p = 0
        t.ip = 0
        t.q = 0
        t.iq = 0
      }
      return t
    }, t => t.p * t.ip + t.q * t.iq)

    z = z / 2 + phi
    return Math.min(Math.max(x >= 0 ? z : 1 - z, 0), 1)
  }

  _generator () {
    // Direct sampling from a normal and a chi2
    const x = Object(__WEBPACK_IMPORTED_MODULE_4__core__["f" /* normal */])(this.r)
    const y = Object(__WEBPACK_IMPORTED_MODULE_4__core__["b" /* chi2 */])(this.r, this.p.nu)
    return (x + this.p.mu) / Math.sqrt(y / this.p.nu)
  }

  _pdf (x) {
    if (Math.abs(x) < Number.EPSILON) {
      return this.c[1]
    } else {
      return Math.max(0, this.p.nu * (NoncentralT.fnm(this.p.nu + 2, this.p.mu, x * this.c[0]) - NoncentralT.fnm(this.p.nu, this.p.mu, x)) / x)
    }
  }

  _cdf (x) {
    return NoncentralT.fnm(this.p.nu, this.p.mu, x)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (NoncentralT);


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__beta__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [F distribution]{@link https://en.wikipedia.org/wiki/F-distribution} (or Fisher-Snedecor's F
 * distribution):
 *
 * $$f(x; d_1, d_2) = \frac{\sqrt{\frac{(d_1 x)^{d_1} d_2^{d_2}}{(d_1x + d_2)^{d_1 + d_2}}}}{x \mathrm{B}\big(\frac{d_1}{2}, \frac{d_2}{2}\big)},$$
 *
 * with \(d_1, d_2 > 0\). Support: \(x > 0\).
 *
 * @class F
 * @memberOf ran.dist
 * @param {number=} d1 First degree of freedom. If not an integer, it is rounded to the nearest one. Default value is 2.
 * @param {number=} d2 Second degree of freedom. If not an integer, it is rounded to the nearest one. Default value is 2.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__beta__["a" /* default */] {
  // Transformation of beta distribution
  constructor (d1 = 2, d2 = 2) {
    const d1i = Math.round(d1)
    const d2i = Math.round(d2)
    super(d1i / 2, d2i / 2)

    // Validate parameters
    this.p = Object.assign(this.p, { d1: d1i, d2: d2i })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ d1: d1i, d2: d2i }, [
      'd1 > 0',
      'd2 > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: d1i !== 1
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming beta variate
    const x = super._generator()
    return this.p.d2 * x / (this.p.d1 * (1 - x))
  }

  _pdf (x) {
    const y = this.p.d2 + this.p.d1 * x
    return this.p.d1 * this.p.d2 * super._pdf(this.p.d1 * x / y) / Math.pow(y, 2)
  }

  _cdf (x) {
    const y = this.p.d1 * x
    return super._cdf(1 / (1 + this.p.d2 / y))
  }
});


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gamma__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [generalized gamma distribution]{@link https://en.wikipedia.org/wiki/Generalized_gamma_distribution}:
 *
 * $$f(x; a, d, p) = \frac{p/a^d}{\Gamma(d/p)} x^{d - 1} e^{-(x/a)^p},$$
 *
 * where \(a, d, p > 0\). Support: \(x > 0\).
 *
 * @class GeneralizedGamma
 * @memberOf ran.dist
 * @param {number=} a Scale parameter. Default value is 1.
 * @param {number=} d Shape parameter. Default value is 1.
 * @param {number=} p Shape parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__gamma__["a" /* default */] {
  // Transformation of gamma distribution
  constructor (a = 1, d = 1, p = 1) {
    super(d / p, Math.pow(a, -p))

    // Validate parameters
    this.p = Object.assign(this.p, { a, d, p })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ a, d, p }, [
      'a > 0',
      'd > 0',
      'p > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: d >= 1 && p >= 1 && d >= p
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming gamma variate
    return Math.pow(super._generator(), 1 / this.p.p)
  }

  _pdf (x) {
    return this.p.p * Math.pow(x, this.p.p - 1) * super._pdf(Math.pow(x, this.p.p))
  }

  _cdf (x) {
    return super._cdf(Math.pow(x, this.p.p))
  }
});


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generalized_gamma__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [generalized normal distribution]{@link }:
 *
 * $$f(x; \mu, \alpha, \beta) = \frac{\beta}{2 \alpha \Gamma\big(\frac{1}{\beta}\big)} e^{-\big(\frac{|x - \mu|}{\alpha}\big)^\beta},$$
 *
 * where \(\mu \in \mathbb{R}\) and \(\alpha, \beta > 0\). Support: \(x \in \mathbb{R\). It is also a special case of the
 * [generalized gamma distribution]{@link #dist.GeneralizedGamma}.
 *
 * @class GeneralizedNormal
 * @memberOf ran.dist
 * @param {number=} mu Location paramameter. Default value is 0.
 * @param {number=} alpha Scale parameter. Default value is 1.
 * @param {number=} beta Shape parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__generalized_gamma__["a" /* default */] {
  constructor (mu = 0, alpha = 1, beta = 1) {
    super(alpha, 1, beta)

    // Validate parameters
    this.p = Object.assign(this.p, { mu, alpha2: alpha, beta2: beta })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ mu, alpha, beta }, [
      'alpha > 0',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Transforming generalized gamma variate
    return (this.r.next() > 0.5 ? 1 : -1) * Math.abs(super._generator()) + this.p.mu
  }

  _pdf (x) {
    return super._pdf(Math.abs(x - this.p.mu)) / 2
  }

  _cdf (x) {
    return 0.5 * (1 + Math.sign(x - this.p.mu) * super._cdf(Math.abs(x - this.p.mu)))
  }
});


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [generalized Pareto distribution]{@link https://en.wikipedia.org/wiki/Generalized_Pareto_distribution}:
 *
 * $$fx; \mu, \sigma, \xi) = \begin{cases}\frac{1}{\sigma} (1 + \xi z)^{-(1/\xi + 1)} &\quad\text{if $\xi \ne 0$},\\\frac{1}{\sigma} e^{-z} &\quad\text{if $\xi = 0$}\\\end{cases},$$
 *
 * with \(\mu, \xi \in \mathbb{R}\), \(\sigma > 0\) and \(z = \frac{x - \mu}{\sigma}\). Support: \(x \in [\mu, \infty)\) if \(\xi \ge 0\), \(x \in [\mu, \mu - \sigma / \xi]\) otherwise.
 *
 * @class GeneralizedPareto
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} sigma Scale parameter. Default value is 1.
 * @param {number=} xi Shape parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (mu = 0, sigma = 1, xi = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, sigma, xi }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ mu, sigma, xi }, [
      'sigma > 0'
    ])

    // Set support
    this.s = [{
      value: mu,
      closed: true
    }, {
      value: xi < 0 ? mu - sigma / xi : Infinity,
      closed: xi < 0
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const z = (x - this.p.mu) / this.p.sigma
    return this.p.xi === 0
      ? Math.exp(-z) / this.p.sigma
      : Math.pow(1 + this.p.xi * z, -1 / this.p.xi - 1) / this.p.sigma
  }

  _cdf (x) {
    const z = (x - this.p.mu) / this.p.sigma
    return this.p.xi === 0
      ? 1 - Math.exp(-z)
      : 1 - Math.pow(1 + this.p.xi * z, -1 / this.p.xi)
  }

  _q (p) {
    const y = this.p.xi === 0 ? -Math.log(1 - p) : (Math.pow(1 - p, -this.p.xi) - 1) / this.p.xi
    return this.p.mu + this.p.sigma * y
  }
});


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__normal__ = __webpack_require__(5);


/**
 * Generator for the [log-normal distribution]{@link https://en.wikipedia.org/wiki/Log-normal_distribution}:
 *
 * $$f(x; \mu, \sigma) = \frac{1}{x \sigma \sqrt{2 \pi}}e^{-\frac{(\ln x - \mu)^2}{2\sigma^2}},$$
 *
 * where \(\mu \in \mathbb{R}\) and \(\sigma > 0\). Support: \(x > 0\).
 *
 * @class LogNormal
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} sigma Scale parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__normal__["a" /* default */] {
  // Transforming normal distribution
  constructor (mu = 0, sigma = 1) {
    super(mu, sigma)

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming normal variate
    return Math.exp(super._generator())
  }

  _pdf (x) {
    return super._pdf(Math.log(x)) / x
  }

  _cdf (x) {
    return super._cdf(Math.log(x))
  }

  _q (p) {
    return Math.exp(super._q(p))
  }
});


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_error__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);




/**
 * Generator for the Wald or [inverse Gaussian distribution]{@link https://en.wikipedia.org/wiki/Inverse_Gaussian_distribution}:
 *
 * $$f(x; \lambda, \mu) = \bigg[\frac{\lambda}{2 \pi x^3}\bigg]^{1/2} e^{\frac{-\lambda (x - \mu)^2}{2 x \mu^2}},$$
 *
 * with \(\mu, \lambda > 0\). Support: \(x > 0\).
 *
 * @class InverseGaussian
 * @memberOf ran.dist
 * @param {number=} mu Mean of the distribution. Default value is 1.
 * @param {number=} lambda Shape parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */] {
  constructor (mu = 1, lambda = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, lambda }
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ mu, lambda }, [
      'mu > 0',
      'lambda > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      0.5 * mu / lambda,
      Math.exp(2 * lambda / mu),
      Math.sqrt(lambda / (mu * mu))
    ]
  }

  _generator () {
    // Direct sampling
    const nu = Object(__WEBPACK_IMPORTED_MODULE_1__core__["f" /* normal */])(this.r)

    const y = nu * nu

    const x = this.p.mu + this.c[0] * this.p.mu * y - this.c[0] * Math.sqrt(this.p.mu * y * (4 * this.p.lambda + this.p.mu * y))
    return this.r.next() > this.p.mu / (this.p.mu + x) ? this.p.mu * this.p.mu / x : x
  }

  _pdf (x) {
    return Math.sqrt(this.p.lambda / (2 * Math.PI * Math.pow(x, 3))) * Math.exp(-this.p.lambda * Math.pow(x - this.p.mu, 2) / (2 * this.p.mu * this.p.mu * x))
  }

  _cdf (x) {
    const s = Math.sqrt(this.p.lambda / x)
    const st = Math.sqrt(x) * this.c[2]
    const z = Object(__WEBPACK_IMPORTED_MODULE_0__special_error__["a" /* erf */])(Math.SQRT1_2 * (st - s))

    // Handle 1 - z << 1 case
    if (1 - z > Number.EPSILON) {
      return Math.min(1, 0.5 * (1 + z + this.c[1] * Object(__WEBPACK_IMPORTED_MODULE_0__special_error__["b" /* erfc */])(Math.SQRT1_2 * (st + s))))
    } else {
      return Math.min(1, 0.5 * (Object(__WEBPACK_IMPORTED_MODULE_0__special_error__["b" /* erfc */])(Math.SQRT1_2 * (s - st)) + this.c[1] * Object(__WEBPACK_IMPORTED_MODULE_0__special_error__["b" /* erfc */])(Math.SQRT1_2 * (st + s))))
    }
  }
});


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Kumaraswamy distribution]{@link https://en.wikipedia.org/wiki/Kumaraswamy_distribution} (also
 * known as Minimax distribution):
 *
 * $$f(x; a, b) = a b x^{a-1} (1 - x^a)^{b - 1},$$
 *
 * with \(a, b > 0\). Support: \(x \in (0, 1)\).
 *
 * @class Kumaraswamy
 * @memberOf ran.dist
 * @param {number=} alpha First shape parameter. Default value is 1.
 * @param {number=} beta Second shape parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (a = 1, b = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { a, b }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ a, b }, [
      'a > 0',
      'b > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: 1,
      closed: true
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    // Handle case a < 1 and x << 1
    const a = Math.pow(x, this.p.a - 1)
    if (!Number.isFinite(a)) {
      return 0
    }

    // Handle case b < 1 and 1 - x << 1
    const b = Math.pow(1 - a * x, this.p.b - 1)
    if (!Number.isFinite(b)) {
      return 0
    }
    return this.p.a * this.p.b * a * b
  }

  _cdf (x) {
    return 1 - Math.pow(1 - Math.pow(x, this.p.a), this.p.b)
  }

  _q (p) {
    return Math.pow(1 - Math.pow(1 - p, 1 / this.p.b), 1 / this.p.a)
  }
});


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Laplace distribution]{@link https://en.wikipedia.org/wiki/Laplace_distribution} (also known as [double exponential distribution]{@link https://www.itl.nist.gov/div898/handbook/eda/section3/eda366c.htm}):
 *
 * $$f(x; \mu, b) = \frac{1}{2b}e^{-\frac{|x - \mu|}{b}},$$
 *
 * where \(\mu \in \mathbb{R}\) and \(b > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class Laplace
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} b Scale parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (mu = 0, b = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, b }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ mu, b }, [
      'b > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling from uniform
    return this.p.mu + this.p.b * Math.log(this.r.next() / this.r.next())
  }

  _pdf (x) {
    return 0.5 * Math.exp(-Math.abs(x - this.p.mu) / this.p.b) / this.p.b
  }

  _cdf (x) {
    const z = Math.exp((x - this.p.mu) / this.p.b)
    return x < this.p.mu ? 0.5 * z : 1 - 0.5 / z
  }

  _q (p) {
    return p < 0.5
      ? this.p.mu + this.p.b * Math.log(2 * p)
      : this.p.mu - this.p.b * Math.log(2 - 2 * p)
  }
});


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_beta__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__special_beta_incomplete__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__distribution__ = __webpack_require__(0);







/**
 * Generator for the [non-central beta distribution]{@link https://en.wikipedia.org/wiki/Noncentral_beta_distribution}:
 *
 * $$f(x; d_1, d_2, \lambda) = e^{-\frac{\lambda}{2}} \sum_{k=0}^\infty \frac{1}{k!} \bigg(\frac{\lambda}{2}\bigg)^k \frac{x^{\alpha + k - 1} (1 - x)^{\beta - 1}}{\mathrm{B}(\alpha + k, \beta)},$$
 *
 * where \(\alpha, \beta > 0\) and \(\lambda \ge 0\). Support: \(x \in [0, 1]\).
 *
 * @class NoncentralBeta
 * @memberOf ran.dist
 * @param {number=} alpha First shape parameter. Default value is 1.
 * @param {number=} beta Second shape parameter. Default value is 1.
 * @param {number=} lambda Non-centrality parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_5__distribution__["a" /* default */] {
  // TODO Use outward iteration
  constructor (alpha = 1, beta = 1, lambda = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { alpha, beta, lambda }
    __WEBPACK_IMPORTED_MODULE_5__distribution__["a" /* default */].validate({ alpha, beta, lambda }, [
      'alpha > 0',
      'beta > 0',
      'lambda >= 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: 1,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      Math.exp(-lambda / 2),
      Object(__WEBPACK_IMPORTED_MODULE_1__special_beta__["a" /* default */])(alpha, beta)
    ]
  }

  _generator () {
    // Direct sampling from non-central chi2 and chi2
    const x = Object(__WEBPACK_IMPORTED_MODULE_4__core__["e" /* noncentralChi2 */])(this.r, 2 * this.p.alpha, this.p.lambda)
    const y = Object(__WEBPACK_IMPORTED_MODULE_4__core__["b" /* chi2 */])(this.r, 2 * this.p.beta)
    const z = x / (x + y)

    // Handle 1 - z << 1 case
    if (Math.abs(1 - z) < Number.EPSILON) {
      return 1 - y / x
    } else {
      return z
    }
  }

  _pdf (x) {
    // Speed-up variables
    const l2 = this.p.lambda / 2
    const i0 = Math.round(l2)
    let iAlpha0 = this.p.alpha + i0

    // Init variables
    const p0 = Math.exp(-l2 + i0 * Math.log(l2) - Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(i0 + 1))
    const xa0 = Math.pow(x, iAlpha0 - 1)
    const xb = Math.pow(1 - x, this.p.beta - 1)
    const b0 = Object(__WEBPACK_IMPORTED_MODULE_1__special_beta__["a" /* default */])(iAlpha0, this.p.beta)

    // Forward sum
    let z = Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
      p: p0,
      xa: xa0,
      b: b0
    }, (t, i) => {
      t.p *= l2 / (i + i0)
      return t
    }, t => t.p * t.xa * xb / t.b, (t, i) => {
      const iAlpha = iAlpha0 + i
      t.xa *= x
      t.b *= iAlpha / (iAlpha + this.p.beta)
      return t
    })

    if (i0 > 0) {
      iAlpha0--
      const xa = xa0 / x
      const b = b0 * (iAlpha0 + this.p.beta) / iAlpha0
      z += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
        p: p0 * i0 / l2,
        xa,
        b
      }, (t, i) => {
        const j = i0 - i - 1
        const iAlpha = iAlpha0 - i
        if (j >= 0) {
          t.p /= l2 / (j + 1)
          t.xa /= x
          t.b /= iAlpha / (iAlpha + this.p.beta)
        } else {
          t.p = 0
          t.ib = 0
        }
        return t
      }, t => t.p * t.xa * xb / t.b)
    }

    return z
  }

  _cdf (x) {
    // Speed-up variables
    const l2 = this.p.lambda / 2
    const i0 = Math.round(l2)
    let iAlpha0 = this.p.alpha + i0

    // Init variables
    const p0 = Math.exp(-l2 + i0 * Math.log(l2) - Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(i0 + 1))
    const xa0 = Math.pow(x, iAlpha0)
    const xb = Math.pow(1 - x, this.p.beta)
    const b0 = Object(__WEBPACK_IMPORTED_MODULE_1__special_beta__["a" /* default */])(iAlpha0, this.p.beta)
    const ib0 = Object(__WEBPACK_IMPORTED_MODULE_3__special_beta_incomplete__["b" /* regularizedBetaIncomplete */])(iAlpha0, this.p.beta, x)

    // Forward sum
    let z = Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
      p: p0,
      xa: xa0,
      b: b0,
      ib: ib0
    }, (t, i) => {
      t.p *= l2 / (i + i0)
      return t
    }, t => t.p * t.ib, (t, i) => {
      const iAlpha = iAlpha0 + i
      t.ib -= t.xa * xb / (iAlpha * t.b)
      t.xa *= x
      t.b *= iAlpha / (iAlpha + this.p.beta)
      return t
    })

    // Backward sum
    if (i0 > 0) {
      iAlpha0--
      const xa = xa0 / x
      const b = b0 * (iAlpha0 + this.p.beta) / iAlpha0
      z += Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
        p: p0 * i0 / l2,
        xa,
        b,
        ib: ib0 + xa * xb / (iAlpha0 * b)
      }, (t, i) => {
        const j = i0 - i - 1
        const iAlpha = iAlpha0 - i
        if (j >= 0) {
          t.p /= l2 / (j + 1)
          t.xa /= x
          t.b /= iAlpha / (iAlpha + this.p.beta)
          t.ib += t.xa * xb / (iAlpha * t.b)
        } else {
          t.p = 0
          t.ib = 0
        }
        return t
      }, t => t.p * t.ib)
    }

    return Math.min(1, z)
  }
});


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_bessel__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_marcum_q__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [non-central \(\chi^2\) distribution]{@link https://en.wikipedia.org/wiki/Noncentral_chi-squared_distribution}:
 *
 * $$f(x; k; \lambda) = \frac{1}{2}e^{-\frac{x + \lambda}{2}} \bigg(\frac{x}{\lambda}\bigg)^{k/4 - 1/2} I_{k/2 - 1}\big(\sqrt{\lambda x}\big),$$
 *
 * with \(k \in \mathbb{N}^+\), \(\lambda > 0\) and \(I_n(x)\) is the modified Bessel function of the first kind with order \(n\). Support: \(x \in [0, \infty)\).
 *
 * @class NoncentralChi2
 * @memberOf ran.dist
 * @param {number=} k Degrees of freedom. If not an integer, it is rounded to the nearest one. Default value is 2.
 * @param {number=} lambda Non-centrality parameter. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (k = 2, lambda = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    const ki = Math.round(k)
    this.p = { k: ki, lambda }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ k: ki, lambda }, [
      'k > 0',
      'lambda > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      this.p.k % 2 === 0
    ]
  }

  _generator () {
    // Direct sampling
    return Object(__WEBPACK_IMPORTED_MODULE_2__core__["e" /* noncentralChi2 */])(this.r, this.p.k, this.p.lambda)
  }

  _pdf (x) {
    if (this.c[0]) {
      // k is even
      if (this.p.k === 2 && x === 0) {
        // k = 2, x -> 0, by differentiating F(x)
        return 0.5 * Math.exp(-0.5 * this.p.lambda)
      } else {
        return 0.5 * Math.exp(-0.5 * (x + this.p.lambda)) * Math.pow(x / this.p.lambda, this.p.k / 4 - 0.5) * Object(__WEBPACK_IMPORTED_MODULE_0__special_bessel__["a" /* besselI */])(Math.abs(Math.floor(this.p.k / 2) - 1), Math.sqrt(this.p.lambda * x))
      }
    } else {
      // k is odd
      if (this.p.k === 1 && x === 0) {
        // k = 1, x -> 0, by differentiating F(x)
        return 0.5 * Math.exp(-0.5 * this.p.lambda) * Math.sqrt(2 / Math.PI)
      } else {
        return 0.5 * Math.exp(-0.5 * (x + this.p.lambda)) * Math.pow(x / this.p.lambda, this.p.k / 4 - 0.5) * Object(__WEBPACK_IMPORTED_MODULE_0__special_bessel__["b" /* besselISpherical */])(Math.floor((this.p.k - 3) / 2), Math.sqrt(this.p.lambda * x)) * Math.sqrt(2 * Math.sqrt(x * this.p.lambda) / Math.PI)
      }
    }
  }

  _cdf (x) {
    return 1 - Object(__WEBPACK_IMPORTED_MODULE_1__special_marcum_q__["a" /* default */])(this.p.k / 2, this.p.lambda / 2, x / 2)
  }
});


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_beta__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_beta_incomplete__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for [Student's t-distribution]{@link https://en.wikipedia.org/wiki/Student%27s_t-distribution}:
 *
 * $$f(x; \nu) = \frac{1}{\sqrt{\nu}\mathrm{B}\big(\frac{1}{2}, \frac{\nu}{2}\big)} \Big(1 + \frac{x^2}{\nu}\Big)^{-\frac{\nu + 1}{2}},$$
 *
 * with \(\nu > 0\) and \(\mathrm{B}(x, y)\) is the beta function. Support: \(x \in \mathbb{R}\).
 *
 * @class StudentT
 * @memberOf ran.dist
 * @param {number=} nu Degrees of freedom. Default value is 1.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (nu = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { nu }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ nu }, [
      'nu > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling using gamma variates
    return Object(__WEBPACK_IMPORTED_MODULE_2__core__["i" /* sign */])(this.r) * Math.sqrt(this.p.nu * Object(__WEBPACK_IMPORTED_MODULE_2__core__["d" /* gamma */])(this.r, 0.5) / Object(__WEBPACK_IMPORTED_MODULE_2__core__["d" /* gamma */])(this.r, this.p.nu / 2))
  }

  _pdf (x) {
    return Math.pow(1 + x * x / this.p.nu, -0.5 * (this.p.nu + 1)) / (Math.sqrt(this.p.nu) * Object(__WEBPACK_IMPORTED_MODULE_0__special_beta__["a" /* default */])(0.5, this.p.nu / 2))
  }

  _cdf (x) {
    return x > 0
      ? 1 - 0.5 * Object(__WEBPACK_IMPORTED_MODULE_1__special_beta_incomplete__["b" /* regularizedBetaIncomplete */])(this.p.nu / 2, 0.5, this.p.nu / (x * x + this.p.nu))
      : 0.5 * Object(__WEBPACK_IMPORTED_MODULE_1__special_beta_incomplete__["b" /* regularizedBetaIncomplete */])(this.p.nu / 2, 0.5, this.p.nu / (x * x + this.p.nu))
  }
});


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__algorithms_accelerated_sum__ = __webpack_require__(57);


/**
 * Computes Riemann zeta function (only real values outside the critical strip) using the alternating series.
 * Source: https://projecteuclid.org/download/pdf_1/euclid.em/1046889587
 *
 * @method riemannZeta
 * @memberOf ran.special
 * @param {number} s Value to evaluate Riemann zeta at.
 * @return {number} Value of the Riemann zeta function.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (s) {
  const z = Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_accelerated_sum__["a" /* default */])(k => Math.pow(k + 1, -s))
  return z / (1 - Math.pow(2, 1 - s))
});


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gl_matrix__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stats_js__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stats_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_stats_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dat_gui__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dat_gui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dat_gui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geometry_Square__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__geometry_ScreenQuad__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rendering_gl_OpenGLRenderer__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Camera__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__globals__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__rendering_gl_ShaderProgram__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__geometry_Mesh__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lsystem_Plant__ = __webpack_require__(121);












// Define an object with application parameters and button callbacks
// This will be referred to by dat.GUI's functions that add GUI elements.
// Procedural Controls
let prevIterations;
let prevBranchThickness;
let prevSeed;
let prevAppleDensity;
const controls = {
    iterations: 3,
    branchThickness: 0.5,
    seed: 1.0,
    appleDensity: 0.15,
};
let square;
let screenQuad;
let time = 0.0;
let plantCylinderOBJ = Object(__WEBPACK_IMPORTED_MODULE_7__globals__["b" /* readTextFile */])('./src/geometry/plantCylinder.obj');
let plantCylinder;
let leafOBJ = Object(__WEBPACK_IMPORTED_MODULE_7__globals__["b" /* readTextFile */])('./src/geometry/leafPlane.obj');
let leaf;
let potOBJ = Object(__WEBPACK_IMPORTED_MODULE_7__globals__["b" /* readTextFile */])('./src/geometry/pot.obj');
let pot;
let dirtOBJ = Object(__WEBPACK_IMPORTED_MODULE_7__globals__["b" /* readTextFile */])('./src/geometry/mulch.obj');
let dirt;
let groundOBJ = Object(__WEBPACK_IMPORTED_MODULE_7__globals__["b" /* readTextFile */])('./src/geometry/grass.obj');
let ground;
let appleOBJ = Object(__WEBPACK_IMPORTED_MODULE_7__globals__["b" /* readTextFile */])('https://raw.githubusercontent.com/18smlee/hw04-l-systems/master/src/geometry/apple.obj');
let apple;
function loadScene(seed, branchThickness, appleDensity) {
    square = new __WEBPACK_IMPORTED_MODULE_3__geometry_Square__["a" /* default */]();
    square.create();
    screenQuad = new __WEBPACK_IMPORTED_MODULE_4__geometry_ScreenQuad__["a" /* default */]();
    screenQuad.create();
    plantCylinder = new __WEBPACK_IMPORTED_MODULE_9__geometry_Mesh__["a" /* default */](plantCylinderOBJ, 0, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(0.0, 0.0, 0.0));
    plantCylinder.create();
    leaf = new __WEBPACK_IMPORTED_MODULE_9__geometry_Mesh__["a" /* default */](leafOBJ, 1, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(0.0, 0.0, 0.0));
    leaf.create();
    pot = new __WEBPACK_IMPORTED_MODULE_9__geometry_Mesh__["a" /* default */](potOBJ, 2, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(0.0, 0.0, 0.0));
    pot.create();
    ground = new __WEBPACK_IMPORTED_MODULE_9__geometry_Mesh__["a" /* default */](groundOBJ, 3, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(0.0, 0.0, 0.0));
    ground.create();
    apple = new __WEBPACK_IMPORTED_MODULE_9__geometry_Mesh__["a" /* default */](appleOBJ, 4, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(0.0, 0.0, 0.0));
    apple.create();
    dirt = new __WEBPACK_IMPORTED_MODULE_9__geometry_Mesh__["a" /* default */](dirtOBJ, 5, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(0.0, 0.0, 0.0));
    dirt.create();
    // Create plant
    let plant = new __WEBPACK_IMPORTED_MODULE_10__lsystem_Plant__["a" /* default */]("TTTTTTTTX", controls.iterations, 30.0, seed, branchThickness, appleDensity);
    plant.create();
    // Set up instanced rendering data arrays for plant
    let num = plant.transformationMats.length;
    let colorsArray = [];
    let instanceIdArray = [];
    let transform1Array = [];
    let transform2Array = [];
    let transform3Array = [];
    let transform4Array = [];
    for (let i = 0; i < num; i++) {
        let T = plant.transformationMats[i];
        transform1Array.push(T[0]);
        transform1Array.push(T[1]);
        transform1Array.push(T[2]);
        transform1Array.push(T[3]);
        transform2Array.push(T[4]);
        transform2Array.push(T[5]);
        transform2Array.push(T[6]);
        transform2Array.push(T[7]);
        transform3Array.push(T[8]);
        transform3Array.push(T[9]);
        transform3Array.push(T[10]);
        transform3Array.push(T[11]);
        transform4Array.push(T[12]);
        transform4Array.push(T[13]);
        transform4Array.push(T[14]);
        transform4Array.push(1);
        instanceIdArray.push(i);
        instanceIdArray.push(i);
        instanceIdArray.push(i);
        instanceIdArray.push(i);
        colorsArray.push(114.0 / 255.0);
        colorsArray.push(69.0 / 255.0);
        colorsArray.push(12.0 / 255.0);
        colorsArray.push(1.0);
    }
    let colors = new Float32Array(colorsArray);
    let instanceIds = new Float32Array(instanceIdArray);
    let transform1 = new Float32Array(transform1Array);
    let transform2 = new Float32Array(transform2Array);
    let transform3 = new Float32Array(transform3Array);
    let transform4 = new Float32Array(transform4Array);
    plantCylinder.setInstanceVBOs(colors, instanceIds, transform1, transform2, transform3, transform4);
    plantCylinder.setNumInstances(plant.transformationMats.length);
    // Set up instanced rendering data arrays for plant's leaves
    let leafNum = plant.leafTransformationMats.length;
    let leafColorsArray = [];
    let leafInstanceIdArray = [];
    let leafTransform1Array = [];
    let leafTransform2Array = [];
    let leafTransform3Array = [];
    let leafTransform4Array = [];
    for (let i = 0; i < leafNum; i++) {
        let T = plant.leafTransformationMats[i];
        leafTransform1Array.push(T[0]);
        leafTransform1Array.push(T[1]);
        leafTransform1Array.push(T[2]);
        leafTransform1Array.push(T[3]);
        leafTransform2Array.push(T[4]);
        leafTransform2Array.push(T[5]);
        leafTransform2Array.push(T[6]);
        leafTransform2Array.push(T[7]);
        leafTransform3Array.push(T[8]);
        leafTransform3Array.push(T[9]);
        leafTransform3Array.push(T[10]);
        leafTransform3Array.push(T[11]);
        leafTransform4Array.push(T[12]);
        leafTransform4Array.push(T[13]);
        leafTransform4Array.push(T[14]);
        leafTransform4Array.push(1);
        leafInstanceIdArray.push(i);
        leafInstanceIdArray.push(i);
        leafInstanceIdArray.push(i);
        leafInstanceIdArray.push(i);
        leafColorsArray.push(32.0 / 255.0);
        leafColorsArray.push(132.0 / 255.0);
        leafColorsArray.push(77.0 / 255.0);
        leafColorsArray.push(1.0);
    }
    let leafColors = new Float32Array(leafColorsArray);
    let leafInstanceIds = new Float32Array(leafInstanceIdArray);
    let leafTransform1 = new Float32Array(leafTransform1Array);
    let leafTransform2 = new Float32Array(leafTransform2Array);
    let leafTransform3 = new Float32Array(leafTransform3Array);
    let leafTransform4 = new Float32Array(leafTransform4Array);
    leaf.setInstanceVBOs(leafColors, leafInstanceIds, leafTransform1, leafTransform2, leafTransform3, leafTransform4);
    leaf.setNumInstances(plant.leafTransformationMats.length);
    // Set up instanced rendering data arrays for apple
    let appleNum = plant.appleTransformationMats.length;
    let appleColorsArray = [];
    let appleInstanceIdArray = [];
    let appleTransform1Array = [];
    let appleTransform2Array = [];
    let appleTransform3Array = [];
    let appleTransform4Array = [];
    for (let i = 0; i < appleNum; i++) {
        let T = plant.appleTransformationMats[i];
        appleTransform1Array.push(T[0]);
        appleTransform1Array.push(T[1]);
        appleTransform1Array.push(T[2]);
        appleTransform1Array.push(T[3]);
        appleTransform2Array.push(T[4]);
        appleTransform2Array.push(T[5]);
        appleTransform2Array.push(T[6]);
        appleTransform2Array.push(T[7]);
        appleTransform3Array.push(T[8]);
        appleTransform3Array.push(T[9]);
        appleTransform3Array.push(T[10]);
        appleTransform3Array.push(T[11]);
        appleTransform4Array.push(T[12]);
        appleTransform4Array.push(T[13]);
        appleTransform4Array.push(T[14]);
        appleTransform4Array.push(1);
        appleInstanceIdArray.push(i);
        appleInstanceIdArray.push(i);
        appleInstanceIdArray.push(i);
        appleInstanceIdArray.push(i);
        appleColorsArray.push(185.0 / 255.0);
        appleColorsArray.push(25.0 / 255.0);
        appleColorsArray.push(7.0 / 255.0);
        appleColorsArray.push(1.0);
    }
    let appleColors = new Float32Array(appleColorsArray);
    let appleInstanceIds = new Float32Array(appleInstanceIdArray);
    let appleTransform1 = new Float32Array(appleTransform1Array);
    let appleTransform2 = new Float32Array(appleTransform2Array);
    let appleTransform3 = new Float32Array(appleTransform3Array);
    let appleTransform4 = new Float32Array(appleTransform4Array);
    apple.setInstanceVBOs(appleColors, appleInstanceIds, appleTransform1, appleTransform2, appleTransform3, appleTransform4);
    apple.setNumInstances(appleNum);
    // Set up instanced rendering data arrays for pot
    let potNum = 1;
    let potColorsArray = [];
    let potInstanceIdArray = [];
    let potTransform1Array = [];
    let potTransform2Array = [];
    let potTransform3Array = [];
    let potTransform4Array = [];
    for (let i = 0; i < potNum; i++) {
        let T = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].identity(T);
        potTransform1Array.push(T[0]);
        potTransform1Array.push(T[1]);
        potTransform1Array.push(T[2]);
        potTransform1Array.push(T[3]);
        potTransform2Array.push(T[4]);
        potTransform2Array.push(T[5]);
        potTransform2Array.push(T[6]);
        potTransform2Array.push(T[7]);
        potTransform3Array.push(T[8]);
        potTransform3Array.push(T[9]);
        potTransform3Array.push(T[10]);
        potTransform3Array.push(T[11]);
        potTransform4Array.push(T[12]);
        potTransform4Array.push(T[13]);
        potTransform4Array.push(T[14]);
        potTransform4Array.push(1);
        potInstanceIdArray.push(i);
        potInstanceIdArray.push(i);
        potInstanceIdArray.push(i);
        potInstanceIdArray.push(i);
        potColorsArray.push(161.0 / 255.0);
        potColorsArray.push(71.0 / 255.0);
        potColorsArray.push(39.0 / 255.0);
        potColorsArray.push(1.0);
    }
    let potColors = new Float32Array(potColorsArray);
    let potInstanceId = new Float32Array(potInstanceIdArray);
    let potTransform1 = new Float32Array(potTransform1Array);
    let potTransform2 = new Float32Array(potTransform2Array);
    let potTransform3 = new Float32Array(potTransform3Array);
    let potTransform4 = new Float32Array(potTransform4Array);
    pot.setInstanceVBOs(potColors, potInstanceId, potTransform1, potTransform2, potTransform3, potTransform4);
    pot.setNumInstances(potNum);
    // Set up instanced rendering data arrays for dirt
    let dirtNum = 1;
    let dirtColorsArray = [];
    let dirtInstanceIdArray = [];
    let dirtTransform1Array = [];
    let dirtTransform2Array = [];
    let dirtTransform3Array = [];
    let dirtTransform4Array = [];
    for (let i = 0; i < potNum; i++) {
        let T = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].identity(T);
        dirtTransform1Array.push(T[0]);
        dirtTransform1Array.push(T[1]);
        dirtTransform1Array.push(T[2]);
        dirtTransform1Array.push(T[3]);
        dirtTransform2Array.push(T[4]);
        dirtTransform2Array.push(T[5]);
        dirtTransform2Array.push(T[6]);
        dirtTransform2Array.push(T[7]);
        dirtTransform3Array.push(T[8]);
        dirtTransform3Array.push(T[9]);
        dirtTransform3Array.push(T[10]);
        dirtTransform3Array.push(T[11]);
        dirtTransform4Array.push(T[12]);
        dirtTransform4Array.push(T[13]);
        dirtTransform4Array.push(T[14]);
        dirtTransform4Array.push(1);
        dirtInstanceIdArray.push(i);
        dirtInstanceIdArray.push(i);
        dirtInstanceIdArray.push(i);
        dirtInstanceIdArray.push(i);
        dirtColorsArray.push(33.0 / 255.0);
        dirtColorsArray.push(13.0 / 255.0);
        dirtColorsArray.push(2.0 / 255.0);
        dirtColorsArray.push(1.0);
    }
    let dirtColors = new Float32Array(dirtColorsArray);
    let dirtInstanceIds = new Float32Array(dirtInstanceIdArray);
    let dirtTransform1 = new Float32Array(dirtTransform1Array);
    let dirtTransform2 = new Float32Array(dirtTransform2Array);
    let dirtTransform3 = new Float32Array(dirtTransform3Array);
    let dirtTransform4 = new Float32Array(dirtTransform4Array);
    dirt.setInstanceVBOs(dirtColors, dirtInstanceIds, dirtTransform1, dirtTransform2, dirtTransform3, dirtTransform4);
    dirt.setNumInstances(dirtNum);
    // Set up instanced rendering data arrays for ground
    let groundNum = 1;
    let groundColorsArray = [];
    let groundInstanceIdArray = [];
    let groundTransform1Array = [];
    let groundTransform2Array = [];
    let groundTransform3Array = [];
    let groundTransform4Array = [];
    for (let i = 0; i < potNum; i++) {
        let T = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].identity(T);
        groundTransform1Array.push(T[0]);
        groundTransform1Array.push(T[1]);
        groundTransform1Array.push(T[2]);
        groundTransform1Array.push(T[3]);
        groundTransform2Array.push(T[4]);
        groundTransform2Array.push(T[5]);
        groundTransform2Array.push(T[6]);
        groundTransform2Array.push(T[7]);
        groundTransform3Array.push(T[8]);
        groundTransform3Array.push(T[9]);
        groundTransform3Array.push(T[10]);
        groundTransform3Array.push(T[11]);
        groundTransform4Array.push(T[12]);
        groundTransform4Array.push(T[13]);
        groundTransform4Array.push(T[14]);
        groundTransform4Array.push(1);
        groundInstanceIdArray.push(i);
        groundInstanceIdArray.push(i);
        groundInstanceIdArray.push(i);
        groundInstanceIdArray.push(i);
        groundColorsArray.push(230.0 / 255.0);
        groundColorsArray.push(172.0 / 255.0);
        groundColorsArray.push(95.0 / 255.0);
        groundColorsArray.push(1.0);
    }
    let groundColors = new Float32Array(groundColorsArray);
    let groundInstanceIds = new Float32Array(groundInstanceIdArray);
    let groundTransform1 = new Float32Array(groundTransform1Array);
    let groundTransform2 = new Float32Array(groundTransform2Array);
    let groundTransform3 = new Float32Array(groundTransform3Array);
    let groundTransform4 = new Float32Array(groundTransform4Array);
    ground.setInstanceVBOs(groundColors, groundInstanceIds, groundTransform1, groundTransform2, groundTransform3, groundTransform4);
    ground.setNumInstances(groundNum);
}
function main() {
    // Initial display for framerate
    const stats = __WEBPACK_IMPORTED_MODULE_1_stats_js__();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    // Add controls to the gui
    const gui = new __WEBPACK_IMPORTED_MODULE_2_dat_gui__["GUI"]();
    gui.add(controls, 'iterations', 1, 6).step(1.0);
    gui.add(controls, 'branchThickness', 0.3, 0.8).step(0.02);
    gui.add(controls, 'seed', 1.0, 10.0).step(1.0);
    gui.add(controls, 'appleDensity', 0.0, 0.25).step(0.01);
    // get canvas and webgl context
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        alert('WebGL 2 not supported!');
    }
    // `setGL` is a function imported above which sets the value of `gl` in the `globals.ts` module.
    // Later, we can import `gl` from `globals.ts` to access it
    Object(__WEBPACK_IMPORTED_MODULE_7__globals__["c" /* setGL */])(gl);
    // Initial call to load scene
    loadScene(controls.seed, controls.branchThickness, controls.appleDensity);
    const camera = new __WEBPACK_IMPORTED_MODULE_6__Camera__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(0, 10, 30), __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(0, 5, 0));
    const renderer = new __WEBPACK_IMPORTED_MODULE_5__rendering_gl_OpenGLRenderer__["a" /* default */](canvas);
    renderer.setClearColor(0.1, 0.1, 0.1, 1);
    gl.enable(gl.DEPTH_TEST);
    const instancedShader = new __WEBPACK_IMPORTED_MODULE_8__rendering_gl_ShaderProgram__["b" /* default */]([
        new __WEBPACK_IMPORTED_MODULE_8__rendering_gl_ShaderProgram__["a" /* Shader */](gl.VERTEX_SHADER, __webpack_require__(256)),
        new __WEBPACK_IMPORTED_MODULE_8__rendering_gl_ShaderProgram__["a" /* Shader */](gl.FRAGMENT_SHADER, __webpack_require__(257)),
    ]);
    instancedShader.setTextures();
    const flat = new __WEBPACK_IMPORTED_MODULE_8__rendering_gl_ShaderProgram__["b" /* default */]([
        new __WEBPACK_IMPORTED_MODULE_8__rendering_gl_ShaderProgram__["a" /* Shader */](gl.VERTEX_SHADER, __webpack_require__(258)),
        new __WEBPACK_IMPORTED_MODULE_8__rendering_gl_ShaderProgram__["a" /* Shader */](gl.FRAGMENT_SHADER, __webpack_require__(259)),
    ]);
    // This function will be called every frame
    function tick() {
        camera.update();
        stats.begin();
        instancedShader.setTime(time);
        flat.setTime(time++);
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.clear();
        if (controls.iterations != prevIterations || controls.branchThickness != prevBranchThickness ||
            controls.seed != prevSeed || controls.appleDensity != prevAppleDensity) {
            loadScene(controls.seed, controls.branchThickness, controls.appleDensity);
            prevIterations = controls.iterations;
            prevBranchThickness = controls.branchThickness;
            prevSeed = controls.seed;
            prevAppleDensity = controls.appleDensity;
        }
        renderer.render(camera, flat, [screenQuad]);
        renderer.render(camera, instancedShader, [
            plantCylinder,
            leaf,
            // pot,
            ground,
            dirt,
            apple,
        ]);
        stats.end();
        // Tell the browser to call `tick` again whenever it renders a new frame
        requestAnimationFrame(tick);
    }
    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.setAspectRatio(window.innerWidth / window.innerHeight);
        camera.updateProjectionMatrix();
        flat.setDimensions(window.innerWidth, window.innerHeight);
    }, false);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.setAspectRatio(window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
    flat.setDimensions(window.innerWidth, window.innerHeight);
    // Start the render loop
    tick();
}
main();


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export create */
/* unused harmony export clone */
/* unused harmony export copy */
/* unused harmony export identity */
/* unused harmony export fromValues */
/* unused harmony export set */
/* unused harmony export transpose */
/* unused harmony export invert */
/* unused harmony export adjoint */
/* unused harmony export determinant */
/* unused harmony export multiply */
/* unused harmony export rotate */
/* unused harmony export scale */
/* unused harmony export fromRotation */
/* unused harmony export fromScaling */
/* unused harmony export str */
/* unused harmony export frob */
/* unused harmony export LDU */
/* unused harmony export add */
/* unused harmony export subtract */
/* unused harmony export exactEquals */
/* unused harmony export equals */
/* unused harmony export multiplyScalar */
/* unused harmony export multiplyScalarAndAdd */
/* unused harmony export mul */
/* unused harmony export sub */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(4);


/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
function create() {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](4);
  if (__WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
  }
  out[0] = 1;
  out[3] = 1;
  return out;
}

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
function clone(a) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
function fromValues(m00, m01, m10, m11) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
function set(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    var a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }

  return out;
}

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];

  // Calculate the determinant
  var det = a0 * a3 - a2 * a1;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] = a0 * det;

  return out;
}

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function adjoint(out, a) {
  // Caching this value is nessecary if out == a
  var a0 = a[0];
  out[0] = a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a0;

  return out;
}

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  return a[0] * a[3] - a[2] * a[1];
}

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2));
}

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix
 * @param {mat2} D the diagonal matrix
 * @param {mat2} U the upper triangular matrix
 * @param {mat2} a the input matrix to factorize
 */

function LDU(L, D, U, a) {
  L[2] = a[2] / a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link mat2.subtract}
 * @function
 */
var sub = subtract;

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export create */
/* unused harmony export clone */
/* unused harmony export copy */
/* unused harmony export identity */
/* unused harmony export fromValues */
/* unused harmony export set */
/* unused harmony export invert */
/* unused harmony export determinant */
/* unused harmony export multiply */
/* unused harmony export rotate */
/* unused harmony export scale */
/* unused harmony export translate */
/* unused harmony export fromRotation */
/* unused harmony export fromScaling */
/* unused harmony export fromTranslation */
/* unused harmony export str */
/* unused harmony export frob */
/* unused harmony export add */
/* unused harmony export subtract */
/* unused harmony export multiplyScalar */
/* unused harmony export multiplyScalarAndAdd */
/* unused harmony export exactEquals */
/* unused harmony export equals */
/* unused harmony export mul */
/* unused harmony export sub */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(4);


/**
 * 2x3 Matrix
 * @module mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
function create() {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](6);
  if (__WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[4] = 0;
    out[5] = 0;
  }
  out[0] = 1;
  out[3] = 1;
  return out;
}

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
function clone(a) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
function fromValues(a, b, c, d, tx, ty) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */
function set(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
function invert(out, a) {
  var aa = a[0],
      ab = a[1],
      ac = a[2],
      ad = a[3];
  var atx = a[4],
      aty = a[5];

  var det = aa * ad - ab * ac;
  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  return a[0] * a[3] - a[1] * a[2];
}

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
function translate(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')';
}

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1);
}

/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}

/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  return Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a5), Math.abs(b5));
}

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link mat2d.subtract}
 * @function
 */
var sub = subtract;

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export create */
/* unused harmony export clone */
/* unused harmony export fromValues */
/* unused harmony export fromRotationTranslationValues */
/* unused harmony export fromRotationTranslation */
/* unused harmony export fromTranslation */
/* unused harmony export fromRotation */
/* unused harmony export fromMat4 */
/* unused harmony export copy */
/* unused harmony export identity */
/* unused harmony export set */
/* unused harmony export getReal */
/* unused harmony export getDual */
/* unused harmony export setReal */
/* unused harmony export setDual */
/* unused harmony export getTranslation */
/* unused harmony export translate */
/* unused harmony export rotateX */
/* unused harmony export rotateY */
/* unused harmony export rotateZ */
/* unused harmony export rotateByQuatAppend */
/* unused harmony export rotateByQuatPrepend */
/* unused harmony export rotateAroundAxis */
/* unused harmony export add */
/* unused harmony export multiply */
/* unused harmony export mul */
/* unused harmony export scale */
/* unused harmony export dot */
/* unused harmony export lerp */
/* unused harmony export invert */
/* unused harmony export conjugate */
/* unused harmony export length */
/* unused harmony export len */
/* unused harmony export squaredLength */
/* unused harmony export sqrLen */
/* unused harmony export normalize */
/* unused harmony export str */
/* unused harmony export exactEquals */
/* unused harmony export equals */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quat_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mat4_js__ = __webpack_require__(31);




/**
 * Dual Quaternion<br>
 * Format: [real, dual]<br>
 * Quaternion format: XYZW<br>
 * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
 * @module quat2
 */

/**
 * Creates a new identity dual quat
 *
 * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
 */
function create() {
  var dq = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](8);
  if (__WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */] != Float32Array) {
    dq[0] = 0;
    dq[1] = 0;
    dq[2] = 0;
    dq[4] = 0;
    dq[5] = 0;
    dq[6] = 0;
    dq[7] = 0;
  }
  dq[3] = 1;
  return dq;
}

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat2} a dual quaternion to clone
 * @returns {quat2} new dual quaternion
 * @function
 */
function clone(a) {
  var dq = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](8);
  dq[0] = a[0];
  dq[1] = a[1];
  dq[2] = a[2];
  dq[3] = a[3];
  dq[4] = a[4];
  dq[5] = a[5];
  dq[6] = a[6];
  dq[7] = a[7];
  return dq;
}

/**
 * Creates a new dual quat initialized with the given values
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} new dual quaternion
 * @function
 */
function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
  var dq = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  dq[4] = x2;
  dq[5] = y2;
  dq[6] = z2;
  dq[7] = w2;
  return dq;
}

/**
 * Creates a new dual quat from the given values (quat and translation)
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component (translation)
 * @param {Number} y2 Y component (translation)
 * @param {Number} z2 Z component (translation)
 * @returns {quat2} new dual quaternion
 * @function
 */
function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
  var dq = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  var ax = x2 * 0.5,
      ay = y2 * 0.5,
      az = z2 * 0.5;
  dq[4] = ax * w1 + ay * z1 - az * y1;
  dq[5] = ay * w1 + az * x1 - ax * z1;
  dq[6] = az * w1 + ax * y1 - ay * x1;
  dq[7] = -ax * x1 - ay * y1 - az * z1;
  return dq;
}

/**
 * Creates a dual quat from a quaternion and a translation
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {quat} q quaternion
 * @param {vec3} t tranlation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */
function fromRotationTranslation(out, q, t) {
  var ax = t[0] * 0.5,
      ay = t[1] * 0.5,
      az = t[2] * 0.5,
      bx = q[0],
      by = q[1],
      bz = q[2],
      bw = q[3];
  out[0] = bx;
  out[1] = by;
  out[2] = bz;
  out[3] = bw;
  out[4] = ax * bw + ay * bz - az * by;
  out[5] = ay * bw + az * bx - ax * bz;
  out[6] = az * bw + ax * by - ay * bx;
  out[7] = -ax * bx - ay * by - az * bz;
  return out;
}

/**
 * Creates a dual quat from a translation
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {vec3} t translation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */
function fromTranslation(out, t) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = t[0] * 0.5;
  out[5] = t[1] * 0.5;
  out[6] = t[2] * 0.5;
  out[7] = 0;
  return out;
}

/**
 * Creates a dual quat from a quaternion
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {quat} q the quaternion
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */
function fromRotation(out, q) {
  out[0] = q[0];
  out[1] = q[1];
  out[2] = q[2];
  out[3] = q[3];
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}

/**
 * Creates a new dual quat from a matrix (4x4)
 *
 * @param {quat2} out the dual quaternion
 * @param {mat4} a the matrix
 * @returns {quat2} dual quat receiving operation result
 * @function
 */
function fromMat4(out, a) {
  //TODO Optimize this
  var outer = __WEBPACK_IMPORTED_MODULE_1__quat_js__["b" /* create */]();
  __WEBPACK_IMPORTED_MODULE_2__mat4_js__["getRotation"](outer, a);
  var t = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](3);
  __WEBPACK_IMPORTED_MODULE_2__mat4_js__["getTranslation"](t, a);
  fromRotationTranslation(out, outer, t);
  return out;
}

/**
 * Copy the values from one dual quat to another
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the source dual quaternion
 * @returns {quat2} out
 * @function
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  return out;
}

/**
 * Set a dual quat to the identity dual quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @returns {quat2} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}

/**
 * Set the components of a dual quat to the given values
 *
 * @param {quat2} out the receiving quaternion
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} out
 * @function
 */
function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
  out[0] = x1;
  out[1] = y1;
  out[2] = z1;
  out[3] = w1;

  out[4] = x2;
  out[5] = y2;
  out[6] = z2;
  out[7] = w2;
  return out;
}

/**
 * Gets the real part of a dual quat
 * @param  {quat} out real part
 * @param  {quat2} a Dual Quaternion
 * @return {quat} real part
 */
var getReal = __WEBPACK_IMPORTED_MODULE_1__quat_js__["a" /* copy */];

/**
 * Gets the dual part of a dual quat
 * @param  {quat} out dual part
 * @param  {quat2} a Dual Quaternion
 * @return {quat} dual part
 */
function getDual(out, a) {
  out[0] = a[4];
  out[1] = a[5];
  out[2] = a[6];
  out[3] = a[7];
  return out;
}

/**
 * Set the real component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat} q a quaternion representing the real part
 * @returns {quat2} out
 * @function
 */
var setReal = __WEBPACK_IMPORTED_MODULE_1__quat_js__["a" /* copy */];

/**
 * Set the dual component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat} q a quaternion representing the dual part
 * @returns {quat2} out
 * @function
 */
function setDual(out, q) {
  out[4] = q[0];
  out[5] = q[1];
  out[6] = q[2];
  out[7] = q[3];
  return out;
}

/**
 * Gets the translation of a normalized dual quat
 * @param  {vec3} out translation
 * @param  {quat2} a Dual Quaternion to be decomposed
 * @return {vec3} translation
 */
function getTranslation(out, a) {
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3];
  out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
  out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
  out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  return out;
}

/**
 * Translates a dual quat by the given vector
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to translate
 * @param {vec3} v vector to translate by
 * @returns {quat2} out
 */
function translate(out, a, v) {
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3],
      bx1 = v[0] * 0.5,
      by1 = v[1] * 0.5,
      bz1 = v[2] * 0.5,
      ax2 = a[4],
      ay2 = a[5],
      az2 = a[6],
      aw2 = a[7];
  out[0] = ax1;
  out[1] = ay1;
  out[2] = az1;
  out[3] = aw1;
  out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
  out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
  out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
  out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
  return out;
}

/**
 * Rotates a dual quat around the X axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */
function rotateX(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  __WEBPACK_IMPORTED_MODULE_1__quat_js__["e" /* rotateX */](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}

/**
 * Rotates a dual quat around the Y axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */
function rotateY(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  __WEBPACK_IMPORTED_MODULE_1__quat_js__["f" /* rotateY */](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}

/**
 * Rotates a dual quat around the Z axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */
function rotateZ(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  __WEBPACK_IMPORTED_MODULE_1__quat_js__["g" /* rotateZ */](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}

/**
 * Rotates a dual quat by a given quaternion (a * q)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {quat} q quaternion to rotate by
 * @returns {quat2} out
 */
function rotateByQuatAppend(out, a, q) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];

  out[0] = ax * qw + aw * qx + ay * qz - az * qy;
  out[1] = ay * qw + aw * qy + az * qx - ax * qz;
  out[2] = az * qw + aw * qz + ax * qy - ay * qx;
  out[3] = aw * qw - ax * qx - ay * qy - az * qz;
  ax = a[4];
  ay = a[5];
  az = a[6];
  aw = a[7];
  out[4] = ax * qw + aw * qx + ay * qz - az * qy;
  out[5] = ay * qw + aw * qy + az * qx - ax * qz;
  out[6] = az * qw + aw * qz + ax * qy - ay * qx;
  out[7] = aw * qw - ax * qx - ay * qy - az * qz;
  return out;
}

/**
 * Rotates a dual quat by a given quaternion (q * a)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat} q quaternion to rotate by
 * @param {quat2} a the dual quaternion to rotate
 * @returns {quat2} out
 */
function rotateByQuatPrepend(out, q, a) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      bx = a[0],
      by = a[1],
      bz = a[2],
      bw = a[3];

  out[0] = qx * bw + qw * bx + qy * bz - qz * by;
  out[1] = qy * bw + qw * by + qz * bx - qx * bz;
  out[2] = qz * bw + qw * bz + qx * by - qy * bx;
  out[3] = qw * bw - qx * bx - qy * by - qz * bz;
  bx = a[4];
  by = a[5];
  bz = a[6];
  bw = a[7];
  out[4] = qx * bw + qw * bx + qy * bz - qz * by;
  out[5] = qy * bw + qw * by + qz * bx - qx * bz;
  out[6] = qz * bw + qw * bz + qx * by - qy * bx;
  out[7] = qw * bw - qx * bx - qy * by - qz * bz;
  return out;
}

/**
 * Rotates a dual quat around a given axis. Does the normalisation automatically
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {vec3} axis the axis to rotate around
 * @param {Number} rad how far the rotation should be
 * @returns {quat2} out
 */
function rotateAroundAxis(out, a, axis, rad) {
  //Special case for rad = 0
  if (Math.abs(rad) < __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */]) {
    return copy(out, a);
  }
  var axisLength = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);

  rad = rad * 0.5;
  var s = Math.sin(rad);
  var bx = s * axis[0] / axisLength;
  var by = s * axis[1] / axisLength;
  var bz = s * axis[2] / axisLength;
  var bw = Math.cos(rad);

  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3];
  out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;

  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  out[4] = ax * bw + aw * bx + ay * bz - az * by;
  out[5] = ay * bw + aw * by + az * bx - ax * bz;
  out[6] = az * bw + aw * bz + ax * by - ay * bx;
  out[7] = aw * bw - ax * bx - ay * by - az * bz;

  return out;
}

/**
 * Adds two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {quat2} out
 * @function
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  return out;
}

/**
 * Multiplies two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {quat2} out
 */
function multiply(out, a, b) {
  var ax0 = a[0],
      ay0 = a[1],
      az0 = a[2],
      aw0 = a[3],
      bx1 = b[4],
      by1 = b[5],
      bz1 = b[6],
      bw1 = b[7],
      ax1 = a[4],
      ay1 = a[5],
      az1 = a[6],
      aw1 = a[7],
      bx0 = b[0],
      by0 = b[1],
      bz0 = b[2],
      bw0 = b[3];
  out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
  out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
  out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
  out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
  out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
  out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
  out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
  out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
  return out;
}

/**
 * Alias for {@link quat2.multiply}
 * @function
 */
var mul = multiply;

/**
 * Scales a dual quat by a scalar number
 *
 * @param {quat2} out the receiving dual quat
 * @param {quat2} a the dual quat to scale
 * @param {Number} b amount to scale the dual quat by
 * @returns {quat2} out
 * @function
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  return out;
}

/**
 * Calculates the dot product of two dual quat's (The dot product of the real parts)
 *
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
var dot = __WEBPACK_IMPORTED_MODULE_1__quat_js__["c" /* dot */];

/**
 * Performs a linear interpolation between two dual quats's
 * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
 *
 * @param {quat2} out the receiving dual quat
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat2} out
 */
function lerp(out, a, b, t) {
  var mt = 1 - t;
  if (dot(a, b) < 0) t = -t;

  out[0] = a[0] * mt + b[0] * t;
  out[1] = a[1] * mt + b[1] * t;
  out[2] = a[2] * mt + b[2] * t;
  out[3] = a[3] * mt + b[3] * t;
  out[4] = a[4] * mt + b[4] * t;
  out[5] = a[5] * mt + b[5] * t;
  out[6] = a[6] * mt + b[6] * t;
  out[7] = a[7] * mt + b[7] * t;

  return out;
}

/**
 * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a dual quat to calculate inverse of
 * @returns {quat2} out
 */
function invert(out, a) {
  var sqlen = squaredLength(a);
  out[0] = -a[0] / sqlen;
  out[1] = -a[1] / sqlen;
  out[2] = -a[2] / sqlen;
  out[3] = a[3] / sqlen;
  out[4] = -a[4] / sqlen;
  out[5] = -a[5] / sqlen;
  out[6] = -a[6] / sqlen;
  out[7] = a[7] / sqlen;
  return out;
}

/**
 * Calculates the conjugate of a dual quat
 * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat2} a quat to calculate conjugate of
 * @returns {quat2} out
 */
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  out[4] = -a[4];
  out[5] = -a[5];
  out[6] = -a[6];
  out[7] = a[7];
  return out;
}

/**
 * Calculates the length of a dual quat
 *
 * @param {quat2} a dual quat to calculate length of
 * @returns {Number} length of a
 * @function
 */
var length = __WEBPACK_IMPORTED_MODULE_1__quat_js__["d" /* length */];

/**
 * Alias for {@link quat2.length}
 * @function
 */
var len = length;

/**
 * Calculates the squared length of a dual quat
 *
 * @param {quat2} a dual quat to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
var squaredLength = __WEBPACK_IMPORTED_MODULE_1__quat_js__["h" /* squaredLength */];

/**
 * Alias for {@link quat2.squaredLength}
 * @function
 */
var sqrLen = squaredLength;

/**
 * Normalize a dual quat
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a dual quaternion to normalize
 * @returns {quat2} out
 * @function
 */
function normalize(out, a) {
  var magnitude = squaredLength(a);
  if (magnitude > 0) {
    magnitude = Math.sqrt(magnitude);

    var a0 = a[0] / magnitude;
    var a1 = a[1] / magnitude;
    var a2 = a[2] / magnitude;
    var a3 = a[3] / magnitude;

    var b0 = a[4];
    var b1 = a[5];
    var b2 = a[6];
    var b3 = a[7];

    var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;

    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;

    out[4] = (b0 - a0 * a_dot_b) / magnitude;
    out[5] = (b1 - a1 * a_dot_b) / magnitude;
    out[6] = (b2 - a2 * a_dot_b) / magnitude;
    out[7] = (b3 - a3 * a_dot_b) / magnitude;
  }
  return out;
}

/**
 * Returns a string representation of a dual quatenion
 *
 * @param {quat2} a dual quaternion to represent as a string
 * @returns {String} string representation of the dual quat
 */
function str(a) {
  return 'quat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ')';
}

/**
 * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat2} a the first dual quaternion.
 * @param {quat2} b the second dual quaternion.
 * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
}

/**
 * Returns whether or not the dual quaternions have approximately the same elements in the same position.
 *
 * @param {quat2} a the first dual quat.
 * @param {quat2} b the second dual quat.
 * @returns {Boolean} true if the dual quats are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  return Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a7), Math.abs(b7));
}

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export create */
/* unused harmony export clone */
/* unused harmony export fromValues */
/* unused harmony export copy */
/* unused harmony export set */
/* unused harmony export add */
/* unused harmony export subtract */
/* unused harmony export multiply */
/* unused harmony export divide */
/* unused harmony export ceil */
/* unused harmony export floor */
/* unused harmony export min */
/* unused harmony export max */
/* unused harmony export round */
/* unused harmony export scale */
/* unused harmony export scaleAndAdd */
/* unused harmony export distance */
/* unused harmony export squaredDistance */
/* unused harmony export length */
/* unused harmony export squaredLength */
/* unused harmony export negate */
/* unused harmony export inverse */
/* unused harmony export normalize */
/* unused harmony export dot */
/* unused harmony export cross */
/* unused harmony export lerp */
/* unused harmony export random */
/* unused harmony export transformMat2 */
/* unused harmony export transformMat2d */
/* unused harmony export transformMat3 */
/* unused harmony export transformMat4 */
/* unused harmony export rotate */
/* unused harmony export angle */
/* unused harmony export str */
/* unused harmony export exactEquals */
/* unused harmony export equals */
/* unused harmony export len */
/* unused harmony export sub */
/* unused harmony export mul */
/* unused harmony export div */
/* unused harmony export dist */
/* unused harmony export sqrDist */
/* unused harmony export sqrLen */
/* unused harmony export forEach */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(4);


/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](2);
  if (__WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
function clone(a) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
function fromValues(x, y) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common_js__["a" /* ARRAY_TYPE */](2);
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */
function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
function random(out, scale) {
  scale = scale || 1.0;
  var r = __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* RANDOM */]() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}

/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {vec2} a The vec2 point to rotate
 * @param {vec2} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec2} out
 */
function rotate(out, a, b, c) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(c),
      cosC = Math.cos(c);

  //perform rotation and translate to correct position
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];

  return out;
}

/**
 * Get the angle between two 2D vectors
 * @param {vec2} a The first operand
 * @param {vec2} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1];

  var len1 = x1 * x1 + y1 * y1;
  if (len1 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len1 = 1 / Math.sqrt(len1);
  }

  var len2 = x2 * x2 + y2 * y2;
  if (len2 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len2 = 1 / Math.sqrt(len2);
  }

  var cosine = (x1 * x2 + y1 * y2) * len1 * len2;

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec2(' + a[0] + ', ' + a[1] + ')';
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common_js__["b" /* EPSILON */] * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}

/**
 * Alias for {@link vec2.length}
 * @function
 */
var len = length;

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
var sub = subtract;

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
var mul = multiply;

/**
 * Alias for {@link vec2.divide}
 * @function
 */
var div = divide;

/**
 * Alias for {@link vec2.distance}
 * @function
 */
var dist = distance;

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
var sqrDist = squaredDistance;

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
var sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];
    }

    return a;
  };
}();

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Stats=t()}(this,function(){"use strict";var c=function(){var n=0,l=document.createElement("div");function e(e){return l.appendChild(e.dom),e}function t(e){for(var t=0;t<l.children.length;t++)l.children[t].style.display=t===e?"block":"none";n=e}l.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",l.addEventListener("click",function(e){e.preventDefault(),t(++n%l.children.length)},!1);var i=(performance||Date).now(),a=i,o=0,f=e(new c.Panel("FPS","#0ff","#002")),r=e(new c.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=e(new c.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:l,addPanel:e,showPanel:t,begin:function(){i=(performance||Date).now()},end:function(){o++;var e=(performance||Date).now();if(r.update(e-i,200),a+1e3<=e&&(f.update(1e3*o/(e-a),100),a=e,o=0,d)){var t=performance.memory;d.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){i=this.end()},domElement:l,setMode:t}};return c.Panel=function(n,l,i){var a=1/0,o=0,f=Math.round,r=f(window.devicePixelRatio||1),d=80*r,e=48*r,c=3*r,p=2*r,u=3*r,s=15*r,m=74*r,h=30*r,y=document.createElement("canvas");y.width=d,y.height=e,y.style.cssText="width:80px;height:48px";var v=y.getContext("2d");return v.font="bold "+9*r+"px Helvetica,Arial,sans-serif",v.textBaseline="top",v.fillStyle=i,v.fillRect(0,0,d,e),v.fillStyle=l,v.fillText(n,c,p),v.fillRect(u,s,m,h),v.fillStyle=i,v.globalAlpha=.9,v.fillRect(u,s,m,h),{dom:y,update:function(e,t){a=Math.min(a,e),o=Math.max(o,e),v.fillStyle=i,v.globalAlpha=1,v.fillRect(0,0,d,s),v.fillStyle=l,v.fillText(f(e)+" "+n+" ("+f(a)+"-"+f(o)+")",c,p),v.drawImage(y,u+r,s,m-r,h,u,s,m-r,h),v.fillRect(u+m-r,s,r,h),v.fillStyle=i,v.globalAlpha=.9,v.fillRect(u+m-r,s,r,f((1-e/t)*h))}}},c});


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(78)
module.exports.color = __webpack_require__(79)

/***/ }),
/* 78 */
/***/ (function(module, exports) {

/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.gui = dat.gui || {};

/** @namespace */
dat.utils = dat.utils || {};

/** @namespace */
dat.controllers = dat.controllers || {};

/** @namespace */
dat.dom = dat.dom || {};

/** @namespace */
dat.color = dat.color || {};

dat.utils.css = (function () {
  return {
    load: function (url, doc) {
      doc = doc || document;
      var link = doc.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      doc.getElementsByTagName('head')[0].appendChild(link);
    },
    inject: function(css, doc) {
      doc = doc || document;
      var injected = document.createElement('style');
      injected.type = 'text/css';
      injected.innerHTML = css;
      doc.getElementsByTagName('head')[0].appendChild(injected);
    }
  }
})();


dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.controllers.Controller = (function (common) {

  /**
   * @class An "abstract" class that represents a given property of an object.
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var Controller = function(object, property) {

    this.initialValue = object[property];

    /**
     * Those who extend this class will put their DOM elements in here.
     * @type {DOMElement}
     */
    this.domElement = document.createElement('div');

    /**
     * The object to manipulate
     * @type {Object}
     */
    this.object = object;

    /**
     * The name of the property to manipulate
     * @type {String}
     */
    this.property = property;

    /**
     * The function to be called on change.
     * @type {Function}
     * @ignore
     */
    this.__onChange = undefined;

    /**
     * The function to be called on finishing change.
     * @type {Function}
     * @ignore
     */
    this.__onFinishChange = undefined;

  };

  common.extend(

      Controller.prototype,

      /** @lends dat.controllers.Controller.prototype */
      {

        /**
         * Specify that a function fire every time someone changes the value with
         * this Controller.
         *
         * @param {Function} fnc This function will be called whenever the value
         * is modified via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onChange: function(fnc) {
          this.__onChange = fnc;
          return this;
        },

        /**
         * Specify that a function fire every time someone "finishes" changing
         * the value wih this Controller. Useful for values that change
         * incrementally like numbers or strings.
         *
         * @param {Function} fnc This function will be called whenever
         * someone "finishes" changing the value via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onFinishChange: function(fnc) {
          this.__onFinishChange = fnc;
          return this;
        },

        /**
         * Change the value of <code>object[property]</code>
         *
         * @param {Object} newValue The new value of <code>object[property]</code>
         */
        setValue: function(newValue) {
          this.object[this.property] = newValue;
          if (this.__onChange) {
            this.__onChange.call(this, newValue);
          }
          this.updateDisplay();
          return this;
        },

        /**
         * Gets the value of <code>object[property]</code>
         *
         * @returns {Object} The current value of <code>object[property]</code>
         */
        getValue: function() {
          return this.object[this.property];
        },

        /**
         * Refreshes the visual display of a Controller in order to keep sync
         * with the object's current value.
         * @returns {dat.controllers.Controller} this
         */
        updateDisplay: function() {
          return this;
        },

        /**
         * @returns {Boolean} true if the value has deviated from initialValue
         */
        isModified: function() {
          return this.initialValue !== this.getValue()
        }

      }

  );

  return Controller;


})(dat.utils.common);


dat.dom.dom = (function (common) {

  var EVENT_MAP = {
    'HTMLEvents': ['change'],
    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
    'KeyboardEvents': ['keydown']
  };

  var EVENT_MAP_INV = {};
  common.each(EVENT_MAP, function(v, k) {
    common.each(v, function(e) {
      EVENT_MAP_INV[e] = k;
    });
  });

  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

  function cssValueToPixels(val) {

    if (val === '0' || common.isUndefined(val)) return 0;

    var match = val.match(CSS_VALUE_PIXELS);

    if (!common.isNull(match)) {
      return parseFloat(match[1]);
    }

    // TODO ...ems? %?

    return 0;

  }

  /**
   * @namespace
   * @member dat.dom
   */
  var dom = {

    /**
     * 
     * @param elem
     * @param selectable
     */
    makeSelectable: function(elem, selectable) {

      if (elem === undefined || elem.style === undefined) return;

      elem.onselectstart = selectable ? function() {
        return false;
      } : function() {
      };

      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
      elem.unselectable = selectable ? 'on' : 'off';

    },

    /**
     *
     * @param elem
     * @param horizontal
     * @param vertical
     */
    makeFullscreen: function(elem, horizontal, vertical) {

      if (common.isUndefined(horizontal)) horizontal = true;
      if (common.isUndefined(vertical)) vertical = true;

      elem.style.position = 'absolute';

      if (horizontal) {
        elem.style.left = 0;
        elem.style.right = 0;
      }
      if (vertical) {
        elem.style.top = 0;
        elem.style.bottom = 0;
      }

    },

    /**
     *
     * @param elem
     * @param eventType
     * @param params
     */
    fakeEvent: function(elem, eventType, params, aux) {
      params = params || {};
      var className = EVENT_MAP_INV[eventType];
      if (!className) {
        throw new Error('Event type ' + eventType + ' not supported.');
      }
      var evt = document.createEvent(className);
      switch (className) {
        case 'MouseEvents':
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false,
              params.cancelable || true, window, params.clickCount || 1,
              0, //screen X
              0, //screen Y
              clientX, //client X
              clientY, //client Y
              false, false, false, false, 0, null);
          break;
        case 'KeyboardEvents':
          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
          common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false,
              params.cancelable, window,
              params.ctrlKey, params.altKey,
              params.shiftKey, params.metaKey,
              params.keyCode, params.charCode);
          break;
        default:
          evt.initEvent(eventType, params.bubbles || false,
              params.cancelable || true);
          break;
      }
      common.defaults(evt, aux);
      elem.dispatchEvent(evt);
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    bind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.addEventListener)
        elem.addEventListener(event, func, bool);
      else if (elem.attachEvent)
        elem.attachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    unbind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.removeEventListener)
        elem.removeEventListener(event, func, bool);
      else if (elem.detachEvent)
        elem.detachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    addClass: function(elem, className) {
      if (elem.className === undefined) {
        elem.className = className;
      } else if (elem.className !== className) {
        var classes = elem.className.split(/ +/);
        if (classes.indexOf(className) == -1) {
          classes.push(className);
          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
        }
      }
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    removeClass: function(elem, className) {
      if (className) {
        if (elem.className === undefined) {
          // elem.className = className;
        } else if (elem.className === className) {
          elem.removeAttribute('class');
        } else {
          var classes = elem.className.split(/ +/);
          var index = classes.indexOf(className);
          if (index != -1) {
            classes.splice(index, 1);
            elem.className = classes.join(' ');
          }
        }
      } else {
        elem.className = undefined;
      }
      return dom;
    },

    hasClass: function(elem, className) {
      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
    },

    /**
     *
     * @param elem
     */
    getWidth: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-left-width']) +
          cssValueToPixels(style['border-right-width']) +
          cssValueToPixels(style['padding-left']) +
          cssValueToPixels(style['padding-right']) +
          cssValueToPixels(style['width']);
    },

    /**
     *
     * @param elem
     */
    getHeight: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-top-width']) +
          cssValueToPixels(style['border-bottom-width']) +
          cssValueToPixels(style['padding-top']) +
          cssValueToPixels(style['padding-bottom']) +
          cssValueToPixels(style['height']);
    },

    /**
     *
     * @param elem
     */
    getOffset: function(elem) {
      var offset = {left: 0, top:0};
      if (elem.offsetParent) {
        do {
          offset.left += elem.offsetLeft;
          offset.top += elem.offsetTop;
        } while (elem = elem.offsetParent);
      }
      return offset;
    },

    // http://stackoverflow.com/posts/2684561/revisions
    /**
     * 
     * @param elem
     */
    isActive: function(elem) {
      return elem === document.activeElement && ( elem.type || elem.href );
    }

  };

  return dom;

})(dat.utils.common);


dat.controllers.OptionController = (function (Controller, dom, common) {

  /**
   * @class Provides a select input to alter the property of an object, using a
   * list of accepted values.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object|string[]} options A map of labels to acceptable values, or
   * a list of acceptable string values.
   *
   * @member dat.controllers
   */
  var OptionController = function(object, property, options) {

    OptionController.superclass.call(this, object, property);

    var _this = this;

    /**
     * The drop down menu
     * @ignore
     */
    this.__select = document.createElement('select');

    if (common.isArray(options)) {
      var map = {};
      common.each(options, function(element) {
        map[element] = element;
      });
      options = map;
    }

    common.each(options, function(value, key) {

      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);

    });

    // Acknowledge original value
    this.updateDisplay();

    dom.bind(this.__select, 'change', function() {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });

    this.domElement.appendChild(this.__select);

  };

  OptionController.superclass = Controller;

  common.extend(

      OptionController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          return toReturn;
        },

        updateDisplay: function() {
          this.__select.value = this.getValue();
          return OptionController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return OptionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberController = (function (Controller, common) {

  /**
   * @class Represents a given property of an object that is a number.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberController = function(object, property, params) {

    NumberController.superclass.call(this, object, property);

    params = params || {};

    this.__min = params.min;
    this.__max = params.max;
    this.__step = params.step;

    if (common.isUndefined(this.__step)) {

      if (this.initialValue == 0) {
        this.__impliedStep = 1; // What are we, psychics?
      } else {
        // Hey Doug, check this out.
        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
      }

    } else {

      this.__impliedStep = this.__step;

    }

    this.__precision = numDecimals(this.__impliedStep);


  };

  NumberController.superclass = Controller;

  common.extend(

      NumberController.prototype,
      Controller.prototype,

      /** @lends dat.controllers.NumberController.prototype */
      {

        setValue: function(v) {

          if (this.__min !== undefined && v < this.__min) {
            v = this.__min;
          } else if (this.__max !== undefined && v > this.__max) {
            v = this.__max;
          }

          if (this.__step !== undefined && v % this.__step != 0) {
            v = Math.round(v / this.__step) * this.__step;
          }

          return NumberController.superclass.prototype.setValue.call(this, v);

        },

        /**
         * Specify a minimum value for <code>object[property]</code>.
         *
         * @param {Number} minValue The minimum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        min: function(v) {
          this.__min = v;
          return this;
        },

        /**
         * Specify a maximum value for <code>object[property]</code>.
         *
         * @param {Number} maxValue The maximum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        max: function(v) {
          this.__max = v;
          return this;
        },

        /**
         * Specify a step value that dat.controllers.NumberController
         * increments by.
         *
         * @param {Number} stepValue The step value for
         * dat.controllers.NumberController
         * @default if minimum and maximum specified increment is 1% of the
         * difference otherwise stepValue is 1
         * @returns {dat.controllers.NumberController} this
         */
        step: function(v) {
          this.__step = v;
          return this;
        }

      }

  );

  function numDecimals(x) {
    x = x.toString();
    if (x.indexOf('.') > -1) {
      return x.length - x.indexOf('.') - 1;
    } else {
      return 0;
    }
  }

  return NumberController;

})(dat.controllers.Controller,
dat.utils.common);


dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {

  /**
   * @class Represents a given property of an object that is a number and
   * provides an input element with which to manipulate it.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerBox = function(object, property, params) {

    this.__truncationSuspended = false;

    NumberControllerBox.superclass.call(this, object, property, params);

    var _this = this;

    /**
     * {Number} Previous mouse y position
     * @ignore
     */
    var prev_y;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    // Makes it so manually specified values are not truncated.

    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'mousedown', onMouseDown);
    dom.bind(this.__input, 'keydown', function(e) {

      // When pressing entire, you can be as precise as you want.
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
      }

    });

    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!common.isNaN(attempted)) _this.setValue(attempted);
    }

    function onBlur() {
      onChange();
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prev_y = e.clientY;
    }

    function onMouseDrag(e) {

      var diff = prev_y - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prev_y = e.clientY;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  NumberControllerBox.superclass = NumberController;

  common.extend(

      NumberControllerBox.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {

          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  function roundToDecimal(value, decimals) {
    var tenTo = Math.pow(10, decimals);
    return Math.round(value * tenTo) / tenTo;
  }

  return NumberControllerBox;

})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {

  /**
   * @class Represents a given property of an object that is a number, contains
   * a minimum and maximum, and provides a slider element with which to
   * manipulate it. It should be noted that the slider element is made up of
   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
   * <code>&lt;slider&gt;</code> element.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   * 
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Number} minValue Minimum allowed value
   * @param {Number} maxValue Maximum allowed value
   * @param {Number} stepValue Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerSlider = function(object, property, min, max, step) {

    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });

    var _this = this;

    this.__background = document.createElement('div');
    this.__foreground = document.createElement('div');
    


    dom.bind(this.__background, 'mousedown', onMouseDown);
    
    dom.addClass(this.__background, 'slider');
    dom.addClass(this.__foreground, 'slider-fg');

    function onMouseDown(e) {

      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);

      onMouseDrag(e);
    }

    function onMouseDrag(e) {

      e.preventDefault();

      var offset = dom.getOffset(_this.__background);
      var width = dom.getWidth(_this.__background);
      
      _this.setValue(
        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
      );

      return false;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.__background.appendChild(this.__foreground);
    this.domElement.appendChild(this.__background);

  };

  NumberControllerSlider.superclass = NumberController;

  /**
   * Injects default stylesheet for slider elements.
   */
  NumberControllerSlider.useDefaultStyles = function() {
    css.inject(styleSheet);
  };

  common.extend(

      NumberControllerSlider.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {
          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
          this.__foreground.style.width = pct*100+'%';
          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
        }

      }



  );

  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }

  return NumberControllerSlider;
  
})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.css,
dat.utils.common,
".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");


dat.controllers.FunctionController = (function (Controller, dom, common) {

  /**
   * @class Provides a GUI interface to fire a specified method, a property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var FunctionController = function(object, property, text) {

    FunctionController.superclass.call(this, object, property);

    var _this = this;

    this.__button = document.createElement('div');
    this.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(this.__button, 'click', function(e) {
      e.preventDefault();
      _this.fire();
      return false;
    });

    dom.addClass(this.__button, 'button');

    this.domElement.appendChild(this.__button);


  };

  FunctionController.superclass = Controller;

  common.extend(

      FunctionController.prototype,
      Controller.prototype,
      {
        
        fire: function() {
          if (this.__onChange) {
            this.__onChange.call(this);
          }
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.getValue().call(this.object);
        }
      }

  );

  return FunctionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.BooleanController = (function (Controller, dom, common) {

  /**
   * @class Provides a checkbox input to alter the boolean property of an object.
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var BooleanController = function(object, property) {

    BooleanController.superclass.call(this, object, property);

    var _this = this;
    this.__prev = this.getValue();

    this.__checkbox = document.createElement('input');
    this.__checkbox.setAttribute('type', 'checkbox');


    dom.bind(this.__checkbox, 'change', onChange, false);

    this.domElement.appendChild(this.__checkbox);

    // Match original value
    this.updateDisplay();

    function onChange() {
      _this.setValue(!_this.__prev);
    }

  };

  BooleanController.superclass = Controller;

  common.extend(

      BooleanController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.__prev = this.getValue();
          return toReturn;
        },

        updateDisplay: function() {
          
          if (this.getValue() === true) {
            this.__checkbox.setAttribute('checked', 'checked');
            this.__checkbox.checked = true;    
          } else {
              this.__checkbox.checked = false;
          }

          return BooleanController.superclass.prototype.updateDisplay.call(this);

        }


      }

  );

  return BooleanController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common);


dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {

  css.inject(styleSheet);

  /** Outer-most className for GUI's */
  var CSS_NAMESPACE = 'dg';

  var HIDE_KEY_CODE = 72;

  /** The only value shared between the JS and SCSS. Use caution. */
  var CLOSE_BUTTON_HEIGHT = 20;

  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

  var SUPPORTS_LOCAL_STORAGE = (function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  })();

  var SAVE_DIALOGUE;

  /** Have we yet to create an autoPlace GUI? */
  var auto_place_virgin = true;

  /** Fixed position div that auto place GUI's go inside */
  var auto_place_container;

  /** Are we hiding the GUI's ? */
  var hide = false;

  /** GUI's which should be hidden */
  var hideable_guis = [];

  /**
   * A lightweight controller library for JavaScript. It allows you to easily
   * manipulate variables and fire functions on the fly.
   * @class
   *
   * @member dat.gui
   *
   * @param {Object} [params]
   * @param {String} [params.name] The name of this GUI.
   * @param {Object} [params.load] JSON object representing the saved state of
   * this GUI.
   * @param {Boolean} [params.auto=true]
   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
   * @param {Boolean} [params.closed] If true, starts closed
   */
  var GUI = function(params) {

    var _this = this;

    /**
     * Outermost DOM Element
     * @type DOMElement
     */
    this.domElement = document.createElement('div');
    this.__ul = document.createElement('ul');
    this.domElement.appendChild(this.__ul);

    dom.addClass(this.domElement, CSS_NAMESPACE);

    /**
     * Nested GUI's by name
     * @ignore
     */
    this.__folders = {};

    this.__controllers = [];

    /**
     * List of objects I'm remembering for save, only used in top level GUI
     * @ignore
     */
    this.__rememberedObjects = [];

    /**
     * Maps the index of remembered objects to a map of controllers, only used
     * in top level GUI.
     *
     * @private
     * @ignore
     *
     * @example
     * [
     *  {
     *    propertyName: Controller,
     *    anotherPropertyName: Controller
     *  },
     *  {
     *    propertyName: Controller
     *  }
     * ]
     */
    this.__rememberedObjectIndecesToControllers = [];

    this.__listening = [];

    params = params || {};

    // Default parameters
    params = common.defaults(params, {
      autoPlace: true,
      width: GUI.DEFAULT_WIDTH
    });

    params = common.defaults(params, {
      resizable: params.autoPlace,
      hideable: params.autoPlace
    });


    if (!common.isUndefined(params.load)) {

      // Explicit preset
      if (params.preset) params.load.preset = params.preset;

    } else {

      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };

    }

    if (common.isUndefined(params.parent) && params.hideable) {
      hideable_guis.push(this);
    }

    // Only root level GUI's are resizable.
    params.resizable = common.isUndefined(params.parent) && params.resizable;


    if (params.autoPlace && common.isUndefined(params.scrollable)) {
      params.scrollable = true;
    }
//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

    // Not part of params because I don't want people passing this in via
    // constructor. Should be a 'remembered' value.
    var use_local_storage =
        SUPPORTS_LOCAL_STORAGE &&
            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

    Object.defineProperties(this,

        /** @lends dat.gui.GUI.prototype */
        {

          /**
           * The parent <code>GUI</code>
           * @type dat.gui.GUI
           */
          parent: {
            get: function() {
              return params.parent;
            }
          },

          scrollable: {
            get: function() {
              return params.scrollable;
            }
          },

          /**
           * Handles <code>GUI</code>'s element placement for you
           * @type Boolean
           */
          autoPlace: {
            get: function() {
              return params.autoPlace;
            }
          },

          /**
           * The identifier for a set of saved values
           * @type String
           */
          preset: {

            get: function() {
              if (_this.parent) {
                return _this.getRoot().preset;
              } else {
                return params.load.preset;
              }
            },

            set: function(v) {
              if (_this.parent) {
                _this.getRoot().preset = v;
              } else {
                params.load.preset = v;
              }
              setPresetSelectIndex(this);
              _this.revert();
            }

          },

          /**
           * The width of <code>GUI</code> element
           * @type Number
           */
          width: {
            get: function() {
              return params.width;
            },
            set: function(v) {
              params.width = v;
              setWidth(_this, v);
            }
          },

          /**
           * The name of <code>GUI</code>. Used for folders. i.e
           * a folder's name
           * @type String
           */
          name: {
            get: function() {
              return params.name;
            },
            set: function(v) {
              // TODO Check for collisions among sibling folders
              params.name = v;
              if (title_row_name) {
                title_row_name.innerHTML = params.name;
              }
            }
          },

          /**
           * Whether the <code>GUI</code> is collapsed or not
           * @type Boolean
           */
          closed: {
            get: function() {
              return params.closed;
            },
            set: function(v) {
              params.closed = v;
              if (params.closed) {
                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
              } else {
                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
              }
              // For browsers that aren't going to respect the CSS transition,
              // Lets just check our height against the window height right off
              // the bat.
              this.onResize();

              if (_this.__closeButton) {
                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
              }
            }
          },

          /**
           * Contains all presets
           * @type Object
           */
          load: {
            get: function() {
              return params.load;
            }
          },

          /**
           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
           * <code>remember</code>ing
           * @type Boolean
           */
          useLocalStorage: {

            get: function() {
              return use_local_storage;
            },
            set: function(bool) {
              if (SUPPORTS_LOCAL_STORAGE) {
                use_local_storage = bool;
                if (bool) {
                  dom.bind(window, 'unload', saveToLocalStorage);
                } else {
                  dom.unbind(window, 'unload', saveToLocalStorage);
                }
                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
              }
            }

          }

        });

    // Are we a root level GUI?
    if (common.isUndefined(params.parent)) {

      params.closed = false;

      dom.addClass(this.domElement, GUI.CLASS_MAIN);
      dom.makeSelectable(this.domElement, false);

      // Are we supposed to be loading locally?
      if (SUPPORTS_LOCAL_STORAGE) {

        if (use_local_storage) {

          _this.useLocalStorage = true;

          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

          if (saved_gui) {
            params.load = JSON.parse(saved_gui);
          }

        }

      }

      this.__closeButton = document.createElement('div');
      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
      this.domElement.appendChild(this.__closeButton);

      dom.bind(this.__closeButton, 'click', function() {

        _this.closed = !_this.closed;


      });


      // Oh, you're a nested GUI!
    } else {

      if (params.closed === undefined) {
        params.closed = true;
      }

      var title_row_name = document.createTextNode(params.name);
      dom.addClass(title_row_name, 'controller-name');

      var title_row = addRow(_this, title_row_name);

      var on_click_title = function(e) {
        e.preventDefault();
        _this.closed = !_this.closed;
        return false;
      };

      dom.addClass(this.__ul, GUI.CLASS_CLOSED);

      dom.addClass(title_row, 'title');
      dom.bind(title_row, 'click', on_click_title);

      if (!params.closed) {
        this.closed = false;
      }

    }

    if (params.autoPlace) {

      if (common.isUndefined(params.parent)) {

        if (auto_place_virgin) {
          auto_place_container = document.createElement('div');
          dom.addClass(auto_place_container, CSS_NAMESPACE);
          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
          document.body.appendChild(auto_place_container);
          auto_place_virgin = false;
        }

        // Put it in the dom for you.
        auto_place_container.appendChild(this.domElement);

        // Apply the auto styles
        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);

      }


      // Make it not elastic.
      if (!this.parent) setWidth(_this, params.width);

    }

    dom.bind(window, 'resize', function() { _this.onResize() });
    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
    dom.bind(this.__ul, 'transitionend', function() { _this.onResize() });
    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize() });
    this.onResize();


    if (params.resizable) {
      addResizeHandle(this);
    }

    function saveToLocalStorage() {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }

    var root = _this.getRoot();
    function resetWidth() {
        var root = _this.getRoot();
        root.width += 1;
        common.defer(function() {
          root.width -= 1;
        });
      }

      if (!params.parent) {
        resetWidth();
      }

  };

  GUI.toggleHide = function() {

    hide = !hide;
    common.each(hideable_guis, function(gui) {
      gui.domElement.style.zIndex = hide ? -999 : 999;
      gui.domElement.style.opacity = hide ? 0 : 1;
    });
  };

  GUI.CLASS_AUTO_PLACE = 'a';
  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
  GUI.CLASS_MAIN = 'main';
  GUI.CLASS_CONTROLLER_ROW = 'cr';
  GUI.CLASS_TOO_TALL = 'taller-than-window';
  GUI.CLASS_CLOSED = 'closed';
  GUI.CLASS_CLOSE_BUTTON = 'close-button';
  GUI.CLASS_DRAG = 'drag';

  GUI.DEFAULT_WIDTH = 245;
  GUI.TEXT_CLOSED = 'Close Controls';
  GUI.TEXT_OPEN = 'Open Controls';

  dom.bind(window, 'keydown', function(e) {

    if (document.activeElement.type !== 'text' &&
        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
      GUI.toggleHide();
    }

  }, false);

  common.extend(

      GUI.prototype,

      /** @lends dat.gui.GUI */
      {

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.Controller} The new controller that was added.
         * @instance
         */
        add: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
              }
          );

        },

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.ColorController} The new controller that was added.
         * @instance
         */
        addColor: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                color: true
              }
          );

        },

        /**
         * @param controller
         * @instance
         */
        remove: function(controller) {

          // TODO listening?
          this.__ul.removeChild(controller.__li);
          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
          var _this = this;
          common.defer(function() {
            _this.onResize();
          });

        },

        destroy: function() {

          if (this.autoPlace) {
            auto_place_container.removeChild(this.domElement);
          }

        },

        /**
         * @param name
         * @returns {dat.gui.GUI} The new folder.
         * @throws {Error} if this GUI already has a folder by the specified
         * name
         * @instance
         */
        addFolder: function(name) {

          // We have to prevent collisions on names in order to have a key
          // by which to remember saved values
          if (this.__folders[name] !== undefined) {
            throw new Error('You already have a folder in this GUI by the' +
                ' name "' + name + '"');
          }

          var new_gui_params = { name: name, parent: this };

          // We need to pass down the autoPlace trait so that we can
          // attach event listeners to open/close folder actions to
          // ensure that a scrollbar appears if the window is too short.
          new_gui_params.autoPlace = this.autoPlace;

          // Do we have saved appearance data for this folder?

          if (this.load && // Anything loaded?
              this.load.folders && // Was my parent a dead-end?
              this.load.folders[name]) { // Did daddy remember me?

            // Start me closed if I was closed
            new_gui_params.closed = this.load.folders[name].closed;

            // Pass down the loaded data
            new_gui_params.load = this.load.folders[name];

          }

          var gui = new GUI(new_gui_params);
          this.__folders[name] = gui;

          var li = addRow(this, gui.domElement);
          dom.addClass(li, 'folder');
          return gui;

        },

        open: function() {
          this.closed = false;
        },

        close: function() {
          this.closed = true;
        },

        onResize: function() {

          var root = this.getRoot();

          if (root.scrollable) {

            var top = dom.getOffset(root.__ul).top;
            var h = 0;

            common.each(root.__ul.childNodes, function(node) {
              if (! (root.autoPlace && node === root.__save_row))
                h += dom.getHeight(node);
            });

            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
            } else {
              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = 'auto';
            }

          }

          if (root.__resize_handle) {
            common.defer(function() {
              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
            });
          }

          if (root.__closeButton) {
            root.__closeButton.style.width = root.width + 'px';
          }

        },

        /**
         * Mark objects for saving. The order of these objects cannot change as
         * the GUI grows. When remembering new objects, append them to the end
         * of the list.
         *
         * @param {Object...} objects
         * @throws {Error} if not called on a top level GUI.
         * @instance
         */
        remember: function() {

          if (common.isUndefined(SAVE_DIALOGUE)) {
            SAVE_DIALOGUE = new CenteredDiv();
            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
          }

          if (this.parent) {
            throw new Error("You can only call remember on a top level GUI.");
          }

          var _this = this;

          common.each(Array.prototype.slice.call(arguments), function(object) {
            if (_this.__rememberedObjects.length == 0) {
              addSaveMenu(_this);
            }
            if (_this.__rememberedObjects.indexOf(object) == -1) {
              _this.__rememberedObjects.push(object);
            }
          });

          if (this.autoPlace) {
            // Set save row width
            setWidth(this, this.width);
          }

        },

        /**
         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
         * @instance
         */
        getRoot: function() {
          var gui = this;
          while (gui.parent) {
            gui = gui.parent;
          }
          return gui;
        },

        /**
         * @returns {Object} a JSON object representing the current state of
         * this GUI as well as its remembered properties.
         * @instance
         */
        getSaveObject: function() {

          var toReturn = this.load;

          toReturn.closed = this.closed;

          // Am I remembering any values?
          if (this.__rememberedObjects.length > 0) {

            toReturn.preset = this.preset;

            if (!toReturn.remembered) {
              toReturn.remembered = {};
            }

            toReturn.remembered[this.preset] = getCurrentPreset(this);

          }

          toReturn.folders = {};
          common.each(this.__folders, function(element, key) {
            toReturn.folders[key] = element.getSaveObject();
          });

          return toReturn;

        },

        save: function() {

          if (!this.load.remembered) {
            this.load.remembered = {};
          }

          this.load.remembered[this.preset] = getCurrentPreset(this);
          markPresetModified(this, false);

        },

        saveAs: function(presetName) {

          if (!this.load.remembered) {

            // Retain default values upon first save
            this.load.remembered = {};
            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);

          }

          this.load.remembered[presetName] = getCurrentPreset(this);
          this.preset = presetName;
          addPresetOption(this, presetName, true);

        },

        revert: function(gui) {

          common.each(this.__controllers, function(controller) {
            // Make revert work on Default.
            if (!this.getRoot().load.remembered) {
              controller.setValue(controller.initialValue);
            } else {
              recallSavedValue(gui || this.getRoot(), controller);
            }
          }, this);

          common.each(this.__folders, function(folder) {
            folder.revert(folder);
          });

          if (!gui) {
            markPresetModified(this.getRoot(), false);
          }


        },

        listen: function(controller) {

          var init = this.__listening.length == 0;
          this.__listening.push(controller);
          if (init) updateDisplays(this.__listening);

        }

      }

  );

  function add(gui, object, property, params) {

    if (object[property] === undefined) {
      throw new Error("Object " + object + " has no property \"" + property + "\"");
    }

    var controller;

    if (params.color) {

      controller = new ColorController(object, property);

    } else {

      var factoryArgs = [object,property].concat(params.factoryArgs);
      controller = controllerFactory.apply(gui, factoryArgs);

    }

    if (params.before instanceof Controller) {
      params.before = params.before.__li;
    }

    recallSavedValue(gui, controller);

    dom.addClass(controller.domElement, 'c');

    var name = document.createElement('span');
    dom.addClass(name, 'property-name');
    name.innerHTML = controller.property;

    var container = document.createElement('div');
    container.appendChild(name);
    container.appendChild(controller.domElement);

    var li = addRow(gui, container, params.before);

    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
    dom.addClass(li, typeof controller.getValue());

    augmentController(gui, li, controller);

    gui.__controllers.push(controller);

    return controller;

  }

  /**
   * Add a row to the end of the GUI or before another row.
   *
   * @param gui
   * @param [dom] If specified, inserts the dom content in the new row
   * @param [liBefore] If specified, places the new row before another row
   */
  function addRow(gui, dom, liBefore) {
    var li = document.createElement('li');
    if (dom) li.appendChild(dom);
    if (liBefore) {
      gui.__ul.insertBefore(li, params.before);
    } else {
      gui.__ul.appendChild(li);
    }
    gui.onResize();
    return li;
  }

  function augmentController(gui, li, controller) {

    controller.__li = li;
    controller.__gui = gui;

    common.extend(controller, {

      options: function(options) {

        if (arguments.length > 1) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [common.toArray(arguments)]
              }
          );

        }

        if (common.isArray(options) || common.isObject(options)) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [options]
              }
          );

        }

      },

      name: function(v) {
        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
        return controller;
      },

      listen: function() {
        controller.__gui.listen(controller);
        return controller;
      },

      remove: function() {
        controller.__gui.remove(controller);
        return controller;
      }

    });

    // All sliders should be accompanied by a box.
    if (controller instanceof NumberControllerSlider) {

      var box = new NumberControllerBox(controller.object, controller.property,
          { min: controller.__min, max: controller.__max, step: controller.__step });

      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
        var pc = controller[method];
        var pb = box[method];
        controller[method] = box[method] = function() {
          var args = Array.prototype.slice.call(arguments);
          pc.apply(controller, args);
          return pb.apply(box, args);
        }
      });

      dom.addClass(li, 'has-slider');
      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);

    }
    else if (controller instanceof NumberControllerBox) {

      var r = function(returned) {

        // Have we defined both boundaries?
        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {

          // Well, then lets just replace this with a slider.
          controller.remove();
          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [controller.__min, controller.__max, controller.__step]
              });

        }

        return returned;

      };

      controller.min = common.compose(r, controller.min);
      controller.max = common.compose(r, controller.max);

    }
    else if (controller instanceof BooleanController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__checkbox, 'click');
      });

      dom.bind(controller.__checkbox, 'click', function(e) {
        e.stopPropagation(); // Prevents double-toggle
      })

    }
    else if (controller instanceof FunctionController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__button, 'click');
      });

      dom.bind(li, 'mouseover', function() {
        dom.addClass(controller.__button, 'hover');
      });

      dom.bind(li, 'mouseout', function() {
        dom.removeClass(controller.__button, 'hover');
      });

    }
    else if (controller instanceof ColorController) {

      dom.addClass(li, 'color');
      controller.updateDisplay = common.compose(function(r) {
        li.style.borderLeftColor = controller.__color.toString();
        return r;
      }, controller.updateDisplay);

      controller.updateDisplay();

    }

    controller.setValue = common.compose(function(r) {
      if (gui.getRoot().__preset_select && controller.isModified()) {
        markPresetModified(gui.getRoot(), true);
      }
      return r;
    }, controller.setValue);

  }

  function recallSavedValue(gui, controller) {

    // Find the topmost GUI, that's where remembered objects live.
    var root = gui.getRoot();

    // Does the object we're controlling match anything we've been told to
    // remember?
    var matched_index = root.__rememberedObjects.indexOf(controller.object);

    // Why yes, it does!
    if (matched_index != -1) {

      // Let me fetch a map of controllers for thcommon.isObject.
      var controller_map =
          root.__rememberedObjectIndecesToControllers[matched_index];

      // Ohp, I believe this is the first controller we've created for this
      // object. Lets make the map fresh.
      if (controller_map === undefined) {
        controller_map = {};
        root.__rememberedObjectIndecesToControllers[matched_index] =
            controller_map;
      }

      // Keep track of this controller
      controller_map[controller.property] = controller;

      // Okay, now have we saved any values for this controller?
      if (root.load && root.load.remembered) {

        var preset_map = root.load.remembered;

        // Which preset are we trying to load?
        var preset;

        if (preset_map[gui.preset]) {

          preset = preset_map[gui.preset];

        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {

          // Uhh, you can have the default instead?
          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];

        } else {

          // Nada.

          return;

        }


        // Did the loaded object remember thcommon.isObject?
        if (preset[matched_index] &&

          // Did we remember this particular property?
            preset[matched_index][controller.property] !== undefined) {

          // We did remember something for this guy ...
          var value = preset[matched_index][controller.property];

          // And that's what it is.
          controller.initialValue = value;
          controller.setValue(value);

        }

      }

    }

  }

  function getLocalStorageHash(gui, key) {
    // TODO how does this deal with multiple GUI's?
    return document.location.href + '.' + key;

  }

  function addSaveMenu(gui) {

    var div = gui.__save_row = document.createElement('li');

    dom.addClass(gui.domElement, 'has-save');

    gui.__ul.insertBefore(div, gui.__ul.firstChild);

    dom.addClass(div, 'save-row');

    var gears = document.createElement('span');
    gears.innerHTML = '&nbsp;';
    dom.addClass(gears, 'button gears');

    // TODO replace with FunctionController
    var button = document.createElement('span');
    button.innerHTML = 'Save';
    dom.addClass(button, 'button');
    dom.addClass(button, 'save');

    var button2 = document.createElement('span');
    button2.innerHTML = 'New';
    dom.addClass(button2, 'button');
    dom.addClass(button2, 'save-as');

    var button3 = document.createElement('span');
    button3.innerHTML = 'Revert';
    dom.addClass(button3, 'button');
    dom.addClass(button3, 'revert');

    var select = gui.__preset_select = document.createElement('select');

    if (gui.load && gui.load.remembered) {

      common.each(gui.load.remembered, function(value, key) {
        addPresetOption(gui, key, key == gui.preset);
      });

    } else {
      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
    }

    dom.bind(select, 'change', function() {


      for (var index = 0; index < gui.__preset_select.length; index++) {
        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
      }

      gui.preset = this.value;

    });

    div.appendChild(select);
    div.appendChild(gears);
    div.appendChild(button);
    div.appendChild(button2);
    div.appendChild(button3);

    if (SUPPORTS_LOCAL_STORAGE) {

      var saveLocally = document.getElementById('dg-save-locally');
      var explain = document.getElementById('dg-local-explain');

      saveLocally.style.display = 'block';

      var localStorageCheckBox = document.getElementById('dg-local-storage');

      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
        localStorageCheckBox.setAttribute('checked', 'checked');
      }

      function showHideExplain() {
        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
      }

      showHideExplain();

      // TODO: Use a boolean controller, fool!
      dom.bind(localStorageCheckBox, 'change', function() {
        gui.useLocalStorage = !gui.useLocalStorage;
        showHideExplain();
      });

    }

    var newConstructorTextArea = document.getElementById('dg-new-constructor');

    dom.bind(newConstructorTextArea, 'keydown', function(e) {
      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
        SAVE_DIALOGUE.hide();
      }
    });

    dom.bind(gears, 'click', function() {
      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
      SAVE_DIALOGUE.show();
      newConstructorTextArea.focus();
      newConstructorTextArea.select();
    });

    dom.bind(button, 'click', function() {
      gui.save();
    });

    dom.bind(button2, 'click', function() {
      var presetName = prompt('Enter a new preset name.');
      if (presetName) gui.saveAs(presetName);
    });

    dom.bind(button3, 'click', function() {
      gui.revert();
    });

//    div.appendChild(button2);

  }

  function addResizeHandle(gui) {

    gui.__resize_handle = document.createElement('div');

    common.extend(gui.__resize_handle.style, {

      width: '6px',
      marginLeft: '-3px',
      height: '200px',
      cursor: 'ew-resize',
      position: 'absolute'
//      border: '1px solid blue'

    });

    var pmouseX;

    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
    dom.bind(gui.__closeButton, 'mousedown', dragStart);

    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);

    function dragStart(e) {

      e.preventDefault();

      pmouseX = e.clientX;

      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.bind(window, 'mousemove', drag);
      dom.bind(window, 'mouseup', dragStop);

      return false;

    }

    function drag(e) {

      e.preventDefault();

      gui.width += pmouseX - e.clientX;
      gui.onResize();
      pmouseX = e.clientX;

      return false;

    }

    function dragStop() {

      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.unbind(window, 'mousemove', drag);
      dom.unbind(window, 'mouseup', dragStop);

    }

  }

  function setWidth(gui, w) {
    gui.domElement.style.width = w + 'px';
    // Auto placed save-rows are position fixed, so we have to
    // set the width manually if we want it to bleed to the edge
    if (gui.__save_row && gui.autoPlace) {
      gui.__save_row.style.width = w + 'px';
    }if (gui.__closeButton) {
      gui.__closeButton.style.width = w + 'px';
    }
  }

  function getCurrentPreset(gui, useInitialValues) {

    var toReturn = {};

    // For each object I'm remembering
    common.each(gui.__rememberedObjects, function(val, index) {

      var saved_values = {};

      // The controllers I've made for thcommon.isObject by property
      var controller_map =
          gui.__rememberedObjectIndecesToControllers[index];

      // Remember each value for each property
      common.each(controller_map, function(controller, property) {
        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
      });

      // Save the values for thcommon.isObject
      toReturn[index] = saved_values;

    });

    return toReturn;

  }

  function addPresetOption(gui, name, setSelected) {
    var opt = document.createElement('option');
    opt.innerHTML = name;
    opt.value = name;
    gui.__preset_select.appendChild(opt);
    if (setSelected) {
      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
    }
  }

  function setPresetSelectIndex(gui) {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      if (gui.__preset_select[index].value == gui.preset) {
        gui.__preset_select.selectedIndex = index;
      }
    }
  }

  function markPresetModified(gui, modified) {
    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
//    console.log('mark', modified, opt);
    if (modified) {
      opt.innerHTML = opt.value + "*";
    } else {
      opt.innerHTML = opt.value;
    }
  }

  function updateDisplays(controllerArray) {


    if (controllerArray.length != 0) {

      requestAnimationFrame(function() {
        updateDisplays(controllerArray);
      });

    }

    common.each(controllerArray, function(c) {
      c.updateDisplay();
    });

  }

  return GUI;

})(dat.utils.css,
"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {

      return function(object, property) {

        var initialValue = object[property];

        // Providing options?
        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
          return new OptionController(object, property, arguments[2]);
        }

        // Providing a map?

        if (common.isNumber(initialValue)) {

          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {

            // Has min and max.
            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);

          } else {

            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });

          }

        }

        if (common.isString(initialValue)) {
          return new StringController(object, property);
        }

        if (common.isFunction(initialValue)) {
          return new FunctionController(object, property, '');
        }

        if (common.isBoolean(initialValue)) {
          return new BooleanController(object, property);
        }

      }

    })(dat.controllers.OptionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.StringController = (function (Controller, dom, common) {

  /**
   * @class Provides a text input to alter the string property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var StringController = function(object, property) {

    StringController.superclass.call(this, object, property);

    var _this = this;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    dom.bind(this.__input, 'keyup', onChange);
    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  StringController.superclass = Controller;

  common.extend(

      StringController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {
          // Stops the caret from moving on account of:
          // keyup -> setValue -> updateDisplay
          if (!dom.isActive(this.__input)) {
            this.__input.value = this.getValue();
          }
          return StringController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return StringController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common),
dat.controllers.FunctionController,
dat.controllers.BooleanController,
dat.utils.common),
dat.controllers.Controller,
dat.controllers.BooleanController,
dat.controllers.FunctionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.OptionController,
dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {

  var ColorController = function(object, property) {

    ColorController.superclass.call(this, object, property);

    this.__color = new Color(this.getValue());
    this.__temp = new Color(0);

    var _this = this;

    this.domElement = document.createElement('div');

    dom.makeSelectable(this.domElement, false);

    this.__selector = document.createElement('div');
    this.__selector.className = 'selector';

    this.__saturation_field = document.createElement('div');
    this.__saturation_field.className = 'saturation-field';

    this.__field_knob = document.createElement('div');
    this.__field_knob.className = 'field-knob';
    this.__field_knob_border = '2px solid ';

    this.__hue_knob = document.createElement('div');
    this.__hue_knob.className = 'hue-knob';

    this.__hue_field = document.createElement('div');
    this.__hue_field.className = 'hue-field';

    this.__input = document.createElement('input');
    this.__input.type = 'text';
    this.__input_textShadow = '0 1px 1px ';

    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) { // on enter
        onBlur.call(this);
      }
    });

    dom.bind(this.__input, 'blur', onBlur);

    dom.bind(this.__selector, 'mousedown', function(e) {

      dom
        .addClass(this, 'drag')
        .bind(window, 'mouseup', function(e) {
          dom.removeClass(_this.__selector, 'drag');
        });

    });

    var value_field = document.createElement('div');

    common.extend(this.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });

    common.extend(this.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    
    common.extend(this.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });

    common.extend(this.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });

    common.extend(value_field.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    
    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');

    common.extend(this.__hue_field.style, {
      width: '15px',
      height: '100px',
      display: 'inline-block',
      border: '1px solid #555',
      cursor: 'ns-resize'
    });

    hueGradient(this.__hue_field);

    common.extend(this.__input.style, {
      outline: 'none',
//      width: '120px',
      textAlign: 'center',
//      padding: '4px',
//      marginBottom: '6px',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
    });

    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
    dom.bind(this.__field_knob, 'mousedown', fieldDown);

    dom.bind(this.__hue_field, 'mousedown', function(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'mouseup', unbindH);
    });

    function fieldDown(e) {
      setSV(e);
      // document.body.style.cursor = 'none';
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'mouseup', unbindSV);
    }

    function unbindSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'mouseup', unbindSV);
      // document.body.style.cursor = 'default';
    }

    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function unbindH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'mouseup', unbindH);
    }

    this.__saturation_field.appendChild(value_field);
    this.__selector.appendChild(this.__field_knob);
    this.__selector.appendChild(this.__saturation_field);
    this.__selector.appendChild(this.__hue_field);
    this.__hue_field.appendChild(this.__hue_knob);

    this.domElement.appendChild(this.__input);
    this.domElement.appendChild(this.__selector);

    this.updateDisplay();

    function setSV(e) {

      e.preventDefault();

      var w = dom.getWidth(_this.__saturation_field);
      var o = dom.getOffset(_this.__saturation_field);
      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;

      if (v > 1) v = 1;
      else if (v < 0) v = 0;

      if (s > 1) s = 1;
      else if (s < 0) s = 0;

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());


      return false;

    }

    function setH(e) {

      e.preventDefault();

      var s = dom.getHeight(_this.__hue_field);
      var o = dom.getOffset(_this.__hue_field);
      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;

      if (h > 1) h = 1;
      else if (h < 0) h = 0;

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;

    }

  };

  ColorController.superclass = Controller;

  common.extend(

      ColorController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {

          var i = interpret(this.getValue());

          if (i !== false) {

            var mismatch = false;

            // Check for mismatch on the interpreted value.

            common.each(Color.COMPONENTS, function(component) {
              if (!common.isUndefined(i[component]) &&
                  !common.isUndefined(this.__color.__state[component]) &&
                  i[component] !== this.__color.__state[component]) {
                mismatch = true;
                return {}; // break
              }
            }, this);

            // If nothing diverges, we keep our previous values
            // for statefulness, otherwise we recalculate fresh
            if (mismatch) {
              common.extend(this.__color.__state, i);
            }

          }

          common.extend(this.__temp.__state, this.__color.__state);

          this.__temp.a = 1;

          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
          var _flip = 255 - flip;

          common.extend(this.__field_knob.style, {
            marginLeft: 100 * this.__color.s - 7 + 'px',
            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
            backgroundColor: this.__temp.toString(),
            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
          });

          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px'

          this.__temp.s = 1;
          this.__temp.v = 1;

          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());

          common.extend(this.__input.style, {
            backgroundColor: this.__input.value = this.__color.toString(),
            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
          });

        }

      }

  );
  
  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
  
  function linearGradient(elem, x, a, b) {
    elem.style.background = '';
    common.each(vendors, function(vendor) {
      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
    });
  }
  
  function hueGradient(elem) {
    elem.style.background = '';
    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
  }


  return ColorController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret,
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common),
dat.color.interpret,
dat.utils.common),
dat.utils.requestAnimationFrame = (function () {

  /**
   * requirejs version of Paul Irish's RequestAnimationFrame
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */

  return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element) {

        window.setTimeout(callback, 1000 / 60);

      };
})(),
dat.dom.CenteredDiv = (function (dom, common) {


  var CenteredDiv = function() {

    this.backgroundElement = document.createElement('div');
    common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear'
    });

    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';

    this.domElement = document.createElement('div');
    common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
    });


    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;
    dom.bind(this.backgroundElement, 'click', function() {
      _this.hide();
    });


  };

  CenteredDiv.prototype.show = function() {

    var _this = this;
    


    this.backgroundElement.style.display = 'block';

    this.domElement.style.display = 'block';
    this.domElement.style.opacity = 0;
//    this.domElement.style.top = '52%';
    this.domElement.style.webkitTransform = 'scale(1.1)';

    this.layout();

    common.defer(function() {
      _this.backgroundElement.style.opacity = 1;
      _this.domElement.style.opacity = 1;
      _this.domElement.style.webkitTransform = 'scale(1)';
    });

  };

  CenteredDiv.prototype.hide = function() {

    var _this = this;

    var hide = function() {

      _this.domElement.style.display = 'none';
      _this.backgroundElement.style.display = 'none';

      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
      dom.unbind(_this.domElement, 'transitionend', hide);
      dom.unbind(_this.domElement, 'oTransitionEnd', hide);

    };

    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
    dom.bind(this.domElement, 'transitionend', hide);
    dom.bind(this.domElement, 'oTransitionEnd', hide);

    this.backgroundElement.style.opacity = 0;
//    this.domElement.style.top = '48%';
    this.domElement.style.opacity = 0;
    this.domElement.style.webkitTransform = 'scale(1.1)';

  };

  CenteredDiv.prototype.layout = function() {
    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
  };
  
  function lockScroll(e) {
    console.log(e);
  }

  return CenteredDiv;

})(dat.dom.dom,
dat.utils.common),
dat.dom.dom,
dat.utils.common);

/***/ }),
/* 79 */
/***/ (function(module, exports) {

/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.color = dat.color || {};

/** @namespace */
dat.utils = dat.utils || {};

dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.Color = dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common),
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common);

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rendering_gl_Drawable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals__ = __webpack_require__(9);


class Square extends __WEBPACK_IMPORTED_MODULE_0__rendering_gl_Drawable__["a" /* default */] {
    constructor() {
        super(); // Call the constructor of the super class. This is required.
    }
    create() {
        this.indices = new Uint32Array([0, 1, 2,
            0, 2, 3]);
        this.positions = new Float32Array([-0.5, -0.5, 0, 1,
            0.5, -0.5, 0, 1,
            0.5, 0.5, 0, 1,
            -0.5, 0.5, 0, 1]);
        this.generateIdx();
        this.generatePos();
        this.generateCol();
        this.generateTranslate();
        this.count = this.indices.length;
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ELEMENT_ARRAY_BUFFER, this.bufIdx);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ELEMENT_ARRAY_BUFFER, this.indices, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ARRAY_BUFFER, this.bufPos);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ARRAY_BUFFER, this.positions, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].STATIC_DRAW);
        console.log(`Created square`);
    }
    setInstanceVBOs(offsets, colors) {
        this.colors = colors;
        this.offsets = offsets;
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ARRAY_BUFFER, this.bufCol);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ARRAY_BUFFER, this.colors, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ARRAY_BUFFER, this.bufTranslate);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ARRAY_BUFFER, this.offsets, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].STATIC_DRAW);
    }
}
;
/* harmony default export */ __webpack_exports__["a"] = (Square);


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rendering_gl_Drawable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals__ = __webpack_require__(9);


class ScreenQuad extends __WEBPACK_IMPORTED_MODULE_0__rendering_gl_Drawable__["a" /* default */] {
    constructor() {
        super();
    }
    create() {
        this.indices = new Uint32Array([0, 1, 2,
            0, 2, 3]);
        this.positions = new Float32Array([-1, -1, 0.999, 1,
            1, -1, 0.999, 1,
            1, 1, 0.999, 1,
            -1, 1, 0.999, 1]);
        this.generateIdx();
        this.generatePos();
        this.count = this.indices.length;
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ELEMENT_ARRAY_BUFFER, this.bufIdx);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ELEMENT_ARRAY_BUFFER, this.indices, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ARRAY_BUFFER, this.bufPos);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].ARRAY_BUFFER, this.positions, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].STATIC_DRAW);
        this.numInstances = 1;
        console.log(`Created ScreenQuad`);
    }
}
;
/* harmony default export */ __webpack_exports__["a"] = (ScreenQuad);


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gl_matrix__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals__ = __webpack_require__(9);


// In this file, `gl` is accessible because it is imported above
class OpenGLRenderer {
    constructor(canvas) {
        this.canvas = canvas;
    }
    setClearColor(r, g, b, a) {
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].clearColor(r, g, b, a);
    }
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    clear() {
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].clear(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].COLOR_BUFFER_BIT | __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].DEPTH_BUFFER_BIT);
    }
    render(camera, prog, drawables) {
        let model = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        let viewProj = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        let color = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(1, 0, 0, 1);
        // Each column of the axes matrix is an axis. Right, Up, Forward.
        let axes = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["a" /* mat3 */].fromValues(camera.right[0], camera.right[1], camera.right[2], camera.up[0], camera.up[1], camera.up[2], camera.forward[0], camera.forward[1], camera.forward[2]);
        prog.setEyeRefUp(camera.controls.eye, camera.controls.center, camera.controls.up);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].identity(model);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].multiply(viewProj, camera.projectionMatrix, camera.viewMatrix);
        prog.setModelMatrix(model);
        prog.setViewProjMatrix(viewProj);
        prog.setCameraAxes(axes);
        for (let drawable of drawables) {
            prog.draw(drawable);
        }
    }
}
;
/* harmony default export */ __webpack_exports__["a"] = (OpenGLRenderer);


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gl_matrix__ = __webpack_require__(8);
var CameraControls = __webpack_require__(84);

class Camera {
    constructor(position, target) {
        this.projectionMatrix = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        this.viewMatrix = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        this.fovy = 45;
        this.aspectRatio = 1;
        this.near = 0.1;
        this.far = 1000;
        this.position = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].create();
        this.direction = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].create();
        this.target = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].create();
        this.up = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].create();
        this.right = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].create();
        this.forward = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].create();
        const canvas = document.getElementById('canvas');
        this.controls = CameraControls(canvas, {
            eye: position,
            center: target,
        });
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].add(this.target, this.position, this.direction);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].lookAt(this.viewMatrix, this.controls.eye, this.controls.center, this.controls.up);
        this.position = this.controls.eye;
        this.up = this.controls.up;
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].subtract(this.forward, this.target, this.position);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].normalize(this.forward, this.forward);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].cross(this.right, this.forward, this.up);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].normalize(this.right, this.right);
    }
    setAspectRatio(aspectRatio) {
        this.aspectRatio = aspectRatio;
    }
    updateProjectionMatrix() {
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].perspective(this.projectionMatrix, this.fovy, this.aspectRatio, this.near, this.far);
    }
    update() {
        this.controls.tick();
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].add(this.target, this.position, this.direction);
        this.position = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(this.controls.eye[0], this.controls.eye[1], this.controls.eye[2]);
        this.target = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(this.controls.center[0], this.controls.center[1], this.controls.center[2]);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].lookAt(this.viewMatrix, this.controls.eye, this.controls.center, this.controls.up);
        this.position = this.controls.eye;
        this.up = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(this.controls.up[0], this.controls.up[1], this.controls.up[2]);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].normalize(this.up, this.up);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].subtract(this.forward, this.target, this.position);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].normalize(this.forward, this.forward);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].cross(this.right, this.forward, this.up);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].normalize(this.right, this.right);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].cross(this.up, this.right, this.forward);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].normalize(this.up, this.up);
    }
}
;
/* harmony default export */ __webpack_exports__["a"] = (Camera);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = createCamera

var now         = __webpack_require__(85)
var createView  = __webpack_require__(87)
var mouseChange = __webpack_require__(110)
var mouseWheel  = __webpack_require__(112)
var mouseOffset = __webpack_require__(115)
var hasPassive  = __webpack_require__(116)

function createCamera(element, options) {
  element = element || document.body
  options = options || {}

  var limits  = [ 0.01, Infinity ]
  if('distanceLimits' in options) {
    limits[0] = options.distanceLimits[0]
    limits[1] = options.distanceLimits[1]
  }
  if('zoomMin' in options) {
    limits[0] = options.zoomMin
  }
  if('zoomMax' in options) {
    limits[1] = options.zoomMax
  }

  var view = createView({
    center: options.center || [0,0,0],
    up:     options.up     || [0,1,0],
    eye:    options.eye    || [0,0,10],
    mode:   options.mode   || 'orbit',
    distanceLimits: limits
  })

  var pmatrix = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  var distance = 0.0
  var width   = element.clientWidth
  var height  = element.clientHeight

  var camera = {
    view:               view,
    element:            element,
    delay:              options.delay          || 16,
    rotateSpeed:        options.rotateSpeed    || 1,
    zoomSpeed:          options.zoomSpeed      || 1,
    translateSpeed:     options.translateSpeed || 1,
    flipX:              !!options.flipX,
    flipY:              !!options.flipY,
    modes:              view.modes,
    tick: function() {
      var t = now()
      var delay = this.delay
      view.idle(t-delay)
      view.flush(t-(100+delay*2))
      var ctime = t - 2 * delay
      view.recalcMatrix(ctime)
      var allEqual = true
      var matrix = view.computedMatrix
      for(var i=0; i<16; ++i) {
        allEqual = allEqual && (pmatrix[i] === matrix[i])
        pmatrix[i] = matrix[i]
      }
      var sizeChanged =
          element.clientWidth === width &&
          element.clientHeight === height
      width  = element.clientWidth
      height = element.clientHeight
      if(allEqual) {
        return !sizeChanged
      }
      distance = Math.exp(view.computedRadius[0])
      return true
    },
    lookAt: function(center, eye, up) {
      view.lookAt(view.lastT(), center, eye, up)
    },
    rotate: function(pitch, yaw, roll) {
      view.rotate(view.lastT(), pitch, yaw, roll)
    },
    pan: function(dx, dy, dz) {
      view.pan(view.lastT(), dx, dy, dz)
    },
    translate: function(dx, dy, dz) {
      view.translate(view.lastT(), dx, dy, dz)
    }
  }

  Object.defineProperties(camera, {
    matrix: {
      get: function() {
        return view.computedMatrix
      },
      set: function(mat) {
        view.setMatrix(view.lastT(), mat)
        return view.computedMatrix
      },
      enumerable: true
    },
    mode: {
      get: function() {
        return view.getMode()
      },
      set: function(mode) {
        view.setMode(mode)
        return view.getMode()
      },
      enumerable: true
    },
    center: {
      get: function() {
        return view.computedCenter
      },
      set: function(ncenter) {
        view.lookAt(view.lastT(), ncenter)
        return view.computedCenter
      },
      enumerable: true
    },
    eye: {
      get: function() {
        return view.computedEye
      },
      set: function(neye) {
        view.lookAt(view.lastT(), null, neye)
        return view.computedEye
      },
      enumerable: true
    },
    up: {
      get: function() {
        return view.computedUp
      },
      set: function(nup) {
        view.lookAt(view.lastT(), null, null, nup)
        return view.computedUp
      },
      enumerable: true
    },
    distance: {
      get: function() {
        return distance
      },
      set: function(d) {
        view.setDistance(view.lastT(), d)
        return d
      },
      enumerable: true
    },
    distanceLimits: {
      get: function() {
        return view.getDistanceLimits(limits)
      },
      set: function(v) {
        view.setDistanceLimits(v)
        return v
      },
      enumerable: true
    }
  })

  element.addEventListener('contextmenu', function(ev) {
    ev.preventDefault()
    return false
  })

  var lastX = 0, lastY = 0, lastMods = {shift: false, control: false, alt: false, meta: false}
  mouseChange(element, handleInteraction)

  //enable simple touch interactions
  element.addEventListener('touchstart', function (ev) {
    var xy = mouseOffset(ev.changedTouches[0], element)
    handleInteraction(0, xy[0], xy[1], lastMods)
    handleInteraction(1, xy[0], xy[1], lastMods)

    ev.preventDefault()
  }, hasPassive ? {passive: false} : false)

  element.addEventListener('touchmove', function (ev) {
    var xy = mouseOffset(ev.changedTouches[0], element)
    handleInteraction(1, xy[0], xy[1], lastMods)

    ev.preventDefault()
  }, hasPassive ? {passive: false} : false)

  element.addEventListener('touchend', function (ev) {
    var xy = mouseOffset(ev.changedTouches[0], element)
    handleInteraction(0, lastX, lastY, lastMods)

    ev.preventDefault()
  }, hasPassive ? {passive: false} : false)

  function handleInteraction (buttons, x, y, mods) {
    var scale = 1.0 / element.clientHeight
    var dx    = scale * (x - lastX)
    var dy    = scale * (y - lastY)

    var flipX = camera.flipX ? 1 : -1
    var flipY = camera.flipY ? 1 : -1

    var drot  = Math.PI * camera.rotateSpeed

    var t = now()

    if(buttons & 1) {
      if(mods.shift) {
        view.rotate(t, 0, 0, -dx * drot)
      } else {
        view.rotate(t, flipX * drot * dx, -flipY * drot * dy, 0)
      }
    } else if(buttons & 2) {
      view.pan(t, -camera.translateSpeed * dx * distance, camera.translateSpeed * dy * distance, 0)
    } else if(buttons & 4) {
      var kzoom = camera.zoomSpeed * dy / window.innerHeight * (t - view.lastT()) * 50.0
      view.pan(t, 0, 0, distance * (Math.exp(kzoom) - 1))
    }

    lastX = x
    lastY = y
    lastMods = mods
  }

  mouseWheel(element, function(dx, dy, dz) {
    var flipX = camera.flipX ? 1 : -1
    var flipY = camera.flipY ? 1 : -1
    var t = now()
    if(Math.abs(dx) > Math.abs(dy)) {
      view.rotate(t, 0, 0, -dx * flipX * Math.PI * camera.rotateSpeed / window.innerWidth)
    } else {
      var kzoom = camera.zoomSpeed * flipY * dy / window.innerHeight * (t - view.lastT()) / 100.0
      view.pan(t, 0, 0, distance * (Math.exp(kzoom) - 1))
    }
  }, true)

  return camera
}


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports =
  global.performance &&
  global.performance.now ? function now() {
    return performance.now()
  } : Date.now || function now() {
    return +new Date
  }

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(86)))

/***/ }),
/* 86 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = createViewController

var createTurntable = __webpack_require__(88)
var createOrbit     = __webpack_require__(91)
var createMatrix    = __webpack_require__(94)

function ViewController(controllers, mode) {
  this._controllerNames = Object.keys(controllers)
  this._controllerList = this._controllerNames.map(function(n) {
    return controllers[n]
  })
  this._mode   = mode
  this._active = controllers[mode]
  if(!this._active) {
    this._mode   = 'turntable'
    this._active = controllers.turntable
  }
  this.modes = this._controllerNames
  this.computedMatrix = this._active.computedMatrix
  this.computedEye    = this._active.computedEye
  this.computedUp     = this._active.computedUp
  this.computedCenter = this._active.computedCenter
  this.computedRadius = this._active.computedRadius
}

var proto = ViewController.prototype

var COMMON_METHODS = [
  ['flush', 1],
  ['idle', 1],
  ['lookAt', 4],
  ['rotate', 4],
  ['pan', 4],
  ['translate', 4],
  ['setMatrix', 2],
  ['setDistanceLimits', 2],
  ['setDistance', 2]
]

COMMON_METHODS.forEach(function(method) {
  var name = method[0]
  var argNames = []
  for(var i=0; i<method[1]; ++i) {
    argNames.push('a'+i)
  }
  var code = 'var cc=this._controllerList;for(var i=0;i<cc.length;++i){cc[i].'+method[0]+'('+argNames.join()+')}'
  proto[name] = Function.apply(null, argNames.concat(code))
})

proto.recalcMatrix = function(t) {
  this._active.recalcMatrix(t)
}

proto.getDistance = function(t) {
  return this._active.getDistance(t)
}
proto.getDistanceLimits = function(out) {
  return this._active.getDistanceLimits(out)
}

proto.lastT = function() {
  return this._active.lastT()
}

proto.setMode = function(mode) {
  if(mode === this._mode) {
    return
  }
  var idx = this._controllerNames.indexOf(mode)
  if(idx < 0) {
    return
  }
  var prev  = this._active
  var next  = this._controllerList[idx]
  var lastT = Math.max(prev.lastT(), next.lastT())

  prev.recalcMatrix(lastT)
  next.setMatrix(lastT, prev.computedMatrix)
  
  this._active = next
  this._mode   = mode

  //Update matrix properties
  this.computedMatrix = this._active.computedMatrix
  this.computedEye    = this._active.computedEye
  this.computedUp     = this._active.computedUp
  this.computedCenter = this._active.computedCenter
  this.computedRadius = this._active.computedRadius
}

proto.getMode = function() {
  return this._mode
}

function createViewController(options) {
  options = options || {}

  var eye       = options.eye    || [0,0,1]
  var center    = options.center || [0,0,0]
  var up        = options.up     || [0,1,0]
  var limits    = options.distanceLimits || [0, Infinity]
  var mode      = options.mode   || 'turntable'

  var turntable = createTurntable()
  var orbit     = createOrbit()
  var matrix    = createMatrix()

  turntable.setDistanceLimits(limits[0], limits[1])
  turntable.lookAt(0, eye, center, up)
  orbit.setDistanceLimits(limits[0], limits[1])
  orbit.lookAt(0, eye, center, up)
  matrix.setDistanceLimits(limits[0], limits[1])
  matrix.lookAt(0, eye, center, up)

  return new ViewController({
    turntable: turntable,
    orbit: orbit,
    matrix: matrix
  }, mode)
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = createTurntableController

var filterVector = __webpack_require__(35)
var invert44     = __webpack_require__(19)
var rotateM      = __webpack_require__(90)
var cross        = __webpack_require__(37)
var normalize3   = __webpack_require__(23)
var dot3         = __webpack_require__(38)

function len3(x, y, z) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
}

function clamp1(x) {
  return Math.min(1.0, Math.max(-1.0, x))
}

function findOrthoPair(v) {
  var vx = Math.abs(v[0])
  var vy = Math.abs(v[1])
  var vz = Math.abs(v[2])

  var u = [0,0,0]
  if(vx > Math.max(vy, vz)) {
    u[2] = 1
  } else if(vy > Math.max(vx, vz)) {
    u[0] = 1
  } else {
    u[1] = 1
  }

  var vv = 0
  var uv = 0
  for(var i=0; i<3; ++i ) {
    vv += v[i] * v[i]
    uv += u[i] * v[i]
  }
  for(var i=0; i<3; ++i) {
    u[i] -= (uv / vv) *  v[i]
  }
  normalize3(u, u)
  return u
}

function TurntableController(zoomMin, zoomMax, center, up, right, radius, theta, phi) {
  this.center = filterVector(center)
  this.up     = filterVector(up)
  this.right  = filterVector(right)
  this.radius = filterVector([radius])
  this.angle  = filterVector([theta, phi])
  this.angle.bounds = [[-Infinity,-Math.PI/2], [Infinity,Math.PI/2]]
  this.setDistanceLimits(zoomMin, zoomMax)

  this.computedCenter = this.center.curve(0)
  this.computedUp     = this.up.curve(0)
  this.computedRight  = this.right.curve(0)
  this.computedRadius = this.radius.curve(0)
  this.computedAngle  = this.angle.curve(0)
  this.computedToward = [0,0,0]
  this.computedEye    = [0,0,0]
  this.computedMatrix = new Array(16)
  for(var i=0; i<16; ++i) {
    this.computedMatrix[i] = 0.5
  }

  this.recalcMatrix(0)
}

var proto = TurntableController.prototype

proto.setDistanceLimits = function(minDist, maxDist) {
  if(minDist > 0) {
    minDist = Math.log(minDist)
  } else {
    minDist = -Infinity
  }
  if(maxDist > 0) {
    maxDist = Math.log(maxDist)
  } else {
    maxDist = Infinity
  }
  maxDist = Math.max(maxDist, minDist)
  this.radius.bounds[0][0] = minDist
  this.radius.bounds[1][0] = maxDist
}

proto.getDistanceLimits = function(out) {
  var bounds = this.radius.bounds[0]
  if(out) {
    out[0] = Math.exp(bounds[0][0])
    out[1] = Math.exp(bounds[1][0])
    return out
  }
  return [ Math.exp(bounds[0][0]), Math.exp(bounds[1][0]) ]
}

proto.recalcMatrix = function(t) {
  //Recompute curves
  this.center.curve(t)
  this.up.curve(t)
  this.right.curve(t)
  this.radius.curve(t)
  this.angle.curve(t)

  //Compute frame for camera matrix
  var up     = this.computedUp
  var right  = this.computedRight
  var uu = 0.0
  var ur = 0.0
  for(var i=0; i<3; ++i) {
    ur += up[i] * right[i]
    uu += up[i] * up[i]
  }
  var ul = Math.sqrt(uu)
  var rr = 0.0
  for(var i=0; i<3; ++i) {
    right[i] -= up[i] * ur / uu
    rr       += right[i] * right[i]
    up[i]    /= ul
  }
  var rl = Math.sqrt(rr)
  for(var i=0; i<3; ++i) {
    right[i] /= rl
  }

  //Compute toward vector
  var toward = this.computedToward
  cross(toward, up, right)
  normalize3(toward, toward)

  //Compute angular parameters
  var radius = Math.exp(this.computedRadius[0])
  var theta  = this.computedAngle[0]
  var phi    = this.computedAngle[1]

  var ctheta = Math.cos(theta)
  var stheta = Math.sin(theta)
  var cphi   = Math.cos(phi)
  var sphi   = Math.sin(phi)

  var center = this.computedCenter

  var wx = ctheta * cphi 
  var wy = stheta * cphi
  var wz = sphi

  var sx = -ctheta * sphi
  var sy = -stheta * sphi
  var sz = cphi

  var eye = this.computedEye
  var mat = this.computedMatrix
  for(var i=0; i<3; ++i) {
    var x      = wx * right[i] + wy * toward[i] + wz * up[i]
    mat[4*i+1] = sx * right[i] + sy * toward[i] + sz * up[i]
    mat[4*i+2] = x
    mat[4*i+3] = 0.0
  }

  var ax = mat[1]
  var ay = mat[5]
  var az = mat[9]
  var bx = mat[2]
  var by = mat[6]
  var bz = mat[10]
  var cx = ay * bz - az * by
  var cy = az * bx - ax * bz
  var cz = ax * by - ay * bx
  var cl = len3(cx, cy, cz)
  cx /= cl
  cy /= cl
  cz /= cl
  mat[0] = cx
  mat[4] = cy
  mat[8] = cz

  for(var i=0; i<3; ++i) {
    eye[i] = center[i] + mat[2+4*i]*radius
  }

  for(var i=0; i<3; ++i) {
    var rr = 0.0
    for(var j=0; j<3; ++j) {
      rr += mat[i+4*j] * eye[j]
    }
    mat[12+i] = -rr
  }
  mat[15] = 1.0
}

proto.getMatrix = function(t, result) {
  this.recalcMatrix(t)
  var mat = this.computedMatrix
  if(result) {
    for(var i=0; i<16; ++i) {
      result[i] = mat[i]
    }
    return result
  }
  return mat
}

var zAxis = [0,0,0]
proto.rotate = function(t, dtheta, dphi, droll) {
  this.angle.move(t, dtheta, dphi)
  if(droll) {
    this.recalcMatrix(t)

    var mat = this.computedMatrix
    zAxis[0] = mat[2]
    zAxis[1] = mat[6]
    zAxis[2] = mat[10]

    var up     = this.computedUp
    var right  = this.computedRight
    var toward = this.computedToward

    for(var i=0; i<3; ++i) {
      mat[4*i]   = up[i]
      mat[4*i+1] = right[i]
      mat[4*i+2] = toward[i]
    }
    rotateM(mat, mat, droll, zAxis)
    for(var i=0; i<3; ++i) {
      up[i] =    mat[4*i]
      right[i] = mat[4*i+1]
    }

    this.up.set(t, up[0], up[1], up[2])
    this.right.set(t, right[0], right[1], right[2])
  }
}

proto.pan = function(t, dx, dy, dz) {
  dx = dx || 0.0
  dy = dy || 0.0
  dz = dz || 0.0

  this.recalcMatrix(t)
  var mat = this.computedMatrix

  var dist = Math.exp(this.computedRadius[0])

  var ux = mat[1]
  var uy = mat[5]
  var uz = mat[9]
  var ul = len3(ux, uy, uz)
  ux /= ul
  uy /= ul
  uz /= ul

  var rx = mat[0]
  var ry = mat[4]
  var rz = mat[8]
  var ru = rx * ux + ry * uy + rz * uz
  rx -= ux * ru
  ry -= uy * ru
  rz -= uz * ru
  var rl = len3(rx, ry, rz)
  rx /= rl
  ry /= rl
  rz /= rl

  var vx = rx * dx + ux * dy
  var vy = ry * dx + uy * dy
  var vz = rz * dx + uz * dy
  this.center.move(t, vx, vy, vz)

  //Update z-component of radius
  var radius = Math.exp(this.computedRadius[0])
  radius = Math.max(1e-4, radius + dz)
  this.radius.set(t, Math.log(radius))
}

proto.translate = function(t, dx, dy, dz) {
  this.center.move(t,
    dx||0.0,
    dy||0.0,
    dz||0.0)
}

//Recenters the coordinate axes
proto.setMatrix = function(t, mat, axes, noSnap) {
  
  //Get the axes for tare
  var ushift = 1
  if(typeof axes === 'number') {
    ushift = (axes)|0
  } 
  if(ushift < 0 || ushift > 3) {
    ushift = 1
  }
  var vshift = (ushift + 2) % 3
  var fshift = (ushift + 1) % 3

  //Recompute state for new t value
  if(!mat) { 
    this.recalcMatrix(t)
    mat = this.computedMatrix
  }

  //Get right and up vectors
  var ux = mat[ushift]
  var uy = mat[ushift+4]
  var uz = mat[ushift+8]
  if(!noSnap) {
    var ul = len3(ux, uy, uz)
    ux /= ul
    uy /= ul
    uz /= ul
  } else {
    var ax = Math.abs(ux)
    var ay = Math.abs(uy)
    var az = Math.abs(uz)
    var am = Math.max(ax,ay,az)
    if(ax === am) {
      ux = (ux < 0) ? -1 : 1
      uy = uz = 0
    } else if(az === am) {
      uz = (uz < 0) ? -1 : 1
      ux = uy = 0
    } else {
      uy = (uy < 0) ? -1 : 1
      ux = uz = 0
    }
  }

  var rx = mat[vshift]
  var ry = mat[vshift+4]
  var rz = mat[vshift+8]
  var ru = rx * ux + ry * uy + rz * uz
  rx -= ux * ru
  ry -= uy * ru
  rz -= uz * ru
  var rl = len3(rx, ry, rz)
  rx /= rl
  ry /= rl
  rz /= rl
  
  var fx = uy * rz - uz * ry
  var fy = uz * rx - ux * rz
  var fz = ux * ry - uy * rx
  var fl = len3(fx, fy, fz)
  fx /= fl
  fy /= fl
  fz /= fl

  this.center.jump(t, ex, ey, ez)
  this.radius.idle(t)
  this.up.jump(t, ux, uy, uz)
  this.right.jump(t, rx, ry, rz)

  var phi, theta
  if(ushift === 2) {
    var cx = mat[1]
    var cy = mat[5]
    var cz = mat[9]
    var cr = cx * rx + cy * ry + cz * rz
    var cf = cx * fx + cy * fy + cz * fz
    if(tu < 0) {
      phi = -Math.PI/2
    } else {
      phi = Math.PI/2
    }
    theta = Math.atan2(cf, cr)
  } else {
    var tx = mat[2]
    var ty = mat[6]
    var tz = mat[10]
    var tu = tx * ux + ty * uy + tz * uz
    var tr = tx * rx + ty * ry + tz * rz
    var tf = tx * fx + ty * fy + tz * fz

    phi = Math.asin(clamp1(tu))
    theta = Math.atan2(tf, tr)
  }

  this.angle.jump(t, theta, phi)

  this.recalcMatrix(t)
  var dx = mat[2]
  var dy = mat[6]
  var dz = mat[10]

  var imat = this.computedMatrix
  invert44(imat, mat)
  var w  = imat[15]
  var ex = imat[12] / w
  var ey = imat[13] / w
  var ez = imat[14] / w

  var gs = Math.exp(this.computedRadius[0])
  this.center.jump(t, ex-dx*gs, ey-dy*gs, ez-dz*gs)
}

proto.lastT = function() {
  return Math.max(
    this.center.lastT(),
    this.up.lastT(),
    this.right.lastT(),
    this.radius.lastT(),
    this.angle.lastT())
}

proto.idle = function(t) {
  this.center.idle(t)
  this.up.idle(t)
  this.right.idle(t)
  this.radius.idle(t)
  this.angle.idle(t)
}

proto.flush = function(t) {
  this.center.flush(t)
  this.up.flush(t)
  this.right.flush(t)
  this.radius.flush(t)
  this.angle.flush(t)
}

proto.setDistance = function(t, d) {
  if(d > 0) {
    this.radius.set(t, Math.log(d))
  }
}

proto.lookAt = function(t, eye, center, up) {
  this.recalcMatrix(t)

  eye    = eye    || this.computedEye
  center = center || this.computedCenter
  up     = up     || this.computedUp

  var ux = up[0]
  var uy = up[1]
  var uz = up[2]
  var ul = len3(ux, uy, uz)
  if(ul < 1e-6) {
    return
  }
  ux /= ul
  uy /= ul
  uz /= ul

  var tx = eye[0] - center[0]
  var ty = eye[1] - center[1]
  var tz = eye[2] - center[2]
  var tl = len3(tx, ty, tz)
  if(tl < 1e-6) {
    return
  }
  tx /= tl
  ty /= tl
  tz /= tl

  var right = this.computedRight
  var rx = right[0]
  var ry = right[1]
  var rz = right[2]
  var ru = ux*rx + uy*ry + uz*rz
  rx -= ru * ux
  ry -= ru * uy
  rz -= ru * uz
  var rl = len3(rx, ry, rz)

  if(rl < 0.01) {
    rx = uy * tz - uz * ty
    ry = uz * tx - ux * tz
    rz = ux * ty - uy * tx
    rl = len3(rx, ry, rz)
    if(rl < 1e-6) {
      return
    }
  }
  rx /= rl
  ry /= rl
  rz /= rl

  this.up.set(t, ux, uy, uz)
  this.right.set(t, rx, ry, rz)
  this.center.set(t, center[0], center[1], center[2])
  this.radius.set(t, Math.log(tl))

  var fx = uy * rz - uz * ry
  var fy = uz * rx - ux * rz
  var fz = ux * ry - uy * rx
  var fl = len3(fx, fy, fz)
  fx /= fl
  fy /= fl
  fz /= fl

  var tu = ux*tx + uy*ty + uz*tz
  var tr = rx*tx + ry*ty + rz*tz
  var tf = fx*tx + fy*ty + fz*tz

  var phi   = Math.asin(clamp1(tu))
  var theta = Math.atan2(tf, tr)

  var angleState = this.angle._state
  var lastTheta  = angleState[angleState.length-1]
  var lastPhi    = angleState[angleState.length-2]
  lastTheta      = lastTheta % (2.0 * Math.PI)
  var dp = Math.abs(lastTheta + 2.0 * Math.PI - theta)
  var d0 = Math.abs(lastTheta - theta)
  var dn = Math.abs(lastTheta - 2.0 * Math.PI - theta)
  if(dp < d0) {
    lastTheta += 2.0 * Math.PI
  }
  if(dn < d0) {
    lastTheta -= 2.0 * Math.PI
  }

  this.angle.jump(this.angle.lastT(), lastTheta, lastPhi)
  this.angle.set(t, theta, phi)
}

function createTurntableController(options) {
  options = options || {}

  var center = options.center || [0,0,0]
  var up     = options.up     || [0,1,0]
  var right  = options.right  || findOrthoPair(up)
  var radius = options.radius || 1.0
  var theta  = options.theta  || 0.0
  var phi    = options.phi    || 0.0

  center = [].slice.call(center, 0, 3)

  up = [].slice.call(up, 0, 3)
  normalize3(up, up)

  right = [].slice.call(right, 0, 3)
  normalize3(right, right)

  if('eye' in options) {
    var eye = options.eye
    var toward = [
      eye[0]-center[0],
      eye[1]-center[1],
      eye[2]-center[2]
    ]
    cross(right, toward, up)
    if(len3(right[0], right[1], right[2]) < 1e-6) {
      right = findOrthoPair(up)
    } else {
      normalize3(right, right)
    }

    radius = len3(toward[0], toward[1], toward[2])

    var ut = dot3(up, toward) / radius
    var rt = dot3(right, toward) / radius
    phi    = Math.acos(ut)
    theta  = Math.acos(rt)
  }

  //Use logarithmic coordinates for radius
  radius = Math.log(radius)

  //Return the controller
  return new TurntableController(
    options.zoomMin,
    options.zoomMax,
    center,
    up,
    right,
    radius,
    theta,
    phi)
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dcubicHermite(p0, v0, p1, v1, t, f) {
  var dh00 = 6*t*t-6*t,
      dh10 = 3*t*t-4*t + 1,
      dh01 = -6*t*t+6*t,
      dh11 = 3*t*t-2*t
  if(p0.length) {
    if(!f) {
      f = new Array(p0.length)
    }
    for(var i=p0.length-1; i>=0; --i) {
      f[i] = dh00*p0[i] + dh10*v0[i] + dh01*p1[i] + dh11*v1[i]
    }
    return f
  }
  return dh00*p0 + dh10*v0 + dh01*p1[i] + dh11*v1
}

function cubicHermite(p0, v0, p1, v1, t, f) {
  var ti  = (t-1), t2 = t*t, ti2 = ti*ti,
      h00 = (1+2*t)*ti2,
      h10 = t*ti2,
      h01 = t2*(3-2*t),
      h11 = t2*ti
  if(p0.length) {
    if(!f) {
      f = new Array(p0.length)
    }
    for(var i=p0.length-1; i>=0; --i) {
      f[i] = h00*p0[i] + h10*v0[i] + h01*p1[i] + h11*v1[i]
    }
    return f
  }
  return h00*p0 + h10*v0 + h01*p1 + h11*v1
}

module.exports = cubicHermite
module.exports.derivative = dcubicHermite

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = rotate;

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < 0.000001) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = createOrbitController

var filterVector  = __webpack_require__(35)
var lookAt        = __webpack_require__(39)
var mat4FromQuat  = __webpack_require__(92)
var invert44      = __webpack_require__(19)
var quatFromFrame = __webpack_require__(93)

function len3(x,y,z) {
  return Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2))
}

function len4(w,x,y,z) {
  return Math.sqrt(Math.pow(w,2) + Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2))
}

function normalize4(out, a) {
  var ax = a[0]
  var ay = a[1]
  var az = a[2]
  var aw = a[3]
  var al = len4(ax, ay, az, aw)
  if(al > 1e-6) {
    out[0] = ax/al
    out[1] = ay/al
    out[2] = az/al
    out[3] = aw/al
  } else {
    out[0] = out[1] = out[2] = 0.0
    out[3] = 1.0
  }
}

function OrbitCameraController(initQuat, initCenter, initRadius) {
  this.radius    = filterVector([initRadius])
  this.center    = filterVector(initCenter)
  this.rotation  = filterVector(initQuat)

  this.computedRadius   = this.radius.curve(0)
  this.computedCenter   = this.center.curve(0)
  this.computedRotation = this.rotation.curve(0)
  this.computedUp       = [0.1,0,0]
  this.computedEye      = [0.1,0,0]
  this.computedMatrix   = [0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  this.recalcMatrix(0)
}

var proto = OrbitCameraController.prototype

proto.lastT = function() {
  return Math.max(
    this.radius.lastT(),
    this.center.lastT(),
    this.rotation.lastT())
}

proto.recalcMatrix = function(t) {
  this.radius.curve(t)
  this.center.curve(t)
  this.rotation.curve(t)

  var quat = this.computedRotation
  normalize4(quat, quat)

  var mat = this.computedMatrix
  mat4FromQuat(mat, quat)

  var center = this.computedCenter
  var eye    = this.computedEye
  var up     = this.computedUp
  var radius = Math.exp(this.computedRadius[0])

  eye[0] = center[0] + radius * mat[2]
  eye[1] = center[1] + radius * mat[6]
  eye[2] = center[2] + radius * mat[10]
  up[0] = mat[1]
  up[1] = mat[5]
  up[2] = mat[9]

  for(var i=0; i<3; ++i) {
    var rr = 0.0
    for(var j=0; j<3; ++j) {
      rr += mat[i+4*j] * eye[j]
    }
    mat[12+i] = -rr
  }
}

proto.getMatrix = function(t, result) {
  this.recalcMatrix(t)
  var m = this.computedMatrix
  if(result) {
    for(var i=0; i<16; ++i) {
      result[i] = m[i]
    }
    return result
  }
  return m
}

proto.idle = function(t) {
  this.center.idle(t)
  this.radius.idle(t)
  this.rotation.idle(t)
}

proto.flush = function(t) {
  this.center.flush(t)
  this.radius.flush(t)
  this.rotation.flush(t)
}

proto.pan = function(t, dx, dy, dz) {
  dx = dx || 0.0
  dy = dy || 0.0
  dz = dz || 0.0

  this.recalcMatrix(t)
  var mat = this.computedMatrix

  var ux = mat[1]
  var uy = mat[5]
  var uz = mat[9]
  var ul = len3(ux, uy, uz)
  ux /= ul
  uy /= ul
  uz /= ul

  var rx = mat[0]
  var ry = mat[4]
  var rz = mat[8]
  var ru = rx * ux + ry * uy + rz * uz
  rx -= ux * ru
  ry -= uy * ru
  rz -= uz * ru
  var rl = len3(rx, ry, rz)
  rx /= rl
  ry /= rl
  rz /= rl

  var fx = mat[2]
  var fy = mat[6]
  var fz = mat[10]
  var fu = fx * ux + fy * uy + fz * uz
  var fr = fx * rx + fy * ry + fz * rz
  fx -= fu * ux + fr * rx
  fy -= fu * uy + fr * ry
  fz -= fu * uz + fr * rz
  var fl = len3(fx, fy, fz)
  fx /= fl
  fy /= fl
  fz /= fl

  var vx = rx * dx + ux * dy
  var vy = ry * dx + uy * dy
  var vz = rz * dx + uz * dy

  this.center.move(t, vx, vy, vz)

  //Update z-component of radius
  var radius = Math.exp(this.computedRadius[0])
  radius = Math.max(1e-4, radius + dz)
  this.radius.set(t, Math.log(radius))
}

proto.rotate = function(t, dx, dy, dz) {
  this.recalcMatrix(t)

  dx = dx||0.0
  dy = dy||0.0

  var mat = this.computedMatrix

  var rx = mat[0]
  var ry = mat[4]
  var rz = mat[8]

  var ux = mat[1]
  var uy = mat[5]
  var uz = mat[9]

  var fx = mat[2]
  var fy = mat[6]
  var fz = mat[10]

  var qx = dx * rx + dy * ux
  var qy = dx * ry + dy * uy
  var qz = dx * rz + dy * uz

  var bx = -(fy * qz - fz * qy)
  var by = -(fz * qx - fx * qz)
  var bz = -(fx * qy - fy * qx)  
  var bw = Math.sqrt(Math.max(0.0, 1.0 - Math.pow(bx,2) - Math.pow(by,2) - Math.pow(bz,2)))
  var bl = len4(bx, by, bz, bw)
  if(bl > 1e-6) {
    bx /= bl
    by /= bl
    bz /= bl
    bw /= bl
  } else {
    bx = by = bz = 0.0
    bw = 1.0
  }

  var rotation = this.computedRotation
  var ax = rotation[0]
  var ay = rotation[1]
  var az = rotation[2]
  var aw = rotation[3]

  var cx = ax*bw + aw*bx + ay*bz - az*by
  var cy = ay*bw + aw*by + az*bx - ax*bz
  var cz = az*bw + aw*bz + ax*by - ay*bx
  var cw = aw*bw - ax*bx - ay*by - az*bz
  
  //Apply roll
  if(dz) {
    bx = fx
    by = fy
    bz = fz
    var s = Math.sin(dz) / len3(bx, by, bz)
    bx *= s
    by *= s
    bz *= s
    bw = Math.cos(dx)
    cx = cx*bw + cw*bx + cy*bz - cz*by
    cy = cy*bw + cw*by + cz*bx - cx*bz
    cz = cz*bw + cw*bz + cx*by - cy*bx
    cw = cw*bw - cx*bx - cy*by - cz*bz
  }

  var cl = len4(cx, cy, cz, cw)
  if(cl > 1e-6) {
    cx /= cl
    cy /= cl
    cz /= cl
    cw /= cl
  } else {
    cx = cy = cz = 0.0
    cw = 1.0
  }

  this.rotation.set(t, cx, cy, cz, cw)
}

proto.lookAt = function(t, eye, center, up) {
  this.recalcMatrix(t)

  center = center || this.computedCenter
  eye    = eye    || this.computedEye
  up     = up     || this.computedUp

  var mat = this.computedMatrix
  lookAt(mat, eye, center, up)

  var rotation = this.computedRotation
  quatFromFrame(rotation,
    mat[0], mat[1], mat[2],
    mat[4], mat[5], mat[6],
    mat[8], mat[9], mat[10])
  normalize4(rotation, rotation)
  this.rotation.set(t, rotation[0], rotation[1], rotation[2], rotation[3])

  var fl = 0.0
  for(var i=0; i<3; ++i) {
    fl += Math.pow(center[i] - eye[i], 2)
  }
  this.radius.set(t, 0.5 * Math.log(Math.max(fl, 1e-6)))

  this.center.set(t, center[0], center[1], center[2])
}

proto.translate = function(t, dx, dy, dz) {
  this.center.move(t,
    dx||0.0,
    dy||0.0,
    dz||0.0)
}

proto.setMatrix = function(t, matrix) {

  var rotation = this.computedRotation
  quatFromFrame(rotation,
    matrix[0], matrix[1], matrix[2],
    matrix[4], matrix[5], matrix[6],
    matrix[8], matrix[9], matrix[10])
  normalize4(rotation, rotation)
  this.rotation.set(t, rotation[0], rotation[1], rotation[2], rotation[3])

  var mat = this.computedMatrix
  invert44(mat, matrix)
  var w = mat[15]
  if(Math.abs(w) > 1e-6) {
    var cx = mat[12]/w
    var cy = mat[13]/w
    var cz = mat[14]/w

    this.recalcMatrix(t)  
    var r = Math.exp(this.computedRadius[0])
    this.center.set(t, cx-mat[2]*r, cy-mat[6]*r, cz-mat[10]*r)
    this.radius.idle(t)
  } else {
    this.center.idle(t)
    this.radius.idle(t)
  }
}

proto.setDistance = function(t, d) {
  if(d > 0) {
    this.radius.set(t, Math.log(d))
  }
}

proto.setDistanceLimits = function(lo, hi) {
  if(lo > 0) {
    lo = Math.log(lo)
  } else {
    lo = -Infinity    
  }
  if(hi > 0) {
    hi = Math.log(hi)
  } else {
    hi = Infinity
  }
  hi = Math.max(hi, lo)
  this.radius.bounds[0][0] = lo
  this.radius.bounds[1][0] = hi
}

proto.getDistanceLimits = function(out) {
  var bounds = this.radius.bounds
  if(out) {
    out[0] = Math.exp(bounds[0][0])
    out[1] = Math.exp(bounds[1][0])
    return out
  }
  return [ Math.exp(bounds[0][0]), Math.exp(bounds[1][0]) ]
}

proto.toJSON = function() {
  this.recalcMatrix(this.lastT())
  return {
    center:   this.computedCenter.slice(),
    rotation: this.computedRotation.slice(),
    distance: Math.log(this.computedRadius[0]),
    zoomMin:  this.radius.bounds[0][0],
    zoomMax:  this.radius.bounds[1][0]
  }
}

proto.fromJSON = function(options) {
  var t = this.lastT()
  var c = options.center
  if(c) {
    this.center.set(t, c[0], c[1], c[2])
  }
  var r = options.rotation
  if(r) {
    this.rotation.set(t, r[0], r[1], r[2], r[3])
  }
  var d = options.distance
  if(d && d > 0) {
    this.radius.set(t, Math.log(d))
  }
  this.setDistanceLimits(options.zoomMin, options.zoomMax)
}

function createOrbitController(options) {
  options = options || {}
  var center   = options.center   || [0,0,0]
  var rotation = options.rotation || [0,0,0,1]
  var radius   = options.radius   || 1.0

  center = [].slice.call(center, 0, 3)
  rotation = [].slice.call(rotation, 0, 4)
  normalize4(rotation, rotation)

  var result = new OrbitCameraController(
    rotation,
    center,
    Math.log(radius))

  result.setDistanceLimits(options.zoomMin, options.zoomMax)

  if('eye' in options || 'up' in options) {
    result.lookAt(0, options.eye, options.center, options.up)
  }

  return result
}

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = quatFromFrame

function quatFromFrame(
  out,
  rx, ry, rz,
  ux, uy, uz,
  fx, fy, fz) {
  var tr = rx + uy + fz
  if(l > 0) {
    var l = Math.sqrt(tr + 1.0)
    out[0] = 0.5 * (uz - fy) / l
    out[1] = 0.5 * (fx - rz) / l
    out[2] = 0.5 * (ry - uy) / l
    out[3] = 0.5 * l
  } else {
    var tf = Math.max(rx, uy, fz)
    var l = Math.sqrt(2 * tf - tr + 1.0)
    if(rx >= tf) {
      //x y z  order
      out[0] = 0.5 * l
      out[1] = 0.5 * (ux + ry) / l
      out[2] = 0.5 * (fx + rz) / l
      out[3] = 0.5 * (uz - fy) / l
    } else if(uy >= tf) {
      //y z x  order
      out[0] = 0.5 * (ry + ux) / l
      out[1] = 0.5 * l
      out[2] = 0.5 * (fy + uz) / l
      out[3] = 0.5 * (fx - rz) / l
    } else {
      //z x y  order
      out[0] = 0.5 * (rz + fx) / l
      out[1] = 0.5 * (uz + fy) / l
      out[2] = 0.5 * l
      out[3] = 0.5 * (ry - ux) / l
    }
  }
  return out
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bsearch   = __webpack_require__(36)
var m4interp  = __webpack_require__(95)
var invert44  = __webpack_require__(19)
var rotateX   = __webpack_require__(107)
var rotateY   = __webpack_require__(108)
var rotateZ   = __webpack_require__(109)
var lookAt    = __webpack_require__(39)
var translate = __webpack_require__(41)
var scale     = __webpack_require__(43)
var normalize = __webpack_require__(23)

var DEFAULT_CENTER = [0,0,0]

module.exports = createMatrixCameraController

function MatrixCameraController(initialMatrix) {
  this._components    = initialMatrix.slice()
  this._time          = [0]
  this.prevMatrix     = initialMatrix.slice()
  this.nextMatrix     = initialMatrix.slice()
  this.computedMatrix = initialMatrix.slice()
  this.computedInverse = initialMatrix.slice()
  this.computedEye    = [0,0,0]
  this.computedUp     = [0,0,0]
  this.computedCenter = [0,0,0]
  this.computedRadius = [0]
  this._limits        = [-Infinity, Infinity]
}

var proto = MatrixCameraController.prototype

proto.recalcMatrix = function(t) {
  var time = this._time
  var tidx = bsearch.le(time, t)
  var mat = this.computedMatrix
  if(tidx < 0) {
    return
  }
  var comps = this._components
  if(tidx === time.length-1) {
    var ptr = 16*tidx
    for(var i=0; i<16; ++i) {
      mat[i] = comps[ptr++]
    }
  } else {
    var dt = (time[tidx+1] - time[tidx])
    var ptr = 16*tidx
    var prev = this.prevMatrix
    var allEqual = true
    for(var i=0; i<16; ++i) {
      prev[i] = comps[ptr++]
    }
    var next = this.nextMatrix
    for(var i=0; i<16; ++i) {
      next[i] = comps[ptr++]
      allEqual = allEqual && (prev[i] === next[i])
    }
    if(dt < 1e-6 || allEqual) {
      for(var i=0; i<16; ++i) {
        mat[i] = prev[i]
      }
    } else {
      m4interp(mat, prev, next, (t - time[tidx])/dt)
    }
  }

  var up = this.computedUp
  up[0] = mat[1]
  up[1] = mat[5]
  up[2] = mat[9]
  normalize(up, up)

  var imat = this.computedInverse
  invert44(imat, mat)
  var eye = this.computedEye
  var w = imat[15]
  eye[0] = imat[12]/w
  eye[1] = imat[13]/w
  eye[2] = imat[14]/w

  var center = this.computedCenter
  var radius = Math.exp(this.computedRadius[0])
  for(var i=0; i<3; ++i) {
    center[i] = eye[i] - mat[2+4*i] * radius
  }
}

proto.idle = function(t) {
  if(t < this.lastT()) {
    return
  }
  var mc = this._components
  var ptr = mc.length-16
  for(var i=0; i<16; ++i) {
    mc.push(mc[ptr++])
  }
  this._time.push(t)
}

proto.flush = function(t) {
  var idx = bsearch.gt(this._time, t) - 2
  if(idx < 0) {
    return
  }
  this._time.splice(0, idx)
  this._components.splice(0, 16*idx)
}

proto.lastT = function() {
  return this._time[this._time.length-1]
}

proto.lookAt = function(t, eye, center, up) {
  this.recalcMatrix(t)
  eye    = eye || this.computedEye
  center = center || DEFAULT_CENTER
  up     = up || this.computedUp
  this.setMatrix(t, lookAt(this.computedMatrix, eye, center, up))
  var d2 = 0.0
  for(var i=0; i<3; ++i) {
    d2 += Math.pow(center[i] - eye[i], 2)
  }
  d2 = Math.log(Math.sqrt(d2))
  this.computedRadius[0] = d2
}

proto.rotate = function(t, yaw, pitch, roll) {
  this.recalcMatrix(t)
  var mat = this.computedInverse
  if(yaw)   rotateY(mat, mat, yaw)
  if(pitch) rotateX(mat, mat, pitch)
  if(roll)  rotateZ(mat, mat, roll)
  this.setMatrix(t, invert44(this.computedMatrix, mat))
}

var tvec = [0,0,0]

proto.pan = function(t, dx, dy, dz) {
  tvec[0] = -(dx || 0.0)
  tvec[1] = -(dy || 0.0)
  tvec[2] = -(dz || 0.0)
  this.recalcMatrix(t)
  var mat = this.computedInverse
  translate(mat, mat, tvec)
  this.setMatrix(t, invert44(mat, mat))
}

proto.translate = function(t, dx, dy, dz) {
  tvec[0] = dx || 0.0
  tvec[1] = dy || 0.0
  tvec[2] = dz || 0.0
  this.recalcMatrix(t)
  var mat = this.computedMatrix
  translate(mat, mat, tvec)
  this.setMatrix(t, mat)
}

proto.setMatrix = function(t, mat) {
  if(t < this.lastT()) {
    return
  }
  this._time.push(t)
  for(var i=0; i<16; ++i) {
    this._components.push(mat[i])
  }
}

proto.setDistance = function(t, d) {
  this.computedRadius[0] = d
}

proto.setDistanceLimits = function(a,b) {
  var lim = this._limits
  lim[0] = a
  lim[1] = b
}

proto.getDistanceLimits = function(out) {
  var lim = this._limits
  if(out) {
    out[0] = lim[0]
    out[1] = lim[1]
    return out
  }
  return lim
}

function createMatrixCameraController(options) {
  options = options || {}
  var matrix = options.matrix || 
              [1,0,0,0,
               0,1,0,0,
               0,0,1,0,
               0,0,0,1]
  return new MatrixCameraController(matrix)
}


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var lerp = __webpack_require__(96)

var recompose = __webpack_require__(97)
var decompose = __webpack_require__(100)
var determinant = __webpack_require__(44)
var slerp = __webpack_require__(105)

var state0 = state()
var state1 = state()
var tmp = state()

module.exports = interpolate
function interpolate(out, start, end, alpha) {
    if (determinant(start) === 0 || determinant(end) === 0)
        return false

    //decompose the start and end matrices into individual components
    var r0 = decompose(start, state0.translate, state0.scale, state0.skew, state0.perspective, state0.quaternion)
    var r1 = decompose(end, state1.translate, state1.scale, state1.skew, state1.perspective, state1.quaternion)
    if (!r0 || !r1)
        return false    


    //now lerp/slerp the start and end components into a temporary     lerp(tmptranslate, state0.translate, state1.translate, alpha)
    lerp(tmp.translate, state0.translate, state1.translate, alpha)
    lerp(tmp.skew, state0.skew, state1.skew, alpha)
    lerp(tmp.scale, state0.scale, state1.scale, alpha)
    lerp(tmp.perspective, state0.perspective, state1.perspective, alpha)
    slerp(tmp.quaternion, state0.quaternion, state1.quaternion, alpha)

    //and recompose into our 'out' matrix
    recompose(out, tmp.translate, tmp.scale, tmp.skew, tmp.perspective, tmp.quaternion)
    return true
}

function state() {
    return {
        translate: vec3(),
        scale: vec3(1),
        skew: vec3(),
        perspective: vec4(),
        quaternion: vec4()
    }
}

function vec3(n) {
    return [n||0,n||0,n||0]
}

function vec4() {
    return [0,0,0,1]
}

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = lerp;

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2]
    out[0] = ax + t * (b[0] - ax)
    out[1] = ay + t * (b[1] - ay)
    out[2] = az + t * (b[2] - az)
    return out
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

/*
Input:  translation ; a 3 component vector
        scale       ; a 3 component vector
        skew        ; skew factors XY,XZ,YZ represented as a 3 component vector
        perspective ; a 4 component vector
        quaternion  ; a 4 component vector
Output: matrix      ; a 4x4 matrix

From: http://www.w3.org/TR/css3-transforms/#recomposing-to-a-3d-matrix
*/

var mat4 = {
    identity: __webpack_require__(40),
    translate: __webpack_require__(41),
    multiply: __webpack_require__(98),
    create: __webpack_require__(42),
    scale: __webpack_require__(43),
    fromRotationTranslation: __webpack_require__(99)
}

var rotationMatrix = mat4.create()
var temp = mat4.create()

module.exports = function recomposeMat4(matrix, translation, scale, skew, perspective, quaternion) {
    mat4.identity(matrix)

    //apply translation & rotation
    mat4.fromRotationTranslation(matrix, quaternion, translation)

    //apply perspective
    matrix[3] = perspective[0]
    matrix[7] = perspective[1]
    matrix[11] = perspective[2]
    matrix[15] = perspective[3]
        
    // apply skew
    // temp is a identity 4x4 matrix initially
    mat4.identity(temp)

    if (skew[2] !== 0) {
        temp[9] = skew[2]
        mat4.multiply(matrix, matrix, temp)
    }

    if (skew[1] !== 0) {
        temp[9] = 0
        temp[8] = skew[1]
        mat4.multiply(matrix, matrix, temp)
    }

    if (skew[0] !== 0) {
        temp[8] = 0
        temp[4] = skew[0]
        mat4.multiply(matrix, matrix, temp)
    }

    //apply scale
    mat4.scale(matrix, matrix, scale)
    return matrix
}

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = multiply;

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = fromRotationTranslation;

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint unused:true*/
/*
Input:  matrix      ; a 4x4 matrix
Output: translation ; a 3 component vector
        scale       ; a 3 component vector
        skew        ; skew factors XY,XZ,YZ represented as a 3 component vector
        perspective ; a 4 component vector
        quaternion  ; a 4 component vector
Returns false if the matrix cannot be decomposed, true if it can


References:
https://github.com/kamicane/matrix3d/blob/master/lib/Matrix3d.js
https://github.com/ChromiumWebApps/chromium/blob/master/ui/gfx/transform_util.cc
http://www.w3.org/TR/css3-transforms/#decomposing-a-3d-matrix
*/

var normalize = __webpack_require__(101)

var create = __webpack_require__(42)
var clone = __webpack_require__(102)
var determinant = __webpack_require__(44)
var invert = __webpack_require__(19)
var transpose = __webpack_require__(103)
var vec3 = {
    length: __webpack_require__(104),
    normalize: __webpack_require__(23),
    dot: __webpack_require__(38),
    cross: __webpack_require__(37)
}

var tmp = create()
var perspectiveMatrix = create()
var tmpVec4 = [0, 0, 0, 0]
var row = [ [0,0,0], [0,0,0], [0,0,0] ]
var pdum3 = [0,0,0]

module.exports = function decomposeMat4(matrix, translation, scale, skew, perspective, quaternion) {
    if (!translation) translation = [0,0,0]
    if (!scale) scale = [0,0,0]
    if (!skew) skew = [0,0,0]
    if (!perspective) perspective = [0,0,0,1]
    if (!quaternion) quaternion = [0,0,0,1]

    //normalize, if not possible then bail out early
    if (!normalize(tmp, matrix))
        return false

    // perspectiveMatrix is used to solve for perspective, but it also provides
    // an easy way to test for singularity of the upper 3x3 component.
    clone(perspectiveMatrix, tmp)

    perspectiveMatrix[3] = 0
    perspectiveMatrix[7] = 0
    perspectiveMatrix[11] = 0
    perspectiveMatrix[15] = 1

    // If the perspectiveMatrix is not invertible, we are also unable to
    // decompose, so we'll bail early. Constant taken from SkMatrix44::invert.
    if (Math.abs(determinant(perspectiveMatrix) < 1e-8))
        return false

    var a03 = tmp[3], a13 = tmp[7], a23 = tmp[11],
            a30 = tmp[12], a31 = tmp[13], a32 = tmp[14], a33 = tmp[15]

    // First, isolate perspective.
    if (a03 !== 0 || a13 !== 0 || a23 !== 0) {
        tmpVec4[0] = a03
        tmpVec4[1] = a13
        tmpVec4[2] = a23
        tmpVec4[3] = a33

        // Solve the equation by inverting perspectiveMatrix and multiplying
        // rightHandSide by the inverse.
        // resuing the perspectiveMatrix here since it's no longer needed
        var ret = invert(perspectiveMatrix, perspectiveMatrix)
        if (!ret) return false
        transpose(perspectiveMatrix, perspectiveMatrix)

        //multiply by transposed inverse perspective matrix, into perspective vec4
        vec4multMat4(perspective, tmpVec4, perspectiveMatrix)
    } else { 
        //no perspective
        perspective[0] = perspective[1] = perspective[2] = 0
        perspective[3] = 1
    }

    // Next take care of translation
    translation[0] = a30
    translation[1] = a31
    translation[2] = a32

    // Now get scale and shear. 'row' is a 3 element array of 3 component vectors
    mat3from4(row, tmp)

    // Compute X scale factor and normalize first row.
    scale[0] = vec3.length(row[0])
    vec3.normalize(row[0], row[0])

    // Compute XY shear factor and make 2nd row orthogonal to 1st.
    skew[0] = vec3.dot(row[0], row[1])
    combine(row[1], row[1], row[0], 1.0, -skew[0])

    // Now, compute Y scale and normalize 2nd row.
    scale[1] = vec3.length(row[1])
    vec3.normalize(row[1], row[1])
    skew[0] /= scale[1]

    // Compute XZ and YZ shears, orthogonalize 3rd row
    skew[1] = vec3.dot(row[0], row[2])
    combine(row[2], row[2], row[0], 1.0, -skew[1])
    skew[2] = vec3.dot(row[1], row[2])
    combine(row[2], row[2], row[1], 1.0, -skew[2])

    // Next, get Z scale and normalize 3rd row.
    scale[2] = vec3.length(row[2])
    vec3.normalize(row[2], row[2])
    skew[1] /= scale[2]
    skew[2] /= scale[2]


    // At this point, the matrix (in rows) is orthonormal.
    // Check for a coordinate system flip.  If the determinant
    // is -1, then negate the matrix and the scaling factors.
    vec3.cross(pdum3, row[1], row[2])
    if (vec3.dot(row[0], pdum3) < 0) {
        for (var i = 0; i < 3; i++) {
            scale[i] *= -1;
            row[i][0] *= -1
            row[i][1] *= -1
            row[i][2] *= -1
        }
    }

    // Now, get the rotations out
    quaternion[0] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] - row[1][1] - row[2][2], 0))
    quaternion[1] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] + row[1][1] - row[2][2], 0))
    quaternion[2] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] - row[1][1] + row[2][2], 0))
    quaternion[3] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] + row[1][1] + row[2][2], 0))

    if (row[2][1] > row[1][2])
        quaternion[0] = -quaternion[0]
    if (row[0][2] > row[2][0])
        quaternion[1] = -quaternion[1]
    if (row[1][0] > row[0][1])
        quaternion[2] = -quaternion[2]
    return true
}

//will be replaced by gl-vec4 eventually
function vec4multMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
}

//gets upper-left of a 4x4 matrix into a 3x3 of vectors
function mat3from4(out, mat4x4) {
    out[0][0] = mat4x4[0]
    out[0][1] = mat4x4[1]
    out[0][2] = mat4x4[2]
    
    out[1][0] = mat4x4[4]
    out[1][1] = mat4x4[5]
    out[1][2] = mat4x4[6]

    out[2][0] = mat4x4[8]
    out[2][1] = mat4x4[9]
    out[2][2] = mat4x4[10]
}

function combine(out, a, b, scale1, scale2) {
    out[0] = a[0] * scale1 + b[0] * scale2
    out[1] = a[1] * scale1 + b[1] * scale2
    out[2] = a[2] * scale1 + b[2] * scale2
}

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = function normalize(out, mat) {
    var m44 = mat[15]
    // Cannot normalize.
    if (m44 === 0) 
        return false
    var scale = 1 / m44
    for (var i=0; i<16; i++)
        out[i] = mat[i] * scale
    return true
}

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = clone;

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = transpose;

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = length;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    return Math.sqrt(x*x + y*y + z*z)
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(106)

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = slerp

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
function slerp (out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations

  var ax = a[0], ay = a[1], az = a[2], aw = a[3],
    bx = b[0], by = b[1], bz = b[2], bw = b[3]

  var omega, cosom, sinom, scale0, scale1

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw
  // adjust signs (if necessary)
  if (cosom < 0.0) {
    cosom = -cosom
    bx = -bx
    by = -by
    bz = -bz
    bw = -bw
  }
  // calculate coefficients
  if ((1.0 - cosom) > 0.000001) {
    // standard case (slerp)
    omega = Math.acos(cosom)
    sinom = Math.sin(omega)
    scale0 = Math.sin((1.0 - t) * omega) / sinom
    scale1 = Math.sin(t * omega) / sinom
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t
    scale1 = t
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx
  out[1] = scale0 * ay + scale1 * by
  out[2] = scale0 * az + scale1 * bz
  out[3] = scale0 * aw + scale1 * bw

  return out
}


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = rotateX;

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = rotateY;

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = rotateZ;

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = mouseListen

var mouse = __webpack_require__(111)

function mouseListen (element, callback) {
  if (!callback) {
    callback = element
    element = window
  }

  var buttonState = 0
  var x = 0
  var y = 0
  var mods = {
    shift: false,
    alt: false,
    control: false,
    meta: false
  }
  var attached = false

  function updateMods (ev) {
    var changed = false
    if ('altKey' in ev) {
      changed = changed || ev.altKey !== mods.alt
      mods.alt = !!ev.altKey
    }
    if ('shiftKey' in ev) {
      changed = changed || ev.shiftKey !== mods.shift
      mods.shift = !!ev.shiftKey
    }
    if ('ctrlKey' in ev) {
      changed = changed || ev.ctrlKey !== mods.control
      mods.control = !!ev.ctrlKey
    }
    if ('metaKey' in ev) {
      changed = changed || ev.metaKey !== mods.meta
      mods.meta = !!ev.metaKey
    }
    return changed
  }

  function handleEvent (nextButtons, ev) {
    var nextX = mouse.x(ev)
    var nextY = mouse.y(ev)
    if ('buttons' in ev) {
      nextButtons = ev.buttons | 0
    }
    if (nextButtons !== buttonState ||
      nextX !== x ||
      nextY !== y ||
      updateMods(ev)) {
      buttonState = nextButtons | 0
      x = nextX || 0
      y = nextY || 0
      callback && callback(buttonState, x, y, mods)
    }
  }

  function clearState (ev) {
    handleEvent(0, ev)
  }

  function handleBlur () {
    if (buttonState ||
      x ||
      y ||
      mods.shift ||
      mods.alt ||
      mods.meta ||
      mods.control) {
      x = y = 0
      buttonState = 0
      mods.shift = mods.alt = mods.control = mods.meta = false
      callback && callback(0, 0, 0, mods)
    }
  }

  function handleMods (ev) {
    if (updateMods(ev)) {
      callback && callback(buttonState, x, y, mods)
    }
  }

  function handleMouseMove (ev) {
    if (mouse.buttons(ev) === 0) {
      handleEvent(0, ev)
    } else {
      handleEvent(buttonState, ev)
    }
  }

  function handleMouseDown (ev) {
    handleEvent(buttonState | mouse.buttons(ev), ev)
  }

  function handleMouseUp (ev) {
    handleEvent(buttonState & ~mouse.buttons(ev), ev)
  }

  function attachListeners () {
    if (attached) {
      return
    }
    attached = true

    element.addEventListener('mousemove', handleMouseMove)

    element.addEventListener('mousedown', handleMouseDown)

    element.addEventListener('mouseup', handleMouseUp)

    element.addEventListener('mouseleave', clearState)
    element.addEventListener('mouseenter', clearState)
    element.addEventListener('mouseout', clearState)
    element.addEventListener('mouseover', clearState)

    element.addEventListener('blur', handleBlur)

    element.addEventListener('keyup', handleMods)
    element.addEventListener('keydown', handleMods)
    element.addEventListener('keypress', handleMods)

    if (element !== window) {
      window.addEventListener('blur', handleBlur)

      window.addEventListener('keyup', handleMods)
      window.addEventListener('keydown', handleMods)
      window.addEventListener('keypress', handleMods)
    }
  }

  function detachListeners () {
    if (!attached) {
      return
    }
    attached = false

    element.removeEventListener('mousemove', handleMouseMove)

    element.removeEventListener('mousedown', handleMouseDown)

    element.removeEventListener('mouseup', handleMouseUp)

    element.removeEventListener('mouseleave', clearState)
    element.removeEventListener('mouseenter', clearState)
    element.removeEventListener('mouseout', clearState)
    element.removeEventListener('mouseover', clearState)

    element.removeEventListener('blur', handleBlur)

    element.removeEventListener('keyup', handleMods)
    element.removeEventListener('keydown', handleMods)
    element.removeEventListener('keypress', handleMods)

    if (element !== window) {
      window.removeEventListener('blur', handleBlur)

      window.removeEventListener('keyup', handleMods)
      window.removeEventListener('keydown', handleMods)
      window.removeEventListener('keypress', handleMods)
    }
  }

  // Attach listeners
  attachListeners()

  var result = {
    element: element
  }

  Object.defineProperties(result, {
    enabled: {
      get: function () { return attached },
      set: function (f) {
        if (f) {
          attachListeners()
        } else {
          detachListeners()
        }
      },
      enumerable: true
    },
    buttons: {
      get: function () { return buttonState },
      enumerable: true
    },
    x: {
      get: function () { return x },
      enumerable: true
    },
    y: {
      get: function () { return y },
      enumerable: true
    },
    mods: {
      get: function () { return mods },
      enumerable: true
    }
  })

  return result
}


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function mouseButtons(ev) {
  if(typeof ev === 'object') {
    if('buttons' in ev) {
      return ev.buttons
    } else if('which' in ev) {
      var b = ev.which
      if(b === 2) {
        return 4
      } else if(b === 3) {
        return 2
      } else if(b > 0) {
        return 1<<(b-1)
      }
    } else if('button' in ev) {
      var b = ev.button
      if(b === 1) {
        return 4
      } else if(b === 2) {
        return 2
      } else if(b >= 0) {
        return 1<<b
      }
    }
  }
  return 0
}
exports.buttons = mouseButtons

function mouseElement(ev) {
  return ev.target || ev.srcElement || window
}
exports.element = mouseElement

function mouseRelativeX(ev) {
  if(typeof ev === 'object') {
    if('offsetX' in ev) {
      return ev.offsetX
    }
    var target = mouseElement(ev)
    var bounds = target.getBoundingClientRect()
    return ev.clientX - bounds.left
  }
  return 0
}
exports.x = mouseRelativeX

function mouseRelativeY(ev) {
  if(typeof ev === 'object') {
    if('offsetY' in ev) {
      return ev.offsetY
    }
    var target = mouseElement(ev)
    var bounds = target.getBoundingClientRect()
    return ev.clientY - bounds.top
  }
  return 0
}
exports.y = mouseRelativeY


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toPX = __webpack_require__(113)

module.exports = mouseWheelListen

function mouseWheelListen(element, callback, noScroll) {
  if(typeof element === 'function') {
    noScroll = !!callback
    callback = element
    element = window
  }
  var lineHeight = toPX('ex', element)
  var listener = function(ev) {
    if(noScroll) {
      ev.preventDefault()
    }
    var dx = ev.deltaX || 0
    var dy = ev.deltaY || 0
    var dz = ev.deltaZ || 0
    var mode = ev.deltaMode
    var scale = 1
    switch(mode) {
      case 1:
        scale = lineHeight
      break
      case 2:
        scale = window.innerHeight
      break
    }
    dx *= scale
    dy *= scale
    dz *= scale
    if(dx || dy || dz) {
      return callback(dx, dy, dz, ev)
    }
  }
  element.addEventListener('wheel', listener)
  return listener
}


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseUnit = __webpack_require__(114)

module.exports = toPX

var PIXELS_PER_INCH = getSizeBrutal('in', document.body) // 96


function getPropertyInPX(element, prop) {
  var parts = parseUnit(getComputedStyle(element).getPropertyValue(prop))
  return parts[0] * toPX(parts[1], element)
}

//This brutal hack is needed
function getSizeBrutal(unit, element) {
  var testDIV = document.createElement('div')
  testDIV.style['height'] = '128' + unit
  element.appendChild(testDIV)
  var size = getPropertyInPX(testDIV, 'height') / 128
  element.removeChild(testDIV)
  return size
}

function toPX(str, element) {
  if (!str) return null

  element = element || document.body
  str = (str + '' || 'px').trim().toLowerCase()
  if(element === window || element === document) {
    element = document.body
  }

  switch(str) {
    case '%':  //Ambiguous, not sure if we should use width or height
      return element.clientHeight / 100.0
    case 'ch':
    case 'ex':
      return getSizeBrutal(str, element)
    case 'em':
      return getPropertyInPX(element, 'font-size')
    case 'rem':
      return getPropertyInPX(document.body, 'font-size')
    case 'vw':
      return window.innerWidth/100
    case 'vh':
      return window.innerHeight/100
    case 'vmin':
      return Math.min(window.innerWidth, window.innerHeight) / 100
    case 'vmax':
      return Math.max(window.innerWidth, window.innerHeight) / 100
    case 'in':
      return PIXELS_PER_INCH
    case 'cm':
      return PIXELS_PER_INCH / 2.54
    case 'mm':
      return PIXELS_PER_INCH / 25.4
    case 'pt':
      return PIXELS_PER_INCH / 72
    case 'pc':
      return PIXELS_PER_INCH / 6
    case 'px':
      return 1
  }

  // detect number of units
  var parts = parseUnit(str)
  if (!isNaN(parts[0]) && parts[1]) {
    var px = toPX(parts[1], element)
    return typeof px === 'number' ? parts[0] * px : null
  }

  return null
}


/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = function parseUnit(str, out) {
    if (!out)
        out = [ 0, '' ]

    str = String(str)
    var num = parseFloat(str, 10)
    out[0] = num
    out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
    return out
}

/***/ }),
/* 115 */
/***/ (function(module, exports) {

var rootPosition = { left: 0, top: 0 }

module.exports = mouseEventOffset
function mouseEventOffset (ev, target, out) {
  target = target || ev.currentTarget || ev.srcElement
  if (!Array.isArray(out)) {
    out = [ 0, 0 ]
  }
  var cx = ev.clientX || 0
  var cy = ev.clientY || 0
  var rect = getBoundingClientOffset(target)
  out[0] = cx - rect.left
  out[1] = cy - rect.top
  return out
}

function getBoundingClientOffset (element) {
  if (element === window ||
      element === document ||
      element === document.body) {
    return rootPosition
  } else {
    return element.getBoundingClientRect()
  }
}


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isBrowser = __webpack_require__(117)

function detect() {
	var supported = false

	try {
		var opts = Object.defineProperty({}, 'passive', {
			get: function() {
				supported = true
			}
		})

		window.addEventListener('test', null, opts)
		window.removeEventListener('test', null, opts)
	} catch(e) {
		supported = false
	}

	return supported
}

module.exports = isBrowser && detect()


/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gl_matrix__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals__ = __webpack_require__(9);


var activeProgram = null;
class Shader {
    constructor(type, source) {
        this.shader = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].createShader(type);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].shaderSource(this.shader, source);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].compileShader(this.shader);
        if (!__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getShaderParameter(this.shader, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].COMPILE_STATUS)) {
            throw __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getShaderInfoLog(this.shader);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Shader;

;
class ShaderProgram {
    constructor(shaders) {
        this.prog = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].createProgram();
        for (let shader of shaders) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].attachShader(this.prog, shader.shader);
        }
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].linkProgram(this.prog);
        if (!__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getProgramParameter(this.prog, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].LINK_STATUS)) {
            throw __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getProgramInfoLog(this.prog);
        }
        this.attrPos = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_Pos");
        this.attrCol = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_Col");
        this.attrNor = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_Nor");
        this.attrMeshId = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_MeshId");
        this.attrInstanceId = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_InstanceId");
        this.attrTranslate = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_Translate");
        this.attrUV = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_UV");
        this.attrTransform1 = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_Transform1");
        this.attrTransform2 = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_Transform2");
        this.attrTransform3 = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_Transform3");
        this.attrTransform4 = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getAttribLocation(this.prog, "vs_Transform4");
        this.unifModel = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_Model");
        this.unifModelInvTr = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_ModelInvTr");
        this.unifViewProj = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_ViewProj");
        this.unifCameraAxes = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_CameraAxes");
        this.unifTime = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_Time");
        this.unifEye = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_Eye");
        this.unifRef = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_Ref");
        this.unifUp = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_Up");
        // Textures
        this.unifBarkTexture = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_barkTexture");
        this.unifLeafTexture = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_leafTexture");
        this.unifLeafTexture2 = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_leafTexture2");
        this.unifPotTexture = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_potTexture");
        this.unifGroundTexture = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_groundTexture");
        this.unifMulchTexture = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_mulchTexture");
        this.unifAppleTexture1 = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_appleTexture1");
        this.unifAppleTexture2 = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].getUniformLocation(this.prog, "u_appleTexture2");
    }
    use() {
        if (activeProgram !== this.prog) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].useProgram(this.prog);
            activeProgram = this.prog;
        }
    }
    createTexture(url) {
        // setting up texture in OpenGL
        let texture = __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].createTexture();
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, texture);
        // Fill the texture with a 1x1 blue pixel.
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].texImage2D(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, 0, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].RGBA, 1, 1, 0, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
        // Asynchronously load an image
        var image = new Image();
        image.src = url;
        image.crossOrigin = "anonymous";
        console.log(image.src);
        image.addEventListener('load', function () {
            // Now that the image has loaded make copy it to the texture.
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, texture);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].texImage2D(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, 0, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].UNSIGNED_BYTE, image);
            // Check if the image is a power of 2 in both dimensions.
            if (ShaderProgram.isPowerOf2(image.width) && ShaderProgram.isPowerOf2(image.height)) {
                // Yes, it's a power of 2. Generate mips.
                __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].generateMipmap(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D);
            }
            else {
                // No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
                __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_WRAP_S, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].CLAMP_TO_EDGE);
                __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_WRAP_T, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].CLAMP_TO_EDGE);
                __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_MIN_FILTER, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].LINEAR);
            }
        });
        return texture;
    }
    static isPowerOf2(value) {
        return (value & (value - 1)) === 0;
    }
    setTextures() {
        this.use();
        this.barkTexture = this.createTexture('./src/textures/bark.jpg');
        this.leafTexture = this.createTexture('./src/textures/leaf1.png');
        this.leafTexture2 = this.createTexture('./src/textures/leaf9.png');
        this.potTexture = this.createTexture('./src/textures/terracotta.jpg');
        this.groundTexture = this.createTexture('./src/textures/ground.jpg');
        this.appleTexture1 = this.createTexture('./src/textures/apple1.jpg');
        this.appleTexture2 = this.createTexture('./src/textures/apple2.jpg');
        this.mulchTexture = this.createTexture('./src/textures/mulch.jpg');
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifBarkTexture, 0);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifLeafTexture, 1);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifPotTexture, 2);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifGroundTexture, 3);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifMulchTexture, 4);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifAppleTexture1, 5);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifAppleTexture2, 6);
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifLeafTexture2, 7);
    }
    setEyeRefUp(eye, ref, up) {
        this.use();
        if (this.unifEye !== -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform3f(this.unifEye, eye[0], eye[1], eye[2]);
        }
        if (this.unifRef !== -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform3f(this.unifRef, ref[0], ref[1], ref[2]);
        }
        if (this.unifUp !== -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform3f(this.unifUp, up[0], up[1], up[2]);
        }
    }
    setDimensions(width, height) {
        this.use();
        if (this.unifDimensions !== -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform2f(this.unifDimensions, width, height);
        }
    }
    setModelMatrix(model) {
        this.use();
        if (this.unifModel !== -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniformMatrix4fv(this.unifModel, false, model);
        }
        if (this.unifModelInvTr !== -1) {
            let modelinvtr = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
            __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].transpose(modelinvtr, model);
            __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].invert(modelinvtr, modelinvtr);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniformMatrix4fv(this.unifModelInvTr, false, modelinvtr);
        }
    }
    setViewProjMatrix(vp) {
        this.use();
        if (this.unifViewProj !== -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniformMatrix4fv(this.unifViewProj, false, vp);
        }
    }
    setCameraAxes(axes) {
        this.use();
        if (this.unifCameraAxes !== -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniformMatrix3fv(this.unifCameraAxes, false, axes);
        }
    }
    setTime(t) {
        this.use();
        if (this.unifTime !== -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1f(this.unifTime, t);
        }
    }
    draw(d) {
        this.use();
        if (this.attrPos != -1 && d.bindPos()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrPos);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrPos, 4, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrPos, 0); // Advance 1 index in pos VBO for each vertex
        }
        if (this.attrNor != -1 && d.bindNor()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrNor);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrNor, 4, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrNor, 0); // Advance 1 index in nor VBO for each vertex
        }
        if (this.attrCol != -1 && d.bindCol()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrCol);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrCol, 4, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrCol, 1); // Advance 1 index in col VBO for each drawn instance
        }
        if (this.attrTranslate != -1 && d.bindTranslate()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrTranslate);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrTranslate, 3, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrTranslate, 1); // Advance 1 index in translate VBO for each drawn instance
        }
        if (this.attrUV != -1 && d.bindUV()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrUV);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrUV, 2, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrUV, 0); // Advance 1 index in pos VBO for each vertex
        }
        if (this.attrMeshId != -1 && d.bindMeshId()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrMeshId);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrMeshId, 2, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrMeshId, 0); // Advance 1 index in pos VBO for each vertex
        }
        if (this.attrInstanceId != -1 && d.bindInstanceId()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrInstanceId);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrInstanceId, 4, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrInstanceId, 1); // Advance 1 index in pos VBO for each vertex
        }
        // TODO: Set up attribute data for additional instanced rendering data as needed
        if (this.attrTransform1 != -1 && d.bindTransform1()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrTransform1);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrTransform1, 4, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrTransform1, 1); // Advance 1 index in pos VBO for each vertex
        }
        if (this.attrTransform2 != -1 && d.bindTransform2()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrTransform2);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrTransform2, 4, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrTransform2, 1); // Advance 1 index in pos VBO for each vertex
        }
        if (this.attrTransform3 != -1 && d.bindTransform3()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrTransform3);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrTransform3, 4, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrTransform3, 1); // Advance 1 index in pos VBO for each vertex
        }
        if (this.attrTransform4 != -1 && d.bindTransform4()) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].enableVertexAttribArray(this.attrTransform4);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribPointer(this.attrTransform4, 4, __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].FLOAT, false, 0, 0);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].vertexAttribDivisor(this.attrTransform4, 1); // Advance 1 index in pos VBO for each vertex
        }
        if (this.unifBarkTexture != -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE0); //GL supports up to 32 different active textures at once(0 - 31)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, this.barkTexture);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifBarkTexture, 0);
        }
        if (this.unifLeafTexture != -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE1); //GL supports up to 32 different active textures at once(0 - 31)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, this.leafTexture);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifLeafTexture, 1);
        }
        if (this.unifPotTexture != -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE2); //GL supports up to 32 different active textures at once(0 - 31)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, this.potTexture);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifPotTexture, 2);
        }
        if (this.unifGroundTexture != -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE3); //GL supports up to 32 different active textures at once(0 - 31)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, this.groundTexture);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifGroundTexture, 3);
        }
        if (this.unifMulchTexture != -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE4); //GL supports up to 32 different active textures at once(0 - 31)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, this.mulchTexture);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifMulchTexture, 4);
        }
        if (this.unifAppleTexture1 != -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE5); //GL supports up to 32 different active textures at once(0 - 31)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, this.appleTexture1);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifAppleTexture1, 5);
        }
        if (this.unifAppleTexture2 != -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE6); //GL supports up to 32 different active textures at once(0 - 31)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, this.appleTexture2);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifAppleTexture2, 6);
        }
        if (this.unifLeafTexture2 != -1) {
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE7); //GL supports up to 32 different active textures at once(0 - 31)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].TEXTURE_2D, this.leafTexture2);
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].uniform1i(this.unifLeafTexture2, 7);
        }
        d.bindIdx();
        // drawElementsInstanced uses the vertexAttribDivisor for each "in" variable to
        // determine how to link it to each drawn instance of the bound VBO.
        // For example, the index used to look in the VBO associated with
        // vs_Pos (attrPos) is advanced by 1 for each thread of the GPU running the
        // vertex shader since its divisor is 0.
        // On the other hand, the index used to look in the VBO associated with
        // vs_Translate (attrTranslate) is advanced by 1 only when the next instance
        // of our drawn object (in the base code example, the square) is processed
        // by the GPU, thus being the same value for the first set of four vertices,
        // then advancing to a new value for the next four, then the next four, and
        // so on.
        __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].drawElementsInstanced(d.drawMode(), d.elemCount(), __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].UNSIGNED_INT, 0, d.numInstances);
        if (this.attrPos != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrPos);
        if (this.attrNor != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrNor);
        if (this.attrCol != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrCol);
        if (this.attrMeshId != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrMeshId);
        if (this.attrInstanceId != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrInstanceId);
        if (this.attrTranslate != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrTranslate);
        if (this.attrUV != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrUV);
        if (this.attrTransform1 != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrTransform1);
        if (this.attrTransform2 != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrTransform2);
        if (this.attrTransform3 != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrTransform3);
        if (this.attrTransform4 != -1)
            __WEBPACK_IMPORTED_MODULE_1__globals__["a" /* gl */].disableVertexAttribArray(this.attrTransform4);
    }
}
;
/* harmony default export */ __webpack_exports__["b"] = (ShaderProgram);


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gl_matrix__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rendering_gl_Drawable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globals__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_webgl_obj_loader__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_webgl_obj_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_webgl_obj_loader__);




class Mesh extends __WEBPACK_IMPORTED_MODULE_1__rendering_gl_Drawable__["a" /* default */] {
    constructor(objString, meshId, center) {
        super(); // Call the constructor of the super class. This is required.
        this.center = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(center[0], center[1], center[2], 1);
        this.objString = objString;
        this.meshId = meshId;
    }
    create() {
        let posTemp = [];
        let norTemp = [];
        let uvsTemp = [];
        let idxTemp = [];
        let meshIdTemp = [];
        var loadedMesh = new __WEBPACK_IMPORTED_MODULE_3_webgl_obj_loader__["Mesh"](this.objString);
        //posTemp = loadedMesh.vertices;
        for (var i = 0; i < loadedMesh.vertices.length; i++) {
            posTemp.push(loadedMesh.vertices[i]);
            if (i % 3 == 2)
                posTemp.push(1.0);
        }
        for (var i = 0; i < loadedMesh.vertexNormals.length; i++) {
            norTemp.push(loadedMesh.vertexNormals[i]);
            if (i % 3 == 2)
                norTemp.push(0.0);
        }
        // pushes back the same Mesh id for all positions
        for (var i = 0; i < loadedMesh.vertices.length; i++) {
            meshIdTemp.push(this.meshId);
            if (i % 3 == 2)
                meshIdTemp.push(1.0);
        }
        uvsTemp = loadedMesh.textures;
        idxTemp = loadedMesh.indices;
        this.indices = new Uint32Array(idxTemp);
        this.normals = new Float32Array(norTemp);
        this.positions = new Float32Array(posTemp);
        this.uvs = new Float32Array(uvsTemp);
        this.meshIdArray = new Float32Array(meshIdTemp);
        this.generateIdx();
        this.generatePos();
        this.generateNor();
        this.generateUV();
        this.generateCol();
        this.generateMeshId();
        this.generateInstanceId();
        this.generateTransform1();
        this.generateTransform2();
        this.generateTransform3();
        this.generateTransform4();
        this.count = this.indices.length;
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ELEMENT_ARRAY_BUFFER, this.bufIdx);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ELEMENT_ARRAY_BUFFER, this.indices, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.bufNor);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.normals, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.bufPos);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.positions, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.bufMeshId);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.meshIdArray, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.bufUV);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.uvs, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
        console.log(`Created Mesh from OBJ`);
        this.objString = ""; // hacky clear
    }
    setInstanceVBOs(colors, instanceIds, transform1, transform2, transform3, transform4) {
        this.colors = colors;
        this.instanceIds = instanceIds;
        this.transform1 = transform1;
        this.transform2 = transform2;
        this.transform3 = transform3;
        this.transform4 = transform4;
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.bufCol);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.colors, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.bufInstanceId);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.instanceIds, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
        console.log(this.instanceIds);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.bufTransform1);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.transform1, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.bufTransform2);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.transform2, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.bufTransform3);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.transform3, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.bufTransform4);
        __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].ARRAY_BUFFER, this.transform4, __WEBPACK_IMPORTED_MODULE_2__globals__["a" /* gl */].STATIC_DRAW);
    }
}
;
/* harmony default export */ __webpack_exports__["a"] = (Mesh);


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("OBJ",[],t):"object"==typeof exports?exports.OBJ=t():e.OBJ=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(a){if(r[a])return r[a].exports;var n=r[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var r={};return t.m=e,t.c=r,t.d=function(exports,e,r){t.o(exports,e)||Object.defineProperty(exports,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=3)}([function(e,exports,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e){switch(e){case"BYTE":case"UNSIGNED_BYTE":return 1;case"SHORT":case"UNSIGNED_SHORT":return 2;case"FLOAT":return 4}}Object.defineProperty(exports,"__esModule",{value:!0});var n=exports.Layout=function e(){r(this,e);for(var t=arguments.length,a=Array(t),n=0;n<t;n++)a[n]=arguments[n];this.attributes=a;var s=0,l=0,o=!0,u=!1,c=void 0;try{for(var f,h=a[Symbol.iterator]();!(o=(f=h.next()).done);o=!0){var p=f.value;if(this[p.key])throw new i(p);s%p.sizeOfType!=0&&(s+=p.sizeOfType-s%p.sizeOfType),this[p.key]={attribute:p,size:p.size,type:p.type,normalized:p.normalized,offset:s},s+=p.sizeInBytes,l=Math.max(l,p.sizeOfType)}}catch(e){u=!0,c=e}finally{try{!o&&h.return&&h.return()}finally{if(u)throw c}}s%l!=0&&(s+=l-s%l),this.stride=s;var v=!0,d=!1,y=void 0;try{for(var m,M=a[Symbol.iterator]();!(v=(m=M.next()).done);v=!0){this[m.value.key].stride=this.stride}}catch(e){d=!0,y=e}finally{try{!v&&M.return&&M.return()}finally{if(d)throw y}}},i=function e(t){r(this,e),this.message="found duplicate attribute: "+t.key},s=function e(t,n,i){arguments.length>3&&void 0!==arguments[3]&&arguments[3];r(this,e),this.key=t,this.size=n,this.type=i,this.normalized=!1,this.sizeOfType=a(i),this.sizeInBytes=this.sizeOfType*n};n.POSITION=new s("position",3,"FLOAT"),n.NORMAL=new s("normal",3,"FLOAT"),n.TANGENT=new s("tangent",3,"FLOAT"),n.BITANGENT=new s("bitangent",3,"FLOAT"),n.UV=new s("uv",2,"FLOAT"),n.MATERIAL_INDEX=new s("materialIndex",1,"SHORT"),n.MATERIAL_ENABLED=new s("materialEnabled",1,"UNSIGNED_SHORT"),n.AMBIENT=new s("ambient",3,"FLOAT"),n.DIFFUSE=new s("diffuse",3,"FLOAT"),n.SPECULAR=new s("specular",3,"FLOAT"),n.SPECULAR_EXPONENT=new s("specularExponent",3,"FLOAT"),n.EMISSIVE=new s("emissive",3,"FLOAT"),n.TRANSMISSION_FILTER=new s("transmissionFilter",3,"FLOAT"),n.DISSOLVE=new s("dissolve",1,"FLOAT"),n.ILLUMINATION=new s("illumination",1,"UNSIGNED_SHORT"),n.REFRACTION_INDEX=new s("refractionIndex",1,"FLOAT"),n.SHARPNESS=new s("sharpness",1,"FLOAT"),n.MAP_DIFFUSE=new s("mapDiffuse",1,"SHORT"),n.MAP_AMBIENT=new s("mapAmbient",1,"SHORT"),n.MAP_SPECULAR=new s("mapSpecular",1,"SHORT"),n.MAP_SPECULAR_EXPONENT=new s("mapSpecularExponent",1,"SHORT"),n.MAP_DISSOLVE=new s("mapDissolve",1,"SHORT"),n.ANTI_ALIASING=new s("antiAliasing",1,"UNSIGNED_SHORT"),n.MAP_BUMP=new s("mapBump",1,"SHORT"),n.MAP_DISPLACEMENT=new s("mapDisplacement",1,"SHORT"),n.MAP_DECAL=new s("mapDecal",1,"SHORT"),n.MAP_EMISSIVE=new s("mapEmissive",1,"SHORT")},function(e,exports,t){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),i=t(0),s=function(){function e(t,n){a(this,e),n=n||{},n.materials=n.materials||{},n.enableWTextureCoord=!!n.enableWTextureCoord,n.indicesPerMaterial=!!n.indicesPerMaterial;var i=this;i.vertices=[],i.vertexNormals=[],i.textures=[],i.indices=[],i.textureStride=n.enableWTextureCoord?3:2,this.name="";var s=[],l=[],o=[],u={},c=[],f={},h=-1,p=0;u.verts=[],u.norms=[],u.textures=[],u.hashindices={},u.indices=[[]],u.materialIndices=[],u.index=0;for(var v=/^v\s/,d=/^vn\s/,y=/^vt\s/,m=/^f\s/,M=/\s+/,b=/^usemtl/,x=t.split("\n"),I=0;I<x.length;I++){var A=x[I].trim();if(A&&!A.startsWith("#")){var _=A.split(M);if(_.shift(),v.test(A))s.push.apply(s,r(_));else if(d.test(A))l.push.apply(l,r(_));else if(y.test(A)){var k=_;_.length>2&&!n.enableWTextureCoord?k=_.slice(0,2):2===_.length&&n.enableWTextureCoord&&k.push(0),o.push.apply(o,r(k))}else if(b.test(A)){var T=_[0];T in f||(c.push(T),f[T]=c.length-1,n.indicesPerMaterial&&f[T]>0&&u.indices.push([])),h=f[T],n.indicesPerMaterial&&(p=h)}else if(m.test(A))for(var w=!1,F=0,S=_.length;F<S;F++){3!==F||w||(F=2,w=!0);var E=_[0]+","+h,g=_[F]+","+h;if(g in u.hashindices)u.indices[p].push(u.hashindices[g]);else{var O=_[F].split("/"),B=O.length-1;if(u.verts.push(+s[3*(O[0]-1)+0]),u.verts.push(+s[3*(O[0]-1)+1]),u.verts.push(+s[3*(O[0]-1)+2]),o.length){var L=n.enableWTextureCoord?3:2;u.textures.push(+o[(O[1]-1)*L+0]),u.textures.push(+o[(O[1]-1)*L+1]),n.enableWTextureCoord&&u.textures.push(+o[(O[1]-1)*L+2])}u.norms.push(+l[3*(O[B]-1)+0]),u.norms.push(+l[3*(O[B]-1)+1]),u.norms.push(+l[3*(O[B]-1)+2]),u.materialIndices.push(h),u.hashindices[g]=u.index,u.indices[p].push(u.hashindices[g]),u.index+=1}3===F&&w&&u.indices[p].push(u.hashindices[E])}}}i.vertices=u.verts,i.vertexNormals=u.norms,i.textures=u.textures,i.vertexMaterialIndices=u.materialIndices,i.indices=n.indicesPerMaterial?u.indices:u.indices[p],i.materialNames=c,i.materialIndices=f,i.materialsByIndex={},n.calcTangentsAndBitangents&&this.calculateTangentsAndBitangents()}return n(e,[{key:"calculateTangentsAndBitangents",value:function(){var e={};e.tangents=[].concat(r(new Array(this.vertices.length))).map(function(e){return 0}),e.bitangents=[].concat(r(new Array(this.vertices.length))).map(function(e){return 0});var t=void 0;t=Array.isArray(this.indices[0])?[].concat.apply([],this.indices):this.indices;for(var a=this.vertices,n=this.vertexNormals,i=this.textures,s=0;s<t.length;s+=3){var l=t[s+0],o=t[s+1],u=t[s+2],c=a[3*l+0],f=a[3*l+1],h=a[3*l+2],p=i[2*l+0],v=i[2*l+1],d=a[3*o+0],y=a[3*o+1],m=a[3*o+2],M=i[2*o+0],b=i[2*o+1],x=a[3*u+0],I=a[3*u+1],A=a[3*u+2],_=i[2*u+0],k=i[2*u+1],T=d-c,w=y-f,F=m-h,S=x-c,E=I-f,g=A-h,O=M-p,B=b-v,L=_-p,N=k-v,R=O*N-B*L,P=1/(Math.abs(R<1e-4)?1:R),D=(T*N-S*B)*P,C=(w*N-E*B)*P,U=(F*N-g*B)*P,j=(S*O-T*L)*P,z=(E*O-w*L)*P,H=(g*O-F*L)*P,W=n[3*l+0],G=n[3*l+1],V=n[3*l+2],K=n[3*o+0],q=n[3*o+1],X=n[3*o+2],Y=n[3*u+0],J=n[3*u+1],Q=n[3*u+2],Z=D*W+C*G+U*V,ee=D*K+C*q+U*X,te=D*Y+C*J+U*Q,re=D-W*Z,ae=C-G*Z,ne=U-V*Z,ie=D-K*ee,se=C-q*ee,le=U-X*ee,oe=D-Y*te,ue=C-J*te,ce=U-Q*te,fe=Math.sqrt(re*re+ae*ae+ne*ne),he=Math.sqrt(ie*ie+se*se+le*le),pe=Math.sqrt(oe*oe+ue*ue+ce*ce),ve=j*W+z*G+H*V,de=j*K+z*q+H*X,ye=j*Y+z*J+H*Q,me=j-W*ve,Me=z-G*ve,be=H-V*ve,xe=j-K*de,Ie=z-q*de,Ae=H-X*de,_e=j-Y*ye,ke=z-J*ye,Te=H-Q*ye,we=Math.sqrt(me*me+Me*Me+be*be),Fe=Math.sqrt(xe*xe+Ie*Ie+Ae*Ae),Se=Math.sqrt(_e*_e+ke*ke+Te*Te);e.tangents[3*l+0]+=re/fe,e.tangents[3*l+1]+=ae/fe,e.tangents[3*l+2]+=ne/fe,e.tangents[3*o+0]+=ie/he,e.tangents[3*o+1]+=se/he,e.tangents[3*o+2]+=le/he,e.tangents[3*u+0]+=oe/pe,e.tangents[3*u+1]+=ue/pe,e.tangents[3*u+2]+=ce/pe,e.bitangents[3*l+0]+=me/we,e.bitangents[3*l+1]+=Me/we,e.bitangents[3*l+2]+=be/we,e.bitangents[3*o+0]+=xe/Fe,e.bitangents[3*o+1]+=Ie/Fe,e.bitangents[3*o+2]+=Ae/Fe,e.bitangents[3*u+0]+=_e/Se,e.bitangents[3*u+1]+=ke/Se,e.bitangents[3*u+2]+=Te/Se}this.tangents=e.tangents,this.bitangents=e.bitangents}},{key:"makeBufferData",value:function(e){var t=this.vertices.length/3,r=new ArrayBuffer(e.stride*t);r.numItems=t;for(var a=new DataView(r),n=0,s=0;n<t;n++){s=n*e.stride;var l=!0,o=!1,u=void 0;try{for(var c,f=e.attributes[Symbol.iterator]();!(l=(c=f.next()).done);l=!0){var h=c.value,p=s+e[h.key].offset;switch(h.key){case i.Layout.POSITION.key:a.setFloat32(p,this.vertices[3*n],!0),a.setFloat32(p+4,this.vertices[3*n+1],!0),a.setFloat32(p+8,this.vertices[3*n+2],!0);break;case i.Layout.UV.key:a.setFloat32(p,this.textures[2*n],!0),a.setFloat32(p+4,this.vertices[2*n+1],!0);break;case i.Layout.NORMAL.key:a.setFloat32(p,this.vertexNormals[3*n],!0),a.setFloat32(p+4,this.vertexNormals[3*n+1],!0),a.setFloat32(p+8,this.vertexNormals[3*n+2],!0);break;case i.Layout.MATERIAL_INDEX.key:a.setInt16(p,this.vertexMaterialIndices[n],!0);break;case i.Layout.AMBIENT.key:var v=this.vertexMaterialIndices[n],d=this.materialsByIndex[v];if(!d)break;a.setFloat32(p,d.ambient[0],!0),a.setFloat32(p+4,d.ambient[1],!0),a.setFloat32(p+8,d.ambient[2],!0);break;case i.Layout.DIFFUSE.key:var y=this.vertexMaterialIndices[n],m=this.materialsByIndex[y];if(!m)break;a.setFloat32(p,m.diffuse[0],!0),a.setFloat32(p+4,m.diffuse[1],!0),a.setFloat32(p+8,m.diffuse[2],!0);break;case i.Layout.SPECULAR.key:var M=this.vertexMaterialIndices[n],b=this.materialsByIndex[M];if(!b)break;a.setFloat32(p,b.specular[0],!0),a.setFloat32(p+4,b.specular[1],!0),a.setFloat32(p+8,b.specular[2],!0);break;case i.Layout.SPECULAR_EXPONENT.key:var x=this.vertexMaterialIndices[n],I=this.materialsByIndex[x];if(!I)break;a.setFloat32(p,I.specularExponent,!0);break;case i.Layout.EMISSIVE.key:var A=this.vertexMaterialIndices[n],_=this.materialsByIndex[A];if(!_)break;a.setFloat32(p,_.emissive[0],!0),a.setFloat32(p+4,_.emissive[1],!0),a.setFloat32(p+8,_.emissive[2],!0);break;case i.Layout.TRANSMISSION_FILTER.key:var k=this.vertexMaterialIndices[n],T=this.materialsByIndex[k];if(!T)break;a.setFloat32(p,T.transmissionFilter[0],!0),a.setFloat32(p+4,T.transmissionFilter[1],!0),a.setFloat32(p+8,T.transmissionFilter[2],!0);break;case i.Layout.DISSOLVE.key:var w=this.vertexMaterialIndices[n],F=this.materialsByIndex[w];if(!F)break;a.setFloat32(p,F.dissolve,!0);break;case i.Layout.ILLUMINATION.key:var S=this.vertexMaterialIndices[n],E=this.materialsByIndex[S];if(!E)break;a.setInt16(p,E.illumination,!0);break;case i.Layout.REFRACTION_INDEX.key:var g=this.vertexMaterialIndices[n],O=this.materialsByIndex[g];if(!O)break;a.setFloat32(p,O.refractionIndex,!0);break;case i.Layout.SHARPNESS.key:var B=this.vertexMaterialIndices[n],L=this.materialsByIndex[B];if(!L)break;a.setFloat32(p,L.sharpness,!0);break;case i.Layout.ANTI_ALIASING.key:var N=this.vertexMaterialIndices[n],R=this.materialsByIndex[N];if(!R)break;a.setInt16(p,R.antiAliasing,!0)}}}catch(e){o=!0,u=e}finally{try{!l&&f.return&&f.return()}finally{if(o)throw u}}}return r}},{key:"makeIndexBufferData",value:function(){var e=new Uint16Array(this.indices);return e.numItems=this.indices.length,e}},{key:"addMaterialLibrary",value:function(e){for(var t in e.materials)if(t in this.materialIndices){var r=e.materials[t],a=this.materialIndices[r.name];this.materialsByIndex[a]=r}}}]),e}();exports.default=s},function(e,exports,t){"use strict";function r(e){return Array.isArray(e)?e:Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),i=exports.Material=function e(t){a(this,e),this.name=t,this.ambient=[0,0,0],this.diffuse=[0,0,0],this.specular=[0,0,0],this.emissive=[0,0,0],this.transmissionFilter=[0,0,0],this.dissolve=0,this.specularExponent=0,this.transparency=0,this.illumination=0,this.refractionIndex=1,this.sharpness=0,this.mapDiffuse=null,this.mapAmbient=null,this.mapSpecular=null,this.mapSpecularExponent=null,this.mapDissolve=null,this.antiAliasing=!1,this.mapBump=null,this.mapDisplacement=null,this.mapDecal=null,this.mapEmissive=null,this.mapReflections=[]};exports.MaterialLibrary=function(){function e(t){a(this,e),this.data=t,this.currentMaterial=null,this.materials={},this.parse()}return n(e,[{key:"parse_newmtl",value:function(e){var t=e[0];this.currentMaterial=new i(t),this.materials[t]=this.currentMaterial}},{key:"parseColor",value:function(e){if("spectral"!=e[0]&&"xyz"!=e[0]){if(3==e.length)return e.map(parseFloat);var t=parseFloat(e[0]);return[t,t,t]}}},{key:"parse_Ka",value:function(e){this.currentMaterial.ambient=this.parseColor(e)}},{key:"parse_Kd",value:function(e){this.currentMaterial.diffuse=this.parseColor(e)}},{key:"parse_Ks",value:function(e){this.currentMaterial.specular=this.parseColor(e)}},{key:"parse_Ke",value:function(e){this.currentMaterial.emissive=this.parseColor(e)}},{key:"parse_Tf",value:function(e){this.currentMaterial.transmissionFilter=this.parseColor(e)}},{key:"parse_d",value:function(e){this.currentMaterial.dissolve=parseFloat(e.pop())}},{key:"parse_illum",value:function(e){this.currentMaterial.illumination=parseInt(e[0])}},{key:"parse_Ni",value:function(e){this.currentMaterial.refractionIndex=parseFloat(e[0])}},{key:"parse_Ns",value:function(e){this.currentMaterial.specularExponent=parseInt(e[0])}},{key:"parse_sharpness",value:function(e){this.currentMaterial.sharpness=parseInt(e[0])}},{key:"parse_cc",value:function(e,t){t.colorCorrection="on"==e[0]}},{key:"parse_blendu",value:function(e,t){t.horizontalBlending="on"==e[0]}},{key:"parse_blendv",value:function(e,t){t.verticalBlending="on"==e[0]}},{key:"parse_boost",value:function(e,t){t.boostMipMapSharpness=parseFloat(e[0])}},{key:"parse_mm",value:function(e,t){t.modifyTextureMap.brightness=parseFloat(e[0]),t.modifyTextureMap.contrast=parseFloat(e[1])}},{key:"parse_ost",value:function(e,t,r){for(;e.length<3;)e.push(r);t.u=parseFloat(e[0]),t.v=parseFloat(e[1]),t.w=parseFloat(e[2])}},{key:"parse_o",value:function(e,t){this.parse_ost(e,t.offset,0)}},{key:"parse_s",value:function(e,t){this.parse_ost(e,t.scale,1)}},{key:"parse_t",value:function(e,t){this.parse_ost(e,t.turbulence,0)}},{key:"parse_texres",value:function(e,t){t.textureResolution=parseFloat(e[0])}},{key:"parse_clamp",value:function(e,t){t.clamp="on"==e[0]}},{key:"parse_bm",value:function(e,t){t.bumpMultiplier=parseFloat(e[0])}},{key:"parse_imfchan",value:function(e,t){t.imfChan=e[0]}},{key:"parse_type",value:function(e,t){t.reflectionType=e[0]}},{key:"parseOptions",value:function(e){var t={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null},r=void 0,a=void 0,n={};for(e.reverse();e.length;){var i=e.pop();i.startsWith("-")?(r=i.substr(1),n[r]=[]):n[r].push(i)}for(r in n)if(n.hasOwnProperty(r)){a=n[r];var s=this["parse_"+r];s&&s.bind(this)(a,t)}return t}},{key:"parseMap",value:function(e){var t=void 0,a=void 0;if(e[0].startsWith("-"))t=e.pop(),a=e;else{var n=r(e);t=n[0],a=n.slice(1)}return a=this.parseOptions(a),a.filename=t,a}},{key:"parse_map_Ka",value:function(e){this.currentMaterial.mapAmbient=this.parseMap(e)}},{key:"parse_map_Kd",value:function(e){this.currentMaterial.mapDiffuse=this.parseMap(e)}},{key:"parse_map_Ks",value:function(e){this.currentMaterial.mapSpecular=this.parseMap(e)}},{key:"parse_map_Ke",value:function(e){this.currentMaterial.mapEmissive=this.parseMap(e)}},{key:"parse_map_Ns",value:function(e){this.currentMaterial.mapSpecularExponent=this.parseMap(e)}},{key:"parse_map_d",value:function(e){this.currentMaterial.mapDissolve=this.parseMap(e)}},{key:"parse_map_aat",value:function(e){this.currentMaterial.antiAliasing="on"==e[0]}},{key:"parse_map_bump",value:function(e){this.currentMaterial.mapBump=this.parseMap(e)}},{key:"parse_bump",value:function(e){this.parse_map_bump(e)}},{key:"parse_disp",value:function(e){this.currentMaterial.mapDisplacement=this.parseMap(e)}},{key:"parse_decal",value:function(e){this.currentMaterial.mapDecal=this.parseMap(e)}},{key:"parse_refl",value:function(e){this.currentMaterial.mapReflections.push(this.parseMap(e))}},{key:"parse",value:function(){var e=this.data.split(/\r?\n/),t=!0,a=!1,n=void 0;try{for(var i,s=e[Symbol.iterator]();!(t=(i=s.next()).done);t=!0){var l=i.value;if((l=l.trim())&&!l.startsWith("#")){var o=l.split(/\s/),u=void 0,c=o,f=r(c);u=f[0],o=f.slice(1);var h=this["parse_"+u];h&&h.bind(this)(o)}}}catch(e){a=!0,n=e}finally{try{!t&&s.return&&s.return()}finally{if(a)throw n}}delete this.data,this.currentMaterial=null}}]),e}()},function(e,exports,t){e.exports=t(4)},function(e,exports,t){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.version=exports.deleteMeshBuffers=exports.initMeshBuffers=exports.downloadMeshes=exports.downloadModels=exports.Layout=exports.MaterialLibrary=exports.Material=exports.Mesh=void 0;var r=t(1),a=function(e){return e&&e.__esModule?e:{default:e}}(r),n=t(2),i=t(0),s=t(5);exports.Mesh=a.default,exports.Material=n.Material,exports.MaterialLibrary=n.MaterialLibrary,exports.Layout=i.Layout,exports.downloadModels=s.downloadModels,exports.downloadMeshes=s.downloadMeshes,exports.initMeshBuffers=s.initMeshBuffers,exports.deleteMeshBuffers=s.deleteMeshBuffers,exports.version="1.1.3"},function(e,exports,t){"use strict";function r(e,t){var r=["mapDiffuse","mapAmbient","mapSpecular","mapDissolve","mapBump","mapDisplacement","mapDecal","mapEmissive"];t.endsWith("/")||(t+="/");var a=[];for(var n in e.materials)if(e.materials.hasOwnProperty(n)){n=e.materials[n];var i=!0,s=!1,l=void 0;try{for(var o,u=r[Symbol.iterator]();!(i=(o=u.next()).done);i=!0){var c=o.value;(function(e){var r=n[e];if(!r)return"continue";var i=t+r.filename;a.push(fetch(i).then(function(e){if(!e.ok)throw new Error;return e.blob()}).then(function(e){var t=new Image;return t.src=URL.createObjectURL(e),r.texture=t,new Promise(function(e){return t.onload=e})}).catch(function(){}))})(c)}}catch(e){s=!0,l=e}finally{try{!i&&u.return&&u.return()}finally{if(s)throw l}}}return Promise.all(a)}function a(e){var t=[],a=!0,n=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(a=(s=o.next()).done);a=!0){var f=s.value;!function(e){var a=[];if(!e.obj)throw new Error('"obj" attribute of model object not set. The .obj file is required to be set in order to use downloadModels()');var n={};n.indicesPerMaterial=!!e.indicesPerMaterial,n.calcTangentsAndBitangents=!!e.calcTangentsAndBitangents;var i=e.name;if(!i){var s=e.obj.split("/");i=s[s.length-1].replace(".obj","")}if(a.push(Promise.resolve(i)),a.push(fetch(e.obj).then(function(e){return e.text()}).then(function(e){return new u.default(e,n)})),e.mtl){var l=e.mtl;"boolean"==typeof l&&(l=e.obj.replace(/\.obj$/,".mtl")),a.push(fetch(l).then(function(e){return e.text()}).then(function(t){var a=new c.MaterialLibrary(t);if(!1!==e.downloadMtlTextures){var n=e.mtlTextureRoot;return n||(n=l.substr(0,l.lastIndexOf("/"))),Promise.all([Promise.resolve(a),r(a,n)])}return Promise.all(Promise.resolve(a))}).then(function(e){return e[0]}))}t.push(Promise.all(a))}(f)}}catch(e){n=!0,i=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw i}}return Promise.all(t).then(function(e){var t={},r=!0,a=!1,n=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done);r=!0){var o=i.value,u=l(o,3),c=u[0],f=u[1],h=u[2];f.name=c,h&&f.addMaterialLibrary(h),t[c]=f}}catch(e){a=!0,n=e}finally{try{!r&&s.return&&s.return()}finally{if(a)throw n}}return t})}function n(e,t,r){void 0===r&&(r={});var a=[];for(var n in e){(function(t){if(!e.hasOwnProperty(t))return"continue";var r=e[t];a.push(fetch(r).then(function(e){return e.text()}).then(function(e){return[t,new u.default(e)]}))})(n)}Promise.all(a).then(function(e){var a=!0,n=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(a=(s=o.next()).done);a=!0){var u=s.value,c=l(u,2),f=c[0],h=c[1];r[f]=h}}catch(e){n=!0,i=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw i}}return t(r)})}function i(e,t){t.normalBuffer=f(e,e.ARRAY_BUFFER,t.vertexNormals,3),t.textureBuffer=f(e,e.ARRAY_BUFFER,t.textures,t.textureStride),t.vertexBuffer=f(e,e.ARRAY_BUFFER,t.vertices,3),t.indexBuffer=f(e,e.ELEMENT_ARRAY_BUFFER,t.indices,1)}function s(e,t){e.deleteBuffer(t.normalBuffer),e.deleteBuffer(t.textureBuffer),e.deleteBuffer(t.vertexBuffer),e.deleteBuffer(t.indexBuffer)}Object.defineProperty(exports,"__esModule",{value:!0});var l=function(){function e(e,t){var r=[],a=!0,n=!1,i=void 0;try{for(var s,l=e[Symbol.iterator]();!(a=(s=l.next()).done)&&(r.push(s.value),!t||r.length!==t);a=!0);}catch(e){n=!0,i=e}finally{try{!a&&l.return&&l.return()}finally{if(n)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();exports.downloadModels=a,exports.downloadMeshes=n,exports.initMeshBuffers=i,exports.deleteMeshBuffers=s;var o=t(1),u=function(e){return e&&e.__esModule?e:{default:e}}(o),c=t(2),f=(t(0),function(e,t,r,a){var n=e.createBuffer(),i=t===e.ARRAY_BUFFER?Float32Array:Uint16Array;return e.bindBuffer(t,n),e.bufferData(t,new i(r),e.STATIC_DRAW),n.itemSize=a,n.numItems=r.length/a,n})}])});

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gl_matrix__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LSystem__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ranjs__ = __webpack_require__(45);



// import { random } from 'gl-matrix/src/gl-matrix/vec2';

class Plant {
    constructor(axiom, depth, angle, seed, branchThickness, appleDensity) {
        this.positions = new Array();
        this.transformationMats = new Array();
        this.leafTransformationMats = new Array();
        this.appleTransformationMats = new Array();
        this.lsystem = new __WEBPACK_IMPORTED_MODULE_1__LSystem__["a" /* default */](axiom, branchThickness);
        this.depth = depth;
        this.angle = angle;
        this.seed = seed;
        __WEBPACK_IMPORTED_MODULE_3_ranjs__["a" /* core */].seed(seed);
        this.branchThickness = branchThickness;
        this.appleDensity = appleDensity;
    }
    drawForward() {
        let turtle = this.lsystem.currTurtle;
        turtle.isLeaf = false;
        turtle.isApple = false;
        let turtlePos = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(turtle.pos[0], turtle.pos[1], turtle.pos[2], turtle.pos[3]);
        let transformMat = turtle.getTransformationMatrix();
        this.positions.push(turtlePos);
        this.transformationMats.push(transformMat);
        turtle.moveForward(0.38);
    }
    drawLeaf() {
        let turtle = this.lsystem.currTurtle;
        turtle.isLeaf = true;
        turtle.isApple = false;
        let transformMat = turtle.getTransformationMatrix();
        let I = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].identity(I);
        let randomRotation = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        let random = __WEBPACK_IMPORTED_MODULE_3_ranjs__["a" /* core */].float();
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].rotateX(randomRotation, I, random * 30);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].rotateY(randomRotation, randomRotation, random * 30);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].rotateZ(randomRotation, randomRotation, random * 30);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].multiply(transformMat, transformMat, randomRotation);
        this.leafTransformationMats.push(transformMat);
    }
    drawApple() {
        let turtle = this.lsystem.currTurtle;
        turtle.isLeaf = false;
        turtle.isApple = true;
        // Variable that controls density of apples
        if (__WEBPACK_IMPORTED_MODULE_3_ranjs__["a" /* core */].float() < this.appleDensity) {
            let transformMat = turtle.getTransformationMatrix();
            let I = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
            __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].identity(I);
            let randomRotation = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
            __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].rotateX(randomRotation, I, 4.0 * Math.PI / 3.0);
            __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].multiply(transformMat, transformMat, randomRotation);
            this.appleTransformationMats.push(transformMat);
        }
    }
    drawNothing() { }
    rotateUpPos() {
        let turtle = this.lsystem.currTurtle;
        // Rotate about the up vector
        turtle.rotate(this.angle, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtle.up[0], turtle.up[1], turtle.up[2]));
    }
    rotateUpNeg() {
        let turtle = this.lsystem.currTurtle;
        // Rotate about the up vector
        turtle.rotate(-this.angle, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtle.up[0], turtle.up[1], turtle.up[2]));
    }
    rotateForwardPos() {
        let turtle = this.lsystem.currTurtle;
        // Rotate about the forward vector
        turtle.rotate(this.angle, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtle.forward[0], turtle.forward[1], turtle.forward[2]));
    }
    rotateForwardNeg() {
        let turtle = this.lsystem.currTurtle;
        // Rotate about the forward vector
        turtle.rotate(-this.angle, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtle.forward[0], turtle.forward[1], turtle.forward[2]));
    }
    rotateRightPos() {
        let turtle = this.lsystem.currTurtle;
        // Rotate about the right vector
        turtle.rotate(this.angle, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtle.right[0], turtle.right[1], turtle.right[2]));
    }
    rotateRightNeg() {
        let turtle = this.lsystem.currTurtle;
        // Rotate about the right vector
        turtle.rotate(-this.angle, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtle.right[0], turtle.right[1], turtle.right[2]));
    }
    rotateRandom15() {
        let turtle = this.lsystem.currTurtle;
        // Choose a random angle ranging from -15 to 15        
        let randomAngle = __WEBPACK_IMPORTED_MODULE_3_ranjs__["a" /* core */].float(-15, 15);
        turtle.rotate(randomAngle, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtle.right[0], turtle.right[1], turtle.right[2]));
        turtle.rotate(randomAngle, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtle.up[0], turtle.up[1], turtle.up[2]));
    }
    rotateRandom5() {
        let turtle = this.lsystem.currTurtle;
        // Choose a random angle ranging from -5 to 5
        let randomAngle = __WEBPACK_IMPORTED_MODULE_3_ranjs__["a" /* core */].float(-5, 5);
        turtle.rotate(randomAngle, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtle.right[0], turtle.right[1], turtle.right[2]));
        turtle.rotate(randomAngle, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtle.up[0], turtle.up[1], turtle.up[2]));
    }
    saveTurtle() {
        this.lsystem.saveTurtle();
    }
    resetTurtle() {
        this.lsystem.resetTurtle();
    }
    setDrawingRules() {
        this.lsystem.addDrawingRule("T", this.drawForward.bind(this), 1.0);
        this.lsystem.addDrawingRule("F", this.drawForward.bind(this), 1.0);
        this.lsystem.addDrawingRule("X", this.drawNothing.bind(this), 1.0);
        this.lsystem.addDrawingRule("L", this.drawLeaf.bind(this), 1.0);
        this.lsystem.addDrawingRule("A", this.drawApple.bind(this), 1.0);
        this.lsystem.addDrawingRule("+", this.rotateUpPos.bind(this), 0.5);
        this.lsystem.addDrawingRule("-", this.rotateUpNeg.bind(this), 1.0);
        this.lsystem.addDrawingRule("!", this.rotateForwardPos.bind(this), 1.0);
        this.lsystem.addDrawingRule("@", this.rotateForwardNeg.bind(this), 1.0);
        this.lsystem.addDrawingRule("#", this.rotateRightPos.bind(this), 1.0);
        this.lsystem.addDrawingRule("$", this.rotateRightNeg.bind(this), 1.0);
        this.lsystem.addDrawingRule("%", this.rotateRandom15.bind(this), 1.0);
        this.lsystem.addDrawingRule("^", this.rotateRandom5.bind(this), 1.0);
        this.lsystem.addDrawingRule("[", this.saveTurtle.bind(this), 1.0);
        this.lsystem.addDrawingRule("]", this.resetTurtle.bind(this), 1.0);
    }
    setExpansionRules() {
        let T_map = new Map([["T", 1.0]]);
        this.lsystem.addExpansionRule("T", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](T_map, this.seed));
        let F_map = new Map([
            ["FF", 0.1],
            ["F^", 0.8],
            ["F", 0.1],
        ]);
        this.lsystem.addExpansionRule("F", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](F_map, this.seed));
        let X_map = new Map([
            ["FFFF[+FFLXL]FF[#FFXLA]FLFL[$FFLXL]FF[-FFLXL]FFXLA", 1.0],
        ]);
        this.lsystem.addExpansionRule("X", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](X_map, this.seed));
        let L_map = new Map([
            ["L", 1.0],
        ]);
        this.lsystem.addExpansionRule("L", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](L_map, this.seed));
        let A_map = new Map([
            ["A", 1.0],
        ]);
        this.lsystem.addExpansionRule("A", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](A_map, this.seed));
        let rotateUpPos_map = new Map([["+", 1.0]]);
        this.lsystem.addExpansionRule("+", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](rotateUpPos_map, this.seed));
        let rotateUpNeg_map = new Map([["-", 1.0]]);
        this.lsystem.addExpansionRule("-", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](rotateUpNeg_map, this.seed));
        let rotateForwardPos_map = new Map([["!", 1.0]]);
        this.lsystem.addExpansionRule("!", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](rotateForwardPos_map, this.seed));
        let rotateForwardNeg_map = new Map([["@", 1.0]]);
        this.lsystem.addExpansionRule("@", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](rotateForwardNeg_map, this.seed));
        let rotateRightPos_map = new Map([["#", 1.0]]);
        this.lsystem.addExpansionRule("#", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](rotateRightPos_map, this.seed));
        let rotateRightNeg_map = new Map([["$", 1.0]]);
        this.lsystem.addExpansionRule("$", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](rotateRightNeg_map, this.seed));
        let rotateRandom30_map = new Map([["%", 1.0]]);
        this.lsystem.addExpansionRule("%", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](rotateRandom30_map, this.seed));
        let rotateRandom10_map = new Map([["^", 1.0]]);
        this.lsystem.addExpansionRule("^", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](rotateRandom10_map, this.seed));
        let save_map = new Map([["[", 1.0]]);
        this.lsystem.addExpansionRule("[", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](save_map, this.seed));
        let reset_map = new Map([["]", 1.0]]);
        this.lsystem.addExpansionRule("]", new __WEBPACK_IMPORTED_MODULE_2__ExpansionRule__["a" /* default */](reset_map, this.seed));
    }
    create() {
        this.setDrawingRules();
        this.setExpansionRules();
        this.lsystem.expand(this.depth);
        this.lsystem.draw();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Plant;



/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gl_matrix__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Turtle__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DrawingRule__ = __webpack_require__(124);



class LSystem {
    constructor(axiom, branchThickness) {
        this.turtleStack = []; // Stack of turtles to keep track of drawing history
        this.drawingRules = new Map(); // Map of input strings to drawing rules
        this.expansionRules = new Map; // Map of input strings to expansion rules
        this.axiom = axiom;
        this.branchThickness = branchThickness;
        // set initial turtle to a hardcoded position
        let pos = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(0, 0, 0, 1);
        let forward = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(0, 1, 0, 0);
        let right = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(1, 0, 0, 0);
        let up = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(0, 0, 1, 0);
        this.currTurtle = new __WEBPACK_IMPORTED_MODULE_1__Turtle__["a" /* default */](pos, forward, right, up, 1, 0, branchThickness);
    }
    saveTurtle() {
        // Create a copy of turtle so that it doesn't get updated while in the stack
        let posCopy = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(this.currTurtle.pos[0], this.currTurtle.pos[1], this.currTurtle.pos[2], this.currTurtle.pos[3]);
        let forwardCopy = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(this.currTurtle.forward[0], this.currTurtle.forward[1], this.currTurtle.forward[2], this.currTurtle.forward[3]);
        let rightCopy = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(this.currTurtle.right[0], this.currTurtle.right[1], this.currTurtle.right[2], this.currTurtle.right[3]);
        let upCopy = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(this.currTurtle.up[0], this.currTurtle.up[1], this.currTurtle.up[2], this.currTurtle.up[3]);
        let depthCopy = this.currTurtle.depth;
        let trunkDepthCopy = this.currTurtle.trunkDepth;
        let turtleCopy = new __WEBPACK_IMPORTED_MODULE_1__Turtle__["a" /* default */](posCopy, forwardCopy, rightCopy, upCopy, depthCopy, trunkDepthCopy, this.branchThickness);
        this.turtleStack.push(turtleCopy);
        this.currTurtle.incrDepth();
        this.currTurtle.resetTrunkDepth();
    }
    resetTurtle() {
        this.currTurtle = this.turtleStack.pop();
    }
    addExpansionRule(input, rule) {
        this.expansionRules.set(input, rule);
    }
    addDrawingRule(input, func, prob) {
        let rule = new __WEBPACK_IMPORTED_MODULE_2__DrawingRule__["a" /* default */](func, prob);
        this.drawingRules.set(input, rule);
    }
    applyExpansion(input) {
        var expansionRule = this.expansionRules.get(input);
        if (expansionRule == null) {
            throw 'No expansion rule for this symbol ' + input;
        }
        return expansionRule.getExpansion();
    }
    // Recursive helper that expands on the axiom
    expandRecurse(input, depth) {
        // Base case
        if (depth == 0) {
            return input;
        }
        else {
            depth = depth - 1;
            let finalString = "";
            for (let j = 0; j < input.length; j++) {
                let newString = this.applyExpansion(input[j]);
                finalString += newString;
            }
            return this.expandRecurse(finalString, depth);
        }
    }
    expand(depth) {
        this.finalString = this.expandRecurse(this.axiom, depth);
        console.log(this.finalString);
        return this.finalString;
    }
    draw() {
        for (let i = 0; i < this.finalString.length; i++) {
            var drawingRule = this.drawingRules.get(this.finalString[i]);
            if (drawingRule == null) {
                throw 'No drawing rule for this symbol';
            }
            drawingRule.drawFunc();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LSystem;



/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gl_matrix__ = __webpack_require__(8);
// Turtle represents current drawing state of the L-System

class Turtle {
    constructor(pos, forward, right, up, depth, trunkDepth, branchThickness) {
        this.isLeaf = false;
        this.isApple = false;
        this.branchThickness = 0.5;
        this.pos = pos;
        this.forward = forward;
        this.right = right;
        this.up = up;
        this.depth = depth;
        this.trunkDepth = trunkDepth;
        this.branchThickness = branchThickness;
    }
    moveForward(distance) {
        let translate = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].create();
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].multiply(translate, this.forward, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].fromValues(distance, distance, distance, 1));
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].add(this.pos, this.pos, translate);
        this.trunkDepth++;
    }
    rotate(angle, axis) {
        var rotate = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        angle = Math.PI / 180.0 * angle;
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].fromRotation(rotate, angle, axis);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].normalize(this.up, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].transformMat4(this.up, this.up, rotate));
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].normalize(this.right, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].transformMat4(this.right, this.right, rotate));
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].normalize(this.forward, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["d" /* vec4 */].transformMat4(this.forward, this.forward, rotate));
    }
    getTransformationMatrix() {
        let translate = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].fromTranslation(translate, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(this.pos[0], this.pos[1], this.pos[2]));
        let rotate = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        let globalUp = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(0, 1, 0);
        let forwardVec = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(this.forward[0], this.forward[1], this.forward[2]);
        let theta = Math.acos(__WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].dot(globalUp, forwardVec) / (__WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].length(globalUp) * __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].length(forwardVec)));
        let rotationAxis = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].create();
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].cross(rotationAxis, globalUp, forwardVec);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].fromRotation(rotate, theta, rotationAxis);
        let scale = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        // if the turtle represents a leaf or apple, do not scale
        if (this.isLeaf || this.isApple) {
            scale = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].identity(scale);
        }
        else {
            let turtleScale = 2.0 * Math.pow(this.branchThickness, .75 * this.depth);
            // If the turtle is part of the trunk, use the trunk depth to scale it down
            if (this.depth < 2) {
                turtleScale = 2.0 * Math.pow(this.branchThickness, 0.05 * this.trunkDepth);
            }
            __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].fromScaling(scale, __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["c" /* vec3 */].fromValues(turtleScale, 1.0, turtleScale));
        }
        let transform = __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].create();
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].multiply(transform, translate, rotate);
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix__["b" /* mat4 */].multiply(transform, transform, scale);
        return transform;
    }
    incrDepth() {
        this.depth++;
    }
    resetTrunkDepth() {
        this.trunkDepth = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Turtle;



/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// DrawingRule represents the result of mapping a character to an L-System drawing operation
class DrawingRule {
    constructor(drawFunc, prob) {
        this.drawFunc = drawFunc;
        this.prob = prob;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DrawingRule;



/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ranjs__ = __webpack_require__(45);
// ExpansionRule represents the result of mapping a particular character to a new set of characters 
// during the grammar expansion phase of the L-System

class ExpansionRule {
    constructor(expansionProbs, seed) {
        this.expansionProbs = new Map();
        this.expansionProbs = expansionProbs;
        this.seed = seed;
    }
    getExpansion() {
        let sumProb = 0.0;
        // let rand = Math.random();
        __WEBPACK_IMPORTED_MODULE_0_ranjs__["a" /* core */].seed(this.seed);
        let rand = __WEBPACK_IMPORTED_MODULE_0_ranjs__["a" /* core */].float();
        for (const [expansion, prob] of this.expansionProbs) {
            sumProb += prob;
            if (rand < sumProb) {
                return expansion;
            }
        }
        return null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ExpansionRule;



/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["float"] = float;
/* harmony export (immutable) */ __webpack_exports__["int"] = int;
/* harmony export (immutable) */ __webpack_exports__["choice"] = choice;
/* harmony export (immutable) */ __webpack_exports__["char"] = char;
/* harmony export (immutable) */ __webpack_exports__["shuffle"] = shuffle;
/* harmony export (immutable) */ __webpack_exports__["coin"] = coin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_some__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_xoshiro__ = __webpack_require__(47);



/**
 * @namespace core
 * @memberOf ran
 */

// The internal generator of the core
const r = new __WEBPACK_IMPORTED_MODULE_1__core_xoshiro__["a" /* default */]()

/**
 * Sets the seed for the underlying pseudo random number generator used by the core generators. Under the hood, ranjs
 * implements the [xoshiro128+ algorithm]{@link http://vigna.di.unimi.it/ftp/papers/ScrambledLinear.pdf}.
 *
 * @method seed
 * @memberOf ran.core
 * @param {(number|string)} value The value of the seed, either a number or a string (for the ease of tracking seeds).
 */
const seed = value => r.seed(value)
/* harmony export (immutable) */ __webpack_exports__["seed"] = seed;


/**
 * Generates some uniformly distributed random floats in (min, max).
 * If min > max, a random float in (max, min) is generated.
 * If no parameters are passed, generates a single random float between 0 and 1.
 * If only min is specified, generates a single random float between 0 and min.
 *
 * @method float
 * @memberOf ran.core
 * @param {number=} min Lower boundary, or upper if max is not given.
 * @param {number=} max Upper boundary.
 * @param {number=} n Number of floats to generate.
 * @returns {(number|number[])} Single float or array of random floats.
 * @example
 *
 * ran.core.float()
 * // => 0.278014086611011
 *
 * ran.core.float(2)
 * // => 1.7201255276155272
 *
 * ran.core.float(2, 3)
 * // => 2.3693449236256185
 *
 * ran.core.float(2, 3, 5)
 * // => [ 2.4310443387740093,
 * //      2.934333354639414,
 * //      2.7689523358767127,
 * //      2.291137165632517,
 * //      2.5040591952427906 ]
 *
 */
function float (min, max, n) {
  if (arguments.length === 0) { return r.next() }
  if (arguments.length === 1) { return r.next() * min }
  return Object(__WEBPACK_IMPORTED_MODULE_0__utils_some__["a" /* default */])(() => r.next() * (max - min) + min, n)
}

/**
 * Generates some uniformly distributed random integers in (min, max).
 * If min > max, a random integer in (max, min) is generated.
 * If only min is specified, generates a single random integer between 0 and min.
 *
 * @method int
 * @memberOf ran.core
 * @param {number} min Lower boundary, or upper if max is not specified.
 * @param {number=} max Upper boundary.
 * @param {number=} n Number of integers to generate.
 * @returns {(number|number[])} Single integer or array of random integers.
 * @example
 *
 * ran.core.int(10)
 * // => 2
 *
 * ran.core.int(10, 20)
 * //=> 12
 *
 * ran.core.int(10, 20, 5)
 * // => [ 12, 13, 10, 14, 14 ]
 *
 */
function int (min, max, n) {
  if (arguments.length === 1) { return Math.floor(r.next() * (min + 1)) }
  return Object(__WEBPACK_IMPORTED_MODULE_0__utils_some__["a" /* default */])(() => Math.floor(r.next() * (max - min + 1) + min), n)
}

/**
 * Samples some elements with replacement from an array with uniform distribution.
 *
 * @method choice
 * @memberOf ran.core
 * @param {Array=} values Array to sample from.
 * @param {number=} n Number of elements to sample.
 * @returns {(object|object[]|undefined)} Single element or array of sampled elements. If the array is invalid (empty or
 * not passed), undefined is returned.
 * @example
 *
 * ran.core.choice([1, 2, 3, 4, 5])
 * // => 2
 *
 * ran.core.choice([1, 2, 3, 4, 5], 5)
 * // => [ 1, 5, 4, 4, 1 ]
 */
function choice (values, n) {
  if (!Array.isArray(values) || values.length === 0) {
    return
  }
  return Object(__WEBPACK_IMPORTED_MODULE_0__utils_some__["a" /* default */])(() => values[Math.floor(r.next() * values.length)], n)
}

/**
 * Samples some characters with replacement from a string with uniform distribution.
 *
 * @method char
 * @memberOf ran.core
 * @param {string=} string String to sample characters from.
 * @param {number=} n Number of characters to sample.
 * @returns {(string|string[]|undefined)} Random character if n is not given or less than 2, an array of random characters
 * otherwise. If string is empty, undefined is returned.
 * @example
 *
 * ran.core.char('abcde')
 * // => 'd'
 *
 * ran.core.char('abcde', 5)
 * // => [ 'd', 'c', 'a', 'a', 'd' ]
 *
 */
function char (string, n) {
  if (typeof string !== 'string' || string === '') {
    return
  }
  return Object(__WEBPACK_IMPORTED_MODULE_0__utils_some__["a" /* default */])(() => string.charAt(Math.floor(r.next() * string.length)), n)
}

/**
 * Shuffles an array in-place using the Fisher--Yates algorithm.
 *
 * @method shuffle
 * @memberOf ran.core
 * @param {Array} values Array to shuffle.
 * @returns {Array} The shuffled array.
 * @example
 *
 * ran.core.shuffle([1, 2, 3])
 * // => [ 2, 3, 1 ]
 *
 */
function shuffle (values) {
  let i; let tmp; let l = values.length
  while (l) {
    i = Math.floor(r.next() * l--)
    tmp = values[l]
    values[l] = values[i]
    values[i] = tmp
  }
  return values
}

/**
 * Flips a biased coin several times and returns the associated head/tail value or array of values.
 *
 * @method coin
 * @memberOf ran.core
 * @param {object} head Head value.
 * @param {object} tail Tail value.
 * @param {number=} p Bias (probability of head). Default is 0.5.
 * @param {number=} n Number of coins to flip. Default is 1.
 * @returns {(object|object[])} Single head/tail value or an array of head/tail values.
 * @example
 *
 * ran.core.coin('a', {b: 2})
 * // => { b: 2 }
 *
 * ran.core.coin('a', {b: 2}, 0.9)
 * // => 'a'
 *
 * ran.core.coin('a', {b: 2}, 0.9, 9)
 * // => [ { b: 2 }, 'a', 'a', 'a', 'a', 'a', 'a', { b: 2 }, 'a' ]
 */
function coin (head, tail, p = 0.5, n = 1) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__utils_some__["a" /* default */])(() => r.next() < p ? head : tail, n)
}


/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__la_vector__ = __webpack_require__(24);
/* unused harmony reexport Vector */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__la_matrix__ = __webpack_require__(48);
/* unused harmony reexport Matrix */
/**
 * Namespaces containing various linear algebra classes and methods.
 *
 * @namespace la
 * @memberOf ran
 * @private
 */




/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator of an invalid (not implemented) distribution. Only for testing purposes.
 *
 * @class InvalidDiscrete
 * @memberOf ran.dist
 * @private
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor () {
    super('discrete', arguments.length)
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }
});


/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = chi2;
/* harmony export (immutable) */ __webpack_exports__["b"] = kolmogorovSmirnov;
/**
 * Table containing critical values for the chi square test at 99% of confidence for low degrees of freedom.
 *
 * @var {number[]} _CHI_TABLE_LO
 * @memberOf ran.dist
 * @private
 */
const _CHI_TABLE_LO = [0,
  6.635, 9.210, 11.345, 13.277, 15.086, 16.812, 18.475, 20.090, 21.666, 23.209,
  24.725, 26.217, 27.688, 29.141, 30.578, 32.000, 33.409, 34.805, 36.191, 37.566,
  38.932, 40.289, 41.638, 42.980, 44.314, 45.642, 46.963, 48.278, 49.588, 50.892,
  52.191, 53.486, 54.776, 56.061, 57.342, 58.619, 59.893, 61.162, 62.428, 63.691,
  64.950, 66.206, 67.459, 68.710, 69.957, 71.201, 72.443, 73.683, 74.919, 76.154,
  77.386, 78.616, 79.843, 81.069, 82.292, 83.513, 84.733, 85.950, 87.166, 88.379,
  89.591, 90.802, 92.010, 93.217, 94.422, 95.626, 96.828, 98.028, 99.228, 100.425,
  101.621, 102.816, 104.010, 105.202, 106.393, 107.583, 108.771, 109.958, 111.144, 112.329,
  113.512, 114.695, 115.876, 117.057, 118.236, 119.414, 120.591, 121.767, 122.942, 124.116,
  125.289, 126.462, 127.633, 128.803, 129.973, 131.141, 132.309, 133.476, 134.642, 135.807,
  136.971, 138.134, 139.297, 140.459, 141.620, 142.780, 143.940, 145.099, 146.257, 147.414,
  148.571, 149.727, 150.882, 152.037, 153.191, 154.344, 155.496, 156.648, 157.800, 158.950,
  160.100, 161.250, 162.398, 163.546, 164.694, 165.841, 166.987, 168.133, 169.278, 170.423,
  171.567, 172.711, 173.854, 174.996, 176.138, 177.280, 178.421, 179.561, 180.701, 181.840,
  182.979, 184.118, 185.256, 186.393, 187.530, 188.666, 189.802, 190.938, 192.073, 193.208,
  194.342, 195.476, 196.609, 197.742, 198.874, 200.006, 201.138, 202.269, 203.400, 204.530,
  205.660, 206.790, 207.919, 209.047, 210.176, 211.304, 212.431, 213.558, 214.685, 215.812,
  216.938, 218.063, 219.189, 220.314, 221.438, 222.563, 223.687, 224.810, 225.933, 227.056,
  228.179, 229.301, 230.423, 231.544, 232.665, 233.786, 234.907, 236.027, 237.147, 238.266,
  239.386, 240.505, 241.623, 242.742, 243.860, 244.977, 246.095, 247.212, 248.329, 249.445,
  250.561, 251.677, 252.793, 253.908, 255.023, 256.138, 257.253, 258.367, 259.481, 260.595,
  261.708, 262.821, 263.934, 265.047, 266.159, 267.271, 268.383, 269.495, 270.606, 271.717,
  272.828, 273.939, 275.049, 276.159, 277.269, 278.379, 279.488, 280.597, 281.706, 282.814,
  283.923, 285.031, 286.139, 287.247, 288.354, 289.461, 290.568, 291.675, 292.782, 293.888,
  294.994, 296.100, 297.206, 298.311, 299.417, 300.522, 301.626, 302.731, 303.835, 304.940
]

/**
 * Table containing critical values for the chi square test at 99% of confidence for high degrees of freedom.
 *
 * @var {number[]} _CHI_TABLE_HI
 * @memberOf ran.dist
 * @private
 */
const _CHI_TABLE_HI = [
  359.906, 414.474, 468.724, 522.717, 576.493, 630.084, 683.516, 736.807, 789.974, 843.029,
  895.984, 948.848, 1001.630, 1054.334, 1106.969
]

/**
 * Performs a chi square test for an array of values and a probability mass function.
 *
 * @method chi2
 * @memberOf ran.dist
 * @param values {number[]} Array of values to perform test for.
 * @param pmf {Function} Probability mass function to perform test against.
 * @param c {number} Number of parameters for the distribution.
 * @returns {{statistics: number, passed: boolean}} Test results, containing the raw chi square statistics and a
 * boolean to tell whether the distribution passed the test.
 * @private
 */
function chi2 (values, pmf, c) {
  // Calculate observed distribution
  const p = new Map()
  values.forEach(function (v) {
    p.set(v, p.has(v) ? p.get(v) + 1 : 1)
  })

  // Calculate chi-square
  let chi2 = 0
  let bin = 0
  let pBin = 0
  let k = 0
  p.forEach((px, x) => {
    // Add frequency to current bin
    bin += pmf(parseInt(x)) * values.length
    pBin += px

    // If bin count is above 20 (for central limit theorem), consider this a class and clear bin
    if (bin > 20) {
      chi2 += Math.pow(pBin - bin, 2) / bin
      bin = 0
      pBin = 0
      k++
    }
  })

  // Get critical value
  const df = Math.max(1, k - c - 1)

  const crit = df <= 250 ? _CHI_TABLE_LO[df] : _CHI_TABLE_HI[Math.floor(df / 50)]

  // Return comparison results
  return {
    statistics: chi2,
    passed: chi2 <= crit
  }
}

/**
 * Performs a Kolmogorov-Smirnov test for an array of values and a cumulative distribution function.
 *
 * @method kolmogorovSmirnov
 * @memberOf ran.dist
 * @param values {number[]} Array of values to perform test for.
 * @param cdf {Function} Cumulative distribution function to perform test against.
 * @returns {{statistics: number, passed: boolean}} Test results, containing the raw K-S statistics and a
 * boolean to tell whether the distribution passed the test.
 * @private
 */
function kolmogorovSmirnov (values, cdf) {
  // Sort values for estimated CDF
  values.sort((a, b) => a - b)

  // Calculate D value
  let D = 0
  for (let i = 0; i < values.length; i++) {
    D = Math.max(D, Math.abs((i + 1) / values.length - cdf(values[i])))
  }

  // Return comparison results
  return {
    statistics: D,
    passed: D <= 1.628 / Math.sqrt(values.length)
  }
}


/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_core__ = __webpack_require__(3);


const SCALE = 1.618

/**
 * Estimates brackets around the root of a function. If there are no constraints specified, the bracket interval
 * grows without limits with a scaling factor of 1.618. Otherwise, the interval is limited to the boundary specified in
 * the constraints. If the constraining interval has an open boundary, the boundary is approached with a distance
 * shrinking with a factor of 1.618 in each step.
 *
 * @method bracket
 * @methodOf ran.algorithms
 * @param {Function} f Function to find root for. Must accept a single variable.
 * @param {number} a0 Initial lower boundary of the bracket.
 * @param {number} b0 Initial upper boundary of the bracket.
 * @param {?Object[]} s Object containing the constraints on the lower and upper bracket. Each constraint has a
 * <code>closed</code> and <code>value</code> property denoting if the constraint is a closed interval and the value of
 * the boundaries. If not set, (-inf, inf) is applied.
 * @return {(number[]|undefined)} Array containing the bracket around the root if successful, undefined otherwise.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (f, a0, b0, s) {
  // If initial boundaries are invalid, return undefined.
  if (a0 === b0) {
    return
  }

  // Start searching.
  let a = Math.min(a0, b0)
  const min = s ? s[0].value : -Infinity
  let deltaA = s && s[0].closed ? 0 : 1
  let b = Math.max(a0, b0)
  const max = s ? s[1].value : Infinity
  let deltaB = s && s[1].closed ? 0 : 1
  let f1 = f(a)
  let f2 = f(b)
  for (let k = 0; k < __WEBPACK_IMPORTED_MODULE_0__special_core__["c" /* MAX_ITER */]; k++) {
    // If we have different signs, we are done.
    if (f1 * f2 < 0.0) {
      return [a, b]
    }

    // If lower boundary has a smaller value, extend to the left.
    if (Math.abs(f1) < Math.abs(f2)) {
      a = Math.max(a + SCALE * (a - b), min + deltaA)
      deltaA /= SCALE
      f1 = f(a)
    } else if (Math.abs(f1) > Math.abs(f2)) {
      // If upper boundary has a smaller value, extend to the right.
      b = Math.min(b + SCALE * (b - a), max - deltaB)
      deltaB /= SCALE
      f2 = f(b)
    } else {
      // If they have the same value, extend in both sides.
      a = Math.max(a - 1, min + deltaA)
      deltaA /= SCALE
      f1 = f(a)
      b = Math.min(b + 1, max + deltaB)
      deltaB /= SCALE
      f2 = f(b)
    }
  }

  // Return boundary anyway.
  return [a0 || a, b0 || b]
});


/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_error__ = __webpack_require__(10);



/**
 * Generator for the [alpha distribution]{@link https://docs.scipy.org/doc/scipy-1.0.0/reference/tutorial/stats/continuous_alpha.html}:
 *
 * $$f(x; \alpha) = \frac{\phi\Big(\alpha - \frac{\beta}{x}\Big)}{x^2 \Phi(\alpha)},$$
 *
 * where \(\alpha, \beta > 0\) and \(\phi(x), \Phi(x)\) denote the probability density and cumulative probability
 * functions of the [normal distribution]{@link #dist.Normal}.
 * Support: \(x > 0\).
 *
 * @class Alpha
 * @memberOf ran.dist
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @param {number=} beta Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  // Source: Johnson, Kotz, and Balakrishnan (1994). Continuous Univariate Distributions — Volume 1, Second Edition,
  // John Wiley and Sons, p. 173.
  constructor (alpha = 1, beta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { alpha, beta }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ alpha, beta }, [
      'alpha > 0',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      this._phi(alpha),
      this._phi(alpha) * Math.sqrt(2 * Math.PI)
    ]
  }

  _phi (x) {
    return 0.5 * (1 + Object(__WEBPACK_IMPORTED_MODULE_1__special_error__["a" /* erf */])(x / Math.SQRT2))
  }

  _phiInv (x) {
    return Math.SQRT2 * Object(__WEBPACK_IMPORTED_MODULE_1__special_error__["c" /* erfinv */])(2 * x - 1)
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return this.p.beta * Math.exp(-0.5 * Math.pow(this.p.alpha - this.p.beta / x, 2)) / (x * x * this.c[1])
  }

  _cdf (x) {
    return this._phi(this.p.alpha - this.p.beta / x) / this.c[0]
  }

  _q (p) {
    return this.p.beta / (this.p.alpha - this._phiInv(p * this.c[0]))
  }
});


/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [anglit distribution]{@link https://docs.scipy.org/doc/scipy-1.0.0/reference/tutorial/stats/continuous_anglit.html}:
 *
 * $$f(x) = \frac{1}{\beta} \cos\bigg(2 \frac{x - \mu}{\beta}\bigg),$$
 *
 * where\(\mu \in \mathbb{R}\) and \(\beta > 0\).
 * Support: \(x \in \Big[\mu-\frac{\beta \pi}{4}, \mu + \frac{\beta \pi}{4}\Big]\).
 *
 * @class Anglit
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} beta Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  // Source: King (2017). Statistics for Process control engineers, John Wiley and Sons, p. 472.
  constructor (mu = 0, beta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, beta }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ mu, beta }, [
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: mu - Math.PI * beta / 4,
      closed: true
    }, {
      value: mu + Math.PI * beta / 4,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      2 / beta,
      2 * mu / beta,
      1 / beta,
      mu / beta - Math.PI / 4
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return Math.cos(this.c[0] * x - this.c[1]) / this.p.beta
  }

  _cdf (x) {
    return Math.pow(Math.sin(this.c[2] * x - this.c[3]), 2)
  }

  _q (p) {
    return this.p.mu + this.p.beta * (Math.asin(Math.sqrt(p)) - Math.PI / 4)
  }
});


/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [arbitrarily bounded arcsine distribution]{@link https://en.wikipedia.org/wiki/Arcsine_distribution#Arbitrary_bounded_support}:
 *
 * $$f(x; a, b) = \frac{1}{\pi \sqrt{(x -a) (b - x)}},$$
 *
 * where \(a, b \in \mathbb{R}\) and \(a < b\).
 * Support: \(x \in [a, b]\).
 *
 * @class Arcsine
 * @memberOf ran.dist
 * @param {number=} a Lower boundary. Default value is 0.
 * @param {number=} b Upper boundary. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  // Source: Feller (1991). An Introduction to Probability Theory and Its Applications — Volume 2, Second Edition,
  // John Wiley and Sons, p. 79.
  constructor (a = 0, b = 1) {
    super('continuous', arguments.length)

    // Set parameters
    this.p = { a, b }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ a, b }, [
      'a < b'
    ])

    // Set support
    this.s = [{
      value: a,
      closed: true
    }, {
      value: b,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      1 / Math.PI,
      b - a,
      0.5 * Math.PI
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return this.c[0] / Math.sqrt((x - this.p.a) * (this.p.b - x))
  }

  _cdf (x) {
    return 2 * this.c[0] * Math.asin(Math.sqrt((x - this.p.a) / this.c[1]))
  }

  _q (p) {
    const s = Math.sin(this.c[2] * p)
    return (s * s) * this.c[1] + this.p.a
  }
});


/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__beta__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Balding-Nichols distribution]{@link https://en.wikipedia.org/wiki/Balding%E2%80%93Nichols_model}:
 *
 * $$f(x; \alpha, \beta) = \frac{x^{\alpha - 1} (1 - x)^{\beta - 1}}{\mathrm{B}(\alpha, \beta)},$$
 *
 * where \(\alpha = \frac{1 - F}{F} p\), \(\beta = \frac{1 - F}{F} (1 - p)\) and \(F, p \in (0, 1)\).
 * Support: \(x \in (0, 1)\). It is simply a re-parametrization of the [beta distribution]{@link #dist.Beta}.
 *
 * @class BaldingNichols
 * @memberOf ran.dist
 * @param {number=} F Fixation index. Default value is 0.5.
 * @param {number=} p Allele frequency. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__beta__["a" /* default */] {
  // Special parametrization of the beta distribution
  // Source: Balding and Nichols. A method for quantifying differentiation between populations at multi-allelic loci and
  // its implications for investigating identity and paternity. Genetica (96) 3-12, 1995.
  constructor (F = 0.5, p = 0.5) {
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ F, p }, [
      'F > 0', 'F < 1',
      'p > 0', 'p < 1'
    ])
    const f = (1 - F) / F
    super(f * p, f * (1 - p))

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: 1,
      closed: false
    }]
  }
});


/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__irwin_hall__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Bates distribution]{@link https://en.wikipedia.org/wiki/Bates_distribution}:
 *
 * $$f(x; n, a, b) = \frac{n}{(b - a)(n - 1)!} \sum_{k = 0}^{\lfloor nz \rfloor} (-1)^k \begin{pmatrix}n \\ k \\ \end{pmatrix} (nz - k)^{n - 1},$$
 *
 * with \(z = \frac{x - a}{b - a}\), \(n \in \mathbb{N}^+\) and \(a, b \in \mathbb{R}, a < b\).
 * Support: \(x \in [a, b]\).
 *
 * @class Bates
 * @memberOf ran.dist
 * @param {number=} n Number of uniform variates to sum. If not an integer, it is rounded to the nearest one. Default value is 10.
 * @param {number=} a Lower boundary of the uniform variate. Default value is 0.
 * @param {number=} b Upper boundary of the uniform variate. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__irwin_hall__["a" /* default */] {
  // Transformation of Irwin-Hall
  constructor (n = 3, a = 0, b = 1) {
    const ni = Math.round(n)
    super(ni)

    // Validate parameters
    this.p = Object.assign(this.p, { a, b })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ a, b, n: ni }, [
      'n > 0',
      'a < b'
    ])

    // Set support
    this.s = [{
      value: a,
      closed: true
    }, {
      value: b,
      closed: true
    }]

    // Extend speed-up constants. Note that c in IrwinHall has a length of n + 1
    this.c = this.c.concat([
      n / (b - a),
      n * a / (b - a)
    ])
  }

  _generator () {
    // Direct sampling by transforming Irwin-Hall variate
    return super._generator() / this.c[this.p.n + 1] + this.p.a
  }

  _pdf (x) {
    return this.c[this.p.n + 1] * super._pdf(this.c[this.p.n + 1] * x - this.c[this.p.n + 2])
  }

  _cdf (x) {
    return super._cdf(this.c[this.p.n + 1] * x - this.c[this.p.n + 2])
  }
});


/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Benini distribution]{@link https://en.wikipedia.org/wiki/Benini_distribution}:
 *
 * $$f(x; \alpha, \beta, \sigma) = \bigg(\frac{\alpha}{x} + \frac{2 \beta \ln \frac{x}{\sigma}}{x}\bigg) e^{-\alpha \ln \frac{x}{\sigma} - \beta \ln^2 \frac{x}{\sigma}},$$
 *
 * with \(\alpha, \beta, \sigma > 0\). Support: \(x \in (\sigma, \infty)\).
 *
 * @class Benini
 * @memberOf ran.dist
 * @param {number=} alpha First shape parameter. Default value is 1.
 * @param {number=} beta Second shape parameter. Default value is 1.
 * @param {number=} sigma Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (alpha = 1, beta = 1, sigma = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { alpha, beta, sigma }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ alpha, beta, sigma }, [
      'alpha > 0',
      'beta > 0',
      'sigma > 0'
    ])

    // Set support
    this.s = [{
      value: sigma,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      alpha * alpha,
      4 * beta,
      0.5 / beta
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const y = Math.log(x / this.p.sigma)
    const z = this.p.alpha + this.p.beta * y
    return Math.exp(-y * z) * (z + this.p.beta * y) / x
  }

  _cdf (x) {
    const y = Math.log(x / this.p.sigma)
    return 1 - Math.exp(-y * (this.p.alpha + this.p.beta * y))
  }

  _q (p) {
    return this.p.sigma * Math.exp(this.c[2] * (Math.sqrt(this.c[0] - this.c[1] * Math.log(1 - p)) - this.p.alpha))
  }
});


/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_lambert_w__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Benktander type II distribution]{@link https://en.wikipedia.org/wiki/Benktander_type_II_distribution}:
 *
 * $$f(x; a, b) = e^{\frac{a}{b}(1 - x^b)} x^{b-2} (ax^b - b + 1),$$
 *
 * with \(a > 0\) and \(b \in (0, 1]\). Support: \(x \in [1, \infty)\).
 *
 * @class BenktanderII
 * @memberOf ran.dist
 * @param {number=} a Scale parameter. Default value is 1.
 * @param {number=} b Shape parameter. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (a = 1, b = 0.5) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { a, b }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ a, b }, [
      'a > 0',
      'b > 0', 'b <= 1'
    ])

    // Set support
    this.s = [{
      value: 1,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      (1 - b) / a,
      Math.exp(-a / b),
      b / (b - 1),
      Math.log(a / (1 - b)) + a / (1 - b),
      1 - b < Number.EPSILON
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    // b = 1
    if (this.c[4]) {
      return this.p.a * Math.exp(this.p.a * (1 - x))
    }

    // All other cases
    const y = Math.pow(x, this.p.b)
    return Math.exp(this.p.a * (1 - y) / this.p.b) * Math.pow(x, this.p.b - 2) * (this.p.a * y - this.p.b + 1)
  }

  _cdf (x) {
    // b = 1
    if (this.c[4]) {
      return 1 - Math.exp(this.p.a * (1 - x))
    }

    // All other cases
    return 1 - Math.pow(x, this.p.b - 1) * Math.exp(this.p.a * (1 - Math.pow(x, this.p.b)) / this.p.b)
  }

  _q (p) {
    // b = 1
    if (this.c[4]) {
      return 1 - Math.log(1 - p) / this.p.a
    }

    // Check if b is too close to 1
    const w = Object(__WEBPACK_IMPORTED_MODULE_0__special_lambert_w__["a" /* lambertW0 */])(Math.pow(this.c[1] * (1 - p), this.c[2]) / this.c[0])
    if (!Number.isFinite(w)) {
      // 1 - b << 1, use logarithms
      const l1 = this.c[3] + this.c[2] * Math.log(1 - p)
      const l2 = Math.log(l1)

      // W(x) ~= ln(x) - ln ln(x) - ln(x) / (ln ln(x))
      return Math.pow(this.c[0] * (l1 - l2 + l2 / l1), 1 / this.p.b)
    } else {
      // All other cases
      return Math.pow(this.c[0] * w, 1 / this.p.b)
    }
  }
});


/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__categorical__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Bernoulli distribution]{@link https://en.wikipedia.org/wiki/Bernoulli_distribution}:
 *
 * $$f(k; p) = \begin{cases}p &\quad\text{if $k = 1$},\\1 - p &\quad\text{if $k = 0$},\\\end{cases}$$
 *
 * where \(p \in [0, 1]\). Support: \(k \in \{0, 1\}\).
 *
 * @class Bernoulli
 * @memberOf ran.dist
 * @param {number=} p Probability of the outcome 1. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__categorical__["a" /* default */] {
  // Special case of categorical
  constructor (p = 0.5) {
    super([1 - p, p])

    // Validate parameter
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ p }, [
      'p >= 0',
      'p <= 1'
    ])
  }

  _q (p) {
    return p > 1 - this.p.p ? 1 : 0
  }
});


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__categorical__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_log_beta__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__special_log_binomial__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [beta-binomial distribution]{@link https://en.wikipedia.org/wiki/Beta-binomial_distribution}:
 *
 * $$f(k; n, \alpha, \beta) = \begin{pmatrix}n \\ k \\ \end{pmatrix} \frac{\mathrm{B}(\alpha + k, \beta + n - k)}{\mathrm{B}(\alpha, \beta)},$$
 *
 * with \(n \in \mathbb{N}_0\) and \(\alpha, \beta > 0\). Support: \(k \in \{0, ..., n\}\).
 *
 * @class BetaBinomial
 * @memberOf ran.dist
 * @param {number=} n Number of trials. Default value is 10.
 * @param {number=} alpha First shape parameter. Default value is 1.
 * @param {number=} beta Second shape parameter. Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__categorical__["a" /* default */] {
  // Special case of categorical
  constructor (n = 10, alpha = 1, beta = 2) {
    const ni = Math.round(n)
    super(Array.from({ length: ni + 1 }, (d, i) => Math.exp(Object(__WEBPACK_IMPORTED_MODULE_2__special_log_binomial__["a" /* default */])(ni, i) + Object(__WEBPACK_IMPORTED_MODULE_1__special_log_beta__["a" /* default */])(i + alpha, ni - i + beta) - Object(__WEBPACK_IMPORTED_MODULE_1__special_log_beta__["a" /* default */])(alpha, beta))))

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ n: ni, alpha, beta }, [
      'n >= 0',
      'alpha > 0',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: ni,
      closed: true
    }]
  }
});


/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_gamma__ = __webpack_require__(2);


/**
 * Logarithm of the beta function.
 *
 * @method logBeta
 * @methodOf ran.special
 * @param {number} x First argument.
 * @param {number} y Second argument.
 * @returns {number} The logarithm of the beta function.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (x, y) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__log_gamma__["a" /* default */])(x) + Object(__WEBPACK_IMPORTED_MODULE_0__log_gamma__["a" /* default */])(y) - Object(__WEBPACK_IMPORTED_MODULE_0__log_gamma__["a" /* default */])(x + y)
});


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__beta__ = __webpack_require__(12);



/**
 * Generator for the [beta prime distribution]{@link https://en.wikipedia.org/wiki/Beta_prime_distribution} (also
 * known as inverted beta):
 *
 * $$f(x; \alpha, \beta) = \frac{x^{\alpha - 1}(1 + x)^{-\alpha - \beta}}{\mathrm{B}(\alpha, \beta)},$$
 *
 * with \(\alpha, \beta > 0\) and \(\mathrm{B}(x, y)\) is the beta function.
 * Support: \(x > 0\).
 *
 * @class BetaPrime
 * @memberOf ran.dist
 * @param {number=} alpha First shape parameter. Default value is 2.
 * @param {number=} beta Second shape parameter. Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__beta__["a" /* default */] {
  // Transformation of beta distribution
  constructor (alpha = 2, beta = 2) {
    super(alpha, beta)

    // Set support
    this.s = [{
      value: 0,
      closed: alpha >= 1
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling from gamma (ignoring super)
    const x = Object(__WEBPACK_IMPORTED_MODULE_0__core__["d" /* gamma */])(this.r, this.p.alpha, 1)

    const y = Object(__WEBPACK_IMPORTED_MODULE_0__core__["d" /* gamma */])(this.r, this.p.beta, 1)
    return x / y
  }

  _pdf (x) {
    return super._pdf(x / (1 + x)) / Math.pow(1 + x, 2)
  }

  _cdf (x) {
    return super._cdf(x / (1 + x))
  }
});


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__beta__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [beta-rectangular distribution]{@link https://en.wikipedia.org/wiki/Beta_rectangular_distribution}:
 *
 * $$f(x; \alpha, \beta, \theta, a, b) = \theta \frac{(x - a)^{\alpha - 1} (b - x)^{\beta - 1}}{\mathrm{B}(\alpha, \beta) (b - a)^{\alpha + \beta - 1}} + \frac{1 - \theta}{b - a},$$
 *
 * with \(\alpha, \beta > 0\), \(\theta \in [0, 1]\), \(a, b \in \mathbb{R}\), \(a < b\) and \(\mathrm{B}(x, y)\) is the beta function. Support: \(x \in [a, b]\).
 *
 * @class BetaRectangular
 * @memberOf ran.dist
 * @param {number=} alpha First shape parameter. Default value is 1.
 * @param {number=} beta Second shape parameter. Default value is 1.
 * @param {number=} theta Mixture parameter. Default value is 0.5.
 * @param {number=} a Lower boundary of the support. Default value is 0.
 * @param {number=} b Upper boundary of the support. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__beta__["a" /* default */] {
  constructor (alpha = 1, beta = 1, theta = 0.5, a = 0, b = 1) {
    super(alpha, beta)

    // Validate parameters
    this.p = Object.assign(this.p, { theta, a, b })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ theta, a, b }, [
      'theta >= 0', 'theta <= 1',
      'a < b'
    ])

    // Set support
    this.s = [{
      value: a,
      closed: true
    }, {
      value: b,
      closed: true
    }]

    // Speed-up constants. Note that Beta has 3 speed-up constants
    this.c = this.c.concat([
      b - a,
      1 - theta
    ])
  }

  _generator () {
    // Direct sampling by mixing beta and uniform variates
    return this.r.next() < this.p.theta
      ? super._generator() * this.c[3] + this.p.a
      : this.r.next() * this.c[3] + this.p.a
  }

  _pdf (x) {
    return (this.p.theta * super._pdf((x - this.p.a) / this.c[3]) + this.c[4]) / this.c[3]
  }

  _cdf (x) {
    const y = x - this.p.a
    return this.p.theta * super._cdf(y / this.c[3]) + this.c[4] * y / this.c[3]
  }
});


/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_binomial__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__categorical__ = __webpack_require__(7);




/**
 * Generator for the [binomial distribution]{@link https://en.wikipedia.org/wiki/Binomial_distribution}:
 *
 * $$f(k; n, p) = \begin{pmatrix}n \\ k \\ \end{pmatrix} p^k (1 - p)^{n - k},$$
 *
 * with \(n \in \mathbb{N}_0\) and \(p \in [0, 1]\). Support: \(k \in \{0, ..., n\}\).
 *
 * @class Binomial
 * @memberOf ran.dist
 * @param {number=} n Number of trials. Default value is 100.
 * @param {number=} p Probability of success. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_2__categorical__["a" /* default */] {
  // Special case of categorical
  constructor (n = 100, p = 0.5) {
    const ni = Math.round(n)
    super(Array.from({ length: ni + 1 }, (d, k) => Math.exp(Object(__WEBPACK_IMPORTED_MODULE_0__special_log_binomial__["a" /* default */])(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p))))

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ n: ni, p }, [
      'n >= 0',
      'p >= 0', 'p <= 1'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: ni,
      closed: true
    }]
  }
});


/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__normal__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Birnbaum-Saunders distribution]{@link https://en.wikipedia.org/wiki/Birnbaum%E2%80%93Saunders_distribution} (also known as fatigue life distribution):
 *
 * $$f(x; \mu, \beta, \gamma) = \frac{z + 1 / z}{2 \gamma (x - \mu)} \phi\Big(\frac{z - 1 / z}{\gamma}\Big),$$
 *
 * with \(\mu \in \mathbb{R}\), \(\beta, \gamma > 0\), \(z = \sqrt{\frac{x - \mu}{\beta}}\) and \(\phi(x)\) is the probability density function of the standard [normal distribution]{@link #dist.Normal}. Support: \(x \in (\mu, \infty)\).
 *
 * @class BirnbaumSaunders
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} beta Scale parameter. Default value is 1.
 * @param {number=} gamma Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__normal__["a" /* default */] {
  // Transformation of normal distribution
  constructor (mu = 0, beta = 1, gamma = 1) {
    super()

    // Validate parameters
    this.p = Object.assign(this.p, { mu2: mu, beta, gamma })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ mu, beta, gamma }, [
      'beta > 0',
      'gamma > 0'
    ])

    // Set support
    this.s = [{
      value: mu,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming normal variate
    const n = this.p.gamma * super._generator()
    return this.p.beta * 0.25 * Math.pow(n + Math.sqrt(4 + Math.pow(n, 2)), 2) + this.p.mu2
  }

  _pdf (x) {
    const z = Math.sqrt((x - this.p.mu2) / this.p.beta)
    return (z + 1 / z) * super._pdf((z - 1 / z) / this.p.gamma) / (2 * this.p.gamma * (x - this.p.mu2))
  }

  _cdf (x) {
    const z = Math.sqrt((x - this.p.mu2) / this.p.beta)
    return super._cdf((z - 1 / z) / this.p.gamma)
  }

  _q (p) {
    const n = this.p.gamma * super._q(p)
    return this.p.beta * 0.25 * Math.pow(n + Math.sqrt(4 + Math.pow(n, 2)), 2) + this.p.mu2
  }
});


/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pre_computed__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);




/**
 * Generator for the [Borel distribution]{@link https://en.wikipedia.org/wiki/Borel_distribution}:
 *
 * $$f(k; \mu) = \frac{e^{-\mu k} (\mu k)^{k - 1}}{k!},$$
 *
 * where \(\mu \in [0, 1]\). Support: \(k \in \mathbb{N}^+\).
 *
 * @class Borel
 * @memberOf ran.dist
 * @param {number} mu Distribution parameter. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__pre_computed__["a" /* default */] {
  constructor (mu = 0.5) {
    super(true)

    // Validate parameters
    this.p = { mu }
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ mu }, [
      'mu >= 0', 'mu <= 1'
    ])

    // Set support
    this.s = [{
      value: 1,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _pk (k) {
    if (k < 1) {
      return -Infinity
    }

    // mu = 0 case
    if (this.p.mu < Number.EPSILON) {
      return k === 1 ? 0 : -Infinity
    }

    return (k - 1) * Math.log(this.p.mu * k) - this.p.mu * k - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_gamma__["a" /* default */])(k + 1)
  }
});


/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pre_computed__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);




/**
 * Generator for the [Borel-Tanner distribution]{@link https://en.wikipedia.org/wiki/Borel_distribution#Borel%E2%80%93Tanner_distribution}:
 *
 * $$f(k; \mu, n) = \frac{n}{k}\frac{e^{-\mu k} (\mu k)^{k - n}}{(k - n)!},$$
 *
 * where \(\mu \in [0, 1]\) and \(n \in \mathbb{N}^+\). Support: \(k \ge n\).
 *
 * @class BorelTanner
 * @memberOf ran.dist
 * @param {number} mu Distribution parameter. Default value is 0.5.
 * @param {number} n Number of Borel distributed variates to add. If not an integer, it is rounded to the nearest one.
 * Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__pre_computed__["a" /* default */] {
  constructor (mu = 0.5, n = 2) {
    super()

    // Validate parameters
    const ni = Math.round(n)
    this.p = { mu, n: ni }
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ mu, n: ni }, [
      'mu >= 0', 'mu <= 1',
      'n > 0'
    ])

    // Set support
    this.s = [{
      value: ni,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _pk (k) {
    if (k < this.p.n) {
      return 0
    }

    // mu = 0 case
    if (this.p.mu < Number.EPSILON) {
      return k === this.p.n ? 1 : 0
    }

    const kn = k - this.p.n
    return (this.p.n / k) * Math.exp(kn * Math.log(this.p.mu * k) - this.p.mu * k - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_gamma__["a" /* default */])(kn + 1))
  }
});


/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [bounded Pareto distribution]{@link https://en.wikipedia.org/wiki/Pareto_distribution#Bounded_Pareto_distribution}:
 *
 * $$f(x; L, H, \alpha) = \frac{\alpha L^\alpha x^{-\alpha - 1}}{1 - \big(\frac{L}{H}\big)^\alpha},$$
 *
 * with \(L, H > 0\), \(H > L\) and \(\alpha > 0\). Support: \(x \in [L, H]\).
 *
 * @class BoundedPareto
 * @memberOf ran.dist
 * @param {number=} L Lower boundary. Default value is 1.
 * @param {number=} H Upper boundary. Default value is 10.
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (L = 1, H = 10, alpha = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { L, H, alpha }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ L, H, alpha }, [
      'L > 0',
      'H > 0',
      'L < H',
      'alpha > 0'
    ])

    // Set support
    this.s = [{
      value: L,
      closed: true
    }, {
      value: H,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      Math.pow(L, alpha),
      Math.pow(H, alpha),
      (1 - Math.pow(L / H, alpha))
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return this.p.alpha * Math.pow(this.p.L / x, this.p.alpha) / (x * this.c[2])
  }

  _cdf (x) {
    return (1 - this.c[0] * Math.pow(x, -this.p.alpha)) / this.c[2]
  }

  _q (p) {
    return Math.pow((this.c[1] + p * (this.c[0] - this.c[1])) / (this.c[0] * this.c[1]), -1 / this.p.alpha)
  }
});


/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Bradford distribution]{@link https://docs.scipy.org/doc/scipy/reference/tutorial/stats/continuous_bradford.html}:
 *
 * $$f(x; c) = \frac{c}{\ln(1 + c) (1 + c x)},$$
 *
 * with \(c > 0\). Support: \(x \in [0, 1]\).
 *
 * @class Bradford
 * @memberOf ran.dist
 * @param {number=} c Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (c = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { c }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ c }, [
      'c > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: 1,
      closed: true
    }]

    // Speed-up constants
    const c0 = Math.log(1 + c)
    this.c = [
      c0,
      c / c0
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return this.c[1] / (1 + this.p.c * x)
  }

  _cdf (x) {
    return Math.log(1 + this.p.c * x) / this.c[0]
  }

  _q (p) {
    return (Math.exp(this.c[0] * p) - 1) / this.p.c
  }
});


/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Burr (XII) distribution]{@link https://en.wikipedia.org/wiki/Burr_distribution} (also known as
 * Singh-Maddala distribution):
 *
 * $$f(x; c, k) = c k \frac{x^{c - 1}}{(1 + x^c)^{k + 1}},$$
 *
 * with \(c, k > 0\). Support: \(x > 0\).
 *
 * @class Burr
 * @memberOf ran.dist
 * @param {number=} c First shape parameter. Default value is 1.
 * @param {number=} k Second shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (c = 1, k = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { c, k }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ c, k }, [
      'c > 0',
      'k > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      c * k,
      -1 / k,
      1 / c
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const y = Math.pow(x, this.p.c)
    return this.c[0] * y / (x * Math.pow(1 + y, this.p.k + 1))
  }

  _cdf (x) {
    return 1 - Math.pow(1 + Math.pow(x, this.p.c), -this.p.k)
  }

  _q (p) {
    return Math.pow(Math.pow(1 - p, this.c[1]) - 1, this.c[2])
  }
});


/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chi2__ = __webpack_require__(26);



/**
 * Generator for the [\(\chi\) distribution]{@link https://en.wikipedia.org/wiki/Chi_distribution}:
 *
 * $$f(x; k) = \frac{1}{2^{k/2 - 1} \Gamma(k/2)} x^{k - 1} e^{-x^2/2},$$
 *
 * where \(k \in \mathbb{N}^+\). Support: \(x > 0\).
 *
 * @class Chi
 * @memberOf ran.dist
 * @param {number=} k Degrees of freedom. If not an integer, is rounded to the nearest integer. Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__chi2__["a" /* default */] {
  // Transformation of chi2 distribution
  constructor (k = 2) {
    super(k)

    // Validate parameters
    const ki = Math.round(k)
    this.p = Object.assign(this.p, { k: ki })
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ k: ki }, [
      'k > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming chi2 variate
    return Math.sqrt(super._generator())
  }

  _pdf (x) {
    if (this.p.k === 1 && x === 0) {
      return Math.sqrt(2 / Math.PI)
    } else {
      return 2 * x * super._pdf(x * x)
    }
  }

  _cdf (x) {
    return super._cdf(x * x)
  }
});


/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [degenerate distribution]{@link https://en.wikipedia.org/wiki/Degenerate_distribution}:
 *
 * $$f(x; x_0) = \begin{cases}1 &\quad\text{if $x = x_0$}\\0 &\quad\text{otherwise}\\\end{cases},$$
 *
 * where \(x_0 \in \mathbb{R}\). Support: \(x \in \mathbb{R}\).
 *
 * @class Degenerate
 * @memberOf ran.dist
 * @param {number=} x0 Location of the distribution. Default value is 0.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (x0 = 0) {
    super('continuous', arguments.length)
    this.p = { x0 }
    this.s = [{
      value: x0,
      closed: true
    }, {
      value: x0,
      closed: true
    }]
  }

  _generator () {
    // Direct sampling
    return this.p.x0
  }

  _pdf () {
    return 1
  }
});


/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pre_computed__ = __webpack_require__(14);





/**
 * Generator for the [Delaporte distribution]{@link }:
 *
 * $$f(k; \alpha, \beta, \lambda) = \frac{e^{-\lambda}}{\Gamma(\alpha)}\sum_{j = 0}^k \frac{\Gamma(\alpha + j) \beta^j \lambda^{k - j}}{j! (1 + \beta)^{\alpha + j} (k - j)!},$$
 *
 * with \(\alpha, \beta, \lambda > 0\). Support: \(k \in \mathbb{N}_0\). For \(\lambda = 0\), it is the [negative binomial]{@link #dist.NegativeBinomial}, and for \(\alpha = \beta = 0\) it is the [Poisson distribution]{@link #dist.Poisson}. Note that these special cases are not covered by this class. For these distributions, please refer to the corresponding generators.
 *
 * @class Delaporte
 * @memberOf ran.dist
 * @param {number=} alpha Shape parameter of the gamma component. Default component is 1.
 * @param {number=} beta Scale parameter of the gamma component. Default value is 1.
 * @param {number=} lambda Mean of the Poisson component. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__pre_computed__["a" /* default */] {
  constructor (alpha = 1, beta = 1, lambda = 1) {
    // Using raw probability mass values
    super(true)

    // Validate parameters
    this.p = { alpha, beta, lambda }
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ alpha, beta, lambda }, [
      'alpha > 0',
      'beta > 0',
      'lambda > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      beta / (lambda * (1 + beta)),
      -lambda - alpha * Math.log(1 + beta),
      Math.log(lambda)
    ]
  }

  _pk (k) {
    // Set i = 0 term
    let ki = k
    let dz = 1
    let z = dz

    // Advance until k - 1
    for (let j = 1; j < k; j++) {
      dz *= (this.p.alpha + j - 1) * this.c[0] * ki / j
      ki--
      z += dz
    }

    // If k > 0, add last term
    if (k > 0) {
      dz *= (this.p.alpha + k - 1) * this.c[0] / k
      z += dz
    }

    // Return sum with constants
    return Math.log(z) + k * this.c[2] - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_gamma__["a" /* default */])(k + 1) + this.c[1]
  }

  _generator () {
    // Direct sampling as compound Poisson
    const j = Object(__WEBPACK_IMPORTED_MODULE_1__core__["d" /* gamma */])(this.r, this.p.alpha, 1 / this.p.beta)
    return Object(__WEBPACK_IMPORTED_MODULE_1__core__["g" /* poisson */])(this.r, this.p.lambda + j)
  }
});


/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the discrete
 * [uniform distribution]{@link https://en.wikipedia.org/wiki/Discrete_uniform_distribution}:
 *
 * $$f(k; x_\mathrm{min}, x_\mathrm{max}) = \frac{1}{x_\mathrm{max} - x_\mathrm{min} + 1},$$
 *
 * with \(x_\mathrm{min}, x_\mathrm{max} \in \mathbb{Z}\) and \(x_\mathrm{min} < x_\mathrm{max}\). Support: \(k \in \{x_\mathrm{min}, ..., x_\mathrm{max}\}\).
 *
 * @class DiscreteUniform
 * @memberOf ran.dist
 * @param {number=} xmin Lower boundary. If not an integer, it is rounded to the nearest one. Default value is 0.
 * @param {number=} xmax Upper boundary. If not an integer, it is rounded to the nearest one. Default value is 100.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (xmin = 0, xmax = 100) {
    super('discrete', arguments.length)

    // Validate parameters
    const xmini = Math.round(xmin)
    const xmaxi = Math.round(xmax)
    this.p = { xmin: xmini, xmax: xmaxi }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ xmin: xmini, xmax: xmaxi }, [
      'xmin <= xmax'
    ])

    // Set support
    this.s = [{
      value: this.p.xmin,
      closed: true
    }, {
      value: this.p.xmax,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      this.p.xmax - this.p.xmin + 1
    ]
  }

  _generator () {
    // Direct sampling
    return this._q(this.r.next())
  }

  _pdf () {
    return 1 / this.c[0]
  }

  _cdf (x) {
    return (1 + x - this.p.xmin) / this.c[0]
  }

  _q (p) {
    return Math.floor(p * this.c[0]) + this.p.xmin
  }
});


/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [discrete Weibull distribution]{@link https://en.wikipedia.org/wiki/Discrete_Weibull_distribution} (using the original parametrization):
 *
 * $$f(k; q, \beta) = q^{k^\beta} - q^{(k + 1)^\beta},$$
 *
 * with \(q \in (0, 1)\) and \(\beta > 0\). Support: \(k \in \mathbb{N}_0\).
 *
 * @class DiscreteWeibull
 * @memberOf ran.dist
 * @param {number=} q First shape parameter. Default value is 0.5.
 * @param {number=} beta Second shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (q = 0.5, beta = 1) {
    super('discrete', arguments.length)

    // Validate parameters
    this.p = { q, beta }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ q, beta }, [
      'q > 0', 'q < 1',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return Math.pow(this.p.q, Math.pow(x, this.p.beta)) - Math.pow(this.p.q, Math.pow(x + 1, this.p.beta))
  }

  _cdf (x) {
    return 1 - Math.pow(this.p.q, Math.pow(x + 1, this.p.beta))
  }

  _q (p) {
    return Math.floor(Math.pow(Math.log(1 - p) / Math.log(this.p.q), 1 / this.p.beta))
  }
});


/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gamma__ = __webpack_require__(11);


/**
 * Generator for the [double gamma distribution]{@link https://docs.scipy.org/doc/scipy/reference/tutorial/stats/continuous_dgamma.html} (with the same shape/rate parametrization that the [gamma distribution]{@link #dist.Gamma} uses):
 *
 * $$f(x; \alpha, \beta) = \frac{\beta^\alpha}{2 \Gamma(\alpha)} |x|^{\alpha - 1} e^{-\beta |x|},$$
 *
 * where \(\alpha, \beta > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class DoubleGamma
 * @memberOf ran.dist
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @param {number=} beta Rate parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__gamma__["a" /* default */] {
  // Transformation of gamma
  constructor (alpha = 1, beta = 1) {
    super(alpha, beta)

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    return super._generator() * (this.r.next() < 0.5 ? -1 : 1)
  }

  _pdf (x) {
    return super._pdf(Math.abs(x)) / 2
  }

  _cdf (x) {
    const y = super._cdf(Math.abs(x))
    return (x > 0 ? 1 + y : 1 - y) / 2
  }
});


/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__weibull__ = __webpack_require__(27);


/**
 * Generator for the [double Weibull distribution]{@link https://docs.scipy.org/doc/scipy/reference/tutorial/stats/continuous_dweibull.html}:
 *
 * $$f(x; \lambda, k) = \frac{k}{\lambda}\bigg(\frac{|x|}{\lambda}\bigg)^{k - 1} e^{-(|x| / \lambda)^k},$$
 *
 * with \(\lambda, k > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class DoubleWeibull
 * @memberOf ran.dist
 * @param {number=} lambda Scale parameter. Default value is 1.
 * @param {number=} k Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__weibull__["a" /* default */] {
  // Transformation of Weibull
  constructor (lambda = 1, k = 1) {
    super(lambda, k)

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    return super._generator() * (this.r.next() < 0.5 ? -1 : 1)
  }

  _pdf (x) {
    return super._pdf(Math.abs(x)) / 2
  }

  _cdf (x) {
    const y = super._cdf(Math.abs(x))
    return (x > 0 ? 1 + y : 1 - y) / 2
  }

  _q (p) {
    return p > 0.5
      ? super._q(2 * p - 1)
      : -super._q(1 - 2 * p)
  }
});


/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doubly_noncentral_beta__ = __webpack_require__(56);


/**
 * Generator for the [doubly non-central F distribution]{@link https://rdrr.io/cran/sadists/f/inst/doc/sadists.pdf}:
 *
 * $$f(x; d_1, d_2, \lambda_1, \lambda_2) = \frac{d_1}{d_2} e^{-\frac{\lambda_1 + \lambda_2}{2}} \sum_{k = 0}^\infty \sum_{l = 0}^\infty \frac{\big(\frac{\lambda_1}{2}\big)^k}{k!} \frac{\big(\frac{\lambda_2}{2}\big)^l}{l!} \frac{\big(\frac{d_1 x}{d_2}\big)^{\frac{d_1}{2} + k - 1}}{\big(1 + \frac{d_1 x}{d_2}\big)^{\frac{d_1 + d_2}{2} + k + l}} \frac{1}{\mathrm{B}\big(\frac{d_1}{2} + k, \frac{d_2}{2} + l\big)},$$
 *
 * where \(d_1, d_2 \in \mathbb{N}^+\) and \(\lambda_1, \lambda_2 \ge 0\). Support: \(x > 0\).
 *
 * @class DoublyNoncentralF
 * @memberOf ran.dist
 * @param {number=} d1 First degrees of freedom. If not an integer, it is rounded to the nearest one. Default value is 2.
 * @param {number=} d2 Second degrees of freedom. If not an integer, it is rounded to the nearest one. Default value is 2.
 * @param {number=} lambda1 First non-centrality parameter. Default value is 1.
 * @param {number=} lambda2 Second non-centrality parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__doubly_noncentral_beta__["a" /* default */] {
  // Transformation of double non-central beta
  constructor (d1 = 2, d2 = 2, lambda1 = 1, lambda2 = 1) {
    super(d1 / 2, d2 / 2, lambda1, lambda2)

    // Validate parameters
    const d1i = Math.round(d1)
    const d2i = Math.round(d2)
    this.p = Object.assign(this.p, { d1: d1i, d2: d2i })

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming a doubly non-central beta
    const x = super._generator()
    return this.p.d2 * x / (this.p.d1 * (1 - x))
  }

  _pdf (x) {
    const n = this.p.d1 / this.p.d2
    return n * super._pdf(x / (1 / n + x)) / Math.pow(1 + n * x, 2)
  }

  _cdf (x) {
    return super._cdf(x / (this.p.d2 / this.p.d1 + x))
  }
});


/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__algorithms_start_index__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_gamma__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__algorithms_accelerated_sum__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__algorithms_recursive_sum__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__noncentral_t__ = __webpack_require__(58);










/**
 * Generator for the [doubly non-central t distribution]{@link https://cran.r-project.org/web/packages/sadists/sadists.pdf}:
 *
 * $$f(x; \nu, \mu, \theta) = \frac{e^{-\frac{\theta + \mu^2}{2}}}{\sqrt{\pi \nu}} \sum_{j = 0}^\infty \frac{1}{j!} \frac{(x \mu \sqrt{2 / \nu})^j}{(1 + x^2 / \nu)^{\frac{\nu + j + 1}{2}}} \frac{\Gamma\big(\frac{\nu + j + 1}{2}\big)}{\Gamma\big(\frac{\nu}{2}\big)} {}_1F_1\bigg(\frac{\nu + j + 1}{2}, \frac{\nu}{2}; \frac{\theta}{2 (1 + x^2 / \nu)}\bigg),$$
 *
 * where \(\nu \in \mathbb{N}^+\), \(\mu \in \mathbb{R}\) and \(\theta > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class DoublyNoncentralT
 * @memberOf ran.dist
 * @param {number} nu Degrees of freedom. If not an integer, it is rounded to the nearest one. Default value is 1.
 * @param {number} mu Location parameter. Default value is 1.
 * @param {number} theta Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (nu = 1, mu = 1, theta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    const nui = Math.round(nu)
    this.p = { nu: nui, mu, theta }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ nu: nui, mu, theta }, [
      'nu > 0',
      'theta >= 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      -0.5 * (theta + mu * mu + Math.log(Math.PI * nui)) - Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(nui / 2),
      Math.exp(-theta / 2)
    ]
  }

  /**
   * Advances the hypergeometric function forward in its first argument.
   *
   * @method _f11Forward
   * @methodOf ran.dist.DoublyNoncentralT
   * @param {number} f1 Function value for one iteration before.
   * @param {number} f2 Function value for two iterations before.
   * @param {number} a First argument.
   * @param {number} b Second argument.
   * @param {number} z Third argument.
   * @returns {number} The function value at the current iteration.
   * @private
   */
  _f11Forward (f1, f2, a, b, z) {
    return ((2 * a - b + z) * f1 + (b - a) * f2) / a
  }

  /**
   * Advances the hypergeometric function backward in its first argument.
   *
   * @method _f11Backward
   * @methodOf ran.dist.DoublyNoncentralT
   * @param {number} f1 Function value for one iteration ahead.
   * @param {number} f2 Function value for two iterations ahead.
   * @param {number} a First argument.
   * @param {number} b Second argument.
   * @param {number} z Third argument.
   * @returns {number} The function value at the current iteration.
   * @private
   */
  _f11Backward (f1, f2, a, b, z) {
    return (a * f2 - (2 * a - b + z) * f1) / (b - a)
  }

  /**
   * Logarithm of the term in the probability density function.
   *
   * @method _logA
   * @methodOf ran.dist.DoublyNoncentralT
   * @param {number} x Value to evaluate density at.
   * @param {number} j Index of the term to evaluate.
   * @returns {number} The logarithm of the term.
   * @private
   */
  _logA (x, j) {
    const tk = 1 + x * x / this.p.nu
    const kj = (this.p.nu + j + 1) / 2
    return j * Math.log(Math.abs(x * this.p.mu / Math.sqrt(this.p.nu / 2))) +
      Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(kj) -
      kj * Math.log(tk) -
      Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(j + 1) +
      Math.log(Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj, this.p.nu / 2, this.p.theta / (2 * tk)))
  }

  _generator () {
    // Direct sampling from a normal and a non-central chi2
    const x = Object(__WEBPACK_IMPORTED_MODULE_4__core__["f" /* normal */])(this.r, this.p.mu)
    const y = Object(__WEBPACK_IMPORTED_MODULE_4__core__["e" /* noncentralChi2 */])(this.r, this.p.nu, this.p.theta)
    return x / Math.sqrt(y / this.p.nu)
  }

  _pdf (x) {
    // Some pre-computed constants
    const nu2 = this.p.nu / 2
    const tk = 1 + x * x / this.p.nu
    const srtk = Math.sqrt(tk)
    const lntk = Math.log(tk)
    const tmuk = Math.abs(x * this.p.mu / Math.sqrt(nu2))
    const lntmuk = Math.log(tmuk)
    const thetatk = this.p.theta / (2 * tk)

    // Find index with highest amplitude
    const j0 = Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_start_index__["a" /* default */])(j => this._logA(x, j))

    let z = 0
    if (x * this.p.mu >= 0) {
      // Init terms
      let kj0 = (this.p.nu + j0 + 1) / 2
      let gp = Math.exp(this.c[0] + j0 * lntmuk - Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(j0 + 1) - kj0 * lntk)
      let gk0 = Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma__["a" /* default */])(kj0)
      let f10 = Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0, nu2, thetatk)

      // Forward
      z = Object(__WEBPACK_IMPORTED_MODULE_7__algorithms_recursive_sum__["a" /* default */])({
        gp,
        gk: [
          gk0,
          Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma__["a" /* default */])(kj0 - 0.5)
        ],
        g: gp * gk0,
        f1: [
          f10,
          Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 - 0.5, nu2, thetatk)
        ],
        f2: [
          Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 - 1, nu2, thetatk),
          Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 - 1.5, nu2, thetatk)
        ],
        f: f10
      }, (t, i) => {
        const j = j0 + i
        const j2 = i % 2
        const kj = (this.p.nu + j + 1) / 2
        t.gp *= tmuk / (j * srtk)
        t.gk[j2] *= kj - 1
        t.g = t.gp * t.gk[j2]

        t.f = this._f11Forward(t.f1[j2], t.f2[j2], kj - 1, nu2, thetatk)
        t.f2[j2] = t.f1[j2]
        t.f1[j2] = t.f
        return t
      }, t => t.g * t.f)

      // Backward
      if (j0 > 0) {
        kj0 -= 0.5
        gp *= j0 * srtk / tmuk
        gk0 = Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma__["a" /* default */])(kj0)
        f10 = Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0, nu2, thetatk)
        z += Object(__WEBPACK_IMPORTED_MODULE_7__algorithms_recursive_sum__["a" /* default */])({
          gp: gp,
          gk: [
            gk0,
            Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma__["a" /* default */])(kj0 + 0.5)
          ],
          g: gp * gk0,
          f1: [
            f10,
            Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 + 0.5, this.p.nu / 2, thetatk)
          ],
          f2: [
            Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 + 1, this.p.nu / 2, thetatk),
            Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 + 1.5, this.p.nu / 2, thetatk)
          ],
          f: f10
        }, (t, i) => {
          const j = j0 - i
          if (j > 0) {
            const j2 = i % 2
            const kj = (this.p.nu + j) / 2

            t.gp /= tmuk / (j * srtk)
            t.gk[j2] /= kj
            t.g = t.gp * t.gk[j2]

            t.f = this._f11Backward(t.f1[j2], t.f2[j2], kj + 1, nu2, thetatk)
            t.f2[j2] = t.f1[j2]
            t.f1[j2] = t.f
          } else {
            t.g = 0
            t.f = 0
          }
          return t
        }, t => t.g * t.f)
      }
    } else {
      // Forward
      let kj0 = (this.p.nu + j0 + 1) / 2
      const gp0 = Math.exp(this.c[0] + (j0 - 1) * lntmuk - Object(__WEBPACK_IMPORTED_MODULE_2__special_log_gamma__["a" /* default */])(j0) - (kj0 - 0.5) * lntk)
      const gk0 = Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma__["a" /* default */])(kj0 - 1)
      const gk1 = Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma__["a" /* default */])(kj0 - 0.5)
      let gk = [gk0, gk1]
      let f2 = [
        Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 - 2, nu2, thetatk),
        Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 - 1.5, nu2, thetatk)
      ]
      let f1 = [
        Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 - 1, nu2, thetatk),
        Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 - 0.5, nu2, thetatk)
      ]

      let gp = gp0
      z += Object(__WEBPACK_IMPORTED_MODULE_6__algorithms_accelerated_sum__["a" /* default */])(i => {
        const j = j0 + i
        const j2 = i % 2
        const kj = (this.p.nu + j + 1) / 2

        gp *= tmuk / (j * srtk)
        gk[j2] *= kj - 1
        const g = gp * gk[j2]

        const f = this._f11Forward(f1[j2], f2[j2], kj - 1, nu2, thetatk)
        f2[j2] = f1[j2]
        f1[j2] = f

        return g * f
      })

      // Backward
      if (j0 > 0) {
        kj0 -= 0.5
        let gp = gp0 * tmuk / (j0 * srtk)
        gk = [gk1 * kj0, gk0 * (kj0 - 0.5)]
        f2 = [
          Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 + 2, nu2, thetatk),
          Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 + 1.5, nu2, thetatk)
        ]
        f1 = [
          Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 + 1, nu2, thetatk),
          Object(__WEBPACK_IMPORTED_MODULE_5__special_hypergeometric__["a" /* f11 */])(kj0 + 0.5, nu2, thetatk)
        ]
        z -= Object(__WEBPACK_IMPORTED_MODULE_6__algorithms_accelerated_sum__["a" /* default */])(i => {
          const j = j0 - i
          const j2 = i % 2
          const kj = (this.p.nu + j) / 2
          let dz = 0

          if (j > 0) {
            gp /= tmuk / (j * srtk)
            gk[j2] /= kj
            const g = gp * gk[j2]

            const f = this._f11Backward(f1[j2], f2[j2], kj + 1, nu2, thetatk)
            f2[j2] = f1[j2]
            f1[j2] = f

            dz = g * f
          }

          return dz
        })
      }
    }

    return Math.abs(z)
  }

  _cdf (x) {
    // Sum of the product of Poisson weights and single non-central t CDF
    // Source: https://www.wiley.com/en-us/Intermediate+Probability%3A+A+Computational+Approach-p-9780470026373

    const y = Math.abs(x)
    const mu = x < 0 ? -this.p.mu : this.p.mu
    const z = Object(__WEBPACK_IMPORTED_MODULE_7__algorithms_recursive_sum__["a" /* default */])({
      p: this.c[1],
      f: __WEBPACK_IMPORTED_MODULE_8__noncentral_t__["a" /* default */].fnm(this.p.nu, mu, y)
    }, (t, i) => {
      const i2 = 2 * i
      t.p *= this.p.theta / i2
      t.f = __WEBPACK_IMPORTED_MODULE_8__noncentral_t__["a" /* default */].fnm(this.p.nu + i2, mu, y * Math.sqrt(1 + i2 / this.p.nu))
      return t
    }, t => t.p * t.f)
    return Math.min(1, Math.max(0, x < 0 ? 1 - z : z))
  }
});


/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Finds the index corresponding to the largest term in a series.
 *
 * @method startIndex
 * @memberOf ran.algorithms
 * @param {Function} term Function that accepts an index and returns the term.
 * @returns {number} The index of the largest term.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (term) {
  // Bracket maximum
  let j1 = 1
  let f1 = term(j1)
  let j2 = 2
  let f2 = term(j2)
  let j = 3
  let f
  while (f2 >= f1) {
    // Calculate new value
    j = j1 + j2
    f = term(j)

    // Update indices if new value is larger
    if (f >= f2) {
      j1 = j2
      j2 = j
      f1 = f2
      f2 = f
    } else {
      break
    }
  }

  // Close bracket
  let a = j1
  let fa = f1
  let b = j
  let fb = f
  let m
  let fm
  while (a !== b) {
    // Add middle point
    m = Math.floor((a + b) / 2)
    fm = term(m)

    // Check if boundary is small enough
    if (m === a || m === b) {
      break
    }

    // Update
    if (fa > fb) {
      fb = fm
      b = m
    } else {
      fa = fm
      a = m
    }
  }

  return m
});


/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = f11;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_gamma__ = __webpack_require__(2);


// TODO Implementation: https://people.maths.ox.ac.uk/porterm/papers/hypergeometric-final.pdf

/* function _isInteger (x) {
  return Math.abs(Math.floor(x) - x) < Number.EPSILON
} */

function _f11TaylorSeries (a, b, z) {
  // Replace with faster method (Method b)
  return 1 + Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
    a: a * z / b
  }, (t, i) => {
    t.a *= (a + i) * z / ((b + i) * (i + 1))
    return t
  }, t => t.a)
}

function _f11AsymptoticSeries (a, b, z) {
  const s = 1 + Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
    c: (b - a) * (1 - a) / z
  }, (t, i) => {
    t.c *= (b - a + i) * (1 - a + i) / ((i + 1) * z)
    return t
  }, t => t.c)
  return Math.exp(z + (a - b) * Math.log(z) + Object(__WEBPACK_IMPORTED_MODULE_1__log_gamma__["a" /* default */])(b) - Object(__WEBPACK_IMPORTED_MODULE_1__log_gamma__["a" /* default */])(a)) * s
}

/* function _f21TaylorSeries (a, b, c, z) {
  return 1 + recursiveSum({
    c: a * b * z / c
  }, (t, i) => {
    t.c *= (a + i) * (b + i) * z / ((c + i) * (i + 1))
    return t
  }, t => t.c)
} */

function f11 (a, b, z) {
  // Special cases
  if (Math.abs(a) < Number.EPSILON) {
    return 1
  }

  if (Math.abs(z) < 50) {
    return _f11TaylorSeries(a, b, z)
  } else {
    return _f11AsymptoticSeries(a, b, z)
  }
}

/* function f21 (a, b, c, z) {
  // 15.3.8 in Abramowitz & Stegun
  // TODO Handle a - b
  if (z < -1) {
    let y = 1 / (1 - z)
    let f1 = Math.exp(-a * Math.log(1 - z) + logGamma(c) + logGamma(b - a) - logGamma(b) - logGamma(c - a)) * _f21TaylorSeries(a, c - b, a - b + 1, y)
    let f2 = Math.exp(-b * Math.log(1 - z) + logGamma(c) + logGamma(a - b) - logGamma(a) - logGamma(c - b)) * _f21TaylorSeries(b, c - a, b - a + 1, y)
    return f1 + f2
  }

  // 15.3.4 in Abramowitz & Stegun
  if (z < 0) {
    return Math.pow(1 - z, -a) * _f21TaylorSeries(a, c - b, c, z / (1 - z))
  }

  // z -> z
  if (z <= 0.5) {
    return _f21TaylorSeries(a, b, c, z)
  }

  if (z <= 1) {
    // Eq. (4.7): z -> 1 - z
    let y = 1 - z
    let d = c - a - b
    let f1 = Math.exp(-logGamma(c - a) - logGamma(c - b)) * _f21TaylorSeries(a, b, 1 - d, y)
    let f2 = Math.exp(d * Math.log(y) - logGamma(a) - logGamma(b)) * _f21TaylorSeries(c - a, c - b, d + 1, y)
    return Math.PI * (f1 + f2) / Math.sin(Math.PI * d)
  }

  if (z <= 2) {
    // Eq. (4.8): z -> 1 - 1 / z
    let y = 1 - 1 / z
    let d = c - a - b
    let f1 = Math.pow(z, -a) * Math.exp(-logGamma(c - a) - logGamma(c - b)) * _f21TaylorSeries(a, a - c + 1, 1 - d, y)
    let f2 = Math.pow(1 - z, d) * Math.exp((a - c) * Math.log(z) - logGamma(a) - logGamma(b)) * _f21TaylorSeries(c - a, 1 - a, d + 1, y)
    return Math.PI * (f1 + f2) / Math.sin(Math.PI * d)
  }

  // Eq. (4.9): z -> 1 / z
  let y = 1 / z
  let f1 = Math.pow(-z, -a) * Math.exp(-logGamma(b) - logGamma(c - a)) * _f21TaylorSeries(a, a - c + 1, a - b + 1, y)
  let f2 = Math.pow(-z, -b) * Math.exp(-logGamma(z) - logGamma(c - b)) * _f21TaylorSeries(b - c + 1, b, b - a + 1, y)
  return Math.PI * (f1 + f2)  / Math.sin(Math.PI * (b - a))
} */


/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gamma__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Erlang distribution]{@link https://en.wikipedia.org/wiki/Erlang_distribution}:
 *
 * $$f(x; k, \lambda) = \frac{\lambda^k x^{k - 1} e^{-\lambda x}}{(k - 1)!},$$
 *
 * where \(k \in \mathbb{N}^+\) and \(\lambda > 0\). Support: \(x \ge 0\).
 *
 * @class Erlang
 * @memberOf ran.dist
 * @param {number=} k Shape parameter. It is rounded to the nearest integer. Default value is 1.
 * @param {number=} lambda Rate parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__gamma__["a" /* default */] {
  // Special case of gamma
  constructor (k = 1, lambda = 1) {
    const ki = Math.round(k)
    super(ki, lambda)

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ k: ki, lambda }, [
      'k > 0',
      'lambda > 0'
    ])
  }
});


/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [exponential-logarithmic distribution]{@link https://en.wikipedia.org/wiki/Exponential-logarithmic_distribution#Related_distribution}:
 *
 * $$f(x; p, \beta) = -\frac{1}{\ln p} \frac{\beta (1 - p) e^{-\beta x}}{1 - (1 - p) e^{-\beta x}},$$
 *
 * with \(p \in (0, 1)\) and \(\beta > 0\). Support: \(x \ge 0\).
 *
 * @class ExponentialLogarithmic
 * @memberOf ran.dist
 * @param {number=} p Shape parameter. Default value is 0.5.
 * @param {number=} beta Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (p = 0.5, beta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { p, beta }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ p, beta }, [
      'p > 0', 'p < 1',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const y = (1 - this.p.p) * Math.exp(-this.p.beta * x)
    return this.p.beta * y / ((y - 1) * Math.log(this.p.p))
  }

  _cdf (x) {
    return 1 - Math.log(1 - (1 - this.p.p) * Math.exp(-this.p.beta * x)) / Math.log(this.p.p)
  }

  _q (p) {
    return (Math.log(1 - this.p.p) - Math.log(1 - Math.pow(this.p.p, 1 - p))) / this.p.beta
  }
});


/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Flory-Schulz distribution]{@link https://en.wikipedia.org/wiki/Flory%E2%80%93Schulz_distribution}:
 *
 * $$f(k; a) = a^2 k (1 - a)^{k - 1},$$
 *
 * with \(a \in (0, 1)\). Support: \(k \in \mathbb{N}^+\).
 *
 * @class FlorySchulz
 * @memberOf ran.dist
 * @param {number=} a Shape parameter. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (a = 0.5) {
    super('discrete', arguments.length)

    // Validate parameters
    this.p = { a }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ a }, [
      'a > 0', 'a < 1'
    ])

    // Set support
    this.s = [{
      value: 1,
      closed: true
    }, {
      value: Infinity,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      1 - a
    ]
  }

  _generator () {
    // Inverse transform sampling
    let k = 1
    const r = this.r.next()
    let ak = 1 + this.p.a
    let p = this.c[0]
    while (r < p * ak) {
      ak += this.p.a
      p *= this.c[0]
      k++
    }
    return k
  }

  _pdf (x) {
    return this.p.a * this.p.a * x * Math.pow(this.c[0], x - 1)
  }

  _cdf (x) {
    return 1 - Math.pow(this.c[0], x) * (1 + this.p.a * x)
  }
});


/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Frechet distribution]{@link https://en.wikipedia.org/wiki/Frechet_distribution}:
 *
 * $$f(x; \alpha, s, m) = \frac{\alpha z^{-1 -\alpha} e^{-z^{-\alpha}}}{s},$$
 *
 * with \(z = \frac{x - m}{s}\). and \(\alpha, s > 0\), \(m \in \mathbb{R}\). Support: \(x \in \mathbb{R}, x > m\).
 *
 * @class Frechet
 * @memberOf ran.dist
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @param {number=} s Scale parameter. Default value is 1.
 * @param {number=} m Location parameter. Default value is 0.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (alpha = 1, s = 1, m = 0) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { alpha, s, m }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ alpha, s, m }, [
      'alpha > 0',
      's > 0'
    ])

    // Set support
    this.s = [{
      value: m,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const z = (x - this.p.m) / this.p.s
    return this.p.alpha * Math.exp(-Math.log(z) * (1 + this.p.alpha) - Math.pow(z, -this.p.alpha)) / this.p.s
  }

  _cdf (x) {
    return Math.exp(-Math.pow((x - this.p.m) / this.p.s, -this.p.alpha))
  }

  _q (p) {
    return this.p.m + this.p.s * Math.pow(-Math.log(p), -1 / this.p.alpha)
  }
});


/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__f__ = __webpack_require__(59);


/**
 * Generator for [Fisher's z distribution]{@link https://en.wikipedia.org/wiki/Fisher%27s_z-distribution}:
 *
 * $$f(x; d_1, d_2) = \sqrt{\frac{d_1^{d_1} d_2^{d_2}}{(d_1 e^{2 x} + d_2)^{d_1 + d_2}}} \frac{2 e^{d_1 x}}{\mathrm{B}\big(\frac{d_1}{2}, \frac{d_2}{2}\big)},$$
 *
 * with \(d_1, d_2 > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class FisherZ
 * @memberOf ran.dist
 * @param {number=} d1 First degree of freedom. Default value is 2.
 * @param {number=} d2 Second degree of freedom. Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__f__["a" /* default */] {
  // Transformation of F
  constructor (d1 = 1, d2 = 1) {
    const d1i = Math.round(d1)
    const d2i = Math.round(d2)
    super(d1i / 2, d2i / 2)

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming F variate
    return 0.5 * Math.log(super._generator())
  }

  _pdf (x) {
    const y = Math.exp(2 * x)
    return super._pdf(y) * 2 * y
  }

  _cdf (x) {
    return super._cdf(Math.exp(2 * x))
  }
});


/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Gamma/Gompertz distribution]{@link https://en.wikipedia.org/wiki/Gamma/Gompertz_distribution}:
 *
 * $$f(x; b, s, \beta) = \frac{b s e^{b x} \beta^s}{(\beta - 1 + e^{b x})^{s + 1}},$$
 *
 * with \(b, s, \beta > 0\). Support: \(x \ge 0\).
 *
 * @class GammaGompertz
 * @memberOf ran.dist
 * @param {number=} b Scale parameter. Default value is 1.
 * @param {number=} s First shape parameter. Default value is 1.
 * @param {number=} beta Second shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (b = 1, s = 1, beta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { b, s, beta }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ b, s, beta }, [
      'b > 0',
      's > 0',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const y = Math.exp(this.p.b * x)
    const z = Math.pow(this.p.beta - 1 + y, this.p.s + 1)
    return Number.isFinite(y) && Number.isFinite(z) ? this.p.b * this.p.s * Math.pow(this.p.beta, this.p.s) * y / z : 0
  }

  _cdf (x) {
    return 1 - Math.pow(1 + (Math.exp(this.p.b * x) - 1) / this.p.beta, -this.p.s)
  }

  _q (p) {
    return Math.log(1 + this.p.beta * (Math.pow(1 - p, -1 / this.p.s) - 1)) / this.p.b
  }
});


/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_lambert_w__ = __webpack_require__(18);



/**
 * Generator for the [generalized exponential distribution]{@link https://docs.scipy.org/doc/scipy/reference/tutorial/stats/continuous_genexpon.html}:
 *
 * $$f(x; a, b, c) = \big(a + b (1 - e^{-c x})\big) e^{-(a + b)x + \frac{b}{c} (1 - e^{-c x})},$$
 *
 * where \(a, b, c > 0\). Support> \(x \ge 0\).
 *
 * @class GeneralizedExponential
 * @memberOf ran.dist
 * @param {number=} a First shape parameter. Default value is 1.
 * @param {number=} b Second shape parameter. Default value is 1.
 * @param {number=} c Third shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (a = 1, b = 1, c = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { a, b, c }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ a, b, c }, [
      'a > 0',
      'b > 0',
      'c > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const z = this.p.b * (1 - Math.exp(-this.p.c * x))
    return (this.p.a + z) * Math.exp(-(this.p.a + this.p.b) * x + z / this.p.c)
  }

  _cdf (x) {
    return 1 - Math.exp(-(this.p.a + this.p.b) * x + this.p.b * (1 - Math.exp(-this.p.c * x)) / this.p.c)
  }

  _q (p) {
    const ab = this.p.a + this.p.b
    const w = Object(__WEBPACK_IMPORTED_MODULE_1__special_lambert_w__["a" /* lambertW0 */])(-this.p.b * Math.exp((this.p.c * Math.log(1 - p) - this.p.b) / ab) / ab)
    return (this.p.b * w + this.p.a * w + this.p.b - this.p.c * Math.log(1 - p)) / (this.p.c * ab)
  }
});


/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [generalized extreme value distribution]{@link https://docs.scipy.org/doc/scipy/reference/tutorial/stats/continuous_genextreme.html}:
 *
 * $$f(x; c) = (1 - cx)^{1 / c - 1} e^{-(1 - cx)^{1 / c}},$$
 *
 * with \(c \ne 0\). Support: \(x \in (-\infty, 1 / c]\) if \(c > 0\), \(x \in [1 / c, \infty)\) otherwise.
 *
 * @class GeneralizedExtremeValue
 * @memberOf ran.dist
 * @param {number=} c Shape parameter. Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (c = 2) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { c }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ c }, [
      'c != 0'
    ])

    // Set support
    this.s = [{
      value: c > 0 ? -Infinity : 1 / c,
      closed: c < 0
    }, {
      value: c > 0 ? 1 / c : Infinity,
      closed: c > 0
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return Math.exp(-Math.pow(1 - this.p.c * x, 1 / this.p.c)) * Math.pow(1 - this.p.c * x, 1 / this.p.c - 1)
  }

  _cdf (x) {
    return Math.exp(-Math.pow(1 - this.p.c * x, 1 / this.p.c))
  }

  _q (p) {
    return (1 - Math.pow(-Math.log(p), this.p.c)) / this.p.c
  }
});


/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pre_computed__ = __webpack_require__(14);





/**
 * Generator for the [generalized Hermite distribution]{@link https://en.wikipedia.org/wiki/Hermite_distribution}:
 *
 * $$f(k; a_1, a_m, m) = p_0 \frac{\mu^k (m - d)^k}{(m - 1)^k} \sum_{j = 0}^{\lfloor k / m \rfloor} \frac{(d - 1)^j (m - 1)^{(m - 1)j}}{m^j \mu^{(m - 1)j} (m - d)^{mj} (k - mj)! j!},$$
 *
 * where \(p_0 = e^{\mu \big[\frac{d - 1}{m} - 1\big]}\), \(m\mu = a_1 + m a_m\), \(d = \frac{a_1 + m^2 a_m}{a_1 + m a_m}\), \(a_1, a_m > 0\) and \(m \in \mathbb{N}^+ \ \{1\}\).
 * Support: \(k \in \mathbb{N}\). It is the distribution of \(X_1 + m X_m\) where \(X_1, X_2\) are Poisson variates with
 * parameters \(a_1, a_m\) respectively.
 *
 * @class GeneralizedHermite
 * @memberOf ran.dist
 * @param {number=} a1 Mean of the first Poisson component. Default value is 1.
 * @param {number=} am Mean of the second Poisson component. Default value is 1.
 * @param {number=} m Multiplier of the second Poisson. If not an integer, it is rounded to the nearest one. Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__pre_computed__["a" /* default */] {
  constructor (a1 = 1, a2 = 1, m = 2) {
    // Using raw probability mass values
    super(true)

    // Validate parameters
    const mi = Math.round(m)
    this.p = { a1, a2, m: mi }
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ a1, a2, m: mi }, [
      'a1 > 0',
      'a2 > 0',
      'm > 1'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      Math.log(a1 + m * a2),
      (a1 + m * m * a2) / (a1 + m * a2),
      -a1 - a2
    ]
  }

  _pk (k) {
    if (k === 0) {
      return this.c[2]
    }

    if (k < this.p.m) {
      return this.c[2] + k * this.c[0] - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_gamma__["a" /* default */])(k + 1) + k * Math.log((this.p.m - this.c[1]) / (this.p.m - 1))
    }

    return this.c[0] +
      Math.log((this.c[1] - 1) * Math.exp(this.pdfTable[k - this.p.m]) + (this.p.m - this.c[1]) * Math.exp(this.pdfTable[k - 1])) -
      Math.log((k * (this.p.m - 1)))
  }

  _generator () {
    return Object(__WEBPACK_IMPORTED_MODULE_1__core__["g" /* poisson */])(this.r, this.p.a1) + this.p.m * Object(__WEBPACK_IMPORTED_MODULE_1__core__["g" /* poisson */])(this.r, this.p.a2)
  }
});


/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [generalized logistic distribution]{@link https://docs.scipy.org/doc/scipy/reference/tutorial/stats/continuous_genlogistic.html}:
 *
 * $$f(x; \mu, s, c) = \frac{c e^{-z}}{s (1 + e^{-z})^{c + 1}},$$
 *
 * with \(z = \frac{x - \mu}{s}\), \(\mu \in \mathbb{R}\) and \(s, c > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class GeneralizedLogistic
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} s Scale parameter. Default value is 1.
 * @param {number=} c Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (mu = 0, s = 1, c = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, s, c }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ mu, s, c }, [
      's > 0',
      'c > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const z = Math.exp(-(x - this.p.mu) / this.p.s)
    return Number.isFinite(z * z)
      ? this.p.c * z / (this.p.s * Math.pow(1 + z, this.p.c + 1))
      : 0
  }

  _cdf (x) {
    return 1 / Math.pow(1 + Math.exp(-(x - this.p.mu) / this.p.s), this.p.c)
  }

  _q (p) {
    return this.p.mu - this.p.s * Math.log(Math.pow(p, -1 / this.p.c) - 1)
  }
});


/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [geometric distribution]{@link https://en.wikipedia.org/wiki/Geometric_distribution} (the number of
 * failures before the first success definition):
 *
 * $$f(k; p) = p (1 - p)^k,$$
 *
 * with \(p \in (0, 1]\). Support: \(k \in \{0, 1, 2, ...\}\). Note that the [discrete exponential distribution]{@link https://docs.scipy.org/doc/scipy/reference/tutorial/stats/discrete_planck.html} is also a geometric distribution with rate parameter equal to \(-\ln(1 - p)\).
 *
 * @class Geometric
 * @memberOf ran.dist
 * @param {number} p Probability of success. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (p = 0.5) {
    super('discrete', arguments.length)

    // Validate parameters
    this.p = { p }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ p }, [
      'p > 0', 'p <= 1'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return this.p.p * Math.pow(1 - this.p.p, x)
  }

  _cdf (x) {
    return 1 - Math.pow(1 - this.p.p, x + 1)
  }

  _q (p) {
    return Math.floor(Math.log(1 - p) / Math.log(1 - this.p.p))
  }
});


/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_normal__ = __webpack_require__(63);


/**
 * Generator for the [Gilbrat's distribution]{@link http://mathworld.wolfram.com/GibratsDistribution.html}:
 *
 * $$f(x) = \frac{1}{x \sqrt{2 \pi}}e^{-\frac{\ln x^2}{2}}.$$
 *
 * Support: \(x > 0\). Note that this distribution is simply a special case of the [log-normal]{@link #dist.LogNormal}.
 *
 * @class Gilbrat
 * @memberOf ran.dist
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__log_normal__["a" /* default */] {
  // Special case of log-normal
  constructor () {
    super(0, 1)
  }
});


/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Gompertz distribution]{@link https://en.wikipedia.org/wiki/Gompertz_distribution}:
 *
 * $$f(x; \eta, b) = b \eta e^{\eta + bx - \eta e^{bx}} ,$$
 *
 * with \(\eta, b > 0\). Support: \(x \ge 0\).
 *
 * @class Gompertz
 * @memberOf ran.dist
 * @param {number=} eta Shape parameter. Default value is 1.
 * @param {number=} beta Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (eta = 1, b = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { eta, b }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ eta, b }, [
      'eta > 0',
      'b > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return this.p.b * this.p.eta * Math.exp(this.p.eta + this.p.b * x - this.p.eta * Math.exp(this.p.b * x))
  }

  _cdf (x) {
    return 1 - Math.exp(-this.p.eta * (Math.exp(this.p.b * x) - 1))
  }

  _q (p) {
    return Math.log(1 - Math.log(1 - p) / this.p.eta) / this.p.b
  }
});


/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Gumbel distribution]{@link https://en.wikipedia.org/wiki/Gumbel_distribution}:
 *
 * $$f(x; \mu, \beta) = \frac{1}{\beta} e^{-(z + e^{-z})},$$
 *
 * with \(z = \frac{x - \mu}{\beta}\) and \(\mu \in \mathbb{R}\), \(\beta > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class Gumbel
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} beta Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (mu = 0, beta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, beta }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ mu, beta }, [
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const z = (x - this.p.mu) / this.p.beta
    return Math.exp(-(z + Math.exp(-z))) / this.p.beta
  }

  _cdf (x) {
    return Math.exp(-Math.exp(-(x - this.p.mu) / this.p.beta))
  }

  _q (p) {
    return this.p.mu - this.p.beta * Math.log(-Math.log(p))
  }
});


/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generalized_normal__ = __webpack_require__(61);


/**
 * Generator for the [half generalized normal distribution]{@link https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.halfgennorm.html}:
 *
 * $$f(x; \alpha, \beta) = \frac{\beta}{\Gamma\big(\frac{1}{\beta}\big)} e^{-|x|^\beta},$$
 *
 * with \(\alpha, \beta > 0\). Support: \(x > 0\).
 *
 * @class HalfGeneralizedNormal
 * @memberOf ran.dist
 * @param {number=} alpha Scale parameter. Default value is 1.
 * @param {number=} beta Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__generalized_normal__["a" /* default */] {
  constructor (alpha = 1, beta = 1) {
    super(0, alpha, beta)

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming normal variate
    return Math.abs(super._generator())
  }

  _pdf (x) {
    return 2 * super._pdf(x)
  }

  _cdf (x) {
    return 2 * super._cdf(x) - 1
  }
});


/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [half-logistic distribution]{@link https://en.wikipedia.org/wiki/Half-logistic_distribution}:
 *
 * $$f(x) = \frac{2 e^{-x}}{(1 + e^{-x})^2}.$$
 *
 * Support: \(x \in [0, \infty)\).
 *
 * @class HalfLogistic
 * @memberOf ran.dist
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor () {
    super('continuous', arguments.length)

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const y = Math.exp(-x)
    return 2 * y / Math.pow(1 + y, 2)
  }

  _cdf (x) {
    const y = Math.exp(-x)
    return (1 - y) / (1 + y)
  }

  _q (p) {
    return -Math.log((1 - p) / (1 + p))
  }
});


/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__normal__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_error__ = __webpack_require__(10);



/**
 * Generator for the [half-normal distribution]{@link https://en.wikipedia.org/wiki/Half-normal_distribution}:
 *
 * $$f(x; \sigma) = \frac{\sqrt{2}}{\sigma\sqrt{\pi}} e^{-\frac{x^2}{2\sigma^2}},$$
 *
 * with \(\sigma > 0\). Support: \(x \ge 0\).
 *
 * @class HalfNormal
 * @memberOf ran.dist
 * @param {number=} sigma Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__normal__["a" /* default */] {
  // Transformation of normal distribution
  constructor (sigma = 1) {
    super(0, sigma)

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming normal variate
    return Math.abs(super._generator())
  }

  _pdf (x) {
    return 2 * super._pdf(x)
  }

  _cdf (x) {
    return 2 * super._cdf(x) - 1
  }

  _q (p) {
    return this.p.sigma * 1.414213562373095 * Object(__WEBPACK_IMPORTED_MODULE_1__special_error__["c" /* erfinv */])(p)
  }
});


/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pre_computed__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__special_log_binomial__ = __webpack_require__(16);




/**
 * Generator for the [heads-minus-tails distribution]{@link http://mathworld.wolfram.com/Heads-Minus-TailsDistribution.html}:
 *
 * $$f(k; n) = \begin{cases}\Big(\frac{1}{2}\Big)^{2n} \begin{pmatrix}2n \\ n \\ \end{pmatrix} &\quad\text{if $k = 0$},\\2 \Big(\frac{1}{2}\Big)^{2n} \begin{pmatrix}2n \\ m + n \\ \end{pmatrix} &\quad\text{if $k = 2m$},\\0 &\quad\text{else}\\ \end{cases}$$
 *
 * where \(n \in \mathbb{N}^+\). Support: \(k \in [0, n]\).
 *
 * @class HeadsMinusTails
 * @memberOf ran.dist
 * @param {number=} n Half number of trials. Default value is 10.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__pre_computed__["a" /* default */] {
  constructor (n = 10) {
    super(true)

    // Validate parameters
    const ni = Math.round(n)
    this.p = { n: ni }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ n: ni }, [
      'n >= 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: 2 * ni,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      2 * ni * Math.log(0.5)
    ]
  }

  _pk (k) {
    if (k === 0) {
      return this.c[0] + Object(__WEBPACK_IMPORTED_MODULE_2__special_log_binomial__["a" /* default */])(2 * this.p.n, this.p.n)
    } else {
      return k % 2 === 0
        ? Math.log(2) + this.c[0] + Object(__WEBPACK_IMPORTED_MODULE_2__special_log_binomial__["a" /* default */])(2 * this.p.n, Math.round(k / 2) + this.p.n)
        : -Infinity
    }
  }

  _generator () {
    let heads = 0
    for (let i = 0; i < 2 * this.p.n; i++) {
      heads += this.r.next() > 0.5 ? 0 : 1
    }
    return Math.abs(2 * heads - 2 * this.p.n)
  }
});


/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_gamma_incomplete__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [Hoyt distribution]{@link https://en.wikipedia.org/wiki/Nakagami_distribution} (also known as
 * Nakagami-q distribution):
 *
 * $$f(x; q, \omega) = \frac{2q^q}{\Gamma(q) \omega^q} x^{2q - 1} e^{-\frac{q}{\omega} x^2},$$
 *
 * where \(q \in (0, 1]\) and \(\omega > 0\). Support: \(x > 0\).
 *
 * @class Hoyt
 * @memberOf ran.dist
 * @param {number=} q Shape parameter. Default value is 0.5.
 * @param {number=} omega Spread parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (q = 0.5, omega = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { q, omega }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ q, omega }, [
      'q > 0', 'q <= 1',
      'omega > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      2 * Math.pow(this.p.q, this.p.q) / Math.pow(this.p.omega, this.p.q)
    ]
  }

  _generator () {
    // Direct sampling from gamma
    return Math.sqrt(Object(__WEBPACK_IMPORTED_MODULE_2__core__["d" /* gamma */])(this.r, this.p.q, this.p.q / this.p.omega))
  }

  _pdf (x) {
    const z = Math.pow(x, 2 * this.p.q - 1)

    // Handle q < 0.5 and x << 0 case
    if (!Number.isFinite(z)) {
      return 0
    } else {
      return 2 * Math.exp(this.p.q * Math.log(this.p.q) - this.p.q * x * x / this.p.omega - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_gamma__["a" /* default */])(this.p.q) - this.p.q * Math.log(this.p.omega)) * z
    }
  }

  _cdf (x) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma_incomplete__["a" /* gammaLowerIncomplete */])(this.p.q, this.p.q * x * x / this.p.omega)
  }
});


/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [hyperbolic secant distribution]{@link https://en.wikipedia.org/wiki/Hyperbolic_secant_distribution}:
 *
 * $$f(x) = \frac{1}{2}\mathrm{sech}\Big(\frac{\pi}{2} x\Big).$$
 *
 * Support: \(x \in \mathbb{R}\).
 *
 * @class HyperbolicSecant
 * @memberOf ran.dist
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor () {
    super('continuous', arguments.length)
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return 0.5 / Math.cosh(0.5 * Math.PI * x)
  }

  _cdf (x) {
    return 2 * Math.atan(Math.exp(0.5 * Math.PI * x)) / Math.PI
  }

  _q (p) {
    return 2 * Math.log(Math.tan(0.5 * Math.PI * p)) / Math.PI
  }
});


/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alias_table__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__algorithms_neumaier__ = __webpack_require__(20);





/**
 * Generator for the [hyperexponential distribution]{@link }:
 *
 * $$f(x; \{w\}, \{\lambda\}) = \frac{1}{\sum_j w_j} \sum_i w_i \lambda_i e^{-\lambda_i x},$$
 *
 * where \(w_i, \lambda_i > 0\). Support: \(x \ge 0\).
 *
 * @class Hyperexponential
 * @memberOf ran.dist
 * @param {Object[]=} parameters Array containing the rates and corresponding weights. Each array element must be an object with twp properties: weight and rate. Default value is <code>[{weight: 1, rate: 1}, {weight: 1, rate: 1}]</code>.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */] {
  constructor (parameters = [{ weight: 1, rate: 1 }, { weight: 1, rate: 1 }]) {
    super('continuous', parameters.length)

    // Validate parameters
    const weights = parameters.map(d => d.weight)
    const norm = weights.reduce((acc, d) => d + acc, 0)
    this.p = Object.assign(this.p, {
      weights: weights.map(d => d / norm),
      rates: parameters.map(d => d.rate),
      n: weights.length
    })
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({
      lambda_i: parameters.reduce((acc, d) => acc * d.rate, 1),
      n: weights.length
    }, [
      'lambda_i > 0',
      'n > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Categorical generator for weight
    this.aliasTable = new __WEBPACK_IMPORTED_MODULE_1__alias_table__["a" /* default */](parameters.map(d => d.weight))
  }

  _generator () {
    // Direct sampling
    const i = this.aliasTable.sample(this.r)
    return Object(__WEBPACK_IMPORTED_MODULE_0__core__["c" /* exponential */])(this.r, this.p.rates[i])
  }

  _pdf (x) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__algorithms_neumaier__["a" /* default */])(this.p.rates.map((d, i) => this.p.weights[i] * d * Math.exp(-d * x)))
  }

  _cdf (x) {
    return Math.min(Object(__WEBPACK_IMPORTED_MODULE_3__algorithms_neumaier__["a" /* default */])(this.p.rates.map((d, i) => this.p.weights[i] * (1 - Math.exp(-d * x)))), 1)
  }
});


/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_binomial__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__categorical__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);




/**
 * Generator for the [hypergeometric distribution]{@link https://en.wikipedia.org/wiki/Hypergeometric_distribution}:
 *
 * $$f(k; N, K, r) = \frac{\begin{pmatrix}K \\ k \\ \end{pmatrix} \begin{pmatrix}N - k \\ n - k \\ \end{pmatrix}}{\begin{pmatrix}N \\ n \\ \end{pmatrix}},$$
 *
 * with \(N \in \mathbb{N}^+\), \(K \in \{0, 1, ..., N\}\) and \(n \in \{0, 1, ..., N\}\). Support: \(k \in \{\mathrm{max}(0, n+K-N), ..., \mathrm{min}(n, K)\}\).
 *
 * @class Hypergeometric
 * @memberOf ran.dist
 * @param {number=} N Total number of elements to sample from. If not an integer, it is rounded to the nearest one. Default value is 10.
 * @param {number=} K Total number of successes. If not an integer, it is rounded to the nearest one. Default value is 5.
 * @param {number=} n If not an integer, it is rounded to the nearest one. Number of draws. Default value is 5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__categorical__["a" /* default */] {
  // Special case of categorical
  constructor (N = 10, K = 5, n = 5) {
    const Ni = Math.round(N)
    const Ki = Math.round(K)
    const ni = Math.round(n)

    const weights = []
    const min = Math.max(0, ni + Ki - Ni)
    const max = Math.min(ni, Ki)
    for (let k = min; k <= max; k++) {
      weights.push(Math.exp(Object(__WEBPACK_IMPORTED_MODULE_0__special_log_binomial__["a" /* default */])(Ki, k) + Object(__WEBPACK_IMPORTED_MODULE_0__special_log_binomial__["a" /* default */])(Ni - Ki, ni - k) - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_binomial__["a" /* default */])(Ni, ni)))
    }
    super(weights)

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ N: Ni, K: Ki, n: ni }, [
      'N > 0',
      'K >= 0', 'K <= N',
      'n >= 0', 'n <= N'
    ])
  }
});


/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_gamma_incomplete__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [inverse \(\chi^2\) distribution]{@link https://en.wikipedia.org/wiki/Inverse-chi-squared_distribution}:
 *
 * $$f(x; \nu) = \frac{2^{-\nu/2}}{\Gamma(\nu / 2)} x^{-\nu/2 - 1} e^{-1/(2x)},$$
 *
 * with \(\nu > 0\). Support: \(x > 0\).
 *
 * @class InverseChi2
 * @memberOf ran.dist
 * @param {number=} nu Degrees of freedom. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (nu = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    const nui = Math.round(nu)
    this.p = { nu: nui }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ nu: nui }, [
      'nu > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling
    return 1 / Object(__WEBPACK_IMPORTED_MODULE_2__core__["b" /* chi2 */])(this.r, this.p.nu)
  }

  _pdf (x) {
    return Math.pow(2, -this.p.nu / 2) * Math.pow(x, -this.p.nu / 2 - 1) * Math.exp(-0.5 / x - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_gamma__["a" /* default */])(this.p.nu / 2))
  }

  _cdf (x) {
    return 1 - Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma_incomplete__["a" /* gammaLowerIncomplete */])(this.p.nu / 2, 0.5 / x)
  }
});


/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gamma__ = __webpack_require__(11);


/**
 * Generator for the [inverse gamma distribution]{@link https://en.wikipedia.org/wiki/Inverse-gamma_distribution}:
 *
 * $$f(x; \alpha, \beta) = \frac{\beta^\alpha}{\Gamma(\alpha)} x^{-\alpha - 1} e^{-\beta/x},$$
 *
 * where \(\alpha, \beta > 0\). Support: \(x > 0\).
 *
 * @class InverseGamma
 * @memberOf ran.dist
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @param {number=} beta Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__gamma__["a" /* default */] {
  // Transformation of gamma distribution
  constructor (alpha = 1, beta = 1) {
    super(alpha, beta)

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [Math.pow(beta, alpha)]
  }

  _generator () {
    // Direct sampling by transforming gamma variate
    return 1 / super._generator()
  }

  _pdf (x) {
    return super._pdf(1 / x) / (x * x)
  }

  _cdf (x) {
    return 1 - super._cdf(1 / x)
  }
});


/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [inverted Weibull distribution]{@link https://docs.scipy.org/doc/scipy/reference/tutorial/stats/continuous_invweibull.html}:
 *
 * $$f(x; c) = c x^{-c - 1} e^{-x^{-c}},$$
 *
 * with \(c > 0\). Support: \(x \ge 0\).
 *
 * @class InvertedWeibull
 * @memberOf ran.dist
 * @param {number=} c Shape parameter. Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (c = 2) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { c }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ c }, [
      'c > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return this.p.c * Math.pow(x, -1 - this.p.c) * Math.exp(-1 / Math.pow(x, this.p.c))
  }

  _cdf (x) {
    return Math.exp(-1 / Math.pow(x, this.p.c))
  }

  _q (p) {
    return Math.pow(-Math.log(p), -1 / this.p.c)
  }
});


/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__normal__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for [Johnson's \(S_B\) distribution]{@link https://en.wikipedia.org/wiki/Johnson%27s_SU-distribution#Johnson's_SB-distribution}:
 *
 * $$f(x; \gamma, \delta, \lambda, \xi) = \frac{\delta \lambda}{\sqrt{2 \pi} z (\lambda - z)} e^{-\frac{1}{2}\big[\gamma + \delta \ln \frac{z}{\lambda - z}\big]^2},$$
 *
 * with \(\gamma, \xi \in \mathbb{R}\), \(\delta, \lambda > 0\) and \(z = x - \xi\). Support: \(x \in (\xi, \xi + \lambda)\).
 *
 * @class JohnsonSB
 * @memberOf ran.dist
 * @param {number=} gamma First location parameter. Default value is 0.
 * @param {number=} delta First scale parameter. Default value is 1.
 * @param {number=} lambda Second scale parameter. Default value is 1.
 * @param {number=} xi Second location parameter. Default value is 0.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__normal__["a" /* default */] {
  // Transformation of normal distribution
  constructor (gamma = 0, delta = 1, lambda = 1, xi = 0) {
    super()

    // Validate parameters
    this.p = Object.assign(this.p, { gamma, delta, lambda, xi })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ gamma, delta, lambda, xi }, [
      'delta > 0',
      'lambda > 0'
    ])

    // Set support
    this.s = [{
      value: xi,
      closed: true
    }, {
      value: xi + lambda,
      closed: true
    }]
  }

  _generator () {
    // Direct sampling by transforming normal variate
    return this.p.xi + this.p.lambda / (1 + Math.exp(-(super._generator() - this.p.gamma) / this.p.delta))
  }

  _pdf (x) {
    const z = x - this.p.xi
    return this.p.delta * this.p.lambda * super._pdf(this.p.gamma + this.p.delta * Math.log(z / (this.p.lambda - z))) / (z * (this.p.lambda - z))
  }

  _cdf (x) {
    const z = x - this.p.xi
    const lnz = Math.log(z / (this.p.lambda - z))
    return Number.isFinite(lnz) ? super._cdf(this.p.gamma + this.p.delta * lnz) : 0
  }

  _q (p) {
    return this.p.xi + this.p.lambda / (1 + Math.exp(-(super._q(p) - this.p.gamma) / this.p.delta))
  }
});


/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__normal__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for [Johnson's \(S_U\) distribution]{@link https://en.wikipedia.org/wiki/Johnson%27s_SU-distribution}:
 *
 * $$f(x; \gamma, \delta, \lambda, \xi) = \frac{\delta}{\lambda \sqrt{2 \pi}} \frac{e^{-\frac{1}{2}\big[\gamma + \delta \mathrm{sinh}^{-1} z \big]^2}}{\sqrt{1 + z^2}},$$
 *
 * with \(\gamma, \xi \in \mathbb{R}\), \(\delta, \lambda > 0\) and \(z = \frac{x - \xi}{\lambda}\). Support: \(x \in \mathbb{R}\).
 *
 * @class JohnsonSU
 * @memberOf ran.dist
 * @param {number=} gamma First location parameter. Default value is 0.
 * @param {number=} delta First scale parameter. Default value is 1.
 * @param {number=} lambda Second scale parameter. Default value is 1.
 * @param {number=} xi Second location parameter. Default value is 0.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__normal__["a" /* default */] {
  // Transformation of normal distribution
  constructor (gamma = 0, delta = 1, lambda = 1, xi = 0) {
    super()

    // Validate parameters
    this.p = Object.assign(this.p, { gamma, delta, lambda, xi })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ gamma, delta, lambda, xi }, [
      'delta > 0',
      'lambda > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming normal variate
    return this.p.xi + this.p.lambda * Math.sinh((super._generator() - this.p.gamma) / this.p.delta)
  }

  _pdf (x) {
    const z = (x - this.p.xi) / this.p.lambda
    return this.p.delta * super._pdf(this.p.gamma + this.p.delta * Math.asinh(z)) / (this.p.lambda * Math.sqrt(1 + z * z))
  }

  _cdf (x) {
    return super._cdf(this.p.gamma + this.p.delta * Math.asinh((x - this.p.xi) / this.p.lambda))
  }

  _q (p) {
    return this.p.xi + this.p.lambda * Math.sinh((super._q(p) - this.p.gamma) / this.p.delta)
  }
});


/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_error__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);




/**
 * Generator for the [Lévy distribution]{@link https://en.wikipedia.org/wiki/Lévy_distribution}:
 *
 * $$f(x; \mu, c) = \sqrt{\frac{c}{2 \pi}}\frac{e^{-\frac{c}{2(x - \mu)}}}{(x - \mu)^{3/2}},$$
 *
 * with \(\mu \in \mathbb{R}\) and \(c > 0\). Support: \(x \in [\mu, \infty)\).
 *
 * @class Levy
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} c Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */] {
  constructor (mu = 0, c = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, c }
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ mu, c }, [
      'c > 0'
    ])

    // Set support
    this.s = [{
      value: mu,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming normal variate
    const y = Object(__WEBPACK_IMPORTED_MODULE_1__core__["f" /* normal */])(this.r, 0, 1 / Math.sqrt(this.p.c))
    return this.p.mu + 1 / (y * y)
  }

  _pdf (x) {
    const z = x - this.p.mu
    return Math.sqrt(0.5 * this.p.c / Math.PI) * Math.exp(-0.5 * this.p.c / z - 1.5 * Math.log(z))
  }

  _cdf (x) {
    return x === this.p.mu ? 0 : Object(__WEBPACK_IMPORTED_MODULE_0__special_error__["b" /* erfc */])(Math.sqrt(0.5 * this.p.c / (x - this.p.mu)))
  }
});


/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Lindley distribution]{@link http://www.hjms.hacettepe.edu.tr/uploads/b35d591c-22f6-4136-8735-20c82936cd64.pdf}:
 *
 * $$f(x; \theta) = \frac{\theta^2}{1 + \theta} (1 + x) e^{-\theta x},$$
 *
 * with \(\theta > 0\). Support: \(x \ge 0\).
 *
 * @class Lindley
 * @memberOf ran.dist
 * @param {number=} theta Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (theta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { theta }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ theta }, [
      'theta > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      1 + theta,
      theta <= 2 ? theta * Math.exp(1 - theta / 2) / 2 : 1
    ]
  }

  _generator () {
    // Rejection sampling with gamma(1, theta/2) distribution as major
    return Object(__WEBPACK_IMPORTED_MODULE_0__core__["h" /* rejection */])(
      this.r,
      () => Object(__WEBPACK_IMPORTED_MODULE_0__core__["d" /* gamma */])(this.r, 1, this.p.theta / 2),
      x => this.c[1] * (1 + x) * Math.exp(-0.5 * this.p.theta * x)
    )
  }

  _pdf (x) {
    return this.p.theta * this.p.theta * (1 + x) * Math.exp(-this.p.theta * x) / this.c[0]
  }

  _cdf (x) {
    return 1 - Math.exp(-this.p.theta * x) * (this.c[0] + this.p.theta * x) / this.c[0]
  }
});


/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_lambert_w__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the (continuous) [logarithmic distribution]{@link http://mathworld.wolfram.com/LogarithmicDistribution.html}:
 *
 * $$f(x; a, b) = \frac{\ln x}{a (1 - \ln a) - b (1 - \ln b)},$$
 *
 * with \(a, b \in [1, \infty)\) and \(a < b\). Support: \(x \in [a, b]\).
 *
 * @class Logarithmic
 * @memberOf ran.dist
 * @param {number=} a Lower boundary of the distribution. Default value is 1.
 * @param {number=} b Upper boundary of the distribution. Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (a = 1, b = 2) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { a, b }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ a, b }, [
      'a >= 1',
      'b >= 1',
      'a < b'
    ])

    // Set support
    this.s = [{
      value: a,
      closed: true
    }, {
      value: b,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      a * (1 - Math.log(a)),
      b * (1 - Math.log(b))
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return Math.log(x) / (this.c[0] - this.c[1])
  }

  _cdf (x) {
    return (this.c[0] - x * (1 - Math.log(x))) / (this.c[0] - this.c[1])
  }

  _q (p) {
    const z = p * (this.c[0] - this.c[1]) - this.c[0]
    return z / Object(__WEBPACK_IMPORTED_MODULE_0__special_lambert_w__["a" /* lambertW0 */])(z / Math.E)
  }
});


/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cauchy__ = __webpack_require__(53);


/**
 * Generator for the [log-Cauchy distribution]{@link https://en.wikipedia.org/wiki/Log-Cauchy_distribution}:
 *
 * $$f(x; \mu, \sigma) = \frac{1}{\pi x}\bigg[\frac{\sigma}{(\ln x - \mu)^2 + \sigma^2}\bigg],$$
 *
 * with \(\mu \in \mathbb{R}\) and \(\sigma > 0\). Support: \(x > 0\).
 *
 * @class LogCauchy
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} sigma Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__cauchy__["a" /* default */] {
  // Transforming Cauchy distribution
  constructor (mu = 0, sigma = 1) {
    super(mu, sigma)

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming Cauchy variate
    const z = super._generator()

    // Handle |z| >> 1 cases
    return Math.max(Math.min(Number.MAX_VALUE, Math.exp(z)), Number.MIN_VALUE)
  }

  _pdf (x) {
    return super._pdf(Math.log(x)) / x
  }

  _cdf (x) {
    return super._cdf(Math.log(x))
  }

  _q (p) {
    return Math.exp(super._q(p))
  }
});


/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gamma__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [log-gamma distribution]{@link https://reference.wolfram.com/language/ref/LogGammaDistribution.html} using the
 * shape/rate parametrization:
 *
 * $$f(x; \alpha, \beta) = \frac{\beta^\alpha}{\Gamma(\alpha)} (\ln(x - \mu + 1)]^{\alpha - 1} (x - \mu + 1)^{-(1 + \beta)},$$
 *
 * where \(\alpha, \beta > 0\) and \(\mu \ge 0\). Support: \(x \in [\mu, \infty)\).
 *
 * @class LogGamma
 * @memberOf ran.dist
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @param {number=} beta Rate parameter. Default value is 1.
 * @param {number=} mu Location parameter. Default value is 0.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__gamma__["a" /* default */] {
  constructor (alpha = 1, beta = 1, mu = 0) {
    super(alpha, beta)

    // Validate parameters
    this.p = Object.assign(this.p, { mu })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ mu }, [
      'mu >= 0'
    ])

    // Set support
    this.s = [{
      value: mu,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming gamma variate
    return Math.exp(super._generator()) + this.p.mu - 1
  }

  _pdf (x) {
    return super._pdf(Math.log(x - this.p.mu + 1)) / (x - this.p.mu + 1)
  }

  _cdf (x) {
    return super._cdf(Math.log(x - this.p.mu + 1))
  }
});


/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [logistic distribution]{@link https://en.wikipedia.org/wiki/Logistic_distribution}:
 *
 * $$f(x; \mu, s) = \frac{e^{-z}}{s (1 + e^{-z})^2},$$
 *
 * with \(z = \frac{x - \mu}{s}\), \(\mu \in \mathbb{R}\) and \(s > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class Logistic
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} s Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (mu = 0, s = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, s }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ mu, s }, [
      's > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this.p.mu - this.p.s * Math.log(1 / this.r.next() - 1)
  }

  _pdf (x) {
    const z = Math.exp(-(x - this.p.mu) / this.p.s)
    return Number.isFinite(z * z)
      ? z / (this.p.s * Math.pow(1 + z, 2))
      : 0
  }

  _cdf (x) {
    return 1 / (1 + Math.exp(-(x - this.p.mu) / this.p.s))
  }

  _q (p) {
    return this.p.mu - this.p.s * Math.log(1 / p - 1)
  }
});


/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [logistic-exponential distribution]{@link http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.295.8653&rep=rep1&type=pdf}:
 *
 * $$f(x; \lambda, \kappa) = \frac{\lambda \kappa (e^{\lambda x} - 1)^{\kappa - 1} e^{\lambda x}}{[1 + (e^{\lambda x} - 1)^\kappa]^2},$$
 *
 * where \(\lambda, \kappa > 0\). Support: \(x > 0\).
 *
 * @class LogisticExponential
 * @memberOf ran.dist
 * @param {number=} lambda Scale parameter. Default value is 1.
 * @param {number=} kappa Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (lambda = 1, kappa = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { lambda, kappa }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ lambda, kappa }, [
      'lambda > 0',
      'kappa > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: kappa >= 1
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const y = Math.exp(this.p.lambda * x)
    return Number.isFinite(Math.pow(y, 2 * this.p.kappa)) ? this.p.lambda * this.p.kappa * Math.pow(y - 1, this.p.kappa - 1) * y / Math.pow(1 + Math.pow(y - 1, this.p.kappa), 2) : 0
  }

  _cdf (x) {
    // Calculate 1 - S for robustness
    return 1 - 1 / (1 + Math.pow(Math.exp(this.p.lambda * x) - 1, this.p.kappa))
  }

  _q (p) {
    const z = Math.pow(p / (1 - p), 1 / this.p.kappa)

    // Handle z << 1 cases
    return 1 + z === 1
      ? z / this.p.lambda
      : Math.log(1 + z) / this.p.lambda
  }
});


/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__normal__ = __webpack_require__(5);


/**
 * Generator for the [logit-normal distribution]{@link https://en.wikipedia.org/wiki/Logit-normal_distribution}:
 *
 * $$f(x; \mu, \sigma) = \frac{1}{\sigma \sqrt{2 \pi} x (1 - x)} e^{-\frac{[\mathrm{logit}(x) - \mu]^2}{2 \sigma^2}},$$
 *
 * with \(\mu \in \mathbb{R}\), \(\sigma > 0\) and \(\mathrm{logit}(x) = \ln \frac{x}{1 - x}\). Support: \(x \in (0, 1)\).
 *
 * @class LogitNormal
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} sigma Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__normal__["a" /* default */] {
  // Transforming normal distribution
  constructor (mu = 0, sigma = 1) {
    super(mu, sigma)

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: 1,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming normal variate
    return 1 / (1 + Math.exp(-super._generator()))
  }

  _pdf (x) {
    return super._pdf(Math.log(x / (1 - x))) / (x * (1 - x))
  }

  _cdf (x) {
    return super._cdf(Math.log(x / (1 - x)))
  }

  _q (p) {
    return 1 / (1 + Math.exp(-super._q(p)))
  }
});


/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__laplace__ = __webpack_require__(66);


/**
 * Generator for the [log-Laplace distribution]{@link https://en.wikipedia.org/wiki/Log-Laplace_distribution}:
 *
 * $$f(x; \mu, b) = \frac{1}{2bx}e^{-\frac{|\mathrm{ln} x - \mu|}{b}},$$
 *
 * where \(\mu \in \mathbb{R}\) and \(b > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class LogLaplace
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} b Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__laplace__["a" /* default */] {
  // Transforming Laplace distribution
  constructor (mu = 0, b = 1) {
    super(mu, b)

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming Laplace variate
    return Math.exp(super._generator())
  }

  _pdf (x) {
    return super._pdf(Math.log(x)) / x
  }

  _cdf (x) {
    return super._cdf(Math.log(x))
  }

  _q (p) {
    return Math.exp(super._q(p))
  }
});


/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [log-logistic distribution]{@link https://en.wikipedia.org/wiki/Log-logistic_distribution} (also known as Fisk distribution):
 *
 * $$f(x; \alpha, \beta) = \frac{(\beta / \alpha) (x / \alpha)^{\beta - 1}}{([1 + (x / \alpha)^\beta]^2},$$
 *
 * with \(\alpha, \beta > 0\). Support: \(x \in [0, \infty)\).
 *
 * @class LogLogistic
 * @memberOf ran.dist
 * @param {number=} alpha Scale parameter. Default value is 1.
 * @param {number=} beta Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (alpha = 1, beta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { alpha, beta }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ alpha, beta }, [
      'alpha > 0',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      beta / alpha
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const xa = x / this.p.alpha
    const y = Math.pow(xa, this.p.beta - 1)
    return this.c[0] * y / Math.pow(1 + xa * y, 2)
  }

  _cdf (x) {
    return 1 / (1 + Math.pow(x / this.p.alpha, -this.p.beta))
  }

  _q (p) {
    return this.p.alpha * Math.pow(1 / p - 1, -1 / this.p.beta)
  }
});


/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_beta_incomplete__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [log-series distribution]{@link }:
 *
 * $$f(k; p) = \frac{-1}{\ln(1 - p)}\frac{p^k}{k},$$
 *
 * with \(p \in (0, 1)\). Support: \(k \in \mathbb{N}^+\).
 *
 * @class LogSeries
 * @memberOf ran.dist
 * @param {number=} p Distribution parameter. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (p = 0.5) {
    super('discrete', arguments.length)

    // Validate parameters
    this.p = { p }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ p }, [
      'p > 0', 'p < 1'
    ])

    // Set support
    this.s = [{
      value: 1,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling
    return Math.floor(1 + Math.log(this.r.next()) / Math.log(1 - Math.pow(1 - this.p.p, this.r.next())))
  }

  _pdf (x) {
    return -Math.pow(this.p.p, x) / (x * Math.log(1 - this.p.p))
  }

  _cdf (x) {
    return 1 + Object(__WEBPACK_IMPORTED_MODULE_0__special_beta_incomplete__["a" /* betaIncomplete */])(x + 1, 0, this.p.p) / Math.log(1 - this.p.p)
  }
});


/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Lomax distribution]{@link https://en.wikipedia.org/wiki/Lomax_distribution}:
 *
 * $$f(x; \lambda, \alpha) = \frac{\alpha}{\lambda}\bigg[1 + \frac{x}{\lambda}\bigg]^{-(\alpha + 1)},$$
 *
 * with \(\lambda, \alpha > 0\). Support: \(x \ge 0\).
 *
 * @class Lomax
 * @memberOf ran.dist
 * @param {number=} lambda Scale parameter. Default value is 1.
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (lambda = 1, alpha = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { lambda, alpha }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ lambda, alpha }, [
      'lambda > 0',
      'alpha > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return this.p.alpha * Math.pow(1 + x / this.p.lambda, -1 - this.p.alpha) / this.p.lambda
  }

  _cdf (x) {
    return 1 - Math.pow(1 + x / this.p.lambda, -this.p.alpha)
  }

  _q (p) {
    return this.p.lambda * (Math.pow(1 - p, -1 / this.p.alpha) - 1)
  }
});


/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_lambert_w__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Makeham distribution]{@link https://en.wikipedia.org/wiki/Gompertz%E2%80%93Makeham_law_of_mortality}
 * (also known as Gompertz-Makeham distribution):
 *
 * $$f(x; \alpha, \beta, \lambda) = (\alpha e^{\beta x} + \lambda) \exp\Big[{-\lambda x - \frac{\alpha}{\beta}(e^{\beta x} - 1)}\Big],$$
 *
 * with \(\alpha, \beta, \lambda > 0\). Support: \(x > 0\).
 *
 * @class Makeham
 * @memberOf ran.dist
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @param {number=} beta Rate parameter. Default value is 1.
 * @param {number=} lambda Scale parameter. Default value is 1.
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (alpha = 1, beta = 1, lambda = 1) {
    super('continuous', arguments.length)

    // Validate parameters.
    this.p = { alpha, beta, lambda }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ alpha, beta, lambda }, [
      'alpha > 0',
      'beta > 0',
      'lambda > 0'
    ])

    // Set support.
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants.
    this.c = [
      alpha / (beta * lambda),
      alpha * Math.exp(alpha / lambda) / lambda,
      -beta / lambda
    ]
  }

  _generator () {
    // Inverse transform sampling.
    return this._q(this.r.next())
  }

  _pdf (x) {
    const y = Math.exp(this.p.beta * x)

    // Handle y >> 1 cases.
    if (Number.isFinite(Math.exp(y))) {
      return (this.p.alpha * y + this.p.lambda) * Math.exp(-this.p.lambda * x - this.p.alpha * (y - 1) / this.p.beta)
    } else {
      return 0
    }
  }

  _cdf (x) {
    return 1 - Math.exp(-this.p.lambda * x - this.p.alpha * (Math.exp(this.p.beta * x) - 1) / this.p.beta)
  }

  _q (p) {
    const z = this.c[1] * Math.pow(1 - p, this.c[2])

    // Handle z >> 1 case.
    const w = Object(__WEBPACK_IMPORTED_MODULE_0__special_lambert_w__["a" /* lambertW0 */])(z)
    if (Number.isFinite(w)) {
      return this.c[0] - Math.log(1 - p) / this.p.lambda - w / this.p.beta
    } else {
      const t = Math.log(this.c[1]) + this.c[2] * Math.log(1 - p)
      return this.c[0] - Math.log(1 - p) / this.p.lambda - (t - Math.log(t)) / this.p.beta
    }
  }
});


/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gamma__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Maxwell-Boltzmann distribution]{@link https://en.wikipedia.org/wiki/Maxwell%E2%80%93Boltzmann_distribution}:
 *
 * $$f(x; a) = \sqrt{\frac{2}{\pi}}\frac{x^2 e^{-x^2 / (2a^2)}}{a^3},$$
 *
 * with \(a > 0\). Support: \(x > 0\).
 *
 * @class MaxwellBoltzmann
 * @memberOf ran.dist
 * @param {number=} a Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__gamma__["a" /* default */] {
  constructor (a = 1) {
    super(1.5, 2 * a * a)

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ a }, [
      'a > 0'
    ])
  }
});


/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dagum__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Mielke distribution]{@link https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.mielke.html#r7049b665a02e-2}:
 *
 * $$f(x; k, s) = \frac{k x^{k - 1}}{(1 + x^s)^{1 + k/s}},$$
 *
 * with \(k, s > 0\). Support: \(x > 0\). It can be viewed as a re-parametrization of the [Dagum distribution]{@link #dist.Dagum}.
 *
 * @class Mielke
 * @memberOf ran.dist
 * @param {number=} k First shape parameter. Default value is 2.
 * @param {number=} s Second shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__dagum__["a" /* default */] {
  constructor (k = 2, s = 1) {
    super(k / s, s, 1)

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ k, s }, [
      'k > 0',
      's > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }
});


/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__special_gamma_incomplete__ = __webpack_require__(6);




/**
 * Generator for the [Moyal distribution]{@link https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.moyal.html#r7049b665a02e-2}:
 *
 * $$f(x; \mu, \sigma) = \frac{1}{\sqrt{2 \pi}}e^{-\frac{1}{2}(z + e^{-z})},$$
 *
 * where \(z = \frac{x - \mu}{\sigma}\), \(\mu \in \mathbb{R}\) and \(\sigma > 0\). Support: \(x \in \mathbb{R}\).
 *
 * @class Moyal
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} sigma Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (mu = 0, sigma = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, sigma }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ mu, sigma }, [
      'sigma > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      sigma * Math.sqrt(2 * Math.PI)
    ]
  }

  _generator () {
    return Object(__WEBPACK_IMPORTED_MODULE_0__core__["h" /* rejection */])(
      this.r,
      () => Math.PI * this.r.next() - Math.PI / 2,
      t => {
        const z = Math.tan(t)
        return Math.exp(-0.5 * (z + Math.exp(-z))) / (Math.sqrt(2 * Math.PI) * Math.pow(Math.cos(t), 2))
      }, t => this.p.sigma * Math.tan(t) + this.p.mu
    )
  }

  _pdf (x) {
    const z = (x - this.p.mu) / this.p.sigma
    return Math.exp(-0.5 * (z + Math.exp(-z))) / this.c[0]
  }

  _cdf (x) {
    return 1 - Object(__WEBPACK_IMPORTED_MODULE_2__special_gamma_incomplete__["a" /* gammaLowerIncomplete */])(0.5, 0.5 * Math.exp((this.p.mu - x) / this.p.sigma))
  }
});


/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_lambert_w__ = __webpack_require__(18);
// https://journals.vgtu.lt/index.php/MMA/article/view/1001/767




/**
 * Generator for the [Muth distribution]{@link https://journals.vgtu.lt/index.php/MMA/article/view/1001/767}:
 *
 * $$f(x; \alpha) = (e^{\alpha x} - \alpha) \exp\bigg(\alpha x - \frac{1}{\alpha} (e^{\alpha x} - 1)\bigg),$$
 *
 * with \(\alpha \in (0, 1]\). Support: \(x > 0\).
 *
 * @class Muth
 * @memberOf ran.dist
 * @param {number=} alpha Shape parameter. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (alpha = 0.5) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { alpha }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ alpha }, [
      'alpha > 0', 'alpha <= 1'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _survival (x) {
    return Math.exp(this.p.alpha * x - (Math.exp(this.p.alpha * x) - 1) / this.p.alpha)
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return (Math.exp(this.p.alpha * x) - this.p.alpha) * this._survival(x)
  }

  _cdf (x) {
    return 1 - this._survival(x)
  }

  _q (p) {
    // Using Eq. (3.2) in Jodra et al: On the Muth Distribution
    return (Math.log(1 - p) - Object(__WEBPACK_IMPORTED_MODULE_1__special_lambert_w__["b" /* lambertW1m */])((p - 1) / (this.p.alpha * Math.exp(1 / this.p.alpha))) - 1 / this.p.alpha) / this.p.alpha
  }
});


/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_gamma_incomplete__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [Nakagami distribution]{@link https://en.wikipedia.org/wiki/Nakagami_distribution}:
 *
 * $$f(x; m, \Omega) = \frac{2m^m}{\Gamma(m) \Omega^m} x^{2m - 1} e^{-\frac{m}{\Omega} x^2},$$
 *
 * where \(m \in \mathbb{R}\), \(m \ge 0.5\) and \(\Omega > 0\). Support: \(x > 0\).
 *
 * @class Nakagami
 * @memberOf ran.dist
 * @param {number=} m Shape parameter. Default value is 1.
 * @param {number=} omega Spread parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (m = 1, omega = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { m, omega }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ m, omega }, [
      'm >= 0.5',
      'omega > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      2 * Math.pow(this.p.m, this.p.m) / Math.pow(this.p.omega, this.p.m)
    ]
  }

  _generator () {
    // Direct sampling from gamma
    return Math.sqrt(Object(__WEBPACK_IMPORTED_MODULE_2__core__["d" /* gamma */])(this.r, this.p.m, this.p.m / this.p.omega))
  }

  _pdf (x) {
    return this.c[0] * Math.pow(x, 2 * this.p.m - 1) * Math.exp(-this.p.m * x * x / this.p.omega - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_gamma__["a" /* default */])(this.p.m))
  }

  _cdf (x) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma_incomplete__["a" /* gammaLowerIncomplete */])(this.p.m, this.p.m * x * x / this.p.omega)
  }
});


/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_binomial__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_beta_incomplete__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [negative-binomial distribution]{@link https://en.wikipedia.org/wiki/Negative_binomial_distribution}
 * (also known as Gamma-Poisson, Pascal or Pólya distribution):
 *
 * $$f(k; r, p) = \begin{pmatrix}k + r - 1 \\ k \\ \end{pmatrix} (1 - p)^r p^k,$$
 *
 * with \(r \in \mathbb{N}^+\) and \(p \in [0, 1]\). Support: \(k \in \mathbb{N}_0\).
 *
 * @class NegativeBinomial
 * @memberOf ran.dist
 * @param {number=} r Number of failures until the experiment is stopped. If not an integer, it is rounded to the nearest
 * integer. Default value is 10.
 * @param {number=} p Probability of success. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (r = 10, p = 0.5) {
    super('discrete', arguments.length)

    // Validate parameters
    const ri = Math.round(r)
    this.p = { r: ri, p }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ r: ri, p }, [
      'r > 0',
      'p > 0', 'p < 1'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by compounding Poisson and gamma
    return Object(__WEBPACK_IMPORTED_MODULE_2__core__["g" /* poisson */])(this.r, Object(__WEBPACK_IMPORTED_MODULE_2__core__["d" /* gamma */])(this.r, this.p.r, 1 / this.p.p - 1))
  }

  _pdf (x) {
    return Math.exp(Object(__WEBPACK_IMPORTED_MODULE_0__special_log_binomial__["a" /* default */])(x + this.p.r - 1, x) + this.p.r * Math.log(1 - this.p.p) + x * Math.log(this.p.p))
  }

  _cdf (x) {
    return 1 - Object(__WEBPACK_IMPORTED_MODULE_1__special_beta_incomplete__["b" /* regularizedBetaIncomplete */])(x + 1, this.p.r, this.p.p)
  }
});


/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_binomial__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__categorical__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);




/**
 * Generator for the [negative hypergeometric distribution]{@link https://en.wikipedia.org/wiki/Negative_hypergeometric_distribution}:
 *
 * $$f(k; N, K, r) = \frac{\begin{pmatrix}k + r - 1 \\ k \\ \end{pmatrix} \begin{pmatrix}N - r - k \\ K - k \\ \end{pmatrix}}{\begin{pmatrix}N \\ K \\ \end{pmatrix}},$$
 *
 * with \(N \in \mathbb{N}_0\), \(K \in \{0, 1, ..., N\}\) and \(r \in \{0, 1, ..., N - K\}\). Support: \(k \in \{0, ..., K\}\).
 *
 * @class NegativeHypergeometric
 * @memberOf ran.dist
 * @param {number=} N Total number of elements to sample from. If not an integer, it is rounded to the nearest one. Default value is 10.
 * @param {number=} K Total number of successes. If not an integer, it is rounded to the nearest one. Default value is 5.
 * @param {number=} r Total number of failures to stop at. If not an integer, it is rounded to the nearest one. Default value is 5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__categorical__["a" /* default */] {
  constructor (N = 10, K = 5, r = 5) {
    // Validate parameters
    const Ni = Math.round(N)
    const Ki = Math.round(K)
    const ri = Math.round(r)
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ N: Ni, K: Ki, r: ri, 'N - K': Ni - Ki }, [
      'N >= 0',
      'K > 0', 'K <= N',
      'r > 0', 'r <= N - K'
    ])

    // Build weights
    const weights = []
    for (let k = 0; k <= Ki; k++) {
      weights.push(Math.exp(Object(__WEBPACK_IMPORTED_MODULE_0__special_log_binomial__["a" /* default */])(Ki + ri - 1, k) + Object(__WEBPACK_IMPORTED_MODULE_0__special_log_binomial__["a" /* default */])(Ni - ri - k, Ki - k) - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_binomial__["a" /* default */])(Ni, Ki)))
    }
    super(weights)
  }
});


/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pre_computed__ = __webpack_require__(14);




/**
 * Generator for the [Neyman type A distribution]{@link http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.527.574&rep=rep1&type=pdf}:
 *
 *$$f(k; \lambda, \phi) = \frac{e^{-\lambda + \lambda e^{-\phi}} \phi^k}{k!} \sum_{j=1}^k S(k, j) \lambda^k e^{-\phi k},$$
 *
 * where \(\lambda, \theta > 0\) and \(S(n, m)\) denotes the [Stirling number of the second kind]{@link https://en.wikipedia.org/wiki/Stirling_numbers_of_the_second_kind}. Support: \(k \in \mathbb{N}_0\).
 *
 * @class NeymanA
 * @memberOf ran.dist
 * @param {number=} lambda Mean of the number of clusters. Default value is 1.
 * @param {number=} phi Mean of the cluster size. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_2__pre_computed__["a" /* default */] {
  constructor (lambda = 1, phi = 1) {
    // Using raw probability mass values
    super()

    // Validate parameters
    this.p = { lambda, phi }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ lambda, phi }, [
      'lambda > 0',
      'phi > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      Math.exp(-lambda * (1 - Math.exp(-phi))),
      lambda * phi * Math.exp(-phi)
    ]
  }

  // Using Eq. (131) in Johnson, Kotz, Kemp: Univariate Discrete Distributions.
  _pk (k) {
    if (k === 0) {
      return this.c[0]
    }

    let dz = 1
    let z = this.pdfTable[k - 1]
    for (let j = 1; j < k; j++) {
      dz *= this.p.phi / j
      z += dz * this.pdfTable[k - j - 1]
    }
    return this.c[1] * z / k
  }

  _generator () {
    const N = Object(__WEBPACK_IMPORTED_MODULE_0__core__["g" /* poisson */])(this.r, this.p.lambda)
    let z = 0
    for (let i = 0; i < N; i++) {
      z += Object(__WEBPACK_IMPORTED_MODULE_0__core__["g" /* poisson */])(this.r, this.p.phi)
    }
    return Math.round(z)
  }
});


/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__noncentral_chi2__ = __webpack_require__(68);



/**
 * Generator for the [non-central \(\chi\) distribution]{@link https://en.wikipedia.org/wiki/Noncentral_chi_distribution}:
 *
 * $$f(x; k; \lambda) = \frac{x^k \lambda}{(\lambda x)^{k/2}} e^{-\frac{x^2 + \lambda^2}{2}} I_{k/2 - 1}(\lambda x),$$
 *
 * with \(k \in \mathbb{N}^+\), \(\lambda > 0\) and \(I_n(x)\) is the modified Bessel function of the first kind with order \(n\). Support: \(x \in [0, \infty)\).
 *
 * @class NoncentralChi
 * @memberOf ran.dist
 * @param {number=} k Degrees of freedom. If not an integer, it is rounded to the nearest one. Default value is 2.
 * @param {number=} lambda Non-centrality parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__noncentral_chi2__["a" /* default */] {
  // Transformation of non-central chi2 distribution
  constructor (k = 2, lambda = 1) {
    const ki = Math.round(k)
    super(ki, lambda * lambda)

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ k: ki, lambda }, [
      'lambda > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming non-central chi2 variate
    return Math.sqrt(super._generator())
  }

  _pdf (x) {
    return 2 * x * super._pdf(x * x)
  }

  _cdf (x) {
    return super._cdf(x * x)
  }
});


/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__noncentral_beta__ = __webpack_require__(67);



/**
 * Generator for the [non-central F distribution]{@link https://en.wikipedia.org/wiki/Noncentral_F-distribution}:
 *
 * $$f(x; d_1, d_2, \lambda) = e^{-\frac{\lambda}{2}} \sum_{k=0}^\infty \frac{1}{k!} \bigg(\frac{\lambda}{2}\bigg)^k \frac{\Big(\frac{d_1}{d_2}\Big)^{\frac{d_1}{2} + k} \Big(\frac{d_2}{d_2 + d_1 x}\Big)^{\frac{d_1 + d_2}{2} + k}}{\mathrm{B}\Big(\frac{d_2}{2}, \frac{d_1}{2} + k\Big)} x^{\frac{d_1}{2} -1 + k},$$
 *
 * where \(d_1, d_2 \in \mathbb{N}^+\) and \(\lambda > 0\). Support: \(x \ge 0\).
 *
 * @class NoncentralF
 * @memberOf ran.dist
 * @param {number=} d1 First degree of freedom. If not an integer, it is rounded to the nearest one. Default value is 2.
 * @param {number=} d2 Second degree of freedom. If not an integer, it is rounded to the nearest one. Default value is 2.
 * @param {number=} lambda Non-centrality parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__noncentral_beta__["a" /* default */] {
  // Transformation of non-central beta distribution
  constructor (d1 = 2, d2 = 2, lambda = 1) {
    const d1i = Math.round(d1)
    const d2i = Math.round(d2)
    super(d1i / 2, d2i / 2, lambda)

    // Validate parameters
    this.p = Object.assign(this.p, { d1: d1i, d2: d2i, lambda })
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ d1: d1i, d2: d2i, lambda }, [
      'd1 > 0',
      'd2 > 0',
      'lambda > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Direct sampling by transforming non-central beta variate
    const x = super._generator()
    return this.p.d2 * x / (this.p.d1 * (1 - x))
  }

  _pdf (x) {
    return this.p.d1 * this.p.d2 * super._pdf(this.p.d1 * x / (this.p.d2 + this.p.d1 * x)) / Math.pow(this.p.d2 + this.p.d1 * x, 2)
  }

  _cdf (x) {
    const y = this.p.d1 * x
    return super._cdf(1 / (1 + this.p.d2 / y))
  }
});


/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [Pareto distribution]{@link https://en.wikipedia.org/wiki/Pareto_distribution}:
 *
 * $$f(x; x_\mathrm{min}, \alpha) = \frac{\alpha x_\mathrm{min}^\alpha}{x^{\alpha + 1}},$$
 *
 * with \(x_\mathrm{min}, \alpha > 0\). Support: \(x \in [x_\mathrm{min}, \infty)\).
 *
 * @class Pareto
 * @memberOf ran.dist
 * @param {number=} xmin Scale parameter. Default value is 1.
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (xmin = 1, alpha = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { xmin, alpha }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ xmin, alpha }, [
      'xmin > 0',
      'alpha > 0'
    ])

    // Set support
    this.s = [{
      value: xmin,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return this.p.alpha * Math.pow(this.p.xmin / x, this.p.alpha) / x
  }

  _cdf (x) {
    return 1 - Math.pow(this.p.xmin / x, this.p.alpha)
  }

  _q (p) {
    return this.p.xmin / Math.pow(1 - p, 1 / this.p.alpha)
  }
});


/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__beta__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [PERT distribution]{@link https://en.wikipedia.org/wiki/PERT_distribution}:
 *
 * $$f(x; a, b, c) = \frac{(x - a)^{\alpha - 1} (c - x)^{\beta - 1}}{\mathrm{B}(\alpha, \beta) (c - a)^{\alpha + \beta + 1}},$$
 *
 * where \(a, b, c \in \mathbb{R}\), \(a < b < c\), \(\alpha = \frac{4b + c - 5a}{c - a}\), \(\beta = \frac{5c - a -4b}{c - a}\) and \(\mathrm{B}(x, y)\) is the beta function. Support: \(x \in [a, c]\).
 *
 * @class PERT
 * @memberOf ran.dist
 * @param {number=} a Lower boundary of the support. Default value is 0.
 * @param {number=} b Mode of the distribution. Default value is 0.5.
 * @param {number=} c Upper boundary of the support. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__beta__["a" /* default */] {
  constructor (a = 0, b = 0.5, c = 1) {
    super((4 * b + c - 5 * a) / (c - a), (5 * c - a - 4 * b) / (c - a))

    // Validate parameters
    this.p = Object.assign(this.p, { a, b, c })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ a, b, c }, [
      'a < b',
      'b < c'
    ])

    // Set support
    this.s = [{
      value: a,
      closed: true
    }, {
      value: c,
      closed: true
    }]
  }

  _generator () {
    // Direct sampling by transforming beta variate
    return super._generator() * (this.p.c - this.p.a) + this.p.a
  }

  _pdf (x) {
    return super._pdf((x - this.p.a) / (this.p.c - this.p.a)) / (this.p.c - this.p.a)
  }

  _cdf (x) {
    return super._cdf((x - this.p.a) / (this.p.c - this.p.a))
  }
});


/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_log_gamma__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_gamma_incomplete__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [Poisson distribution]{@link https://en.wikipedia.org/wiki/Poisson_distribution}:
 *
 * $$f(k; \lambda) = \frac{\lambda^k e^{-\lambda}}{k!},$$
 *
 * with \(\lambda > 0\). Support: \(k \in \mathbb{N}_0\).
 *
 * @class Poisson
 * @memberOf ran.dist
 * @param {number=} lambda Mean of the distribution. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (lambda = 1) {
    super('discrete', arguments.length)

    // Validate parameters
    this.p = { lambda }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ lambda }, [
      'lambda > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    return Object(__WEBPACK_IMPORTED_MODULE_2__core__["g" /* poisson */])(this.r, this.p.lambda)
  }

  _pdf (x) {
    return Math.exp(x * Math.log(this.p.lambda) - this.p.lambda - Object(__WEBPACK_IMPORTED_MODULE_0__special_log_gamma__["a" /* default */])(x + 1))
  }

  _cdf (x) {
    return 1 - Object(__WEBPACK_IMPORTED_MODULE_1__special_gamma_incomplete__["a" /* gammaLowerIncomplete */])(x + 1, this.p.lambda)
  }
});


/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pre_computed__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);




/**
 * Generator for the [Pólya-Aeppli distribution]{@link https://arxiv.org/abs/1406.2780} (also known as [geometric Poisson distribution]{@link https://en.wikipedia.org/wiki/Geometric_Poisson_distribution}):
 *
 * $$f(k; \lambda, \theta) = \begin{cases}e^{-\lambda} &\quad\text{if $k = 0$},\\e^{-\lambda} \sum_{j = 1}^k \frac{\lambda^j}{j!} \begin{pmatrix}k - 1 \\ j - 1 \\ \end{pmatrix} \theta^{k - j} (1 - \theta)^j &\quad\text{otherwise}\\\end{cases},$$
 *
 * where \(\lambda > 0\) and \(\theta \in (0, 1)\). Support: \(k \in \mathbb{N}_0\).
 *
 * @class PolyaAeppli
 * @memberOf ran.dist
 * @param {number=} lambda Mean of the Poisson component. Default value is 1.
 * @param {number=} theta Parameter of the shifted geometric component. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__pre_computed__["a" /* default */] {
  constructor (lambda = 1, theta = 0.5) {
    // Using logarithmic probability mass values
    super(true)

    // Validate parameters
    this.p = { lambda, theta }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ lambda, theta }, [
      'lambda > 0',
      'theta > 0', 'theta < 1'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      Math.log(lambda * (1 - theta)) - lambda
    ]
  }

  _pk (k) {
    if (k === 0) {
      return -this.p.lambda
    }

    if (k === 1) {
      return this.c[0]
    }

    return this.pdfTable[k - 1] + Math.log((this.p.lambda * (1 - this.p.theta) + 2 * (k - 1) * this.p.theta - this.p.theta * this.p.theta * (k - 2) * Math.exp(this.pdfTable[k - 2] - this.pdfTable[k - 1])) / k)
  }

  _generator () {
    const N = Object(__WEBPACK_IMPORTED_MODULE_2__core__["g" /* poisson */])(this.r, this.p.lambda)
    let z = 0
    for (let i = 0; i < N; i++) {
      z += Math.floor(Math.log(this.r.next()) / Math.log(this.p.theta)) + 1
    }
    return Math.round(z)
  }
});


/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__kumaraswamy__ = __webpack_require__(65);


/**
 * Generator for the [power-law distribution]{@link https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.powerlaw.html} (also called power-law distribution):
 *
 * $$f(x; a) = a x^{a - 1},$$
 *
 * with \(a > 0\). Support: \(x \in (0, 1)\). It is a special case of the [Kumaraswamy distribution]{@link #dist.Kumaraswamy}.
 *
 * @class PowerLaw
 * @memberOf ran.dist
 * @param {number=} a One plus the exponent of the distribution. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__kumaraswamy__["a" /* default */] {
  // Special case of Kumaraswamy
  constructor (a = 1) {
    super(a, 1)
  }
});


/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generalized_pareto__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [q-exponential distribution]{@link https://en.wikipedia.org/wiki/Q-exponential_distribution}:
 *
 * $$f(x; q, \lambda) = (2 - q) \lambda e^{-\lambda x}_q,$$
 *
 * where \(q < 2\), \(\lambda > 0\) and \(e^x_q\) denotes the [q-exponential function]{@link https://en.wikipedia.org/wiki/Tsallis_statistics#q-exponential}. Support: \(x > 0\) if \(q \ge 1\), otherwise \(x \in \big[0, \frac{1}{\lambda (1 - q)}\big)\).
 *
 * @class QExponential
 * @memberOf ran.dist
 * @param {number=} q Shape parameter. Default value is 1.5.
 * @param {number=} lambda Rate parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__generalized_pareto__["a" /* default */] {
  constructor (q = 1.5, lambda = 1) {
    super(0, 1 / (lambda * (2 - q)), (q - 1) / (2 - q))

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ q, lambda }, [
      'q < 2',
      'lambda > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: q < 1 ? 1 / (lambda * (1 - q)) : Infinity,
      closed: false
    }]
  }
});


/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__beta__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [R distribution]{@link https://docs.scipy.org/doc/scipy/reference/tutorial/stats/continuous_rdist.html}:
 *
 * $$f(x; c) = \frac{(1 - x^2)^{\frac{c}{2} - 1}}{\mathrm{B}\big(\frac{1}{2}, \frac{c}{2}\big)},$$
 *
 * where \(c > 0\). Support: \(x \in [-1, 1]\).
 *
 * @class R
 * @memberOf ran.dist
 * @param {number=} c Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__beta__["a" /* default */] {
  constructor (c = 1) {
    super(0.5, c / 2)

    // Validate parameters
    this.p = Object.assign(this.p, { c })
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ c }, [
      'c > 0'
    ])

    // Set support
    this.s = [{
      value: -1,
      closed: true
    }, {
      value: 1,
      closed: true
    }]
  }

  _generator () {
    return 2 * Math.sqrt(super._generator()) - 1
  }

  _pdf (x) {
    const y = (x + 1) / 2
    return y * super._pdf(y * y)
  }

  _cdf (x) {
    const y = (x + 1) / 2
    return super._cdf(y * y)
  }
});


/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__categorical__ = __webpack_require__(7);


/**
 * Generator for the [Rademacher distribution]{@link https://en.wikipedia.org/wiki/Rademacher_distribution}:
 *
 * $$f(k) = \begin{cases}1/2 &\quad\text{if $k = -1$},\\1/2 &\quad\text{if $k = 1$},\\0 &\quad\text{otherwise}.\\\end{cases}$$
 *
 * Support: \(k \in \{-1, 1\}\).
 *
 * @class Rademacher
 * @memberOf ran.dist
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__categorical__["a" /* default */] {
  // Special case of categorical
  constructor () {
    super([0.5, 0, 0.5], -1)
  }

  _q (p) {
    return p > 0.5 ? 1 : -1
  }
});


/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [raised cosine distribution]{@link https://en.wikipedia.org/wiki/Raised_cosine_distribution}:
 *
 * $$f(x; \mu, s) = \frac{1}{2s} \Big[1 + \cos\Big(\frac{x - \mu}{s} \pi\Big)\Big],$$
 *
 * where \(\mu \in \mathbb{R}\) and \(s > 0\). Support: \(x \in [\mu - s, \mu + s]\).
 *
 * @class RaisedCosine
 * @memberOf ran.dist
 * @param {number=} mu Location paramter. Default value is 0.
 * @param {number=} s Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (mu = 0, s = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, s }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ mu, s }, [
      's > 0'
    ])

    // Set support
    this.s = [{
      value: mu - s,
      closed: true
    }, {
      value: mu + s,
      closed: true
    }]
  }

  _generator () {
    // Rejection sampling with uniform distribution as major
    return Object(__WEBPACK_IMPORTED_MODULE_0__core__["h" /* rejection */])(
      this.r,
      () => this.p.mu - this.p.s + 2 * this.p.s * this.r.next(),
      x => {
        return 0.5 * (1 + Math.cos(Math.PI * (x - this.p.mu) / this.p.s))
      }
    )
  }

  _pdf (x) {
    return 0.5 * (1 + Math.cos(Math.PI * (x - this.p.mu) / this.p.s)) / this.p.s
  }

  _cdf (x) {
    const z = (x - this.p.mu) / this.p.s
    return 0.5 * (1 + z + Math.sin(Math.PI * z) / Math.PI)
  }
});


/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__weibull__ = __webpack_require__(27);


/**
 * Generator for the [Rayleigh distribution]{@link https://en.wikipedia.org/wiki/Rayleigh_distribution}:
 *
 * $$f(x; \sigma) = \frac{x}{\sigma^2} e^{-\frac{x^2}{2\sigma^2}},$$
 *
 * with \(\sigma > 0\). Support: \(x \ge 0\).
 *
 * @class Rayleigh
 * @memberOf ran.dist
 * @param {number=} sigma Scale parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__weibull__["a" /* default */] {
  // Special case of Weibull
  constructor (sigma = 1) {
    super(sigma * Math.SQRT2, 2)
  }
});


/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [reciprocal distribution]{@link https://en.wikipedia.org/wiki/Reciprocal_distribution}:
 *
 * $$f(x; a, b) = \frac{1}{x [\ln b - \ln a]},$$
 *
 * with \(a, b > 0\) and \(a < b\). Support: \(x \in [a, b]\).
 *
 * @class Reciprocal
 * @memberOf ran.dist
 * @param {number=} a Lower boundary of the support. Default value is 1.
 * @param {number=} b Upper boundary of the support. Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (a = 1, b = 2) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { a, b }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ a, b }, [
      'a > 0',
      'b > 0',
      'a < b'
    ])

    // Set support
    this.s = [{
      value: a,
      closed: true
    }, {
      value: b,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      Math.log(a),
      Math.log(b)
    ]
  }

  _generator () {
    // Direct sampling
    return this.p.a * Math.exp((this.c[1] - this.c[0]) * this.r.next())
  }

  _pdf (x) {
    return 1 / (x * (this.c[1] - this.c[0]))
  }

  _cdf (x) {
    return (Math.log(x) - this.c[0]) / (this.c[1] - this.c[0])
  }
});


/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inverse_gaussian__ = __webpack_require__(64);


/**
 * Generator for the [reciprocal inverse Gaussian distribution (RIG)]{@link https://docs.scipy.org/doc/scipy/reference/tutorial/stats/continuous_recipinvgauss.html}:
 *
 * $$f(x; \lambda, \mu) = \bigg[\frac{\lambda}{2 \pi x}\bigg]^{1/2} e^{\frac{-\lambda (1 - \mu x)^2}{2 \mu^2 x}},$$
 *
 * with \(\mu, \lambda > 0\). Support: \(x > 0\).
 *
 * @class ReciprocalInverseGaussian
 * @memberOf ran.dist
 * @param {number=} mu Mean of the inverse Gaussian distribution. Default value is 1.
 * @param {number=} lambda Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__inverse_gaussian__["a" /* default */] {
  constructor (mu = 1, lambda = 1) {
    super(mu, lambda)

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    return 1 / super._generator()
  }

  _pdf (x) {
    return super._pdf(1 / x) / (x * x)
  }

  _cdf (x) {
    return 1 - super._cdf(1 / x)
  }
});


/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_bessel__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_marcum_q__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [Rice distribution]{@link https://en.wikipedia.org/wiki/Rice_distribution}:
 *
 * $$f(x; \nu, \sigma) = \frac{x}{\sigma^2} e^{-\frac{x^2 + \nu^2}{2 \sigma^2}} I_0\bigg(\frac{\nu x}{\sigma^2}\bigg),$$
 *
 * with \(\nu, \sigma > 0\) and \(I_0(x)\) is the modified Bessel function of the first kind with order zero. Support: \(x \in [0, \infty)\).
 *
 * @class Rice
 * @memberOf ran.dist
 * @param {number=} nu First shape parameter. Default value is 1.
 * @param {number=} sigma Second shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (nu = 1, sigma = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { nu, sigma }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ nu, sigma }, [
      'nu > 0',
      'sigma > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speet-up constants
    this.c = [
      0.5 * Math.pow(nu / sigma, 2),
      sigma * sigma,
      nu / (sigma * sigma),
      nu * nu
    ]
  }

  _generator () {
    // Direct sampling using Poisson and gamma
    const p = Object(__WEBPACK_IMPORTED_MODULE_2__core__["g" /* poisson */])(this.r, this.c[0])
    const x = Object(__WEBPACK_IMPORTED_MODULE_2__core__["d" /* gamma */])(this.r, p + 1, 0.5)
    return this.p.sigma * Math.sqrt(x)
  }

  _pdf (x) {
    const z = x * this.p.nu / this.c[1]
    const b = Object(__WEBPACK_IMPORTED_MODULE_0__special_bessel__["a" /* besselI */])(0, z)

    // Handle z >> 1 case (using asymptotic form of Bessel)
    if (Number.isFinite(b)) {
      return x * Math.exp(-0.5 * (x * x + this.c[3]) / this.c[1]) * Object(__WEBPACK_IMPORTED_MODULE_0__special_bessel__["a" /* besselI */])(0, x * this.c[2]) / this.c[1]
    } else {
      return x * Math.exp(-0.5 * (x * x + this.c[3]) / this.c[1] + z - 0.5 * Math.log(2 * Math.PI * z)) / this.c[1]
    }
  }

  _cdf (x) {
    return 1 - Object(__WEBPACK_IMPORTED_MODULE_1__special_marcum_q__["a" /* default */])(1, this.c[0], Math.pow(x / this.p.sigma, 2) / 2)
  }
});


/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [shifted log-logistic distribution]{@link https://en.wikipedia.org/wiki/Shifted_log-logistic_distribution}:
 *
 * $$f(x; \mu, s) = \frac{(1 + \xi z)^{-(1/\xi + 1)}}{\sigma [1 + (1 + \xi z)^{-1/\xi}]^2},$$
 *
 * with \(z = \frac{x - \mu}{\sigma}\), \(\mu, \xi \in \mathbb{R}\) and \(\sigma > 0\). Support: \(x \ge \mu - \sigma/\xi\) if \(\xi > 0\), \(x \le \mu - \sigma/\xi\) if \(\xi < 0\), \(x \in \mathbb{R}\) otherwise.
 *
 * @class ShiftedLogLogistic
 * @memberOf ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} sigma Scale parameter. Default value is 1.
 * @param {number=} xi Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (mu = 0, sigma = 1, xi = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, sigma, xi }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ mu, sigma, xi }, [
      'sigma > 0'
    ])

    // Set support
    this.s = xi === 0 ? [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }] : [{
      value: xi > 0 ? mu - sigma / xi : -Infinity,
      closed: xi > 0
    }, {
      value: xi < 0 ? mu - sigma / xi : Infinity,
      closed: xi < 0
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    if (this.p.xi === 0) {
      // Fall back to logistic
      const z = Math.exp(-(x - this.p.mu) / this.p.sigma)
      return Number.isFinite(z * z)
        ? z / (this.p.sigma * Math.pow(1 + z, 2))
        : 0
    } else {
      const z = (x - this.p.mu) / this.p.sigma

      return Math.pow(1 + this.p.xi * z, -(1 / this.p.xi + 1)) / (this.p.sigma * Math.pow(1 + Math.pow(1 + this.p.xi * z, -1 / this.p.xi), 2))
    }
  }

  _cdf (x) {
    if (this.p.xi === 0) {
      // Fall back to logistic
      return 1 / (1 + Math.exp(-(x - this.p.mu) / this.p.sigma))
    } else {
      const z = (x - this.p.mu) / this.p.sigma
      const y = Math.pow(1 + this.p.xi * z, -1 / this.p.xi)
      return Number.isFinite(y) ? 1 / (1 + y) : 0
    }
  }

  _q (p) {
    if (this.p.xi === 0) {
      // Fall back to logistic
      return this.p.mu - this.p.sigma * Math.log(1 / p - 1)
    } else {
      return this.p.mu + this.p.sigma * (Math.pow(1 / p - 1, -this.p.xi) - 1) / this.p.xi
    }
  }
});


/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_bessel__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_marcum_q__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [Skellam distribution]{@link https://en.wikipedia.org/wiki/Skellam_distribution}:
 *
 * $$f(k; \mu_1, \mu_2) = e^{-(\mu_1 + \mu_2)}\Big(\frac{\mu_1}{\mu_2}\Big)^{k/2} I_k(2 \sqrt{\mu_1 \mu_2}),$$
 *
 * with \(\mu_1, \mu_2 \ge 0\) and \(I_n(x)\) is the modified Bessel function of the first kind with order \(n\). Support: \(k \in \mathbb{N}\).
 *
 * @class Skellam
 * @memberOf ran.dist
 * @param {number=} mu1 Mean of the first Poisson distribution. Default value is 1.
 * @param {number=} mu2 Mean of the second Poisson distribution. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (mu1 = 1, mu2 = 1) {
    super('discrete', arguments.length)

    // Validate parameters
    this.p = { mu1, mu2 }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ mu1, mu2 }, [
      'mu1 > 0',
      'mu2 > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      Math.exp(-mu1 - mu2),
      Math.sqrt(mu1 / mu2),
      2 * Math.sqrt(mu1 * mu2),
      Object(__WEBPACK_IMPORTED_MODULE_1__special_marcum_q__["a" /* default */])(1, mu2, mu1)
    ]
  }

  _generator () {
    // Direct sampling
    return Object(__WEBPACK_IMPORTED_MODULE_2__core__["g" /* poisson */])(this.r, this.p.mu1) - Object(__WEBPACK_IMPORTED_MODULE_2__core__["g" /* poisson */])(this.r, this.p.mu2)
  }

  _pdf (x) {
    return this.c[0] * Math.pow(this.c[1], x) * Object(__WEBPACK_IMPORTED_MODULE_0__special_bessel__["a" /* besselI */])(Math.abs(x), this.c[2])
  }

  _cdf (x) {
    if (x <= -1) {
      return 1 - Object(__WEBPACK_IMPORTED_MODULE_1__special_marcum_q__["a" /* default */])(-x, this.p.mu1, this.p.mu2)
    }
    if (x >= 1) {
      return Object(__WEBPACK_IMPORTED_MODULE_1__special_marcum_q__["a" /* default */])(x + 1, this.p.mu2, this.p.mu1)
    }
    return this.c[3]
  }

  _q (p) {
    return Math.floor(this._qEstimateRoot(p))
  }
});


/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_owen_t__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__normal__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__special_error__ = __webpack_require__(10);





/**
 * Generator for the [skew normal distribution]{@link https://en.wikipedia.org/wiki/Skew_normal_distribution}:
 *
 * $$f(x; \xi, \omega, \alpha) = \frac{2}{\omega} \phi\bigg(\frac{x - \xi}{\omega}\bigg) \Phi\bigg(\alpha \frac{x - \xi}{\omega}\bigg),$$
 *
 * where \(\xi, \alpha > 0\), \(\omega \in \mathbb{R}\) and \(\phi(x)\), \(\Phi(x)\) denote the probability density and cumulative distribution functions of the standard [normal distribution]{@link #dist.Normal}. Support: \(x \in \mathbb{R}\).
 *
 * @class SkewNormal
 * @memberOf ran.dist
 * @param {number=} xi Location parameter. Default value is 0.
 * @param {number=} omega Scale parameter. Default value is 1.
 * @param {number=} alpha Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_2__normal__["a" /* default */] {
  constructor (xi = 0, omega = 1, alpha = 1) {
    super(xi, omega)

    // Add new parameter
    this.p = Object.assign(this.p, { xi, omega, alpha })

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants (be aware of the constants for the parent)
    const delta = this.p.alpha / Math.sqrt(1 + this.p.alpha * this.p.alpha)
    this.c1 = [
      delta,
      Math.sqrt(1 - delta * delta)
    ]
  }

  _generator () {
    // Method from http://azzalini.stat.unipd.it/SN/faq-r.html
    const u0 = Object(__WEBPACK_IMPORTED_MODULE_1__core__["f" /* normal */])(this.r)
    const v = Object(__WEBPACK_IMPORTED_MODULE_1__core__["f" /* normal */])(this.r)
    const u1 = this.c1[0] * u0 + this.c1[1] * v
    const z = u0 >= 0 ? u1 : -u1
    return this.p.xi + this.p.omega * z
  }

  _pdf (x) {
    return super._pdf(x) * (1 + Object(__WEBPACK_IMPORTED_MODULE_3__special_error__["a" /* erf */])(this.p.alpha * Math.SQRT1_2 * (x - this.p.xi) / this.p.omega))
  }

  _cdf (x) {
    const z = super._cdf(x) - 2 * Object(__WEBPACK_IMPORTED_MODULE_0__special_owen_t__["a" /* default */])((x - this.p.xi) / this.p.omega, this.p.alpha)
    return Math.min(1, Math.max(0, z))
  }

  _q (p) {
    return this._qEstimateRoot(p)
  }
});


/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error__ = __webpack_require__(10);


// Constants
const PI2_SQRT_INV = 1 / Math.sqrt(2 * Math.PI)
const HALF_PI_INV = 0.5 / Math.PI

// Ranges for a and h to select algorithm
const aRanges = [
  0.025,
  0.09,
  0.15,
  0.36,
  0.5,
  0.9,
  0.99999
]
const hRanges = [
  0.02,
  0.06,
  0.09,
  0.125,
  0.26,
  0.4,
  0.6,
  1.6,
  1.7,
  2.33,
  2.4,
  3.36,
  3.4,
  4.8
]

// Algorithm sector codes
const codes = [
  [0, 0, 1, 12, 12, 12, 12, 12, 12, 12, 12, 15, 15, 15, 8],
  [0, 1, 1, 2, 2, 4, 4, 13, 13, 14, 14, 15, 15, 15, 8],
  [1, 1, 2, 2, 2, 4, 4, 14, 14, 14, 14, 15, 15, 15, 9],
  [1, 1, 2, 4, 4, 4, 4, 6, 6, 15, 15, 15, 15, 15, 9],
  [1, 2, 2, 4, 4, 5, 5, 7, 7, 16, 16, 16, 11, 11, 10],
  [1, 2, 4, 4, 4, 5, 5, 7, 7, 16, 16, 16, 11, 11, 11],
  [1, 2, 3, 3, 5, 5, 7, 7, 16, 16, 16, 16, 16, 11, 11],
  [1, 2, 3, 3, 5, 5, 17, 17, 17, 17, 16, 16, 16, 11, 11]
]

// Method to use
const methods = [
  1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 4, 4, 5, 6
]

// Order of approximation
const orders = [
  2, 3, 4, 5, 7, 10, 12, 18, 10, 20, 30, 20, 4, 7, 8, 20, 13, 0
]

// Some constants for the algorithms
const c2 = [
  0.99999999999999987510,
  -0.99999999999988796462,
  0.99999999998290743652,
  -0.99999999896282500134,
  0.99999996660459362918,
  -0.99999933986272476760,
  0.99999125611136965852,
  -0.99991777624463387686,
  0.99942835555870132569,
  -0.99697311720723000295,
  0.98751448037275303682,
  -0.95915857980572882813,
  0.89246305511006708555,
  -0.76893425990463999675,
  0.58893528468484693250,
  -0.38380345160440256652,
  0.20317601701045299653,
  -0.82813631607004984866e-01,
  0.24167984735759576523e-01,
  -0.44676566663971825242e-02,
  0.39141169402373836468e-03
]
const pts = [
  0.35082039676451715489e-02,
  0.31279042338030753740e-01,
  0.85266826283219451090e-01,
  0.16245071730812277011,
  0.25851196049125434828,
  0.36807553840697533536,
  0.48501092905604697475,
  0.60277514152618576821,
  0.71477884217753226516,
  0.81475510988760098605,
  0.89711029755948965867,
  0.95723808085944261843,
  0.99178832974629703586
]

const wts = [
  0.18831438115323502887e-01,
  0.18567086243977649478e-01,
  0.18042093461223385584e-01,
  0.17263829606398753364e-01,
  0.16243219975989856730e-01,
  0.14994592034116704829e-01,
  0.13535474469662088392e-01,
  0.11886351605820165233e-01,
  0.10070377242777431897e-01,
  0.81130545742299586629e-02,
  0.60419009528470238773e-02,
  0.38862217010742057883e-02,
  0.16793031084546090448e-02
]

// Some helper functions
function _phi (z) {
  return 0.5 * Object(__WEBPACK_IMPORTED_MODULE_0__error__["a" /* erf */])(z / Math.SQRT2)
}

function _phiComp (z) {
  return 0.5 * Object(__WEBPACK_IMPORTED_MODULE_0__error__["b" /* erfc */])(z / Math.SQRT2)
}

// T1
function _t1 (h, a, m) {
  const hh = -0.5 * h * h
  const dhs = Math.exp(hh)
  const aa = a * a
  let aj = HALF_PI_INV * a
  let dj = dhs - 1
  let gj = hh * dhs
  let z = HALF_PI_INV * Math.atan(a)

  for (let i = 2, j = 1; i <= m; i++, j += 2) {
    z += dj * aj / j
    aj *= aa
    dj = gj - dj
    gj *= hh / i
  }
  return z
}

// T2
function _t2 (h, a, ah, m) {
  const hh = h * h
  const aa = -a * a
  let vi = PI2_SQRT_INV * a * Math.exp(-0.5 * ah * ah)
  let ph = _phi(ah) / h
  const y = 1 / hh
  let z = 0

  const iMax = m + m + 1
  for (let i = 1; i < iMax; i += 2) {
    z += ph
    ph = y * (vi - i * ph)
    vi *= aa
  }
  return PI2_SQRT_INV * Math.exp(-0.5 * hh) * z
}

// T3
function _t3 (h, a, ah, m) {
  const hh = h * h
  const aa = a * a
  let vi = PI2_SQRT_INV * a * Math.exp(-0.5 * ah * ah)
  let ph = _phi(ah) / h
  const y = 1 / hh
  let z = 0

  for (let i = 1, ii = 1; i <= m; i++, ii += 2) {
    z += ph * c2[i - 1]
    ph = y * (ii * ph - vi)
    vi *= aa
  }
  return PI2_SQRT_INV * Math.exp(-0.5 * hh) * z
}

// T4
function _t4 (h, a, m) {
  const hh = h * h
  const aa = -a * a
  let z = 0
  let ai = HALF_PI_INV * a * Math.exp(-0.5 * hh * (1 - aa))
  let yi = 1

  const iMax = m + m + 1
  for (let i = 3; i <= iMax; i += 2) {
    z += ai * yi
    yi = (1 - hh * yi) / i
    ai *= aa
  }
  return z
}

// T5
function _t5 (h, a, m) {
  const hh = -0.5 * h * h
  const aa = a * a
  let z = 0

  for (let i = 0; i < m; i++) {
    const r = 1 + aa * pts[i]
    z += wts[i] * Math.exp(hh * r) / r
  }
  return a * z
}

// T6
function _t6 (h, a) {
  const phi = _phiComp(h)
  const y = 1 - a
  const r = Math.atan(y / (1 + a))
  let z = 0.5 * phi * (1 - phi)

  if (r !== 0) {
    z -= HALF_PI_INV * r * Math.exp(-0.5 * y * h * h / r)
  }
  return z
}

function _t (h, a, ah) {
  // Find sector row
  let row = 7
  for (let i = 0; i < 7; i++) {
    if (a <= aRanges[i]) {
      row = i
      break
    }
  }

  // Find sector column
  let col = 14
  for (let i = 0; i < 14; i++) {
    if (h <= hRanges[i]) {
      col = i
      break
    }
  }

  // Find sector code and order
  const code = codes[row][col]
  const order = orders[code]

  // Run corresponding algorithm
  switch (methods[code]) {
    case 1:
    default:
      return _t1(h, a, order)
    case 2:
      return _t2(h, a, ah, order)
    case 3:
      return _t3(h, a, ah, order)
    case 4:
      return _t4(h, a, order)
    case 5:
      return _t5(h, a, order)
    case 6:
      return _t6(h, a)
  }
}

/**
 * Computes the Owen's T function based on the paper https://www.jstatsoft.org/article/view/v005i05/t.pdf.
 * Translated from the python code: https://people.sc.fsu.edu/~jburkardt/py_src/owens/owens.html
 *
 * @method owenT
 * @memberOf ran.special
 * @param {number} h First parameter.
 * @param {number} a Second parameter.
 * @returns {number} Owen's T function at the specified values.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (h, a) {
  const cut = 0.67
  const hAbs = Math.abs(h)
  const aAbs = Math.abs(a)
  const ah = aAbs * hAbs
  let z

  if (aAbs <= 1) {
    z = _t(hAbs, aAbs, ah)
  } else if (hAbs <= cut) {
    z = 0.25 - _phi(hAbs) * _phi(ah) - _t(ah, 1 / aAbs, hAbs)
  } else {
    const phiH = _phiComp(hAbs)
    const phiAh = _phiComp(ah)
    z = 0.5 * (phiH + phiAh) - phiH * phiAh - _t(ah, 1 / aAbs, hAbs)
  }

  return a < 0 ? -z : z
});


/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__normal__ = __webpack_require__(5);


/**
 * Generator for the [slash distribution]{@link https://en.wikipedia.org/wiki/Slash_distribution}:
 *
 * $$f(x) = \begin{cases}\frac{\phi(0) - \phi(x)}{x^2} &\quad\text{if $x \ne 0$},\\\frac{1}{2 \sqrt{2 \pi}} &\quad\text{if $x = 0$}\\\end{cases},$$
 *
 * where \(\phi(x)\) is the probability density function of the standard [normal distribution]{@link #dist.Normal}. Support: \(x \in \mathbb{R}\).
 *
 * @class Slash
 * @memberOf ran.dist
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__normal__["a" /* default */] {
  constructor () {
    super(0, 1)
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
    this.c1 = [
      0.5 / Math.sqrt(2 * Math.PI)
    ]
  }

  _generator () {
    // Direct sampling by the ratio of normal and uniform variates
    return super._generator() / this.r.next()
  }

  _pdf (x) {
    return x === 0
      ? this.c1[0]
      : (super._pdf(0) - super._pdf(x)) / (x * x)
  }

  _cdf (x) {
    return x === 0
      ? 0.5
      : super._cdf(x) - (super._pdf(0) - super._pdf(x)) / x
  }

  _q (p) {
    return this._qEstimateRoot(p)
  }
});


/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__categorical__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the (ideal) [soliton distribution]{@link https://en.wikipedia.org/wiki/Soliton_distribution}:
 *
 * $$f(k; N) = \begin{cases}\frac{1}{N} &\quad\text{if $k = 1$},\\\frac{1}{k (1 - k)} &\quad\text{otherwise}\\\end{cases},$$
 *
 * with \(N \in \mathbb{N}^+\). Support: \(k \in \{1, 2, ..., N\}\).
 *
 * @class Soliton
 * @memberOf ran.dist
 * @param {number=} N Number of blocks in the messaging model. If not an integer, it is rounded to the nearest one. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__categorical__["a" /* default */] {
  // Special case of custom
  constructor (N = 10) {
    // Define weights
    const Ni = Math.round(N)
    super([1 / Ni].concat(Array.from({ length: Ni - 2 }, (d, i) => 1 / ((i + 1) * (i + 2)))), 1)

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ N: Ni }, [
      'N > 0'
    ])
  }
});


/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__student_t__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for [Student's Z distribution]{@link http://mathworld.wolfram.com/Studentsz-Distribution.html}:
 *
 * $$f(x; n) = \frac{\Gamma\Big(\frac{n}{2}\Big)}{\sqrt{\pi} \Gamma\Big(\frac{n - 1}{2}\Big)} (1 + x^2)^{-\frac{n}{2}},$$
 *
 * with \(n > 1\). Support: \(x \in \mathbb{R}\).
 *
 * @class StudentZ
 * @memberOf ran.dist
 * @param {number=} n Degrees of freedom. Default value is 2.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__student_t__["a" /* default */] {
  constructor (n = 2) {
    // Validate parameter
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ n }, [
      'n > 1'
    ])

    super(n - 1)
  }

  _generator () {
    return super._generator() / Math.sqrt(this.p.nu)
  }

  _pdf (x) {
    return super._pdf(x * Math.sqrt(this.p.nu)) * Math.sqrt(this.p.nu)
  }

  _cdf (x) {
    return super._cdf(x * Math.sqrt(this.p.nu))
  }
});


/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [trapezoidal distribution]{@link https://en.wikipedia.org/wiki/Trapezoidal_distribution}:
 *
 * $$f(x; a, b, c, d) = \begin{cases}0 &\quad\text{for $x < a$},\\\frac{2 (x - a)}{(b - a) (d + c - a - b)} &\quad\text{for $a \le x < b$}\\\frac{2}{d + c - a - b} &\quad\text{for $b \le x < c$}\\\frac{2 (d - x)}{(d - c) (d + c - a - b)} &\quad\text{for $c \le x \le d$}\\0 &\quad\text{for $d < x$} \\\end{cases},$$
 *
 * where \(a, b, c, d \in \mathbb{R}\), \(a < d\), \(a \le b < c\) and \(c \le d\). Support: \(x \in [a, d]\).
 *
 * @class Trapezoidal
 * @memberOf ran.dist
 * @param {number=} a Lower bound of the support. Default value is 0.
 * @param {number=} b Start of the level part. Default value is 0.33.
 * @param {number=} c End of the level part. Default value is 0.67.
 * @param {number=} d Upper bound of the support. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (a = 0, b = 0.33, c = 0.67, d = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { a, b, c, d }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ a, b, c, d }, [
      'a < d',
      'a <= b', 'b < c',
      'c <= d'
    ])

    // Set support
    this.s = [{
      value: a,
      closed: true
    }, {
      value: d,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      d + c - a - b,
      b - a,
      d - c,
      a + b
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    if (x < this.p.b) {
      return 2 * (x - this.p.a) / (this.c[1] * this.c[0])
    } else if (x < this.p.c) {
      return 2 / this.c[0]
    } else {
      return 2 * (this.p.d - x) / (this.c[2] * this.c[0])
    }
  }

  _cdf (x) {
    if (x < this.p.b) {
      return Math.pow(x - this.p.a, 2) / (this.c[1] * this.c[0])
    } else if (x < this.p.c) {
      return (2 * x - this.c[3]) / this.c[0]
    } else {
      return 1 - Math.pow(this.p.d - x, 2) / (this.c[2] * this.c[0])
    }
  }

  _q (p) {
    if (p < this.c[1] / this.c[0]) {
      return this.p.a + Math.sqrt(this.c[0] * this.c[1] * p)
    } else if (p < (2 * this.p.c - this.c[3]) / this.c[0]) {
      return (this.c[0] * p + this.c[3]) / 2
    } else {
      return this.p.d - Math.sqrt(this.c[0] * this.c[2] * (1 - p))
    }
  }
});


/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the asymmetric [triangular distribution]{@link https://en.wikipedia.org/wiki/Triangular_distribution}:
 *
 * $$f(x; a, b, c) = \begin{cases}0 &\quad\text{for $x < a$},\\\frac{2 (x - a)}{(b - a) (c - a)} &\quad\text{for $a \le x < c$}\\\frac{2 (b - x)}{(b - a) (b - c)} &\quad\text{for $c \le x \le b$}\\0 &\quad\text{for $b < x$} \\\end{cases},$$
 *
 * with \(a, b, c \in \mathbb{R}\), \(a < b\) and \(a \le c \le b\). Support: \(x \in [a, b]\).
 *
 * @class Triangular
 * @memberOf ran.dist
 * @param {number=} a Lower bound of the support. Default value is 0.
 * @param {number=} b Upper bound of the support. Default value is 1.
 * @param {number=} c Mode of the distribution. Default value is 0.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (a = 0, b = 1, c = 0.5) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { a, b, c }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ a, b, c }, [
      'a < b',
      'a <= c', 'c <= b'
    ])

    // Set support
    this.s = [{
      value: a,
      closed: true
    }, {
      value: b,
      closed: true
    }]

    // Speed-up constants
    const ba = b - a
    const bc = b - c
    const ca = c - a
    this.c = [
      ba,
      bc,
      ca,
      ba * bc,
      ba * ca
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return x < this.p.c
      ? 2 * (x - this.p.a) / this.c[4]
      : 2 * (this.p.b - x) / this.c[3]
  }

  _cdf (x) {
    return x < this.p.c
      ? Math.pow(x - this.p.a, 2) / this.c[4]
      : 1 - Math.pow(this.p.b - x, 2) / this.c[3]
  }

  _q (p) {
    return p < this.c[2] / this.c[0]
      ? this.p.a + Math.sqrt(p * this.c[4])
      : this.p.b - Math.sqrt((1 - p) * this.c[3])
  }
});


/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__algorithms_brent__ = __webpack_require__(50);



/**
 * Generator for the [Tukey lambda distribution]{@link https://en.wikipedia.org/wiki/Tukey_lambda_distribution}:
 *
 * $$f(x; \lambda) = \frac{1}{Q^{-1}(F(x))},$$
 *
 * where \(Q(p) = \frac{p^\lambda - (1 - p)^\lambda}{\lambda}\) and \(F(x) = Q^{-1}(x)\). Support: \(x \in [-1/\lambda, 1/\lambda]\) if \(\lambda > 0\), otherwise \(x \in \mathbb{R}\).
 *
 * @class TukeyLambda
 * @memberOf ran.dist
 * @param {number=} lambda Shape parameter. Default value is 1.5.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (lambda = 1.5) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { lambda }

    // Set support
    this.s = [{
      value: lambda > 0 ? -1 / lambda : -Infinity,
      closed: lambda > 0
    }, {
      value: lambda > 0 ? 1 / lambda : Infinity,
      closed: lambda > 0
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    if (this.p.lambda === 0) {
      const y = Math.exp(-x)
      return y / Math.pow(1 + y, 2)
    } else {
      if (x === 0) {
        return Math.pow(2, this.p.lambda) / 4
      } else {
        // f(x) = Q^(-1)[F(x)]
        const z = this._cdf(x)
        return 1 / (Math.pow(z, this.p.lambda - 1) + Math.pow(1 - z, this.p.lambda - 1))
      }
    }
  }

  _cdf (x) {
    // If lambda != 0, F(x) is the inverse of quantile function
    return this.p.lambda === 0
      ? 1 / (1 + Math.exp(-x))
      : Object(__WEBPACK_IMPORTED_MODULE_1__algorithms_brent__["a" /* default */])(
        t => (Math.pow(t, this.p.lambda) - Math.pow(1 - t, this.p.lambda)) / this.p.lambda - x,
        0, 1
      )
  }

  _q (p) {
    return this.p.lambda === 0
      ? Math.log(p / (1 - p))
      : (Math.pow(p, this.p.lambda) - Math.pow(1 - p, this.p.lambda)) / this.p.lambda
  }
});


/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the continuous
 * [uniform distribution]{@link https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)}:
 *
 * $$f(x; x_\mathrm{min}, x_\mathrm{max}) = \frac{1}{x_\mathrm{max} - x_\mathrm{min}},$$
 *
 * with \(x_\mathrm{min}, x_\mathrm{max} \in \mathbb{R}\) and \(x_\mathrm{min} < x_\mathrm{max}\).
 * Support: \(x \in [x_\mathrm{min}, x_\mathrm{max}]\).
 *
 * @class Uniform
 * @memberOf ran.dist
 * @param {number=} xmin Lower boundary. Default value is 0.
 * @param {number=} xmax Upper boundary. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (xmin = 0, xmax = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { xmin, xmax }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ xmin, xmax }, [
      'xmin < xmax'
    ])

    // Set support
    this.s = [{
      value: xmin,
      closed: true
    }, {
      value: xmax,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      xmax - xmin
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf () {
    return 1 / this.c[0]
  }

  _cdf (x) {
    return (x - this.p.xmin) / this.c[0]
  }

  _q (p) {
    return p * this.c[0] + this.p.xmin
  }
});


/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__algorithms_neumaier__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__special_gamma__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__special_gamma_incomplete__ = __webpack_require__(6);





// TODO Docs
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (n = 2) {
    super('continuous', arguments.length)

    // Validate parameters
    const ni = Math.round(n)
    this.p = { n: ni }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ n: ni }, [
      'n > 1'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: 1,
      closed: true
    }]
  }

  _generator () {
    return Math.exp(Object(__WEBPACK_IMPORTED_MODULE_1__algorithms_neumaier__["a" /* default */])(Array.from({ length: this.p.n }, () => Math.log(this.r.next()))))
  }

  _pdf (x) {
    return Math.pow(-Math.log(x), this.p.n - 1) / Object(__WEBPACK_IMPORTED_MODULE_2__special_gamma__["a" /* default */])(this.p.n)
  }

  _cdf (x) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__special_gamma_incomplete__["b" /* gammaUpperIncomplete */])(this.p.n, -Math.log(x))
  }
});


/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


// TODO Docs
/**
 * Generator for the [uniform ratio distribution]{@link https://en.wikipedia.org/wiki/Ratio_distribution#Uniform_ratio_distribution}:
 *
 * $$f(x) = \begin{cases}\frac{1}{2} &\quad\text{if $x < 1$},\\\frac{1}{2x^2} &\quad\text{if $x \ge 1$},\\\end{cases}.$$
 *
 * Support: \(x > 0\).
 *
 * @class UniformRatio
 * @memberOf ran.dist
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor () {
    super('continuous', arguments.length)

    // Set support
    this.s = [{
      value: 0,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    return this.r.next() / this.r.next()
  }

  _pdf (x) {
    return x <= 1 ? 0.5 : 0.5 / (x * x)
  }

  _cdf (x) {
    return x <= 1 ? 0.5 * x : 1 - 0.5 / x
  }

  _q (p) {
    return p <= 0.5 ? 2 * p : 0.5 / (1 - p)
  }
});


/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__distribution__ = __webpack_require__(0);


/**
 * Generator for the [u-quadratic distribution]{@link https://en.wikipedia.org/wiki/U-quadratic_distribution}:
 *
 * $$f(x; a, b) = \alpha (x - \beta)^2,$$
 *
 * where \(\alpha = \frac{12}{(b - a)^3}\), \(\beta = \frac{a + b}{2}\), \(a, b \in \mathbb{R}\) and \(a < b\). Support: \(x \in [1, b]\).
 *
 * @class UQuadratic
 * @memberOf ran.dist
 * @param {number=} a Lower bound of the support. Default value is 0.
 * @param {number=} b Upper bound of the support. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */] {
  constructor (a = 0, b = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { a, b }
    __WEBPACK_IMPORTED_MODULE_0__distribution__["a" /* default */].validate({ a, b }, [
      'a < b'
    ])

    // Set support
    this.s = [{
      value: a,
      closed: true
    }, {
      value: b,
      closed: true
    }]

    // Speed-up constants
    this.c = [
      12 / Math.pow(b - a, 3),
      (a + b) / 2,
      Math.pow((b - a) / 2, 3)
    ]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    return this.c[0] * Math.pow(x - this.c[1], 2)
  }

  _cdf (x) {
    return this.c[0] * (Math.pow(x - this.c[1], 3) + this.c[2]) / 3
  }

  _q (p) {
    return Math.cbrt(3 * p / this.c[0] - this.c[2]) + this.c[1]
  }
});


/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_bessel__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distribution__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__special_core__ = __webpack_require__(3);





/**
 * Generator for the [von Mises distribution]{@link https://en.wikipedia.org/wiki/Von_Mises_distribution}:
 *
 * $$f(x; \kappa) = \frac{e^{\kappa \cos(x)}}{2 \pi I_0(\kappa)},$$
 *
 * with \(\kappa > 0\). Support: \(x \in [-\pi, \pi]\). Note that originally this distribution is periodic and therefore it is defined over \(\mathbb{R}\), but (without the loss of general usage) this implementation still does limit the support on the bounded interval \([-\pi, \pi]\).
 *
 * @class VonMises
 * @memberOf ran.dist
 * @param {number=} kappa Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */] {
  constructor (kappa = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { kappa }
    __WEBPACK_IMPORTED_MODULE_2__distribution__["a" /* default */].validate({ kappa }, [
      'kappa > 0'
    ])

    // Set support
    this.s = [{
      value: -Math.PI,
      closed: true
    }, {
      value: Math.PI,
      closed: true
    }]
  }

  _generator () {
    // Sampling method from here: http://sa-ijas.stat.unipd.it/sites/sa-ijas.stat.unipd.it/files/417-426.pdf
    // Source: Barabesi. Generating von Mises variates by the ratio-of-uniforms method. Statistica Applicata 7 (4), 1995.
    const s = this.p.kappa > 1.3 ? 1 / Math.sqrt(this.p.kappa) : Math.PI * Math.exp(-this.p.kappa)

    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_3__special_core__["c" /* MAX_ITER */]; i++) {
      const R1 = this.r.next()
      const R2 = this.r.next()
      const theta = s * (2 * R2 - 1) / R1
      if (Math.abs(theta) > Math.PI) {
        continue
      }

      if (this.p.kappa * theta * theta < 4 - 4 * R1) {
        return theta
      } else {
        if (this.p.kappa * Math.cos(theta) < 2 * Math.log(R1) + this.p.kappa) {
          continue
        }
        return theta
      }
    }
  }

  _pdf (x) {
    return Math.exp(this.p.kappa * Math.cos(x)) / (2 * Math.PI * Object(__WEBPACK_IMPORTED_MODULE_1__special_bessel__["a" /* besselI */])(0, this.p.kappa))
  }

  _cdf (x) {
    // F(x) is computed according to the sum in https://docs.scipy.org/doc/scipy/reference/tutorial/stats/continuous_vonmises.html
    return 0.5 * (1 + x / Math.PI) + Object(__WEBPACK_IMPORTED_MODULE_0__algorithms_recursive_sum__["a" /* default */])({
      c: 0
    }, (t, i) => {
      t.c = Object(__WEBPACK_IMPORTED_MODULE_1__special_bessel__["a" /* besselI */])(i, this.p.kappa) * Math.sin(i * x) / (Object(__WEBPACK_IMPORTED_MODULE_1__special_bessel__["a" /* besselI */])(0, this.p.kappa) * i)
      return t
    }, t => t.c) / Math.PI
  }
});


/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for [Wigner distribution]{@link https://en.wikipedia.org/wiki/Wigner_semicircle_distribution} (also known
 * as semicircle distribution):
 *
 * $$f(x; R) = \frac{2}{\pi R^2} \sqrt{R^2 - x^2},$$
 *
 * with \(R > 0\). Support: \(x \in [-R, R]\).
 *
 * @class Wigner
 * @memberOf ran.dist
 * @param {number=} R Radius of the distribution. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (R = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { R }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ R }, [
      'R > 0'
    ])

    // Set support
    this.s = [{
      value: -R,
      closed: true
    }, {
      value: R,
      closed: true
    }]
  }

  _generator () {
    // Direct sampling by transforming beta variate
    const x = Object(__WEBPACK_IMPORTED_MODULE_0__core__["d" /* gamma */])(this.r, 1.5, 1)
    const y = Object(__WEBPACK_IMPORTED_MODULE_0__core__["d" /* gamma */])(this.r, 1.5, 1)
    return 2 * this.p.R * x / (x + y) - this.p.R
  }

  _pdf (x) {
    const r = this.p.R * this.p.R
    return 2 * Math.sqrt(r - x * x) / (Math.PI * r)
  }

  _cdf (x) {
    const r = this.p.R * this.p.R
    return 0.5 + x * Math.sqrt(r - x * x) / (Math.PI * r) + Math.asin(x / this.p.R) / Math.PI
  }
});


/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_beta__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Yule-Simon distribution]{@link https://en.wikipedia.org/wiki/Yule%E2%80%93Simon_distribution}:
 *
 * $$f(k; \rho) = \rho \mathrm{B}(k, \rho + 1),$$
 *
 * with \(\rho > 0\) and \(\mathrm{B}(x, y)\) is the beta function. Support: \(k \in \mathbb{N}^+\).
 *
 * @class YuleSimon
 * @memberOf ran.dist
 * @param {number=} rho Shape parameter. Default value is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */] {
  constructor (rho = 2) {
    super('discrete', arguments.length)

    // Validate parameters
    this.p = { rho }
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ rho }, [
      'rho > 0'
    ])

    // Set support
    this.s = [{
      value: 1,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      this.p.rho + 1
    ]
  }

  _generator () {
    // Direct sampling by compounding exponential and geometric
    const e1 = -Math.log(this.r.next())
    const e2 = -Math.log(this.r.next())
    const z = Math.exp(-e2 / this.p.rho)

    // Handle z << 1 case
    return 1 - z === 1
      ? Math.ceil(e1 / z)
      : Math.ceil(-e1 / Math.log(1 - z))
  }

  _pdf (x) {
    return this.p.rho * Object(__WEBPACK_IMPORTED_MODULE_0__special_beta__["a" /* default */])(x, this.c[0])
  }

  _cdf (x) {
    return 1 - x * Object(__WEBPACK_IMPORTED_MODULE_0__special_beta__["a" /* default */])(x, this.c[0])
  }
});


/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special_generalized_harmonic__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__special_riemann_zeta__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distribution__ = __webpack_require__(0);





/**
 * Generator for the [zeta distribution]{@link https://en.wikipedia.org/wiki/Zeta_distribution}:
 *
 * $$f(k; s) = \frac{k^{-s}}{\zeta(s)},$$
 *
 * with \(s \in (1, \infty)\) and \(\zeta(x)\) is the Riemann zeta function. Support: \(k \in \mathbb{N}^+\).
 *
 * @class Zeta
 * @memberOf ran.dist
 * @param {number=} s Exponent of the distribution. Default value is 3.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */] {
  constructor (s = 3) {
    super('discrete', arguments.length)

    // Validate parameters
    this.p = { s }
    __WEBPACK_IMPORTED_MODULE_3__distribution__["a" /* default */].validate({ s }, [
      's > 1'
    ])

    // Set support
    this.s = [{
      value: 1,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]

    // Speed-up constants
    this.c = [
      Object(__WEBPACK_IMPORTED_MODULE_1__special_riemann_zeta__["a" /* default */])(s), Math.pow(2, s - 1)
    ]
  }

  _generator () {
    // Rejection sampling
    return Object(__WEBPACK_IMPORTED_MODULE_2__core__["j" /* zeta */])(this.r, this.p.s)
  }

  _pdf (x) {
    return Math.pow(x, -this.p.s) / this.c[0]
  }

  _cdf (x) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__special_generalized_harmonic__["a" /* default */])(x, this.p.s) / this.c[0]
  }
});


/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__riemann_zeta__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hurwitz_zeta__ = __webpack_require__(243);



/**
 * Computes the generalized harmonic number H(n, m).
 *
 * @method generalizedHarmonic
 * @memberOf ran.special
 * @param {number} n Number of terms in the sum.
 * @param {number} m Exponent of the sum.
 * @return {number} The generalized harmonic number H(n, m).
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (n, m) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__riemann_zeta__["a" /* default */])(m) - Object(__WEBPACK_IMPORTED_MODULE_1__hurwitz_zeta__["a" /* default */])(m, n + 1)
});


/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_bernoulli__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__log_gamma__ = __webpack_require__(2);




/**
 * Computes the Hurwitz zeta function (only real values outside the critical strip) using the alternating series.
 * Source: https://projecteuclid.org/download/pdf_1/euclid.em/1046889587
 *
 * @method hurwitzZeta
 * @memberOf ran.special
 * @param {number} s Exponent.
 * @param {number} a Shift.
 * @return {number} Value of the Hurwitz zeta function.
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = (function (s, a) {
  const n = 20

  // First sum
  let z = 0
  for (let k = 0; k <= n; k++) {
    z += Math.pow(a + k, -s)
  }
  z += Math.pow(a + n, 1 - s) / (s - 1) - 0.5 / Math.pow(a + n, s)

  // Second sum
  let c = 1
  for (let k = 1; k < __WEBPACK_IMPORTED_MODULE_1__constants_bernoulli__["a" /* B2k */].length; k++) {
    // Update coefficient
    let m = Object(__WEBPACK_IMPORTED_MODULE_2__log_gamma__["a" /* default */])(s + 4 * k - 3) - Object(__WEBPACK_IMPORTED_MODULE_2__log_gamma__["a" /* default */])(s + 2 * k - 2)
    m -= (s + 2 * k - 1) * Math.log(a + n)
    m -= Object(__WEBPACK_IMPORTED_MODULE_2__log_gamma__["a" /* default */])(2 * k + 1)
    c *= __WEBPACK_IMPORTED_MODULE_1__constants_bernoulli__["a" /* B2k */][k - 1] * Math.exp(m)

    // Increment sum
    z += c

    // Stop if precision achieved
    if (Math.abs(c / z) < __WEBPACK_IMPORTED_MODULE_0__core__["b" /* EPS */]) { break }
  }

  return z
});


/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * The first couple of even indexed Bernoulli numbers starting at B_2.
 *
 * @var {number[]} B
 * @memberOf ran.constants
 * @private
 */
const B2k = [
  0.16666666666666666,
  -0.03333333333333333,
  0.023809523809523808,
  -0.03333333333333333,
  0.07575757575757576,
  -0.2531135531135531,
  1.1666666666666667,
  -7.092156862745098,
  54.971177944862156,
  -529.1242424242424,
  6192.123188405797,
  -86580.25311355312,
  1425517.1666666667,
  -27298231.067816094,
  601580873.9006424,
  -15116315767.092157,
  429614643061.1667,
  -13711655205088.334
]
/* harmony export (immutable) */ __webpack_exports__["a"] = B2k;



/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__categorical__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distribution__ = __webpack_require__(0);



/**
 * Generator for the [Zipf distribution]{@link https://en.wikipedia.org/wiki/Zipf%27s_law}:
 *
 * $$f(k; s, N) = \frac{k^{-s}}{H_{N, s}},$$
 *
 * with \(s \ge 0\), \(N \in \mathbb{N}^+\) and \(H_{N, s}\) denotes the generalized harmonic number. Support: \(k \in \{1, 2, ..., N\}\).
 *
 * @class Zipf
 * @memberOf ran.dist
 * @param {number=} s Exponent of the distribution. Default value is 1.
 * @param {number=} N Number of words. If not an integer, it is rounded to the nearest integer. Default is 100.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__categorical__["a" /* default */] {
  // Special case of categorical
  constructor (s = 1, N = 100) {
    const Ni = Math.round(N)
    super(Array.from({ length: Ni }, (d, i) => Math.pow(i + 1, -s)), 1)

    // Validate parameters
    __WEBPACK_IMPORTED_MODULE_1__distribution__["a" /* default */].validate({ s, N: Ni }, [
      's >= 0',
      'N > 0'
    ])
  }
});


/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_online_covariance__ = __webpack_require__(247);
/* unused harmony reexport OnlineCovariance */
/**
 * Namespace containing various exposed methods related to time series
 *
 * @namespace ts
 * @memberOf ran
 */



/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__la_vector__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__la_matrix__ = __webpack_require__(48);



/**
 * Class representing the aggregate [covariance matrix]{@link https://en.wikipedia.org/wiki/Covariance_matrix} of a time series:
 *
 * $$C_{ij} = \mathbb{E}\big[\big(X_i - \mathbb{E}[X_i]\big)\big(X_j - \mathbb{E}[X_j]\big)\big],$$
 *
 * where \(\mathbb{E}\) denotes the expected value and \(X_i, X_j\) are the i-th and j-th variables in the time series. The covariance matrix is calculated online at each update.
 *
 * @class OnlineCovariance
 * @memberOf ran.ts
 * @param {number} dimension The linear dimension of the covariance. Default is 1.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class {
  constructor (dimension = 1) {
    this.n = 0
    this.mean = new __WEBPACK_IMPORTED_MODULE_0__la_vector__["a" /* default */](dimension).scale(0)
    this.cov = new __WEBPACK_IMPORTED_MODULE_1__la_matrix__["a" /* default */](dimension).scale(0)
  }

  /**
   * Updates the covariance matrix with new observations.
   *
   * @method update
   * @methodOf ran.ts.OnlineCovariance
   * @param {number[]} x Array of numbers representing the new observations.
   */
  update (x) {
    this.n++
    const vx = new __WEBPACK_IMPORTED_MODULE_0__la_vector__["a" /* default */](x)
    const mean = this.mean.add(vx.sub(this.mean).scale(1 / this.n))
    const diff = vx.sub(this.mean)
    const dCov = new __WEBPACK_IMPORTED_MODULE_1__la_matrix__["a" /* default */](diff.outer(diff))
    this.mean = mean
    this.cov = this.cov.add(dCov.scale((this.n - 1) / this.n))
  }

  /**
   * Computes the current value of the covariance matrix.
   *
   * @method compute
   * @methodOf ran.ts.OnlineCovariance
   * @returns {(ran.la.Matrix | undefined)} The current covariance matrix if there was any update already, undefined otherwise.
   */
  compute () {
    return this.n > 0 ? this.cov.scale(1 / this.n) : undefined
  }
});


/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mc_gelman_rubin__ = __webpack_require__(249);
/* unused harmony reexport gelmanRubin */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mc_rwm__ = __webpack_require__(250);
/* unused harmony reexport RWM */
/**
 * A collection of various Monte Carlo methods.
 *
 * @namespace mc
 * @memberOf ran
 */




/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function sum (arr, exponent = 1) {
  if (exponent === 1) {
    return arr.reduce((s, d) => s + d, 0)
  } else {
    return arr.reduce((s, d) => s + Math.pow(d, exponent), 0)
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = ((function () {
  /**
   * Calculates the G-R diagnostic for a single set of samples and a specified state dimension.
   *
   * @method _gri
   * @memberOf ran.mc
   * @param {Array} samples Array of samples.
   * @param {number} dim Index of the state dimension to consider.
   * @returns {number} The G-R diagnostic.
   * @private
   */
  function _gri (samples, dim) {
    // Calculate sample statistics
    const m = []

    const s = []
    samples.forEach(function (d) {
      const di = d.map(function (x) {
        return x[dim]
      })
      const mi = sum(di) / di.length

      const si = (sum(di, 2) - di.length * mi * mi) / (di.length - 1)
      m.push(mi)
      s.push(si)
    })

    // Calculate within and between variances
    const w = sum(s) / samples.length

    const mm = sum(m) / samples.length

    const b = (sum(m, 2) - samples.length * mm * mm) * samples[0].length / (samples.length - 1)

    const v = ((samples[0].length - 1) * w + b) / samples[0].length
    return Math.sqrt(v / w)
  }

  /**
   * Calculates the [Gelman-Rubin]{@link http://www.stat.columbia.edu/~gelman/research/published/brooksgelman2.pdf} diagnostics for a set
   * of samples. The statistics can be used to monitor the convergence of an MCMC model.
   *
   * @method gelmanRubin
   * @memberOf ran.mc
   * @param {Array} samples Array of samples, where each sample is an array of states.
   * @param {number=} maxLength Maximum length of the diagnostic function. Default value is 1000.
   * @returns {Array} Array of Gelman-Rubin diagnostic versus iteration number for each state variable.
   */
  return function (samples, maxLength) {
    return samples[0][0].map(function (s, j) {
      return new Array(maxLength || 1000).fill(0).map(function (d, i) {
        return _gri(samples.map(function (dd) {
          return dd.slice(0, i + 2)
        }), j)
      })
    })
  }
})());


/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mcmc__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist__ = __webpack_require__(49);



/**
 * Class implementing the (random walk) [Metropolis]{@link https://e.wikipedia.org/wiki/Metropolis%E2%80%93Hastings_algorithm}
 * algorithm.
 * Proposals are updated according to the [Metropolis-Within-Gibbs procedure]{@link http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.161.2424}:
 *
 * @class RWM
 * @memberOf ran.mc
 * @param {Function} logDensity The logarithm of the density function to estimate.
 * @param {Object=} config RWM configurations.
 * @param {Object=} initialState Initial state of the RWM sampler.
 * @constructor
 */
/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0__mcmc__["a" /* default */] {
  constructor (logDensity, config, initialState) {
    super(logDensity, config, initialState)

    // Last density value
    this.lastLnp = this.lnp(this.x)

    /**
     * Proposal distributions.
     *
     * @namespace proposal
     * @memberOf ran.mc.RWM
     * @private
     */
    this.proposal = (function (self) {
      const _q = new __WEBPACK_IMPORTED_MODULE_1__dist__["a" /* Normal */](0, 1)

      const _acceptance = new Array(self.dim).fill(0)

      const _sigma = self.internal.proposal || new Array(self.dim).fill(1)

      const _ls = _sigma.map(d => Math.log(d))

      let _n = 0

      let _batch = 0

      let _index = 0

      return {
        /**
         * Samples new state.
         *
         * @method jump
         * @memberOf ran.mc.RWM.proposal
         * @param {Array} x Current state.
         * @param {boolean} single Whether only a single dimension should be updated.
         * @return {Array} New state.
         */
        jump (x, single) {
          return single
            ? x.map((d, i) => d + (i === _index ? _q.sample() * _sigma[_index] : 0))
            : x.map((d, i) => d + _q.sample() * _sigma[i])
        },

        /**
         * Updates proposal distributions.
         *
         * @method update
         * @memberOf ran.mc.RWM.proposal
         * @param {boolean} accepted Whether last state was accepted.
         */
        update (accepted) {
          // Update acceptance for current dimension
          accepted && _acceptance[_index]++
          _n++

          // If batch is finished, update proposal
          if (_n === 100) {
            // Update proposal
            if (_acceptance[_index] / 100 > 0.44) {
              _ls[_index] += Math.min(0.01, Math.pow(_batch, -0.5))
            } else {
              _ls[_index] -= Math.min(0.01, Math.pow(_batch, -0.5))
            }
            _sigma[_index] = Math.exp(_ls[_index])

            // Reset counters and accumulators
            _n = 0
            _acceptance[_index] = 0
            _index = (_index + 1) % self.dim
            if (_index === 0) {
              _batch++
            }
          }
        },

        /**
         * Returns the current scales of the proposals.
         *
         * @method scales
         * @memberOf ran.mc.RWM.proposal
         * @return {Array} Array of proposal scales.
         */
        scales () {
          return _sigma.slice()
        }
      }
    })(this)
  }

  // Internal variables
  _internal () {
    return {
      proposal: this.proposal.scales()
    }
  }

  // Iterator
  _iter (warmUp) {
    let x1 = this.proposal.jump(this.x, warmUp)

    const newLnp = this.lnp(x1)

    const accepted = Math.random() < Math.exp(newLnp - this.lastLnp)
    if (accepted) {
      this.lastLnp = newLnp
    } else {
      x1 = this.x
    }

    return {
      x: x1,
      accepted: accepted
    }
  }

  // Adjustment
  _adjust (i) {
    this.proposal.update(i.accepted)
  }
});


/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Base class implementing a general Markov chain Monte Carlo sampler. All MCMC sampler is extended from this class.
 * MCMC samplers can be used to approximate integrals by efficiently sampling a density that cannot be normalized or
 * sampled directly.
 *
 * @class MCMC
 * @memberOf ran.mc
 * @param {Function} logDensity The logarithm of the density function to estimate.
 * @param {Object=} config Object describing some configurations. Supported properties:
 * <ul>
 *     <li>{dim}: Dimension of the state space to sample. Default is 1.</li>
 *     <li>{maxHistory}: Maximum length of history for aggregated computations. Default is 1000.</li>
 * </ul>
 * @param {Object=} initialState The initial internal state of the sampler. Supported properties: {x} (the
 * starting state), {samplingRate} (sampling rate) and {internal} for the child class' own internal parameters.
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (class {
  constructor (logDensity, config = {}, initialState = {}) {
    this.dim = config.dim || 1
    this.maxHistory = config.maxHistory || 1e4
    this.lnp = logDensity
    this.x = initialState.x || Array.from({ length: this.dim }, Math.random)
    this.samplingRate = initialState.samplingRate || 1
    this.internal = initialState.internal || {}

    /**
     * State history of the sampler.
     *
     * @namespace history
     * @memberOf ran.mc.MCMC
     * @private
     */
    this.history = (function (self) {
      const _arr = Array.from({ length: self.dim }, () => [])

      return {
        /**
         * Returns the current history.
         *
         * @method get
         * @memberOf ran.mc.MCMC.history
         * @return {Array} Current history.
         * @private
         */
        get () {
          return _arr
        },

        /**
         * Updates state history with new data.
         *
         * @method update
         * @memberOf ran.mc.MCMC.history
         * @param {Array} x Last state to update history with.
         */
        update (x) {
          // Add new state
          _arr.forEach((d, j) => d.push(x[j]))

          // Remove old state
          if (_arr[0].length >= self.maxHistory) {
            _arr.forEach(d => d.shift())
          }
        }
      }
    })(this)

    /**
     * Acceptance ratio.
     *
     * @namespace acceptance
     * @memberOf ran.mc.MCMC
     * @private
     */
    this.acceptance = (function (self) {
      const _arr = []

      return {
        /**
         * Computes acceptance for the current historical data.
         *
         * @method compute
         * @memberOf ran.mc.MCMC.acceptance
         * @return {number} Acceptance ratio.
         */
        compute () {
          return _arr.reduce((acc, d) => d + acc) / _arr.length
        },

        /**
         * Updates acceptance history with new data.
         *
         * @method update
         * @memberOf ran.mc.MCMC.acceptance
         * @param {number} a Acceptance: 1 if last state was accepted, 0 otherwise.
         */
        update (a) {
          _arr.push(a)
          if (_arr.length > self.maxHistory) {
            _arr.shift()
          }
        }
      }
    })(this)
  }

  /**
   * Returns the internal variables of the class. Must be overridden.
   *
   * @method _internal
   * @memberOf ran.mc.MCMC
   * @returns {Object} Object containing the internal variables.
   * @private
   */
  _internal () {
    throw Error('MCMC._internal() is not implemented')
  }

  /**
   * Performs a single iteration. Must be overridden.
   *
   * @method _iter
   * @memberOf ran.mc.MCMC
   * @param {number[]} x Current state of the Markov chain.
   * @param {boolean=} warmUp Whether iteration takes place during warm-up or not. Default is false.
   * @returns {{x: Array, accepted: boolean}} Object containing the new state ({x}) and whether it is a
   * genuinely new state or not ({accepted}).
   * @private
   */
  _iter () {
    throw Error('MCMC._iter() is not implemented')
  }

  /**
   * Adjusts internal parameters. Must be overridden.
   *
   * @method _adjust
   * @memberOf ran.mc.MCMC
   * @param {Object} i Object containing the result of the last iteration.
   * @private
   */
  _adjust () {
    throw Error('MCMC._adjust() is not implemented')
  }

  /**
   * Returns the current state of the sampler. The return value of this method can be passed to a sampler of
   * the same type to continue a previously warmed up sampler.
   *
   * @method state
   * @memberOf ran.mc.MCMC
   * @returns {Object} Object containing all relevant parameters of the sampler.
   */
  state () {
    return {
      x: this.x,
      samplingRate: this.samplingRate,
      internals: this._internal()
    }
  }

  /**
   * Computes basic statistics of the sampled state variables based on historical data. Returns mean,
   * standard deviation and coefficient of variation.
   *
   * @method statistics
   * @memberOf ran.mc.MCMC
   * @returns {Object[]} Array containing objects for each dimension. Objects contain <code>mean</code>, <code>std</code> and <code>cv</code>.
   */
  statistics () {
    return this.history.get().map(h => {
      const m = h.reduce((sum, d) => sum + d, 0) / h.length

      const s = h.reduce((sum, d) => sum + (d - m) * (d - m), 0) / h.length
      return {
        mean: m,
        std: s,
        cv: s / m
      }
    })
  }

  /**
   * Computes acceptance rate based on historical data.
   *
   * @method ar
   * @memberOf ran.mc.MCMC
   * @returns {number} The acceptance rate in the last several iterations.
   */
  ar () {
    return this.acceptance.compute()
  }

  /**
   * Computes the auto-correlation function for each dimension based on historical data.
   *
   * @method ac
   * @memberOf ran.mc.MCMC
   * @returns {number[][]} Array containing the correlation function (correlation versus lag) for each
   * dimension.
   */
  ac () {
    // return this._ac.compute();
    return this.history.get().map(h => {
      // Get average
      const m = h.reduce((s, d) => s + d) / h.length

      const m2 = h.reduce((s, d) => s + d * d)

      const rho = new Array(100).fill(0)
      for (let i = 0; i < h.length; i++) {
        for (let r = 0; r < rho.length; r++) {
          if (i - r > 0) {
            rho[r] += (h[i] - m) * (h[i - r] - m)
          }
        }
      }

      // Return auto-correlation for each dimension
      return rho.map(function (d) {
        return d / (m2 - h.length * m * m)
      })
    })
  }

  /**
   * Performs a single iteration.
   *
   * @method iterate
   * @memberOf ran.mc.MCMC
   * @param {Function=} callback Callback to trigger after the iteration.
   * @param {boolean=} warmUp Whether iteration takes place during warm-up or not. Default is false.
   * @returns {Object} Object containing the new state (<code>x</code>) and whether it is a
   * genuinely new state or not (<code>accepted</code>).
   */
  iterate (callback = null, warmUp = false) {
    // Get new state
    const i = this._iter(this.x, warmUp)

    // Update accumulators
    this.history.update(i.x)
    this.acceptance.update(i.accepted)

    // Update state
    this.x = i.x

    // Callback
    callback && callback(i.x, i.accepted)

    return i
  }

  /**
   * Carries out the initial warm-up phase of the sampler. During this phase, internal parameters may change
   * and therefore sampling does not take place. Instead, all relevant variables are adjusted.
   *
   * @method warmUp
   * @memberOf ran.mc.MCMC
   * @param {Function} progress Callback function to call when an integer percentage of the warm-up is done.
   * The percentage of the finished batches is passed as a parameter.
   * @param {number=} maxBatches Maximum number of batches for warm-up. Each batch consists of 10K iterations.
   * Default value is 100.
   */
  warmUp (progress, maxBatches = 100) {
    // Run specified batches
    for (let batch = 0; batch <= maxBatches; batch++) {
      // Do some iterations
      for (let j = 0; j < 1e4; j++) {
        this._adjust(this.iterate(null, true))
        // this._ac.update(this.x);
      }

      // Adjust sampling rate
      // Get highest zero point
      const z = this.ac().reduce((first, d) => {
        for (let i = 0; i < d.length - 1; i++) {
          if (Math.abs(d[i]) <= 0.05) {
            return Math.max(first, i)
          }
        }
      }, 0)
      // Change sampling rate if zero point is different
      if (z > this.samplingRate) {
        this.samplingRate++
      } else if (z < this.samplingRate && this.samplingRate > 1) {
        this.samplingRate--
      }

      // Call optional callback
      if (typeof progress !== 'undefined') {
        progress(100 * batch / maxBatches)
      }
    }
  }

  /**
   * Performs the sampling of the target density. Note that during sampling, no parameter adjustment is
   * taking place.
   *
   * @method sample
   * @memberOf ran.mc.MCMC
   * @param {Function} progress Callback function to call when an integer percentage of the samples is
   * collected. The percentage of the samples already collected is passed as a parameter.
   * @param {number=} size Size of the sampled set. Default is 1000.
   * @returns {Array} Array containing the collected samples.
   */
  sample (progress, size = 1000) {
    // Calculate total iterations
    const iMax = this.samplingRate * size

    const batchSize = iMax / 100

    const samples = []

    // Start sampling
    for (let i = 0; i < iMax; i++) {
      this.iterate()

      // Adjust occasionally, also send progress status
      if (i % batchSize === 0 && typeof progress !== 'undefined') {
        progress(i / batchSize)
      }

      // Collect sample
      if (i % this.samplingRate === 0) {
        samples.push(this.x)
      }
    }

    return samples
  }
});


/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__test_mann_whitney__ = __webpack_require__(253);
/* unused harmony reexport mannWhitney */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__test_bartlett__ = __webpack_require__(254);
/* unused harmony reexport bartlett */
/**
 * A collection of statistical tests.
 *
 * @namespace test
 * @memberOf ran
 */



/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_normal__ = __webpack_require__(5);


/**
 * Marks an array of values with a type.
 *
 * @method _markData
 * @memberOf ran.test
 * @param {number[]} data Array of numbers to mark.
 * @param {number} type Type of the data to mark with.
 * @returns {Object[]} Array of objects containing the data as value properties and type as the type properties.
 * @private
 */
function _markData (data, type) {
  return data.map(d => ({
    value: d,
    type
  }))
}

/**
 * Computes the ranks for an array of marked data.
 *
 * @method _computeRanks
 * @memberOf ran.test
 * @param {Object[]} data Array of objects containing the marked data sets.
 * @returns {Object[]} Array of objects containing the marked data along with the ranks.
 * @private
 */
function _computeRanks (data) {
  // Merge data sets, sort and assign ranks
  const rankedData = data
    // Sort values
    .sort((a, b) => a.value - b.value)
    // Assign ranks
    .map((d, i) => ({
      value: d.value,
      type: d.type,
      rank: i + 1
    }))

  // Adjust ranks
  // Fix ranks for ties
  let lo = 0
  let hi = lo
  for (let i = 1; i < rankedData.length; i++) {
    // Check for ties
    if (rankedData[i].value === rankedData[lo].value) {
      hi = i
    } else {
      // Update ranks
      if (hi !== lo) {
        const midpoint = (rankedData[hi].rank + rankedData[lo].rank) / 2
        for (let j = lo; j <= hi; j++) {
          rankedData[j].rank = midpoint
        }
      }

      // Reset low and high ranks
      lo = i
      hi = lo
    }
  }

  return rankedData
}

/**
 * Calculates the [Mann-Whitney statistics]{@link https://en.wikipedia.org/wiki/Mann%E2%80%93Whitney_U_test} for two
 * data sets.
 *
 * @method mannWhitney
 * @memberOf ran.test
 * @param {Array[]} dataSets Array containing the two data sets.
 * @param {number} alpha Confidence level.
 * @returns {Object} Object containing the test statistics and whether the data sets passed the null hypothesis that
 * the samples come from the same distribution.
 * @throws Error when the number of data sets is different from 2.
 * @example
 *
 * let pareto = new ran.dist.Pareto(1, 2)
 * let uniform = new ran.dist.Uniform(1, 10);
 *
 * ran.test.mannWhitney([pareto.sample(100), pareto.sample(100)[, 0.1)
 * // => { U: 0.46180049966683373, passed: true }
 *
 * ran.test.mannWhitney([pareto.sample(100), uniform.sample(100)], 0.1)
 * // => { U: 8.67403054929767, passed: false }
 */
/* unused harmony default export */ var _unused_webpack_default_export = (function (dataSets, alpha = 0.05) {
  // Check data sets
  if (dataSets.length !== 2) {
    throw Error('dataSets must contain two data sets')
  }

  // Flag data sets
  const markedData1 = _markData(dataSets[0], 1)
  const markedData2 = _markData(dataSets[1], 2)

  // Assign ranks
  const ranks = _computeRanks(markedData1.concat(markedData2))

  // Compute statistics
  const n1 = dataSets[0].length
  const n2 = dataSets[1].length
  const r1 = ranks.filter(d => d.type === 1)
    .reduce((acc, d) => acc + d.rank, 0)
  const u1 = r1 - n1 * (n1 + 1) / 2
  const u = Math.min(u1, n1 * n2 - u1)

  // Standardize U
  const m = n1 * n2 / 2
  const s = Math.sqrt(n1 * n2 * (n1 + n2 + 1) / 12)
  const z = Math.abs((u - m) / s)

  // Compare against critical value
  return {
    U: z,
    passed: z <= (new __WEBPACK_IMPORTED_MODULE_0__dist_normal__["a" /* default */]()).q(1 - 2 * alpha)
  }
});


/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispersion_variance__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_chi2__ = __webpack_require__(26);



/**
 * Calculates the [Bartlett statistics]{@link https://en.wikipedia.org/wiki/Bartlett%27s_test} for multiple data sets.
 *
 * @method bartlett
 * @memberOf ran.test
 * @param {Array[]} dataSets Array containing the data sets.
 * @param {number} alpha Confidence level.
 * @returns {Object} Object containing the test statistics and whether the data sets passed the null hypothesis that
 * their variances are the same.
 * @throws Error when the number of data sets is less than 2.
 * @throws Error when the size of any data set is less than 2 elements.
 * @example
 *
 * let normal1 = new ran.dist.Normal(1, 2)
 * let normal2 = new ran.dist.Normal(1, 3)
 * let normal3 = new ran.dist.Normal(1, 5)
 *
 * ran.test.bartlett([normal1.sample(100), normal1.sample(100), normal1.sample(100)], 0.1)
 * // => { chi2: 0.09827551592930094, passed: true }
 *
 * ran.test.mannWhitney([normal1.sample(100), normal2.sample(100), normal3.sample(100)], 0.1)
 * // => { chi2: 104.31185521417476, passed: false }
 */
/* unused harmony default export */ var _unused_webpack_default_export = (function (dataSets, alpha = 0.05) {
  // Check number of data sets
  if (dataSets.length < 2) {
    throw Error('dataSet must contain multiple data sets')
  }

  // Check size of data sets
  for (let i = 0; i < dataSets.length; i++) {
    if (dataSets[i].length < 2) {
      throw Error('Data sets in dataSet must have multiple elements')
    }
  }

  // Number of samples
  const k = dataSets.length

  // Compute statistics
  const N = dataSets.reduce((acc, d) => acc + d.length, 0)
  const nInv = dataSets.reduce((acc, d) => acc + 1 / (d.length - 1), 0)
  const Si = dataSets.map(__WEBPACK_IMPORTED_MODULE_0__dispersion_variance__["a" /* default */])
  const Sp = dataSets.reduce((acc, d, i) => acc + (d.length - 1) * Si[i], 0) / (N - k)
  const lnSi = dataSets.reduce((acc, d, i) => acc + (d.length - 1) * Math.log(Si[i]), 0)
  const chi2 = ((N - k) * Math.log(Sp) - lnSi) / (1 + (nInv - 1 / (N - k)) / (3 * (k - 1)))

  // Compare against critical value
  return {
    chi2: chi2,
    // TODO Fix two-sided test
    passed: chi2 <= (new __WEBPACK_IMPORTED_MODULE_1__dist_chi2__["a" /* default */](k - 1)).q(1 - alpha)
  }
});


/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Calculates the unbiased sample variance of an array of values using [Welford's algorithm]{@link https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm}.
 *
 * @method variance
 * @memberOf ran.dispersion
 * @param {number[]} values Array of values to calculate variance for.
 * @returns {(number|undefined)} Variance of the values if there are more than two, undefined otherwise.
 * @example
 *
 * ran.dispersion.variance([])
 * // => undefined
 *
 * ran.dispersion.variance([1])
 * // => undefined
 *
 * ran.dispersion.variance([1, 2, 3])
 * // => 2.5
 */
/* harmony default export */ __webpack_exports__["a"] = (function (values) {
  if (values.length > 1) {
    let n = 0
    let diff = 0
    let mean = 0
    let M = 0
    for (const x of values) {
      diff = x - mean
      mean += diff / ++n
      M += diff * (x - mean)
    }
    return M / (n - 1)
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports) {

module.exports = "#version 300 es\n\nuniform mat4 u_ViewProj;\nuniform float u_Time;\n\nuniform mat3 u_CameraAxes; // Used for rendering particles as billboards (quads that are always looking at the camera)\n// gl_Position = center + vs_Pos.x * camRight + vs_Pos.y * camUp;\n\nin vec4 vs_Pos; // Non-instanced; each particle is the same quad drawn in a different place\nin vec4 vs_Nor; // Non-instanced, and presently unused\nin vec4 vs_Col; // An instanced rendering attribute; each particle instance has a different color\nin vec4 vs_MeshId; // Id corresponding to mesh\nin vec4 vs_InstanceId; // Id corresponding to mesh instance\n\n//mat4 that we multiply by vs_Pos to get instances of a base cylinder traveling along our turtle path\nin vec4 vs_Transform1;\nin vec4 vs_Transform2;\nin vec4 vs_Transform3;\nin vec4 vs_Transform4;\n\nin vec3 vs_Translate; // Another instance rendering attribute used to position each quad instance in the scene\n\nin vec2 vs_UV; // Non-instanced, and presently unused in main(). Feel free to use it for your meshes.\n\nout vec4 fs_Col;\nout vec4 fs_Pos;\nout vec4 fs_Nor;\nout vec4 fs_LightVec;\nout vec2 fs_UV;\nout vec4 fs_MeshId;\nout vec4 fs_InstanceId;\n\nvec2 transformUV()\n{\n    float tex_divs = 15.0;\n    float uv_scale = 1.0 / tex_divs;\n    float cel_y = uv_scale * floor(vs_InstanceId[0] * uv_scale);\n    float cel_x = uv_scale * (mod(vs_InstanceId[0], tex_divs));\n    float nextcel_y = uv_scale * floor(vs_InstanceId[0] * uv_scale + 1.0);\n    vec2 transformedUV = vs_UV;\n    transformedUV *= uv_scale;\n    transformedUV += vec2(cel_x, cel_y);\n    \n    return transformedUV;\n}\n\nvoid main()\n{\n    fs_MeshId = vs_MeshId;\n    fs_InstanceId = vs_InstanceId;\n\n    fs_UV = vs_UV;\n    vec4 lightPos = vec4(0.0, 30.0, 30.0, 1.0);\n\n    fs_Col = vs_Col;\n    fs_Pos = vs_Pos;\n    mat4 T = mat4(vs_Transform1, vs_Transform2, vs_Transform3, vs_Transform4);\n    vec4 finalPos = T * vs_Pos;\n\n    mat3 normalT = inverse(transpose(mat3(T)));\n    fs_Nor = vec4(normalT * vec3(vs_Nor), 0);\n\n    fs_LightVec = lightPos - finalPos;\n    \n    gl_Position = u_ViewProj * finalPos;\n}\n"

/***/ }),
/* 257 */
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision highp float;\n\nin vec4 fs_Col;\nin vec4 fs_Pos;\nin vec4 fs_Nor;\nin vec4 fs_LightVec;\nin vec2 fs_UV;\nin vec4 fs_MeshId;\nin vec4 fs_InstanceId;\n\nout vec4 out_Col;\nuniform sampler2D u_barkTexture;\nuniform sampler2D u_leafTexture;\nuniform sampler2D u_leafTexture2;\nuniform sampler2D u_potTexture;\nuniform sampler2D u_groundTexture;\nuniform sampler2D u_appleTexture1;\nuniform sampler2D u_appleTexture2;\nuniform sampler2D u_mulchTexture;\n\nfloat rand(vec2 co){\n    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 diffuseColor = fs_Col;\n\n    // Draws texture depending on the Mesh Id\n    if (fs_MeshId[0] == 0.0) {\n        diffuseColor = texture(u_barkTexture, fs_UV);\n    } else if (fs_MeshId[0] == 1.0) {\n        float leafProb = rand(fs_InstanceId.xy);\n        if (leafProb < 0.5) {\n            diffuseColor = texture(u_leafTexture, fs_UV);\n        } else {\n            diffuseColor = texture(u_leafTexture2, fs_UV);\n        }\n        float alpha = diffuseColor.w;\n        if(diffuseColor.w < 0.3) {\n            discard;\n        } else {\n            alpha = 1.0;\n        }\n    } else if (fs_MeshId[0] == 2.0) {\n        diffuseColor = texture(u_potTexture, fs_UV);\n    } else if (fs_MeshId[0] == 3.0) {\n        diffuseColor = texture(u_groundTexture, fs_UV);\n    } else if (fs_MeshId[0] == 4.0) {\n        float appleProb = rand(fs_InstanceId.xy);\n        if (appleProb < 0.5) {\n            diffuseColor = texture(u_appleTexture1, fs_UV);\n        } else {\n            diffuseColor = texture(u_appleTexture2, fs_UV);\n        }\n        //diffuseColor = texture(u_appleTexture1, fs_UV);\n\n    } else if (fs_MeshId[0] == 5.0) {\n        diffuseColor = texture(u_mulchTexture, fs_UV);\n    }\n   \n    float diffuseTerm = dot(normalize(fs_Nor), normalize(fs_LightVec));\n    diffuseTerm = clamp(diffuseTerm, 0.0, 1.0);\n    float ambientTerm = 0.4;\n    float lightIntensity = diffuseTerm + ambientTerm;\n\n    out_Col = vec4(diffuseColor.rgb * lightIntensity, 1.0);\n}\n"

/***/ }),
/* 258 */
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision highp float;\n\n// The vertex shader used to render the background of the scene\n\nin vec4 vs_Pos;\nout vec2 fs_Pos;\n\nvoid main() {\n  fs_Pos = vs_Pos.xy;\n  gl_Position = vs_Pos;\n}\n"

/***/ }),
/* 259 */
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision highp float;\n\nuniform vec3 u_Eye, u_Ref, u_Up;\nuniform vec2 u_Dimensions;\nuniform float u_Time;\n\nin vec2 fs_Pos;\nout vec4 out_Col;\n\n//SETTINGS//\nconst float cloudscale = 1.0;\nconst float speed = 0.0003;\nconst float clouddark = 0.5;\nconst float cloudlight = 0.3;\nconst float cloudcover = 0.1;\nconst float cloudalpha = 3.0;\nconst float skytint = 0.7;\n//SETTINGS//\n\nconst mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );\n\nvec2 hash( vec2 p ) {\n\tp = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));\n\treturn -1.0 + 2.0*fract(sin(p)*43758.5453123);\n}\n\nfloat noise( in vec2 p ) {\n    const float K1 = 0.366025404; // (sqrt(3)-1)/2;\n    const float K2 = 0.211324865; // (3-sqrt(3))/6;\n\tvec2 i = floor(p + (p.x+p.y)*K1);\t\n    vec2 a = p - i + (i.x+i.y)*K2;\n    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0); //vec2 of = 0.5 + 0.5*vec2(sign(a.x-a.y), sign(a.y-a.x));\n    vec2 b = a - o + K2;\n\tvec2 c = a - 1.0 + 2.0*K2;\n    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );\n\tvec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));\n    return dot(n, vec3(70.0));\t\n}\n\nfloat fbm(vec2 n) {\n\tfloat total = 0.0, amplitude = 0.1;\n\tfor (int i = 0; i < 7; i++) {\n\t\ttotal += noise(n) * amplitude;\n\t\tn = m * n;\n\t\tamplitude *= 0.4;\n\t}\n\treturn total;\n}\n\nvoid main() {\n  vec3 blue = vec3(93.0/255.0, 211.0/255.0, 254.0/255.0);\n  vec3 darkBlue = vec3(0.0, 119.0/255.0, 163.0/255.0);\n  vec3 skyCol = mix(darkBlue, blue, fs_Pos.y);\n\n  vec2 p = fs_Pos;\n\tvec2 uv = fs_Pos;    \n  float time = u_Time * speed;\n  float q = fbm(uv * cloudscale * 0.5);\n    \n  //ridged noise shape\n\tfloat r = 0.0;\n\tuv *= cloudscale;\n  uv -= q - time;\n  float weight = 0.8;\n  for (int i=0; i<8; i++){\n  r += abs(weight*noise( uv ));\n      uv = m*uv + time;\n  weight *= 0.7;\n  }\n    \n  //noise shape\n\tfloat f = 0.1;\n  uv = fs_Pos;\n\tuv *= cloudscale;\n  uv -= q - time;\n  weight = 0.8;\n  for (int i=0; i<5; i++){\n    f += weight*noise( uv );\n    uv = m*uv + time;\n      weight *= 0.6;\n  }\n  \n  f *= r + f;\n  \n  //noise colour\n  float c = 0.0;\n  time = u_Time * speed * 2.0;\n  uv = fs_Pos;\n  uv *= cloudscale*2.0;\n  uv -= q - time;\n  weight = 0.7;\n  for (int i=0; i<7; i++){\n    c += weight*noise( uv );\n    uv = m*uv + time;\n    weight *= 0.6;\n  }\n    \n  //noise ridge colour\n  float c1 = 0.0;\n  time = u_Time * speed * 3.0;\n  uv = fs_Pos;\n  uv *= cloudscale * 3.0;\n  uv -= q - time;\n  weight = 0.4;\n  for (int i=0; i<7; i++){\n    c1 += abs(weight*noise( uv ));\n    uv = m*uv + time;\n    weight *= 0.6;\n  }\n\n  c += c1;\n  \n  vec3 cloudcolour = vec3(1.1, 1.1, 0.9) * clamp((clouddark + cloudlight*c), 0.0, 1.0);\n  \n  f = cloudcover + cloudalpha*f*r;\n  \n  vec3 result = mix(skyCol, clamp(skytint * skyCol + cloudcolour, 0.0, 1.0), clamp(f + c, 0.0, 1.0));\n\n  out_Col = vec4(result, 1.0);\n}\n"

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map