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
                    <img src="${this.data[i].portrait}" alt="${this.data[i].name}"
                         data-name="${this.data[i].name}" onclick="gotCharacters.search()">
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
  search() {
    const targetCharacter = event.target;
    const nameOfTargetCharacter = targetCharacter.getAttribute('data-name');
    for (let i = 0; i < this.data.length; i += 1) {
      if (this.data[i].name === nameOfTargetCharacter) {
        document.querySelector('.found').innerHTML = `<div>
        <img src="${this.data[i].picture}" alt="${this.data[i].name}" class="picture">
        <div class="name">${this.data[i].name}${this.houseOfCharacter(this.data[i])}</div>
        <div class="bio">${this.data[i].bio}</div>
        </div>`;
      }
    }
  },
  houseOfCharacter(character) {
    if (character.house !== undefined) {
      return `<img src="/assets/houses/${character.house}.png" class="ikon">`;
    }
    if (character.organization !== undefined) {
      return `<img src="/assets/houses/${character.organization}.png" class="ikon">`;
    }
    return '';
  },
  searchingForCharacter() {
    const searchedCharacter = document.querySelector('#searchBox').value;

    let i = 0;
    while (i < this.data.length && searchedCharacter.toLowerCase() !== this.data[i].name.toLowerCase()) {
      i += 1;
    }
    if (i < this.data.length) {
      document.querySelector('.found').innerHTML = `<div>
        <img src="${this.data[i].picture}" alt="${this.data[i].name}" class="picture">
        <div class="name">${this.data[i].name}${this.houseOfCharacter(this.data[i])}</div>
        <div class="bio">${this.data[i].bio}</div>
        </div>`;
      document.querySelector('#searchBox').value = '';
    } else {
      alert('Character not found');
      document.querySelector('#searchBox').value = '';
    }
  },
};
gotCharacters.init();
