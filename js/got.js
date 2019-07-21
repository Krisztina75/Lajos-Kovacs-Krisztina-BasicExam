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
    // console.log(this.data);
    this.showAll();
  },
  showAll() {
    let pictures = '';
    for (let i = 0; i < this.data.length; i += 1) {
      if (!this.data[i].dead && this.data[i].name !== 'Ned Stark') {
        pictures += `<div class="pictures">
                    <img src="${this.data[i].portrait}" alt="${this.data[i].name}">
                    <div>${this.data[i].name}</div>
                    </div>`;
      }
      document.querySelector('.characters').innerHTML = pictures;
    }
  },
};

gotCharacters.init();
