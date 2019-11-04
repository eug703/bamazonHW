require ("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.password,
    database: "bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    customerPrompt();
});

function createChoicesArray(res){
    let arrayID = [];
    for(var i in res)
        arrayID.push(`${res[i].id} : ${res[i].product_name} - ${res[i].stock_quantity}`);
    return arrayID;
};


function customerPrompt(){
    connection.query("SELECT * FROM products", function(err,response){
        if(err) throw err
        inquirer
        .prompt([
            {
                type: "rawlist",
                message: "Select product for purchase.",
                choices: createChoicesArray(response),
                name: "userChoice"
            },
            {
                type: "input",
                message: "How many would you like to purchase?",
                name: "productAmount"
            }
            ]).then(function(answer){
                var customerChoice;
                for(var i = 0; i < response.length; i++){
                    if(response[i].id === parseInt(answer.userChoice)){
                        customerChoice = response[i];
                    };
                };
                if(customerChoice.stock_quantity < parseInt(answer.productAmount)){
                    console.log("\n================================================");
                    console.log(`Sorry we do not have enough in stock, we only have ${customerChoice.stock_quantity} of item ${answer.userChoice}`);
                    console.log("\n================================================");
                    connection.end();
                }else{
                    var newQuantityAmount = customerChoice.stock_quantity - parseInt(answer.productAmount);

                    connection.query(
                        "UPDATE products SET ? WHERE ?",[
                            {
                                stock_quantity: newQuantityAmount
                            },
                            {
                                id: customerChoice.id
                            }
                        ],
                        function(err){
                            if(err){
                                console.log(`There was an error finding your products ${err}`)
                                connection.end()
                            }else{
                                var total = parseFloat(customerChoice.price * answer.productAmount).toFixed(2);
                                console.log(`\n============================================\n`);
                                console.log(`Your total is $${total}`);
                                console.log(`Thank you for your purchase.`);
                                console.log(`We have ${newQuantityAmount} items left if you would like to purchase more of ${customerChoice.product_name}.`)
                                console.log(`\n============================================\n`)
                                connection.end();
                            }
                        }
                    )
                }
            })
    })
}
