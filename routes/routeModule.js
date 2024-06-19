const accountRoutes = require('./accounts');
const salesRoutes = require('./sales');
const salesBookingRoutes = require('./Sales/salesBookingRoutes');
const vendorTypeRoutes = require('./PMS2/vendorTypeRoutes');
const vendorGroupLinkRoutes = require('./PMS2/vendorGroupLinkRoutes');
const vendorPlatformRoutes = require('./PMS2/vendorPlatformRoutes');
const vendorPaymentMethodRoutes = require('./PMS2/paymentMethodRoutes');
const vendorPayCycleRoutes = require('./PMS2/payCycleRoutes');
const groupLinkTypeRoutes = require('./PMS2/groupLinkTypesRoutes');
const bankDetailsRoutes = require('./PMS2/bankDetailsRoutes');
const vendorRoutes = require("./PMS2/vendorRoutes")
const countryCodeRoutes = require("./PMS2/countryCodeRoutes")
const ipAuthRoutes = require("./common/ipAuthRoutes")
const pageProfileRoutes = require("./PMS2/pageProfileTypeRoutes");
const pageCategoryRoutes = require("./PMS2/pageCategoryRoutes");
const pagePriceTypeRoutes = require("./PMS2/pagePriceTypeRoutes");
const pagePriceMultipleRoutes = require("./PMS2/pagePriceMultipleRoutes");
const pageMasterRoutes = require("./PMS2/pageMasterRoutes");
const pageStatesRoutes = require("./PMS2/pageStatesRoutes");
const paymentDetailsRoutes = require("./Sales/paymentDetailsRoutes");
const paymentModeRoutes = require("./Sales/paymentModeRoutes");
const serviceMasterRoutes = require("./Sales/salesServiceMasterRoutes");
const recordServiceRoutes = require("./Sales/recordServiceRoutes");
const recordServicePagesRoutes = require("./Sales/recordServicePageRoutes");
const paymentUpdateRoutes = require("./Sales/paymentUpdateRoutes");
const executionRoutes = require("./Sales/executionRoutes");
const reasonCreditApprovalRoutes = require("./Sales/reasonCreditApprovalRoutes");
const incentivePlanRoutes = require("./Sales/incentivePlanRoutes");
const badgesMasterRoutes = require("./Sales/badgesMasterRoutes");
const bankNameRoutes = require("./PMS2/bankNameRoutes");
const companyDetailsRoutes = require("./PMS2/companyDetailsRoutes");
const documentDetailsRoutes = require("./PMS2/documentDetailsRoutes");
const autoIncentiveCalculationRoutes = require("./Sales/autoIncentiveCalculationRoutes");
const invoiceParticularRoutes = require("./Sales/invoiceParticularRoutes");

//used for the http://localhost:8080/api/v1/end-points
exports.routeModulesV1 = [
    vendorTypeRoutes,
    countryCodeRoutes,
    ipAuthRoutes,
    vendorGroupLinkRoutes,
    vendorPlatformRoutes,
    vendorPayCycleRoutes,
    groupLinkTypeRoutes,
    vendorPaymentMethodRoutes,
    bankDetailsRoutes,
    vendorRoutes,
    pageProfileRoutes,
    pageCategoryRoutes,
    pagePriceTypeRoutes,
    pagePriceMultipleRoutes,
    pageMasterRoutes,
    pageStatesRoutes,
    bankNameRoutes,
    companyDetailsRoutes,
    documentDetailsRoutes
];

//used for the http://localhost:8080/api/end-points
exports.routeModules = [
    accountRoutes,
    salesRoutes,
    salesBookingRoutes,
    paymentDetailsRoutes,
    paymentModeRoutes,
    serviceMasterRoutes,
    recordServiceRoutes,
    recordServicePagesRoutes,
    paymentUpdateRoutes,
    executionRoutes,
    reasonCreditApprovalRoutes,
    incentivePlanRoutes,
    badgesMasterRoutes,
    autoIncentiveCalculationRoutes,
    invoiceParticularRoutes
];

