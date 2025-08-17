判断当前访问页面的网站是手机端还是 PC 端可以从屏幕尺寸和设备标识来判断：

### 判断屏幕尺寸

```js
if (window.innerWidth <= 768) {
  // 手机端代码
} else {
  // 电脑端代码
}
```

其中 `window.innerWidth` 表示当前窗口的宽度，单位是像素。

### 判断标识

除了屏幕尺寸，还可以通过判断浏览器的 User Agent 字符串来判断是否是手机端。不过需要注意的是，User Agent 字符串可以被伪造，因此此方法不是非常可靠。

```js
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // 手机端代码
} else {
  // 电脑端代码
}
```

其中 `navigator.userAgent` 表示当前浏览器的 User Agent 字符串。

### 综合判断

综合使用屏幕尺寸和标识，可以更可靠地判断是否是手机端。

```js
const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

if (isMobile) {
  // 手机端代码
} else {
  // 电脑端代码
}
```









