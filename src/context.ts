
import { environment } from "./environments/environment";

//with angular environment
    
// const contextPaths = {
//     appraisal: environment.apiUrl+"/keyassure/api/appraisal/1.0/appraisal",
//     configcodes: environment.apiUrl+"/keyassure/api/configcodes/1.0/configcodes",
//     inventory: environment.apiUrl+"/keyassure/api/inventoryvehicle/1.0/inventory",
//     offers:environment.apiUrl+ "/keyassure/api/offers/1.0/offers",
//     shipment: environment.apiUrl+"/keyassure/api/shipment/1.0/shipment",
//     tradeBuy: environment.apiUrl+"/keyassure/api/tradebuyvehicles/1.0/tradeBuy",
//     trainingportal: environment.apiUrl+"/keyassure/api/factorytraining/1.0/trainingportal",
//     userregistration: environment.apiUrl+"/keyassure/api/userregistration/1.0/user",
//     dealerregistration: environment.apiUrl+"/keyassure/api/dealerregistration/1.0/dealer"
// }

//for server

// const contextPaths = {
//     appraisal: "/keyassure/api/appraisal/1.0/appraisal",
//     configcodes: "/keyassure/api/configcodes/1.0/configcodes",
//     inventory: "/keyassure/api/inventoryvehicle/1.0/inventory",
//     offers:"/keyassure/api/offers/1.0/offers",
//     shipment: "/keyassure/api/shipment/1.0/shipment",
//     tradeBuy: "/keyassure/api/tradebuyvehicles/1.0/tradeBuy",
//     trainingportal: "/keyassure/api/factorytraining/1.0/trainingportal",
//     userregistration: "/keyassure/api/userregistration/1.0/user",
//     dealerregistration: "/keyassure/api/dealerregistration/1.0/dealer"
// }

//for local

const contextPaths = {
    appraisal: "https://services-test.keyassure.live/appraisal",
    configcodes: "https://services-test.keyassure.live/configcodes",
    inventory: "https://services-test.keyassure.live/inventory",
    offers:"https://services-test.keyassure.live/offers",
    shipment: "https://services-test.keyassure.live/shipment",
    tradeBuy: "https://services-test.keyassure.live/tradeBuy",
    trainingportal:"https://services-test.keyassure.live/trainingportal",
    userregistration: "https://services-test.keyassure.live/user",
    dealerregistration: "https://services-test.keyassure.live/dealer"
}

// const contextPaths="https://services-test.keyassure.live"
export default contextPaths;