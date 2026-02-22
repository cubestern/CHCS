// ============================================================
// CHCS - Can't Handle Choosing Stuff
// ============================================================

// ========== MEALS DATA (from meals.json) ==========
const MEALS = [
  { id: "meal-001", name: "Pasta Aglio e Olio", cuisine: "Italian", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "The Roman classic — garlic, chili flakes, olive oil, parmesan. Embarrassingly simple, unreasonably good.", ingredients: ["spaghetti", "knoflook", "rode peper vlokken", "parmezaan", "olijfolie", "peterselie"] },
  { id: "meal-002", name: "Shakshuka", cuisine: "Middle Eastern", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Eggs poached in spiced tomato sauce with cumin and paprika. Serve with crusty bread.", ingredients: ["eieren", "tomatenblokjes (blik)", "ui", "knoflook", "komijn", "paprikapoeder", "brood"] },
  { id: "meal-003", name: "Teriyaki Zalm met Rijst", cuisine: "Japanese", effort: "easy", prepTime: 20, dietary: "fish", description: "Pan-fried salmon with sweet-salty teriyaki glaze. Rice and steamed broccoli on the side.", ingredients: ["zalmfilet", "sojasaus", "honing", "rijst", "broccoli", "sesamzaad", "gember"] },
  { id: "meal-004", name: "Rode Linzensoep", cuisine: "Turkish", effort: "easy", prepTime: 30, dietary: "vegetarian", description: "Creamy red lentil soup with cumin and lemon. One pot, zero effort, maximum comfort.", ingredients: ["rode linzen", "ui", "wortel", "knoflook", "komijn", "citroen", "tomatenblokjes"] },
  { id: "meal-005", name: "Bibimbap", cuisine: "Korean", effort: "medium", prepTime: 35, dietary: "vegetarian", description: "Rice bowl with sautéed vegetables, a fried egg, and gochujang sauce. Colourful and satisfying.", ingredients: ["rijst", "wortel", "courgette", "spinazie", "ei", "gochujang", "sesamolie", "sojasaus"] },
  { id: "meal-006", name: "Pittige Garnalen Pasta", cuisine: "Italian", effort: "easy", prepTime: 20, dietary: "fish", description: "Prawns in garlic-chili-tomato sauce tossed with linguine. Weeknight fancy in 20 minutes.", ingredients: ["garnalen", "linguine", "knoflook", "rode peper", "cherry tomaten", "witte wijn", "peterselie"] },
  { id: "meal-007", name: "Stamppot Boerenkool", cuisine: "Dutch", effort: "easy", prepTime: 30, dietary: "meat", description: "The ultimate Dutch winter comfort. Mashed potatoes with kale, served with rookworst and mustard.", ingredients: ["aardappelen", "boerenkool", "rookworst", "mosterd", "boter", "melk"] },
  { id: "meal-008", name: "Tikka Masala", cuisine: "Indian", effort: "medium", prepTime: 40, dietary: "meat", description: "Chicken in creamy, mildly spiced tomato-yoghurt sauce. Aromatic but not too spicy. With naan or rice.", ingredients: ["kipfilet", "yoghurt", "tomatenblokjes", "ui", "knoflook", "garam masala", "kurkuma", "room", "naanbrood"] },
  { id: "meal-009", name: "Caprese Salade met Bruschetta", cuisine: "Italian", effort: "easy", prepTime: 10, dietary: "vegetarian", description: "Fresh mozzarella, tomato, basil, balsamic. With garlic bruschetta. Summer on a plate.", ingredients: ["mozzarella", "tomaten", "basilicum", "balsamico", "ciabatta", "knoflook", "olijfolie"] },
  { id: "meal-010", name: "Pad Thai", cuisine: "Thai", effort: "medium", prepTime: 30, dietary: "vegetarian", description: "Stir-fried rice noodles with tofu, peanuts, bean sprouts, and tamarind sauce. Sweet-sour-salty perfection.", ingredients: ["rijstnoedels", "tofu", "pinda's", "taugé", "ei", "tamarindepasta", "vissaus", "limoen", "lente-ui"] },
  { id: "meal-011", name: "Burrito Bowl", cuisine: "Mexican", effort: "medium", prepTime: 30, dietary: "vegetarian", description: "Rice, black beans, corn, avocado, salsa, cheese, sour cream. Build-your-own-bowl style.", ingredients: ["rijst", "zwarte bonen (blik)", "mais", "avocado", "tomaat", "rode ui", "geraspte kaas", "zure room", "limoen"] },
  { id: "meal-012", name: "Erwtensoep", cuisine: "Dutch", effort: "involved", prepTime: 90, dietary: "meat", description: "Thick Dutch split pea soup with smoked sausage and rye bread. Weekend project, feeds you for days.", ingredients: ["spliterwten", "rookworst", "spekblokjes", "prei", "knolselderij", "wortel", "aardappelen", "roggebrood"] },
  { id: "meal-013", name: "Couscous met Geroosterde Groenten", cuisine: "Mediterranean", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Fluffy couscous with oven-roasted peppers, courgette, and aubergine. Feta and mint on top.", ingredients: ["couscous", "paprika", "courgette", "aubergine", "feta", "munt", "olijfolie", "citroen"] },
  { id: "meal-014", name: "Udon Noodle Soup", cuisine: "Japanese", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Thick udon noodles in warm dashi broth with mushrooms and soft-boiled egg. Cozy in a bowl.", ingredients: ["udon noedels", "dashi bouillon", "sojasaus", "shiitake", "ei", "lente-ui", "wakame"] },
  { id: "meal-015", name: "Gehaktballen in Tomatensaus", cuisine: "Dutch-Italian", effort: "medium", prepTime: 40, dietary: "meat", description: "Homemade meatballs simmered in rich tomato-basil sauce. With spaghetti or crusty bread.", ingredients: ["gehakt", "ui", "knoflook", "paneermeel", "ei", "tomatenblokjes", "basilicum", "spaghetti"] },
  { id: "meal-016", name: "Groene Curry", cuisine: "Thai", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Quick green curry with coconut milk, sugar snaps, and tofu. Aromatic and creamy. Serve over jasmine rice.", ingredients: ["groene currypasta", "kokosmelk", "tofu", "sugarsnaps", "paprika", "bamboe", "jasminrijst", "basilicum"] },
  { id: "meal-017", name: "Quiche Lorraine", cuisine: "French", effort: "medium", prepTime: 50, dietary: "meat", description: "Buttery pastry shell filled with bacon, gruyère, and egg custard. Serve with green salad.", ingredients: ["bladerdeeg", "spekblokjes", "gruyère", "eieren", "room", "melk", "sla", "dressing"] },
  { id: "meal-018", name: "Falafel Wraps", cuisine: "Middle Eastern", effort: "medium", prepTime: 35, dietary: "vegetarian", description: "Crispy falafel in warm pita with hummus, pickled onion, and tahini sauce. Better than takeaway.", ingredients: ["falafel (kant-en-klaar of zelfgemaakt)", "pita", "hummus", "rode ui", "komkommer", "tomaat", "tahini", "sla"] },
  { id: "meal-019", name: "Risotto ai Funghi", cuisine: "Italian", effort: "involved", prepTime: 45, dietary: "vegetarian", description: "Creamy mushroom risotto with parmigiano. Requires stirring and patience. Worth it.", ingredients: ["risotto rijst", "champignons", "sjalot", "knoflook", "witte wijn", "groentebouillon", "parmezaan", "boter"] },
  { id: "meal-020", name: "Tostada's met Zwarte Bonen", cuisine: "Mexican", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "Crispy tortillas topped with mashed black beans, avocado, salsa, and cheese. 15-minute dinner.", ingredients: ["tortilla's", "zwarte bonen", "avocado", "tomaat", "rode ui", "kaas", "zure room", "koriander"] },
  { id: "meal-021", name: "Kip Saté met Pindasaus", cuisine: "Indonesian", effort: "medium", prepTime: 35, dietary: "meat", description: "Grilled chicken skewers with homemade peanut sauce. With rice, kroepoek, and atjar.", ingredients: ["kipfilet", "pindakaas", "sojasaus", "ketjap manis", "knoflook", "sambal", "rijst", "kroepoek", "atjar"] },
  { id: "meal-022", name: "Pasta Pesto met Mozzarella", cuisine: "Italian", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "Penne with green pesto, cherry tomatoes, and torn mozzarella. The lazy genius dinner.", ingredients: ["penne", "groene pesto", "cherry tomaten", "mozzarella", "pijnboompitten", "rucola"] },
  { id: "meal-023", name: "Nasi Goreng", cuisine: "Indonesian", effort: "easy", prepTime: 20, dietary: "meat", description: "Dutch-Indonesian fried rice with ketjap, vegetables, and a fried egg on top. Use leftover rice.", ingredients: ["rijst (oud)", "ei", "prei", "paprika", "ketjap manis", "sambal", "knoflook", "kippendij"] },
  { id: "meal-024", name: "Makreel met Bietensalade", cuisine: "Nordic", effort: "easy", prepTime: 15, dietary: "fish", description: "Smoked mackerel on a bed of roasted beet, apple, and horseradish cream. Light but filling.", ingredients: ["gerookte makreel", "bieten (voorgekookt)", "appel", "mierikswortel", "crème fraîche", "dille", "gemengde sla"] },
  { id: "meal-025", name: "Pannenkoeken", cuisine: "Dutch", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Dutch pancakes. Savoury with cheese and ham, sweet with stroop and poedersuiker. Or both. No judgement.", ingredients: ["bloem", "eieren", "melk", "boter", "kaas", "ham", "stroop", "poedersuiker"] },
  { id: "meal-026", name: "Dahl met Naanbrood", cuisine: "Indian", effort: "easy", prepTime: 30, dietary: "vegetarian", description: "Spiced yellow lentil stew with ginger, turmeric, and tomato. Creamy, warming, protein-rich.", ingredients: ["gele linzen", "ui", "knoflook", "gember", "kurkuma", "tomatenblokjes", "kokosmelk", "naanbrood", "koriander"] },
  { id: "meal-027", name: "Shoarma Bowl", cuisine: "Middle Eastern", effort: "easy", prepTime: 20, dietary: "meat", description: "Seasoned chicken strips with hummus, cucumber, tomato, and garlic sauce over rice. Deconstructed kebab.", ingredients: ["kipfilet", "shoarmakruiden", "rijst", "hummus", "komkommer", "tomaat", "knoflooksaus", "sla"] },
  { id: "meal-028", name: "Pompoensoep", cuisine: "Dutch", effort: "easy", prepTime: 30, dietary: "vegetarian", description: "Roasted pumpkin soup with ginger and coconut milk. Serve with pumpkin seed oil and sourdough.", ingredients: ["pompoen", "ui", "knoflook", "gember", "kokosmelk", "groentebouillon", "pompoenpitten", "zuurdesembrood"] },
  { id: "meal-029", name: "Tagliatelle Bolognese", cuisine: "Italian", effort: "involved", prepTime: 60, dietary: "meat", description: "A proper slow-cooked ragù. Weekend effort that rewards patience. Freeze half for next week.", ingredients: ["gehakt", "ui", "wortel", "bleekselderij", "knoflook", "tomatenblokjes", "rode wijn", "tagliatelle", "parmezaan"] },
  { id: "meal-030", name: "Gevulde Paprika's", cuisine: "Mediterranean", effort: "medium", prepTime: 40, dietary: "vegetarian", description: "Bell peppers stuffed with rice, feta, sun-dried tomatoes, and herbs. Baked until tender.", ingredients: ["paprika", "rijst", "feta", "zongedroogde tomaten", "pijnboompitten", "oregano", "olijfolie"] },
  { id: "meal-031", name: "Fish Tacos", cuisine: "Mexican", effort: "medium", prepTime: 25, dietary: "fish", description: "Crispy white fish in soft tortillas with mango salsa, red cabbage slaw, and lime crema.", ingredients: ["witvisfilet", "tortilla's", "mango", "rode kool", "limoen", "yoghurt", "koriander", "avocado"] },
  { id: "meal-032", name: "Bami Goreng", cuisine: "Indonesian", effort: "easy", prepTime: 20, dietary: "meat", description: "Stir-fried egg noodles with vegetables and ketjap manis. The nasi goreng's noodle sibling.", ingredients: ["bami noedels", "kippendij", "prei", "wortel", "kool", "ketjap manis", "knoflook", "sambal", "gebakken uitjes"] },
  { id: "meal-033", name: "Croque Monsieur", cuisine: "French", effort: "easy", prepTime: 15, dietary: "meat", description: "The French grilled cheese: ham, gruyère, béchamel. Serve with a simple green salad.", ingredients: ["casinobrood", "ham", "gruyère", "boter", "bloem", "melk", "dijon mosterd", "sla"] },
  { id: "meal-034", name: "Gnocchi met Salie Boter", cuisine: "Italian", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "Pan-fried gnocchi in brown butter with crispy sage leaves and parmesan. Ridiculously easy, ridiculously good.", ingredients: ["gnocchi (kant-en-klaar)", "boter", "salie", "parmezaan", "pijnboompitten"] },
  { id: "meal-035", name: "Vietnamese Pho", cuisine: "Vietnamese", effort: "medium", prepTime: 35, dietary: "meat", description: "Aromatic beef broth with rice noodles, herbs, and lime. The simplified weeknight version.", ingredients: ["runderbouillon", "rijstnoedels", "biefstuk (dun gesneden)", "steranijs", "gember", "taugé", "basilicum", "limoen", "sriracha"] },
  { id: "meal-036", name: "Flammkuchen", cuisine: "German", effort: "easy", prepTime: 20, dietary: "meat", description: "Ultra-thin crispy base with crème fraîche, onions, and bacon. The Alsatian pizza. Beer required.", ingredients: ["flammkuchen deeg (of tortilla)", "crème fraîche", "ui", "spekblokjes", "bieslook"] },
  { id: "meal-037", name: "Shakshuka Verde", cuisine: "Middle Eastern", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Green shakshuka with spinach, leek, and feta instead of the tomato version. Fresh and light.", ingredients: ["eieren", "spinazie", "prei", "feta", "knoflook", "komijn", "brood"] },
  { id: "meal-038", name: "Pulled Jackfruit Sandwich", cuisine: "American", effort: "medium", prepTime: 35, dietary: "vegetarian", description: "Shredded jackfruit in BBQ sauce on brioche buns with coleslaw. Surprisingly meaty for a plant.", ingredients: ["jackfruit (blik)", "BBQ saus", "brioche broodjes", "rode kool", "wortel", "mayonaise", "appel cider azijn"] },
  { id: "meal-039", name: "Stamppot Hutspot", cuisine: "Dutch", effort: "easy", prepTime: 30, dietary: "meat", description: "Mashed potatoes with carrots and onions. Classic Dutch comfort with a klapstukje or braadworst.", ingredients: ["aardappelen", "wortelen", "uien", "boter", "braadworst", "jus"] },
  { id: "meal-040", name: "Miso Aubergine met Rijst", cuisine: "Japanese", effort: "medium", prepTime: 35, dietary: "vegetarian", description: "Oven-roasted aubergine with sweet miso glaze. With steamed rice and quick-pickled cucumber.", ingredients: ["aubergine", "miso pasta", "honing", "rijst", "komkommer", "rijstazijn", "sesamzaad", "lente-ui"] },
  { id: "meal-041", name: "Cacio e Pepe", cuisine: "Italian", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "The simplest great pasta. Just pecorino, black pepper, and pasta water. Technique is everything.", ingredients: ["spaghetti", "pecorino", "zwarte peper"] },
  { id: "meal-042", name: "Spaghetti Carbonara", cuisine: "Italian", effort: "easy", prepTime: 20, dietary: "meat", description: "Eggs, guanciale, pecorino. No cream — ever. Silky, smoky, simple.", ingredients: ["spaghetti", "spekblokjes", "eieren", "pecorino", "zwarte peper"] },
  { id: "meal-043", name: "Katsu Curry", cuisine: "Japanese", effort: "medium", prepTime: 35, dietary: "meat", description: "Crispy breaded chicken with thick, sweet Japanese curry sauce. Comfort food at its finest.", ingredients: ["kipfilet", "paneermeel", "eieren", "bloem", "Japanse curryblokjes", "wortel", "aardappelen", "rijst"] },
  { id: "meal-044", name: "Shoyu Ramen", cuisine: "Japanese", effort: "medium", prepTime: 35, dietary: "meat", description: "Soy-based broth with noodles, soft-boiled egg, and chashu pork. The simplified home version.", ingredients: ["ramen noedels", "kippenbouillon", "sojasaus", "ei", "varkensbuik", "nori", "lente-ui", "sesamolie"] },
  { id: "meal-045", name: "Tom Kha Gai", cuisine: "Thai", effort: "easy", prepTime: 25, dietary: "meat", description: "Coconut-galangal chicken soup. Creamy, sour, spicy all at once.", ingredients: ["kipfilet", "kokosmelk", "citroengras", "galanga", "champignons", "vissaus", "limoen", "rode peper"] },
  { id: "meal-046", name: "Massaman Curry", cuisine: "Thai", effort: "medium", prepTime: 40, dietary: "meat", description: "The mildest Thai curry — warm spices, peanuts, potatoes. Rich and fragrant.", ingredients: ["kipfilet", "massaman currypasta", "kokosmelk", "aardappelen", "pinda's", "ui", "tamarindepasta", "jasminrijst"] },
  { id: "meal-047", name: "Hachee", cuisine: "Dutch", effort: "involved", prepTime: 120, dietary: "meat", description: "Slow-braised beef stew with onions and cloves. The ultimate Sunday Dutch comfort.", ingredients: ["runderstoofvlees", "uien", "laurierblad", "kruidnagel", "tomatenblokjes", "runderbouillon", "rode wijn azijn", "ontbijtkoek"] },
  { id: "meal-048", name: "Uitsmijter", cuisine: "Dutch", effort: "easy", prepTime: 10, dietary: "meat", description: "The Dutch open-face sandwich. Fried eggs on bread with ham and cheese. Lunch perfection.", ingredients: ["eieren", "brood", "ham", "kaas", "boter"] },
  { id: "meal-049", name: "Moussaka", cuisine: "Greek", effort: "involved", prepTime: 60, dietary: "meat", description: "Layers of aubergine, spiced lamb, and creamy béchamel. A Mediterranean lasagna.", ingredients: ["aubergine", "lamsgehakt", "ui", "knoflook", "tomatenblokjes", "kaneel", "bloem", "melk", "boter", "kaas"] },
  { id: "meal-050", name: "Spanakopita", cuisine: "Greek", effort: "medium", prepTime: 40, dietary: "vegetarian", description: "Flaky filo pastry filled with spinach and feta. Crispy outside, savoury inside.", ingredients: ["filodeeg", "spinazie", "feta", "ui", "dille", "eieren", "olijfolie"] },
  { id: "meal-051", name: "Tabbouleh met Halloumi", cuisine: "Lebanese", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Fresh herb salad with bulgur, tomato, and grilled halloumi. Light and summery.", ingredients: ["bulgur", "peterselie", "munt", "tomaten", "komkommer", "halloumi", "citroen", "olijfolie"] },
  { id: "meal-052", name: "Enchiladas Rojas", cuisine: "Mexican", effort: "medium", prepTime: 35, dietary: "meat", description: "Rolled tortillas in smoky red chili sauce with chicken and cheese. Baked until bubbly.", ingredients: ["tortilla's", "kipfilet", "rode enchilada saus", "geraspte kaas", "ui", "zure room", "koriander", "zwarte bonen"] },
  { id: "meal-053", name: "Chilaquiles", cuisine: "Mexican", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Crispy tortilla chips simmered in salsa with fried eggs and avocado. Mexican breakfast for dinner.", ingredients: ["tortillachips", "salsa roja", "eieren", "avocado", "zure room", "kaas", "koriander", "limoen"] },
  { id: "meal-054", name: "Palak Paneer", cuisine: "Indian", effort: "medium", prepTime: 30, dietary: "vegetarian", description: "Paneer cubes in creamy spinach sauce with ginger and garam masala. Rich and iron-packed.", ingredients: ["paneer", "spinazie", "ui", "knoflook", "gember", "garam masala", "room", "naanbrood"] },
  { id: "meal-055", name: "Kip Biryani", cuisine: "Indian", effort: "involved", prepTime: 60, dietary: "meat", description: "Layered spiced rice with marinated chicken, saffron, and fried onions. Worth the effort.", ingredients: ["kipfilet", "basmatirijst", "yoghurt", "ui", "gember", "knoflook", "garam masala", "saffraan", "koriander", "munt"] },
  { id: "meal-056", name: "Butter Chicken", cuisine: "Indian", effort: "medium", prepTime: 35, dietary: "meat", description: "Tandoori-spiced chicken in rich, velvety tomato-butter sauce. The crowd-pleaser.", ingredients: ["kipfilet", "yoghurt", "tomatenblokjes", "boter", "room", "ui", "knoflook", "gember", "garam masala", "rijst"] },
  { id: "meal-057", name: "Coq au Vin", cuisine: "French", effort: "involved", prepTime: 90, dietary: "meat", description: "Chicken braised in red wine with mushrooms and lardons. Sunday cooking at its finest.", ingredients: ["kippendijen", "rode wijn", "spekblokjes", "champignons", "ui", "wortel", "knoflook", "tijm", "laurierblad"] },
  { id: "meal-058", name: "Ratatouille", cuisine: "French", effort: "medium", prepTime: 45, dietary: "vegetarian", description: "Slow-roasted Provençal vegetables layered in a dish. Looks beautiful, tastes better.", ingredients: ["aubergine", "courgette", "paprika", "tomaten", "ui", "knoflook", "tijm", "olijfolie"] },
  { id: "meal-059", name: "Uiensoep", cuisine: "French", effort: "medium", prepTime: 40, dietary: "vegetarian", description: "Caramelised onion soup with gruyère croutons. Sweet, savoury, and deeply warming.", ingredients: ["uien", "boter", "gruyère", "stokbrood", "runderbouillon", "witte wijn", "tijm"] },
  { id: "meal-060", name: "Mac & Cheese", cuisine: "American", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Elbow pasta in creamy four-cheese sauce. No apologies needed.", ingredients: ["macaroni", "cheddar", "gruyère", "melk", "boter", "bloem", "mosterd"] },
  { id: "meal-061", name: "Japchae", cuisine: "Korean", effort: "medium", prepTime: 30, dietary: "vegetarian", description: "Glass noodles stir-fried with vegetables and sesame oil. Sweet, savoury, and satisfying.", ingredients: ["glasnoedels", "spinazie", "wortel", "paprika", "champignons", "sojasaus", "sesamolie", "suiker", "knoflook"] },
  { id: "meal-062", name: "Kimchi Jjigae", cuisine: "Korean", effort: "easy", prepTime: 25, dietary: "meat", description: "Spicy kimchi stew with pork belly and tofu. The ultimate Korean comfort soup.", ingredients: ["kimchi", "varkensbuik", "tofu", "ui", "knoflook", "gochugaru", "sesamolie", "rijst"] },
  { id: "meal-063", name: "Tteokbokki", cuisine: "Korean", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Chewy rice cakes in sweet-spicy gochujang sauce. Korean street food at home.", ingredients: ["rijstcakes (tteok)", "gochujang", "gochugaru", "suiker", "sojasaus", "lente-ui", "sesamzaad"] },
  { id: "meal-064", name: "Laksa", cuisine: "Malaysian", effort: "medium", prepTime: 30, dietary: "fish", description: "Spicy coconut curry noodle soup with prawns and tofu. A Southeast Asian hug in a bowl.", ingredients: ["rijstnoedels", "garnalen", "tofu", "kokosmelk", "laksa pasta", "taugé", "koriander", "limoen"] },
  { id: "meal-065", name: "Char Siu Rice Bowl", cuisine: "Chinese", effort: "medium", prepTime: 40, dietary: "meat", description: "Sticky-sweet Cantonese BBQ pork over rice with steamed bok choy.", ingredients: ["varkenshaas", "hoisinsaus", "honing", "sojasaus", "rijst", "paksoi", "lente-ui"] },
  { id: "meal-066", name: "Mapo Tofu", cuisine: "Chinese", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Silky tofu in numbing, spicy Sichuan sauce. Deeply flavourful with minimal effort.", ingredients: ["tofu", "doubanjiang", "sojasaus", "sesamolie", "lente-ui", "Sichuan peper", "rijst"] },
  { id: "meal-067", name: "Dan Dan Noedels", cuisine: "Chinese", effort: "medium", prepTime: 25, dietary: "meat", description: "Spicy Sichuan noodles with pork mince, peanuts, and chili oil. Addictive.", ingredients: ["noedels", "varkensgehakt", "pinda's", "sojasaus", "sesamolie", "chili olie", "lente-ui", "knoflook", "taugé"] },
  { id: "meal-068", name: "Minestrone", cuisine: "Italian", effort: "easy", prepTime: 30, dietary: "vegetarian", description: "Chunky Italian vegetable soup with beans and pasta. Every spoonful different from the last.", ingredients: ["cannellini bonen", "ditalini pasta", "wortel", "bleekselderij", "courgette", "tomatenblokjes", "groentebouillon", "knoflook", "parmezaan"] },
  { id: "meal-069", name: "Ossobuco", cuisine: "Italian", effort: "involved", prepTime: 120, dietary: "meat", description: "Braised veal shanks in white wine and saffron. Slow-cooked Milan elegance.", ingredients: ["kalfssschenkel", "ui", "wortel", "bleekselderij", "witte wijn", "tomatenblokjes", "saffraan", "knoflook", "peterselie", "citroen"] },
  { id: "meal-070", name: "Burrata met Geroosterde Tomaten", cuisine: "Italian", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "Warm roasted cherry tomatoes split open over burrata. Bread to mop it up.", ingredients: ["burrata", "cherry tomaten", "knoflook", "basilicum", "olijfolie", "ciabatta", "balsamico"] },
  { id: "meal-071", name: "Lamskofta met Yoghurtsaus", cuisine: "Middle Eastern", effort: "medium", prepTime: 30, dietary: "meat", description: "Spiced lamb skewers with cool yoghurt-mint sauce and warm flatbread.", ingredients: ["lamsgehakt", "komijn", "koriander", "ui", "knoflook", "yoghurt", "munt", "platbrood", "sla", "tomaat"] },
  { id: "meal-072", name: "Fattoush", cuisine: "Lebanese", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "Crunchy pita chip salad with sumac dressing. The Middle Eastern chopped salad.", ingredients: ["pita", "tomaten", "komkommer", "radijs", "munt", "peterselie", "sumak", "citroen", "olijfolie"] },
  { id: "meal-073", name: "Hummus Bowl met Groenten", cuisine: "Middle Eastern", effort: "easy", prepTime: 15, dietary: "vegan", description: "Loaded hummus bowl with roasted chickpeas, cucumber, pickles, and olive oil.", ingredients: ["hummus", "kikkererwten", "komkommer", "cherry tomaten", "olijfolie", "paprikapoeder", "platbrood"] },
  { id: "meal-074", name: "Rendang", cuisine: "Indonesian", effort: "involved", prepTime: 120, dietary: "meat", description: "Slow-braised coconut beef from Padang. Gets better every day in the fridge.", ingredients: ["runderstoofvlees", "kokosmelk", "ui", "knoflook", "gember", "galanga", "citroengras", "rode peper", "kurkuma", "rijst"] },
  { id: "meal-075", name: "Gado Gado", cuisine: "Indonesian", effort: "medium", prepTime: 30, dietary: "vegetarian", description: "Indonesian salad with peanut sauce, boiled eggs, tofu, and crunchy vegetables.", ingredients: ["tofu", "eieren", "sperziebonen", "taugé", "kool", "komkommer", "pindakaas", "ketjap manis", "sambal", "kroepoek"] },
  { id: "meal-076", name: "Soto Ayam", cuisine: "Indonesian", effort: "medium", prepTime: 40, dietary: "meat", description: "Clear turmeric chicken broth with glass noodles, egg, and fried shallots.", ingredients: ["kippendijen", "kurkuma", "citroengras", "gember", "glasnoedels", "ei", "taugé", "gebakken uitjes", "sojasaus", "sambal"] },
  { id: "meal-077", name: "Tortilla Española", cuisine: "Spanish", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Thick potato-onion omelette. Warm or cold, lunch or dinner. Spain in every bite.", ingredients: ["aardappelen", "eieren", "ui", "olijfolie", "zout"] },
  { id: "meal-078", name: "Paella", cuisine: "Spanish", effort: "involved", prepTime: 50, dietary: "fish", description: "Saffron rice with prawns, mussels, and peas. Best made outdoors but the kitchen works too.", ingredients: ["paellarijst", "garnalen", "mosselen", "doperwten", "paprika", "saffraan", "knoflook", "ui", "visbouillon", "citroen"] },
  { id: "meal-079", name: "Gazpacho", cuisine: "Spanish", effort: "easy", prepTime: 15, dietary: "vegan", description: "Cold tomato soup for hot days. Blend, chill, serve. Maximum flavour, zero cooking.", ingredients: ["tomaten", "komkommer", "paprika", "knoflook", "stokbrood", "olijfolie", "sherry azijn"] },
  { id: "meal-080", name: "Slow Cooker Pulled Pork", cuisine: "American", effort: "involved", prepTime: 240, dietary: "meat", description: "Low and slow pork shoulder in BBQ sauce. Shred, pile on brioche, add coleslaw.", ingredients: ["varkensschouder", "BBQ saus", "appelciderazijn", "bruine suiker", "paprikapoeder", "brioche broodjes", "rode kool", "wortel", "mayonaise"] },
  { id: "meal-081", name: "Garnalensoep", cuisine: "American", effort: "medium", prepTime: 35, dietary: "fish", description: "Creamy New England-style soup with potatoes and dill. Rich and warming.", ingredients: ["garnalen", "aardappelen", "ui", "bleekselderij", "room", "boter", "dille", "visbouillon"] },
  { id: "meal-082", name: "Elote Bowl", cuisine: "Mexican", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "Street corn off the cob — charred corn, mayo, lime, chili, cotija. Pure joy.", ingredients: ["mais", "mayonaise", "limoen", "chilivlokken", "koriander", "feta"] },
  { id: "meal-083", name: "Thaise Salade met Pinda's", cuisine: "Thai", effort: "easy", prepTime: 15, dietary: "vegan", description: "Crunchy Thai salad with peanut-lime dressing. Fresh, spicy, and addictive.", ingredients: ["witte kool", "wortel", "komkommer", "munt", "koriander", "pinda's", "limoen", "sojasaus", "sesamolie", "rode peper"] },
  { id: "meal-084", name: "Banh Mi", cuisine: "Vietnamese", effort: "easy", prepTime: 20, dietary: "meat", description: "Crispy baguette with pork, pickled daikon, coriander, and sriracha. French-Vietnamese fusion.", ingredients: ["stokbrood", "varkensfilet", "wortel", "daikon", "komkommer", "koriander", "jalapeño", "mayonaise", "sriracha", "sojasaus"] },
  { id: "meal-085", name: "Okonomiyaki", cuisine: "Japanese", effort: "medium", prepTime: 25, dietary: "vegetarian", description: "Japanese savoury cabbage pancake topped with mayo, tonkatsu sauce, and bonito flakes. Street food royalty.", ingredients: ["kool", "bloem", "eieren", "dashi bouillon", "mayonaise", "tonkatsu saus", "lente-ui", "gember"] },
  { id: "meal-086", name: "Onigiri met Zalm", cuisine: "Japanese", effort: "easy", prepTime: 15, dietary: "fish", description: "Rice triangles filled with salted salmon and wrapped in nori. Perfect lunch or snack.", ingredients: ["sushirijst", "zalmfilet", "nori", "sesamzaad", "rijstazijn", "zout"] },
  { id: "meal-087", name: "Injera met Misir Wot", cuisine: "Ethiopian", effort: "medium", prepTime: 40, dietary: "vegan", description: "Spiced red lentil stew on spongy injera bread. Eat with your hands.", ingredients: ["rode linzen", "ui", "knoflook", "gember", "berbere kruiden", "tomatenblokjes", "injera (of platbrood)"] },
  { id: "meal-088", name: "Pierogi", cuisine: "Polish", effort: "medium", prepTime: 45, dietary: "vegetarian", description: "Filled dumplings with potato and cheese, pan-fried in butter. Eastern European soul food.", ingredients: ["bloem", "eieren", "aardappelen", "kaas", "ui", "boter", "zure room"] },
  { id: "meal-089", name: "Blini met Gerookte Zalm", cuisine: "Russian", effort: "easy", prepTime: 20, dietary: "fish", description: "Mini buckwheat pancakes topped with smoked salmon, crème fraîche, and dill.", ingredients: ["boekweitmeel", "eieren", "melk", "gerookte zalm", "crème fraîche", "dille", "citroen"] },
  { id: "meal-090", name: "Goulash", cuisine: "Hungarian", effort: "involved", prepTime: 90, dietary: "meat", description: "Paprika-rich beef stew slow-cooked until fork-tender. Serve with bread or egg noodles.", ingredients: ["runderstoofvlees", "ui", "paprikapoeder", "paprika", "tomatenblokjes", "aardappelen", "runderbouillon", "karwijzaad", "zure room"] },
  { id: "meal-091", name: "Lamb Tagine", cuisine: "Moroccan", effort: "involved", prepTime: 90, dietary: "meat", description: "Slow-cooked lamb with apricots, almonds, and warm spices. North African comfort.", ingredients: ["lamsvlees", "gedroogde abrikozen", "amandelen", "ui", "knoflook", "kaneel", "komijn", "honing", "koriander", "couscous"] },
  { id: "meal-092", name: "Harira", cuisine: "Moroccan", effort: "medium", prepTime: 40, dietary: "meat", description: "Hearty Moroccan soup with chickpeas, lentils, and lamb. Traditional Ramadan comfort.", ingredients: ["lamsgehakt", "kikkererwten", "linzen", "tomatenblokjes", "ui", "knoflook", "gember", "kurkuma", "koriander", "citroen"] },
  { id: "meal-093", name: "Saag Aloo", cuisine: "Indian", effort: "easy", prepTime: 25, dietary: "vegan", description: "Spiced spinach and potato curry. Simple, cheap, deeply satisfying.", ingredients: ["aardappelen", "spinazie", "ui", "knoflook", "gember", "kurkuma", "komijn", "garam masala", "chilipeper"] },
  { id: "meal-094", name: "Chana Masala", cuisine: "Indian", effort: "easy", prepTime: 25, dietary: "vegan", description: "Chickpeas in spicy tomato sauce with garam masala. Protein-rich and warming.", ingredients: ["kikkererwten (blik)", "tomatenblokjes", "ui", "knoflook", "gember", "garam masala", "komijn", "koriander", "citroen"] },
  { id: "meal-095", name: "Miso Ramen", cuisine: "Japanese", effort: "medium", prepTime: 30, dietary: "vegetarian", description: "Rich miso broth with ramen noodles, soft egg, corn, and butter. Cozy bowl of warmth.", ingredients: ["ramen noedels", "miso pasta", "groentebouillon", "ei", "mais", "boter", "lente-ui", "sesamzaad", "sojasaus"] },
  { id: "meal-096", name: "Oyakodon", cuisine: "Japanese", effort: "easy", prepTime: 20, dietary: "meat", description: "Chicken and egg rice bowl simmered in dashi and soy. Parent-and-child bowl — the name tells the story.", ingredients: ["kippendij", "eieren", "ui", "dashi bouillon", "sojasaus", "mirin", "rijst", "lente-ui"] },
  { id: "meal-097", name: "Vietnamese Loempia's", cuisine: "Vietnamese", effort: "medium", prepTime: 30, dietary: "vegetarian", description: "Fresh summer rolls with rice noodles, herbs, and peanut dipping sauce. Light and gorgeous.", ingredients: ["rijstpapier", "rijstnoedels", "sla", "munt", "koriander", "komkommer", "wortel", "pindakaas", "sojasaus", "limoen"] },
  { id: "meal-098", name: "Gyoza", cuisine: "Japanese", effort: "medium", prepTime: 35, dietary: "meat", description: "Pan-fried dumplings with pork and cabbage filling. Crispy bottom, juicy inside.", ingredients: ["varkensgehakt", "kool", "knoflook", "gember", "sojasaus", "sesamolie", "gyoza vellen", "rijstazijn"] },
  { id: "meal-099", name: "Arepas met Zwarte Bonen", cuisine: "Venezuelan", effort: "medium", prepTime: 30, dietary: "vegetarian", description: "Corn cakes stuffed with black beans, avocado, and cheese. South American street food.", ingredients: ["maïsmeel", "zwarte bonen", "avocado", "kaas", "koriander", "limoen", "zure room"] },
  { id: "meal-100", name: "Ceviche", cuisine: "Peruvian", effort: "easy", prepTime: 20, dietary: "fish", description: "Raw white fish 'cooked' in citrus with red onion and chili. Fresh, zesty, and elegant.", ingredients: ["witvisfilet", "limoen", "citroen", "rode ui", "koriander", "chilipeper", "zoete aardappel", "mais"] },
  { id: "meal-101", name: "Empanadas", cuisine: "Argentinian", effort: "medium", prepTime: 40, dietary: "meat", description: "Baked pastry pockets with spiced beef, olives, and egg. Perfect hand-held dinner.", ingredients: ["bladerdeeg", "gehakt", "ui", "paprika", "komijn", "groene olijven", "ei", "oregano"] },
  { id: "meal-102", name: "Poke Bowl", cuisine: "Hawaiian", effort: "easy", prepTime: 20, dietary: "fish", description: "Raw tuna over sushi rice with avocado, edamame, and soy-sesame dressing.", ingredients: ["tonijnfilet (sashimi kwaliteit)", "sushirijst", "avocado", "edamame", "komkommer", "sojasaus", "sesamolie", "sesamzaad"] },
  { id: "meal-103", name: "Zuurkoolstamppot", cuisine: "Dutch", effort: "easy", prepTime: 30, dietary: "meat", description: "Mashed potatoes with sauerkraut and rookworst. Dutch winter fuel.", ingredients: ["aardappelen", "zuurkool", "rookworst", "spekblokjes", "boter", "melk"] },
  { id: "meal-104", name: "Bruine Bonensoep", cuisine: "Dutch", effort: "medium", prepTime: 45, dietary: "meat", description: "Hearty Dutch brown bean soup with smoked sausage and rye bread.", ingredients: ["bruine bonen (blik)", "rookworst", "ui", "wortel", "bleekselderij", "spekblokjes", "runderbouillon", "roggebrood"] },
  { id: "meal-105", name: "Wentelteefjes", cuisine: "Dutch", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "Dutch French toast with cinnamon sugar. Sweet breakfast, easy dinner. No rules.", ingredients: ["oud brood", "eieren", "melk", "kaneel", "suiker", "boter"] },
  { id: "meal-106", name: "Tuna Tartaar", cuisine: "Japanese", effort: "easy", prepTime: 15, dietary: "fish", description: "Diced raw tuna with avocado, soy, and sesame. Elegant, quick, restaurant-quality.", ingredients: ["tonijnfilet (sashimi kwaliteit)", "avocado", "sojasaus", "sesamolie", "lente-ui", "sesamzaad", "wasabi"] },
  { id: "meal-107", name: "Aubergine Parmigiana", cuisine: "Italian", effort: "medium", prepTime: 45, dietary: "vegetarian", description: "Layers of fried aubergine, tomato sauce, and melting mozzarella. Italy's best bake.", ingredients: ["aubergine", "tomatenblokjes", "mozzarella", "parmezaan", "basilicum", "knoflook", "olijfolie"] },
  { id: "meal-108", name: "Khao Soi", cuisine: "Thai", effort: "medium", prepTime: 30, dietary: "meat", description: "Northern Thai coconut curry noodle soup topped with crispy noodles. Creamy meets crunchy.", ingredients: ["eiernoedels", "kipfilet", "kokosmelk", "rode currypasta", "kurkuma", "sjalot", "limoen", "koriander"] },
  { id: "meal-109", name: "Zwarte Bonensoep", cuisine: "Mexican", effort: "easy", prepTime: 25, dietary: "vegan", description: "Smoky black bean soup with cumin, lime, and avocado. One pot, big flavour.", ingredients: ["zwarte bonen (blik)", "ui", "knoflook", "komijn", "chipotle", "groentebouillon", "limoen", "avocado", "koriander"] },
  { id: "meal-110", name: "Frittata met Courgette", cuisine: "Italian", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Open-faced Italian omelette. Cook on the stove, finish under the grill. Endlessly adaptable.", ingredients: ["eieren", "courgette", "feta", "ui", "peterselie", "olijfolie"] },
  { id: "meal-111", name: "Boeuf Bourguignon", cuisine: "French", effort: "involved", prepTime: 150, dietary: "meat", description: "Burgundy beef stew with mushrooms, pearl onions, and red wine. Julia Child approved.", ingredients: ["runderstoofvlees", "rode wijn", "champignons", "zilveruitjes", "spekblokjes", "wortel", "ui", "knoflook", "tijm", "runderbouillon"] },
  { id: "meal-112", name: "Jiaozi", cuisine: "Chinese", effort: "medium", prepTime: 40, dietary: "meat", description: "Hand-folded dumplings with pork-ginger filling. Boiled or pan-fried. Meditative to make.", ingredients: ["varkensgehakt", "kool", "gember", "knoflook", "sojasaus", "sesamolie", "dumpling vellen", "rijstazijn", "chili olie"] },
  { id: "meal-113", name: "Kung Pao Tofu", cuisine: "Chinese", effort: "easy", prepTime: 20, dietary: "vegan", description: "Crispy tofu in spicy-sweet Sichuan sauce with peanuts. Takeaway at home.", ingredients: ["tofu", "pinda's", "paprika", "rode peper", "sojasaus", "rijstazijn", "honing", "knoflook", "rijst"] },
  { id: "meal-114", name: "Gnocchi all'Arrabbiata", cuisine: "Italian", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "Gnocchi in spicy tomato sauce with garlic and chili. 15 minutes from packet to plate.", ingredients: ["gnocchi (kant-en-klaar)", "tomatenblokjes", "knoflook", "rode peper vlokken", "basilicum", "olijfolie", "parmezaan"] },
  { id: "meal-115", name: "Muhammara", cuisine: "Middle Eastern", effort: "easy", prepTime: 15, dietary: "vegan", description: "Roasted red pepper and walnut dip. Smoky, sweet, nutty. Scoop with warm pita.", ingredients: ["geroosterde paprika", "walnoten", "paneermeel", "granaatappelmelasse", "komijn", "knoflook", "olijfolie", "pitabrood"] },
  { id: "meal-116", name: "Orzo Salade", cuisine: "Greek", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Orzo pasta salad with tomato, cucumber, olive, and feta. Mediterranean in a bowl.", ingredients: ["orzo", "cherry tomaten", "komkommer", "rode ui", "kalamata olijven", "feta", "oregano", "citroen", "olijfolie"] },
  { id: "meal-117", name: "Currywurst", cuisine: "German", effort: "easy", prepTime: 15, dietary: "meat", description: "Berlin street food: bratwurst with curry ketchup and fries. Guilty pleasure.", ingredients: ["braadworst", "ketchup", "currypoeder", "paprikapoeder", "ui", "friet"] },
  { id: "meal-118", name: "Koreaanse Fried Chicken Bowl", cuisine: "Korean", effort: "medium", prepTime: 35, dietary: "meat", description: "Crispy fried chicken tossed in gochujang glaze with pickled radish over rice.", ingredients: ["kippendijen", "maizena", "gochujang", "honing", "sojasaus", "knoflook", "sesamzaad", "rijst", "ingelegde radijs"] },
  { id: "meal-119", name: "Dal Makhani", cuisine: "Indian", effort: "medium", prepTime: 40, dietary: "vegan", description: "Creamy black lentil dal slow-cooked with tomato and spices. Rich enough to feel indulgent.", ingredients: ["zwarte linzen", "kidneybonen", "tomatenblokjes", "ui", "knoflook", "gember", "garam masala", "komijn", "naanbrood"] },
  { id: "meal-120", name: "Panzanella", cuisine: "Italian", effort: "easy", prepTime: 15, dietary: "vegan", description: "Tuscan bread salad with ripe tomatoes, red onion, and basil. Best with stale bread.", ingredients: ["oud ciabatta", "tomaten", "rode ui", "komkommer", "basilicum", "kappertjes", "rode wijn azijn", "olijfolie"] },
  { id: "meal-121", name: "Broodje Steak met Biermosterd", cuisine: "Dutch", effort: "involved", prepTime: 60, dietary: "meat", description: "Steak ciabatta with homemade beer mustard, caramelised onion relish, and cheddar. A pub classic, elevated.", ingredients: ["bieflapppen", "ciabatta", "mosterd", "bier", "honing", "cheddar", "rucola", "mayonaise", "ui"] },
  { id: "meal-122", name: "Gegrilde Broccoli met Green Goddess Dressing", cuisine: "Mediterranean", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Charred broccoli with a creamy basil-anchovy-yoghurt dressing. Simple side that steals the show.", ingredients: ["broccoli", "knoflook", "Griekse yoghurt", "mayonaise", "ansjovis", "basilicum", "olijfolie", "citroen"] },
  { id: "meal-123", name: "Gebakken Gnocchi met Pesto en Broccoli", cuisine: "Italian", effort: "easy", prepTime: 20, dietary: "meat", description: "Pan-fried gnocchi with pesto alla Genovese, sausage, cherry tomatoes, and broccoli. Quick Italian comfort.", ingredients: ["gnocchi", "pesto", "kipbraadworst", "cherry tomaten", "broccoli", "parmezaan", "olijfolie"] },
  { id: "meal-124", name: "Aubergine-Fetaquiche", cuisine: "Mediterranean", effort: "medium", prepTime: 55, dietary: "vegetarian", description: "Roasted aubergine quiche with feta and yoghurt-almond crust. A vega showstopper with Mediterranean flair.", ingredients: ["aubergine", "feta", "Griekse yoghurt", "amandelmeel", "bloem", "eieren", "knoflook", "tijm", "olijfolie"] },
  { id: "meal-125", name: "Pompoenrisotto", cuisine: "Italian", effort: "medium", prepTime: 35, dietary: "vegetarian", description: "Creamy pumpkin risotto with white wine and parmigiano. Autumn in a bowl, finished with hazelnut crunch.", ingredients: ["flespompoen", "risottorijst", "sjalot", "witte wijn", "groentebouillon", "parmezaan", "boter", "hazelnoten"] },
  { id: "meal-126", name: "Shakshuka met Volkorenbrood", cuisine: "Middle Eastern", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Colourful shakshuka with mixed peppers and free-range eggs. Healthy, vibrant, and scoopable with bread.", ingredients: ["eieren", "puntpaprika's", "tomatenblokjes", "rode ui", "olijfolie", "volkorenbrood"] },
  { id: "meal-127", name: "Tarte à la Ratatouille", cuisine: "French", effort: "medium", prepTime: 50, dietary: "vegetarian", description: "Thin squares of puff pastry loaded with caramelised onion, courgette, aubergine, and tomato. Elegant vega.", ingredients: ["bladerdeeg", "tomaten", "courgette", "aubergine", "ui", "rozemarijn", "olijven", "olijfolie", "tijm"] },
  { id: "meal-128", name: "Turks Brood met Tonijnsalade", cuisine: "Mediterranean", effort: "easy", prepTime: 15, dietary: "fish", description: "Warm Turkish bread loaded with tuna salad, avocado cream, spek, and iceberg. A loaded lunch hero.", ingredients: ["tonijn", "Turks brood", "avocado", "spekjes", "ijsbergsla", "tomaat", "yoghurt", "limoen", "chilivlokken"] },
  { id: "meal-129", name: "Rijst met Groenten, Gerookte Forel & Yoghurt", cuisine: "Mediterranean", effort: "easy", prepTime: 20, dietary: "fish", description: "Wild rice tossed with kale, broccoli, and flaked smoked trout. Ras el hanout warmth, yoghurt cool.", ingredients: ["wilde rijst", "gerookte forel", "boerenkool", "broccoli", "sjalot", "knoflook", "ras el hanout", "citroen", "yoghurt"] },
  { id: "meal-130", name: "One Pot Gnocchi met Burrata", cuisine: "Italian", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Gnocchi baked with cherry tomatoes, rosemary, and pistachio pesto. Topped with creamy burrata.", ingredients: ["gnocchi", "cherry tomaten", "burrata", "pistachenoten", "parmezaan", "knoflook", "rozemarijn", "paprika", "olijfolie"] },
  { id: "meal-131", name: "Risoni met Venkelgehaktballetjes", cuisine: "Italian", effort: "medium", prepTime: 35, dietary: "meat", description: "Fennel sausage meatballs in tomato sauce with risoni pasta and herb gremolata. Rustic Italian soul food.", ingredients: ["varkenssaucijzen", "risoni", "gepelde tomaten", "tomatenpuree", "ui", "knoflook", "parmezaan", "peterselie", "basilicum", "citroen"] },
  { id: "meal-132", name: "Avocadotoast met Gepocheerd Ei", cuisine: "International", effort: "easy", prepTime: 15, dietary: "vegetarian", description: "The brunch classic done right — crusty bread, ripe avocado, runny egg, sriracha drizzle, and black sesame.", ingredients: ["brood", "avocado", "eieren", "sriracha", "zwarte sesamzaad", "tuinkers", "olijfolie"] },
  { id: "meal-133", name: "Groene Asperges met Rauwe Ham", cuisine: "Italian", effort: "easy", prepTime: 25, dietary: "meat", description: "Blanched asparagus wrapped in prosciutto, roasted with parmesan until crispy. Seasonal and elegant.", ingredients: ["groene asperges", "rauwe ham", "parmezaan", "knoflook", "peterselie", "citroen", "olijfolie"] },
  { id: "meal-134", name: "Romige Auberginecurry", cuisine: "Indian", effort: "medium", prepTime: 90, dietary: "vegan", description: "Slow-roasted aubergine in creamy coconut-tomato curry with tandoori spices. Vegan butter chicken vibes.", ingredients: ["aubergine", "kokosmelk", "tomatenblokjes", "ui", "knoflook", "gember", "kurkuma", "komijn", "garam masala", "tandooripasta", "roti"] },
  { id: "meal-135", name: "Shakshuka met Lamsgehakt & Feta", cuisine: "Middle Eastern", effort: "medium", prepTime: 45, dietary: "meat", description: "Smoky lamb mince shakshuka with black beans, chipotle, and crumbled feta. Baked eggs on top. Bold brunch.", ingredients: ["lamsgehakt", "eieren", "feta", "zwarte bonen", "tomatenblokjes", "courgette", "wortel", "knoflook", "chipotle", "komijn", "koriander"] },
  { id: "meal-136", name: "Marokkaanse Rijst met Kruidig Lamsvlees", cuisine: "Moroccan", effort: "involved", prepTime: 60, dietary: "meat", description: "Spiced basmati with ras el hanout, preserved lemon, and grilled lamb. Harissa yoghurt on the side.", ingredients: ["lamsfilet", "basmatirijst", "ras el hanout", "kurkuma", "gember", "knoflook", "tomatenpuree", "ingemaakte citroen", "peterselie", "yoghurt", "harissa", "pijnboompitten"] },
  { id: "meal-137", name: "Quiche met Zalm, Courgette en Bietjes", cuisine: "French", effort: "medium", prepTime: 55, dietary: "fish", description: "Colourful quiche with smoked salmon, courgette ribbons, and roasted beets. Light, elegant, picnic-ready.", ingredients: ["bladerdeeg", "gerookte zalm", "courgette", "rode bieten", "eieren", "Griekse yoghurt", "kaas", "rozemarijn", "bieslook"] },
  { id: "meal-138", name: "Tortilla met Zwarte Bonen", cuisine: "Mexican", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Soft gordita wraps with spiced black beans, tomato, and iceberg. Three variations: jalapeño, cheese, or chorizo.", ingredients: ["zwarte bonen", "tortilla's", "tomaten", "ijsbergsla", "rode ui", "jalapeño", "mais", "kaas", "olijfolie"] },
  { id: "meal-139", name: "Pasta Primavera met Ricotta", cuisine: "Italian", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Fettuccine with courgette, leek, and herbs in crème fraîche-mustard sauce. Topped with ricotta and oregano.", ingredients: ["fettuccine", "courgette", "prei", "knoflook", "crème fraîche", "dijonmosterd", "ricotta", "oregano", "dille", "witte wijn"] },
  { id: "meal-140", name: "Soep van Geroosterde Tomaat & Paprika", cuisine: "Mediterranean", effort: "medium", prepTime: 80, dietary: "vegetarian", description: "Oven-roasted tomato and pepper soup with homemade pesto and crispy pangrattato. Rich, smoky, satisfying.", ingredients: ["tomaten", "rode paprika", "ui", "knoflook", "groentebouillon", "basilicum", "pijnboompitten", "parmezaan", "broodkruimels", "olijfolie"] },
  { id: "meal-141", name: "Orzo met Aubergine, Spinazie & Feta", cuisine: "Greek", effort: "easy", prepTime: 30, dietary: "vegetarian", description: "Kritharaki with pan-fried aubergine, wilted spinach, olives, and marinated feta. Greek weeknight hero.", ingredients: ["orzo", "aubergine", "spinazie", "feta", "kalamata olijven", "knoflook", "citroen", "korianderzaad", "rode peper", "tijm", "paprikapoeder"] },
  { id: "meal-142", name: "Filipijnse Aubergine-Omelet", cuisine: "Filipino", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Charred aubergine halves battered and fried like an omelet. Crispy outside, smoky inside. Filipino street food.", ingredients: ["aubergine", "eieren", "sojasaus", "koriander", "olie"] },
  { id: "meal-143", name: "Aubergine Wok met Tahinsaus", cuisine: "Middle Eastern", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Stir-fried aubergine with tahini sauce. Ottolenghi-inspired, nutty, and deeply savoury.", ingredients: ["aubergine", "tahini", "knoflook", "citroen", "sojasaus", "sesamzaad", "koriander", "olijfolie"] },
  { id: "meal-144", name: "Gegratineerde Pastaschelpen met Pompoensaus", cuisine: "Italian", effort: "medium", prepTime: 65, dietary: "vegetarian", description: "Giant pasta shells gratinéed with pumpkin-tomato sauce, pecorino, and za'atar. Oven-baked Italian comfort.", ingredients: ["pastaschelpen (conchiglioni)", "flespompoen", "tomatenblokjes", "pecorino", "za'atar", "knoflook", "ui", "zuurdesembrood", "olijfolie"] },
  { id: "meal-145", name: "Orzo met Tomatensalade en Parmaham", cuisine: "Italian", effort: "easy", prepTime: 25, dietary: "meat", description: "Warm orzo tossed with baked cherry tomatoes, crispy parmaham, pijnboompitten, and fresh basil. Summer pasta salad.", ingredients: ["orzo", "parmaham", "cherry tomaten", "trostomaten", "pijnboompitten", "basilicum", "knoflook", "balsamico", "olijfolie"] },
  { id: "meal-146", name: "Zalm en Croûte met Wittewijnsaus", cuisine: "French", effort: "involved", prepTime: 90, dietary: "fish", description: "Salmon wrapped in puff pastry with mushroom-mascarpone filling and silky white wine sauce. Dinner party centrepiece.", ingredients: ["zalmfilet", "bladerdeeg", "paddenstoelen", "mascarpone", "sjalot", "witte wijn", "slagroom", "visbouillon", "dragon", "bieslook", "rucola"] },
  { id: "meal-147", name: "Geroosterde Aardappels met Aioli", cuisine: "Mediterranean", effort: "easy", prepTime: 35, dietary: "vegetarian", description: "Crispy halved new potatoes with homemade aioli, parsley, and smoked paprika. Addictive side or light meal.", ingredients: ["krieltjes", "knoflook", "ei", "olijfolie", "zonnebloemolie", "citroen", "dijonmosterd", "peterselie", "pijnboompitten", "paprikapoeder"] },
  { id: "meal-148", name: "Citroenrisotto met Groene Asperges", cuisine: "Italian", effort: "medium", prepTime: 40, dietary: "vegetarian", description: "Bright lemon risotto with grilled asparagus, poached egg, and feta crumble. Spring in a bowl.", ingredients: ["risottorijst", "groene asperges", "citroen", "groentebouillon", "feta", "eieren", "ui", "witte wijn", "boter", "pompoenpitten"] },
  { id: "meal-149", name: "Granaatappelkip met Watermeloensalade", cuisine: "Middle Eastern", effort: "medium", prepTime: 60, dietary: "meat", description: "BBQ chicken glazed with pomegranate molasses and sumac. Served with watermelon-halloumi salad.", ingredients: ["hele kip", "granaatappelmelasse", "sumak", "halloumi", "watermeloen", "munt", "koriander", "rode ui", "radijs", "citroen"] },
  { id: "meal-150", name: "Pikante Kip met Venkeltabouleh", cuisine: "Middle Eastern", effort: "medium", prepTime: 60, dietary: "meat", description: "Spatchcocked spiced chicken with halloumi and a fresh fennel-bulgur tabouleh. Bold, herby, and filling.", ingredients: ["hele kip", "paprikapoeder", "knoflook", "halloumi", "venkel", "bulgur", "tomaten", "basilicum", "munt", "citroen"] },
  { id: "meal-151", name: "Groene Asperges met Ei en Avocado", cuisine: "Mediterranean", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Roasted asparagus with boiled eggs, avocado, and cherry tomatoes. Fresh, light, and endlessly springy.", ingredients: ["groene asperges", "eieren", "avocado", "kerstomaten", "peterselie", "citroen", "olijfolie"] },
  { id: "meal-152", name: "Misoramen met Shoyu Tamago", cuisine: "Japanese", effort: "medium", prepTime: 40, dietary: "meat", description: "Rich miso broth ramen with soy-marinated eggs, pork, shiitake, and greens. Weekend noodle project.", ingredients: ["ramen noedels", "miso pasta", "sojasaus", "sake", "mirin", "eieren", "varkensbuik", "shiitake", "paksoi", "gember", "knoflook", "sesamolie"] },
  { id: "meal-153", name: "Sushibowl met Mango en Rodekool", cuisine: "Japanese", effort: "easy", prepTime: 45, dietary: "vegetarian", description: "Colourful sushi rice bowl with mango, red cabbage, edamame, and teriyaki pulled chicken. A bowl of joy.", ingredients: ["sushirijst", "rodekool", "mango", "komkommer", "sojabonen", "vegetarische pulled chicken", "teriyaki saus", "rijstazijn", "poké sprinkle"] },
  { id: "meal-154", name: "Zoete-Aardappeltoast met Asperges en Zalm", cuisine: "International", effort: "easy", prepTime: 30, dietary: "fish", description: "Sweet potato slices as toast, topped with ricotta, asparagus, and smoked salmon. Gluten-free elegance.", ingredients: ["zoete aardappel", "groene asperges", "gerookte zalm", "ricotta", "citroen", "olijfolie"] },
  { id: "meal-155", name: "Tostada's met Gehakt en Kaas", cuisine: "Mexican", effort: "easy", prepTime: 15, dietary: "meat", description: "Crispy mini tortillas with spiced chicken mince, cheddar, salsa, radish, and lime. Mexican street food at home.", ingredients: ["kipgehakt", "tortilla's", "cheddar", "salsa", "tomatenpuree", "radijs", "koriander", "limoen"] },
  { id: "meal-156", name: "Pasta met Groene Asperges en Pangrattato", cuisine: "Italian", effort: "easy", prepTime: 25, dietary: "fish", description: "Spaghetti with asparagus, anchovy, garlic, and fennel-seed breadcrumbs. Simple Italian springtime pasta.", ingredients: ["spaghetti", "groene asperges", "ansjovis", "knoflook", "chilivlokken", "witte wijn", "parmezaan", "desembrood", "venkelzaad"] },
  { id: "meal-157", name: "Tortillatosti met Avocado en Feta", cuisine: "Mexican", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Grilled tortilla quesadilla with avocado, feta, cheddar, jalapeño, and a roasted corn salsa on the side.", ingredients: ["tortilla's", "avocado", "feta", "cheddar", "jalapeño", "mais", "koriander", "limoen", "zwartebonenspread"] },
  { id: "meal-158", name: "BBQ Vegetarische Wraps", cuisine: "Mexican", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Grilled wraps with black beans, cheddar, salsa, and spring onion. Quick BBQ side or light meal.", ingredients: ["tortilla wraps", "zwarte bonen", "cheddar", "salsa", "bosui", "zure room"] },
  { id: "meal-159", name: "Orzo uit de Oven met Pompoen en Gorgonzola", cuisine: "Italian", effort: "easy", prepTime: 45, dietary: "vegetarian", description: "Baked orzo with roasted pumpkin, gorgonzola, and toasted pecans. Scandalously good autumn comfort.", ingredients: ["orzo", "flespompoen", "gorgonzola", "pecannoten", "sjalot", "knoflook", "rozemarijn", "nootmuskaat", "paddenstoelenbouillon", "olijfolie"] },
  { id: "meal-160", name: "Bagel met Ei, Spinazie en Pesto", cuisine: "International", effort: "easy", prepTime: 20, dietary: "vegetarian", description: "Toasted bagel with pesto, baby spinach, boiled egg, and sun-dried tomatoes. The perfect quick lunch.", ingredients: ["bagels", "eieren", "babyspinazie", "groene pesto", "zongedroogde tomaten"] },
  { id: "meal-161", name: "Giouvetsi met Kikkererwten", cuisine: "Greek", effort: "easy", prepTime: 45, dietary: "vegetarian", description: "Greek oven-baked orzo with chickpeas, tomato, feta, and dill. One dish, big flavours, zero effort.", ingredients: ["orzo", "kikkererwten", "gepelde tomaten", "ui", "knoflook", "winterpeen", "feta", "dille", "oregano", "citroen", "groentebouillon"] },
  { id: "meal-162", name: "BBQ Lamskoteletjes met Salsa Verde", cuisine: "Italian", effort: "medium", prepTime: 35, dietary: "meat", description: "Grilled lamb chops with herbaceous salsa verde of broccolini, mint, capers, and anchovy.", ingredients: ["lamskoteletjes", "broccolini", "munt", "peterselie", "basilicum", "kappertjes", "ansjovis", "dijonmosterd", "rodewijnazijn", "olijfolie"] },
  { id: "meal-163", name: "Dumplings met Varkensgehakt", cuisine: "Chinese", effort: "medium", prepTime: 45, dietary: "meat", description: "Hand-folded wontons with pork-ginger-chive filling. Boiled and served with soy-chili dipping sauce.", ingredients: ["varkensgehakt", "knoflook", "gember", "bieslook", "wontonvellen", "sojasaus", "rijstazijn", "chili olie"] },
  { id: "meal-164", name: "BBQ Zalm met Venkel", cuisine: "Mediterranean", effort: "medium", prepTime: 45, dietary: "fish", description: "Whole side of salmon grilled on the BBQ with blanched fennel, herbs, mint, and parmesan.", ingredients: ["zalm", "venkel", "peterselie", "munt", "knoflook", "parmezaan", "citroen", "boter", "olijfolie"] },
  { id: "meal-165", name: "Pastasalade met Gegrilde Perziken", cuisine: "Italian", effort: "easy", prepTime: 30, dietary: "vegetarian", description: "Fusilli salad with charred peaches, blue cheese, olives, and almonds. Sweet-savoury BBQ side.", ingredients: ["fusilli", "perziken", "blauwe kaas", "olijven", "amandelschaafsel", "citroen", "olijfolie", "peterselie"] },
  { id: "meal-166", name: "Aubergine met Knoflookyoghurt en Harissaboter", cuisine: "Middle Eastern", effort: "medium", prepTime: 60, dietary: "vegetarian", description: "Whole roasted aubergine split open with garlicky yoghurt and spicy harissa butter. Serve with flatbread.", ingredients: ["aubergine", "Griekse yoghurt", "knoflook", "boter", "harissa", "koriander", "sesamzaad", "olijfolie"] },
  { id: "meal-167", name: "Sushibowl met BBQ Kikkererwten", cuisine: "International", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Rice bowl with BBQ-roasted chickpeas, avocado, corn, carrot, and creamy yoghurt-parsley dressing.", ingredients: ["basmatirijst", "kikkererwten", "BBQ saus", "mais", "winterpeen", "avocado", "yoghurt", "peterselie", "knoflook", "olijfolie"] },
  { id: "meal-168", name: "BBQ Geroosterde Bloemkool met Bacon", cuisine: "American", effort: "involved", prepTime: 120, dietary: "meat", description: "Whole cauliflower slow-roasted on the BBQ with bacon, cream sauce, and parmesan. Dramatic showstopper.", ingredients: ["bloemkool", "bacon", "rode ui", "slagroom", "parmezaan", "rozemarijn", "citroen", "olijfolie"] },
  { id: "meal-169", name: "Pastasalade met Gegrilde Meloen en Prosciutto", cuisine: "Italian", effort: "easy", prepTime: 25, dietary: "meat", description: "Fusilli with grilled cantaloupe, prosciutto, sugar snaps, and rucola-lemon dressing. Summer perfection.", ingredients: ["fusilli", "cantaloupe meloen", "prosciutto", "peultjes", "rucola", "grana padano", "rode ui", "balsamico", "citroen", "olijfolie"] },
  { id: "meal-170", name: "Kidneybonen-Tomatencurry met Spinazie", cuisine: "Indian", effort: "easy", prepTime: 30, dietary: "vegetarian", description: "Red kidney bean curry with tomato, coconut milk, and spinach. Protein-rich, warming, and served with naan.", ingredients: ["kidneybonen", "tomatenblokjes", "kokosmelk", "spinazie", "rode ui", "gember", "knoflook", "garam masala", "limoen", "naanbrood", "basmatirijst"] },
  { id: "meal-171", name: "Gnocchi met Geroosterde Broccoli en Geitenkaas", cuisine: "Italian", effort: "easy", prepTime: 30, dietary: "vegetarian", description: "Pan-fried gnocchi with oven-roasted broccoli and crumbled goat cheese. Drizzle with balsamic. Simple magic.", ingredients: ["gnocchi", "broccoli", "geitenkaas", "ui", "olijfolie", "balsamico"] },
  { id: "meal-172", name: "Aardappelscones met Bieslook", cuisine: "British", effort: "medium", prepTime: 45, dietary: "vegetarian", description: "Fluffy potato scones with sour cream, chives, and black pepper. Pan-fried until golden. Serve with spek.", ingredients: ["aardappelen", "bloem", "boter", "zure room", "bieslook", "zwarte peper"] },
  { id: "meal-173", name: "BBQ Bloemkool met Muhammara", cuisine: "Middle Eastern", effort: "medium", prepTime: 70, dietary: "vegan", description: "Charred cauliflower with smoky muhammara dip, za'atar, walnuts, and pomegranate. Vegan BBQ centrepiece.", ingredients: ["bloemkool", "rode paprika", "walnoten", "granaatappelmelasse", "broodkruimels", "tomatenpuree", "Aleppo peper", "za'atar", "munt", "bieslook", "citroen", "olijfolie"] },
  { id: "meal-174", name: "Pasta met Aubergine en Tahin", cuisine: "Middle Eastern", effort: "easy", prepTime: 25, dietary: "vegetarian", description: "Ottolenghi-inspired pasta with roasted aubergine and creamy tahini sauce. Nutty, rich, and moreish.", ingredients: ["pasta", "aubergine", "tahini", "knoflook", "citroen", "peterselie", "olijfolie", "parmezaan"] },
  { id: "meal-175", name: "Pasteitjes met Pompoencurry", cuisine: "Indian", effort: "medium", prepTime: 40, dietary: "vegetarian", description: "Crispy puff pastry pockets filled with pumpkin-potato curry and served with komkommer raita and naan.", ingredients: ["bladerdeeg", "pompoen", "aardappelen", "curry madras", "tomatenpuree", "kokosmelk", "doperwten", "komkommer", "yoghurt", "munt", "naanbrood"] },
  { id: "meal-176", name: "Chicken Over Rice", cuisine: "American", effort: "medium", prepTime: 35, dietary: "meat", description: "NYC halal cart-style. Spiced chicken strips on yellow rice with a creamy white sauce. Better than standing in line.", ingredients: ["kipfilet", "basmati rijst", "kippenbouillon", "mayonaise", "Griekse yoghurt", "rijstazijn", "komijn", "oregano", "paprikapoeder", "koriander", "knoflook", "citroen", "boter"] },
];

// ========== MOVIES DATA (from movies.json) ==========
const MOVIES = [
  { id: "movie-001", title: "The Grand Budapest Hotel", year: 2014, genre: "Comedy", mood: "light", runtime: 99, pitch: "A concierge and his lobby boy get tangled in art theft, murder, and pastry. Peak Wes Anderson.", streaming: ["Disney+"] },
  { id: "movie-002", title: "Parasite", year: 2019, genre: "Thriller", mood: "intense", runtime: 132, pitch: "A poor family schemes their way into a rich household. Then the basement opens.", streaming: ["Amazon Prime"] },
  { id: "movie-003", title: "Everything Everywhere All at Once", year: 2022, genre: "Sci-Fi", mood: "thought-provoking", runtime: 139, pitch: "A laundromat owner discovers she can access every version of herself across the multiverse. Chaotic, emotional, brilliant.", streaming: ["Amazon Prime"] },
  { id: "movie-004", title: "In Bruges", year: 2008, genre: "Comedy", mood: "funny", runtime: 107, pitch: "Two hitmen hide out in Bruges and hate everything about it. Profane, dark, unexpectedly moving.", streaming: ["Disney+"] },
  { id: "movie-005", title: "The Shawshank Redemption", year: 1994, genre: "Drama", mood: "thought-provoking", runtime: 142, pitch: "A wrongly imprisoned banker slowly, quietly engineers the most satisfying escape in cinema.", streaming: ["Netflix"] },
  { id: "movie-006", title: "Jojo Rabbit", year: 2019, genre: "Comedy", mood: "funny", runtime: 108, pitch: "A Nazi boy discovers his mother is hiding a Jewish girl. His imaginary friend is Hitler. It works.", streaming: ["Disney+"] },
  { id: "movie-007", title: "Arrival", year: 2016, genre: "Sci-Fi", mood: "thought-provoking", runtime: 116, pitch: "A linguist tries to communicate with aliens. The twist reframes the entire film — and how you think about time.", streaming: ["Amazon Prime"] },
  { id: "movie-008", title: "The Banshees of Inisherin", year: 2022, genre: "Drama", mood: "thought-provoking", runtime: 114, pitch: "A man's best friend suddenly stops talking to him on a small Irish island. Funnier and darker than it sounds.", streaming: ["Disney+"] },
  { id: "movie-009", title: "Mad Max: Fury Road", year: 2015, genre: "Action", mood: "intense", runtime: 120, pitch: "A two-hour car chase across a post-apocalyptic desert. The most beautiful action film ever made.", streaming: ["HBO Max"] },
  { id: "movie-010", title: "The Big Lebowski", year: 1998, genre: "Comedy", mood: "funny", runtime: 117, pitch: "The Dude's rug gets peed on. Everything escalates from there. The Coen brothers at their most absurd.", streaming: ["Netflix"] },
  { id: "movie-011", title: "Whiplash", year: 2014, genre: "Drama", mood: "intense", runtime: 107, pitch: "A jazz drummer and his abusive teacher wage psychological war. You'll feel your pulse in your fingertips.", streaming: ["Netflix"] },
  { id: "movie-012", title: "Knives Out", year: 2019, genre: "Mystery", mood: "light", runtime: 130, pitch: "A wealthy patriarch dies, every family member is suspect, and Daniel Craig has a Southern accent. Pure fun.", streaming: ["Amazon Prime"] },
  { id: "movie-013", title: "Moonlight", year: 2016, genre: "Drama", mood: "thought-provoking", runtime: 111, pitch: "Three chapters of a Black man's life in Miami. Quiet, devastating, luminous.", streaming: ["Amazon Prime"] },
  { id: "movie-014", title: "Hunt for the Wilderpeople", year: 2016, genre: "Comedy", mood: "light", runtime: 101, pitch: "A foster kid and his grumpy uncle go on the run in the New Zealand bush. Taika Waititi's warmest film.", streaming: ["Amazon Prime"] },
  { id: "movie-015", title: "Inception", year: 2010, genre: "Sci-Fi", mood: "intense", runtime: 148, pitch: "Thieves who steal secrets from dreams attempt to plant an idea instead. Dreams within dreams within dreams.", streaming: ["Netflix"] },
  { id: "movie-016", title: "The Farewell", year: 2019, genre: "Drama", mood: "thought-provoking", runtime: 100, pitch: "A Chinese-American family stages a wedding to say goodbye to their dying grandmother — without telling her.", streaming: ["Amazon Prime"] },
  { id: "movie-017", title: "Superbad", year: 2007, genre: "Comedy", mood: "funny", runtime: 113, pitch: "Two high school friends try to buy alcohol for a party before graduation. Still the gold standard for teen comedy.", streaming: ["Netflix"] },
  { id: "movie-018", title: "No Country for Old Men", year: 2007, genre: "Thriller", mood: "intense", runtime: 122, pitch: "A hunter finds drug money in the desert. The man coming after him has a cattle bolt. Best villain ever committed to film.", streaming: ["Amazon Prime"] },
  { id: "movie-019", title: "Amélie", year: 2001, genre: "Romance", mood: "light", runtime: 122, pitch: "A shy Parisian waitress orchestrates small miracles for the people around her. Pure cinematic joy.", streaming: ["Amazon Prime"] },
  { id: "movie-020", title: "The Social Network", year: 2010, genre: "Drama", mood: "thought-provoking", runtime: 120, pitch: "The founding of Facebook as a story about ambition, betrayal, and loneliness. Sorkin's sharpest script.", streaming: ["Netflix"] },
  { id: "movie-021", title: "Portrait of a Lady on Fire", year: 2019, genre: "Drama", mood: "thought-provoking", runtime: 122, pitch: "A painter falls in love with the woman she's been commissioned to paint. Every frame is a painting itself.", streaming: ["MUBI"] },
  { id: "movie-022", title: "Spider-Man: Into the Spider-Verse", year: 2018, genre: "Animation", mood: "light", runtime: 117, pitch: "Miles Morales meets every Spider-Person from every universe. The most visually inventive animated film in years.", streaming: ["Netflix"] },
  { id: "movie-023", title: "Zodiac", year: 2007, genre: "Thriller", mood: "intense", runtime: 157, pitch: "The Zodiac killer investigation consumes everyone who touches it. Fincher's most obsessive film about obsession.", streaming: ["Amazon Prime"] },
  { id: "movie-024", title: "The Nice Guys", year: 2016, genre: "Comedy", mood: "funny", runtime: 116, pitch: "A PI and an enforcer investigate a missing girl in 1977 LA. Gosling and Crowe have perfect chemistry.", streaming: ["HBO Max"] },
  { id: "movie-025", title: "Interstellar", year: 2014, genre: "Sci-Fi", mood: "thought-provoking", runtime: 169, pitch: "A farmer-astronaut searches for a new home for humanity. The docking scene. The bookshelf scene. That wave.", streaming: ["Amazon Prime"] },
  { id: "movie-026", title: "Lady Bird", year: 2017, genre: "Drama", mood: "light", runtime: 94, pitch: "A Sacramento teen fights with her mom, falls in love badly, and figures out who she is. Greta Gerwig's debut.", streaming: ["Netflix"] },
  { id: "movie-027", title: "Sicario", year: 2015, genre: "Thriller", mood: "intense", runtime: 121, pitch: "An FBI agent gets pulled into the shadow war on the Mexican border. The tunnel sequence is cinema at its tensest.", streaming: ["Netflix"] },
  { id: "movie-028", title: "The Intouchables", year: 2011, genre: "Comedy", mood: "light", runtime: 112, pitch: "A wealthy quadriplegic hires a charismatic ex-con as his caretaker. French feel-good done right.", streaming: ["Netflix"] },
  { id: "movie-029", title: "Ex Machina", year: 2014, genre: "Sci-Fi", mood: "intense", runtime: 108, pitch: "A programmer is invited to test whether an AI is truly conscious. The AI has other plans.", streaming: ["Amazon Prime"] },
  { id: "movie-030", title: "The Truman Show", year: 1998, genre: "Drama", mood: "thought-provoking", runtime: 103, pitch: "A man's entire life is a TV show and he doesn't know it. Jim Carrey's finest dramatic performance.", streaming: ["Amazon Prime"] },
  { id: "movie-031", title: "Capernaum", year: 2018, genre: "Drama", mood: "intense", runtime: 126, pitch: "A 12-year-old Lebanese boy sues his parents for giving him life. Gut-wrenching and unforgettable.", streaming: ["Amazon Prime"] },
  { id: "movie-032", title: "Game Night", year: 2018, genre: "Comedy", mood: "funny", runtime: 100, pitch: "A murder mystery party becomes an actual kidnapping. Nobody can tell the difference. Smarter than it has any right to be.", streaming: ["Netflix"] },
  { id: "movie-033", title: "Dune", year: 2021, genre: "Sci-Fi", mood: "intense", runtime: 155, pitch: "Desert planet, giant worms, political intrigue, a chosen one who maybe shouldn't be. Villeneuve makes it feel like a painting.", streaming: ["HBO Max"] },
  { id: "movie-034", title: "Marriage Story", year: 2019, genre: "Drama", mood: "thought-provoking", runtime: 137, pitch: "A couple navigates divorce with love, lawyers, and the argument scene that will haunt you.", streaming: ["Netflix"] },
  { id: "movie-035", title: "What We Do in the Shadows", year: 2014, genre: "Comedy", mood: "funny", runtime: 86, pitch: "Vampire flatmates in Wellington deal with chores, nightclub bouncers, and not being invited inside. A mockumentary masterpiece.", streaming: ["Amazon Prime"] },
  { id: "movie-036", title: "The Prestige", year: 2006, genre: "Thriller", mood: "intense", runtime: 130, pitch: "Two rival magicians destroy each other trying to create the ultimate illusion. Watch it twice.", streaming: ["Netflix"] },
  { id: "movie-037", title: "Past Lives", year: 2023, genre: "Drama", mood: "thought-provoking", runtime: 105, pitch: "Two childhood sweethearts from Seoul reconnect 24 years later in New York. The final scene is devastating.", streaming: ["Amazon Prime"] },
  { id: "movie-038", title: "Coco", year: 2017, genre: "Animation", mood: "light", runtime: 105, pitch: "A boy travels to the Land of the Dead to find his great-grandfather. You will cry. Everyone cries.", streaming: ["Disney+"] },
  { id: "movie-039", title: "Prisoners", year: 2013, genre: "Thriller", mood: "intense", runtime: 153, pitch: "Two girls disappear. Hugh Jackman takes matters into his own hands. Villeneuve's most suffocating film.", streaming: ["HBO Max"] },
  { id: "movie-040", title: "The Lunchbox", year: 2013, genre: "Romance", mood: "light", runtime: 104, pitch: "A mistaken lunch delivery in Mumbai starts a correspondence between two lonely people. Gentle and lovely.", streaming: ["Amazon Prime"] },
  { id: "movie-041", title: "Drive", year: 2011, genre: "Thriller", mood: "intense", runtime: 100, pitch: "A stunt driver moonlights as a getaway driver. Ryan Gosling says twelve words. Every shot is neon-lit perfection.", streaming: ["Netflix"] },
  { id: "movie-042", title: "The Worst Person in the World", year: 2021, genre: "Drama", mood: "thought-provoking", runtime: 128, pitch: "A young woman in Oslo tries to figure out what she wants from life and love. The most relatable existential crisis on film.", streaming: ["MUBI"] },
  { id: "movie-043", title: "Ratatouille", year: 2007, genre: "Animation", mood: "light", runtime: 111, pitch: "A rat wants to be a chef in Paris. The food critic scene alone justifies Pixar's existence.", streaming: ["Disney+"] },
  { id: "movie-044", title: "Nightcrawler", year: 2014, genre: "Thriller", mood: "intense", runtime: 117, pitch: "A sociopath becomes a freelance crime journalist in LA. Jake Gyllenhaal is terrifying because he never blinks.", streaming: ["Netflix"] },
  { id: "movie-045", title: "Paddington 2", year: 2017, genre: "Comedy", mood: "light", runtime: 103, pitch: "A bear tries to buy a pop-up book. Hugh Grant plays a washed-up actor villain. The highest-rated film on Rotten Tomatoes for a reason.", streaming: ["Netflix"] },
  { id: "movie-046", title: "Wind River", year: 2017, genre: "Thriller", mood: "intense", runtime: 107, pitch: "A murder investigation on a Native American reservation in Wyoming winter. Written and directed by the Sicario screenwriter.", streaming: ["Netflix"] },
  { id: "movie-047", title: "The Lobster", year: 2015, genre: "Sci-Fi", mood: "thought-provoking", runtime: 119, pitch: "In a dystopia, single people must find a partner in 45 days or be turned into an animal. Absurdist and oddly romantic.", streaming: ["Amazon Prime"] },
  { id: "movie-048", title: "Barbie", year: 2023, genre: "Comedy", mood: "funny", runtime: 114, pitch: "Barbie has an existential crisis, visits the real world, and discovers patriarchy. Way smarter than it needed to be.", streaming: ["HBO Max"] },
  { id: "movie-049", title: "Soul", year: 2020, genre: "Animation", mood: "thought-provoking", runtime: 100, pitch: "A jazz musician dies and has to figure out the meaning of life before getting his body back. Pixar for adults.", streaming: ["Disney+"] },
  { id: "movie-050", title: "Oppenheimer", year: 2023, genre: "Drama", mood: "intense", runtime: 180, pitch: "The man who built the bomb and the world that judged him for it. Three hours that feel like a detonation.", streaming: ["Amazon Prime"] },
  { id: "movie-051", title: "The Godfather", year: 1972, genre: "Drama", mood: "intense", runtime: 175, pitch: "A family business — if the business is organised crime. The film against which all others are measured.", streaming: ["Amazon Prime"] },
  { id: "movie-052", title: "Pulp Fiction", year: 1994, genre: "Comedy", mood: "funny", runtime: 154, pitch: "Interlocking crime stories told out of order. A burger has never been more menacing.", streaming: ["Amazon Prime"] },
  { id: "movie-053", title: "Fight Club", year: 1999, genre: "Drama", mood: "intense", runtime: 139, pitch: "An insomniac and a soap salesman start an underground fight club. The first rule is the first rule.", streaming: ["Amazon Prime"] },
  { id: "movie-054", title: "Spirited Away", year: 2001, genre: "Animation", mood: "light", runtime: 125, pitch: "A girl stumbles into a spirit world bathhouse. Miyazaki's magnum opus. Every frame is a painting.", streaming: ["Netflix"] },
  { id: "movie-055", title: "The Matrix", year: 1999, genre: "Sci-Fi", mood: "intense", runtime: 136, pitch: "A hacker discovers reality is a simulation. Changed action cinema and philosophy classes forever.", streaming: ["Amazon Prime"] },
  { id: "movie-056", title: "Get Out", year: 2017, genre: "Thriller", mood: "intense", runtime: 104, pitch: "A Black man visits his white girlfriend's family. The teacup scene. Jordan Peele's perfect debut.", streaming: ["Netflix"] },
  { id: "movie-057", title: "Her", year: 2013, genre: "Sci-Fi", mood: "thought-provoking", runtime: 126, pitch: "A man falls in love with his AI assistant. More romantic and less weird than it sounds.", streaming: ["Amazon Prime"] },
  { id: "movie-058", title: "Blade Runner 2049", year: 2017, genre: "Sci-Fi", mood: "thought-provoking", runtime: 164, pitch: "A replicant cop uncovers a secret that could unravel society. Even more gorgeous than the original.", streaming: ["Amazon Prime"] },
  { id: "movie-059", title: "The Princess Bride", year: 1987, genre: "Comedy", mood: "light", runtime: 98, pitch: "Fencing, fighting, torture, revenge, giants, monsters, chases, escapes, true love, miracles.", streaming: ["Disney+"] },
  { id: "movie-060", title: "Eternal Sunshine of the Spotless Mind", year: 2004, genre: "Romance", mood: "thought-provoking", runtime: 108, pitch: "A couple erases each other from memory. Then meets again. The saddest love story ever told.", streaming: ["Amazon Prime"] },
  { id: "movie-061", title: "Goodfellas", year: 1990, genre: "Drama", mood: "intense", runtime: 146, pitch: "Henry Hill's rise and fall in the mob. The tracking shot through the kitchen is cinema history.", streaming: ["Amazon Prime"] },
  { id: "movie-062", title: "Hot Fuzz", year: 2007, genre: "Comedy", mood: "funny", runtime: 121, pitch: "A London supercop transfers to a sleepy village. Then people start dying. Edgar Wright's best.", streaming: ["Netflix"] },
  { id: "movie-063", title: "Memento", year: 2000, genre: "Thriller", mood: "intense", runtime: 113, pitch: "A man with no short-term memory hunts his wife's killer. Told backwards. Nolan's cleverest puzzle.", streaming: ["Amazon Prime"] },
  { id: "movie-064", title: "Lost in Translation", year: 2003, genre: "Drama", mood: "thought-provoking", runtime: 102, pitch: "Two Americans share sleepless nights in Tokyo. What they whisper at the end doesn't matter.", streaming: ["Amazon Prime"] },
  { id: "movie-065", title: "The Departed", year: 2006, genre: "Thriller", mood: "intense", runtime: 151, pitch: "A cop infiltrates the mob. A mobster infiltrates the police. Everyone's paranoid. Everyone should be.", streaming: ["Netflix"] },
  { id: "movie-066", title: "Bridesmaids", year: 2011, genre: "Comedy", mood: "funny", runtime: 125, pitch: "A maid of honour slowly spirals while planning her best friend's wedding. The food poisoning scene.", streaming: ["Netflix"] },
  { id: "movie-067", title: "Fargo", year: 1996, genre: "Thriller", mood: "funny", runtime: 98, pitch: "A husband hires two criminals to kidnap his wife. In Minnesota. Nothing goes right. Oh ya, you betcha.", streaming: ["Amazon Prime"] },
  { id: "movie-068", title: "12 Angry Men", year: 1957, genre: "Drama", mood: "thought-provoking", runtime: 96, pitch: "Twelve jurors debate a murder case in one room. One dissents. The greatest courtroom drama ever made.", streaming: ["Amazon Prime"] },
  { id: "movie-069", title: "Before Sunrise", year: 1995, genre: "Romance", mood: "light", runtime: 101, pitch: "Two strangers walk and talk through Vienna for one night. Proof that conversation can be cinema.", streaming: ["Amazon Prime"] },
  { id: "movie-070", title: "District 9", year: 2009, genre: "Sci-Fi", mood: "intense", runtime: 112, pitch: "Aliens arrive in Johannesburg — as refugees. A bureaucrat gets too close. Apartheid as sci-fi.", streaming: ["Netflix"] },
  { id: "movie-071", title: "The Iron Giant", year: 1999, genre: "Animation", mood: "light", runtime: 86, pitch: "A boy befriends a giant robot during the Cold War. 'Superman.' If you know, you're already crying.", streaming: ["HBO Max"] },
  { id: "movie-072", title: "Call Me By Your Name", year: 2017, genre: "Romance", mood: "thought-provoking", runtime: 132, pitch: "A summer in Italy. A scholar. A peach. Michael Stuhlbarg's monologue is the best father-son scene in cinema.", streaming: ["Amazon Prime"] },
  { id: "movie-073", title: "Gone Girl", year: 2014, genre: "Thriller", mood: "intense", runtime: 149, pitch: "On their anniversary, a man's wife disappears. Then her diary surfaces. Fincher's sharpest knife.", streaming: ["Disney+"] },
  { id: "movie-074", title: "Palm Springs", year: 2020, genre: "Comedy", mood: "funny", runtime: 90, pitch: "Two wedding guests get stuck in a time loop. The best pandemic comfort film, made before the pandemic.", streaming: ["Amazon Prime"] },
  { id: "movie-075", title: "Spotlight", year: 2015, genre: "Drama", mood: "thought-provoking", runtime: 129, pitch: "Boston Globe journalists investigate the Catholic Church abuse scandal. Restrained, relentless, infuriating.", streaming: ["Netflix"] },
  { id: "movie-076", title: "Baby Driver", year: 2017, genre: "Action", mood: "light", runtime: 113, pitch: "A getaway driver soundtracks his life. Every car chase choreographed to music. Edgar Wright goes fast.", streaming: ["Netflix"] },
  { id: "movie-077", title: "The Death of Stalin", year: 2017, genre: "Comedy", mood: "funny", runtime: 107, pitch: "Soviet ministers scramble for power after Stalin drops dead. Somehow both hilarious and horrifying.", streaming: ["Amazon Prime"] },
  { id: "movie-078", title: "Annihilation", year: 2018, genre: "Sci-Fi", mood: "intense", runtime: 115, pitch: "Five scientists enter a shimmering anomaly. What's inside defies explanation. The bear scene.", streaming: ["Amazon Prime"] },
  { id: "movie-079", title: "Manchester by the Sea", year: 2016, genre: "Drama", mood: "thought-provoking", runtime: 137, pitch: "A man returns to his hometown after tragedy. Casey Affleck carries the weight of the world in silence.", streaming: ["Amazon Prime"] },
  { id: "movie-080", title: "John Wick", year: 2014, genre: "Action", mood: "intense", runtime: 101, pitch: "A retired assassin comes back because someone killed his dog. 77 people regret that decision.", streaming: ["Netflix"] },
  { id: "movie-081", title: "Booksmart", year: 2019, genre: "Comedy", mood: "funny", runtime: 102, pitch: "Two overachieving best friends try to cram four years of partying into one night. A teen comedy for the ages.", streaming: ["Amazon Prime"] },
  { id: "movie-082", title: "Howl's Moving Castle", year: 2004, genre: "Animation", mood: "light", runtime: 119, pitch: "A cursed girl moves into a wizard's walking castle. Miyazaki, romance, and a fire demon voiced by Billy Crystal.", streaming: ["Netflix"] },
  { id: "movie-083", title: "Se7en", year: 1995, genre: "Thriller", mood: "intense", runtime: 127, pitch: "Two detectives track a serial killer using the seven deadly sins. What's in the box remains cinema's cruellest question.", streaming: ["Netflix"] },
  { id: "movie-084", title: "Kill Bill: Volume 1", year: 2003, genre: "Action", mood: "intense", runtime: 111, pitch: "A bride wakes from a coma and hunts down her former assassination squad. Tarantino's most stylish revenge.", streaming: ["Amazon Prime"] },
  { id: "movie-085", title: "Nomadland", year: 2020, genre: "Drama", mood: "thought-provoking", runtime: 108, pitch: "A woman lives in a van across the American West. Frances McDormand makes loneliness look like freedom.", streaming: ["Disney+"] },
  { id: "movie-086", title: "Little Miss Sunshine", year: 2006, genre: "Comedy", mood: "funny", runtime: 101, pitch: "A dysfunctional family road-trips to a beauty pageant in a broken VW bus. The dance routine at the end.", streaming: ["Disney+"] },
  { id: "movie-087", title: "Inside Out", year: 2015, genre: "Animation", mood: "thought-provoking", runtime: 95, pitch: "The emotions inside an 11-year-old's head navigate her move to a new city. Pixar made everyone cry. Again.", streaming: ["Disney+"] },
  { id: "movie-088", title: "The Silence of the Lambs", year: 1991, genre: "Thriller", mood: "intense", runtime: 118, pitch: "An FBI trainee consults an imprisoned cannibal to catch another killer. Hopkins has twelve minutes of screen time. It's enough.", streaming: ["Netflix"] },
  { id: "movie-089", title: "Moon", year: 2009, genre: "Sci-Fi", mood: "thought-provoking", runtime: 97, pitch: "A man alone on a lunar base starts to suspect his employer. Sam Rockwell plays against himself. Literally.", streaming: ["Amazon Prime"] },
  { id: "movie-090", title: "Pride & Prejudice", year: 2005, genre: "Romance", mood: "light", runtime: 129, pitch: "Elizabeth Bennet and Mr Darcy spar across the English countryside. The hand-flex scene launched a thousand rewatches.", streaming: ["Netflix"] },
  { id: "movie-091", title: "The Raid", year: 2011, genre: "Action", mood: "intense", runtime: 101, pitch: "A SWAT team fights floor by floor through a drug lord's apartment block. The best martial arts film of the century.", streaming: ["Amazon Prime"] },
  { id: "movie-092", title: "Good Will Hunting", year: 1997, genre: "Drama", mood: "thought-provoking", runtime: 126, pitch: "A janitor at MIT solves impossible math problems. Robin Williams makes you cry in a park. 'It's not your fault.'", streaming: ["Netflix"] },
  { id: "movie-093", title: "Klaus", year: 2019, genre: "Animation", mood: "light", runtime: 96, pitch: "A selfish postman discovers the origin of Santa Claus. Netflix's first animated film, and it's gorgeous.", streaming: ["Netflix"] },
  { id: "movie-094", title: "Hereditary", year: 2018, genre: "Thriller", mood: "intense", runtime: 127, pitch: "A family unravels after their grandmother dies. The car scene. You'll know it when you see it.", streaming: ["Amazon Prime"] },
  { id: "movie-095", title: "Edge of Tomorrow", year: 2014, genre: "Sci-Fi", mood: "light", runtime: 113, pitch: "A soldier relives the same alien invasion over and over. Groundhog Day meets Saving Private Ryan.", streaming: ["Netflix"] },
  { id: "movie-096", title: "The Lives of Others", year: 2006, genre: "Drama", mood: "intense", runtime: 137, pitch: "A Stasi agent surveils a playwright in 1984 East Berlin. Slowly, the watcher becomes human.", streaming: ["Amazon Prime"] },
  { id: "movie-097", title: "Shaun of the Dead", year: 2004, genre: "Comedy", mood: "funny", runtime: 99, pitch: "A man tries to win back his girlfriend during a zombie apocalypse. By going to the pub.", streaming: ["Netflix"] },
  { id: "movie-098", title: "Gravity", year: 2013, genre: "Sci-Fi", mood: "intense", runtime: 91, pitch: "An astronaut is stranded in orbit after debris destroys everything. 91 minutes of pure survival tension.", streaming: ["HBO Max"] },
  { id: "movie-099", title: "Three Billboards Outside Ebbing, Missouri", year: 2017, genre: "Drama", mood: "thought-provoking", runtime: 115, pitch: "A mother rents billboards to shame the police into solving her daughter's murder. Frances McDormand is a force of nature.", streaming: ["Disney+"] },
  { id: "movie-100", title: "Midsommar", year: 2019, genre: "Thriller", mood: "intense", runtime: 148, pitch: "A couple attends a Swedish midsummer festival. The sunshine makes the horror worse, not better.", streaming: ["Amazon Prime"] },
  { id: "movie-101", title: "About Time", year: 2013, genre: "Romance", mood: "light", runtime: 123, pitch: "A man can time travel but only uses it to perfect his love life. Surprisingly devastating by the end.", streaming: ["Netflix"] },
  { id: "movie-102", title: "Oldboy", year: 2003, genre: "Thriller", mood: "intense", runtime: 120, pitch: "A man is imprisoned for 15 years with no explanation, then released. The twist will haunt you forever.", streaming: ["Amazon Prime"] },
  { id: "movie-103", title: "The Secret Life of Walter Mitty", year: 2013, genre: "Adventure", mood: "light", runtime: 114, pitch: "A daydreamer goes on an actual adventure for once. The skateboarding-in-Iceland scene alone is worth it.", streaming: ["Disney+"] },
  { id: "movie-104", title: "Uncut Gems", year: 2019, genre: "Thriller", mood: "intense", runtime: 135, pitch: "Adam Sandler as a gambling-addicted jeweler who cannot stop making terrible bets. Your blood pressure will spike.", streaming: ["Netflix"] },
  { id: "movie-105", title: "La La Land", year: 2016, genre: "Romance", mood: "light", runtime: 128, pitch: "Two dreamers fall in love in LA. The ending is either perfect or heartbreaking depending on who you ask.", streaming: ["HBO Max"] },
  { id: "movie-106", title: "The Florida Project", year: 2017, genre: "Drama", mood: "thought-provoking", runtime: 111, pitch: "A six-year-old has the best summer ever in a motel near Disney World. The adults around her are barely surviving.", streaming: ["Amazon Prime"] },
  { id: "movie-107", title: "Airplane!", year: 1980, genre: "Comedy", mood: "funny", runtime: 88, pitch: "A disaster movie parody with more jokes per minute than any film ever made. Don't call me Shirley.", streaming: ["Amazon Prime"] },
  { id: "movie-108", title: "Gladiator", year: 2000, genre: "Action", mood: "intense", runtime: 155, pitch: "A Roman general becomes a slave becomes a gladiator. Russell Crowe will make you believe in vengeance.", streaming: ["Amazon Prime"] },
  { id: "movie-109", title: "Toy Story", year: 1995, genre: "Animation", mood: "light", runtime: 81, pitch: "Your toys are alive and have feelings. Pixar invented an entire genre with this one.", streaming: ["Disney+"] },
  { id: "movie-110", title: "The Witch", year: 2015, genre: "Horror", mood: "intense", runtime: 92, pitch: "A Puritan family in 1630s New England suspects witchcraft. The goat knows something.", streaming: ["Netflix"] },
  { id: "movie-111", title: "Bo Burnham: Inside", year: 2021, genre: "Comedy", mood: "thought-provoking", runtime: 87, pitch: "A comedian alone in a room during lockdown makes a special about the internet. Funnier and sadder than it should be.", streaming: ["Netflix"] },
  { id: "movie-112", title: "My Neighbor Totoro", year: 1988, genre: "Animation", mood: "light", runtime: 86, pitch: "Two sisters befriend a giant forest spirit. Studio Ghibli at its most purely comforting.", streaming: ["Netflix"] },
  { id: "movie-113", title: "A Separation", year: 2011, genre: "Drama", mood: "thought-provoking", runtime: 123, pitch: "An Iranian couple's divorce gets complicated by a caretaker's accusation. Every character is right and wrong.", streaming: ["Amazon Prime"] },
  { id: "movie-114", title: "Once", year: 2007, genre: "Romance", mood: "light", runtime: 86, pitch: "A street musician and a Czech immigrant make an album together. The songs are so good they won an Oscar.", streaming: ["Amazon Prime"] },
  { id: "movie-115", title: "The Thing", year: 1982, genre: "Horror", mood: "intense", runtime: 109, pitch: "An alien imitates anyone it touches at an Antarctic research station. Trust nobody, especially the dog.", streaming: ["Amazon Prime"] },
  { id: "movie-116", title: "Eighth Grade", year: 2018, genre: "Comedy", mood: "thought-provoking", runtime: 93, pitch: "The last week of eighth grade for a shy girl who makes YouTube videos nobody watches. Painfully relatable.", streaming: ["Amazon Prime"] },
  { id: "movie-117", title: "Mission: Impossible - Fallout", year: 2018, genre: "Action", mood: "intense", runtime: 147, pitch: "Tom Cruise does his own stunts including a HALO jump and a helicopter chase. The man is uninsurable.", streaming: ["Amazon Prime"] },
  { id: "movie-118", title: "Fantastic Mr. Fox", year: 2009, genre: "Animation", mood: "funny", runtime: 87, pitch: "Wes Anderson makes a stop-motion film about a fox who can't stop stealing chickens. Cussing fantastic.", streaming: ["Disney+"] },
  { id: "movie-119", title: "Mulholland Drive", year: 2001, genre: "Thriller", mood: "intense", runtime: 147, pitch: "A woman with amnesia and an aspiring actress investigate a mystery in Hollywood. David Lynch at his Lynchiest.", streaming: ["HBO Max"] },
  { id: "movie-120", title: "Legally Blonde", year: 2001, genre: "Comedy", mood: "funny", runtime: 96, pitch: "A sorority girl gets into Harvard Law to win back her ex. Proves everyone wrong while being unapologetically herself.", streaming: ["Netflix"] },
  { id: "movie-121", title: "The Handmaiden", year: 2016, genre: "Thriller", mood: "intense", runtime: 145, pitch: "A pickpocket is hired to help swindle a Japanese heiress in 1930s Korea. Every twist rewrites the whole story.", streaming: ["Amazon Prime"] },
  { id: "movie-122", title: "Chef", year: 2014, genre: "Comedy", mood: "light", runtime: 114, pitch: "A chef quits his fancy restaurant to run a food truck. You will be ordering Cuban sandwiches within the hour.", streaming: ["Netflix"] },
  { id: "movie-123", title: "Green Book", year: 2018, genre: "Drama", mood: "light", runtime: 130, pitch: "A bouncer drives a Black pianist through the 1960s South. Viggo Mortensen eats an entire pizza by folding it in half.", streaming: ["Amazon Prime"] },
  { id: "movie-124", title: "1917", year: 2019, genre: "Action", mood: "intense", runtime: 119, pitch: "Two soldiers must cross enemy lines to deliver a message. Shot to look like one continuous take.", streaming: ["HBO Max"] },
  { id: "movie-125", title: "Minari", year: 2020, genre: "Drama", mood: "thought-provoking", runtime: 115, pitch: "A Korean-American family starts a farm in Arkansas. The grandmother steals every scene she's in.", streaming: ["Amazon Prime"] },
  { id: "movie-126", title: "Deadpool", year: 2016, genre: "Action", mood: "funny", runtime: 108, pitch: "A mercenary gets superpowers and breaks the fourth wall constantly. Ryan Reynolds was born for this role.", streaming: ["Disney+"] },
  { id: "movie-127", title: "The Talented Mr. Ripley", year: 1999, genre: "Thriller", mood: "intense", runtime: 139, pitch: "A nobody pretends to be somebody in 1950s Italy. Matt Damon has never been more unsettling.", streaming: ["Amazon Prime"] },
  { id: "movie-128", title: "Up", year: 2009, genre: "Animation", mood: "light", runtime: 96, pitch: "An old man flies his house to South America with balloons. The first ten minutes will wreck you emotionally.", streaming: ["Disney+"] },
  { id: "movie-129", title: "Blade Runner", year: 1982, genre: "Sci-Fi", mood: "thought-provoking", runtime: 117, pitch: "A detective hunts rogue androids in a rainy cyberpunk LA. Rutger Hauer's final monologue is cinema perfection.", streaming: ["HBO Max"] },
  { id: "movie-130", title: "Catch Me If You Can", year: 2002, genre: "Comedy", mood: "light", runtime: 141, pitch: "A teenager impersonates a pilot, doctor, and lawyer while the FBI chases him. Based on a true story, incredibly.", streaming: ["Netflix"] },
  { id: "movie-131", title: "There Will Be Blood", year: 2007, genre: "Drama", mood: "intense", runtime: 158, pitch: "An oil prospector's greed consumes everything around him. Daniel Day-Lewis drinks your milkshake.", streaming: ["Amazon Prime"] },
  { id: "movie-132", title: "Scott Pilgrim vs. the World", year: 2010, genre: "Action", mood: "funny", runtime: 112, pitch: "A slacker must defeat his new girlfriend's seven evil exes in video game-style battles. Edgar Wright at maximum fun.", streaming: ["Netflix"] },
  { id: "movie-133", title: "Room", year: 2015, genre: "Drama", mood: "intense", runtime: 118, pitch: "A mother and her five-year-old son escape captivity. Brie Larson won an Oscar. You will cry.", streaming: ["Netflix"] },
  { id: "movie-134", title: "Triangle of Sadness", year: 2022, genre: "Comedy", mood: "funny", runtime: 147, pitch: "Influencers and billionaires on a luxury yacht get a harsh reality check. The seasick dinner scene is legendary.", streaming: ["HBO Max"] },
  { id: "movie-135", title: "Tár", year: 2022, genre: "Drama", mood: "thought-provoking", runtime: 158, pitch: "Cate Blanchett plays a world-renowned conductor whose past catches up with her. A masterclass in slow-burn tension.", streaming: ["Amazon Prime"] },
  { id: "movie-136", title: "Top Gun: Maverick", year: 2022, genre: "Action", mood: "intense", runtime: 130, pitch: "Tom Cruise returns to the danger zone 36 years later. A legacy sequel that's somehow better than the original.", streaming: ["Amazon Prime"] },
  { id: "movie-137", title: "Glass Onion", year: 2022, genre: "Mystery", mood: "funny", runtime: 139, pitch: "Detective Blanc investigates a murder mystery on a tech billionaire's private island. The onion has many layers.", streaming: ["Netflix"] },
  { id: "movie-138", title: "The Whale", year: 2022, genre: "Drama", mood: "thought-provoking", runtime: 117, pitch: "A reclusive English teacher tries to reconnect with his estranged daughter. Brendan Fraser's comeback role.", streaming: ["Amazon Prime"] },
  { id: "movie-139", title: "Marcel the Shell with Shoes On", year: 2021, genre: "Animation", mood: "light", runtime: 90, pitch: "A tiny shell with shoes searches for his family through a documentary crew. The most wholesome film ever made.", streaming: ["Amazon Prime"] },
  { id: "movie-140", title: "Nope", year: 2022, genre: "Sci-Fi", mood: "intense", runtime: 130, pitch: "Siblings on a horse ranch discover something terrifying in the sky. Jordan Peele turns spectacle itself into horror.", streaming: ["Amazon Prime"] },
  { id: "movie-141", title: "The Menu", year: 2022, genre: "Thriller", mood: "intense", runtime: 107, pitch: "A celebrity chef serves a very exclusive, very deadly tasting menu. Anya Taylor-Joy orders a cheeseburger.", streaming: ["Disney+"] },
  { id: "movie-142", title: "RRR", year: 2022, genre: "Action", mood: "intense", runtime: 187, pitch: "Two Indian revolutionaries team up against the British Empire. The most spectacularly over-the-top action film ever made.", streaming: ["Netflix"] },
  { id: "movie-143", title: "Aftersun", year: 2022, genre: "Drama", mood: "thought-provoking", runtime: 96, pitch: "A woman revisits memories of a holiday with her father when she was eleven. Quietly devastating.", streaming: ["HBO Max"] },
  { id: "movie-144", title: "Decision to Leave", year: 2022, genre: "Mystery", mood: "thought-provoking", runtime: 138, pitch: "A detective falls for the prime suspect in a murder case. Park Chan-wook crafts a hypnotic love story.", streaming: ["HBO Max"] },
  { id: "movie-145", title: "Pig", year: 2021, genre: "Drama", mood: "thought-provoking", runtime: 92, pitch: "Nicolas Cage's truffle-hunting pig is stolen. This is not the action movie you expect. It's better.", streaming: ["HBO Max"] },
  { id: "movie-146", title: "The Mitchells vs. the Machines", year: 2021, genre: "Animation", mood: "funny", runtime: 113, pitch: "A dysfunctional family road trip becomes humanity's last hope against a robot apocalypse. Wildly creative animation.", streaming: ["Netflix"] },
  { id: "movie-147", title: "Prey", year: 2022, genre: "Action", mood: "intense", runtime: 100, pitch: "A Comanche warrior faces the Predator in 1719. The best Predator sequel by a mile.", streaming: ["Disney+"] },
  { id: "movie-148", title: "Emily the Criminal", year: 2022, genre: "Thriller", mood: "intense", runtime: 97, pitch: "A woman buried in student debt starts running credit card scams. Aubrey Plaza proves she can do anything.", streaming: ["Netflix"] },
  { id: "movie-149", title: "Puss in Boots: The Last Wish", year: 2022, genre: "Animation", mood: "light", runtime: 102, pitch: "Puss in Boots faces mortality and it's somehow the best animated film in years. The wolf is genuinely terrifying.", streaming: ["Amazon Prime"] },
  { id: "movie-150", title: "The Banshees of Inisherin", year: 2022, genre: "Drama", mood: "thought-provoking", runtime: 114, pitch: "A man's best friend suddenly decides he doesn't like him anymore. A breakup story set on an Irish island.", streaming: ["Disney+"] },
  { id: "movie-151", title: "Challengers", year: 2024, genre: "Drama", mood: "intense", runtime: 131, pitch: "A love triangle between tennis players told backwards through a championship match. Luca Guadagnino at his most electric.", streaming: ["Amazon Prime"] },
  { id: "movie-152", title: "The Holdovers", year: 2023, genre: "Comedy", mood: "thought-provoking", runtime: 133, pitch: "A grumpy classics teacher and a troubled student are stuck at boarding school over Christmas 1970. Quietly devastating.", streaming: ["Amazon Prime"] },
  { id: "movie-153", title: "Borat", year: 2006, genre: "Comedy", mood: "funny", runtime: 84, pitch: "A Kazakh journalist travels across America. What he exposes about his hosts is funnier than anything he does.", streaming: ["Amazon Prime"] },
  { id: "movie-154", title: "Poor Things", year: 2023, genre: "Sci-Fi", mood: "thought-provoking", runtime: 141, pitch: "A reanimated woman discovers the world with the curiosity of a child and the freedom of someone with nothing to lose.", streaming: ["Disney+"] },
  { id: "movie-155", title: "Tucker and Dale vs Evil", year: 2010, genre: "Comedy", mood: "funny", runtime: 89, pitch: "Two hillbillies are mistaken for murderers by clueless college kids. Every horror trope flipped on its head.", streaming: ["Amazon Prime"] },
  { id: "movie-156", title: "The Zone of Interest", year: 2023, genre: "Drama", mood: "thought-provoking", runtime: 105, pitch: "The commandant of Auschwitz and his family live an idyllic life next door to the camp. Horror through absence.", streaming: ["Amazon Prime"] },
  { id: "movie-157", title: "Step Brothers", year: 2008, genre: "Comedy", mood: "funny", runtime: 98, pitch: "Two middle-aged men become stepbrothers and act like children. Stupid in the most brilliant way possible.", streaming: ["Netflix"] },
  { id: "movie-158", title: "Killers of the Flower Moon", year: 2023, genre: "Drama", mood: "intense", runtime: 206, pitch: "The systematic murder of Osage Nation members for oil money in 1920s Oklahoma. Scorsese, DiCaprio, De Niro. A slow burn that sears.", streaming: ["Apple TV+"] },
  { id: "movie-159", title: "Anatomy of a Fall", year: 2023, genre: "Thriller", mood: "thought-provoking", runtime: 152, pitch: "A woman is accused of killing her husband. The trial dissects their marriage. You'll argue about the verdict for days.", streaming: ["MUBI"] },
  { id: "movie-160", title: "The Hangover", year: 2009, genre: "Comedy", mood: "funny", runtime: 100, pitch: "Three groomsmen wake up in Vegas with no memory, a tiger, and a missing groom. The blueprint for modern comedy.", streaming: ["Netflix"] },
  { id: "movie-161", title: "Dunkirk", year: 2017, genre: "War", mood: "intense", runtime: 106, pitch: "The evacuation of Dunkirk told from land, sea, and air simultaneously. Almost no dialogue, all tension.", streaming: ["Amazon Prime"] },
  { id: "movie-162", title: "Saltburn", year: 2023, genre: "Thriller", mood: "intense", runtime: 131, pitch: "An Oxford student insinuates himself into an aristocratic family's country estate. Seductive and deeply unsettling.", streaming: ["Amazon Prime"] },
  { id: "movie-163", title: "The Revenant", year: 2015, genre: "Drama", mood: "intense", runtime: 156, pitch: "A frontiersman is left for dead after a bear attack and crawls through the wilderness for revenge. Raw survival cinema.", streaming: ["Disney+"] },
  { id: "movie-164", title: "The Master", year: 2012, genre: "Drama", mood: "thought-provoking", runtime: 138, pitch: "A WWII veteran falls under the spell of a charismatic cult leader. Hoffman and Phoenix in a psychological cage match.", streaming: ["Amazon Prime"] },
  { id: "movie-165", title: "Eurovision Song Contest: The Story of Fire Saga", year: 2020, genre: "Comedy", mood: "funny", runtime: 123, pitch: "An Icelandic duo enters Eurovision. Will Ferrell sings with passion. The song-along scene is genuine magic.", streaming: ["Netflix"] },
  { id: "movie-166", title: "Spy", year: 2015, genre: "Comedy", mood: "funny", runtime: 120, pitch: "A CIA desk analyst goes undercover as a spy. Melissa McCarthy and Jason Statham are comedy gold together.", streaming: ["Disney+"] },
  { id: "movie-167", title: "The Darjeeling Limited", year: 2007, genre: "Comedy", mood: "light", runtime: 91, pitch: "Three brothers take a train across India to find their mother. Peak Wes Anderson melancholy disguised as a travelogue.", streaming: ["Disney+"] },
  { id: "movie-168", title: "Being John Malkovich", year: 1999, genre: "Sci-Fi", mood: "thought-provoking", runtime: 113, pitch: "A puppeteer discovers a portal into John Malkovich's brain. Charlie Kaufman's brain is weirder than any sci-fi.", streaming: ["Amazon Prime"] },
  { id: "movie-169", title: "Tropic Thunder", year: 2008, genre: "Comedy", mood: "funny", runtime: 107, pitch: "Actors filming a war movie accidentally stumble into a real conflict. Tom Cruise's cameo alone is worth it.", streaming: ["Netflix"] },
  { id: "movie-170", title: "Kiki's Delivery Service", year: 1989, genre: "Animation", mood: "light", runtime: 103, pitch: "A young witch moves to a new city and starts a delivery service on her broomstick. Pure Ghibli comfort.", streaming: ["Netflix"] },
  { id: "movie-171", title: "American Fiction", year: 2023, genre: "Comedy", mood: "thought-provoking", runtime: 117, pitch: "A Black novelist writes a satirical book playing into stereotypes — and it becomes a bestseller. Razor-sharp on race and publishing.", streaming: ["Amazon Prime"] },
  { id: "movie-172", title: "The Great Escape", year: 1963, genre: "War", mood: "light", runtime: 172, pitch: "Allied POWs plan a massive escape from a German camp. Steve McQueen on a motorcycle. Old-school adventure at its finest.", streaming: ["Amazon Prime"] },
  { id: "movie-173", title: "The Gentlemen", year: 2019, genre: "Thriller", mood: "funny", runtime: 113, pitch: "A British drug lord tries to sell his empire. Guy Ritchie at his sharpest, Hugh Grant at his slimiest.", streaming: ["Amazon Prime"] },
  { id: "movie-174", title: "The Other Guys", year: 2010, genre: "Comedy", mood: "funny", runtime: 107, pitch: "Two mismatched NYPD detectives accidentally uncover a massive financial crime. Will Ferrell and Mark Wahlberg are a perfect pair.", streaming: ["Netflix"] },
  { id: "movie-175", title: "WALL·E", year: 2008, genre: "Animation", mood: "light", runtime: 98, pitch: "A lonely robot on an abandoned Earth falls in love with a sleek probe. Almost no dialogue. All heart.", streaming: ["Disney+"] },
  { id: "movie-176", title: "Encanto", year: 2021, genre: "Animation", mood: "light", runtime: 102, pitch: "A Colombian family all have magical powers — except one. The music is impossibly catchy and the family dynamics feel real.", streaming: ["Disney+"] },
  { id: "movie-177", title: "Inside Out 2", year: 2024, genre: "Animation", mood: "thought-provoking", runtime: 100, pitch: "Anxiety shows up in Riley's teenage brain and takes over. Pixar makes you cry about emotions having emotions. Again.", streaming: ["Disney+"] },
  { id: "movie-178", title: "21 Jump Street", year: 2012, genre: "Comedy", mood: "funny", runtime: 109, pitch: "Two cops go undercover at a high school and discover they're no longer cool. Channing Tatum's comedy awakening.", streaming: ["Netflix"] },
  { id: "movie-179", title: "Apocalypto", year: 2006, genre: "Action", mood: "intense", runtime: 139, pitch: "A Mayan villager is captured for sacrifice and runs for his life through the jungle. Relentless, visceral, entirely in Yucatec Maya.", streaming: ["Disney+"] },
  { id: "movie-180", title: "Conclave", year: 2024, genre: "Thriller", mood: "thought-provoking", runtime: 120, pitch: "Cardinals gather in the Vatican to elect a new pope. Political intrigue, secrets, and a final twist that reframes everything.", streaming: ["Amazon Prime"] },
  { id: "movie-181", title: "This Is Spinal Tap", year: 1984, genre: "Comedy", mood: "funny", runtime: 82, pitch: "A documentary crew follows Britain's loudest band on their disastrous American tour. These go to eleven.", streaming: ["Amazon Prime"] },
  { id: "movie-182", title: "Memoria", year: 2021, genre: "Drama", mood: "thought-provoking", runtime: 136, pitch: "A woman in Colombia hears a mysterious bang that nobody else can hear. Apichatpong Weerasethakul's most hypnotic film.", streaming: ["MUBI"] },
  { id: "movie-183", title: "The Batman", year: 2022, genre: "Action", mood: "intense", runtime: 176, pitch: "Batman as a detective noir. Gotham has never looked this rain-soaked or felt this corrupt. Pattinson nails the damaged vigilante.", streaming: ["HBO Max"] },
  { id: "movie-184", title: "Porco Rosso", year: 1992, genre: "Animation", mood: "light", runtime: 94, pitch: "A WWI flying ace has been cursed into a pig and now hunts air pirates over the Adriatic. Peak Ghibli vibes.", streaming: ["Netflix"] },
  { id: "movie-185", title: "The Substance", year: 2024, genre: "Horror", mood: "intense", runtime: 140, pitch: "An aging celebrity uses a black-market drug that creates a younger version of herself. Body horror meets Hollywood satire.", streaming: ["MUBI"] },
  { id: "movie-186", title: "Monty Python and the Holy Grail", year: 1975, genre: "Comedy", mood: "funny", runtime: 91, pitch: "King Arthur and his knights quest for the Holy Grail. The Black Knight. The French taunters. The killer rabbit. Timeless.", streaming: ["Netflix"] },
  { id: "movie-187", title: "School of Rock", year: 2003, genre: "Comedy", mood: "light", runtime: 109, pitch: "A failing musician poses as a substitute teacher and turns his class into a rock band. Jack Black's most lovable performance.", streaming: ["Amazon Prime"] },
  { id: "movie-188", title: "Anora", year: 2024, genre: "Comedy", mood: "thought-provoking", runtime: 139, pitch: "A Brooklyn stripper marries the son of a Russian oligarch. Then his parents find out. Palme d'Or winner for a reason.", streaming: ["MUBI"] },
  { id: "movie-189", title: "Burn After Reading", year: 2008, genre: "Comedy", mood: "funny", runtime: 96, pitch: "Gym employees find a CIA agent's memoir and try to blackmail him. Everyone is an idiot. The Coens' most cynical farce.", streaming: ["Amazon Prime"] },
  { id: "movie-190", title: "Tenet", year: 2020, genre: "Sci-Fi", mood: "intense", runtime: 150, pitch: "Time moves forwards and backwards simultaneously. You won't fully understand it. You'll want to watch it again immediately.", streaming: ["Amazon Prime"] },
  { id: "movie-191", title: "The Wind Rises", year: 2013, genre: "Animation", mood: "thought-provoking", runtime: 126, pitch: "The life of the engineer who designed Japan's WWII fighter planes. Miyazaki's most personal and morally complex film.", streaming: ["Netflix"] },
  { id: "movie-192", title: "Mid90s", year: 2018, genre: "Drama", mood: "light", runtime: 85, pitch: "A 13-year-old finds belonging with a group of skaters in 90s LA. Jonah Hill's directorial debut, shot on 16mm. Nostalgic and tender.", streaming: ["Amazon Prime"] },
  { id: "movie-193", title: "Napoleon Dynamite", year: 2004, genre: "Comedy", mood: "funny", runtime: 96, pitch: "An awkward Idaho teenager helps his friend run for class president. The dance scene is cinema's greatest underdog moment.", streaming: ["Disney+"] },
  { id: "movie-194", title: "Prisoners of the Ghostland", year: 2021, genre: "Action", mood: "intense", runtime: 103, pitch: "Nic Cage in a leather suit rigged with explosives in a post-apocalyptic Japan. It's exactly as unhinged as it sounds.", streaming: ["Amazon Prime"] },
  { id: "movie-195", title: "Sing Street", year: 2016, genre: "Musical", mood: "light", runtime: 106, pitch: "A Dublin teenager starts a band to impress a girl in 1980s Ireland. The songs are genuinely great. John Carney's best.", streaming: ["Netflix"] },
  { id: "movie-196", title: "Never Let Me Go", year: 2010, genre: "Sci-Fi", mood: "thought-provoking", runtime: 103, pitch: "Students at an idyllic English boarding school discover the horrifying purpose they were created for. Quiet devastation.", streaming: ["Amazon Prime"] },
  { id: "movie-197", title: "The Lighthouse", year: 2019, genre: "Horror", mood: "intense", runtime: 109, pitch: "Two lighthouse keepers go mad on a remote island. Shot in black and white, square format. Dafoe and Pattinson screaming into the void.", streaming: ["Amazon Prime"] },
  { id: "movie-198", title: "Moonrise Kingdom", year: 2012, genre: "Comedy", mood: "light", runtime: 94, pitch: "Two 12-year-olds run away together on a New England island. Wes Anderson's most tender film, somehow.", streaming: ["Disney+"] },
  { id: "movie-199", title: "Bottoms", year: 2023, genre: "Comedy", mood: "funny", runtime: 91, pitch: "Two unpopular girls start a fight club to hook up with cheerleaders. Absurdist high school comedy that goes completely off the rails.", streaming: ["Amazon Prime"] },
  { id: "movie-200", title: "Civil War", year: 2024, genre: "Thriller", mood: "intense", runtime: 109, pitch: "War journalists cross a fractured America during a second civil war. Alex Garland makes you feel every bullet and moral compromise.", streaming: ["Apple TV+"] },
  { id: "movie-201", title: "Whisper of the Heart", year: 1995, genre: "Animation", mood: "light", runtime: 111, pitch: "A bookish girl follows the trail of a mysterious boy through Tokyo's streets. Ghibli's most grounded and romantic coming-of-age.", streaming: ["Netflix"] },
  { id: "movie-202", title: "Shoplifters", year: 2018, genre: "Drama", mood: "thought-provoking", runtime: 121, pitch: "A family of petty thieves in Tokyo takes in an abused child. Hirokazu Kore-eda asks what makes a family real.", streaming: ["Amazon Prime"] },
  { id: "movie-203", title: "Dodgeball", year: 2004, genre: "Comedy", mood: "funny", runtime: 92, pitch: "A ragtag gym enters a dodgeball tournament to save their business. Ben Stiller's villain is peak absurdity.", streaming: ["Disney+"] },
  { id: "movie-204", title: "I'm Still Here", year: 2024, genre: "Drama", mood: "thought-provoking", runtime: 135, pitch: "A Brazilian woman's husband is taken by the military dictatorship in the 1970s. She refuses to be silent. Fernanda Torres is extraordinary.", streaming: ["MUBI"] },
  { id: "movie-205", title: "Snatch", year: 2000, genre: "Comedy", mood: "funny", runtime: 102, pitch: "A stolen diamond, bare-knuckle boxing, and Brad Pitt speaking incomprehensible Irish. Guy Ritchie's tightest, funniest script.", streaming: ["Amazon Prime"] },
  { id: "movie-206", title: "Under the Skin", year: 2013, genre: "Sci-Fi", mood: "intense", runtime: 108, pitch: "Scarlett Johansson drives around Scotland picking up men. She's not human. Nothing will prepare you for this film.", streaming: ["MUBI"] },
  { id: "movie-207", title: "The Boy and the Heron", year: 2023, genre: "Animation", mood: "light", runtime: 124, pitch: "A grieving boy follows a mysterious heron into a fantastical world. Miyazaki's farewell film — strange, beautiful, deeply personal.", streaming: ["Netflix"] },
];

// ========== CATEGORY CONFIG ==========
const CATEGORIES = {
  food:   { id: 'food',   name: 'Food',   question: 'What should I eat?',      desc: 'Tonight or plan your whole week',    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`, color: '#FF6B35', cssClass: 'cat-food',   active: true },
  movies: { id: 'movies', name: 'Movies', question: 'What should I watch?',    desc: 'Spin for a random movie pick',        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>`, color: '#E53935', cssClass: 'cat-movies', active: true },
  music:  { id: 'music',  name: 'Music',  question: 'What should I listen to?', desc: 'Curated playlists for every mood',     icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`, color: '#1DB954', cssClass: 'cat-music',  active: false },
  books:  { id: 'books',  name: 'Books',  question: 'What should I read?',      desc: 'Random book recommendations',         icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`, color: '#2196F3', cssClass: 'cat-books',  active: false },
  travel: { id: 'travel', name: 'Travel', question: 'Where should I go?',       desc: 'Random destinations worldwide',       icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`, color: '#00BCD4', cssClass: 'cat-travel', active: false },
  other:  { id: 'other',  name: 'Other',  question: 'Help me choose',           desc: 'Custom options to randomize',         icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`, color: '#9C27B0', cssClass: 'cat-other',  active: false }
};

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const CUISINES = [...new Set(MEALS.map(m => m.cuisine))].sort();
const GENRES = [...new Set(MOVIES.map(m => m.genre))].sort();
const MOODS = [...new Set(MOVIES.map(m => m.mood))];
const MOOD_LABELS = { light: 'Light', intense: 'Intense', 'thought-provoking': 'Thought-provoking', funny: 'Funny' };
const MOOD_EMOJI = { light: '🌤️', intense: '🔥', 'thought-provoking': '🧠', funny: '😂' };
const EFFORT_EMOJI = { easy: '🟢', medium: '🟡', involved: '🔴' };
const DIETARY_EMOJI = { vegetarian: '🌿', fish: '🐟', meat: '🥩', vegan: '🌱' };

// ============================================================
class CHCSApp {
  constructor() {
    this.theme = localStorage.getItem('chcs_theme') || 'light';
    this.stats = this.loadStats();
    this.favorites = new Set(JSON.parse(localStorage.getItem('chcs_favorites') || '[]'));
    this.foodFilters = { effort: null, cuisine: null, dietary: null, effortList: null, dietaryList: null, maxPrepTime: null };
    this.movieFilters = { mood: null, genre: null, maxRuntime: null, moodList: null };
    this.foodMode = null;
    this.weekPlan = [];
    this.weekDay = 0;
    this.currentMeal = null;
    this.currentMovie = null;
    this.usedMealIds = new Set();
    this.usedMovieIds = new Set();
    this.isSpinning = false;
    this.checkedItems = new Set(JSON.parse(localStorage.getItem('chcs_checked') || '[]'));
    document.documentElement.setAttribute('data-theme', this.theme);
    this.renderHome();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('chcs_theme', this.theme);
  }

  // ── Stats ──────────────────────────────────────────────
  loadStats() {
    const s = localStorage.getItem('chcs_stats');
    return s ? JSON.parse(s) : { choices: 0, weekPlans: 0, streak: 0, lastDate: null };
  }
  saveStats() { localStorage.setItem('chcs_stats', JSON.stringify(this.stats)); }

  recordChoice() {
    const today = new Date().toDateString();
    this.stats.choices++;
    if (this.stats.lastDate !== today) {
      const last = this.stats.lastDate ? new Date(this.stats.lastDate) : null;
      const diff = last ? Math.floor((new Date(today) - last) / 86400000) : 0;
      this.stats.streak = diff <= 1 ? this.stats.streak + 1 : 1;
      this.stats.lastDate = today;
    }
    this.saveStats();
    this._statsDirty = true;
  }

  // ── Food logic ─────────────────────────────────────────
  getFilteredMeals() {
    let pool = MEALS.filter(m => !this.usedMealIds.has(m.id));
    const f = this.foodFilters;
    if (f.effort)      pool = pool.filter(m => m.effort === f.effort);
    if (f.effortList)  pool = pool.filter(m => f.effortList.includes(m.effort));
    if (f.cuisine)     pool = pool.filter(m => m.cuisine === f.cuisine);
    if (f.dietary)     pool = pool.filter(m => m.dietary === f.dietary);
    if (f.dietaryList) pool = pool.filter(m => f.dietaryList.includes(m.dietary));
    if (f.maxPrepTime) pool = pool.filter(m => m.prepTime <= f.maxPrepTime);
    // expand filter if too few results
    if (pool.length < 3 && (f.effort || f.effortList || f.dietary || f.dietaryList || f.maxPrepTime)) {
      const relaxed = MEALS.filter(m => !this.usedMealIds.has(m.id));
      if (relaxed.length >= 3) return relaxed;
    }
    if (pool.length === 0) { this.usedMealIds.clear(); return this.getFilteredMeals(); }
    return pool;
  }
  pickMeal() { const p = this.getFilteredMeals(); return p[Math.floor(Math.random() * p.length)]; }

  // ── Movie logic ────────────────────────────────────────
  getFilteredMovies() {
    let pool = MOVIES.filter(m => !this.usedMovieIds.has(m.id));
    const f = this.movieFilters;
    if (f.mood)       pool = pool.filter(m => m.mood === f.mood);
    if (f.moodList)   pool = pool.filter(m => f.moodList.includes(m.mood));
    if (f.genre)      pool = pool.filter(m => m.genre === f.genre);
    if (f.maxRuntime) pool = pool.filter(m => m.runtime <= f.maxRuntime);
    if (pool.length < 3 && (f.mood || f.moodList || f.maxRuntime)) {
      const relaxed = MOVIES.filter(m => !this.usedMovieIds.has(m.id));
      if (relaxed.length >= 3) return relaxed;
    }
    if (pool.length === 0) { this.usedMovieIds.clear(); return this.getFilteredMovies(); }
    return pool;
  }
  pickMovie() { const p = this.getFilteredMovies(); return p[Math.floor(Math.random() * p.length)]; }

  // ── Surprise Me ────────────────────────────────────────
  surpriseMe() {
    if (Math.random() > 0.5) {
      this.foodFilters = { effort: null, cuisine: null, dietary: null, effortList: null, dietaryList: null, maxPrepTime: null };
      this.foodMode = 'tonight';
      this.currentMeal = this.pickMeal();
      this.renderMealCard();
    } else {
      this.movieFilters = { mood: null, genre: null, maxRuntime: null, moodList: null };
      this.currentMovie = this.pickMovie();
      this.renderMovieCard();
    }
  }

  // ══════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════

  renderHome() {
    const picks = [
      { cat: 'food',   title: 'Cooking Adventure', desc: 'Try a random recipe tonight or plan your whole week.' },
      { cat: 'movies', title: 'Movie Night',       desc: 'Spin the wheel and find something great to watch.' },
      { cat: 'food',   title: 'Surprise Dinner',   desc: 'A gentle nudge towards something delicious.' },
      { cat: 'movies', title: 'Cinema Roulette',   desc: 'Let fate pick your evening entertainment.' },
    ];
    const pick = picks[Math.floor(Date.now() / 86400000) % picks.length];

    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <div class="hero-card">
          <span class="hero-label">TODAY'S PICK</span>
          <h2 class="hero-title">${pick.title}</h2>
          <p class="hero-desc">${pick.desc}</p>
          <button class="hero-btn" onclick="app.${pick.cat === 'food' ? 'showFood' : 'showMovies'}()">Start now &rarr;</button>
        </div>
        <div class="stats-row">
          <div class="stat-card"><span class="stat-number">${this.stats.choices}</span><span class="stat-label">Choices made</span></div>
          <div class="stat-card"><span class="stat-number">${this.stats.streak}</span><span class="stat-label">Day streak</span></div>
        </div>
        <h3 class="section-title">Browse</h3>
        <div class="category-grid stagger-in">
          ${Object.values(CATEGORIES).map(c => `
            <div class="category-card ${c.cssClass}${c.active ? '' : ' coming-soon'}"
                 ${c.active ? `onclick="app.${c.id === 'food' ? 'showFood' : 'showMovies'}()"` : ''}>
              <div class="category-icon">${c.icon}</div>
              <h4>${c.name}</h4>
              <p>${c.active ? c.question : ''}</p>
              ${c.active ? '' : '<span class="coming-soon-badge">Coming soon</span>'}
            </div>
          `).join('')}
        </div>
      </section>`;
    this._updateNav('home');
    if (this._statsDirty) {
      this._statsDirty = false;
      document.querySelectorAll('.stat-number').forEach(el => el.classList.add('stat-pop'));
    }
  }

  // ── Food: mood selection ──────────────────────────────
  showFood() {
    this.usedMealIds.clear();
    this.selectedFoodMood = localStorage.getItem('chcs_food_mood_last') || null;
    this._renderFoodMoodScreen();
  }

  _applyFoodMood(mood) {
    this.selectedFoodMood = mood;
    if (mood) localStorage.setItem('chcs_food_mood_last', mood);
    else localStorage.removeItem('chcs_food_mood_last');

    this.foodFilters = { effort: null, cuisine: null, dietary: null, effortList: null, dietaryList: null, maxPrepTime: null };
    if (mood === 'lazy')        { this.foodFilters.effort = 'easy'; this.foodFilters.maxPrepTime = 20; }
    else if (mood === 'normal') { this.foodFilters.effortList = ['easy', 'medium']; }
    else if (mood === 'light')  { this.foodFilters.dietaryList = ['vegetarian', 'fish', 'vegan']; }
    else if (mood === 'meaty')  { this.foodFilters.dietary = 'meat'; }
    // 'adventurous' and 'surprise' → no filters
  }

  selectFoodMood(mood) {
    this._applyFoodMood(mood);
    this.startTonight();
  }

  _renderFoodMoodScreen() {
    const moods = [
      { key: 'lazy',        emoji: '😴', label: 'Lazy',        desc: 'Quick & easy meals' },
      { key: 'normal',      emoji: '🙂', label: 'Normal',      desc: 'Easy to medium effort' },
      { key: 'adventurous', emoji: '👨‍🍳', label: 'Adventurous', desc: 'Bring on the challenge' },
      { key: 'light',       emoji: '🌱', label: 'Light',       desc: 'Veggie, fish & vegan' },
      { key: 'meaty',       emoji: '🍖', label: 'Meaty',       desc: 'Carnivore mode' },
    ];
    const last = this.selectedFoodMood;
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">🍽️</span>
            <h2>How are you feeling?</h2>
            <p>Pick a vibe and we'll find something to eat</p>
          </div>
          <div class="mood-grid stagger-in">
            ${moods.map(m => `
              <button class="mood-pill${last===m.key?' active':''}" onclick="app.selectFoodMood('${m.key}')">
                <span class="mood-pill-emoji">${m.emoji}</span>
                <span class="mood-pill-label">${m.label}</span>
                <span class="mood-pill-desc">${m.desc}</span>
              </button>`).join('')}
          </div>
          <button class="mood-surprise" onclick="app.selectFoodMood('surprise')">
            <span class="mood-pill-emoji">🎲</span>
            <span class="mood-pill-label">Surprise me</span>
          </button>
        </div>
      </section>`;
  }

  _renderFoodModeScreen() {
    const count = this.getFilteredMeals().length;
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app._renderFoodMoodScreen()')}
        <div class="category-header">
          <div class="category-icon cat-food">${CATEGORIES.food.icon}</div>
          <div class="category-header-text"><h2>Food</h2><p>${count} meals match your vibe</p></div>
        </div>
        <div class="mode-cards">
          <div class="mode-card" onclick="app.startTonight()">
            <div class="mode-icon">🍽️</div>
            <div class="mode-text"><h4>Tonight</h4><p>One meal suggestion</p></div>
            <svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div class="mode-card" onclick="app.startWeek()">
            <div class="mode-icon">📅</div>
            <div class="mode-text"><h4>This Week</h4><p>Plan 5 weekday dinners</p></div>
            <svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      </section>`;
  }

  startTonight() { this.foodMode = 'tonight'; this.currentMeal = this.pickMeal(); this.renderMealCard(); }
  startWeek()    { this.foodMode = 'week'; this.weekPlan = []; this.weekDay = 0; this.checkedItems.clear(); localStorage.removeItem('chcs_checked'); this.currentMeal = this.pickMeal(); this.renderMealCard(); }

  // ── Swipe card engine ────────────────────────────────
  _initSwipe(cardEl, onAccept, onReject) {
    let startX = 0, startY = 0, dx = 0, dragging = false, moved = false;
    const threshold = 80;

    const onStart = (x, y) => { startX = x; startY = y; dx = 0; dragging = true; moved = false; cardEl.style.transition = 'none'; };
    const onMove = (x) => {
      if (!dragging) return;
      dx = x - startX;
      if (Math.abs(dx) > 5) moved = true;
      const rotate = (dx / window.innerWidth) * 15;
      const opacity = Math.min(Math.abs(dx) / threshold, 1);
      cardEl.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
      cardEl.style.boxShadow = dx > 20 ? `0 0 ${20*opacity}px rgba(90,138,74,${0.3*opacity})` :
                                dx < -20 ? `0 0 ${20*opacity}px rgba(184,68,58,${0.3*opacity})` : 'var(--shadow)';
      const acceptHint = cardEl.querySelector('.swipe-hint-accept');
      const rejectHint = cardEl.querySelector('.swipe-hint-reject');
      if (acceptHint) acceptHint.style.opacity = dx > 20 ? opacity : 0;
      if (rejectHint) rejectHint.style.opacity = dx < -20 ? opacity : 0;
    };
    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      cardEl.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease';
      if (dx > threshold) {
        cardEl.style.transform = `translateX(${window.innerWidth}px) rotate(15deg)`;
        cardEl.style.opacity = '0';
        setTimeout(onAccept, 300);
      } else if (dx < -threshold) {
        cardEl.style.transform = `translateX(-${window.innerWidth}px) rotate(-15deg)`;
        cardEl.style.opacity = '0';
        setTimeout(onReject, 300);
      } else {
        cardEl.style.transform = ''; cardEl.style.boxShadow = '';
        const acceptHint = cardEl.querySelector('.swipe-hint-accept');
        const rejectHint = cardEl.querySelector('.swipe-hint-reject');
        if (acceptHint) acceptHint.style.opacity = 0;
        if (rejectHint) rejectHint.style.opacity = 0;
      }
    };

    // Touch events
    cardEl.addEventListener('touchstart', e => { onStart(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    cardEl.addEventListener('touchmove', e => { onMove(e.touches[0].clientX); }, { passive: true });
    cardEl.addEventListener('touchend', onEnd);
    // Mouse events
    cardEl.addEventListener('mousedown', e => { e.preventDefault(); onStart(e.clientX, e.clientY); });
    const mouseMove = e => onMove(e.clientX);
    const mouseUp = () => { onEnd(); document.removeEventListener('mousemove', mouseMove); document.removeEventListener('mouseup', mouseUp); };
    cardEl.addEventListener('mousedown', () => { document.addEventListener('mousemove', mouseMove); document.addEventListener('mouseup', mouseUp); });
  }

  _swipeHints() {
    return `<div class="swipe-hint swipe-hint-accept">✓</div><div class="swipe-hint swipe-hint-reject">✗</div>`;
  }

  // ── Meal card (swipe) ────────────────────────────────
  renderMealCard() {
    const m = this.currentMeal;
    const next = this.pickMeal();
    const isWeek = this.foodMode === 'week';
    const effortDots = m.effort === 'easy' ? '○' : m.effort === 'medium' ? '○○' : '○○○';
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.showFood()')}
        ${isWeek ? `
          <div class="week-progress">
            <div class="week-progress-label">${WEEKDAYS[this.weekDay]} <span class="week-progress-count">${this.weekDay+1}/5</span></div>
            <div class="week-progress-bar"><div class="week-progress-fill" style="width:${this.weekDay/5*100}%"></div></div>
          </div>` : ''}
        <div class="swipe-stack">
          ${next ? `<div class="swipe-card swipe-card-behind">${this._swipeMealInner(next)}</div>` : ''}
          <div class="swipe-card swipe-card-front" id="swipeCard">
            ${this._swipeHints()}
            ${this._swipeMealInner(m)}
          </div>
        </div>
        <div class="card-actions">
          <button class="action-btn action-reject" onclick="app.rejectMeal()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Nah, next
          </button>
          <button class="action-btn action-accept" onclick="app.acceptMeal()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${isWeek ? "Let's eat this" : "This one!"}
          </button>
        </div>
        ${!isWeek ? `<button class="plan-week-btn" onclick="app.startWeek()">📅 Plan this mood for the week — 5 dinners</button>` : ''}
      </section>`;
    this._initSwipe(document.getElementById('swipeCard'), () => this.acceptMeal(), () => this.rejectMeal());
  }

  _swipeMealInner(m) {
    const effortDots = m.effort === 'easy' ? '○' : m.effort === 'medium' ? '○○' : '○○○';
    return `
      <div class="swipe-card-emoji">${DIETARY_EMOJI[m.dietary] === '🐟' ? '🐟' : DIETARY_EMOJI[m.dietary] === '🌱' ? '🥗' : '🍽️'}</div>
      <h3 class="swipe-card-title">${m.name}</h3>
      <div class="swipe-card-meta">${m.cuisine} · ${m.prepTime} min</div>
      <div class="swipe-card-effort"><span class="effort-dots">${effortDots}</span> ${m.effort}</div>
      <p class="swipe-card-desc">"${m.description}"</p>
      <div class="swipe-card-badge">${DIETARY_EMOJI[m.dietary]} ${m.dietary}</div>`;
  }

  rejectMeal() {
    this.usedMealIds.add(this.currentMeal.id);
    this.currentMeal = this.pickMeal();
    this.renderMealCard();
  }

  acceptMeal() {
    this.recordChoice();
    this.usedMealIds.add(this.currentMeal.id);
    if (this.foodMode === 'week') {
      this.weekPlan.push({ day: WEEKDAYS[this.weekDay], meal: this.currentMeal });
      this.weekDay++;
      if (this.weekDay >= 5) { this.stats.weekPlans++; this.saveStats(); this.renderWeekPlan(); return; }
      this.currentMeal = this.pickMeal();
      this.renderMealCard();
    } else {
      this.checkedItems.clear();
      localStorage.removeItem('chcs_checked');
      this._renderFoodResult(this.currentMeal);
    }
  }

  _renderFoodResult(m) {
    const effortLabel = m.effort === 'easy' ? 'Easy' : m.effort === 'medium' ? 'Medium' : 'Involved';
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="result-card result-food">
          <p class="result-label">Tonight we're making</p>
          <h2 class="result-title">${m.name}</h2>
          <div class="result-emoji">${DIETARY_EMOJI[m.dietary] === '🐟' ? '🐟' : DIETARY_EMOJI[m.dietary] === '🌱' ? '🥗' : '🍽️'}</div>
          <div class="result-meta">${m.cuisine} · ${m.prepTime} min</div>
          <div class="result-meta">${effortLabel} · ${m.dietary}</div>
          <div class="result-divider"></div>
          <div class="result-ingredients">
            <h4>Ingredients</h4>
            <p>${m.ingredients.join(', ')}</p>
          </div>
          <div class="result-divider"></div>
          <div class="result-branding">CHCS</div>
        </div>
        ${this._checklistHTML(m.ingredients)}
        <div class="result-actions">
          ${this._favBtn('food', m.id)}
          <button class="result-action-btn" onclick="app.copyIngredients()">
            <span>📋</span> Copy list
          </button>
          <button class="result-action-btn" onclick="app.shareResult('food')">
            <span>📸</span> Share
          </button>
          <button class="result-action-btn" onclick="app.startTonight()">
            <span>🔄</span> Pick again
          </button>
        </div>
      </section>`;
    this._buildShareCard('food', m);
  }

  _mealCardHTML(m) {
    return `<div class="meal-card">
      <div class="meal-card-header"><span class="meal-cuisine">${m.cuisine}</span><span class="meal-effort effort-${m.effort}">${EFFORT_EMOJI[m.effort]} ${m.effort}</span></div>
      <h3 class="meal-name">${m.name}</h3><p class="meal-desc">${m.description}</p>
      <div class="meal-meta"><span class="meal-meta-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${m.prepTime} min</span><span class="meal-meta-item">${DIETARY_EMOJI[m.dietary]} ${m.dietary}</span></div>
      <div class="meal-ingredients"><h5>Shopping list</h5><div class="ingredient-tags">${m.ingredients.map(i=>`<span class="ingredient-tag">${i}</span>`).join('')}</div></div>
    </div>`;
  }

  // ── Week plan ──────────────────────────────────────────
  renderWeekPlan() {
    const all = {};
    this.weekPlan.forEach(e => e.meal.ingredients.forEach(i => { all[i.toLowerCase()] = i; }));
    const list = Object.values(all).sort();

    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .4s ease">
        ${this._backBtn('app.showFood()')}
        <div class="accepted-state"><div class="accepted-icon">📅</div><h2>Your week is set!</h2></div>
        <div class="week-plan-list">
          ${this.weekPlan.map(e => `
            <div class="week-plan-item">
              <div class="week-plan-day">${e.day}</div>
              <div class="week-plan-meal">
                <span class="week-plan-meal-name">${e.meal.name}</span>
                <span class="week-plan-meal-meta">${e.meal.cuisine} · ${EFFORT_EMOJI[e.meal.effort]} ${e.meal.effort} · ${e.meal.prepTime}m</span>
              </div>
            </div>`).join('')}
        </div>
        ${this._checklistHTML(list, 'Combined shopping list')}
        <button class="btn btn-primary mt-20" style="width:100%" onclick="app.startWeek()">Plan another week</button>
      </section>`;
  }

  // ── Movies: mood selection ─────────────────────────────
  showMovies() {
    this.usedMovieIds.clear();
    this.selectedMovieMood = localStorage.getItem('chcs_movie_mood_last') || null;
    this._renderMovieMoodScreen();
  }

  _applyMovieMood(mood) {
    this.selectedMovieMood = mood;
    if (mood) localStorage.setItem('chcs_movie_mood_last', mood);
    else localStorage.removeItem('chcs_movie_mood_last');

    this.movieFilters = { mood: null, genre: null, maxRuntime: null, moodList: null };
    if (mood === 'chill')         { this.movieFilters.moodList = ['light', 'funny']; }
    else if (mood === 'intense')  { this.movieFilters.mood = 'intense'; }
    else if (mood === 'think')    { this.movieFilters.mood = 'thought-provoking'; }
    else if (mood === 'laugh')    { this.movieFilters.mood = 'funny'; }
    else if (mood === 'short')    { this.movieFilters.maxRuntime = 120; }
    // 'surprise' → no filters
  }

  selectMovieMood(mood) {
    this._applyMovieMood(mood);
    this.currentMovie = this.pickMovie();
    this.renderMovieCard();
  }

  _renderMovieMoodScreen() {
    const moods = [
      { key: 'chill',   emoji: '😌', label: 'Chill',          desc: 'Light & easy vibes' },
      { key: 'intense', emoji: '🔥', label: 'Intense',        desc: 'Edge of your seat' },
      { key: 'think',   emoji: '🧠', label: 'Make me think',  desc: 'Thought-provoking' },
      { key: 'laugh',   emoji: '😂', label: 'Make me laugh',  desc: 'Comedy & fun' },
      { key: 'short',   emoji: '⏱️', label: 'Under 2 hours',  desc: 'Quick watch' },
    ];
    const last = this.selectedMovieMood;
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">🎬</span>
            <h2>What's the vibe?</h2>
            <p>Pick a mood and we'll find something to watch</p>
          </div>
          <div class="mood-grid stagger-in">
            ${moods.map(m => `
              <button class="mood-pill${last===m.key?' active':''}" onclick="app.selectMovieMood('${m.key}')">
                <span class="mood-pill-emoji">${m.emoji}</span>
                <span class="mood-pill-label">${m.label}</span>
                <span class="mood-pill-desc">${m.desc}</span>
              </button>`).join('')}
          </div>
          <button class="mood-surprise" onclick="app.selectMovieMood('surprise')">
            <span class="mood-pill-emoji">🎲</span>
            <span class="mood-pill-label">Surprise me</span>
          </button>
        </div>
      </section>`;
  }

  // ── Movie card (swipe) ──────────────────────────────────
  renderMovieCard() {
    const m = this.currentMovie;
    const next = this.pickMovie();
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.showMovies()')}
        <div class="swipe-stack">
          ${next ? `<div class="swipe-card swipe-card-behind">${this._swipeMovieInner(next)}</div>` : ''}
          <div class="swipe-card swipe-card-front" id="swipeCard">
            ${this._swipeHints()}
            ${this._swipeMovieInner(m)}
          </div>
        </div>
        <div class="card-actions">
          <button class="action-btn action-reject" onclick="app.rejectMovie()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Nah, next
          </button>
          <button class="action-btn action-accept" onclick="app.acceptMovie()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            This one!
          </button>
        </div>
      </section>`;
    this._initSwipe(document.getElementById('swipeCard'), () => this.acceptMovie(), () => this.rejectMovie());
  }

  _swipeMovieInner(m) {
    return `
      <div class="swipe-card-emoji">🎬</div>
      <h3 class="swipe-card-title">${m.title}</h3>
      <div class="swipe-card-meta">${m.year} · ${m.genre} · ${m.runtime} min</div>
      <p class="swipe-card-desc">"${m.pitch}"</p>
      <div class="swipe-card-badge">${MOOD_EMOJI[m.mood]} ${MOOD_LABELS[m.mood]}</div>
      <div class="swipe-card-streaming">${m.streaming.map(s=>`<span class="streaming-badge">${this._sIcon(s)} ${s}</span>`).join('')}</div>`;
  }

  _movieCardHTML(m, id) {
    return `<div class="movie-card"${id ? ` id="${id}"` : ''}>
      <div class="movie-mood-badge mood-${m.mood}">${MOOD_EMOJI[m.mood]} ${MOOD_LABELS[m.mood]}</div>
      <h3 class="movie-title">${m.title}</h3>
      <div class="movie-meta"><span>${m.year}</span><span class="meta-dot">·</span><span>${m.genre}</span><span class="meta-dot">·</span><span>${m.runtime} min</span></div>
      <p class="movie-pitch">${m.pitch}</p>
      <div class="movie-streaming">${m.streaming.map(s=>`<span class="streaming-badge">${this._sIcon(s)} ${s}</span>`).join('')}</div>
    </div>`;
  }

  rejectMovie() {
    this.usedMovieIds.add(this.currentMovie.id);
    this.currentMovie = this.pickMovie();
    this.renderMovieCard();
  }

  acceptMovie() {
    this.recordChoice();
    this._renderMovieResult(this.currentMovie);
  }

  _renderMovieResult(m) {
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="result-card result-movie">
          <p class="result-label">Tonight we're watching</p>
          <h2 class="result-title">${m.title}</h2>
          <div class="result-emoji">🎬</div>
          <div class="result-meta">${m.year} · ${m.genre} · ${m.runtime} min</div>
          <div class="result-divider"></div>
          <div class="result-details">
            <p>📺 Available on: ${m.streaming.join(', ')}</p>
            <p>🎭 ${m.genre} · ${MOOD_EMOJI[m.mood]} ${MOOD_LABELS[m.mood]}</p>
            <p>⏱️ ${m.runtime} minutes</p>
          </div>
          <div class="result-divider"></div>
          <div class="result-branding">CHCS</div>
        </div>
        <div class="result-actions">
          ${this._favBtn('movie', m.id)}
          <button class="result-action-btn" onclick="app.shareResult('movie')">
            <span>📸</span> Share
          </button>
          <button class="result-action-btn" onclick="app.showMovies()">
            <span>🔄</span> Pick again
          </button>
        </div>
      </section>`;
    this._buildShareCard('movie', m);
  }

  // ── Shopping checklist ─────────────────────────────────
  toggleCheck(item) {
    if (this.checkedItems.has(item)) this.checkedItems.delete(item);
    else this.checkedItems.add(item);
    localStorage.setItem('chcs_checked', JSON.stringify([...this.checkedItems]));
    const el = document.querySelector(`[data-item="${CSS.escape(item)}"]`);
    if (el) el.classList.toggle('checked');
  }

  clearChecklist() {
    this.checkedItems.clear();
    localStorage.removeItem('chcs_checked');
    document.querySelectorAll('.checklist-item.checked').forEach(el => el.classList.remove('checked'));
  }

  _checklistHTML(ingredients, title = 'Shopping list') {
    const items = ingredients.map(i => {
      const checked = this.checkedItems.has(i) ? ' checked' : '';
      return `<label class="checklist-item${checked}" data-item="${i}" onclick="app.toggleCheck('${i.replace(/'/g, "\\'")}')">
        <span class="checklist-box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>
        <span class="checklist-text">${i}</span>
      </label>`;
    }).join('');
    const count = ingredients.filter(i => this.checkedItems.has(i)).length;
    return `<div class="shopping-checklist">
      <div class="checklist-header">
        <h4>${title}</h4>
        <span class="checklist-count">${count}/${ingredients.length}</span>
      </div>
      <div class="checklist-items">${items}</div>
      ${count > 0 ? `<button class="checklist-clear" onclick="app.clearChecklist()">Uncheck all</button>` : ''}
    </div>`;
  }

  // ── Copy & Share ───────────────────────────────────────
  copyIngredients() {
    const text = this.currentMeal.ingredients.join('\n');
    navigator.clipboard.writeText(text).then(() => this._toast('Copied! ✓'));
  }

  _toast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('toast-visible'), 10);
    setTimeout(() => { el.classList.remove('toast-visible'); setTimeout(() => el.remove(), 300); }, 1800);
  }

  _buildShareCard(type, item) {
    const existing = document.getElementById('shareCard');
    if (existing) existing.remove();
    const div = document.createElement('div');
    div.id = 'shareCard';
    div.className = `share-card share-card-${type}`;
    if (type === 'food') {
      const m = item;
      div.innerHTML = `
        <div class="share-card-inner">
          <p class="share-card-label">Tonight we're making</p>
          <h2 class="share-card-title">${m.name}</h2>
          <div class="share-card-emoji">${DIETARY_EMOJI[m.dietary] === '🐟' ? '🐟' : DIETARY_EMOJI[m.dietary] === '🌱' ? '🥗' : '🍽️'}</div>
          <p class="share-card-meta">${m.cuisine} · ${m.prepTime} min</p>
          <p class="share-card-meta">${m.effort} · ${m.dietary}</p>
          <div class="share-card-divider"></div>
          <p class="share-card-ingredients">${m.ingredients.join(', ')}</p>
          <div class="share-card-divider"></div>
          <p class="share-card-brand">CHCS</p>
          <p class="share-card-tagline">Can't Handle Choosing Stuff</p>
        </div>`;
    } else {
      const m = item;
      div.innerHTML = `
        <div class="share-card-inner">
          <p class="share-card-label">Tonight we're watching</p>
          <h2 class="share-card-title">${m.title}</h2>
          <div class="share-card-emoji">🎬</div>
          <p class="share-card-meta">${m.year} · ${m.genre} · ${m.runtime} min</p>
          <p class="share-card-meta">${MOOD_EMOJI[m.mood]} ${MOOD_LABELS[m.mood]}</p>
          <p class="share-card-meta">📺 ${m.streaming.join(', ')}</p>
          <div class="share-card-divider"></div>
          <p class="share-card-brand">CHCS</p>
          <p class="share-card-tagline">Can't Handle Choosing Stuff</p>
        </div>`;
    }
    document.body.appendChild(div);
  }

  async shareResult(type) {
    const shareEl = document.getElementById('shareCard');
    if (!shareEl || typeof html2canvas === 'undefined') { this._toast('Share unavailable'); return; }
    try {
      this._toast('Generating image...');
      const canvas = await html2canvas(shareEl, { scale: 2, backgroundColor: null, useCORS: true });
      canvas.toBlob(async (blob) => {
        if (!blob) { this._toast('Failed to generate image'); return; }
        const file = new File([blob], `chcs-${type}-pick.png`, { type: 'image/png' });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: 'My CHCS Pick', text: type === 'food' ? `Tonight I'm making ${this.currentMeal.name}!` : `Tonight I'm watching ${this.currentMovie.title}!` });
            this._toast('Shared! 🎉');
          } catch (e) {
            if (e.name !== 'AbortError') this._downloadBlob(blob, `chcs-${type}-pick.png`);
          }
        } else {
          this._downloadBlob(blob, `chcs-${type}-pick.png`);
        }
      }, 'image/png');
    } catch (e) {
      this._toast('Failed to generate image');
    }
  }

  _downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this._toast('Image downloaded! 📸');
  }

  // ── Shared helpers ─────────────────────────────────────
  _backBtn(action) {
    return `<button class="back-btn" onclick="${action}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back</button>`;
  }



  // ── Nav ────────────────────────────────────────────────
  _updateNav(view) {
    document.querySelectorAll('.nav-item[id]').forEach(el => el.classList.remove('active'));
    const map = { home: 'nav-home', search: 'nav-search', favorites: 'nav-favorites', account: 'nav-account' };
    const el = map[view] && document.getElementById(map[view]);
    if (el) el.classList.add('active');
  }

  // ── Favorites ──────────────────────────────────────────
  toggleFavorite(type, id) {
    const key = `${type}:${id}`;
    if (this.favorites.has(key)) { this.favorites.delete(key); this._toast('Removed from saved'); }
    else { this.favorites.add(key); this._toast('Saved ♥'); }
    localStorage.setItem('chcs_favorites', JSON.stringify([...this.favorites]));
    const btn = document.getElementById('fav-btn');
    if (btn) {
      btn.classList.toggle('active', this.favorites.has(key));
      btn.querySelector('svg').setAttribute('fill', this.favorites.has(key) ? 'currentColor' : 'none');
    }
  }

  _favBtn(type, id) {
    const active = this.favorites.has(`${type}:${id}`);
    return `<button id="fav-btn" class="fav-btn${active ? ' active' : ''}" onclick="app.toggleFavorite('${type}','${id}')">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="${active ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      ${active ? 'Saved' : 'Save'}
    </button>`;
  }

  // ── Search ─────────────────────────────────────────────
  renderSearch() {
    this._updateNav('search');
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <div class="search-screen">
          <h2 class="section-title" style="margin-bottom:16px">Search</h2>
          <div class="search-input-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="search-input" id="searchInput" placeholder="Meals, movies…" oninput="app._doSearch(this.value)" autofocus>
          </div>
          <div class="search-results" id="searchResults">
            <p class="search-hint">Start typing to explore meals and movies.</p>
          </div>
        </div>
      </section>`;
  }

  _doSearch(q) {
    const results = document.getElementById('searchResults');
    if (!q.trim()) { results.innerHTML = '<p class="search-hint">Start typing to explore meals and movies.</p>'; return; }
    const term = q.toLowerCase();
    const meals = MEALS.filter(m => m.name.toLowerCase().includes(term) || m.cuisine.toLowerCase().includes(term) || (m.description && m.description.toLowerCase().includes(term)));
    const movies = MOVIES.filter(m => m.title.toLowerCase().includes(term) || m.genre.toLowerCase().includes(term) || (m.pitch && m.pitch.toLowerCase().includes(term)));
    if (!meals.length && !movies.length) { results.innerHTML = '<p class="search-hint">No results found.</p>'; return; }
    results.innerHTML = `
      ${meals.length ? `<h4 class="search-group-label">Meals (${meals.length})</h4>${meals.map(m => `
        <div class="search-result-item" onclick="app.currentMeal=MEALS.find(x=>x.id===${JSON.stringify(m.id)});app.foodMode='tonight';app._renderFoodResult(app.currentMeal)">
          <div class="sri-title">${m.name}</div>
          <div class="sri-meta">${m.cuisine} · ${m.effort} · ${m.prepTime} min</div>
        </div>`).join('')}` : ''}
      ${movies.length ? `<h4 class="search-group-label" style="margin-top:${meals.length ? '20px' : '0'}">Movies (${movies.length})</h4>${movies.map(m => `
        <div class="search-result-item" onclick="app.currentMovie=MOVIES.find(x=>x.id===${JSON.stringify(m.id)});app._renderMovieResult(app.currentMovie)">
          <div class="sri-title">${m.title}</div>
          <div class="sri-meta">${m.year} · ${m.genre} · ${m.runtime} min</div>
        </div>`).join('')}` : ''}`;
  }

  // ── Favorites view ──────────────────────────────────────
  renderFavorites() {
    this._updateNav('favorites');
    const favItems = [...this.favorites].map(key => {
      const [type, id] = key.split(':');
      if (type === 'food') { const m = MEALS.find(x => x.id === id); return m ? { type, item: m } : null; }
      if (type === 'movie') { const m = MOVIES.find(x => x.id === id); return m ? { type, item: m } : null; }
      return null;
    }).filter(Boolean);

    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <h2 class="section-title" style="margin-bottom:24px">Saved</h2>
        ${favItems.length ? `<div class="fav-list">${favItems.map(({ type, item }) => `
          <div class="fav-item" onclick="app.${type === 'food' ? `currentMeal=MEALS.find(x=>x.id===${JSON.stringify(item.id)});app.foodMode='tonight';app._renderFoodResult(app.currentMeal)` : `currentMovie=MOVIES.find(x=>x.id===${JSON.stringify(item.id)});app._renderMovieResult(app.currentMovie)`}">
            <div class="fav-icon">${type === 'food' ? '🍽️' : '🎬'}</div>
            <div class="fav-info">
              <div class="fav-title">${type === 'food' ? item.name : item.title}</div>
              <div class="fav-meta">${type === 'food' ? `${item.cuisine} · ${item.prepTime} min` : `${item.year} · ${item.genre}`}</div>
            </div>
            <button class="fav-remove" onclick="event.stopPropagation();app.toggleFavorite('${type}','${item.id}');app.renderFavorites()" title="Remove">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>`).join('')}</div>`
        : `<div class="fav-empty">
            <div class="fav-empty-icon">♡</div>
            <p>Nothing saved yet.</p>
            <p class="fav-empty-hint">Tap the heart on any result to save it here.</p>
          </div>`}
      </section>`;
  }

  // ── Account ─────────────────────────────────────────────
  renderAccount() {
    this._updateNav('account');
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <h2 class="section-title" style="margin-bottom:24px">Account</h2>
        <div class="account-placeholder">
          <div class="account-avatar">👤</div>
          <p class="account-coming">Account settings</p>
          <p class="account-hint">Coming soon — sync your picks, manage preferences, and more.</p>
        </div>
      </section>`;
  }

  _sIcon(p) {
    return { 'Netflix':'🔴', 'Disney+':'🏰', 'Amazon Prime':'📦', 'HBO Max':'🟪', 'MUBI':'🎞️' }[p] || '📺';
  }
}

const app = new CHCSApp();
