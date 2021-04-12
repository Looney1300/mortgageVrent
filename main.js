const STATE_HOME_INSURANCE = {
    'Alabama':	1917	,
    'Alaska':	1059	,
    'Arizona':	1304	,
    'Arkansas':	2302	,
    'California':	1101	,
    'Colorado':	1995	,
    'Connecticut':	1076	,
    'Delaware':	589	,
    'Florida':	1736	,
    'Georgia':	1506,
    'Hawaii':	396	,
    'Idaho':	936	,
    'Illinois':	1437	,
    'Indiana':	1252	,
    'Iowa':	1502,
    'Kansas':	3019	,
    'Kentucky':	1888	,
    'Louisiana':	2297	,
    'Maine':	982	,
    'Maryland':	1113	,
    'Massachusetts':	1258	,
    'Michigan':	1139	,
    'Minnesota':	1634	,
    'Mississippi':	1713	,
    'Missouri':	1961	,
    'Montana':	1770	,
    'Nebraska':	2787	,
    'Nevada':	814	,
    'New Hampshire':	709	,
    'New Jersey':	810	,
    'New Mexico':	1545,
    'New York':	969	,
    'North Carolina':	1515,
    'North Dakota':	1828	,
    'Ohio':	872	,
    'Oklahoma':	4067 ,
    'Oregon':	776	,
    'Pennsylvania':	809	,
    'Rhode Island':	1096	,
    'South Carolina':	1532,
    'South Dakota':	1958	,
    'Tennessee':	1670	,
    'Texas':	2589	,
    'Utah':	825	,
    'Vermont':	681	,
    'Virginia':	1013	,
    'Washington':	975	,
    'Washington D.C.':	930	,
    'West Virginia':	1003	,
    'Wisconsin':	1042	,
    'Wyoming':	1144	,
}

// This is by county
const UT_PROPERTY_TAX_RATES = {
    'San Juan': .008,
    'Davis': .0066,
    'Salt Lake': .0068,
    'Cache': .0061,
}

const HOME_MAINTENANCE = 170;

function annualInterest(principal, rate) {
    return principal * rate;
}

// Uses the full state name to pull from predefined data for average cost of home owner insurance.
function costToOwnHouse(housePrice, currentHouseValue, downPayment, loanAPR, monthlyUtilities, home_maintenance, state, county, months) {
    return annualInterest(housePrice - downPayment, loanAPR)/12*months + 
                STATE_HOME_INSURANCE[state]/12*months + 
                UT_PROPERTY_TAX_RATES[county]/12*months * currentHouseValue +
                monthlyUtilities * months +
                home_maintenance * months -
                (currentHouseValue - housePrice);
}

function costToRent(monthlyRent, monthlyUtilities, months) {
    return (monthlyRent + monthlyUtilities) * months;
}

document.getElementById('submit').onclick = function () {
    let inputs = document.getElementsByTagName('input');
    //debugger
    let homeCost = costToOwnHouse(
        Number(inputs[0].value), 
        Number(inputs[1].value), 
        Number(inputs[2].value), 
        Number(inputs[3].value), 
        Number(inputs[4].value), 
        Number(inputs[5].value), 
        'Utah',
        inputs[6].value,
        Number(inputs[9].value),
        );
    let rentCost = costToRent(Number(inputs[7].value), Number(inputs[8].value), Number(inputs[9].value));
    document.getElementById('home').innerText = `$${homeCost}`;
    document.getElementById('rent').innerText = `$${rentCost}`;
    document.getElementById('difference').innerText = `Owning a home saves you $${rentCost - homeCost}`;

}