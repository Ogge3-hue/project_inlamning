import React from "react";
import panda from "../../Images/panda_bamboo.gif";

function AboutStyleP() {
    return (
        <>
        <p className="lead text-muted mb-0">
            We are passionate about providing our customers with the best shopping experience possible. Our team is dedicated to curating a wide selection of high-quality products, ensuring that you find exactly what you're looking for.
            Do you have questions about products, shipping, or your order? Send an email to our support team
            below and we'll get back to you shortly.
            Have a great shopping experience with us, please enjoy!
        </p>

        <img src={panda} alt="Panda with bamboo" className="mt-3" style={{ maxWidth: '100%', height: 'auto' }} />
        </>
    );
}

export default AboutStyleP;