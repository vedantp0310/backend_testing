// this is a curd eplication

import express from 'express';

const app = express();

const port  = 3000

// app.get("/", (req, res) => {
//     res.send('Hello World wenubu vberui')
// })
// app.get("/ice", (req, res) => {
//     res.send('Hello World wenubu vberui')
// })
 
// most commen one frontend data in backend

app.use(express.json());

let teaData = []
let nextId = 1

// one tea show in object
app.post('/teas', (req, res) => {
    const {name, price} = req.body
    const newteas = {id: nextId++, name: name, price: price}
    teaData.push(newteas)
    res.status(201).send(newteas)
})
 // show all the tea in array format
app.get('/teas', (req,res) => {
    res.status(200).send(teaData)
})

// get the tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(tea => tea.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send("Not Found")
    }else{
        res.status(200).send(tea)
    }
  
})

// update the tea with id (business logic)

app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(tea => tea.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send("Not Found")
    }
    const {newname,newprice} = req.body
    tea.name = newname
    tea.price = newprice
    res.status(200).send(tea)
})

// / delete the tea with id
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(tea => tea.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("Not Found")
    }
    teaData.splice(index, 1)
    return res.status(204).send('Teas deleted')
})


app.listen(port, () => {
 console.log(`listening on port:${port}.....`)
})