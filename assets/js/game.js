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
        var confirmSkip = window.confirm("Are you sure you'd like to skip?");

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
        window.alert(enemyName + " has died!");
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


for(var i = 0; i < enemyNames.length; i++)
{
    var pickedEnemyName = enemyNames[i]; //assign variable to the result of the <for>
    enemyHealth = 50;  //reset variable health state
    fight(pickedEnemyName);  //fight reset variable
}

// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less