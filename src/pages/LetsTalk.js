import React from "react";

const LetsTalk = () => {
  return (
    <main className="LetsTalk">
      <section className="content">
        <h2>Contact Us</h2>
        <form className="contact-form" method="post" action="#">
          <input type="text" id="name" name="name" aria-label="Name" required />

          <input
            type="email"
            id="email"
            name="email"
            aria-label="Email"
            required
          />

          <textarea
            id="message"
            name="message"
            aria-label="Message"
            required
          ></textarea>

          <button className="btn-action" type="submit">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default LetsTalk;
