import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/LandingPage.css";

function AlgorithmPage() {
  const navigate = useNavigate();
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`landing-page ${themeName}`}>
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
            <h2>Score App</h2>
          </div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/how-it-works">How It Works</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/algorithm">Algorithm</a></li>
          </ul>
          <div className="nav-actions">
            <div className="theme-toggles">
              <button className={`theme-btn ${themeName === 'light' ? 'active' : ''}`} onClick={() => toggleTheme("light")}>Light</button>
              <button className={`theme-btn ${themeName === 'dark' ? 'active' : ''}`} onClick={() => toggleTheme("dark")}>Dark</button>
              <button className={`theme-btn ${themeName === 'event' ? 'active' : ''}`} onClick={() => toggleTheme("event")}>Event</button>
            </div>
            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>
      </nav>

      <section className="page-hero">
        <div className="page-hero-content">
          <h1>Our Scoring Algorithm</h1>
          <p>Understanding Z-Score Normalization for Fair Judge Comparisons</p>
        </div>
      </section>

      <section className="page-content-section">
        <div className="section-container-full">
          <div className="algorithm-card">
            <h3 className="algorithm-card-title">The Problem: Judge Bias</h3>
            <p className="algorithm-card-text">
              Different judges naturally have different scoring tendencies. Some judges may be generous and give high scores, while others may be stricter and give lower scores. This creates unfairness when comparing teams evaluated by different judges.
            </p>
            <div className="algorithm-example-box">
              <h4>Example Problem:</h4>
              <p>Judge A rates Team X: 85/100 (Judge A is strict, rarely gives above 85)</p>
              <p>Judge B rates Team Y: 85/100 (Judge B is generous, frequently gives 90+)</p>
              <p className="highlight-text">Who performed better? Raw scores say they're equal, but context suggests Team X performed better!</p>
            </div>
          </div>

          <div className="algorithm-card">
            <h3 className="algorithm-card-title">The Solution: Z-Score Normalization</h3>
            <p className="algorithm-card-text">
              Z-score normalization adjusts scores based on each judge's scoring pattern. It answers the question: "How does this team's score compare to the judge's average scoring behavior?"
            </p>
            <div className="algorithm-formula-box">
              <h4>The Formula:</h4>
              <div className="formula-steps">
                <div className="formula-step">
                  <div className="step-number-badge">1</div>
                  <div className="step-content">
                    <h5>Collect Judges' Scores</h5>
                    <p>Each team gets scores from multiple judges across criteria (Idea, PPT, Execution, Teamwork, etc.).</p>
                    <p className="example-text"><strong>Example:</strong> Judge 1: 80, Judge 2: 75, Judge 3: 85</p>
                  </div>
                </div>

                <div className="formula-step">
                  <div className="step-number-badge">2</div>
                  <div className="step-content">
                    <h5>Total Score (per team)</h5>
                    <div className="formula-display">Total Score = Judge 1 + Judge 2 + ... + Judge n</div>
                    <p className="example-text"><strong>Example:</strong> 80 + 75 + 85 = 240</p>
                  </div>
                </div>

                <div className="formula-step">
                  <div className="step-number-badge">3</div>
                  <div className="step-content">
                    <h5>Mean Score (per team)</h5>
                    <div className="formula-display">Mean Score = Total Score / No. of Judges</div>
                    <p className="example-text"><strong>Example:</strong> 240 / 3 = 80</p>
                  </div>
                </div>

                <div className="formula-step">
                  <div className="step-number-badge">4</div>
                  <div className="step-content">
                    <h5>Overall Event Mean (μ)</h5>
                    <p>Take the average of all teams' mean scores.</p>
                    <div className="formula-display">μ = Sum of all team means / No. of Teams</div>
                  </div>
                </div>

                <div className="formula-step">
                  <div className="step-number-badge">5</div>
                  <div className="step-content">
                    <h5>Standard Deviation (σ)</h5>
                    <p>Measures spread of scores.</p>
                    <div className="formula-display">σ = √[Σ(Xᵢ - μ)² / N]</div>
                    <p className="small-text">where Xᵢ = mean score of each team, N = number of teams</p>
                  </div>
                </div>

                <div className="formula-step">
                  <div className="step-number-badge">6</div>
                  <div className="step-content">
                    <h5>Z-Score (per team)</h5>
                    <div className="formula-display">Z = (X - μ) / σ</div>
                    <p className="small-text">where X = team's mean score</p>
                  </div>
                </div>

                <div className="formula-step">
                  <div className="step-number-badge">7</div>
                  <div className="step-content">
                    <h5>Percentile (per team)</h5>
                    <p>Convert Z-score into a percentile using the normal distribution table (CDF).</p>
                    <div className="percentile-examples">
                      <p><strong>If Z = 0 →</strong> Percentile = 50%</p>
                      <p><strong>If Z = +1 →</strong> Percentile ≈ 84%</p>
                      <p><strong>If Z = -1 →</strong> Percentile ≈ 16%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="algorithm-card">
            <h3 className="algorithm-card-title">How It Works Step-by-Step</h3>
            <ol className="algorithm-steps-list">
              <li><strong>Calculate Judge Mean:</strong> Find the average score each judge gives across all their evaluations</li>
              <li><strong>Calculate Standard Deviation:</strong> Measure how much variation exists in each judge's scores</li>
              <li><strong>Compute Z-Scores:</strong> Apply the formula to convert raw scores to normalized Z-scores</li>
              <li><strong>Compare Fairly:</strong> Teams can now be compared regardless of which judge evaluated them</li>
              <li><strong>Generate Rankings:</strong> Sort teams by their normalized Z-scores for final rankings</li>
            </ol>
          </div>

          <div className="algorithm-card">
            <h3 className="algorithm-card-title">Worked Example</h3>
            <p className="algorithm-card-text">Here's a real scenario showing how Z-score normalization works:</p>
            <div className="example-table-container">
              <table className="example-table">
                <thead>
                  <tr>
                    <th>TEAM</th>
                    <th>JUDGE 1</th>
                    <th>JUDGE 2</th>
                    <th>JUDGE 3</th>
                    <th>MEAN</th>
                    <th>STD DEV</th>
                    <th>Z-SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Team A</td>
                    <td>85</td>
                    <td>90</td>
                    <td>75</td>
                    <td>83.33</td>
                    <td>7.64</td>
                    <td>0.22</td>
                  </tr>
                  <tr>
                    <td>Team B</td>
                    <td>92</td>
                    <td>95</td>
                    <td>88</td>
                    <td>91.67</td>
                    <td>3.51</td>
                    <td>1.31</td>
                  </tr>
                  <tr>
                    <td>Team C</td>
                    <td>78</td>
                    <td>82</td>
                    <td>70</td>
                    <td>76.67</td>
                    <td>6.03</td>
                    <td>-0.65</td>
                  </tr>
                  <tr>
                    <td>Team D</td>
                    <td>88</td>
                    <td>91</td>
                    <td>80</td>
                    <td>86.33</td>
                    <td>5.51</td>
                    <td>0.61</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="algorithm-example-box">
              <h4>Interpreting the Result:</h4>
              <p><strong>Positive Z-Score:</strong> Team performed better than the judge's average</p>
              <p><strong>Negative Z-Score:</strong> Team performed below the judge's average</p>
              <p><strong>Higher Z-Score = Better Performance</strong> relative to that judge's typical scoring</p>
              <p className="highlight-text">Final Ranking: Team B (1.31) → Team D (0.61) → Team A (0.22) → Team C (-0.65)</p>
            </div>
          </div>

          <div className="benefits-section">
            <h3 className="section-title-small">Benefits of Our Approach</h3>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h4>Fair Comparisons</h4>
                <p>Teams judged by different judges can be compared fairly</p>
              </div>
              <div className="benefit-card">
                <h4>Bias Correction</h4>
                <p>Automatically adjusts for harsh or lenient judges</p>
              </div>
              <div className="benefit-card">
                <h4>Statistical Rigor</h4>
                <p>Based on proven statistical methodology used in research</p>
              </div>
              <div className="benefit-card">
                <h4>Transparent</h4>
                <p>All calculations are documented and auditable</p>
              </div>
            </div>
          </div>

          <div className="algorithm-cta">
            <h2>See It In Action</h2>
            <p>Experience fair scoring with Score App</p>
            <button className="cta-large" onClick={() => navigate("/login")}>Try Demo Now</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AlgorithmPage;
