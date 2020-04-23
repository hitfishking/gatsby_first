import React from "react"

const ContactForm = props => (
  <section id="contact">
    <section>
      <form
        name="contact"
        method="post"
        action="/success"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="bot-field" />

        <div className="field half first">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div className="field half">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" required />
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" rows="6" required>11111111111111</textarea>
        </div>

        <ul className="actions">
          <li>
            <input type="submit" value="Send Message" className="special" />
          </li>
          <li>
            <input type="reset" value="Clear" />
          </li>
        </ul>
      </form>
    </section>
  </section>
)

export default ContactForm
