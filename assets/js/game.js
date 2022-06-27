/*var playerName = window.prompt("What is your robot's name?");

var playerHealth = 100;
var playerAttack= 10;
var playerMoney = 10;*/

//generate a random numeric value based on a local min and max value
var randomNumber = function(min, max)
{
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

var fightOrSkip = function()
{
    var promptFight = window.prompt ("Would you like to FIGHT or SKIP this round? Enter FIGHT or SKIP below:");
    
    //conditional recursive call
    if (promptFight === "" || promptFight === null)
    {
        window.alert("Invalid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip")
    {
        var confirmSkip = window.confirm("Are you sure you want to pay 10 credits to skip this round?");
        if (confirmSkip && playerInfo.money >= 10)
        {
            window.alert(playerInfo.name + " has decided to skip this round.")
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
        else
        {
            window.alert("You don't have enough credits to skip this round! " + playerInfo.name + " is forced to attack!")
        }

        return false;
    }
}

var fight = function(enemy)
{
    var isPlayerTurn = true;
    if (Math.random() > 0.5)
    {
        isPlayerTurn = false;
    }
    console.log(isPlayerTurn)
    debugger;
    
    //while the enemy is alive
    while(playerInfo.health > 0 && enemy.health > 0)
    {
        if (isPlayerTurn)
        {
            if (fightOrSkip())
            {
                break; //if fightOrSkip is true, break the loop
            }

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
        }
        else //player is attacked first
        {
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
        }
        //switch order for next round
        isPlayerTurn = !isPlayerTurn;
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
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Type 1 to REFILL, 2 to UPGRADE, and 3 to LEAVE the shop.");
    //convert string to interger
    shopOptionPrompt = parseInt(shopOptionPrompt);
    //switch statement for shop functionality
    switch (shopOptionPrompt)
    {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Back to the fight!");
            break;
        default:
            window.alert("Please type in a valid option: REFILL, UPGRADE, or LEAVE.");
            shop();
            break;
    }
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
            window.alert("You don't have enough credits to shop! Back to the fight.")
        }
    },
    upgradeAttack: function()
    {
        if(this.money >= 7)
        {
            window.alert("Upgrading " + this.name + "'s attack by 6 for 7 credits.")
            this.attack += 6;
            this.money -= 7;
        }
        else
        {
            window.alert("You don't have enough credits to shop! Back to the fight.")
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