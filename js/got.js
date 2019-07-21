const gotCharacters = {
  data: [],
  init() {
    this.findAll();
  },
  findAll() {
    const request = new XMLHttpRequest(); // ez egy szinkron művelet
    request.onload = () => {
      this.setData(request.responseText); // innentől kezdve lesz benne adat
    };
    // request.onerror = () => {
    //   alert('Hiba a JSON fájl betöltésekor!');
    // };
    request.open('GET', '/json/got.json');
    request.send();
  },
  setData(userData) {
    this.data = JSON.parse(userData);
    this.showAll();
  },
  showAll() {
    this.arrangingByName();
    let characters = '';
    for (let i = 0; i < this.data.length; i += 1) {
      if (!this.data[i].dead && this.data[i].name !== 'Ned Stark') {
        characters += `<div class="characters">
                    <img src="${this.data[i].portrait}" alt="${this.data[i].name}">
                    <div>${this.data[i].name}</div>
                    </div>`;
      }
      document.querySelector('.listOfCharacters').innerHTML = characters;
    }
  },

  arrangingByName() {
    this.data.sort((first, second) => {
      if (first.name.toLowerCase() > second.name.toLowerCase()) {
        return 1;
      }
      if (first.name.toLowerCase() < second.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  },
};

gotCharacters.init();
