"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    port: 456,
    host: 'smtp.gmail.com',
    auth: {
        user: 'n2107676@gmail.com',
        pass: 'zeig rfox debb bsvj'
    }
});
const sendEmail = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (email = '', password) {
    try {
        console.log('transporter ', email, password);
        var mailOptions = {
            from: 'n2107676@gmail.com',
            to: email,
            subject: 'Recovery email for your new password',
            html: `<h1>Hello</h1><h2>This is your new password: ${password}</h2>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        return { mssage: 'mail sending successful' };
    }
    catch (error) {
        return { error };
    }
});
exports.default = sendEmail;
//# sourceMappingURL=mailer.js.map