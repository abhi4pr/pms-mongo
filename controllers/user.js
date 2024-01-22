const userModel = require('../models/userModel.js');
const multer = require("multer");
const jwt = require("jsonwebtoken");
const userAuthModel = require('../models/userAuthModel.js');
const path = require("path");
const jobResponsibilityModel = require('../models/jobResponsibilityModel.js');
const userOtherFieldModel = require('../models/userOtherFieldModel.js');
const reasonModel = require('../models/reasonModel.js');
const separationModel = require('../models/separationModel.js');
const attendanceModel = require('../models/attendanceModel.js');
const userLoginHisModel = require('../models/userLoginHisModel.js')
const notificationModel = require('../models/notificationModel.js')
const objModel = require('../models/objModel.js');
const constant = require('../common/constant.js');
const response = require("../common/response");
const documentModel = require("../models/documentModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
const ejs = require('ejs');
const nodemailer = require("nodemailer");
const userDocManagmentModel = require("../models/userDocManagementModel.js");
const sendMail = require("../common/sendMail.js");
const helper = require('../helper/helper.js');
const OrderRequest = require("../models/orderReqModel.js");
const Sitting = require("../models/sittingModel.js");
const { generateEmpId } = require("../helper/helper.js");
const departmentModel = require("../models/departmentModel.js");
const designationModel = require("../models/designationModel.js");
const deptDesiAuthModel = require("../models/deptDesiAuthModel.js");
const emailTempModel = require("../models/emailTempModel");
const vari = require("../variables.js");
const { storage } = require('../common/uploadFile.js');

// const upload = multer({ dest: "uploads/" }).fields([
//     { name: "image", maxCount: 1 },
//     { name: "UID", maxCount: 1 },
//     { name: "pan", maxCount: 1 },
//     { name: "highest_upload", maxCount: 1 },
//     { name: "other_upload", maxCount: 1 },
//     { name: "tenth_marksheet", maxCount: 1 },
//     { name: "twelveth_marksheet", maxCount: 1 },
//     { name: "UG_Marksheet", maxCount: 1 },
//     { name: "passport", maxCount: 1 },
//     { name: "pre_off_letter", maxCount: 1 },
//     { name: "pre_expe_letter", maxCount: 1 },
//     { name: "pre_relieving_letter", maxCount: 1 },
//     { name: "bankPassBook_Cheque", maxCount: 1 },
//     { name: "joining_extend_document", maxCount: 1 },
//     { name: "digital_signature_image", maxCount: 1 },
//     { name: "annexure_pdf", maxCount: 1 }
// ]);

const upload = multer({
    storage: multer.memoryStorage()
}).fields([
    { name: "image", maxCount: 1 },
    { name: "UID", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "highest_upload", maxCount: 1 },
    { name: "other_upload", maxCount: 1 },
    { name: "tenth_marksheet", maxCount: 1 },
    { name: "twelveth_marksheet", maxCount: 1 },
    { name: "UG_Marksheet", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "pre_off_letter", maxCount: 1 },
    { name: "pre_expe_letter", maxCount: 1 },
    { name: "pre_relieving_letter", maxCount: 1 },
    { name: "bankPassBook_Cheque", maxCount: 1 },
    { name: "joining_extend_document", maxCount: 1 },
    { name: "digital_signature_image", maxCount: 1 },
    { name: "annexure_pdf", maxCount: 1 }
]);

exports.addUser = [upload, async (req, res) => {
    try {
        let encryptedPass;
        if (req.body.user_login_password) {
            encryptedPass = await bcrypt.hash(req.body.user_login_password, 10);
        }

        let empId = await generateEmpId(req.body.dept_id);

        const simc = new userModel({
            user_name: req.body.user_name,
            user_designation: req.body.user_designation,
            user_email_id: req.body.user_email_id,
            user_login_id: req.body.user_login_id.toLowerCase().trim(),
            user_login_password: encryptedPass,
            user_report_to_id: req.body.user_report_to_id,
            user_contact_no: req.body.user_contact_no,
            dept_id: req.body.dept_id,
            location_id: req.body.location_id,
            created_by: req.body.created_by,
            role_id: req.body.role_id,
            sitting_id: req.body.sitting_id,
            job_type: req.body.job_type,
            PersonalNumber: req.body.personal_number,
            Report_L1: req.body.report_L1,
            Report_L2: req.body.report_L2,
            Report_L3: req.body.report_L3,
            PersonalEmail: req.body.Personal_email,
            joining_date: req.body.joining_date,
            releaving_date: req.body.releaving_date,
            level: req.body.level,
            room_id: req.body.room_id,
            salary: req.body.salary,
            SpokenLanguages: req.body.SpokenLanguages,
            Gender: req.body.Gender,
            Nationality: req.body.Nationality,
            DOB: req.body.DOB,
            Age: req.body.Age,
            fatherName: req.body.FatherName,
            motherName: req.body.MotherName,
            Hobbies: req.body.Hobbies,
            BloodGroup: req.body.BloodGroup,
            MartialStatus: req.body.MartialStatus,
            DateofMarriage: req.body.DateofMarriage,
            tds_applicable: req.body.tds_applicable,
            tds_per: req.body.tds_per,
            onboard_status: req.body.onboard_status,
            image_remark: req.body.image_remark,
            image_validate: req.body.image_validate,
            uid_remark: req.body.uid_remark,
            uid_validate: req.body.uid_validate,
            pan_remark: req.body.pan_remark,
            pan_validate: req.body.pan_validate,
            highest_upload_remark: req.body.highest_upload_remark,
            highest_upload_validate: req.body.highest_upload_validate,
            other_upload_remark: req.body.other_upload_remark,
            other_upload_validate: req.body.other_upload_validate,
            user_status: req.body.user_status,
            lastupdated: req.body.lastupdated,
            sub_dept_id: req.body.sub_dept_id == null ? 0 : req.body.sub_dept_id,
            pan_no: req.body.pan_no,
            uid_no: req.body.uid_no,
            spouse_name: req.body.spouse_name,
            highest_qualification_name: req.body.highest_qualification_name,
            tenth_marksheet_validate: req.body.tenth_marksheet_validate,
            twelveth_marksheet_validate: req.body.twelveth_marksheet_validate,
            UG_Marksheet_validate: req.body.UG_Marksheet_validate,
            passport_validate: req.body.passport_validate,
            pre_off_letter_validate: req.body.pre_off_letter_validate,
            pre_expe_letter_validate: req.body.pre_expe_letter_validate,
            pre_relieving_letter_validate: req.body.pre_relieving_letter_validate,
            bankPassBook_Cheque_validate: req.body.bankPassBook_Cheque_validate,
            tenth_marksheet_validate_remark: req.body.tenth_marksheet_validate_remark,
            twelveth_marksheet_validate_remark: req.body.twelveth_marksheet_validate_remark,
            UG_Marksheet_validate_remark: req.body.UG_Marksheet_validate_remark,
            passport_validate_remark: req.body.passport_validate,
            pre_off_letter_validate_remark: req.body.pre_off_letter_validate_remark,
            pre_expe_letter_validate_remark: req.body.pre_expe_letter_validate_remark,
            pre_relieving_letter_validate_remark: req.body.pre_relieving_letter_validate_remark,
            bankPassBook_Cheque_validate_remark: req.body.bankPassBook_Cheque_validate_remark,
            current_address: req.body.current_address,
            current_city: req.body.current_city,
            current_state: req.body.current_state,
            current_pin_code: req.body.current_pin_code,
            permanent_address: req.body.permanent_address,
            permanent_city: req.body.permanent_city,
            permanent_state: req.body.permanent_state,
            permanent_pin_code: req.body.permanent_pin_code,
            joining_date_extend: req.body.joining_date_extend,
            joining_date_extend_status: req.body.joining_date_extend_status,
            joining_date_extend_reason: req.body.joining_date_extend_reason,
            invoice_template_no: req.body.invoice_template_no,
            // image: req.files.image ? req.files.image[0].filename : '',
            UID: req.files.UID ? req.files.UID[0].filename : '',
            pan: req.files.pan ? req.files.pan[0].filename : '',
            highest_upload: req.files.highest_upload ? req.files.highest_upload[0].filename : '',
            other_upload: req.files.other_upload ? req.files.other_upload[0].filename : '',
            tenth_marksheet: req.files.tenth_marksheet ? req.files.tenth_marksheet[0].filename : '',
            twelveth_marksheet: req.files.twelveth_marksheet ? req.files.twelveth_marksheet[0].filename : '',
            UG_Marksheet: req.files.UG_Marksheet ? req.files.UG_Marksheet[0].filename : '',
            passport: req.files.passport ? req.files.passport[0].filename : '',
            pre_off_letter: req.files.pre_off_letter ? req.files.pre_off_letter[0].filename : '',
            pre_expe_letter: req.files.pre_expe_letter ? req.files.pre_expe_letter[0].filename : '',
            pre_relieving_letter: req.files.pre_relieving_letter ? req.files.pre_relieving_letter[0].filename : '',
            bankPassBook_Cheque: req.files.bankPassBook_Cheque ? req.files.bankPassBook_Cheque[0].filename : '',
            joining_extend_document: req.files.joining_extend_document ? req.files.joining_extend_document[0].filename : '',
            digital_signature_image: req.files.digital_signature_image ? req.files.digital_signature_image[0].filename : '',
            userSalaryStatus: req.body.userSalaryStatus,
            bank_name: req.body.bank_name,
            ifsc_code: req.body.ifsc_code,
            account_no: req.body.account_no,
            guardian_name: req.body.guardian_name,
            guardian_address: req.body.guardian_address,
            relation_with_guardian: req.body.relation_with_guardian,
            gaurdian_number: req.body.gaurdian_number,
            emergency_contact1: req.body.emergency_contact1,
            emergency_contact2: req.body.emergency_contact2,
            ctc: req.body.ctc,
            offer_letter_send: req.body.offer_letter_send,
            annexure_pdf: req.files.annexure_pdf ? req.files.annexure_pdf[0].filename : '',
            profileflag: req.body.profileflag,
            nick_name: req.body.nick_name,
            offer_later_date: req.body.offer_later_date,
            annexure_pdf: req.files.annexure_pdf ? req.files.annexure_pdf[0].filename : '',
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            beneficiary: req.body.beneficiary,
            emp_id: empId,
            alternate_contact: req.body.alternate_contact,
            cast_type: req.body.cast_type,
            emergency_contact_person_name1: req.body.emergency_contact_person_name1,
            emergency_contact_person_name2: req.body.emergency_contact_person_name2,
            emergency_contact_relation1: req.body.emergency_contact_relation1,
            emergency_contact_relation2: req.body.emergency_contact_relation2,
            document_percentage_mandatory: req.body.document_percentage_mandatory,
            document_percentage_non_mandatory: req.body.document_percentage_non_mandatory,
            document_percentage: req.body.document_percentage
        })

        const bucketName = vari.BUCKET_NAME;
        const bucket = storage.bucket(bucketName);
        const blob = bucket.file(req.files.image[0].originalname);
        simc.image = blob.name;
        const blobStream = blob.createWriteStream();
        blobStream.on("finish", () => { 
            // res.status(200).send("Success") 
        });
        blobStream.end(req.files.image[0].buffer);

        const simv = await simc.save();

        // Genreate a pdf file for offer later
        if (simv?.offer_letter_send) {
            helper.generateOfferLaterPdf(simv);

        }
        //Generate documents for respective user id
        const docs = await documentModel.find();
        if (docs.length !== 0) {
            const newDocuments = docs.map(item => ({
                doc_id: item._id,
                user_id: simv?.user_id,
            }));
            await userDocManagmentModel.insertMany(newDocuments);
        }
        //End Generate documents for respective user id

        const joining = simv.joining_date;
        const convertDate = new Date(joining);
        const extractDate = convertDate.getDate();
        const joiningMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(convertDate);
        const joiningYear = String(convertDate.getUTCFullYear());
        const work_days = 31 - extractDate;
        const bonus = 0;
        const presentDays = work_days - 0;
        const perdaysal = simv.salary / 30;
        const totalSalary = perdaysal * presentDays;
        const netSalary = totalSalary + bonus;
        const tdsDeduction = netSalary * (simv.tds_per) / 100;
        const ToPay = netSalary - tdsDeduction;

        const lastInserted = new attendanceModel({
            dept: simv.dept_id,
            user_id: simv.user_id,
            user_name: req.body.user_name,
            noOfabsent: 0,
            month: joiningMonth,
            year: joiningYear,
            bonus: 0,
            total_salary: simv.salary,
            tds_deduction: tdsDeduction,
            net_salary: netSalary,
            toPay: ToPay,
            remark: "",
            created_by: 99
        })
        await lastInserted.save();

        const objectData = await objModel.find();
        const objects = objectData;

        for (const object of objects) {
            const objectId = object.obj_id;
            let insert = 0;
            let view = 0;
            let update = 0;
            let delete_flag = 0;

            if (simv.role_id === 1) {
                insert = 1;
                view = 1;
                update = 1;
                delete_flag = 1;
            }

            const userAuthDocument = {
                Juser_id: simv.user_id,
                obj_id: objectId,
                insert: insert,
                view: view,
                update: update,
                delete_flag: delete_flag,
                creation_date: new Date(),
                created_by: simv.created_by || 0,
                last_updated_by: simv.created_by || 0,
                last_updated_date: new Date(),
            };

            await userAuthModel.create(userAuthDocument);
        }

        const deptDesiData = await deptDesiAuthModel.find({});

        await Promise.all(deptDesiData.map(async (deptDesi) => {
            if (deptDesi && deptDesi.dept_id == req.body.dept_id && deptDesi.desi_id == req.body.user_designation) {
                const updatedData = await userAuthModel.updateMany(
                    { obj_id: deptDesi.obj_id },
                    {
                        $set: {
                            insert: deptDesi.insert,
                            view: deptDesi.view,
                            update: deptDesi.update,
                            delete_flag: deptDesi.delete_flag
                        }
                    },
                    { new: true }
                );
            }
        }));
        res.send({ simv, status: 200 });
    } catch (err) {
        res.status(500).send({ error: err.message, sms: 'This user cannot be created' })
    }
}];

// const upload1 = multer({
//     storage: multer.memoryStorage()
// }).fields([
//     { name: "image", maxCount: 1 },
//     { name: "UID", maxCount: 1 },
//     { name: "pan", maxCount: 1 },
//     { name: "highest_upload", maxCount: 1 },
//     { name: "other_upload", maxCount: 1 },
//     { name: "tenth_marksheet", maxCount: 1 },
//     { name: "twelveth_marksheet", maxCount: 1 },
//     { name: "UG_Marksheet", maxCount: 1 },
//     { name: "passport", maxCount: 1 },
//     { name: "pre_off_letter", maxCount: 1 },
//     { name: "pre_expe_letter", maxCount: 1 },
//     { name: "pre_relieving_letter", maxCount: 1 },
//     { name: "bankPassBook_Cheque", maxCount: 1 },
//     { name: "joining_extend_document", maxCount: 1 },
//     { name: "digital_signature_image", maxCount: 1 },
//     { name: "annexure_pdf", maxCount: 1 }
// ]);

exports.updateUser = [upload, async (req, res) => {
    try {
        let encryptedPass;
        if (req.body.user_login_password) {
            encryptedPass = await bcrypt.hash(req.body.user_login_password, 10);
        }

        const existingUser = await userModel.findOne({ user_id: req.body.user_id });

        if (!existingUser) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const editsim = await userModel.findOneAndUpdate({ user_id: parseInt(req.body.user_id) }, {
            user_name: req.body.user_name,
            user_designation: req.body.user_designation,
            user_email_id: req.body.user_email_id,
            user_login_id: req.body.user_login_id,
            user_login_password: encryptedPass,
            user_report_to_id: req.body.user_report_to_id,
            user_contact_no: req.body.user_contact_no,
            dept_id: req.body.dept_id,
            location_id: req.body.location_id,
            created_by: req.body.created_by,
            role_id: req.body.role_id,
            sitting_id: req.body.sitting_id,
            job_type: req.body.job_type,
            personal_number: req.body.personal_number,
            Report_L1: isNaN(req.body.report_L1) ? 0 : req.body.report_L1,
            Report_L2: isNaN(req.body.report_L2) ? 0 : req.body.report_L2,
            Report_L3: isNaN(req.body.report_L3) ? 0 : req.body.report_L3,
            Personal_email: req.body.Personal_email,
            joining_date: req.body.joining_date,
            // releaving_date: req.body.releaving_date,
            level: req.body.level,
            room_id: req.body.room_id,
            salary: isNaN(req.body.salary) ? 0 : req.body.salary,
            SpokenLanguages: req.body.SpokenLanguages,
            Gender: req.body.Gender,
            Nationality: req.body.Nationality,
            DOB: req.body.DOB,
            Age: req.body.Age,
            fatherName: req.body.fatherName,
            motherName: req.body.motherName,
            Hobbies: req.body.Hobbies,
            BloodGroup: req.body.BloodGroup,
            MartialStatus: req.body.MartialStatus,
            DateofMarriage: req.body.DateofMarriage,
            tds_applicable: req.body.tds_applicable,
            tds_per: req.body.tds_per,
            onboard_status: req.body.onboard_status,
            image_remark: req.body.image_remark,
            image_validate: req.body.image_validate,
            uid_remark: req.body.uid_remark,
            uid_validate: req.body.uid_validate,
            pan_remark: req.body.pan_remark,
            pan_validate: req.body.pan_validate,
            highest_upload_remark: req.body.highest_upload_remark,
            highest_upload_validate: req.body.highest_upload_validate,
            other_upload_remark: req.body.other_upload_remark,
            other_upload_validate: req.body.other_upload_validate,
            user_status: req.body.user_status,
            lastupdated: req.body.lastupdated,
            sub_dept_id: isNaN(req.body.sub_dept_id) ? 0 : req.body.sub_dept_id,
            pan_no: req.body.pan_no,
            uid_no: req.body.uid_no,
            spouse_name: req.body.spouse_name,
            highest_qualification_name: req.body.highest_qualification_name,
            tenth_marksheet_validate: req.body.tenth_marksheet_validate,
            twelveth_marksheet_validate: req.body.twelveth_marksheet_validate,
            UG_Marksheet_validate: req.body.UG_Marksheet_validate,
            passport_validate: req.body.passport_validate,
            pre_off_letter_validate: req.body.pre_off_letter_validate,
            pre_expe_letter_validate: req.body.pre_expe_letter_validate,
            pre_relieving_letter_validate: req.body.pre_relieving_letter_validate,
            bankPassBook_Cheque_validate: req.body.bankPassBook_Cheque_validate,
            tenth_marksheet_validate_remark: req.body.tenth_marksheet_validate_remark,
            twelveth_marksheet_validate_remark: req.body.twelveth_marksheet_validate_remark,
            UG_Marksheet_validate_remark: req.body.UG_Marksheet_validate_remark,
            passport_validate_remark: req.body.passport_validate,
            pre_off_letter_validate_remark: req.body.pre_off_letter_validate_remark,
            pre_expe_letter_validate_remark: req.body.pre_expe_letter_validate_remark,
            pre_relieving_letter_validate_remark: req.body.pre_relieving_letter_validate_remark,
            bankPassBook_Cheque_validate_remark: req.body.bankPassBook_Cheque_validate_remark,
            current_address: req.body.current_address,
            current_city: req.body.current_city,
            current_state: req.body.current_state,
            current_pin_code: req.body.current_pin_code,
            permanent_address: req.body.permanent_address,
            permanent_city: req.body.permanent_city,
            permanent_state: req.body.permanent_state,
            permanent_pin_code: req.body.permanent_pin_code,
            joining_date_extend: req.body.joining_date_extend,
            joining_date_extend_status: req.body.joining_date_extend_status,
            joining_date_extend_reason: req.body.joining_date_extend_reason,
            joining_date_reject_reason: req.body.joining_date_reject_reason,
            invoice_template_no: req.body.invoice_template_no,
            image: req.files && req.files?.image && req.files?.image[0] ? req.files?.image[0].originalname : '',
            UID: req.files && req.files['UID'] && req.files['UID'][0] ? req.files['UID'][0].filename : (existingUser && existingUser.UID) || '',
            pan: req.files && req.files['pan'] && req.files['pan'][0] ? req.files['pan'][0].filename : (existingUser && existingUser.pan) || '',
            tenth_marksheet: req.files && req.files['tenth_marksheet'] && req.files['tenth_marksheet'][0] ? req.files['tenth_marksheet'][0].filename : (existingUser && existingUser.tenth_marksheet) || '',
            highest_upload: req.files && req.files['highest_upload'] && req.files['highest_upload'][0] ? req.files['highest_upload'][0].filename : (existingUser && existingUser.highest_upload) || '',
            other_upload: req.files && req.files['other_upload'] && req.files['other_upload'][0] ? req.files['other_upload'][0].filename : (existingUser && existingUser.other_upload) || '',
            twelveth_marksheet: req.files && req.files['twelveth_marksheet'] && req.files['twelveth_marksheet'][0] ? req.files['twelveth_marksheet'][0].filename : (existingUser && existingUser.twelveth_marksheet) || '',
            UG_Marksheet: req.files && req.files['UG_Marksheet'] && req.files['UG_Marksheet'][0] ? req.files['UG_Marksheet'][0].filename : (existingUser && existingUser.UG_Marksheet) || '',
            passport: req.files && req.files['passport'] && req.files['passport'][0] ? req.files['passport'][0].filename : (existingUser && existingUser.passport) || '',
            pre_off_letter: req.files && req.files['pre_off_letter'] && req.files['pre_off_letter'][0] ? req.files['pre_off_letter'][0].filename : (existingUser && existingUser.pre_off_letter) || '',
            pre_expe_letter: req.files && req.files['pre_expe_letter'] && req.files['pre_expe_letter'][0] ? req.files['pre_expe_letter'][0].filename : (existingUser && existingUser.pre_expe_letter) || '',
            pre_relieving_letter: req.files && req.files['pre_relieving_letter'] && req.files['pre_relieving_letter'][0] ? req.files['pre_relieving_letter'][0].filename : (existingUser && existingUser.pre_relieving_letter) || '',
            bankPassBook_Cheque: req.files && req.files['bankPassBook_Cheque'] && req.files['bankPassBook_Cheque'][0] ? req.files['bankPassBook_Cheque'][0].filename : (existingUser && existingUser.bankPassBook_Cheque) || '',
            joining_extend_document: req.files && req.files['joining_extend_document'] && req.files['joining_extend_document'][0] ? req.files['joining_extend_document'][0].filename : (existingUser && existingUser.joining_extend_document) || '',
            userSalaryStatus: req.body.userSalaryStatus,
            // digital_signature_image: req.files && req.files['digital_signature_image'] && req.files['digital_signature_image'][0] ? req.files['digital_signature_image'][0].filename : (existingUser && existingUser.digital_signature_image) || '',
            digital_signature_image: req.files && req.files?.digital_signature_image && req.files?.digital_signature_image[0] ? req.files?.digital_signature_image[0].originalname : '',
            bank_name: req.body.bank_name,
            ifsc_code: req.body.ifsc_code,
            account_no: req.body.account_no,
            guardian_name: req.body.guardian_name,
            guardian_address: req.body.guardian_address,
            relation_with_guardian: req.body.relation_with_guardian,
            gaurdian_number: req.body.gaurdian_number,
            emergency_contact1: req.body.emergency_contact1,
            emergency_contact2: req.body.emergency_contact2,
            ctc: req.body.ctc,
            offer_letter_send: req.body.offer_letter_send,
            annexure_pdf: req.files && req.files['annexure_pdf'] && req.files['annexure_pdf'][0] ? req.files['annexure_pdf'][0].filename : (existingUser && existingUser.annexure_pdf) || '',
            profileflag: req.body.profileflag,
            nick_name: req.body.nick_name,
            offer_later_acceptance_date: req.body.offer_later_acceptance_date,
            offer_later_status: req.body.offer_later_status,
            offer_later_reject_reason: req.body.offer_later_reject_reason,
            showOnboardingModal: req.body.showOnboardingModal,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            coc_flag: req.body.coc_flag,
            beneficiary: req.body.beneficiary,
            alternate_contact: req.body.alternate_contact,
            cast_type: req.body.cast_type,
            emergency_contact_person_name1: req.body.emergency_contact_person_name1,
            emergency_contact_person_name2: req.body.emergency_contact_person_name2,
            emergency_contact_relation1: req.body.emergency_contact_relation1,
            emergency_contact_relation2: req.body.emergency_contact_relation2,
            document_percentage_mandatory: req.body.document_percentage_mandatory,
            document_percentage_non_mandatory: req.body.document_percentage_non_mandatory,
            document_percentage: req.body.document_percentage
        }, { new: true });
        if (!editsim) {
            return res.status(500).send({ success: false })
        }
        // Genreate a pdf file for offer later
        if (editsim?.offer_later_status == true || (editsim?.joining_date_extend || (editsim?.digital_signature_image && editsim?.digital_signature_image !== ""))) {
            helper.generateOfferLaterPdf(editsim)
        }

        if (req.files.image && req.files.image[0].originalname) {
            const bucketName = vari.BUCKET_NAME;
            const bucket = storage.bucket(bucketName);
            const blob = bucket.file(req.files.image[0].originalname);
            editsim.image = blob.name;
            const blobStream = blob.createWriteStream();
            blobStream.on("finish", () => {
                editsim.save();
                // res.status(200).send("Success") 
            });
            blobStream.end(req.files.image[0].buffer);
        }
        if (req.files.digital_signature_image && req.files.digital_signature_image[0].originalname) {
            const bucketName = vari.BUCKET_NAME;
            const bucket = storage.bucket(bucketName);
            const blob = bucket.file(req.files.digital_signature_image[0].originalname);
            editsim.digital_signature_image = blob.name;
            const blobStream = blob.createWriteStream();
            blobStream.on("finish", () => {
                editsim.save();
                // res.status(200).send("Success") 
            });
            blobStream.end(req.files.digital_signature_image[0].buffer);
        }

        return res.status(200).send({ success: true, data: editsim })
    } catch (err) {
        return res.status(500).send({ error: err.message, sms: 'Error updating user details' })
    }
}];

exports.getWFHUsersByDept = async (req, res) => {
    try {
        const simc = await userModel.find({ dept_id: req.params.dept_id, job_type: 'WFHD' }).lean();
        if (!simc) {
            res.status(500).send({ success: false })
        }
        const modifiedUsers = simc.map(user => {

            if (user.hasOwnProperty('lastupdated')) {
                user.last_updated = user.lastupdated;
                delete user.lastupdated;
            }
            if (user.hasOwnProperty('tds_applicable')) {
                user.tbs_applicable = user.tds_applicable;
                delete user.tds_applicable;
            }
            return user;
        });
        res.status(200).send(modifiedUsers)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error getting all wfh users' })
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const singlesim = await userModel.aggregate([
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept_id',
                    as: 'department'
                }
            },
            {
                $unwind: {
                    path: "$department",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'designationmodels',
                    localField: 'user_designation',
                    foreignField: 'desi_id',
                    as: 'designation'
                }
            },
            {
                $unwind: {
                    path: "$designation",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'rolemodels',
                    localField: 'role_id',
                    foreignField: 'role_id',
                    as: 'role'
                }
            },
            {
                $unwind: {
                    path: "$role",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "usermodels",
                    localField: "user_report_to_id",
                    foreignField: "user_id",
                    as: "reportTo"
                }
            },
            {
                $unwind: {
                    path: "$reportTo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "usermodels",
                    localField: "Report_L1",
                    foreignField: "user_id",
                    as: "reportL1"
                }
            },
            {
                $unwind: {
                    path: "$reportL1",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "usermodels",
                    localField: "Report_L2",
                    foreignField: "user_id",
                    as: "reportL2"
                }
            },
            {
                $unwind: {
                    path: "$reportL2",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "usermodels",
                    localField: "Report_L3",
                    foreignField: "user_id",
                    as: "reportL3"
                }
            },
            {
                $unwind: {
                    path: "$reportl3",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'userdocmanagementmodels',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'userdocuments'
                }
            },
            {
                $unwind: {
                    path: "$userdocuments",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'documentmodels',
                    localField: 'userdocuments.doc_id',
                    foreignField: 'doc_id',
                    as: 'documents'
                }
            },
            {
                $addFields: {
                    requiredDocuments: {
                        $filter: {
                            input: "$documents",
                            as: "doc",
                            cond: "$$doc.isRequired"
                        }
                    }
                }
            },
            {
                $project: {
                    user_id: "$user_id",
                    user_name: "$user_name",
                    offer_later_status: "$offer_later_status",
                    user_designation: "$user_designation",
                    user_email_id: "$user_email_id",
                    user_login_id: "$user_login_id",
                    user_login_password: "$user_login_password",
                    user_report_to_id: "$user_report_to_id",
                    created_At: "$created_At",
                    last_updated: "$lastupdated",
                    created_by: "$created_by",
                    user_contact_no: "$user_contact_no",
                    dept_id: "$dept_id",
                    location_id: "$location_id",
                    role_id: "$role_id",
                    sitting_id: "$sitting_id",
                    image: "$image",
                    job_type: "$job_type",
                    PersonalNumber: "$PersonalNumber",
                    Report_L1: "$Report_L1",
                    Report_L2: "$Report_L2",
                    Report_L3: "$Report_L3",
                    PersonalEmail: "$PersonalEmail",
                    level: "$level",
                    joining_date: "$joining_date",
                    releaving_date: "$releaving_date",
                    room_id: "$room_id",
                    UID: "$UID",
                    pan: "$pan",
                    highest_upload: "$highest_upload",
                    other_upload: "$other_upload",
                    salary: "$salary",
                    SpokenLanguages: "$SpokenLanguages",
                    Gender: "$Gender",
                    Nationality: "$Nationality",
                    DOB: "$DOB",
                    Age: "$Age",
                    fatherName: "$fatherName",
                    motherName: "$motherName",
                    Hobbies: "$Hobbies",
                    BloodGroup: "$BloodGroup",
                    MartialStatus: "$MartialStatus",
                    DateOfMarriage: "$DateOfMarriage",
                    onboard_status: "$onboard_status",
                    tbs_applicable: "$tds_applicable",
                    tds_per: "$tds_per",
                    image_remark: "$image_remark",
                    image_validate: "$image_validate",
                    uid_remark: "$uid_remark",
                    uid_validate: "$uid_validate",
                    pan_remark: "$pan_remark",
                    pan_validate: "$pan_validate",
                    highest_upload_remark: "$highest_upload_remark",
                    highest_upload_validate: "$highest_upload_validate",
                    other_upload_remark: "$other_upload_remark",
                    other_upload_validate: "$other_upload_validate",
                    user_status: "$user_status",
                    sub_dept_id: "$sub_dept_id",
                    pan_no: "$pan_no",
                    uid_no: "$uid_no",
                    spouse_name: "$spouse_name",
                    highest_qualification_name: "$highest_qualification_name",
                    tenth_marksheet: "$tenth_marksheet",
                    twelveth_marksheet: "$twelveth_marksheet",
                    UG_Marksheet: "$UG_Marksheet",
                    passport: "$passport",
                    pre_off_letter: "$pre_off_letter",
                    pre_expe_letter: "$pre_expe_letter",
                    pre_relieving_letter: "$pre_relieving_letter",
                    bankPassBook_Cheque: "$bankPassBook_Cheque",
                    tenth_marksheet_validate: "$tenth_marksheet_validate",
                    twelveth_marksheet_validate: "$twelveth_marksheet_validate",
                    UG_Marksheet_validate: "$UG_Marksheet_validate",
                    passport_validate: "$passport_validate",
                    pre_off_letter_validate: "$pre_off_letter_validate",
                    pre_expe_letter_validate: "$pre_expe_letter_validate",
                    pre_relieving_letter_validate: "$pre_relieving_letter_validate",
                    bankPassBook_Cheque_validate: "$bankPassBook_Cheque_validate",
                    tenth_marksheet_validate_remark: "$tenth_marksheet_validate_remark",
                    twelveth_marksheet_validate_remark: "$twelveth_marksheet_validate_remark",
                    UG_Marksheet_validate_remark: "$UG_Marksheet_validate_remark",
                    passport_validate_remark: "$passport_validate_remark",
                    pre_off_letter_validate_remark: "$pre_off_letter_validate_remark",
                    pre_expe_letter_validate_remark: "$pre_expe_letter_validate_remark",
                    pre_relieving_letter_validate_remark: "$pre_relieving_letter_validate_remark",
                    bankPassBook_Cheque_validate_remark: "$bankPassBook_Cheque_validate_remark",
                    current_address: "$current_address",
                    current_city: "$current_city",
                    current_state: "$current_state",
                    current_pin_code: "$current_pin_code",
                    permanent_address: "$permanent_address",
                    permanent_city: "$permanent_city",
                    permanent_state: "$permanent_state",
                    permanent_pin_code: "$permanent_pin_code",
                    joining_date_extend: "$joining_date_extend",
                    joining_date_extend_status: "$joining_date_extend_status",
                    joining_date_extend_reason: "$joining_date_extend_reason",
                    joining_date_reject_reason: "$joining_date_reject_reason",
                    joining_extend_document: "$joining_extend_document",
                    invoice_template_no: "$invoice_template_no",
                    userSalaryStatus: "$userSalaryStatus",
                    digital_signature_image: "$digital_signature_image",
                    department_name: "$department.dept_name",
                    Role_name: "$role.Role_name",
                    report: "$reportTo.user_name",
                    Report_L1N: "$reportL1.user_name",
                    Report_L2N: "$reportL2.user_name",
                    Report_L3N: {
                        $arrayElemAt: ["$reportL3.user_name", 0]
                    },
                    designation_name: "$designation.desi_name",
                    userSalaryStatus: '$userSalaryStatus',
                    digital_signature_image: "$digital_signature_image",
                    bank_name: "$bank_name",
                    ifsc_code: "$ifsc_code",
                    account_no: "$account_no",
                    guardian_name: "$guardian_name",
                    guardian_address: "$guardian_address",
                    relation_with_guardian: "$relation_with_guardian",
                    gaurdian_number: "$gaurdian_number",
                    emergency_contact1: "$emergency_contact1",
                    emergency_contact2: "$emergency_contact2",
                    ctc: "$ctc",
                    offer_letter_send: "$offer_letter_send",
                    annexure_pdf: "$annexure_pdf",
                    profileflag: "$profileflag",
                    nick_name: "$nick_name",
                    showOnboardingModal: "$showOnboardingModal",
                    coc_flag: "$coc_flag",
                    latitude: "$latitude",
                    longitude: "$longitude",
                    beneficiary: "$beneficiary",
                    emp_id: "$emp_id",
                    alternate_contact: "$alternate_contact",
                    cast_type: "$cast_type",
                    emergency_contact_person_name1: "$emergency_contact_person_name1",
                    emergency_contact_person_name2: "$emergency_contact_person_name2",
                    emergency_contact_relation1: "$emergency_contact_relation1",
                    emergency_contact_relation2: "$emergency_contact_relation2",
                    document_percentage_mandatory: "$document_percentage_mandatory",
                    document_percentage_non_mandatory: "$document_percentage_non_mandatory",
                    document_percentage: "$document_percentage",
                    documentPercentage: {
                        $multiply: [
                            {
                                $divide: [
                                    { $size: "$requiredDocuments" },
                                    { $size: "$documents" }
                                ]
                            },
                            100
                        ]
                    }
                }
            }
        ]).exec();
        const userImagesBaseUrl = `${vari.IMAGE_URL}`;
        const fieldsToCheck = [
            'user_name', 'PersonalEmail', 'PersonalNumber', 'fatherName', 'Gender', 'motherName',
            'Hobbies', 'BloodGroup', 'SpokenLanguage', 'DO', 'Nationality', 'guardian_name',
            'guardian_contact', 'emergency_contact', 'guardian_address', 'relation_with_guardian',
            'current_address', 'current_city', 'current_state', 'current_pin_code',
            'permanent_address', 'permanent_city', 'permanent_state', 'permanent_pin_code',
        ];
        const dataWithImageUrl = singlesim.map((user) => {
            const filledFields = fieldsToCheck.filter(field => user[field] !== null && user[field] !== undefined && user[field] !== '').length;
            const percentageFilled = (filledFields / fieldsToCheck.length) * 100;

            return {
                ...user,
                image_url: user.image ? userImagesBaseUrl + user.image : null,
                uid_url: user.UID ? userImagesBaseUrl + user.UID : null,
                pan_url: user.pan ? userImagesBaseUrl + user.pan : null,
                highest_upload_url: user.highest_upload
                    ? userImagesBaseUrl + user.highest_upload
                    : null,
                other_upload_url: user.other_upload
                    ? userImagesBaseUrl + user.other_upload
                    : null,
                tenth_marksheet_url: user.tenth_marksheet ? userImagesBaseUrl + user.tenth_marksheet : null,
                twelveth_marksheet_url: user.twelveth_marksheet ? userImagesBaseUrl + user.twelveth_marksheet : null,
                UG_Marksheet_url: user.UG_Marksheet ? userImagesBaseUrl + user.UG_Marksheet : null,
                pasport_url: user.passport ? userImagesBaseUrl + user.passport : null,
                pre_off_letter_url: user.pre_off_letter ? userImagesBaseUrl + user.pre_off_letter : null,
                pre_expe_letter_url: user.pre_expe_letter ? userImagesBaseUrl + user.pre_expe_letter : null,
                Pre_relieving_letter_url: user.pre_relieving_letter ? userImagesBaseUrl + user.pre_relieving_letter : null,
                bankPassBook_Cheque_url: user.bankPassBook_Cheque ? userImagesBaseUrl + user.bankPassBook_Cheque : null,
                joining_extend_document_url: user.joining_extend_document ? userImagesBaseUrl + user.joining_extend_document : null,
                digital_signature_image_url: user.digital_signature_image ? userImagesBaseUrl + user.digital_signature_image : null,
                annexure_pdf_url: user.annexure_pdf ? userImagesBaseUrl + user.annexure_pdf : null,
                percentage_filled: percentageFilled.toFixed(2) + '%',
            };
        });
        if (dataWithImageUrl?.length === 0) {
            res
                .status(200)
                .send({ success: true, data: [], message: "No Record found" });
        } else {
            res.status(200).send({ data: dataWithImageUrl });
        }
    } catch (err) {
        res.status(500).send({ error: err.message, sms: 'Error getting all users' })
    }
}


