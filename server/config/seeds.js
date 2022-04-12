const db = require("./connection");
const {
    Drink,
    Product,
} = require("../models");

db.once("open", async () => {
    await Product.deleteMany();
    await Drink.deleteMany();

    const drinks = await Drink.insertMany(
        [
            {
                name: "Cold Brew",
                image: "https://i.ibb.co/hBCBH8X/coldbrew.png"
            },
            {
                name: "Latte Macchiato",
                image: "https://i.ibb.co/t8R1Bz7/latte.png"
            },
            {
                name: "Chai Tea",
                image: "https://i.ibb.co/sKFN6b2/chaitea.png"
            }
        ]
    )

    const products = await Product.insertMany([{
            name: "J4J Coffee - 1 lbs",
            description: "1 pound of coffee.",
            price: 25.99,
            image: "https://i.ibb.co/Ct919m6/coffeebag-ccexpress.png",
            quantity: 500,
            inStock: true,
        },
        {
            name: "French Press",
            description: "Press away.",
            image: "https://i.ibb.co/QYRvznP/frenchpress-ccexpress.png",
            price: 134.99,
            quantity: 100,
            inStock: true,
        },
        {
            name: "J4J T-shirt Black",
            description: "J4J enthusiast T-Shirt in Black",
            image: "https://i.ibb.co/G5VNYVM/black-Shirt.png",
            price: 29.99,
            quantity: 100,
            inStock: true,
        },
        {
            name: "J4J T-shirt White",
            description: "J4J enthusiast T-Shirt in White",
            image: "https://i.ibb.co/KGPtZV6/white-Shirt.png",
            price: 29.99,
            quantity: 100,
            inStock: true,
        },
        {
            name: "Coffee Cannister",
            description: "Store your coffee",
            image: "https://i.ibb.co/HgG72HL/coffeecannister-ccexpress.png",
            price: 15.99,
            quantity: 1000,
            inStock: true,
        },
        {
            name: "Coffee Mug",
            description: "Store your coffee",
            image: "https://i.ibb.co/r783XzK/project-3-mug-ccexpress.png",
            price: 10.99,
            quantity: 1000,
            inStock: true,
        },
    ]);

    console.log("products seeded");

 

    process.exit();
});

