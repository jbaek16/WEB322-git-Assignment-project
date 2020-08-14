const menu = 
{

    fakedb : [],
    
    initDB() //initialize fakedb data
    {
        this.fakedb.push({
            title : "Chicken Teriyaki",
            category: "Chicken",
            price : "$11.95",
            desc : "Subtle hints of ginger and teriyaki sauce paired with our seasoned chicken over rice and vegetables",
            img : "Chicken_Teriyaki.jpg",
            top:true,
        })

        this.fakedb.push({
            title : "Butter Chicken with Mixed Vegetables",
            category: "Vegetable",
            price : "$11.95",
            desc : "House made butter chicken sauce with roasted chicken and seasoned rice",
            img : "Butter_Chicken.jpg",
            top:true,
        })

        this.fakedb.push({
            title : "Sundried Tomato and Basil Pesto Chicken Linguini",
            category:"Chicken",
            price : "$10.76",
            desc :"Our zesty creation featuring sundried tomatoes and basil pesto over our roasted chicken in creamy garlic sauce" ,
            img : "Sun-dried_Tomato_and_Basil_Pesto_Chicken_Linguine.jpg",
            top:true,
        })

        this.fakedb.push({
            title : "Roasted Chicken and Gravy",
            category:"Chicken",
            price : "$11.95",
            desc : "Our tender, roast pork tenderloin with homestyle gravy and vegetables",
            img : "Roasted_Chicken_and_Gravy.jpg",
            top:true,
        })

        this.fakedb.push({
            title : "Garlic Butter Salmon (Contains Dairy)",
            category: "Fish",
            price : "$11.95",
            desc : "Our whipped garlic butter on top our baked salmon with vegetables",
            img : "Garlic_Butter_Salmon.jpg"
        })

        this.fakedb.push({
            title : "Beef Gratin",
            category: "Beef",
            price : "$11.95",
            desc : "A dish light browned in the crust, in this case fresh grated Parmesan Reggiano baked in Kale, with our creamy melt sauce, paired with our slow roast marinated triple AAA Roast Beef",
            img : "Beef_Gratin.jpg"
        })

        this.fakedb.push({
            title : "Pan Roast Mushroom Chicken",
            category: "Chicken",
            price : "$10.76",
            desc : "Roasted chicken with authentic pan gravy featuring hints of tarragon, black pepper and house spices",
            img : "Pan_Roast_Mushroom_Chicken.jpg"
        })

        this.fakedb.push({
            title : "Coconut Curry Shrimp",
            category: "Fish",
            price : "$11.95",
            featured : "Toasted cumin and coconut are brought together with sautéed shrimp in our curry sauce",
            img : "Coconut_Curry_Shrimp.jpg"
        })
    },

    getAllProducts()
    {
        return this.fakedb; //return all fake data
    },

    bestMeals() {

        topMeal = [];

        for (var i = 0; i < this.fakedb.length; i++)
            if (this.fakedb[i].top == true)
            {
            topMeal.push(this.fakedb[i]);
            }
        return topMeal;
    }
}

menu.initDB();

//export default product;
module.exports = menu;