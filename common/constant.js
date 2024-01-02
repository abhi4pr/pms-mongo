module.exports = Object.freeze({
  base_url: "http://34.93.135.33:8080",
  // base_url: "http://34.93.221.166:3000",
 local_base_url: "http://localhost:8080",
  CREATOR_INSIGHTS: "https://app.ylytic.com/ylytic/api/v1/rt_tracking/insights",
  CF_INSTA_API: "https://www.instagram.com/trolls_official/?__a=1&__d=dis",
  INSTA_C_MODELS: 1,
  INSTA_P_MODELS: 2,
  ADMIN_ROLE: 1,
  SWAGGER_ADMIN: 1,
  SWAGGER_DEVELOPER: 2,

  /* JWT  */
  SECRET_KEY_LOGIN:"thisissecret12",
  SECRET_KEY_DOC_LOGIN:"docloginsect1234d",
  CONST_VALIDATE_SESSION_EXPIRE_DOC:"1h",
  CONST_SESSION_TIME_FOR_SWAGGER : 1500000,  //   1/2 hours
  CONST_VALIDATE_SESSION_EXPIRE: '24h',
  CONST_EMAIL_VERIFICATION_EXPIRED: '10m',

  /* Response messages */ 

  //Common msg
  CREATED_SUCCESSFULLY :"Data Created Successfully...",
  DELETED_SUCCESSFULLY :"Data Deleted Successfully...",
  UPDATED_SUCCESSFULLY :"Data Updated Successfully...",
  FETCH_SUCCESSFULLY :"Data Updated Successfully...",
  NO_RECORD_FOUND:"No Record found..."

  /* html template usages */
  // <img
  //       src="https://media.licdn.com/dms/image/C4D0BAQF6QHYd1myKyw/company-logo_200_200/0/1630521048751/creative_fuel_io_logo?e=2147483647&v=beta&t=E0hyxWgbSM42fPDcFCT-q7Y9LvSuysj-dLMWcVC1aSw"
  //       alt="CreativeFuel Logo"
  //     />
 
});
