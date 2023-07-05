const mongoose = require('mongoose');
const dbURL="mongodb+srv://latchireddiekalavya:ekalavya123@cluster0.b3g5piw.mongodb.net/gofoodmern?retryWrites=true&w=majority";


const connectDB = async () => {
    await mongoose.connect(dbURL,{useNewUrlParser:true},async(err,res) =>{
        if(err) console.log("---",err)
        else{
            console.log('Mongo connected');
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err, data) {
                const foodCategory =await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err, catData){
                    if(err) console.log(err);
                    else{
                        global.food_items=data;
                        global.foodCategory=catData;
                    }
                })
              
        })
    }
    }); 
}

module.exports = connectDB;