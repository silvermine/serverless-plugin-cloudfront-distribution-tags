'use strict';

var _ = require('underscore'),
    Class = require('class.extend'),
    PLUGIN_NAME = 'serverless-plugin-cloudfront-distribution-tags';

module.exports = Class.extend({

   init: function(serverless, opts) {
      this._serverless = serverless;
      this._provider = serverless ? serverless.getProvider('aws') : null;
      this._opts = opts;
      this._custom = serverless.service ? serverless.service.custom : null;
      this._pluginConfig = this._custom && this._custom[PLUGIN_NAME] ? this._custom[PLUGIN_NAME] : {};

      if (!this._provider) {
         throw new Error('This plugin must be used with AWS');
      }

      this.hooks = {
         'aws:package:finalize:mergeCustomProviderResources': this._modifyTemplate.bind(this),
      };
   },

   _modifyTemplate: function() {
      var stackTags = this._getStackTags(),
          tagsToAdd = _.omit(stackTags, this._pluginConfig.excludedTags),
          template = this._serverless.service.provider.compiledCloudFormationTemplate;

      _.chain(template.Resources)
         .filter({ Type: 'AWS::CloudFront::Distribution' })
         .each(function(resource) {
            this._addTagsToResource(resource, tagsToAdd);
         }.bind(this));
   },

   _getStackTags: function() {
      return _.extend({
         STAGE: this._provider.getStage(), // The provider's stackTags does not include the stage
      }, this._serverless.service.provider.stackTags);
   },

   _addTagsToResource: function(resource, tags) {
      var existingTags = _.pluck(resource.Properties.Tags, 'Key');

      resource.Properties.Tags = _.chain(tags)
         .map(function(value, key) {
            return {
               Key: key,
               Value: value,
            };
         })
         .filter(function(tag) {
            return !_.contains(existingTags, tag.Key);
         })
         .union(resource.Properties.Tags)
         .value();
   },

});
