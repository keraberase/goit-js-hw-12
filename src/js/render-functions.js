
 function itemTemplate(hit) {
  return `<li class="gallery-item">
  <a class="gallery-link" href="${hit.largeImageURL}">
    <img class="gallery-image" src="${hit.webformatURL}" alt="${hit.tags}" />
  </a>
   <div class="image-details">
                    <p>Likes: ${hit.likes}</p>
                    <p>Views: ${hit.views}</p>
                    <p>Comments: ${hit.comments}</p>
                    <p>Downloads: ${hit.downloads}</p>
                </div>
</li>`;
};
    
 
    


export   function itemsTamplate(hits) {
  return hits.map(itemTemplate).join('');
};
