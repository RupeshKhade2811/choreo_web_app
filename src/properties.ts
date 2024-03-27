import contextPaths from "./context";


// const urls={
 
//     //appraisal
//     addAppraisalVehicles:contextPaths.appraisal+"/addAppraiseVehicle",
//     deleteAppraisal:contextPaths.appraisal+"/deleteAppraisal/",
//     getAppraisalcards:contextPaths.appraisal+"/getAppraisalsCards",
//     getFavouriteCards:contextPaths.appraisal+"/getFavoriteCards",
//     appraisalGetPic1:contextPaths.appraisal+"/getpic1",
//     vinNumber:contextPaths.appraisal+"/getvehicleinfo",
//     checkVinNumberAvailable:contextPaths.appraisal+"/checkVehicleAvailable",
//     moveToInventory:contextPaths.appraisal+"/moveToInventory",
//     moveToWishList :contextPaths.appraisal+"/moveToWishList",
//     removeFavorite :contextPaths.appraisal+"/removeFavorite",
//     sendingEmail :contextPaths.appraisal+"/sendingEmail",
//     showToUi :contextPaths.appraisal+"/showToUi",
//     updateAppraiseVehicle :contextPaths.appraisal+"/updateAppraiseVehicle",
//     updateDraftAppraisalVehicle:contextPaths.appraisal+"/updateDraftAppraiseVehicle",
//     uploadImage :contextPaths.appraisal+"/uploadImage",
//     uploadVideo :contextPaths.appraisal+"/uploadVideo",
//     downloadVideo:contextPaths.appraisal+"/downloadVideo",
//     draftApprVeh:contextPaths.appraisal+"/draftApprVeh",
//     draftUpdateAppraisal:contextPaths.appraisal+"/updateDraftAppraiseVehicle",
//     printAppraisal:contextPaths.appraisal+"/apprFormPdf",
//     keyAssureReportDownload:contextPaths.appraisal+"/keyAssureDownload",
//     keyAssureReportPreview:contextPaths.appraisal+"/keyAssurePreview",
 
//     //configcodes
//     dropDowns :contextPaths.configcodes+"/dropDowns",
//     roleDropdown:contextPaths.configcodes+"/roleDropDowns",
 
 
//     //Inventory
//     getInventoryCards :contextPaths.inventory+"/getInventoryCards",
//     getSearchFactory :contextPaths.inventory+"/getSearchFactory",
//     inventoryHoldVehicle :contextPaths.inventory+"/holdvehicle",
//     inventoryUnholdVehicle :contextPaths.inventory+"/unholdvehicle",
//     inventorySoldRetailOn:contextPaths.inventory+"/soldRetailOn",
//     inventorySoldRetailOff:contextPaths.inventory+"/soldRetailOff",
//     inventorySoldWholesaleOn:contextPaths.inventory+"/soldWholesaleOn",
//     inventorySoldWholesaleOff:contextPaths.inventory+"/soldWholesaleOff",
 
//     //offers
//     offersBuyerAccepted :contextPaths.offers+"/buyerAccepted",
//     offersBuyerQuotes :contextPaths.offers+"/buyerQuotes",
//     offersBuyerRejected :contextPaths.offers+"/buyerRejected",
//     offersGetLiqCards :contextPaths.offers+"/getLiqCards",
//     offersGetOffers :contextPaths.offers+"/getOffers",
//     offersGetProcuCardInfo :contextPaths.offers+"/getProcuCardInfo",
//     offersGetProcurementCards :contextPaths.offers+"/getProcurementCards",
//     offersmakeOffer :contextPaths.offers+"/makeOffer",
//     offersOfferEmail :contextPaths.offers+"/offerEmail",
//     offersSellerAccepted :contextPaths.offers+"/sellerAccepted",
//     offersSellerQuotes :contextPaths.offers+"/sellerQuotes",
//     offersSellerRejected :contextPaths.offers+"/sellerRejected",
//     offersShowLiqCardInfo :contextPaths.offers+"/showLiqCardInfo",
 
