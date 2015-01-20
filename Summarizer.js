'use strict';

(function(window) {
    var Summarizer = (function() {
        /**
         * Constructor for type-safety error message
         * @param {string} message  The error message to be shown to the user
         * @param {object} contents The entity which caused the error
         */
        var TypeException = function(message, contents) {
            this.message = message;
            this.contents = contents;
            this.name = "TypeException";
            this.toString = function() {
                return this.name + ': ' + this.message;
            }
        }

        /**
         * Constructor for the summary handler
         * @param   {Object} sumEngine  A valid summarization engine
         * @param   {Object} engineOpts A hash-set of options applicable to ``engine``
         * @return  {Summarizer}        An instance of a Summarizer
         */
        var Summarizer = function(sumEngine, engineOpts) {
            // Default the options parameter to none if nothing is provided
            var engineOpts = engineOpts || {};

            // Quick and dirty type-check for the options
            if (typeof(engineOpts) !== 'object') {
                throw new TypeException('\'engineOpts\' must be an object.', engineOpts);
            }

            this.sumEngine = sumEngine;
            this.engineOpts = engineOpts;

            return {
                get engine() {
                    return sumEngine;
                },
                get options() {
                    return engineOpts;
                },
                set options(updatedOptions) {
                    // TODO: Fix this shit
                    this.engineOpts = updatedOptions;
                }
            }
        }

        /**
         * Summarizes a body of text to the specified length. This will use
         * the summarization engine encapsulated by the constructor object.
         * @param  {String} input     The text to be summarized
         * @param  {Number} length    The desired length of the summary
         * @return {String}           The summary of ``input``
         */
        Summarizer.prototype.summarize = function(input, length) {
            var length = length || Math.round(input.length * 0.2);

            // Quick and dirty type-check for the input
            if (typeof(input) !== 'string') {
                throw new TypeException('\'input\' must be a string.', input);
            }

            // Quick and dirty type-check for the length
            if (typeof(length) !== 'number') {
                throw new TypeException('\'length\' must be an object.', length);
            }

            return this.engine.summarize(input, length);
        }

        return Summarizer;
    })(Summarizer || {});

    // Logic to inject the IIFE above into the correct scope depending on how
    // the asset is requested. This supports Node.js, browser loading, and AMD.
    if (typeof(module) === 'object' && module && typeof(module.exports) === 'object') {
        module.exports = Summarizer;
    } else {
        if (typeof(define) === 'function' && define.amd) {
            return Summarizer;
        } else {
            window.Summarizer = Summarizer;
        }
    }
})(this);
