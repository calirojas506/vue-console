# vue-console
Basic JavaScript Console for Mobile Devices, as a Vue.js component.

![](/images/vue-console-01.jpg)

## What is vue-console?
**vue-console** is a very basic JavaScript console for mobile devices. It means, you'll be able to execute JavaScript code directly in your mobile browser and get error messages generated at run-time.

This is a (global) component created using Vue.js, so you need Vue.js in order to use it. Also, the tiny "UI" uses Bootstrap, but it's included in the CSS file. Don't worry, it's namespaced so won't affect your styles.

**vue-console** overrides some methods (log, error, warn, clear & info) part of the **console** object and uses **eval** to run the code entered by the user. Don't get mad.

## How to use vue-console?
Simple. Add it to your page using a script tag, add the CSS file and, finally, place the &lt;vue-console/&gt; component inside your code.

```html
<!-- add vue-console -->
<script src="js/vue-console.js"></script>
```
The script should be added before creating the instance. Remember this is a global component. So that's the Vue.js way.

```html
<link rel="stylesheet" href="css/vue-console.css">
```
This file basically contains a copy of Bootstrap namespaced and a couple of styles related to the UI.

```html
<div id="app">
  <!-- add the component to your view -->
  <vue-console :is-visible="true"/>
</div>
```
By default, the **is-visible** prop equals to **true**. It's optional.

## Important
Use **vue-console** only in development mode. Do not forget to remove the script and style files before sending to production.

This script is intended only for browsers, running on Mobile Devices, that lacks of JavaScript console.

## Stay In Touch

- [Twitter](https://twitter.com/calirojas506)
- [Facebook](https://www.facebook.com/calirojas506)
- [LinkedIn](https://www.linkedin.com/in/cali-rojas-17403334/)
- [YouTube](https://youtube.com/calirojas506)


## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017, Cali Rojas