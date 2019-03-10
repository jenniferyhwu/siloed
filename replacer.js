chrome.storage.sync.get('name', function(data) {
    if (data.name == "Kevin Cong Pei") {
        // alert(data.name);
        var allImages = document.getElementsByTagName('img');
        for (var i = 0; i < allImages.length; i++) {  
            replaceOne(allImages[i]);
        }
    } else {
        alert("WRONG PERSON ABORT ABORT");
    }
});

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
}

function replaceImage(image) {
    
    if(image instanceof HTMLImageElement){
        if(image.src != undefined && (image.src[0] == 'd' || image.src[0] == 'c'))
        return;
        var thisImageHeight = image.clientHeight;
        var thisImageWidth = image.clientWidth;
        console.log("reached replace one insideinside");
        if (thisImageHeight != 0 && thisImageHeight != 0){
            const src = image.src;
            const loading = chrome.runtime.getURL('/assets/img/loading.gif');
            image.setAttribute('src', loading);
            image.setAttribute('srcset', loading);
            chrome.runtime.sendMessage({url: src}, ({url}) => {
                console.log("siloed__receive", image);
                image.setAttribute('src', url);
                image.setAttribute('srcset', url);
            });
        }
    }
}

function replaceUPDATE(image) {
    replaceImage(image);
}

function replaceOne(image) {
    replaceImage(image);
}

// Select the node that will be observed for mutations
var targetNode = document.querySelector('body');

// Options for the observer (which mutations to observe)
var config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
var callback = function(mutationsList, observer) {
    //replace(mutationsList);
    for(var mutation of mutationsList) {
        if (mutation.type == 'attributes') {
            //console.log('The ' + mutation.attributeName + ' attribute was modified.');
            if (mutation.attributeName == 'src') {
                replaceUPDATE(mutation.target);
            }
        }
        
        replaceOne(mutation.target);
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);