const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const slugify = require("slugify");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

dotenv.config();

//middleware
app.use(cors());
app.use(express.json());


// routes
app.get("/", (req, res) => {
  res.send("Hello...");
});

// Get all items
app.get("/items", async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
  }
});

//Create new item
app.post("/items", async (req, res) => {
    try {
      const newItem = await prisma.item.create({
        data: req.body,
      });
  
      res.status(201).json(newItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

// Update an existing item
app.put("/items/:id", async (req, res) => {
    try {
      // Update the item
      const updatedItem = await prisma.item.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });
  
      res.status(200).json(updatedItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

// Delete item
app.delete("/items/:id", async (req, res) => {
  try {
    await prisma.item.delete({ where: { id: req.params.id } });
    res.status(200).json("Item has been deleted.");
  } catch (error) {
    console.log(error);
  }
});


app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`);
})