const attendanceModel = require("../models/attendanceModel.js");
const userModels = require("../models/userAuthModel.js");
const userModel = require("../models/userModel.js");

async function doesUserExistInAttendance(userId, month, year) {
    const results = await attendanceModel.find({ user_id: userId, month: month, year: year })
    return results.length > 0;
}

function monthNameToNumber(monthName) {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    const monthIndex = months.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
  
    // Adding 1 because months are zero-indexed in JavaScript (0-11)
    return monthIndex !== -1 ? monthIndex + 1 : null;
  }

exports.addAttendance = async (req, res) => {
    try {
        const {
            dept,
            user_id,
            noOfabsent,
            month,
            year,
            bonus,
            remark,
            created_by,
            salary_deduction,
            attendence_status,
            salary_status,
          } = req.body;
      
          const Dept = dept || "";
          const User_id = user_id || "";
          const No_of_absent = noOfabsent || 0;
          const Month = month || "";
          const Year = year || "";
          const Bonus = bonus || 0;
          const Remark = remark || "";
      
          const created_By = created_by ? parseInt(created_by) : 0;
          const creation_date = new Date();
        const check1 = await attendanceModel.find({
            user_id: parseInt(req.body.user_id),
            month: req.body.month,
            year: parseInt(req.body.year)
        })
        if (check1.length == 0) {
            const check2 = await userModel.find({
                job_type: 'WFH',
                dept_id: parseInt(req.body.dept)
            })

            for (const user of check2) {
                var work_days;
                const joining = user.joining_date;
                const convertDate = new Date(joining);
                const extractDate = convertDate.getDate();
                const joiningMonth = String(convertDate.getUTCMonth() + 1).padStart(2, '0');
                const joiningYear = String(convertDate.getUTCFullYear());
                const mergeJoining = parseInt(joiningMonth + joiningYear);

                const monthNumber = monthNameToNumber(month);

                const mergeJoining1 = `${monthNumber}` + `${year}`;

                if (mergeJoining == mergeJoining1) {
                    work_days = 31 - extractDate;
                } else {
                    work_days = 30;
                }
                const userExistsInAttendance = await doesUserExistInAttendance(
                    user.user_id,
                    req.body.month,
                    req.body.year
                );
                if (!userExistsInAttendance) {
                    const presentDays = work_days - 0;
                    const perdaysal = user.salary / 30;
                    const totalSalary = perdaysal * presentDays;
                    const netSalary = totalSalary;
                    const tdsDeduction = netSalary * (user.tds_per) / 100;
                    const ToPay = netSalary - tdsDeduction;
                    const salary = user.salary;
                    const creators = new attendanceModel({
                        dept: user.dept_id,
                        user_id:user.user_id,
                        user_name: user.user_name,
                        noOfabsent: 0,
                        month: req.body.month,
                        year: req.body.year,
                        bonus: 0,
                        total_salary: user.salary,
                        tds_deduction: tdsDeduction,
                        net_salary: netSalary,
                        toPay: ToPay,
                        remark: '',
                        Created_by: req.body.user_id,
                        salary
                    });
                    // const creators = new attendanceModel({
                    //     dept: req.body.dept,
                    //     user_id: req.body.user_id,
                    //     user_name: req.body.user_name,
                    //     noOfabsent: 0,
                    //     month: req.body.month,
                    //     year: req.body.year,
                    //     bonus: 0,
                    //     total_salary: user.salary,
                    //     tds_deduction: tdsDeduction,
                    //     net_salary: netSalary,
                    //     toPay: ToPay,
                    //     remark: '',
                    //     created_by: req.body.user_id
                    // });
                    const instav = await creators.save();
                }
            }
        } else if (req.body.user_id == check1[0].user_id && req.body.month == check1[0].month && req.body.year == check1[0].year) {
            
            const results4 = await userModel.find({
                job_type: 'WFH',
                user_id: parseInt(req.body.user_id)
            })

            const perdaysal = results4[0].salary / 30;
           
            const totalSalary = perdaysal * (30 - noOfabsent);
            const netSalary = bonus ? totalSalary + bonus : totalSalary;
           
            const tdsDeduction = netSalary * (results4[0].tds_per) / 100;
            
            const ToPay = netSalary - tdsDeduction;
            const salary = results4[0].salary;
            const editsim = await attendanceModel.findOneAndUpdate({ attendence_id: parseInt(check1[0].attendence_id) }, {
                dept: req.body.dept,
                user_id: req.body.user_id,
                // user_name: req.body.user_name,
                noOfabsent: No_of_absent,
                month: req.body.month,
                year: req.body.year,
                bonus: Bonus,
                total_salary: totalSalary,
                tds_deduction: tdsDeduction,
                net_salary: netSalary,
                toPay: ToPay,
                remark: req.body.remark,
                salary,
                salary_deduction,
                attendence_status,
                salary_status
            }, { new: true })
        } else {
            const check4 = await userModel.find({
                job_type: 'WFH',
                dept_id: parseInt(req.body.dept)
            })

            for (const user of check4) {
                var work_days;
                const joining = user.joining_date;
                const convertDate = new Date(joining);
                const extractDate = convertDate.getDate();
                const joiningMonth = String(convertDate.getUTCMonth() + 1).padStart(2, '0');
                const joiningYear = String(convertDate.getUTCFullYear());
                const mergeJoining = parseInt(joiningMonth + joiningYear);

                const monthNumber = monthNameToNumber(month);

                const mergeJoining1 = `${monthNumber}` + `${year}`;

                if (mergeJoining == mergeJoining1) {
                    work_days = 31 - extractDate;
                } else {
                    work_days = 30;
                }

                // const userExistsInAttendance = await doesUserExistInAttendance(
                //     user.user_id,
                //     req.body.month,
                //     req.body.year
                // );
                // if (!userExistsInAttendance) {
                    const presentDays = work_days - 0;
                    const perdaysal = user.salary / 30;
                    const totalSalary = perdaysal * presentDays;
                    const netSalary = totalSalary;
                    const tdsDeduction = netSalary * (user.tds_per) / 100;
                    const ToPay = netSalary - tdsDeduction;

                    const creators = new attendanceModel({
                        dept: user.dept_id,
                        user_id: user.user_id,
                        user_name: user.user_name,
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
                    // const creators = new attendanceModel({
                    //     dept: req.body.dept,
                    //     user_id: req.body.user_id,
                    //     user_name: req.body.user_name,
                    //     noOfabsent: 0,
                    //     month: req.body.month,
                    //     year: req.body.year,
                    //     bonus: 0,
                    //     total_salary: user.salary,
                    //     tds_deduction: tdsDeduction,
                    //     net_salary: netSalary,
                    //     toPay: ToPay,
                    //     remark: '',
                    //     created_by: req.body.user_id
                    // });
                    const instav = await creators.save();
                // }
            }
        }

        res.send({  status: 200 });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message, sms: "error while adding data" });
    }
};