exports.getSingleUser = async (req, res) => {
    try {
        const singlesim = await userModel.aggregate([
            {
                $match: { user_id: parseInt(req.params.id) }
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept_id',
                    as: 'department'
                }
            },
            {
                $unwind: {
                    path: "$department",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'designationmodels',
                    localField: 'user_designation',
                    foreignField: 'desi_id',
                    as: 'designation'
                }
            },
            {
                $unwind: {
                    path: "$designation",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'rolemodels',
                    localField: 'role_id',
                    foreignField: 'role_id',
                    as: 'role'
                }
            },
            {
                $unwind: {
                    path: "$role",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "usermodels",
                    localField: "user_report_to_id",
                    foreignField: "user_id",
                    as: "reportTo"
                }
            },
            {
                $unwind: {
                    path: "$reportTo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "usermodels",
                    localField: "Report_L1",
                    foreignField: "user_id",
                    as: "reportL1"
                }
            },
            {
                $unwind: {
                    path: "$reportL1",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "usermodels",
                    localField: "Report_L2",
                    foreignField: "user_id",
                    as: "reportL2"
                }
            },
            {
                $unwind: {
                    path: "$reportL2",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "usermodels",
                    localField: "Report_L3",
                    foreignField: "user_id",
                    as: "reportL3"
                }
            },
            {
                $unwind: {
                    path: "$reportl3",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    offer_later_pdf_url: "$offer_later_pdf_url",
                    offer_later_acceptance_date: "$offer_later_acceptance_date",
                    offer_later_status: "$offer_later_status",
                    offer_later_reject_reason: "$offer_later_reject_reason",
                    user_id: "$user_id",
                    user_name: "$user_name",
                    user_designation: "$user_designation",
                    user_email_id: "$user_email_id",
                    user_login_id: "$user_login_id",
                    user_login_password: "$user_login_password",
                    user_report_to_id: "$user_report_to_id",
                    created_At: "$created_At",
                    last_updated: "$lastupdated",
                    created_by: "$created_by",
                    user_contact_no: "$user_contact_no",
                    dept_id: "$dept_id",
                    location_id: "$location_id",
                    role_id: "$role_id",
                    sitting_id: "$sitting_id",
                    image: "$image",
                    job_type: "$job_type",
                    PersonalNumber: "$PersonalNumber",
                    Report_L1: "$Report_L1",
                    Report_L2: "$Report_L2",
                    Report_L3: "$Report_L3",
                    PersonalEmail: "$PersonalEmail",
                    level: "$level",
                    joining_date: "$joining_date",
                    releaving_date: "$releaving_date",
                    room_id: "$room_id",
                    UID: "$UID",
                    pan: "$pan",
                    highest_upload: "$highest_upload",
                    other_upload: "$other_upload",
                    salary: "$salary",
                    SpokenLanguages: "$SpokenLanguages",
                    Gender: "$Gender",
                    Nationality: "$Nationality",
                    DOB: "$DOB",
                    Age: "$Age",
                    fatherName: "$fatherName",
                    motherName: "$motherName",
                    Hobbies: "$Hobbies",
                    BloodGroup: "$BloodGroup",
                    MartialStatus: "$MartialStatus",
                    DateOfMarriage: "$DateOfMarriage",
                    onboard_status: "$onboard_status",
                    tbs_applicable: "$tbs_applicable",
                    tds_per: "$tds_per",
                    image_remark: "$image_remark",
                    image_validate: "$image_validate",
                    uid_remark: "$uid_remark",
                    uid_validate: "$uid_validate",
                    pan_remark: "$pan_remark",
                    pan_validate: "$pan_validate",
                    highest_upload_remark: "$highest_upload_remark",
                    highest_upload_validate: "$highest_upload_validate",
                    other_upload_remark: "$other_upload_remark",
                    other_upload_validate: "$other_upload_validate",
                    user_status: "$user_status",
                    sub_dept_id: "$sub_dept_id",
                    pan_no: "$pan_no",
                    uid_no: "$uid_no",
                    spouse_name: "$spouse_name",
                    highest_qualification_name: "$highest_qualification_name",
                    tenth_marksheet: "$tenth_marksheet",
                    twelveth_marksheet: "$twelveth_marksheet",
                    UG_Marksheet: "$UG_Marksheet",
                    passport: "$passport",
                    pre_off_letter: "$pre_off_letter",
                    pre_expe_letter: "$pre_expe_letter",
                    pre_relieving_letter: "$pre_relieving_letter",
                    bankPassBook_Cheque: "$bankPassBook_Cheque",
                    tenth_marksheet_validate: "$tenth_marksheet_validate",
                    twelveth_marksheet_validate: "$twelveth_marksheet_validate",
                    UG_Marksheet_validate: "$UG_Marksheet_validate",
                    passport_validate: "$passport_validate",
                    pre_off_letter_validate: "$pre_off_letter_validate",
                    pre_expe_letter_validate: "$pre_expe_letter_validate",
                    pre_relieving_letter_validate: "$pre_relieving_letter_validate",
                    bankPassBook_Cheque_validate: "$bankPassBook_Cheque_validate",
                    tenth_marksheet_validate_remark: "$tenth_marksheet_validate_remark",
                    twelveth_marksheet_validate_remark: "$twelveth_marksheet_validate_remark",
                    UG_Marksheet_validate_remark: "$UG_Marksheet_validate_remark",
                    passport_validate_remark: "$passport_validate_remark",
                    pre_off_letter_validate_remark: "$pre_off_letter_validate_remark",
                    pre_expe_letter_validate_remark: "$pre_expe_letter_validate_remark",
                    pre_relieving_letter_validate_remark: "$pre_relieving_letter_validate_remark",
                    bankPassBook_Cheque_validate_remark: "$bankPassBook_Cheque_validate_remark",
                    current_address: "$current_address",
                    current_city: "$current_city",
                    current_state: "$current_state",
                    current_pin_code: "$current_pin_code",
                    permanent_address: "$permanent_address",
                    permanent_city: "$permanent_city",
                    permanent_state: "$permanent_state",
                    permanent_pin_code: "$permanent_pin_code",
                    joining_date_extend: "$joining_date_extend",
                    joining_date_extend_status: "$joining_date_extend_status",
                    joining_date_extend_reason: "$joining_date_extend_reason",
                    joining_date_reject_reason: "$joining_date_reject_reason",
                    joining_extend_document: "$joining_extend_document",
                    invoice_template_no: "$invoice_template_no",
                    userSalaryStatus: "$userSalaryStatus",
                    digital_signature_image: "$digital_signature_image",
                    department_name: '$department.dept_name',
                    Role_name: "$role.Role_name",
                    report: "$reportTo.user_name",
                    Report_L1N: "$reportL1.user_name",
                    Report_L2N: "$reportL2.user_name",
                    Report_L3N: "$reportL3.user_name",
                    designation_name: "$designation.desi_name",
                    bank_name: "$bank_name",
                    ifsc_code: "$ifsc_code",
                    account_no: "$account_no",
                    guardian_name: "$guardian_name",
                    guardian_address: "$guardian_address",
                    relation_with_guardian: "$relation_with_guardian",
                    gaurdian_number: "$gaurdian_number",
                    emergency_contact1: "$emergency_contact1",
                    emergency_contact2: "$emergency_contact2",
                    ctc: "$ctc",
                    offer_letter_send: "$offer_letter_send",
                    profileflag: "$profileflag",
                    nick_name: "$nick_name",
                    showOnboardingModal: "$showOnboardingModal",
                    coc_flag: "$coc_flag",
                    latitude: "$latitude",
                    longitude: "$longitude",
                    beneficiary: "$beneficiary",
                    emp_id: "$emp_id",
                    alternate_contact: "$alternate_contact",
                    cast_type: "$cast_type",
                    emergency_contact_person_name1: "$emergency_contact_person_name1",
                    emergency_contact_person_name2: "$emergency_contact_person_name2",
                    emergency_contact_relation1: "$emergency_contact_relation1",
                    emergency_contact_relation2: "$emergency_contact_relation2",
                    document_percentage_mandatory: "$document_percentage_mandatory",
                    document_percentage_non_mandatory: "$document_percentage_non_mandatory",
                    document_percentage: "$document_percentage",
                }
            }
        ]).exec();
        const userImagesBaseUrl = vari.IMAGE_URL;
        const dataWithImageUrl = singlesim.map((user) => ({
            ...user,
            image_url: user.image ? userImagesBaseUrl + user.image : null,
            uid_url: user.UID ? userImagesBaseUrl + user.UID : null,
            pan_url: user.pan ? userImagesBaseUrl + user.pan : null,
            highest_upload_url: user.highest_upload
                ? userImagesBaseUrl + user.highest_upload
                : null,
            other_upload_url: user.other_upload
                ? userImagesBaseUrl + user.other_upload
                : null,
            tenth_marksheet_url: user.tenth_marksheet ? userImagesBaseUrl + user.tenth_marksheet : null,
            twelveth_marksheet_url: user.twelveth_marksheet ? userImagesBaseUrl + user.twelveth_marksheet : null,
            UG_Marksheet_url: user.UG_Marksheet ? userImagesBaseUrl + user.UG_Marksheet : null,
            pasport_url: user.passport ? userImagesBaseUrl + user.passport : null,
            pre_off_letter_url: user.pre_off_letter ? userImagesBaseUrl + user.pre_off_letter : null,
            pre_expe_letter_url: user.pre_expe_letter ? userImagesBaseUrl + user.pre_expe_letter : null,
            Pre_relieving_letter_url: user.pre_relieving_letter ? userImagesBaseUrl + user.pre_relieving_letter : null,
            bankPassBook_Cheque_url: user.bankPassBook_Cheque ? userImagesBaseUrl + user.bankPassBook_Cheque : null,
            joining_extend_document_url: user.joining_extend_document ? userImagesBaseUrl + user.joining_extend_document : null,
            digital_signature_image_url: user.digital_signature_image ? userImagesBaseUrl + user.digital_signature_image : null,
            annexure_pdf: user.annexure_pdf ? userImagesBaseUrl + user.annexure_pdf : null
        }));
        if (dataWithImageUrl?.length === 0) {
            res
                .status(200)
                .send({ success: true, data: [], message: "No Record found" });
        } else {
            const result = dataWithImageUrl[0];
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error getting all users' })
    }
}

