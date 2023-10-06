import test from '../../lib/BaseTest';
import { LoginPage } from '../../page-factory/LoginPage'


test('Verify Login', async ({ loginPage}:{loginPage:LoginPage}) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
    await test.step(`Click on Login button in Main page`, async () => {
        await loginPage.clickOnLoginMainButton();
    });
    await test.step(`Login to saavn application`, async () => {
        await loginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Profile page`, async () => {
        await loginPage.verifyProfilePage();
    });
}); 