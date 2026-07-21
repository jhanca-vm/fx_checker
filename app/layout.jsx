/**
 * @param {Object} props
 * @param {string} props.font - Font file path
 */
export default function Layout({ font }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>FX_CHECKER</title>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link
          rel="preload"
          href={font}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body className="bg-neutral-900 text-white scheme-dark">
        <div className="mx-auto max-w-275 px-4 sm:px-6 lg:px-8" id="root" />
      </body>
    </html>
  )
}
