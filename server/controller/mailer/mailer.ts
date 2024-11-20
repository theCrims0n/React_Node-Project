import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 456,
    host: 'smtp.gmail.com',
    auth: {
        user: 'n2107676@gmail.com',
        pass: 'zeig rfox debb bsvj'
    }
});

const sendEmail = async (email = '', password: '') => {
    try {
        console.log('transporter ', email, password)
        var mailOptions = {
            from: 'n2107676@gmail.com',
            to: email,
            subject: 'Recovery email for your new password',
            html: `<h1>Hello</h1><h2>This is your new password: ${password}</h2>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return { mssage: 'mail sending successful' }

    } catch (error) {
        return { error }
    }

}



export default sendEmail