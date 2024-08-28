'use client';
import { Fugaz_One } from 'next/font/google';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Calendar from './Calendar';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Login from './Login';
import Loading from './Loading';

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});

const Dashboard = () => {
  const [data, setData] = useState({});
  const {currentUser, userDataObj, setUserDataObj, loading} = useAuth();
  const now = new Date();
  

  // function to calculate streak and average mood
  function calculateStatusData(){
    let sum_of_moods = 0;
    let total_number_of_days = 0;
    Object.keys(data).forEach(year => {
      Object.keys(data[year]).forEach(month => {
        Object.keys(data[year][month]).forEach(day => {
          if(data[year][month][day] != 0){
            sum_of_moods += data[year][month][day];
            total_number_of_days+= 1;
          }

        })
      })
    })
    return {"Num days" :total_number_of_days, "Average Mood":(sum_of_moods/total_number_of_days).toFixed(2)};
  }
  
  const statuses = {
    ...calculateStatusData(),
    "Time Remaining" : `${23 - now.getHours()}H ${60 - now.getMinutes()}M`
  };



  // function to setMood for a particular day of month of the year and storing the updated data locally, globally and on cloud db
  async function handleSetMood(mood){
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    
    try {
      const newData = { ...userDataObj };
      // checking if the current year is not there in newData
      if(!(year in newData)){
        newData[year] = {}
      }
      // checking if the current month is not there in newData in current year
      if(!(month in newData[year])){
        newData[year][month] = {}
      }

      // setting the value of mood for the particular day of month of year
      newData[year][month][day] = mood
      
      // update the local state
      setData(newData);
      // update the global state
      setUserDataObj(newData);
      // update the firestore db 
      const docRef = doc(db,'users',currentUser.uid)
      const res = await setDoc(docRef,{
        [year]:{
          [month]:{
            [day]:mood
          }
        }
      }, {merge: true});
    }catch(error){
      console.log(`Failed to set data: ${error.message}`)
    }
  }

  
  const moods = {
    "😭": "&*@#$",
    "🥲": "Sad",
    "😶" : "Existing",
    "😊":"Good",
    "😍":"Elated"
  };

  useEffect(() => {
    if (!currentUser || !userDataObj){
      return
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading){
    return <Loading />
  }

  if (!currentUser){
    return <Login />
  }


  return (
    <section className='flex-1 flex flex-col gap-8 sm:gap-12 md:gap-16 min-h-screen'>
      <div className='bg-indigo-50 p-4 flex justify-between gap-2 text-indigo-500 text-xs sm:text-sm font-medium rounded-lg'>
        {Object.keys(statuses).map((status,statusIndex) => {
          
          return (
            <div key={statusIndex} className='flex-1 flex flex-col gap-1 sm:gap-2'>
              <p>{status}</p>
              <p className={`text-base sm:text-lg ${fugaz.className}`}>{statuses[status]} {status === "Num days" ? " 🔥" : ""}</p>
            </div>
          )  
        })}
      </div>
      <div className='text-center'>
        <h1 className={`text-5xl sm:text-6xl md:text-7xl text-slate-800 ${fugaz.className}`}>How do you <span className='textgradient'>feel</span> today?</h1>
      </div>
      <div className='flex flex-wrap items-stretch gap-4'>
        {
          Object.keys(moods).map((mood,moodIndex) => (
            <button onClick={() => {
              handleSetMood(moodIndex+1)
            }} key={moodIndex} className='p-4 flex-1 flex flex-col items-center gap-2 bg-indigo-50 hover:bg-indigo-100 rounded-2xl duration-200 purpleshadow'>
              <p className='text-4xl sm:text-5xl md:text-6xl'>{mood}</p>
              <p className={`text-xs sm:text-sm md:text-base text-indigo-500 ${fugaz.className}`}>{moods[mood]}</p>
            </button>
          ))
        }
      </div>

      {/* calendar component */}
      <Calendar data = {data} handleSetMood = {handleSetMood} />
    
    </section>
  )
}

export default Dashboard