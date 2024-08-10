function loadContent() {
    //fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q='hudson+river+school'&hasImages=true&medium=Paintings&isHighlight=true")
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=%27%27&hasImages=true")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        objectCache = data['objectIDs']
        const randomNum = objectCache[Math.floor(Math.random() * objectCache.length)];
        return randomNum
    })
    .then(function(randomNum) {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomNum}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data['primaryImageSmall'] == "" || data['primaryImageSmall'] == null) {
                console.log("No image link included");
                loadContent();            
            } else {
                
                var smallImage = data['primaryImageSmall'];           console.log(smallImage);
                var bigImage = data['primaryImage'];                  console.log(bigImage);
                var title = data['title'];                            console.log(title);
                var artistName;
                data.constituents == null ? artistName = "" : artistName = data['constituents'][0]['name'];     
                                                                        console.log(artistName);
                var medium = data['medium'];                          console.log(medium);
                var objectDate = data['objectDate'];                  console.log(objectDate);
                var objectURL = data['objectURL'];                    console.log(objectURL);

                if (smallImage == "") {
                    console.log("Primary Image Not Found.")
                    document.getElementById("thumbnail").src="noimage.png";
                } else {
                    document.getElementById("thumbnail").src=smallImage;
                };

                if (title == "") {
                    document.getElementById("plaqueArtName").innerHTML="Unknown Title";
                } else {
                    document.getElementById("plaqueArtName").innerHTML=title;
                };

                if (objectDate == "") {
                    objectDate = "Unknown date";
                };

                if (artistName == "") {
                    artistName = "Unknown Artist"
                };

                if (medium == "") {
                    medium = "Unknown Medium"
                };

                document.getElementById("plaqueOtherInfo").innerHTML=`${artistName}, ${objectDate}, ${medium}`
                document.getElementById("imageLink").href=bigImage;
                document.getElementById("artInfo").href=objectURL;
            }    
        })
        .catch(function(error) {
        console.log(error);
        loadContent();
        });
    })
    
    .catch(function(error) {
        console.log(error);
    });

}