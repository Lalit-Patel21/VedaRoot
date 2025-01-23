import Header from "../header/Header";
import Footer from "../footer/Footer";
import Api from "../../apis/Api";
import axios from "axios";
import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Ensure to use 'phone'
    subject: "", // Ensure to use 'subject'
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post(Api.CONTACT_US, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone, // Use 'phone'
        subject: formData.subject, // Use 'subject'
        message: formData.message,
      })
      .then((response) => {
        console.log("Response:", response.data);
        // Set success message and clear form data
        setSuccessMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "", // Use 'phone'
          subject: "", // Use 'subject'
          message: "",
        });
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setFailureMessage("Failed to send message. Please try again later.");
      });
  };

  return (
    <>
      <Header />
      <section className="contact" style={{ width: "99vw" }}>
        <div className="contact-img">
          <div className="contact-img-main"></div>
        </div>
        <div className="text-overlay">
          <h1>Contact Us Today!</h1>
          <h2>Let's get fit and healthy together</h2>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <h2>Make An Enquiry</h2>
              <p>Hi, please feel free to contact us if you have any queries.</p>
              <div className="contact-form mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="name">
                            Name<span> *</span>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm custom-input mb-3"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                          {errors.name && (
                            <div className="text-danger">{errors.name}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">
                            Email<span> *</span>
                          </label>
                          <input
                            type="email"
                            className="form-control form-control-sm custom-input mb-3"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          {errors.email && (
                            <div className="text-danger">{errors.email}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phone">
                            Phone<span> *</span>
                          </label>
                          <input
                            type="tel"
                            className="form-control form-control-sm custom-input mb-3"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                          {errors.phone && (
                            <div className="text-danger">{errors.phone}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="subject">
                            Subject<span> *</span>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm custom-input mb-3"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="message">
                            Message<span> *</span>
                          </label>
                          <textarea
                            className="form-control form-control-sm custom-input mb-5"
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                          {errors.message && (
                            <div className="text-danger">{errors.message}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn custom-button mb-3">
                      Send Query
                    </button>
                  </div>
                </form>
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                {failureMessage && (
                  <div className="alert alert-danger">{failureMessage}</div>
                )}
              </div>
            </div>
            <div className="col-md-4 ms-1">
              <h2>For Quick Enquiry</h2>
              <p>We are happy to serve you at any time.....</p>
              <div className="quick-enquiry">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 mt-4">
                      <div className="support"></div>
                    </div>
                    <div className="col-md-8 mt-4 contactNo">
                      <h6>+91 9876543412</h6>
                      <h6>+91 8989676419</h6>
                    </div>
                    <div className="row">
                      <div className="col-md-12 ms-4 mt-4">
                        <p>
                          OUR ADDRESS<br></br>
                          SGSITES, Indore, Madhya Pradesh 452002
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br></br>
      <Footer />
    </>
  );
};

export default Contact;
