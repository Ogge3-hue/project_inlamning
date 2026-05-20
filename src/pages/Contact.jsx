import React from "react"
import ContactPart1 from "../Komponenter/ContactSidan/Part1Contact"
import ContactForm from "../Komponenter/ContactSidan/ContactForm"

export default function Contact() {
    return (
        <div>
            <p className="text-uppercase text-secondary mb-2">Contact us</p>
            <h1 className="display-5 fw-bold">We're here to help</h1>
            <p className="lead text-muted mb-0">
              Do you have questions about products, shipping, or your order? Send an email to our support team
              below and we'll get back to you shortly.
            </p>
            <ContactPart1 />
            <ContactForm />
        </div>
    )
}