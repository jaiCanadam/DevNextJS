import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="theme-color" content="#ffffff" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <script
            src="https://kit.fontawesome.com/7254f451cd.js"
            crossorigin="anonymous"
          ></script>

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          />
          <link rel="stylesheet" href="/static/css/styles.css" />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.4/quill.snow.min.css"
          />
          <script
            src=" https://cdnjs.cloudflare.com/ajax/libs/react-quill/0.4.1/react-quill.min.js"
            crossorigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
