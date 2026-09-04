import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Code2,
  Trophy,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./Assessment.css";

const questionBank = {
  java: [
    {
      question: "Which principle of OOP allows one interface to represent different forms?",
      options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
      answer: 1,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["implements", "extends", "inherits", "super"],
      answer: 1,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "What is the time complexity of accessing an element in an ArrayList by index?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 0,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "Which collection does not allow duplicate elements?",
      options: ["ArrayList", "LinkedList", "HashSet", "Vector"],
      answer: 2,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "What happens if a checked exception is neither caught nor declared?",
      options: [
        "Program runs normally",
        "Compile-time error",
        "Runtime warning",
        "Exception is ignored",
      ],
      answer: 1,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "Which keyword prevents a method from being overridden?",
      options: ["static", "private", "final", "const"],
      answer: 2,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "What is the main purpose of the Java garbage collector?",
      options: [
        "Compile source code",
        "Manage network connections",
        "Automatically reclaim unused memory",
        "Create threads",
      ],
      answer: 2,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which concept allows a subclass object to be treated as a superclass reference?",
      options: ["Upcasting", "Overloading", "Composition", "Serialization"],
      answer: 0,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "What is method overloading?",
      options: [
        "Same method name with different parameters",
        "Same method in parent and child classes",
        "Multiple classes with the same name",
        "Calling a private method",
      ],
      answer: 0,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which feature allows Java bytecode to run on different operating systems?",
      options: [
        "Pointers",
        "Platform-independent JVM architecture",
        "Multiple inheritance",
        "Operator overloading",
      ],
      answer: 1,
      difficulty: "Advanced",
      points: 3,
    },
  ],

  javascript: [
    {
      question: "Which keyword declares a block-scoped variable that can be reassigned?",
      options: ["var", "let", "const", "static"],
      answer: 1,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which method converts a JSON string into a JavaScript object?",
      options: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.convert()",
        "JSON.object()",
      ],
      answer: 0,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "What does === check?",
      options: [
        "Only value",
        "Only type",
        "Value and type",
        "Reference name",
      ],
      answer: 2,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which array method creates a new array by transforming each element?",
      options: ["filter()", "map()", "reduce()", "find()"],
      answer: 1,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A loop that never ends",
        "A function remembering its surrounding lexical scope",
        "A closed browser window",
        "A private class",
      ],
      answer: 1,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "What does Promise.resolve() return?",
      options: [
        "A resolved Promise",
        "A callback",
        "An array",
        "A thread",
      ],
      answer: 0,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "Which statement about const is correct?",
      options: [
        "The variable can never contain an object",
        "The binding cannot be reassigned",
        "It is always globally scoped",
        "It can only store numbers",
      ],
      answer: 1,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "What does the event loop primarily help JavaScript handle?",
      options: [
        "Memory allocation only",
        "Asynchronous callbacks",
        "CSS rendering only",
        "Database schemas",
      ],
      answer: 1,
      difficulty: "Advanced",
      points: 3,
    },
    {
      question: "What is returned by an async function?",
      options: ["Array", "Promise", "Thread", "Generator only"],
      answer: 1,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "Which concept allows functions to be passed as values in JavaScript?",
      options: [
        "First-class functions",
        "Inheritance",
        "Encapsulation",
        "Static typing",
      ],
      answer: 0,
      difficulty: "Advanced",
      points: 3,
    },
  ],

  dsa: [
    {
      question: "Which data structure follows LIFO?",
      options: ["Queue", "Stack", "Array", "Graph"],
      answer: 1,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which data structure follows FIFO?",
      options: ["Stack", "Queue", "Tree", "Heap"],
      answer: 1,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "What is the average time complexity of searching in a hash table?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: 0,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "Which traversal of a Binary Search Tree gives sorted order?",
      options: ["Preorder", "Postorder", "Inorder", "Level order"],
      answer: 2,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "What is the worst-case time complexity of binary search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 1,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which algorithm is commonly used to find the shortest path in a weighted graph with non-negative edges?",
      options: ["DFS", "Dijkstra's algorithm", "Bubble sort", "Binary search"],
      answer: 1,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "Which sorting algorithm has average O(n log n) complexity?",
      options: ["Bubble sort", "Selection sort", "Merge sort", "Linear search"],
      answer: 2,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "What is the space complexity of recursive DFS on a graph in the worst case?",
      options: ["O(1)", "O(log n)", "O(V)", "O(V²)"],
      answer: 2,
      difficulty: "Advanced",
      points: 3,
    },
    {
      question: "Which technique solves many optimization problems by breaking them into overlapping subproblems?",
      options: [
        "Dynamic programming",
        "Binary search",
        "Hashing",
        "Linear traversal",
      ],
      answer: 0,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "What is the main advantage of a balanced Binary Search Tree?",
      options: [
        "It always uses arrays",
        "It keeps operations approximately O(log n)",
        "It cannot contain duplicates",
        "It eliminates recursion",
      ],
      answer: 1,
      difficulty: "Advanced",
      points: 3,
    },
  ],

  sql: [
    {
      question: "Which SQL command is used to retrieve data?",
      options: ["GET", "SELECT", "FETCHROW", "READ"],
      answer: 1,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which clause filters rows?",
      options: ["ORDER BY", "GROUP BY", "WHERE", "SELECT"],
      answer: 2,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which keyword removes duplicate rows from a result?",
      options: ["UNIQUE", "DISTINCT", "FILTER", "SINGLE"],
      answer: 1,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which JOIN returns matching rows from both tables?",
      options: ["INNER JOIN", "LEFT JOIN", "FULL JOIN", "CROSS JOIN"],
      answer: 0,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "Which clause groups rows with the same values?",
      options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"],
      answer: 0,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "Which clause filters grouped results?",
      options: ["WHERE", "HAVING", "GROUP", "FILTER BY"],
      answer: 1,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "Which command modifies existing rows?",
      options: ["CHANGE", "UPDATE", "ALTER ROW", "MODIFY"],
      answer: 1,
      difficulty: "Basic",
      points: 1,
    },
    {
      question: "What is the purpose of a primary key?",
      options: [
        "Allow duplicate rows",
        "Uniquely identify each row",
        "Sort every table",
        "Create backups",
      ],
      answer: 1,
      difficulty: "Intermediate",
      points: 2,
    },
    {
      question: "Which normal form removes partial dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: 1,
      difficulty: "Advanced",
      points: 3,
    },
    {
      question: "What does an index generally improve?",
      options: [
        "Query/search performance",
        "Table size only",
        "Data duplication",
        "Number of columns",
      ],
      answer: 0,
      difficulty: "Advanced",
      points: 3,
    },
  ],
};

