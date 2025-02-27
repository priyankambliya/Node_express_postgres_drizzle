import puppeteer from 'puppeteer';

interface MatchData {
    id: number;
    title: string;
    match_status: string;
    match_status_info: string;
    scoreboard: any;
    detailedScoreboard?: any;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Main function using modern async/await syntax
const scrapeMatches = async () => {
    let browser = null;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        // Go to Cricbuzz homepage
        await page.goto('https://www.cricbuzz.com/', {
            waitUntil: 'domcontentloaded'
        });

        // Wait for the specific <ul> element to load
        await page.waitForSelector('ul.cb-col.cb-col-100.videos-carousal-wrapper.cb-mtch-crd-rt-itm', {
            visible: true
        });

        console.log('✅ Element is now visible on the page.');

        // First, collect match data and URLs for detailed pages
        const matchesWithUrls = await page.$$eval(
            'ul.cb-col.cb-col-100.videos-carousal-wrapper.cb-mtch-crd-rt-itm li',
            (elements) => {
                return elements.map((element, index) => {
                    // Get the link to the detailed match page
                    const linkElement = element.querySelector('a');
                    const detailUrl = linkElement ? linkElement.getAttribute('href') : null;

                    return {
                        id: index + 1,
                        detailUrl
                    };
                });
            }
        );

        // Now collect basic data and process each match
        const matches = [];

        for (const matchInfo of matchesWithUrls) {
            // Get basic match data from the main page
            const basicMatchData = await page.$$eval(
                `ul.cb-col.cb-col-100.videos-carousal-wrapper.cb-mtch-crd-rt-itm li:nth-child(${matchInfo.id})`,
                (elements) => {
                    const element = elements[0];
                    const title = element.querySelector('.cb-col-90.cb-color-light-sec.cb-ovr-flo')?.getAttribute('title')?.trim() ?? 'No Title';
                    const match_status = element.querySelector('.cb-card-match-format.text-center.text-white.cb-mtch-frmt-bg-t20')?.textContent?.trim() ?? 'No Match Status';
                    const match_status_info = element.querySelector('.cb-text-live, .cb-text-complete, .cb-text-preview')?.textContent?.trim() || 'No Match Status Info';

                    // Extract scoreboard details
                    let scoreboard: any = {};

                    const scoreElements = element.querySelectorAll('.cb-hmscg-tm-bat-scr');
                    scoreElements.forEach((se) => {
                        const teamImageElement = se.querySelector('.cb-hmscg-tm-nm-img img');
                        const teamImageSrc = teamImageElement?.getAttribute('src') ?? 'No Team Image';

                        const secondTeamName = se.querySelector('.cb-hmscg-tm-bat-scr span')?.textContent?.trim();
                        const teamName = se.querySelector('.cb-ovr-flo')?.textContent?.trim() ?? secondTeamName ?? 'No Team Name';
                        const score = se.querySelector('.cb-ovr-flo')?.nextElementSibling?.textContent?.trim() ?? 'No Score';

                        scoreboard[teamName] = { teamImage: teamImageSrc, score, batting: true };
                    });

                    const secondScoreElements = element.querySelectorAll('.cb-hmscg-tm-bwl-scr');
                    secondScoreElements.forEach((se) => {
                        const teamImageElement = se.querySelector('.cb-hmscg-tm-nm-img img');
                        const teamImageSrc = teamImageElement?.getAttribute('src') ?? 'No Team Image';

                        const secondTeamName = se.querySelector('.cb-hmscg-tm-bwl-scr span')?.textContent?.trim();
                        const teamName = se.querySelector('.cb-ovr-flo')?.textContent?.trim() ?? secondTeamName ?? 'No Team Name';
                        const score = se.querySelector('.cb-ovr-flo')?.nextElementSibling?.textContent?.trim() ?? 'No Score';

                        scoreboard[teamName] = { teamImage: teamImageSrc, score, batting: false };
                    });

                    return {
                        title,
                        match_status_info,
                        match_status,
                        scoreboard
                    };
                }
            );

            let detailedScoreboard = null;

            // If we have a URL for the detailed page, navigate to it and collect data
            // if (matchInfo.detailUrl) {
            //     try {
            //         console.log(`⏳ Navigating to detailed page for match ${matchInfo.id}...`);

            //         // Create a new page and set viewport
            //         const detailPage = await browser.newPage();
            //         await detailPage.setViewport({ width: 1280, height: 800 });

            //         // Navigate to the detailed page
            //         const fullUrl = `https://www.cricbuzz.com${matchInfo.detailUrl}`;
            //         await detailPage.goto(fullUrl, { waitUntil: 'domcontentloaded' });

            //         // Wait for the navigation bar
            //         await detailPage.waitForSelector('.cb-nav-bar, .cb-nav-subhdr', { timeout: 10000 });

            //         // Get nav items and find the Scorecard tab
            //         const navItems = await detailPage.$$('.cb-nav-bar a');
            //         let scorecardTab = null;

            //         for (const tab of navItems) {
            //             const text = await detailPage.evaluate(el => el.textContent?.trim().toLowerCase(), tab);
            //             if (text === 'scorecard') {
            //                 scorecardTab = tab;
            //                 break;
            //             }
            //         }

            //         if (!scorecardTab) {
            //             console.log(`No Scorecard tab found for match ${matchInfo.id}`);
            //             await detailPage.screenshot({ path: `./screenshots/match_${matchInfo.id}_no_scorecard.png`, fullPage: true });
            //             await detailPage.close();
            //             return;
            //         }

            //         // Click the Scorecard tab and wait for content to load
            //         await scorecardTab.click();
            //         await delay(2000) // Wait for scorecard content to load

            //         // Extract detailed scoreboard data
            //         const detailedScoreboard = await detailPage.evaluate(() => {
            //             const matchSummary = document.querySelector('.cb-col.cb-col-100.cb-ltst-wgt-hdr')?.textContent?.trim();
            //             return {
            //                 matchSummary
            //             };
            //         });

            //         // Log and close the page
            //         console.log(`✅ Fetched detailed data for match ${matchInfo.id}`, detailedScoreboard);
            //         await detailPage.close();
            //     } catch (error) {
            //         console.error(`Error fetching detailed data for match ${matchInfo.id}:`, error);
            //     }
            // }


            // Combine data and add to matches array
            matches.push({
                id: matchInfo.id,
                title: basicMatchData.title,
                match_status: basicMatchData.match_status,
                match_status_info: basicMatchData.match_status_info,
                scoreboard: basicMatchData.scoreboard,
                detailedScoreboard
            });
        }

        console.log('✅ Final Data with Scoreboard:', matches[1]);

        // Filter to only show matches with detailed scoreboard
        const matchesWithDetailedScoreboard = matches.filter(match => match.detailedScoreboard);
        if (matchesWithDetailedScoreboard.length > 0) {
            console.log('✅ Sample Detailed Scoreboard:', matchesWithDetailedScoreboard[0].detailedScoreboard);
        } else {
            console.log('No matches with detailed scoreboard data found');
        }

    } catch (error) {
        console.error('Error fetching match data:', error);
    } finally {
        if (browser) await browser.close();
    }
};

// Execute the main function
scrapeMatches();