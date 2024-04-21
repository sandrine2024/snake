const canvas = document.querySelector("canvas") //Sélectionne l'élément canvas
const context = canvas.getContext('2d')  //Obtient le contexte 2D du canvas

let box = 20
// Taille d'une case du jeu

let snake = [];  //Tableau pour stocker les coordonnées du serpent
snake[0] = { x: 10*box, y: 10*box } 
// Initialise la position du serpent

let food = {  //Initialise la position de la nourriturE
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let score = 0  //Initialise le score du joueur

let d  //Variable pour stocker la direction du serpent

document.addEventListener("keydown", direction);
// Ajoute un écouteur d'événements pour les touches fléchées

function direction(event){
    let key = event.keyCode;
    if(key == 37 && d != "RIGHT"){
        d = "LEFT";  //Si la touche gauche est pressée  et pas à droite ALORS TOURNE A GAUCHE
    }else if (key == 38 && d != "DOWN"){
        d = "UP";  //Si la touche HAUT est pressée ET pas vers le bas ALORS MONTE EN HAUT
    }else if (key == 39 && d != "LEFT"){
        d = "RIGHT";  //Si la touche droite est pressée et  pas à gauche ALORS TOURNE A DROITE
    }else if (key == 40 && d != "UP"){
        d = "DOWN"; //Si la touche BAS est pressée ET pas vers le HAUT ALORS DESCEND EN BAS
    }
}

function draw(){
    context.clearRect(0, 0, 400, 400)
    // Efface le canvas

    for(let i = 0; i < snake.length; i++){ //Dessine le serpent
        context.fillStyle = (i ==0) ? "green" : "white"  //Couleur du serpent
        context.fillRect(snake[i].x, snake[i].y, box, box) //Remplit un rectangle pour chaque segment du serpent
        context.strokeStyle = "red"  //Couleur de la bordure
        context.strokeRect(snake[i].x, snake[i].y, box, box)  //Dessine la bordure du serpent
    }

    context.fillStyle = "orange"  //Couleur de la nourriture
    context.fillRect(food.x, food.y, box, box);  //Dessine la nourriture

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    } else {
        snake.pop()
        // Supprime la dernière case du serpent
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if(snakeX < 0 || snakeY < 0 || snakeX > 19*box || snakeY > 19*box || collision(newHead, snake)) {
        clearInterval(game);
        alert("Perdu !")
    }
    // Si l’une de ces conditions est vraie, arrête le jeu avec clearInterval(game) et affiche une alerte “Perdu !”

    snake.unshift(newHead);

    context.fillStyle = "red"
    context.font = "30px Arial"
    context.fillText(score, 2*box, 1.6*box)
}
// Définit la couleur du texte en rouge et la police à “30px Arial” pour afficher le score sur le canvas avec context.fillText(score, 2*box, 1.6*box).

function collision(head, array){
    for(let g = 0; g < array.length; g++){
        if(head.x == array[g].x && head.y == array[g].y){
            return true;
        }
    }
    return false
}

let game = setInterval(draw,100)