exports.getSalaryByDeptIdMonthYear = async (req, res) => {
    try {
        const imageUrl = 'http://34.93.135.33:8080/uploads/'
        const getcreators = await attendanceModel.aggregate([
            {
                $match:
                {
                    dept: parseInt(req.body.dept_id),
                    month: req.body.month,
                    year: parseInt(req.body.year)
                }
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept',
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
                    from: 'financemodels',
                    localField: 'id',
                    foreignField: 'id',
                    as: 'finance'
                }
            },
            {
                $unwind: '$finance'
            },
            {
                $project: {
                    user_name: '$user.user_name',
                    user_email_id: '$user.user_email',
                    user_pan: '$user.pan_no',
                    current_address: "$user.current_address",
                    invoice_template_no: '$user.invoice_template_no',
                    dept_name: '$department.dept_name',
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
                    created_by: '$created_by',
                    status_:'$finance.status_',
                    reference_no:'$finance.reference_no',
                    amount:'$finance.amount',
                    pay_date:'$finance.pay_date',
                    screenshot: imageUrl + '$finance.screenshot'
                }
            }
        ]).exec();
        if (!getcreators) {
            res.status(500).send({ success: false });
        }
        res.status(200).send({data:getcreators});
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting salary" });
    }
};

exports.getSalaryByFilter = async (req, res) => {
    try {
        if (req.body.dept == 0) {
            res.status(200).send({ sms: 'working on it' })
        } else {
            const getcreators = await attendanceModel.aggregate([
                {
                    $match: { dept: parseInt(req.body.dept) }
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
                        dept_name: '$department.dept_name',
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
            res.status(200).send({data:getcreators});
        }
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting salary from dept id" });
    }
};

exports.getSalaryByUserId = async (req, res) => {
    try {
        const getcreators = await attendanceModel.aggregate([
            {
                $match: { user_id: parseInt(req.body.user_id) }
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept',
                    foreignField: 'dept_id',
                    as: 'department'
                }
            },
            {
                $unwind: '$department'
            },
            {
                $lookup: {
                    from: 'financemodels',
                    localField: 'attendence_id',
                    foreignField: 'attendence_id',
                    as: 'fn'
                }
            },
            {
                $unwind: '$fn'
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
                    from: 'designationmodels',
                    localField: 'user.user_designation',
                    foreignField: 'desi_id',
                    as: 'designation'
                }
            },
            {
                $unwind: '$designation'
            },
            {
                $project: {
                    user_name: '$user.user_name',
                    user_email_id: '$user.user_email_id',
                    digital_signature_image: '$user.digital_signature_image',
                    pan_no: '$user.pan_no',
                    current_address: "$user.current_address",
                    status_: "$fn.status_",
                    reference_no: "$fn.reference_no",
                    pay_date: "$fn.pay_date",
                    screenshot: "$fn.screenshot",
                    amount: "$fn.amount",
                    invoice_template_no: '$user.invoice_template_no',
                    dept_name: '$department.dept_name',
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
                    Created_by: '$Created_by',
                    Creation_date: '$Creation_date',
                    Last_updated_by: '$Last_updated_by',
                    Last_updated_date: '$Last_updated_date',
                    sendToFinance: '$sendToFinance',
                    attendence_generated: '$attendence_generated',
                    attendence_status: '$attendence_status',
                    salary_status: '$salary_status',
                    salary_deduction: '$salary_deduction',
                    salary: '$salary',
                    attendence_id: '$attendence_id',

                }
            }
        ]).exec();
        if (getcreators?.length === 0) {
            res.status(500).send({ success: false });
        }
        res.status(200).send({data:getcreators});
    } catch (err) {
        res.status(500).send({ error: err.message, sms: "Error getting salary of user" });
    }
};

exports.countWfhUsers = async (req, res) => {
    try {
        const getCount = await attendanceModel.countDocuments({ job_type: 'WFH' })
        res.status(200).send(getCount);
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting count of wfh users" });
    }
}

exports.getSalaryCountByDeptYear = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        const getCount = await attendanceModel.aggregate([
            {
                $match: {
                    dept: parseInt(req.body.dept),
                    year: parseInt(currentYear)
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
        res.status(200).send({data:getCount});
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting salary count by dept and year" });
    }
}

exports.getSalaryCountByYear = async (req, res) => {
    try {
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

exports.totalSalary = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        const query = await attendanceModel.aggregate([
            {
                $match: { year: parseInt(currentYear) }
            },
            {
                $group: {
                    _id: 0,
                    totalsalary: { $sum: '$total_salary' },
                    totalBonus: { $sum: '$bonus' },
                    totaltdsdeduction: { $sum: '$tds_deduction' },
                    totalsalarydeduction: { $sum: '$salary_deduction' }
                }
            }
        ]).exec();
        res.send({status:200, data:query})
    } catch (error) {
        return res.send({error:error.message, status:500, sms:"error getting all salary"})
    }
}

exports.updateSalary = async (req, res) => {
    try {
        const editsim = await attendanceModel.findOneAndUpdate({ attendence_id: req.body.attendence_id }, {
            sendToFinance: req.body.sendToFinance
        }, { new: true })
        res.send({status:200, sms:'send to finance update successfully'})
    } catch (error) {
        return res.send({error:error.message, status:500, sms:"error updating send to finance"})
    }
}

exports.updateAttendenceStatus = async (req, res) => {
    try {
        const editsim = await attendanceModel.findOneAndUpdate({ 
            attendence_id: req.body.attendence_id,
            dept: req.body.dept,
            month: req.body.month,
            year: req.body.year
        }, {
            attendence_generated: 1,
            salary_status: 1
        }, { new: true })
        res.send({status:200, sms:'send to update salary status'})
    } catch (error) {
        return res.send({error:error.message, status:500, sms:"error updating salary status"})
    }
}

exports.getMonthYearData = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonthIndex = currentDate.getMonth() + 1;
        const numberOfMonths = 6;
        const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];

        const monthYearArray = months.map((month) => ({ month, year: month === "January" || month === "February" || month === "March" ? currentYear + 1 : currentYear, }));

        const aggregationPipeline = [
        {
            $group: {
              _id: {
                month: "$month",
                year: "$year",
              },
            },
        },
        ];

        const dbResult = await attendanceModel.aggregate(aggregationPipeline);
        // const dbResult = await attendanceModel.aggregate(aggregationPipeline).toArray();

        const dbSet = new Set(dbResult.map((item) => `${item._id.month}-${item._id.year}`));

        const actualExistingResult = monthYearArray.map((item) => {
            const dateStr = `${item.month}-${item.year}`;
            item.atdGenerated = dbSet.has(dateStr) ? 1 : 0;

            return item;
        });

        const response = { data: [...actualExistingResult] };
        res.status(200).json(response);
    } catch (error) {
        return res.send({error:error.message, status:500, sms:"error getting data"})
    }
}

