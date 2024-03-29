import React, {useEffect, useState} from 'react';
import SettingsSvg from "./SettingsSvg";
import Modal from "../../Other/Modal/modal";
import {
    modalSettingsFooter,
    modalSettingsFooterButton,
    modalSettingsBodyContent,
    modalSettingsBody
} from './settings.scss'

function Settings() {
    const [modalSettings, setModalSettings] = useState(false)
    const [inputWork, setInputWork] = useState(JSON.parse(localStorage.getItem('work-time')) || 25)
    const [inputBreak, setInputBreak] = useState(JSON.parse(localStorage.getItem('break-time')) || 5)
    const [inputLongBreak, setInputLongBreak] = useState(JSON.parse(localStorage.getItem('long-break-time')) || 30)

    useEffect(() => {
        localStorage.setItem("work-time", JSON.stringify(inputWork));
        localStorage.setItem("break-time", JSON.stringify(inputBreak));
        localStorage.setItem("long-break-time", JSON.stringify(inputLongBreak));
    }, [inputWork, inputBreak, inputLongBreak]);

    function handleDefault() {
        setInputWork(25)
        setInputBreak(5)
        setInputLongBreak(30)
    }

    return (
        <li>
            <button onClick={() => setModalSettings(true)}>
                <div>
                    <SettingsSvg/>
                    <span>Настройки</span>
                </div>
            </button>
            {modalSettings &&
                <Modal isActive={modalSettings} setModal={setModalSettings} title={"Настройки"} footer={
                    <div className={modalSettingsFooter}>
                        <p>После изменения настроек не забудьте перезагрузить страницу</p>
                        <button className={modalSettingsFooterButton} onClick={handleDefault}>По
                            умолчанию
                        </button>
                    </div>
                }>
                    <div className={modalSettingsBody}>
                        <div className={modalSettingsBodyContent}>
                            <p>Один помидор</p>
                            <input type="number" min={1} max={99} value={inputWork}
                                   onChange={(e) => setInputWork(e.target.valueAsNumber)}/>
                        </div>
                        <div className={modalSettingsBodyContent}>
                            <p>Короткий перерыв</p>
                            <input type="number" min={1} max={99} value={inputBreak}
                                   onChange={(e) => setInputBreak(e.target.valueAsNumber)}/>
                        </div>
                        <div className={modalSettingsBodyContent}>
                            <p>Длинный перерыв</p>
                            <input type="number" min={1} max={99} value={inputLongBreak}
                                   onChange={(e) => setInputLongBreak(e.target.valueAsNumber)}/>
                        </div>
                    </div>
                </Modal>
            }
        </li>
    )
}

export default Settings;