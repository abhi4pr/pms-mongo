const userModel = require('../models/userModel.js');
const multer = require("multer");

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
        const simc = new userModel({
            user_name: req.body.user_name,
            user_designation: req.body.user_designation,
            user_email_id: req.body.user_email_id,
            user_login_id: req.body.user_login_id,
            user_login_password: req.body.user_login_password,
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
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This user cannot be created'})
    }
}];

exports.updateUser = async (req, res) => {
    try{
        const editsim = await userModel.findOneAndUpdate({user_id:req.body.id},{
            user_name: req.body.user_name,
            user_designation: req.body.user_designation,
            user_email_id: req.body.user_email_id,
            user_login_id: req.body.user_login_id,
            user_login_password: req.body.user_login_password,
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
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating user details'})
    }
};

exports.getWFHUsers = async (req, res) => {
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
                    localField: 'desi_id',
                    foreignField: 'user_designation',
                    as: 'designation'
                }
            },
            {
                $unwind: '$designation'
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
                $lookup:{
                    from: 'usermodels',
                    localField: 'Report_L1',
                    foreignField: 'user_id',
                    as: 'user2'
                }
            },
            {
                $unwind: '$user2'
            },
            {
                $project: {
                    _id: 1,
                    dept_name: '$department.dept_name',
                    designation_name: '$designation.desi_name',
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
            // ,{
            //     $replaceRoot: {
            //         newRoot: "$$ROOT"
            //     }
            // }
        ]).exec();
        res.status(200).send(singlesim)
    }catch(err){
        res.status(500).send({error:err,sms:'Error getting all users'})
    }
}

exports.getSingleUser = async (req, res) => {
    try{
        const ImageUrl = 'http://34.93.135.33:8080/uploads/';
        const singlesim = await userModel.aggregate([
            {
                $match: { user_id: req.params.id } 
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
                    localField: 'desi_id',
                    foreignField: 'user_designation',
                    as: 'designation'
                }
            },
            {
                $unwind: '$designation'
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
                $lookup:{
                    from: 'usermodels',
                    localField: 'Report_L1',
                    foreignField: 'user_id',
                    as: 'user2'
                }
            },
            {
                $unwind: '$user2'
            },
            {
                $project: {
                    _id: 1,
                    dept_name: '$department.dept_name',
                    designation_name: '$designation.desi_name',
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
            // ,{
            //     $replaceRoot: {
            //         newRoot: "$$ROOT"
            //     }
            // }
        ]).exec();
        res.status(200).send(singlesim)
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