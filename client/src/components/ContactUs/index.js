import React, { useState } from 'react';
//import nodemailer from 'nodemailer';

//import { validateEmail } from '../../utils/helpers';

function ContactForm() {

    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const [errorMessage, setErrorMessage] = useState('');

    const { name, email, message } = formState;

    // const transporter = nodemailer.createTransport({
    //     host: "smtp.forwardemail.net",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //       // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    //       user: 'hraff29@gmail.com',
    //       pass: 'Hraff@2023'
    //     }
    //   });
      
    // //   async function sendEmail() {
    // //     // send mail with defined transport object
    // //     const info = await transporter.sendMail({
    // //       from: `"${name}" <${email}>`, // sender address
    // //       to: "bar@example.com, baz@example.com", // list of receivers
    // //       subject: "Hello ✔", // Subject line
    // //       text: `${message}`, // plain text body
    // //       html: `<p>${message}</p>`, // html body
    // //     });
      
    //     console.log("Message sent: %s", info.messageId);
    //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
    //     //
    //     // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //     //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //     //       <https://github.com/forwardemail/preview-email>
    //     //
    //   }
      
     // main().catch(console.error);
    function handleChange(e) {
        // if (e.target.name === 'email') {
        //     const isValid = validateEmail(e.target.value);
    
        //         if(!isValid) {
        //             setErrorMessage('please enter a valid email');
        //         } else {
        //             setErrorMessage('');
        //         }

        //     } else {
        //         if (!e.target.value.length) {
        //           setErrorMessage(`${e.target.name} is required.`);
        //         } else {
        //           setErrorMessage('');
        //         } 
        // }

        if (!errorMessage) {
        setFormState({...formState, [e.target.name]: e.target.value })
        }
    }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     sendEmail()
    //     alert("your email has been sent");
    // }
    
return (
    <section className="container">
        <h2 data-testid='h1tag' className="top-title">Contact Form</h2>
        <hr></hr>
        <form className="justify-content-center" id="contact-form" onSubmit={()=>null}>
            <div className="mt-5" >
                <label htmlFor="name">Name:</label>
                <input className="form-control" type="text" name="name"  defaultValue={name} onBlur={handleChange}/>
            </div>
            <div className="mt-5" >
                <label htmlFor="email">Email Address:</label>
                <input className="form-control" type="email"  name="email" defaultValue={email} onBlur={handleChange} />
            </div>
            <div className="mt-5" >
                <label htmlFor="message">Message:</label>
                <textarea className="form-control" name="message" defaultValue={message} onBlur={handleChange} rows="7" />
            </div> 
            {errorMessage && (
            <div>
                <p className="error-text">{errorMessage}</p>
            </div>
            )}

            <div className="mt-5 mb-5" >
            <button data-testid='button' className="btn btn-outline-dark " type="submit" >Submit</button>
            </div>
        </form>
    </section>
    );
}
    
export default ContactForm;