const http = require("http")

// console.log("Halo, kita akan belajar bagaimana cara membuar server menggunakan nodejs")

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */

const requestListener = (request, response) => {
    // const method = request.method

    // response.setHeader('Content-Type', 'text/html');
    // response.setHeader('X-Powered-By', 'NodeJS')
    // response.statusCode = 200;

    response.setHeader('Content-Type', 'application/json')
    response.setHeader('X-Powered-By', 'NodeJS')

    // response.write('<html>')
    // response.write('<body>')
    // response.write('<h1>Hello, World!</h1>')
    // response.write('</body>')
    // response.write('</html>')
    // response.end()
    // response.end('<html><body><h1>Hello, World!</h1></body></html>')

    const { url } = request
    const { method } = request

    if (url === "/") {
        // curl http://localhost:5000/

        if (method === "GET") {
            // response ketika GET
            response.statusCode = 200
            
            response.end(JSON.stringify({
                output: 'Ini adalah homepage',
            }))
        } else {
            response.statusCode = 405
            response.statusMessage = "Method not Allowed"

            response.end(JSON.stringify({
                output: `Halaman tidak dapat diakses dengan ${method} request`,
            }))
        }
    } else if (url === "/about") {
        // curl http://localhost:5000/about

        if (method === "GET") {
            // response ketika GET
            response.statusCode = 200

            response.end(JSON.stringify({
                output: 'Halo! Ini adalah halaman about'
            }))
        }

        if (method === "PUT") {
            response.statusCode = 200
            
            response.end(json.stringify({
                output: 'Dah diubah nih bang... Mau ngapain lagi?'
            }))
        }
    
        if (method === "DELETE") {
            response.statusCode = 200

            response.end(JSON.stringify({
                output: 'Yah bang... Dah kehapus loh!'
            }))
        }

        if (method === "POST") {
            // response ketika POST
            response.statusCode = 200
    
            let body = []
    
            request.on('data', (chunk) => {
                body.push(chunk)
            })
    
            request.on("end", () => {
                body = Buffer.concat(body).toString()
                const { name } = JSON.parse(body)
                response.end(JSON.stringify({
                    output: `Halo, ${name}! Ini adalah halaman about`
                }))
            })
        } else {
            response.statusCode = 405
            response.statusMessage = "Method not Allowed"

            response.end(JSON.stringify({
                output: `Halaman tidak dapat diakses dengan ${method} request`,
            }))
        }
    } else {
        response.statusCode = 404
        response.statusMessage = "Not Found"
        
        response.end(JSON.stringify({
            output: `Halaman ${url} tidak dapat ditemukan!`
        }))
    }

    // curl http://localhost:5000/<any>

    // if (method === "GET") {
    //     // response ketika GET
    //     response.end('<h1>Welcome Guys!</h1>')
    // }

    // if (method === "POST") {
    //     // response ketika POST
    //     response.end('<h2>Hayo... Mau ngapain?</h2>')
    // }

    // if (method === "PUT") {
    //     response.end('Dah diubah nih bang... Mau ngapain lagi?')
    // }

    // if (method === "DELETE") {
    //     response.end('Yah bang... Dah kehapus loh!')
    // }

    // Anda bisa mengevaluasi tipe method lainnya
    
    // response.setHeader('Content-Type', 'text/html')

    // response.statusCode = 200
    // response.end("<h1>Halo HTTP Server!</h1>")

    // if (method === "POST") {
    //     // response ketika POST

    //     let body = []

    //     request.on('data', (chunk) => {
    //         body.push(chunk)
    //     })

    //     request.on("end", () => {
    //         body = Buffer.concat(body).toString()
    //         const { name } = JSON.parse(body)
    //         response.end(`<h2>Hayo... Mau ngapain ${name}?</h2>`)
    //     })
    // }

    // let body = []

    // request.on('data', (chunk) => {
    //     body.push(chunk)
    // })

    // request.on("end", () => {
    //     body = Buffer.concat(body).toString()
    // })
}

const server = http.createServer(requestListener)

const port = 5000
const host = 'localhost'

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`)
})
