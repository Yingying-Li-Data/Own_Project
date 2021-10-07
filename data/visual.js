// load json data
d3.json("cleaned_athletes.json").then((data) => {

    // calculate the size of the object (# of rows)

    let size = 0

    for (key in data) {
        if (data.hasOwnProperty(key)) size++;
    };
    
    // declare female and male count and start at 0

    let female = 0
    let male = 0

    // get unique country names

    let all_country = []

    for (key in data) {
        all_country.push(data[key].country)
    }

    function removeDuplicates(all_country) {
        return [...new Set(all_country)]
    }

    all_country = removeDuplicates(all_country).sort()

    // Create country dropdown selction

    var select = document.getElementById("selectCountry");

    for (let i = 0; i < all_country.length; i++) {
        var opt = all_country[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    };

    // Get the selected country value

    let country = select.options[select.selectedIndex].text;

    console.log(`Country: ${country}`);
    
    // let country = "Afghanistan"

    // loop through the object to count numbers of female and male athletes

    if (country == null || country === undefined) {

        for (let i = 0; i < size ; i++) {
        
            if (data[i].gender === "Female") {
                female++;
            } else if (data[i].gender === "Male") {
                male++;
            } else {};
    
        }
        
    } else {

        for (let i = 0; i < size ; i++) {
        
            if (data[i].gender === "Female" && data[i].country === country) {
                female++;
            } else if (data[i].gender === "Male" && data[i].country === country) {
                male++;
            } else {};
    
        };
    };


    // plot the pie chart

    let trace1 = {
        values: [female, male],
        labels: ['Female', 'Male'],
        type: 'pie',
        name: 'Participation by Gender'
    };

    let chart_data = [trace1];

    let layout = {
        height: 600,
        width: 800
    };

    Plotly.newPlot("plot", chart_data, layout);

});