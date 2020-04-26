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
      >     {/*data-netlify属性被云端parser，进而会自动生成相应js代码。*/}  
        <input type="hidden" name="bot-field" />   {/*honeypot用*/}

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
          <textarea name="message" id="message" rows="6" required></textarea>
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
