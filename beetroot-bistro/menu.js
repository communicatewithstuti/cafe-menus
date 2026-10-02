/*
  Menu data. Each item:
    n: name, p: price (or [a, b] for two columns), d: description
    t: "v" veg, "nv" non-veg, "e" contains egg (shown as non-veg)
    g: 1 gluten-free, fav: 1 Beetroot favourite
    vars: [[label, price, type], ...] for dishes sold in versions (paneer / chicken)
  Section fields: id, title, script (the script word), note, addons, cols, art, sub (sub-headings)
  GLUTEN-FREE MARKS ARE DRAFTS. Confirm with the owner before this goes live.
*/
const FOOD = [
  { id: "salads", nav: "Salads", title: "Salad", script: "days", addons: ["Paneer +80", "Chicken +100"], items: [
    { n: "House Caesar", p: 280, t: "v", d: "Lettuce, croutons and parmesan in mayo dressing." },
    { n: "Quinoa Watermelon Feta Salad", p: 360, t: "v", g: 1, d: "Watermelon, apple, cashew nuts, bell pepper, cucumber, feta and quinoa with balsamic glaze." },
    { n: "Edamame Quinoa Salad", p: 380, t: "v", d: "Cucumber, coleslaw mix, edamame, peanuts, quinoa and sesame in Asian dressing." },
    { n: "Greek Style Avo Salad", g: 1, d: "Bell pepper, avocado, cucumber, cherry tomato and lettuce in lemon vinaigrette.", vars: [["Grilled Paneer", 360, "v"], ["Grilled Chicken", 390, "nv"]] },
    { n: "Mexican Crunch", g: 1, d: "Avocado, beans, corn, edamame, onion and cherry tomato in chipotle dressing.", vars: [["Paneer", 360, "v"], ["Chicken", 390, "nv"]] },
  ]},
  { id: "platter", nav: "Protein platter", title: "Protein", script: "power", titleAfter: "Platter", items: [
    { n: "Protein Platter", d: "Avocado salad, veg quinoa, edamame, falafel and hummus.", vars: [["Grilled Paneer", 630, "v"], ["Grilled Chicken", 650, "nv"]] },
  ]},
  { id: "eggs", nav: "Eggs", noEggTag: 1, title: "Eggs,", script: "actually", note: "Served with salad and garlic bread.", addons: ["Sourdough +50", "Cheese +50"], items: [
    { n: "Sunny Side Up, Turkish Style", p: 320, t: "e", d: "Fried eggs with garlicky Greek yoghurt, chilli butter and fresh herbs." },
    { n: "Parsi Egg Akuri", p: 300, t: "e", d: "Soft-scrambled eggs with onions, tomatoes, chillies and spices." },
    { n: "Tornado Eggs", p: 280, t: "e", d: "Fluffy scrambled eggs with a delicate swirl, served on sourdough." },
    { sub: "Stuffed Omelette", subNote: "Omelette with your choice of filling." },
    { n: "Farmhouse", p: 320, t: "e" },
    { n: "Mushroom & Spinach", p: 310, t: "e" },
    { n: "Chicken & Cheese", p: 360, t: "nv" },
    { sub: "Simple Eggs, Your Way", subNote: "Sunny side up, fried, scrambled or omelette." },
    { n: "Plain", p: 250, t: "e" },
    { n: "Masala", p: 300, t: "e" },
  ]},
  { id: "toasts", nav: "Avocado toasts", title: "Avocado", script: "open", titleAfter: "Toasts", note: "Served on toasted sourdough, with salad.", items: [
    { n: "Caprese Avo Toast", p: 390, t: "v", d: "Guacamole, cherry tomato, basil and fresh mozzarella with balsamic glaze." },
    { n: "Avocado Hummus Toast", p: 380, t: "v", d: "Creamy hummus layered with sliced avocado and a drizzle of olive oil." },
    { n: "Guac & Egg", p: 370, t: "e", d: "Guacamole topped with a fried egg and chilli oil." },
    { n: "Spicy Chicken Avocado Toast", p: 450, t: "nv", d: "Guacamole layered with spicy chicken chunks." },
  ]},
  { id: "favourites", nav: "Bistro favourites", title: "Bistro", script: "favourites", art: { src: "art/couple.png", alt: "Pen sketch of two friends talking at a rooftop table", kind: "ink" }, items: [
    { n: "Jalapeño Cheese Poppers", p: 300, t: "v" },
    { n: "Hummus & Pita", p: 320, t: "v" },
    { n: "Falafel Platter", p: 400, t: "v" },
    { n: "Honey Chilli Potato", p: 330, t: "v" },
    { n: "Hummus Chicken", p: 420, t: "nv" },
    { n: "Chicken Popcorn", p: 320, t: "nv" },
    { n: "Sesame Fried Chicken", p: 370, t: "nv" },
    { n: "Fish and Chips", p: 480, t: "nv" },
    { sub: "Nachos" },
    { n: "Veg Nachos", p: 380, t: "v" },
    { n: "Chicken Nachos", p: 400, t: "nv" },
    { sub: "Fries" },
    { n: "Salted", p: 270, t: "v" },
    { n: "Peri Peri", p: 280, t: "v" },
    { n: "Cheese / Cheese Chilli", p: 350, t: "v" },
    { n: "Chicken Loaded Cheese Fries", p: 390, t: "nv" },
    { sub: "Potato Wedges" },
    { n: "Herb & Garlic", p: 280, t: "v" },
    { n: "Peri Peri Wedges", p: 280, t: "v" },
    { sub: "Garlic Bread" },
    { n: "Plain", p: 240, t: "v" },
    { n: "Cheese / Cheese Chilli", p: 300, t: "v" },
    { n: "Pull-Apart Cheese Chilli Garlic Bun", p: 290, t: "v" },
    { sub: "Bruschetta" },
    { n: "Classic", p: 300, t: "v" },
    { n: "Pesto Tomato", p: 330, t: "v" },
    { n: "Mushroom", p: 330, t: "v" },
    { n: "Chicken", p: 360, t: "nv" },
  ]},
  { id: "wings", nav: "Wings", title: "Wings", script: "and things", items: [
    { n: "Korean Gochujang Wings", p: 390, t: "nv" },
    { n: "Honey Garlic Wings", p: 380, t: "nv" },
    { n: "Crispy Chicken Pops", p: 380, t: "nv" },
  ]},
  { id: "wok", nav: "Wok", title: "From the", script: "wok", items: [
    { n: "Lotus Stem", t: "v", vars: [["Crunchy", 320, "v"], ["Honey Chilli", 350, "v"]] },
    { n: "Korean Chilli Garlic Potato", p: 330, t: "v" },
    { n: "Crispy Corn", p: 330, t: "v" },
    { n: "Stir-Fried Vegetables", p: 340, t: "v" },
    { n: "Veg Manchurian", p: 340, t: "v" },
    { n: "Paneer Chilli", p: 350, t: "v" },
    { n: "Paneer Garlic & Pepper", p: 350, t: "v" },
    { n: "Burnt Red Pepper Paneer", p: 350, t: "v" },
    { n: "Mushroom Chilli", p: 330, t: "v" },
    { n: "Chicken Chilli", p: 360, t: "nv" },
    { n: "Kung Pao Chicken", p: 380, t: "nv" },
    { n: "Burnt Red Pepper Chicken", p: 360, t: "nv" },
    { n: "Thai Lemongrass Chicken", p: 380, t: "nv" },
    { n: "Fish Chilli", p: 440, t: "nv" },
    { n: "Prawns Chilli", p: 480, t: "nv" },
    { n: "Thai Chilli Prawns", p: 480, t: "nv" },
  ]},
  { id: "bites", nav: "Small bites", title: "Small", script: "bites", items: [
    { n: "Raw Mango Peanut Chaat", p: 280, t: "v", g: 1 },
    { n: "Butter Garlic Mushrooms", p: 320, t: "v", g: 1 },
    { n: "Stuffed Mushrooms", p: 330, t: "v" },
    { n: "Italian Cottage Cheese Skewers", p: 360, t: "v", g: 1 },
    { n: "Broccoli & Corn Kebab", p: 390, t: "v" },
    { n: "Peri Peri Chicken", p: 370, t: "nv", g: 1 },
    { n: "Garlic Parmesan Chicken Skewers", p: 380, t: "nv", g: 1 },
    { n: "Grilled Chicken & Zucchini Bites", p: 380, t: "nv" },
    { n: "Butter Garlic Prawns", p: 480, t: "nv", g: 1 },
    { n: "Fish Fingers", p: 400, t: "nv" },
  ]},
  { id: "sandwiches", nav: "Sandwiches", title: "Between", script: "breads", note: "Served with fries.", addons: ["Sourdough +50"], items: [
    { n: "Basil, Mozzarella & Tomato", p: 350, t: "v" },
    { n: "Farmhouse Classic", p: 370, t: "v" },
    { n: "Cottage Cheese, Corn & Spinach", p: 370, t: "v" },
    { n: "Paneer Makhni", p: 380, t: "v" },
    { n: "Roast Chicken", p: 390, t: "nv" },
    { n: "Chicken Pesto", p: 390, t: "nv" },
    { n: "Butter Chicken", p: 400, t: "nv" },
  ]},
  { id: "burgers", nav: "Burgers", title: "Burger", script: "business", note: "Served with fries.", items: [
    { n: "Veggie Burger", p: 380, t: "v" },
    { n: "Crispy Cottage Cheese Burger", p: 400, t: "v" },
    { n: "Peri Peri Cottage Cheese Burger", p: 400, t: "v" },
    { n: "Grilled Chicken Burger", p: 410, t: "nv" },
    { n: "Crispy Chicken Burger", p: 410, t: "nv" },
    { n: "Peri Peri Chicken Burger", p: 420, t: "nv" },
  ]},
  { id: "pizza", nav: "Pizza", title: "Pizza,", script: "please", items: [
    { n: "Margherita", p: 480, t: "v", d: "Tomato, basil and mozzarella." },
    { n: "Cecilia", p: 500, t: "v", d: "Bell peppers, onions and sun-dried tomatoes." },
    { n: "Contadina", p: 520, t: "v", d: "Broccoli, bell peppers, sun-dried tomatoes, olives and jalapeños." },
    { n: "Fiery Cottage Cheese", p: 520, t: "v", d: "Onion, peri peri cottage cheese and bell peppers." },
    { n: "Chicken Exotic", p: 570, t: "nv", d: "Grilled chicken, bell peppers, green olives and onion." },
    { n: "Fiery Chicken", p: 550, t: "nv", d: "Peri peri chicken, mushrooms, onions and jalapeños." },
    { n: "Butter Chicken", p: 550, t: "nv", d: "BBQ chicken brushed with our butter chicken sauce." },
    { n: "Desi Chicken Keema", p: 560, t: "nv", d: "Spiced chicken mince, onion, jalapeño and olives." },
    { n: "Make It Half & Half", p: 600, d: "Pick any two." },
  ]},
  { id: "pasta", nav: "Pasta", title: "Pasta", script: "la vista", note: "Choice of penne or spaghetti.", addons: ["Chicken +100", "Prawns +180"], items: [
    { n: "Arrabiata", p: 410, t: "v", d: "Penne or spaghetti in a rich tomato basil sauce with vegetables." },
    { n: "Aglio Olio Peperoncino", p: 420, t: "v", d: "Spaghetti tossed in olive oil, garlic, herbs and parmesan." },
    { n: "Basil Pesto", p: 420, t: "v", d: "Spaghetti in creamy basil pesto with cheese." },
    { n: "Alfredo", p: 430, t: "v", d: "Penne or spaghetti in a creamy, cheesy white sauce with mushrooms, olives and broccoli." },
    { n: "Primavera", p: 430, t: "v", d: "Penne or spaghetti in a creamy pink sauce with bell peppers." },
    { n: "Veg Lasagna", p: 480, t: "v", d: "Pasta sheets layered with mushrooms, zucchini, bell peppers, beans, sweet corn and tomato basil sauce." },
    { n: "Chicken Lasagna", p: 520, t: "nv", d: "Pasta sheets layered with chicken and mushrooms in tomato basil sauce." },
    { n: "Mushroom Ricotta Ravioli", p: 500, t: "v", d: "Black ravioli filled with mushroom and ricotta, in a rich creamy white sauce." },
  ]},
  { id: "soups", nav: "Soups", title: "Soups", addons: ["Chicken +80", "Prawns +140"], items: [
    { n: "Tomato & Basil", p: 270, t: "v", g: 1 },
    { n: "Mushroom & Basil", p: 290, t: "v" },
    { n: "Lemon Coriander", p: 260, t: "v" },
    { n: "Tom Kha", p: 300, t: "v", g: 1 },
    { n: "Manchow", p: 280, t: "v" },
  ]},
  { id: "mains", nav: "Mains", title: "The Main Event", note: "Continental classics, with sautéed vegetables and rice or mash.", addons: ["Upgrade to veg quinoa +50"], items: [
    { n: "Cottage Cheese Steak", p: 560, t: "v", d: "Stuffed cottage cheese steak in a rich brown sauce." },
    { n: "Cottage Cheese Supreme", p: 550, t: "v", d: "Cottage cheese tossed in an Italian tomato cream sauce." },
    { n: "Mushroom Crepes", p: 530, t: "v", d: "Thin crepes filled with mushroom ragout, finished with herb garlic butter." },
    { n: "Veg Paprika with Spinach Rice", p: 530, t: "v", d: "Sautéed vegetables in paprika sauce, served with spinach rice." },
    { n: "Hunter's Chicken", p: 590, t: "nv", fav: 1, d: "Our signature. Chicken breast and mushrooms in a rich brown sauce." },
    { n: "Mediterranean Chicken", p: 580, t: "nv", d: "Chicken breast in a creamy white sauce." },
    { n: "Herbed Garlic Grilled Chicken", p: 570, t: "nv", g: 1, d: "Tender grilled chicken marinated with herbs and garlic, served with mash." },
    { n: "Honey Roasted Paprika Chicken", p: 580, t: "nv", g: 1, d: "Roasted chicken glazed with honey and paprika." },
    { n: "Chicken Mushroom Stroganoff", p: 580, t: "nv", d: "Chicken and mushrooms in a creamy, tangy sauce." },
    { n: "Fish in Honey Mustard", p: 610, t: "nv", g: 1, d: "Grilled basa fish finished with honey mustard." },
    { n: "Grilled Fish", p: 600, t: "nv", g: 1, d: "Our special herb and condiment-rubbed grilled basa fish." },
    { n: "Prawns Theodore", p: 620, t: "nv", d: "Prawns cooked in a creamy white sauce." },
  ]},
  { id: "asian", nav: "Asian", title: "Asian Table", items: [
    { n: "Burmese Khao Suey", fav: 1, d: "Silky coconut broth with noodles and toppings including fried garlic, onions and peanuts. Add prawns +180.", vars: [["Veg", 550, "v"], ["Chicken", 590, "nv"]] },
    { n: "Omurice", p: 520, t: "nv", d: "Japanese-style omelette served over fried rice with chicken gravy." },
    { n: "Thai Red Curry & Rice", g: 1, d: "Traditional Thai red curry cooked in coconut milk, served with steamed rice.", vars: [["Veg", 520, "v"], ["Chicken", 570, "nv"]] },
    { n: "Thai Green Curry & Rice", g: 1, d: "Traditional Thai green curry cooked in coconut milk, served with steamed rice.", vars: [["Veg", 520, "v"], ["Chicken", 570, "nv"]] },
    { n: "Nasi Goreng", d: "Indonesian-style fried rice served with a fried egg.", vars: [["Veg, with egg", 410, "e"], ["Chicken", 460, "nv"]] },
    { n: "Togarashi Grilled Chicken", p: 570, t: "nv", d: "Japanese spice-rubbed grilled chicken with mustard mash and stir-fried greens." },
    { n: "Togarashi Grilled Fish", p: 600, t: "nv", d: "Japanese spice-rubbed grilled fish with mustard mash and stir-fried greens." },
  ]},
  { id: "indo", nav: "Indo-Chinese", title: "Indo-", script: "Chinese", items: [
    { n: "Paneer Chilli Gravy", p: 390, t: "v" },
    { n: "Veg Manchurian Gravy", p: 380, t: "v" },
    { n: "Vegetables in Hot Garlic Sauce", p: 370, t: "v" },
    { n: "Chicken Chilli Gravy", p: 410, t: "nv" },
  ]},
  { id: "rice", nav: "Rice & noodles", title: "Rice and", script: "noodles", addons: ["Prawns +180"], items: [
    { n: "Pad Thai Noodles", vars: [["Veg", 360, "v"], ["Chicken", 390, "nv"]] },
    { n: "Hakka Noodles", vars: [["Veg", 340, "v"], ["Chicken", 380, "nv"]] },
    { n: "Fried Rice", vars: [["Veg", 340, "v"], ["Chicken", 380, "nv"]] },
    { n: "Burnt Garlic", vars: [["Veg", 350, "v"], ["Chicken", 390, "nv"]] },
    { n: "Schezwan", vars: [["Veg", 350, "v"], ["Chicken", 390, "nv"]] },
    { n: "Thai Basil Rice", vars: [["Veg", 350, "v"], ["Chicken", 390, "nv"]] },
    { n: "Steamed Rice", p: 220, t: "v", g: 1 },
  ]},
  { id: "desserts", nav: "Desserts", title: "Save room", script: "for this", items: [
    { sub: "Cheesecakes" },
    { n: "Coffee Cheesecake Flan", p: 280, t: "e", d: "A smooth baked cheesecake finished with a coffee-infused caramel glaze." },
    { n: "Lotus Biscoff", p: 320, t: "v", tag: "Eggless", d: "Cheesecake on a Biscoff biscuit base, topped with smooth Biscoff spread." },
    { n: "Mango Coconut", p: 320, t: "v", tag: "Eggless", d: "Coconut cheesecake with a creamy mango layer." },
    { sub: "More sweet things" },
    { n: "Tiramisu", p: 320, t: "e", d: "Espresso-soaked ladyfingers layered with mascarpone cream, delicately infused with dark rum." },
    { n: "Apple Pie with Ice Cream", p: 300, t: "v", tag: "Eggless", d: "Warm cinnamon-spiced apple pie with vanilla ice cream and blueberry compote." },
    { n: "Chocolate Brownie with Ice Cream", p: 300, t: "v", tag: "Eggless", d: "Rich chocolate-walnut brownie served warm with vanilla ice cream and hot chocolate sauce." },
  ]},
];

