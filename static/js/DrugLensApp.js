
class DrugLensApp {
  constructor() {
  }

  async fetchUpdatedData() {
    try {
        const response = await fetch('/get-updated-response');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data === null || data.length === 0) {
          return;
        }
        // Do something with the data, e.g., update the DOM or store it in a variable
        console.log(data);
        const instructionText = document.getElementById("instruction");
        instructionText.textContent = data[0];
    } catch (error) {
        console.error("Error fetching updated data:", error);
    }
}

  handleBodyConditionKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey && event.target.value.trim() !== "") {
      event.preventDefault();
      console.log(event.target.value.trim())
      event.target.value = "";
    }
  }

  // handleEditNoteKeyDown(event) {
  //   if (event.key === 'Enter' && !event.shiftKey && event.target.value.trim() !== "") {
  //     event.preventDefault();
  //     this.noteWall.toggleNote()
  //     this.noteWall.addNote(event.target.value.trim());
  //     event.target.value = "";
  //     this.renderNotes();
  //   }
  // }

  // handleNoteDoubleClick(event) {
  //   if (event.target.classList.contains("note-text")) {
  //     this.noteWall.toggleNote(event.target.textContent)
  //     this.renderNotes();
  //   }
  // }

  // handleDeleteClick(event) {
  //   if(event.target.classList.contains("delete-btn")) {
  //     this.noteWall.deleteNote(event.target.textContent);
  //     this.renderNotes(); 
  //   }
  // }
  handleGetTeamInfo() {
    const information = document.getElementById("info")
    information.innerHTML = "<p> We are a Hophacks 2023 team composed of Chujian Yu, Lance Lian, Joanna Cheng and Kevin Huang</p> "
  }

  handleGetHomeInfo() {
    const information = document.getElementById("info")
    information.innerHTML = ""
  }

  handleGetAboutInfo() {
    const information = document.getElementById("info")
    information.innerHTML = "<p> This is an app that helps you to get instruction on a medication simply by taking a photo of the bottle </p>"
  }

  handleTakeImage() {
    const liveWindow = document.getElementById("live-window")
    liveWindow.classList.add("center-container")
    liveWindow.classList.remove("hidden")
    const instruction = document.getElementById("take-picture-instruction")
    instruction.classList.remove("hidden") 
    instruction.classList.add("center-container")
  }

  handleSpeech() {
    const text = "what is the temperature in Sydney";
      const speechSynthesis = window.speechSynthesis;

      if (speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
      } else {
        alert('Text-to-speech is not supported in this browser.');
      }
      console.log("done speaking")
  }


  init() {
    
    document
      .getElementById("body-condition-text")
      .addEventListener("keydown", this.handleBodyConditionKeyDown.bind(this));
    document
      .getElementById("team")
      .addEventListener("click", this.handleGetTeamInfo.bind(this));
    document
      .getElementById("about")
      .addEventListener("click", this.handleGetAboutInfo.bind(this));
    document
      .getElementById("home")
      .addEventListener("click", this.handleGetHomeInfo.bind(this));
    document
      .getElementById("taking-img")
      .addEventListener("click", this.handleTakeImage.bind(this));
    document
      .getElementById("logo-img")
      .addEventListener("click", this.handleSpeech.bind(this));
    // document
    //   .getElementById("notes-wall")
    //   .addEventListener("dblclick", this.handleNoteDoubleClick.bind(this));
      // document
      // .getElementById("notes-wall")
      // .addEventListener("keydown", this.handleEditNoteKeyDown(this));
      // document
      // .getElementsByClassName("delete-btn")
      // .addEventListener("click", this.handleDeleteClick(this));
      this.fetchUpdatedData = this.fetchUpdatedData.bind(this);
      setInterval(this.fetchUpdatedData, 5000);
  }
}

export default DrugLensApp;