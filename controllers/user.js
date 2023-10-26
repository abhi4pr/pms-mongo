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
const objModel = require('../models/objModel.js');
const constant = require('../common/constant.js');
const bcrypt = require("bcrypt");

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
    { name: "joining_extend_document", maxCount:1 },
  ]);

exports.addUser = [upload, async (req, res) =>{
    try{
        console.log("body",req.body);
        let encryptedPass;
        if(req.body.user_login_password){
            encryptedPass = await bcrypt.hash(req.body.user_login_password, 10);
        }
        const simc = new userModel({
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
            report_L1: req.body.report_L1,
            report_L2: req.body.report_L2,
            report_L3: req.body.report_L3,
            Personal_email: req.body.Personal_email,
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
            sub_dept_id: req.body.sub_dept_id,
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
            image: req.file ? req.files.image[0].filename : '',
            UID: req.file ? req.files.UID[0].filename : '',
            pan: req.file ? req.files.pan[0].filename : '',
            highest_upload: req.file ? req.files.highest_upload[0].filename : '',
            other_upload: req.file ? req.files.other_upload[0].filename : '',
            tenth_marksheet: req.file ? req.files.tenth_marksheet[0].filename : '',
            twelveth_marksheet: req.file ? req.files.twelveth_marksheet[0].filename : '',
            UG_Marksheet: req.file ? req.files.UG_Marksheet[0].filename : '',
            passport: req.file ? req.files.passport[0].filename : '',
            pre_off_letter: req.file ? req.files.pre_off_letter[0].filename : '',
            pre_expe_letter: req.file ? req.files.pre_expe_letter[0].filename : '',
            pre_relieving_letter: req.file ? req.files.pre_relieving_letter[0].filename : '',
            bankPassBook_Cheque: req.file ? req.files.bankPassBook_Cheque[0].filename : '',
            joining_extend_document: req.file ? req.files.joining_extend_document[0].filename : ''
        })
        const simv = await simc.save();

        const joining = simv.joining_date;
        const convertDate = new Date(joining);
        const extractDate = convertDate.getDate();
        const joiningMonth = new Intl.DateTimeFormat('en-US',{ month : 'long' }).format(convertDate);
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
        
        // console.log('ffff',objects)

        for (const object of objects) {
            const objectId = object.obj_id;
            let insertValue = 0;
            let viewValue = 0;
            let updateValue = 0;
            let deleteValue = 0;
    
            if (simv.role_id === 1) {
            insertValue = 1;
            viewValue = 1;
            updateValue = 1;
            deleteValue = 1;
            }
    
            const userAuthDocument = {
            Juser_id: simv.user_id,
            obj_id: objectId,
            insert_value: insertValue,
            view_value: viewValue,
            update_value: updateValue,
            delete_flag_value: deleteValue,
            creation_date: new Date(),
            created_by: simv.created_by || 0,
            last_updated_by: simv.created_by || 0,
            last_updated_date: new Date(),
        };
  
        await userAuthModel.updateOne(
          { Juser_id: simv.user_id, obj_id: objectId },
          { $set: userAuthDocument },
          { upsert: true }
        );
      }

        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err.message,sms:'This user cannot be created'})
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
    { name: "joining_extend_document", maxCount:1 },
  ]);
exports.updateUser = [upload1,async (req, res) => {
    try{
        
        let encryptedPass;
       if (req.body.user_login_password){
         encryptedPass = await bcrypt.hash(req.body.user_login_password, 10);
       }
        const editsim = await userModel.findOneAndUpdate({user_id:req.body.user_id},{
            user_name: req.body.user_name,
            user_designation: req.body.user_designation,
            user_email_id: req.body.user_email_id,
            user_login_id: req.body.user_login_id,
            // user_login_password: encryptedPass,
            user_report_to_id: req.body.user_report_to_id,
            user_contact_no: req.body.user_contact_no,
            dept_id: req.body.dept_id,
            location_id: req.body.location_id,
            created_by: req.body.created_by,
            role_id: req.body.role_id,
            sitting_id: req.body.sitting_id,
            job_type: req.body.job_type,
            personal_number: req.body.personal_number,
            report_L1: req.body.report_L1,
            report_L2: req.body.report_L2,
            report_L3: req.body.report_L3,
            Personal_email: req.body.Personal_email,
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
            sub_dept_id: req.body.sub_dept_id,
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
            image: req.file ? req.files.image[0].filename : '',
            UID: req.file ? req.files.UID[0].filename : '',
            pan: req.file ? req.files.pan[0].filename : '',
            highest_upload: req.file ? req.files.highest_upload[0].filename : '',
            other_upload: req.file ? req.files.other_upload[0].filename : '',
            tenth_marksheet: req.file ? req.files.tenth_marksheet[0].filename : '',
            twelveth_marksheet: req.file ? req.files.twelveth_marksheet[0].filename : '',
            UG_Marksheet: req.file ? req.files.UG_Marksheet[0].filename : '',
            passport: req.file ? req.files.passport[0].filename : '',
            pre_off_letter: req.file ? req.files.pre_off_letter[0].filename : '',
            pre_expe_letter: req.file ? req.files.pre_expe_letter[0].filename : '',
            pre_relieving_letter: req.file ? req.files.pre_relieving_letter[0].filename : '',
            bankPassBook_Cheque: req.file ? req.files.bankPassBook_Cheque[0].filename : '',
            joining_extend_document: req.file ? req.files.joining_extend_document[0].filename : ''
        }, { new: true })
        if(!editsim){
           return res.status(500).send({success:false})
        }
        console.log("output",editsim);
        return res.status(200).send({success:true,data:editsim})
    } catch(err){
        return res.status(500).send({error:err.message,sms:'Error updating user details'})
    }
}];

