import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Share2,
  Sparkles,
  Trophy,
} from "lucide-react";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import SkillSelection from "./SkillSelection";
import Assessment from "./Assessment";
import Result from "./Result";
import Dashboard from "./Dashboard";
import PublicProfile from "./PublicProfile";
import CodingChallenge from "./CodingChallenge";

import "./App.css";


function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          <div className="logo-icon">✓</div>
          ProofMe
        </div>

        <div className="nav-links">
          <a href="#how-it-works">
            How it works
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#why-proofme">
            Why ProofMe?
          </a>
        </div>

        <button
          className="nav-button"
          onClick={() => navigate("/skills")}
        >
          Get Started
          <ArrowRight size={16} />
        </button>

      </nav>


      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="eyebrow">
              <Sparkles size={15} />
              SKILL VERIFICATION PLATFORM
            </div>

            <h1>
              Don't just claim your skills.
              <span> Prove them.</span>
            </h1>

            <p>
              ProofMe helps developers demonstrate
              their technical skills through real
              assessments and coding challenges.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-button"
                onClick={() => navigate("/skills")}
              >
                Test Your Skills
                <ArrowRight size={17} />
              </button>

              <button
                className="secondary-button"
                onClick={() => navigate("/profile")}
              >
                Explore Demo
              </button>

            </div>

          </div>


          <div className="hero-card">

            <div className="profile-preview">

              <div className="preview-top">

                <div className="preview-avatar">
                  P
                </div>

                <div>
                  <strong>
                    ProofMe Profile
                  </strong>

                  <span>
                    Verified Technical Skills
                  </span>
                </div>

                <CheckCircle2
                  size={20}
                  className="verified-icon"
                />

              </div>


              <div className="overall-score">

                <div>
                  <span>
                    OVERALL SKILL SCORE
                  </span>

                  <strong>
                    78
                  </strong>

                  <small>
                    /100
                  </small>
                </div>

                <Trophy size={28} />

              </div>


              <div className="preview-skills">

                <div>
                  <span>Java</span>

                  <div className="mini-progress">
                    <div style={{ width: "82%" }} />
                  </div>

                  <strong>82</strong>
                </div>

                <div>
                  <span>Data Structures</span>

                  <div className="mini-progress">
                    <div style={{ width: "76%" }} />
                  </div>

                  <strong>76</strong>
                </div>

                <div>
                  <span>JavaScript</span>

                  <div className="mini-progress">
                    <div style={{ width: "71%" }} />
                  </div>

                  <strong>71</strong>
                </div>

              </div>

            </div>

          </div>

        </section>


        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-heading">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              Turn skills into proof.
            </h2>

            <p>
              A simple way to demonstrate what
              you actually know.
            </p>

          </div>


          <div className="steps">

            <div className="step">
              <div className="step-number">
                01
              </div>

              <h3>
                Choose a Skill
              </h3>

              <p>
                Select a technical skill you
                want to demonstrate.
              </p>
            </div>


            <div className="step">
              <div className="step-number">
                02
              </div>

              <h3>
                Complete the Challenge
              </h3>

              <p>
                Answer technical questions or
                solve a coding problem.
              </p>
            </div>


            <div className="step">
              <div className="step-number">
                03
              </div>

              <h3>
                Get Your Score
              </h3>

              <p>
                Your performance becomes a
                measurable skill score.
              </p>
            </div>


            <div className="step">
              <div className="step-number">
                04
              </div>

              <h3>
                Share Your Proof
              </h3>

              <p>
                Showcase your verified skills
                on your ProofMe profile.
              </p>
            </div>

          </div>

        </section>


        <section
          className="features-section"
          id="features"
        >

          <div className="section-heading">

            <span>
              FEATURES
            </span>

            <h2>
              Built for proof.
            </h2>

          </div>


          <div className="feature-grid">

            <div className="feature-card">
              <Code2 size={24} />

              <h3>
                Technical Assessments
              </h3>

              <p>
                Test your knowledge across
                programming and technical subjects.
              </p>
            </div>


            <div className="feature-card">
              <Trophy size={24} />

              <h3>
                Coding Challenges
              </h3>

              <p>
                Solve algorithmic problems in
                a LeetCode-inspired environment.
              </p>
            </div>


            <div className="feature-card">
              <Share2 size={24} />

              <h3>
                Shareable Profile
              </h3>

              <p>
                Turn your assessment results
                into a professional skill profile.
              </p>
            </div>

          </div>

        </section>


        <section
          className="cta-section"
          id="why-proofme"
        >

          <div>

            <span>
              READY TO PROVE YOUR SKILLS?
            </span>

            <h2>
              Don't just put it on your resume.
              Prove it.
            </h2>

          </div>

          <button
            onClick={() => navigate("/skills")}
          >
            Get Started
            <ArrowRight size={17} />
          </button>

        </section>

      </main>


      <footer className="footer">

        <div className="logo">
          <div className="logo-icon">
            ✓
          </div>

          ProofMe
        </div>

        <p>
          Don't just claim your skills. Prove them.
        </p>

      </footer>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* SKILL SELECTION */}
        <Route
          path="/skills"
          element={<SkillSelection />}
        />

        {/* MCQ ASSESSMENTS */}
        <Route
          path="/assessment/:skill"
          element={<Assessment />}
        />

        {/* ASSESSMENT RESULT */}
        <Route
          path="/result/:skill"
          element={<Result />}
        />

        {/* DSA CODING CHALLENGE */}
        <Route
          path="/coding/:skill"
          element={<CodingChallenge />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* PUBLIC PROFILE */}
        <Route
          path="/profile"
          element={<PublicProfile />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;