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
         * Summarizes a body of text to the specified length. This will use
         * the summarization engine encapsulated by the constructor object.
         * @param  {String} input     The text to be summarized
         * @param  {Number} length    The desired length of the summary
         * @return {String}           The summary of ``input``
         */
        var summarize = function(input, length) {

        }

        /**
         * Constructor for the summary handler
         * @param   {Object} engine     A valid summarization engine
         * @param   {Object} options    A hash-set of options applicable to ``engine``
         * @return  {Summarizer}        An instance of a Summarizer
         */
        var Summarizer = function(engine, options) {
            // Default the options parameter to none if nothing is provided
            var options = options || {};

            // Quick and dirty type-check for the options
            if (typeof(options) !== 'object') {
                throw new TypeException('\'options\' must be an object.', options);
            }

            return {
                get engine() {
                    return this.engine;
                },
                get options() {
                    return this.options;
                },
                set options(updatedOptions) {
                    this.options = updatedOptions;
                }
            }
        }

        // Public methods for the Summarizer class.
        Summarizer.prototype = {
            summarize: summarize
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
