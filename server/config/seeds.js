const db = require("./connection");
const {
    User,
    Product,
} = require("../models");

db.once("open", async () => {
    //   await Cart.deleteMany();

    //   const cart = await Cart.insertMany([
    //     { name: 'Food' },
    //     { name: 'Household Supplies' },
    //     { name: 'Electronics' },
    //     { name: 'Books' },
    //     { name: 'Toys' }
    //   ]);

    //   console.log('categories seeded');

    await Product.deleteMany();

    const products = await Product.insertMany([{
            name: "J4J Coffee - 1 lbs",
            description: "1 pound of coffee.",
            price: 26.00,
            image: "client\public\logo192.png",
            quantity: 500,
            inStock: true,
        },
        {
            name: "Canned Coffee",
            description: "Drinking coffee from a can sucks.",
            image: "client\public\logo192.png",
            price: 1.99,
            quantity: 500,
            inStock: true,
        },

        {
            name: "French Press",
            description: "Press away.",
            image: "client\public\logo192.png",
            price: 14.99,
            quantity: 100,
            inStock: true,
        },
        {
            name: "J4J Sweatshirt",
            description: "I'm a sweatshirt, I'm also a sweetshirt.",
            image: "client\public\logo192.png",
            price: 9.99,
            quantity: 100,
            inStock: true,
        },
        {
            name: "Coffee Cannister",
            description: "Store your coffee",
            image: "client\public\logo192.png",
            price: 1.99,
            quantity: 1000,
            inStock: true,
        },



    ]);

    console.log("products seeded");

 

    process.exit();
});

