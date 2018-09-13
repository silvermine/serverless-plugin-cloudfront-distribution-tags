'use strict';

var Class = require('class.extend');

module.exports = Class.extend({

   init: function(serverless, opts) {
      this._serverless = serverless;
      this._provider = serverless ? serverless.getProvider('aws') : null;
      this._opts = opts;
      this._custom = serverless.service ? serverless.service.custom : null;

      if (!this._provider) {
         throw new Error('This plugin must be used with AWS');
      }

      throw new Error('This plugin\'s functionality has not been implemented');
   },

});
