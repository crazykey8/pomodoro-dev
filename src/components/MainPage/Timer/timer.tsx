import React, {useEffect, useState} from 'react';
import {
    timer,
    timerHeader,
    timerHeaderTomato,
    timerHeaderTask,
    timerBody,
    timerBodyTimer,
    timerBodyTask,
    timerBodyForm
} from './timer.scss'
import {initialBreak, initialLongBreak, initialTime} from "../../../constants/time";
import {useAppSelector} from "../../../store/store";
import {getPadTime} from "../../../utils/getPadTime";
import IncTimeSvg from "./incTimeSvg";

function Timer() {

    const [time, setTime] = useState(initialTime)
    const [tomato, setTomato] = useState(1)
    const [mount, setMount] = useState(1)
    const [pauseCount, setPauseCount] = useState(1)
    const [state, setState] = useState('null') //  null / pause / work / break / long-break /

    const todo = useAppSelector(state => state.todo.list)

    const minutes = getPadTime(Math.floor(time / 60))
    const seconds = getPadTime(time - Number(minutes) * 60)

    const workState = state === 'work' || state === 'break' || state === 'long-break'
    const breakState = state === 'break' || state === 'long-break'

    function stateWork(): void {
        setState('work')
        setMount(mount + 1)
        if (time === 0) {
            setTime(initialTime)
            setTomato(tomato + 1)
            setPauseCount(pauseCount + 1)
        }
        if (mount % 4 === 0) {
            return stateBreak('long-break', initialLongBreak)
        }
        if (state === 'work') {
            return stateBreak('break', initialBreak)
        }
    }

    function stateBreak(name: string, initial: number): void {
        setState(name)
        setMount(mount + 1)
        if (time === 0) {
            setTime(initial)
            setTomato(tomato)
            setPauseCount(pauseCount + 1)
        }
        if (state === name) {
            return stateWork()
        }
    }

    function handleReset() {
        setTime(initialTime)
        setTomato(1)
        setState('null')
        setMount(1)
        setPauseCount(1)
    }

    useEffect(() => {
            const interval = setInterval(() => {
                if (workState) {
                    setTime((time) => (time >= 1 ? time - 1 : 0))
                }
            }, 1000)
            if (time === 0) {
                stateWork()
            }
            return () => {
                clearInterval(interval)
            }
        }, [time, state, tomato, workState]
    )

    return (
        <section className={timer}>
            <div className={timerHeader}>
                <p className={timerHeaderTask}>Сверстать сайт</p>
                <p className={timerHeaderTomato}>Помидор 1</p>
            </div>
            <div className={timerBody}>
                <div className={timerBodyTimer}>
                    <p>25:00</p>
                    <button>
                        <IncTimeSvg/>
                    </button>
                </div>
                <p className={timerBodyTask}>Сверстать сайт</p>
                <div className={timerBodyForm}>
                    <button>Старт</button>
                    <button>Стоп</button>
                </div>
            </div>
        </section>
    );
}

export default Timer;