exports.deleteUser = async (req, res) => {
    userModel.deleteOne({ user_id: req.params.id }).then(item => {
        if (item) {
            return res.status(200).json({ success: true, message: 'user deleted' })
        } else {
            return res.status(404).json({ success: false, message: 'user not found' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, message: err })
    })
};

exports.loginUser = async (req, res) => {
    try {

        const simc = await userModel.aggregate([
            {
                $match: {
                    user_login_id: req.body.user_login_id.toLowerCase().trim(),

                }
            },
            {
                $lookup: {
                    from: 'sittingmodels',
                    localField: 'sitting_id',
                    foreignField: 'sitting_id',
                    as: 'sitting'
                }
            },
            {
                $unwind: {
                    path: "$sitting",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    sitting_id: '$sitting.sitting_id',
                    sitting_ref_no: '$sitting.sitting_ref_no',
                    first_login_flag: '$first_login_flag',
                    name: '$user_name',
                    email: '$user_email_id',
                    dept_id: '$dept_id',
                    role_id: '$role_id',
                    id: "$user_id",
                    room_id: '$room_id',
                    user_status: '$user_status',
                    user_login_password: '$user_login_password',
                    onboard_status: '$onboard_status',
                    user_login_id: '$user_login_id',
                    invoice_template_no: "$invoice_template_no",
                    // digital_signature_image: "$digital_signature_image"
                    digital_signature_image: { $concat: [vari.IMAGE_URL, "$digital_signature_image"] }
                }
            }
        ]).exec();

        if (simc.length === 0) {
            return res.status(500).send({ error: "Invalid Login Id" });
        }

        let role = req.body?.role_id;
        if (bcrypt.compareSync(req.body.user_login_password, simc[0]?.user_login_password) || role === constant.ADMIN_ROLE) {
            const token = jwt.sign(
                {
                    id: simc[0]?.id,
                    name: simc[0]?.name,
                    email: simc[0]?.email,
                    sitting_id: simc[0]?.sitting_id,
                    role_id: simc[0]?.role_id,
                    dept_id: simc[0]?.dept_id,
                    room_id: simc[0]?.room_id,
                    sitting_ref_no: simc[0]?.sitting_ref_no,
                    onboard_status: simc[0]?.onboard_status,
                    user_status: simc[0]?.user_status,
                    invoice_template_no: simc[0].invoice_template_no,
                    digital_signature_image: simc[0].digital_signature_image
                },
                constant.SECRET_KEY_LOGIN,
                { expiresIn: constant.CONST_VALIDATE_SESSION_EXPIRE }
            );

            var currentDate = new Date();
            currentDate.setHours(currentDate.getHours() + 5)
            currentDate.setMinutes(currentDate.getMinutes() + 30)
            var formattedDateTime = currentDate.toLocaleString();

            if (simc[0].onboard_status == 2) {
                const saveDataObj = {
                    user_id: simc[0].id,
                    user_email_id: simc[0].email || simc[0].user_login_id
                };
                await userLoginHisModel.create(saveDataObj);
                if (simc[0].first_login_flag == false) {
                    await userModel.findOneAndUpdate({ user_login_id: req.body.user_login_id.toLowerCase().trim() }, {
                        first_login_flag: true,
                        first_login_time: formattedDateTime
                    });
                    const sms = new notificationModel({
                        user_id: simc[0].id,
                        notification_title: "New Candidate has been logged in",
                        notification_message: `${simc[0].name} has been loggedin on ${formattedDateTime}`,
                        created_by: simc[0].id
                    })
                    await sms.save();
                }
            }

            return res.status(200).send({ token, user: simc[0] });
        } else {
            return res.status(500).send({ error: 'Invalid Password' });
        }

    } catch (err) {
        return res.status(500).send({ error: err.message, sms: 'Error getting user details' });
    }
}

exports.deliveryBoy = async (req, res) => {
    try {
        const delv = await userModel.find({ role_id: 3 }).select({ user_id: 1, user_name: 1, room_id: 1 })
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send({ results: delv })
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting all delivery boy' })
    }
}

exports.deliveryBoyByRoom = async (req, res) => {
    try {
        const delv = await userModel.find({ role_id: 3, room_id: parseInt(req.params.room_id) })
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send({ results: delv })
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting delivery boy from this room' })
    }
}

exports.deliveryUser = async (req, res) => {
    const ImageUrl = `${vari.IMAGE_URL}`;
    try {
        const delv = await userModel.aggregate([
            {
                $match: { role_id: 3 }
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept_id',
                    as: 'department'
                }
            },
            {
                $unwind: {
                    path: "$department",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'rolemodels',
                    localField: 'role_id',
                    foreignField: 'role_id',
                    as: 'role'
                }
            },
            {
                $unwind: {
                    path: "$role",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_report_to_id',
                    foreignField: 'user_id',
                    as: 'user1'
                }
            },
            {
                $unwind: {
                    path: "$user1",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    dept_name: '$department.dept_name',
                    dept_id: "$dept_id",
                    desi_id: '$desi_id',
                    id: "$id",
                    user_id: "$user_id",
                    report: '$user1.user_name',
                    report_L1_name: '$user2.user_name',
                    user_name: '$user_name',
                    user_email_id: '$user_email_id',
                    user_login_id: '$user_login_id',
                    user_login_password: '$user_login_password',
                    user_report_to_id: '$user_report_to_id',
                    user_contact_no: '$user_contact_no',
                    location_id: '$location_id',
                    created_by: '$created_by',
                    role_id: '$role_id',
                    sitting_id: '$sitting_id',
                    job_type: '$job_type',
                    personal_number: '$personal_number',
                    report_L1: '$report_L1',
                    report_L2: '$report_L2',
                    report_L3: '$report_L3',
                    Personal_email: '$Personal_email',
                    joining_date: '$joining_date',
                    releaving_date: '$releaving_date',
                    level: '$level',
                    room_id: '$room_id',
                    salary: '$salary',
                    SpokenLanguages: '$SpokenLanguages',
                    Gender: '$Gender',
                    Nationality: '$Nationality',
                    DOB: '$DOB',
                    Age: '$Age',
                    FatherName: '$FatherName',
                    MotherName: '$MotherName',
                    Hobbies: '$Hobbies',
                    BloodGroup: '$BloodGroup',
                    MartialStatus: '$MartialStatus',
                    DateofMarriage: '$DateofMarriage',
                    tds_applicable: '$tds_applicable',
                    tds_per: '$tds_per',
                    onboard_status: '$onboard_status',
                    image_remark: '$image_remark',
                    image_validate: '$image_validate',
                    uid_remark: '$uid_remark',
                    uid_validate: '$uid_validate',
                    pan_remark: '$pan_remark',
                    pan_validate: '$pan_validate',
                    highest_upload_remark: '$highest_upload_remark',
                    highest_upload_validate: '$highest_upload_validate',
                    other_upload_remark: '$other_upload_remark',
                    other_upload_validate: '$other_upload_validate',
                    user_status: '$user_status',
                    lastupdated: '$lastupdated',
                    sub_dept_id: '$sub_dept_id',
                    pan_no: '$pan_no',
                    uid_no: '$uid_no',
                    spouse_name: '$spouse_name',
                    highest_qualification_name: '$highest_qualification_name',
                    tenth_marksheet_validate: '$tenth_marksheet_validate',
                    twelveth_marksheet_validate: '$twelveth_marksheet_validate',
                    UG_Marksheet_validate: '$UG_Marksheet_validate',
                    passport_validate: '$passport_validate',
                    pre_off_letter_validate: '$pre_off_letter_validate',
                    pre_expe_letter_validate: '$pre_expe_letter_validate',
                    pre_relieving_letter_validate: '$pre_relieving_letter_validate',
                    bankPassBook_Cheque_validate: '$bankPassBook_Cheque_validate',
                    tenth_marksheet_validate_remark: '$tenth_marksheet_validate_remark',
                    twelveth_marksheet_validate_remark: '$twelveth_marksheet_validate_remark',
                    UG_Marksheet_validate_remark: '$UG_Marksheet_validate_remark',
                    passport_validate_remark: '$passport_validate',
                    pre_off_letter_validate_remark: '$pre_off_letter_validate_remark',
                    pre_expe_letter_validate_remark: '$pre_expe_letter_validate_remark',
                    pre_relieving_letter_validate_remark: '$pre_relieving_letter_validate_remark',
                    bankPassBook_Cheque_validate_remark: '$bankPassBook_Cheque_validate_remark',
                    current_address: '$current_address',
                    current_city: '$current_city',
                    current_state: '$current_state',
                    current_pin_code: '$current_pin_code',
                    permanent_address: '$permanent_address',
                    permanent_city: '$permanent_city',
                    permanent_state: '$permanent_state',
                    permanent_pin_code: '$permanent_pin_code',
                    joining_date_extend: '$joining_date_extend',
                    joining_date_extend_status: '$joining_date_extend_status',
                    joining_date_extend_reason: '$joining_date_extend_reason',
                    joining_date_reject_reason: '$joining_date_reject_reason',
                    invoice_template_no: '$invoice_template_no',
                    image: { $concat: [ImageUrl, '$image'] },
                    UID: { $concat: [ImageUrl, '$UID'] },
                    pan: { $concat: [ImageUrl, '$pan'] },
                    highest_upload: { $concat: [ImageUrl, '$highest_upload'] },
                    other_upload: { $concat: [ImageUrl, '$other_upload'] },
                    tenth_marksheet: { $concat: [ImageUrl, '$tenth_marksheet'] },
                    twelveth_marksheet: { $concat: [ImageUrl, '$twelveth_marksheet'] },
                    UG_Marksheet: { $concat: [ImageUrl, '$UG_Marksheet'] },
                    passport: { $concat: [ImageUrl, '$passport'] },
                    pre_off_letter: { $concat: [ImageUrl, '$pre_off_letter'] },
                    pre_expe_letter: { $concat: [ImageUrl, '$pre_expe_letter'] },
                    pre_relieving_letter: { $concat: [ImageUrl, '$pre_relieving_letter'] },
                    bankPassBook_Cheque: { $concat: [ImageUrl, '$bankPassBook_Cheque'] },
                    joining_extend_document: { $concat: [ImageUrl, '$joining_extend_document'] },
                    guardian_name: "$guardian_name",
                    guardian_address: "$guardian_address",
                    relation_with_guardian: "$relation_with_guardian",
                    gaurdian_number: "$gaurdian_number",
                    emergency_contact: "$emergency_contact",
                    document_percentage_mandatory: "$document_percentage_mandatory",
                    document_percentage_non_mandatory: "$document_percentage_non_mandatory",
                    document_percentage: "$document_percentage",
                }
            }
        ]).exec();
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(delv)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting delivery user' })
    }
}

