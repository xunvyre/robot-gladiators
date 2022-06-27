/*var playerName = window.prompt("What is your robot's name?");

var playerHealth = 100;
var playerAttack= 10;
var playerMoney = 10;*/

var fightOrSkip = function()
{
    //ask player to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP below:");
    if (promptFight === "" || promptFight === null)
    {
        window.alert("Please choose a valid answer: FIGHT or SKIP?");
        return fightOrSkip();
    }
    //If player choses SKIP:
    if (promptFight === "skip" || promptFight === "SKIP")
    {
        //confirm
        var confirmSkip = window.confirm("Are you sure you'd like pay 10 credits to skip?");

        //if true
        if (confirmSkip && playerInfo.money >= 10)
        {
            window.alert(playerInfo.name + " has chosen to skip the fight.");
            //subtract money
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            shop();
        }
        else
        {
            window.alert("Sorry, you don't have enough credits to skip this fight. You are forced to attack!");
        }
    }
}

var fight = function(enemy)
{
    //while the enemy is alive
    while(playerInfo.health > 0 && enemy.health > 0)
    {
        fightOrSkip();

        //enemy health deducted after player attack
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

        //Log message
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        //check enemy's health
        if (enemy.health <= 0)
        {
            window.alert(enemy.name + " has died! You win 20 credits.");
            playerInfo.money = playerInfo.money + 20; //award player for winning
            break; //break loop bc enemy is dead
        } 
        else
        {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        //player health deducted after enemy attack
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);

        //Log message
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );
        
        //check player's health
        if (playerInfo.health <= 0)
        {
            window.alert(playerInfo.name + " has died!");
            break; //break loop bc player died
        }
        else
        {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    } //end of while loop
}; //end of function

var startGame = function() //start a new game
{
    //reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++)
    {
        if (playerInfo.health > 0)
        {
            window.alert("Welcome to round " + ( i + 1 ) + " of Robot Gladiators!"); //welcome message and round designation +1 bc arrays start at 0
            debugger;
            var pickedEnemyObj = enemyInfo[i]; //assign variable to the result of the <for>
            pickedEnemyObj.health = randomNumber(40, 60);  //reset variable health state
            fight(pickedEnemyObj);  //fight reset variable
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) //access shop if i can still increase
            {
                var storeConfirm = window.confirm("Would you like to visit the store before starting the next round?")
                if (storeConfirm)
                {
                    shop();
                }
            }
        }
        else
        {
            window.alert(playerInfo.name + " has been defeated! Game over!")
            break;
        }
    }
    endGame(); //call new round
}; //end of startGame function

var endGame = function() //end the game
{
    if (playerInfo.health > 0)
    {
        window.alert(playerInfo.name + " has survived the game with a score of " + playerInfo.money + "!")
    }

    var playAgainConfirm = window.confirm("Would you like to play again?")
        if (playAgainConfirm)
        {
            startGame();
        }
        else
        {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!")
        }
}; //end of endGame function

var shop = function()
{
    console.log("Shop entered.")
    //shop prompt function
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Choose one to enter below: REFILL, UPGRADE, LEAVE.");
    //switch statement for shop functionality
    switch (shopOptionPrompt)
    {
        case "refill":
        case "REFILL":
            playerInfo.refillHealth();
            break;
        case "upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
            break;
        case "leave":
        case "LEAVE":
            window.alert("Back to the fight!");
            break;
        default:
            window.alert("Please type in a valid option: REFILL, UPGRADE, or LEAVE.");
            shop();
            break;
    }
};

//generate a random numeric value based on a local min and max value
var randomNumber = function(min, max)
{
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

var getPlayerName = function()
{
    var name = "";
    while (name === "" || name === null)
    {
        name = prompt("What is your robot's name?")
    }
    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo =
{
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function()
    {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function()
    {
        if(this.money >= 7)
        {
            window.alert("Refilling " + this.name + "'s health by 20 points for 7 credits.")
            this.health += 20;
            this.money -= 7;
        }
        else
        {
            window.alert("You don't have enough credits!")
        }
    },
    upgradeAttack: function()
    {
        if(this.money >= 7)
        {
            window.alert("Upgrading" + this.name + "'s attack by 6 for 7 credits.")
            this.attack += 6;
            this.money -= 7;
        }
        else
        {
            window.alert("You don't have enough credits!")
        }
    }
};

//Log mulitple values at once:
console.log(playerInfo.name, playerInfo.attack, playerInfo.health, playerInfo.money);

var enemyInfo =
[
    {
      name: "Roborto",
      attack: randomNumber(10, 12)
    },
    {
      name: "Angleline",
      attack: randomNumber (10, 13)
    },
    {
      name: "Bender",
      attack: randomNumber(10,14)
    }
];

startGame(); //call startGame function

// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less