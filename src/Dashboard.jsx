import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Code2,
  Database,
  Layers3,
  Share2,
  Trophy,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./Dashboard.css";


const skills = [
  {
    id: "java",
    name: "Java",
    description: "Core Java, OOP and programming fundamentals",
    icon: Code2,
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Modern JavaScript and programming concepts",
    icon: Code2,
  },
  {
    id: "dsa",
    name: "Data Structures",
    description: "Algorithms and problem solving",
    icon: Layers3,
  },
  {
    id: "sql",
    name: "SQL",
    description: "Queries, databases and data management",
    icon: Database,
  },
];


function getScoreLabel(score) {

  if (score >= 90) {
    return "Excellent";
  }

  if (score >= 75) {
    return "Strong";
  }

  if (score >= 60) {
    return "Good";
  }

  return "Needs Practice";
}


function Dashboard() {

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


  const bestSkill =
    testedSkills.length > 0
      ? [...testedSkills].sort(
          (a, b) =>
            Number(results[b.id]) -
            Number(results[a.id])
        )[0]
      : null;


  const handleRetake = (skill) => {
    navigate(`/assessment/${skill}`);
  };


  return (

    <div className="dashboard-page">

      {/* NAVBAR */}

      <nav className="dashboard-nav">

        <button
          className="dashboard-home"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Home
        </button>


        <div className="dashboard-logo">

          <div className="dashboard-logo-icon">
            ✓
          </div>

          ProofMe

        </div>


        <button
          className="share-profile"
          onClick={() => navigate("/profile")}
        >
          <Share2 size={16} />
          Public Profile
        </button>

      </nav>


      {/* MAIN */}

      <main className="dashboard-main">

        {/* HEADER */}

        <section className="dashboard-header">

          <div>

            <div className="dashboard-label">
              YOUR SKILL DASHBOARD
            </div>

            <h1>
              Your skills, backed by proof.
            </h1>

            <p>
              Track the technical skills you've demonstrated
              through ProofMe assessments.
            </p>

          </div>


          <button
            className="dashboard-primary"
            onClick={() => navigate("/skills")}
          >
            Test Another Skill
            <ArrowRight size={17} />
          </button>

        </section>


        {/* STATS */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <Trophy size={21} />
            </div>

            <div>

              <span>
                OVERALL SCORE
              </span>

              <strong>
                {overallScore}
                <small>/100</small>
              </strong>

            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <CheckCircle2 size={21} />
            </div>

            <div>

              <span>
                VERIFIED SKILLS
              </span>

              <strong>
                {testedSkills.length}
                <small>/4</small>
              </strong>

            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <Award size={21} />
            </div>

            <div>

              <span>
                STRONGEST SKILL
              </span>

              <strong className="strongest-skill">

                {bestSkill
                  ? bestSkill.name
                  : "Not tested"}

              </strong>

            </div>

          </div>

        </section>


        {/* SKILLS */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>

              <span>
                SKILL PERFORMANCE
              </span>

              <h2>
                Your verified skills
              </h2>

            </div>

            <div className="verified-label">

              <CheckCircle2 size={15} />

              Assessment verified

            </div>

          </div>


          {testedSkills.length === 0 ? (

            <div className="dashboard-empty">

              <div className="empty-icon">
                <Trophy size={28} />
              </div>

              <h3>
                No skills tested yet
              </h3>

              <p>
                Complete your first assessment to start
                building your verified skill profile.
              </p>

              <button
                className="dashboard-primary"
                onClick={() => navigate("/skills")}
              >
                Start Your First Assessment
                <ArrowRight size={17} />
              </button>

            </div>

          ) : (

            <div className="dashboard-skills">

              {testedSkills.map((skill) => {

                const Icon = skill.icon;

                const score =
                  Number(results[skill.id]);

                return (

                  <div
                    className="dashboard-skill-card"
                    key={skill.id}
                  >

                    <div className="dashboard-skill-top">

                      <div className="dashboard-skill-title">

                        <div className="dashboard-skill-icon">
                          <Icon size={22} />
                        </div>

                        <div>

                          <h3>
                            {skill.name}
                          </h3>

                          <p>
                            {skill.description}
                          </p>

                        </div>

                      </div>


                      <div className="dashboard-skill-score">

                        <strong>
                          {score}
                        </strong>

                        <span>
                          /100
                        </span>

                      </div>

                    </div>


                    <div className="dashboard-progress">

                      <div
                        className="dashboard-progress-fill"
                        style={{
                          width: `${score}%`,
                        }}
                      />

                    </div>


                    <div className="dashboard-skill-bottom">

                      <div className="skill-performance">

                        <CheckCircle2 size={15} />

                        {getScoreLabel(score)}

                      </div>


                      <button
                        className="retake-button"
                        onClick={() =>
                          handleRetake(skill.id)
                        }
                      >

                        Retake

                        <ArrowRight size={14} />

                      </button>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </section>


        {/* PROFILE CTA */}

        <section className="profile-cta">

          <div className="profile-cta-icon">
            <Share2 size={23} />
          </div>


          <div>

            <span>
              READY TO SHOW YOUR SKILLS?
            </span>

            <h2>
              Share your ProofMe profile.
            </h2>

            <p>
              Give recruiters and others a quick view
              of the skills you've demonstrated.
            </p>

          </div>


          <button
            onClick={() => navigate("/profile")}
          >

            View Public Profile

            <ArrowRight size={17} />

          </button>

        </section>


        {/* FOOTER */}

        <footer className="dashboard-footer">

          <div className="dashboard-footer-brand">

            <div className="dashboard-logo-icon">
              ✓
            </div>

            <strong>
              ProofMe
            </strong>

          </div>


          <p>
            Don't just claim your skills. Prove them.
          </p>

        </footer>

      </main>

    </div>

  );

}


export default Dashboard;