exports.addUserAuth = async (req, res) => {
    try {
        const simc = new userAuthModel({
            Juser_id: req.body.Juser_id,
            obj_id: req.body.obj_id,
            insert: req.body.insert,
            view: req.body.view,
            update: req.body.update,
            delete_flag: req.body.delete_flag,
            creation_date: req.body.creation_date,
            created_by: req.body.created_by
        })
        const simv = await simc.save();
        res.send({ simv, status: 200 });
    } catch (err) {
        res.status(500).send({ error: err, sms: 'This user auth cannot be created' })
    }
}

exports.allUserAuthDetail = async (req, res) => {
    try {
        const delv = await userAuthModel.aggregate([
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'Juser_id',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'objectmodels',
                    localField: 'obj_id',
                    foreignField: 'obj_id',
                    as: 'object'
                }
            },
            {
                $unwind: '$object'
            },
            {
                $project: {
                    auth_id: "$auth_id",
                    user_name: '$user.user_name',
                    obj_name: "$object.obj_name",
                    id: "$_id",
                    Juser_id: '$Juser_id',
                    obj_id: '$obj_id',
                    insert: '$insert',
                    view: '$view',
                    update: '$update',
                    delete_flag: '$delete_flag',
                }
            }
        ]).exec();
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(delv)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting all user auth details' })
    }
}

