import { useState } from "react";
import Editor from "@monaco-editor/react";

import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  Play,
  RotateCcw,
  Send,
  Trophy,
  XCircle,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import "./CodingChallenge.css";

const problems = {
  "two-sum": {
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.",
    details:
      "You may assume that each input has exactly one solution, and you may not use the same element twice.",
    exampleInput:
      "nums = [2, 7, 11, 15], target = 9",
    exampleOutput: "[0, 1]",
    testCases: [
      {
        nums: [2, 7, 11, 15],
        target: 9,
        expected: [0, 1],
      },
      {
        nums: [3, 2, 4],
        target: 6,
        expected: [1, 2],
      },
      {
        nums: [3, 3],
        target: 6,
        expected: [0, 1],
      },
    ],
  },

  "valid-parentheses": {
    title: "Valid Parentheses",
    difficulty: "Easy",
    description:
      "Given a string containing brackets, determine if the input string is valid.",
    details:
      "An input string is valid when every opening bracket has a matching closing bracket in the correct order.",
    exampleInput:
      's = "()[]{}"',
    exampleOutput: "true",
    testCases: [
      {
        input: "()[]{}",
        expected: true,
      },
      {
        input: "([)]",
        expected: false,
      },
      {
        input: "{[]}",
        expected: true,
      },
    ],
  },

  "binary-search": {
    title: "Binary Search",
    difficulty: "Easy",
    description:
      "Given a sorted array of integers nums and a target value, return the index of target if it exists.",
    details:
      "If target is not present in the array, return -1.",
    exampleInput:
      "nums = [-1, 0, 3, 5, 9, 12], target = 9",
    exampleOutput: "4",
    testCases: [
      {
        nums: [-1, 0, 3, 5, 9, 12],
        target: 9,
        expected: 4,
      },
      {
        nums: [-1, 0, 3, 5, 9, 12],
        target: 2,
        expected: -1,
      },
      {
        nums: [1],
        target: 1,
        expected: 0,
      },
    ],
  },

  "maximum-subarray": {
    title: "Maximum Subarray",
    difficulty: "Medium",
    description:
      "Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.",
    details:
      "The subarray must contain at least one element.",
    exampleInput:
      "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    exampleOutput: "6",
    testCases: [
      {
        nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        expected: 6,
      },
      {
        nums: [1],
        expected: 1,
      },
      {
        nums: [5, 4, -1, 7, 8],
        expected: 23,
      },
    ],
  },

  "reverse-linked-list": {
    title: "Reverse Linked List",
    difficulty: "Easy",
    description:
      "Given the head of a singly linked list, reverse the list and return the reversed list.",
    details:
      "The input is represented as an array for this browser-based coding challenge.",
    exampleInput: "head = [1,2,3,4,5]",
    exampleOutput: "[5,4,3,2,1]",
    testCases: [
      {
        nums: [1, 2, 3, 4, 5],
        expected: [5, 4, 3, 2, 1],
      },
      {
        nums: [1, 2],
        expected: [2, 1],
      },
      {
        nums: [1],
        expected: [1],
      },
    ],
  },
};

const languageTemplates = {
  javascript: `function solution(input) {
  // Write your solution here

  return null;
}`,

  java: `class Solution {
    public Object solution(Object input) {
        // Write your solution here

        return null;
    }
}`,

  python: `def solution(input):
    # Write your solution here

    return None`,

  cpp: `class Solution {
public:
    int solution() {
        // Write your solution here

        return 0;
    }
};`,

  c: `int solution() {
    // Write your solution here

    return 0;
}`,

  csharp: `public class Solution {
    public object SolutionMethod(object input) {
        // Write your solution here

        return null;
    }
}`,

  go: `package main

func solution(input interface{}) interface{} {
    // Write your solution here

    return nil
}`,

  rust: `fn solution(input: Vec<i32>) -> i32 {
    // Write your solution here

    0
}`,

  ruby: `def solution(input)

  # Write your solution here

end`,

  php: `function solution($input) {

    // Write your solution here

    return null;
}`,
};

const languageLabels = {
  javascript: "JavaScript",
  java: "Java",
  python: "Python",
  cpp: "C++",
  c: "C",
  csharp: "C#",
  go: "Go",
  rust: "Rust",
  ruby: "Ruby",
  php: "PHP",
};

function normalize(value) {
  return JSON.stringify(value);
}

