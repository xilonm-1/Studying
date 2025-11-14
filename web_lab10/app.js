const express = require('express');
const path = require('path')
const port = 3030
const app = express();

const router = express.Router();
app.use(router)

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    console.log("Request at " + req.url);
    res.send('Hello World! in plain text')
})

router.get('/signin', (req, res) => {
    console.log("Request at " + req.url);
    console.log('Retrieve a form')
    res.sendFile(path.join(`${__dirname}/sign-in.html`))
})

router.post('/form-submit', (req, res) => {
    console.log(req.body);
    const email = req.body.emaill;
    const password = req.body.pass;
    console.log("Request at " + req.url);
    console.log("Form submitted by " + email + " at " + Date.now());
    res.redirect('/member');
})

router.get("/member", function (req, res) {
    console.log("Request at " + req.url);
    res.sendFile(path.join(`${__dirname}/success.html`))
});

router.use((req, res) => {
    console.log("404: Invalid accessed");
    res.sendFile(path.join(`${__dirname}/error.html`))
})

app.listen(port, () => {console.log(`Server listening on port: ${port}`)})

