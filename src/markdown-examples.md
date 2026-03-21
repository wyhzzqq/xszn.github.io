# Markdown Extension Examples

![](https://xszn.org/images/ogp.webp)

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

**Tree**

```
+ .vitepress
  + config
    + head.js
    + nav.js
    + sidebar.js
    + social.js
    + theme.js
  + theme
    + components
      + Ads.vue
      + index.ts
    + plugins
      + index.js
      + medium-zoom.js
    + custom.css
    + index.js
    + Layout.vue
    + style.css
  + config.mjs
+ src
  + public
    + images
    + .nojekyll
    + CNAME
    + favicon.ico
    + robots.txt
  + index.md
+ .gitignore
+ package.json
+ postcss.config.mjs
+ README.md
```

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
