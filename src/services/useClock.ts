import { useState, useEffect } from 'react';

export function useClock() {
    const greetArr = ["Good Morning", "Hello", "Good Evening"];
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");


    useEffect(() => {
        let date = new Date();
        let hourOfDay = date.getHours();
    
        let greeting;
        if (hourOfDay >= 0 && hourOfDay < 12) {
            greeting = greetArr[0];
        } else if (hourOfDay >= 12 && hourOfDay <= 18) {
            greeting = greetArr[1];
        } else {
            greeting = greetArr[2];
        }
        
        setTime(greeting); // show greeting instead of time for the first few seconds


        const dateInterval = setInterval(() => {
            let currentDate = new Date();
            setDate(
                 new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(currentDate) + "," + 
                 new Intl.DateTimeFormat("en-GB", { month: "long" }).format(currentDate) + "," + 
                 currentDate.getDate() + "," + 
                 currentDate.getFullYear()
            );

        }, 1000);
        
        const myTimeout = setTimeout(() => {

            const myInterval = setInterval(() => {

                const formattedTime = new Intl.DateTimeFormat("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }).format(new Date());
                setTime(formattedTime);

            }, 1000);
            return () => clearInterval(myInterval);

        }, 3000);

        return () => {
            clearInterval(myTimeout);
            clearInterval(dateInterval);
        }
    }, []);

    return { date, time };
}

