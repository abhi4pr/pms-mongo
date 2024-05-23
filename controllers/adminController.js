const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');
const helper = require('../helper/helper.js');
const bcrypt = require("bcrypt");

exports.changePassOfSelectedUsers = async (req, res) => {
    try {
        let encryptedPass;
        if (req.body.user_login_password) {
            encryptedPass = await bcrypt.hash(req.body.user_login_password, 10);
        } else {
            return res.status(400).send({ success: false, message: 'Password is required' });
        }

        const userIds = req.body.allUserIds;
        if (!userIds || !Array.isArray(userIds)) {
            return res.status(400).send({ success: false, message: 'User IDs are required and should be an array' });
        }

        let results = {
            success: [],
            notFound: [],
            errors: []
        };

        for (const userId of userIds) {
            try {
                const existingUser = await userModel.findOne({ user_id: userId });
                if (!existingUser) {
                    results.notFound.push(userId);
                    continue;
                }

                const updatedUser = await userModel.findOneAndUpdate(
                    { user_id: userId },
                    { user_login_password: encryptedPass },
                    { new: true }
                );

                if (!updatedUser) {
                    results.errors.push(userId);
                } else {
                    results.success.push(userId);
                }
            } catch (error) {
                results.errors.push(userId);
            }
        }

        if (results.success.length === 0) {
            return res.status(500).send({ success: false, message: 'Failed to change passwords for all users', results });
        }

        return res.status(200).send({ success: true, message: 'Password changed successfully for users', results });
    } catch (err) {
        return res.status(500).send({ error: err.message, message: 'Error while updating user personal information details' });
    }
};

exports.changePassOfUsers = async (req, res) => {
    try {
        let results = {
            success: [],
            notFound: [],
            errors: []
        };

        const getRandomPassword = helper.generateRandomPassword();
        const encryptedPass = await bcrypt.hash(getRandomPassword, 10);
        const userIds = await userModel.find();

        for (const userId of userIds) {
            try {

                if (userId.user_name == 'Admin' || userId.user_name === 'Super Admin') {
                    results.notFound.push(userId);
                    continue;
                }

                const updatedUser = await userModel.findOneAndUpdate(
                    { user_id: userId.user_id },
                    { user_login_password: encryptedPass },
                    { new: true }
                );

                if (!updatedUser) {
                    results.notFound.push(userId);
                } else {
                    results.success.push(userId);
                }
            } catch (error) {
                console.error(`Error updating password for user ${userId.user_id}: ${error.message}`);
                results.errors.push(userId);
            }
        }

        if (results.success.length === 0) {
            return res.status(500).send({ success: false, message: 'Failed to change passwords for all users', results });
        }

        return res.status(200).send({ success: true, message: 'Password changed successfully for users', results });
    } catch (err) {
        console.error(`Error while updating user passwords: ${err.message}`);
        return res.status(500).send({ error: err.message, message: 'Error while updating user passwords' });
    }
};

exports.sendPassEmailToUsers = async (req, res) => {
    try {
        const allUserEmailIds = req.body.emails;

        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "onboarding@creativefuel.io",
                pass: "zboiicwhuvakthth",
            },
        });

        for (const email of allUserEmailIds) {
            const mailOptions = {
                from: 'onboarding@creativefuel.io',
                to: email,
                subject: 'Your Login Password Changed',
                text: 'Your new password is',
                attachments: [
                    {
                        filename: req.file.originalname,
                    }
                ]
            };
            try {
                await mailTransporter.sendMail(mailOptions);
                console.log(`Email sent to ${email}`)
            } catch (err) {
                console.log(err.message)
            }
        }

    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Internal Server Error' });
    }
}