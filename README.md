[![Build Status](https://travis-ci.org/adam-p/markdown-it-headinganchor.svg?branch=master)](https://travis-ci.org/adam-p/markdown-it-headinganchor)
[![NPM version](https://img.shields.io/npm/v/markdown-it-footnote.svg?style=flat)](https://www.npmjs.org/package/markdown-it-footnote)
[![Coverage Status](https://coveralls.io/repos/adam-p/markdown-it-headinganchor/badge.svg)](https://coveralls.io/r/adam-p/markdown-it-headinganchor)


# markdown-it-headinganchor

This is a [markdown-it](https://github.com/markdown-it/markdown-it) plugin that adds an anchor (i.e., `<a name=\"blah\"...>`) to headings. 

There are other plugins that add an `id` attribute ([valeriangalliat/markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor)) or `name` attribute ([leff/markdown-it-named-headers](https://github.com/leff/markdown-it-named-headers)) to headings, but neither of these approches work for adding anchors that are not stripped out of email.

So this extension renders from this...

```md
# My Heading
```

...to this:

```html
<h1 id="My%20Heading">
  <a name="My%20Heading" class="markdown-it-headinganchor" href="#"></a>
  My Heading
</h1>
```

The anchor `name` is the output of `encodeURIComponent(original_heading_text)`.

Much like other markdown-it plugins, the usage is:

```js
var md = require('markdown-it')();
md.use(require('markdown-it-headinganchor'), {
  anchorClass: 'my-class-name', // default: 'markdown-it-headinganchor'
  addHeadingID: true,           // default: true
  addHeadingAnchor: true        // default: true
});
md.render('# My Heading');
```

Originally developed for use with [Markdown Here](https://github.com/adam-p/markdown-here).
