const {By, Key, Builder} = require("selenium-webdriver")
require("chromedriver")

async function test_case(){

    // Launch web browser
    let driver = await new Builder().forBrowser("chrome").build();

    // Go to webpage
    await driver.get("https://www.amazon.in");
    await driver.manage().window().maximize();

    // Login to account
    await driver.findElement(By.id('nav-link-accountList')).click();
    await driver.findElement(By.name('email')).sendKeys('************************')
    await driver.findElement(By.css("input[Id='continue']")).click();
    await driver.findElement(By.id('ap_password')).sendKeys("***************");
    await driver.findElement(By.css("input[Id='signInSubmit']")).click();

    // Search Item
    await driver.findElement(By.id("twotabsearchtextbox")).sendKeys("iphone 14 pro max");
    await driver.findElement(By.id('nav-search-submit-button')).click();

    // Click on the desire item and result into open new window
    await driver.findElement(By.linkText('Apple iPhone 14 Pro Max (128 GB) - Silver')).click()

    // Switch to another window
    let newWinowdowID = '';
    driver.getAllWindowHandles().then(
        (windowIDs) =>{
            newWinowdowID = windowIDs[1];
            // for(let windowID in windowIDs){
            //     console.log("Windows " + windowID)
            // }
        }
    );

    await driver.switchTo().window(newWinowdowID);

    // Add ietm to cart
    await driver.findElement(By.id('add-to-cart-button')).click()
    await driver.findElement(By.css('span#attach-sidesheet-view-cart-button .a-button-input')).click()

    // Get item in subtotal and validate the count
    let subTotal = driver.findElement(By.css('#sc-subtotal-label-activecart')).getText();
    subTotal.then(
        (totalString) => {
            if(totalString.includes('Subtotal (1 item)')){
                console.log("Product added to the cart successfully!")
            }
            else {
                console.log("Failed to add the product to the cart.")
            }
        }
    )
    
    // Delete item
    await driver.findElement(By.css('[data-action="delete"] [name^="submit.delete"]')).click()

    // Close the web browser session
    setInterval(() => {
        driver.quit();
    }, 2000);
}

test_case();