const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
require('dotenv').config()
const stripe = require('stripe')
const jwt = require('jsonwebtoken');

// middleware
app.use(cors())
app.use(express.static("public"))
app.use(express.json())

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'Unauthorize Access' })
  }
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (error, decoded) => {
    if (error) {
      console.log(error)
      return res.send({ error: true, message: 'Unauthorize Access' })
    }
    req.decoded = decoded;
    next()
  })
}
// uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zmpua4z.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // awaitclient.connect();

    // db and Collection
    const userCollection = client.db('BookMart').collection('users')
    const booksCollection = client.db('BookMart').collection('books')
    const selectedBookCollection = client.db('BookMart').collection('selectedBook')
    const purchedBookCollection = client.db('BookMart').collection('purchedBook')
    const paymentCollection = client.db('BookMart').collection('payment')

    // JWT
    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1h' })
      res.send({ token })
    })


    //books api
    app.post('/all-books', async (req, res) => {
      const books = req.body
      const result = await booksCollection.insertOne(books)
      res.send(result)
    })
    app.post('/selected-book', async (req, res) => {
      const selectedBook = req.body;
      const result = await selectedBookCollection.insertOne(selectedBook)
      res.send(result)
    })
    app.get('/selected-books', verifyJWT, async (req, res) => {
      const email = req.query.email;
      const query = { buyerEmail: email }
      const result = await selectedBookCollection.find(query).toArray()
      res.send(result)
    })
    app.get('/selected-book/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await selectedBookCollection.findOne(query)
      res.send(result)
    })
    app.delete('/selected-book/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await selectedBookCollection.deleteOne(query)
      res.send(result)
    })
    app.get('/approved-all-books', async (req, res) => {
      const query = { status: 'Approved' } //only shows the approved classes
      const result = await booksCollection.find(query).toArray()
      res.send(result)
    })
    app.get('/all-books',verifyJWT,  async (req, res) => {
      const result = await booksCollection.find().sort({date : -1}).toArray()
      res.send(result)
  })
    app.get('/all-books/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { sellerEmail: email }
      const result = await booksCollection.find(query).toArray()
      res.send(result)
    })
    app.put('/all-books/:id', async (req, res) => {
      const id = req.params.id;
      const status = req.query.status;
      const feedback = req.query.feedback;
      if (status == 'approved') {
        const query = { _id: new ObjectId(id) }
        const updatedDoc = {
          $set: {
            status: 'Approved'
          }
        }
        const result = await booksCollection.updateOne(query, updatedDoc)
        res.send(result)
      }
      if (status == 'denied') {
        const query = { _id: new ObjectId(id) }
        const updatedDoc = {
          $set: {
            status: 'Denied'
          }
        }
        const result = await booksCollection.updateOne(query, updatedDoc)
        res.send(result)
      }
      if (feedback) {
        const query = { _id: new ObjectId(id) }
        const updatedDoc = {
          $set: {
            feedback: feedback
          }
        }
        const result = await booksCollection.updateOne(query, updatedDoc)
        res.send(result)
      }
    })
    app.get('/popular-books', async (req, res) => {
      const query = { status: 'Approved' }
      const result = await booksCollection.find(query).sort({ enrolledStudents: -1 }).toArray()
      res.send(result)
    })
    app.get('/enrolled-books/:email', verifyJWT, async (req, res) => {
      const email = req.params.email
      const query = { buyer: email }
      const result = await purchedBookCollection.find(query).toArray()
      res.send(result)
    })

    //users api
    app.post('/all-users', async (req, res) => {
      const user = req.body;
      const query = { email: user?.email }
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({})
      }
      const result = await userCollection.insertOne(user)
      res.send(result)
    })
    app.get('/user/admin/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email: email, role: 'admin' }
      console.log(email)
      const admin = await userCollection.findOne(query)
      res.send(admin)
    })
    app.get('/user/seller/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email: email, role: 'seller' }
      const seller = await userCollection.findOne(query)
      res.send(seller)
    })
    app.get('/user/buyer/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email: email, role: 'buyer' }
      const buyer = await userCollection.findOne(query)
      res.send(buyer)
    })
    app.get('/current-user', async (req, res) => {
      const email = req.query.email;
      const query = { email: email }
      const result = await userCollection.findOne(query)
      res.send(result)
    })
    app.get('/all-users', verifyJWT, async (req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })
    app.get('/all-sellers', async (req, res) => {
      const query = { role: 'seller' }
      const result = await userCollection.find(query).toArray()
      res.send(result)
    })
    app.put('/all-users/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const role = req.query.role;
      const query = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          role: role
        }
      }
      const result = await userCollection.updateOne(query, updatedDoc)
      res.send(result)
    })
    
    app.get('/popular-seller', async (req, res) => {
      const query = { role: 'seller' }
      const result = await userCollection.find(query).toArray()
      res.send(result)
    })

     //payment api
   
     app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = Math.round(price * 100);
      const stripeClient = stripe(process.env.STRIPE_KEY);
      try {
          // Create a PaymentIntent with the order amount and currency
          const paymentIntent = await stripeClient.paymentIntents.create({
              amount: amount,
              currency: "usd",
              automatic_payment_methods: {
                  enabled: true,
              },
          });

          res.send({
              clientSecret: paymentIntent.client_secret,
          });
      } catch (error) {
          console.log(error);
          res.status(500).send({ error: "An error occurred while creating the PaymentIntent." });
      }
  });
  app.post('/payment',verifyJWT, async (req, res) => {
      const payment = req.body;
      const insertResult = await paymentCollection.insertOne(payment);

      const purchedQuery = { buyerEmail: payment.email, bookId: payment.bookId }
      const purchedBook =  await selectedBookCollection.findOne(purchedQuery)
      const purchedInsertResult = await purchedBookCollection.insertOne(purchedBook)

      const purchedDeleteResult = await selectedBookCollection.deleteOne(purchedQuery)

      const booksQuery = { _id: new ObjectId(payment.bookId) };
      const booksDocument = await booksCollection.findOne(classQuery); // Fetch the latest document

      if (booksDocument && booksDocument.seats > 0) {
          const updatedSeats = booksDocument.seats - 1;
          const updatePurchedStudents = booksDocument.purchedStudents + 1;
          const updateResult = await booksCollection.updateOne(
              booksQuery,
              { $set: { seats: updatedSeats, purchedStudents : updatePurchedStudents } }
          );

          res.send({ insertResult, updateResult, purchedDeleteResult, purchedInsertResult });
      }
  });
  app.get('/payment-history',verifyJWT, async (req, res) => {
      const email = req.query.email;
      const query = {email : email}
      const result = await paymentCollection.find(query).sort({date : -1}).toArray()
      res.send(result)
  })

    // -----END-----

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Bookmart listening...')
})

// Start the server
app.listen(port, () => {
  console.log(`Server listening by me at port ${port}`);
});