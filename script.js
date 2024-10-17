var visibility = false;
var droppeddown = false;
var categories = ['pouchbag', 'chipsEnZoutjes', 'koek', 'chocolade', 'baru poeders', 'pasta', 'pastasauzen', 'pesto', 'tapenade', 'hummus'];

function change_visibility(change){
    if(visibility){
        document.getElementById('productCategories').style.visibility = 'hidden'
        document.getElementById('dropdownArrow').style.rotate = "180deg";
        visibility = false
    }
    else{
        document.getElementById('productCategories').style.visibility = 'visible'
        document.getElementById('dropdownArrow').style.rotate = "0deg";
        visibility = true
    }

    if(change == "body"){
        document.getElementById('productCategories').style.visibility = 'hidden'
        document.getElementById('dropdownArrow').style.rotate = "180deg";
        visibility = false
    }
}

function dropdown(){
    if(droppeddown){
        document.getElementById('navigation_list').style.display = 'none';
        droppeddown = false;
    }
    else{
        document.getElementById('navigation_list').style.display = 'block';
        droppeddown = true;
    }
}

function product_categories(category){
    var container = document.getElementById('productContainer');
    container.innerHTML = "";

    fetch('data.json').then(data => data.json()).then(response => {
        var allProducts = response;
        var productsCategory = allProducts[category];

        for(var i in productsCategory){
            var product = productsCategory[i];

            //declare product details
            var productName = product['naam'];
            var productVerkoopprijs = product['verkoopprijs'];
            var productDescription = product['description'];
            var productImage = product['image'];

            //create elements
            var div = document.createElement('div');
            var img = document.createElement('img');
            var h3 = document.createElement('h3');
            var p = document.createElement('p');

            //fill in elements
            img.src = productImage;
            img.alt = productName;
            h3.innerHTML = productName + " - €" + productVerkoopprijs;
            p.innerHTML = productDescription;

            //add everything to div
            div.append(img);
            div.append(h3);
            div.append(p);

            div.classList.add('product');

            //append div to productscontainer
            container.append(div);
        }
    });

    if(category != "spotlight"){
        change_visibility('');
    }
}

function get_spotlights(category){
    container = document.getElementById('spotlightContainer');
    container.innerHTML = "";

    fetch('data.json').then(data => data.json()).then(response => {
        var allProducts = response;
        var productsCategory = allProducts[category];

        for(var i in productsCategory){
            var product = productsCategory[i];

            //declare product details
            var productName = product['naam'];
            var productVerkoopprijs = product['verkoopprijs'];
            var productDescription = product['description'];
            var productImage = product['image'];

            //create elements
            var div = document.createElement('div');
            var img = document.createElement('img');
            var h3 = document.createElement('h3');
            var p = document.createElement('p');

            //fill in elements
            img.src = productImage;
            img.alt = productName;
            h3.innerHTML = productName + " - €" + productVerkoopprijs;
            p.innerHTML = productDescription;

            //add everything to div
            div.append(img);
            div.append(h3);
            div.append(p);

            div.classList.add('product')

            //append div to productscontainer
            container.append(div);
        }
    });
}

function search_products(){
    event.preventDefault();

    var container = document.getElementById('productContainer');
    container.innerHTML = "";

    var productsArray = [];
    var search_results = [];
    searched = true;

    fetch('data.json').then(data => data.json()).then(response => {
        var allProducts = response;

        categories.forEach(element => {
            var productsCategory = allProducts[element];

            for(var product in productsCategory){
                productsArray.push(productsCategory[product]);
            }
        });

        productsArray.forEach(element => {
            var search_input = document.getElementById('searchbar').value.trim().toLowerCase();

            if(search_input == ""){
                searched = false;
            }

            console.log(element['naam'] + " - " + search_input)

            if(element['naam'].toLowerCase().includes(search_input) && search_input != ""){
                search_results.push(element);
            }
        });

        if(!searched){
            product_categories('spotlight');
        }
        else{
            if(search_results.length != 0){
                for(var i in search_results){
                    var product = search_results[i];
        
                    //declare product details
                    var productName = product['naam'];
                    var productVerkoopprijs = product['verkoopprijs'];
                    var productDescription = product['description'];
                    var productImage = product['image'];
        
                    //create elements
                    var div = document.createElement('div');
                    var img = document.createElement('img');
                    var h3 = document.createElement('h3');
                    var p = document.createElement('p');
        
                    //fill in elements
                    img.src = productImage;
                    img.alt = productName;
                    h3.innerHTML = productName + " - €" + productVerkoopprijs;
                    p.innerHTML = productDescription;
        
                    //add everything to div
                    div.append(img);
                    div.append(h3);
                    div.append(p);
        
                    div.classList.add('product')
        
                    //append div to productscontainer
                    container.append(div);
                }
            }
            else{
                var p = document.createElement('h3');
    
                p.innerHTML = "Geen producten gevonden";
                p.style.marginTop = "20px";
                container.append(p);
            }
        }
    });
}