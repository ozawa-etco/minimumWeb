const { Builder, By } = require("selenium-webdriver");
const { alertIsPresent } = require("selenium-webdriver/lib/until");
require("chromedriver");

it("HOMEページタイトルテスト", async () => {
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.get("file:///Users/minimumweb/minimum-web/index.html");
    const title = await driver.getTitle();
    expect(title).toBe("minimum-web(index)");
    await driver.quit();
})

it("Contactフォームテスト", async () => {
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.get("file:///Users/minimumweb/minimum-web/contact.html");
    const title = await driver.getTitle();
    expect(title).toBe("minimum-web(contact)");

    //form操作
    const email = await driver.findElement(By.id("email"));
    email.sendKeys("test@test.local");

    const body = await driver.findElement(By.id("body"));
    body.sendKeys("hogehoge");

    const btn = await driver.findElement(By.id("btn"));
    btn.click();

    await driver.wait(alertIsPresent(), 5000);

    const alert = await driver.switchTo().alert();

    const alertText = await alert.getText();

    expect(alertText).toBe("受け付けました");

    await alert.accept();

    await driver.quit();
})