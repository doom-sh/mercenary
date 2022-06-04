# Mercenary

```bash
yarn add @doom-sh/mercenary
```

Mercenary is a markdown rendering component.

I purposefully chose to step away from the remark-rehype ecosystem because each plugin espouses the author's own opinions for how Markdown should be extended. This can be difficult to keep consistent, and hard to migrate the source markdown when a plugin becomes obsolete/replaced with another. For example, differing conventions for adding metadata to codeblocks is quite difficult to keep changing around.

Mercenary expects GFM-flavored markdown and nothing else. All customizations are made with passing custom components. For anything fancy, markdown code blocks can be abused with metadata and be used to render other stuff.

Mercenary abstracts over the popular `react-markdown` package.
