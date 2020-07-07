const mainList = 
{

    fakedb : [],
    
    initDB() //initialize fakedb data
    {
        this.fakedb.push({
            title : "Chicken Teriyaki",
            price : "$11.95",
            featured : true,
            imgPath : "Chicken_Teriyaki.jpg"
        })

        this.fakedb.push({
            title : "Butter Chicken with Mixed Vegetables",
            price : "$11.95",
            featured : false,
            imgPath : "Butter_Chicken.jpg"
        })

        this.fakedb.push({
            title : "Sundried Tomato and Basil Pesto Chicken Linguini",
            price : "$10.76",
            featured : false,
            imgPath : "Sun-dried_Tomato_and_Basil_Pesto_Chicken_Linguine.jpg"
        })

        this.fakedb.push({
            title : "Roasted Chicken and Gravy",
            price : "$11.95",
            featured : false,
            imgPath : "Roasted_Chicken_and_Gravy.jpg"
        })

        this.fakedb.push({
            title : "Garlic Butter Salmon (Contains Dairy)",
            price : "$11.95",
            featured : false,
            imgPath : "Garlic_Butter_Salmon.jpg"
        })

        this.fakedb.push({
            title : "Beef Gratin",
            price : "$11.95",
            featured : false,
            imgPath : "Beef_Gratin.jpg"
        })

        this.fakedb.push({
            title : "Pan Roast Mushroom Chicken",
            price : "$10.76",
            featured : false,
            imgPath : "Pan_Roast_Mushroom_Chicken.jpg"
        })

        this.fakedb.push({
            title : "Coconut Curry Shrimp",
            price : "$11.95",
            featured : false,
            imgPath : "Coconut_Curry_Shrimp.jpg"
        })
    },

    getAllProducts()
    {
        return this.fakedb; //return all fake data
    },

    getFeaturedProducts()
    {

    }

}

mainList.initDB();

//export default product;
module.exports = mainList;