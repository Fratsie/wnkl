var visibility = false;
var droppeddown = false;
var categories = ['pouchbag', 'chipsEnZoutjes', 'koek', 'chocolade', 'baru poeders', 'pasta', 'pastasauzen', 'pesto', 'tapenade', 'hummus'];

function change_visibility(){
    if(visibility){
        document.getElementById('productCategories').style.visibility = 'hidden'
        visibility = false
    }
    else{
        document.getElementById('productCategories').style.visibility = 'visible'
        visibility = true
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
    container = document.getElementById('productContainer');
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
            h3.innerHTML = productName + " - " + productVerkoopprijs;
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

    if(category != "spotlight"){
        change_visibility();
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
            h3.innerHTML = productName + " - " + productVerkoopprijs;
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

    if(category != "spotlight"){
        change_visibility();
    }
}

function search_products(){
    event.preventDefault();

    container = document.getElementById('productContainer');
    container.innerHTML = "";

    var productsArray = [];
    var search_results = [];

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

            if(element['naam'].includes(search_input) && search_input != ""){
                search_results.push(element);
            }
        });

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
            h3.innerHTML = productName + " - " + productVerkoopprijs;
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