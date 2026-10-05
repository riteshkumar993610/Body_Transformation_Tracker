
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  UserRound,
  CalendarDays,
  HeartPulse,
  Activity,
  Utensils,
  Moon,
  Sun,
  Footprints,
  ChevronDown,
  ChevronUp,
  Save,
  CheckCircle2,
  Info,
  LogOut,
  Trash2,
} from "lucide-react";

import "./Profile.css";

/* =========================================================
   EMPTY PROFILE

   No user name or personal information is hardcoded here.
   Every user enters their own information.
========================================================= */

const defaultProfile = {
  name: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  activityLevel: "Moderate",
  healthGoal: "Healthy habits",
};

/* =========================================================
   GOALS
========================================================= */

const goals = [
  {
    title: "Healthy habits",
    description: "Build a balanced daily routine.",
  },
  {
    title: "Strength & fitness",
    description: "Support strength and physical activity.",
  },
  {
    title: "Healthy growth",
    description: "Focus on nutrition, rest and development.",
  },
];

/* =========================================================
   PROFILE COMPONENT
========================================================= */

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(defaultProfile);

  const [scheduleOpen, setScheduleOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [saved, setSaved] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  /* =======================================================
     LOAD SAVED PROFILE
  ======================================================= */

  useEffect(() => {
    try {
      const storedProfile =
        localStorage.getItem("profile");

      /*
        If no profile exists, keep the form empty.
        Nothing is automatically inserted.
      */

      if (!storedProfile) {
        setProfile(defaultProfile);
        return;
      }

      const parsedProfile =
        JSON.parse(storedProfile);

      /*
        Only use valid object data.
      */

      if (
        parsedProfile &&
        typeof parsedProfile === "object"
      ) {
        setProfile({
          ...defaultProfile,
          ...parsedProfile,
        });
      }
    } catch (error) {
      console.error(
        "Profile loading error:",
        error
      );

      setProfile(defaultProfile);

      setMessage(
        "Unable to load your saved profile."
      );
    }
  }, []);

  /* =======================================================
     UPDATE FIELD
  ======================================================= */

  const updateField = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
    setMessage("");
  };

  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  const saveProfile = (event) => {
    event.preventDefault();

    /* -----------------------------------------------
       NAME VALIDATION
    ------------------------------------------------ */

    if (!profile.name.trim()) {
      setMessage("Please enter your name.");
      setSaved(false);
      return;
    }

    /* -----------------------------------------------
       AGE VALIDATION
    ------------------------------------------------ */

    if (
      !profile.age ||
      Number(profile.age) < 1
    ) {
      setMessage("Please enter a valid age.");
      setSaved(false);
      return;
    }

    try {
      /*
        Read existing profile first.

        This keeps any other profile properties
        already used elsewhere in the application.
      */

      let previousProfile = {};

      const existingProfile =
        localStorage.getItem("profile");

      if (existingProfile) {
        try {
          previousProfile =
            JSON.parse(existingProfile) || {};
        } catch {
          previousProfile = {};
        }
      }

      /*
        Create the updated profile.
      */

      const updatedProfile = {
        ...previousProfile,
        ...profile,

        /*
          trim removes accidental spaces from
          the beginning/end of the name.
        */
        name: profile.name.trim(),
      };

      /*
        Save only the user's entered information.
      */

      localStorage.setItem(
        "profile",
        JSON.stringify(updatedProfile)
      );

      /*
        Notify other components such as
        Sidebar/Header/Home.
      */

      window.dispatchEvent(
        new Event("profileUpdated")
      );

      setProfile(updatedProfile);

      setSaved(true);

      setMessage(
        "Your profile has been saved successfully."
      );
    } catch (error) {
      console.error(
        "Profile saving error:",
        error
      );

      setSaved(false);

      setMessage(
        "Could not save your profile. Please try again."
      );
    }
  };

  /* =======================================================
     CLEAR PROFILE
  ======================================================= */

  const clearProfile = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your profile?"
    );

    if (!confirmed) {
      return;
    }

    try {
      /*
        Remove only the profile.
      */

      localStorage.removeItem("profile");

      setProfile({
        ...defaultProfile,
      });

      setSaved(false);

      setMessage(
        "Profile cleared successfully."
      );

      /*
        Notify other components.
      */

      window.dispatchEvent(
        new Event("profileUpdated")
      );
    } catch (error) {
      console.error(
        "Profile clear error:",
        error
      );

      setMessage(
        "Unable to clear your profile."
      );
    }
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoggingOut(true);

      /*
        Remove the current user's profile.

        This prevents the old name from coming
        back after logout + refresh.
      */

      localStorage.removeItem("profile");

      /*
        Remove common login/session keys if they
        exist in the application.

        These are safe even if they don't exist.
      */

      localStorage.removeItem("user");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("authUser");
      localStorage.removeItem("isLoggedIn");

      /*
        Notify the rest of the application.
      */

      window.dispatchEvent(
        new Event("profileUpdated")
      );

      window.dispatchEvent(
        new Event("authChanged")
      );

      /*
        Go to login page.
      */

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      setLoggingOut(false);

      setMessage(
        "Unable to logout. Please try again."
      );
    }
  };

  /* =======================================================
     PROFILE INITIAL
  ======================================================= */

  const profileInitial =
    profile.name &&
    profile.name.trim()
      ? profile.name
          .trim()
          .charAt(0)
          .toUpperCase()
      : "U";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="profile-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="profile-heading">

        <div>

          <span className="profile-eyebrow">
            YOUR SPACE
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            Personalize your health and daily routine.
          </p>

        </div>

        <div className="profile-heading-icon">
          <UserRound size={23} />
        </div>

      </header>

      {/* ===================================================
          PROFILE INTRO
      =================================================== */}

      <section className="profile-user-card">

        <div className="profile-user-avatar">
          {profileInitial}
        </div>

        <div className="profile-user-info">

          <span>
            PROFILE
          </span>

          <h2>
            {profile.name.trim()
              ? profile.name
              : "Your Profile"}
          </h2>

          <p>
            {profile.name.trim()
              ? "Your personal profile information is saved locally."
              : "Enter your details below to create your profile."}
          </p>

        </div>

      </section>

      {/* ===================================================
          PROFILE FORM
      =================================================== */}

      <form
        className="profile-layout"
        onSubmit={saveProfile}
      >

        {/* =================================================
            PERSONAL DETAILS
        ================================================= */}

        <section className="profile-card">

          <div className="profile-card-heading">

            <div className="profile-card-icon">
              <UserRound size={19} />
            </div>

            <div>

              <h2>
                Personal details
              </h2>

              <p>
                Enter your details to personalize
                your experience.
              </p>

            </div>

          </div>

          <div className="profile-fields">

            {/* NAME */}

            <div className="profile-field profile-field-full">

              <label htmlFor="profile-name">
                Your name
              </label>

              <input
                id="profile-name"
                type="text"
                placeholder="Enter your name"
                value={profile.name}
                autoComplete="name"
                onChange={(event) =>
                  updateField(
                    "name",
                    event.target.value
                  )
                }
                required
              />

            </div>

            {/* AGE */}

            <div className="profile-field">

              <label htmlFor="profile-age">
                Age
              </label>

              <input
                id="profile-age"
                type="number"
                min="1"
                max="120"
                placeholder="Your age"
                value={profile.age}
                onChange={(event) =>
                  updateField(
                    "age",
                    event.target.value
                  )
                }
                required
              />

            </div>

            {/* GENDER */}

            <div className="profile-field">

              <label htmlFor="profile-gender">
                Gender
              </label>

              <select
                id="profile-gender"
                value={profile.gender}
                onChange={(event) =>
                  updateField(
                    "gender",
                    event.target.value
                  )
                }
              >

                <option value="">
                  Select
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

                <option value="Prefer not to say">
                  Prefer not to say
                </option>

              </select>

            </div>

            {/* HEIGHT */}

            <div className="profile-field">

              <label htmlFor="profile-height">
                Height
              </label>

              <div className="profile-input-unit">

                <input
                  id="profile-height"
                  type="number"
                  min="1"
                  max="250"
                  placeholder="Height"
                  value={profile.height}
                  onChange={(event) =>
                    updateField(
                      "height",
                      event.target.value
                    )
                  }
                />

                <span>
                  cm
                </span>

              </div>

            </div>

            {/* WEIGHT */}

            <div className="profile-field">

              <label htmlFor="profile-weight">
                Weight
              </label>

              <div className="profile-input-unit">

                <input
                  id="profile-weight"
                  type="number"
                  min="1"
                  max="500"
                  placeholder="Weight"
                  value={profile.weight}
                  onChange={(event) =>
                    updateField(
                      "weight",
                      event.target.value
                    )
                  }
                />

                <span>
                  kg
                </span>

              </div>

            </div>

            {/* ACTIVITY */}

            <div className="profile-field profile-field-full">

              <label htmlFor="profile-activity">
                Activity level
              </label>

              <select
                id="profile-activity"
                value={profile.activityLevel}
                onChange={(event) =>
                  updateField(
                    "activityLevel",
                    event.target.value
                  )
                }
              >

                <option value="Low">
                  Mostly sitting
                </option>

                <option value="Light">
                  Lightly active
                </option>

                <option value="Moderate">
                  Moderately active
                </option>

                <option value="High">
                  Very active
                </option>

              </select>

            </div>

          </div>

        </section>

        {/* =================================================
            HEALTH SNAPSHOT
        ================================================= */}

        <section className="profile-card health-snapshot">

          <div className="profile-card-heading">

            <div className="profile-card-icon">
              <HeartPulse size={19} />
            </div>

            <div>

              <h2>
                Health snapshot
              </h2>

              <p>
                A simple overview based on your
                profile details.
              </p>

            </div>

          </div>

          <div className="energy-result">

            <div className="energy-result-icon">
              <Activity size={21} />
            </div>

            <div>

              <span className="energy-label">
                Profile information
              </span>

              <div className="energy-value">
                {profile.name.trim()
                  ? "Profile active"
                  : "Profile not completed"}
              </div>

            </div>

          </div>

          <div className="profile-note">

            <Info size={17} />

            <p>
              Your profile information is stored
              in this browser using local storage.
              It is not hardcoded into the application.
            </p>

          </div>

        </section>

        {/* =================================================
            GOALS
        ================================================= */}

        <section className="profile-card">

          <div className="profile-card-heading">

            <div className="profile-card-icon">
              <HeartPulse size={19} />
            </div>

            <div>

              <h2>
                My goal
              </h2>

              <p>
                Choose what you want to focus on.
              </p>

            </div>

          </div>

          <div className="profile-goals">

            {goals.map((goal) => (

              <button
                type="button"
                key={goal.title}
                className={`profile-goal-option ${
                  profile.healthGoal ===
                  goal.title
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  updateField(
                    "healthGoal",
                    goal.title
                  )
                }
                aria-pressed={
                  profile.healthGoal ===
                  goal.title
                }
              >

                <span className="goal-check">

                  {profile.healthGoal ===
                    goal.title && (
                    <CheckCircle2 size={17} />
                  )}

                </span>

                <span className="goal-copy">

                  <strong>
                    {goal.title}
                  </strong>

                  <small>
                    {goal.description}
                  </small>

                </span>

              </button>

            ))}

          </div>

        </section>

        {/* =================================================
            SCHEDULE
        ================================================= */}

        <section className="profile-card schedule-card">

          <div className="schedule-summary">

            <div className="profile-card-heading">

              <div className="profile-card-icon">
                <CalendarDays size={19} />
              </div>

              <div>

                <h2>
                  My schedule
                </h2>

                <p>
                  A simple routine for your day.
                </p>

              </div>

            </div>

            <button
              type="button"
              className="schedule-toggle"
              onClick={() =>
                setScheduleOpen(
                  (previous) => !previous
                )
              }
              aria-expanded={scheduleOpen}
            >

              {scheduleOpen
                ? "Hide schedule"
                : "View schedule"}

              {scheduleOpen ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}

            </button>

          </div>

          {scheduleOpen && (

            <div className="daily-schedule">

              <div className="schedule-item">

                <div className="schedule-item-icon">
                  <Sun size={19} />
                </div>

                <div>

                  <h3>
                    Morning
                  </h3>

                  <p>
                    Have breakfast, drink water
                    and start your day with some
                    movement.
                  </p>

                </div>

              </div>

              <div className="schedule-item">

                <div className="schedule-item-icon">
                  <Utensils size={19} />
                </div>

                <div>

                  <h3>
                    Afternoon
                  </h3>

                  <p>
                    Enjoy a balanced lunch and take
                    regular breaks from sitting.
                  </p>

                </div>

              </div>

              <div className="schedule-item">

                <div className="schedule-item-icon">
                  <Footprints size={19} />
                </div>

                <div>

                  <h3>
                    Evening
                  </h3>

                  <p>
                    Choose an enjoyable activity,
                    such as walking, cycling or
                    playing a sport.
                  </p>

                </div>

              </div>

              <div className="schedule-item">

                <div className="schedule-item-icon">
                  <Moon size={19} />
                </div>

                <div>

                  <h3>
                    Night
                  </h3>

                  <p>
                    Have dinner, wind down and
                    maintain a consistent sleep
                    routine.
                  </p>

                </div>

              </div>

              <div className="schedule-footnote">
                Your routine should fit your age,
                energy, schedule and individual
                needs.
              </div>

            </div>

          )}

        </section>

        {/* =================================================
            SAVE AREA
        ================================================= */}

        <div className="profile-save-area">

          <div
            className="profile-save-message"
            role="status"
          >

            {message && (

              <>
                {saved && (
                  <CheckCircle2 size={17} />
                )}

                <span>
                  {message}
                </span>
              </>

            )}

          </div>

          <div
            className="profile-actions"
          >

            {/* CLEAR PROFILE */}

            <button
              type="button"
              onClick={clearProfile}
              className="profile-clear-btn"
            >

              <Trash2 size={16} />

              Clear profile

            </button>

            {/* SAVE */}

            <button
              className="profile-save-btn"
              type="submit"
            >

              <Save size={17} />

              Save profile

            </button>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="profile-logout-btn"
              disabled={loggingOut}
            >

              <LogOut size={16} />

              {loggingOut
                ? "Logging out..."
                : "Logout"}

            </button>

          </div>

        </div>

      </form>

    </main>
  );
}

