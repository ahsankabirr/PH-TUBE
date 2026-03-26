const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.error(err));
};

//     "category_id": "1001",
//     "category": "Music"

const removeActiveClass = () => {
  const button = document.getElementsByClassName("category-btn");
  for (let btn of button) {
    btn.classList.remove("active");
  }
};
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");

        displayVideo(data.category);
      }
    })
    .catch((err) => console.error(err));
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    // Button create
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onClick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
    ${item.category}
    </button>
    `;

    // Add btn to category
    categoryContainer.append(buttonContainer);
  });
};

// Load Video
const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos))
    .catch((err) => console.error(err));
};

// Time
function getTimeString(time) {
  // get Hour and rest seconds
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour}h ${minute}m ${remainingSecond}s`;
}
const loadData = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  const detailsDetails = document.getElementById("modal-content");
  detailsDetails.innerHTML = `
    <img src="${video.thumbnail}"/>
    <p>${video.description}</p>
  `;

  document.getElementById("showModalData").click();
};
// const cardDemo = {
//   category_id: "1001",
//   video_id: "aaaa",
//   thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
//   title: "Shape of You",
//   authors: [
//     {
//       profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
//       profile_name: "Olivia Mitchell",
//       verified: "",
//     },
//   ],
//   others: {
//     views: "100K",
//     posted_date: "16278",
//   },
//   description:
//     "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
// };

const displayVideo = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
      <div class="min-h-[300px] w-full flex flex-col  gap-5 justify-center items-center">
        <img src="./images/Icon.png" alt="">
          <h2 class="text-center text-xl font-bold">
            No Content Here in this category
          </h2>
      </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card bg-base-100 ";
    card.innerHTML = `
  <figure class="h-[200px] relative">
    <img
      class="h-full w-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />

      ${video.others.posted_date?.length === 0 ? `` : `<span class="absolute right-8 bottom-8 bg-black text-white rounded p-1 text-xs">${getTimeString(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img
      class="w-10 h-10 rounded-full object-cover"
      src="${video.authors[0].profile_picture}"
      alt="profile picture" />
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex">
      <p class="pr-2 text-gray-400 font-semibold">${video.authors[0].profile_name}</p>
      
      ${video.authors[0].verified === true ? `<img class="w-5 object-cover" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />` : ``}
      
      
    </div>
    <p class="text-gray-400">${video.others.views}</p>
    
    <p><button onClick="loadData('${
      video.video_id
    }')" class="btn btn-sm btn-error">Details</button><p/>
    </div>
  </div>
    `;

    videoContainer.append(card);
  });
};

loadCategories();
loadVideo();
