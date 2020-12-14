const d = document;

export default function speechReader() {
    const $speechSelect = d.querySelector('#speech-select'),
        $speechTextarea = d.querySelector('#speech-text'),
        $speechBtn = d.querySelector('#speech-btn'),
        speechMessage = new SpeechSynthesisUtterance();

    let voices = [];

    d.addEventListener('DOMContentLoaded', (e) => { // En Firefox se resuelve con promise

        const allVoicesObtained = new Promise((resolve, reject) => {
            voices = speechSynthesis.getVoices();

            if (voices.length !== 0) {
                resolve(voices);
            } else {
                speechSynthesis.addEventListener('voiceschanged', (e) => {
                    voices = speechSynthesis.getVoices();
                    resolve(voices);
                });
            }
        });

        allVoicesObtained.then((voices) => {
            // console.log("All voices:", voices)
            voices.forEach((voice) => {
                const $option = d.createElement('option');
                $option.value = voice.name;
                $option.textContent = `${voice.name} - ${voice.lang}`;
    
                $speechSelect.appendChild($option);
            });
        });
    });

    d.addEventListener('change', (e) => {
        if (e.target === $speechSelect) {
            speechMessage.voice = voices.find((voice) => voice.name === e.target.value);
            // console.log(speechMessage);
        }
    });

    d.addEventListener('click', (e) => {
        if (e.target === $speechBtn) {
            speechMessage.text = $speechTextarea.value;
            speechSynthesis.speak(speechMessage);
        }
    });
}