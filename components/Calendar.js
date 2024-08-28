'use client';
import { Gradients, baseRating } from "@/utils";
import { Fugaz_One } from "next/font/google";
import { Component, useEffect, useState } from "react";
import MoodNoteModal from "./MoodNoteModal";

// months
const months = {"January":"Jan", "February":"Feb", "March":"Mar", "April":"Apr", "May":"May", "June":"Jun", "July":"Jul", "August":"Aug",
    "September":"Sept", "October":"Oct", "November":"Nov", "December":"Dec"};

const monthsArr = Object.keys(months);

// days
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// font
const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});

// Component
const Calendar = (props) => {
    // accessing props passed
    const {demo, data} = props;
    
    // current date
    const now = new Date();
    const [mood, setMood] = useState(0);
    const [selectedMonth, setselectedMonth] = useState(Object.keys(months)[now.getMonth()]);
    const [selectedYear , setSelectedYear] = useState(now.getFullYear());
    const numMonth = monthsArr.indexOf(selectedMonth);


    const dataToUse = data?.[selectedYear]?.[numMonth] || {};

    // creating a date for the first day of current month
    const monthNow = new Date(selectedYear,numMonth,1);
    // day of the week on which we have the first day of the month 
    const FirstdayOfMonth = monthNow.getDay();
    // calculating the total day in month by getting the last date of the month
    const daysInMonth = new Date(selectedYear, numMonth+1,0).getDate();

    // calculating the days which we have to display for the calendar for a month
    const daysToDisplay = FirstdayOfMonth + daysInMonth;
    /*
    calucalting the number of rows to display according to 7 days of the week
    since we are dividing the daysToDisplay by 7 and using floor to get the integer if the daysToDisplay is not divisible by 7
    then to include the last remaing day we are checking the mod and adding 1 or 0 based on it 
    */
    const noOfRows = (Math.floor(daysToDisplay/7)) + (daysToDisplay % 7 ? 1 : 0);

    // function to handle calender
    const handleCalender = (val) => {
        if(numMonth + val < 0){
            setSelectedYear(curr => curr - 1);
            setselectedMonth(monthsArr[monthsArr.length - 1])
            console.log(selectedMonth);
        }
        else if(numMonth + val > 11){
            setSelectedYear(curr => curr + 1);
            setselectedMonth(monthsArr[0])
        }
        else{
            setselectedMonth(monthsArr[numMonth + val])
        }
    }


    
    return (
        <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <button onClick={() => handleCalender(-1)} className="text-lg sm:text-xl mr-auto text-indigo-600 fill-indigo-300 hover:opacity-60"><i className="bi bi-arrow-left-circle"></i></button>
                <p className={`mx-auto textgradient text-center text-sm sm:text-base ${fugaz.className}`}>{selectedMonth}, {selectedYear}</p>
                <button onClick={() => handleCalender(+1)} className="text-lg sm:text-xl ml-auto text-indigo-600 hover:opacity-60"><i className="bi bi-arrow-right-circle"></i></button>
            </div>
            <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-8 md:py-10">
                {[...Array(noOfRows).keys()].map((row,rowIndex) => (
                    <div key={rowIndex} className="flex gap-1">
                        {days.map((dayOfTheWeek,dayOfTheWeekIndex) => {
                            const dayIndex = (rowIndex*7) + dayOfTheWeekIndex - (FirstdayOfMonth-1); 

                            const dayDisplay = dayIndex > daysToDisplay ? 
                                            false : (row === 0 && dayOfTheWeekIndex < FirstdayOfMonth) ? false : true;
                            
                                            
                            const isToday = dayIndex === now.getDate();
                            
                            // deciding the color of the background for each day block
                            const color = demo ? Gradients.indigo[baseRating[dayIndex]] :
                                        dayIndex in dataToUse ? 
                                        Gradients.indigo[dataToUse[dayIndex]] : 
                                        'white';

                            if (!dayDisplay){
                                return (
                                    <div key={dayOfTheWeekIndex} className="bg-white p-2 border border-white flex-1 flex justify-center"></div>
                                )
                            }
                            else{
                                return (
                                    <div key={dayOfTheWeekIndex} style={{background: color}} className={`p-2 text-xs sm:text-sm flex-1 flex justify-between items-center rounded-lg border ${isToday ? 'border-indigo-400' : 'border-indigo-100'} ${color === 'white' ? 'text-indigo-500' : 'text-white'}`}>
                                        <p>{dayIndex}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Calendar