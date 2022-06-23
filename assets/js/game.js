var playerName = window.prompt("What is your robot's name?");

var playerHealth = 100;
var playerAttack= 10;

//Log mulitple values at once:
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";

var enemyHealth = 50;
var enemyAttack = 12;



var fight = function()
{
    //Starting alert:
    window.alert("Welcome to Robot Gladiators!")

    //fight inquiry
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this round? Enter FIGHT or SKIP below.")

//if player choses FIGHT
if (promptFight === "fight" || promptFight === "FIGHT")
{
    //enemyHealth - playerAttack to update enemyHealth variable
    enemyHealth = enemyHealth - playerAttack;

    //Log message
    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    //playerHealth - enemyAttack to update playerHealth variable
    playerHealth = playerHealth - enemyAttack;

    //Log message
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    //check enemy's health
    if (enemyHealth <= 0)
    {
        window.alert(enemyName + " has died!");
    } else
          {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
          }
    
    //check player's health
    if (playerHealth <= 0)
    {
        window.alert(playerName + " has died!");
    } else
          {
            window.alert(playerName + " still has " + playerHealth + " health left.");
          }

//If player choses SKIP:
} else if (promptFight === "skip" || promptFight === "SKIP")
    {
        window.alert(playerName + " has chosen to skip the fight.")

//If player enters an invalid option:
    } else {
                window.alert("Please choose a valid option: SKIP or FIGHT?")
           }   
};


fight();