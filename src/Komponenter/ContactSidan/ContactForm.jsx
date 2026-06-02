import './ContactForm.css'
import { useState } from "react";

export default function ContactForm() {
    const [charCount, setCharCount] = useState(0)

    return (
         <form className="contact-form" >
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />

            <label htmlFor="message">Message:</label>
            <div className="message-counter"><span id="charCount">{charCount}</span>/500</div> 
            <textarea id="message" name="message" placeholder="Your Message" required maxLength="500" onChange={e => setCharCount(e.target.value.length)}></textarea>
            <button type="submit" className="submit-btn">Submit</button>
        </form>

       
    )
}

