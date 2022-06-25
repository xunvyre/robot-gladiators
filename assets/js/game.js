var playerName = window.prompt("What is your robot's name?");

var playerHealth = 100;
var playerAttack= 10;
var playerMoney = 10;

//Log mulitple values at once:
console.log(playerName, playerAttack, playerHealth, playerMoney);

var enemyNames = ["Roborto", "FatBot", "Bender", "Angleline", "Flexo", "Bev"];
console.log(enemyNames);
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName)
{
    //while the enemy is alive
    while(playerHealth > 0 && enemyHealth > 0)
    {
        //fight inquiry
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this round? Enter FIGHT or SKIP below.")
        
        //If player choses SKIP:
        if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip")
        {
            //confirm
            var confirmSkip = window.confirm("Are you sure you'd like pay 10 credits to skip?");

            //if true
            if (confirmSkip)
            {
                window.alert(playerName + " has chosen to skip the fight.");
                //subtract money
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //enemyHealth - playerAttack to update enemyHealth variable
        enemyHealth = enemyHealth - playerAttack;

        //Log message
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        //check enemy's health
        if (enemyHealth <= 0)
        {
            window.alert(enemyName + " has died! You win 20 credits.");
            playerMoney = playerMoney + 20; //award player for winning
            break; //break loop bc enemy is dead
        } 
        else
        {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //playerHealth - enemyAttack to update playerHealth variable
        playerHealth = playerHealth - enemyAttack;

        //Log message
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );
        
        //check player's health
        if (playerHealth <= 0)
        {
            window.alert(playerName + " has died!");
            break; //break loop bc player died
        }
        else
        {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    } //end of while loop
}; //end of function

var startGame = function() //start a new game
{
    //reset player stats
    playerHealth = 100
    playerAttack = 10
    playerMoney = 10

    for(var i = 0; i < enemyNames.length; i++)
    {
        if (playerHealth > 0)
        {
            window.alert("Welcome to round " + ( i + 1 ) + " of Robot Gladiators!") //welcome message and round designation +1 bc arrays start at 0
            var pickedEnemyName = enemyNames[i]; //assign variable to the result of the <for>
            enemyHealth = 50;  //reset variable health state
            fight(pickedEnemyName);  //fight reset variable
            if (playerHealth > 0 && i < enemyNames.length - 1) //access shop if i can still increase
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
            window.alert(playerName + " has been defeated! Game over!")
            break;
        }
    }
    endGame(); //call new round
}; //end of startGame function

var endGame = function() //end the game
{
    if (playerHealth > 0)
    {
        window.alert(playerName + " has survived the game with a score of " + playerMoney + "!")
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
            window.alert("Refilling player's health by 20 for 7 credits.");
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
            break;
        case "upgrade":
            window.alert("Upgrading player's attack by 6 for 7 credits.");
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney -7;
            break;
        case "leave":
            window.alert("Back to the fight!");
            break;
        default:
            window.alert("Please type in a valid option: REFILL, UPGRADE, or LEAVE.");
            shop();
            break;
    }
};

startGame(); //call startGame function

// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less