exports.getDistinctDepts = async (req, res) => {
    try {
        const distinctDepts = await attendanceModel.distinct('dept', {
        month: req.body.month,
        year: req.body.year
    });
    const result = distinctDepts.map(dept => ({ dept }));

    res.status(200).send(result);
    } catch (error) {
        return res.send({error:error.message, status:500, sms:"error getting distinct depts"})
    }
}

exports.checkSalaryStatus = async (req, res) => {
    try {
        const editsim = await attendanceModel.find({ 
            dept: req.body.dept,
            month: req.body.month,
            year: req.body.year
        })
        res.status(200).send(editsim)
    } catch (error) {
        return res.send({error:error.message, status:500, sms:"error getting salary status"})
    }
}

exports.allDeptsOfWfh = async (req, res) => {
    try {
        const editsim = await userModel.aggregate([
            {
                $match: { job_type: 'WFH' }
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept_id',
                    as: 'dept'
                }
            },
            {
                $unwind: '$dept'
            },
            {
                $group: {
                    _id: '$dept.dept_id',
                    dept_name: { $first: '$dept.dept_name' },
                    total_salary: { $sum: '$salary' },
                    user_count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    dept_id: '$_id',
                    dept_name: 1,
                    total_salary: 1,
                    user_count: 1
                }
            }
        ]).exec();
        
        res.send({status:200, data:editsim})
    } catch (error) {
        return res.send({error:error.message, status:500, sms:"error getting salary status"})
    }
}

