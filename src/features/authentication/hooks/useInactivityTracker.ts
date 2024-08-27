import {useCallback, useEffect, useRef, useState} from 'react';
import useAuth from "./useAuth.ts";
import {useNavigate} from "react-router-dom";
import {useApiAuth} from "../../../api/apiAuth.ts";

const MAX_INACTIVE_TIME_SEC = 5;

const useInactivityTracker = () => {
    const [inactiveTime, setInactiveTime] = useState<number>(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const {auth} = useAuth();
    const navigate = useNavigate();
    const {logout} = useApiAuth();

    const resetInactiveTime = useCallback(() => {
        setInactiveTime(0);
    }, []);
    
    const startInactivityTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setInactiveTime(prev => {
                const newInactiveTime = prev + 1;
                if (newInactiveTime > MAX_INACTIVE_TIME_SEC) {
                    logout();
                    console.log("Auth: ", auth);
                    navigate("/login");
                }
                return newInactiveTime;
            });
        }, 1000);
    }, [auth, logout, navigate]);

    useEffect(() => {
        if (!auth.username) {
            return;
        }
        const handleUserActivity = () => {
            resetInactiveTime();
            startInactivityTimer();
        };
        
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        // Uruchom timer przy montowaniu komponentu
        startInactivityTimer();

        // Wyczyść nasłuchiwanie zdarzeń przy odmontowaniu komponentu
        return () => {
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [auth.username, resetInactiveTime, startInactivityTimer]);

    return { inactiveTime };
};

export default useInactivityTracker;