exports.getWFHUsersByDept = async (req, res) => {
    try{
        const simc = await userModel.find({dept_id:req.body.dept_id,job_type:'WFH'});
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all wfh users'})
    }
};

exports.getAllUsers = async (req, res) => {
    try{
        const ImageUrl = 'http://34.93.135.33:8080/uploads/';
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
                $unwind: '$department'
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
                $unwind: '$designation'
            },
            {
                $lookup: {
                    from: 'rolemodels',
                    localField: 'role_id',
                    foreignField: 'Role_id',
                    as: 'role'
                }
            },
            {
                $unwind: '$role'
            },
            // {
            //     $lookup:{
            //         from: 'usermodels',
            //         localField: 'user_report_to_id',
            //         foreignField: 'user_id',
            //         as: 'user1'
            //     }
            // },
            // {
            //     $unwind: '$user1'
            // },
            // {
            //     $lookup:{
            //         from: 'usermodels',
            //         localField: 'Report_L1',
            //         foreignField: 'user_id',
            //         as: 'user2'
            //     }
            // },
            // {
            //     $unwind: '$user2'
            // },
            {
                $project: {
                    department_name: '$department.dept_name',
                    designation_name: '$designation.desi_name',
                    user_designation: '$user_designation', 
                    dept_id: "$dept_id",
                    desi_id: '$user_designation',
                    user_id: "$user_id",
                    _id: "$_id",
                    // report: '$user1.user_name',
                    // report_L1_name: '$user2.user_name',
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
                    personal_number: '$PersonalNumber',
                    report_L1: '$Report_L1',
                    report_L2: '$Report_L2',
                    report_L3: '$Report_L3',
                    Personal_email: '$PersonalEmail',
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
                    FatherName: '$fatherName',
                    MotherName: '$motherName',
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
                    joining_extend_document: { $concat: [ImageUrl, '$joining_extend_document'] }
                }
            }
        ]).exec();
        res.status(200).send({data:singlesim})
    }catch(err){
        res.status(500).send({error:err,sms:'Error getting all users'})
    }
}

exports.getSingleUser = async (req, res) => {
    try{
        const ImageUrl = 'http://34.93.135.33:8080/uploads/';
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
                $unwind: '$department'
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
                $unwind: '$designation'
            },
            {
                $lookup: {
                    from: 'rolemodels',
                    localField: 'role_id',
                    foreignField: 'Role_id',
                    as: 'role'
                }
            },
            {
                $unwind: '$role'
            },
            // {
            //     $lookup:{
            //         from: 'usermodels',
            //         localField: 'user_report_to_id',
            //         foreignField: 'user_id',
            //         as: 'user1'
            //     }
            // },
            // {
            //     $unwind: '$user1'
            // },
            // {
            //     $lookup:{
            //         from: 'usermodels',
            //         localField: 'Report_L1',
            //         foreignField: 'user_id',
            //         as: 'user2'
            //     }
            // },
            // {
            //     $unwind: '$user2'
            // },
            {
                $project: {
                    department_name: '$department.dept_name',
                    designation_name: '$designation.desi_name',
                    user_designation: '$user_designation', 
                    dept_id: "$dept_id",
                    desi_id: '$user_designation',
                    user_id: "$user_id",
                    _id: "$_id",
                    // report: '$user1.user_name',
                    // report_L1_name: '$user2.user_name',
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
                    personal_number: '$PersonalNumber',
                    report_L1: '$Report_L1',
                    report_L2: '$Report_L2',
                    report_L3: '$Report_L3',
                    Personal_email: '$PersonalEmail',
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
                    FatherName: '$fatherName',
                    MotherName: '$motherName',
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
                    joining_extend_document: { $concat: [ImageUrl, '$joining_extend_document'] }
                }
            }
            // ,{
            //     $replaceRoot: {
            //         newRoot: "$$ROOT"
            //     }
            // }
        ]).exec();
        res.status(200).send(singlesim[0])
    }catch(err){
        res.status(500).send({error:err,sms:'Error getting all users'})
    }
}

