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
const bcrypt = require("bcrypt");
const fs = require("fs");
const ejs = require('ejs');
const nodemailer = require("nodemailer");
const sendMail = require("../common/sendMail.js");
const helper = require('../helper/helper.js');

const upload = multer({ dest: "uploads/" }).fields([
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
    { name:  "annexure_pdf", maxCount:1 }
]);

exports.addUser = [upload, async (req, res) => {
    try {
        let encryptedPass;
        if (req.body.user_login_password) {
            encryptedPass = await bcrypt.hash(req.body.user_login_password, 10);
        }
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
            image: req.files.image ? req.files.image[0].filename : '',
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
            emergency_contact: req.body.emergency_contact,
            ctc: req.body.ctc,
            offer_letter_send: req.body.offer_letter_send,
            annexure_pdf: req.files.annexure_pdf ? req.files.annexure_pdf[0].filename : '',
            profileflag : req.body.profileflag,
            nick_name : req.body.nick_name,
            offer_later_date: req.body.offer_later_date,
            annexure_pdf: req.files.annexure_pdf ? req.files.annexure_pdf[0].filename : ''
        })
        const simv = await simc.save();

        // Genreate a pdf file for offer later
        if (simv?.offer_letter_send) {
          helper.generateOfferLaterPdf(simv)
        } 

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

        res.send({ simv, status: 200 });
    } catch (err) {
        res.status(500).send({ error: err.message, sms: 'This user cannot be created' })
    }
}];



const upload1 = multer({ dest: "uploads/" }).fields([
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
    { name:  "annexure_pdf", maxCount:1 }
]);
exports.updateUser = [upload1, async (req, res) => {
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
            FatherName: req.body.FatherName,
            MotherName: req.body.MotherName,
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
            image: req.files && req.files['image'] && req.files['image'][0] ? req.files['image'][0].filename : '',
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
            digital_signature_image: req.files && req.files['digital_signature_image'] && req.files['digital_signature_image'][0] ? req.files['digital_signature_image'][0].filename : (existingUser && existingUser.digital_signature_image) || '',
            bank_name: req.body.bank_name,
            ifsc_code: req.body.ifsc_code,
            account_no: req.body.account_no,
            guardian_name: req.body.guardian_name,
            guardian_address: req.body.guardian_address,
            relation_with_guardian: req.body.relation_with_guardian,
            gaurdian_number: req.body.gaurdian_number,
            emergency_contact: req.body.emergency_contact,
            ctc: req.body.ctc,
            offer_letter_send: req.body.offer_letter_send,
            annexure_pdf: req.files && req.files['annexure_pdf'] && req.files['annexure_pdf'][0] ? req.files['annexure_pdf'][0].filename : (existingUser && existingUser.annexure_pdf) || '',
            profileflag: req.body.profileflag,
            nick_name: req.body.nick_name ,
            offer_later_acceptance_date: req.body.offer_later_acceptance_date,
            offer_later_status: req.body.offer_later_status, 
            offer_later_reject_reason: req.body.offer_later_reject_reason 

        }, { new: true });
        if (!editsim) {
            return res.status(500).send({ success: false })
        }
        // Genreate a pdf file for offer later
        if (editsim?.offer_later_status == true || (editsim?.joining_date_extend || (editsim?.digital_signature_image && editsim?.digital_signature_image !== "") )) {
            helper.generateOfferLaterPdf(editsim)
            } 
        return res.status(200).send({ success: true, data: editsim })
    } catch (err) {
        return res.status(500).send({ error: err.message, sms: 'Error updating user details' })
    }
}];

