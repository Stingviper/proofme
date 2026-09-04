import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  Database,
  Layers3,
  Share2,
  Trophy,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./PublicProfile.css";


const skills = [
  {
    id: "java",
    name: "Java",
    description: "Core Java & OOP",
    icon: Code2,
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Modern JavaScript",
    icon: Code2,
  },
  {
    id: "dsa",
    name: "Data Structures",
    description: "Algorithms & problem solving",
    icon: Layers3,
  },
  {
    id: "sql",
    name: "SQL",
    description: "Queries & databases",
    icon: Database,
  },
];


function getScoreLabel(score) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Strong";
  if (score >= 60) return "Good";
  return "Needs Practice";
}


function PublicProfile() {

  const navigate = useNavigate();


  let results = {};

  try {

    results = JSON.parse(
      localStorage.getItem("proofmeResults") || "{}"
    );

  } catch {

    results = {};

  }


  const testedSkills = skills.filter(
    (skill) => results[skill.id] !== undefined
  );


  const overallScore =
    testedSkills.length > 0
      ? Math.round(
          testedSkills.reduce(
            (sum, skill) =>
              sum + Number(results[skill.id]),
            0
          ) / testedSkills.length
        )
      : 0;


  const handleShare = async () => {

    const url = window.location.href;

    try {

      await navigator.clipboard.writeText(url);

      alert("Public profile link copied!");

    } catch {

      alert("Unable to copy the profile link.");

    }

  };


  return (

    <div className="public-page">


      {/* NAVBAR */}

      <nav className="public-nav">


        <button
          className="public-back"
          onClick={() => navigate("/dashboard")}
        >

          <ArrowLeft size={18} />

          Dashboard

        </button>



        <div className="public-logo">

          <div className="public-logo-icon">
            ✓
          </div>

          ProofMe

        </div>



        <button
          className="public-share"
          onClick={handleShare}
        >

          <Share2 size={16} />

          Share Profile

        </button>


      </nav>



      {/* MAIN */}

      <main className="public-main">


        {/* VERIFIED BADGE */}

        <div className="public-badge">

          <CheckCircle2 size={15} />

          VERIFIED SKILL PROFILE

        </div>



        {/* PROFILE HERO */}

        <section className="public-hero">


          <div className="public-avatar">
            P
          </div>


          <div className="public-profile-label">
            TECHNICAL SKILL PROFILE
          </div>


          <h1>
            ProofMe Technical Profile
          </h1>


          <p>
            A profile of technical skills demonstrated
            through ProofMe assessments.
          </p>



          {/* OVERALL SCORE */}

          <div className="public-score">


            <div className="public-score-number">

              {overallScore}

            </div>


            <div className="public-score-info">

              <strong>
                Overall Skill Score
              </strong>

              <span>
                Based on {testedSkills.length} verified skill
                {testedSkills.length !== 1 ? "s" : ""}
              </span>

            </div>


          </div>


        </section>



        {/* SKILLS */}

        <section className="public-skills">


          <div className="public-section-heading">

            <div>

              <span>
                VERIFIED SKILLS
              </span>

              <h2>
                What I can prove
              </h2>

            </div>


            <div className="public-verified-label">

              <CheckCircle2 size={15} />

              Assessment verified

            </div>

          </div>



          {testedSkills.length === 0 ? (

            <div className="public-empty">

              <div className="public-empty-icon">

                <Trophy size={28} />

              </div>


              <h3>
                No verified skills yet
              </h3>


              <p>
                Complete an assessment to start building
                your verified technical profile.
              </p>


              <button
                onClick={() => navigate("/skills")}
              >

                Start Assessment

                <ArrowRight size={16} />

              </button>

            </div>

          ) : (

            <div className="public-skill-list">

              {testedSkills.map((skill) => {

                const Icon = skill.icon;

                const score =
                  Number(results[skill.id]);


                return (

                  <div
                    className="public-skill-card"
                    key={skill.id}
                  >


                    <div className="public-skill-icon">

                      <Icon size={23} />

                    </div>



                    <div className="public-skill-info">

                      <h3>
                        {skill.name}
                      </h3>

                      <p>
                        {skill.description}
                      </p>

                    </div>



                    <div className="public-skill-score">

                      <strong>
                        {score}
                      </strong>

                      <span>
                        / 100
                      </span>

                    </div>



                    <div className="public-skill-status">

                      <CheckCircle2 size={15} />

                      <span>
                        {getScoreLabel(score)}
                      </span>

                    </div>


                  </div>

                );

              })}

            </div>

          )}

        </section>



        {/* PROOF SECTION */}

        <section className="public-proof-card">


          <div className="public-proof-icon">

            <Trophy size={24} />

          </div>


          <div className="public-proof-content">

            <span>
              WHY PROOFME?
            </span>

            <h2>
              Proof, not promises.
            </h2>

            <p>
              Skills shown on this profile are backed by
              performance in ProofMe technical assessments.
            </p>

          </div>


          <button
            onClick={handleShare}
          >

            <Share2 size={16} />

            Share Profile

          </button>


        </section>



        {/* CTA */}

        <section className="public-cta">


          <div>

            <span>
              KEEP BUILDING YOUR PROOF
            </span>

            <h2>
              Test another technical skill.
            </h2>

          </div>


          <button
            onClick={() => navigate("/skills")}
          >

            Take Assessment

            <ArrowRight size={17} />

          </button>


        </section>



        {/* FOOTER */}

        <footer className="public-footer">


          <div className="public-footer-brand">

            <div className="public-logo-icon">
              ✓
            </div>

            <strong>
              ProofMe
            </strong>

          </div>


          <p>
            Don't just claim your skills. Prove them.
          </p>


          <button
            onClick={() => navigate("/")}
          >
            Home
          </button>


        </footer>


      </main>

    </div>

  );

}


export default PublicProfile;