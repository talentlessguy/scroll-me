import { createServer } from 'http'
import serve from 'serve-handler'

createServer((req, res) => {
  serve(req, res, {
    directoryListing: false,
    rewrites: [
      {
        source: '/',
        destination: '/intro/index.html',
      },
      {
        source: '/app.js',
        destination: '/intro/app.js',
      },
      {
        source: '/style.css',
        destination: '/intro/style.css',
      },
      {
        source: '/:level',
        destination: '/:level/index.html',
      },
    ],
  })
}).listen(3000, () => console.log(`Started on http://localhost:3000`))