//     //shipment
//     shipmentGetPurCarCards :contextPaths.shipment+"/getPurCarCards",
//     shipmentGetSoldCarCards :contextPaths.shipment+"/getSoldCarCards",
//     getPdfList:contextPaths.shipment+"/pdf",
//     printOdometerPdf:contextPaths.shipment+"/odometerPdf",
//     printBuyerOrderPdf:contextPaths.shipment+"/buyerOrderPdf",
//     printVehReportPdf:contextPaths.shipment+"/vehRepPdf",
//     buyerAgreedSign:contextPaths.shipment+"/buyerAgreed",
//     sellerAgreedSign:contextPaths.shipment+"/sellerAgreed",
//     dealerInventoryReport:contextPaths.shipment+"/dlrInvntryTableList",
//     salesReport:contextPaths.shipment+"/saleTableList",
//     purchaseReport:contextPaths.shipment+"/purchaseTableList",
//     dealerInvnPdf:contextPaths.shipment+"/genDlrInvntryReport",
//     salesPdf:contextPaths.shipment+"/genSalesReport",
//     purchasePdf:contextPaths.shipment+"/genPurchaseReport",
//     shipmentMailAttachment:contextPaths.shipment+"/mailAttach",
 
//     //tradebuy
//     getAvailableTradeCards :contextPaths.tradeBuy+"/getAvailableTradeCards",
//     getFactoryOffersCards :contextPaths.tradeBuy+"/getFactoryOffersCards",
//     showAvailableTradeCardInfo :contextPaths.tradeBuy+"/showAvailableTradeCardInfo",
//     showFactoryOffersCardInfo :contextPaths.tradeBuy+"/showFactoryOffersCardInfo",
 
//     //training portal    
//     trainingPortalGetData:contextPaths.trainingportal+"/trainingDownload",
//     trainingPortalCreateVideo:contextPaths.trainingportal+"/trainingUpload",
 
//     //user registration
//     checkUserName:contextPaths.userregistration+"/checkUserName",
//     getUserDetails:contextPaths.userregistration+"/getUser",
//     logIn:contextPaths.userregistration+"/findUser",
//     showUser:contextPaths.userregistration+"/showUser",
//     userRegister:contextPaths.userregistration+"/registerUser",
//     corporateDealerList:contextPaths.userregistration+"/corDlrList",
 
//     //dealer registration    
//     dealerRegister:contextPaths.dealerregistration+"/savedealer",
 
 
   
//     //filter urls
//     appraisalFilter:contextPaths.appraisal+"/appraisalfilter",
//     inventoryFilter:contextPaths.appraisal+"/inventoryfilter",
//     searchFactoryFilter:contextPaths.appraisal+"/searchfactoryfilter",
//     filterDropDown:contextPaths.configcodes+"/getAllFilterParams",
   
//     //dealershipCheck
 
// checkDealershipName:contextPaths.dealerregistration+"/chkDealershipname",
// //uploadDocumentInRegistration
// uploadDoc:contextPaths.dealerregistration+"/uploadPdf",
 
// dealerRegistrationMail:contextPaths.dealerregistration+"/dlrCreationMail",
 
// searchFactMangFactSalesCorpDealer:contextPaths.userregistration+"/userList",
 
// searchDealerByName:contextPaths.dealerregistration+"/searchDlrD2",
 
// showDealer:contextPaths.dealerregistration+"/showDealer",
 
// updateDealer:contextPaths.dealerregistration+"/dealerUpdate",
 
 
// userProfilePicUpload:contextPaths.userregistration+"/uploadProfilePic",
 
// getProfilePic:contextPaths.userregistration+"/getProfilePic",
 
 
// updateUser:contextPaths.userregistration+"/userUpdate",
// //document print urls in shipment
// printAppraisalReport:contextPaths.shipment+"/apprReportPdf",
//     printTaxReport:contextPaths.shipment+"/taxReportPdf",
//     printDealerLicense:contextPaths.shipment+"/licenseReportPdf",
//     fetchAccessToken:contextPaths.appraisal+"/getAccessToken",
//     deleteUser:contextPaths.userregistration+"/deleteUser",
//     deaInvMakeDropDown:contextPaths.shipment+"/dlrInvVehMakeDropDown",
//     payment:contextPaths.shipment+"/payment",
//     //Identity server
//     getUserId:"/keyassure/user/getUserId",
   
 
 