exports.updateUserAuth = async (req, res) => {
    try {
        const editsim = await userAuthModel.findOneAndUpdate({ auth_id: req.body.auth_id }, {
            Juser_id: req.body.Juser_id,
            obj_id: req.body.obj_id,
            insert: req.body.insert,
            view: req.body.view,
            update: req.body.update,
            delete_flag: req.body.delete_flag,
            Last_updated_date: req.body.Last_updated_date,
            Last_updated_by: req.body.Last_updated_by
        }, { new: true })
        if (!editsim) {
            res.status(500).send({ success: false })
        }
        res.status(200).send({ success: true, data: editsim })
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error updating user auth details' })
    }
};

exports.deleteUserAuth = async (req, res) => {
    userAuthModel.deleteOne({ auth_id: req.body.auth_id }).then(item => {
        if (item) {
            return res.status(200).json({ success: true, message: 'user auth deleted' })
        } else {
            return res.status(404).json({ success: false, message: 'user auth not found' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, message: err })
    })
};

exports.getSingleUserAuthDetail = async (req, res) => {
    try {
        const delv = await userAuthModel.aggregate([
            {
                $match: { Juser_id: parseInt(req.params.Juser_id) }
            },
            {
                $lookup: {
                    from: 'objectmodels',
                    localField: 'obj_id',
                    foreignField: 'obj_id',
                    as: 'object'
                }
            },
            {
                $unwind: '$object'
            },
            {
                $group: {
                    _id: '$obj_id',
                    auth_id: { $first: '$auth_id' },
                    Juser_id: { $first: '$Juser_id' },
                    obj_name: { $first: '$object.obj_name' },
                    obj_id: { $first: '$obj_id' },
                    insert_value: { $first: '$insert' },
                    view_value: { $first: '$view' },
                    update_value: { $first: '$update' },
                    delete_flag_value: { $first: '$delete_flag' }
                }
            },
            {
                $sort: { obj_id: 1 }
            }
        ]);

        if (delv.length === 0) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        res.status(200).send(delv);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message, message: 'Error getting user auth details' });
    }
};


