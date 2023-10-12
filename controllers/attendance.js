const attendanceModel = require("../models/attendanceModel.js");
const userModels = require("../models/userAuthModel.js");

async function doesUserExistInAttendance(userId, month, year) {
    const results = await attendanceModel.find({user_id:userId, month:month, year:year})
    return results.length > 0;
}

exports.addAttendance = async (req, res) => {
    try {
        const check1 = await attendanceModel.find({
            user_id: req.body.user_id,
            month: req.body.month,
            year: req.body.year
        })
        if(check1.length == 0){
            const check2 = await userModels.find({
                job_type: 'WFH',
                dept: req.body.dept_id
            })  

            for (const user of check2) {
                
                const userExistsInAttendance = await doesUserExistInAttendance(
                    user.user_id,
                    req.body.month,
                    req.body.year
                );
                if (!userExistsInAttendance) {
                    const work_days = 30;
                    const presentDays = work_days - 0;
                    const perdaysal = user.salary / 30;
                    const totalSalary = perdaysal * presentDays;
                    const netSalary = totalSalary;
                    const tdsDeduction = netSalary * (user.tds_per) / 100;
                    const ToPay = netSalary - tdsDeduction;

                    const creators = new attendanceModel({
                        dept: req.body.dept_id,
                        user_id: req.body.user_id,
                        user_name: req.body.user_name,
                        noOfabsent: 0,
                        month: req.body.month,
                        year: req.body.year,
                        bonus: 0,
                        total_salary: user.salary,
                        tds_deduction: tdsDeduction,
                        net_salary: netSalary,
                        toPay: ToPay,
                        remark: '',
                        created_by: req.body.user_id
                    });
                    const instav = await creators.save();
                }
            }
        }else if(req.body.user_id == check1[0].user_id && req.body.month == check1[0].month && req.body.year == check1[0].year){
            const check3 = await attendanceModel.find({
                job_type: 'WFH',
                user_id: req.body.user_id
            })
            
            const perdaysal = results4[0].salary / 30;
            const totalSalary = perdaysal * (30 - noOfabsent);
            const netSalary = totalSalary + bonus;
            const tdsDeduction = netSalary * (results4[0].tds_per) / 100;
            const ToPay = netSalary - tdsDeduction;
            
            const editsim = await attendanceModel.findOneAndUpdate({attendence_id:check1.attendence_id},{
                dept: req.body.dept_id,
                user_id: req.body.user_id,
                // user_name: req.body.user_name,
                noOfabsent: req.body.noOfabsent,
                month: req.body.month,
                year: req.body.year,
                bonus: req.body.bonus,
                total_salary: totalSalary,
                tds_deduction: tdsDeduction,
                net_salary: netSalary,
                toPay: ToPay,
                remark: req.body.remark
            }, { new: true })
        }else{
            const check4 = await userModels.find({
                job_type: 'WFH',
                dept: req.body.dept_id
            })  

            for (const user of check4) {
                
                const userExistsInAttendance = await doesUserExistInAttendance(
                    user.user_id,
                    req.body.month,
                    req.body.year
                );
                if (!userExistsInAttendance) {
                    const work_days = 30;
                    const presentDays = work_days - 0;
                    const perdaysal = user.salary / 30;
                    const totalSalary = perdaysal * presentDays;
                    const netSalary = totalSalary;
                    const tdsDeduction = netSalary * (user.tds_per) / 100;
                    const ToPay = netSalary - tdsDeduction;

                    const creators = new attendanceModel({
                        dept: req.body.dept_id,
                        user_id: req.body.user_id,
                        user_name: req.body.user_name,
                        noOfabsent: 0,
                        month: req.body.month,
                        year: req.body.year,
                        bonus: 0,
                        total_salary: user.salary,
                        tds_deduction: tdsDeduction,
                        net_salary: netSalary,
                        toPay: ToPay,
                        remark: '',
                        created_by: req.body.user_id
                    });
                    const instav = await creators.save();
                }
            }
        }
        
        res.send({ instav, status: 200 });
    } catch (error) {
        res.status(500).send({ error: error, sms: "error while adding data" });
    }
};