exports.deleteUser = async (req, res) =>{
    userModel.deleteOne({user_id:req.params.id}).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'user deleted'})
        }else{
            return res.status(404).json({success:false, message:'user not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.loginUser = async (req, res) => {
    try{
        const simc = await userModel.aggregate([
            {
                $match: {
                    user_login_id:req.body.user_login_id,
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
                $unwind: '$sitting'
            },
            {
                $project: {
                    Sitting_id: '$sitting.sitting_id',
                    Sitting_ref_no: '$sitting.sitting_ref_no',
                    id: "$id",
                    name: '$user_name',
                    email: '$user_email_id',
                    dept_id: '$dept_id',
                    role_id: '$role_id',
                    // sitting_id: '$sitting_id',
                    room_id: '$room_id',
                    user_status: '$user_status',
                    user_login_password: '$user_login_password',
                    onboard_status: '$onboard_status',
                    id: '$user_id'
                }
            }
        ]).exec();
          
        if(simc.length === 0){
            return res.status(500).send({success:false})
        }
        if (bcrypt.compareSync(req.body.user_login_password, simc[0].user_login_password)) {
            const token = jwt.sign(
                {
                  id: simc[0].user_id,
                  name: simc[0].user_name,
                  email: simc[0].user_email_id,
                  sitting_id: simc[0].sitting_id,
                  role_id: simc[0].role_id,
                  dept_id: simc[0].dept_id,
                  room_id: simc[0].room_id,
                  Sitting_id: simc[0].Sitting_id,
                  Sitting_ref_no: simc[0].Sitting_ref_no,
                  onboard_status: simc[0].onboard_status,
                  user_status: simc[0].user_status,
                },
                constant.SECRET_KEY_LOGIN,
            { expiresIn:  constant.CONST_VALIDATE_SESSION_EXPIRE }
            );
            return res.status(200).send({token,user:simc[0]})
          } else {
            return res.status(200).send({sms:'Invalid Password'})
          }
       
    } catch(err){
        return res.status(500).send({error:err.message,sms:'Error getting user details'})
    }
}

exports.deliveryBoy = async (req, res) => {
    try{
        const delv = await userModel.find({role_id:3}).select('user_id')
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send({results:delv})
    } catch(err){
        res.status(500).send({error:err, sms:'error getting all delivery boy'})
    }
}

exports.deliveryBoyByRoom = async (req, res) => {
    try{
        const delv = await userModel.find({role_id:3,room_id:req.params.room_id})
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting delivery boy from this room'})
    }
}

exports.deliveryUser = async (req, res) => {
    try{
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
                    localField: 'Role_id',
                    foreignField: 'role_id',
                    as: 'role'
                }
            },
            {
                $unwind: '$role'
            },
            {
                $lookup:{
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
                    invoice_template_no: '$invoice_template_no',
                    image: ImageUrl+'$image',
                    UID: ImageUrl+'$UID',
                    pan: ImageUrl+'$pan',
                    highest_upload: ImageUrl+'$highest_upload',
                    other_upload: ImageUrl+'$other_upload',
                    tenth_marksheet: ImageUrl+'$tenth_marksheet',
                    twelveth_marksheet: ImageUrl+'$twelveth_marksheet',
                    UG_Marksheet: ImageUrl+'$UG_Marksheet',
                    passport: ImageUrl+'$passport',
                    pre_off_letter: ImageUrl+'$pre_off_letter',
                    pre_expe_letter: ImageUrl+'$pre_expe_letter',
                    pre_relieving_letter: ImageUrl+'$pre_relieving_letter',
                    bankPassBook_Cheque: ImageUrl+'$bankPassBook_Cheque',
                    joining_extend_document: ImageUrl+'$joining_extend_document'
                }
            }
        ]).exec();
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting delivery user'})
    }
}

exports.addUserAuth = async (req, res) => {
    try{
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
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This user auth cannot be created'})
    }
}

