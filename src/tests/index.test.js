'use strict';

var _ = require('underscore'),
    expect = require('expect.js'),
    Plugin = require('../index.js'),
    sinon = require('sinon'); // eslint-disable-line no-unused-vars

function stubServerless() {
   return {
      getProvider: function() {
         return {};
      },
      cli: {
         log: _.noop,
         consoleLog: _.noop,
         printDot: _.noop,
      },
   };
}

describe('serverless-plugin-cloudfront-distribution-tags', function() {
   var plugin; // eslint-disable-line no-unused-vars

   beforeEach(function() {
      plugin = new Plugin(stubServerless(), {});
   });

   describe('TODO', function() {

      it('needs to be tested', function() {
         expect(1).to.eql(1);
      });

   });

   describe('_addTagsToResource', function() {

      it('adds new tags to an untagged resource', function() {
         var tags = { key1: 'value1' },
             resource = { Properties: {} };

         plugin._addTagsToResource(resource, tags);

         expect(resource.Properties.Tags).to.eql([
            { Key: 'key1', Value: 'value1' },
         ]);
      });

      it('merges new tags with existing tags on resource', function() {
         var tags = { key1: 'value1', key3: 'value3' },
             resource;

         resource = {
            Properties: {
               Tags: [
                  { Key: 'key1', Value: 'existingValue1' },
                  { Key: 'key2', Value: 'existingValue2' },
               ],
            },
         };

         plugin._addTagsToResource(resource, tags);

         expect(resource.Properties.Tags).to.eql([
            { Key: 'key3', Value: 'value3' },
            { Key: 'key1', Value: 'existingValue1' },
            { Key: 'key2', Value: 'existingValue2' },
         ]);
      });

      it('prefers the existing tag when new tags contain a tag with the same key', function() {
         var tags = { key1: 'value1' },
             resource;

         resource = {
            Properties: {
               Tags: [
                  { Key: 'key1', Value: 'existingValue1' },
               ],
            },
         };

         plugin._addTagsToResource(resource, tags);

         expect(resource.Properties.Tags).to.eql([
            { Key: 'key1', Value: 'existingValue1' },
         ]);
      });

   });

});