function executeJavaScript(code, problem) {
  const functionMatch = code.match(
    /function\s+solution\s*\(([^)]*)\)\s*\{/
  );

  if (!functionMatch) {
    throw new Error(
      "Define your solution using: function solution(input) { ... }"
    );
  }

  const runner = new Function(
    `${code}
    
    return solution;`
  );

  const solution = runner();

  if (typeof solution !== "function") {
    throw new Error("Could not find the solution function.");
  }

  return problem.testCases.map((testCase, index) => {
    let input;

    if (problem.title === "Two Sum") {
      input = {
        nums: [...testCase.nums],
        target: testCase.target,
      };
    } else if (problem.title === "Valid Parentheses") {
      input = testCase.input;
    } else {
      input = [...testCase.nums];
    }

    let actual;

    if (problem.title === "Two Sum") {
      actual = solution(input);
    } else {
      actual = solution(input);
    }

    const passed =
      normalize(actual) === normalize(testCase.expected);

    return {
      index: index + 1,
      expected: testCase.expected,
      actual,
      passed,
    };
  });
}

function CodingChallenge() {
  const navigate = useNavigate();
  const { skill } = useParams();

  const problemKeys = Object.keys(problems);

  const [currentProblem, setCurrentProblem] =
    useState("two-sum");

  const problem = problems[currentProblem];

  const [language, setLanguage] =
    useState("javascript");

  const [code, setCode] =
    useState(languageTemplates.javascript);

  const [results, setResults] =
    useState([]);

  const [isRunning, setIsRunning] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [executionError, setExecutionError] =
    useState("");

  const handleProblemChange = (newProblem) => {
    setCurrentProblem(newProblem);

    setCode(languageTemplates[language]);

    setResults([]);

    setSubmitted(false);

    setExecutionError("");
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);

    setCode(languageTemplates[newLanguage]);

    setResults([]);

    setSubmitted(false);

    setExecutionError("");
  };

  const runCode = () => {
    setIsRunning(true);
    setSubmitted(false);
    setExecutionError("");
    setResults([]);

    setTimeout(() => {
      try {
        if (language !== "javascript") {
          throw new Error(
            "Browser execution is currently available for JavaScript. Other languages are available for code editing and syntax highlighting."
          );
        }

        const testResults = executeJavaScript(
          code,
          problem
        );

        setResults(testResults);
      } catch (error) {
        setExecutionError(
          error.message ||
            "Unable to execute your solution."
        );
      } finally {
        setIsRunning(false);
      }
    }, 250);
  };

  const submitCode = () => {
    setSubmitted(true);

    setIsRunning(true);
    setExecutionError("");
    setResults([]);

    setTimeout(() => {
      try {
        if (language !== "javascript") {
          throw new Error(
            "JavaScript execution is required for this browser-based challenge."
          );
        }

        const testResults = executeJavaScript(
          code,
          problem
        );

        setResults(testResults);
      } catch (error) {
        setExecutionError(
          error.message ||
            "Unable to execute your solution."
        );
      } finally {
        setIsRunning(false);
      }
    }, 250);
  };

  const resetCode = () => {
    setCode(languageTemplates[language]);
    setResults([]);
    setSubmitted(false);
    setExecutionError("");
  };

  const passedCount = results.filter(
    (result) => result.passed
  ).length;

  const allPassed =
    results.length === problem.testCases.length &&
    passedCount === problem.testCases.length;

  const saveDSAResult = () => {
    const existingResults = JSON.parse(
      localStorage.getItem("proofmeResults") || "{}"
    );

    const previousScore = Number(
      existingResults.dsa || 0
    );

    const newScore = Math.max(
      previousScore,
      allPassed ? 100 : Math.round(
        (passedCount / problem.testCases.length) * 100
      )
    );

    existingResults.dsa = newScore;

    localStorage.setItem(
      "proofmeResults",
      JSON.stringify(existingResults)
    );
  };

  if (allPassed && submitted) {
    saveDSAResult();
  }

  return (
    <div className="coding-page">

      <nav className="coding-nav">

        <button
          className="coding-back"
          onClick={() => navigate("/skills")}
        >
          <ArrowLeft size={18} />
          Skills
        </button>

        <div className="coding-logo">
          <div className="coding-logo-icon">
            ✓
          </div>
          ProofMe
        </div>

        <div className="coding-nav-title">
          <Code2 size={16} />
          DSA Coding Challenge
        </div>

      </nav>

      <main className="coding-main">

        <section className="problem-header">

          <div className="problem-heading">

            <div className="problem-icon">
              <Code2 size={24} />
            </div>

            <div>
              <div className="problem-label">
                DATA STRUCTURES & ALGORITHMS
              </div>

              <h1>
                {problem.title}
              </h1>
            </div>

          </div>

          <span className="difficulty-badge">
            {problem.difficulty}
          </span>

        </section>

        <section className="problem-selector">

          <div>
            <span className="selector-label">
              PRACTICE PROBLEM
            </span>

            <h3>
              Choose a coding challenge
            </h3>
          </div>

          <select
            value={currentProblem}
            onChange={(e) =>
              handleProblemChange(e.target.value)
            }
          >
            {problemKeys.map((key) => (
              <option key={key} value={key}>
                {problems[key].title}
              </option>
            ))}
          </select>

        </section>

        <section className="problem-card">

          <h2>Problem</h2>

          <p>
            {problem.description}
          </p>

          <p>
            {problem.details}
          </p>

          <div className="example-box">

            <strong>Example</strong>

            <div className="example-row">
              <span>Input:</span>

              <code>
                {problem.exampleInput}
              </code>
            </div>

            <div className="example-row">
              <span>Output:</span>

              <code>
                {problem.exampleOutput}
              </code>
            </div>

          </div>

        </section>

        <section className="editor-section">

          <div className="editor-header">

            <div className="editor-title">

              <Code2 size={17} />

              <select
                className="language-select"
                value={language}
                onChange={(e) =>
                  handleLanguageChange(
                    e.target.value
                  )
                }
              >

                {Object.entries(
                  languageLabels
                ).map(
                  ([value, label]) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {label}
                    </option>
                  )
                )}

              </select>

            </div>

            <button
              className="reset-code"
              onClick={resetCode}
            >
              <RotateCcw size={14} />
              Reset
            </button>

          </div>

          <div className="editor-container">

            <Editor
              height="430px"
              language={
                language === "cpp"
                  ? "cpp"
                  : language
              }
              theme="vs-dark"
              value={code}
              onChange={(value) =>
                setCode(value || "")
              }
              options={{
                minimap: {
                  enabled: false,
                },
                fontSize: 14,
                padding: {
                  top: 18,
                },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                roundedSelection: false,
                cursorBlinking: "smooth",
              }}
            />

          </div>

        </section>

        <div className="coding-actions">

          <div className="coding-hint">

            <Trophy size={16} />

            Pass all test cases
            to verify your solution.

          </div>

          <div className="coding-buttons">

            <button
              className="run-button"
              onClick={runCode}
              disabled={isRunning}
            >

              <Play size={16} />

              {isRunning
                ? "Running..."
                : "Run Code"}

            </button>

            <button
              className="submit-code-button"
              onClick={submitCode}
              disabled={isRunning}
            >

              <Send size={16} />

              {isRunning
                ? "Submitting..."
                : "Submit Solution"}

            </button>

          </div>

        </div>

        {executionError && (

          <div className="compiler-error">

            <XCircle size={18} />

            <div>

              <strong>
                Execution Error
              </strong>

              <p>
                {executionError}
              </p>

            </div>

          </div>

        )}

        <section className="test-results">

          <div className="test-results-header">

            <div>

              <span>
                TEST RESULTS
              </span>

              <h2>

                {results.length === 0
                  ? "Run your code"
                  : `${passedCount}/${problem.testCases.length} test cases passed`}

              </h2>

            </div>

            {results.length > 0 && (

              <div
                className={
                  allPassed
                    ? "result-status passed"
                    : "result-status failed"
                }
              >

                {allPassed ? (
                  <>
                    <CheckCircle2 size={16} />
                    Accepted
                  </>
                ) : (
                  <>
                    <XCircle size={16} />
                    Not Accepted
                  </>
                )}

              </div>

            )}

          </div>

          {results.length === 0 ? (

            <div className="empty-results">

              <Code2 size={28} />

              <p>
                Run your JavaScript solution
                to see test results here.
              </p>

            </div>

          ) : (

            <div className="test-case-list">

              {results.map((result) => (

                <div
                  className={`test-case ${
                    result.passed
                      ? "test-passed"
                      : "test-failed"
                  }`}
                  key={result.index}
                >

                  <div className="test-case-icon">

                    {result.passed ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <XCircle size={18} />
                    )}

                  </div>

                  <div className="test-case-info">

                    <strong>
                      Test Case {result.index}
                    </strong>

                    <span>

                      Expected:{" "}
                      {JSON.stringify(
                        result.expected
                      )}

                      {"  •  "}

                      Output:{" "}
                      {JSON.stringify(
                        result.actual
                      )}

                    </span>

                  </div>

                  <div className="test-case-status">

                    {result.passed
                      ? "Passed"
                      : "Failed"}

                  </div>

                </div>

              ))}

            </div>

          )}

          {submitted && allPassed && (

            <div className="accepted-message">

              <div className="accepted-icon">

                <Trophy size={24} />

              </div>

              <div>

                <strong>
                  Solution Accepted!
                </strong>

                <p>
                  You've successfully solved this
                  ProofMe coding challenge.
                </p>

              </div>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default CodingChallenge;