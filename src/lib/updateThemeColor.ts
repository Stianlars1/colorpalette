export const updateThemeColor = (color: string) => {
  // This finds the meta tag with name="theme-color"

  const metaTag = document.querySelector('meta[name="theme-color"]');

  // If the meta tag exists, update its content attribute with the background color
  if (metaTag) {
    metaTag.setAttribute("content", color);
  } else {
    // If the meta tag does not exist, create a new one and append it to the head element
    const newMetaTag = document.createElement("meta");
    newMetaTag.setAttribute("name", "theme-color");

    newMetaTag.setAttribute("color", color);
    //document.getElementsByTagName("head")[0].appendChild(newMetaTag);
    document.head.appendChild(newMetaTag);
  }
};
