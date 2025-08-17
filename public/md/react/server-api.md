## 服务器 API

### renderToString

将 React 树渲染为 HTML 字符串。

#### 语法

```js
const html = renderToString(reactNode, options?)
```

#### 使用

在服务器上，调用 `renderToString` 将你的应用渲染为 HTML。

```jsx
import { renderToString } from 'react-dom/server';

const html = renderToString(<App />);
```

将其随服务器响应发送

```js
import { renderToString } from 'react-dom/server';

app.use('/', (request, response) => {
  const html = renderToString(<App />);
  response.send(html);
});
```

> 这将生成您的 React 组件的初始非交互式 HTML 输出。在客户端，您需要调用 hydrateRoot 来激活该服务器生成的 HTML，使其变为可交互状态。



### renderToPipeableStream

将 React 树渲染到可管道化的 Node.js 流

```js
const { pipe, abort } = renderToPipeableStream(reactNode, options?)
```

使用

```js
import { renderToPipeableStream } from 'react-dom/server';

const { pipe, abort } = renderToPipeableStream(<App />, {
  bootstrapScripts: ['/main.js'],
  onShellReady() {
    response.setHeader('content-type', 'text/html');
    pipe(response);
  }
});
```

pipe：将 HTML 输出到提供的 Node.js 可写流 

abort：允许你[中止服务器渲染 ](https://react.dev/reference/react-dom/server/renderToPipeableStream#aborting-server-rendering)，并在客户端渲染剩余部分

bootstrapScripts：一个字符串 URL 数组，用于在页面上发出 `<script>` 标签。使用它来包含调用 [`hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot) 的 `<script>`。

```html
<!DOCTYPE html>
<html>
  <!-- ... HTML from your components ... -->
</html>
<script src="/main.js" async=""></script>
```

在客户端，您的启动脚本应该通过调用 `hydrateRoot` 来 [ 为整个 `document` 进行水合 ](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-an-entire-document)：

```jsx
import { hydrateRoot } from 'react-dom/client';
import App from './App.js';

hydrateRoot(document, <App />);
```

这将向服务器生成的 HTML 附加事件监听器，使其变得可交互。

#### 如何使用流式传输？

```jsx
function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileCover />
      <Sidebar>
        <Friends />
        <Photos />
      </Sidebar>
      <Suspense fallback={<PostsGlimmer />}>
        <Posts />
      </Suspense>
    </ProfileLayout>
  );
}
```

这告诉 React 在 `Posts` 加载数据之前开始流式传输 HTML。React 会先发送加载备用内容的 HTML（`PostsGlimmer`），然后，当 `Posts` 完成数据加载后，React 会发送剩余的 HTML，并附带一个内联的 `<script>` 标签，该标签用 HTML 替换加载备用内容。从用户的角度来看，页面会先显示 `PostsGlimmer`，随后被 `Posts` 替换。























































