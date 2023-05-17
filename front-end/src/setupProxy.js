// 실제 배포시에는 사용되지 않을 것 같습니다.

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/members", {
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/boards", {
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/comments", {
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/applys", {
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/chats", {
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/images", {
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  );
};