const DRINKS = [
  { id: "cocktails", nav: "Cocktails", title: "Cocktails", items: [
    { sub: "Beer cocktails" },
    { n: "Classic Shandy", p: 300, d: "Beer meets lemonade. Simple, refreshing, timeless." },
    { n: "Lemon Ginger Radler", p: 300, d: "Bright lemon, a little ginger and a whole lot of refreshment." },
    { n: "Citrus Beer Spritzer", p: 300, d: "Beer and orange. A zesty drink." },
    { n: "Spiced Beer Cooler", p: 300, d: "Beer, apple and a little cinnamon warmth." },
    { sub: "Wine cocktails", cols: ["Glass", "Jug"] },
    { n: "Classic Red Sangria", p: [330, 1700], g: 1, d: "Fruity, easy and made for long conversations." },
    { n: "White Symphony Sangria", p: [330, 1700], g: 1, d: "Light, crisp and ready for a slow afternoon." },
    { n: "Rosé Romance Sangria", p: [330, 1700], g: 1, d: "Pink, playful and made for good company." },
    { n: "White Wine Mojito", p: [330, null], g: 1, d: "Wine meets mint, citrus and a little mojito magic." },
  ]},
  { id: "beer", nav: "Beer", title: "Beer", art: { src: "art/beer-hands.webp", alt: "Illustration of hands raising two beer bottles", kind: "side" }, items: [
    { sub: "Bottled" },
    { n: "Budweiser", p: 320 },
    { n: "Kingfisher Ultra", p: 320 },
    { n: "Heineken Silver", p: 320 },
    { n: "Hoegaarden", p: 400 },
    { n: "Corona", p: 400 },
    { n: "People's Lager Beer (Goa)", p: 320 },
    { sub: "Mead, bottled", subNote: "A honey-fermented drink, smooth and lightly sweet with floral, fruity notes." },
    { n: "Moonshine Apple Cider", p: 310, g: 1 },
    { n: "Moonshine Guava Chilli", p: 310, g: 1 },
  ]},
  { id: "tap", nav: "On tap", title: "On the", script: "tap", art: { src: "art/beer-tap.webp", alt: "Illustration of a beer tap filling a glass", kind: "side" }, items: [
    { sub: "Draft beer" },
    { n: "KF Premium", p: 230 },
    { n: "KF Ultra", p: 250 },
    { sub: "Craft beer", cols: ["250 ml", "500 ml"] },
    { n: "Toit Tint-in-Wit", p: [230, 360], d: "A refreshing Belgian witbier with coriander and orange peel. Zesty, citrusy and smooth." },
    { n: "Toit Hefeweizen", p: [230, 360], d: "A full-bodied, refreshing wheat ale with low to moderate banana and clove flavour." },
    { n: "Yavasura Basil Peppercorn Mint", p: [230, 360], d: "A light witbier with basil and black peppercorns. Basil on the nose, balanced by the pepper." },
    { n: "Yavasura Crème Noir Stout", p: [230, 360], d: "Balanced bitterness with notes of dark chocolate and coffee. Contains lactose." },
  ]},
  { id: "wine", nav: "Wine", title: "Wine", allG: 1, note: "All our wines are gluten-free.", items: [
    { sub: "Red", cols: ["Glass", "Bottle"] },
    { n: "House Wine (Virgin Hills)", p: [300, 1400], g: 1 },
    { n: "Shiraz (Sula)", p: [360, 1700], g: 1 },
    { n: "Source Cabernet (Sula)", p: [null, 2400], g: 1 },
    { n: "La Reserve (Grover Zampa)", p: [null, 2400], g: 1 },
    { n: "Jacob's Creek Merlot (Australia)", p: [null, 3450], g: 1 },
    { sub: "White", cols: ["Glass", "Bottle"] },
    { n: "House Wine (Virgin Hills)", p: [300, 1400], g: 1 },
    { n: "Chenin Blanc (Sula)", p: [360, 1700], g: 1 },
    { n: "Source SBL Reserve (Sula)", p: [null, 2400], g: 1 },
    { n: "Jacob's Creek Chardonnay (Australia)", p: [null, 3450], g: 1 },
    { sub: "Rosé", cols: ["Glass", "Bottle"] },
    { n: "House Wine (Virgin Hills)", p: [300, 1400], g: 1 },
    { n: "Zinfandel (Sula)", p: [360, 1700], g: 1 },
    { n: "Source Grenache (Sula)", p: [null, 2400], g: 1 },
    { sub: "Sparkling", cols: ["Glass", "Bottle"] },
    { n: "Brut (Sula)", p: [null, 2300], g: 1 },
    { n: "Source Moscato (Sula)", p: [null, 2400], g: 1 },
  ]},
  { id: "coolers", nav: "Coolers & shakes", title: "Coolers", items: [
    { sub: "Mocktails" },
    { n: "Mint Ginger Cooler", p: 190, g: 1 },
    { n: "Kalakhatta Cooler", p: 200, g: 1 },
    { n: "Guava Mary", p: 220, g: 1 },
    { n: "Virgin Mojito", p: 220, g: 1 },
    { n: "Watermelon Mojito", p: 240, g: 1 },
    { n: "Orange Mojito", p: 240, g: 1 },
    { sub: "Iced teas" },
    { n: "Lemon Iced Tea", p: 150, g: 1 },
    { n: "Peach / Raspberry Iced Tea", p: 200, g: 1 },
    { sub: "Soft drinks" },
    { n: "Coke / Thums Up / Sprite", p: 100, g: 1 },
    { n: "Diet Coke", p: 150, g: 1 },
    { n: "Red Bull", p: 230, g: 1 },
    { sub: "Shakes" },
    { n: "Chocolate / Strawberry / Oreo / Nutella / Nutella Banana", p: 270 },
    { n: "KitKat Coffee Shake", p: 280 },
    { n: "Brownie Shake", p: 280 },
  ]},
  { id: "healthy", nav: "Go healthy", title: "Go", script: "healthy", items: [
    { sub: "Fresh" },
    { n: "Fresh Lime Water / Soda", p: 150, g: 1 },
    { n: "Kokum Chia Lemonade", p: 190, g: 1 },
    { n: "Cucumber Chia Refresher", p: 200, g: 1 },
    { n: "Seasonal Fruit Juice", p: 280, g: 1 },
    { n: "Zinger", p: 290, g: 1, d: "Orange, carrot, apple and ginger." },
    { n: "ABC Juice", p: 290, g: 1, d: "Apple, beetroot and carrot." },
    { sub: "Smoothies", subNote: "Made with Greek yoghurt and honey." },
    { n: "Avocado Banana", p: 320, g: 1 },
    { n: "Peanut Butter Banana", p: 280, g: 1 },
    { sub: "Fermented" },
    { n: "Kombucha (Umami Brew)", p: 250, g: 1, d: "Ask us for today's flavours." },
  ]},
  { id: "coffee", nav: "Hot coffee", title: "Coffee", script: "hot", scriptFirst: 1, addons: ["Oat milk +60", "Soy milk +60", "Hazelnut +70"], items: [
    { n: "Espresso", p: 200, g: 1 },
    { n: "Americano", p: 200, g: 1 },
    { n: "Cortado", p: 220, g: 1 },
    { n: "Cappuccino", p: 230, g: 1 },
    { n: "Flat White", p: 240, g: 1 },
    { n: "Latte", p: 240, g: 1 },
    { n: "Mocha", p: 260, g: 1 },
    { n: "Hot Chocolate", p: 300, g: 1 },
  ]},
  { id: "tea", nav: "Tea", title: "Tea &", script: "infusions", items: [
    { n: "Green Tea", p: 120, g: 1 },
    { n: "Black Tea", p: 130, g: 1 },
    { n: "Masala Tea", p: 150, g: 1 },
    { sub: "Herbal infusions" },
    { n: "Ginger Honey Lemon", p: 150, g: 1 },
    { n: "Chamomile", p: 150, g: 1 },
    { n: "Butterfly Pea", p: 150, g: 1 },
    { n: "Hibiscus", p: 150, g: 1 },
  ]},
  { id: "cold-coffee", nav: "Cold coffee", title: "Coffee", script: "cold", scriptFirst: 1, addons: ["Vanilla or chocolate ice cream +50"], items: [
    { n: "Classic Cold Coffee", p: 280, g: 1 },
    { n: "Iced Americano", p: 210, g: 1 },
    { n: "Iced Latte", p: 250, g: 1 },
    { n: "Iced Mocha", p: 270, g: 1, d: "Milk, chocolate syrup and espresso." },
    { n: "Iced Hazelnut Coffee", p: 280, g: 1, d: "Milk, hazelnut syrup and espresso." },
    { n: "Vietnamese Iced Coffee", p: 280, g: 1, d: "Condensed milk and espresso." },
    { n: "Vietnamese Coconut Coffee", p: 290, g: 1, d: "Condensed milk, coconut cream and espresso." },
    { n: "Affogato", p: 290, d: "Vanilla ice cream, chocolate syrup and espresso." },
  ]},
  { id: "bakes", nav: "Bakes", title: "Bakes", script: "and treats", items: [
    { n: "Oatmeal n Raisin Cookie", p: 50 },
    { n: "Orange Almond Biscotti", p: 50 },
    { sub: "Tea cakes", subNote: "Made with oat flour." },
    { n: "Date and Walnut", p: 100, d: "No added sugar." },
    { n: "Banana Chocochips", p: 80 },
    { n: "Carrot and Orange", p: 80 },
    { sub: "Something bigger" },
    { n: "Choco Cookie Pie", p: 180 },
  ]},
];

