const { useState } = React;

// About Me Page Component
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

// Upcoming Project Page Component
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

// Main App Component
const App = () => {
    const [activeTab, setActiveTab] = useState('about');

    return (
        <div className="app">
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">Evan Waite</div>
                    <div className="nav-tabs">
                        <button
                            className={`nav-tab ${activeTab === 'about' ? 'active' : ''}`}
                            onClick={() => setActiveTab('about')}
                        >
                            About Me
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'project' ? 'active' : ''}`}
                            onClick={() => setActiveTab('project')}
                        >
                            Upcoming Project
                        </button>
                    </div>
                </div>
            </nav>
            <main className="main-content">
                {activeTab === 'about' ? <AboutMe /> : <UpcomingProject />}
            </main>
        </div>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
