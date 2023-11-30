const { default: mongoose } = require("mongoose");
// const AutoIncrement = require("mongoose-auto-increment");

const campaignPlanSchema = new mongoose.Schema({
    planName:{
        type:String,
        required:[true,"plan name is required."]
    },
    vendor_id:{
        type:String,
        required:[true,"vendor is required"]
    },
    p_id:{
        type:String,
        required:[true,"page id is required."]
    },
    postPerPage:{
        type:String,
        required:[true,'post per page is required']
    },
    postRemaining:{
        type:String,
        default:this.postPerPage
    },  
    campaignName:{
        type:String,
        required:[true,"campign name is required"]
    },
    campaignId:{
        type:String,
        required:[true,"campaign id is required"]
    },
    page_name:{
        type:String,
        // required:[true,"campaign id is required"]
    },
    cat_name:{
        type:String,
        // required:[true,"campaign id is required"]
    },
    platform:{
        type:String,
        // required:[true,"campaign id is required"]
    },
    follower_count:{
        type:String,
        // required:[true,"campaign id is required"]
    },
    page_link:{
        type:String,
        // required:[true,"campaign id is required"]
    },
    
    createdAt:{
        type:Date,
        default:Date.now()
    },
    modifiedAt:{
        type:Date
    }
});


module.exports = mongoose.model(
  "CampaignPlanModel",
  campaignPlanSchema
);