/* ---------- Rendering ---------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const money = v => v == null ? "–" : "₹" + v.toLocaleString("en-IN");
const mark = t => !t ? "" : `<span class="mark${t === "v" ? "" : " nv"}" role="img" aria-label="${t === "v" ? "Vegetarian" : t === "e" ? "Contains egg" : "Non-vegetarian"}"></span>`;

function heading(s) {
  const script = s.script ? `<span class="script">${esc(s.script)}</span>` : "";
  const title = s.scriptFirst
    ? `${script} ${esc(s.title)}`
    : `${esc(s.title)}${script ? " " + script : ""}`;
  return title + (s.titleAfter ? ` ${esc(s.titleAfter)}` : "");
}

function tags(it, showEgg) {
  const out = [];
  if (it.fav) out.push(`<span class="badge b-fav">Beetroot favourite</span>`);
  if (showEgg && it.t === "e") out.push(`<span class="badge b-e">Egg</span>`);
  if (it.tag) out.push(`<span class="badge b-g">${esc(it.tag)}</span>`);
  if (it.g) out.push(`<span class="badge b-g" title="Gluten-free">GF</span>`);
  return out.length ? `<div class="tags">${out.join("")}</div>` : "";
}

function itemHTML(it, isFood, eggTag) {
  const v = it.vars;
  const types = v ? v.map(x => x[2]) : [it.t];
  const attrs = `data-veg="${types.includes("v") ? 1 : 0}" data-gf="${it.g || it.gAll ? 1 : 0}"`;
  let price = "";
  if (Array.isArray(it.p)) price = `<span class="prices">${it.p.map(x => `<span>${money(x)}</span>`).join("")}</span>`;
  else if (it.p != null) price = `<span class="price">${money(it.p)}</span>`;
  const lead = isFood && !v ? mark(it.t) : "";
  const variants = v ? `<div class="variants">${v.map(x =>
      `<div class="variant" data-vt="${x[2]}">${isFood ? mark(x[2]) : ""}<span class="vname">${esc(x[0])}</span><span class="price">${money(x[1])}</span></div>`).join("")}</div>` : "";
  return `<li class="item" ${attrs}>
    <div class="row">${lead}<span class="name">${esc(it.n)}</span>${price}</div>
    ${it.d ? `<p class="desc">${esc(it.d)}</p>` : ""}${variants}${tags(it, isFood && eggTag)}
  </li>`;
}

function sectionHTML(s, isFood) {
  let body = "", open = false;
  const close = () => { if (open) { body += "</ul></div>"; open = false; } };
  for (const it of s.items) {
    if (it.sub) {
      close();
      body += `<div class="subgroup"><h3 class="sub">${esc(it.sub)}</h3>${it.subNote ? `<p class="sec-note">${esc(it.subNote)}</p>` : ""}${it.cols ? `<div class="cols">${it.cols.map(c => `<span>${esc(c)}</span>`).join("")}</div>` : ""}<ul class="items">`;
      open = true;
      continue;
    }
    if (!open) { body += `<div class="subgroup"><ul class="items">`; open = true; }
    body += itemHTML(s.allG ? { ...it, g: 0, gAll: 1 } : it, isFood, !s.noEggTag);
  }
  close();
  const art = s.art ? `<figure class="sec-art ${s.art.kind}"><img src="${s.art.src}" alt="${esc(s.art.alt)}" loading="lazy"></figure>` : "";
  const addons = s.addons ? `<ul class="addons" aria-label="Add-ons">${s.addons.map(a => `<li>${esc(a.replace(/\+(\d+)/, "+₹$1"))}</li>`).join("")}</ul>` : "";
  return `<section class="cat-sec" id="${s.id}" aria-labelledby="h-${s.id}">
    <div class="sec-head"><h2 id="h-${s.id}">${heading(s)}</h2></div>
    ${s.note ? `<p class="sec-note">${esc(s.note)}</p>` : ""}${addons}${art}${body}
  </section>`;
}

const panels = { food: $("#food"), drinks: $("#drinks") };
panels.food.innerHTML = FOOD.map(s => sectionHTML(s, true)).join("") + `<p class="empty" hidden>Nothing matches these filters. Try removing one.</p>`;
panels.drinks.innerHTML = DRINKS.map(s => sectionHTML(s, false)).join("") + `<p class="empty" hidden>Nothing matches these filters. Try removing one.</p>`;

/* ---------- Tabs, filters, section nav ---------- */
let current = "food";
const filters = { veg: false, gf: false };
const catsEl = $("#cats");
const tabs = { food: $("#tab-food"), drinks: $("#tab-drinks") };
const meta = document.querySelector('meta[name="theme-color"]');

