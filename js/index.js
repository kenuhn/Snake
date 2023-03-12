export default () => {
  const canvas = document.querySelector(".canvas1");
  const ctx = canvas.getContext("2d");
  const positionXInitial = canvas.width / 2;
  const positionYInitial = canvas.height / 2;
  let ancienneValeur;
  let direction = "enBas";
  let ancienneDirection = null;
  let jeuxinterval;
  let serpent = [
    { x: positionXInitial, y: positionYInitial },
    { x: positionXInitial, y: positionYInitial - 20 },
    { x: positionXInitial, y: positionYInitial - 40 },
  ];

  let food = {
    coordoonee: [{x :null, y: null}],
  };
 
let elPoint = document.querySelector(".point")
let point = 0;
let gameOver = false 
  Interface();
  let coordooneFood = createFood();
  function Interface() {
    jeuxinterval = setInterval(gameLoop, 100);
  }

  function dessine(positionX, positionY, color) {
    ctx.beginPath();
    ctx.fillStyle = color ;
    ctx.fillRect(positionX, positionY, 20, 20);
    ctx.closePath();
  }
  function gameLoop() {

    collisionSerpent();
    loopDirection();
    collisionPlateau();
    collisionFood();
    
      document.addEventListener("keydown", (e) => {
        if(gameOver === false) {
      deplacement(e);
    }
    });
  }

  function loopDirection() {
    switch (direction) {
      case "enBas":
        vaBas();
        break;
      case "enHaut":
        vaHaut();
        break;
      case "aGauche":
        vaGauche();
        break;
      case "aDroite":
        vaDroite();
    }
  }

  function vaBas() {
    ancienneDirection = direction;
    direction = "enBas";
    serpent[0].y += 20;
    ancienneValeur = Object.assign({}, serpent[0]);
    ancienneValeur.y += -20;
    nouveauSerpent(ancienneValeur);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessineFood();
    serpent.forEach((segment) => {
      dessine(segment.x, segment.y, "green");
    });
  }

  function vaHaut() {
    ancienneDirection = direction;
    direction = "enHaut";
    serpent[0].y += -20;
    ancienneValeur = Object.assign({}, serpent[0]);
    ancienneValeur.y += 20;
    nouveauSerpent(ancienneValeur);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessineFood();
    serpent.forEach((segment) => {
      dessine(segment.x, segment.y, "green");
    });
  }

  function vaGauche() {
    ancienneDirection = direction;
    direction = "aGauche";
    serpent[0].x += -20;
    ancienneValeur = Object.assign({}, serpent[0]);
    ancienneValeur.x += 20;
    nouveauSerpent(ancienneValeur);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessineFood();
    serpent.forEach((segment) => {
      dessine(segment.x, segment.y, "green");
    });
  }

  function vaDroite() {
    ancienneDirection = direction;
    direction = "aDroite";
    serpent[0].x += 20;
    ancienneValeur = Object.assign({}, serpent[0]);
    ancienneValeur.x += -20;
    nouveauSerpent(ancienneValeur);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessineFood();
    serpent.forEach((segment) => {
      dessine(segment.x, segment.y, "green");
    });
  }

  function deplacement(e) {
    switch (e.key) {
      case "ArrowDown":
        if (direction !== "enHaut" && direction !== "enBas") {
          vaBas();
        }
        break;
      case "ArrowLeft":
        if (direction !== "aDroite" && direction !== "aGauche") {
          vaGauche();
        }
        break;
      case "ArrowRight":
        if (direction !== "aGauche" && direction !== "aDroite") {
          vaDroite();
        }

        break;
      case "ArrowUp":
        if (direction !== "enBas" && direction !== "enHaut") {
          vaHaut();
        }
        break;
      default:
        console.log("petit problème");
    }
  }

  function nouveauSerpent(ancienneValeur) {
    //on commence a partir de l'index 1 car l'index zero corrrespond à la tête
    let nouvelleValeur;
    for (let i = 1; i < serpent.length; i++) {
      nouvelleValeur = ancienneValeur;
      ancienneValeur = serpent[i];
      serpent[i] = nouvelleValeur;
    }
    return serpent;
  }

  function collisionSerpent() {
    for (let i = 1; i < serpent.length; i++) {
      if (serpent[0].x === serpent[i].x  && serpent[0].y === serpent[i].y ) {
        clearInterval(jeuxinterval);
        gameOver = true
      }
    }
  }

  function collisionPlateau() {
   
    for (let i = 0; i < serpent.length; i++) {
      if (
        serpent[0].x === 600 ||
        serpent[0].y === 400 ||
        serpent[0].x === -20 ||
        serpent[0].y === -20
      ) {
        console.log(serpent[0].x )
        clearInterval(jeuxinterval);
        gameOver = true;
        document.querySelector(".gameOver").style.display = "block";
      }
    }
  }

  function collisionFood() {
    serpent.forEach((segment) => {
      console.log(segment.x === food.coordoonee[0].x )
      if (food.coordoonee[0].x === segment.x && food.coordoonee[0].y === segment.y) {
        console.log("touche");
        coordooneFood = createFood();
        console.log(coordooneFood)
        ctx.clearRect(coordooneFood[0].x, coordooneFood[0].y, 20, 20);
        point += 20 
        elPoint.textContent = point + " :Points"
        let dernierSegment = serpent.length -1;
        serpent.push(dernierSegment)
       
      }
    });
  }

  function dessineFood() {
    dessine(coordooneFood[0].x, coordooneFood[0].y, "white");
  }
  function createFood() {
    const randomInRange = Math.floor(Math.random() * 20);
    let foodX = randomInRange * 20;
    let foodY = randomInRange * 20;
    food.coordoonee[0].x = foodX 
    food.coordoonee[0].y = foodY
    console.log(food.coordoonee);
    return food.coordoonee;
  }
};
