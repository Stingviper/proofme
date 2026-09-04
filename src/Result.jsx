import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  Home,
  RotateCcw,
  Share2,
  Trophy,
} from "lucide-react";

import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import "./Result.css";


const skillNames = {
  java: "Java",
  javascript: "JavaScript",
  dsa: "Data Structures",
  sql: "SQL",
};


function getPerformance(score) {
  if (score >= 90) {
    return {
      title: "Excellent Performance",
      message:
        "You demonstrated a very strong understanding of this skill.",
    };
  }

  if (score >= 75) {
    return {
      title: "Strong Performance",
      message:
        "You have demonstrated a solid understanding of this skill.",
    };
  }

  if (score >= 60) {
    return {
      title: "Good Foundation",
      message:
        "You have a good foundation, with room to strengthen your skills.",
    };
  }

  return {
    title: "Keep Practicing",
    message:
      "Keep learning and practicing to improve your technical skills.",
  };
}


function Result() {

  const { skill } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();


  const score = Number(
    searchParams.get("score") || 0
  );


  const correct = Number(
    searchParams.get("correct") || 0
  );


  const total = 10;


  const skillName =
    skillNames[skill] || "Technical Skill";


  const performance =
    getPerformance(score);


  /* SAVE RESULT + OPEN DASHBOARD */

  const handleDashboard = () => {

    const existingResults = JSON.parse(
      localStorage.getItem("proofmeResults") || "{}"
    );


    existingResults[skill] = score;


    localStorage.setItem(
      "proofmeResults",
      JSON.stringify(existingResults)
    );


    navigate("/dashboard");

  };


  /* SAVE RESULT + OPEN PUBLIC PROFILE */

  const handleProfile = () => {

    const existingResults = JSON.parse(
      localStorage.getItem("proofmeResults") || "{}"
    );


    existingResults[skill] = score;


    localStorage.setItem(
      "proofmeResults",
      JSON.stringify(existingResults)
    );


    navigate("/profile");

  };


  /* RETAKE */

  const handleRetake = () => {

    navigate(`/assessment/${skill}`);

  };


  /* SHARE RESULT */

  const handleShare = async () => {

    const url = window.location.href;


    try {

      await navigator.clipboard.writeText(url);

      alert("Result link copied!");

    } catch {

      alert("Unable to copy the link.");

    }

  };


  return (

    <div className="result-page">


      {/* NAVBAR */}

      <nav className="result-nav">


        <button
          className="result-back"
          onClick={() => navigate("/skills")}
        >

          <ArrowLeft size={18} />

          Skills

        </button>


        <div className="result-logo">

          <div className="result-logo-icon">
            ✓
          </div>

          ProofMe

        </div>


        <button
          className="result-home"
          onClick={() => navigate("/")}
        >

          <Home size={17} />

          Home

        </button>


      </nav>



      {/* MAIN */}

      <main className="result-main">


        {/* BADGE */}

        <div className="result-badge">

          <CheckCircle2 size={16} />

          ASSESSMENT COMPLETED

        </div>



        {/* HEADING */}

        <div className="result-heading">


          <div className="result-skill-icon">

            <Code2 size={28} />

          </div>


          <span>
            YOUR {skillName.toUpperCase()} RESULT
          </span>


          <h1>
            Your skill has been tested.
          </h1>


          <p>
            Here's how you performed in the ProofMe assessment.
          </p>


        </div>



        {/* SCORE CARD */}

        <section className="result-score-card">


          <div className="score-left">


            <div
              className="score-ring"
              style={{
                "--score": score,
              }}
            >


              <div className="score-ring-inner">


                <strong>
                  {score}
                </strong>


                <span>
                  /100
                </span>


              </div>


            </div>


          </div>



          <div className="score-details">


            <div className="score-label">
              SKILL SCORE
            </div>


            <h2>
              {performance.title}
            </h2>


            <p>
              {performance.message}
            </p>



            {/* RESULT STATS */}

            <div className="result-stats">


              <div className="result-stat">

                <strong>
                  {correct}/{total}
                </strong>

                <span>
                  Correct answers
                </span>

              </div>



              <div className="result-stat">

                <strong>
                  {score}%
                </strong>

                <span>
                  Accuracy
                </span>

              </div>



              <div className="result-stat">

                <strong>
                  {skillName}
                </strong>

                <span>
                  Assessed skill
                </span>

              </div>


            </div>


          </div>


        </section>



        {/* VERIFICATION */}

        <section className="verification-card">


          <div className="verification-icon">

            <Trophy size={24} />

          </div>


          <div>

            <h3>
              Skill verification recorded
            </h3>


            <p>
              Your {skillName} assessment result has been
              recorded in your ProofMe profile.
            </p>

          </div>


          <CheckCircle2
            className="verification-check"
            size={22}
          />


        </section>



        {/* ACTIONS */}

        <div className="result-actions">


          <button
            className="result-secondary"
            onClick={handleRetake}
          >

            <RotateCcw size={17} />

            Retake Assessment

          </button>



          <button
            className="result-secondary"
            onClick={handleShare}
          >

            <Share2 size={17} />

            Share Result

          </button>



          <button
            className="result-primary"
            onClick={handleDashboard}
          >

            View Dashboard

            <ArrowRight size={17} />

          </button>


        </div>



        {/* PUBLIC PROFILE */}

        <button
          className="profile-result-button"
          onClick={handleProfile}
        >

          View Public Profile

          <Share2 size={16} />

        </button>



        {/* FOOTER NOTE */}

        <div className="result-footer-note">

          <CheckCircle2 size={15} />

          Your score is based entirely on your assessment performance.

        </div>


      </main>


    </div>

  );

}


export default Result;