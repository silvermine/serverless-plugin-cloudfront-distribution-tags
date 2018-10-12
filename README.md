# Serverless Plugin: Propagate Stack Tags To CloudFront Distribution

[![Build Status](https://travis-ci.org/silvermine/serverless-plugin-cloudfront-distribution-tags.svg?branch=master)](https://travis-ci.org/silvermine/serverless-plugin-cloudfront-distribution-tags)
[![Coverage Status](https://coveralls.io/repos/github/silvermine/serverless-plugin-cloudfront-distribution-tags/badge.svg?branch=master)](https://coveralls.io/github/silvermine/serverless-plugin-cloudfront-distribution-tags?branch=master)
[![Dependency Status](https://david-dm.org/silvermine/serverless-plugin-cloudfront-distribution-tags.svg)](https://david-dm.org/silvermine/serverless-plugin-cloudfront-distribution-tags)
[![Dev Dependency Status](https://david-dm.org/silvermine/serverless-plugin-cloudfront-distribution-tags/dev-status.svg)](https://david-dm.org/silvermine/serverless-plugin-cloudfront-distribution-tags#info=devDependencies&view=table)


## What is it?

This is a plugin for the Serverless framework that will copy the tags from a
service's CloudFormation stack to any CloudFront distributions contained in
that stack.

The [CloudFormation docs][automatic-stack-tags] note that all stack-level tags
will be automatically propagated to resources that CloudFormation supports.
CloudFront distributions [have support for tags via
CloudFormation][cloudfront-dist-tags]. Unfortunately, stack-level tags are not
propagated to CloudFront distributions at this time (and it [seems to have been
this way for a while][thread-tag-cf]). Until the behavior changes, this plugin
can be used to mimic the behavior of the automatic stack tag propagation that
CloudFormation provides. This will be performed by adding the stack-level tags
found in the CloudFormation template to the CloudFront distribution before the
stack is deployed.

NOTE: Once CloudFormation supports propagating stack-level tags to CloudFront
distribution, this plugin will be obsolete.


## How do I use it?

There are two steps:

### Install the Plugin as a Development Dependency

```bash
npm install --save-dev --save-exact @silvermine/serverless-plugin-cloudfront-distribution-tags
```

### Telling Serverless to Use the Plugin

Simply add this plugin to the list of plugins in your `serverless.yml` file:

```yml
plugins:
   - '@silvermine/serverless-plugin-cloudfront-distribution-tags'
```

Since CloudFront distributions can take quite a while to deploy, you likely only want to
have to CloudFormation update them when changes are actually made. Unfortunately, when the
tags on a distribution change, CloudFormation will redeploy the distribution. If you have
a tag with a value that changes even when the distribution may not have, e.g.
`CODE_VERSION`, you might want to exclude this tag using the `excludedTags` configuration
option.

```yml
custom:
   serverless-plugin-cloudfront-distribution-tags:
      excludedTags:
         - CODE_VERSION
         - ANOTHER_TAG_TO_BE_EXCLUDED
```

## How do I contribute?

We genuinely appreciate external contributions. See [our extensive
documentation][contributing] on how to contribute.


## License

This software is released under the MIT license. See [the license file](LICENSE) for more
details.


[automatic-stack-tags]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html
[cloudfront-dist-tags]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html#cfn-cloudfront-distribution-tags
[thread-tag-cf]: https://forums.aws.amazon.com/thread.jspa?threadID=115069
[contributing]: https://github.com/silvermine/silvermine-info#contributing
