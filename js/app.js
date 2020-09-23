let options = document.querySelector('[inkscape\\:label\="Options"]').querySelectorAll(":scope > *");
let uiContainer = document.querySelector('.edit')

options.forEach((item, i) => {
  let currentChildren = item.querySelectorAll('[inkscape\\:label]');
  let currentCategory = document.createElement('div');
  currentCategory.classList.add("edit-div");

  currentCategory.classList.add("edit-" + item.attributes['inkscape:label'].nodeValue);

  currentChildren.forEach((childItem, i) => {
    let radioButton = document.createElement('input');
    radioButton.type = "radio";
    radioButton.name = item.attributes['inkscape:label'].nodeValue;
    radioButton.value = childItem.attributes['inkscape:label'].nodeValue;
    radioButton.id = childItem.attributes['inkscape:label'].nodeValue;
    if (childItem.style.display == 'inline') {
      radioButton.checked = true;
    }

    let radioLabel = document.createElement('label');
    radioLabel.innerHTML = childItem.attributes['inkscape:label'].nodeValue;
    radioLabel.setAttribute('for', childItem.attributes['inkscape:label'].nodeValue);


    currentCategory.appendChild(radioButton);
    currentCategory.appendChild(radioLabel);

    radioButton.addEventListener('change', function() {
      currentChildren.forEach((item, i) => {
        if (item != childItem) {
          item.style.display = 'none';
        } else {
          item.style.display = 'inline';
        }
        exportToSvg();

      });
    })
  });
  uiContainer.appendChild(currentCategory);

});

function exportToSvg() {
  //get svg element.
  let svg = document.querySelector("svg");

  //get svg source.
  let serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);

  //add name spaces.
  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  //add xml declaration
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  //convert svg source to URI data scheme.
  let url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

  //set url value to a element's href attribute.
  document.getElementById("download-link").href = url;

  document.getElementById("download-link").download = "the-other-linux-logo.svg";
  //you can download svg file by right click menu.
}
