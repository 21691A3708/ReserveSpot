import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingForm({ desc }) {
  const { projectId } = desc;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: null,
    checkOut: null,
    guests: 1,
  });

  const [disabledDates, setDisabledDates] = useState([]);
  const [checkOutMaxDate, setCheckOutMaxDate] = useState(null);
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  const fetchBookedDates = async () => {
    try {
      const res = await axios.get(`/api/bookings/booked-dates/${projectId}`);
      const ranges = res.data;
      const allDisabled = [];
      ranges.forEach(({ checkIn, checkOut }) => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          allDisabled.push(new Date(d));
        }
      });
      setDisabledDates(allDisabled);
    } catch (err) {
      console.error("Error fetching booked dates", err);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict phone to 10 digits
    if (name === "phone" && !/^\d{0,10}$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value, 10) : value,
    }));

    // Real-time validation
    if (name === "phone") {
      if (!phoneRegex.test(value)) {
        setPhoneError("Enter a valid 10-digit Indian mobile number.");
      } else {
        setPhoneError("");
      }
    }

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setEmailError("Enter a valid email address.");
      } else {
        setEmailError("");
      }
    }

    if (name === "name") {
      if (!nameRegex.test(value)) {
        setNameError("Name should contain only letters and spaces.");
      } else {
        setNameError("");
      }
    }
  };

  const handleDateChange = (name, date) => {
    if (name === "checkIn") {
      const newCheckIn = date || null;

      setFormData((prev) => ({
        ...prev,
        checkIn: newCheckIn,
        checkOut: null,
      }));

      if (newCheckIn) {
        const sortedDisabled = [...disabledDates].sort((a, b) => a - b);
        const nextBooked = sortedDisabled.find((d) => d > newCheckIn);

        const sevenDaysLater = new Date(
          newCheckIn.getTime() + 7 * 24 * 60 * 60 * 1000
        );

        setCheckOutMaxDate(
          nextBooked && nextBooked < sevenDaysLater
            ? nextBooked
            : sevenDaysLater
        );
      } else {
        setCheckOutMaxDate(null);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: date || null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPhoneValid = phoneRegex.test(formData.phone);
    const isEmailValid = emailRegex.test(formData.email);
    const isNameValid = nameRegex.test(formData.name);

    if (!isNameValid)
      setNameError("Name should contain only letters and spaces.");
    else setNameError("");

    if (!isEmailValid) setEmailError("Enter a valid email address.");
    else setEmailError("");

    if (!isPhoneValid)
      setPhoneError("Enter a valid 10-digit Indian mobile number.");
    else setPhoneError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.checkIn ||
      !formData.checkOut ||
      !formData.guests ||
      !isNameValid ||
      !isEmailValid ||
      !isPhoneValid
    ) {
      setFormError("Please fill out all fields correctly.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    const payload = {
      ...formData,
      checkIn: formData.checkIn.toISOString(),
      checkOut: formData.checkOut.toISOString(),
      projectId,
    };

    try {
      const res = await axios.post("/api/bookings", payload);

      if (res.status === 200) {
        setMessage("Booking request sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          checkIn: null,
          checkOut: null,
          guests: 1,
        });
        setCheckOutMaxDate(null);
      } else {
        setMessage("Failed to send booking request.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("An error occurred while sending your booking.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 5000);
      fetchBookedDates();
    }
  };

  return (
    <div
      style={{
        width: "55%",
        backgroundColor: "#2c3e50",
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <h2 style={{ color: "white", marginBottom: "20px" }}>
          Like this place? Book your visit:
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={isSubmitting}
          />
          {nameError && <p style={errorStyle}>{nameError}</p>}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={isSubmitting}
          />
          {emailError && <p style={errorStyle}>{emailError}</p>}

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={isSubmitting}
          />
          {phoneError && <p style={errorStyle}>{phoneError}</p>}

          <label style={labelStyle}>Check-in Date:</label>
          <DatePicker
            selected={formData.checkIn}
            onChange={(date) => handleDateChange("checkIn", date)}
            excludeDates={disabledDates}
            minDate={new Date()}
            placeholderText="Select a check-in date"
            dateFormat="yyyy-MM-dd"
            required
            disabled={isSubmitting}
            style={inputStyle}
          />

          <label style={labelStyle}>Check-out Date:</label>
          <DatePicker
            selected={formData.checkOut}
            onChange={(date) => handleDateChange("checkOut", date)}
            excludeDates={disabledDates}
            minDate={formData.checkIn || new Date()}
            maxDate={checkOutMaxDate}
            placeholderText="Select a check-out date"
            dateFormat="yyyy-MM-dd"
            required
            disabled={!(formData.checkIn && !isSubmitting)}
            style={inputStyle}
          />

          <label style={labelStyle}>Guests:</label>
          <input
            name="guests"
            type="number"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={isSubmitting}
          />

          {formError && <p style={errorStyle}>{formError}</p>}

          <button type="submit" style={buttonStyle} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
        {message && (
          <p style={{ color: "#4CAF50", marginTop: "15px" }}>{message}</p>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0 15px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "white",
  color: "black",
  fontSize: "14px",
};

const labelStyle = {
  color: "#ccc",
  fontSize: "14px",
  marginBottom: "4px",
  display: "block",
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginTop: "-10px",
  marginBottom: "10px",
};
