import { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    const savedProfile = JSON.parse(
      localStorage.getItem("profile")
    );

    if (savedProfile) {
      setPhoto(savedProfile.photo || "");
      setName(savedProfile.name || "");
      setAge(savedProfile.age || "");
      setGender(savedProfile.gender || "");

      setHeight(savedProfile.height || "");
      setWeight(savedProfile.weight || "");
      setTargetWeight(savedProfile.targetWeight || "");
      setGoal(savedProfile.goal || "");
    }
  }, []);

  const imageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPhoto(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    if (
      name === "" ||
      age === "" ||
      gender === "" ||
      height === "" ||
      weight === "" ||
      targetWeight === "" ||
      goal === ""
    ) {
      alert("Please Fill All Details");
      return;
    }

    const profile = {
      photo,
      name,
      age,
      gender,
      height,
      weight,
      targetWeight,
      goal
    };

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    // Home page ko immediately update karne ke liye
    window.dispatchEvent(new Event("profileUpdated"));

    alert("Profile Saved Successfully ✅");
  };

  const bmi =
    height && weight
      ? (
          Number(weight) /
          Math.pow(Number(height) / 100, 2)
        ).toFixed(1)
      : null;

  return (
    <div className="profile-page">
      <div className="profile-card">

        <h1>👤 My Profile</h1>

        {/* Profile Photo */}
        <div className="image-section">
          {photo ? (
            <img
              src={photo}
              alt="profile"
              className="profile-photo"
            />
          ) : (
            <div className="photo-placeholder">
              👤
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={imageChange}
          />
        </div>

        <div className="form">

          {/* Name */}
          <label>Full Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />

          {/* Age */}
          <label>Age</label>

          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Age"
          />

          {/* Gender */}
          <label>Gender</label>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          {/* Height */}
          <label>Height (cm)</label>

          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter Height"
          />

          {/* Current Weight */}
          <label>Current Weight (kg)</label>

          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter Weight"
          />

          {/* Target Weight */}
          <label>Target Weight (kg)</label>

          <input
            type="number"
            value={targetWeight}
            onChange={(e) =>
              setTargetWeight(e.target.value)
            }
            placeholder="Enter Target Weight"
          />

          {/* Daily Target */}
          <label>Daily Calorie Target (kcal)</label>

          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter your target"
          />

          <small className="input-note">
            Set this target according to guidance from a
            qualified health professional.
          </small>

          {/* BMI */}
          {bmi && (
            <div className="bmi-card">
              <h3>BMI</h3>

              <h2>{bmi}</h2>
            </div>
          )}

          {/* Save */}
          <button
            className="save-btn"
            onClick={saveProfile}
          >
            💾 Save Profile
          </button>

        </div>
      </div>
    </div>
  );
}

export default Profile;