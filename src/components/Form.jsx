import React, { useState } from "react";

const countries = ["India", "USA", "Canada", "UK", "Australia"];
const statesByCountry = {
  India: ["Delhi", "Mumbai", "Haryana", "Uttar Pradesh"],
  USA: ["New York", "California", "Texas"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
  UK: ["England", "Scotland", "Wales"],
  Australia: ["New South Wales", "Victoria", "Queensland"],
};

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    telephone: "",
    country: "",
    state: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    //required fields
    Object.keys(formData).forEach((key) => {
      if (key !== "telephone" && !formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    //email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // phone number format
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form validation failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({
      ...formData,
      country: selectedCountry,
      state: statesByCountry[selectedCountry],
    });
  };

  return (
    <>
      <h1>Contact Us</h1>
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <div className="flex-div">
            <div>
              <label htmlFor="firstName">First Name*:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName && "error-border"}
                placeholder="First Name"
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>

            <div>
              <label htmlFor="lastName">Last Name*:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName && "error-border"}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="single-div">
            <label htmlFor="email">Email*:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email && "error-border"}
              placeholder="Email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="single-div">
            <label htmlFor="phone">Phone*:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone && "error-border"}
              placeholder="Phone"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="single-div">
            <label htmlFor="telephone">Telephone:</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Telephone (Optional)"
            />
          </div>

          <div className="flex-div">
            <div>
              <label htmlFor="country">Country*:</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                className={errors.country && "error-border"}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="error">{errors.country}</span>
              )}
            </div>

            <div>
              <label htmlFor="state">State*:</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={formData.country === "Select Country"}
                className={errors.state && "error-border"}
              >
                <option value="">Select State</option>
                {statesByCountry[formData.country]?.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <span className="error">{errors.state}</span>}
            </div>
          </div>

          <div className="single-div">
            <label htmlFor="address">Address*:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address && "error-border"}
              placeholder="Address"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="submit-div">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
