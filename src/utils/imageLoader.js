// Utility function to update bike images
export function updateBikeImages(images) {
  const leftBike = document.querySelector('.bike-container.left img');
  const rightBike = document.querySelector('.bike-container.right img');
  
  if (leftBike) {
    leftBike.src = images.left.url;
    leftBike.alt = images.left.alt;
  }
  
  if (rightBike) {
    rightBike.src = images.right.url;
    rightBike.alt = images.right.alt;
  }
}