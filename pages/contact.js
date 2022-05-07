import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [desc, setdesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone, desc);
    const data = { name, email, phone, desc };

    fetch("http://localhost:3000/api/postcontact", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
        alert("Thanks for submitting form");
        setemail("");
        setphone("");
        setname("");
        setdesc("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setname(e.target.value);
    } else if (e.target.name === "phone") {
      setphone(e.target.value);
    } else if (e.target.name === "desc") {
      setdesc(e.target.value);
    } else {
      setemail(e.target.value);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Contact me</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="exampleInputEmail1" className={styles.label}>
            Enter your name
          </label>
          <input
            type="text"
            className={styles.formCheck}
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="exampleInputEmail1" className={styles.label}>
            Email address
          </label>
          <input
            type="email"
            className={styles.formCheck}
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="exampleInputPassword1" className={styles.label}>
            Phone no
          </label>
          <input
            type="text"
            className={styles.formCheck}
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
        </div>

        <div className={styles.mb3}>
          <label htmlFor="floatingTextarea" className={styles.label}>
            Enter your concer
          </label>
          <textarea
            className={styles.formCheck}
            id="desc"
            name="desc"
            value={desc}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
