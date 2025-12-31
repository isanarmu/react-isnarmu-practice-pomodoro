import React, { useEffect, useState } from "react"

export const PomodoroTimer = () => {

    const [timeLeft, setTimeLeft] = useState(20 * 60);
    const [timeRunning, setTimeRunning] = useState(false)
    const [sessionType, setSessionType] = useState('focus');
    const [sessionCount, setSessionCount] = useState(1);

    const SESSION_TIMES = {
        focus: 20 * 60,
        shortBreak: 5 * 60,
        longBreak: 20 * 60

    };

    const formatTime = (totalSeconds) => {

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    }

    useEffect(() => {
        let interval;

        if (timeRunning) {
            interval = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timeRunning])

    const toggleTimer = () => {
        setTimeRunning(!timeRunning);
    }

    const resetSession = () => {
        setTimeLeft(SESSION_TIMES[sessionType]);
        setTimeRunning(false);
    }

    const skipSession = () => {

        let nextType;

        if (sessionCount < 4) {
            nextType = sessionCount % 2 === 1 ? 'shortBreak' : 'focus';
            setSessionCount(sessionCount + 1);
        } else {
            nextType = 'longBreak';
            setSessionCount(1);
        }
        setSessionType(nextType);
        setTimeLeft(SESSION_TIMES[nextType]);
        setTimeRunning(false)
    }

    return (
        <div className="pomodoro-container">
            <div className="timer-card">
                <div className="session-info">
                    <span className="session-badge">
                        Session {sessionCount} of 4
                    </span>
                    <span className="session-type">
                        {sessionType === 'focus' ? 'FOCUS' :
                            sessionType === 'shortBreak' ? 'SHORT BREAK' : 'LONG BREAK'}
                    </span>
                </div>
                <h1 className="timer-display">{formatTime(timeLeft)}</h1>
                <div className="controls">
                    <i className="control-icon fa-solid fa-clock-rotate-left" onClick={resetSession} /> 
                    <button className={`main-btn ${timeRunning ? 'pause' : 'start'}`} onClick={toggleTimer}>
                        {timeRunning ? <i className="fa-solid fa-pause"></i> :<i className="fa-solid fa-play"></i> }
                    </button>
                    <i className="control-icon fa-solid fa-forward" onClick={skipSession}/>                      
                </div>
            </div>
        </div>
    );

}