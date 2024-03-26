import React from "react";

const LetsTalk = () => {
  return (
    <main className="LetsTalk">
      <section className="content">
        <h2>Contact Us</h2>
        <form className="contact-form" action="#">
          <input
            type="text"
            id="name"
            name="name"
            aria-label="Name"
            placeholder="Name"
            required
          />

          <input
            type="email"
            id="email"
            name="email"
            aria-label="Email"
            placeholder="Email"
            required
          />

          <textarea
            id="message"
            name="message"
            aria-label="Message"
            placeholder="Whatever you want to share with us :)"
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