exports.getSalaryByDeptIdMonthYear = async (req, res) => {
    try {
        const getcreators = await attendanceModel.aggregate([
            {
                $match: 
                { 
                    dept_id: req.body.dept_id,
                    month: req.body.month,
                    year: req.body.year
                } 
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept',
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
                    user_email_id: '$user.user_email',
                    user_pan: '$user.pan_no',
                    current_address: "$user.current_address",
                    invoice_template_no: '$user.invoice_template_no',
                    dept_name:'$department.dept_name',
                    designation_name: '$designation.desi_name',
                    id: "$id",
                    dept: '$dept',
                    user_id: '$user_id',
                    noOfabsent: '$noOfabsent',
                    month: '$month',
                    year: '$year',
                    bonus: '$bonus',
                    total_salary: '$total_salary',
                    tds_deduction: '$tds_deduction',
                    net_salary: '$net_salary',
                    toPay: '$toPay',
                    remark: "$remark",
                    created_by: '$created_by'
                }
            }
        ]).exec();
        if (!getcreators) {
            res.status(500).send({ success: false });
        }
        res.status(200).send(getcreators);
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting salary" });
    }
};

exports.getSalaryByFilter = async (req, res) => {
    try {
        if(req.body.dept == 0){
            res.status(200).send({sms:'working on it'})
        }else{
            const getcreators = await attendanceModel.aggregate([
                {
                    $match: { dept: req.body.dept } 
                },
                {
                    $lookup: {
                        from: 'departmentmodels',
                        localField: 'dept_id',
                        foreignField: 'dept',
                        as: 'department'
                    }
                },
                {
                    $unwind: '$department'
                },
                {
                    $project: {
                        dept_name:'$department.dept_name',
                        id: "$id",
                        dept: '$dept',
                        user_id: '$user_id',
                        noOfabsent: '$noOfabsent',
                        month: '$month',
                        year: '$year',
                        bonus: '$bonus',
                        total_salary: '$total_salary',
                        tds_deduction: '$tds_deduction',
                        net_salary: '$net_salary',
                        toPay: '$toPay',
                        remark: "$remark",
                        created_by: '$created_by'
                    }
                }
            ]).exec();
            res.status(200).send(getcreators);
        }
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting salary from dept id" });
    }
};

exports.getSalaryByUserId = async (req, res) => {
    try {
        const getcreators = await attendanceModel.aggregate([
            {
                $match: { user_id: req.body.user_id } 
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept',
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
                    user_email_id: '$user.user_email',
                    user_pan: '$user.pan_no',
                    current_address: "$user.current_address",
                    invoice_template_no: '$user.invoice_template_no',
                    dept_name:'$department.dept_name',
                    designation_name: '$designation.desi_name',
                    id: "$id",
                    dept: '$dept',
                    user_id: '$user_id',
                    noOfabsent: '$noOfabsent',
                    month: '$month',
                    year: '$year',
                    bonus: '$bonus',
                    total_salary: '$total_salary',
                    tds_deduction: '$tds_deduction',
                    net_salary: '$net_salary',
                    toPay: '$toPay',
                    remark: "$remark",
                    created_by: '$created_by'
                }
            }
        ]).exec();
        if (!getcreators) {
            res.status(500).send({ success: false });
        }
        res.status(200).send(getcreators);
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting salary of user" });
    }
};

exports.countWfhUsers = async (req, res) => {
    try{
        const getCount = await attendanceModel.countDocuments({ job_type: 'WFH' })
        res.status(200).send(getCount);
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting count of wfh users" });
    }
}

exports.getSalaryCountByDeptYear = async (req, res) => {
    try{
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        const getCount = await attendanceModel.aggregate([
            {
                $match: {
                    dept: req.body.dept, 
                    year: currentYear
                }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: "$total_salary"
                    }
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]).exec();
        res.status(200).send(getCount);
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting salary count by dept and year" });
    }
}

exports.getSalaryCountByYear = async (req, res) => {
    try{
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        const getCount = await attendanceModel.aggregate([
            {
                $match: { year: currentYear }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: "$total_salary"
                    }
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]).exec();
        res.status(200).send(getCount);
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting salary count by year" });
    }
}