exports.userObjectAuth = async (req, res) => {
    try {
        const delv = await userAuthModel.aggregate([
            {
                $match: {
                    Juser_id: req.body.Juser_id,
                    user_id: req.body.user_id
                }
            },
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'Juser_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'objectmodels',
                    localField: 'obj_id',
                    foreignField: 'obj_id',
                    as: 'object'
                }
            },
            {
                $unwind: '$object'
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept_id',
                    as: 'department'
                }
            },
            {
                $unwind: '$department'
            },
            {
                $project: {
                    user_name: '$user.user_name',
                    department_name: '$department.dept_name',
                    obj_name: "$object.obj_name",
                    id: "$_id",
                    Juser_id: '$Juser_id',
                    obj_id: '$obj_id',
                    insert: '$insert',
                    view: '$view',
                    update: '$update',
                    delete_flag: '$delete_flag',
                }
            }
        ]).exec();
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(delv)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting user object auth details' })
    }
};

exports.sendUserMail = async (req, res) => {
    try {
        const { email, subject, name, password, login_id, status, text, name2 } = req.body;
        const attachment = req.file;
        if (status == "onboarded") {
            // const templatePath = path.join(__dirname, "template.ejs");
            // const template = await fs.promises.readFile(templatePath, "utf-8");
            // const html = ejs.render(template, {email,password,name,login_id,text});

            /* dynamic email temp code start */
            let contentList = await emailTempModel.find({ email_for_id: 6 })
            let content = contentList[0];

            const filledEmailContent = content.email_content
                .replace("{{user_name}}", name)
                .replace("{{user_email}}", email)
                .replace("{{user_password}}", password)
                .replace("{{user_login_id}}", login_id);

            const html = filledEmailContent;
            /* dynamic email temp code end */

            let mailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "onboarding@creativefuel.io",
                    pass: "fjjmxuavwpescyat",
                },
            });

            let mailOptions = {
                from: "onboarding@creativefuel.io",
                to: email,
                subject: subject,
                html: html,
                attachments: attachment
                    ? [
                        {
                            filename: attachment.originalname,
                            path: attachment.path,
                        },
                    ]
                    : [],
            };

            await mailTransporter.sendMail(mailOptions);
            res.sendStatus(200);
        } else if (status == "reportTo") {
            // const templatePath = path.join(__dirname, "reportTo.ejs");
            // const template = await fs.promises.readFile(templatePath, "utf-8");
            // const html = ejs.render(template, { name, name2 });

            /* dynamic email temp code start */
            let contentList = await emailTempModel.find({ email_for_id: 7 })
            let content = contentList[0];

            const filledEmailContent = content.email_content.replace("{{user_reportTo}}", name2);

            const html = filledEmailContent;
            /* dynamic email temp code end */

            let mailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "onboarding@creativefuel.io",
                    pass: "fjjmxuavwpescyat",
                },
            });

            let mailOptions = {
                from: "onboarding@creativefuel.io",
                to: email,
                subject: subject,
                html: html,
                attachments: attachment
                    ? [
                        {
                            filename: attachment.originalname,
                            path: attachment.path,
                        },
                    ]
                    : [],
            };

            await mailTransporter.sendMail(mailOptions);
            res.sendStatus(200);
        } else {
            // const templatePath = path.join(__dirname, "template.ejs");
            // const template = await fs.promises.readFile(templatePath, "utf-8");
            // const html = ejs.render(template, {
            //     email,
            //     password,
            //     name,
            //     login_id,
            //     text,
            // });

            // let mailTransporter = nodemailer.createTransport({
            //     service: "gmail",
            //     auth: {
            //         user: "onboarding@creativefuel.io",
            //         pass: "fjjmxuavwpescyat",
            //     },
            // });

            /* dynamic email temp code start */
            let contentList = await emailTempModel.find({ email_for_id: 8 })
            let content = contentList[0];

            const filledEmailContent = content.email_content
                .replace("{{user_name}}", name)
                .replace("{{user_email}}", email)
                .replace("{{user_password}}", password)
                .replace("{{user_login_id}}", login_id);

            const html = filledEmailContent;
            /* dynamic email temp code end */
            let mailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "onboarding@creativefuel.io",
                    pass: "fjjmxuavwpescyat",
                },
            });

            let mailOptions = {
                from: "onboarding@creativefuel.io",
                to: email,
                subject: subject,
                html: html,
                attachments: attachment
                    ? [
                        {
                            filename: attachment.originalname,
                            path: attachment.path,
                        },
                    ]
                    : [],
            };

            await mailTransporter.sendMail(mailOptions);
            res.sendStatus(200);
        }
    } catch (error) {
        res.status(500).send({ error: error.message, sms: 'error sending to email' });
    }
}

exports.getUserByDeptAndWFH = async (req, res) => {
    try {
        const delv = await userModel.find({ dept_id: req.params.dept_id, job_type: 'WFHD' })
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(delv)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting all whf user with dept id' })
    }
}

exports.getUserJobResponsibility = async (req, res) => {
    try {
        const delv = await jobResponsibilityModel.aggregate([
            {
                $match: {
                    user_id: req.body.user_id
                }
            },
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    id: "$_id",
                    Job_res_id: '$Job_res_id',
                    user_name: '$user.user_name',
                    sjob_responsibility: "$sjob_responsibility",
                    description: "$description",
                    Created_by: "$Created_by",
                    Last_updated_by: "$Last_updated_by",
                    Last_updated_date: "$Last_updated_date"
                }
            }
        ]).exec();
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send({ data: delv })
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting user job responsibility' })
    }
}

exports.getUserByDeptId = async (req, res) => {
    try {

        const singlesim = await userModel.aggregate([
            {
                $match: { dept_id: parseInt(req.params.id) }
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept_id',
                    as: 'department'
                }
            },
            {
                $unwind: {
                    path: "$department",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'designationmodels',
                    localField: 'user_designation',
                    foreignField: 'desi_id',
                    as: 'designation'
                }
            },
            {
                $unwind: {
                    path: "$designation",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $project: {
                    user_id: "$user_id",
                    user_name: "$user_name",
                    user_designation: "$user_designation",
                    department_name: '$department.dept_name',
                    designation_name: "$designation.desi_name",
                    last_updated: "$lastupdated",
                    tbs_applicable: "$tds_applicable"
                }
            }
        ]).exec();

        // const delv = await userModel.find({ dept_id: req.params.id }).lean();
        // if (!delv) {
        //     res.status(500).send({ success: false })
        // }
        // const modifiedUsers = delv.map(user => {
        //     if (user.hasOwnProperty('lastupdated')) {
        //         user.last_updated = user.lastupdated;
        //         delete user.lastupdated;
        //     }
        //     if (user.hasOwnProperty('tds_applicable')) {
        //         user.tbs_applicable = user.tds_applicable;
        //         delete user.tds_applicable;
        //     }
        //     return user;
        // });
        res.status(200).send(singlesim)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting all users by dept id' })
    }
}