function buildCats() {
  const data = current === "food" ? FOOD : DRINKS;
  catsEl.innerHTML = data.map(s => `<button class="cat" data-id="${s.id}">${esc(s.nav)}</button>`).join("");
}

function applyFilters() {
  const panel = panels[current];
  let shown = 0;
  panel.querySelectorAll(".item").forEach(li => {
    const ok = (!filters.veg || current === "drinks" || li.dataset.veg === "1")
            && (!filters.gf || li.dataset.gf === "1");
    li.hidden = !ok; if (ok) shown++;
    li.querySelectorAll(".variant").forEach(v => {
      v.hidden = (filters.veg && current === "food" && v.dataset.vt !== "v");
    });
  });
  panel.querySelectorAll(".subgroup").forEach(g => { g.hidden = !g.querySelector(".item:not([hidden])"); });
  panel.querySelectorAll(".cat-sec").forEach(sec => {
    const any = !!sec.querySelector(".item:not([hidden])");
    sec.hidden = !any;
    const btn = catsEl.querySelector(`[data-id="${sec.id}"]`); if (btn) btn.hidden = !any;
  });
  panel.querySelector(".empty").hidden = shown > 0;
}

function setTab(name) {
  current = name;
  for (const k in tabs) { tabs[k].setAttribute("aria-selected", k === name); panels[k].hidden = k !== name; }
  document.body.classList.toggle("evening", name === "drinks");
  meta.content = getComputedStyle(document.body).getPropertyValue("--bg").trim();
  $('[data-f="veg"]').hidden = name === "drinks";
  buildCats(); applyFilters(); observe();
  const bar = $(".bar");
  if (window.scrollY > bar.offsetTop) window.scrollTo({ top: bar.offsetTop, behavior: "auto" });
}

