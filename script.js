const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Set the default text on load
msg.text = document.querySelector('[name="text"]').value;

// Fetch and populate the voices dropdown
function populateVoices() {
  voices = this.getVoices();
  
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set the selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle(); 
}

// Play and Stop functionality
function toggle(startOver = true) {
  speechSynthesis.cancel();
  
  if (startOver && msg.text.trim() !== '') {
    speechSynthesis.speak(msg);
  }
}

// Handle changes to Rate, Pitch, and Text input
function setOption() {
  msg[this.name] = this.value;
  toggle(); 
}

// --- Event Listeners ---
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));