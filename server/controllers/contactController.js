const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');

// Helper function to send email
const sendContactEmail = async (contactData) => {
    const { name, email, subject, message } = contactData;

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email options
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER, // Send to site owner
        subject: `New Contact Inquiry: ${subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
                <h2 style="color: #4CAF50;">New Contact Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4CAF50;">
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #777;">This email was sent from the Plant Shop contact form.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        // We don't throw error here to ensure the contact is still saved to DB
    }
};

// @desc    Create a new contact enquiry
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({
        name,
        email,
        subject,
        message,
    });

    const createdContact = await contact.save();

    // Send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendContactEmail({ name, email, subject, message });
    } else {
        console.warn('Email credentials not set. Contact saved but email not sent.');
    }

    res.status(201).json(createdContact);
});

// @desc    Get all contact enquiries
// @route   GET /api/contacts
// @access  Private/Admin
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
});

// @desc    Update contact status
// @route   PUT /api/contacts/:id/status
// @access  Private/Admin
const updateContactStatus = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
        contact.status = req.body.status || contact.status;
        const updatedContact = await contact.save();
        res.json(updatedContact);
    } else {
        res.status(404);
        throw new Error('Contact not found');
    }
});

// @desc    Delete a contact enquiry
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
        await contact.remove();
        res.json({ message: 'Contact removed' });
    } else {
        res.status(404);
        throw new Error('Contact not found');
    }
});

module.exports = {
    createContact,
    getContacts,
    updateContactStatus,
    deleteContact,
};