exports.getUserOtherFields = async (req, res) => {
    try {
        // const delv = await userOtherFieldModel.find({});
        const delv = await userOtherFieldModel.aggregate([
            {
                $match: {
                    user_id: req.params.user_id
                }
            },
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    user_name: '$user.user_name',
                    // created_by_name: '$user.user_name',
                    id: "$_id",
                    user_id: '$user_id',
                    field_name: '$field_name',
                    field_value: '$field_value',
                    remark: '$remark',
                    created_at: '$created_at',
                    created_by: '$created_by',
                    lastupdated_by: '$lastupdated_by'
                }
            }
        ]).exec();
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(delv)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting user other fields' })
    }
}

exports.addUserOtherField = async (req, res) => {
    try {
        const simc = new userOtherFieldModel({
            user_id: req.body.user_id,
            field_name: req.body.field_name,
            field_value: req.file ? req.file.filename : '',
            remark: req.body.remark,
            created_by: req.body.created_at
        })
        const simv = await simc.save();
        res.send({ simv, status: 200 });
    } catch (err) {
        res.status(500).send({ error: err, sms: 'This users other fields cannot be created' })
    }
}

exports.updateUserOtherField = async (req, res) => {
    try {
        const editsim = await userOtherFieldModel.findOneAndUpdate({ user_id: req.params.user_id }, {
            field_name: req.body.field_name,
            field_value: req.file,
            remark: req.body.remark
        }, { new: true })
        if (!editsim) {
            res.status(500).send({ success: false })
        }
        res.status(200).send({ success: true, data: editsim })
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error updating user other fields' })
    }
};

exports.addReason = async (req, res) => {
    try {
        const simc = new reasonModel({
            remark: req.body.remark,
            reason: req.body.reason
        })
        const simv = await simc.save();
        res.send({ simv, status: 200 });
    } catch (err) {
        res.status(500).send({ error: err, sms: 'This reason cannot be created' })
    }
}

exports.getAllReasons = async (req, res) => {
    try {
        // const delv = await reasonModel.aggregate([
        //     {
        //         $lookup: {
        //             from: 'usermodels',
        //             localField: 'user_id',
        //             foreignField: 'created_by',
        //             as: 'user'
        //         }
        //     },
        //     {
        //         $unwind: '$user'
        //     },
        //     {
        //         $project: {
        //             createdBY_name: '$user.user_name',
        //             id: "$id",
        //             reason: '$reason',
        //             remark: '$remark',
        //             created_by: '$created_by'
        //         }
        //     }
        // ]).exec();
        const delv = await reasonModel.find();
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(delv)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting all reasons' })
    }
}

exports.addSeparation = async (req, res) => {
    try {
        const simc = new separationModel({
            user_id: req.body.user_id,
            status: req.body.status,
            created_by: req.body.created_by,
            resignation_date: req.body.resignation_date,
            last_working_day: req.body.last_working_day,
            remark: req.body.remark,
            reason: req.body.reason,
            reinstate_date: req.body.reinstate_date
        })
        const simv = await simc.save();
        res.send({ simv, status: 200 });
    } catch (err) {
        res.status(500).send({ error: err, sms: 'This separation cannot be created' })
    }
}

exports.getAllSeparations = async (req, res) => {
    try {
        const delv = await separationModel.aggregate([
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'reasonmodels',
                    localField: 'id',
                    foreignField: 'reason',
                    as: 'reason'
                }
            },
            {
                $unwind: '$reason'
            },
            {
                $project: {
                    createdBY_name: '$user.user_name',
                    reasonValue: '$reason.reason',
                    id: "$_id",
                    reason: '$reason',
                    remark: '$remark',
                    status: '$status',
                    user_id: '$user_id',
                    resignation_date: '$resignation_date',
                    last_working_date: '$last_working_date',
                    reinstate_date: '$reinstate_date'
                }
            }
        ]).exec();
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(delv)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting all separations' })
    }
}

exports.getSingleSeparation = async (req, res) => {
    try {
        const delv = await separationModel.aggregate([
            {
                $match: {
                    user_id: req.params.user_id
                }
            },
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'reasonmodels',
                    localField: 'id',
                    foreignField: 'reason',
                    as: 'reason'
                }
            },
            {
                $unwind: '$reason'
            },
            {
                $project: {
                    createdBY_name: '$user.user_name',
                    reasonValue: '$reason.reason',
                    id: "$_id",
                    reason: '$reason',
                    remark: '$remark',
                    status: '$status',
                    user_id: '$user_id',
                    resignation_date: '$resignation_date',
                    last_working_date: '$last_working_date',
                    reinstate_date: '$reinstate_date'
                }
            }
        ]).exec();
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(delv)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'error getting single separation details' })
    }
}

exports.updateSeparation = async (req, res) => {
    try {
        const editsim = await separationModel.findOneAndUpdate({ id: req.body.id }, {
            user_id: req.body.user_id,
            status: req.body.status,
            resignation_date: req.body.resignation_date,
            last_working_day: req.body.last_working_day,
            remark: req.body.remark,
            reason: req.body.reason,
            reinstate_date: req.body.reinstate_date
        }, { new: true })
        if (!editsim) {
            res.status(500).send({ success: false })
        }
        res.status(200).send({ success: true, data: editsim })
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error updating user separation' })
    }
};

exports.sendMailAllWfoUser = async (req, res) => {
    try {
        const { subject, text } = req.body;
        const attachment = req.file;

        const templatePath = path.join(__dirname, "template2.ejs");
        const template = await fs.promises.readFile(templatePath, "utf-8");

        const results = await userModel.find({ job_type: 'WFO' })

        results.forEach((user) => {
            const userName = user.user_name;
            const emailId = user.user_email_id;

            const html = ejs.render(template, {
                emailId,
                userName,
                text,
            });

            let mailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "onboarding@creativefuel.io",
                    pass: "fjjmxuavwpescyat",
                },
            });

            let mailOptions = {
                from: "onboarding@creativefuel.io",
                to: emailId,
                subject: subject,
                html: html,
                attachments: attachment
                    ? [
                        {
                            filename: attachment.originalname,
                            path: attachment.path,
                        },
                    ]
                    : [],
            };

            mailTransporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return error;
                } else {
                    res.send("Email sent successfully to:", emailId);
                }
            });
        })
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error sending email' })
    }
}

exports.getAllWfhUsers = async (req, res) => {
    try {
        const simc = await userModel.find({ job_type: 'WFHD' }).lean();
        if (simc.length === 0) {
            res.status(500).send({ success: false, message: "No record found" })
        }

        const modifiedUsers = simc.map(user => {

            if (user.hasOwnProperty('lastupdated')) {
                user.last_updated = user.lastupdated;
                delete user.lastupdated;
            }
            if (user.hasOwnProperty('tds_applicable')) {
                user.tbs_applicable = user.tds_applicable;
                delete user.tds_applicable;
            }
            return user;
        });
        res.status(200).send({ data: modifiedUsers })
    } catch (err) {
        res.status(500).send({ error: err.message, sms: 'Error getting all wfh users' })
    }
};


exports.loginUserData = async (req, res) => {
    const id = req.body.user_id;
    try {
        const user = await userModel.findOne({ user_id: id });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userObject = {
            user_id: user.user_id,
            user_name: user.user_name,
            user_designation: user.user_designation,
        };

        if (user.image) {
            userObject.image = `${vari.IMAGE_URL}/${user.image}`;
        } else {
            userObject.image = null;
        }

        res.status(200).json([userObject]);
    } catch (err) {
        res.status(500).send({ error: err.message, sms: 'Error getting loginuserdata' })
    }
};

exports.forgotPass = async (req, res) => {
    const email = req.body.user_email_id;
    try {
        const user = await userModel.findOne({ user_email_id: email }, 'user_login_password');
        if (!user) {
            return res.status(200).json({ message: "User not found with this email id." });
        }

        const getRandomPassword = helper.generateRandomPassword();

        const encryptedPass = await bcrypt.hash(getRandomPassword, 10);

        const updatePass = await userModel.findOneAndUpdate({ user_email_id: req.body.user_email_id }, {
            user_login_password: encryptedPass
        });

        // const templatePath = path.join(__dirname, "forgotemailtemp.ejs");
        // const template = await fs.promises.readFile(templatePath, "utf-8");
        // const html = ejs.render(template, {
        //     email,
        //     password: getRandomPassword
        // });

        /* dynamic email temp code start */
        let contentList = await emailTempModel.find({ email_for_id: 9 })
        let content = contentList[0];

        const filledEmailContent = content.email_content
            .replace("{{user_email}}", email)
            .replace("{{user_password}}", getRandomPassword);

        var html;
        html = filledEmailContent;
        /* dynamic email temp code end */
        if (updatePass) {
            // sendMail("Forgot password", html, email);
            /* dynamic email temp code start */
            var transport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "onboarding@creativefuel.io",
                    pass: "fjjmxuavwpescyat",
                },
            });

            const mail = (subject, html, email) => {
                let mailOptions = {
                    from: "onboarding@creativefuel.io",
                    to: email,
                    // subject: "Forgot password",
                    subject: content.email_sub,
                    html: html,
                };
                transport.sendMail(mailOptions, function (error, info) {
                    if (error) console.log(error);
                    return info;
                });
            };
            /* dynamic email temp code end */
        } else {
            return res.status(500).send({ sms: 'email couldn not send' });
        }
        return res.status(200).send({ message: 'Successfully Sent email.' })

    } catch (err) {
        return res.status(500).send({ error: err.message, message: 'Error Sending Mail' })
    }
};

exports.getLoginHistory = async (req, res) => {
    try {
        // const loginHistory = await userLoginHisModel.find({});
        const loginHistory = await userLoginHisModel.aggregate([
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            {
                $unwind: {
                    path: "$user",
                }
            },
            {
                $project: {
                    _id: 1,
                    user_id: 1,
                    user_name: "$user.user_name",
                    user_email_id: 1,
                    login_date: 1,
                    duration: 1,
                    log_out_date: 1
                }
            }
        ]).exec();
        res.status(200).send({ data: loginHistory });
    } catch (error) {
        res.status(500).send({ error: error.message, sms: "Error getting user login history" });
    }
}

exports.getAllFirstLoginUsers = async (req, res) => {
    try {
        const delv = await userModel.find({ notify_hr: true })
        if (!delv) {
            res.status(500).send({ success: false })
        }
        res.status(200).send({ results: delv })
    } catch (err) {
        res.status(500).send({ error: err.message, sms: 'error getting all user who logged in first time' })
    }
}

exports.logOut = async (req, res) => {
    try {
        const { user_id } = req.body
        const userLoginHistory = await userLoginHisModel.findOne({ user_id: user_id }, 'login_date');
        if (!userLoginHistory) {
            return response.returnFalse(200, req, res, "No record found for this user in login history", {})
        }
        const timestamp = Date.parse(userLoginHistory?.login_date);
        let formatedLoginTime = Math.floor(timestamp / 1000)
        let formatedCurrentTime = Math.floor(Date.now() / 1000)

        let diffInSecound = formatedCurrentTime - formatedLoginTime

        let updateLoginHistoryData = await userLoginHisModel.findOneAndUpdate({ user_id: user_id },
            {
                $set: {
                    duration: diffInSecound,
                    log_out_date: Date.now()
                }
            },
            {
                new: true
            })
        if (!updateLoginHistoryData) {
            return response.returnTrue(200, req, res, "Something went wrong no login history found.", {})
        }
        return response.returnTrue(200, req, res, "Successfully capture login duration time", updateLoginHistoryData)
    } catch (error) {
        return response.returnTrue(500, req, res, "Internal Server Error", {})
    }
}

