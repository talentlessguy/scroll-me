import { createServer } from 'http'
import serve from 'serve-handler'

createServer((req, res) => {
  serve(req, res, {
    directoryListing: false,
    cleanUrls: true,
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
        source: '/global.js',
        destination: '/intro/global.js',
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
