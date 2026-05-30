import React from "react";
import { BallCanvas } from "./canvas";

const SkillCard = ({ technology }) => {
  // Extract score from technology object (defaults to 75 if not provided)
  const score = technology.score || 75;

  return (
    <div className="skill-card-wrapper">
      <style>{`
        .skill-card-wrapper {
          position: relative;
          width: 280px;
          height: 320px;
        }

        .skill-card {
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.8);
          border: 2px solid rgba(255, 106, 0, 0.3);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 106, 0, 0.2),
            transparent
          );
          transition: left 0.5s ease;
          pointer-events: none;
        }

        .skill-card:hover {
          border-color: rgba(255, 106, 0, 0.8);
          box-shadow: 0 0 20px rgba(255, 106, 0, 0.5), 
                      inset 0 0 20px rgba(255, 106, 0, 0.1);
          transform: translateY(-5px);
        }

        .skill-card:hover::before {
          left: 100%;
        }

        .skill-ball-container {
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skill-name {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          text-align: center;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Poppins', sans-serif;
        }

        .skill-score {
          font-size: 14px;
          font-weight: 500;
          color: #ff6a00;
          text-align: center;
          font-family: 'Rajdhani', monospace;
        }

        /* Wave animation effect */
        .skill-card {
          animation: subtleWave 3s ease-in-out infinite;
        }

        @keyframes subtleWave {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .skill-card:hover {
          animation: none;
        }
      `}</style>

      <div className="skill-card">
        <div className="skill-ball-container">
          <BallCanvas icon={technology.icon} name={technology.name} score={score} />
        </div>
        <div className="skill-name">{technology.name}</div>
        <div className="skill-score">Proficiency: {score}%</div>
      </div>
    </div>
  );
};

export default SkillCard;