exports.getWFHUsersByDept = async (req, res) => {
    try {
        const simc = await userModel.find({ dept_id: req.params.dept_id, job_type: 'WFH' }).lean();
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
                $project: {
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
                    bank_name:"$bank_name",
                    ifsc_code:"$ifsc_code",
                    account_no:"$account_no",
                    guardian_name:"$guardian_name",
                    guardian_address:"$guardian_address",
                    relation_with_guardian:"$relation_with_guardian",
                    gaurdian_number:"$gaurdian_number",
                    emergency_contact:"$emergency_contact",
                    ctc:"$ctc",
                    offer_letter_send:"$offer_letter_send",
                    annexure_pdf:"$annexure_pdf",
                    profileflag:"$profileflag",
                    nick_name: "$nick_name"
                }
            }
        ]).exec();
        const userImagesBaseUrl = "http://34.93.135.33:8080/uploads/";
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
            annexure_pdf_url: user.annexure_pdf ? userImagesBaseUrl + user.annexure_pdf : null
        }));
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
                    bank_name:"$bank_name",
                    ifsc_code:"$ifsc_code",
                    account_no:"$account_no",
                    guardian_name:"$guardian_name",
                    guardian_address:"$guardian_address",
                    relation_with_guardian:"$relation_with_guardian",
                    gaurdian_number:"$gaurdian_number",
                    emergency_contact:"$emergency_contact",
                    ctc:"$ctc",
                    offer_letter_send:"$offer_letter_send",
                    profileflag:"$profileflag",
                    nick_name: "$nick_name"
                }
            }
        ]).exec();
        const userImagesBaseUrl = "http://34.93.135.33:8080/uploads/";
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
        // const simc = await userModel.find();
        const simc = await userModel.aggregate([
            {
                $match: {
                    user_login_id: req.body.user_login_id.toLowerCase().trim(),
                    // user_login_password:req.body.user_login_password
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
                    // id: "$id",
                    name: '$user_name',
                    email: '$user_email_id',
                    dept_id: '$dept_id',
                    role_id: '$role_id',
                    id: "$user_id",
                    // name: "$user_name",
                    // email: "$user_email_id",
                    // sitting_id: '$sitting_id',
                    room_id: '$room_id',
                    user_status: '$user_status',
                    user_login_password: '$user_login_password',
                    onboard_status: '$onboard_status',
                    id: '$user_id',
                    user_login_id: '$user_login_id'
                }
            }
        ]).exec();
        
        if (simc.length === 0) {
            return res.status(500).send({ success: false })
        }
        let role = req.body?.role_id
        if (bcrypt.compareSync(req.body.user_login_password, simc[0]?.user_login_password) || role === constant.ADMIN_ROLE) {
            // if (bcrypt.compareSync(req.body.user_login_password, simc[0].user_login_password)) {
            const token = jwt.sign(
                {
                    id: simc[0]?.id,
                    name: simc[0]?.name,
                    email: simc[0]?.email,
                    sitting_id: simc[0]?.sitting_id,
                    role_id: simc[0]?.role_id,
                    dept_id: simc[0]?.dept_id,
                    room_id: simc[0]?.room_id,
                    Sitting_id: simc[0]?.Sitting_id,
                    Sitting_ref_no: simc[0]?.Sitting_ref_no,
                    onboard_status: simc[0]?.onboard_status,
                    user_status: simc[0]?.user_status,
                },
                constant.SECRET_KEY_LOGIN,
                { expiresIn: constant.CONST_VALIDATE_SESSION_EXPIRE }
            );

            var currentDate = new Date();
            var formattedDateTime = currentDate.toLocaleString();

            if(simc[0].onboard_status == 2){                
                const saveDataObj = {
                    user_id: simc[0].id,
                    user_email_id: simc[0].email || simc[0].user_login_id
                };
                await userLoginHisModel.create(saveDataObj);
                if(simc[0].first_login_flag == false){
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

            return res.status(200).send({ token, user: simc[0] })
        } else {
            return res.status(200).send({ sms: 'Invalid Password' })
        }

    } catch (err) {
        return res.status(500).send({ error: err.message, sms: 'Error getting user details' })
    }
}

