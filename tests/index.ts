import expect from "expect";
import puppeteer from "puppeteer";

const input = `
service:
    title is Grafana dashboard
    version is 1.0.0
    scope is Environment
    test:
        one is one
        two is two

data:
    sources -> first

first:
    type is SmartMeter
    provider is Fiware
    uri is https://data.iiss.at/dataskop/fiwarenosec/v2/entities
    query is AirQualityObserved

application:
    type is Web
    layout is SinglePage
    roles -> User, SuperUser, Admin
    panels -> Map, Pie, XY, TS, Bar, SCMapPanel, SingleLine, MultiLine, ExtremeValues, Calendar

Map:
    label is map
    type is geomap
    source is first
    data -> location, stationName, O3, NO2, SO2, address, id

Pie:
    label is pie
    type is pie_chart
    source is first
    traces -> NOx, O3, NO2, SO2, id
    pie_chart_type is pie

XY:
    label is xy
    type is xy_chart
    source is first
    traces -> dateObserved, NOx, O3, NO2, SO2, id

TS:
    label is ts
    type is timeseries
    source is first
    traces -> dateObserved, NOx, O3, NO2, SO2, id

Bar:
    label is bar
    type is bar_chart
    source is first
    traces -> dateObserved, NOx, O3, NO2, SO2

SCMapPanel:
    type is smartcomm-map-panel
    source is first
    traces -> location, stationName, O3, NO2, SO2, address

SingleLine:
    type is smartcomm-simpleline-panel
    source is first
    traces -> dateObserved, NOx

MultiLine:
    type is smartcomm-multiplelinechart-panel
    source is first
    locations -> Escuelas Aguirre, Arturo Soria, Villaverde
    traces -> dateObserved, NOx, O3, NO2

ExtremeValues:
    type is smartcomm-extremevalues-panel
    source is first
    locations -> Escuelas Aguirre, Arturo Soria, Villaverde
    traces -> NOx, O3, NO2, SO2

Calendar:
    type is smartcomm-calendar-panel
    source is first
    locations -> Escuelas Aguirre, Arturo Soria, Villaverde
    traces -> dateObserved, CO, NO, NOx, O3

deployment:
    environments -> local

local:
    uri is https://localhost.org:3000/test
    port is 50055
    type is Docker
`;

const initBrowser = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--disable-infobars', '--disable-notifications']
    });
    return browser;
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const browser = await initBrowser();
    try {
        const context = browser.defaultBrowserContext();
        await context.overridePermissions("http://localhost", ['notifications']);
        const page = await browser.newPage();

        page.on('response', async (response) => {
            if (response.url() === "http://localhost:9000/deploy" && response.request().method() === "POST") {
                const responseData = await response.text();
                expect(responseData).toMatch(/^"https:\/\/sag-[a-z0-9]+-grafana.azurewebsites.net"$/);
                console.log("Deployment URL:", responseData);
                browser.close();
            }
            expect(response.status()).toBeLessThan(400);
        });

        await page.goto("http://localhost");
        await page.click('._headerMainContianer_1876s_1 > nav:nth-child(2) > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1)');
        await page.type('#textfield-cl-0-input', "email@example6.com");
        await page.type('#textfield-cl-2-input', "password123");
        await page.click("html body.lightMode div#root main._signinMainContainer_8otdj_1 div._signinCardContainer_8otdj_13 button");

        await page.waitForSelector('html body.lightMode div#root main div.editor-container div.middle-column div div.cm-editor.ͼ1.ͼ2 div.cm-scroller div.cm-content');
        await page.type("html body.lightMode div#root main div.editor-container div.middle-column div div.cm-editor.ͼ1.ͼ2 div.cm-scroller div.cm-content", input, { delay: 0 });
        await page.click("#root > main > button");
    } catch (error) {
        console.error("Error occurred:", error);
    }
})();

