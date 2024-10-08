module.exports = {
    saleBookingStatus: {
        '01': {
            status: "Sale Booking Created",
            discription: "Sale Booking Only Created.No Other operation start yet.",
            code: 1
        },
        '02': {
            status: "Payment Approval Pending(Finance)",
            discription: "Payment of sale booking is requested.Response is pending from Finance.",
            code: 2
        },
        '03': {
            status: "Credit Approval Pending(Manager)",
            discription: "Sale booking is sent for credit approval to BDM and Admin ,Response is pending from BDM or Admin.",
            code: 3
        },
        '04': {
            status: "Pending for Record Services",
            discription: "Sale booking is ready for create record service.After Either Full payment received or Credit approved by admin or BDM ,or Sales Executive used his own credit.",
            code: 4
        },
        '05': {
            status: "Request for Execution",
            discription: "After Record service creation.record service is ready for send to Execution.",
            code: 5
        },
        '06': {
            status: "Pending for Execution Approval",
            discription: "After Record service is sent to Execution.Pending for response from Execution team.",
            code: 6
        },
        '07': {
            status: "Execution Accepted",
            discription: "Execution Accepted from Execution Team.",
            code: 7
        },
        '08': {
            status: "Execution Rejected",
            discription: "Execution Rejected from Execution Team.",
            code: 8
        },
        '09': {
            status: "Execution Done",
            discription: "Execution Done from Execution Team.",
            code: 9
        },
        '10': {
            status: "Execution Paused",
            discription: "Execution Paused By Sales Executive.",
            code: 10
        },
        '11': {
            status: "Payment Closed",
            discription: "Full payment received and Execution is done.",
            code: 11
        },
        '12': {
            status: "Requested Amount Approved.Balance Amount Request Pending.",
            discription: "Requested Amount Approved. Balance Amount (partial payment) Request Pending.",
            code: 12
        },
        '13': {
            status: "Payment Approval Request Rejected(Finance)",
            discription: "Payment of sale booking is requested.Response is Rejected from Finance.",
            code: 13
        },
    },
    incentiveCalculationUserLimit: 50000,
    //email for Sales booking and payment update
    // salesEmail: "amanrathod197@gmail.com,naveen@creativefuel.io"
    salesEmail: "nikhil@creativefuel.io,tushar@creativefuel.io,tiyawadhwani@creativefuel.io"
}