const skillNames = {
  java: "Java",
  javascript: "JavaScript",
  dsa: "Data Structures",
  sql: "SQL",
};

function Assessment() {
  const { skill } = useParams();
  const navigate = useNavigate();

  const questions = questionBank[skill] || questionBank.java;
  const skillName = skillNames[skill] || "Java";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = questions[currentQuestion];

  const progress = Math.round(
    ((currentQuestion + 1) / questions.length) * 100
  );

  const selectAnswer = (index) => {
    setAnswers({
      ...answers,
      [currentQuestion]: index,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitAssessment = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    let earnedPoints = 0;
    let maximumPoints = 0;
    let correctAnswers = 0;

    questions.forEach((q, index) => {
      maximumPoints += q.points;

      if (answers[index] === q.answer) {
        earnedPoints += q.points;
        correctAnswers++;
      }
    });

    const percentage = Math.round(
      (earnedPoints / maximumPoints) * 100
    );

    const existingResults = JSON.parse(
      localStorage.getItem("proofmeResults") || "{}"
    );

    existingResults[skill] = percentage;

    localStorage.setItem(
      "proofmeResults",
      JSON.stringify(existingResults)
    );

    navigate(
      `/result/${skill}?score=${percentage}&correct=${correctAnswers}`
    );
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="assessment-page">

      {/* NAVBAR */}

      <nav className="assessment-nav">

        <button
          className="assessment-back"
          onClick={() => navigate("/skills")}
        >
          <ArrowLeft size={18} />
          Back to Skills
        </button>

        <div className="assessment-logo">
          <div className="assessment-logo-icon">
            ✓
          </div>
          ProofMe
        </div>

        <div className="assessment-status">
          <Clock3 size={16} />
          Skill Assessment
        </div>

      </nav>


      {/* MAIN */}

      <main className="assessment-main">

        <div className="assessment-header">

          <div className="assessment-title">

            <div className="assessment-skill-icon">
              <Code2 size={25} />
            </div>

            <div>
              <span>TECHNICAL ASSESSMENT</span>
              <h1>{skillName}</h1>
            </div>

          </div>

          <div className="assessment-count">
            {currentQuestion + 1} / {questions.length}
          </div>

        </div>


        {/* PROGRESS */}

        <div className="assessment-progress-container">

          <div className="assessment-progress-info">
            <span>Assessment Progress</span>
            <strong>{progress}%</strong>
          </div>

          <div className="assessment-progress">
            <div
              className="assessment-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>


        {/* QUESTION CARD */}

        <section className="question-card">

          <div className="question-meta">

            <span
              className={`difficulty ${question.difficulty.toLowerCase()}`}
            >
              {question.difficulty}
            </span>

            <span className="question-points">
              {question.points} point
              {question.points > 1 ? "s" : ""}
            </span>

          </div>


          <h2>
            {question.question}
          </h2>


          <div className="options">

            {question.options.map((option, index) => {

              const selected =
                answers[currentQuestion] === index;

              return (
                <button
                  key={option}
                  className={`option ${selected ? "selected" : ""}`}
                  onClick={() => selectAnswer(index)}
                >

                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="option-text">
                    {option}
                  </span>

                  {selected && (
                    <CheckCircle2
                      className="option-check"
                      size={20}
                    />
                  )}

                </button>
              );
            })}

          </div>

        </section>


        {/* CONTROLS */}

        <div className="assessment-controls">

          <button
            className="previous-button"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft size={17} />
            Previous
          </button>


          <div className="answered-info">
            {answeredCount} of {questions.length} answered
          </div>


          {currentQuestion === questions.length - 1 ? (

            <button
              className="submit-button"
              onClick={submitAssessment}
              disabled={
                answeredCount !== questions.length ||
                isSubmitting
              }
            >
              <Trophy size={17} />
              {isSubmitting
                ? "Calculating..."
                : "Submit Assessment"}
            </button>

          ) : (

            <button
              className="next-button"
              onClick={nextQuestion}
              disabled={answers[currentQuestion] === undefined}
            >
              Next
              <ArrowRight size={17} />
            </button>

          )}

        </div>


        {/* FOOTER INFO */}

        <div className="assessment-note">
          <CheckCircle2 size={15} />
          Your score is calculated from your demonstrated performance.
        </div>

      </main>

    </div>
  );
}

export default Assessment;