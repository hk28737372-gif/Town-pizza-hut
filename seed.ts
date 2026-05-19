import { app, db } from "./src/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

async function seed() {
  const branches = [
    {
      id: "branch-1",
      name: "Township Chowk Branch",
      location: "Kabal Road Township Chowk Naimat Plaza, Swat",
      numbers: ["0318-9659090", "0344-9659090", "0346-9659090"]
    },
    {
      id: "branch-3",
      name: "Sersanai Chowk Branch",
      location: "Main Sersanai Chowk 2nd Floor Deolai Road, Swat",
      numbers: ["0319-9629090", "0346-9629090", "0347-9629090", "0314-3079593"]
    },
    {
      id: "branch-5",
      name: "Khwaza Khela Chowk Branch",
      location: "Bagh Dherai Road, Khwaza Khela Chowk, Khirabad, Near Wakeel Shopping Center, Swat",
      numbers: ["0340-9659090", "0341-9619090"]
    }
  ];

  try {
    for (const b of branches) {
      console.log('Seeding branch:', b.id);
      await setDoc(doc(db, "branches", b.id), {
        ...b,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    }
  } catch (err) {
    console.error("Error setting branch", err);
    process.exit(1);
  }

  const categories = [
    { id: "cat-burgers", name: "Burgers", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800" },
    { id: "cat-chicken", name: "Fried Chicken & Wings", imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800" },
    { id: "cat-shawarma", name: "Shawarma & Rolls", imageUrl: "https://images.unsplash.com/photo-1643950454371-bd4ab0611c03?auto=format&fit=crop&q=80&w=800" },
    { id: "cat-pizza", name: "Signature Pizza", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" }
  ];

  for (const c of categories) {
    console.log('Seeding category:', c.id);
    await setDoc(doc(db, "categories", c.id), {
      ...c,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  // Adding the specified products matching the images user wanted separate
  const products = [
    // Burgers
    { id: "burger-zinger", categoryId: "cat-burgers", name: "Zinger Burger", price: 400, imageUrl: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?auto=format&fit=crop&q=80&w=800", description: "Crispy fried chicken breast with special town sauce" },
    { id: "burger-cheese", categoryId: "cat-burgers", name: "Cheese Burger", price: 450, imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800", description: "Juicy beef patty with double cheddar cheese" },
    { id: "burger-chicken", categoryId: "cat-burgers", name: "Chicken Burger", price: 350, imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&q=80&w=800", description: "Grilled chicken with healthy greens" },
    { id: "burger-american", categoryId: "cat-burgers", name: "American Burger", price: 500, imageUrl: "https://images.unsplash.com/photo-1594212691516-0155b9e28dc1?auto=format&fit=crop&q=80&w=800", description: "Classic American style burger with bacon & cheese" },
    { id: "burger-tikka", categoryId: "cat-burgers", name: "Tikka Burger", price: 420, imageUrl: "https://images.unsplash.com/photo-1586816001966-79b73602d534?auto=format&fit=crop&q=80&w=800", description: "Spicy BBQ tikka flavor with special sauce" },
    { id: "burger-tower", categoryId: "cat-burgers", name: "Tower Burger", price: 650, imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800", description: "Extra tall burger with hash brown and double chicken" },
    { id: "burger-double", categoryId: "cat-burgers", name: "Double Decker Burger", price: 600, imageUrl: "https://images.unsplash.com/photo-1541364983171-ec5def0bebd4?auto=format&fit=crop&q=80&w=800", description: "Two massive patties for extreme hunger" },
    { id: "burger-special", categoryId: "cat-burgers", name: "Town Special Pizza Burger", price: 700, imageUrl: "https://images.unsplash.com/photo-1572802419224-296b0aeee0db?auto=format&fit=crop&q=80&w=800", description: "The ultimate combination of pizza toppings and burger" },
    
    // Fried Chicken & Wings
    { id: "chicken-leg", categoryId: "cat-chicken", name: "1 Piece Leg", price: 180, imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800", description: "Crispy fried chicken leg piece" },
    { id: "chicken-thai", categoryId: "cat-chicken", name: "1 Piece Thai", price: 200, imageUrl: "https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&q=80&w=800", description: "Spicy Thai style fried chicken" },
    { id: "chicken-half-broast", categoryId: "cat-chicken", name: "4 Piece Half Broast", price: 700, imageUrl: "https://images.unsplash.com/photo-1589301773112-04ce1b1a78ee?auto=format&fit=crop&q=80&w=800", description: "4 pieces of perfectly golden crispy fried chicken" },
    { id: "chicken-full-broast", categoryId: "cat-chicken", name: "8 Piece Full Broast", price: 1350, imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", description: "8 pieces of our signature fried chicken with sauces" },
    { id: "chicken-hot-wings-5", categoryId: "cat-chicken", name: "5 Piece Hot Wings", price: 400, imageUrl: "https://images.unsplash.com/photo-1608039806443-41e9ac1168f2?auto=format&fit=crop&q=80&w=800", description: "Spicy and tangy fried wings" },
    { id: "chicken-hot-wings-10", categoryId: "cat-chicken", name: "10 Piece Hot Wings", price: 750, imageUrl: "https://images.unsplash.com/photo-1524114664604-0e586c071d50?auto=format&fit=crop&q=80&w=800", description: "Spicy and tangy fried hot wings" },
    { id: "chicken-nuggets", categoryId: "cat-chicken", name: "10 Piece Nuggets", price: 450, imageUrl: "https://images.unsplash.com/photo-1562967914-01efa7e87832?auto=format&fit=crop&q=80&w=800", description: "Crispy golden chicken nuggets" },
    { id: "chicken-bbq-wings", categoryId: "cat-chicken", name: "10 Piece BBQ Wings", price: 800, imageUrl: "https://images.unsplash.com/photo-1614398751058-eb2e5bbfcdd4?auto=format&fit=crop&q=80&w=800", description: "Smoky sweet BBQ glazed wings" },
    { id: "chicken-buffalo-wings", categoryId: "cat-chicken", name: "10 Piece Buffalo Wings", price: 800, imageUrl: "https://images.unsplash.com/photo-1574768310931-7e04f05baaea?auto=format&fit=crop&q=80&w=800", description: "Classic spicy buffalo style wings" },
    
    // Shawarma & Rolls
    { id: "shawarma-chicken", categoryId: "cat-shawarma", name: "Chicken Shawarma", price: 200, imageUrl: "https://images.unsplash.com/photo-1633504581786-316f0ce3a88a?auto=format&fit=crop&q=80&w=800", description: "Classic chicken shawarma with garlic sauce" },
    { id: "shawarma-chicken-cheese", categoryId: "cat-shawarma", name: "Chicken Cheese Shawarma", price: 250, imageUrl: "https://images.unsplash.com/photo-1654247547190-6718cd92b236?auto=format&fit=crop&q=80&w=800", description: "Extra cheesy chicken shawarma" },
    { id: "shawarma-veg", categoryId: "cat-shawarma", name: "Vegetarian Shawarma", price: 150, imageUrl: "https://images.unsplash.com/photo-1599351051515-5606130eb5a5?auto=format&fit=crop&q=80&w=800", description: "Healthy fresh vegetable mix wrapped in pita" },
    { id: "shawarma-zinger", categoryId: "cat-shawarma", name: "Zinger Shawarma", price: 280, imageUrl: "https://images.unsplash.com/photo-1616688537500-111d4d8ccb8b?auto=format&fit=crop&q=80&w=800", description: "Crispy zinger chicken wrapped in pita bread" },
    { id: "roll-pratha", categoryId: "cat-shawarma", name: "Pratha Roll", price: 200, imageUrl: "https://images.unsplash.com/photo-1454554162055-6671239c9413?auto=format&fit=crop&q=80&w=800", description: "Traditional spicy chicken rolled in a crispy pratha" },
    { id: "roll-zinger-pratha", categoryId: "cat-shawarma", name: "Zinger Pratha Roll", price: 280, imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800", description: "Crispy zinger wrapped in a deep fried pratha" },
    
    // Pizza
    { 
      id: "pizza-town", categoryId: "cat-pizza", name: "Town Pizza", price: 500, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", description: "Our supreme signature pizza loaded with toppings",
      sizes: [
        {name: "Small", price: 500},
        {name: "Medium", price: 900},
        {name: "Large", price: 1400},
        {name: "Family Size", price: 1800}
      ]
    }
  ];

  for (const p of products) {
    await setDoc(doc(db, "products", p.id), {
      ...p,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  const deals = [
    {id: "deal-1", title: "Deal 1", price: 1200, items: ["2 Zinger Burgers", "1 Medium Fries", "1 Cold Drink"], imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800"},
    {id: "deal-2", title: "Deal 2", price: 1600, items: ["2 Chicken Burgers", "1 Medium Fries", "1 Cold Drink"], imageUrl: "https://images.unsplash.com/photo-1615715243176-79cfab17b7a1?auto=format&fit=crop&q=80&w=800"},
    {id: "deal-3", title: "Deal 3", price: 1900, items: ["3 Zinger Burgers", "1 Medium Fries", "1 Cold Drink"], imageUrl: "https://images.unsplash.com/photo-1594212691516-0155b9e28dc1?auto=format&fit=crop&q=80&w=800"},
    {id: "deal-4", title: "Deal 4", price: 1740, items: ["2 Zinger Burgers", "2 Chicken Pieces", "1 Medium Fries", "1 Cold Drink"], imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800"},
    {id: "deal-5", title: "Deal 5", price: 2100, items: ["3 Zinger Burgers", "10 Hot Wings", "1 Medium Fries", "1 Cold Drink"], imageUrl: "https://images.unsplash.com/photo-1608039806443-41e9ac1168f2?auto=format&fit=crop&q=80&w=800"},
    {id: "deal-6", title: "Deal 6", price: 2000, items: ["2 Double Decker Burgers", "1 Medium Fries", "1 Litre Drink"], imageUrl: "https://images.unsplash.com/photo-1541364983171-ec5def0bebd4?auto=format&fit=crop&q=80&w=800"},
    {id: "deal-7", title: "Deal 7", price: 2760, items: ["8 Chicken Pieces", "1 Large Fries", "1.5 Litre Drink"], imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800"},
    {id: "deal-8", title: "Deal 8", price: 5500, items: ["6 Zinger Burgers", "6 Chicken Pieces", "10 Hot Wings", "2 Large Fries", "2 Drinks"], imageUrl: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?auto=format&fit=crop&q=80&w=800"},
    {id: "deal-9", title: "Deal 9", price: 5800, items: ["8 Chicken Burgers", "8 Chicken Pieces", "2 Large Fries", "2 Drinks"], imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800"}
  ];

  for (const d of deals) {
    await setDoc(doc(db, "deals", d.id), {
      ...d,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(console.error);
