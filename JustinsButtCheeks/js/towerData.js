//This file holds all the data/values for each tower, and their respective upgrades, and costs, as well as other minuscules things

//[type][version]{upgradeValues[], upgradeCosts[]}

//each upgrade has 4 'levels' + the base level
//upgradeValues/Costs [[damage], [range], [speed]]
export {towerData, missileShotRadius}

let towerData = 
[
    //basic cannon
    [
        //sniperMax
        {
            defaultValues: {damage: 8, range: 7.5, speed: 0.2, sellAmount: 750, name: "Super Sniper"},
            upgradeValue: [[9, 12, 13, 15], [8.5, 9.5, 11, 12], [0.3, 0.4, 0.55, 0.7]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: null,
            image: 'cannon'
        },
        //sniper
        {
            defaultValues: {damage: 5, range: 7, speed: 0.5, sellAmount: 500, name: "Sniper"},
            upgradeValue: [[5.5, 6.25, 7, 8], [7.8, 8.5, 9.5, 11], [0.6, 0.7, 0.8, 1.1]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: {text: ["Sniper Max"], value:[-1], num: 1, cost: [1500]},
            image: 'cannon'
        },
        //normal
        {
            defaultValues: {damage: 3, range: 2.5, speed: 1.5, sellAmount: 250, name: "Basic Tower"},
            upgradeValue: [[3.5, 4, 5, 6], [3.2, 4, 5, 5.75], [1.7, 1.9, 2.1, 2.3]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: {text: ["Sniper", "Scatter"], value:[-1, 1], num: 2, cost: [1000, 750]},
            image: 'cannon'
        },
        //scatter
        {
            defaultValues: {damage: 2, range: 2.5, speed: 2, sellAmount: 375, name: "Scatter"},
            upgradeValue: [[2.25, 2.75, 3.25, 4], [3, 3.5, 4, 5], [2.1, 2.2, 2.4, 2.6]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: {text: ["Scatter Max"], value:[1], num: 1, cost: [1500]},
            image: 'cannon'
        },
        //scatterMax
        {
            defaultValues: {damage: 1.5, range: 3, speed: 2.2, sellAmount: 750, name: "Scatter Max"},
            upgradeValue: [[1.75, 2, 2.5, 3], [3.8, 4.6, 5, 5.5], [2.3, 2.4, 2.6, 2.8]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: null,
            image: 'cannon'
        }
    ],
    //tesla cannon
    [
        //super tesla
        {
            defaultValues: {damage: 0.3, range: 1.4, speed: 6, sellAmount: 150, targetAmount: 6, name: "Super Tesla"},
            upgradeValue: [[0.35, 0.4, 0.45, 0.5], [1.75, 2, 2.4, 2.8], [6.5, 6.75, 7, 7.5]],
            upgradeCost: [[500, 850, 1200, 1500], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: null,
            image: 'tesla'
        },
        //heavy tesla
        {
            defaultValues: {damage: 0.35, range: 1.3, speed: 6, sellAmount: 750, targetAmount: 4, name: "Heavy Tesla"},
            upgradeValue: [[0.4, 0.45, 0.5, 0.6], [1.8, 2.3, 2.7, 3], [6.5, 7, 8, 8.5]],
            upgradeCost: [[600, 800, 1000, 1300], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: {text: ["Super Tesla"], value:[-1], num: 1, cost: [1500]},
            image: 'tesla'
        },
        //tesla normal
        {
            defaultValues: {damage: 0.8, range: 1.5, speed: 5, sellAmount: 425, targetAmount: 2, name: "Tesla"},
            upgradeValue: [[0.9, 1.1, 1.3, 1.5], [2, 2.5, 3, 3.5], [5.5, 6, 6.75, 7.75]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: {text: ["Heavy Tesla", "Laser"], value:[-1, 1], num: 2, cost: [1000, 750]},
            image: 'tesla'
        },
        //laser
        {
            defaultValues: {damage: 0.3, range: 1.2, speed: 50, sellAmount: 750, targetAmount: 1, name: "Laser"},
            upgradeValue: [[0.4, 0.45, 0.5, 0.6], [1.5, 1.8, 2.4, 3], [53, 55, 58, 60]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: {text: ["Super Laser"], value:[1], num: 1, cost: [1500]},
            image: 'tesla'
        },
        //super laser
        {
            defaultValues: {damage: 0.5, range: 1.5, speed: 50, sellAmount: 1500, targetAmount: 1, name: "Super Laser"},
            upgradeValue: [[0.55, 0.6, 0.7, 0.8], [1.7, 2, 2.5, 3.5], [53, 55, 58, 60]],
            upgradeCost: [[200, 350, 500, 750], [175, 200, 450, 600], [200, 300, 400, 500]],
            upgradeOptions: null,
            image: 'tesla'
        }
    ],
    //missile cannon
    [
        //mini turbo launcher
        {
            defaultValues: {damage: 1.6, range: 4, speed: 6, sellAmount: 1500, missiles:20, blastRadius: 0.4, name: "Turbo Launcher"},
            upgradeValue: [[2, 2.3, 2.7, 3], [4.5, 4.7, 5.3, 5.8], [5.7, 5.2, 4.7, 4]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: null,
            image: 'missile'
        },
        //turbo missile
        {
            defaultValues: {damage: 2, range: 3.5, speed: 5, sellAmount: 950, missiles:12, blastRadius: 0.6, name: "Turbo Missile"},
            upgradeValue: [[2.4, 2.75, 3.2, 3.5], [3.8, 4.2, 4.8, 5.5], [4.6, 4.2, 3.8, 3.2]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: {text: ["Turbo Launcher"], value:[-1], num: 1, cost: [2000]},
            image: 'missile'
        },
        //missile
        {
            defaultValues: {damage: 3, range: 2.5, speed: 3, sellAmount: 600, missiles:6, blastRadius: 1, name: "Missile"},
            upgradeValue: [[3.3, 3.8, 4.2, 4.8], [3, 3.6, 4.5, 5], [2.8, 2.6, 2.3, 2]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: {text: ["Turbo Missile", "Mega Missile"], value:[-1, 1], num: 2, cost: [1500, 1250]},
            image: 'missile'
        },
        //mega missile
        {
            defaultValues: {damage: 7, range: 3, speed: 5, sellAmount: 1000, missiles:2, blastRadius: 2.5, name: "Mega Missile"},
            upgradeValue: [[7.6, 8.4, 9, 10], [3.5, 4, 4.7, 5.2], [4.8, 4.5, 4.3, 3.7]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: {text: ["Nuke"], value:[1], num: 1, cost: [1750]},
            image: 'missile'
        },
        //nuke
        {
            defaultValues: {damage: 10, range: 4, speed: 7, sellAmount: 1500, missiles:1, blastRadius: 5, name: "Nuke"},
            upgradeValue: [[10.75, 11.5, 12, 13], [4.8, 5.6, 6, 6.5], [6.5, 6, 5, 4]],
            upgradeCost: [[200, 350, 500, 750], [150, 200, 350, 400], [200, 300, 400, 500]],
            upgradeOptions: null,
            image: 'missile'
        }
    ]
];

let missileShotRadius= [15, 15, 15, 25, 40];