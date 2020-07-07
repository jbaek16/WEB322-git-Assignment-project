const product = 
{

    fakedb : [],
    
    initDB() //initialize fakedb data
    {
        this.fakedb.push({
            title : "Weight Loss",
            description : "High protein, low-calorie meals with a nutrient profile tuned for weight loss" ,
            price : "$145",
            featured : true,
             imgPath : "WEIGHT_LOSS.jpg"
        })

        this.fakedb.push({
            title : "Muscle Gain",
            description : "Higher protein and calorie portions to support your muscle gain momentum" ,
            price : "$159",
            featured : false,
            imgPath : "Muscle_Gain.jpg" 
        })

        this.fakedb.push({
            title : "Keto",
            description : "High fat, low carb meals with moderate protein to achieve and sustain ketosis" ,
            price : "$159",
            featured : false,
            imgPath : "KETO.jpg" 
        })

        this.fakedb.push({
            title : "Fat Burner",
            description : "Low carb, nutrient-rich meals with fat-burning profiles to support fat loss" ,
            price : "$159",
            featured : false,
            imgPath : "FAT_BURNER.jpg"
        })

        this.fakedb.push({
            title : "Vegan",
            description : "LA fully plant-based package featuring vegan meat and no animal products" ,
            price : "$159",
            featured : false,
            imgPath : "VEGAN.jpg"
        })

        this.fakedb.push({
            title : "Veggie",
            description : "A vegetarian-friendly package with a natural and nutrient-rich approach" ,
            price : "$159",
            featured : false,
            imgPath : "VEGGIES.jpg"
        })

        this.fakedb.push({
            title : "Gluten Free",
            description : "A gluten-free package with the same balanced profile as our other packages" ,
            price : "$159",
            featured : false,
            imgPath : "GLUTEENFREE.jpg"
        })

        this.fakedb.push({
            title : "Prebiotic Soup Cleanse",
            description : "A protein-packed meal and two superb prebiotic soups per day for up to 14 days" ,
            price : "$129",
            featured : false,
            imgPath : "PREBIOTIC.jpg"
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

product.initDB();

//export default product;
module.exports = product;