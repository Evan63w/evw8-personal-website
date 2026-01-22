const { useState } = React;

//====================
// About Me Page Component
//====================
const AboutMe = () => {
    return (
        <div className="page-content">
            <div className="content-wrapper">
                <h1 className="page-title">About Me</h1>
                <div className="card">
                    <p className="intro-text">
                        Hi! My name is Evan and I am a software developer, fitness enthusiast, and book enjoyer.
                    </p>
                    <div className="info-section">
                        <h2>Background</h2>
                        <p>
                            I studied Computer Engineering at Northwestern University, and earned a Master's Degree in Computer Science from Northwestern before joining Amazon.
                        </p>
                    </div>
                    <div className="info-section">
                        <h2>Skills & Interests</h2>
                        <ul className="skills-list">
                            <li>Big Data Jobs</li>
                            <li>AWS</li>
                            <li>Strands Agents and Workflows Orchestrated by AI Agents</li>
                            <li>Sustainable Software Development Practices</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

//====================
// Upcoming Project Page Component
//====================
const UpcomingProject = () => {
    return (
        <div className="page-content">
            <div className="content-wrapper">
                <h1 className="page-title">Upcoming Project</h1>
                <div className="card">
                    <div className="project-header">
                        <h2>Pokemon Card Collection Price Tracker</h2>
                        <span className="status-badge">In Development</span>
                    </div>
                    <div className="info-section">
                        <h3>Overview</h3>
                        <p>
                            I will be using the TCGPlayer API, AWS Lambda/API Gateway, and AWS DynamoDB to
                            build something that I've always wanted for myself - a way to track prices of my collection.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Key Features</h3>
                        <ul className="features-list">
                            <li>User Authentication</li>
                            <li>RESTful APIs</li>
                            <li>Price-over-time tracking</li>
                            <li>The ability to add/remove cards</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Timeline</h3>
                        <p>
                            Expected launch: Q2 2026. Stay tuned for updates as we progress through
                            development and testing phases.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

//====================
// Resume Page Component
//====================
const Resume = () => {
    const resumeUrl = "https://drive.google.com/uc?export=download&id=1botocWra60YxQvDDklT75ayXgrf5CntY";

    return (
        <div className="page-content">
            <div className="content-wrapper">
                <h1 className="page-title resume-title">Resume</h1>
                <div className="card resume-card">
                    <p className="resume-text">
                        You can download my latest resume here:
                    </p>
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-button"
                    >
                        Download Resume
                    </a>
                </div>
            </div>
        </div>
    );
};

//====================
// Random Page Component
//====================
const Random = () => {
    return (
        <div className="page-content">
            <div className="content-wrapper">
                <h1 className="page-title">Random</h1>

                {/* Books Cell */}
                <div className="random-cell">
                    <h2>Books I've Read Lately</h2>
                    <ul className="book-list">
                        <li>"Rose Code" -  Kate Quinn</li>
                        <li>"The Pelican Brief" - John Grisham</li>
                        <li>"English Assassin" - Daniel Silva</li>
                        <li>"On the Hippie Trail" - Rick Steves</li>
                        <li>"A Court of Thorns and Roses" - Sarah J Maas</li>
                    </ul>
                </div>

                {/* Pokémon Event Cell */}
                {/* Pokémon Event Cell */}
                <div className="random-cell">
                    <h2>2026 Pokémon VGC Seattle Regional Team</h2>
                    <p>I am looking forward to competing in this event!</p>
                    <div className="pokemon-images">
                        <img src="727-0.png" alt="Pokemon 1" className="img-pokemon" />
                        <img src="812-0.png" alt="Pokemon 2" className="img-pokemon" />
                        <img src="892-1.png" alt="Pokemon 3" className="img-pokemon" />
                        <img src="987-0.png" alt="Pokemon 4" className="img-pokemon" />
                        <img src="250px-1021Raging_Bolt.png" alt="Pokemon 5" className="img-pokemon" />
                        <img src="600px-1017Ogerpon-Hearthflame_Mask.png" alt="Pokemon 6" className="img-pokemon" />
                    </div>
                </div>
                {/* Dishes Cell */}
                <div className="random-cell">
                    <h2>Dishes I've Made Lately</h2>
                    <p>Here are some dishes I’ve been cooking recently:</p>
                    <div className="dish-images">
                        ...under construction
                        {/* Add more dish images as needed */}
                    </div>
                </div>

            </div>
        </div>
    );
};

//====================
// Main App Component
//====================
const App = () => {
    const [activeTab, setActiveTab] = useState('about');

    return (
        <div className="app">
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">Evan Waite</div>
                    <div className="nav-tabs">
                        <button className={`nav-tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About Me</button>
                        <button className={`nav-tab ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => setActiveTab('resume')}>Resume</button>
                        <button className={`nav-tab ${activeTab === 'random' ? 'active' : ''}`} onClick={() => setActiveTab('random')}>Random</button>
                        <button className={`nav-tab ${activeTab === 'project' ? 'active' : ''}`} onClick={() => setActiveTab('project')}>Upcoming Project</button>
                    </div>
                </div>
            </nav>
            <main className="main-content">
                {activeTab === 'about' && <AboutMe />}
                {activeTab === 'resume' && <Resume />}
                {activeTab === 'random' && <Random />}
                {activeTab === 'project' && <UpcomingProject />}
            </main>
        </div>
    );
};

//====================
// Render the app
//====================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