exports.deliveryBoy = async (req, res) => {
    try {
        const delv = await userModel.find({ role_id: 3 }).select('user_id')
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
                $unwind: '$department'
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
                $unwind: '$role'
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
                $unwind: '$user1'
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
                    image: ImageUrl + '$image',
                    UID: ImageUrl + '$UID',
                    pan: ImageUrl + '$pan',
                    highest_upload: ImageUrl + '$highest_upload',
                    other_upload: ImageUrl + '$other_upload',
                    tenth_marksheet: ImageUrl + '$tenth_marksheet',
                    twelveth_marksheet: ImageUrl + '$twelveth_marksheet',
                    UG_Marksheet: ImageUrl + '$UG_Marksheet',
                    passport: ImageUrl + '$passport',
                    pre_off_letter: ImageUrl + '$pre_off_letter',
                    pre_expe_letter: ImageUrl + '$pre_expe_letter',
                    pre_relieving_letter: ImageUrl + '$pre_relieving_letter',
                    bankPassBook_Cheque: ImageUrl + '$bankPassBook_Cheque',
                    joining_extend_document: ImageUrl + '$joining_extend_document',
                    guardian_name:"$guardian_name",
                    guardian_address:"$guardian_address",
                    relation_with_guardian:"$relation_with_guardian",
                    gaurdian_number:"$gaurdian_number",
                    emergency_contact:"$emergency_contact"
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
            const templatePath = path.join(__dirname, "template.ejs");
            const template = await fs.promises.readFile(templatePath, "utf-8");

            const html = ejs.render(template, {
                email,
                password,
                name,
                login_id,
                text,
            });

            let mailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "connect@creativefuel.io",
                    pass: "clqjuhplszzqesiv",
                },
            });

            let mailOptions = {
                from: "connect@creativefuel.io",
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
        }else if (status == "reportTo") {
            const templatePath = path.join(__dirname, "reportTo.ejs");
            const template = await fs.promises.readFile(templatePath, "utf-8");

            const html = ejs.render(template, {
                name,
                name2
            });

            let mailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "connect@creativefuel.io",
                    pass: "clqjuhplszzqesiv",
                },
            });

            let mailOptions = {
                from: "connect@creativefuel.io",
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
            const templatePath = path.join(__dirname, "template.ejs");
            const template = await fs.promises.readFile(templatePath, "utf-8");
            const html = ejs.render(template, {
                email,
                password,
                name,
                login_id,
                text,
            });

            let mailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "connect@creativefuel.io",
                    pass: "clqjuhplszzqesiv",
                },
            });

            let mailOptions = {
                from: "connect@creativefuel.io",
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
        const delv = await userModel.find({ dept_id: req.params.dept_id, job_type: 'WFH' })
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
                    user: "vijayanttrivedi1500@gmail.com",
                    pass: "odovpikkjvkprrjv",
                },
            });

            let mailOptions = {
                from: "vijayanttrivedi1500@gmail.com",
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
        const simc = await userModel.find({ job_type: 'WFH' }).lean();
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
    const id = req.body.id;
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
            userObject.image = `http://34.93.135.33:8080/uploads/${user.image}`;
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

        const templatePath = path.join(__dirname, "forgotemailtemp.ejs");
        const template = await fs.promises.readFile(templatePath, "utf-8");
        const html = ejs.render(template, {
            email,
            password : getRandomPassword
        
        });

        if(updatePass){
            sendMail("Forgot password", html,email);
        }else{
            return res.status(500).send({sms:'email couldn not send'});
        }
        return res.status(200).send({  message: 'Successfully Sent email.' })

    } catch (err) {
       return  res.status(500).send({ error: err.message, message: 'Error Sending Mail' })
    }
};

exports.getLoginHistory = async (req, res) => {
    try {
        const dataa = await userLoginHisModel.find({});
        res.status(200).send({data:dataa})
    } catch (error) {
        res.status(500).send({error: error.message, sms:"error getting user login history"})
    }
}

exports.getAllFirstLoginUsers = async(req, res) => {
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
        const  { user_id } = req.body
        const userLoginHistory = await userLoginHisModel.findOne({user_id : user_id},'login_date');
        if(!userLoginHistory ) {
           return response.returnFalse(200,req,res,"No record found for this user in login history", {})
        }
        const timestamp = Date.parse(userLoginHistory?.login_date);
        let formatedLoginTime = Math.floor(timestamp / 1000)
        let formatedCurrentTime= Math.floor(Date.now() / 1000)
       
        let diffInSecound = formatedCurrentTime - formatedLoginTime

        let updateLoginHistoryData = await userLoginHisModel.findOneAndUpdate({user_id : user_id},
            {
                $set:{
                    duration : diffInSecound,
                    log_out_date : Date.now()
                }
            },
            {
                new : true
            })
        if(!updateLoginHistoryData){
            return response.returnTrue ( 200 , req, res, "Something went wrong no login history found.",{})
        }
        return response.returnTrue ( 200 , req, res, "Successfully capture login duration time",updateLoginHistoryData)
    } catch (error) {
        return response.returnTrue ( 500 , req, res, "Internal Server Error",{})
    }
}