tabs.food.addEventListener("click", () => setTab("food"));
tabs.drinks.addEventListener("click", () => setTab("drinks"));
document.querySelectorAll(".filter").forEach(b => b.addEventListener("click", () => {
  const f = b.dataset.f; filters[f] = !filters[f]; b.setAttribute("aria-pressed", filters[f]); applyFilters();
}));
catsEl.addEventListener("click", e => {
  const b = e.target.closest(".cat"); if (!b) return;
  const sec = document.getElementById(b.dataset.id);
  jumping = true; clearTimeout(jumpTimer); jumpTimer = setTimeout(() => { jumping = false; }, 900);
  catsEl.querySelectorAll(".cat").forEach(c => c.classList.toggle("on", c === b));
  const y = sec.getBoundingClientRect().top + window.scrollY - $(".bar").offsetHeight - 6;
  window.scrollTo({ top: y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});

let io, jumping = false, jumpTimer;
function observe() {
  if (io) io.disconnect();
  io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting || jumping) return;
      catsEl.querySelectorAll(".cat").forEach(c => c.classList.toggle("on", c.dataset.id === en.target.id));
      const on = catsEl.querySelector(".cat.on");
      if (on) catsEl.scrollLeft = on.offsetLeft - 16;
    });
  }, { rootMargin: "-170px 0px -65% 0px" });
  panels[current].querySelectorAll(".cat-sec").forEach(s => io.observe(s));
}

setTab("food");