exports.allUserAuthDetail = async (req, res) => {
    try{
        const delv = await userAuthModel.aggregate([
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
                $project: {
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
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting all user auth details'})
    }
}

exports.updateUserAuth = async (req, res) => {
    try{
        const editsim = await userAuthModel.findOneAndUpdate({auth_id:req.body.auth_id},{
            Juser_id: req.body.Juser_id,
            obj_id: req.body.obj_id,
            insert: req.body.insert,
            view: req.body.view,
            update: req.body.update,
            delete_flag: req.body.delete_flag,
            Last_updated_date: req.body.Last_updated_date,
            Last_updated_by: req.body.Last_updated_by
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating user auth details'})
    }
};

exports.deleteUserAuth = async (req, res) =>{
    userAuthModel.deleteOne({auth_id:req.body.auth_id}).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'user auth deleted'})
        }else{
            return res.status(404).json({success:false, message:'user auth not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.getSingleUserAuthDetail = async (req, res) => {
    try{
        const delv = await userAuthModel.aggregate([
            {
                $match:{
                    Juser_id: req.params.Juser_id
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
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting user auth details'})
    }
}

exports.userObjectAuth = async (req, res) =>{
    try{
        const delv = await userAuthModel.aggregate([
            {
                $match:{
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
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting user object auth details'})
    }
};

exports.sendUserMail = async (req, res) => {
    try {
        const { email, subject, name, password, login_id, status, text } = req.body;
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
              user: "vijayanttrivedi1500@gmail.com", 
              pass: "odovpikkjvkprrjv",
            },
          });
    
          let mailOptions = {
            from: "vijayanttrivedi1500@gmail.com",
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
              user: "vijayanttrivedi1500@gmail.com", 
              pass: "odovpikkjvkprrjv", 
            },
          });
    
          let mailOptions = {
            from: "vijayanttrivedi1500@gmail.com",
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
        res.sendStatus(500);
    }
}

exports.getUserByDeptAndWFH = async (req, res) => {
    try{
        const delv = await userModel.find({dept_id:req.params.dept_id,job_type:'wfh'})
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting all whf user with dept id'})
    }
}

exports.getUserJobResponsibility = async (req, res) => {
    try{
        const delv = await jobResponsibilityModel.aggregate([
            {
                $match:{
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
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting user job responsibility'})
    }
}

exports.getUserByDeptId = async (req, res) => {
    try{
        const delv = await userModel.find({dept_id:req.params.id})
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting all users by dept id'})
    }
}

exports.getUserOtherFields = async (req, res) => {
    try{
        const delv = await userOtherFieldModel.aggregate([
            {
                $match:{
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
                $project: {
                    user_name: '$user.user_name',
                    created_by_name: '$user.user_name',
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
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting user other fields'})
    }
}

exports.addUserOtherField = async (req, res) => {
    try{
        const simc = new userOtherFieldModel({
            user_id: req.body.user_id,
            field_name: req.body.field_name,
            field_value: req.file,
            remark: req.body.remark,
            created_by: req.body.created_at
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This users other fields cannot be created'})
    }
}

exports.updateUserOtherField = async (req, res) => {
    try{
        const editsim = await userOtherFieldModel.findOneAndUpdate({user_id:req.params.user_id},{
            field_name: req.body.field_name,
            field_value: req.file,
            remark: req.body.remark
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating user other fields'})
    }
};

exports.addReason = async (req, res) => {
    try{
        const simc = new reasonModel({
            remark: req.body.remark,
            reason: req.body.reason
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This reason cannot be created'})
    }
}

exports.getAllReasons = async (req, res) => {
    try{
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
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting all reasons'})
    }
}

exports.addSeparation = async (req, res) => {
    try{
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
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This separation cannot be created'})
    }
}

exports.getAllSeparations = async (req, res) => {
    try{
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
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting all separations'})
    }
}

exports.getSingleSeparation = async (req, res) => {
    try{
        const delv = await separationModel.aggregate([
            {
                $match:{
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
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting single separation details'})
    }
}

exports.updateSeparation = async (req, res) => {
    try{
        const editsim = await separationModel.findOneAndUpdate({id:req.body.id},{
            user_id: req.body.user_id,
            status: req.body.status,
            resignation_date: req.body.resignation_date,
            last_working_day: req.body.last_working_day,
            remark: req.body.remark,
            reason: req.body.reason,
            reinstate_date: req.body.reinstate_date
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating user separation'})
    }
};

exports.sendMailAllWfoUser = async (req, res) => {
    try{
        const { subject, text } = req.body;
        const attachment = req.file;

        const templatePath = path.join(__dirname, "template2.ejs");
        const template = await fs.promises.readFile(templatePath, "utf-8");

        const results = await userModel.find({job_type:'WFO'})

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
    } catch(err){
        res.status(500).send({error:err,sms:'Error sending email'})
    }
}

exports.getAllWfhUsers = async (req, res) => {
    try{
        const simc = await userModel.find({job_type:'WFH'});
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all wfh users'})
    }
};