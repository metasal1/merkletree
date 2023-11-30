import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const folderName = 'assets';

// Ensure the folder exists
if (!existsSync(folderName)) {
    await mkdir(folderName);
}

let fileCounter = 1; // Start from 1

function getRarityAndValues() {
    let rarity, dark, light;
    const random = Math.random() * 100;

    if (random < 60) { // 60% probability
        rarity = "Common";
        dark = light = 30;
    } else if (random < 80) { // 20% probability
        rarity = "Uncommon";
        dark = light = 40;
    } else if (random < 90) { // 10% probability
        rarity = "Rare";
        dark = light = 50;
    } else if (random < 97) { // 7% probability
        rarity = "Epic";
        dark = light = 60;
    } else { // 3% probability
        rarity = "Legendary";
        dark = light = 70;
    }

    return { rarity, dark, light };
}

function createTemplateData() {
    const { rarity, dark, light } = getRarityAndValues();

    return {
        name: `Pet Legends Kin Battle Pet #${fileCounter}`,
        symbol: "PLBPKIN",
        description: "Playable Battle Pet Utility NFT in the game Pet Legends. Learn more at https://petlegends.com",
        image: "https://arweave.net/X1TrdzX1Ie6gxITNWkVld27sfVGU7_GlTWExrxN1FM8",
        attributes: [
            {
                trait_type: "Type",
                value: "Pet Legends Battle Pet"
            },
            {
                trait_type: "Level",
                value: "0"
            },
            {
                trait_type: "Community",
                value: "KIN"
            },
            {
                trait_type: "Rarity",
                value: rarity
            },
            {
                trait_type: "Dark",
                value: dark.toString()
            },
            {
                trait_type: "Rock",
                value: "0"
            },
            {
                trait_type: "Energy",
                value: "0"
            },
            {
                trait_type: "Light",
                value: light.toString()
            },
            {
                trait_type: "Fire",
                value: "0"
            },
            {
                trait_type: "Ice",
                value: "0"
            },
            {
                trait_type: "Sky",
                value: "0"
            },
            {
                trait_type: "Metal",
                value: "0"
            }
        ],
        properties: {
            files: [
                {
                    uri: "https://arweave.net/X1TrdzX1Ie6gxITNWkVld27sfVGU7_GlTWExrxN1FM8",
                    type: "image/png"
                }
            ],
            category: null
        }
    };
}

async function createJsonFile(data) {
    const jsonData = JSON.stringify(data, null, 2);
    const fileName = `${folderName}/${fileCounter}.json`;

    try {
        await writeFile(fileName, jsonData);
        console.log(`File ${fileName} created successfully.`);
    } catch (err) {
        console.error(`Error writing file ${fileName}:`, err);
    }

    fileCounter++;
}

// Example usage
(async () => {
    for (let i = 0; i < 8192; i++) {
        await createJsonFile(createTemplateData());
    }
})();