// }


const urls={
 

    dash:contextPaths.dashboard+"/getweatherinfo",
    //appraisal
    addAppraisalVehicles:contextPaths.appraisal+"/addAppraiseVehicle",
    deleteAppraisal:contextPaths.appraisal+"/deleteAppraisal",
    getAppraisalcards:contextPaths.appraisal+"/apprList",
    getFavouriteCards:contextPaths.appraisal+"/getFavoriteCards",
    appraisalGetPic1:contextPaths.appraisal+"/downloadImage",
   
    checkVinNumberAvailable:contextPaths.appraisal+"/checkVehicleAvailable",
    moveToInventory:contextPaths.appraisal+"/moveToInventory",
    moveToWishList :contextPaths.appraisal+"/moveToWishList",
    removeFavorite :contextPaths.appraisal+"/removeFavorite",
    sendingEmail :contextPaths.appraisal+"/sendingEmail",
    showToUi :contextPaths.appraisal+"/showToUi",
    updateAppraiseVehicle :contextPaths.appraisal+"/updateAppraiseVehicle",
    updateDraftAppraisalVehicle:contextPaths.appraisal+"/updateDraftAppraiseVehicle",
    uploadImage :contextPaths.appraisal+"/uploadImage",
    uploadVideo :contextPaths.appraisal+"/uploadVideo",
    downloadVideo:contextPaths.appraisal+"/downloadVideo",
    draftApprVeh:contextPaths.appraisal+"/draftApprVeh",
    draftUpdateAppraisal:contextPaths.appraisal+"/updateDraftAppraiseVehicle",
  
  
    //configcodes
    dropDowns :contextPaths.configcodes+"/dropDowns",
    
 
 
    //Inventory
    getInventoryCards :contextPaths.inventory+"/getInventoryCards",
    getSearchFactory :contextPaths.inventory+"/getSearchFactory",
    buyCar:contextPaths.searchfactory+"/buyCar",
   
 
   
    //shipment
    shipmentGetPurCarCards :contextPaths.shipment+"/getPurCarCards",
    shipmentGetSoldCarCards :contextPaths.shipment+"/getSoldCarCards",
    
    //training portal    
    
    //user registration
    checkUser:contextPaths.userregistration+"/fetchUser",
    getUserDetails:contextPaths.userregistration+"/getUser",
    logIn:contextPaths.userregistration+"/findUser",
    showUser:contextPaths.userregistration+"/showUser",
    userRegister:contextPaths.userregistration+"/addUser",
    corporateDealerList:contextPaths.userregistration+"/corDlrList",
    usercount:contextPaths.userregistration+"/userCount",
    editUser:contextPaths.userregistration+"/editUser",
    uploadprofilePic:contextPaths.userregistration+"/uploadProPic",
    getProfilePic:contextPaths.userregistration+"/downloadImage",
 
 
   
    //filter urls
    appraisalFilter:contextPaths.appraisal+"/appraisalfilter",
    inventoryFilter:contextPaths.appraisal+"/inventoryfilter",
    searchFactoryFilter:contextPaths.appraisal+"/searchfactoryfilter",
    filterDropDown:contextPaths.configcodes+"/getAllFilterParams",
   
    //dealershipCheck
 
//uploadDocumentInRegistration

 
userProfilePicUpload:contextPaths.userregistration+"/uploadProfilePic",
 
//getProfilePic:contextPaths.userregistration+"/getProfilePic",
 
 
updateUser:contextPaths.userregistration+"/userUpdate",
//document print urls in shipment
printAppraisalReport:contextPaths.shipment+"/apprReportPdf",
   
    fetchAccessToken:contextPaths.appraisal+"/getAccessToken",
    deleteUser:contextPaths.userregistration+"/deleteUser",
   
    payment:contextPaths.shipment+"/payment",
    //Identity server
    getUserId:"/keyassure/user/getUserId",
   
 
 
}
export default urls;