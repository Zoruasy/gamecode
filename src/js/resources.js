import { ImageSource, Loader } from "excalibur";

// Define image resources
const dragonImage = new ImageSource('images/dragon.png');
const spaceshipImage = new ImageSource('images/spaceship.png');
const bulletImage = new ImageSource('images/bullet.png');
const laserImage = new ImageSource('images/laser.png');
const backgroundImage = new ImageSource('images/background.png');
const buttonImage = new ImageSource('images/button.png');
const gameLogoImage = new ImageSource('images/gamelogo.png');
const gameOverImage = new ImageSource('images/gameover.png');
const YoulostImage = new ImageSource('images/youlost.png');
const RestartImage = new ImageSource('images/restart.png');


// Define fly animation images
const flyImages = [
    new ImageSource('animated/fly01.png'),
    new ImageSource('animated/fly02.png'),
    new ImageSource('animated/fly03.png'),
    new ImageSource('animated/fly04.png'),
    new ImageSource('animated/fly05.png'),
    new ImageSource('animated/fly06.png'),
    new ImageSource('animated/fly07.png')
];


const Resources = {
    Dragon: dragonImage,
    Spaceship: spaceshipImage,
    Bullet: bulletImage,
    Background: backgroundImage,
    Laser: laserImage,
    Button: buttonImage,
    GameLogo: gameLogoImage,
    GameOver: gameOverImage,
    YouLost: YoulostImage,
    Restart: RestartImage,
    Fly01: flyImages[0],
    Fly02: flyImages[1],
    Fly03: flyImages[2],
    Fly04: flyImages[3],
    Fly05: flyImages[4],
    Fly06: flyImages[5],
    Fly07: flyImages[6]
};


const ResourceLoader = new Loader(Object.values(Resources));


ResourceLoader.load().then(() => {
    console.log('All resources loaded successfully!');
}).catch((error) => {
    console.error('Error loading resources:', error);
});

export { Resources, ResourceLoader };
