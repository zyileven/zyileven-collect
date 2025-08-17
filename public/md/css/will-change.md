## CSS属性：will-change

`will-change`是 CSS 中用于优化渲染性能的关键属性，它通过提前告知浏览器元素即将发生的变化（如动画、滚动、变换等），触发浏览器的预优化机制（如创建独立合成层、启用 GPU 加速），从而提升复杂动画的流畅性。



```css
.element {
  will-change: transform, opacity; /* 指定多个属性 */
  will-change: scroll-position;    /* 滚动优化 */
  will-change: auto;               /* 默认值，浏览器自行优化 */
}
```



















