exports.deptWithWFH = async (req, res) => {
    try {
        const result = await userModel.aggregate([
            {
                $match: { job_type: 'WFH' }
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept_id',
                    as: 'dept'
                }
            },
            {
                $unwind: '$dept'
            },
            {
                $group: {
                    _id: '$dept.dept_id',
                    dept_name: { $first: '$dept.dept_name' },
                   
                }
            },
            {
                $project: {
                    _id: 0,
                    dept_id: '$_id',
                    dept_name: 1,
                   
                }
            }
        ]).exec();
        
      return  res.send(result)
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

 exports.leftEmployees = async (req, res) => {
    const { dept_id, month, year } = req.body;
  
    try {
      const results = await userModel.find({
        dept_id: dept_id,
        job_type: "WFH",
      });
  
      let leftCount = 0;
      const newLefts = [];
  
      for (const user of results) {
        const convertDate = user.releaving_date;
        const joiningMonth = String(convertDate.getUTCMonth() + 1).padStart(2, '0');
        const joiningYear = String(convertDate.getUTCFullYear());
  
        const monthNumber = monthNameToNumber(month);
  
        const mergeJoining = parseInt(joiningMonth + joiningYear);
        const mergeJoining1 = `${monthNumber}` + `${year}`;
  
        if (mergeJoining == mergeJoining1) {
          leftCount++;
          newLefts.push({ user_name: user.user_name });
        }
      }
  
      if (leftCount >= 0) {
        res.json({ leftEmployees: leftCount, UserLefts: newLefts });
      } else {
        res.send("No left employee");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  exports.newJoiners = async (req, res) => {
    const { dept_id, month, year } = req.body;
  
    try {
      // Use Mongoose to query the MongoDB collection
      const results = await userModel.find({
        dept_id: dept_id,
        job_type: "WFH",
      });
  
      let newJoinersCount = 0;
      const newJoiners = [];
  
      for (const user of results) {
        const convertDate = user.joining_date;
        const joiningMonth = String(convertDate.getUTCMonth() + 1).padStart(2, '0');
        const joiningYear = String(convertDate.getUTCFullYear());
  
        const monthNumber = monthNameToNumber(month);
  
        const mergeJoining = parseInt(joiningMonth + joiningYear);
        const mergeJoining1 = `${monthNumber}` + `${year}`;
  
        if (mergeJoining == mergeJoining1) {
          newJoinersCount++;
          newJoiners.push({ user_name: user.user_name });
        }
      }
  
      if (newJoinersCount > 0) {
        res.json({ NewJoiners: newJoinersCount, NewUsers: newJoiners });
      } else {
        res.send("No new joiners");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  };
  
exports.checkSalaryStatus=  async (req, res) => {
    const { month, year, dept } = req.body;
  
    try {
       const distinctSalaryStatuses = await attendanceModel.distinct("salary_status", {
        month,
        year,
        dept,
      });
  
      if (result) {
        res.status(200).json({ distinctSalaryStatuses });
      } else {
        res.status(200).send("No record found");
      }
    } catch (error) {
      console.error("Error querying MongoDB:", error.message);
      res.status(500).send("Internal Server Error");
    }
  };

  exports.allAttendenceMastData =  async (req, res) => {
    try {
      // Use Mongoose to perform a left join and retrieve data from multiple collections
      const results = await attendanceModel.aggregate([
        {
          $lookup: {
            from: "dept",
            localField: "dept",
            foreignField: "dept_id",
            as: "dept_data",
          },
        },
        {
          $unwind: "$dept_data",
        },
        {
          $lookup: {
            from: "user",
            localField: "user_id",
            foreignField: "user_id",
            as: "user_data",
          },
        },
        {
          $unwind: "$user_data",
        },
        {
          $project: {
            _id: 0, // Exclude the _id field if not needed
            // Map fields from the collections to the output
            // Example: "dept_name": "$dept_data.dept_name"
          },
        },
      ]);
  
      res.status(200).json(results);
    } catch (error) {
      console.error("Error querying MongoDB:", error.message);
      res.status(500).send("Internal Server Error");
    }
  };

 exports.deptIdWithWfh= async (req, res) => {
    const { dept_id } = req.body;
  
    try {
    
      const results = await User.aggregate([
        {
          $match: {
            job_type: "WFH",
            dept_id: mongoose.Types.ObjectId(dept_id),
          },
        },
        {
          $lookup: {
            from: "dept",
            localField: "dept_id",
            foreignField: "_id",
            as: "dept_data",
          },
        },
        {
          $lookup: {
            from: "designation",
            localField: "user_designation",
            foreignField: "_id",
            as: "designation_data",
          },
        },
        {
          $project: {
            _id: 0, // Exclude the _id field if not needed
            // Map fields from the collections to the output
            // Example: "user_name": "$user_name"
          },
        },
      ]);
  
      res.status(200).json(results);
    } catch (error) {
      console.error("Error querying MongoDB:", error.message);
      res.status(500).send("Internal Server Error");
    }
  };