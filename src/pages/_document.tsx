import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://rsms.me/inter/inter.css"
            key="inter-font"
          />
          <link href="//fonts.googleapis.com/css?family=Montserrat:thin,extra-light,light,100,200,300,400,500,600,700,800" />
        </Head>
        <body className="text-GrayScale">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