exports.getUserPresitting = async (req, res) => {
    try {
        const userId = req.body.user_id;

        const sittingIds = await OrderRequest
            .find({ User_id: userId })
            .sort({ Sitting_id: -1 })
            .limit(5)
            .distinct('Sitting_id')
            .exec();

        if (!sittingIds || sittingIds.length === 0) {
            return res.status(404).json({ message: "No order requests found" });
        }

        const sittingMastData = await Sitting
            .find({ sitting_id: { $in: sittingIds } })
            .exec();

        res.status(200).json(sittingMastData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving order requests from the database" });
    }
};

exports.getAllUsersWithDoj = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentDayMonth = currentDate.toISOString().slice(5, 10);

        const allUsers = await userModel.find().select({ user_id: 1, joining_date: 1, user_name: 1, image: 1, DOB: 1 });

        const filteredUsers = allUsers.map(user => {
            const userJoiningDate = user.joining_date?.toISOString().slice(5, 10);

            if (userJoiningDate === currentDayMonth) {
                const joiningYear = user.joining_date.getFullYear();
                const currentYear = currentDate.getFullYear();
                const totalYears = currentYear - joiningYear;
                if (totalYears >= 1) {
                    return {
                        user_id: user.user_id,
                        user_name: user.user_name,
                        joining_date: user.joining_date,
                        DOB: user.DOB,
                        image: user.image,
                        total_years: totalYears
                    };
                }
            }
            return null;
        }).filter(Boolean);

        res.json({ users: filteredUsers });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

exports.getAllUsersWithDoB = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentDayMonth = currentDate.toISOString().slice(5, 10);

        const allUsers = await userModel.find().select({ user_id: 1, DOB: 1, user_name: 1, image: 1 });

        const filteredUsers = allUsers.map(user => {
            const userDOB = user.DOB?.toISOString().slice(5, 10);
            if (userDOB === currentDayMonth) {
                return {
                    user_id: user.user_id,
                    user_name: user.user_name,
                    DOB: user.DOB,
                    image: user.image
                };
            }

            return null;
        }).filter(Boolean);

        res.json({ users: filteredUsers });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

exports.getLastMonthUsers = async (req, res) => {
    try {
        const currentDate = new Date();

        const lastMonthStartDate = new Date(currentDate);
        lastMonthStartDate.setMonth(currentDate.getMonth() - 1);

        const usersFromLastMonth = await userModel.find({
            created_At: {
                $gte: lastMonthStartDate,
                $lt: currentDate,
            }
        }).select({ user_id: 1, user_name: 1, created_At: 1, joining_date: 1, image: 1 });

        res.json(usersFromLastMonth);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message, sms: 'Error getting users from last month' });
    }
}

exports.getAllFilledUsers = async (req, res) => {
    try {
        const userFields = Object.keys(userModel.schema.paths);

        const andConditions = userFields.map(field => ({ [field]: { $exists: true, $ne: null } }));

        const usersWithAllFieldsFilled = await userModel.find({
            $and: andConditions,
        });

        if (!usersWithAllFieldsFilled) {
            res.status(500).send({ success: false });
        }

        res.status(200).send({ results: usersWithAllFieldsFilled });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message, sms: 'Error getting users with all fields filled' });
    }
}

// exports.getFilledPercentage = async (req, res) => {
//     try {
//         const users = await userModel.find({ onboard_status: 2 }).select({
//             user_id: 1,
//             user_name: 1,
//             PersonalEmail: 1,
//             PersonalNumber: 1,
//             fatherName: 1,
//             Gender: 1,
//             motherName: 1,
//             Hobbies: 1,
//             BloodGroup: 1,
//             SpokenLanguage: 1,
//             DO: 1,
//             Nationality: 1,
//             guardian_name: 1,
//             guardian_contact: 1,
//             emergency_contact: 1,
//             guardian_address: 1,
//             relation_with_guardian: 1,
//             current_address: 1,
//             current_city: 1,
//             current_state: 1,
//             current_pin_code: 1,
//             permanent_address: 1,
//             permanent_city: 1,
//             permanent_state: 1,
//             permanent_pin_code: 1,
//             onboard_status: 1,
//             dept_name: 1,
//             desi_name: 1,
//         });

//         if (!users) {
//             return res.status(500).send({ success: false });
//         }

//         const resultArray = [];
//         const percentageResults = users.map(user => {
//             const filledFields = Object.values(user._doc).filter(value => value !== null && value !== "" && value !== 0).length;

//             const filledPercentage = (filledFields / 24) * 100;
//             const result = { user_id: user.user_id, filledPercentage: filledPercentage.toFixed(2) };

//             resultArray.push(result);

//             return result;
//         });

//         const incompleteUsers = resultArray.filter(result => parseFloat(result.filledPercentage) < 100);
//         const incompleteUsersDetails = incompleteUsers.map(incompleteUser => {
//             const userDetail = users.find(user => user.user_id === incompleteUser.user_id);
//             return { ...userDetail._doc, filledPercentage: incompleteUser.filledPercentage };
//         });

//         res.status(200).send({ incompleteUsersDetails });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ error: err.message, sms: 'Error calculating filled percentage' });
//     }
// }  

exports.getFilledPercentage = async (req, res) => {
    try {
        const users = await userModel.find({ onboard_status: 2 }).select({
            user_id: 1,
            user_name: 1,
            PersonalEmail: 1,
            PersonalNumber: 1,
            fatherName: 1,
            Gender: 1,
            motherName: 1,
            Hobbies: 1,
            BloodGroup: 1,
            SpokenLanguage: 1,
            DO: 1,
            Nationality: 1,
            guardian_name: 1,
            guardian_contact: 1,
            emergency_contact: 1,
            guardian_address: 1,
            relation_with_guardian: 1,
            current_address: 1,
            current_city: 1,
            current_state: 1,
            current_pin_code: 1,
            permanent_address: 1,
            permanent_city: 1,
            permanent_state: 1,
            permanent_pin_code: 1,
            onboard_status: 1,
            dept_id: 1,
            user_designation: 1,
        });

        if (!users) {
            return res.status(500).send({ success: false });
        }

        const resultArray = [];
        const percentageResults = users.map(user => {
            const filledFields = Object.values(user._doc).filter(value => value !== null && value !== "" && value !== 0).length;

            const filledPercentage = (filledFields / 24) * 100;
            const result = { user_id: user.user_id, filledPercentage: filledPercentage.toFixed(2) };

            resultArray.push(result);

            return result;
        });

        const incompleteUsers = resultArray.filter(result => parseFloat(result.filledPercentage) < 100);
        const incompleteUsersDetails = await Promise.all(incompleteUsers.map(async incompleteUser => {
            const userDetail = await userModel.findOne({ user_id: incompleteUser.user_id }).select({});

            const deptDetail = await departmentModel.findOne({ dept_id: userDetail.dept_id }).select({
                dept_name: 1,
            });

            const desiDetail = await designationModel.findOne({ user_designation: userDetail.user_designation }).select({
                desi_name: 1,
            });

            return { ...userDetail._doc, filledPercentage: incompleteUser.filledPercentage, dept_name: deptDetail.dept_name, desi_name: desiDetail.desi_name };
        }));

        res.status(200).send({ incompleteUsersDetails });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message, sms: 'Error calculating filled percentage' });
    }
}

exports.getUserGraphData = async (req, res) => {
    try {
        let result;

        if (req.body.caseType == 'gender') {
            result = await userModel.aggregate([
                {
                    $group: {
                        _id: {
                            dept_id: "$dept_id",
                            gender: "$Gender",
                        },
                        count: { $sum: 1 },
                    },
                },
                {
                    $group: {
                        _id: "$_id.dept_id",
                        maleCount: {
                            $sum: {
                                $cond: [{ $eq: ["$_id.gender", "Male"] }, "$count", 0],
                            },
                        },
                        femaleCount: {
                            $sum: {
                                $cond: [{ $eq: ["$_id.gender", "Female"] }, "$count", 0],
                            },
                        },
                    },
                },
                {
                    $lookup: {
                        from: "departmentmodels",
                        localField: "_id",
                        foreignField: "dept_id",
                        as: "department",
                    },
                },
                {
                    $unwind: {
                        path: "$department",
                        preserveNullAndEmptyArrays: true
                    },
                },
                {
                    $project: {
                        _id: 0,
                        dept_id: "$_id",
                        maleCount: 1,
                        dept_name: "$department.dept_name",
                        femaleCount: 1,
                    },
                },
            ]);
        } else if (req.body.caseType == 'job') {
            result = await userModel.aggregate([
                {
                    $group: {
                        _id: {
                            dept_id: "$dept_id",
                            job: "$job_type",
                        },
                        count: { $sum: 1 },
                    },
                },
                {
                    $group: {
                        _id: "$_id.dept_id",
                        wfhCount: {
                            $sum: {
                                $cond: [{ $eq: ["$_id.job", "WFHD"] }, "$count", 0],
                            },
                        },
                        wfoCount: {
                            $sum: {
                                $cond: [{ $eq: ["$_id.job", "WFO"] }, "$count", 0],
                            },
                        },
                    },
                },
                {
                    $lookup: {
                        from: "departmentmodels",
                        localField: "_id",
                        foreignField: "dept_id",
                        as: "department",
                    },
                },
                {
                    $unwind: {
                        path: "$department",
                        preserveNullAndEmptyArrays: true
                    },
                },
                {
                    $project: {
                        _id: 0,
                        dept_id: "$_id",
                        wfhCount: 1,
                        dept_name: "$department.dept_name",
                        wfoCount: 1,
                    },
                },
            ]);
        } else if (req.body.caseType == 'year') {
            result = await userModel.aggregate([
                {
                    $addFields: {
                        convertedDate: { $toDate: "$joining_date" },
                    },
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$convertedDate" },
                        },
                        userjoined: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        year: "$_id.year",
                        userjoined: 1,
                    },
                },
            ]);
        } else if (req.body.caseType == 'experience') {
            result = await userModel.aggregate([
                {
                    $addFields: {
                        convertedDate: { $toDate: "$joining_date" },
                        experience: {
                            $divide: [
                                { $subtract: [new Date(), { $toDate: "$joining_date" }] },
                                31536000000,
                            ],
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            years: {
                                $subtract: [
                                    { $floor: "$experience" },
                                    { $mod: [{ $floor: "$experience" }, 2] },
                                ],
                            },
                        },
                        userCounts: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        years: "$_id.years",
                        userCounts: 1,
                    },
                }
            ]);
        } else if (req.body.caseType == 'age') {
            result = await userModel.aggregate([
                {
                    $addFields: {
                        birthYear: { $year: { $toDate: "$DOB" } },
                        age: {
                            $subtract: [
                                { $year: new Date() },
                                { $year: { $toDate: "$DOB" } }
                            ]
                        }
                    },
                },
                {
                    $group: {
                        _id: {
                            ageGroup: {
                                $switch: {
                                    branches: [
                                        { case: { $and: [{ $gte: ["$age", 10] }, { $lte: ["$age", 17] }] }, then: "10-17" },
                                        { case: { $and: [{ $gte: ["$age", 18] }, { $lte: ["$age", 24] }] }, then: "18-24" },
                                        { case: { $and: [{ $gte: ["$age", 25] }, { $lte: ["$age", 30] }] }, then: "25-30" },
                                        { case: { $and: [{ $gte: ["$age", 31] }, { $lte: ["$age", 35] }] }, then: "31-35" },
                                        { case: { $and: [{ $gte: ["$age", 36] }, { $lte: ["$age", 40] }] }, then: "36-40" },
                                        { case: { $gte: ["$age", 41] }, then: "41+" }
                                    ],
                                    default: "Unknown"
                                }
                            }
                        },
                        userCount: { $sum: 1 },
                    },
                },
                {
                    $match: {
                        "_id.ageGroup": { $ne: "Unknown" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        age: "$_id.ageGroup",
                        userCount: 1,
                    },
                }
            ]);
        }

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({ error: err.message, sms: "Error creating user graph" });
    }
};