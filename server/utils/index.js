const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(mailOptions){
    // return new Promise((resolve, reject) => {
    //     sgMail.send(mailOptions, (error,result) => {
    //         if(error) return reject(error);
    //         return resolve(result);
    //     });
    // });

    sgMail
  .send(mailOptions)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
}

module.exports = {sendEmail};