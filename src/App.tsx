import React, {useEffect, useState} from 'react';

function App() {
    const initialTime = 5

    const [time, setTime] = useState(initialTime)
    const [mount, setMount] = useState(false)
    const [tomato, setTomato] = useState(1)
    const [hide, setHide] = useState(true)

    function getPadTime(time: number) {
        return time.toString().padStart(2, '0')
    }

    const minutes = getPadTime(Math.floor(time / 60))
    const seconds = getPadTime(time - Number(minutes) * 60)

    useEffect(() => {
        const interval = setInterval(() => {
            if (mount) {
                setTime((time) => (time >= 1 ? time - 1 : 0))
            }
        }, 1000)
        if (time === 0) handleReset()
        return () => {
            clearInterval(interval)
        }
    }, [time, mount])

    function startTimer() {
        setMount(true)
        setHide(false)
    }

    function handleStart() {
        if (time === 0) setTime(initialTime)
        setMount(true)
    }

    function handlePause() {
        setMount(false)
    }

    function handleReset() {
        setMount(false)
        setTime(initialTime)
        setTomato(1)
        setHide(true)
    }

    function handleAddTomato() {
        setTomato(tomato + 1)
        setTime(time + 60)
    }

    return (
        <div>
            <div className="mb-10 p-10 flex justify-center container mx-auto border-solid border-2 border-sky-500">
                <span className="p-3 mr-5 border-solid border-2 border-sky-500">Задача</span>
                <span className="p-3 border-solid border-2 border-sky-500">Помидоров {tomato}</span>
            </div>
            <div
                className={`mb-10 p-10 flex justify-center container mx-auto border-solid border-2 ${hide ? 'border-sky-500' : (mount ? 'border-red-500' : 'border-green-500')}`}>
                <span className="text-6xl font-bold">
                    {minutes}:{seconds}
                </span>
                <button className="ml-5 p-3 border-solid border-2 border-sky-500"
                        onClick={handleAddTomato}>+
                </button>
            </div>
            <div className="mb-10 p-10 flex justify-center container mx-auto border-solid border-2 border-sky-500">
                {hide &&
                    <button className="p-3 mr-5 border-solid border-2 border-green-500"
                            onClick={startTimer}>Старт</button>
                }
                {!hide && (mount ?
                    <button className="p-3 mr-5 border-solid border-2 border-green-500"
                            onClick={handlePause}>Пауза</button>
                    :
                    <button className="p-3 mr-5 border-solid border-2 border-green-500"
                            onClick={handleStart}>Продолжить</button>)

                }
                {hide &&
                    <button className="p-3 border-solid border-2 border-gray-500"
                            onClick={startTimer}>Стоп</button>
                }
                {!hide && (mount ?
                        <button className={`p-3 border-solid border-2 border-red-500`}
                                onClick={handleReset} disabled={!mount}>Стоп
                        </button> :
                        <button className={`p-3 border-solid border-2 ${'border-red-500'}`}
                                onClick={handleReset}>Сделано
                        </button>
                )}
            </div>
            <div className="mb-10 p-10 container mx-auto border-solid border-2 border-sky-500">
                <div className="flex justify-center container mx-auto">
                    <input className="p-2 border-solid border-2 border-sky-500" type="text"/>
                    <button className="p-2 ml-3 border-solid border-2 border-sky-500">Добавить</button>
                </div>
                <ul className="border-solid border-2 border-sky-500 mt-3">
                    <li className="p-3">Задача</li>
                </ul>
            </div>
        </div>
    );
}

export default App;
