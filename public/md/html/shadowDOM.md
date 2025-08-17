## Shadow DOM（影子DOM）

Shadow DOM（影子DOM）是Web Components技术的核心组成部分，用于创建**封装的DOM子树**，实现组件内部结构、样式和行为的隔离，避免与外部文档冲突。

### 核心概念

#### 作用域隔离

Shadow DOM 创建一个独立的DOM树（称为Shadow Tree），附加到普通DOM元素（称为Shadow Host）上。

Shadow Tree内部的**样式、脚本和事件**默认与外部DOM隔离，外部样式不影响内部，内部样式也不泄漏到外部

#### 封装性

外部JavaScript无法直接访问Shadow Tree内部的节点（除非使用特定API），但可通过`shadowRoot`属性访问（仅在`mode: 'open'`模式下）



#### 关键特性

- Shadow DOM内部的CSS选择器**仅作用于内部元素**，外部样式无法覆盖内部
- 事件在Shadow DOM内部触发后，会冒泡到Shadow Host，再传播到外部DOM
- 通过`<slot>`元素将外部内容投影到Shadow DOM内部

```html
<!-- 宿主元素 -->
<custom-button>
  <span slot="icon">🌟</span> Click Me!
</custom-button>

<!-- Shadow DOM模板 -->
<template>
  <button>
    <slot name="icon"></slot>
    <slot></slot> <!-- 默认插槽 -->
  </button>
</template>
```







### 结构

- Shadow Host：承载Shadow DOM的普通DOM元素（如`<div>`）。
- Shadow Root：Shadow Tree的根节点，通过attachShadow()方法创建。
- Shadow Boundary：隔离Shadow Tree与外部DOM的虚拟边界。
- Light DOM：指传统的、未封装的DOM结构，与Shadow DOM形成对比



### 创建方式

```js
// 1. 选择宿主元素
const hostElement = document.createElement('div');
// 2. 附加Shadow Root（模式：open或closed）
const shadowRoot = hostElement.attachShadow({ mode: 'open' });
// 3. 向Shadow DOM中添加内容
shadowRoot.innerHTML = `
  <style>
    p { color: blue; } /* 仅内部生效 */
  </style>
  <p>Hello, Shadow DOM!</p>
`;
// 4. 将宿主元素加入文档
document.body.appendChild(hostElement);
```

- mode: 'open'：允许通过hostElement.shadowRoot访问内部节点。
- mode: 'closed'：禁止外部访问Shadow Root，增强封装性



































































