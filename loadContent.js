function loadContent() {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q='hudson+river+school'&hasImages=true&medium=Paintings&isHighlight=true")
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
            console.log(data['primaryImage'])
            console.log(data['primaryImageSmall'])
            if (data['primaryImageSmall'] == "") {
                console.log("Primary Image Not Found.")
                // document.getElementById("thumbnail").innerHTML="No picture available.";
                document.getElementById("thumbnail").src="noimage.png";
            } else {
                document.getElementById("thumbnail").src=data['primaryImageSmall'];
            }
            console.log(data['title']);
            document.getElementById("plaqueArtName").innerHTML=data['title'];
            console.log(data['constituents'][0]['name']);
            console.log(data['objectDate']);
            console.log(data['medium']);
            document.getElementById("plaqueOtherInfo").innerHTML=`${data['constituents'][0]['name']}, ${data['objectDate']}, ${data['medium']}`;
            document.getElementById("imageLink").href=`${data['primaryImage']}`;
            document.getElementById("artInfo").href=`${data['objectURL']}`;

            // I tried to get this to link to the wikipedia page, but I kept getting a security error
            // api call from https://stackoverflow.com/questions/7185288/how-can-i-get-wikipedia-content-using-wikipedias-api
            // fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${data['constituents'][0]['name']}&limit=1&format=json`)
            //     .then(function(response) {
            //         return response.json();
            //     })
            //     .then(function(data) {
            //         if (data[3] == "") {
            //             document.getElementById("artistButton").value="Artist Wikipedia page not found";
            //             console.log("data not found")
            //             onsole.log(data[3])
            //         } else {
            //             document.getElementById("artistLink").href=data[3];
            //             document.getElementById("artistButton").value="Read about this artist on Wikipedia";
            //             console.log(data[3])
            //         }
            //     })
            //     .catch(function(error) {
            //     console.log(error);
            //     });
                
            //     fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${data['title']}&limit=1&format=json`)
            //     .then(function(response) {
            //         return response.json();
            //     })
            //     .then(function(data) {
            //         if (data[3] == "") {
            //             document.getElementById("artButton").value="Art Wikipedia age not found";
            //             console.log("page not found")
            //             onsole.log(data[3])
            //         } else {
            //             document.getElementById("artLink").href=data[3];
            //             document.getElementById("artButton").value="Read about this work on Wikipedia";
            //             console.log(data[3])
            //         }
            //     })
            //     .catch(function(error) {
            //     console.log(error);
            //     });


            
        })
        .catch(function(error) {
        console.log(error);
        });
    })
    
    .catch(function(error) {
        console.log(error);
    });

    console.log(objectCache)
}