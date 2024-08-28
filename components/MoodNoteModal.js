'use client';
import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});

const MoodNoteModal = (props) => {
    const {setIshidden, note} = props;
    const [isDisabled, setIsDisabled] = useState(true);
    const [moodNote, setMoodNote] = useState(note || "");


    return (
        <div className="w-full h-full fixed top-0 left-0 bg-indigo-200 bg-opacity-50">
            <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="translate-y-1/3 fixed top-0 right-0 left-0 z-50 justify-center items-center max-w-[400px] mx-auto w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 rounded-xl">
                            <h3 className={`text-2xl sm:text-3xl font-semibold textgradient ${fugaz.className}`}>
                                Mood Note
                            </h3>
                            <button onClick={() => setIshidden(true)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="flex flex-col p-4 md:p-5 space-y-4">
                            <p className='text-indigo-600 text-xl'>{moodNote}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoodNoteModal