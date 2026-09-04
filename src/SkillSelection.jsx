import {
  ArrowLeft,
  ArrowRight,
  Braces,
  Code2,
  Database,
  Layers3,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SkillSelection.css";

const skills = [
  {
    id: "java",
    name: "Java",
    description: "Core Java & OOP",
    icon: Braces,
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

function SkillSelection() {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleContinue = () => {
    if (!selectedSkill) return;

    navigate(`/assessment/${selectedSkill}`);
  };

  return (
    <div className="selection-page">
      <nav className="selection-nav">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="selection-logo">
          <div className="selection-logo-icon">✦</div>
          ProofMe
        </div>

        <div className="step-indicator">
          <span className="active-step">01</span>
          <span>/ 03</span>
        </div>
      </nav>

      <main className="selection-main">
        <div className="selection-heading">
          <div className="selection-label">
            STEP 01 — SELECT A SKILL
          </div>

          <h1>
            What do you want
            <br />
            <span>to prove?</span>
          </h1>

          <p>
            Choose a skill and we'll give you a short technical
            challenge designed to test your actual knowledge.
          </p>
        </div>

        <div className="skill-grid">
          {skills.map((skill) => {
            const Icon = skill.icon;
            const isSelected = selectedSkill === skill.id;

            return (
              <button
                key={skill.id}
                className={`skill-card ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => setSelectedSkill(skill.id)}
              >
                <div className="skill-icon">
                  <Icon size={25} />
                </div>

                <div className="skill-info">
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                </div>

                <div className="selection-circle">
                  {isSelected && <div />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="selection-footer">
          <p>
            You can add more skills to your profile later.
          </p>

          <button
            className={`continue-button ${
              selectedSkill ? "enabled" : ""
            }`}
            onClick={handleContinue}
            disabled={!selectedSkill}
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}

export default SkillSelection;